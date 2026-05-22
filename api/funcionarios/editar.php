<?php

include("../config/database.php");

$data = json_decode(file_get_contents("php://input"), true);

$stmt = $conn->prepare(
    "UPDATE Funcionarios SET
        nome = ?,
        cargo = ?,
        salario = ?,
        email = ?,
        horario_entrada = ?,
        horario_saida = ?
    WHERE id = ?"
);

if (!$stmt) {
    echo json_encode([
        "success" => false,
        "message" => "Erro no SQL",
        "erro" => $conn->error
    ]);
    exit;
}

$stmt->bind_param(
    "ssdsssi",
    $data["nome"],
    $data["cargo"],
    $data["salario"],
    $data["email"],
    $data["horario_entrada"],
    $data["horario_saida"],
    $data["id"]
);

echo json_encode([
    "success" => $stmt->execute()
]);

?>