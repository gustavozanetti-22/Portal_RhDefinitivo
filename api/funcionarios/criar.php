<?php

include("../config/database.php");

$data = json_decode(
    file_get_contents("php://input"),
    true
);

$stmt = $conn->prepare(

    "INSERT INTO funcionarios (

        nome,
        cargo,
        salario,
        email,
        horario_entrada,
        horario_saida

    )

    VALUES (?, ?, ?, ?, ?, ?)"

);

$stmt->bind_param(

    "ssdsss",

    $data['nome'],
    $data['cargo'],
    $data['salario'],
    $data['email'],
    $data['horario_entrada'],
    $data['horario_saida']

);

$stmt->execute();

echo json_encode([
    "success" => true
]);

?>