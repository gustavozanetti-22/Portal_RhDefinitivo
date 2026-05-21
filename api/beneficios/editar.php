<?php

include("../config/database.php");

$data = json_decode(
    file_get_contents("php://input"),
    true
);

$stmt = $conn->prepare(

    "UPDATE beneficios

    SET

        convenio_ativo = ?,
        vale_transporte = ?,
        vale_refeicao = ?,
        vale_alimentacao = ?,
        plano_odontologico = ?,
        observacoes = ?

    WHERE funcionario_id = ?"

);

$stmt->bind_param(

    "iiiiisi",

    $data['convenio_ativo'],
    $data['vale_transporte'],
    $data['vale_refeicao'],
    $data['vale_alimentacao'],
    $data['plano_odontologico'],
    $data['observacoes'],
    $data['funcionario_id']

);

$stmt->execute();

echo json_encode([

    "success" => true

]);

?>