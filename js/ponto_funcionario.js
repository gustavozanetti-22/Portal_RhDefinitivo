const API_FUNCIONARIOS = "api/funcionarios/";
const API_PONTO = "api/ponto/";

const conteudo = document.getElementById("conteudo-ponto");
const btnCarregar = document.getElementById("btn-carregar");

btnCarregar.addEventListener("click", carregarPonto);

function minutos(hora) {
    if (!hora) return 0;

    const partes = hora.split(":");

    return (
        parseInt(partes[0]) * 60 +
        parseInt(partes[1])
    );
}

function dataISO(data) {

    const ano =
        data.getFullYear();

    const mes =
        String(
            data.getMonth() + 1
        ).padStart(2, "0");

    const dia =
        String(
            data.getDate()
        ).padStart(2, "0");

    return `${ano}-${mes}-${dia}`;
}

function diasDoMes(ano, mes) {
    return new Date(
        ano,
        mes,
        0
    ).getDate();
}

function ehFimDeSemana(data) {

    const dia =
        data.getDay();

    return dia === 0 || dia === 6;
}

function calcularPascoa(ano) {

    const a = ano % 19;
    const b = Math.floor(ano / 100);
    const c = ano % 100;
    const d = Math.floor(b / 4);
    const e = b % 4;
    const f = Math.floor((b + 8) / 25);
    const g = Math.floor((b - f + 1) / 3);
    const h = (19 * a + b - d - g + 15) % 30;
    const i = Math.floor(c / 4);
    const k = c % 4;
    const l = (32 + 2 * e + 2 * i - h - k) % 7;
    const m = Math.floor((a + 11 * h + 22 * l) / 451);

    const mes =
        Math.floor(
            (h + l - 7 * m + 114) / 31
        );

    const dia =
        (
            (h + l - 7 * m + 114) % 31
        ) + 1;

    return new Date(
        ano,
        mes - 1,
        dia
    );
}

function adicionarDias(data, dias) {

    const nova =
        new Date(data);

    nova.setDate(
        nova.getDate() + dias
    );

    return nova;
}

function feriadosSaoPaulo(ano) {

    const pascoa =
        calcularPascoa(ano);

    return [

        `${ano}-01-01`,
        `${ano}-01-25`,
        `${ano}-04-21`,
        `${ano}-05-01`,
        `${ano}-07-09`,
        `${ano}-09-07`,
        `${ano}-10-12`,
        `${ano}-11-02`,
        `${ano}-11-15`,
        `${ano}-11-20`,
        `${ano}-12-25`,

        dataISO(
            adicionarDias(
                pascoa,
                -48
            )
        ),

        dataISO(
            adicionarDias(
                pascoa,
                -47
            )
        ),

        dataISO(
            adicionarDias(
                pascoa,
                -2
            )
        ),

        dataISO(
            adicionarDias(
                pascoa,
                60
            )
        )

    ];
}

function calcularPonto(
    funcionario,
    entrada,
    saida,
    falta,
    faltaAtestado
){

    const salario =
        parseFloat(
            funcionario.salario
        );

    const valorDia =
        salario / 30;

    const valorMinuto =
        salario / 220 / 60;

    const entradaPadrao =
        minutos(
            funcionario.horario_entrada
        );

    const saidaPadrao =
        minutos(
            funcionario.horario_saida
        );

    const entradaReal =
        minutos(entrada);

    const saidaReal =
        minutos(saida);

    const jornadaMinutos =
        saidaPadrao - entradaPadrao;

    if(faltaAtestado){

        return {

            atraso: 0,
            extra: 0,
            desconto: 0,
            valorExtra: 0

        };

    }

    if(falta){

        return {

            atraso: jornadaMinutos,
            extra: 0,
            desconto: valorDia,
            valorExtra: 0

        };

    }

    let atrasoEntrada =
        Math.max(
            0,
            entradaReal - entradaPadrao
        );

    let saidaAntecipada =
        Math.max(
            0,
            saidaPadrao - saidaReal
        );

    let atrasoTotal =
        atrasoEntrada +
        saidaAntecipada;

    let extraEntrada =
        Math.max(
            0,
            entradaPadrao - entradaReal
        );

    let extraSaida =
        Math.max(
            0,
            saidaReal - saidaPadrao
        );

    let extraTotal =
        extraEntrada +
        extraSaida;

    let desconto = 0;
    let valorExtra = 0;

    if(atrasoTotal <= 10){

        atrasoTotal = 0;

    }else{

        desconto =
            atrasoTotal *
            valorMinuto;

    }

    if(extraTotal <= 10){

        extraTotal = 0;

    }else{

        valorExtra =
            extraTotal *
            valorMinuto *
            1.5;

    }

    return {

        atraso: atrasoTotal,
        extra: extraTotal,
        desconto: desconto,
        valorExtra: valorExtra

    };

}

