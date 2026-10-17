/* =====================================================================
   ORIGENS (Livro de Regras v1.3, p. 16-21 · Sobrevivendo ao Horror v1.3-1, p. 7-13)
   Ao escolher uma origem o personagem recebe duas perícias treinadas e um
   poder da origem. Escolher aqui treina as perícias, coloca o poder na
   ficha (categoria Origem) e aplica o que for número (PV, PE, SAN).
   Trocar de origem desfaz o que a anterior aplicou.
   ===================================================================== */
const ORIGENS_OP = [];

(function () {
  const L = "livro";
  const S = "sah";
  /* O(id, nome, fonte, página, perícias[], escolhas, poder, ativação, custo, resumo, extra)
     escolhas = quantas perícias o jogador/mestre escolhe além das fixas */
  const O = (id, nome, fonte, pagina, pericias, escolhas, poder, ativacao, custo, resumo, efeitos = [], extra = {}) => {
    ORIGENS_OP.push({ id, nome, fonte, pagina, pericias, escolhas, poder: { nome: poder, ativacao, custo, resumo }, ...extra });
    if (typeof CATALOGO_OP_PADRAO !== "undefined") {
      CATALOGO_OP_PADRAO.poderes.push({
        id: "ori." + id, classe: "origem", tipo: "origem", nome: poder, fonte, pagina: String(pagina),
        ativacao, custo, resumo, efeitos,
      });
    }
  };
  const man = (texto) => ({ tipo: "manual", texto });
  const rec = (alvo, extra) => ({ tipo: "recurso", alvo, ...extra });

  /* ---------------- Livro de Regras ---------------- */
  O("academico", "Acadêmico", L, 16, ["Ciências", "Investigação"], 0, "Saber é Poder", "livre", "2 PE",
    "Quando faz um teste usando Intelecto, você pode gastar 2 PE para receber +5 nesse teste.");
  O("agentesaude", "Agente de Saúde", L, 16, ["Intuição", "Medicina"], 0, "Técnica Medicinal", "passiva", "",
    "Sempre que cura um personagem, você adiciona seu Intelecto no total de PV curados.");
  O("amnesico", "Amnésico", L, 16, [], 2, "Vislumbres do Passado", "especial", "",
    "Perícias treinadas: duas à escolha do mestre. Uma vez por sessão, você pode fazer um teste de Intelecto (DT 10) para reconhecer pessoas ou lugares familiares, que tenha encontrado antes de perder a memória. Se passar, recebe 1d4 PE temporários e, a critério do mestre, uma informação útil.",
    [], { limite: "1 vez por sessão" });
  O("artista", "Artista", L, 17, ["Artes", "Enganação"], 0, "Magnum Opus", "especial", "",
    "Você é famoso por uma de suas obras. Uma vez por missão, pode determinar que uma pessoa envolvida em uma cena de interação o reconheça. Você recebe +5 em testes de Presença e de perícias baseadas em Presença contra aquela pessoa. A critério do mestre, pode receber esse bônus em outras situações nas quais seria reconhecido.");
  O("atleta", "Atleta", L, 17, ["Acrobacia", "Atletismo"], 0, "110%", "livre", "2 PE",
    "Quando faz um teste de perícia usando Força ou Agilidade (exceto Luta e Pontaria) você pode gastar 2 PE para receber +5 nesse teste.");
  O("chef", "Chef", L, 17, ["Fortitude", "Profissão"], 0, "Ingrediente Secreto", "especial", "",
    "Perícia: Profissão (cozinheiro). Em cenas de interlúdio, você pode fazer a ação alimentar-se para cozinhar um prato especial. Você, e todos os membros do grupo que fizeram a ação alimentar-se, recebem o benefício de dois pratos (caso o mesmo benefício seja escolhido duas vezes, seus efeitos se acumulam).");
  O("criminoso", "Criminoso", L, 17, ["Crime", "Furtividade"], 0, "O Crime Compensa", "especial", "",
    "No final de uma missão, escolha um item encontrado na missão. Em sua próxima missão, você pode incluir esse item em seu inventário sem que ele conte em seu limite de itens por patente.");
  O("cultista", "Cultista Arrependido", L, 18, ["Ocultismo", "Religião"], 0, "Traços do Outro Lado", "passiva", "",
    "Você possui um poder paranormal à sua escolha. Porém, começa o jogo com metade da Sanidade normal para sua classe.",
    [man("Escolha o poder paranormal em \"Poderes paranormais\" e reduza a Sanidade à metade na ficha")], { abreParanormais: true });
  O("desgarrado", "Desgarrado", L, 18, ["Fortitude", "Sobrevivência"], 0, "Calejado", "passiva", "",
    "Você recebe +1 PV para cada 5% de NEX.", [rec("pv", { porNivel: 1 })]);
  O("engenheiro", "Engenheiro", L, 18, ["Profissão", "Tecnologia"], 0, "Ferramenta Favorita", "passiva", "",
    "Um item à sua escolha (exceto armas) conta como uma categoria abaixo (por exemplo, um item de categoria II conta como categoria I para você).");
  O("executivo", "Executivo", L, 18, ["Diplomacia", "Profissão"], 0, "Processo Otimizado", "livre", "2 PE",
    "Sempre que faz um teste de perícia durante um teste estendido, ou uma ação para revisar documentos (físicos ou digitais), pode pagar 2 PE para receber +5 nesse teste.");
  O("investigador", "Investigador", L, 19, ["Investigação", "Percepção"], 0, "Faro para Pistas", "livre", "1 PE",
    "Uma vez por cena, quando fizer um teste para procurar pistas, você pode gastar 1 PE para receber +5 nesse teste.", [], { limite: "1 vez por cena" });
  O("lutador", "Lutador", L, 19, ["Luta", "Reflexos"], 0, "Mão Pesada", "passiva", "",
    "Você recebe +2 em rolagens de dano com ataques corpo a corpo.");
  O("magnata", "Magnata", L, 20, ["Diplomacia", "Pilotagem"], 0, "Patrocinador da Ordem", "passiva", "",
    "Seu limite de crédito é sempre considerado um acima do atual.");
  O("mercenario", "Mercenário", L, 20, ["Iniciativa", "Intimidação"], 0, "Posição de Combate", "livre", "2 PE",
    "No primeiro turno de cada cena de ação, você pode gastar 2 PE para receber uma ação de movimento adicional.");
  O("militar", "Militar", L, 20, ["Pontaria", "Tática"], 0, "Para Bellum", "passiva", "",
    "Você recebe +2 em rolagens de dano com armas de fogo.");
  O("operario", "Operário", L, 20, ["Fortitude", "Profissão"], 0, "Ferramenta de Trabalho", "passiva", "",
    "Escolha uma arma simples ou tática que, a critério do mestre, poderia ser usada como ferramenta em sua profissão (como uma marreta para um pedreiro). Você sabe usar a arma escolhida e recebe +1 em testes de ataque, rolagens de dano e margem de ameaça com ela.");
  O("policial", "Policial", L, 20, ["Percepção", "Pontaria"], 0, "Patrulha", "passiva", "",
    "Você recebe +2 em Defesa.", [man("+2 em Defesa: some no campo de Defesa da ficha")]);
  O("religioso", "Religioso", L, 20, ["Religião", "Vontade"], 0, "Acalentar", "passiva", "",
    "Você recebe +5 em testes de Religião para acalmar. Além disso, quando acalma uma pessoa, ela recebe um número de pontos de Sanidade igual a 1d6 + a sua Presença.");
  O("servidor", "Servidor Público", L, 20, ["Intuição", "Vontade"], 0, "Espírito Cívico", "livre", "1 PE",
    "Sempre que faz um teste para ajudar, você pode gastar 1 PE para aumentar o bônus concedido em +2.");
  O("teorico", "Teórico da Conspiração", L, 21, ["Investigação", "Ocultismo"], 0, "Eu Já Sabia", "passiva", "",
    "Você não se abala tanto com entidades ou anomalias. Afinal, sempre soube que isso tudo existia. Você recebe resistência a dano mental igual ao seu Intelecto.");
  O("ti", "T.I.", L, 21, ["Investigação", "Tecnologia"], 0, "Motor de Busca", "livre", "2 PE",
    "A critério do mestre, sempre que tiver acesso a internet, você pode gastar 2 PE para substituir um teste de perícia qualquer por um teste de Tecnologia.");
  O("trabalhadorrural", "Trabalhador Rural", L, 21, ["Adestramento", "Sobrevivência"], 0, "Desbravador", "livre", "2 PE",
    "Quando faz um teste de Adestramento ou Sobrevivência, você pode gastar 2 PE para receber +5 nesse teste. Além disso, você não sofre penalidade em deslocamento por terreno difícil.");
  O("trambiqueiro", "Trambiqueiro", L, 21, ["Crime", "Enganação"], 0, "Impostor", "livre", "2 PE",
    "Uma vez por cena, você pode gastar 2 PE para substituir um teste de perícia qualquer por um teste de Enganação.", [], { limite: "1 vez por cena" });
  O("universitario", "Universitário", L, 21, ["Atualidades", "Investigação"], 0, "Dedicação", "passiva", "",
    "Você recebe +1 PE, e mais 1 PE adicional a cada NEX ímpar (15%, 25%…). Além disso, seu limite de PE por turno aumenta em 1 (em NEX 5% seu limite é 2, em NEX 10% é 3 e assim por diante; isso não afeta a DT de seus efeitos).",
    [rec("pe", { valor: 1, impares: 1 }), man("+1 no limite de PE por turno")]);
  O("vitima", "Vítima", L, 21, ["Reflexos", "Vontade"], 0, "Cicatrizes Psicológicas", "passiva", "",
    "Você recebe +1 de Sanidade para cada 5% de NEX.", [rec("san", { porNivel: 1 })]);

  /* ---------------- Sobrevivendo ao Horror ---------------- */
  O("amigoanimais", "Amigo dos Animais", S, 7, ["Adestramento", "Percepção"], 0, "Companheiro Animal", "passiva", "",
    "Você entende as intenções e sentimentos de animais e pode usar Adestramento para mudar a atitude deles. Possui um melhor amigo animal: conta como um aliado que fornece +2 em uma perícia à sua escolha (aprovada pelo mestre). No NEX 35% ele também passa a fornecer o bônus de um aliado de um tipo à sua escolha e, no NEX 70%, a habilidade desse tipo de aliado. Se ele morrer, você perde 10 pontos de Sanidade permanentemente e fica perturbado até o fim da cena.");
  O("astronauta", "Astronauta", S, 8, ["Ciências", "Fortitude"], 0, "Acostumado ao Extremo", "livre", "1 PE",
    "Quando sofre dano de fogo, de frio ou mental, você pode gastar 1 PE para reduzir esse dano em 5. A cada vez que usa esta habilidade novamente na mesma cena, seu custo aumenta em +1 PE.");
  O("chefoutrolado", "Chef do Outro Lado", S, 8, ["Ocultismo", "Profissão"], 0, "Fome do Outro Lado", "interludio", "1 ingrediente",
    "Perícia: Profissão (cozinheiro). Você usa partes de criaturas do Outro Lado como ingredientes (itens de Categoria I, 0,5 espaço; cada criatura Pequena ou maior derrotada fornece 1). Com uma ação de interlúdio e 1 ingrediente, faz um teste de Profissão (cozinheiro) DT 15+: se passar, o prato dá RD 10 contra o tipo de dano do elemento da criatura; se falhar, causa vulnerabilidade. Dura até o fim da próxima cena. Cada refeição custa 1 ponto permanente de Sanidade e aumenta o NEX em 3% por parte de criatura diferente (regra de Nível de Experiência e Exposição, SaH p. 98).",
    [man("Perde 1 SAN permanente a cada refeição; confira o aumento de NEX na regra opcional")]);
  O("colegial", "Colegial", S, 9, ["Atualidades", "Tecnologia"], 0, "Poder da Amizade", "passiva", "",
    "Escolha um personagem para ser seu melhor amigo. Se estiver em alcance médio dele e vocês puderem, pelo menos, trocar olhares, você recebe +2 em todos os testes de perícia. Se ele morrer, seu total de PE é reduzido em −1 para cada 5% de NEX até o fim da missão. Se perder seu melhor amigo, pode escolher outro no início da próxima missão.");
  O("cosplayer", "Cosplayer", S, 9, ["Artes", "Vontade"], 0, "Não É Fantasia, É Cosplay!", "passiva", "",
    "Você pode fazer testes de disfarce usando Artes em vez de Enganação. Além disso, ao fazer um teste de perícia, se estiver usando um cosplay que tem relação com ele, você recebe +2.");
  O("diplomata", "Diplomata", S, 9, ["Atualidades", "Diplomacia"], 0, "Conexões", "especial", "2 PE",
    "Você recebe +2 em Diplomacia. Além disso, se puder contatar um NPC capaz de lhe auxiliar, você pode gastar 10 minutos e 2 PE para substituir um teste de uma perícia relacionada ao conhecimento desse NPC, feito até o fim da cena, por um teste de Diplomacia.",
    [man("+2 em Diplomacia: use o bônus personalizado da perícia (lápis)")]);
  O("explorador", "Explorador", S, 9, ["Fortitude", "Sobrevivência"], 0, "Manual do Sobrevivente", "livre", "2 PE",
    "Ao fazer um teste para resistir a armadilhas, clima, doenças, fome, sede, fumaça, sono, sufocamento ou veneno, incluindo de fontes paranormais, você pode gastar 2 PE para receber +5 nesse teste. Além disso, em cenas de interlúdio, considera condições de sono precárias como normais.");
  O("experimento", "Experimento", S, 9, ["Atletismo", "Fortitude"], 0, "Mutação", "passiva", "",
    "Você recebe resistência a dano 2 e +2 em uma perícia à sua escolha que seja originalmente baseada em Força, Agilidade ou Vigor. Entretanto, sofre −1 dado em Diplomacia.",
    [man("RD 2 e +2 em uma perícia à escolha: use o bônus personalizado (lápis). Diplomacia: −1 dado")]);
  O("fanatico", "Fanático por Criaturas", S, 10, ["Investigação", "Ocultismo"], 0, "Conhecimento Oculto", "passiva", "",
    "Você pode fazer testes de Ocultismo para identificar criatura a partir de informações como uma imagem, rastros, indícios de sua presença ou outras pistas que o mestre considere suficientes. Se passar, descobre as características da criatura, mas não sua identidade ou tipo específico. Além disso, quando passa nesse teste, recebe +2 em todos os testes contra a criatura até o fim da missão.");
  O("fotografo", "Fotógrafo", S, 10, ["Artes", "Percepção"], 0, "Através da Lente", "livre", "2 PE",
    "Quando faz um teste de Investigação ou de Percepção para adquirir pistas olhando através de uma câmera ou analisando fotos, você pode gastar 2 PE para receber +5 nesse teste (quem se move olhando através de uma lente anda à metade do deslocamento).");
  O("inventor", "Inventor Paranormal", S, 10, ["Profissão", "Vontade"], 0, "Invenção Paranormal", "padrao", "",
    "Perícia: Profissão (engenheiro). Escolha um ritual de 1º círculo. Você possui um invento paranormal, item de categoria 0 que ocupa 1 espaço e executa o efeito do ritual. Para ativar, gasta uma ação padrão (ou a ação do ritual, a maior) e faz um teste de Profissão (engenheiro) com DT 15 +5 para cada ativação na mesma missão. Se passar, faz o equivalente a conjurar o ritual em sua forma básica sem pagar PE; se falhar, enguiça. Uma ação de interlúdio conserta e redefine a DT para 15. Pode trocar o ritual no início de cada missão.");
  O("jovemmistico", "Jovem Místico", S, 11, ["Ocultismo", "Religião"], 0, "A Culpa é das Estrelas", "livre", "1 PE",
    "Escolha um número da sorte entre 1 e 6. No início de cada cena, você pode gastar 1 PE e rolar 1d6. Se o resultado for seu número da sorte, recebe +2 em testes de perícia até o fim da cena. Caso contrário, na próxima vez que usar esta habilidade, escolha mais um número como número da sorte. Quando rolar um de seus números da sorte, a quantidade de números volta a 1.");
  O("legista", "Legista do Turno da Noite", S, 11, ["Ciências", "Medicina"], 0, "Luto Habitual", "passiva", "2 PE",
    "Você sofre apenas a metade do dano mental por presenciar uma cena que, a critério do mestre, esteja relacionada à rotina de um legista (presenciar uma morte, ver um cadáver, encontrar órgãos humanos). Além disso, quando faz um teste de Medicina para primeiros socorros ou necropsia, pode gastar 2 PE para receber +5 nesse teste.");
  O("mateiro", "Mateiro", S, 12, ["Percepção", "Sobrevivência"], 0, "Mapa Celeste", "livre", "2 PE",
    "Desde que possa ver o céu, você sempre sabe as direções dos pontos cardeais e consegue chegar sem se perder em qualquer lugar que já tenha visitado ao menos uma vez. Quando faz um teste de Sobrevivência, pode gastar 2 PE para rolar o teste novamente e escolher o melhor entre os dois resultados. Além disso, em cenas de interlúdio, considera condições de sono precárias como normais.");
  O("mergulhador", "Mergulhador", S, 12, ["Atletismo", "Fortitude"], 0, "Fôlego de Nadador", "passiva", "",
    "Você recebe +5 PV e pode prender a respiração por um número de rodadas igual ao dobro do seu Vigor. Além disso, quando passa em um teste de Atletismo para natação, avança seu deslocamento normal (em vez da metade).",
    [rec("pv", { valor: 5 })]);
  O("motorista", "Motorista", S, 13, ["Pilotagem", "Reflexos"], 0, "Mãos no Volante", "livre", "2 PE",
    "Você não sofre penalidades em testes de ataque por estar em um veículo em movimento e, sempre que estiver pilotando e tiver que fazer um teste de Pilotagem ou resistência, pode gastar 2 PE para receber +5 nesse teste.");
  O("nerd", "Nerd Entusiasta", S, 13, ["Ciências", "Tecnologia"], 0, "O Inteligentão", "passiva", "",
    "O bônus que você recebe ao utilizar a ação de interlúdio ler aumenta em +1 dado (de +1d6 para +2d6).");
  O("profetizado", "Profetizado", S, 13, ["Vontade"], 1, "Luta ou Fuga", "passiva", "",
    "Perícias: Vontade e mais uma à sua escolha, relacionada à sua premonição. Conhecer os sinais de sua morte o deixa mais confiante. Você recebe +2 em Vontade. Quando surge uma referência à sua premonição, uma onda de adrenalina toma seu corpo: além do bônus em Vontade, recebe +2 PE temporários que duram até o fim da cena.",
    [man("+2 em Vontade: use o bônus personalizado da perícia (lápis)")]);
  O("psicologo", "Psicólogo", S, 13, ["Intuição", "Profissão"], 0, "Terapia", "reacao", "2 PE",
    "Perícia: Profissão (psicólogo). Você pode usar Profissão (psicólogo) como Diplomacia. Além disso, uma vez por rodada, quando você ou um aliado em alcance curto falha em um teste de resistência contra um efeito que causa dano mental, pode gastar 2 PE para fazer um teste de Profissão (psicólogo) e usar o resultado no lugar do teste de resistência falho.",
    [], { limite: "1 vez por rodada" });
  O("reporter", "Repórter Investigativo", S, 13, ["Atualidades", "Investigação"], 0, "Encontrar a Verdade", "livre", "2 PE",
    "Você pode usar Investigação no lugar de Diplomacia ao fazer testes para persuadir e mudar atitude e, quando faz um teste de Investigação, pode gastar 2 PE para receber +5 nesse teste.");
})();

