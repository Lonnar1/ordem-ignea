/* =====================================================================
   SOCIAL (login, Amigos e Perfil) — trazido do app Ficha Ígnea para o site de Ordem
   Depende do script.js (abrirPopup, alertBonito, confirmBonito, abrirPerfil antigo)
   e das funções do Firebase expostas no index.html.
   ===================================================================== */

function tempoRelativo(ms) {
  const s = Math.max(0, Math.round((Date.now() - (ms || 0)) / 1000));
  if (s < 45) return "agora";
  const min = Math.round(s / 60);
  if (min < 60) return `há ${min} min`;
  const h = Math.round(min / 60);
  if (h < 24) return `há ${h} h`;
  const d = Math.round(h / 24);
  return `há ${d} ${d === 1 ? "dia" : "dias"}`;
}

/* =====================================================================
   PERFIL: mural, elogios, conquistas, títulos, estatísticas de dados,
   procurando mesa, status, ações, molduras e fundos
   usuarios/{uid}                 → stats, conquistas, titulo, moldura, efeitoFundo,
                                    procurandoMesa, vistoEm, atividade, mostrarStatus
   usuarios/{uid}/recados/{id}    → recados do mural (só amigos escrevem)
   usuarios/{uid}/elogios/{deUid} → selos que cada amigo deu
   ===================================================================== */

var SELOS_ELOGIO = [
  { id: "rp", ic: "🎭", nome: "Bom de RP" },
  { id: "justo", ic: "⚖️", nome: "Mestre justo" },
  { id: "nat20", ic: "🎲", nome: "Rei do nat 20" },
  { id: "salvou", ic: "🛡️", nome: "Salvou o grupo" },
  { id: "estrategista", ic: "🧠", nome: "Estrategista" },
  { id: "comico", ic: "😂", nome: "Alívio cômico" },
  { id: "narrador", ic: "📜", nome: "Narrador nato" },
  { id: "leal", ic: "🤝", nome: "Parceiro leal" },
];

var CONQUISTAS = [
  { id: "primeira_rolagem", ic: "🎲", nome: "Primeiros dados", desc: "Rolou o primeiro dado no app.", titulo: "Aprendiz dos Dados", ok: (c) => c.stats.rolagens >= 1 },
  { id: "nat20", ic: "✨", nome: "Crítico!", desc: "Tirou o primeiro 20 natural.", titulo: "Tocado pela Sorte", ok: (c) => c.stats.nat20 >= 1 },
  { id: "nat20_10", ic: "🌟", nome: "Favorito dos deuses", desc: "10 vezes 20 natural.", titulo: "Favorito dos Deuses", ok: (c) => c.stats.nat20 >= 10 },
  { id: "nat1_10", ic: "💀", nome: "Dado amaldiçoado", desc: "10 vezes 1 natural.", titulo: "Amaldiçoado dos Dados", ok: (c) => c.stats.nat1 >= 10 },
  { id: "rol_100", ic: "🔥", nome: "Mão quente", desc: "100 rolagens.", titulo: "Mão Quente", ok: (c) => c.stats.rolagens >= 100 },
  { id: "rol_1000", ic: "☄️", nome: "Lenda das rolagens", desc: "1000 rolagens.", titulo: "Lenda das Rolagens", ok: (c) => c.stats.rolagens >= 1000 },
  { id: "dano_50", ic: "💥", nome: "Golpe devastador", desc: "Rolou 50 ou mais de dano de uma vez.", titulo: "Destruidor", ok: (c) => c.stats.maiorDano >= 50 },
  { id: "por_um_fio", ic: "🩸", nome: "Por um fio", desc: "Ficou com 1 PV e continuou de pé.", titulo: "Sobrevivente", ok: (c) => !!c.stats.porUmFio },
  { id: "fichas_3", ic: "📚", nome: "Colecionador de heróis", desc: "Tem 3 fichas ou mais.", titulo: "Colecionador de Heróis", ok: (c) => c.nFichas >= 3 },
  { id: "domador", ic: "🐾", nome: "Domador", desc: "Tem um companheiro numa ficha.", titulo: "Domador de Feras", ok: (c) => c.temCompanheiro },
  { id: "grupo", ic: "🏕️", nome: "Companhia formada", desc: "Entrou num grupo.", titulo: "Membro da Companhia", ok: (c) => c.emGrupo },
  { id: "mestre", ic: "📖", nome: "Narrador", desc: "Criou a primeira campanha.", titulo: "Narrador", ok: (c) => c.nCampanhas >= 1 },
  { id: "mestre_3", ic: "🗺️", nome: "Mestre de mundos", desc: "3 campanhas ou mais.", titulo: "Mestre de Mundos", ok: (c) => c.nCampanhas >= 3 },
  { id: "amigos_5", ic: "🍻", nome: "Taverneiro popular", desc: "5 amigos ou mais.", titulo: "Taverneiro Popular", ok: (c) => c.nAmigos >= 5 },
  { id: "elogiado_10", ic: "🏅", nome: "Querido da mesa", desc: "Recebeu 10 elogios.", titulo: "Querido da Mesa", ok: (c) => c.nElogios >= 10 },
];

// molduras do avatar e efeitos do fundo: livre, por conquista ou por plano pago
var MOLDURAS = [
  { id: "", nome: "Simples" },
  { id: "ouro", nome: "Ouro" },
  { id: "brasas", nome: "Brasas", conquista: "nat20" },
  { id: "runas", nome: "Runas", conquista: "mestre" },
  { id: "sangue", nome: "Sangue", conquista: "nat1_10" },
  { id: "natureza", nome: "Natureza", conquista: "domador" },
  { id: "lendaria", nome: "Lendária", plano: true },
  { id: "gelo", nome: "Gelo", plano: true },
];
var EFEITOS_FUNDO = [
  { id: "", nome: "Nenhum" },
  { id: "nevoa", nome: "Névoa", conquista: "grupo" },
  { id: "estrelas", nome: "Estrelas", conquista: "rol_100" },
  { id: "brasas", nome: "Brasas subindo", plano: true },
  { id: "runas", nome: "Runas girando", plano: true },
];

var DIAS_SEMANA = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

window._pf = window._pf || { uid: null, ehMeu: false, d: {}, ehAmigo: false, recados: [], elogios: [], unsubRecados: null };

function pfStatsVazias() {
  return { rolagens: 0, d20: 0, nat20: 0, nat1: 0, maiorDano: 0, porUmFio: false };
}

/* ---------- estatísticas de dados (contadas no próprio aparelho e salvas no perfil) ---------- */
window._pfStats = null;
window._pfStatsCarregando = null;

async function pfGarantirStats() {
  if (window._pfStats) return window._pfStats;
  if (window._pfStatsCarregando) return window._pfStatsCarregando;
  window._pfStatsCarregando = (async () => {
    let base = pfStatsVazias();
    try {
      const uid = window.usuarioAtual?.uid;
      if (uid && window.getDoc) {
        const s = await getDoc(doc(db, "usuarios", uid));
        if (s.exists() && s.data().stats) base = { ...base, ...s.data().stats };
      }
    } catch (e) {}
    window._pfStats = base;
    return base;
  })();
  return window._pfStatsCarregando;
}

function pfSalvarStatsDepois() {
  clearTimeout(window._pfStatsTimer);
  window._pfStatsTimer = setTimeout(async () => {
    const uid = window.usuarioAtual?.uid;
    if (!uid || !window._pfStats || !window.setDoc) return;
    try {
      await setDoc(doc(db, "usuarios", uid), { stats: window._pfStats }, { merge: true });
    } catch (e) {
      console.warn("stats:", e.code || e.message);
    }
  }, 4000);
}

async function pfContarRolagem(r) {
  if (!window.usuarioAtual) return;
  const st = await pfGarantirStats();
  st.rolagens = (st.rolagens || 0) + 1;
  if (r.tipo === "d20") {
    st.d20 = (st.d20 || 0) + 1;
    if (r.nat === "crit") st.nat20 = (st.nat20 || 0) + 1;
    if (r.nat === "falha") st.nat1 = (st.nat1 || 0) + 1;
  } else if (r.tipo === "expr") {
    st.maiorDano = Math.max(st.maiorDano || 0, parseInt(r.total) || 0);
  }
  pfSalvarStatsDepois();
}