function classeLinha(
    pontoExistente,
    tipoDia
){

    if(tipoDia === "fim_de_semana"){
        return "linha-fim-semana";
    }

    if(tipoDia === "feriado"){
        return "linha-feriado";
    }

    if(!pontoExistente){
        return "";
    }

    if(
        pontoExistente
        .falta_atestado == 1
    ){
        return "linha-atestado";
    }

    if(
        pontoExistente
        .falta == 1
    ){
        return "linha-falta";
    }

    if(
        parseInt(
            pontoExistente
            .atraso_minutos || 0
        ) >= 11
    ){
        return "linha-atraso";
    }

    return "";
}

async function carregarPonto(){

    try{

        const ano =
            parseInt(
                document
                .getElementById("ano")
                .value
            );

        const mes =
            parseInt(
                document
                .getElementById("mes")
                .value
            );

        const resFunc =
            await fetch(
                API_FUNCIONARIOS +
                "listar.php"
            );

        const funcionarios =
            await resFunc.json();

        const funcionario =
            funcionarios.find(
                f =>
                f.id ==
                funcionarioId
            );

        if(!funcionario){

            conteudo.innerHTML =
                "<p>Funcionário não encontrado.</p>";

            return;

        }

        const resPonto =
            await fetch(

                API_PONTO +
                "listar.php?mes=" +
                mes

            );

        const pontos =
            await resPonto.json();

        const pontosFuncionario =
            pontos.filter(

                p =>
                p.funcionario_id ==
                funcionarioId

            );

        const feriados =
            feriadosSaoPaulo(ano);

        const totalDias =
            diasDoMes(
                ano,
                mes
            );

        let linhas = "";

        for(
            let dia = 1;
            dia <= totalDias;
            dia++
        ){

            const data =
                new Date(
                    ano,
                    mes - 1,
                    dia
                );

            const iso =
                dataISO(data);

            const pontoExistente =
                pontosFuncionario.find(

                    p =>
                    p.data_ponto ==
                    iso

                );

            const fimSemana =
                ehFimDeSemana(data);

            const feriado =
                feriados.includes(iso);

            let tipoDia =
                "normal";

            if(fimSemana){
                tipoDia =
                    "fim_de_semana";
            }

            if(feriado){
                tipoDia =
                    "feriado";
            }

            const classe =
                classeLinha(
                    pontoExistente,
                    tipoDia
                );

            const entrada =
                pontoExistente
                ?.horario_entrada ||

                funcionario
                .horario_entrada ||

                "";

            const saida =
                pontoExistente
                ?.horario_saida ||

                funcionario
                .horario_saida ||

                "";

            const falta =
                pontoExistente
                ?.falta == 1;

            const faltaAtestado =
                pontoExistente
                ?.falta_atestado == 1;

            const observacoes =
                pontoExistente
                ?.observacoes || "";

            if(tipoDia !== "normal"){

                linhas += `

                    <tr class="${classe}">

                        <td>
                            ${String(dia)
                                .padStart(2,"0")}/
                            ${String(mes)
                                .padStart(2,"0")}/
                            ${ano}
                        </td>

                        <td
                            colspan="6"
                            class="dia-nao-util"
                        >

                            ${
                                tipoDia ===
                                "fim_de_semana"

                                ?

                                "Fim de semana"

                                :

                                "Feriado"
                            }

                        </td>

                    </tr>

                `;

            }else{

                linhas += `

                    <tr class="${classe}">

                        <td>

                            ${String(dia)
                                .padStart(2,"0")}/
                            ${String(mes)
                                .padStart(2,"0")}/
                            ${ano}

                        </td>

                        <td>
                            Dia útil
                        </td>

                        <td>

                            <input
                                type="time"
                                id="entrada_${dia}"
                                value="${entrada}"
                            >

                        </td>

                        <td>

                            <input
                                type="time"
                                id="saida_${dia}"
                                value="${saida}"
                            >

                        </td>

                        <td>

                            <input
                                type="checkbox"
                                id="falta_${dia}"
                                ${
                                    falta
                                    ?
                                    "checked"
                                    :
                                    ""
                                }
                            >

                        </td>

                        <td>

                            <input
                                type="checkbox"
                                id="atestado_${dia}"
                                ${
                                    faltaAtestado
                                    ?
                                    "checked"
                                    :
                                    ""
                                }
                            >

                        </td>

                        <td>

                            <textarea

                                class="campo-observacao"

                                id="obs_${dia}"

                                placeholder="Observações..."

                            >${observacoes}</textarea>

                        </td>

                    </tr>

                `;

            }

        }

        conteudo.innerHTML = `

            <div class="card-funcionario">

                <h2>
                    ${funcionario.nome}
                </h2>

                <p>
                    <strong>Cargo:</strong>
                    ${funcionario.cargo}
                </p>

                <p>
                    <strong>Salário:</strong>
                    R$ ${funcionario.salario}
                </p>

                <p>
                    <strong>Horário padrão:</strong>

                    ${funcionario.horario_entrada}
                    às
                    ${funcionario.horario_saida}
                </p>

                <div class="tabela-wrapper">

                    <table class="tabela-ponto">

                        <thead>

                            <tr>

                                <th>Data</th>
                                <th>Tipo</th>
                                <th>Entrada</th>
                                <th>Saída</th>
                                <th>Falta</th>
                                <th>Atestado</th>
                                <th>Observações</th>

                            </tr>

                        </thead>

                        <tbody>

                            ${linhas}

                        </tbody>

                    </table>

                </div>

                <br>

                <button

                    class="btn-salvar-mes"

                    onclick="salvarTudo()"

                >

                    Salvar mês inteiro

                </button>

            </div>

        `;

    }catch(error){

        console.log(error);

        alert(
            "Erro ao carregar ponto."
        );

    }

}

