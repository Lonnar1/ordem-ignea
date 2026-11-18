/* =====================================================================
   DOCUMENTOS (Ordem Paranormal)
   - cada documento é uma "pasta": pode ter várias fotos
   - fotos podem ser reordenadas, removidas e acrescentadas depois
   - documentos podem ser reordenados segurando na miniatura (ver equipamentos-op.js)
   Formato novo: doc.imagens = [{ url, deleteUrl }]. Os campos antigos
   (imagemUrl / imagemDeleteUrl) continuam sendo gravados com a primeira foto,
   então documentos antigos e o resto do app seguem funcionando.
   ===================================================================== */
const MAX_FOTOS_DOC_OP = 10;

function imagensDocOP(doc) {
  if (!doc) return [];
  if (Array.isArray(doc.imagens) && doc.imagens.length) return doc.imagens.filter((i) => i && i.url);
  return doc.imagemUrl ? [{ url: doc.imagemUrl, deleteUrl: doc.imagemDeleteUrl || "" }] : [];
}

function _gravarImagensDocOP(doc, lista) {
  const ok = lista.filter((i) => i && i.url).map((i) => ({ url: i.url, deleteUrl: i.deleteUrl || "" }));
  doc.imagens = ok;
  doc.imagemUrl = ok[0] ? ok[0].url : "";
  doc.imagemDeleteUrl = ok[0] ? ok[0].deleteUrl : "";
}

function _lerArquivosOP(files) {
  return Promise.all([...files].map((f) => new Promise((res) => {
    const r = new FileReader();
    r.onload = () => res(r.result);
    r.onerror = () => res("");
    r.readAsDataURL(f);
  }))).then((l) => l.filter(Boolean));
}

/* envia as fotos que ainda não têm endereço; devolve true se todas foram */
async function _enviarFotosOP(lista, aoProgredir) {
  const pend = lista.filter((f) => !f.url && f.base64);
  let feitas = 0;
  for (const f of pend) {
    if (aoProgredir) aoProgredir(++feitas, pend.length);
    const r = await uploadImagemFirebase(f.base64, "documento");
    if (r.erro || !r.url) return false;
    f.url = r.url;
    f.deleteUrl = r.deleteUrl || "";
    f.base64 = "";
  }
  return true;
}

/* ---------- formulário de novo documento ---------- */
let docFotosFormOP = [];

function _renderFotosFormOP() {
  const box = document.getElementById("docPreviewBox");
  if (!box) return;
  if (!docFotosFormOP.length) { box.style.display = "none"; box.innerHTML = ""; return; }
  box.style.display = "block";
  box.innerHTML = `<div class="doc-fotos-grade">${docFotosFormOP.map((f, i) => `
    <div class="doc-foto-mini"><img src="${f.base64 || esc(f.url)}" alt="" />
      <button type="button" aria-label="Remover foto" onclick="removerFotoFormOP(${i})">×</button>
      ${i === 0 && docFotosFormOP.length > 1 ? '<em>capa</em>' : ""}</div>`).join("")}</div>
    <small class="doc-fotos-cont">${docFotosFormOP.length} de ${MAX_FOTOS_DOC_OP} fotos</small>`;
  const rot = document.querySelector("#boxDocumentosForm .mapa-upload-label");
  if (rot && rot.firstChild) rot.firstChild.textContent = "Adicionar mais fotos ";
}

function removerFotoFormOP(i) {
  docFotosFormOP.splice(i, 1);
  if (!docFotosFormOP.length) {
    const rot = document.querySelector("#boxDocumentosForm .mapa-upload-label");
    if (rot && rot.firstChild) rot.firstChild.textContent = "Anexar fotos (opcional) ";
  }
  _renderFotosFormOP();
}

async function previewDocImagem() {
  const input = document.getElementById("docImagem");
  if (!input || !input.files || !input.files.length) return;
  const sobra = MAX_FOTOS_DOC_OP - docFotosFormOP.length;
  const arquivos = [...input.files].slice(0, Math.max(0, sobra));
  if (input.files.length > sobra) alertBonito(`Cada documento aceita até ${MAX_FOTOS_DOC_OP} fotos.`);
  const lidas = await _lerArquivosOP(arquivos);
  lidas.forEach((b) => docFotosFormOP.push({ base64: b, url: "", deleteUrl: "" }));
  input.value = "";
  _renderFotosFormOP();
}

async function addDocumento() {
  const nome = document.getElementById("docNome").value.trim();
  const tipo = document.getElementById("docTipo").value || "Documento";
  const texto = document.getElementById("docTexto").value.trim();

  if (!nome) { alertBonito("Coloque o título do documento."); return; }
  if (!texto && !docFotosFormOP.length) { alertBonito("Escreva o conteúdo ou anexe uma foto."); return; }
  if (documentos.length >= 40) { alertBonito("Limite de 40 documentos por personagem."); return; }

  const btn = document.querySelector("#ivOv_doc .iv-btn-p, #boxDocumentosForm .inv-add-btn");
  const textoBtn = btn ? btn.textContent : "";
  const trava = (t) => { if (btn) { btn.disabled = true; btn.textContent = t; } };
  trava("Enviando…");

  const ok = await _enviarFotosOP(docFotosFormOP, (n, total) => trava(`Enviando ${n}/${total}…`));
  if (btn) { btn.disabled = false; btn.textContent = textoBtn; }
  if (!ok) {
    alertBonito(_mensagemErroUpload("O documento não foi salvo. As fotos que já subiram não precisam ser enviadas de novo."));
    return;
  }

  const doc = { nome, tipo, texto, criadoEm: Date.now() };
  _gravarImagensDocOP(doc, docFotosFormOP);
  documentos.push(doc);

  document.getElementById("docNome").value = "";
  document.getElementById("docTexto").value = "";
  document.getElementById("docImagem").value = "";
  document.getElementById("docTipo").value = "Documento";
  docFotosFormOP = [];
  _renderFotosFormOP();

  salvarTudo();
  renderDocumentos();
}