// conta as rolagens de perícia da ficha (mostrarRolagemOP é o painel de rolagem do site)
(function () {
  if (typeof mostrarRolagemOP !== "function" || mostrarRolagemOP._pf) return;
  const orig = mostrarRolagemOP;
  mostrarRolagemOP = function (r) {
    const out = orig.apply(this, arguments);
    try {
      pfContarRolagem({ tipo: "d20", nat: r && r.escolhido === 20 ? "crit" : r && r.escolhido === 1 ? "falha" : "" });
    } catch (e) {}
    return out;
  };
  mostrarRolagemOP._pf = true;
  window.mostrarRolagemOP = mostrarRolagemOP;
})();

// "Por um fio": ficar com exatamente 1 PV numa ficha com 10+ de vida máxima
(function () {
  if (typeof atualizarHP !== "function" || atualizarHP._pf) return;
  const orig = atualizarHP;
  atualizarHP = function () {
    const out = orig.apply(this, arguments);
    try {
      if (typeof vidaAtual !== "undefined" && vidaAtual === 1 && get("vidaMax") >= 10 && window.usuarioAtual) {
        pfGarantirStats().then((st) => {
          if (!st.porUmFio) {
            st.porUmFio = true;
            pfSalvarStatsDepois();
          }
        });
      }
    } catch (e) {}
    return out;
  };
  atualizarHP._pf = true;
  window.atualizarHP = atualizarHP;
})();

/* ---------- status: online / jogando ---------- */
function pfAtividadeAgora() {
  const ficha = document.getElementById("ficha");
  const master = document.getElementById("masterIgnea");
  if (ficha && ficha.style.display === "block" && personagemAtual !== null && personagens[personagemAtual]) {
    return `Jogando com ${personagens[personagemAtual].nome || "uma ficha"}`;
  }
  if (master && master.style.display && master.style.display !== "none") return "Mestrando";
  return "";
}

async function pfBatimento() {
  const uid = window.usuarioAtual?.uid;
  if (!uid || !window.setDoc || document.visibilityState === "hidden") return;
  try {
    await setDoc(doc(db, "usuarios", uid), { vistoEm: Date.now(), atividade: { texto: pfAtividadeAgora(), em: Date.now() } }, { merge: true });
  } catch (e) {}
}
setInterval(pfBatimento, 120000);
document.addEventListener("visibilitychange", () => { if (document.visibilityState === "visible") pfBatimento(); });
setTimeout(pfBatimento, 8000);

function pfStatusTexto(d) {
  if (d.mostrarStatus === false || !d.vistoEm) return "";
  const diff = Date.now() - d.vistoEm;
  if (diff < 4 * 60 * 1000) {
    const at = d.atividade?.texto && Date.now() - (d.atividade.em || 0) < 4 * 60 * 1000 ? ` · ${esc(d.atividade.texto)}` : "";
    return `<span class="pf-online"></span>Online${at}`;
  }
  return `Visto ${tempoRelativo(d.vistoEm)}`;
}

/* ---------- conquistas ---------- */
async function pfContextoConquistas(uid) {
  const st = { ...pfStatsVazias(), ...(await pfGarantirStats()) };
  let nAmigos = 0;
  try {
    nAmigos = (await getDocs(collection(db, "usuarios", uid, "amigos"))).docs.length;
  } catch (e) {}
  return {
    stats: st,
    nFichas: (personagens || []).length,
    temCompanheiro: (personagens || []).some((p) => Array.isArray(p.companheiros) && p.companheiros.length),
    emGrupo: (personagens || []).some((p) => p.grupoAtivo),
    nCampanhas: (typeof campanhasMaster !== "undefined" ? campanhasMaster : []).length,
    nAmigos,
    nElogios: window._pf.elogios.reduce((s, e) => s + (e.selos || []).length, 0),
  };
}

async function pfAtualizarConquistas(uid) {
  const ctx = await pfContextoConquistas(uid);
  const ganhas = CONQUISTAS.filter((c) => {
    try { return c.ok(ctx); } catch (e) { return false; }
  }).map((c) => c.id);
  const antes = (window._pf.d.conquistas || []).slice().sort().join(",");
  window._pf.ctx = ctx;
  if (ganhas.slice().sort().join(",") !== antes) {
    window._pf.d.conquistas = ganhas;
    try {
      await setDoc(doc(db, "usuarios", uid), { conquistas: ganhas, stats: ctx.stats }, { merge: true });
    } catch (e) {}
  }
  return ganhas;
}

function pfTemConquista(id) {
  return (window._pf.d.conquistas || []).includes(id);
}

function pfTituloTexto(d) {
  const c = CONQUISTAS.find((x) => x.id === d.titulo);
  return c && (d.conquistas || []).includes(c.id) ? c.titulo : "";
}

/* ---------- render principal ---------- */
async function renderPerfilExtras(uid, ehMeu, d) {
  const pf = window._pf;
  pf.uid = uid;
  pf.ehMeu = ehMeu;
  pf.d = { ...d };
  pf.recados = [];
  pf.elogios = [];
  pf.ehAmigo = false;
  if (pf.unsubRecados) { pf.unsubRecados(); pf.unsubRecados = null; }

  pfAplicarVisual(d);
  pfRenderCabecalho();
  document.getElementById("perfilExtras").innerHTML = `<p class="pf-vazio">Carregando...</p>`;
  document.getElementById("perfilAcoes").innerHTML = "";
  pfRenderProcurando();

  const meuUid = window.usuarioAtual.uid;
  try {
    if (!ehMeu) pf.ehAmigo = (await getDoc(doc(db, "usuarios", meuUid, "amigos", uid))).exists();
  } catch (e) {}
  try {
    pf.elogios = (await getDocs(collection(db, "usuarios", uid, "elogios"))).docs.map((x) => ({ id: x.id, ...x.data() }));
  } catch (e) {
    pf.elogios = [];
  }
  if (ehMeu) await pfAtualizarConquistas(uid);

  pfRenderAcoes();
  pfRenderCabecalho();
  pfRenderExtras();
  pfEsconderVazios();

  try {
    pf.unsubRecados = onSnapshot(
      query(collection(db, "usuarios", uid, "recados"), orderBy("em", "desc"), limit(30)),
      (snap) => {
        if (window._pf.uid !== uid) return;
        pf.recados = snap.docs.map((x) => ({ id: x.id, ...x.data() }));
        pfRenderMural();
      },
      (err) => console.warn("recados:", err.code || err.message),
    );
  } catch (e) {}
}

// fecha a escuta do mural junto com o perfil
(function () {
  const orig = window.fecharPerfil;
  window.fecharPerfil = function () {
    if (window._pf.unsubRecados) { window._pf.unsubRecados(); window._pf.unsubRecados = null; }
    window._pf.uid = null;
    return orig.apply(this, arguments);
  };
})();

// no perfil dos outros, some com as partes vazias (no seu fica tudo, com as dicas)
function pfEsconderVazios() {
  const { ehMeu, d, ehAmigo } = window._pf;
  const bio = document.getElementById("perfilBioView");
  const showcase = document.getElementById("perfilShowcase");
  const rotuloPers = showcase?.previousElementSibling;
  const semPers = !(d.personagensDestaque || []).length;
  const semBio = !(d.bio || "").trim();
  const mostrar = (el, sim) => { if (el) el.style.display = sim ? "" : "none"; };
  if (ehMeu) {
    mostrar(bio, true); mostrar(showcase, true); mostrar(rotuloPers, true);
    document.getElementById("pfPerfilVazio")?.remove();
    return;
  }
  mostrar(bio, !semBio);
  mostrar(showcase, !semPers);
  mostrar(rotuloPers, !semPers);
  const semConq = !(d.conquistas || []).length;
  const semDados = !(d.stats && d.stats.rolagens);
  const semElogios = !window._pf.elogios.length;
  mostrar(document.getElementById("pfSecConquistas"), !semConq);
  mostrar(document.getElementById("pfSecDados"), !semDados);
  mostrar(document.getElementById("pfSecElogios"), !semElogios || ehAmigo);
  const tudoVazio = semBio && semPers && semConq && semDados && semElogios && !(d.procurandoMesa && d.procurandoMesa.ativo);
  const extras = document.getElementById("perfilExtras");
  document.getElementById("pfPerfilVazio")?.remove();
  if (tudoVazio && extras) {
    extras.insertAdjacentHTML(
      "afterbegin",
      `<div id="pfPerfilVazio" class="pf-perfil-vazio"><span>📜</span><p>${esc(d.nickname || "Essa pessoa")} ainda não preencheu o perfil.</p>${ehAmigo ? `<small>Que tal deixar o primeiro recado?</small>` : ""}</div>`,
    );
  }
}

