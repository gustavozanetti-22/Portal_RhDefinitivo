const form = document.getElementById(
    "login-form"
);

const erro = document.getElementById(
    "mensagem-erro"
);

form.addEventListener(
    "submit",
    async function(e){

        e.preventDefault();

        const email =
            document.getElementById(
                "email"
            ).value;

        const senha =
            document.getElementById(
                "senha"
            ).value;

        try{

            const response = await fetch(

                "api/auth/login.php",

                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                        "application/json"

                    },

                    body: JSON.stringify({

                        email,
                        senha

                    })

                }

            );

            const data =
                await response.json();

            if(data.success){

                window.location.href =
                    "dashboard.php";

            }else{

                erro.innerText =
                    "Email ou senha inválidos";

            }

        }catch{

            erro.innerText =
                "Erro ao conectar API";

        }

    }
);