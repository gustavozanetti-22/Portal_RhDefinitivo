const API_FUNCIONARIOS =
"api/funcionarios/";

const API_BENEFICIOS =
"api/beneficios/";

const tbody =
document.getElementById(
    "tbody-beneficios"
);

const modal =
document.getElementById(
    "modal-beneficios"
);

const form =
document.getElementById(
    "form-beneficios"
);

async function carregarBeneficios(){

    const responseFuncionarios =
    await fetch(
        API_FUNCIONARIOS +
        "listar.php"
    );

    const funcionarios =
    await responseFuncionarios.json();

    const responseBeneficios =
    await fetch(
        API_BENEFICIOS +
        "listar.php"
    );

    const beneficios =
    await responseBeneficios.json();

    tbody.innerHTML = "";

    funcionarios.forEach(funcionario => {

        const registro =
        beneficios.find(b =>
            b.funcionario_id ==
            funcionario.id
        );

        tbody.innerHTML += `

            <tr>

                <td>
                    ${funcionario.nome}
                </td>

                <td>
                    ${
                        registro?.convenio_ativo == 1
                        ? "Sim"
                        : "Não"
                    }
                </td>

                <td>
                    ${
                        registro?.vale_transporte == 1
                        ? "Sim"
                        : "Não"
                    }
                </td>

                <td>
                    ${
                        registro?.vale_refeicao == 1
                        ? "Sim"
                        : "Não"
                    }
                </td>

                <td>
                    ${
                        registro?.vale_alimentacao == 1
                        ? "Sim"
                        : "Não"
                    }
                </td>

                <td>
                    ${
                        registro?.plano_odontologico == 1
                        ? "Sim"
                        : "Não"
                    }
                </td>

                <td>

                    <button
                        class="btn-editar"
                        onclick='abrirModal(
                            ${JSON.stringify(funcionario)},
                            ${JSON.stringify(registro)}
                        )'
                    >
                        Editar
                    </button>

                </td>

            </tr>

        `;

    });

}

function abrirModal(
    funcionario,
    registro
){

    modal.style.display =
    "flex";

    document.getElementById(
        "funcionario_id"
    ).value =
    funcionario.id;

    document.getElementById(
        "convenio_ativo"
    ).checked =
    registro?.convenio_ativo == 1;

    document.getElementById(
        "vale_transporte"
    ).checked =
    registro?.vale_transporte == 1;

    document.getElementById(
        "vale_refeicao"
    ).checked =
    registro?.vale_refeicao == 1;

    document.getElementById(
        "vale_alimentacao"
    ).checked =
    registro?.vale_alimentacao == 1;

    document.getElementById(
        "plano_odontologico"
    ).checked =
    registro?.plano_odontologico == 1;

    document.getElementById(
        "observacoes"
    ).value =
    registro?.observacoes || "";

}

function fecharModal(){

    modal.style.display =
    "none";

}

form.addEventListener(
    "submit",
    async function(e){

        e.preventDefault();

        const dados = {

            funcionario_id:
            document.getElementById(
                "funcionario_id"
            ).value,

            convenio_ativo:
            document.getElementById(
                "convenio_ativo"
            ).checked ? 1 : 0,

            vale_transporte:
            document.getElementById(
                "vale_transporte"
            ).checked ? 1 : 0,

            vale_refeicao:
            document.getElementById(
                "vale_refeicao"
            ).checked ? 1 : 0,

            vale_alimentacao:
            document.getElementById(
                "vale_alimentacao"
            ).checked ? 1 : 0,

            plano_odontologico:
            document.getElementById(
                "plano_odontologico"
            ).checked ? 1 : 0,

            observacoes:
            document.getElementById(
                "observacoes"
            ).value

        };

        const responseBeneficios =
        await fetch(
            API_BENEFICIOS +
            "listar.php"
        );

        const lista =
        await responseBeneficios.json();

        const existe =
        lista.find(b =>
            b.funcionario_id ==
            dados.funcionario_id
        );

        const endpoint =
        existe
        ? "editar.php"
        : "salvar.php";

        await fetch(

            API_BENEFICIOS +
            endpoint,

            {

                method: "POST",

                headers: {

                    "Content-Type":
                    "application/json"

                },

                body: JSON.stringify(
                    dados
                )

            }

        );

        alert(
            "Benefícios salvos!"
        );

        fecharModal();

        carregarBeneficios();

    }
);

window.addEventListener(
    "click",
    function(e){

        if(e.target == modal){

            fecharModal();

        }

    }
);

carregarBeneficios();