function pfAplicarVisual(d) {
  const wrap = document.getElementById("perfilAvatarWrap");
  const fundo = document.getElementById("perfilFundo");
  if (wrap) wrap.dataset.moldura = d.moldura || "";
  if (fundo) fundo.dataset.efeito = d.efeitoFundo || "";
}

function pfRenderCabecalho() {
  const { d, ehMeu } = window._pf;
  const tEl = document.getElementById("perfilTitulo");
  const sEl = document.getElementById("perfilStatus");
  const titulo = pfTituloTexto(d);
  if (tEl) {
    tEl.innerHTML = titulo
      ? `<span>${esc(titulo)}</span>${ehMeu ? ` <button type="button" class="pf-mini-btn" onclick="abrirEscolherTitulo()" title="Trocar título"><i class="ti ti-pencil"></i></button>` : ""}`
      : ehMeu && (d.conquistas || []).length
        ? `<button type="button" class="pf-link" onclick="abrirEscolherTitulo()">Escolher um título</button>`
        : "";
  }
  if (sEl) sEl.innerHTML = pfStatusTexto(d);
}

function pfRenderAcoes() {
  const { uid, ehMeu, d, ehAmigo } = window._pf;
  const box = document.getElementById("perfilAcoes");
  if (!box) return;
  if (ehMeu) {
    box.innerHTML = `
      <button type="button" class="pf-acao" onclick="abrirVisualPerfil()"><i class="ti ti-sparkles"></i><span>Moldura e fundo</span></button>
      <button type="button" class="pf-acao" onclick="abrirProcurandoMesa()"><i class="ti ti-calendar"></i><span>Disponível pra jogar</span></button>`;
    return;
  }
  const nick = esc(d.nickname || "");
  const tag = esc(d.tag || "");
  box.innerHTML = `
    ${ehAmigo
      ? `<button type="button" class="pf-acao" onclick="abrirConvidarParaGrupo()"><i class="ti ti-users-plus"></i><span>Convidar pro grupo</span></button>`
      : `<button type="button" class="pf-acao destaque" onclick="window.enviarSolicitacaoAmizadePorUid('${esc(uid)}', '${nick}', '${tag}')"><i class="ti ti-user-plus"></i><span>Adicionar amigo</span></button>`}
    <button type="button" class="pf-acao" id="pfBtnMesas" onclick="abrirMesasEmComum()"><i class="ti ti-swords"></i><span>Mesas em comum</span></button>`;
  pfContarMesasEmComum().then((lista) => {
    const b = document.getElementById("pfBtnMesas");
    if (b && window._pf.uid === uid) b.querySelector("span").textContent = lista.length ? `${lista.length} ${lista.length === 1 ? "mesa" : "mesas"} em comum` : "Nenhuma mesa em comum";
  });
}

function pfRenderProcurando() {
  const box = document.getElementById("perfilProcurando");
  const pm = window._pf.d.procurandoMesa;
  if (!box) return;
  if (!pm || !pm.ativo) {
    box.innerHTML = "";
    return;
  }
  const modo = { jogador: "Disponível pra jogar", mestre: "Disponível pra mestrar", ambos: "Disponível pra jogar ou mestrar" }[pm.modo] || "Disponível pra jogar";
  box.innerHTML = `
    <div class="pf-procurando">
      <div class="pf-procurando-topo"><i class="ti ti-calendar"></i><strong>${modo}</strong></div>
      ${pm.sistemas ? `<div class="pf-procurando-linha"><span>Sistemas</span>${esc(pm.sistemas)}</div>` : ""}
      ${(pm.dias || []).length ? `<div class="pf-dias">${DIAS_SEMANA.map((dd) => `<span class="${pm.dias.includes(dd) ? "on" : ""}">${dd}</span>`).join("")}</div>` : ""}
      ${pm.periodo ? `<div class="pf-procurando-linha"><span>Horário</span>${esc(pm.periodo)}</div>` : ""}
      ${pm.obs ? `<p class="pf-procurando-obs">${esc(pm.obs)}</p>` : ""}
    </div>`;
}

function pfRenderExtras() {
  const box = document.getElementById("perfilExtras");
  if (!box) return;
  box.innerHTML = `
    <div class="pf-secao" id="pfSecConquistas"></div>
    <div class="pf-secao" id="pfSecDados"></div>
    <div class="pf-secao" id="pfSecElogios"></div>
    <div class="pf-secao" id="pfSecMural"></div>`;
  pfRenderConquistas();
  pfRenderDados();
  pfRenderElogios();
  pfRenderMural();
}

function pfTituloSecao(ic, txt, extra) {
  return `<div class="pf-secao-titulo"><span>${ic} ${txt}</span>${extra || ""}</div>`;
}

function pfRenderConquistas() {
  const box = document.getElementById("pfSecConquistas");
  if (!box) return;
  const ganhas = window._pf.d.conquistas || [];
  const lista = window._pf.ehMeu ? CONQUISTAS : CONQUISTAS.filter((c) => ganhas.includes(c.id));
  box.innerHTML =
    pfTituloSecao("🏆", "Conquistas", `<small>${ganhas.length}/${CONQUISTAS.length}</small>`) +
    (lista.length
      ? `<div class="pf-medalhas">${lista
          .map((c) => {
            const tem = ganhas.includes(c.id);
            return `<button type="button" class="pf-medalha ${tem ? "" : "bloqueada"}" onclick="verConquista('${c.id}')" title="${esc(c.nome)}"><span>${tem ? c.ic : "🔒"}</span></button>`;
          })
          .join("")}</div>`
      : `<p class="pf-vazio">Nenhuma conquista ainda.</p>`);
}

function verConquista(id) {
  const c = CONQUISTAS.find((x) => x.id === id);
  if (!c) return;
  const tem = pfTemConquista(id);
  const html = `
    <div class="pf-conq-ver">
      <div class="pf-conq-ic ${tem ? "" : "bloqueada"}">${tem ? c.ic : "🔒"}</div>
      <p>${esc(c.desc)}</p>
      <div class="pf-conq-titulo">Título: <b>${esc(c.titulo)}</b></div>
      ${tem && window._pf.ehMeu ? `<button type="button" class="inv-add-btn btn-adicionar" onclick="definirTitulo('${c.id}')"><span>Usar esse título</span></button>` : ""}
      ${!tem ? `<p class="pf-vazio">Ainda não conquistada.</p>` : ""}
    </div>`;
  abrirPopup(c.nome, html, true, null);
}

function abrirEscolherTitulo() {
  const ganhas = window._pf.d.conquistas || [];
  const atual = window._pf.d.titulo || "";
  const ops = [`<button type="button" class="pf-op ${!atual ? "ativo" : ""}" onclick="definirTitulo('')"><span>Sem título</span></button>`]
    .concat(
      CONQUISTAS.filter((c) => ganhas.includes(c.id)).map(
        (c) => `<button type="button" class="pf-op ${atual === c.id ? "ativo" : ""}" onclick="definirTitulo('${c.id}')"><span>${c.ic} ${esc(c.titulo)}</span><small>${esc(c.nome)}</small></button>`,
      ),
    )
    .join("");
  abrirPopup("Escolher título", `<div class="pf-ops">${ops}</div>`, true, null);
}

async function definirTitulo(id) {
  window._pf.d.titulo = id;
  try {
    await setDoc(doc(db, "usuarios", window.usuarioAtual.uid), { titulo: id }, { merge: true });
  } catch (e) {
    return alertBonito("Não consegui salvar o título agora.");
  }
  fecharPopup();
  pfRenderCabecalho();
}

