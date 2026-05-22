<?php

include("../config/database.php");

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode([
        "success" => false,
        "message" => "Nenhum dado recebido"
    ]);
    exit;
}

$stmt = $conn->prepare(
    "SELECT id FROM Ponto 
     WHERE funcionario_id = ? 
     AND data_ponto = ?"
);

$stmt->bind_param(
    "is",
    $data["funcionario_id"],
    $data["data_ponto"]
);

$stmt->execute();

$result = $stmt->get_result();

if ($result->num_rows > 0) {

    $stmt = $conn->prepare(
        "UPDATE Ponto SET
            horario_entrada = ?,
            horario_saida = ?,
            atraso_minutos = ?,
            hora_extra_minutos = ?,
            valor_desconto = ?,
            valor_extra = ?,
            falta = ?,
            falta_atestado = ?,
            tipo_dia = ?,
            observacoes = ?
         WHERE funcionario_id = ?
         AND data_ponto = ?"
    );

    $stmt->bind_param(
        "ssiiddiissis",
        $data["horario_entrada"],
        $data["horario_saida"],
        $data["atraso_minutos"],
        $data["hora_extra_minutos"],
        $data["valor_desconto"],
        $data["valor_extra"],
        $data["falta"],
        $data["falta_atestado"],
        $data["tipo_dia"],
        $data["observacoes"],
        $data["funcionario_id"],
        $data["data_ponto"]
    );

} else {

    $stmt = $conn->prepare(
        "INSERT INTO Ponto (
            funcionario_id,
            data_ponto,
            horario_entrada,
            horario_saida,
            atraso_minutos,
            hora_extra_minutos,
            valor_desconto,
            valor_extra,
            falta,
            falta_atestado,
            tipo_dia,
            observacoes
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
    );

    $stmt->bind_param(
        "isssiiddiiss",
        $data["funcionario_id"],
        $data["data_ponto"],
        $data["horario_entrada"],
        $data["horario_saida"],
        $data["atraso_minutos"],
        $data["hora_extra_minutos"],
        $data["valor_desconto"],
        $data["valor_extra"],
        $data["falta"],
        $data["falta_atestado"],
        $data["tipo_dia"],
        $data["observacoes"]
    );

}

if (!$stmt->execute()) {
    echo json_encode([
        "success" => false,
        "message" => "Erro ao salvar ponto",
        "erro" => $stmt->error
    ]);
    exit;
}

echo json_encode([
    "success" => true,
    "message" => "Ponto salvo com sucesso"
]);

?>