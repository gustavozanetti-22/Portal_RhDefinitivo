const API = "api/funcionarios/";

const tbody = document.getElementById(
    "tbody-funcionarios"
);

const form = document.getElementById(
    "form-funcionario"
);

let editando = null;

async function carregarFuncionarios(){

    const response = await fetch(
        API + "listar.php"
    );

    const funcionarios = await response.json();

    tbody.innerHTML = "";

    funcionarios.forEach(funcionario => {

        tbody.innerHTML += `

            <tr>

                <td>${funcionario.nome}</td>

                <td>${funcionario.cargo}</td>

                <td>
                    R$ ${parseFloat(
                        funcionario.salario
                    ).toFixed(2)}
                </td>

                <td>${funcionario.email}</td>

                <td>${funcionario.horario_entrada || "-"}</td>

                <td>${funcionario.horario_saida || "-"}</td>

                <td>

                    <button
                        class="btn-editar"
                        onclick="editarFuncionario(
                            ${funcionario.id},
                            '${funcionario.nome}',
                            '${funcionario.cargo}',
                            '${funcionario.salario}',
                            '${funcionario.email}',
                            '${funcionario.horario_entrada}',
                            '${funcionario.horario_saida}'
                        )"
                    >
                        Editar
                    </button>

                    <button
                        class="btn-excluir"
                        onclick="deletarFuncionario(${funcionario.id})"
                    >
                        Excluir
                    </button>

                </td>

            </tr>

        `;

    });

}

form.addEventListener(
    "submit",
    async function(e){

        e.preventDefault();

        const funcionario = {

            nome:
                document.getElementById("nome").value,

            cargo:
                document.getElementById("cargo").value,

            salario:
                document.getElementById("salario").value,

            email:
                document.getElementById("email").value,

            horario_entrada:
                document.getElementById("horario_entrada").value,

            horario_saida:
                document.getElementById("horario_saida").value

        };

        if(editando){

            funcionario.id = editando;

            await fetch(
                API + "editar.php",
                {

                    method: "POST",

                    headers: {
                        "Content-Type":
                        "application/json"
                    },

                    body: JSON.stringify(funcionario)

                }
            );

            editando = null;

        }else{

            await fetch(
                API + "criar.php",
                {

                    method: "POST",

                    headers: {
                        "Content-Type":
                        "application/json"
                    },

                    body: JSON.stringify(funcionario)

                }
            );

        }

        form.reset();

        carregarFuncionarios();

    }
);

function editarFuncionario(
    id,
    nome,
    cargo,
    salario,
    email,
    horarioEntrada,
    horarioSaida
){

    editando = id;

    document.getElementById("nome").value =
        nome;

    document.getElementById("cargo").value =
        cargo;

    document.getElementById("salario").value =
        salario;

    document.getElementById("email").value =
        email;

    document.getElementById(
        "horario_entrada"
    ).value = horarioEntrada;

    document.getElementById(
        "horario_saida"
    ).value = horarioSaida;

}

async function deletarFuncionario(id){

    await fetch(
        API + "deletar.php",
        {

            method: "POST",

            headers: {
                "Content-Type":
                "application/json"
            },

            body: JSON.stringify({
                id
            })

        }
    );

    carregarFuncionarios();

}

carregarFuncionarios();