function pfRenderDados() {
  const box = document.getElementById("pfSecDados");
  if (!box) return;
  const st = { ...pfStatsVazias(), ...(window._pf.ehMeu ? window._pf.ctx?.stats || window._pfStats || {} : window._pf.d.stats || {}) };
  if (!st.rolagens) {
    box.innerHTML = pfTituloSecao("🎲", "Dados") + `<p class="pf-vazio">${window._pf.ehMeu ? "Role uns dados na ficha pra começar a contar." : "Ainda não rolou nenhum dado."}</p>`;
    return;
  }
  const taxa20 = st.d20 ? st.nat20 / st.d20 : 0;
  const taxa1 = st.d20 ? st.nat1 / st.d20 : 0;
  let humor = "";
  if (st.d20 >= 20) {
    if (taxa20 - taxa1 >= 0.03) humor = `<div class="pf-humor quente">🔥 Dado quente</div>`;
    else if (taxa1 - taxa20 >= 0.03) humor = `<div class="pf-humor frio">🧊 Dado frio</div>`;
    else humor = `<div class="pf-humor">⚖️ Dado honesto</div>`;
  }
  box.innerHTML =
    pfTituloSecao("🎲", "Dados", humor) +
    `<div class="pf-numeros">
      <div><b>${st.rolagens}</b><span>rolagens</span></div>
      <div class="bom"><b>${st.nat20}</b><span>20 natural</span></div>
      <div class="ruim"><b>${st.nat1}</b><span>1 natural</span></div>
      <div><b>${st.maiorDano || 0}</b><span>maior dano</span></div>
    </div>`;
}

function pfRenderElogios() {
  const box = document.getElementById("pfSecElogios");
  if (!box) return;
  const { ehMeu, ehAmigo, elogios } = window._pf;
  const cont = {};
  elogios.forEach((e) => (e.selos || []).forEach((s) => (cont[s] = (cont[s] || 0) + 1)));
  const recebidos = SELOS_ELOGIO.filter((s) => cont[s.id]).sort((a, b) => cont[b.id] - cont[a.id]);
  box.innerHTML =
    pfTituloSecao("🏅", "Elogios de mesa", !ehMeu && ehAmigo ? `<button type="button" class="pf-link" onclick="abrirDarElogio()">Elogiar</button>` : "") +
    (recebidos.length
      ? `<div class="pf-selos">${recebidos.map((s) => `<span class="pf-selo"><i>${s.ic}</i>${esc(s.nome)}<b>${cont[s.id]}</b></span>`).join("")}</div>`
      : `<p class="pf-vazio">${ehMeu ? "Seus amigos podem te dar elogios depois de jogar junto." : "Seja o primeiro a elogiar."}</p>`);
}

function abrirDarElogio() {
  const meu = window._pf.elogios.find((e) => e.id === window.usuarioAtual.uid);
  window._pfSelosTemp = new Set(meu?.selos || []);
  const html = `
    <div class="pf-dar-elogio">
      <p class="pf-vazio" style="text-align:left">Escolha o que combina com ${esc(window._pf.d.nickname || "essa pessoa")} na mesa. Dá pra mudar depois.</p>
      <div class="pf-selos-escolha">
        ${SELOS_ELOGIO.map((s) => `<button type="button" class="pf-selo-op ${window._pfSelosTemp.has(s.id) ? "ativo" : ""}" onclick="alternarSeloTemp(this, '${s.id}')"><i>${s.ic}</i><span>${esc(s.nome)}</span></button>`).join("")}
      </div>
      <button type="button" class="inv-add-btn btn-adicionar" onclick="salvarElogio()"><span>Salvar elogios</span></button>
    </div>`;
  abrirPopup("Elogiar", html, true, null);
}

function alternarSeloTemp(btn, id) {
  const s = window._pfSelosTemp;
  if (s.has(id)) s.delete(id);
  else s.add(id);
  btn.classList.toggle("ativo", s.has(id));
}

async function salvarElogio() {
  const uid = window._pf.uid;
  const meuUid = window.usuarioAtual.uid;
  const selos = [...window._pfSelosTemp].filter((id) => SELOS_ELOGIO.some((s) => s.id === id));
  try {
    const ref = doc(db, "usuarios", uid, "elogios", meuUid);
    if (selos.length) await setDoc(ref, { selos, deUid: meuUid, em: Date.now() });
    else await deleteDoc(ref);
    window._pf.elogios = window._pf.elogios.filter((e) => e.id !== meuUid);
    if (selos.length) window._pf.elogios.push({ id: meuUid, selos, deUid: meuUid });
    fecharPopup();
    pfRenderElogios();
    if (typeof mostrarToastMundo === "function") mostrarToastMundo("Elogios salvos");
  } catch (e) {
    console.error(e);
    alertBonito("Não consegui salvar. " + (e.code === "permission-denied" ? "Confira se as regras novas do Firebase foram publicadas." : ""));
  }
}

/* ---------- mural de recados ---------- */
function pfRenderMural() {
  const box = document.getElementById("pfSecMural");
  if (!box) return;
  const { ehMeu, ehAmigo, recados } = window._pf;
  const meuUid = window.usuarioAtual?.uid;
  const podeEscrever = !ehMeu && ehAmigo;
  box.style.display = !ehMeu && !ehAmigo && !recados.length ? "none" : "";
  box.innerHTML =
    pfTituloSecao("📜", "Mural", recados.length ? `<small>${recados.length}</small>` : "") +
    (podeEscrever
      ? `<div class="pf-recado-novo">
          <textarea id="pfRecadoTexto" maxlength="280" placeholder="Deixe um recado..." oninput="document.getElementById('pfRecadoCont').textContent = this.value.length + '/280'"></textarea>
          <div class="pf-recado-novo-rodape"><small id="pfRecadoCont">0/280</small><button type="button" class="pf-enviar" onclick="enviarRecado()"><i class="ti ti-send"></i> Enviar</button></div>
        </div>`
      : "") +
    (recados.length
      ? `<div class="pf-recados">${recados
          .map(
            (r) => `
        <div class="pf-recado">
          <button type="button" class="pf-recado-av" style="${r.deFoto ? `background-image:url('${esc(r.deFoto)}')` : ""}" onclick="abrirPerfil('${esc(r.deUid)}')"></button>
          <div class="pf-recado-corpo">
            <div class="pf-recado-topo"><button type="button" class="pf-recado-nome" onclick="abrirPerfil('${esc(r.deUid)}')">${esc(r.deNickname || "Alguém")}<span>#${esc(r.deTag || "")}</span></button><small>${tempoRelativo(r.em)}</small></div>
            <p>${esc(r.texto || "")}</p>
          </div>
          ${ehMeu || r.deUid === meuUid ? `<button type="button" class="pf-recado-x" title="Apagar" onclick="apagarRecado('${esc(r.id)}')"><i class="ti ti-x"></i></button>` : ""}
        </div>`,
          )
          .join("")}</div>`
      : ehMeu ? `<p class="pf-vazio">Quando seus amigos deixarem recados, eles aparecem aqui.</p>` : "");
}

async function enviarRecado() {
  const el = document.getElementById("pfRecadoTexto");
  const texto = (el?.value || "").trim().slice(0, 280);
  if (!texto) return el?.focus();
  const meuUid = window.usuarioAtual.uid;
  try {
    const eu = (await getDoc(doc(db, "usuarios", meuUid))).data() || {};
    await addDoc(collection(db, "usuarios", window._pf.uid, "recados"), {
      deUid: meuUid,
      deNickname: eu.nickname || "",
      deTag: eu.tag || "",
      deFoto: eu.fotoPerfil || "",
      texto,
      em: Date.now(),
    });
    if (el) el.value = "";
  } catch (e) {
    console.error(e);
    alertBonito("Não consegui enviar o recado. " + (e.code === "permission-denied" ? "Confira se as regras novas do Firebase foram publicadas." : ""));
  }
}

async function apagarRecado(id) {
  if (!(await confirmBonito("Apagar esse recado?"))) return;
  try {
    await deleteDoc(doc(db, "usuarios", window._pf.uid, "recados", id));
  } catch (e) {
    alertBonito("Não consegui apagar agora.");
  }
}

/* ---------- mesas em comum e convite ---------- */
async function pfMeusGrupos() {
  const meuUid = window.usuarioAtual.uid;
  try {
    const snap = await getDocs(query(collection(db, "grupos"), where("membrosUids", "array-contains", meuUid)));
    return snap.docs.map((x) => ({ id: x.id, ...x.data() }));
  } catch (e) {
    console.warn("grupos:", e.code || e.message);
    return [];
  }
}

