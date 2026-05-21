<?php
session_start();
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>

    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <title>
        Controle de Ponto
    </title>

    <link rel="stylesheet" href="css/global.css">
    <link
        rel="stylesheet"
        href="css/ponto.css"
    >

</head>
<body>

    <div class="container">

        <div class="topo">

            <h1>
                Controle de Ponto
            </h1>

            <div class="acoes-topo">

                <a
                    href="dashboard.php"
                    class="btn-home"
                >
                    Página Inicial
                </a>

                <a
                    href="php/logout.php"
                    class="btn-logout"
                >
                    Logout
                </a>

            </div>

        </div>

        <div class="mes-box">

            <label>
                Selecione o mês:
            </label>

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

            <button id="btn-carregar">
                Carregar
            </button>

        </div>

        <div id="conteudo-ponto">

        </div>

    </div>

    <script src="js/ponto.js"></script>

</body>
</html>