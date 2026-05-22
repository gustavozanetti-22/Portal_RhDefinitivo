<?php

include("api/config/database.php");

echo json_encode([
    "success" => true,
    "message" => "Conectado ao banco com sucesso"
]);

?>