/* ---------- lista ---------- */
function renderDocumentos() {
  const ul = document.getElementById("listaDocumentos");
  if (!ul) return;
  ul.innerHTML = "";

  documentos.forEach((doc, index) => {
    const li = document.createElement("li");
    li.className = "veiculo-card doc-card";
    li.onclick = () => verDocumento(index);

    const fotos = imagensDocOP(doc);
    const previa = (doc.texto || "").trim();
    const extra = fotos.length > 1 ? ` · ${fotos.length} fotos` : "";

    li.innerHTML = `
      <div class="doc-card-linha">
        ${
          fotos.length
            ? `<div class="doc-card-thumb doc-card-thumb-img"><img src="${esc(fotos[0].url)}" alt="" loading="lazy" />${fotos.length > 1 ? `<em>${fotos.length}</em>` : ""}</div>`
            : `<div class="doc-card-thumb doc-card-thumb-icone">${ICONE_TIPO_DOC[doc.tipo] || "📄"}</div>`
        }
        <div class="doc-card-info">
          <div class="doc-card-nome">${esc(doc.nome)}</div>
          <div class="doc-card-tipo">${esc(doc.tipo || "Documento")}${extra}</div>
          ${previa ? `<p class="doc-card-previa">${esc(previa)}</p>` : ""}
        </div>
        <button class="item-remover" type="button"
          onclick="event.stopPropagation(); removerDocumento(${index})">×</button>
      </div>`;

    ul.appendChild(li);
  });
  try { atualizarContagensInvOP(); } catch (e) { /* inventário ainda não montado */ }
}

/* ---------- visualização (galeria) ---------- */
function _htmlGaleriaDocOP(fotos) {
  if (!fotos.length) return "";
  const slides = fotos.map((f, i) => `
    <div class="doc-slide" onclick="abrirImagemZoom(this.dataset.u)" data-u="${esc(f.url)}">
      <img src="${esc(f.url)}" class="doc-imagem" alt="Foto ${i + 1}" loading="lazy" />
    </div>`).join("");
  const miniaturas = fotos.length > 1
    ? `<div class="doc-miniaturas">${fotos.map((f, i) => `<button type="button" class="${i === 0 ? "on" : ""}" aria-label="Foto ${i + 1}" onclick="irParaFotoDocOP(${i})"><img src="${esc(f.url)}" alt="" /></button>`).join("")}</div>`
    : "";
  return `
    <div class="doc-galeria-wrap">
      <div class="doc-galeria" id="docGaleriaOP">${slides}</div>
      ${fotos.length > 1 ? `<span class="doc-contador" id="docContadorOP">1 / ${fotos.length}</span>` : ""}
      <span class="doc-imagem-dica">Toque para ampliar</span>
    </div>
    ${miniaturas}`;
}

function irParaFotoDocOP(i) {
  const g = document.getElementById("docGaleriaOP");
  if (g) g.scrollTo({ left: g.clientWidth * i, behavior: "smooth" });
}

document.addEventListener("scroll", (e) => {
  const g = e.target;
  if (!g || g.id !== "docGaleriaOP") return;
  const n = g.children.length;
  const i = Math.min(n - 1, Math.max(0, Math.round(g.scrollLeft / Math.max(1, g.clientWidth))));
  const c = document.getElementById("docContadorOP");
  if (c) c.textContent = `${i + 1} / ${n}`;
  document.querySelectorAll(".doc-miniaturas button").forEach((b, k) => b.classList.toggle("on", k === i));
}, true);

function verDocumento(index) {
  const doc = documentos[index];
  if (!doc) return;
  const html = `
    <div class="popup-bloco">
      <div class="doc-tipo-tag">${ICONE_TIPO_DOC[doc.tipo] || "📄"} ${esc(doc.tipo || "Documento")}</div>
      ${_htmlGaleriaDocOP(imagensDocOP(doc))}
      ${doc.texto ? `<div class="popup-descricao doc-texto">${esc(doc.texto)}</div>` : ""}
    </div>`;
  abrirPopup(doc.nome, html, true, () => editarDocumento(index));
}

/* ---------- edição (fotos entram aqui) ---------- */
let docFotosEdicaoOP = [];

