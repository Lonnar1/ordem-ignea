/* =====================================================================
   REGRAS-OP.JS  ·  Progressão automática (Etapas 1–3)
   - dados de regras SEPARADOS do motor (editáveis em "Editar regras")
   - motor: calcula PV / PE / SAN máximos e PE por turno a partir de
     classe + NEX + atributos + bônus extras
   - prévia de evolução ao subir o NEX, com opção de desfazer
   Os valores padrão abaixo seguem o livro básico de Ordem Paranormal RPG,
   mas CONFIRA com o seu livro: tudo pode ser editado no botão "Editar regras".
   ===================================================================== */

const REGRAS_OP_PADRAO = {
  versao: 1,
  nome: "Padrão (conferir com o livro)",

  /* PV  = base + VIG + (nível-1) × (porNex + VIG)
     PE  = base + PRE + (nível-1) × (porNex + PRE)
     SAN = base        + (nível-1) × porNex
     nível = NEX ÷ 5  (NEX 99% / 100% = nível 20) */
  classes: {
    combatente:   { nome: "Combatente",   pv: { base: 20, porNex: 4 }, pe: { base: 2, porNex: 2 }, san: { base: 12, porNex: 3 },
                    ataqueEspecial: [ { nex: 5, pe: 2, bonus: 5 }, { nex: 25, pe: 3, bonus: 10 }, { nex: 55, pe: 4, bonus: 15 }, { nex: 85, pe: 5, bonus: 20 } ] },
    especialista: { nome: "Especialista", pv: { base: 16, porNex: 3 }, pe: { base: 3, porNex: 3 }, san: { base: 16, porNex: 4 } },
    ocultista:    { nome: "Ocultista",    pv: { base: 12, porNex: 2 }, pe: { base: 4, porNex: 4 }, san: { base: 20, porNex: 5 } },
  },

  /* limite de PE gasto por turno = NEX ÷ 5 (mínimo 1) */
  peTurnoDivisor: 5,

  /* marcos específicos por classe (Tabela de progressão do livro). Quem não tiver usa "marcos". */
  marcosPorClasse: {
    combatente: [
      { nex: 5,  tipo: "ataque",   texto: "Ataque Especial: 2 PE para +5 no ataque ou dano" },
      { nex: 10, tipo: "trilha",   texto: "Escolha sua trilha e receba a 1ª habilidade dela" },
      { nex: 15, tipo: "poder",    texto: "Poder de Combatente" },
      { nex: 20, tipo: "atributo", texto: "+1 em um atributo" },
      { nex: 25, tipo: "ataque",   texto: "Ataque Especial: 3 PE para +10" },
      { nex: 30, tipo: "poder",    texto: "Poder de Combatente" },
      { nex: 35, tipo: "grau",     texto: "Perícias podem subir para grau Veterano" },
      { nex: 40, tipo: "trilha",   texto: "2ª habilidade da trilha" },
      { nex: 45, tipo: "poder",    texto: "Poder de Combatente" },
      { nex: 50, tipo: "atributo", texto: "+1 em um atributo e Versatilidade (um poder de Combatente ou o 1º poder de outra trilha)" },
      { nex: 50, tipo: "poder",    texto: "Poder da Versatilidade" },
      { nex: 55, tipo: "ataque",   texto: "Ataque Especial: 4 PE para +15" },
      { nex: 60, tipo: "poder",    texto: "Poder de Combatente" },
      { nex: 65, tipo: "trilha",   texto: "3ª habilidade da trilha" },
      { nex: 70, tipo: "grau",     texto: "Perícias podem subir para grau Expert" },
      { nex: 75, tipo: "poder",    texto: "Poder de Combatente" },
      { nex: 80, tipo: "atributo", texto: "+1 em um atributo" },
      { nex: 85, tipo: "ataque",   texto: "Ataque Especial: 5 PE para +20" },
      { nex: 90, tipo: "poder",    texto: "Poder de Combatente" },
      { nex: 95, tipo: "atributo", texto: "+1 em um atributo" },
      { nex: 99, tipo: "trilha",   texto: "Habilidade final da trilha" },
    ],
  },

  /* marcos de NEX genéricos (usados quando a classe não tem tabela própria). Editável. */
  marcos: [
    { nex: 10, tipo: "trilha",    texto: "Escolha sua trilha e receba a 1ª habilidade dela" },
    { nex: 20, tipo: "atributo",  texto: "+1 em um atributo" },
    { nex: 35, tipo: "grau",      texto: "Perícias podem subir para grau Veterano" },
    { nex: 40, tipo: "trilha",    texto: "2ª habilidade da trilha" },
    { nex: 50, tipo: "atributo",  texto: "+1 em um atributo" },
    { nex: 65, tipo: "trilha",    texto: "3ª habilidade da trilha" },
    { nex: 70, tipo: "grau",      texto: "Perícias podem subir para grau Expert" },
    { nex: 80, tipo: "atributo",  texto: "+1 em um atributo" },
    { nex: 95, tipo: "atributo",  texto: "+1 em um atributo" },
    { nex: 99, tipo: "trilha",    texto: "Habilidade final da trilha" },
  ],
};

