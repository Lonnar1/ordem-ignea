/* =====================================================================
   migrar-op.js  ·  "Migrar fichas" (painel Social)
   Copia fichas, monstros e dados do modo Mestre da conta ANTIGA (projeto
   ficha-ignea) para a conta com que a pessoa está logada agora (projeto
   ordem-ignea). Nada é apagado na conta antiga.

   Para tirar do ar quando a migração acabar: apague este arquivo e a linha
   <script src="migrar-op.js"></script> do index.html (ou mude ATIVO para false).
   ===================================================================== */
(function () {
  "use strict";

  const ATIVO = true;
  if (!ATIVO) return;

  const V = "10.12.2";
  const CFG_ANTIGO = {
    apiKey: "AIzaSyCRbpNWige23ErKLRzt5BYNF3ltCYaRw24",
    authDomain: "ficha-ignea.firebaseapp.com",
    projectId: "ficha-ignea",
    storageBucket: "ficha-ignea.firebasestorage.app",
    messagingSenderId: "810805802203",
    appId: "1:810805802203:web:5968e477ae99fee33348fe"
  };

  const e = (t) => String(t == null ? "" : t).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  let ov = null;
  let antigo = null;          // { auth, db, uid, fs }
  let fichas = [];            // [{ id, data }]
  let ocupado = false;

  /* ------------------------------------------------------------------ */
  function garantirJanela() {
    if (ov) return ov;
    ov = document.createElement("div");
    ov.className = "iv-ov mig-ov";
    ov.hidden = true;
    ov.innerHTML = `
      <div class="iv-sheet mig-sheet" role="dialog" aria-modal="true">
        <div class="iv-sheet-top"><b>Migrar fichas</b><button type="button" class="iv-x" aria-label="Fechar" onclick="fecharMigrarOP()"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button></div>
        <div class="iv-sheet-body mig-corpo" id="migCorpo"></div>
        <div class="iv-sheet-foot" id="migRodape"></div>
      </div>`;
    ov.addEventListener("click", (ev) => { if (ev.target === ov && !ocupado) fecharMigrarOP(); });
    document.body.appendChild(ov);
    return ov;
  }

  function tela(corpo, rodape) {
    garantirJanela();
    ov.querySelector("#migCorpo").innerHTML = corpo;
    ov.querySelector("#migRodape").innerHTML = rodape;
  }

  /* ------------------------------------------------------------------ */
  window.abrirMigrarOP = function () {
    if (!window.usuarioAtual) { if (window.alertBonito) alertBonito("Entre na sua conta primeiro."); return; }
    antigo = null; fichas = []; ocupado = false;
    telaLogin();
    garantirJanela().hidden = false;
  };

  window.fecharMigrarOP = async function () {
    if (ocupado) return;
    if (ov) ov.hidden = true;
    await sairAntigo();
  };

  async function sairAntigo() {
    try {
      if (antigo && antigo.auth && antigo.fs && antigo.fs.signOut) await antigo.fs.signOut(antigo.auth);
    } catch (_) {}
    antigo = null;
  }

  /* ------------------------------------------------------------------ */
  function telaLogin(msg) {
    tela(`
      <p class="mig-txt">Entre com a conta que você usava <b>antes</b> (a antiga). Suas fichas serão copiadas para a conta em que você está agora. Nada é apagado na conta antiga.</p>
      <input id="migEmail" type="email" placeholder="E-mail da conta antiga" autocomplete="off" autocapitalize="off">
      <input id="migSenha" type="password" placeholder="Senha da conta antiga" autocomplete="off">
      <div class="mig-msg ${msg ? "mig-erro" : ""}" id="migMsg">${e(msg || "")}</div>`,
      `<button type="button" class="iv-btn-o" onclick="fecharMigrarOP()">Cancelar</button>
       <button type="button" class="iv-btn-p" id="migBtnEntrar" onclick="migrarEntrarOP()">Buscar fichas</button>`);
    const s = ov.querySelector("#migSenha");
    if (s) s.addEventListener("keydown", (ev) => { if (ev.key === "Enter") window.migrarEntrarOP(); });
  }

  function msg(t, erro) {
    const m = ov && ov.querySelector("#migMsg");
    if (!m) return;
    m.textContent = t || "";
    m.className = "mig-msg" + (erro ? " mig-erro" : "");
  }

  function traduzErro(err) {
    const c = (err && err.code) || "";
    if (/invalid-credential|wrong-password|user-not-found|invalid-login/.test(c)) return "E-mail ou senha da conta antiga não conferem.";
    if (/invalid-email/.test(c)) return "E-mail inválido.";
    if (/too-many-requests/.test(c)) return "Muitas tentativas. Espere um pouco e tente de novo.";
    if (/network/.test(c)) return "Sem conexão. Tente de novo.";
    if (/unauthorized-domain/.test(c)) return "Este endereço não está autorizado no projeto antigo.";
    if (/permission-denied/.test(c)) return "Sem permissão para ler a conta antiga.";
    return "Erro: " + (c || (err && err.message) || "desconhecido");
  }

  /* ------------------------------------------------------------------ */
  window.migrarEntrarOP = async function () {
    if (ocupado) return;
    const email = (ov.querySelector("#migEmail").value || "").trim();
    const senha = ov.querySelector("#migSenha").value || "";
    if (!email || !senha) { msg("Preencha o e-mail e a senha.", true); return; }

    ocupado = true;
    const btn = ov.querySelector("#migBtnEntrar");
    if (btn) { btn.disabled = true; btn.textContent = "Buscando..."; }
    msg("");

    try {
      const [appMod, authMod, fs] = await Promise.all([
        import(`https://www.gstatic.com/firebasejs/${V}/firebase-app.js`),
        import(`https://www.gstatic.com/firebasejs/${V}/firebase-auth.js`),
        import(`https://www.gstatic.com/firebasejs/${V}/firebase-firestore.js`)
      ]);
      let app;
      try { app = appMod.getApp("antigo"); } catch (_) { app = appMod.initializeApp(CFG_ANTIGO, "antigo"); }
      const auth = authMod.getAuth(app);
      const db = fs.getFirestore(app);
      const r = await authMod.signInWithEmailAndPassword(auth, email, senha);
      antigo = { auth, db, uid: r.user.uid, fs: Object.assign({}, fs, { signOut: authMod.signOut }) };

      const snap = await fs.getDocs(fs.collection(db, "usuarios", antigo.uid, "fichas"));
      fichas = snap.docs.map((d) => ({ id: d.id, data: d.data() }));
      fichas.sort((a, b) => String(a.data.nome || "").localeCompare(String(b.data.nome || ""), "pt-BR"));
      ocupado = false;
      telaLista();
    } catch (err) {
      console.error(err);
      ocupado = false;
      await sairAntigo();
      telaLogin(traduzErro(err));
    }
  };

  /* ------------------------------------------------------------------ */
  function ehOP(d) { return d && (d.nex !== undefined || d.origem !== undefined); }

  function telaLista() {
    const linhas = fichas.length
      ? fichas.map((f, i) => {
          const d = f.data || {};
          const op = ehOP(d);
          const partes = [];
          if (d.classe) partes.push(e(d.classe));
          if (d.origem) partes.push(e(d.origem));
          if (d.nex !== undefined) partes.push("NEX " + e(d.nex) + "%");
          if (!op) partes.push("pode ser de outro sistema");
          return `<label class="mig-linha">
            <input type="checkbox" data-i="${i}" ${op ? "checked" : ""}>
            <span><b>${e(d.nome) || "(sem nome)"}</b><small>${partes.join(" · ")}</small></span>
          </label>`;
        }).join("")
      : `<p class="mig-txt">Essa conta não tem fichas.</p>`;

    tela(`
      <p class="mig-txt">Marque o que deseja copiar. As fichas que parecem de Ordem Paranormal já vêm marcadas.</p>
      <div class="mig-lista">${linhas}</div>
      <label class="mig-op"><input type="checkbox" id="migMonstros"> Copiar também meus monstros do modo Mestre</label>
      <label class="mig-op"><input type="checkbox" id="migMestre"> Copiar também os dados do modo Mestre (campanhas)</label>
      <div class="mig-msg" id="migMsg"></div>`,
      `<button type="button" class="iv-btn-o" onclick="fecharMigrarOP()">Cancelar</button>
       <button type="button" class="iv-btn-p" id="migBtnCopiar" onclick="migrarCopiarOP()">Copiar</button>`);
  }

  /* ------------------------------------------------------------------ */
  window.migrarCopiarOP = async function () {
    if (ocupado || !antigo) return;
    const sel = [...ov.querySelectorAll(".mig-lista input:checked")].map((c) => fichas[Number(c.dataset.i)]);
    const comMonstros = ov.querySelector("#migMonstros").checked;
    const comMestre = ov.querySelector("#migMestre").checked;
    if (!sel.length && !comMonstros && !comMestre) { msg("Marque pelo menos uma coisa.", true); return; }

    const meuUid = window.usuarioAtual && window.usuarioAtual.uid;
    if (!meuUid) { msg("Você precisa estar logado na conta nova.", true); return; }

    ocupado = true;
    const btn = ov.querySelector("#migBtnCopiar");
    if (btn) { btn.disabled = true; btn.textContent = "Copiando..."; }

    const fs = antigo.fs;
    const dbNovo = window.db;
    let ok = 0, falhas = 0, nMonstros = 0, mestreOk = false;
    const erros = [];

    for (const f of sel) {
      try {
        // grupos antigos não existem no projeto novo
        await fs.setDoc(fs.doc(dbNovo, "usuarios", meuUid, "fichas", f.id), Object.assign({}, f.data, { grupoAtivo: "" }));
        ok++;
      } catch (err) { falhas++; erros.push((f.data.nome || f.id) + ": " + (err.code || err.message)); }
    }

    if (comMonstros) {
      try {
        const snap = await fs.getDocs(fs.collection(antigo.db, "usuarios", antigo.uid, "monstros"));
        for (const d of snap.docs) {
          await fs.setDoc(fs.doc(dbNovo, "usuarios", meuUid, "monstros", d.id), d.data());
          nMonstros++;
        }
      } catch (err) { falhas++; erros.push("monstros: " + (err.code || err.message)); }
    }

    if (comMestre) {
      try {
        const s = await fs.getDoc(fs.doc(antigo.db, "mestres", antigo.uid));
        if (s.exists()) { await fs.setDoc(fs.doc(dbNovo, "mestres", meuUid), s.data()); mestreOk = true; }
      } catch (err) { falhas++; erros.push("modo Mestre: " + (err.code || err.message)); }
    }

    await sairAntigo();
    ocupado = false;

    const resumo = [];
    resumo.push(ok + " ficha(s) copiada(s)");
    if (comMonstros) resumo.push(nMonstros + " monstro(s)");
    if (comMestre) resumo.push(mestreOk ? "dados do Mestre" : "sem dados de Mestre para copiar");

    tela(`
      <p class="mig-txt"><b>${falhas ? "Terminou com problemas." : "Pronto!"}</b><br>${e(resumo.join(" · "))}</p>
      ${erros.length ? `<div class="mig-msg mig-erro">${erros.map(e).join("<br>")}</div>` : ""}
      <p class="mig-txt">Toque em Recarregar para as fichas aparecerem na sua lista.</p>`,
      `<button type="button" class="iv-btn-o" onclick="fecharMigrarOP()">Fechar</button>
       <button type="button" class="iv-btn-p" onclick="location.reload()">Recarregar</button>`);
  };

  /* ------------------------------------------------------------------ */
  /* botão no painel Social */
  function iniciar() {
    const social = document.getElementById("painelAmigos");
    if (!social || social.querySelector(".mig-social")) return;
    const rod = document.createElement("div");
    rod.className = "mig-social";
    rod.innerHTML = `<button type="button" class="mig-btn" onclick="abrirMigrarOP()"><i class="ti ti-transfer" aria-hidden="true"></i><span>Migrar fichas da conta antiga</span></button>`;
    const apk = social.querySelector(".apk-social");
    if (apk) social.insertBefore(rod, apk); else social.appendChild(rod);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", iniciar);
  else iniciar();
})();