function _renderFotosEdicaoOP() {
  const box = document.getElementById("editDocFotos");
  if (!box) return;
  const n = docFotosEdicaoOP.length;
  box.innerHTML = `
    <div class="doc-fotos-grade">${docFotosEdicaoOP.map((f, i) => `
      <div class="doc-foto-mini"><img src="${f.base64 || esc(f.url)}" alt="" />
        <button type="button" aria-label="Remover foto" onclick="removerFotoEdicaoOP(${i})">×</button>
        <div class="doc-foto-mov">
          <button type="button" aria-label="Mover para trás" ${i === 0 ? "disabled" : ""} onclick="moverFotoEdicaoOP(${i},-1)">‹</button>
          <button type="button" aria-label="Mover para frente" ${i === n - 1 ? "disabled" : ""} onclick="moverFotoEdicaoOP(${i},1)">›</button>
        </div>
        ${i === 0 && n > 1 ? "<em>capa</em>" : ""}</div>`).join("")}</div>
    <label class="botao-upload doc-add-fotos">${n ? "Adicionar mais fotos" : "Adicionar fotos"}
      <input type="file" accept="image/*" multiple style="display:none" onchange="adicionarFotosEdicaoOP(this)" />
    </label>
    <small class="doc-fotos-cont">${n} de ${MAX_FOTOS_DOC_OP} fotos</small>`;
}

function removerFotoEdicaoOP(i) { docFotosEdicaoOP.splice(i, 1); _renderFotosEdicaoOP(); }

function moverFotoEdicaoOP(i, d) {
  const j = i + d;
  if (j < 0 || j >= docFotosEdicaoOP.length) return;
  const [f] = docFotosEdicaoOP.splice(i, 1);
  docFotosEdicaoOP.splice(j, 0, f);
  _renderFotosEdicaoOP();
}

async function adicionarFotosEdicaoOP(input) {
  const sobra = MAX_FOTOS_DOC_OP - docFotosEdicaoOP.length;
  const arquivos = [...input.files].slice(0, Math.max(0, sobra));
  if (input.files.length > sobra) alertBonito(`Cada documento aceita até ${MAX_FOTOS_DOC_OP} fotos.`);
  const lidas = await _lerArquivosOP(arquivos);
  lidas.forEach((b) => docFotosEdicaoOP.push({ base64: b, url: "", deleteUrl: "" }));
  input.value = "";
  _renderFotosEdicaoOP();
}

function editarDocumento(index) {
  const doc = documentos[index];
  if (!doc) return;
  docFotosEdicaoOP = imagensDocOP(doc).map((f) => ({ url: f.url, deleteUrl: f.deleteUrl || "", base64: "" }));
  const tipos = Object.keys(ICONE_TIPO_DOC);
  const html = `
    <div class="popup-bloco">
      <input id="editDocNome" value="${esc(doc.nome)}" placeholder="Título" style="margin-bottom:8px" />
      <select id="editDocTipo" class="input-personagem" style="margin-bottom:8px">
        ${tipos.map((t) => `<option value="${esc(t)}" ${t === doc.tipo ? "selected" : ""}>${ICONE_TIPO_DOC[t]} ${esc(t)}</option>`).join("")}
      </select>
      <textarea id="editDocTexto" placeholder="Conteúdo" style="min-height:140px">${esc(doc.texto || "")}</textarea>
      <div class="doc-rot-fotos">Fotos</div>
      <div id="editDocFotos"></div>
      <button id="btnSalvarDocOP" class="doc-salvar" onclick="salvarEdicaoDocumento(${index})">Salvar</button>
    </div>`;
  abrirPopup("Editar documento", html, true, null);
  _renderFotosEdicaoOP();
}

async function salvarEdicaoDocumento(index) {
  const nome = document.getElementById("editDocNome")?.value.trim();
  if (!nome) { alertBonito("Título obrigatório."); return; }
  const doc = documentos[index];
  if (!doc) return;

  const btn = document.getElementById("btnSalvarDocOP");
  const trava = (t) => { if (btn) { btn.disabled = true; btn.textContent = t; } };
  trava("Enviando…");
  const ok = await _enviarFotosOP(docFotosEdicaoOP, (n, total) => trava(`Enviando ${n}/${total}…`));
  if (btn) { btn.disabled = false; btn.textContent = "Salvar"; }
  if (!ok) {
    alertBonito(_mensagemErroUpload("Nada foi alterado. As fotos que já subiram não precisam ser enviadas de novo."));
    return;
  }

  doc.nome = nome;
  doc.tipo = document.getElementById("editDocTipo")?.value || doc.tipo;
  doc.texto = document.getElementById("editDocTexto")?.value.trim() || "";
  _gravarImagensDocOP(doc, docFotosEdicaoOP);

  salvarTudo();
  renderDocumentos();
  fecharPopup();
}

/* o rótulo do botão de anexar passa a falar em fotos */
document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("docImagem");
  if (input) input.multiple = true;
  const rot = document.querySelector("#boxDocumentosForm .mapa-upload-label");
  if (rot && rot.firstChild) rot.firstChild.textContent = "Anexar fotos (opcional) ";
  try { renderDocumentos(); } catch (e) {}
});

/* =====================================================================
   COMPACTAÇÃO DE IMAGENS: toda foto é reduzida antes de subir
   (lado maior limitado e formato WebP). Vale para documentos, mapas,
   armas, personagem etc., pois todos usam uploadImagemFirebase.
   Imagens animadas (GIF) passam sem mudar.
   ===================================================================== */
const LADO_MAX_IMAGEM_OP = { documento: 1400, mapa: 2000, padrao: 1000 };