async function pfContarMesasEmComum() {
  const uid = window._pf.uid;
  const grupos = await pfMeusGrupos();
  return grupos.filter((g) => (g.membrosUids || []).includes(uid));
}

async function abrirMesasEmComum() {
  const lista = await pfContarMesasEmComum();
  const html = lista.length
    ? `<div class="pf-ops">${lista.map((g) => `<div class="pf-op parado"><span>🏕️ ${esc(g.nome || "Grupo")}</span><small>${(g.membrosUids || []).length} membros</small></div>`).join("")}</div>`
    : `<p class="pf-vazio">Vocês ainda não estão em nenhum grupo juntos.</p>`;
  abrirPopup("Mesas em comum", html, true, null);
}

async function abrirConvidarParaGrupo() {
  const uid = window._pf.uid;
  const grupos = (await pfMeusGrupos()).filter((g) => !(g.membrosUids || []).includes(uid));
  const html = grupos.length
    ? `<div class="pf-ops">${grupos.map((g) => `<button type="button" class="pf-op" onclick="convidarParaGrupoPerfil('${esc(g.id)}')"><span>🏕️ ${esc(g.nome || "Grupo")}</span><small>${(g.membrosUids || []).length} membros</small></button>`).join("")}</div>`
    : `<p class="pf-vazio">Você não tem nenhum grupo em que ${esc(window._pf.d.nickname || "essa pessoa")} ainda não esteja.</p>`;
  abrirPopup("Convidar pro grupo", html, true, null);
}

async function convidarParaGrupoPerfil(grupoId) {
  const meuUid = window.usuarioAtual.uid;
  try {
    const g = (await getDoc(doc(db, "grupos", grupoId))).data() || {};
    const eu = (await getDoc(doc(db, "usuarios", meuUid))).data() || {};
    await setDoc(doc(db, "usuarios", window._pf.uid, "convitesGrupo", grupoId), {
      grupoId,
      nomeGrupo: g.nome || "",
      deUid: meuUid,
      deNickname: eu.nickname || "",
      deTag: eu.tag || "",
      criadoEm: new Date().toISOString(),
    });
    fecharPopup();
    if (typeof mostrarToastMundo === "function") mostrarToastMundo("Convite enviado");
  } catch (e) {
    console.error(e);
    alertBonito("Não consegui enviar o convite agora.");
  }
}

/* ---------- procurando mesa ---------- */
function abrirProcurandoMesa() {
  const pm = window._pf.d.procurandoMesa || {};
  const dias = new Set(pm.dias || []);
  const html = `
    <div class="popup-form">
      <div class="toggle-cargas">
        <span class="toggle-cargas-texto">Mostrar no meu perfil</span>
        <label class="switch-cargas"><input type="checkbox" id="pmAtivo" ${pm.ativo ? "checked" : ""}><span class="slider-cargas"></span></label>
      </div>
      <label class="popup-label">Disponível pra</label>
      <select id="pmModo">
        <option value="jogador" ${pm.modo === "jogador" || !pm.modo ? "selected" : ""}>Jogar</option>
        <option value="mestre" ${pm.modo === "mestre" ? "selected" : ""}>Mestrar</option>
        <option value="ambos" ${pm.modo === "ambos" ? "selected" : ""}>Jogar ou mestrar</option>
      </select>
      <label class="popup-label">Sistemas</label>
      <input id="pmSistemas" maxlength="80" value="${esc(pm.sistemas || "")}" placeholder="Ex: D&D 5e, Ordem Paranormal">
      <label class="popup-label">Dias livres</label>
      <div class="pf-dias escolher" id="pmDias">${DIAS_SEMANA.map((dd) => `<button type="button" class="${dias.has(dd) ? "on" : ""}" onclick="this.classList.toggle('on')">${dd}</button>`).join("")}</div>
      <label class="popup-label">Horário</label>
      <input id="pmPeriodo" maxlength="40" value="${esc(pm.periodo || "")}" placeholder="Ex: à noite, depois das 20h">
      <label class="popup-label">Recado (opcional)</label>
      <textarea id="pmObs" maxlength="140" placeholder="Ex: sexta só depois das 21h">${esc(pm.obs || "")}</textarea>

      <div class="toggle-cargas" style="margin-top:10px">
        <span class="toggle-cargas-texto">Mostrar quando estou online</span>
        <label class="switch-cargas"><input type="checkbox" id="pmStatus" ${window._pf.d.mostrarStatus === false ? "" : "checked"}><span class="slider-cargas"></span></label>
      </div>
      <button type="button" class="inv-add-btn btn-adicionar" style="width:100%;margin-top:12px" onclick="salvarProcurandoMesa()"><span>Salvar</span></button>
    </div>`;
  abrirPopup("Disponível pra jogar", html, true, null);
}

async function salvarProcurandoMesa() {
  const procurandoMesa = {
    ativo: !!document.getElementById("pmAtivo")?.checked,
    modo: document.getElementById("pmModo")?.value || "jogador",
    sistemas: (document.getElementById("pmSistemas")?.value || "").trim(),
    dias: [...document.querySelectorAll("#pmDias button.on")].map((b) => b.textContent),
    periodo: (document.getElementById("pmPeriodo")?.value || "").trim(),
    obs: (document.getElementById("pmObs")?.value || "").trim(),
  };
  const mostrarStatus = !!document.getElementById("pmStatus")?.checked;
  try {
    await setDoc(doc(db, "usuarios", window.usuarioAtual.uid), { procurandoMesa, mostrarStatus }, { merge: true });
  } catch (e) {
    return alertBonito("Não consegui salvar agora.");
  }
  window._pf.d.procurandoMesa = procurandoMesa;
  window._pf.d.mostrarStatus = mostrarStatus;
  fecharPopup();
  pfRenderProcurando();
  pfRenderCabecalho();
}

/* ---------- moldura e fundo ---------- */
function pfLiberado(item) {
  if (item.plano) return getPlanoUsuario() !== "free";
  if (item.conquista) return pfTemConquista(item.conquista);
  return true;
}
function pfMotivoBloqueio(item) {
  if (item.plano) return "Plano pago";
  const c = CONQUISTAS.find((x) => x.id === item.conquista);
  return c ? `Conquista: ${c.nome}` : "";
}

function abrirVisualPerfil() {
  const d = window._pf.d;
  window._pfVisualTemp = { moldura: d.moldura || "", efeitoFundo: d.efeitoFundo || "" };
  const opMoldura = (m) => {
    const ok = pfLiberado(m);
    return `<button type="button" class="pf-vis-op ${window._pfVisualTemp.moldura === m.id ? "ativo" : ""} ${ok ? "" : "bloqueada"}" ${ok ? `onclick="escolherVisualTemp('moldura','${m.id}', this)"` : ""}>
      <span class="pf-vis-av" data-moldura="${m.id}"><span></span></span>
      <small>${esc(m.nome)}</small>${ok ? "" : `<em>🔒 ${esc(pfMotivoBloqueio(m))}</em>`}
    </button>`;
  };
  const opFundo = (f) => {
    const ok = pfLiberado(f);
    return `<button type="button" class="pf-vis-op largo ${window._pfVisualTemp.efeitoFundo === f.id ? "ativo" : ""} ${ok ? "" : "bloqueada"}" ${ok ? `onclick="escolherVisualTemp('efeitoFundo','${f.id}', this)"` : ""}>
      <span class="pf-vis-fundo" data-efeito="${f.id}"></span>
      <small>${esc(f.nome)}</small>${ok ? "" : `<em>🔒 ${esc(pfMotivoBloqueio(f))}</em>`}
    </button>`;
  };
  const html = `
    <div class="pf-visual">
      <label class="popup-label">Moldura da foto</label>
      <div class="pf-vis-grade" data-grupo="moldura">${MOLDURAS.map(opMoldura).join("")}</div>
      <label class="popup-label">Efeito no fundo</label>
      <div class="pf-vis-grade fundos" data-grupo="efeitoFundo">${EFEITOS_FUNDO.map(opFundo).join("")}</div>
      <button type="button" class="inv-add-btn btn-adicionar" style="width:100%;margin-top:14px" onclick="salvarVisualPerfil()"><span>Salvar</span></button>
    </div>`;
  abrirPopup("Moldura e fundo", html, true, null);
}

