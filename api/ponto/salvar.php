<?php

include("../config/database.php");

$data = json_decode(
    file_get_contents("php://input"),
    true
);

$stmt = $conn->prepare(

    "SELECT id
    FROM ponto
    WHERE funcionario_id = ?
    AND data_ponto = ?"

);

$stmt->bind_param(

    "is",

    $data['funcionario_id'],
    $data['data_ponto']

);

$stmt->execute();

$result = $stmt->get_result();

if($result->num_rows > 0){

    $stmt = $conn->prepare(

        "UPDATE ponto

        SET

            horario_entrada = ?,
            horario_saida = ?,
            atraso_minutos = ?,
            hora_extra_minutos = ?,
            valor_desconto = ?,
            valor_extra = ?,
            falta = ?,
            observacoes = ?

        WHERE funcionario_id = ?
        AND data_ponto = ?"

    );

    $stmt->bind_param(

        "ssiiddiiss",

        $data['horario_entrada'],
        $data['horario_saida'],
        $data['atraso_minutos'],
        $data['hora_extra_minutos'],
        $data['valor_desconto'],
        $data['valor_extra'],
        $data['falta'],
        $data['observacoes'],
        $data['funcionario_id'],
        $data['data_ponto']

    );

}else{

    $stmt = $conn->prepare(

        "INSERT INTO ponto (

            funcionario_id,
            data_ponto,
            horario_entrada,
            horario_saida,
            atraso_minutos,
            hora_extra_minutos,
            valor_desconto,
            valor_extra,
            falta,
            observacoes

        )

        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"

    );

    $stmt->bind_param(

        "isssiiddis",

        $data['funcionario_id'],
        $data['data_ponto'],
        $data['horario_entrada'],
        $data['horario_saida'],
        $data['atraso_minutos'],
        $data['hora_extra_minutos'],
        $data['valor_desconto'],
        $data['valor_extra'],
        $data['falta'],
        $data['observacoes']

    );

}

$stmt->execute();

echo json_encode([
    "success" => true
]);

?>