function _comprimirImagemOP(dataUrl, lado, qualidade) {
  return new Promise((resolve) => {
    if (typeof dataUrl !== "string" || !/^data:image\/(png|jpe?g|webp|bmp|heic|heif)/i.test(dataUrl)) return resolve(dataUrl);
    const img = new Image();
    img.onerror = () => resolve(dataUrl);
    img.onload = () => {
      try {
        const k = Math.min(1, lado / Math.max(img.naturalWidth, img.naturalHeight));
        const w = Math.max(1, Math.round(img.naturalWidth * k));
        const h = Math.max(1, Math.round(img.naturalHeight * k));
        const c = document.createElement("canvas");
        c.width = w; c.height = h;
        c.getContext("2d").drawImage(img, 0, 0, w, h);
        let out = c.toDataURL("image/webp", qualidade);
        if (!out.startsWith("data:image/webp")) {
          // navegador sem WebP: JPEG com fundo branco
          const c2 = document.createElement("canvas");
          c2.width = w; c2.height = h;
          const x = c2.getContext("2d");
          x.fillStyle = "#fff"; x.fillRect(0, 0, w, h); x.drawImage(img, 0, 0, w, h);
          out = c2.toDataURL("image/jpeg", qualidade);
        }
        resolve(out.length < dataUrl.length ? out : dataUrl);
      } catch (e) { resolve(dataUrl); }
    };
    img.src = dataUrl;
  });
}

(function () {
  if (typeof uploadImagemFirebase !== "function") return;
  const original = uploadImagemFirebase;
  uploadImagemFirebase = async function (base64, caminho) {
    const lado = LADO_MAX_IMAGEM_OP[caminho] || LADO_MAX_IMAGEM_OP.padrao;
    const comprimida = await _comprimirImagemOP(base64, lado, 0.78);
    return original.call(this, comprimida, caminho);
  };
})();

/* =====================================================================
   Liberar espaço: ao tirar uma foto (ou apagar o documento), o link de
   apagar guardado junto dela é acionado. Só vale para fotos guardadas no
   seu próprio worker; fotos antigas do ImgBB ficam como estão.
   ===================================================================== */