function escolherVisualTemp(campo, id, btn) {
  window._pfVisualTemp[campo] = id;
  btn.parentElement.querySelectorAll(".pf-vis-op").forEach((b) => b.classList.toggle("ativo", b === btn));
}

async function salvarVisualPerfil() {
  const v = window._pfVisualTemp;
  try {
    await setDoc(doc(db, "usuarios", window.usuarioAtual.uid), { moldura: v.moldura, efeitoFundo: v.efeitoFundo }, { merge: true });
  } catch (e) {
    return alertBonito("Não consegui salvar agora.");
  }
  window._pf.d.moldura = v.moldura;
  window._pf.d.efeitoFundo = v.efeitoFundo;
  fecharPopup();
  pfAplicarVisual(window._pf.d);
}


/* =====================================================================
   LOGIN NOVO (mesmo do app Ficha Ígnea)
   ===================================================================== */
function alternarSenhaLogin() {
  const inp = document.getElementById("loginSenha");
  const btn = document.getElementById("loginOlho");
  if (!inp) return;
  const mostrar = inp.type === "password";
  inp.type = mostrar ? "text" : "password";
  if (btn) {
    btn.innerHTML = `<i class="ti ${mostrar ? "ti-eye-off" : "ti-eye"}"></i>`;
    btn.setAttribute("aria-label", mostrar ? "Esconder senha" : "Mostrar senha");
  }
  inp.focus();
}

(function prepararLogin() {
  const iniciar = () => {
    try {
      const salvo = localStorage.getItem("ultimoEmailLogin");
      const inp = document.getElementById("loginEmail");
      if (salvo && inp && !inp.value) inp.value = salvo;
    } catch (e) {}
    const rod = document.getElementById("loginRodape");
    if (rod) rod.textContent = "Ordem Paranormal · ficha";
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", iniciar);
  else iniciar();
})();

function abrirCriarConta() {
  const emailLogin = document.getElementById("loginEmail")?.value.trim() || "";
  const enter = (prox) => `onkeydown="if(event.key==='Enter'){event.preventDefault();${prox}}"`;
  const html = `
    <div class="popup-form cc-form">
      <p class="cc-intro">Com uma conta, suas fichas ficam salvas na nuvem e você pode abrir em qualquer aparelho, entrar em grupos com os amigos e jogar com o mestre.</p>

      <label class="popup-label">Email</label>
      <input id="ccEmail" type="email" inputmode="email" autocomplete="email" placeholder="seuemail@exemplo.com" value="${esc(emailLogin)}" ${enter("document.getElementById('ccSenha').focus();")}>

      <label class="popup-label">Senha</label>
      <div class="lg-senha cc-senha">
        <input id="ccSenha" type="password" autocomplete="new-password" placeholder="Mínimo 6 caracteres" ${enter("document.getElementById('ccConfirma').focus();")}>
        <button type="button" class="lg-olho" onclick="alternarSenhaCC(this)" aria-label="Mostrar senha"><i class="ti ti-eye"></i></button>
      </div>

      <label class="popup-label">Confirmar senha</label>
      <input id="ccConfirma" type="password" autocomplete="new-password" placeholder="Digite a senha de novo" ${enter("criarContaPopup();")}>

      <div id="ccErro" class="login-erro cc-erro"></div>

      <button type="button" class="inv-add-btn btn-adicionar cc-criar" id="ccCriar" onclick="criarContaPopup()"><span>Criar conta</span></button>
      <p class="cc-depois">Depois de criar, você escolhe seu nome de jogador (é como seus amigos te encontram).</p>
    </div>`;
  abrirPopup("Criar conta", html, true, null);
  setTimeout(() => document.getElementById(emailLogin ? "ccSenha" : "ccEmail")?.focus(), 60);
}

function alternarSenhaCC(btn) {
  const mostrar = document.getElementById("ccSenha")?.type === "password";
  ["ccSenha", "ccConfirma"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.type = mostrar ? "text" : "password";
  });
  if (btn) btn.innerHTML = `<i class="ti ${mostrar ? "ti-eye-off" : "ti-eye"}"></i>`;
}

async function criarContaPopup() {
  const email = document.getElementById("ccEmail")?.value.trim() || "";
  const senha = document.getElementById("ccSenha")?.value || "";
  const conf = document.getElementById("ccConfirma")?.value || "";
  const erro = document.getElementById("ccErro");
  const btn = document.getElementById("ccCriar");
  const falha = (m) => { if (erro) erro.textContent = m; };
  falha("");
  if (senha.length < 6) return falha("A senha precisa ter pelo menos 6 caracteres.");
  if (senha !== conf) return falha("As senhas não são iguais.");
  if (typeof window.criarContaCom !== "function") return falha("Ainda carregando. Tente de novo em instantes.");
  if (btn) btn.disabled = true;
  const msg = await window.criarContaCom(email, senha);
  if (btn) btn.disabled = false;
  if (msg) return falha(msg);
  try { localStorage.setItem("ultimoEmailLogin", email); } catch (e) {}
  fecharPopup();
}

/* =====================================================================
   AMIGOS NOVO: avatar, online / offline, "visto há", menu de cada amigo
   ===================================================================== */
window._amCache = window._amCache || {};
async function gpResumo(uid) {
  const c = window._amCache[uid];
  if (c && Date.now() - (c._em || 0) < 60000) return c;
  try {
    const s = await getDoc(doc(db, "usuarios", uid));
    const d = s.exists() ? s.data() : {};
    d._em = Date.now();
    window._amCache[uid] = d;
    return d;
  } catch (e) {
    return c || {};
  }
}
function gpOnline(d) {
  return d && d.mostrarStatus !== false && d.vistoEm && Date.now() - d.vistoEm < 4 * 60 * 1000;
}
function gpAvatar(d, cls) {
  const foto = d && d.fotoPerfil ? `background-image:url('${String(d.fotoPerfil).replace(/'/g, "%27")}')` : "";
  return `<span class="am-av ${cls || ""}" data-moldura="${esc((d && d.moldura) || "")}"><span class="am-av-img" style="${foto}"></span>${gpOnline(d) ? `<span class="am-dot"></span>` : ""}</span>`;
}
function gpFotoGrupo(g, cls) {
  return `<span class="gp-foto ${cls || ""}" style="${g.fotoUrl ? `background-image:url('${esc(g.fotoUrl)}')` : ""}">${g.fotoUrl ? "" : '<i class="ti ti-users"></i>'}</span>`;
}

window._am = { amigos: [], pedidos: [], grupos: 0, aba: "amigos" };

function amTextoStatus(d) {
  if (!d || d.mostrarStatus === false || !d.vistoEm) return "";
  if (gpOnline(d)) {
    const at = d.atividade?.texto && Date.now() - (d.atividade.em || 0) < 4 * 60 * 1000 ? ` · ${esc(d.atividade.texto)}` : "";
    return `<span class="am-on">Online</span>${at}`;
  }
  return `Visto ${tempoRelativo(d.vistoEm)}`;
}

window.abrirPainelAmigos = function () {
  const ov = document.getElementById("painelAmigosOverlay");
  const painel = document.getElementById("painelAmigos");
  ov.style.display = "block";
  painel.style.display = "flex";
  requestAnimationFrame(() => requestAnimationFrame(() => {
    ov.classList.add("aberto");
    painel.style.transform = "translateX(0)";
  }));
  mostrarMeuNickname();
  carregarAmigos();
  amContarGrupos();
};

window.fecharPainelAmigos = function () {
  const ov = document.getElementById("painelAmigosOverlay");
  const painel = document.getElementById("painelAmigos");
  ov.classList.remove("aberto");
  painel.style.transform = "translateX(-100%)";
  setTimeout(() => {
    painel.style.display = "none";
    ov.style.display = "none";
  }, 320);
};

