<?php
session_start();

if (!isset($_SESSION["usuario"])) {
    header("Location: login.php");
    exit();
}
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Ponto - Portal RH</title>
    <link rel="stylesheet" href="css/ponto.css">
</head>
<body>

<div class="container">

    <div class="topo-pagina">
        <h1>Controle de Ponto</h1>

        <button class="btn-voltar-dashboard" onclick="window.location.href='dashboard.php'">
            Página inicial
        </button>
    </div>

    <div class="mes-box">
        <label>Ano</label>
        <input type="number" id="ano" value="2026">

        <label>Mês</label>
        <select id="mes">
            <option value="1">Janeiro</option>
            <option value="2">Fevereiro</option>
            <option value="3">Março</option>
            <option value="4">Abril</option>
            <option value="5">Maio</option>
            <option value="6">Junho</option>
            <option value="7">Julho</option>
            <option value="8">Agosto</option>
            <option value="9">Setembro</option>
            <option value="10">Outubro</option>
            <option value="11">Novembro</option>
            <option value="12">Dezembro</option>
        </select>

        <button id="btn-carregar">Carregar</button>
    </div>

    <div id="lista-funcionarios"></div>

</div>

<script src="js/ponto.js"></script>

</body>
</html>