/* ---------------- estado ---------------- */
let autoRecursosOP = false;
let bonusRecursosOP = { pv: 0, pe: 0, san: 0 };
let regrasOPCustom = null;      // regras editadas pelo usuário (ficha)
let nexAnteriorOP = null;       // para detectar evolução
let _desfazerEvolucaoOP = null; // snapshot para desfazer

/* ---------------- dados ---------------- */
function obterRegrasOP() {
  return regrasOPCustom && regrasOPCustom.classes ? regrasOPCustom : REGRAS_OP_PADRAO;
}

function _numOP(v, padrao = 0) {
  const n = Number(v);
  return Number.isFinite(n) ? n : padrao;
}

function validarRegrasOP(r) {
  if (!r || typeof r !== "object") return "O JSON precisa ser um objeto.";
  if (!r.classes || typeof r.classes !== "object") return 'Falta o campo "classes".';

  for (const [chave, c] of Object.entries(r.classes)) {
    for (const rec of ["pv", "pe", "san"]) {
      if (!c[rec] || !Number.isFinite(Number(c[rec].base)) || !Number.isFinite(Number(c[rec].porNex)))
        return `Classe "${chave}": "${rec}" precisa de "base" e "porNex" numéricos.`;
    }
  }
  if (r.marcos && !Array.isArray(r.marcos)) return '"marcos" precisa ser uma lista.';
  (r.marcos || []).forEach(() => {});
  return null;
}

/* ---------------- motor ---------------- */
function nivelPorNexOP(nex) {
  const n = _numOP(nex);
  return Math.max(1, Math.min(20, Math.floor(n / 5)));
}

function calcularRecursosOP(classe, nex, attrs, bonus = bonusRecursosOP, regras = obterRegrasOP()) {
  const c = regras.classes?.[classe];
  if (!c) return null;

  const nivel = nivelPorNexOP(nex);
  const vig = _numOP(attrs.vigor);
  const pre = _numOP(attrs.presenca);
  const passos = nivel - 1;

  const ef = typeof somarEfeitosCatalogoOP === "function" ? somarEfeitosCatalogoOP(nivel) : { pv: 0, pe: 0, san: 0 };

  const pv = _numOP(c.pv.base) + vig + passos * (_numOP(c.pv.porNex) + vig) + _numOP(bonus?.pv) + ef.pv;
  const pe = _numOP(c.pe.base) + pre + passos * (_numOP(c.pe.porNex) + pre) + _numOP(bonus?.pe) + ef.pe;
  const san = _numOP(c.san.base) + passos * _numOP(c.san.porNex) + _numOP(bonus?.san) + ef.san;
  const peTurno = Math.max(1, Math.round(_numOP(nex) / _numOP(regras.peTurnoDivisor, 5)));

  return { nivel, pv, pe, san, peTurno, efeitos: ef };
}

function marcosDaClasseOP(classe, regras = obterRegrasOP()) {
  return (regras.marcosPorClasse && regras.marcosPorClasse[classe]) || regras.marcos || [];
}

function marcosEntreOP(nexAntigo, nexNovo, regras = obterRegrasOP(), classe = "") {
  return marcosDaClasseOP(classe, regras)
    .filter((m) => _numOP(m.nex) > _numOP(nexAntigo) && _numOP(m.nex) <= _numOP(nexNovo))
    .sort((a, b) => a.nex - b.nex);
}

function proximoMarcoOP(nex, regras = obterRegrasOP(), classe = "") {
  return marcosDaClasseOP(classe, regras)
    .filter((m) => _numOP(m.nex) > _numOP(nex))
    .sort((a, b) => a.nex - b.nex)[0] || null;
}

