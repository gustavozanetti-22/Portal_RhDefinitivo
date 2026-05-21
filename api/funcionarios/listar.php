<?php

include("../config/database.php");

$sql = "SELECT * FROM funcionarios ORDER BY id DESC";

$result = $conn->query($sql);

$funcionarios = [];

while($row = $result->fetch_assoc()){

    $funcionarios[] = $row;

}

echo json_encode($funcionarios);

?>