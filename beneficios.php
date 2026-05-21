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
        Benefícios - MacosRH
    </title>

    <link rel="stylesheet" href="css/global.css">
    <link
        rel="stylesheet"
        href="css/beneficios.css"
    >

</head>
<body>

    <div class="container">

        <div class="topo">

            <h1>
                Benefícios
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

        <div class="card">

            <table>

                <thead>

                    <tr>

                        <th>Funcionário</th>

                        <th>Convênio</th>

                        <th>VT</th>

                        <th>VR</th>

                        <th>VA</th>

                        <th>Odonto</th>

                        <th>Ações</th>

                    </tr>

                </thead>

                <tbody id="tbody-beneficios">

                </tbody>

            </table>

        </div>

    </div>

    <div
        class="modal"
        id="modal-beneficios"
    >

        <div class="modal-content">

            <h2>
                Editar Benefícios
            </h2>

            <form id="form-beneficios">

                <input
                    type="hidden"
                    id="funcionario_id"
                >

                <div class="checkbox-group">

                    <label>

                        <input
                            type="checkbox"
                            id="convenio_ativo"
                        >

                        Convênio ativo

                    </label>

                </div>

                <div class="checkbox-group">

                    <label>

                        <input
                            type="checkbox"
                            id="vale_transporte"
                        >

                        Vale Transporte

                    </label>

                </div>

                <div class="checkbox-group">

                    <label>

                        <input
                            type="checkbox"
                            id="vale_refeicao"
                        >

                        Vale Refeição

                    </label>

                </div>

                <div class="checkbox-group">

                    <label>

                        <input
                            type="checkbox"
                            id="vale_alimentacao"
                        >

                        Vale Alimentação

                    </label>

                </div>

                <div class="checkbox-group">

                    <label>

                        <input
                            type="checkbox"
                            id="plano_odontologico"
                        >

                        Plano Odontológico

                    </label>

                </div>

                <div class="input-group">

                    <label>
                        Observações
                    </label>

                    <textarea
                        id="observacoes"
                    ></textarea>

                </div>

                <button
                    type="submit"
                    class="btn-salvar"
                >
                    Salvar
                </button>

                <button
                    type="button"
                    class="btn-cancelar"
                    onclick="fecharModal()"
                >
                    Cancelar
                </button>

            </form>

        </div>

    </div>

    <script src="js/beneficios.js"></script>

</body>
</html>