window.trocarAbaAmigos = function (aba) {
  window._am.aba = aba;
  const amigos = aba === "amigos";
  document.getElementById("abaAmigosConteudo").style.display = amigos ? "flex" : "none";
  document.getElementById("abaGruposConteudo").style.display = amigos ? "none" : "flex";
  document.getElementById("tabAmigosBtn").classList.toggle("ativo", amigos);
  document.getElementById("tabGruposBtn").classList.toggle("ativo", !amigos);
  if (!amigos) carregarGrupos();
};

async function mostrarMeuNickname() {
  const label = document.getElementById("meuNicknameLabel");
  if (!label || !window.usuarioAtual) return;
  try {
    const d = await gpResumo(window.usuarioAtual.uid);
    d._em = 0;
    window._meuNicknameCompleto = d.nickname && d.tag ? `${d.nickname}#${d.tag}` : "";
    label.innerHTML = d.nickname && d.tag ? `${esc(d.nickname)}<span style="opacity:.5;">#${esc(d.tag)}</span>` : "";
    const av = document.getElementById("amEuAvatar");
    if (av) av.innerHTML = gpAvatar({ ...d, vistoEm: Date.now() }, "grande");
    const sub = document.getElementById("amEuSub");
    if (sub) {
      const t = typeof pfTituloTexto === "function" ? pfTituloTexto(d) : "";
      sub.innerHTML = t ? `<em>« ${esc(t)} »</em>` : `<button type="button" class="am-link" onclick="abrirPerfil(window.usuarioAtual.uid)">Ver meu perfil</button>`;
    }
  } catch (e) {
    console.error(e);
  }
}

async function carregarAmigos() {
  const lista = document.getElementById("listaAmigos");
  if (!lista || !window.usuarioAtual) return;
  const meuUid = window.usuarioAtual.uid;
  if (!window._am.carregado) lista.innerHTML = `<p class="am-vazio">Carregando...</p>`;
  try {
    const [pedSnap, amigosSnap] = await Promise.all([
      getDocs(collection(db, "usuarios", meuUid, "solicitacoesRecebidas")),
      getDocs(collection(db, "usuarios", meuUid, "amigos")),
    ]);
    const pedidos = pedSnap.docs.map((x) => ({ uid: x.id, ...x.data() }));
    const amigos = await Promise.all(
      amigosSnap.docs.map(async (x) => {
        const base = x.data();
        const d = await gpResumo(x.id);
        return { uid: x.id, nickname: d.nickname || base.nickname || "", tag: d.tag || base.tag || "", d };
      }),
    );
    amigos.sort((a, b) => (gpOnline(b.d) ? 1 : 0) - (gpOnline(a.d) ? 1 : 0) || a.nickname.localeCompare(b.nickname, "pt-BR", { sensitivity: "base" }));
    window._am.amigos = amigos;
    window._am.pedidos = pedidos;
    window._am.carregado = true;
    amRenderLista();
  } catch (e) {
    console.error(e);
    lista.innerHTML = `<p class="am-vazio erro">Erro ao carregar: ${esc(e.code || e.message)}</p>`;
  }
}

function amRenderLista() {
  const lista = document.getElementById("listaAmigos");
  if (!lista) return;
  const { amigos, pedidos } = window._am;
  const termo = (document.getElementById("buscaAmigoInput")?.value || "").trim().toLowerCase().split("#")[0];

  const cont = document.getElementById("amContAmigos");
  if (cont) cont.textContent = amigos.length;
  const badge = document.getElementById("amBadgePedidos");
  if (badge) { badge.textContent = pedidos.length; badge.style.display = pedidos.length ? "flex" : "none"; }

  const filtrados = termo ? amigos.filter((a) => a.nickname.toLowerCase().includes(termo)) : amigos;
  const item = (a) => {
    const on = gpOnline(a.d);
    return `<div class="am-item ${on ? "online" : ""}" onclick="abrirPerfil('${esc(a.uid)}')">
      ${gpAvatar(a.d)}
      <div class="am-info">
        <div class="am-nome">${esc(a.nickname)}<span>#${esc(a.tag)}</span></div>
        <div class="am-sub">${amTextoStatus(a.d)}</div>
      </div>
      <button type="button" class="am-mais" aria-label="Mais opções" onclick="event.stopPropagation(); abrirMenuAmigo('${esc(a.uid)}')"><i class="ti ti-dots"></i></button>
    </div>`;
  };

  let html = "";
  if (pedidos.length && !termo) {
    html += `<div class="am-sep pedidos">Pedidos · ${pedidos.length}</div>` + pedidos.map((p) => `
      <div class="am-item pedido">
        ${gpAvatar({}, "")}
        <div class="am-info"><div class="am-nome">${esc(p.deNickname)}<span>#${esc(p.deTag)}</span></div><div class="am-sub">quer ser seu amigo</div></div>
        <button type="button" class="am-resp sim" aria-label="Aceitar" onclick="responderSolicitacao('${esc(p.uid)}', true)"><i class="ti ti-check"></i></button>
        <button type="button" class="am-resp nao" aria-label="Recusar" onclick="responderSolicitacao('${esc(p.uid)}', false)"><i class="ti ti-x"></i></button>
      </div>`).join("");
  }
  const on = filtrados.filter((a) => gpOnline(a.d));
  const off = filtrados.filter((a) => !gpOnline(a.d));
  if (on.length) html += `<div class="am-sep">Online · ${on.length}</div>` + on.map(item).join("");
  if (off.length) html += `<div class="am-sep">Offline · ${off.length}</div>` + off.map(item).join("");

  if (!html) {
    html = amigos.length
      ? `<p class="am-vazio">Nenhum amigo com esse nome.</p>`
      : `<p class="am-vazio">Você ainda não tem amigos.<br>Digite o <b>Nome#0000</b> de alguém na busca para adicionar.</p>`;
  }
  lista.innerHTML = html;
}

window.filtrarAmigos = function () {
  const v = (document.getElementById("buscaAmigoInput")?.value || "").trim();
  const sug = document.getElementById("amSugestao");
  if (sug) {
    const ok = /^.+#\d{3,5}$/.test(v);
    sug.style.display = ok ? "flex" : "none";
    if (ok) sug.querySelector("b").textContent = v;
  }
  amRenderLista();
};

async function amContarGrupos() {
  try {
    const meuUid = window.usuarioAtual.uid;
    const snap = await getDocs(query(collection(db, "grupos"), where("membrosUids", "array-contains", meuUid)));
    window._am.grupos = snap.size;
    const el = document.getElementById("amContGrupos");
    if (el) el.textContent = snap.size;
  } catch (e) {}
}

window.abrirMenuAmigo = async function (uid) {
  const a = window._am.amigos.find((x) => x.uid === uid);
  if (!a) return;
  const html = `
    <div class="am-acoes">
      <div class="am-acoes-topo">${gpAvatar(a.d, "grande")}<div class="am-info"><div class="am-nome">${esc(a.nickname)}<span>#${esc(a.tag)}</span></div><div class="am-sub">${amTextoStatus(a.d)}</div></div></div>
      <button type="button" class="pf-op" onclick="fecharPopup(); abrirPerfil('${esc(uid)}')"><span><i class="ti ti-user"></i> Ver perfil</span></button>
      <button type="button" class="pf-op" onclick="fecharPopup(); amConvidarParaGrupo('${esc(uid)}')"><span><i class="ti ti-users-plus"></i> Convidar pro grupo</span></button>
      <button type="button" class="pf-op perigo" onclick="amRemoverAmigo('${esc(uid)}')"><span><i class="ti ti-user-minus"></i> Remover amigo</span></button>
    </div>`;
  abrirPopup("Amigo", html, true, null);
};

window.amConvidarParaGrupo = function (uid) {
  const a = window._am.amigos.find((x) => x.uid === uid);
  window._pf.uid = uid;
  window._pf.d = { ...(a ? a.d : {}), nickname: a ? a.nickname : "" };
  abrirConvidarParaGrupo();
};

window.amRemoverAmigo = async function (uid) {
  const a = window._am.amigos.find((x) => x.uid === uid);
  if (!(await confirmBonito(`Remover ${a ? a.nickname : "esse amigo"} dos seus amigos?`))) return;
  const meuUid = window.usuarioAtual.uid;
  try {
    await deleteDoc(doc(db, "usuarios", meuUid, "amigos", uid));
  } catch (e) {
    return alertBonito("Não consegui remover agora.");
  }
  try { await deleteDoc(doc(db, "usuarios", uid, "amigos", meuUid)); } catch (e) {}
  fecharPopup();
  carregarAmigos();
};

