<?php

include("../config/database.php");

$mes = $_GET["mes"] ?? "";

$sql = "SELECT * FROM Ponto";

if ($mes !== "") {
    $sql .= " WHERE MONTH(data_ponto) = ?";
}

$sql .= " ORDER BY data_ponto ASC";

$stmt = $conn->prepare($sql);

if (!$stmt) {
    echo json_encode([
        "success" => false,
        "message" => "Erro no SQL",
        "erro" => $conn->error
    ]);
    exit;
}

if ($mes !== "") {
    $stmt->bind_param("i", $mes);
}

$stmt->execute();

$result = $stmt->get_result();

$pontos = [];

while ($row = $result->fetch_assoc()) {
    $pontos[] = $row;
}

echo json_encode($pontos);

?>