const form = document.getElementById("login-form");
const erro = document.getElementById("mensagem-erro");

form.addEventListener("submit", async function(e) {
    e.preventDefault();

    erro.innerText = "";

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    try {
        const response = await fetch("api/auth/login.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                senha: senha
            })
        });

        const data = await response.json();

        if (data.success) {
            window.location.href = "dashboard.php";
        } else {
            erro.innerText = data.message || "Email ou senha inválidos";
        }

    } catch (error) {
        console.error(error);
        erro.innerText = "Erro ao conectar com a API";
    }
});