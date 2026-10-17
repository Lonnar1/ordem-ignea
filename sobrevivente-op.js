/* =====================================================================
   CLASSE SOBREVIVENTE (Sobrevivendo ao Horror v1.3-1, p. 30-32)
   - evolui por estágios (1 a 5), NEX 0%, limite de PE sempre 1
   - trilhas Durão, Esperto e Esotérico (1º poder no estágio 2, 2º no estágio 4)
   - Treinamento Especial: vira Combatente, Especialista ou Ocultista (NEX 5%)
   O estágio é guardado como "nex = estágio × 5" para reaproveitar o motor.
   ===================================================================== */
(function () {
  if (typeof CATALOGO_OP_PADRAO === "undefined") return;

  CATALOGO_OP_PADRAO.habilidadesClasse = CATALOGO_OP_PADRAO.habilidadesClasse || {};
  CATALOGO_OP_PADRAO.habilidadesClasse.sobrevivente = [
    { id: "sob.empenho", nex: 5, nome: "Empenho", ativacao: "livre", custo: "1 PE", fonte: "sah", pagina: "31", habilidadeDeClasse: true,
      resumo: "Você pode não ter treinamento especial, mas compensa com dedicação e esforço. Quando faz um teste de perícia, você pode gastar 1 PE para receber +2 nesse teste.", efeitos: [] },
    { id: "sob.cicatrizado", nex: 25, nome: "Cicatrizado", ativacao: "reacao", fonte: "sah", pagina: "31", habilidadeDeClasse: true,
      resumo: "Você já viu — e sobreviveu — a sua cota de horrores. Escolha um tipo de perigo paranormal que já enfrentou, de um elemento específico (Sangue, Morte…). Você tem um trauma e sofre −1 dado em testes de resistência contra ele. Uma vez por sessão, como reação, pode sacrificar 1 PV permanentemente para ignorar um dano mental ou gasto de PE, ou sacrificar permanentemente 1 PE para reduzir um dano físico à metade.",
      limite: "1 vez por sessão", efeitos: [{ tipo: "manual", texto: "Escolha o elemento do trauma e anote o −1 dado nas resistências contra ele" }] },
  ];

  CATALOGO_OP_PADRAO.trilhas.push(
    {
      id: "sob.durao", classe: "sobrevivente", nome: "Durão", fonte: "sah", pagina: "31",
      resumo: "Indivíduo resistente, que consegue defender a si mesmo ou aos outros em situações de perigo. Pode ser um atleta, segurança, trabalhador da construção civil etc.",
      habilidades: [
        { id: "sob.durao.10", nex: 10, nome: "Durão", ativacao: "passiva", resumo: "Você recebe +4 PV.", efeitos: [{ tipo: "recurso", alvo: "pv", valor: 4 }] },
        { id: "sob.durao.15", nex: 15, nome: "Durão (3º estágio)", ativacao: "passiva", resumo: "Ao subir para o 3º estágio, você recebe +2 PV.", efeitos: [{ tipo: "recurso", alvo: "pv", valor: 2 }] },
        { id: "sob.durao.20", nex: 20, nome: "Pancada Forte", ativacao: "livre", custo: "1 PE",
          resumo: "Quando faz um ataque, você pode gastar 1 PE para receber +1 dado no teste de ataque. Se você se tornar um combatente (Treinamento Especial), perde esta habilidade, mas reduz o custo de ativação de Ataque Especial em −1 PE.",
          efeitos: [],
          conversao: { classe: "combatente", nome: "Ataque Especial mais barato", ativacao: "passiva", custo: "",
            resumo: "Por ter sido Durão, o custo de ativação do Ataque Especial é reduzido em −1 PE (a Pancada Forte foi perdida ao virar combatente).",
            efeitos: [{ tipo: "manual", texto: "Ataque Especial custa −1 PE" }] } },
      ],
    },
    {
      id: "sob.esperto", classe: "sobrevivente", nome: "Esperto", fonte: "sah", pagina: "32",
      resumo: "Estudante, técnico, engenheiro ou outra pessoa equipada com conhecimento, inteligência e persuasão.",
      habilidades: [
        { id: "sob.esperto.10", nex: 10, nome: "Esperto", ativacao: "passiva", resumo: "Você se torna treinado em uma perícia adicional à sua escolha.",
          efeitos: [{ tipo: "manual", texto: "Marque o treino da perícia escolhida na lista de perícias" }] },
        { id: "sob.esperto.20", nex: 20, nome: "Entendido", ativacao: "livre", custo: "1 PE",
          resumo: "Escolha duas perícias nas quais você é treinado (exceto Luta e Pontaria). Quando faz um teste de uma dessas perícias, você pode gastar 1 PE para somar +1d4 no resultado. Se você se tornar um especialista (Treinamento Especial), perde esta habilidade, mas reduz o custo de ativação de Perito em −1 PE.",
          efeitos: [],
          conversao: { classe: "especialista", nome: "Perito mais barato", ativacao: "passiva", custo: "",
            resumo: "Por ter sido Esperto, o custo de ativação do Perito é reduzido em −1 PE (o Entendido foi perdido ao virar especialista).",
            efeitos: [{ tipo: "manual", texto: "Perito custa −1 PE" }] } },
      ],
    },
    {
      id: "sob.esoterico", classe: "sobrevivente", nome: "Esotérico", fonte: "sah", pagina: "32",
      resumo: "Pessoa ligada a aspectos espirituais do mundo, como religiões, astrologia e cartomancia, ou que apenas possui um sexto sentido em relação ao paranormal e ao Outro Lado.",
      habilidades: [
        { id: "sob.esoterico.10", nex: 10, nome: "Esotérico", ativacao: "padrao", custo: "1 PE",
          resumo: "Você pode gastar uma ação padrão e 1 PE para sentir energias paranormais em alcance curto. Isso pode dar alguma pista em uma investigação ou alertá-lo de algum perigo iminente. O mestre dirá quais informações você consegue obter, se houver.", efeitos: [] },
        { id: "sob.esoterico.20", nex: 20, nome: "Iniciado", ativacao: "passiva",
          resumo: "Você aprende e pode conjurar um ritual de 1º círculo à sua escolha. Se você se tornar um ocultista (Treinamento Especial), soma este ritual aos três rituais que aprende com Escolhido pelo Outro Lado.",
          efeitos: [{ tipo: "manual", texto: "Escolha o ritual de 1º círculo (Grimório de rituais)" }] },
      ],
    },
  );
})();

