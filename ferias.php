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
        Férias - MacosRH
    </title>

    <link rel="stylesheet" href="css/global.css">
    <link
        rel="stylesheet"
        href="css/ferias.css"
    >

</head>
<body>

    <div class="container">

        <div class="topo">

            <h1>
                Controle de Férias
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

                        <th>Última Férias</th>

                        <th>Próxima Férias</th>

                        <th>Saída</th>

                        <th>Retorno</th>

                        <th>Vendeu 10 Dias</th>

                        <th>Férias Pagas</th>

                        <th>Status</th>

                        <th>Ações</th>

                    </tr>

                </thead>

                <tbody id="tbody-ferias">

                </tbody>

            </table>

        </div>

    </div>

    <div
        class="modal"
        id="modal-ferias"
    >

        <div class="modal-content">

            <h2>
                Editar Férias
            </h2>

            <form id="form-ferias">

                <input
                    type="hidden"
                    id="funcionario_id"
                >

                <div class="input-group">

                    <label>
                        Última vez que tirou férias
                    </label>

                    <input
                        type="date"
                        id="ultima_feria"
                    >

                </div>

                <div class="input-group">

                    <label>
                        Data saída férias
                    </label>

                    <input
                        type="date"
                        id="data_saida"
                    >

                </div>

                <div class="input-group">

                    <label>
                        Vendeu 10 dias?
                    </label>

                    <select id="vendeu_10_dias">

                        <option value="0">
                            Não
                        </option>

                        <option value="1">
                            Sim
                        </option>

                    </select>

                </div>

                <div class="input-group">

                    <label>
                        Férias pagas?
                    </label>

                    <select id="ferias_pagas">

                        <option value="0">
                            Não
                        </option>

                        <option value="1">
                            Sim
                        </option>

                    </select>

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

    <script src="js/ferias.js"></script>

</body>
</html>