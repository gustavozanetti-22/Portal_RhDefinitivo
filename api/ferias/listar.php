<?php

include("../config/database.php");

$sql = "SELECT * FROM Ferias";

$result = $conn->query($sql);

if (!$result) {
    echo json_encode([
        "success" => false,
        "message" => "Erro ao listar férias",
        "erro" => $conn->error
    ]);
    exit;
}

$ferias = [];

while ($row = $result->fetch_assoc()) {
    $ferias[] = $row;
}

echo json_encode($ferias);

?>