<?php

include("../config/database.php");

$sql = "SELECT * FROM Beneficio";

$result = $conn->query($sql);

$beneficios = [];

while($row = $result->fetch_assoc()){

    $beneficios[] = $row;

}

echo json_encode($beneficios);

?>