function ataqueEspecialOP(classe, nex, regras = obterRegrasOP()) {
  const lista = regras.classes?.[classe]?.ataqueEspecial || [];
  return lista.filter((a) => _numOP(a.nex) <= _numOP(nex)).sort((a, b) => b.nex - a.nex)[0] || null;
}

function _atributosAtuaisOP() {
  return {
    vigor: get("vigor"),
    presenca: get("presenca"),
  };
}

function _estadoAtualOP() {
  return {
    classe: document.getElementById("classeOP")?.value || "",
    nex: _numOP(document.getElementById("nex")?.value),
  };
}

/* ---------------- aplicar na ficha ---------------- */
function _snapshotRecursosOP() {
  return {
    nex: document.getElementById("nex")?.value,
    vidaMax: document.getElementById("vidaMax")?.value,
    sanMaxOP: document.getElementById("sanMaxOP")?.value,
    peMaxOP: document.getElementById("peMaxOP")?.value,
    pePorTurno: document.getElementById("pePorTurno")?.value,
    vidaAtual,
    sanAtual,
    peAtual,
  };
}

function aplicarRecursosAutomaticosOP() {
  if (!autoRecursosOP) return null;

  const { classe, nex } = _estadoAtualOP();
  const r = calcularRecursosOP(classe, nex, _atributosAtuaisOP());
  if (!r) return null;

  const set = (id, v) => {
    const el = document.getElementById(id);
    if (el) el.value = v;
  };

  set("vidaMax", r.pv);
  set("sanMaxOP", r.san);
  set("peMaxOP", r.pe);
  set("pePorTurno", r.peTurno);

  // reaproveita a lógica existente ("barra cheia continua cheia", limites, salvar)
  if (typeof mudarMaxRecursoOP === "function") {
    mudarMaxRecursoOP("san");
    mudarMaxRecursoOP("pe");
  }
  if (typeof mudarMaxVida === "function") mudarMaxVida();
  else if (typeof salvarTudo === "function") salvarTudo();

  atualizarResumoAutoOP();
  return r;
}

/* ---------------- interface ---------------- */
function _textoMarcoOP(m) {
  const icone = { atributo: "⬆️", trilha: "🧭", grau: "🎓", poder: "✨", ritual: "📜", ataque: "⚔️" }[m.tipo] || "•";
  return `${icone} <b>NEX ${m.nex}%</b> — ${esc(m.texto)}`;
}

function atualizarResumoAutoOP() {
  const box = document.getElementById("opAutoResumo");
  if (!box) return;

  const { classe, nex } = _estadoAtualOP();
  const regras = obterRegrasOP();
  const c = regras.classes?.[classe];

  if (!c) {
    box.innerHTML = `<span class="op-auto-aviso">Escolha uma classe para calcular.</span>`;
    return;
  }

  const r = calcularRecursosOP(classe, nex, _atributosAtuaisOP());
  const prox = proximoMarcoOP(nex, obterRegrasOP(), classe);
  const ae = ataqueEspecialOP(classe, nex);
  const trilha = typeof buscarTrilhaOP === "function" ? buscarTrilhaOP(trilhaOP) : null;

  box.innerHTML = `
    <div class="op-auto-linha"><b>${esc(c.nome)}</b>${trilha ? ` · ${esc(trilha.nome)}` : ""} · NEX ${nex}% · nível ${r.nivel}</div>
    <div class="op-auto-chips">
      <span>❤️ PV ${r.pv}</span><span>⚡ PE ${r.pe}</span><span>🧠 SAN ${r.san}</span><span>🎯 ${r.peTurno} PE/turno</span>
      ${ae ? `<span>⚔️ Ataque Especial: ${ae.pe} PE → +${ae.bonus}</span>` : ""}
    </div>
    ${prox ? `<div class="op-auto-prox">Próximo: ${_textoMarcoOP(prox)}</div>` : ""}
  `;
}

