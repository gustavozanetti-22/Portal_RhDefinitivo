<?php

header(
    "Content-Type: application/json; charset=UTF-8"
);

header(
    "Access-Control-Allow-Origin: *"
);

header(
    "Access-Control-Allow-Methods: GET, POST"
);

header(
    "Access-Control-Allow-Headers: Content-Type"
);

$host =
"ec2-3-131-141-8.us-east-2.compute.amazonaws.com";

$user =
"usr_3b_g14";

$pass =
"g14B@123";

$db =
"ads_3b_grupo14";

$conn = new mysqli(

    $host,
    $user,
    $pass,
    $db

);

if($conn->connect_error){

    die(json_encode([

        "success" => false,

        "message" =>
        "Erro conexão banco"

    ]));

}

$conn->set_charset("utf8");

?>