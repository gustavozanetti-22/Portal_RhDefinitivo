<?php

include("../config/database.php");

$funcionario_id = $_GET["funcionario_id"] ?? 0;

$sql = "
SELECT
    p.*,
    f.nome,
    f.cargo,
    f.salario
FROM ponto p
INNER JOIN Funcionarios f
ON p.funcionario_id = f.id
WHERE p.funcionario_id = ?
ORDER BY p.data_ponto ASC
";

$stmt = $conn->prepare($sql);

if (!$stmt) {
    echo json_encode([
        "success" => false,
        "message" => "Erro no SQL do relatório",
        "erro" => $conn->error
    ]);
    exit;
}

$stmt->bind_param("i", $funcionario_id);
$stmt->execute();

$result = $stmt->get_result();

$dados = [];

while ($row = $result->fetch_assoc()) {
    $dados[] = $row;
}

echo json_encode($dados);

?>