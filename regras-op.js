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
    combatente: {
      nome: "Combatente",
      pv: { base: 20, porNex: 4 }, pe: { base: 2, porNex: 2 }, san: { base: 12, porNex: 3 },
      escalonados: [
        { nome: "Ataque Especial", etapas: [
          { nex: 5, texto: "2 PE → +5" }, { nex: 25, texto: "3 PE → +10" },
          { nex: 55, texto: "4 PE → +15" }, { nex: 85, texto: "5 PE → +20" } ] },
      ],
    },
    especialista: {
      nome: "Especialista",
      pv: { base: 16, porNex: 3 }, pe: { base: 3, porNex: 3 }, san: { base: 16, porNex: 4 },
      escalonados: [
        { nome: "Perito", etapas: [
          { nex: 5, texto: "2 PE → +1d6" }, { nex: 25, texto: "3 PE → +1d8" },
          { nex: 55, texto: "4 PE → +1d10" }, { nex: 85, texto: "5 PE → +1d12" } ] },
        { nome: "Engenhosidade", etapas: [
          { nex: 40, texto: "Eclético: +2 PE → veterano" }, { nex: 75, texto: "Eclético: +4 PE → expert" } ] },
      ],
    },
    ocultista: {
      nome: "Ocultista",
      pv: { base: 12, porNex: 2 }, pe: { base: 4, porNex: 4 }, san: { base: 20, porNex: 5 },
      escalonados: [
        { nome: "Rituais", etapas: [
          { nex: 5, texto: "até o 1º círculo" }, { nex: 25, texto: "até o 2º círculo" },
          { nex: 55, texto: "até o 3º círculo" }, { nex: 85, texto: "até o 4º círculo" } ] },
      ],
    },
  },

  /* Regra opcional "Separando nível e NEX" (Sobrevivendo ao Horror, p. 98-103).
     Alterações por exposição ao paranormal (NEX). Resumos: o texto completo está no livro.
     "dados" = dados de penalidade/bônus em testes. */
  alteracoesNex: {
    geral: [
      { nex: 25, texto: "Pode testar Ocultismo sem treino (se for treinado, +2). Sofre -5 em uma perícia à escolha entre Diplomacia, Enganação ou Intimidação." },
      { nex: 35, texto: "Escolha um atributo (exceto Presença): some-o ao total de PE. Sofre -5 em uma perícia à escolha entre Atletismo, Fortitude ou Reflexos." },
      { nex: 50, texto: "Na próxima vez em que Transcender, desenvolve afinidade com um elemento (Conhecimento, Energia, Morte ou Sangue) e passa a receber as alterações dele." },
    ],
    elementos: {
      sangue: { nome: "Sangue", etapas: [
        { nex: 60, texto: "+1 dado em Sobrevivência e imunidade a calor e frio extremos, mas não pode mais escolher 10 em testes." },
        { nex: 75, texto: "Pode conjurar Aprimorar Físico apenas em si (custo -1 PE se já conhece). Sofre -1 dado em Ciências, Medicina e Tecnologia." },
        { nex: 90, texto: "A penalidade do NEX 75% sobe para -2 dados. Pode conjurar Forma Monstruosa (-1 PE se já conhece); gastando +2 PE, elimina as penalidades de Sangue enquanto durar." },
      ] },
      morte: { nome: "Morte", etapas: [
        { nex: 60, texto: "+1 dado em Iniciativa e Reflexos, mas -1 dado em Diplomacia e Intuição." },
        { nex: 75, texto: "Pode conjurar Velocidade Mortal (-1 PE se já conhece). A penalidade sobe para -2 dados e passa a incluir Enganação e Intimidação." },
        { nex: 90, texto: "Não pode ser surpreendido e, em cenas por rodadas, pode esperar quem tem Iniciativa menor declarar as ações antes de agir. Na primeira interação social de cada cena, perde 3 PE." },
      ] },
      conhecimento: { nome: "Conhecimento", etapas: [
        { nex: 60, texto: "Enxerga auras paranormais (como Terceiro Olho; -1 PE no ritual se já conhece), mas fica permanentemente ofuscado." },
        { nex: 75, texto: "Percebe perigos como Detecção de Ameaças (-1 PE se já conhece). A penalidade de ofuscado sobe para -2 dados." },
        { nex: 90, texto: "Fora da escuridão, fica cego em vez de ofuscado. Pode conjurar Vidência sem superfície reflexiva (-1 PE se já conhece)." },
      ] },
      energia: { nome: "Energia", etapas: [
        { nex: 60, texto: "Pode conjurar Coincidência Forçada (-1 PE se já conhece). No início de cada cena, rola 1d6 para um efeito colateral caótico (tabela no livro, p. 102)." },
        { nex: 75, texto: "Os efeitos colaterais pioram. Pode conjurar Tela de Ruído (-1 PE se já conhece)." },
        { nex: 90, texto: "Efeitos ainda mais caóticos. Pode conjurar Salto Fantasma (-1 PE se já conhece), não precisa mais falar para conjurar e ganha +2 na DT ao digitar o ritual em dispositivo eletrônico." },
      ] },
    },
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
    especialista: [
      { nex: 5,  tipo: "ataque",   texto: "Eclético e Perito: 2 PE → +1d6 em perícia treinada escolhida" },
      { nex: 10, tipo: "trilha",   texto: "Escolha sua trilha e receba a 1ª habilidade dela" },
      { nex: 15, tipo: "poder",    texto: "Poder de Especialista" },
      { nex: 20, tipo: "atributo", texto: "+1 em um atributo" },
      { nex: 25, tipo: "ataque",   texto: "Perito: 3 PE → +1d8" },
      { nex: 30, tipo: "poder",    texto: "Poder de Especialista" },
      { nex: 35, tipo: "grau",     texto: "Grau de treinamento: 5 + Int perícias sobem de grau" },
      { nex: 40, tipo: "trilha",   texto: "2ª habilidade da trilha e Engenhosidade (veterano)" },
      { nex: 45, tipo: "poder",    texto: "Poder de Especialista" },
      { nex: 50, tipo: "atributo", texto: "+1 em um atributo e Versatilidade (um poder de Especialista ou o 1º poder de outra trilha)" },
      { nex: 50, tipo: "poder",    texto: "Poder da Versatilidade" },
      { nex: 55, tipo: "ataque",   texto: "Perito: 4 PE → +1d10" },
      { nex: 60, tipo: "poder",    texto: "Poder de Especialista" },
      { nex: 65, tipo: "trilha",   texto: "3ª habilidade da trilha" },
      { nex: 70, tipo: "grau",     texto: "Grau de treinamento: 5 + Int perícias sobem de grau" },
      { nex: 75, tipo: "poder",    texto: "Poder de Especialista e Engenhosidade (expert)" },
      { nex: 80, tipo: "atributo", texto: "+1 em um atributo" },
      { nex: 85, tipo: "ataque",   texto: "Perito: 5 PE → +1d12" },
      { nex: 90, tipo: "poder",    texto: "Poder de Especialista" },
      { nex: 95, tipo: "atributo", texto: "+1 em um atributo" },
      { nex: 99, tipo: "trilha",   texto: "Habilidade final da trilha" },
    ],
    ocultista: [
      { nex: 5,  tipo: "ritual",   texto: "Escolhido pelo Outro Lado: 3 rituais de 1º círculo e mais um a cada avanço (veja o Grimório de rituais; muda conforme a regra de aprendizado)" },
      { nex: 10, tipo: "trilha",   texto: "Escolha sua trilha e receba a 1ª habilidade dela" },
      { nex: 15, tipo: "poder",    texto: "Poder de Ocultista" },
      { nex: 20, tipo: "atributo", texto: "+1 em um atributo" },
      { nex: 25, tipo: "ritual",   texto: "Acesso ao 2º círculo de rituais" },
      { nex: 30, tipo: "poder",    texto: "Poder de Ocultista" },
      { nex: 35, tipo: "grau",     texto: "Grau de treinamento: 3 + Int perícias sobem de grau" },
      { nex: 40, tipo: "trilha",   texto: "2ª habilidade da trilha" },
      { nex: 45, tipo: "poder",    texto: "Poder de Ocultista" },
      { nex: 50, tipo: "atributo", texto: "+1 em um atributo e Versatilidade (um poder de Ocultista ou o 1º poder de outra trilha)" },
      { nex: 50, tipo: "poder",    texto: "Poder da Versatilidade" },
      { nex: 55, tipo: "ritual",   texto: "Acesso ao 3º círculo de rituais" },
      { nex: 60, tipo: "poder",    texto: "Poder de Ocultista" },
      { nex: 65, tipo: "trilha",   texto: "3ª habilidade da trilha" },
      { nex: 70, tipo: "grau",     texto: "Grau de treinamento: 3 + Int perícias sobem de grau" },
      { nex: 75, tipo: "poder",    texto: "Poder de Ocultista" },
      { nex: 80, tipo: "atributo", texto: "+1 em um atributo" },
      { nex: 85, tipo: "ritual",   texto: "Acesso ao 4º círculo de rituais" },
      { nex: 90, tipo: "poder",    texto: "Poder de Ocultista" },
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
let nexExpAnteriorOP = null;     // exposição (NEX) anterior, modo separado
let nexAnteriorOP = null;       // para detectar evolução
let _desfazerEvolucaoOP = null; // snapshot para desfazer

/* Regra de progressão da ficha:
   "padrao"   → NEX é o nível (livro básico)
   "separado" → nível de experiência separado do NEX (Sobrevivendo ao Horror, p. 98-103) */
let modoNexOP = "padrao";
let nivelOP = 1;          // nível de experiência (modo separado)
let elementoNexOP = "";   // afinidade elemental (modo separado, NEX 50%+)
let attrNex35OP = "";     // atributo somado ao PE no NEX 35% (modo separado)

function modoPadraoDaMesaOP() {
  try { return localStorage.getItem("modoNexPadraoOP") === "separado" ? "separado" : "padrao"; }
  catch (e) { return "padrao"; }
}

function modoSeparadoOP() { return modoNexOP === "separado"; }

/* valor "estilo NEX" usado pelas regras de classe (marcos, trilhas, poderes, PV/PE/SAN) */
function nexClasseOP() {
  if (modoSeparadoOP()) return Math.max(1, Math.min(20, _numOP(nivelOP, 1))) * 5;
  return _numOP(document.getElementById("nex")?.value);
}

/* NEX real = exposição ao paranormal */
function nexExposicaoOP() { return _numOP(document.getElementById("nex")?.value); }

function rotuloNivelNexOP(n) {
  if (modoSeparadoOP()) return `Nível ${Math.max(1, Math.min(20, Math.round(_numOP(n) / 5)))}`;
  return `NEX ${n}%`;
}

/* efeitos automáticos vindos do NEX (só no modo separado) */
function efeitosNexOP() {
  const ef = { pe: 0 };
  if (modoSeparadoOP() && nexExposicaoOP() >= 35 && attrNex35OP) {
    ef.pe += _numOP(get(attrNex35OP));
  }
  return ef;
}

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
  const efNex = typeof efeitosNexOP === "function" ? efeitosNexOP() : { pe: 0 };
  const pe = _numOP(c.pe.base) + pre + passos * (_numOP(c.pe.porNex) + pre) + _numOP(bonus?.pe) + ef.pe + efNex.pe;
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

function escalonadosAtuaisOP(classe, nex, regras = obterRegrasOP()) {
  return (regras.classes?.[classe]?.escalonados || [])
    .map((e) => {
      const etapa = (e.etapas || []).filter((x) => _numOP(x.nex) <= _numOP(nex)).sort((a, b) => b.nex - a.nex)[0];
      return etapa ? { nome: e.nome, texto: etapa.texto } : null;
    })
    .filter(Boolean);
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
    nex: nexClasseOP(),
  };
}

/* ---------------- aplicar na ficha ---------------- */
function _snapshotRecursosOP() {
  return {
    nex: document.getElementById("nex")?.value,
    nivelOP,
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
  return `${icone} <b>${esc(rotuloNivelNexOP(m.nex))}</b> — ${esc(m.texto)}`;
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
  const escalonados = escalonadosAtuaisOP(classe, nex);
  const trilha = typeof buscarTrilhaOP === "function" ? buscarTrilhaOP(trilhaOP) : null;

  box.innerHTML = `
    <div class="op-auto-linha"><b>${esc(c.nome)}</b>${trilha ? ` · ${esc(trilha.nome)}` : ""} · ${modoSeparadoOP() ? `nível ${r.nivel} · NEX ${nexExposicaoOP()}%` : `NEX ${nex}% · nível ${r.nivel}`}</div>
    <div class="op-auto-chips">
      <span>❤️ PV ${r.pv}</span><span>⚡ PE ${r.pe}</span><span>🧠 SAN ${r.san}</span><span>🎯 ${r.peTurno} PE/turno</span>
      ${escalonados.map((e) => `<span>⚔️ ${esc(e.nome)}: ${esc(e.texto)}</span>`).join("")}
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
    <div class="op-regra-linha">
      <label for="modoNexOP">Regra de progressão</label>
      <select id="modoNexOP" onchange="aoMudarModoNexOP(this.value)">
        <option value="padrao">NEX = nível (livro básico)</option>
        <option value="separado">Nível separado do NEX (Sobrevivendo ao Horror, p. 98)</option>
      </select>
    </div>

    <label class="op-auto-toggle">
      <input type="checkbox" id="autoRecursosOP" onchange="alternarAutoOP(this.checked)" />
      <span>Calcular PV, PE e SAN automaticamente</span>
    </label>

    <div id="opAutoResumo" class="op-auto-resumo"></div>

    <div id="opNexPainel" class="op-nex-painel" style="display:none"></div>

    <button type="button" id="btnSalvarRegrasOP" class="op-salvar-regras" onclick="salvarRegrasOP()">💾 Salvar regras</button>

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
  box.classList.add("op-auto-pop");
  box.insertAdjacentHTML("afterbegin", `<div class="op-pop-topo"><b>⚙️ Regras da ficha</b><button type="button" class="op-pop-fechar" onclick="alternarPainelProgressaoOP(false)" aria-label="Fechar">✕</button></div>`);
  document.body.appendChild(box);
  if (!document.getElementById("opAutoFundo")) {
    const fundo = document.createElement("div");
    fundo.id = "opAutoFundo";
    fundo.className = "op-auto-fundo";
    fundo.onclick = () => alternarPainelProgressaoOP(false);
    document.body.appendChild(fundo);
  }

  // campo NÍVEL ao lado do NEX (aparece só no modo separado)
  const campoNex = document.querySelector(".op-campo-nex");
  if (campoNex && !document.getElementById("campoNivelOP")) {
    const campo = document.createElement("div");
    campo.className = "op-campo op-campo-nivel";
    campo.id = "campoNivelOP";
    campo.style.display = "none";
    campo.innerHTML = `
      <span class="op-label">NÍVEL</span>
      <select id="nivelSelectOP" onchange="aoMudarNivelOP(this.value)">
        ${Array.from({ length: 20 }, (_, i) => `<option value="${i + 1}">${i + 1}</option>`).join("")}
      </select>`;
    campoNex.insertAdjacentElement("beforebegin", campo);
  }

  aplicarVisibilidadePainelOP();
  atualizarPainelAutoOP();
}

function painelProgressaoAbertoOP() {
  const box = document.getElementById("opAutoBox");
  return !!(box && box.classList.contains("aberto"));
}

function aplicarVisibilidadePainelOP() {
  const aberto = painelProgressaoAbertoOP();
  const fundo = document.getElementById("opAutoFundo");
  if (fundo) fundo.classList.toggle("aberto", aberto);
  const btn = document.getElementById("btnEngrenagemOP");
  if (btn) btn.classList.toggle("ativo", aberto);
}

function alternarPainelProgressaoOP(forcar) {
  const box = document.getElementById("opAutoBox");
  if (!box) return;
  const abrir = typeof forcar === "boolean" ? forcar : !painelProgressaoAbertoOP();
  box.classList.toggle("aberto", abrir);
  aplicarVisibilidadePainelOP();
}

function montarOpcoesNexOP() {
  const sel = document.getElementById("nex");
  if (!sel) return;
  const atual = sel.value;
  const passo = modoSeparadoOP() ? 1 : 5;
  const max = modoSeparadoOP() ? 99 : 100;
  let html = "";
  for (let v = 0; v <= max; v += passo) html += `<option value="${v}">${v}%</option>`;
  sel.innerHTML = html;
  if ([...sel.options].some((o) => o.value === String(atual))) sel.value = atual;
}

function atualizarCamposModoOP() {
  const modo = document.getElementById("modoNexOP");
  if (modo) modo.value = modoNexOP;

  const campo = document.getElementById("campoNivelOP");
  if (campo) campo.style.display = modoSeparadoOP() ? "" : "none";

  const sn = document.getElementById("nivelSelectOP");
  if (sn) sn.value = String(Math.max(1, Math.min(20, _numOP(nivelOP, 1))));

  const rotulo = document.querySelector(".op-campo-nex .op-label");
  if (rotulo) rotulo.textContent = modoSeparadoOP() ? "NEX (EXPOSIÇÃO)" : "NEX";

  atualizarPainelNexOP();
}

function atualizarPainelAutoOP() {
  atualizarCamposModoOP();
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

/* ---------------- regra de progressão (modo) ---------------- */
async function aoMudarModoNexOP(novoModo) {
  if (novoModo === modoNexOP) return;

  const nexAtual = nexExposicaoOP();
  const texto =
    novoModo === "separado"
      ? `Usar a regra de nível separado do NEX (SaH p. 98)? O seu nível passa a ser ${nivelPorNexOP(nexAtual)} (calculado do NEX atual, ${nexAtual}%) e o NEX de exposição ao paranormal volta para 0%. Você ajusta os dois depois, se precisar. Essa escolha fica salva nesta ficha e nas novas fichas.`
      : `Voltar para a regra padrão, em que o NEX é o nível? O NEX passa a ser ${nivelOP * 5}% (nível ${nivelOP} × 5). Essa escolha fica salva nesta ficha.`;

  if (!(await confirmBonito(texto))) {
    const sel = document.getElementById("modoNexOP");
    if (sel) sel.value = modoNexOP;
    return;
  }

  if (novoModo === "separado") {
    nivelOP = nivelPorNexOP(nexAtual);
    modoNexOP = "separado";
    montarOpcoesNexOP();
    const sel = document.getElementById("nex");
    if (sel) sel.value = "0";
  } else {
    const nivel = nivelOP;
    modoNexOP = "padrao";
    montarOpcoesNexOP();
    const sel = document.getElementById("nex");
    if (sel) sel.value = String(Math.min(100, nivel * 5));
  }

  try { localStorage.setItem("modoNexPadraoOP", modoNexOP); } catch (e) {}

  nexAnteriorOP = nexClasseOP();
  nexExpAnteriorOP = nexExposicaoOP();
  if (typeof sincronizarTrilhaOP === "function") sincronizarTrilhaOP();
  atualizarCamposModoOP();
  aplicarRecursosAutomaticosOP();
  atualizarResumoAutoOP();
  if (typeof atualizarContadorPoderesClasseOP === "function") atualizarContadorPoderesClasseOP();
  salvarTudo();
}

function aoMudarNivelOP(valor) {
  nivelOP = Math.max(1, Math.min(20, parseInt(valor) || 1));
  _aoMudarClasseOuNexOP("nivel");
}

/* ---------------- exposição ao paranormal (modo separado) ---------------- */
const ELEMENTOS_NEX_OP = { sangue: "Sangue", morte: "Morte", conhecimento: "Conhecimento", energia: "Energia" };

function alteracoesNexAtivasOP() {
  const regras = obterRegrasOP();
  const nex = nexExposicaoOP();
  const lista = [];

  (regras.alteracoesNex?.geral || []).forEach((a) => {
    if (_numOP(a.nex) <= nex) lista.push({ nex: a.nex, origem: "Geral", texto: a.texto });
  });

  const el = regras.alteracoesNex?.elementos?.[elementoNexOP];
  if (el) {
    (el.etapas || []).forEach((a) => {
      if (_numOP(a.nex) <= nex) lista.push({ nex: a.nex, origem: el.nome, texto: a.texto });
    });
  }
  return lista;
}

function atualizarPainelNexOP() {
  const box = document.getElementById("opNexPainel");
  if (!box) return;

  if (!modoSeparadoOP()) {
    box.style.display = "none";
    box.innerHTML = "";
    return;
  }

  const nex = nexExposicaoOP();
  const ativas = alteracoesNexAtivasOP();
  const regras = obterRegrasOP();
  const elementos = regras.alteracoesNex?.elementos || {};

  box.style.display = "";
  box.innerHTML = `
    <div class="op-nex-titulo">🌑 Exposição ao paranormal · NEX ${nex}%</div>

    <div class="op-nex-botoes">
      <button type="button" onclick="registrarExposicaoOP(1)">Moderada +1%</button>
      <button type="button" onclick="registrarExposicaoOP(2)">Profunda +2%</button>
      <button type="button" onclick="registrarExposicaoOP(5)">Total +5%</button>
    </div>
    <div class="op-nex-botoes">
      <span class="op-nex-sub">Aprendeu um ritual de:</span>
      ${[1, 2, 3, 4].map((c) => `<button type="button" onclick="registrarExposicaoOP(${c})">${c}º círculo +${c}%</button>`).join("")}
    </div>

    ${
      nex >= 35
        ? `<div class="op-nex-campo">
            <label for="attrNex35OP">NEX 35%: atributo somado ao PE</label>
            <select id="attrNex35OP" onchange="aoMudarAttrNex35OP(this.value)">
              <option value="">Escolha…</option>
              ${[["forca", "Força"], ["agilidade", "Agilidade"], ["intelecto", "Intelecto"], ["vigor", "Vigor"]]
                .map(([v, n]) => `<option value="${v}" ${attrNex35OP === v ? "selected" : ""}>${n}</option>`)
                .join("")}
            </select>
          </div>`
        : ""
    }

    ${
      nex >= 50
        ? `<div class="op-nex-campo">
            <label for="elementoNexOPSel">Afinidade elemental</label>
            <select id="elementoNexOPSel" onchange="aoMudarElementoNexOP(this.value)">
              <option value="">Ainda sem afinidade</option>
              ${Object.entries(elementos).map(([v, e]) => `<option value="${v}" ${elementoNexOP === v ? "selected" : ""}>${esc(e.nome)}</option>`).join("")}
            </select>
          </div>`
        : ""
    }

    ${
      ativas.length
        ? `<div class="op-nex-lista">
            ${ativas.map((a) => `<div class="op-nex-item"><b>NEX ${a.nex}% · ${esc(a.origem)}</b><span>${esc(a.texto)}</span></div>`).join("")}
            <small class="op-auto-dica">Penalidades e escolhas de perícia são aplicadas por você. O bônus de PE do NEX 35% é automático.</small>
           </div>`
        : `<small class="op-auto-dica">Nenhuma alteração ainda. A primeira vem no NEX 25%.</small>`
    }
  `;
}

function registrarExposicaoOP(valor) {
  const antes = nexExposicaoOP();
  const depois = Math.min(99, antes + valor);
  if (depois === antes) return;

  const sel = document.getElementById("nex");
  if (sel) sel.value = String(depois);

  const marcos = [25, 35, 50, 60, 75, 90].filter((m) => antes < m && depois >= m);

  atualizarPainelNexOP();
  aplicarRecursosAutomaticosOP();
  atualizarResumoAutoOP();
  salvarTudo();

  nexExpAnteriorOP = depois;
  if (marcos.length) mostrarPopupExposicaoOP(antes, depois);
}

/* popup de evolução da exposição (NEX) no modo de nível separado */
function mostrarPopupExposicaoOP(antes, depois) {
  const reducao = depois < antes;
  const lo = Math.min(antes, depois);
  const hi = Math.max(antes, depois);
  const regras = obterRegrasOP();
  const noIntervalo = (n) => _numOP(n) > lo && _numOP(n) <= hi;

  const itens = [];
  (regras.alteracoesNex?.geral || []).forEach((a) => { if (noIntervalo(a.nex)) itens.push({ nex: a.nex, origem: "Geral", texto: a.texto }); });
  const el = regras.alteracoesNex?.elementos?.[elementoNexOP];
  if (el) (el.etapas || []).forEach((a) => { if (noIntervalo(a.nex)) itens.push({ nex: a.nex, origem: el.nome, texto: a.texto }); });

  let proximaExp = "";
  if (!reducao) {
    const futuros = [];
    (regras.alteracoesNex?.geral || []).forEach((a) => { if (_numOP(a.nex) > hi) futuros.push({ nex: a.nex, origem: "Geral", texto: a.texto }); });
    (regras.alteracoesNex?.elementos?.[elementoNexOP]?.etapas || []).forEach((a) => { if (_numOP(a.nex) > hi) futuros.push({ nex: a.nex, origem: regras.alteracoesNex.elementos[elementoNexOP].nome, texto: a.texto }); });
    futuros.sort((a, b) => a.nex - b.nex);
    const proxNex = futuros[0]?.nex;
    const doProx = futuros.filter((f) => f.nex === proxNex);
    if (doProx.length) {
      proximaExp = `<div class="evo-bloco evo-proximo"><div class="evo-sub">Próxima alteração (NEX ${proxNex}%)</div>${doProx.map((a) => `<div class="evo-marco"><b>${esc(a.origem)}</b><br>${esc(a.texto)}</div>`).join("")}</div>`;
    }
  }

  const marcos = [25, 35, 50, 60, 75, 90].filter(noIntervalo);
  const precisaElemento = !reducao && marcos.some((m) => m >= 60) && !el;

  const html = `
    <div class="popup-bloco evo-popup">
      <div class="evo-titulo">${reducao ? "⬇️ " : ""}NEX ${antes}% → ${depois}%</div>
      <div class="evo-bloco">
        <div class="evo-sub">${reducao ? "Alterações que você perde" : "Novas alterações"}</div>
        ${itens.map((a) => `<div class="evo-marco">${reducao ? "❌ " : ""}<b>NEX ${a.nex}% · ${esc(a.origem)}</b><br>${esc(a.texto)}</div>`).join("") || `<div class="evo-marco">Nenhuma alteração nova neste intervalo. A próxima ${reducao ? "que você perderia" : "vem"} no NEX ${[25, 35, 50, 60, 75, 90].find((m) => (reducao ? m <= lo : m > hi)) ?? "—"}%.</div>`}
        ${!reducao && marcos.includes(35) ? `<div class="evo-marco evo-alerta">⚠️ Escolha o atributo que soma ao PE no campo "NEX 35%".</div>` : ""}
        ${!reducao && marcos.includes(50) ? `<div class="evo-marco evo-alerta">⚠️ A afinidade elemental vem na próxima vez em que Transcender; escolha-a no campo "Afinidade elemental".</div>` : ""}
        ${precisaElemento ? `<div class="evo-marco evo-alerta">⚠️ Escolha a afinidade elemental para ver as alterações do elemento.</div>` : ""}
      </div>
      ${proximaExp}
      <button type="button" class="evo-ok" onclick="fecharPopup(); salvarTudo();">OK, continuar</button>
      <button type="button" class="evo-desfazer" onclick="desfazerExposicaoOP(${antes})">Desfazer</button>
    </div>`;
  abrirPopup(reducao ? "Exposição reduzida" : "Exposição ao paranormal", html, true);
}

function desfazerExposicaoOP(valor) {
  const sel = document.getElementById("nex");
  if (sel) sel.value = String(valor);
  nexExpAnteriorOP = valor;
  atualizarPainelNexOP();
  aplicarRecursosAutomaticosOP();
  atualizarResumoAutoOP();
  salvarTudo();
  fecharPopup();
}

function aoMudarAttrNex35OP(v) {
  attrNex35OP = v;
  aplicarRecursosAutomaticosOP();
  atualizarResumoAutoOP();
  salvarTudo();
}

function aoMudarElementoNexOP(v) {
  elementoNexOP = v;
  atualizarPainelNexOP();
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

  const reducao = _numOP(novo) < _numOP(antigo);
  const marcos = reducao ? marcosEntreOP(novo, antigo, regras, classe) : marcosEntreOP(antigo, novo, regras, classe);

  // habilidades de trilha recebidas automaticamente
  const trilha = typeof buscarTrilhaOP === "function" ? buscarTrilhaOP(trilhaOP) : null;
  const lo = Math.min(_numOP(antigo), _numOP(novo));
  const hi = Math.max(_numOP(antigo), _numOP(novo));
  const novasHab = trilha
    ? (trilha.habilidades || []).filter((h) => _numOP(h.nex) > lo && _numOP(h.nex) <= hi)
    : [];
  const trilhaPendente = !reducao && !trilha && marcos.some((m) => m.tipo === "trilha");

  // prévia do próximo passo (exatamente o que chega na próxima evolução)
  let previa = "";
  const topo = modoSeparadoOP() ? 100 : 99;
  const prox = _numOP(novo) >= topo ? null : Math.min(topo, _numOP(novo) + 5);
  if (!reducao && prox) {
    const prev = calcularRecursosOP(classe, prox, _atributosAtuaisOP());
    const marcosProx = marcosEntreOP(novo, prox, regras, classe);
    const habProx = trilha ? (trilha.habilidades || []).filter((h) => _numOP(h.nex) > _numOP(novo) && _numOP(h.nex) <= prox) : [];
    const ganho = (nome, a, d) => (d !== a ? `<div class="evo-linha"><span>${nome}</span><span>${a} <i>→</i> <b>${d}</b> <em>(${d > a ? "+" : ""}${d - a})</em></span></div>` : "");
    const itens = [
      ganho("❤️ PV máximo", depois.pv, prev.pv),
      ganho("⚡ PE máximo", depois.pe, prev.pe),
      ganho("🧠 SAN máxima", depois.san, prev.san),
      ganho("🎯 PE por turno", depois.peTurno, prev.peTurno),
      ...habProx.map((h) => `<div class="evo-marco">🧭 <b>${esc(h.nome)}</b> — ${esc(h.resumo || "")}</div>`),
      ...marcosProx.map((m) => `<div class="evo-marco">${_textoMarcoOP(m)}</div>`),
    ].join("");
    const trilhaFalta = !trilha && marcosProx.some((m) => m.tipo === "trilha");
    previa = `
      <div class="evo-bloco evo-proximo">
        <div class="evo-sub">Na próxima evolução (${esc(rotuloNivelNexOP(prox))})</div>
        ${itens || `<div class="evo-marco">Só os aumentos de PV, PE e SAN da classe.</div>`}
        ${trilhaFalta ? `<div class="evo-marco evo-alerta">⚠️ Escolha uma trilha para receber a habilidade.</div>` : ""}
      </div>`;
  }

  const linha = (nome, a, d) =>
    `<div class="evo-linha"><span>${nome}</span><span>${a} <i>→</i> <b>${d}</b>${d > a ? ` <em>(+${d - a})</em>` : d < a ? ` <em class="evo-perda">(${d - a})</em>` : ""}</span></div>`;

  const html = `
    <div class="popup-bloco evo-popup">
      <div class="evo-titulo">${reducao ? "⬇️ " : ""}${esc(rotuloNivelNexOP(antigo))} → ${esc(rotuloNivelNexOP(novo))}${modoSeparadoOP() ? "" : ` <small>(nível ${antesCalc.nivel} → ${depois.nivel})</small>`}</div>

      <div class="evo-bloco">
        ${linha("❤️ PV máximo", antesCalc.pv, depois.pv)}
        ${linha("⚡ PE máximo", antesCalc.pe, depois.pe)}
        ${linha("🧠 SAN máxima", antesCalc.san, depois.san)}
        ${linha("🎯 PE por turno", antesCalc.peTurno, depois.peTurno)}
      </div>

      ${
        novasHab.length
          ? `<div class="evo-bloco">
              <div class="evo-sub">${reducao ? "Você perde" : "Recebido automaticamente"} (${esc(trilha.nome)})</div>
              ${novasHab.map((h) => `<div class="evo-marco">🧭 <b>${esc(h.nome)}</b> — ${esc(h.resumo || "")}</div>`).join("")}
            </div>`
          : ""
      }

      ${typeof blocoRituaisEvolucaoOP === "function" ? blocoRituaisEvolucaoOP(antigo, novo) : ""}

      ${
        marcos.length || trilhaPendente
          ? `<div class="evo-bloco">
              <div class="evo-sub">${reducao ? "Ganhos que você perde ao reduzir" : "Escolhas e ganhos desta evolução"}</div>
              ${marcos.map((m) => `<div class="evo-marco">${reducao ? "❌ " : ""}${_textoMarcoOP(m)}${_botaoMarcoOP(m, reducao)}</div>`).join("")}
              ${trilhaPendente ? `<div class="evo-marco evo-alerta">⚠️ Escolha sua trilha no seletor "Trilha" para receber as habilidades.</div>` : ""}
              ${marcos.some((m) => m.tipo === "poder") ? `<div class="evo-marco evo-alerta">✨ Abra o "Catálogo de poderes" na aba de poderes para escolher.</div>` : ""}
              <small class="evo-dica">${reducao ? "Poderes de trilha deste nível saem sozinhos; poderes escolhidos por você continuam na ficha, remova-os se quiser." : "Atributos, perícias e a escolha de poderes continuam sendo seus."}</small>
            </div>`
          : ""
      }

      ${previa}

      <button type="button" class="evo-ok" onclick="confirmarEvolucaoOP()">OK, continuar</button>
      <button type="button" class="evo-desfazer" onclick="desfazerEvolucaoOP()">${reducao ? "Desfazer redução" : "Desfazer evolução"}</button>
    </div>`;

  _desfazerEvolucaoOP = antes;
  abrirPopup(reducao ? "Nível reduzido" : "Evolução aplicada", html, true);
}

async function salvarRegrasOP() {
  const btn = document.getElementById("btnSalvarRegrasOP");
  if (btn) { btn.disabled = true; btn.textContent = "⏳ Salvando..."; }
  try {
    if (typeof salvarTudo === "function") salvarTudo();
    if (typeof salvarPersonagens === "function") await salvarPersonagens();
    if (btn) btn.textContent = "✅ Regras salvas";
    if (typeof mostrarToastSalvarFlutuante === "function") mostrarToastSalvarFlutuante("Regras salvas!");
  } catch (e) {
    console.error(e);
    if (btn) btn.textContent = "⚠️ Erro ao salvar";
  }
  setTimeout(() => { if (btn) { btn.disabled = false; btn.textContent = "💾 Salvar regras"; } }, 1800);
}

function confirmarEvolucaoOP() {
  _desfazerEvolucaoOP = null;
  if (typeof salvarTudo === "function") { try { salvarTudo(); } catch (e) {} }
  if (typeof fecharPopup === "function") fecharPopup();
}

function desfazerEvolucaoOP() {
  const s = _desfazerEvolucaoOP;
  if (!s) return;

  const set = (id, v) => { const el = document.getElementById(id); if (el && v !== undefined) el.value = v; };
  if (modoSeparadoOP() && s.nivelOP) {
    nivelOP = s.nivelOP;
    const sn = document.getElementById("nivelSelectOP");
    if (sn) sn.value = String(nivelOP);
  } else {
    set("nex", s.nex);
  }
  set("vidaMax", s.vidaMax);
  set("sanMaxOP", s.sanMaxOP);
  set("peMaxOP", s.peMaxOP);
  set("pePorTurno", s.pePorTurno);

  vidaAtual = s.vidaAtual;
  sanAtual = s.sanAtual;
  peAtual = s.peAtual;

  nexAnteriorOP = nexClasseOP();
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
  // no modo separado, mexer no NEX (exposição) não é evolução de classe
  const evolucao = evento === "nivel" || (evento === "nex" && !modoSeparadoOP());
  const novo = nexClasseOP();

  if (evento === "nex" && modoSeparadoOP()) {
    const antesExp = nexExpAnteriorOP;
    const depoisExp = nexExposicaoOP();
    nexExpAnteriorOP = depoisExp;
    atualizarPainelNexOP();
    aplicarRecursosAutomaticosOP();
    atualizarResumoAutoOP();
    salvarTudo();
    if (antesExp !== null && depoisExp !== antesExp) mostrarPopupExposicaoOP(antesExp, depoisExp);
    return;
  }
  const sync = () => {
    if (typeof sincronizarTrilhaOP === "function") sincronizarTrilhaOP();
    if (typeof atualizarContadorPoderesClasseOP === "function") atualizarContadorPoderesClasseOP();
  };

  if (evolucao && autoRecursosOP && nexAnteriorOP !== null && novo !== nexAnteriorOP) {
    const antes = _snapshotRecursosOP();
    antes.nex = String(nexAnteriorOP);
    antes.nivelOP = Math.round(nexAnteriorOP / 5);
    const antigo = nexAnteriorOP;
    sync();
    aplicarRecursosAutomaticosOP();
    aoMudarNexOP(antigo, novo, antes);
  } else {
    sync();
    aplicarRecursosAutomaticosOP();
    atualizarResumoAutoOP();
  }

  if (evolucao) nexAnteriorOP = novo;
  atualizarPainelNexOP();
  salvarTudo();
}

/* chamado quando um poder é adicionado/removido (efeitos automáticos) */
function aoMudarPoderesOP() {
  if (typeof atualizarContadorRituaisOP === "function") atualizarContadorRituaisOP();
  aplicarRecursosAutomaticosOP();
  atualizarResumoAutoOP();
  if (typeof atualizarContadorPoderesClasseOP === "function") atualizarContadorPoderesClasseOP();
}

function _ligarEventosOP() {
  document.getElementById("classeOP")?.addEventListener("change", () => _aoMudarClasseOuNexOP("classe"));
  document.getElementById("nex")?.addEventListener("change", () => _aoMudarClasseOuNexOP("nex"));
  ["forca", "agilidade", "intelecto"].forEach((id) =>
    document.getElementById(id)?.addEventListener("input", () => {
      if (modoSeparadoOP() && attrNex35OP === id) {
        aplicarRecursosAutomaticosOP();
        atualizarResumoAutoOP();
      }
    }),
  );
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
let _fichaOPCarregada = null; // só grava na ficha depois de ter lido o estado dela

function carregarOP(p) {
  _fichaOPCarregada = p;
  autoRecursosOP = !!p.autoRecursosOP;
  bonusRecursosOP = { pv: 0, pe: 0, san: 0, ...(p.bonusRecursosOP || {}) };
  regrasOPCustom = p.regrasOP && !validarRegrasOP(p.regrasOP) ? p.regrasOP : null;
  modoNexOP = p.modoNexOP === "separado" ? "separado" : "padrao";
  elementoNexOP = p.elementoNexOP || "";
  attrNex35OP = p.attrNex35OP || "";
  montarOpcoesNexOP();

  const nexSel = document.getElementById("nex");
  if (nexSel) nexSel.value = String(p.nex ?? (modoSeparadoOP() ? 0 : 5));

  nivelOP = Math.max(1, Math.min(20, _numOP(p.nivelOP, nivelPorNexOP(_numOP(p.nex, 5)))));
  nexAnteriorOP = nexClasseOP();
  nexExpAnteriorOP = nexExposicaoOP();
  _desfazerEvolucaoOP = null;
  if (typeof carregarTrilhaOP === "function") carregarTrilhaOP(p);
  if (typeof carregarRituaisOP === "function") carregarRituaisOP(p);
  if (typeof carregarOrigemOP === "function") carregarOrigemOP(p);
  atualizarPainelAutoOP();
}

function salvarOP(p) {
  // evita que valores padrão (antes do carregamento) sobrescrevam o que já estava salvo
  if (_fichaOPCarregada !== p) return;
  p.autoRecursosOP = !!autoRecursosOP;
  p.bonusRecursosOP = { ...bonusRecursosOP };
  p.regrasOP = regrasOPCustom || null;
  p.modoNexOP = modoNexOP;
  p.nivelOP = nivelOP;
  p.elementoNexOP = elementoNexOP;
  p.attrNex35OP = attrNex35OP;
  if (typeof salvarTrilhaOP === "function") salvarTrilhaOP(p);
  if (typeof salvarRituaisOP === "function") salvarRituaisOP(p);
  if (typeof salvarOrigemOP === "function") salvarOrigemOP(p);
}

/* =====================================================================
   Ajudantes de progressão: perícias da classe, grau de treinamento e
   aumento de atributo (Livro de Regras, cap. 1)
   ===================================================================== */
const PERICIAS_CLASSE_OP = {
  combatente:   { fixas: [], escolhas: [["Luta", "Pontaria"], ["Fortitude", "Reflexos"]], extra: 1, grau: 2 },
  especialista: { fixas: [], escolhas: [], extra: 7, grau: 5 },
  ocultista:    { fixas: ["Ocultismo", "Vontade"], escolhas: [], extra: 3, grau: 3 },
};

function _intelectoOP() {
  return Math.max(0, parseInt(document.getElementById("intelecto")?.value) || 0);
}

function infoPericiasClasseOP(classe) {
  const c = PERICIAS_CLASSE_OP[classe];
  if (!c) return null;
  const extra = c.extra + _intelectoOP();
  const total = c.fixas.length + c.escolhas.length + extra;
  const partes = [];
  if (c.fixas.length) partes.push(`${c.fixas.join(" e ")} (fixas)`);
  c.escolhas.forEach((par) => partes.push(`${par.join(" ou ")} (uma das duas)`));
  partes.push(`mais ${extra} à sua escolha (${c.extra} + Intelecto)`);
  return { ...c, extraTotal: extra, total, texto: partes.join(", ") };
}

function _botaoMarcoOP(m, reducao) {
  if (reducao) return "";
  if (m.tipo === "grau") return ` <button type="button" class="evo-mini" onclick="abrirGrauTreinamentoOP()">Escolher perícias</button>`;
  if (m.tipo === "atributo") return ` <button type="button" class="evo-mini" onclick="abrirAumentoAtributoOP()">Aumentar atributo</button>`;
  return "";
}

/* ---- grau de treinamento (NEX 35% e 70%) ---- */
function abrirGrauTreinamentoOP() {
  const classe = document.getElementById("classeOP")?.value || "";
  const c = PERICIAS_CLASSE_OP[classe];
  if (!c) { alertBonito("Escolha uma classe primeiro."); return; }
  const n = c.grau + _intelectoOP();
  const nomes = ["Não treinado", "Treinado", "Veterano", "Expert"];

  const lista = pericias
    .filter((p) => (profs[p.nome] || 0) >= 1 && (profs[p.nome] || 0) < 3)
    .sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));

  const html = `
    <div class="popup-bloco">
      <p class="bp-dica">Escolha até <b>${n}</b> perícias (${c.grau} + Intelecto). O grau de cada uma sobe um nível: treinado → veterano → expert.</p>
      <div id="contGrauOP" class="cat-contador">0 de ${n}</div>
      <div class="bp-lista">
        ${lista.map((p) => {
          const g = profs[p.nome] || 0;
          return `<label class="bp-linha"><input type="checkbox" class="grau-chk" data-nome="${esc(p.nome)}" onchange="contarGrauOP(${n})" />
            <span class="bp-nome">${esc(p.nome)}</span><span class="bp-treino">${nomes[g]} → ${nomes[g + 1]}</span></label>`;
        }).join("") || `<p class="cat-resumo">Nenhuma perícia treinada que possa subir de grau. Marque o treino na lista de perícias primeiro.</p>`}
      </div>
      <div class="bp-rodape"><button type="button" class="bp-btn bp-btn-salvar" onclick="aplicarGrauTreinamentoOP(${n})">Aplicar</button></div>
    </div>`;
  abrirPopup("🎓 Grau de treinamento", html, true);
}

function contarGrauOP(n) {
  const k = document.querySelectorAll(".grau-chk:checked").length;
  const el = document.getElementById("contGrauOP");
  if (el) { el.textContent = `${k} de ${n}`; el.style.color = k > n ? "#e07a6a" : ""; }
}

function aplicarGrauTreinamentoOP(n) {
  const marcadas = [...document.querySelectorAll(".grau-chk:checked")].map((i) => i.dataset.nome);
  if (marcadas.length > n) { alertBonito(`Você pode escolher no máximo ${n} perícias.`); return; }
  marcadas.forEach((nome) => { profs[nome] = Math.min(3, (profs[nome] || 0) + 1); });
  if (typeof fecharPopup === "function") fecharPopup();
  if (typeof atualizarTudo === "function") atualizarTudo();
  salvarTudo();
}

/* ---- aumento de atributo (NEX 20/50/80/95) ---- */
function abrirAumentoAtributoOP() {
  const attrs = [["agilidade", "Agilidade"], ["forca", "Força"], ["intelecto", "Intelecto"], ["presenca", "Presença"], ["vigor", "Vigor"]];
  const html = `
    <div class="popup-bloco">
      <p class="bp-dica">Escolha o atributo que sobe +1. Nenhum atributo passa de 5 por aumento de NEX. Vigor e Presença também aumentam PV e PE automaticamente se o cálculo automático estiver ligado.</p>
      <div class="bp-lista">
        ${attrs.map(([id, nome]) => {
          const v = parseInt(document.getElementById(id)?.value) || 0;
          return `<button type="button" class="evo-attr" ${v >= 5 ? "disabled" : ""} onclick="aumentarAtributoOP('${id}')"><span>${nome}</span><b>${v} → ${Math.min(5, v + 1)}</b></button>`;
        }).join("")}
      </div>
    </div>`;
  abrirPopup("⬆️ Aumento de atributo", html, true);
}

function aumentarAtributoOP(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const v = parseInt(el.value) || 0;
  if (v >= 5) return;
  el.value = String(v + 1);
  el.dispatchEvent(new Event("input", { bubbles: true }));
  el.dispatchEvent(new Event("change", { bubbles: true }));
  if (typeof fecharPopup === "function") fecharPopup();
  if (typeof atualizarTudo === "function") atualizarTudo();
  if (autoRecursosOP) aplicarRecursosAutomaticosOP();
  atualizarResumoAutoOP();
  salvarTudo();
}

function _iniciarRegrasOP() {
  montarPainelAutoOP();
  _ligarEventosOP();
}

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", _iniciarRegrasOP);
else _iniciarRegrasOP();
