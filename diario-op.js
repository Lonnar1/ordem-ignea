/* =====================================================================
   DIÁRIO POR SESSÕES
   - "Geral": anotações rápidas (é o texto antigo do diário, sem perder nada)
   - Sessões: cada uma é uma página própria com título e texto
   Dados da ficha: p.diario (Geral) e p.diarioSessoes [{id, titulo, texto, criado}]
   ===================================================================== */
let diarioSessoesOP = [];
let diarioAbaOP = "geral"; // "geral" ou id da sessão
let _fichaDiarioOP = null;

function _idSessaoDiarioOP() {
  return "s" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

function _sessaoAtualDiarioOP() {
  return diarioSessoesOP.find((s) => s.id === diarioAbaOP) || null;
}

function renderDiarioOP() {
  const raiz = document.getElementById("diarioOP");
  if (!raiz) return;

  if (diarioAbaOP !== "geral" && !_sessaoAtualDiarioOP()) diarioAbaOP = "geral";
  const sessao = _sessaoAtualDiarioOP();
  const geral = document.getElementById("diario");

  const aba = (id, rotulo) =>
    `<button type="button" class="diario-aba ${diarioAbaOP === id ? "ativa" : ""}" onclick="abrirAbaDiarioOP('${id}')" title="${esc(rotulo)}">${esc(rotulo)}</button>`;

  raiz.innerHTML = `
    <div class="diario-abas">
      ${aba("geral", "Geral")}
      ${diarioSessoesOP.map((s) => aba(s.id, s.titulo || "Sem título")).join("")}
      <button type="button" class="diario-aba diario-nova" onclick="novaSessaoDiarioOP()" title="Nova sessão">+ Sessão</button>
    </div>

    ${
      sessao
        ? `<div class="diario-cab">
            <input id="diarioTitulo" class="diario-titulo" type="text" maxlength="60" value="${esc(sessao.titulo)}" placeholder="Título da sessão" oninput="mudarTituloDiarioOP(this.value)" />
            <button type="button" class="diario-excluir" onclick="excluirSessaoDiarioOP()" title="Excluir sessão">Excluir</button>
          </div>
          <small class="diario-info">Criada em ${esc(sessao.criado || "")}</small>`
        : `<small class="diario-info">Anotações gerais: coisas rápidas que valem para a campanha toda.</small>`
    }

    <textarea id="diarioEditor" class="diario-editor"
      placeholder="${sessao ? "Escreva o que aconteceu nesta sessão: pistas, nomes, eventos…" : "Anotações gerais, lembretes, ideias…"}"
      oninput="digitarDiarioOP(this.value)"></textarea>`;

  const ed = document.getElementById("diarioEditor");
  if (ed) ed.value = sessao ? sessao.texto || "" : geral ? geral.value : "";

  // rola só a barra de abas (scrollIntoView mexia no layout da página inteira)
  const barra = raiz.querySelector(".diario-abas");
  const ativa = raiz.querySelector(".diario-aba.ativa");
  if (barra && ativa) {
    barra.scrollLeft = Math.max(0, ativa.offsetLeft - (barra.clientWidth - ativa.offsetWidth) / 2);
  }
}

function abrirAbaDiarioOP(id) {
  diarioAbaOP = id;
  renderDiarioOP();
  salvarTudo();
}

function digitarDiarioOP(valor) {
  const sessao = _sessaoAtualDiarioOP();
  if (sessao) sessao.texto = valor;
  else {
    const geral = document.getElementById("diario");
    if (geral) geral.value = valor;
  }
  salvarTudo();
}

function mudarTituloDiarioOP(valor) {
  const sessao = _sessaoAtualDiarioOP();
  if (!sessao) return;
  sessao.titulo = valor;
  // atualiza só o rótulo da aba, sem recriar a tela (para não perder o foco)
  const ativa = document.querySelector("#diarioOP .diario-aba.ativa");
  if (ativa) { ativa.textContent = valor || "Sem título"; ativa.title = valor; }
  salvarTudo();
}

function novaSessaoDiarioOP() {
  const n = diarioSessoesOP.length + 1;
  const hoje = new Date().toLocaleDateString("pt-BR");
  const nova = { id: _idSessaoDiarioOP(), titulo: `Sessão ${n}`, texto: "", criado: hoje };
  diarioSessoesOP.push(nova);
  diarioAbaOP = nova.id;
  renderDiarioOP();
  const t = document.getElementById("diarioEditor");
  if (t) { try { t.focus({ preventScroll: true }); } catch (e) { t.focus(); } }
  salvarTudo();
}

async function excluirSessaoDiarioOP() {
  const sessao = _sessaoAtualDiarioOP();
  if (!sessao) return;
  const temTexto = (sessao.texto || "").trim().length > 0;
  const ok = await confirmBonito(
    temTexto ? `Excluir "${sessao.titulo || "esta sessão"}" e tudo que está escrito nela?` : `Excluir "${sessao.titulo || "esta sessão"}"?`,
  );
  if (!ok) return;
  diarioSessoesOP = diarioSessoesOP.filter((s) => s.id !== sessao.id);
  diarioAbaOP = "geral";
  renderDiarioOP();
  salvarTudo();
}

/* ---------------- persistência ---------------- */
function carregarDiarioOP(p) {
  _fichaDiarioOP = p;
  diarioSessoesOP = Array.isArray(p.diarioSessoes)
    ? p.diarioSessoes.map((s) => ({ id: s.id || _idSessaoDiarioOP(), titulo: s.titulo || "", texto: s.texto || "", criado: s.criado || "" }))
    : [];
  diarioAbaOP = p.diarioAbaOP || "geral";
  renderDiarioOP();
}

function salvarDiarioOP(p) {
  // não grava antes de a ficha ter sido carregada (evita apagar o que já estava salvo)
  if (_fichaDiarioOP !== p) return;
  p.diarioSessoes = diarioSessoesOP.map((s) => ({ ...s }));
  p.diarioAbaOP = diarioAbaOP;
}

function _iniciarDiarioOP() {
  renderDiarioOP();
}
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", _iniciarDiarioOP);
else _iniciarDiarioOP();