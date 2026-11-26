/* =====================================================================
   condicoes-op.js  ·  Condições (debuffs) do personagem na aba Combate
   - Lista as 38 condições do Livro de Regras (apêndice de condições)
   - Adicionar / remover / "piorar" (abalado → apavorado, fatigado → exausto…)
   - Mostra o efeito somado de tudo que está ativo, já com a regra do livro:
     condições com o mesmo efeito não acumulam, vale o mais severo.
   - Guarda na ficha (p.condicoesOP). Ligado ao script.js por
     carregarCondicoesOP(p) e salvarCondicoesOP(p).
   ===================================================================== */

(function () {
  "use strict";

  const e = (t) => String(t == null ? "" : t).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const ICONES = {
    plus: '<path d="M12 5v14M5 12h14"/>',
    x: '<path d="M6 6l12 12M18 6L6 18"/>',
    lupa: '<circle cx="11" cy="11" r="6.5"/><path d="M16 16l5 5"/>',
    check: '<path d="m5 12 5 5 9-10"/>',
    cena: '<path d="M20 12a8 8 0 1 1-2.3-5.6"/><path d="M20 4v4h-4"/>',
    cima: '<path d="M12 19V5M6 11l6-6 6 6"/>',
    chev: '<path d="m9 6 6 6-6 6"/>',
    nota: '<path d="M5 4h14v16H5z"/><path d="M8.5 9h7M8.5 13h7M8.5 17h4"/>',
  };
  const svg = (n, s = 16) => `<svg viewBox="0 0 24 24" width="${s}" height="${s}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONES[n] || ""}</svg>`;

  const TIPOS = { medo: "Medo", mental: "Mental", fadiga: "Fadiga", paralisia: "Paralisia", sentidos: "Sentidos", outras: "Outras" };

  /* onde a penalidade em dados se aplica */
  const ONDE = {
    testes: "em testes",
    pericias: "em testes de perícia",
    ataque: "em testes de ataque",
    corpo: "em ataques corpo a corpo",
    percepcao: "em Percepção",
    agifv: "em Agilidade, Força e Vigor",
    agifor: "em perícias de Agilidade e Força",
    intpre: "em Intelecto e Presença",
    iniciativa: "em Iniciativa",
    reflexos: "em Reflexos",
  };
  const ORDEM_DADOS = ["testes", "pericias", "agifv", "agifor", "intpre", "ataque", "corpo", "percepcao", "iniciativa", "reflexos"];

  /* ------------------------------------------------------------------
     Dados. ef: d = penalidade em dados (1 dado = 1d20 a menos),
     def / defCorpo / defDist = modificador de Defesa, autoRefl, desl,
     acoes, pe, rd. inc = condições que esta já traz junto.
     dura: "cena" (padrão do livro) ou "estado" (dura enquanto a situação durar)
     ------------------------------------------------------------------ */
  const LISTA = [
    { id: "abalado", nome: "Abalado", tipo: "medo", resumo: "–1 dado em testes", ef: { d: { testes: 1 } }, escala: "apavorado",
      desc: "O personagem sofre –1 dado em testes. Se ficar abalado novamente, em vez disso fica apavorado." },
    { id: "agarrado", nome: "Agarrado", tipo: "paralisia", resumo: "Desprevenido e imóvel; –1 dado em ataques", inc: ["desprevenido", "imovel"], ef: { d: { ataque: 1 } },
      av: ["Só pode atacar com armas leves.", "Ataque à distância contra o alvo da manobra: 50% de chance de acertar o alvo errado."],
      desc: "O personagem fica desprevenido e imóvel, sofre –1 dado em testes de ataque e só pode atacar com armas leves. Um personagem fazendo um ataque à distância contra um alvo envolvido na manobra agarrar tem 50% de chance de acertar o alvo errado." },
    { id: "alquebrado", nome: "Alquebrado", tipo: "mental", resumo: "+1 PE no custo de habilidades e rituais", ef: { pe: 1 },
      desc: "O custo em pontos de esforço das habilidades e dos rituais do personagem aumenta em +1." },
    { id: "apavorado", nome: "Apavorado", tipo: "medo", resumo: "–2 dados em perícias; foge da fonte do medo", ef: { d: { pericias: 2 } },
      av: ["Deve fugir da fonte do medo; se não puder, não pode se aproximar dela voluntariamente."],
      desc: "O personagem sofre –2 dados em testes de perícia e deve fugir da fonte do medo da maneira mais eficiente possível (mas pode parar de fazê-lo assim que a perder de vista ou se afastar mais do que alcance médio). Se não puder, poderá agir, mas não poderá se aproximar voluntariamente da fonte do medo." },
    { id: "asfixiado", nome: "Asfixiado", tipo: "outras", resumo: "Não pode respirar", av: ["Prende a respiração por rodadas iguais ao Vigor; depois, Fortitude por rodada (DT 5 + 5 por teste anterior) ou cai inconsciente e perde 1d6 PV por rodada."],
      desc: "O personagem não pode respirar. Um personagem asfixiado pode prender a respiração por um número de rodadas igual ao seu Vigor. Depois disso, deve fazer um teste de Fortitude por rodada (DT 5 + 5 por teste anterior). Se falhar, cai inconsciente e perde 1d6 PV por rodada até respirar novamente ou morrer." },
    { id: "atordoado", nome: "Atordoado", tipo: "mental", resumo: "Desprevenido e sem ações", inc: ["desprevenido"], ef: { acoes: "nenhuma" },
      desc: "O personagem fica desprevenido e não pode fazer ações." },
    { id: "caido", nome: "Caído", tipo: "outras", resumo: "–2 dados em corpo a corpo; deslocamento 1,5 m",
      ef: { d: { corpo: 2 }, defCorpo: -5, defDist: 5, desl: "1,5" },
      desc: "Deitado no chão. O personagem sofre –2 dados em ataques corpo a corpo e seu deslocamento é reduzido a 1,5m. Além disso, sofre –5 na Defesa contra ataques corpo a corpo, mas recebe +5 na Defesa contra ataques à distância." },
    { id: "cego", nome: "Cego", tipo: "sentidos", resumo: "Desprevenido e lento; –2 dados em Agilidade/Força", inc: ["desprevenido", "lento"], ef: { d: { agifor: 2 } },
      av: ["Não pode fazer testes de Percepção para observar.", "Todos os alvos dos seus ataques têm camuflagem total."],
      desc: "O personagem fica desprevenido e lento, não pode fazer testes de Percepção para observar e sofre –2 dados em testes de perícias baseadas em Agilidade ou Força. Todos os alvos de seus ataques recebem camuflagem total. Você é considerado cego enquanto estiver em uma área de escuridão total, a menos que algo lhe permita perceber no escuro." },
    { id: "confuso", nome: "Confuso", tipo: "mental", resumo: "Age de forma aleatória (1d6 no início do turno)",
      av: ["1d6 no início do turno: 1) move-se na direção de 1d8; 2-3) sem ações, balbucia; 4-5) ataca o ser mais próximo (ou a si mesmo); 6) a condição termina."],
      desc: "O personagem comporta-se de modo aleatório. Role 1d6 no início de seus turnos: 1) Movimenta-se em uma direção escolhida por uma rolagem de 1d8; 2-3) Não pode fazer ações e fica balbuciando de forma incoerente; 4-5) Usa a arma que estiver empunhando para atacar o ser mais próximo, ou a si mesmo se estiver sozinho (nesse caso, apenas role o dano); 6) A condição termina e pode agir normalmente." },
    { id: "debilitado", nome: "Debilitado", tipo: "fadiga", resumo: "–2 dados em Agilidade, Força e Vigor", ef: { d: { agifv: 2 } }, escala: "inconsciente",
      desc: "O personagem sofre –2 dados em testes de Agilidade, Força e Vigor. Se o personagem ficar debilitado novamente, em vez disso fica inconsciente." },
    { id: "desprevenido", nome: "Desprevenido", tipo: "outras", resumo: "–5 na Defesa; –1 dado em Reflexos", ef: { def: -5, d: { reflexos: 1 } },
      desc: "Despreparado para reagir. O personagem sofre –5 na Defesa e –1 dado em Reflexos. Você fica desprevenido contra inimigos que não possa perceber." },
    { id: "doente", nome: "Doente", tipo: "outras", dura: "estado", resumo: "Sob efeito de uma doença",
      desc: "Sob efeito de uma doença." },
    { id: "emchamas", nome: "Em Chamas", tipo: "outras", resumo: "1d6 de dano de fogo no início do turno",
      av: ["Apagar: ação padrão com as mãos ou imersão em água."],
      desc: "O personagem está pegando fogo. No início de seus turnos, sofre 1d6 pontos de dano de fogo. O personagem pode gastar uma ação padrão para apagar o fogo com as mãos. Imersão em água também apaga as chamas." },
    { id: "enjoado", nome: "Enjoado", tipo: "outras", resumo: "Só uma ação padrão ou de movimento", ef: { acoes: "uma" },
      desc: "O personagem só pode realizar uma ação padrão ou de movimento (não ambas) por rodada." },
    { id: "enlouquecendo", nome: "Enlouquecendo", tipo: "outras", dura: "estado", resumo: "3 turnos na cena: o personagem vira NPC",
      av: ["Encerra com Diplomacia (DT 20 +5 por vez já acalmado na cena) ou efeito que cure ao menos 1 de Sanidade."],
      desc: "Se iniciar três turnos enlouquecendo na mesma cena (não necessariamente consecutivos), você fica insano — seu personagem se torna um NPC. A condição pode ser encerrada com um teste de Diplomacia (DT 20 +5 por vez que já tiver sido acalmado na cena) ou por qualquer efeito que cure pelo menos 1 de Sanidade." },
    { id: "enredado", nome: "Enredado", tipo: "paralisia", resumo: "Lento e vulnerável; –1 dado em ataques", inc: ["lento", "vulneravel"], ef: { d: { ataque: 1 } },
      desc: "O personagem fica lento, vulnerável e sofre –1 dado em testes de ataque." },
    { id: "envenenado", nome: "Envenenado", tipo: "outras", resumo: "Varia conforme o veneno",
      av: ["Dano recorrente de envenenado sempre se acumula, mesmo de fontes iguais."],
      desc: "Varia de acordo com o veneno. Pode ser outra condição (por exemplo, fraco ou enjoado) ou dano recorrente (por exemplo, 1d12 pontos de dano de veneno por rodada). A descrição do veneno determina a duração dele (caso nada seja dito, a condição dura pela cena). Dano recorrente de condições envenenado sempre se acumula (mesmo se as condições ou fontes que as causam forem iguais)." },
    { id: "esmorecido", nome: "Esmorecido", tipo: "mental", resumo: "–2 dados em Intelecto e Presença", ef: { d: { intpre: 2 } },
      desc: "O personagem sofre –2 dados em testes de Intelecto e Presença." },
    { id: "exausto", nome: "Exausto", tipo: "fadiga", resumo: "Debilitado, lento e vulnerável", inc: ["debilitado", "lento", "vulneravel"], escala: "inconsciente",
      desc: "O personagem fica debilitado, lento e vulnerável. Se ficar exausto novamente, em vez disso fica inconsciente." },
    { id: "fascinado", nome: "Fascinado", tipo: "mental", resumo: "–2 dados em Percepção; sem ações", ef: { d: { percepcao: 2 }, acoes: "nenhuma" },
      av: ["Só pode observar aquilo que o fascinou.", "Qualquer ação hostil contra ele anula a condição. Balançá-lo gasta uma ação padrão."],
      desc: "Com a atenção presa em alguma coisa. O personagem sofre –2 dados em Percepção e não pode fazer ações, exceto observar aquilo que o fascinou. Qualquer ação hostil contra o personagem anula esta condição. Balançar um ser fascinado para tirá-lo desse estado gasta uma ação padrão." },
    { id: "fatigado", nome: "Fatigado", tipo: "fadiga", resumo: "Fraco e vulnerável", inc: ["fraco", "vulneravel"], escala: "exausto",
      desc: "O personagem fica fraco e vulnerável. Se o personagem ficar fatigado novamente, em vez disso fica exausto." },
    { id: "fraco", nome: "Fraco", tipo: "fadiga", resumo: "–1 dado em Agilidade, Força e Vigor", ef: { d: { agifv: 1 } }, escala: "debilitado",
      desc: "O personagem sofre –1 dado em testes de Agilidade, Força e Vigor. Se ficar fraco novamente, em vez disso fica debilitado." },
    { id: "frustrado", nome: "Frustrado", tipo: "mental", resumo: "–1 dado em Intelecto e Presença", ef: { d: { intpre: 1 } }, escala: "esmorecido",
      desc: "O personagem sofre –1 dado em testes de Intelecto e Presença. Se ficar frustrado novamente, em vez disso fica esmorecido." },
    { id: "imovel", nome: "Imóvel", tipo: "paralisia", resumo: "Deslocamento 0 m", ef: { desl: "0" },
      desc: "Todas as formas de deslocamento do personagem são reduzidas a 0m." },
    { id: "inconsciente", nome: "Inconsciente", tipo: "outras", resumo: "Indefeso e sem ações (nem reações)", inc: ["indefeso"], ef: { acoes: "nenhuma" },
      av: ["Balançá-lo para acordar gasta uma ação padrão."],
      desc: "O personagem fica indefeso e não pode fazer ações, incluindo reações. Balançar um ser para acordá-lo gasta uma ação padrão." },
    { id: "indefeso", nome: "Indefeso", tipo: "outras", resumo: "Desprevenido; –10 na Defesa; falha em Reflexos", inc: ["desprevenido"], ef: { def: -10, autoRefl: true },
      av: ["Pode sofrer golpes de misericórdia."],
      desc: "O personagem é considerado desprevenido, mas sofre –10 na Defesa, falha automaticamente em testes de Reflexos e pode sofrer golpes de misericórdia." },
    { id: "lento", nome: "Lento", tipo: "paralisia", resumo: "Deslocamento pela metade; sem correr nem investir", ef: { desl: "meio" },
      desc: "Todas as formas de deslocamento do personagem são reduzidas à metade (arredonde para baixo para o primeiro incremento de 1,5m) e ele não pode correr ou fazer investidas." },
    { id: "machucado", nome: "Machucado", tipo: "outras", dura: "estado", resumo: "Metade ou menos dos PV totais",
      desc: "O personagem tem metade ou menos de seus pontos de vida totais." },
    { id: "morrendo", nome: "Morrendo", tipo: "outras", dura: "estado", resumo: "0 PV; 3 turnos na cena e morre",
      av: ["Encerra com Medicina (DT 20 +5 por vez já estabilizado na cena) ou efeito específico."],
      desc: "Com 0 pontos de vida. Se iniciar três turnos morrendo na mesma cena (não necessariamente consecutivos), você morre. A condição pode ser encerrada com um teste de Medicina (DT 20 +5 por vez que já tiver sido estabilizado na cena) ou por efeitos específicos." },
    { id: "ofuscado", nome: "Ofuscado", tipo: "sentidos", resumo: "–1 dado em ataque e Percepção", ef: { d: { ataque: 1, percepcao: 1 } },
      desc: "O personagem sofre –1 dado em testes de ataque e de Percepção." },
    { id: "paralisado", nome: "Paralisado", tipo: "paralisia", resumo: "Imóvel e indefeso; só ações mentais", inc: ["imovel", "indefeso"], ef: { acoes: "mental" },
      desc: "O personagem fica imóvel e indefeso e só pode realizar ações puramente mentais." },
    { id: "pasmo", nome: "Pasmo", tipo: "mental", resumo: "Não pode fazer ações", ef: { acoes: "nenhuma" },
      desc: "O personagem não pode fazer ações." },
    { id: "perturbado", nome: "Perturbado", tipo: "outras", resumo: "Efeito de insanidade na 1ª vez na cena",
      desc: "Na primeira vez que isso acontece em uma cena, você recebe um efeito de insanidade (veja a p. 111 do Livro de Regras)." },
    { id: "petrificado", nome: "Petrificado", tipo: "outras", resumo: "Inconsciente; resistência a dano 10", inc: ["inconsciente"], ef: { rd: 10 },
      desc: "O personagem fica inconsciente e recebe resistência a dano 10." },
    { id: "sangrando", nome: "Sangrando", tipo: "outras", resumo: "Vigor DT 20 por turno ou perde 1d6 PV",
      av: ["Passou no Vigor: estabiliza e remove a condição. Estabilizar outro: ação completa + Medicina DT 20."],
      desc: "Com um ferimento aberto. No início de seus turnos, o personagem deve fazer um teste de Vigor (DT 20). Se passar, estabiliza e remove essa condição. Se falhar, perde 1d6 pontos de vida e continua sangrando. Também é possível estabilizar alguém com uma ação completa e um teste de Medicina (DT 20)." },
    { id: "surdo", nome: "Surdo", tipo: "sentidos", resumo: "Não ouve; –2 dados em Iniciativa", ef: { d: { iniciativa: 2 } },
      av: ["Não pode fazer testes de Percepção para ouvir.", "Condição ruim para lançar rituais."],
      desc: "O personagem não pode fazer testes de Percepção para ouvir e sofre –2 dados em testes de Iniciativa. Além disso, é considerado em condição ruim para lançar rituais." },
    { id: "surpreendido", nome: "Surpreendido", tipo: "outras", resumo: "Desprevenido e sem ações", inc: ["desprevenido"], ef: { acoes: "nenhuma" },
      desc: "Não ciente de seus inimigos. O personagem fica desprevenido e não pode fazer ações." },
    { id: "vulneravel", nome: "Vulnerável", tipo: "outras", resumo: "–2 na Defesa", ef: { def: -2 },
      desc: "O personagem sofre –2 na Defesa." },
  ];
  const MAPA = {};
  LISTA.forEach((c) => { MAPA[c.id] = c; });
  const ORDENADA = LISTA.slice().sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));

  /* ------------------------------------------------------------------
     Estado (por ficha)
     ------------------------------------------------------------------ */
  let ativas = []; // { id, nota } | { id, custom: true, nome, desc, nota }
  let _ficha = null;

  window.carregarCondicoesOP = function (p) {
    _ficha = p;
    ativas = Array.isArray(p && p.condicoesOP)
      ? p.condicoesOP.filter((x) => x && x.id).map((x) => ({ ...x, nota: x.nota || "" }))
      : [];
    render();
  };
  window.salvarCondicoesOP = function (p) {
    if (_ficha !== p) return; // não grava antes da ficha ser carregada
    p.condicoesOP = ativas.map((x) => ({ ...x }));
  };
  function gravar() {
    if (typeof salvarTudo === "function") salvarTudo();
  }

  const obter = (it) => (it.custom ? { id: it.id, nome: it.nome, tipo: "outras", resumo: "Condição própria", desc: it.desc || "", custom: true } : MAPA[it.id]);
  const estaAtiva = (id) => ativas.some((x) => x.id === id);

  function adicionar(id) {
    if (!MAPA[id] || estaAtiva(id)) return;
    ativas.push({ id, nota: "" });
  }
  function remover(id) {
    ativas = ativas.filter((x) => x.id !== id);
  }
  function piorar(id) {
    const c = MAPA[id];
    if (!c || !c.escala) return;
    remover(id);
    if (estaAtiva(c.escala)) piorar(c.escala);
    else adicionar(c.escala);
  }

  /* ------------------------------------------------------------------
     Soma dos efeitos (mesmo efeito não acumula: vale o mais severo)
     ------------------------------------------------------------------ */
  function calcular(lista) {
    const r = { dados: {}, def: null, defCorpo: null, defDist: null, autoRefl: null, desl: null, acoes: null, pe: null, rd: null, av: [] };
    const raizDe = new Map();
    const descer = (c, raiz) => {
      if (raizDe.has(c.id)) return;
      raizDe.set(c.id, raiz);
      (c.inc || []).forEach((i) => { if (MAPA[i]) descer(MAPA[i], raiz); });
    };
    lista.forEach((it) => { if (!it.custom && MAPA[it.id]) descer(MAPA[it.id], MAPA[it.id].nome); });

    const RANK_DESL = { "0": 3, "1,5": 2, meio: 1 };
    const RANK_ACOES = { nenhuma: 3, mental: 2, uma: 1 };
    const mais = (atual, v, f, menor) => (atual == null || (menor ? v < atual.v : v > atual.v) ? { v, f } : atual);

    raizDe.forEach((raiz, id) => {
      const c = MAPA[id];
      const ef = c.ef || {};
      Object.entries(ef.d || {}).forEach(([k, v]) => { r.dados[k] = mais(r.dados[k], v, raiz); });
      if (ef.def != null) r.def = mais(r.def, ef.def, raiz, true);
      if (ef.defCorpo != null) r.defCorpo = mais(r.defCorpo, ef.defCorpo, raiz, true);
      if (ef.defDist != null) r.defDist = mais(r.defDist, ef.defDist, raiz, false);
      if (ef.autoRefl) r.autoRefl = { v: true, f: raiz };
      if (ef.desl && (!r.desl || RANK_DESL[ef.desl] > RANK_DESL[r.desl.v])) r.desl = { v: ef.desl, f: raiz };
      if (ef.acoes && (!r.acoes || RANK_ACOES[ef.acoes] > RANK_ACOES[r.acoes.v])) r.acoes = { v: ef.acoes, f: raiz };
      if (ef.pe) r.pe = mais(r.pe, ef.pe, raiz);
      if (ef.rd) r.rd = mais(r.rd, ef.rd, raiz);
      (c.av || []).forEach((t) => { if (!r.av.some((a) => a.t === t)) r.av.push({ t, f: raiz }); });
    });
    return r;
  }

  const nd = (v) => `–${v} dado${v > 1 ? "s" : ""}`;
  const sinal = (v) => (v < 0 ? `–${-v}` : `+${v}`);

  function linhasEfeito(r) {
    const L = []; // { txt, neg, f }
    if (r.autoRefl) L.push({ txt: "Falha automática em Reflexos", neg: true, f: r.autoRefl.f });
    if (r.def) L.push({ txt: `${sinal(r.def.v)} na Defesa`, neg: true, f: r.def.f });
    if (r.defCorpo) L.push({ txt: `${sinal(r.defCorpo.v)} na Defesa contra corpo a corpo`, neg: true, f: r.defCorpo.f });
    if (r.defDist) L.push({ txt: `${sinal(r.defDist.v)} na Defesa contra ataques à distância`, neg: false, f: r.defDist.f });
    ORDEM_DADOS.forEach((k) => {
      if (!r.dados[k]) return;
      if (k === "reflexos" && r.autoRefl) return;
      L.push({ txt: `${nd(r.dados[k].v)} ${ONDE[k]}`, neg: true, f: r.dados[k].f });
    });
    if (r.desl) {
      const t = r.desl.v === "0" ? "Deslocamento 0 m" : r.desl.v === "1,5" ? "Deslocamento reduzido a 1,5 m" : "Deslocamento pela metade; não corre nem investe";
      L.push({ txt: t, neg: true, f: r.desl.f });
    }
    if (r.acoes) {
      const t = r.acoes.v === "nenhuma" ? "Não pode fazer ações" : r.acoes.v === "mental" ? "Só pode fazer ações puramente mentais" : "Só uma ação padrão ou de movimento por rodada";
      L.push({ txt: t, neg: true, f: r.acoes.f });
    }
    if (r.pe) L.push({ txt: `+${r.pe.v} PE no custo de habilidades e rituais`, neg: true, f: r.pe.f });
    if (r.rd) L.push({ txt: `Resistência a dano ${r.rd.v}`, neg: false, f: r.rd.f });
    return L;
  }

  window.efeitosCondicoesOP = () => calcular(ativas);
  window.condicoesAtivasOP = () => ativas.map((x) => (obter(x) || {}).nome).filter(Boolean);

  /* ------------------------------------------------------------------
     Cartão na aba Combate
     ------------------------------------------------------------------ */
  function montar() {
    const aba = document.getElementById("combate");
    if (!aba) return false;
    if (document.getElementById("condOP")) return true;
    const card = document.createElement("section");
    card.id = "condOP";
    card.className = "cd-card";
    const faixa = aba.querySelector(".gd-faixa-cenas");
    if (faixa) faixa.insertAdjacentElement("afterend", card);
    else aba.insertBefore(card, aba.firstChild);
    return true;
  }

  const selo = (c) => `<span class="iv-seal cd-selo cd-t-${e(c.tipo)}">${e((c.nome || "?").trim().charAt(0).toUpperCase())}</span>`;

  function render() {
    if (!montar()) return;
    const card = document.getElementById("condOP");
    const r = calcular(ativas);
    const linhas = linhasEfeito(r);
    const itens = ativas
      .map((it) => {
        const c = obter(it);
        if (!c) return "";
        return `<button type="button" class="cd-item" onclick="detalheCondOP('${e(it.id)}')">
          ${selo(c)}
          <span class="cd-info"><b>${e(c.nome)}</b><small>${e(c.resumo)}</small></span>
          ${it.nota ? `<span class="cd-nota-ic" title="Tem anotação">${svg("nota", 14)}</span>` : ""}
          <span class="cd-seta">${svg("chev", 15)}</span>
        </button>`;
      })
      .join("");

    const temCena = ativas.some((it) => it.custom || (MAPA[it.id] && MAPA[it.id].dura !== "estado"));
    const nomes = ativas.map((it) => (obter(it) || {}).nome).filter(Boolean);
    card.classList.toggle("aberto", aberto);
    card.classList.toggle("tem", ativas.length > 0);
    card.innerHTML = `
      <div class="cd-top">
        <button type="button" class="cd-cab" onclick="alternarPainelCondOP()" aria-expanded="${aberto}">
          <b>Condições</b>${ativas.length ? `<em>${ativas.length}</em>` : ""}
          ${!aberto && nomes.length ? `<span class="cd-resumo-fe">${e(nomes.join(" · "))}</span>` : ""}
          <span class="cd-chev">${svg("chev", 14)}</span>
        </button>
        <button type="button" class="cd-mais" aria-label="Adicionar condição" onclick="abrirPickerCondOP()">${svg("plus", 15)}</button>
      </div>
      ${aberto ? `
        ${ativas.length ? `<div class="cd-lista">${itens}</div>` : `<div class="cd-vazio">Nenhuma condição ativa.</div>`}
        ${linhas.length || r.av.length ? `
          <div class="cd-res">
            <span class="cd-res-t">Efeito somado</span>
            ${linhas.map((l) => `<div class="cd-lin ${l.neg ? "neg" : "pos"}"><span>${e(l.txt)}</span><small>${e(l.f)}</small></div>`).join("")}
            ${r.av.map((a) => `<div class="cd-lin av"><span>${e(a.t)}</span><small>${e(a.f)}</small></div>`).join("")}
            ${linhas.length > 1 ? `<small class="cd-regra">Mesmo efeito não acumula: vale o mais severo.</small>` : ""}
          </div>` : ""}
        ${temCena ? `<button type="button" class="cd-fim" onclick="fimDeCenaCondOP()">${svg("cena", 13)}Fim da cena</button>` : ""}` : ""}`;
  }

  let aberto = false;
  window.alternarPainelCondOP = function () {
    aberto = !aberto;
    render();
  };

  /* ------------------------------------------------------------------
     Janela (folha) — a mesma do resto do app
     ------------------------------------------------------------------ */
  let ov = null;
  function janela() {
    if (ov) return ov;
    ov = document.createElement("div");
    ov.className = "iv-ov cd-ov";
    ov.hidden = true;
    ov.innerHTML = `
      <div class="iv-sheet cd-sheet" role="dialog" aria-modal="true">
        <div class="iv-grip"></div>
        <div class="iv-sheet-top"><b id="cdTitulo"></b><button type="button" class="iv-x" aria-label="Fechar" onclick="fecharCondOP()">${svg("x", 16)}</button></div>
        <div class="iv-sheet-body cd-corpo" id="cdCorpo"></div>
        <div class="iv-sheet-foot" id="cdRodape"></div>
      </div>`;
    ov.addEventListener("click", (ev) => { if (ev.target === ov) fecharCondOP(); });
    document.body.appendChild(ov);
    return ov;
  }
  function abrir(titulo, corpo, rodape) {
    janela();
    ov.querySelector("#cdTitulo").textContent = titulo;
    const c = ov.querySelector("#cdCorpo");
    c.innerHTML = corpo;
    c.scrollTop = 0;
    ov.querySelector("#cdRodape").innerHTML = rodape;
    ov.hidden = false;
    document.documentElement.classList.add("iv-trava");
  }
  window.fecharCondOP = function () {
    if (!ov || ov.hidden) return;
    ov.hidden = true;
    if (!Object.values(window._ivFolhasOP || {}).some((o) => o && !o.hidden)) document.documentElement.classList.remove("iv-trava");
    render();
    gravar();
  };

  /* ---- detalhe de uma condição ativa ---- */
  window.detalheCondOP = function (id) {
    const it = ativas.find((x) => x.id === id);
    if (!it) return;
    const c = obter(it);
    const inc = (c.inc || []).map((i) => MAPA[i]).filter(Boolean);
    const corpo = `
      <div class="cd-meta"><span class="cd-chip">${e(TIPOS[c.tipo] || "Outras")}</span><span class="cd-chip">${c.dura === "estado" ? "Dura enquanto a situação durar" : "Termina no fim da cena"}</span></div>
      <p class="cd-desc">${e(c.desc).replace(/\n/g, "<br>")}</p>
      ${inc.length ? `<div class="cd-sub">Já inclui</div><div class="cd-chips">${inc.map((i) => `<span class="cd-chip cd-chip-i"><b>${e(i.nome)}</b> ${e(i.resumo)}</span>`).join("")}</div>` : ""}
      ${c.escala ? `<button type="button" class="cd-piora" onclick="piorarCondOP('${e(id)}')">${svg("cima", 15)}<span>Ficou ${e(c.nome.toLowerCase())} de novo<small>Vira ${e(MAPA[c.escala].nome)}</small></span></button>` : ""}
      <div class="cd-sub">Anotação</div>
      <textarea id="cdNota" rows="3" maxlength="400" placeholder="Fonte, duração, DT, dano do veneno… o que ajudar a lembrar." oninput="notaCondOP('${e(id)}', this.value)">${e(it.nota)}</textarea>`;
    abrir(c.nome, corpo, `<button type="button" class="iv-btn-o cd-rm" onclick="removerCondOP('${e(id)}')">Remover</button><button type="button" class="iv-btn-p" onclick="fecharCondOP()">Fechar</button>`);
  };
  window.notaCondOP = function (id, v) {
    const it = ativas.find((x) => x.id === id);
    if (it) it.nota = v;
  };
  window.removerCondOP = function (id) {
    remover(id);
    fecharCondOP();
  };
  window.piorarCondOP = function (id) {
    piorar(id);
    fecharCondOP();
  };

  /* ---- escolher condições ---- */
  let filtro = { tipo: "todas", q: "" };
  const semAcento = (s) => String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

  window.abrirPickerCondOP = function () {
    filtro = { tipo: "todas", q: "" };
    const chips = ["todas", "medo", "mental", "fadiga", "paralisia", "sentidos", "outras"]
      .map((t) => `<button type="button" data-t="${t}" class="${t === "todas" ? "on" : ""}" onclick="filtrarCondOP('${t}')">${t === "todas" ? "Todas" : TIPOS[t]}</button>`)
      .join("");
    const corpo = `
      <div class="cd-busca-w">${svg("lupa", 15)}<input type="text" id="cdBusca" class="cd-busca" placeholder="Buscar condição" autocomplete="off" oninput="buscarCondOP(this.value)"></div>
      <div class="iv-fil cd-fil" id="cdFil">${chips}</div>
      <div id="cdLista"></div>`;
    abrir("Adicionar condição", corpo, `<button type="button" class="iv-btn-o" onclick="novaCondOP()">Criar própria</button><button type="button" class="iv-btn-p" onclick="fecharCondOP()">Pronto</button>`);
    listarPicker();
  };
  window.filtrarCondOP = function (t) {
    filtro.tipo = t;
    document.querySelectorAll("#cdFil button").forEach((b) => b.classList.toggle("on", b.dataset.t === t));
    listarPicker();
  };
  window.buscarCondOP = function (q) {
    filtro.q = semAcento(q);
    listarPicker();
  };
  function listarPicker() {
    const box = document.getElementById("cdLista");
    if (!box) return;
    let base = ORDENADA.filter((c) => (filtro.tipo === "todas" || c.tipo === filtro.tipo) && (!filtro.q || semAcento(c.nome + " " + c.resumo).includes(filtro.q)));
    const proprias = ativas.filter((x) => x.custom && (filtro.tipo === "todas" || filtro.tipo === "outras") && (!filtro.q || semAcento(x.nome).includes(filtro.q)));
    const html = base
      .map((c) => {
        const on = estaAtiva(c.id);
        return `<div class="iv-item cd-opc ${on ? "on" : ""}" onclick="alternarCondOP('${e(c.id)}')">
          ${selo(c)}
          <div class="iv-info"><div class="iv-nome">${e(c.nome)}</div><div class="iv-meta">${e(c.resumo)}</div></div>
          ${on && c.escala ? `<button type="button" class="cd-up" title="Piorar → ${e(MAPA[c.escala].nome)}" aria-label="Piorar" onclick="event.stopPropagation();piorarPickerCondOP('${e(c.id)}')">${svg("cima", 14)}</button>` : ""}
          <span class="cd-ck">${on ? svg("check", 15) : ""}</span>
        </div>`;
      })
      .join("");
    const htmlP = proprias
      .map((it) => `<div class="iv-item cd-opc on" onclick="alternarCondOP('${e(it.id)}')">
          ${selo({ nome: it.nome, tipo: "outras" })}
          <div class="iv-info"><div class="iv-nome">${e(it.nome)}</div><div class="iv-meta">Condição própria</div></div>
          <span class="cd-ck">${svg("check", 15)}</span></div>`)
      .join("");
    box.innerHTML = htmlP + html || `<div class="iv-vazio">Nenhuma condição encontrada.</div>`;
  }
  window.alternarCondOP = function (id) {
    if (estaAtiva(id)) remover(id);
    else adicionar(id);
    listarPicker();
    render();
    gravar();
  };
  window.piorarPickerCondOP = function (id) {
    piorar(id);
    listarPicker();
    render();
    gravar();
  };

  /* ---- condição própria ---- */
  window.novaCondOP = function () {
    const corpo = `
      <p class="cd-desc">Para debuffs que não estão na lista: efeito de ritual, de item, de criatura ou de regra da mesa.</p>
      <div class="cd-sub">Nome</div>
      <input type="text" id="cdNomeP" maxlength="40" placeholder="Ex.: Marca do Sangue" autocomplete="off">
      <div class="cd-sub">O que ela faz</div>
      <textarea id="cdDescP" rows="4" maxlength="500" placeholder="Ex.: –1 dado em Ocultismo; dura até o fim da próxima cena."></textarea>`;
    abrir("Condição própria", corpo, `<button type="button" class="iv-btn-o" onclick="abrirPickerCondOP()">Voltar</button><button type="button" class="iv-btn-p" onclick="salvarNovaCondOP()">Adicionar</button>`);
  };
  window.salvarNovaCondOP = function () {
    const nome = (document.getElementById("cdNomeP").value || "").trim();
    const desc = (document.getElementById("cdDescP").value || "").trim();
    if (!nome) { document.getElementById("cdNomeP").focus(); return; }
    ativas.push({ id: "p" + Date.now().toString(36), custom: true, nome, desc, nota: "" });
    render();
    gravar();
    abrirPickerCondOP();
  };

  /* ---- fim da cena ---- */
  window.fimDeCenaCondOP = async function () {
    const saem = ativas.filter((it) => it.custom || (MAPA[it.id] && MAPA[it.id].dura !== "estado"));
    if (!saem.length) return;
    const ficam = ativas.length - saem.length;
    const msg = `Encerrar ${saem.length === 1 ? "1 condição" : saem.length + " condições"} que terminam no fim da cena?` + (ficam ? ` ${ficam === 1 ? "1 que dura" : ficam + " que duram"} além da cena (doente, machucado, morrendo, enlouquecendo) ${ficam === 1 ? "continua" : "continuam"}.` : "");
    const ok = typeof confirmBonito === "function" ? await confirmBonito(msg) : true;
    if (!ok) return;
    ativas = ativas.filter((it) => !saem.includes(it));
    render();
    gravar();
  };

  function iniciar() {
    render();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", iniciar);
  else iniciar();
})();