/* ---------------- estado e motor ---------------- */
let origemOP = null; // { id, treinos:[{pericia, modo}], escolhas:[...] }

function buscarOrigemOP(id) {
  return ORIGENS_OP.find((o) => o.id === id) || null;
}

function _opcoesOrigemOP() {
  const grupo = (fonte, titulo) => {
    const lista = ORIGENS_OP.filter((o) => o.fonte === fonte);
    if (!lista.length) return "";
    return `<optgroup label="${titulo}">${lista
      .slice()
      .sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"))
      .map((o) => `<option value="${o.id}" ${origemOP && origemOP.id === o.id ? "selected" : ""}>${esc(o.nome)}</option>`)
      .join("")}</optgroup>`;
  };
  const fontes = ["livro", "sah", "as1", "as4", "as5", "as6", "as7", "as9", "fora"];
  const nome = (f) => (typeof nomeFonteOP === "function" ? nomeFonteOP(f) : f);
  return `<option value="">Selecionar origem</option>${fontes.map((f) => grupo(f, nome(f))).join("")}`;
}

function atualizarSeletorOrigemOP() {
  const sel = document.getElementById("origemOP");
  if (!sel) return;
  sel.innerHTML = _opcoesOrigemOP();
  sel.value = origemOP ? origemOP.id : "";
}