function montarPainelAutoOP() {
  if (document.getElementById("opAutoBox")) return;
  const ref = document.querySelector(".op-identidade-linha");
  if (!ref) return;

  const box = document.createElement("div");
  box.id = "opAutoBox";
  box.className = "op-auto-box";
  box.innerHTML = `
    <label class="op-auto-toggle">
      <input type="checkbox" id="autoRecursosOP" onchange="alternarAutoOP(this.checked)" />
      <span>Calcular PV, PE e SAN automaticamente</span>
    </label>

    <div id="opAutoResumo" class="op-auto-resumo"></div>

    <details class="op-auto-extras">
      <summary>Bônus extras e regras</summary>
      <div class="op-auto-grid">
        <label>PV extra <input id="bonusPvOP" type="number" step="1" value="0" oninput="mudarBonusOP()" /></label>
        <label>PE extra <input id="bonusPeOP" type="number" step="1" value="0" oninput="mudarBonusOP()" /></label>
        <label>SAN extra <input id="bonusSanOP" type="number" step="1" value="0" oninput="mudarBonusOP()" /></label>
      </div>
      <small class="op-auto-dica">Use os extras para poderes e itens que aumentam o máximo.</small>
      <button type="button" class="op-auto-editar" onclick="abrirEditorRegrasOP()">Editar regras</button>
    </details>
  `;
  ref.insertAdjacentElement("afterend", box);
  atualizarPainelAutoOP();
}

function atualizarPainelAutoOP() {
  const chk = document.getElementById("autoRecursosOP");
  if (chk) chk.checked = !!autoRecursosOP;
  const set = (id, v) => { const el = document.getElementById(id); if (el) el.value = v || 0; };
  set("bonusPvOP", bonusRecursosOP.pv);
  set("bonusPeOP", bonusRecursosOP.pe);
  set("bonusSanOP", bonusRecursosOP.san);
  atualizarResumoAutoOP();
}

async function alternarAutoOP(ligado) {
  if (!ligado) {
    autoRecursosOP = false;
    atualizarResumoAutoOP();
    salvarTudo();
    return;
  }

  const { classe, nex } = _estadoAtualOP();
  const r = calcularRecursosOP(classe, nex, _atributosAtuaisOP());

  if (!r) {
    document.getElementById("autoRecursosOP").checked = false;
    alertBonito("Escolha uma classe antes de ativar o cálculo automático.");
    return;
  }

  const atual = (id) => document.getElementById(id)?.value || 0;
  const ok = await confirmBonito(
    `Ativar o cálculo automático? Os máximos serão substituídos: PV ${atual("vidaMax")} → ${r.pv}, PE ${atual("peMaxOP")} → ${r.pe}, SAN ${atual("sanMaxOP")} → ${r.san}, PE/turno ${atual("pePorTurno")} → ${r.peTurno}.`,
  );

  if (!ok) {
    document.getElementById("autoRecursosOP").checked = false;
    return;
  }

  autoRecursosOP = true;
  aplicarRecursosAutomaticosOP();
  salvarTudo();
}

function mudarBonusOP() {
  const n = (id) => _numOP(document.getElementById(id)?.value);
  bonusRecursosOP = { pv: n("bonusPvOP"), pe: n("bonusPeOP"), san: n("bonusSanOP") };
  if (autoRecursosOP) aplicarRecursosAutomaticosOP();
  else atualizarResumoAutoOP();
  salvarTudo();
}

