<?php

include("../config/database.php");

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode([
        "success" => false,
        "message" => "Nenhum dado chegou na API"
    ]);
    exit;
}

$nome = $data["nome"] ?? "";
$cargo = $data["cargo"] ?? "";
$salario = $data["salario"] ?? 0;
$email = $data["email"] ?? "";
$horario_entrada = $data["horario_entrada"] ?? null;
$horario_saida = $data["horario_saida"] ?? null;

$stmt = $conn->prepare(
    "INSERT INTO Funcionarios (
        nome,
        cargo,
        salario,
        email,
        horario_entrada,
        horario_saida
    ) VALUES (?, ?, ?, ?, ?, ?)"
);

if (!$stmt) {
    echo json_encode([
        "success" => false,
        "message" => "Erro no prepare SQL",
        "erro" => $conn->error
    ]);
    exit;
}

$stmt->bind_param(
    "ssdsss",
    $nome,
    $cargo,
    $salario,
    $email,
    $horario_entrada,
    $horario_saida
);

if (!$stmt->execute()) {
    echo json_encode([
        "success" => false,
        "message" => "Erro ao inserir funcionário",
        "erro" => $stmt->error
    ]);
    exit;
}

echo json_encode([
    "success" => true,
    "message" => "Funcionário cadastrado com sucesso"
]);

?>