function montarSeletorOrigemOP() {
  if (document.getElementById("origemOP")) return;
  let linha = document.querySelector(".personagem-campos > .op-linha-trilha");
  if (!linha) {
    const base = document.querySelector(".personagem-campos > .op-identidade-linha");
    if (!base) return;
    linha = document.createElement("div");
    linha.className = "op-identidade-linha op-linha-trilha";
    base.insertAdjacentElement("afterend", linha);
  }
  const campo = document.createElement("div");
  campo.className = "op-campo";
  campo.innerHTML = `
    <span class="op-label">ORIGEM</span>
    <select id="origemOP" onchange="aoMudarOrigemOP(this.value)"></select>`;
  linha.insertBefore(campo, linha.firstChild);
  atualizarSeletorOrigemOP();
}

/* desfaz o que a origem atual aplicou */
function reverterOrigemOP() {
  if (!origemOP) return;
  const idPoder = "ori." + origemOP.id;
  for (let i = poderes.length - 1; i >= 0; i--) {
    if (poderes[i].origemCatalogo === idPoder) poderes.splice(i, 1);
  }
  (origemOP.treinos || []).forEach((t) => {
    if (t.modo === "treino" && (profs[t.pericia] || 0) === 1) profs[t.pericia] = 0;
  });
  origemOP = null;
}

