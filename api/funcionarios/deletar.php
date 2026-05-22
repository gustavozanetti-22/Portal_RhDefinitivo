<?php

include("../config/database.php");

$data = json_decode(file_get_contents("php://input"), true);

$stmt = $conn->prepare(
    "DELETE FROM Funcionarios WHERE id = ?"
);

$stmt->bind_param("i", $data["id"]);

echo json_encode([
    "success" => $stmt->execute()
]);

?>