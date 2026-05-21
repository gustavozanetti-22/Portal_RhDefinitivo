<?php

include("../config/database.php");

$mes = $_GET['mes'] ?? '';

$sql = "

SELECT

    p.*,
    f.nome,
    f.cargo,
    f.salario,
    f.horario_entrada AS horario_padrao_entrada,
    f.horario_saida AS horario_padrao_saida

FROM ponto p

INNER JOIN funcionarios f
ON p.funcionario_id = f.id

";

if($mes != ''){

    $sql .= "
    WHERE MONTH(p.data_ponto) = '$mes'
    ";

}

$sql .= "
ORDER BY p.data_ponto ASC
";

$result = $conn->query($sql);

$pontos = [];

while($row = $result->fetch_assoc()){

    $pontos[] = $row;

}

echo json_encode($pontos);

?>