function _finalizarOrigemOP() {
  if (typeof renderPoderes === "function") renderPoderes();
  if (typeof atualizarTudo === "function") atualizarTudo();
  if (typeof aplicarRecursosAutomaticosOP === "function") aplicarRecursosAutomaticosOP();
  if (typeof atualizarResumoAutoOP === "function") atualizarResumoAutoOP();
  atualizarSeletorOrigemOP();
  salvarTudo();
}

async function aoMudarOrigemOP(id) {
  const antiga = origemOP;
  if (antiga && antiga.id === id) return;

  const nova = buscarOrigemOP(id);
  if (!nova) {
    if (antiga) {
      const ok = await confirmBonito(`Remover a origem ${buscarOrigemOP(antiga.id)?.nome || ""}? As perícias treinadas por ela e o poder da origem saem da ficha.`);
      if (!ok) { atualizarSeletorOrigemOP(); return; }
    }
    reverterOrigemOP();
    _finalizarOrigemOP();
    return;
  }

  let escolhas = [];
  if (nova.escolhas > 0) {
    escolhas = await escolherPericiasOrigemOP(nova);
    if (!escolhas) { atualizarSeletorOrigemOP(); return; }
  }

  reverterOrigemOP();
  aplicarOrigemOP(nova, escolhas);
  _finalizarOrigemOP();
  mostrarResumoOrigemOP(nova, escolhas);
}

