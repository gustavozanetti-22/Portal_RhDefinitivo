const API_FUNCIONARIOS = "api/funcionarios/";
const API_PONTO = "api/ponto/";

const lista = document.getElementById("lista-funcionarios");
const btnCarregar = document.getElementById("btn-carregar");

btnCarregar.addEventListener("click", carregarFuncionarios);

function formatarMoeda(valor) {
    return Number(valor).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function calcularResumo(funcionario, pontos) {
    const salario = parseFloat(funcionario.salario || 0);

    let totalAtraso = 0;
    let totalExtra = 0;
    let totalFaltas = 0;
    let totalDesconto = 0;
    let totalAdicional = 0;

    pontos.forEach(ponto => {
        const atraso = parseInt(ponto.atraso_minutos || 0);
        const extra = parseInt(ponto.hora_extra_minutos || 0);
        const falta = parseInt(ponto.falta || 0);
        const atestado = parseInt(ponto.falta_atestado || 0);

        if (atestado === 1) {
            return;
        }

        totalAtraso += atraso;
        totalExtra += extra;

        if (falta === 1) {
            totalFaltas++;
        }

        totalDesconto += parseFloat(ponto.valor_desconto || 0);
        totalAdicional += parseFloat(ponto.valor_extra || 0);
    });

    const totalPagar = salario - totalDesconto + totalAdicional;

    return {
        totalAtraso,
        totalExtra,
        totalFaltas,
        totalDesconto,
        totalAdicional,
        totalPagar
    };
}

async function carregarFuncionarios() {
    try {
        const ano = document.getElementById("ano").value;
        const mes = document.getElementById("mes").value;

        const resFuncionarios = await fetch(API_FUNCIONARIOS + "listar.php");
        const funcionarios = await resFuncionarios.json();

        const resPonto = await fetch(
            API_PONTO + "listar.php?ano=" + ano + "&mes=" + mes
        );

        const pontos = await resPonto.json();

        lista.innerHTML = "";

        funcionarios.forEach(funcionario => {
            const pontosFuncionario = pontos.filter(p =>
                p.funcionario_id == funcionario.id
            );

            const resumo = calcularResumo(funcionario, pontosFuncionario);

            lista.innerHTML += `
                <div class="card-funcionario card-resumo-ponto">

                    <div>
                        <h2>${funcionario.nome}</h2>
                        <p><strong>Cargo:</strong> ${funcionario.cargo}</p>
                        <p><strong>Salário base:</strong> ${formatarMoeda(funcionario.salario)}</p>
                        <p><strong>Horário:</strong> ${funcionario.horario_entrada} às ${funcionario.horario_saida}</p>
                    </div>

                    <div class="resumo-grid">
                        <div class="resumo-item">
                            <span>Atraso</span>
                            <strong>${resumo.totalAtraso} min</strong>
                        </div>

                        <div class="resumo-item">
                            <span>Hora extra</span>
                            <strong>${resumo.totalExtra} min</strong>
                        </div>

                        <div class="resumo-item">
                            <span>Faltas</span>
                            <strong>${resumo.totalFaltas}</strong>
                        </div>

                        <div class="resumo-item desconto">
                            <span>Descontos</span>
                            <strong>${formatarMoeda(resumo.totalDesconto)}</strong>
                        </div>

                        <div class="resumo-item extra">
                            <span>Adicionais</span>
                            <strong>${formatarMoeda(resumo.totalAdicional)}</strong>
                        </div>

                        <div class="resumo-item total">
                            <span>Total a pagar</span>
                            <strong>${formatarMoeda(resumo.totalPagar)}</strong>
                        </div>
                    </div>

                    <button onclick="window.location.href='ponto_funcionario.php?id=${funcionario.id}'">
                        Abrir ponto
                    </button>

                </div>
            `;
        });

    } catch (error) {
        console.error(error);
        alert("Erro ao carregar funcionários.");
    }
}

carregarFuncionarios();