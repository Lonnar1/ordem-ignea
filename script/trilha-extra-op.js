/* =====================================================================
   trilha-extra-op.js  ·  Habilidade de OUTRA trilha (Versatilidade e afins)
   - Versatilidade (NEX 50%): receber o primeiro poder de uma trilha da sua
     classe que não seja a sua.
   - Dominar Habilidade Ritualística (Arquivos Secretos 2, p. 75, poder de
     ocultista): mesma ideia, e vale de novo para a habilidade seguinte.
   - Prática com Materiais Ritualísticos (AS 2, p. 75, poder geral).
   Regra usada: a habilidade recebida é sempre a próxima que você ainda não
   tem naquela trilha (a 1ª; se você já tem a 1ª, a 2ª; e assim por diante),
   desde que o seu NEX permita.
   Carregar DEPOIS de extras-op.js.
   ===================================================================== */

(function () {
  if (typeof CATALOGO_OP_PADRAO === "undefined") return;
  const CAT = CATALOGO_OP_PADRAO;

  CAT.fontes.as2 = "Arquivos Secretos 2";
  if (typeof FONTES_ROTULO_OP !== "undefined") FONTES_ROTULO_OP.as2 = ["Arquivos Secretos 2", "AS2"];

  const add = (p) => {
    if (CAT.poderes.some((x) => x.id === p.id)) return;
    CAT.poderes.push({ efeitos: [], ...p });
    if (typeof EXTRAS_OP_IDS !== "undefined") EXTRAS_OP_IDS.poderes.push(p.id);
  };

  /* ---- Versatilidade: uma por classe (não conta como poder de classe) ---- */
  [["combatente", "comb", "combatente"], ["especialista", "esp", "especialista"], ["ocultista", "ocu", "ocultista"]].forEach(([classe, pre, nomeCl]) => {
    add({
      id: `${pre}.versatilidade`, classe, tipo: "classe", nome: "Versatilidade", fonte: "livro", pagina: "", ativacao: "passiva",
      habilidadeDeClasse: true, trilhaExtra: "versatilidade", requisitos: { nexMin: 50 },
      resumo: `Em NEX 50%, escolha entre receber um poder de ${nomeCl} ou o primeiro poder de uma trilha de ${nomeCl} que não a sua. Esta opção é a segunda: você recebe a habilidade de outra trilha. Se preferir um poder de ${nomeCl}, escolha-o normalmente no catálogo e não use esta.`,
    });
  });

  /* ---- AS 2, p. 75 ---- */
  add({
    id: "ocu.as2.dominarhabilidade", classe: "ocultista", tipo: "classe", nome: "Dominar Habilidade Ritualística", fonte: "as2", pagina: "75",
    ativacao: "passiva", repetivel: true, trilhaExtra: "dominar", reqTexto: "Escolhido pelo Outro Lado",
    resumo: "Seus estudos são amplos e não serão interrompidos por barreiras burocráticas. Quando adquire esse poder, você pode escolher a primeira habilidade de uma trilha de Ocultista (que não seja a sua). Se já possuir Versatilidade e tiver escolhido a habilidade inicial de outra trilha, ao invés do normal, você pode receber a segunda habilidade da trilha escolhida em Versatilidade. Para receber a habilidade, você precisa ter o NEX necessário para usá-la. Além disso, você pode escolher esse poder uma segunda vez para receber a segunda habilidade de uma trilha que não seja a sua (ou a terceira se já possuir Versatilidade).",
  });
  add({
    id: "ger.as2.praticamateriais", classe: "geral", tipo: "geral", nome: "Prática com Materiais Ritualísticos", fonte: "as2", pagina: "75",
    ativacao: "passiva", requisitos: { atributos: { intelecto: 2 }, periciasAll: ["Ocultismo"] }, reqTexto: "capacidade de conjurar rituais",
    resumo: "Você domina materiais usados em rituais com precisão. Quando executa uma conjuração complexa (SaH, p. 115), você não sofre –1 dado para empregar materiais específicos de uma Entidade durante a 1ª etapa.",
  });
})();

/* ---------------------------------------------------------------------
   Janela de escolha
   --------------------------------------------------------------------- */