/* ---------------- herança (depois do Treinamento Especial) ---------------- */
let herancaOP = null; // { trilha, estagio, de: "sobrevivente" }

function carregarHerancaOP(p) {
  herancaOP = p.herancaOP && p.herancaOP.estagio ? p.herancaOP : null;
}

function salvarHerancaOP(p) {
  p.herancaOP = herancaOP ? { ...herancaOP } : null;
}

/* habilidades que o ex-sobrevivente mantém (com a troca de Pancada Forte/Entendido quando cabe) */
function habilidadesHerancaOP(classeAtual) {
  if (!herancaOP || classeAtual === "sobrevivente") return [];
  const nexMax = herancaOP.estagio * 5;
  const lista = (CATALOGO_OP_PADRAO.habilidadesClasse.sobrevivente || []).filter((h) => Number(h.nex) <= nexMax).map((h) => ({ id: h.id }));
  const trilha = CATALOGO_OP_PADRAO.trilhas.find((t) => t.id === herancaOP.trilha);
  (trilha?.habilidades || [])
    .filter((h) => Number(h.nex) <= nexMax)
    .forEach((h) => lista.push({ id: h.conversao && h.conversao.classe === classeAtual ? h.id + ".conv" : h.id }));
  return lista;
}

/* ---------------- Treinamento Especial ---------------- */
const TREINO_ESPECIAL_OP = {
  combatente: {
    nome: "Combatente", delta: { pv: 8, pe: 0, san: 0 },
    pericias: { pares: [["Fortitude", "Reflexos"], ["Luta", "Pontaria"]], fixas: [], livres: 0 },
    texto: "+8 PV · perícias: Fortitude ou Reflexos, e Luta ou Pontaria · proficiências: armas táticas e proteções leves · habilidade: Ataque Especial",
  },
  especialista: {
    nome: "Especialista", delta: { pv: 4, pe: 1, san: 4 },
    pericias: { pares: [], fixas: [], livres: 6 },
    texto: "+4 PV, +1 PE, +4 SAN · perícias: 6 à sua escolha · proficiências: proteções leves · habilidades: Eclético e Perito",
  },
  ocultista: {
    nome: "Ocultista", delta: { pv: 0, pe: 2, san: 8 },
    pericias: { pares: [], fixas: ["Ocultismo", "Vontade"], livres: 2 },
    texto: "+2 PE, +8 SAN · perícias: Ocultismo e Vontade, mais 2 à sua escolha · proficiências: nenhuma · habilidade: Escolhido pelo Outro Lado",
  },
};

