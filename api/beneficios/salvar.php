<?php

include("../config/database.php");

$data = json_decode(
    file_get_contents("php://input"),
    true
);

$stmt = $conn->prepare(

    "INSERT INTO Beneficio (

        funcionario_id,
        convenio_ativo,
        vale_transporte,
        vale_refeicao,
        vale_alimentacao,
        plano_odontologico,
        observacoes

    )

    VALUES (?, ?, ?, ?, ?, ?, ?)"

);

$stmt->bind_param(

    "iiiiiis",

    $data['funcionario_id'],
    $data['convenio_ativo'],
    $data['vale_transporte'],
    $data['vale_refeicao'],
    $data['vale_alimentacao'],
    $data['plano_odontologico'],
    $data['observacoes']

);

$stmt->execute();

echo json_encode([

    "success" => true

]);

?>