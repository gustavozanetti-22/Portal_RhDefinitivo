<?php

include("../config/database.php");

$data = json_decode(
    file_get_contents("php://input"),
    true
);

$stmt = $conn->prepare(

    "INSERT INTO Ferias (

        funcionario_id,
        ultima_feria,
        proxima_feria,
        data_saida,
        retorno_ferias,
        vendeu_10_dias,
        ferias_pagas,
        observacoes

    )

    VALUES (?, ?, ?, ?, ?, ?, ?, ?)"

);

$stmt->bind_param(

    "issssiss",

    $data['funcionario_id'],
    $data['ultima_feria'],
    $data['proxima_feria'],
    $data['data_saida'],
    $data['retorno_ferias'],
    $data['vendeu_10_dias'],
    $data['ferias_pagas'],
    $data['observacoes']

);

$stmt->execute();

echo json_encode([

    "success" => true

]);

?>