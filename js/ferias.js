const API_FUNCIONARIOS =
"api/funcionarios/";

const API_FERIAS =
"api/ferias/";

const tbody =
document.getElementById(
    "tbody-ferias"
);

const modal =
document.getElementById(
    "modal-ferias"
);

const form =
document.getElementById(
    "form-ferias"
);

async function carregarFerias(){

    try{

        const responseFuncionarios =
        await fetch(
            API_FUNCIONARIOS +
            "listar.php"
        );

        const funcionarios =
        await responseFuncionarios.json();

        const responseFerias =
        await fetch(
            API_FERIAS +
            "listar.php"
        );

        const ferias =
        await responseFerias.json();

        tbody.innerHTML = "";

        funcionarios.forEach(funcionario => {

            const registro =
            ferias.find(f =>
                f.funcionario_id ==
                funcionario.id
            );

            tbody.innerHTML += `

                <tr>

                    <td>
                        ${funcionario.nome}
                    </td>

                    <td>
                        ${
                            formatarData(
                                registro?.ultima_feria
                            ) ||
                            "Início empresa"
                        }
                    </td>

                    <td>
                        ${
                            formatarData(
                                registro?.proxima_feria
                            ) || "-"
                        }
                    </td>

                    <td>
                        ${
                            formatarData(
                                registro?.data_saida
                            ) || "-"
                        }
                    </td>

                    <td>
                        ${
                            formatarData(
                                registro?.retorno_ferias
                            ) || "-"
                        }
                    </td>

                    <td>
                        ${
                            registro?.vendeu_10_dias == 1
                            ? "Sim"
                            : "Não"
                        }
                    </td>

                    <td>
                        ${
                            registro?.ferias_pagas == 1
                            ? "Sim"
                            : "Não"
                        }
                    </td>

                    <td>
                        ${
                            verificarStatusFerias(
                                registro?.data_saida,
                                registro?.retorno_ferias
                            )
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

    }catch(error){

        console.error(error);

    }

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
        "ultima_feria"
    ).value =
    registro?.ultima_feria || "";

    document.getElementById(
        "data_saida"
    ).value =
    registro?.data_saida || "";

    document.getElementById(
        "vendeu_10_dias"
    ).value =
    registro?.vendeu_10_dias || 0;

    document.getElementById(
        "ferias_pagas"
    ).value =
    registro?.ferias_pagas || 0;

    document.getElementById(
        "observacoes"
    ).value =
    registro?.observacoes || "";

}

function fecharModal(){

    modal.style.display =
    "none";

}

function formatarData(data){

    if(!data) return null;

    const partes =
    data.split("-");

    return `${partes[2]}/${partes[1]}/${partes[0]}`;

}

function verificarStatusFerias(
    dataSaida,
    retorno
){

    if(!dataSaida || !retorno){

        return "Ativo";

    }

    const hoje =
    new Date();

    const inicio =
    new Date(dataSaida);

    const fim =
    new Date(retorno);

    if(
        hoje >= inicio &&
        hoje <= fim
    ){

        return "Em férias";

    }

    return "Ativo";

}

form.addEventListener(
    "submit",
    async function(e){

        e.preventDefault();

        const ultimaFerias =
        document.getElementById(
            "ultima_feria"
        ).value;

        const dataSaida =
        document.getElementById(
            "data_saida"
        ).value;

        const vendeu10 =
        parseInt(
            document.getElementById(
                "vendeu_10_dias"
            ).value
        );

        let retorno =
        new Date(dataSaida);

        retorno.setDate(
            retorno.getDate() +
            (vendeu10 ? 20 : 30)
        );

        const proxima =
        new Date(dataSaida);

        proxima.setFullYear(
            proxima.getFullYear() + 1
        );

        const dados = {

            funcionario_id:
            document.getElementById(
                "funcionario_id"
            ).value,

            ultima_feria:
            ultimaFerias,

            proxima_feria:
            proxima
            .toISOString()
            .split("T")[0],

            data_saida:
            dataSaida,

            retorno_ferias:
            retorno
            .toISOString()
            .split("T")[0],

            vendeu_10_dias:
            vendeu10,

            ferias_pagas:
            document.getElementById(
                "ferias_pagas"
            ).value,

            observacoes:
            document.getElementById(
                "observacoes"
            ).value

        };

        const responseFerias =
        await fetch(
            API_FERIAS +
            "listar.php"
        );

        const lista =
        await responseFerias.json();

        const existe =
        lista.find(f =>
            f.funcionario_id ==
            dados.funcionario_id
        );

            const endpoint =
            existe
            ? "editar.php"
            : "salvar.php";

        await fetch(

            API_FERIAS + endpoint,

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
            "Férias salvas com sucesso!"
        );

        fecharModal();

        carregarFerias();

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

carregarFerias();