/* grupos: cartões com foto e pilha de membros */
window.carregarGrupos = async function () {
  const lista = document.getElementById("listaGrupos");
  if (!lista || !window.usuarioAtual) return;
  const meuUid = window.usuarioAtual.uid;
  lista.innerHTML = `<p class="am-vazio">Carregando...</p>`;
  let htmlConvites = "";
  let htmlGrupos = "";
  try {
    const convitesSnap = await getDocs(collection(db, "usuarios", meuUid, "convitesGrupo"));
    if (!convitesSnap.empty) {
      htmlConvites += `<div class="am-sep pedidos">Convites · ${convitesSnap.size}</div>`;
      convitesSnap.forEach((docSnap) => {
        const d = docSnap.data();
        htmlConvites += `
          <div class="am-item pedido">
            <span class="am-grupo-ic"><i class="ti ti-users"></i></span>
            <div class="am-info"><div class="am-nome">${esc(d.nomeGrupo)}</div><div class="am-sub">de ${esc(d.deNickname)}#${esc(d.deTag)}</div></div>
            <button type="button" class="am-resp sim" aria-label="Aceitar" onclick="responderConviteGrupo('${esc(docSnap.id)}', true)"><i class="ti ti-check"></i></button>
            <button type="button" class="am-resp nao" aria-label="Recusar" onclick="responderConviteGrupo('${esc(docSnap.id)}', false)"><i class="ti ti-x"></i></button>
          </div>`;
      });
    }
  } catch (e) {
    htmlConvites = `<p class="am-vazio erro">Erro ao carregar convites: ${esc(e.code || e.message)}</p>`;
  }
  try {
    const gruposSnap = await getDocs(query(collection(db, "grupos"), where("membrosUids", "array-contains", meuUid)));
    window._am.grupos = gruposSnap.size;
    const el = document.getElementById("amContGrupos");
    if (el) el.textContent = gruposSnap.size;
    if (!gruposSnap.empty) {
      htmlGrupos += `<div class="am-sep">Seus grupos · ${gruposSnap.size}</div>`;
      const cards = await Promise.all(gruposSnap.docs.map(async (docSnap) => {
        const g = docSnap.data();
        const souMestre = g.criadoPor === meuUid || (g.mestresUids || []).includes(meuUid);
        const membros = g.membros || [];
        const res = await Promise.all(membros.slice(0, 4).map((m) => gpResumo(m.uid)));
        const pilha = res.map((d) => gpAvatar({ ...d, vistoEm: 0 }, "mini")).join("") + (membros.length > 4 ? `<span class="am-pilha-mais">+${membros.length - 4}</span>` : "");
        return `
          <div class="am-grupo ${g.capaUrl ? "com-capa" : ""}" ${g.capaUrl ? `style="--capa:url('${esc(g.capaUrl)}')"` : ""} onclick="abrirDetalheGrupo('${esc(docSnap.id)}')">
            <div class="am-grupo-topo"><span class="am-grupo-nome">${gpFotoGrupo(g)}<strong>${esc(g.nome)}</strong></span>${souMestre ? `<span class="am-selo-mestre">Mestre</span>` : ""}</div>
            <div class="am-grupo-rodape"><span class="am-pilha">${pilha}</span><span class="am-grupo-info">${membros.length} membro${membros.length === 1 ? "" : "s"}</span></div>
          </div>`;
      }));
      htmlGrupos += cards.join("");
    }
  } catch (e) {
    htmlGrupos = `<p class="am-vazio erro">Erro ao carregar seus grupos: ${esc(e.code || e.message)}</p>`;
  }
  lista.innerHTML = htmlConvites + htmlGrupos || `<p class="am-vazio">Nenhum grupo ainda.<br>Toque em <b>Criar grupo</b> para começar.</p>`;
};

/* =====================================================================
   PERFIL: abrir com o título, o status, as ações e os extras
   ===================================================================== */
window.abrirPerfil = async function (uid) {
  const meuUid = window.usuarioAtual.uid;
  const ehMeu = uid === meuUid;
  window._perfilUidAberto = uid;
  window._perfilEhMeu = ehMeu;

  document.getElementById("modalPerfilOverlay").style.display = "block";
  document.getElementById("modalPerfil").style.display = "block";
  document.getElementById("btnSalvarBio").style.display = "none";
  document.getElementById("perfilBioEdit").style.display = "none";
  document.getElementById("perfilBioView").style.display = "block";

  try {
    const snap = await getDoc(doc(db, "usuarios", uid));
    const d = snap.exists() ? snap.data() : {};
    window._perfilDados = d;

    document.getElementById("perfilNomeTag").innerHTML = d.nickname
      ? `${esc(d.nickname)}<span style="opacity:.5;">#${esc(d.tag)}</span>`
      : "";
    document.getElementById("perfilFundo").style.backgroundImage = d.fotoFundo ? `url('${d.fotoFundo}')` : "none";
    document.getElementById("perfilAvatar").style.backgroundImage = d.fotoPerfil ? `url('${d.fotoPerfil}')` : "none";

    const corBase = d.corBase || "#150f1b";
    const corNome = d.corNome || "#f3eaf1";
    const corLinha = d.corLinha || "rgba(255,255,255,0.18)";
    const corTexto = corContraste(corBase);
    const modal = document.getElementById("modalPerfil");
    modal.style.backgroundColor = corBase;
    modal.style.setProperty("--perfil-linha", corLinha);
    modal.style.setProperty("--perfil-texto", corTexto);
    document.getElementById("perfilNomeTag").style.color = corNome;
    document.getElementById("corBaseInput").value = corBase;
    document.getElementById("corNomeInput").value = corNome;
    document.getElementById("corLinhaInput").value = corLinha.startsWith("#") ? corLinha : "#8f5fc7";
    document.getElementById("corBaseSwatch").style.background = corBase;
    document.getElementById("corNomeSwatch").style.background = corNome;
    document.getElementById("corLinhaSwatch").style.background = corLinha.startsWith("#") ? corLinha : "#8f5fc7";
    document.getElementById("perfilCoresBtn").style.display = ehMeu ? "flex" : "none";
    document.getElementById("perfilCoresBox").style.display = "none";

    const bioView = document.getElementById("perfilBioView");
    bioView.textContent = d.bio || (ehMeu ? "Adicione uma bio..." : "Sem bio ainda.");
    document.getElementById("perfilBioEdit").value = d.bio || "";

    document.getElementById("btnMudarFundo").style.display = ehMeu ? "block" : "none";
    document.getElementById("btnMudarAvatar").style.display = ehMeu ? "block" : "none";
    document.getElementById("btnEscolherDestaque").style.display = ehMeu ? "block" : "none";
    bioView.onclick = ehMeu ? mostrarEditarBio : null;
    bioView.style.cursor = ehMeu ? "pointer" : "default";

    const showcase = document.getElementById("perfilShowcase");
    const destaque = d.personagensDestaque || [];
    window._perfilDestaqueAtual = destaque;
    if (destaque.length === 0) {
      showcase.innerHTML = `<p class="pf-vazio" style="grid-column:1/-1;">Nenhum personagem em destaque.</p>`;
    } else {
      showcase.innerHTML = destaque.map((f, i) => `
        <div class="pf-destaque" onclick="abrirPreviewFicha(${i})">
          <div class="pf-destaque-img" style="background-image:url('${esc(f.imagem || "")}');"></div>
          <div class="pf-destaque-info">
            <b>${esc(f.nome || "Sem nome")}</b>
            <span>${esc(f.classe || "")}${f.nivel ? " · Nv " + esc(String(f.nivel)) : ""}</span>
            ${!ehMeu && f.publica ? `<button type="button" class="pf-pegar" onclick="event.stopPropagation(); pegarFichaPublica('${esc(uid)}','${esc(f.fichaId)}')">Pegar</button>` : ""}
          </div>
        </div>`).join("");
    }
    if (typeof renderPerfilExtras === "function") renderPerfilExtras(uid, ehMeu, d);
  } catch (e) {
    console.error(e);
    alertBonito("Erro ao carregar perfil: " + (e.code || e.message));
  }
};
