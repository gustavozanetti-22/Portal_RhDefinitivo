<?php

include("../config/database.php");

$data = json_decode(file_get_contents("php://input"), true);

if (!$data || !isset($data["pontos"])) {
    echo json_encode([
        "success" => false,
        "message" => "Nenhum ponto recebido"
    ]);
    exit;
}

$conn->begin_transaction();

try {

    foreach ($data["pontos"] as $ponto) {

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
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE
                horario_entrada = VALUES(horario_entrada),
                horario_saida = VALUES(horario_saida),
                atraso_minutos = VALUES(atraso_minutos),
                hora_extra_minutos = VALUES(hora_extra_minutos),
                valor_desconto = VALUES(valor_desconto),
                valor_extra = VALUES(valor_extra),
                falta = VALUES(falta),
                falta_atestado = VALUES(falta_atestado),
                tipo_dia = VALUES(tipo_dia),
                observacoes = VALUES(observacoes)"
        );

        if (!$stmt) {
            throw new Exception($conn->error);
        }

        $stmt->bind_param(
            "isssiiddiiss",
            $ponto["funcionario_id"],
            $ponto["data_ponto"],
            $ponto["horario_entrada"],
            $ponto["horario_saida"],
            $ponto["atraso_minutos"],
            $ponto["hora_extra_minutos"],
            $ponto["valor_desconto"],
            $ponto["valor_extra"],
            $ponto["falta"],
            $ponto["falta_atestado"],
            $ponto["tipo_dia"],
            $ponto["observacoes"]
        );

        if (!$stmt->execute()) {
            throw new Exception($stmt->error);
        }
    }

    $conn->commit();

    echo json_encode([
        "success" => true,
        "message" => "Ponto do mês salvo com sucesso"
    ]);

} catch (Exception $e) {

    $conn->rollback();

    echo json_encode([
        "success" => false,
        "message" => "Erro ao salvar ponto do mês",
        "erro" => $e->getMessage()
    ]);

}

?>