function atualizarBotaoTreinoEspecialOP() {
  let linha = document.getElementById("linhaTreinoEspecialOP");
  const ref = document.querySelector(".personagem-campos > .op-linha-trilha") || document.querySelector(".personagem-campos > .op-identidade-linha");
  if (!linha && ref) {
    linha = document.createElement("div");
    linha.id = "linhaTreinoEspecialOP";
    linha.className = "op-linha-treino-especial";
    linha.innerHTML = `<button type="button" onclick="abrirTreinoEspecialOP()">Treinamento Especial</button>
      <small>Quando a história levar o sobrevivente à Ordem, ele vira Combatente, Especialista ou Ocultista.</small>`;
    ref.insertAdjacentElement("afterend", linha);
  }
  if (linha) linha.style.display = ehSobreviventeOP() ? "" : "none";
}

function abrirTreinoEspecialOP() {
  const cartoes = Object.entries(TREINO_ESPECIAL_OP)
    .map(([id, c]) => `
      <div class="cat-item" style="cursor:default">
        <div class="cat-topo"><strong>${c.nome}</strong></div>
        <p class="cat-resumo">${esc(c.texto)}</p>
        <button type="button" class="cat-add" onclick="escolherClasseTreinoEspecialOP('${id}')">Virar ${c.nome}</button>
      </div>`)
    .join("");

  abrirPopup(
    "Treinamento Especial",
    `<div class="popup-bloco">
      <p class="bp-dica">Não é uma decisão do jogador: depende da história (por exemplo, ser acolhido pela Ordo Realitas). Ao confirmar, no lugar do próximo estágio o personagem passa a ser de <b>NEX 5%</b> da classe escolhida e <b>mantém todas as habilidades já recebidas</b>.</p>
      <div class="cat-lista">${cartoes}</div>
      <small class="evo-dica">Sobrevivendo ao Horror, p. 32.</small>
    </div>`,
    true,
  );
}

async function escolherClasseTreinoEspecialOP(id) {
  const c = TREINO_ESPECIAL_OP[id];
  if (!c) return;
  const ok = await confirmBonito(`Converter este sobrevivente em ${c.nome} (NEX 5%)? A mudança de classe não é desfeita automaticamente.`);
  if (!ok) return;

  const escolhidas = await escolherPericiasTreinoEspecialOP(c);
  if (!escolhidas) return;
  aplicarTreinoEspecialOP(id, escolhidas);
}