/* ---------------- evolução: resumo + desfazer ---------------- */
function aoMudarNexOP(antigo, novo, antes) {
  const { classe } = _estadoAtualOP();
  const regras = obterRegrasOP();
  const depois = calcularRecursosOP(classe, novo, _atributosAtuaisOP());
  if (!depois) return;

  const antesCalc = {
    nivel: nivelPorNexOP(antigo),
    pv: _numOP(antes.vidaMax),
    pe: _numOP(antes.peMaxOP),
    san: _numOP(antes.sanMaxOP),
    peTurno: _numOP(antes.pePorTurno),
  };

  const marcos = marcosEntreOP(antigo, novo, regras, classe);

  // habilidades de trilha recebidas automaticamente
  const trilha = typeof buscarTrilhaOP === "function" ? buscarTrilhaOP(trilhaOP) : null;
  const novasHab = trilha
    ? (trilha.habilidades || []).filter((h) => _numOP(h.nex) > _numOP(antigo) && _numOP(h.nex) <= _numOP(novo))
    : [];
  const trilhaPendente = !trilha && marcos.some((m) => m.tipo === "trilha");

  const linha = (nome, a, d) =>
    `<div class="evo-linha"><span>${nome}</span><span>${a} <i>→</i> <b>${d}</b>${d > a ? ` <em>(+${d - a})</em>` : ""}</span></div>`;

  const html = `
    <div class="popup-bloco evo-popup">
      <div class="evo-titulo">NEX ${antigo}% → ${novo}% <small>(nível ${antesCalc.nivel} → ${depois.nivel})</small></div>

      <div class="evo-bloco">
        ${linha("❤️ PV máximo", antesCalc.pv, depois.pv)}
        ${linha("⚡ PE máximo", antesCalc.pe, depois.pe)}
        ${linha("🧠 SAN máxima", antesCalc.san, depois.san)}
        ${linha("🎯 PE por turno", antesCalc.peTurno, depois.peTurno)}
      </div>

      ${
        novasHab.length
          ? `<div class="evo-bloco">
              <div class="evo-sub">Recebido automaticamente (${esc(trilha.nome)})</div>
              ${novasHab.map((h) => `<div class="evo-marco">🧭 <b>${esc(h.nome)}</b> — ${esc(h.resumo || "")}</div>`).join("")}
            </div>`
          : ""
      }

      ${
        marcos.length || trilhaPendente
          ? `<div class="evo-bloco">
              <div class="evo-sub">Escolhas e ganhos desta evolução</div>
              ${marcos.map((m) => `<div class="evo-marco">${_textoMarcoOP(m)}</div>`).join("")}
              ${trilhaPendente ? `<div class="evo-marco evo-alerta">⚠️ Escolha sua trilha no seletor "Trilha" para receber as habilidades.</div>` : ""}
              ${marcos.some((m) => m.tipo === "poder") ? `<div class="evo-marco evo-alerta">✨ Abra o "Catálogo de poderes" na aba de poderes para escolher.</div>` : ""}
              <small class="evo-dica">Atributos, perícias e a escolha de poderes continuam sendo seus.</small>
            </div>`
          : ""
      }

      <button type="button" class="evo-desfazer" onclick="desfazerEvolucaoOP()">Desfazer evolução</button>
    </div>`;

  _desfazerEvolucaoOP = antes;
  abrirPopup("Evolução aplicada", html, true);
}

function desfazerEvolucaoOP() {
  const s = _desfazerEvolucaoOP;
  if (!s) return;

  const set = (id, v) => { const el = document.getElementById(id); if (el && v !== undefined) el.value = v; };
  set("nex", s.nex);
  set("vidaMax", s.vidaMax);
  set("sanMaxOP", s.sanMaxOP);
  set("peMaxOP", s.peMaxOP);
  set("pePorTurno", s.pePorTurno);

  vidaAtual = s.vidaAtual;
  sanAtual = s.sanAtual;
  peAtual = s.peAtual;

  nexAnteriorOP = _numOP(s.nex);
  _desfazerEvolucaoOP = null;

  if (typeof sincronizarTrilhaOP === "function") sincronizarTrilhaOP();
  if (typeof atualizarContadorPoderesClasseOP === "function") atualizarContadorPoderesClasseOP();
  if (typeof atualizarHP === "function") atualizarHP();
  if (typeof atualizarRecursosOP === "function") atualizarRecursosOP();
  atualizarResumoAutoOP();
  salvarTudo();
  fecharPopup();
}

/* ---------------- eventos ---------------- */
function _aoMudarClasseOuNexOP(evento) {
  const nexNovo = _numOP(document.getElementById("nex")?.value);
  const sync = () => {
    if (typeof sincronizarTrilhaOP === "function") sincronizarTrilhaOP();
    if (typeof atualizarContadorPoderesClasseOP === "function") atualizarContadorPoderesClasseOP();
  };

  if (evento === "nex" && autoRecursosOP && nexAnteriorOP !== null && nexNovo > nexAnteriorOP) {
    const antes = _snapshotRecursosOP();
    antes.nex = String(nexAnteriorOP);
    const antigo = nexAnteriorOP;
    sync();
    aplicarRecursosAutomaticosOP();
    aoMudarNexOP(antigo, nexNovo, antes);
  } else {
    sync();
    aplicarRecursosAutomaticosOP();
    atualizarResumoAutoOP();
  }

  if (evento === "nex") {
    nexAnteriorOP = nexNovo;
    salvarTudo();
  }
}

/* chamado quando um poder é adicionado/removido (efeitos automáticos) */
function aoMudarPoderesOP() {
  aplicarRecursosAutomaticosOP();
  atualizarResumoAutoOP();
  if (typeof atualizarContadorPoderesClasseOP === "function") atualizarContadorPoderesClasseOP();
}

