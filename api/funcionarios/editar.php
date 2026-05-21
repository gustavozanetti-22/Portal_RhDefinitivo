<?php

include("../config/database.php");

$data = json_decode(
    file_get_contents("php://input"),
    true
);

$stmt = $conn->prepare(

    "UPDATE funcionarios

    SET

        nome = ?,
        cargo = ?,
        salario = ?,
        email = ?,
        horario_entrada = ?,
        horario_saida = ?

    WHERE id = ?"

);

$stmt->bind_param(

    "ssdsssi",

    $data['nome'],
    $data['cargo'],
    $data['salario'],
    $data['email'],
    $data['horario_entrada'],
    $data['horario_saida'],
    $data['id']

);

$stmt->execute();

echo json_encode([
    "success" => true
]);

?>