function escolherPericiasTreinoEspecialOP(c) {
  return new Promise((resolve) => {
    const e = c.pericias;
    window._resolverTreinoEspecialOP = (confirmar) => {
      if (!confirmar) { fecharPopup(); resolve(null); return; }
      const pares = e.pares.map((_, i) => document.getElementById("teParOP" + i)?.value).filter(Boolean);
      const livres = [...document.querySelectorAll("#teLivresOP input:checked")].map((i) => i.value);
      if (livres.length !== e.livres) {
        alertBonito(`Escolha exatamente ${e.livres} perícia${e.livres === 1 ? "" : "s"} à sua escolha.`);
        return;
      }
      fecharPopup();
      resolve([...e.fixas, ...pares, ...livres]);
    };

    const bloqueadas = new Set([...e.fixas, ...e.pares.flat()]);
    const opcoes = pericias.filter((p) => !bloqueadas.has(p.nome));
    abrirPopup(
      `Perícias de ${c.nome}`,
      `<div class="popup-bloco">
        ${e.fixas.length ? `<p class="bp-dica">Treinadas automaticamente: <b>${e.fixas.map(esc).join(", ")}</b>.</p>` : ""}
        ${e.pares.map((par, i) => `<label class="op-label" for="teParOP${i}">${par.join(" ou ")}</label>
          <select id="teParOP${i}">${par.map((n) => `<option value="${esc(n)}">${esc(n)}</option>`).join("")}</select>`).join("")}
        ${e.livres ? `<p class="bp-dica">Escolha ${e.livres} perícia${e.livres === 1 ? "" : "s"} à sua escolha${(profs && true) ? " (as já treinadas ficam marcadas)" : ""}.</p>
          <div id="teLivresOP" class="origem-pericias">
            ${opcoes.map((p) => `<label><input type="checkbox" value="${esc(p.nome)}" ${(profs[p.nome] || 0) >= 1 ? "disabled checked" : ""} /> <span>${esc(p.nome)}</span></label>`).join("")}
          </div>` : ""}
        <button type="button" class="evo-ok" onclick="_resolverTreinoEspecialOP(true)">Confirmar</button>
        <button type="button" class="evo-desfazer" onclick="_resolverTreinoEspecialOP(false)">Cancelar</button>
      </div>`,
      true,
    );
  });
}