function _ligarEventosOP() {
  document.getElementById("classeOP")?.addEventListener("change", () => _aoMudarClasseOuNexOP("classe"));
  document.getElementById("nex")?.addEventListener("change", () => _aoMudarClasseOuNexOP("nex"));
  ["vigor", "presenca"].forEach((id) =>
    document.getElementById(id)?.addEventListener("input", () => {
      aplicarRecursosAutomaticosOP();
      atualizarResumoAutoOP();
    }),
  );
}

/* ---------------- editor de regras ---------------- */
function abrirEditorRegrasOP() {
  const base = typeof obterCatalogoOP === "function" ? { ...obterRegrasOP(), catalogo: obterCatalogoOP() } : obterRegrasOP();
  const atual = JSON.stringify(base, null, 2);
  const html = `
    <div class="popup-bloco">
      <small class="evo-dica">Edite classes, fórmulas e marcos de NEX. Salvar guarda as regras nesta ficha.</small>
      <textarea id="regrasOPTexto" class="regras-json" spellcheck="false">${esc(atual)}</textarea>
      <div id="regrasOPErro" class="regras-erro"></div>
      <div class="regras-acoes">
        <button type="button" onclick="salvarEditorRegrasOP()">Salvar regras</button>
        <button type="button" onclick="restaurarRegrasPadraoOP()">Restaurar padrão</button>
        <button type="button" onclick="exportarRegrasOP()">Exportar</button>
      </div>
    </div>`;
  abrirPopup("Regras de progressão", html, true);
}

function salvarEditorRegrasOP() {
  const txt = document.getElementById("regrasOPTexto")?.value || "";
  const erro = document.getElementById("regrasOPErro");
  let obj;

  try {
    obj = JSON.parse(txt);
  } catch (e) {
    if (erro) erro.textContent = "JSON inválido: " + e.message;
    return;
  }

  const problema = validarRegrasOP(obj);
  if (problema) {
    if (erro) erro.textContent = problema;
    return;
  }

  if (obj.catalogo) {
    if (!Array.isArray(obj.catalogo.trilhas) || !Array.isArray(obj.catalogo.poderes)) {
      if (erro) erro.textContent = 'O "catalogo" precisa ter as listas "trilhas" e "poderes".';
      return;
    }
    if (typeof CATALOGO_OP_PADRAO !== "undefined" && JSON.stringify(obj.catalogo) === JSON.stringify(CATALOGO_OP_PADRAO)) {
      delete obj.catalogo; // igual ao padrão: não precisa gravar na ficha
    }
  }

  regrasOPCustom = obj;
  if (typeof sincronizarTrilhaOP === "function") sincronizarTrilhaOP();
  if (typeof atualizarSeletorTrilhaOP === "function") atualizarSeletorTrilhaOP();
  aplicarRecursosAutomaticosOP();
  atualizarResumoAutoOP();
  salvarTudo();
  fecharPopup();
}

async function restaurarRegrasPadraoOP() {
  if (!(await confirmBonito("Voltar para as regras padrão? As suas edições serão perdidas."))) return;
  regrasOPCustom = null;
  if (typeof atualizarSeletorTrilhaOP === "function") atualizarSeletorTrilhaOP();
  aplicarRecursosAutomaticosOP();
  atualizarResumoAutoOP();
  salvarTudo();
  abrirEditorRegrasOP();
}

function exportarRegrasOP() {
  const blob = new Blob([JSON.stringify(obterRegrasOP(), null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "regras-ordem-paranormal.json";
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

/* ---------------- ligação com salvar / carregar da ficha ---------------- */
function carregarOP(p) {
  autoRecursosOP = !!p.autoRecursosOP;
  bonusRecursosOP = { pv: 0, pe: 0, san: 0, ...(p.bonusRecursosOP || {}) };
  regrasOPCustom = p.regrasOP && !validarRegrasOP(p.regrasOP) ? p.regrasOP : null;
  nexAnteriorOP = _numOP(p.nex, 5);
  _desfazerEvolucaoOP = null;
  if (typeof carregarTrilhaOP === "function") carregarTrilhaOP(p);
  atualizarPainelAutoOP();
}

function salvarOP(p) {
  p.autoRecursosOP = !!autoRecursosOP;
  p.bonusRecursosOP = { ...bonusRecursosOP };
  p.regrasOP = regrasOPCustom || null;
  if (typeof salvarTrilhaOP === "function") salvarTrilhaOP(p);
}

function _iniciarRegrasOP() {
  montarPainelAutoOP();
  _ligarEventosOP();
}

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", _iniciarRegrasOP);
else _iniciarRegrasOP();