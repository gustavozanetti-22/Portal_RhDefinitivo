<?php

include("../config/database.php");

$sql = "SELECT * FROM ferias";

$result = $conn->query($sql);

$ferias = [];

while($row = $result->fetch_assoc()){

    $ferias[] = $row;

}

echo json_encode($ferias);

?>