function aplicarOrigemOP(o, escolhas) {
  const lista = [...o.pericias, ...escolhas];
  const treinos = [];
  lista.forEach((nome) => {
    if ((profs[nome] || 0) >= 1) treinos.push({ pericia: nome, modo: "ja" });
    else { profs[nome] = 1; treinos.push({ pericia: nome, modo: "treino" }); }
  });
  origemOP = { id: o.id, treinos, escolhas };

  const item = typeof buscarItemCatalogoOP === "function" ? buscarItemCatalogoOP("ori." + o.id) : null;
  if (!item) return;
  const novo = typeof _poderDaFichaOP === "function" ? _poderDaFichaOP(item, {}) : null;
  if (novo) {
    novo.categoria = "origem";
    novo.requisito = `Origem: ${o.nome}`;
    poderes.push(novo);
  }
}

/* origens que deixam o jogador/mestre escolher perícias (Amnésico, Profetizado) */
function escolherPericiasOrigemOP(o) {
  return new Promise((resolve) => {
    const jaFixas = new Set(o.pericias);
    const opcoes = pericias.filter((p) => !jaFixas.has(p.nome));
    window._resolverOrigemOP = (confirmar) => {
      if (!confirmar) { fecharPopup(); resolve(null); return; }
      const marcadas = [...document.querySelectorAll("#origemPericiasOP input:checked")].map((i) => i.value);
      if (marcadas.length !== o.escolhas) {
        alertBonito(`Escolha exatamente ${o.escolhas} perícia${o.escolhas > 1 ? "s" : ""}.`);
        return;
      }
      fecharPopup();
      resolve(marcadas);
    };
    abrirPopup(
      `Origem: ${o.nome}`,
      `<div class="popup-bloco">
        <p class="bp-dica">${o.pericias.length ? `Já treinadas pela origem: <b>${o.pericias.map(esc).join(", ")}</b>.<br>` : ""}Escolha ${o.escolhas} perícia${o.escolhas > 1 ? "s" : ""} para treinar${o.id === "amnesico" ? " (à escolha do mestre)" : o.dicaEscolha ? ` (${o.dicaEscolha})` : " (relacionada à sua premonição)"}.</p>
        <div id="origemPericiasOP" class="origem-pericias">
          ${opcoes.map((p) => `<label><input type="checkbox" value="${esc(p.nome)}" ${(profs[p.nome] || 0) >= 1 ? "disabled checked" : ""} /> <span>${esc(p.nome)}</span></label>`).join("")}
        </div>
        <button type="button" class="evo-ok" onclick="_resolverOrigemOP(true)">Confirmar</button>
        <button type="button" class="evo-desfazer" onclick="_resolverOrigemOP(false)">Cancelar</button>
      </div>`,
      true,
    );
  });
}

