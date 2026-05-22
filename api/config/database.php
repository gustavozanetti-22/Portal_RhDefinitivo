<?php

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    exit;
}

$host = "ec2-3-131-141-8.us-east-2.compute.amazonaws.com";
$user = "usr_3b_g14";
$pass = "g14B@123";
$db   = "ads_3b_grupo14";

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    http_response_code(500);

    echo json_encode([
        "success" => false,
        "message" => "Erro ao conectar no banco",
        "erro" => $conn->connect_error
    ]);

    exit;
}

$conn->set_charset("utf8mb4");

?>