(function () {
  const esc = (t) => String(t == null ? "" : t).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  let ov = null;
  let ctx = null; // { item, linhas, sel }

  const temHab = (id) => (typeof poderes !== "undefined" ? poderes : []).some((p) => p.origemCatalogo === id);

  function linhasDeTrilhas(item) {
    const nex = nexClasseOP();
    const propria = typeof trilhaOP !== "undefined" ? trilhaOP : "";
    return obterCatalogoOP().trilhas
      .filter((t) => t.classe === item.classe && t.id !== propria)
      .map((t) => {
        const hs = (t.habilidades || []).slice().sort((a, b) => Number(a.nex) - Number(b.nex));
        const prox = hs.find((h) => !temHab(h.id)) || null;
        let motivo = "";
        if (!prox) motivo = "Você já tem todas as habilidades desta trilha.";
        else if (Number(prox.nex) > nex) motivo = `Exige ${rotuloNivelNexOP(prox.nex)} (você está em ${rotuloNivelNexOP(nex)}).`;
        return { t, prox, motivo };
      })
      .sort((a, b) => a.t.nome.localeCompare(b.t.nome, "pt-BR"));
  }

  function janela() {
    if (ov) return ov;
    ov = document.createElement("div");
    ov.className = "iv-ov te-ov";
    ov.hidden = true;
    ov.innerHTML = `
      <div class="iv-sheet te-sheet" role="dialog" aria-modal="true">
        <div class="iv-grip"></div>
        <div class="iv-sheet-top"><b id="teTitulo"></b><button type="button" class="iv-x" aria-label="Fechar" onclick="fecharTrilhaExtraOP()">✕</button></div>
        <div class="iv-sheet-body te-corpo" id="teCorpo"></div>
        <div class="iv-sheet-foot"><button type="button" class="iv-btn-o" onclick="fecharTrilhaExtraOP()">Cancelar</button><button type="button" class="iv-btn-p" id="teOk" onclick="confirmarTrilhaExtraOP()" disabled>Receber habilidade</button></div>
      </div>`;
    ov.addEventListener("click", (e) => { if (e.target === ov) fecharTrilhaExtraOP(); });
    document.body.appendChild(ov);
    return ov;
  }

  window.abrirTrilhaExtraOP = function (item) {
    const linhas = linhasDeTrilhas(item);
    ctx = { item, linhas, sel: null };
    janela();
    const dica = item.trilhaExtra === "versatilidade"
      ? "Você recebe o primeiro poder da trilha escolhida. Se você já tem o primeiro por outro meio, recebe o seguinte."
      : "1ª vez: a primeira habilidade da trilha (ou a segunda, se você pegou essa trilha na Versatilidade). 2ª vez: a segunda (ou a terceira, com Versatilidade). O app oferece sempre a próxima que você ainda não tem.";
    ov.querySelector("#teTitulo").textContent = item.nome;
    ov.querySelector("#teCorpo").innerHTML = `
      <p class="te-dica">${esc(dica)}</p>
      ${linhas.length ? linhas.map((l, i) => `
        <button type="button" class="te-op" ${l.motivo ? "disabled" : ""} onclick="marcarTrilhaExtraOP(${i})">
          <span class="te-nome">${esc(l.t.nome)}</span>
          ${l.motivo
            ? `<small class="te-bloq">${esc(l.motivo)}</small>`
            : `<span class="te-hab"><b>${esc(l.prox.nome)}</b><em>${esc(rotuloNivelNexOP(l.prox.nex))}</em></span><small>${esc(l.prox.resumo || "")}</small>`}
        </button>`).join("") : `<div class="iv-vazio">Nenhuma outra trilha disponível para a sua classe.</div>`}`;
    ov.querySelector("#teOk").disabled = true;
    ov.querySelector("#teCorpo").scrollTop = 0;
    ov.hidden = false;
    document.documentElement.classList.add("iv-trava");
  };

  window.marcarTrilhaExtraOP = function (i) {
    if (!ctx || !ctx.linhas[i] || ctx.linhas[i].motivo) return;
    ctx.sel = i;
    ov.querySelectorAll(".te-op").forEach((b, k) => b.classList.toggle("on", k === i));
    ov.querySelector("#teOk").disabled = false;
  };

  window.fecharTrilhaExtraOP = function () {
    if (!ov) return;
    ov.hidden = true;
    ctx = null;
    if (!Object.values(window._ivFolhasOP || {}).some((o) => o && !o.hidden)) document.documentElement.classList.remove("iv-trava");
  };

  window.confirmarTrilhaExtraOP = function () {
    if (!ctx || ctx.sel == null) return;
    const { item, linhas, sel } = ctx;
    const { t, prox } = linhas[sel];
    if (!prox || temHab(prox.id)) return;

    const poder = _poderDaFichaOP(item, { nome: `${item.nome} (${t.nome})`, extraTrilha: t.id });
    poder.desc += `\n\n➕ Habilidade recebida: ${prox.nome} (${t.nome}, ${rotuloNivelNexOP(prox.nex)}).`;

    const hab = buscarItemCatalogoOP(prox.id);
    const entrada = _poderDaFichaOP(hab, { via: item.id });
    entrada.desc = `Recebida por ${item.nome}.\n\n${entrada.desc}`;
    if (typeof aplicarTreinoPoderOP === "function") aplicarTreinoPoderOP(hab, entrada);

    poderes.push(poder, entrada);
    fecharTrilhaExtraOP();

    if (typeof renderPoderes === "function") renderPoderes();
    if (typeof atualizarTudo === "function") atualizarTudo();
    if (typeof aplicarRecursosAutomaticosOP === "function") aplicarRecursosAutomaticosOP();
    if (typeof atualizarResumoAutoOP === "function") atualizarResumoAutoOP();
    if (typeof atualizarContadorPoderesClasseOP === "function") atualizarContadorPoderesClasseOP();
    if (typeof salvarTudo === "function") salvarTudo();
    if (typeof _atualizarPoderesAbertoOP === "function") _atualizarPoderesAbertoOP();
  };
})();
