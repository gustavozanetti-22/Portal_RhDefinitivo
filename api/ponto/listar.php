<?php

include("../config/database.php");

$mes = $_GET["mes"] ?? "";
$ano = $_GET["ano"] ?? "";

$sql = "SELECT * FROM Ponto WHERE 1=1";

$params = [];
$types = "";

if ($mes !== "") {
    $sql .= " AND MONTH(data_ponto) = ?";
    $params[] = $mes;
    $types .= "i";
}

if ($ano !== "") {
    $sql .= " AND YEAR(data_ponto) = ?";
    $params[] = $ano;
    $types .= "i";
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

if (count($params) > 0) {
    $stmt->bind_param($types, ...$params);
}

$stmt->execute();

$result = $stmt->get_result();

$pontos = [];

while ($row = $result->fetch_assoc()) {
    $pontos[] = $row;
}

echo json_encode($pontos);

?>