<!DOCTYPE html>
<html lang="pt-br">
<head>

    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <title>
        Login - MacosRH
    </title>

    <link rel="stylesheet" href="css/global.css">
    <link
        rel="stylesheet"
        href="css/login.css"
    >

</head>
<body>

    <div class="login-container">

        <div class="login-box">

            <div class="logo">

                <h1>
                    MacosRH
                </h1>

                <p>
                    Sistema de Gestão de RH
                </p>

            </div>

            <form id="login-form">

                <div class="input-group">

                    <label>
                        Email
                    </label>

                    <input
                        type="email"
                        id="email"
                        placeholder="Digite seu email"
                        required
                    >

                </div>

                <div class="input-group">

                    <label>
                        Senha
                    </label>

                    <input
                        type="password"
                        id="senha"
                        placeholder="Digite sua senha"
                        required
                    >

                </div>

                <button
                    type="submit"
                    class="btn-login"
                >
                    Entrar
                </button>

            </form>

            <p
                id="mensagem-erro"
                class="erro"
            >
            </p>

        </div>

    </div>

    <script src="js/login.js"></script>

</body>
</html>