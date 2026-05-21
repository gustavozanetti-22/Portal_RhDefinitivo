<?php

session_start();

include("../config/database.php");

$data = json_decode(

    file_get_contents("php://input"),

    true

);

$email = $data['email'];

$senha = $data['senha'];

$stmt = $conn->prepare(

    "SELECT * FROM usuarios
    WHERE email = ?"

);

$stmt->bind_param(

    "s",

    $email

);

$stmt->execute();

$result = $stmt->get_result();

if($result->num_rows > 0){

    $usuario =
        $result->fetch_assoc();

    if($senha === $usuario['senha']){

        $_SESSION['usuario'] =
            $usuario['id'];

        echo json_encode([

            "success" => true

        ]);

    }else{

        echo json_encode([

            "success" => false

        ]);

    }

}else{

    echo json_encode([

        "success" => false

    ]);

}

?>