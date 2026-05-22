<?php

session_start();

include("../config/database.php");

header("Content-Type: application/json");

$data = json_decode(
    file_get_contents("php://input"),
    true
);

if (!$data) {

    echo json_encode([
        "success" => false,
        "message" => "Nenhum dado recebido"
    ]);

    exit;
}

$email = trim($data["email"] ?? "");
$senha = trim($data["senha"] ?? "");

if ($email === "" || $senha === "") {

    echo json_encode([
        "success" => false,
        "message" => "Email ou senha vazios"
    ]);

    exit;
}

$stmt = $conn->prepare(
    "SELECT * FROM Usuarios WHERE email = ?"
);

if (!$stmt) {

    echo json_encode([
        "success" => false,
        "message" => "Erro no prepare SQL",
        "erro" => $conn->error
    ]);

    exit;
}

$stmt->bind_param("s", $email);

$stmt->execute();

$resultado = $stmt->get_result();

if ($resultado->num_rows === 0) {

    echo json_encode([
        "success" => false,
        "message" => "Usuário não encontrado"
    ]);

    exit;
}

$usuario = $resultado->fetch_assoc();

$senhaBanco = trim($usuario["senha"]);

if ($senha !== $senhaBanco) {

    echo json_encode([

        "success" => false,

        "message" => "Senha incorreta",

        "digitada" => $senha,

        "banco" => $senhaBanco

    ]);

    exit;
}

$_SESSION["usuario"] = $usuario["id"];

echo json_encode([

    "success" => true,

    "message" => "Login realizado com sucesso"

]);

?>