function aplicarTreinoEspecialOP(id, periciasEscolhidas) {
  const c = TREINO_ESPECIAL_OP[id];
  const attrs = typeof _atributosAtuaisOP === "function" ? _atributosAtuaisOP() : {};
  const estagio = Math.max(1, Math.min(5, nivelOP));
  const nexAntes = nexClasseOP();

  // recursos de antes (com bônus e efeitos de hoje)
  const pre = autoRecursosOP ? calcularRecursosOP("sobrevivente", nexAntes, attrs) : null;

  // perícias
  const novasTreinadas = [];
  periciasEscolhidas.forEach((nome) => {
    if ((profs[nome] || 0) < 1) { profs[nome] = 1; novasTreinadas.push(nome); }
  });

  // guarda o que já tinha e troca de classe
  herancaOP = { trilha: trilhaOP || "", estagio, de: "sobrevivente" };
  const trilhaAntiga = buscarTrilhaOP(trilhaOP);
  trilhaOP = "";

  document.getElementById("classeOP").value = id;
  nivelOP = 1;
  const nexSel = document.getElementById("nex");
  if (nexSel) { nexSel.disabled = false; if (!modoSeparadoOP()) nexSel.value = "5"; }
  nexAnteriorOP = nexClasseOP();

  if (typeof sincronizarTrilhaOP === "function") sincronizarTrilhaOP();

  // ajuste para que PV/PE/SAN fiquem como a regra manda: valores de antes + benefícios do Treinamento Especial
  let ajuste = null;
  if (pre) {
    const pos = calcularRecursosOP(id, nexClasseOP(), attrs, { pv: 0, pe: 0, san: 0 });
    bonusRecursosOP = {
      pv: pre.pv + c.delta.pv - pos.pv,
      pe: pre.pe + c.delta.pe - pos.pe,
      san: pre.san + c.delta.san - pos.san,
    };
    ajuste = { ...bonusRecursosOP };
  }

  atualizarPainelAutoOP();
  if (typeof atualizarSeletorTrilhaOP === "function") atualizarSeletorTrilhaOP();
  aplicarRecursosAutomaticosOP();
  atualizarResumoAutoOP();
  if (typeof atualizarContadorPoderesClasseOP === "function") atualizarContadorPoderesClasseOP();
  if (typeof renderPoderes === "function") renderPoderes();
  if (typeof atualizarAbaRituaisOP === "function") atualizarAbaRituaisOP();
  if (typeof atualizarTudo === "function") atualizarTudo();
  salvarTudo();

  // resumo
  const trocou = trilhaAntiga?.habilidades?.find((h) => h.conversao && h.conversao.classe === id && Number(h.nex) <= estagio * 5);
  const manuais = {
    combatente: "Ataque Especial (veja a classe) · proficiências: armas táticas e proteções leves",
    especialista: "Eclético e Perito · proficiências: proteções leves",
    ocultista: "Escolhido pelo Outro Lado: 3 rituais de 1º círculo (Grimório de rituais)",
  }[id];
  const html = `
    <div class="popup-bloco evo-popup">
      <div class="evo-titulo">Sobrevivente → ${c.nome} <small>(NEX 5%)</small></div>
      <div class="evo-bloco">
        <div class="evo-sub">Recebido</div>
        <div class="evo-marco">${esc(c.texto)}</div>
        ${novasTreinadas.length ? `<div class="evo-marco">🎓 Perícias treinadas agora: <b>${novasTreinadas.map(esc).join(", ")}</b></div>` : ""}
        ${ajuste
          ? `<small class="evo-dica">PV, PE e SAN foram ajustados para somar os benefícios ao que o sobrevivente já tinha (ajuste de conversão: PV ${ajuste.pv >= 0 ? "+" : ""}${ajuste.pv}, PE ${ajuste.pe >= 0 ? "+" : ""}${ajuste.pe}, SAN ${ajuste.san >= 0 ? "+" : ""}${ajuste.san} em "Bônus extras"). Dali em diante sobem como ${c.nome}.</small>`
          : `<small class="evo-dica">Cálculo automático desligado: some os benefícios acima manualmente.</small>`}
      </div>
      ${trocou ? `<div class="evo-bloco"><div class="evo-sub">Troca da trilha ${esc(trilhaAntiga.nome)}</div><div class="evo-marco">🔁 ${esc(trocou.nome)} saiu e entrou <b>${esc(trocou.conversao.nome)}</b>: ${esc(trocou.conversao.resumo)}</div></div>` : ""}
      <div class="evo-bloco">
        <div class="evo-sub">Você mantém</div>
        <div class="evo-marco">Todas as habilidades que já tinha recebido como sobrevivente (Empenho${estagio >= 5 ? ", Cicatrizado" : ""}${trilhaAntiga ? ` e a trilha ${esc(trilhaAntiga.nome)}` : ""}).</div>
      </div>
      <div class="evo-bloco">
        <div class="evo-sub">Anote na ficha</div>
        <div class="evo-marco">${esc(manuais)}</div>
        <small class="evo-dica">Agora você segue a tabela de ${c.nome}: a trilha da nova classe é escolhida no NEX 10%.</small>
      </div>
      <button type="button" class="evo-ok" onclick="fecharPopup()">OK, continuar</button>
    </div>`;
  abrirPopup("Treinamento Especial aplicado", html, true);
}

/* mostra o botão só para Sobrevivente */
(function ligarTreinoEspecialOP() {
  if (typeof atualizarCamposModoOP === "function" && !atualizarCamposModoOP._treOP) {
    const original = atualizarCamposModoOP;
    atualizarCamposModoOP = function () {
      original.apply(this, arguments);
      atualizarBotaoTreinoEspecialOP();
    };
    atualizarCamposModoOP._treOP = true;
  }
  const iniciar = () => { atualizarBotaoTreinoEspecialOP(); setTimeout(atualizarBotaoTreinoEspecialOP, 500); setTimeout(atualizarBotaoTreinoEspecialOP, 1500); };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", iniciar);
  else iniciar();
})();
