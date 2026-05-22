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

    <button
        class="btn-voltar-dashboard"
        onclick="window.location.href='dashboard.php'"
    >
        Página inicial
    </button>

</div>

    <div id="lista-funcionarios"></div>

</div>

<script>

async function carregarFuncionarios(){

    const response =
        await fetch(
            "api/funcionarios/listar.php"
        );

    const funcionarios =
        await response.json();

    const lista =
        document.getElementById(
            "lista-funcionarios"
        );

    lista.innerHTML = "";

    funcionarios.forEach(funcionario => {

        lista.innerHTML += `

            <div class="card-funcionario">

                <h2>
                    ${funcionario.nome}
                </h2>

                <p>
                    Cargo:
                    ${funcionario.cargo}
                </p>

                <p>
                    Salário:
                    R$ ${funcionario.salario}
                </p>

                <button
                    onclick="
                        window.location.href =
                        'ponto_funcionario.php?id=${funcionario.id}'
                    "
                >
                    Abrir ponto
                </button>

            </div>

        `;

    });

}

carregarFuncionarios();

</script>

</body>
</html>