function _apagarImagemRemotaOP(deleteUrl) {
  try {
    if (!deleteUrl || !/\.workers\.dev\/d\//.test(deleteUrl)) return;
    fetch(deleteUrl, { mode: "no-cors" }).catch(() => {});
  } catch (e) { /* sem rede: a foto fica guardada, sem prejuízo */ }
}

(function () {
  const salvarOriginal = salvarEdicaoDocumento;
  salvarEdicaoDocumento = async function (index) {
    const doc = documentos[index];
    const antes = imagensDocOP(doc);
    await salvarOriginal.apply(this, arguments);
    // só apaga depois que o salvamento realmente aconteceu (o documento mudou)
    const depois = imagensDocOP(documentos[index]);
    if (documentos[index] === doc && depois !== antes && !doc.compartilhado && !doc.copiaDaMesa) {
      const urls = new Set(depois.map((f) => f.url));
      antes.filter((f) => !urls.has(f.url)).forEach((f) => _apagarImagemRemotaOP(f.deleteUrl));
    }
  };
})();

async function removerDocumento(index) {
  if (!(await confirmBonito("Remover este documento?"))) return;
  const [doc] = documentos.splice(index, 1);
  // fotos que também estão na mesa não são apagadas do servidor
  if (!doc.copiaDaMesa && !doc.compartilhado) imagensDocOP(doc).forEach((f) => _apagarImagemRemotaOP(f.deleteUrl));
  salvarTudo();
  renderDocumentos();
}

/* =====================================================================
   DOCUMENTOS COMPARTILHADOS COM A MESA
   Aba "Compartilhados" ao lado de "Docs". Os documentos pessoais ficam em
   Docs (privados); só vai para a mesa o que for colocado aqui.
   - todo mundo do grupo vê e adiciona
   - cada um apaga só o que criou
   Ficam no documento do grupo (grupos/{id}.docsCompartilhados), pequenos:
   as fotos são só endereços.
   ===================================================================== */
const MAX_COMPARTILHADOS_OP = 100;
const MAX_TEXTO_COMP_OP = 4000;
let compListaOP = [];          // documentos compartilhados do grupo atual
let compGrupoOP = null;        // { id, nome, membros }
let compCancelarOP = null;     // encerra a escuta em tempo real
let compEstadoOP = "";         // "", "semlogin", "semgrupo", "erro"
let compFotosFormOP = [];

function _compGrupoIdOP() {
  try { return (window.personagens && window.personagens[personagemAtual] && window.personagens[personagemAtual].grupoAtivo) || ""; }
  catch (e) { return ""; }
}
function _compMeuUidOP() { return (window.usuarioAtual && window.usuarioAtual.uid) || ""; }

/* grava a lista inteira de forma segura (lê e altera na mesma operação) */
async function _compAlterarOP(grupoId, mutar) {
  const ref = doc(db, "grupos", grupoId);
  if (window.runTransaction) {
    return window.runTransaction(db, async (tx) => {
      const snap = await tx.get(ref);
      if (!snap.exists()) throw new Error("grupo-inexistente");
      const atual = Array.isArray(snap.data().docsCompartilhados) ? [...snap.data().docsCompartilhados] : [];
      tx.update(ref, { docsCompartilhados: mutar(atual) });
    });
  }
  const snap = await getDoc(ref);
  if (!snap.exists()) throw new Error("grupo-inexistente");
  const atual = Array.isArray(snap.data().docsCompartilhados) ? [...snap.data().docsCompartilhados] : [];
  await updateDoc(ref, { docsCompartilhados: mutar(atual) });
}

function _compMensagemErroOP(e) {
  const c = (e && (e.code || e.message)) || "";
  if (/permission-denied|insufficient/i.test(c)) return "O Firebase não deixou salvar. As regras do banco precisam permitir que membros do grupo alterem o campo docsCompartilhados (veja a mensagem do Claude com o trecho das regras).";
  if (/grupo-inexistente/.test(c)) return "Esse grupo não existe mais.";
  if (/unavailable|network|offline/i.test(c) || !navigator.onLine) return "Sem conexão agora. Tente de novo quando a internet voltar.";
  return "Não consegui salvar agora. Tente de novo em instantes.";
}

/* ---------- montagem da aba ---------- */
function montarAbaCompartilhadosOP() {
  const tabs = document.getElementById("ivTabsOP");
  const paneDocs = document.querySelector('#invOP .iv-pane[data-pane="docs"]');
  if (!tabs || !paneDocs) return false;
  if (document.getElementById("compPaneOP")) return true;

  const btn = document.createElement("button");
  btn.type = "button";
  btn.dataset.pane = "comp";
  btn.setAttribute("onclick", "trocarPaneInvOP('comp')");
  btn.innerHTML = 'Compartilhados<em id="invCntCompOP">0</em>';
  tabs.appendChild(btn);

  const pane = document.createElement("div");
  pane.className = "iv-pane";
  pane.dataset.pane = "comp";
  pane.id = "compPaneOP";
  pane.hidden = true;
  pane.innerHTML = `
    <div class="comp-topo" id="compTopoOP"></div>
    <ul id="compListaOP" class="lista-sempre-visivel"></ul>
    <button type="button" class="iv-addc" id="compNovoOP" onclick="abrirFolhaCompOP()">${typeof _ivI === "function" ? _ivI("plus") : "+"}Novo documento compartilhado</button>`;
  paneDocs.insertAdjacentElement("afterend", pane);
  _montarFolhaCompOP();
  _renderCompOP();
  return true;
}

/* mostra/esconde a escuta em tempo real conforme a aba aberta */
(function () {
  const esperar = setInterval(() => {
    if (typeof trocarPaneInvOP !== "function") return;
    clearInterval(esperar);
    const original = trocarPaneInvOP;
    trocarPaneInvOP = function (p) {
      const r = original.apply(this, arguments);
      if (p === "comp") _compIniciarOP(); else _compPararOP();
      return r;
    };
  }, 300);
  let n = 0;
  const t = setInterval(() => { if (montarAbaCompartilhadosOP() || ++n > 40) clearInterval(t); }, 500);
})();

/* ---------- escuta do grupo (sempre ligada, para avisar de documentos novos) ---------- */
let compVigiaGidOP = "\u0000";      // grupo vigiado agora ("\u0000" = ainda não verificado)
const _compAvisadosOP = new Set();  // já avisados nesta sessão

function _compPararOP() { /* a escuta continua ligada de propósito */ }

function _compChaveVistosOP(gid) { return "compVistos_" + _compMeuUidOP() + "_" + gid; }
function _compLerVistosOP(gid) {
  try { const v = JSON.parse(localStorage.getItem(_compChaveVistosOP(gid))); return Array.isArray(v) ? v : null; } catch (e) { return null; }
}
function _compGravarVistosOP(gid) {
  try { localStorage.setItem(_compChaveVistosOP(gid), JSON.stringify(compListaOP.map((d) => d.id))); } catch (e) {}
}
function _compPaneAbertoOP() {
  const p = document.getElementById("compPaneOP");
  return !!p && !p.hidden && p.offsetParent !== null;
}
function _compNovosOP() {
  if (!compGrupoOP) return [];
  const vistos = _compLerVistosOP(compGrupoOP.id);
  if (vistos === null) return [];
  const conhecidos = new Set(vistos);
  const meu = _compMeuUidOP();
  return compListaOP.filter((d) => !conhecidos.has(d.id) && d.autorUid !== meu);
}
function _compBadgeOP() {
  const btn = document.querySelector('#ivTabsOP button[data-pane="comp"]');
  if (btn) btn.classList.toggle("tem-novos", _compNovosOP().length > 0 && !_compPaneAbertoOP());
}

function _compIniciarOP() {
  // aba aberta: tudo o que está na lista passa a contar como visto
  if (compGrupoOP) _compGravarVistosOP(compGrupoOP.id);
  _compBadgeOP();
  _renderCompOP();
}

function _compVigiarOP() {
  const logado = !!(window.db && _compMeuUidOP());
  const gid = logado ? _compGrupoIdOP() : "";
  if (gid === compVigiaGidOP) return;
  if (compCancelarOP) { try { compCancelarOP(); } catch (e) {} compCancelarOP = null; }
  compVigiaGidOP = gid;
  compListaOP = []; compGrupoOP = null;
  compEstadoOP = !logado ? "semlogin" : (!gid ? "semgrupo" : "");
  _renderCompOP(); _compBadgeOP();
  if (!gid) return;
  try {
    compCancelarOP = onSnapshot(doc(db, "grupos", gid), (snap) => {
      if (!snap.exists()) { compEstadoOP = "semgrupo"; compListaOP = []; compGrupoOP = null; _renderCompOP(); _compBadgeOP(); return; }
      const g = snap.data();
      compGrupoOP = { id: gid, nome: g.nome || "Grupo", membros: g.membros || [] };
      compListaOP = (Array.isArray(g.docsCompartilhados) ? g.docsCompartilhados : []).slice().sort((a, b) => (b.criadoEm || 0) - (a.criadoEm || 0));
      compEstadoOP = "";
      if (_compLerVistosOP(gid) === null) _compGravarVistosOP(gid);       // primeira vez neste aparelho: nada é "novo"
      else if (_compPaneAbertoOP()) _compGravarVistosOP(gid);
      else {
        const novos = _compNovosOP().filter((d) => !_compAvisadosOP.has(d.id));
        if (novos.length) { novos.forEach((d) => _compAvisadosOP.add(d.id)); _compAvisarOP(novos); }
      }
      _renderCompOP(); _compBadgeOP();
    }, (e) => { compEstadoOP = "erro"; _renderCompOP(); console.error("docs compartilhados:", e); });
  } catch (e) { compEstadoOP = "erro"; _renderCompOP(); }
}
setInterval(_compVigiarOP, 2500);

/* ---------- aviso ---------- */
function _compAvisarOP(novos) {
  const quem = (d) => d.autorPJ || _compNomeAutorOP(d);
  const titulo = novos.length === 1 ? `${quem(novos[0])} anexou um documento` : `${novos.length} documentos novos na mesa`;
  const sub = novos.length === 1 ? novos[0].nome : [...new Set(novos.map(quem))].join(", ");
  document.querySelectorAll(".comp-toast").forEach((t) => t.remove());
  const t = document.createElement("div");
  t.className = "comp-toast";
  t.setAttribute("role", "status");
  t.innerHTML = `<span class="comp-toast-ico"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h4"/></svg></span><span class="comp-toast-txt"><b>${esc(titulo)}</b><small>${esc(sub)}</small></span>`;
  t.onclick = () => {
    t.remove();
    try { trocarAba("inventario"); trocarPaneInvOP("comp"); } catch (e) {}
  };
  document.body.appendChild(t);
  requestAnimationFrame(() => t.classList.add("on"));
  setTimeout(() => { t.classList.remove("on"); setTimeout(() => t.remove(), 300); }, 7000);
}

/* ---------- lista ---------- */
function _compNomeAutorOP(d) {
  const m = compGrupoOP && compGrupoOP.membros.find((x) => x.uid === d.autorUid);
  return (m && m.nickname) || d.autorNome || "Jogador";
}
function _compRotuloAutorOP(d) {
  const nick = _compNomeAutorOP(d);
  return d.autorPJ && d.autorPJ !== nick ? `${d.autorPJ} · ${nick}` : nick;
}

function _renderCompOP() {
  const topo = document.getElementById("compTopoOP");
  const lista = document.getElementById("compListaOP");
  const novo = document.getElementById("compNovoOP");
  if (!topo || !lista) return;
  const cont = document.getElementById("invCntCompOP");
  if (cont) cont.textContent = compListaOP.length;

  const ICO = {
    grupo: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3.2"/><path d="M3 19c0-3.2 2.7-5.5 6-5.5s6 2.3 6 5.5"/><circle cx="17.2" cy="9.2" r="2.3"/><path d="M17 14c2.4.2 4 1.9 4 4.6"/></svg>',
    pasta: '<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3.5 7.5a2 2 0 0 1 2-2h4l2 2.2h7a2 2 0 0 1 2 2V17a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2z"/></svg>',
    aviso: '<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7.5v5M12 16.2v.2"/></svg>',
  };
  const cartao = (ico, titulo, texto) => `<div class="comp-vazio-card"><span class="comp-vazio-ico">${ICO[ico]}</span><b>${titulo}</b><small>${texto}</small></div>`;
  const msgs = {
    semlogin: cartao("aviso", "Entre na sua conta", "Para ver os documentos da mesa, faça login."),
    semgrupo: cartao("aviso", "Ficha sem grupo", "Vá em Amigos → Grupos e escolha esta ficha no grupo da sua mesa."),
    erro: cartao("aviso", "Não consegui carregar", "Verifique a conexão e abra a aba de novo."),
  };
  if (compEstadoOP) {
    topo.innerHTML = msgs[compEstadoOP];
    lista.innerHTML = "";
    if (novo) novo.hidden = true;
    return;
  }
  if (novo) novo.hidden = false;
  topo.innerHTML = compGrupoOP
    ? `<div class="comp-cab"><span class="comp-cab-ico">${ICO.grupo}</span><div><b>${esc(compGrupoOP.nome)}</b><small>Todos do grupo veem estes documentos</small></div></div>` +
      (compListaOP.length ? "" : cartao("pasta", "Nenhum documento ainda", "O que você colocar aqui aparece para toda a mesa. Seus documentos pessoais ficam em Docs."))
    : cartao("pasta", "Carregando…", "");
  const meu = _compMeuUidOP();
  lista.innerHTML = "";
  compListaOP.forEach((d) => {
    const fotos = (d.imagens || []).filter((i) => i && i.url);
    const previa = (d.texto || "").trim();
    const li = document.createElement("li");
    li.className = "veiculo-card doc-card comp-card";
    li.dataset.id = d.id;
    li.onclick = () => verCompartilhadoOP(d.id);
    li.innerHTML = `
      <div class="doc-card-linha">
        ${fotos.length
          ? `<div class="doc-card-thumb doc-card-thumb-img"><img src="${esc(fotos[0].url)}" alt="" loading="lazy" />${fotos.length > 1 ? `<em>${fotos.length}</em>` : ""}</div>`
          : `<div class="doc-card-thumb doc-card-thumb-icone">${ICONE_TIPO_DOC[d.tipo] || "📄"}</div>`}
        <div class="doc-card-info">
          <div class="doc-card-nome">${esc(d.nome)}</div>
          <div class="doc-card-tipo">${esc(d.tipo || "Documento")}${fotos.length > 1 ? ` · ${fotos.length} fotos` : ""}</div>
          <div class="comp-autor">por ${esc(_compRotuloAutorOP(d))}${d.autorUid === meu ? " (você)" : ""}</div>
          ${previa ? `<p class="doc-card-previa">${esc(previa)}</p>` : ""}
        </div>
        ${d.autorUid === meu ? `<button class="item-remover" type="button" onclick="event.stopPropagation(); apagarCompartilhadoOP('${esc(d.id)}')">×</button>` : ""}
      </div>`;
    lista.appendChild(li);
  });
}

function verCompartilhadoOP(id) {
  const d = compListaOP.find((x) => x.id === id);
  if (!d) return;
  const html = `
    <div class="popup-bloco">
      <div class="doc-tipo-tag">${ICONE_TIPO_DOC[d.tipo] || "📄"} ${esc(d.tipo || "Documento")} · por ${esc(_compRotuloAutorOP(d))}</div>
      ${_htmlGaleriaDocOP((d.imagens || []).filter((i) => i && i.url))}
      ${d.texto ? `<div class="popup-descricao doc-texto">${esc(d.texto)}</div>` : ""}
      <button type="button" class="doc-salvar doc-salvar-sec" onclick="copiarCompartilhadoParaMeusOP('${esc(d.id)}')">Guardar uma cópia em Docs</button>
    </div>`;
  abrirPopup(d.nome, html, true, null);
}

function copiarCompartilhadoParaMeusOP(id) {
  const d = compListaOP.find((x) => x.id === id);
  if (!d) return;
  if (documentos.length >= 40) { alertBonito("Limite de 40 documentos por personagem."); return; }
  const c = { nome: d.nome, tipo: d.tipo || "Documento", texto: d.texto || "", criadoEm: Date.now(), copiaDaMesa: true };
  _gravarImagensDocOP(c, (d.imagens || []).map((i) => ({ url: i.url, deleteUrl: "" })));
  documentos.push(c);
  salvarTudo();
  renderDocumentos();
  fecharPopup();
  alertBonito("Cópia guardada em Docs.");
}

async function apagarCompartilhadoOP(id) {
  const d = compListaOP.find((x) => x.id === id);
  if (!d || d.autorUid !== _compMeuUidOP()) return;
  if (!(await confirmBonito("Apagar este documento para toda a mesa?"))) return;
  try {
    await _compAlterarOP(compGrupoOP.id, (lista) => {
      const i = lista.findIndex((x) => x.id === id);
      if (i < 0) return lista;
      if (lista[i].autorUid !== _compMeuUidOP()) throw new Error("nao-autor");
      lista.splice(i, 1);
      return lista;
    });
    if (!d.copiaDeDoc) (d.imagens || []).forEach((f) => _apagarImagemRemotaOP(f.deleteUrl));
  } catch (e) {
    console.error(e);
    alertBonito(_compMensagemErroOP(e));
  }
}

/* ---------- novo compartilhado ---------- */
function _montarFolhaCompOP() {
  if (document.getElementById("ivOv_comp") || typeof _ivCriarFolhaOP !== "function") return;
  const corpo = _ivCriarFolhaOP("comp", "Novo documento compartilhado", "Compartilhar", "enviarCompartilhadoOP()");
  corpo.innerHTML = `
    <div class="mapa-add">
      <p class="comp-aviso">Todos do grupo vão ver este documento. Só você poderá apagá-lo.</p>
      <input id="compNome" placeholder="Título do documento" />
      <select id="compTipo" class="input-personagem">
        ${Object.keys(ICONE_TIPO_DOC).map((t) => `<option value="${esc(t)}">${ICONE_TIPO_DOC[t]} ${esc(t)}</option>`).join("")}
      </select>
      <textarea id="compTexto" placeholder="Conteúdo ou anotações" maxlength="${MAX_TEXTO_COMP_OP}"></textarea>
      <label class="botao-upload mapa-upload-label" id="compRotFotosOP">Anexar fotos (opcional)
        <input type="file" id="compImagem" accept="image/*" multiple style="display:none" onchange="previewCompImagemOP()" />
      </label>
      <div id="compPreviewBox" style="display:none"></div>
      <div class="comp-do-meu"><button type="button" class="eq-link" onclick="abrirEscolherMeuDocOP()">Ou escolher um dos meus documentos</button></div>
    </div>`;
}

function abrirFolhaCompOP() {
  if (compEstadoOP || !compGrupoOP) { alertBonito("Abra a aba com a ficha vinculada a um grupo para compartilhar."); return; }
  abrirFolhaOP("comp");
}

function _renderFotosCompOP() {
  const box = document.getElementById("compPreviewBox");
  if (!box) return;
  if (!compFotosFormOP.length) { box.style.display = "none"; box.innerHTML = ""; return; }
  box.style.display = "block";
  box.innerHTML = `<div class="doc-fotos-grade">${compFotosFormOP.map((f, i) => `
    <div class="doc-foto-mini"><img src="${f.base64 || esc(f.url)}" alt="" />
      <button type="button" aria-label="Remover foto" onclick="removerFotoCompOP(${i})">×</button>
      ${i === 0 && compFotosFormOP.length > 1 ? "<em>capa</em>" : ""}</div>`).join("")}</div>
    <small class="doc-fotos-cont">${compFotosFormOP.length} de ${MAX_FOTOS_DOC_OP} fotos</small>`;
}

function removerFotoCompOP(i) { compFotosFormOP.splice(i, 1); _renderFotosCompOP(); }

async function previewCompImagemOP() {
  const input = document.getElementById("compImagem");
  if (!input || !input.files.length) return;
  const sobra = MAX_FOTOS_DOC_OP - compFotosFormOP.length;
  if (input.files.length > sobra) alertBonito(`Cada documento aceita até ${MAX_FOTOS_DOC_OP} fotos.`);
  const lidas = await _lerArquivosOP([...input.files].slice(0, Math.max(0, sobra)));
  lidas.forEach((b) => compFotosFormOP.push({ base64: b, url: "", deleteUrl: "", donoImagem: true }));
  input.value = "";
  _renderFotosCompOP();
}

/* escolher um documento pessoal para compartilhar (a foto não é enviada de novo) */
function abrirEscolherMeuDocOP() {
  if (!documentos.length) { alertBonito("Você ainda não tem documentos em Docs."); return; }
  const html = `<div class="popup-bloco comp-escolher">${documentos.map((d, i) => {
    const f = imagensDocOP(d);
    return `<button type="button" class="comp-escolha" onclick="compartilharMeuDocOP(${i})">
      ${f.length ? `<img src="${esc(f[0].url)}" alt="" />` : `<span class="comp-ico">${ICONE_TIPO_DOC[d.tipo] || "📄"}</span>`}
      <span><b>${esc(d.nome)}</b><small>${esc(d.tipo || "Documento")}${f.length > 1 ? ` · ${f.length} fotos` : ""}</small></span></button>`;
  }).join("")}</div>`;
  abrirPopup("Escolha um documento", html, true, null);
}

async function compartilharMeuDocOP(i) {
  const d = documentos[i];
  if (!d) return;
  fecharPopup();
  const ok = await _publicarCompOP({ nome: d.nome, tipo: d.tipo || "Documento", texto: d.texto || "", imagens: imagensDocOP(d).map((f) => ({ url: f.url, deleteUrl: "" })), copiaDeDoc: true });
  if (ok) { d.compartilhado = true; salvarTudo(); } // as fotos agora também estão na mesa: não apagar do servidor depois
}

async function enviarCompartilhadoOP() {
  const nome = document.getElementById("compNome").value.trim();
  const tipo = document.getElementById("compTipo").value || "Documento";
  const texto = document.getElementById("compTexto").value.trim().slice(0, MAX_TEXTO_COMP_OP);
  if (!nome) { alertBonito("Coloque o título do documento."); return; }
  if (!texto && !compFotosFormOP.length) { alertBonito("Escreva o conteúdo ou anexe uma foto."); return; }

  const btn = document.querySelector("#ivOv_comp .iv-btn-p");
  const rotulo = btn ? btn.textContent : "";
  const trava = (t) => { if (btn) { btn.disabled = true; btn.textContent = t; } };
  trava("Enviando…");
  const ok = await _enviarFotosOP(compFotosFormOP, (n, total) => trava(`Enviando ${n}/${total}…`));
  if (!ok) {
    if (btn) { btn.disabled = false; btn.textContent = rotulo; }
    alertBonito(_mensagemErroUpload("Nada foi compartilhado. As fotos que já subiram não precisam ser enviadas de novo."));
    return;
  }
  const publicado = await _publicarCompOP({ nome, tipo, texto, imagens: compFotosFormOP.map((f) => ({ url: f.url, deleteUrl: f.deleteUrl || "" })) });
  if (btn) { btn.disabled = false; btn.textContent = rotulo; }
  if (publicado) {
    document.getElementById("compNome").value = "";
    document.getElementById("compTexto").value = "";
    document.getElementById("compTipo").value = "Documento";
    compFotosFormOP = [];
    _renderFotosCompOP();
    fecharFolhaOP("comp");
  }
}

async function _publicarCompOP(dados) {
  if (!compGrupoOP) { alertBonito("Abra a aba Compartilhados com a ficha vinculada a um grupo."); return false; }
  const meuUid = _compMeuUidOP();
  const eu = compGrupoOP.membros.find((m) => m.uid === meuUid);
  const entrada = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
    autorUid: meuUid,
    autorNome: (eu && eu.nickname) || "Jogador",
    autorPJ: ((document.getElementById("nome") || {}).value || "").trim().slice(0, 60),
    nome: dados.nome,
    tipo: dados.tipo,
    texto: dados.texto,
    imagens: dados.imagens || [],
    criadoEm: Date.now(),
  };
  if (dados.copiaDeDoc) entrada.copiaDeDoc = true;
  try {
    await _compAlterarOP(compGrupoOP.id, (lista) => {
      if (lista.length >= MAX_COMPARTILHADOS_OP) throw new Error("limite");
      lista.push(entrada);
      return lista;
    });
    return true;
  } catch (e) {
    console.error(e);
    alertBonito(/limite/.test(e.message) ? `A mesa já tem ${MAX_COMPARTILHADOS_OP} documentos compartilhados. Apague algum para adicionar outro.` : _compMensagemErroOP(e));
    return false;
  }
}