function mostrarResumoOrigemOP(o, escolhas) {
  const lista = [...o.pericias, ...escolhas];
  const info = origemOP?.treinos || [];
  const rotulo = (n) => {
    const t = info.find((x) => x.pericia === n);
    return t && t.modo === "ja" ? `${esc(n)} <em>(já treinada)</em>` : esc(n);
  };
  const html = `
    <div class="popup-bloco evo-popup">
      <div class="evo-titulo">${esc(o.nome)} <small>(${typeof nomeFonteOP === "function" ? nomeFonteOP(o.fonte) : o.fonte}${o.pagina ? `, p. ${o.pagina}` : ""})</small></div>
      <div class="evo-bloco">
        <div class="evo-sub">Perícias treinadas</div>
        <div class="evo-marco">${lista.map(rotulo).join(" · ") || "—"}</div>
      </div>
      <div class="evo-bloco">
        <div class="evo-sub">Poder da origem: ${esc(o.poder.nome)}</div>
        <div class="evo-marco">${esc(o.poder.resumo)}</div>
        <small class="evo-dica">O poder foi para a aba Poderes (categoria Origem).</small>
        ${o.abreParanormais ? `<div class="evo-marco evo-alerta">⚠️ Você escolhe um poder paranormal e começa com metade da Sanidade da classe. <button type="button" class="evo-mini" onclick="fecharPopup(); abrirParanormaisOP();">Escolher poder paranormal</button></div>` : ""}
        ${o.id === "chefoutrolado" ? "" : ""}
      </div>
      <button type="button" class="evo-ok" onclick="fecharPopup()">OK, continuar</button>
    </div>`;
  abrirPopup("Origem aplicada", html, true);
}

/* ---------------- persistência ---------------- */
function carregarOrigemOP(p) {
  origemOP = p.origemOP && buscarOrigemOP(p.origemOP.id) ? p.origemOP : null;
  atualizarSeletorOrigemOP();
}

function salvarOrigemOP(p) {
  p.origemOP = origemOP ? { id: origemOP.id, treinos: origemOP.treinos || [], escolhas: origemOP.escolhas || [] } : null;
}

function _iniciarOrigensOP() {
  montarSeletorOrigemOP();
  if (!document.getElementById("origemOP")) setTimeout(montarSeletorOrigemOP, 400);
  if (!document.getElementById("origemOP")) setTimeout(montarSeletorOrigemOP, 1200);
}
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", _iniciarOrigensOP);
else _iniciarOrigensOP();
