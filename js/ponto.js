const API_FUNCIONARIOS =
"api/funcionarios/";

const API_PONTO =
"api/ponto/";

const conteudo =
document.getElementById(
    "conteudo-ponto"
);

document.getElementById(
    "btn-carregar"
).addEventListener(

    "click",

    carregarPonto

);

async function carregarPonto(){

    const mes =
    document.getElementById(
        "mes"
    ).value;

    const responseFuncionarios =
    await fetch(
        API_FUNCIONARIOS +
        "listar.php"
    );

    const funcionarios =
    await responseFuncionarios.json();

    const responsePontos =
    await fetch(
        API_PONTO +
        "listar.php?mes=" +
        mes
    );

    const pontos =
    await responsePontos.json();

    conteudo.innerHTML = "";

    funcionarios.forEach(funcionario => {

        const registros =
        pontos.filter(p =>
            p.funcionario_id ==
            funcionario.id
        );

        let totalDesconto = 0;
        let totalExtra = 0;
        let totalAtraso = 0;
        let totalHoraExtra = 0;
        let faltas = 0;

        registros.forEach(r => {

            totalDesconto +=
            parseFloat(
                r.valor_desconto || 0
            );

            totalExtra +=
            parseFloat(
                r.valor_extra || 0
            );

            totalAtraso +=
            parseInt(
                r.atraso_minutos || 0
            );

            totalHoraExtra +=
            parseInt(
                r.hora_extra_minutos || 0
            );

            if(r.falta == 1){

                faltas++;

            }

        });

        conteudo.innerHTML += `

            <div class="card-funcionario">

                <h2>
                    ${funcionario.nome}
                </h2>

                <div class="grid">

                    <div class="info">
                        Cargo:
                        ${funcionario.cargo}
                    </div>

                    <div class="info">
                        Salário:
                        R$ ${funcionario.salario}
                    </div>

                    <div class="info">
                        Desconto:
                        R$ ${totalDesconto.toFixed(2)}
                    </div>

                    <div class="info">
                        Horas Extras:
                        R$ ${totalExtra.toFixed(2)}
                    </div>

                    <div class="info">
                        Minutos atraso:
                        ${totalAtraso}
                    </div>

                    <div class="info">
                        Minutos extra:
                        ${totalHoraExtra}
                    </div>

                    <div class="info">
                        Faltas:
                        ${faltas}
                    </div>

                </div>

                <br>

                <button
                    onclick="
                    gerarRelatorio(
                        ${funcionario.id}
                    )"
                >
                    Gerar Relatório
                </button>

            </div>

        `;

    });

}

async function gerarRelatorio(
    funcionarioId
){

    const response =
    await fetch(

        API_PONTO +
        "relatorio.php?funcionario_id=" +
        funcionarioId

    );

    const dados =
    await response.json();

    console.log(dados);

    alert(
        "Relatório gerado no console."
    );

}