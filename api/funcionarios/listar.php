<?php

include("../config/database.php");

$sql = "SELECT * FROM Funcionarios ORDER BY id DESC";

$result = $conn->query($sql);

if (!$result) {
    echo json_encode([
        "success" => false,
        "message" => "Erro ao listar funcionários",
        "erro" => $conn->error
    ]);
    exit;
}

$funcionarios = [];

while ($row = $result->fetch_assoc()) {
    $funcionarios[] = $row;
}

echo json_encode($funcionarios);

?>