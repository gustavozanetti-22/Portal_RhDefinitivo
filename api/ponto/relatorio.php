<?php

include("../config/database.php");

$funcionario =
$_GET['funcionario_id'];

$sql = "

SELECT

    p.*,
    f.nome,
    f.cargo,
    f.salario

FROM ponto p

INNER JOIN funcionarios f
ON p.funcionario_id = f.id

WHERE funcionario_id = '$funcionario'

ORDER BY data_ponto ASC

";

$result = $conn->query($sql);

$dados = [];

while($row = $result->fetch_assoc()){

    $dados[] = $row;

}

echo json_encode($dados);

?>