async function salvarTudo(){

    try{

        const ano =
            parseInt(
                document
                .getElementById("ano")
                .value
            );

        const mes =
            parseInt(
                document
                .getElementById("mes")
                .value
            );

        const totalDias =
            diasDoMes(
                ano,
                mes
            );

        const feriados =
            feriadosSaoPaulo(ano);

        const resFunc =
            await fetch(
                API_FUNCIONARIOS +
                "listar.php"
            );

        const funcionarios =
            await resFunc.json();

        const funcionario =
            funcionarios.find(
                f =>
                f.id ==
                funcionarioId
            );

        if(!funcionario){

            alert(
                "Funcionário não encontrado."
            );

            return;

        }

        for(
            let dia = 1;
            dia <= totalDias;
            dia++
        ){

            const data =
                new Date(
                    ano,
                    mes - 1,
                    dia
                );

            const iso =
                dataISO(data);

            const fimSemana =
                ehFimDeSemana(data);

            const feriado =
                feriados.includes(iso);

            let tipoDia =
                "normal";

            if(fimSemana){
                tipoDia =
                    "fim_de_semana";
            }

            if(feriado){
                tipoDia =
                    "feriado";
            }

            if(tipoDia !== "normal"){
                continue;
            }

            const entrada =
                document
                .getElementById(
                    `entrada_${dia}`
                )
                .value;

            const saida =
                document
                .getElementById(
                    `saida_${dia}`
                )
                .value;

            const falta =
                document
                .getElementById(
                    `falta_${dia}`
                )
                .checked
                ? 1 : 0;

            const faltaAtestado =
                document
                .getElementById(
                    `atestado_${dia}`
                )
                .checked
                ? 1 : 0;

            const obs =
                document
                .getElementById(
                    `obs_${dia}`
                )
                .value;

            const calculo =
                calcularPonto(

                    funcionario,

                    entrada,

                    saida,

                    falta,

                    faltaAtestado

                );

            const dados = {

                funcionario_id:
                    funcionarioId,

                data_ponto:
                    iso,

                horario_entrada:
                    entrada,

                horario_saida:
                    saida,

                atraso_minutos:
                    calculo.atraso,

                hora_extra_minutos:
                    calculo.extra,

                valor_desconto:
                    calculo
                    .desconto
                    .toFixed(2),

                valor_extra:
                    calculo
                    .valorExtra
                    .toFixed(2),

                falta:
                    falta,

                falta_atestado:
                    faltaAtestado,

                tipo_dia:
                    tipoDia,

                observacoes:
                    obs

            };

            const response =
                await fetch(

                    API_PONTO +
                    "salvar.php",

                    {

                        method: "POST",

                        headers: {

                            "Content-Type":
                            "application/json"

                        },

                        body:
                            JSON.stringify(dados)

                    }

                );

            const resultado =
                await response.json();

            console.log(resultado);

            if(!resultado.success){

                alert(

                    "Erro ao salvar o dia " +
                    iso +
                    "\n" +
                    resultado.message +
                    "\n" +
                    (resultado.erro || "")

                );

                return;

            }

        }

        alert(
            "Ponto salvo com sucesso!"
        );

        carregarPonto();

    }catch(error){

        console.log(error);

        alert(
            "Erro ao salvar ponto."
        );

    }

}

carregarPonto();