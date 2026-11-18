/* =====================================================================
   guia-op.js  ·  Guia de perícias (o que cada uma permite) e guia de cenas
   (Investigação, Combate, Interlúdio). Os textos ficam em guia-dados-op.js.
   Não mexe no script.js: acrescenta um botão "i" em cada perícia e um botão
   de livro no cabeçalho das perícias e na aba de combate.
   ===================================================================== */

(function () {
  "use strict";

  const e = (t) => String(t == null ? "" : t).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const ICONES = {
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5"/><path d="M12 8h.01"/>',
    livro: '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5z"/><path d="M4 19.5V5.5"/><path d="M9 8h7"/>',
    x: '<path d="M6 6l12 12M18 6L6 18"/>',
    lupa: '<circle cx="11" cy="11" r="6.5"/><path d="M16 16l5 5"/>',
    espadas: '<path d="M14.5 17.5L3 6V3h3l11.5 11.5"/><path d="M13 19l6-6"/><path d="M16 16l4 4"/><path d="M19 21l2-2"/><path d="M9.5 6.5L21 18v3h-3L6.5 9.5"/>',
    lua: '<path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/>',
    dado: '<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M9 9h.01M15 9h.01M9 15h.01M15 15h.01M12 12h.01"/>',
    chevron: '<path d="M6 9l6 6 6-6"/>'
  };
  const svg = (n, s = 18) => `<svg viewBox="0 0 24 24" width="${s}" height="${s}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONES[n] || ""}</svg>`;

  const CENA_ROTULO = { C: "Combate", I: "Investigação", L: "Interlúdio", G: "Qualquer hora" };
  const NIVEL = ["", "Treinado", "Veterano", "Expert"];
  const SIGLA = { agilidade: "AGI", forca: "FOR", intelecto: "INT", presenca: "PRE", vigor: "VIG" };

  /* ------------------------------------------------------------------
     Janela (folha) reaproveitando o visual das folhas do inventário
     ------------------------------------------------------------------ */
  let ov = null;

  function garantirJanela() {
    if (ov) return ov;
    ov = document.createElement("div");
    ov.className = "iv-ov gd-ov";
    ov.hidden = true;
    ov.innerHTML = `
      <div class="iv-sheet gd-sheet" role="dialog" aria-modal="true">
        <div class="iv-grip"></div>
        <div class="iv-sheet-top"><b id="gdTitulo"></b><button type="button" class="iv-x" aria-label="Fechar" onclick="fecharGuiaOP()">${svg("x", 16)}</button></div>
        <div class="gd-sub" id="gdSub" hidden></div>
        <div class="iv-sheet-body gd-corpo" id="gdCorpo"></div>
        <div class="iv-sheet-foot" id="gdRodape"></div>
      </div>`;
    ov.addEventListener("click", (ev) => { if (ev.target === ov) fecharGuiaOP(); });
    document.body.appendChild(ov);
    return ov;
  }

  window.fecharGuiaOP = function () {
    if (!ov) return;
    ov.hidden = true;
    if (!Object.values(window._ivFolhasOP || {}).some((o) => !o.hidden)) document.documentElement.classList.remove("iv-trava");
  };

  function abrirJanela(titulo, sub, corpo, rodape) {
    garantirJanela();
    ov.querySelector("#gdTitulo").textContent = titulo;
    const s = ov.querySelector("#gdSub");
    if (sub) { s.innerHTML = sub; s.hidden = false; } else { s.hidden = true; s.innerHTML = ""; }
    const c = ov.querySelector("#gdCorpo");
    c.innerHTML = corpo;
    c.scrollTop = 0;
    ov.querySelector("#gdRodape").innerHTML = rodape || `<button type="button" class="iv-btn-o" onclick="fecharGuiaOP()">Fechar</button>`;
    ov.hidden = false;
    document.documentElement.classList.add("iv-trava");
  }

  /* ------------------------------------------------------------------
     Guia da perícia
     ------------------------------------------------------------------ */
  function grauAtual(nome) {
    try { return Number(profs[nome]) || 0; } catch (_) { return 0; }
  }

  function chipsCenas(cenas) {
    return (cenas || []).map((c) => `<span class="gd-chip gd-cena-${e(c)}">${e(CENA_ROTULO[c] || c)}</span>`).join("");
  }

  function cartaoUso(u, grau, soTreinada) {
    const req = Number(u.req) || 0;
    const bloqueado = grau < Math.max(req, soTreinada ? 1 : 0);
    return `
      <div class="gd-uso${bloqueado ? " gd-uso-bloq" : ""}">
        <div class="gd-uso-topo">
          <b>${e(u.nome)}</b>
          ${u.fonte ? `<span class="gd-chip gd-fonte">${e(u.fonte)}</span>` : ""}
        </div>
        <div class="gd-chips">
          ${req ? `<span class="gd-chip gd-req${bloqueado ? " gd-req-falta" : ""}">${e(NIVEL[req] || "Treino")}${bloqueado ? " · você ainda não tem" : ""}</span>` : ""}
          ${u.dt && u.dt !== "—" ? `<span class="gd-chip gd-dt">${e(u.dt)}</span>` : ""}
          ${u.acao && u.acao !== "—" ? `<span class="gd-chip gd-acao">${e(u.acao)}</span>` : ""}
        </div>
        ${u.desc ? `<p>${e(u.desc)}</p>` : ""}
        ${u.cenas && u.cenas.length ? `<div class="gd-chips gd-onde"><span class="gd-onde-rot">Onde usar</span>${chipsCenas(u.cenas)}</div>` : ""}
      </div>`;
  }

  window.abrirGuiaPericiaOP = function (nome, ev) {
    if (ev) { ev.stopPropagation(); ev.preventDefault(); }
    const per = (typeof pericias !== "undefined" ? pericias : []).find((p) => p.nome === nome) || { nome };
    const dados = USOS_PERICIAS_OP[nome] || { resumo: "", usos: [] };
    const extras = (USOS_EXTRAS_OP && USOS_EXTRAS_OP[nome]) || [];
    const grau = grauAtual(nome);
    const nomeGrau = (typeof NOMES_TREINO !== "undefined" && NOMES_TREINO[grau]) || "Não treinado";

    const sub = `
      <div class="gd-chips">
        ${per.attr ? `<span class="gd-chip gd-attr">${e(SIGLA[per.attr] || per.attr)}</span>` : ""}
        ${per.soTreinada ? `<span class="gd-chip gd-req">Somente treinada</span>` : ""}
        ${per.carga ? `<span class="gd-chip gd-acao">Penalidade de carga</span>` : ""}
        <span class="gd-chip gd-grau">Seu grau: ${e(nomeGrau)}</span>
      </div>`;

    let corpo = "";
    if (dados.resumo) corpo += `<p class="gd-resumo">${e(dados.resumo)}</p>`;
    if (per.soTreinada && grau < 1) corpo += `<div class="gd-aviso">Esta perícia só pode ser usada por quem é treinado nela.</div>`;
    corpo += `<div class="gd-lista">${(dados.usos || []).map((u) => cartaoUso(u, grau, !!per.soTreinada)).join("") || '<p class="gd-vazio">Nenhum uso cadastrado.</p>'}</div>`;
    if (extras.length) {
      corpo += `<h4 class="gd-sec">Dos suplementos</h4><div class="gd-lista">${extras.map((u) => cartaoUso(u, grau, !!per.soTreinada)).join("")}</div>`;
    }
    corpo += `<p class="gd-rodape-nota">Dica: em cena de investigação, quem decide se a perícia serve naquele ponto é o mestre. Se não servir, você perde a ação do turno.</p>`;

    const rodape = `
      <button type="button" class="iv-btn-o" onclick="fecharGuiaOP()">Fechar</button>
      <button type="button" class="iv-btn-o" onclick="fecharGuiaOP();abrirGuiaCenasOP()">Cenas</button>
      <button type="button" class="iv-btn-p" onclick="fecharGuiaOP();rolarPericia('${String(nome).replace(/'/g, "\\'")}')">${svg("dado", 16)} Rolar</button>`;
    abrirJanela(nome, sub, corpo, rodape);
    ov.querySelector("#gdRodape").classList.add("gd-rodape3");
  };

  /* ------------------------------------------------------------------
     Guia de cenas
     ------------------------------------------------------------------ */
  let cenaAtiva = "investigacao";

  function htmlBloco(b) {
    return `
      <details class="gd-bloco"${b.aberto ? " open" : ""}>
        <summary><span>${e(b.titulo)}</span>${svg("chevron", 16)}</summary>
        <div class="gd-bloco-corpo">
          ${(b.itens || []).map((i) => `<div class="gd-item"><b>${e(i.nome)}</b><span>${e(i.texto)}</span></div>`).join("")}
        </div>
      </details>`;
  }

  function htmlComparativo() {
    const c = CENAS_COMPARA_OP;
    return `
      <details class="gd-bloco">
        <summary><span>Comparar as cenas lado a lado</span>${svg("chevron", 16)}</summary>
        <div class="gd-bloco-corpo gd-tab-wrap">
          <table class="gd-tab">
            <thead><tr>${c.colunas.map((t) => `<th>${e(t)}</th>`).join("")}</tr></thead>
            <tbody>${c.linhas.map((l) => `<tr>${l.map((t, i) => (i === 0 ? `<th>${e(t)}</th>` : `<td>${e(t)}</td>`)).join("")}</tr>`).join("")}</tbody>
          </table>
        </div>
      </details>`;
  }

  function renderCenas() {
    const cena = CENAS_OP.find((c) => c.id === cenaAtiva) || CENAS_OP[0];
    const abas = CENAS_OP.map((c) => `
      <button type="button" class="gd-aba${c.id === cena.id ? " ativa" : ""}" onclick="trocarCenaGuiaOP('${c.id}')">${svg(c.icone, 16)}<span>${e(c.nome)}</span></button>`).join("");
    const corpo = `
      <div class="gd-abas">${abas}</div>
      <p class="gd-resumo">${e(cena.resumo)}</p>
      <div class="gd-chips gd-tags">${(cena.tags || []).map((t) => `<span class="gd-chip gd-tag">${e(t)}</span>`).join("")}</div>
      ${cena.blocos.map(htmlBloco).join("")}
      ${htmlComparativo()}`;
    const c = ov.querySelector("#gdCorpo");
    const rolagem = c.scrollTop;
    c.innerHTML = corpo;
    c.scrollTop = rolagem;
  }

  window.trocarCenaGuiaOP = function (id) {
    cenaAtiva = id;
    renderCenas();
    ov.querySelector("#gdCorpo").scrollTop = 0;
  };

  window.abrirGuiaCenasOP = function (id, ev) {
    if (ev) { ev.stopPropagation(); ev.preventDefault(); }
    if (id) cenaAtiva = id;
    abrirJanela("Tipos de cena", "", "", `<button type="button" class="iv-btn-p" onclick="fecharGuiaOP()">Entendi</button>`);
    ov.querySelector("#gdRodape").classList.remove("gd-rodape3");
    ov.querySelector("#gdSub").hidden = true;
    renderCenas();
  };

  /* ------------------------------------------------------------------
     Injeção na tela: botão "i" em cada perícia e botões de guia
     ------------------------------------------------------------------ */
  function nomeDaLinha(linha) {
    const n = linha.querySelector(".pericia-nome");
    const m = n && /rolarPericia\('([^']+)'/.exec(n.getAttribute("onclick") || "");
    return m ? m[1] : null;
  }

  function decorarLinhas() {
    const lista = document.getElementById("pericias");
    if (!lista) return;
    lista.querySelectorAll(".pericia").forEach((linha) => {
      if (linha.querySelector(".pericia-info-op")) return;
      const nome = nomeDaLinha(linha);
      if (!nome) return;
      const esq = linha.querySelector(".pericia-esquerda");
      if (!esq) return;
      const b = document.createElement("button");
      b.type = "button";
      b.className = "pericia-info-op";
      b.title = `O que dá para fazer com ${nome}`;
      b.setAttribute("aria-label", `Usos de ${nome}`);
      b.innerHTML = svg("info", 16);
      b.addEventListener("click", (ev) => abrirGuiaPericiaOP(nome, ev));
      esq.appendChild(b);
    });
  }

  function botaoCenas(classe) {
    const b = document.createElement("button");
    b.type = "button";
    b.className = classe;
    b.title = "Guia de cenas: investigação, combate e interlúdio";
    b.setAttribute("aria-label", "Guia de cenas");
    b.innerHTML = svg("livro", 18);
    b.addEventListener("click", (ev) => abrirGuiaCenasOP(null, ev));
    return b;
  }

  function injetarBotoes() {
    const wrap = document.querySelector(".pericias-filtro-wrap");
    if (wrap && !wrap.querySelector(".gd-btn-cenas")) {
      wrap.insertBefore(botaoCenas("pericias-filtro-btn gd-btn-cenas"), wrap.firstChild);
    }
    const comb = document.getElementById("combate");
    if (comb && !comb.querySelector(".gd-faixa-cenas")) {
      const faixa = document.createElement("button");
      faixa.type = "button";
      faixa.className = "gd-faixa-cenas";
      faixa.innerHTML = `${svg("livro", 18)}<span>Como funciona cada tipo de cena</span><small>Investigação, combate e interlúdio</small>`;
      faixa.addEventListener("click", (ev) => abrirGuiaCenasOP("combate", ev));
      comb.insertBefore(faixa, comb.firstChild);
    }
  }

  function iniciar() {
    injetarBotoes();
    const lista = document.getElementById("pericias");
    if (lista) {
      decorarLinhas();
      new MutationObserver(decorarLinhas).observe(lista, { childList: true });
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", iniciar);
  else iniciar();
})();
