/* =====================================================================
   CONTEÚDO EXTRA — Arquivos Secretos (AS 1, 3, 4, 5, 6, 7 e 9) + origens
   "fora dos livros". Tudo entra no mesmo catálogo que o resto do site:
   poderes de classe, gerais, paranormais, trilhas e origens.
   Carregar DEPOIS de catalogo-op.js e origens-op.js.
   Campos novos que o motor entende:
     reqTexto     → pré-requisito mostrado na tela, mas conferido por você
                    (ex.: "conjurar ritual de 2º círculo")
     requisitos.periciasVet → perícias em que precisa ser veterano ou mais
   ===================================================================== */
const EXTRAS_OP_IDS = { poderes: [], trilhas: [] };

(function () {
  const CAT = CATALOGO_OP_PADRAO;
  Object.assign(CAT.fontes, {
    as1: "Arquivos Secretos 1",
    as3: "Arquivos Secretos 3",
    as4: "Arquivos Secretos 4",
    as5: "Arquivos Secretos 5",
    as6: "Arquivos Secretos 6",
    as7: "Arquivos Secretos 7",
    as9: "Arquivos Secretos 9",
    fora: "Origens fora dos livros",
  });

  const rec = (alvo, extra) => ({ tipo: "recurso", alvo, ...extra });
  const man = (texto) => ({ tipo: "manual", texto });
  const tr = (pericia) => ({ tipo: "treino", pericia });
  const at = (obj) => ({ atributos: obj });

  /* ---- poderes ---- */
  const PW = (id, classe, tipo, nome, fonte, pagina, ativacao, resumo, extra = {}) => {
    CAT.poderes.push({ id, classe, tipo, nome, fonte, pagina: String(pagina), ativacao, resumo, efeitos: [], ...extra });
    EXTRAS_OP_IDS.poderes.push(id);
  };
  const C = (id, nome, fonte, pag, ativ, resumo, extra) => PW("comb." + id, "combatente", "classe", nome, fonte, pag, ativ, resumo, extra);
  const E = (id, nome, fonte, pag, ativ, resumo, extra) => PW("esp." + id, "especialista", "classe", nome, fonte, pag, ativ, resumo, extra);
  const OC = (id, nome, fonte, pag, ativ, resumo, extra) => PW("ocu." + id, "ocultista", "classe", nome, fonte, pag, ativ, resumo, extra);
  const G = (id, nome, fonte, pag, ativ, resumo, extra) => PW("ger." + id, "geral", "geral", nome, fonte, pag, ativ, resumo, extra);
  const PAR = (id, elemento, nome, fonte, pag, ativ, resumo, afinidade, extra = {}) =>
    PW("par." + id, "paranormal", "paranormal", nome, fonte, pag, ativ, resumo, { elemento, afinidade, ...extra });

  /* ---- trilhas ---- */
  const T = (id, classe, nome, fonte, pagina, resumo, habilidades, extra = {}) => {
    CAT.trilhas.push({ id, classe, nome, fonte, pagina, resumo, habilidades, ...extra });
    EXTRAS_OP_IDS.trilhas.push(id);
  };
  const H = (trilha, nex, nome, ativacao, resumo, extra = {}) => ({ id: `${trilha}.${nex}`, nex, nome, ativacao, resumo, efeitos: [], ...extra });

  /* =================================================================
     PODERES DE COMBATENTE
     ================================================================= */
  C("as3.guardiaotropa", "Guardião da Tropa", "as3", 108, "reacao",
    "Se um aliado adjacente for alvo de um ataque ou habilidade que tenha ele como alvo único, você pode gastar uma reação e 2 PE para sofrer o ataque ou habilidade por ele. Se o ataque não vencer sua Defesa ou a habilidade não te afetar completamente (passando no teste de resistência dela, por exemplo), você recupera 1 SAN. Pode ser adquirido novamente para mudar o alcance de adjacente para curto.",
    { custo: "2 PE", repetivel: true, reqTexto: "Ataque Especial, Casca Grossa" });
  C("as3.vitalidadesofrida", "Vitalidade Sofrida", "as3", 108, "passiva",
    "As surras que você tomou te fizeram mais resistente, mas quebraram parte da sua sanidade. PV iniciais passam a 24 + Vigor; PV por novo nível, 6 (+Vig); SAN inicial, 11; SAN por novo nível, 2. Aplica-se aos níveis que você já tem e aos futuros. Ex.: combatente NEX 15%, 37 PV e 18 SAN, ao adquirir este poder, fica com 45 PV e 15 SAN.",
    { reqTexto: "Ataque Especial",
      efeitos: [rec("pv", { valor: 2, porNivel: 2 }), rec("san", { porNivel: -1 }), man("Calculado sobre a base do Combatente (PV 20 + 4/nível, SAN 12 + 3/nível)")] });
  C("as4.chuvabalas", "Chuva de Balas", "as4", 65, "passiva",
    "Todos os pacotes de munição do seu inventário têm sua duração dobrada. Além disso, ao disparar uma rajada, o ataque passa a causar mais dois dados extra de dano adicional do mesmo tipo, além do normal. Se estiver usando a regra opcional de contagem de munição, a quantidade de ataques que cada pacote afeta aumenta em +10. Não funciona com foguetes, combustíveis e granadas 40mm.");
  C("as4.combatenteesforcado", "Combatente Esforçado", "as4", 65, "passiva",
    "Seu treinamento intenso e físico teve bons rendimentos. Você recebe +1 PE para cada NEX (a cada 5%).",
    { reqTexto: "For 3 ou Vig 3", efeitos: [rec("pe", { porNivel: 1 })] });
  C("as4.treinamentomilitarizado", "Treinamento Militarizado", "as4", 65, "passiva",
    "Você pode exercitar-se uma vez por cena de interlúdio sem gastar ação. Além disso, o bônus recebido por exercitar-se em uma cena de interlúdio muda para +1d8 e também pode ser gasto em rolagens de dano, mas só pode usar um bônus em cada rolagem.");
  C("as5.auraconfianca", "Aura de Confiança", "as5", 55, "passiva",
    "Entrar em combate tendo você do lado é inspirador. Todos os seus aliados em um raio de 18m a partir de você recebem +5 em testes de Iniciativa e em testes contra presença perturbadora (você não recebe esses bônus, apenas seus aliados).");
  C("as5.folegoemergencia", "Fôlego de Emergência", "as5", 55, "movimento",
    "Uma vez por cena, quando está machucado, você pode gastar uma ação de movimento para se recompor em meio ao conflito (escolha entre recuperar 2d8 + Vig PV ou 1d8 + Vig PE). Só pode usar se houver alguma ameaça presente.",
    { limite: "1 vez por cena" });
  C("as5.paredecarne", "Parede de Carne", "as5", 55, "passiva",
    "Seu corpo robusto fornece cobertura leve (+5 na Defesa) para aliados em espaços adjacentes ao seu.",
    { reqTexto: "For 3 ou Vig 3" });
  C("as6.analisecombativa", "Análise Combativa", "as6", 67, "passiva",
    "Você especializou suas habilidades de análise. Quando faz um teste usando Ciente das Cicatrizes, recebe +5 nesse teste. Além disso, se enfrentar uma ameaça que já havia investigado com sucesso usando Ciente das Cicatrizes, recebe +2 em testes contra ela.",
    { requisitos: { poderes: ["comb.sah.cientecicatrizes"] } });
  C("as6.protecaoleve", "Especialista em Proteção Leve", "as6", 67, "passiva",
    "Você sabe usufruir do que a proteção leve tem de melhor. Se estiver usando uma proteção leve, recebe +2 na Defesa e em Reflexos.",
    { efeitos: [man("+2 na Defesa e em Reflexos enquanto usar proteção leve")] });
  C("as9.municiador", "Municiador Ambulante", "as9", 39, "interludio",
    "Você recebe uma nova ação de interlúdio: municiar. Prepare uma quantidade de pacotes de munição que está equivalente a 1d6 para cada ponto em Intelecto que tiver. Você pode carregar esses pacotes preparados sem que eles ocupem espaço.",
    { requisitos: at({ intelecto: 2 }) });
  C("as9.ripostar", "Ripostar Ousado", "as9", 39, "reacao",
    "Você tem um estilo de combate perigoso. Quando for alvo de um ataque corpo a corpo, mas antes de saber se foi atingido ou não, pode gastar sua reação especial de defesa e 2 PE para usar esse poder e fazer um contra-ataque. Você recebe +5 na Defesa contra o ataque para o qual está reagindo. Se o atacante errar, você recebe +5 no teste de ataque ao contra-atacar.",
    { custo: "2 PE", requisitos: { ...at({ agilidade: 2 }), periciasAll: ["Luta"] } });
  C("as9.taticaabordagem", "Tática de Abordagem", "as9", 39, "interludio",
    "Você recebe uma nova ação de interlúdio: tática de abordagem. Você propõe um plano de como você e seus aliados vão lidar com uma ameaça específica futura (cena de combate, furtividade, perseguição ou similar, a critério do mestre). Em seguida, faz um teste de Tática (DT 25). Você recebe 3 dados de tática (d6) se passar no teste e +1 para cada 5 pontos acima da DT. Quando você e seu grupo estiverem lidando com a ameaça relacionada ao plano, você pode gastar dados de tática para: fornecer +1d6 em um teste; fornecer +1d6 pontos de dano extra em uma rolagem de dano; ou fornecer +1d6 pontos de cura extra em uma rolagem de cura. Pode gastar quantos dados quiser como reação, inclusive acumulando-os. Os dados podem ser gastos por você ou por qualquer aliado que participou do planejamento, independentemente da distância. Dados não gastos são perdidos no início da próxima cena de interlúdio. Só pode fazer essa ação de interlúdio uma vez por cena.",
    { limite: "1 vez por cena", requisitos: { ...at({ intelecto: 1 }), periciasVet: ["Tática"] } });
  C("as9.tirointuitivo", "Tiro Intuitivo", "as9", 39, "livre",
    "Quando faz um ataque à distância sem fazer a ação mirar, você recebe +2 na margem de ameaça desse ataque. Além disso, ao usar esse poder, você também pode gastar 2 PE para receber +1 no multiplicador de crítico desse ataque e, se acertar, o dano ignora até 10 pontos de RD de qualquer tipo do alvo.",
    { custo: "2 PE (opcional)", requisitos: { periciasVet: ["Pontaria"] } });

  /* =================================================================
     PODERES DE ESPECIALISTA
     ================================================================= */
  E("as4.analiseconturbada", "Análise Conturbada", "as4", 65, "padrao",
    "Sua eloquência mórbida e palavras angustiantes, por mais que macabras, trazem uma certa reflexão valiosa. Durante uma cena de investigação, você pode gastar uma ação padrão para trazer suas teorias e análises obscuras em voz alta, implantando paranoia em quem puder ouvir. Agentes voluntários que estiverem presentes no ambiente, incluindo você, podem escolher dar ouvidos às suas falas. Caso aceitem, rolem 1d6 e recebem o resultado em bônus para testes baseados em Intelecto e Presença até o fim da cena, mas também perdem o valor da rolagem em SAN.");
  E("as4.profissaoperigo", "Profissão Perigo", "as4", 65, "completa",
    "Em situações difíceis, você sabe dar valor a qualquer coisa, podendo transformar a tralha mais insignificante em algo útil. Pode gastar uma ação completa e 4 PE para desmontar seus equipamentos e construir algo novo utilizando os seus materiais. Ao fazer isso, você se desfaz de um item qualquer em seu inventário e recebe um novo item operacional à sua escolha no lugar dele. O item escolhido não deve ultrapassar a categoria e os espaços do item sacrificado. Só pode fazer isso três vezes por missão.",
    { custo: "4 PE", limite: "3 vezes por missão" });
  E("as4.quasenovo", "Quase Novo", "as4", 65, "interludio",
    "Ao fazer uma ação de manutenção (veja Fabricação em Campo, SaH, p. 94) durante uma cena de interlúdio, o item reparado recebe +10 PV adicionais. Além disso, você pode usar a mesma ação para adicionar ao equipamento uma nova modificação temporária de uma categoria que possa acessar. A modificação dura até o início da próxima cena de interlúdio.");
  E("as5.adeptoescuro", "Adepto do Escuro", "as5", 55, "passiva",
    "Você ignora camuflagem leve e total por escuridão. Além disso, recebe +5 em testes de Investigação e Percepção feitos em ambientes de penumbra (pouca luz, iluminado somente por lanternas, velas ou ao pôr do sol, por exemplo).");
  E("as5.saudosista", "Saudosista Hi-Tech", "as5", 55, "passiva",
    "Você recebe +5 em testes de Tecnologia para lidar com aparelhos eletrônicos anteriores aos anos 2000. Além disso, recebe +5 em testes para consertar itens tecnológicos. Finalmente, você consegue usar essas velharias junto de tecnologias atuais para receber uma ação extra na primeira rodada de uma cena de hacking (AS 4, p. 72).");
  E("as5.treinadotelas", "Treinado nas Telas", "as5", 55, "livre",
    "O tempo gasto à frente dos videogames te proporcionou olhos treinados e uma melhor significativa no seu tempo de reação. Quando faz um teste de Iniciativa ou de Reflexos, pode gastar 1 PE para somar Intelecto nesse teste.",
    { custo: "1 PE" });
  E("as6.doutoremergencias", "Doutor em Emergências", "as6", 68, "passiva",
    "Sua eficiência como socorrista é ainda melhor. Qualquer cicatrizante ou medicamento que recupere pontos de vida, ou forneça pontos de vida temporários, aplicados por você recebe 1d8 PV adicionais em seu efeito (um cicatrizante recupera 3d8+2 PV, enquanto um anti-inflamatório fornece 2d8+2 PV temporários). Além disso, você recebe +5 em testes de Medicina para aplicar tratamento (OPRPG, p. 46) e, se passar no teste, o paciente recebe +10 em seu próximo teste de Fortitude contra a doença ou veneno, em vez de +5.",
    { requisitos: { poderes: ["ger.especemergencias"] } });
  E("as6.farmaceuticocampo", "Farmacêutico de Campo", "as6", 68, "interludio",
    "Você se especializou na fabricação e administração de cicatrizantes (OPRPG, p. 65) e medicamentos (SaH, p. 43). Uma vez por cena de interlúdio em que tenha um kit de medicina, escolha um cicatrizante ou medicamento e gaste 2 PE, mais 2 PE por categoria do item escolhido. Você cria o item. Quando o mesmo kit de medicina é usado 3 vezes por esta habilidade, ele é consumido. Pode usar esse poder novamente na mesma cena, mas para cada uso além do primeiro, também precisa gastar uma ação de interlúdio.",
    { custo: "2 PE + 2 PE por categoria", limite: "1 vez por cena de interlúdio", requisitos: { periciasAll: ["Medicina", "Profissão"] }, reqTexto: "Profissão (químico ou similar)" });
  E("as6.medicosalvacao", "Médico da Salvação", "as6", 68, "passiva",
    "Você se especializou em salvar vidas. Os dados da sua habilidade de médico de campo Paramédico aumentam de d10 para d12. Além disso, quando usa a habilidade Paramédico, você pode gastar 3 PE, uma vez por rodada, para usá-la como uma ação de movimento, em vez de ação padrão.",
    { custo: "3 PE (opcional)", requisitos: { poderes: ["esp.medico.10"] } });
  E("as6.resgatarmorte", "Resgatar da Morte", "as6", 68, "livre",
    "Não haverá baixas no seu turno. Quando faz um teste de primeiros socorros (OPRPG, p. 46), você pode gastar 2 PE para obter sucesso automático nesse teste. Você só pode usar essa habilidade no mesmo ser uma vez por cena.",
    { custo: "2 PE", requisitos: { periciasVet: ["Medicina"] } });
  E("as6.veteranotrauma", "Veterano da Equipe de Trauma", "as6", 68, "passiva",
    "Você é o melhor entre os melhores. Quando usa a habilidade de médico de campo Equipe de Trauma, você remove até três condições negativas (exceto morrendo), em vez de apenas uma.",
    { requisitos: { poderes: ["esp.medico.10", "esp.medico.40"] } });

  /* =================================================================
     PODERES DE OCULTISTA
     ================================================================= */
  OC("as1.acostumadomaldicao", "Acostumado à Maldição de <Elemento>", "as1", 44, "passiva",
    "Escolha um elemento (exceto Medo). Por já interagir ritualisticamente com esta entidade, quando falha em um teste relacionado ao preço da maldição de itens amaldiçoados do elemento escolhido (OPRPG, p. 145), você não perde pontos de sanidade. Você ainda sofre quaisquer outros efeitos negativos de itens amaldiçoados.",
    { requisitos: at({ intelecto: 2 }), reqTexto: "conjurar ritual de 2º círculo do elemento escolhido" });
  OC("as1.ritualintenso", "Ritual Intenso", "as1", 44, "passiva",
    "Você soma sua Presença nas rolagens de dano e de cura de seus rituais.",
    { requisitos: at({ presenca: 2 }) });
  OC("as1.saudesobrenatural", "Saúde Sobrenatural", "as1", 44, "movimento",
    "Uma vez por cena, você pode gastar uma ação de movimento e 3 PE para receber pontos de vida temporários igual a sua Presença x 10. Por exemplo, se tem Pre 3, recebe 30 PV temporários. Esses pontos temporários desaparecem no fim da cena e não são cumulativos com eles mesmos.",
    { custo: "3 PE", limite: "1 vez por cena", requisitos: at({ intelecto: 2, presenca: 2 }), reqTexto: "conjurar ritual de 1º círculo" });
  OC("as1.reterritualcombate", "Reter Ritual de Combate", "as1", 44, "reacao",
    "Quando um ritual com duração retida está afetando negativamente um alvo, você pode mudar a duração para cena, como reação, no instante em que ele sai da linha de efeito. Além disso, quando sofre uma condição que o faz deixar de reter rituais, você pode gastar uma reação e 1 PE por ritual para mudar a duração dos rituais para cena, evitando perder seus efeitos. Só pode ser escolhido se estiver usando a regra opcional de Reter Ritual (AS 1, p. 58).",
    { custo: "1 PE por ritual", requisitos: at({ intelecto: 2 }), reqTexto: "conjurar ritual de 1º círculo" });
  OC("as3.flagelobemaproveitado", "Flagelo Bem Aproveitado", "as3", 108, "passiva",
    "Cada gota de sangue é melhor aproveitada por você. A taxa da habilidade Poder do Flagelo muda para 1 PV por PE pago.",
    { requisitos: { poderes: ["ocu.as3.recuperacaoflagelante"] }, reqTexto: "Escolhido pelo Outro Lado" });
  OC("as3.recuperacaoflagelante", "Recuperação Flagelante", "as3", 108, "especial",
    "Quanto mais você se recupera, mais você pode sofrer. Entre uma cena de interlúdio e outra, você pode, uma única vez, recuperar pontos de vida gastos com a habilidade Poder do Flagelo com outros métodos além de descanso. Pode ser adquirido novamente para aumentar o uso em +1 até o limite de 3 usos entre cenas de interlúdio.",
    { repetivel: true, requisitos: { poderes: ["ocu.flagelador.10"] }, reqTexto: "Escolhido pelo Outro Lado" });
  OC("as4.exploradornevoa", "Explorador da Névoa", "as4", 66, "especial",
    "Você já criou costume por estar em lugares onde ninguém gostaria de pisar. Uma vez por cena, você pode gastar 2 PE para distinguir o estado da Membrana de um ambiente (estável, danificada, arruinada etc.). Se fizer isso e a Membrana estiver danificada ou pior, você perde 1 SAN, mas reduz o custo de conjuração de todos os seus rituais em 1 PE.",
    { custo: "2 PE", limite: "1 vez por cena" });
  OC("as4.sinestesia", "Sinestesia Paranormal", "as4", 66, "passiva",
    "O Outro Lado afeta sua percepção sensorial a níveis extremos. Quando entra em uma cena em que a Membrana está danificada ou pior, você passa a conseguir ouvir o gosto do caos, sentir o som da imprevisibilidade, saborear o cheiro do intangível, percebendo influências do Outro Lado de maneiras diferentes. Você pode resistir à sinestesia (nada acontece e seus sentidos voltam ao normal) ou aceitá-la. Caso aceite, você perde 1d6 SAN e pode escolher dois pares de perícias para trocar os atributos usados entre elas. Por exemplo, Atletismo (passa a usar Presença, em vez de Força) e Percepção (passa a usar Força, em vez de Presença), e trocar Investigação (passa a usar Agilidade, em vez de Intelecto) e Reflexos (passa a usar Intelecto, em vez de Agilidade). Você não pode usar esse poder em perícias que exijam treinamento e você não tenha. A sinestesia é interrompida quando você sai da área afetada pela Membrana e só pode ser aceita novamente no dia seguinte.");
  OC("as4.terroresnoturnos", "Terrores Noturnos", "as4", 66, "especial",
    "Os sussurros da escuridão não cessam e parecem se fortalecer conforme seus olhos se fecham. Quando dormir em uma cena de interlúdio, role 1d100. Se o resultado for 51 ou mais, nada acontece e você tem bons sonhos (recebe +2 PE pelo descanso agradável). Se o resultado for 50 ou menos, você é tomado por pesadelos paranormais. Sua condição de descanso muda para precária e você perde 1d4 SAN. Entretanto, escolha 1 poder paranormal ou ritual que você atenda aos pré-requisitos para usá-lo. Até o início da próxima cena de interlúdio, você pode usar o poder ou conjurar o ritual uma única vez, seguindo as regras dele normalmente.");
  OC("as5.catalogocriaturas", "Catálogo de Criaturas Ambulante", "as5", 56, "movimento",
    "Sua memória é inquestionável quando o assunto é criaturas. Você pode identificar criaturas como uma ação de movimento, em vez de ação completa, e consegue fazer isso sem vê-las pessoalmente, analisando somente algum vestígio deixado no ambiente.",
    { requisitos: { poderes: ["ocu.identificacaoparanormal"] } });
  OC("as5.meditacaoocultista", "Meditação Ocultista", "as5", 56, "interludio",
    "Você recebe uma nova ação de interlúdio: Meditação. Com esta ação, recupera uma quantidade de pontos de esforço conforme seu limite de PE e sua condição de meditação (siga a mesma lógica das condições de descanso). Você só pode meditar uma vez por interlúdio. Normal: recupera um número de PE igual ao dobro do seu limite de PE por rodada (um personagem de NEX 35%, limite de PE 7, recupera 14 PE). Precária: recuperação reduzida pela metade. Confortável: recuperação triplicada. Luxuosa: recuperação quadruplicada.",
    { limite: "1 vez por interlúdio" });
  OC("as5.ruidocomunicacao", "Ruído de Comunicação", "as5", 56, "reacao",
    "Nem tudo é o que parece ser. Uma vez por rodada, ao presenciar uma situação em que um ser em alcance curto recebe um efeito (bônus ou penalidade) em dados rolados (dados adicionais em testes de perícia, rolagens de dano ou uma condição como frustrado, por exemplo), você pode gastar uma reação e 3 PE para alterar o efeito, transformando bônus em penalidade ou vice-versa. Não pode ser usada em penalidades sofridas intencionalmente. A transformação dura pela descrição original do efeito ou até o fim da cena, o que for menor. Não afeta o mesmo ser mais de uma vez ao mesmo tempo.",
    { custo: "3 PE", limite: "1 vez por rodada" });
  OC("as6.barreiraoculto", "Barreira do Oculto", "as6", 69, "passiva",
    "Buscando sobreviver, você aprendeu a se proteger através da conexão com uma entidade. Escolha um elemento. Quando conjura um ritual do elemento escolhido, você pode gastar PE para receber bônus na Defesa, na proporção de 1 PE para cada +2 na Defesa, até seu limite de PE. O bônus dura por 1 rodada.",
    { custo: "1 PE para cada +2 na Defesa", requisitos: { nexMin: 30, poderes: ["ocu.especialistaelemento"] }, reqTexto: "no elemento escolhido" });
  OC("as6.graomestre", "Grão-Mestre em Elemento", "as6", 69, "livre",
    "Você se tornou mestre em causar efeitos adicionais quando conjura seus rituais. Escolha um elemento. Quando conjura um ritual do elemento escolhido, você pode gastar 1 PE para causar um dos efeitos a seguir.\nSangue: se o alvo for um aliado, ele recebe +2d4 pontos de dano extra de Sangue em suas rolagens de dano; se o alvo for um inimigo, ele fica debilitado por 1 rodada.\nMorte: se o alvo for um aliado, ele recebe 3d8+3 pontos de vida temporários; se o alvo for um inimigo, ele fica enjoado por 1 rodada.\nConhecimento: se o alvo for um aliado, ele recebe +2 em testes de perícia; se o alvo for um inimigo, ele fica esmorecido por 1 rodada.\nEnergia: se o alvo for um aliado, ele recebe +6m em todas as suas formas de deslocamento; se o alvo for um inimigo, ele fica desprevenido por 1 rodada.\nOs efeitos afetam apenas 1 alvo (podendo ser você) e duram até o fim da cena (salvo descrição contrária), mesmo que o ritual afete vários e tenha duração diferente. As condições causadas ignoram imunidades.",
    { custo: "1 PE", requisitos: { nexMin: 60, poderes: ["ocu.mestreelemento"] }, reqTexto: "no elemento escolhido" });

  /* =================================================================
     PODERES GERAIS
     ================================================================= */
  G("as1.cicatrizesexpostas", "Cicatrizes Expostas", "as1", 46, "movimento",
    "Você tem cicatrizes graves, físicas ou psicológicas, que podem deixá-lo em um estado de ira caso sejam expostas. Você pode gastar uma ação de movimento para expor sua cicatriz. Se fizer isso, sempre que causar dano, você causa +1d8 pontos de dano do mesmo tipo, mas sofre −1 dado em testes de Vontade e testes que exijam calma, como ficar furtivo ou traduzir um idioma. Caso outro ser exponha sua cicatriz, ainda que contra sua vontade, os mesmos efeitos se aplicam. Os efeitos duram até o fim da cena.",
    { reqTexto: "ter cicatrizes" });
  G("as1.habilidadeaprimorada", "<Habilidade> Aprimorada", "as1", 46, "passiva",
    "Escolha uma habilidade ou um ritual que tenha DT. A DT para resistir a essa habilidade ou ritual aumenta em +2. Você pode escolher este poder outras vezes para habilidades e rituais diferentes, e até duas vezes para uma mesma habilidade ou ritual (neste caso, a DT aumenta em um total de +5).",
    { repetivel: true });
  G("as1.instintosurbanos", "Instintos Urbanos", "as1", 46, "passiva",
    "Você não confia na \"sociedade civilizada\" e está pronto para sobreviver na selva de concreto. Você recebe treinamento em Crime ou, se já for treinado nesta perícia, receba +2 nela. Além disso, quando entra em um ambiente fechado, pode fazer um teste de Crime (DT 20) para identificar as melhores saídas. Se passar, você identifica uma rota de fuga. Em termos de regras, se decidir escapar do lugar, você recebe uma ação de movimento extra no primeiro turno da fuga e +2 na Defesa até fugir. Se o lugar não tiver rotas de fuga identificáveis, você recebe +2 na Defesa enquanto estiver nele.",
    { requisitos: at({ agilidade: 2 }), efeitos: [tr("Crime")] });
  G("as1.curiosidadeoculta", "Curiosidade Oculta", "as1", 46, "livre",
    "Seu gosto bizarro pelo oculto abriu sua mente. Você recebe treinamento em Ocultismo ou, se já for treinado nesta perícia, recebe +2 nela. Além disso, quando faz um teste de Vontade, você pode gastar 2 PE para trocar a perícia por Ocultismo.",
    { custo: "2 PE (opcional)", requisitos: at({ intelecto: 2 }), efeitos: [tr("Ocultismo")] });
  G("as1.especialistaesoterico", "Especialista Esotérico", "as1", 46, "passiva",
    "Poucos compreendem o uso de catalisadores ritualísticos como você. Ao conjurar um ritual, você pode combinar os efeitos de até três catalisadores ritualísticos diferentes ao mesmo tempo.",
    { requisitos: at({ intelecto: 3 }), reqTexto: "conjurar ritual de 2º círculo, Domínio Esotérico (SaH, p. 26)" });
  G("as3.ambidestria", "Ambidestria", "as3", 108, "livre",
    "Se estiver empunhando duas armas (e pelo menos uma delas for leve) e fizer a ação agredir, você pode fazer dois ataques, um com cada arma. Se fizer isso, sofre −1 dado em todos os testes de ataque até o seu próximo turno. Se tiver Combater com Duas Armas, em vez disso você não sofre penalidade para usá-lo e pode empunhar duas armas de uma mão.",
    { requisitos: { periciasAll: ["Luta"] }, reqTexto: "For 2 ou Agi 2" });
  G("as3.entradatriunfal", "Entrada Triunfal", "as3", 109, "especial",
    "Você sabe como chegar chegando. Ao entrar em um ambiente, uma vez por sessão, você pode anunciar sua chegada em voz alta para todos os presentes escutem. Ao fazer isso, você recebe +2d20 no primeiro teste que fizer no ambiente, exceto em um teste de Furtividade. Se preferir, você pode, como reação, transferir o bônus para o primeiro teste de um aliado em alcance longo no mesmo ambiente.",
    { limite: "1 vez por sessão", requisitos: at({ presenca: 2 }) });
  G("as3.papinhosedutor", "Papinho Sedutor", "as3", 109, "livre",
    "Você sabe usar as palavras para seduzir. Quando faz um teste de perícia baseado em Presença para seduzir alguém, você pode gastar 1 PE para receber +5 nesse teste. Se passar, o alvo fica apaixonado por você. Entretanto, enquanto ele estiver apaixonado, ele pode se tornar um problema na sua vida, a critério do mestre (como ficar obcecado por você ou sempre aparecer em momentos inoportunos).",
    { custo: "1 PE", requisitos: at({ presenca: 2 }) });
  G("as4.gororoba", "Gororoba", "as4", 66, "especial",
    "Sopa de cereal com bebida energética? Seu paladar é um tanto quanto peculiar. Em uma cena de interlúdio, você pode alimentar-se uma vez sem gastar uma ação e sem precisar de fato ter acesso à refeição (você improvisa com os restos que encontra).");
  G("as4.ruidobranco", "Ruído Branco", "as4", 66, "passiva",
    "O barulho de um ambiente caótico se torna ruído para sua concentração. Enquanto estiver em um ambiente movimentado ou um local com muitas conversas paralelas, você recebe +1d6 em testes de Investigação e Percepção. Além disso, à critério do mestre, pode gastar 1 PE, uma vez por cena, para ouvir entre as vozes uma conversa que forneça uma informação útil para a missão.",
    { custo: "1 PE (opcional)", requisitos: at({ intelecto: 3 }) });
  G("as4.ultimaolhada", "Uma Última Olhada", "as4", 67, "livre",
    "É melhor prevenir do que remediar. Na última rodada de uma cena de investigação, você pode gastar 2 PE, uma vez por cena, para cobrar mais esforço de todos, aproveitando o pouco tempo que tem para analisar tudo rapidamente com seu grupo. Em termos de regras, o número de rodadas disponíveis aumenta em +1.",
    { custo: "2 PE", limite: "1 vez por cena" });
  G("as5.apaixonadoveiculos", "Apaixonado por Veículos", "as5", 56, "passiva",
    "Você se tornou um amante de veículos. Você recebe treinamento em Pilotagem ou, se já for treinado nesta perícia, recebe +2 nela. Além disso, qualquer teste que fizer envolvendo garantir a segurança especificamente do veículo, a critério do mestre, recebe +1 dado. Se estiver usando a regra de Veículos Operacionais (AS 3, p. 125), você recebe +1 regalia no seu veículo e essa regalia não conta para o limite de regalias dele.",
    { requisitos: at({ agilidade: 2 }), efeitos: [tr("Pilotagem")] });
  G("as5.desafiarego", "Desafiar o Ego", "as5", 56, "reacao",
    "Uma vez por rodada, quando presenciar um ataque sendo feito por um aliado, você pode, como reação, gastar 1 PE e gritar palavras de incentivo ou provocação a ele. Se o ataque acertar, o aliado causa dano extra igual ao valor da sua Presença. Se o ataque errar, você recupera o PE gasto.",
    { custo: "1 PE", limite: "1 vez por rodada", requisitos: at({ presenca: 2 }) });
  G("as5.direcaodefensiva", "Direção Defensiva", "as5", 57, "passiva",
    "Você é um motorista precavido e com senso de preservação. Você recebe treinamento em Pilotagem ou, se já for treinado nesta perícia, recebe +2 nela. Além disso, se estiver dirigindo, todos os seres dentro do veículo, incluindo você, recebem +2 na Defesa e em testes de resistência. Se estiver usando a regra de Veículos Operacionais (AS 3, p. 125), seu veículo também recebe +2 na Defesa.",
    { efeitos: [tr("Pilotagem")] });
  G("as6.adaptacaoclimatica", "Adaptação Climática", "as6", 70, "passiva",
    "Através de treinamentos contra hipotermia e hipertermia, você se tornou mais resistente ao clima. Você recebe +2 em Fortitude e não sofre dano por clima muito quente, muito frio, calor extremo ou frio extremo.",
    { requisitos: at({ vigor: 2 }), efeitos: [man("+2 em Fortitude: use o bônus personalizado da perícia (lápis)")] });
  G("as6.muitosorrateiro", "Muito Sorrateiro", "as6", 70, "passiva",
    "Suas habilidades de discrição beiram a inexistência. Quando uma cena de furtividade começa, role 1d4 e subtraia o valor da sua visibilidade inicial. Por exemplo, se começaria com visibilidade 0 e rola 2 no d4, no início da cena de furtividade, sua visibilidade é −2. Além disso, você recebe +3 em Furtividade.",
    { requisitos: { poderes: ["ger.sorrateiro"] }, efeitos: [man("+3 em Furtividade: use o bônus personalizado da perícia (lápis)")] });
  G("as6.armasimprovisadas", "Especialista em Armas Improvisadas", "as6", 70, "passiva",
    "Você treinou com armas improvisadas até dominá-las. Você não sofre penalidade em testes de ataque por usar uma arma improvisada. Além disso, suas rolagens de dano com armas improvisadas recebem +1 dado de dano extra do mesmo tipo (uma cadeira que causa 1d6 pontos de dano de impacto passa a causar 2d6, por exemplo).",
    { requisitos: { periciasAll: ["Luta"] }, reqTexto: "For 2 ou Agi 2" });

  /* =================================================================
     PODERES PARANORMAIS
     ================================================================= */
  PAR("as1.ferromaculado", "Sangue", "Ferro Maculado", "as1", 47, "livre",
    "Acostumado a usar munições especiais contra ameaças, sua relação com armas que disparam projéteis se intensifica conforme você é corrompido pelo Sangue. Quando faz um ataque com uma arma de disparo, você pode gastar 2 PV para amaldiçoar a munição a ser disparada. Até o fim do turno, essa munição é considerada amaldiçoada e causa +1d6 pontos de dano de Sangue. Este dano é multiplicado em caso de acerto crítico.",
    "O dano muda para +1d8 pontos de dano de Sangue.", { custo: "2 PV" });
  PAR("as1.sanguecorrosivo", "Sangue", "Sangue Corrosivo", "as1", 47, "movimento",
    "A maldade do Sangue borbulha nas suas veias como um ácido extraído do inferno. Você pode gastar uma ação de movimento e 1 PE para transformar seu sangue em uma substância corrosiva até o fim da cena. Quando você sofre dano causado por um ser que está adjacente, você também causa 1d10 pontos de dano de Sangue nele.",
    "O dano muda para +2d10 pontos de dano de Sangue.", { custo: "1 PE" });
  PAR("as1.placassanguinolentas", "Sangue", "Placas Sanguinolentas", "as1", 47, "passiva",
    "Você consegue manipular parte do Sangue presente em um ritual para criar placas rubras que o protegem. Quando você conjura um ritual de Sangue, recebe um bônus na Defesa equivalente ao círculo do ritual até o início do seu próximo turno (se for de 3º círculo, por exemplo, recebe +3 na Defesa).",
    "O bônus na Defesa passa a ser igual ao círculo do ritual +2 (+3 para um ritual de 1º círculo, +4 para um ritual de 2º círculo e assim por diante).",
    { reqTexto: "conjurar ritual de Sangue" });
  PAR("as1.sangueprazeroso", "Sangue", "Sangue Prazeroso", "as1", 47, "passiva",
    "Sua conexão com o Sangue permite que você resista a dor apenas para que consiga sentir ela por mais tempo. Enquanto estiver machucado, você recebe resistência a dano 5.",
    "Enquanto estiver machucado, você também recebe +20 PV temporários, mas apenas uma vez por cena.",
    { requisitos: { elementos: { Sangue: 1 } } });
  PAR("as3.direcaocognitiva", "Conhecimento", "Conhecimento de Direção Cognitiva", "as3", 109, "passiva",
    "Você possui um \"sexto sentido\" que aponta para onde você tem que ir, mesmo que você nem saiba onde fica. Você recebe +5 em testes de Percepção ou Sobrevivência para se localizar ou se orientar até um local, mesmo nunca tendo visto ele ou sequer saber sua localização.",
    "O bônus aumenta para +10.");
  PAR("as3.instrumentoeletrico", "Energia", "Instrumento Elétrico de Combate", "as3", 109, "especial",
    "Você transforma um instrumento musical em uma versão elétrica de batalha. Ao adquirir esse poder, espere até antes de começar uma missão ou até uma cena de interlúdio (o que acontecer primeiro). Quando chegar o momento, escolha um instrumento musical que você saiba tocar e esteja com você. Ele se torna uma arma permanentemente com as seguintes características: arma tática amaldiçoada de Energia que só você recebe proficiência para usar; empunhadura de duas mãos; ataca à distância, atingindo 1 alvo a sua escolha em alcance curto com ondas sonoras; em vez de Luta ou Pontaria, testes de ataque são feitos com Artes; causa 2d8 pontos de dano de Energia; em vez de Força ou Agilidade, soma Presença no dano; crítico 20/x2; categoria II; 2 espaços. Se esta arma quebrar, você pode usar esse poder novamente em um novo instrumento musical. Se você morrer, esta arma quebra. Para habilidades e regras que beneficiam o uso de armas, ou o uso de Luta ou Pontaria (aumentando dano, margem de ameaça, bônus de ataque etc.), converse com seu mestre para determinar o que pode funcionar com seu personagem, dependendo da narrativa e da permissão de combos da mesa.",
    "Em vez de 1 alvo, você pode atingir todos os alvos a sua escolha em alcance curto.");
  PAR("as4.focogravitacional", "Energia", "Foco Gravitacional", "as4", 67, "movimento",
    "A gravidade não vai mais te incomodar (talvez). Você pode gastar 2 PE para receber deslocamento de voo 9m até o fim do seu turno. Quando seu turno acabar, o voo se encerra e, se não estiver no chão, você cai. Para cada vez, além da primeira, que usa esse poder na mesma missão, há 10% de chance (1 a 10 em 1d100) cumulativa de você apenas ser atirado 6m no ar e cair imediatamente sofrendo 4d6 pontos de dano de impacto. Por exemplo, se é o quarto uso na mesma missão, há 30% de chance de falha.",
    "Muda a chance cumulativa para apenas 5%.", { custo: "2 PE" });
  PAR("as4.sobreporimprevisivel", "Energia", "Sobrepor Imprevisível", "as4", 67, "reacao",
    "Seus movimentos são caóticos e imprevisíveis. Se você não sabe o que está fazendo, muito menos o inimigo. Uma vez por rodada, e apenas no início dela, você pode gastar uma reação para rolar 1d20. Se o resultado for par, some ele ao seu valor de iniciativa. Se for ímpar, subtraia. Sua posição na ordem de iniciativa é mudada de acordo com o novo resultado.",
    "Você pode rolar 2d20 e escolher o resultado que preferir em um dos dados.", { limite: "1 vez por rodada" });
  PAR("as4.tracoinconsistencia", "Energia", "Traço de Inconsistência", "as4", 67, "reacao",
    "Sua presença causa perturbações em aparelhos eletrônicos que possam capturá-lo. Você pode gastar 2 PE, como reação, para esconder sua identidade em imagens digitais capturadas por câmeras de segurança ou fotográficas, no momento em que é fotografado/filmado.",
    "Sua presença se torna incapaz de ser capturada por imagens digitais permanentemente. Além disso, sua voz também se torna distorcida em gravações.", { custo: "2 PE" });
  PAR("as5.acidocorrosivo", "Energia", "Ácido Corrosivo", "as5", 57, "livre",
    "Você pode gastar 1 PE para expelir um ácido grosso e corrosivo pelas mãos. Até o final da cena, você recebe +2 nos testes de ataque desarmado e +5 nas rolagens de dano desarmado. Além disso, seu tipo de dano desarmado muda para químico. Se estiver usando uma arma corpo a corpo, pode escolher afetá-la por esse poder (+2 em testes de ataque, +5 em rolagens de dano e o tipo de dano muda para químico), mas se ela não for um item amaldiçoado, será destruída pelo ácido no fim da cena.",
    "Os bônus mudam para +4 em testes de ataque e +10 nas rolagens de dano.",
    { custo: "1 PE", requisitos: { elementos: { Energia: 1 } } });
  PAR("as5.deadmanswitch", "Conhecimento", "Dead Man Switch", "as5", 57, "especial",
    "Quando perto da morte, o seu conhecimento passa a ser transmitido automaticamente, como um sinal, para a mente daqueles no qual você confia. Quando estiver machucado, você pode escolher um alvo em alcance médio e uma perícia na qual você seja treinado. O alvo então receberá o mesmo nível de treinamento que você na perícia escolhida. O efeito termina assim que você se recuperar da condição ou quando você morrer.",
    "Você pode escolher até três alvos e uma perícia adicional. Além disso, se morrer após utilizar os efeitos desse poder, os últimos alvos afetados por ele mantêm as perícias transmitidas até o fim da missão.");
  PAR("as5.paralinguistica", "Conhecimento", "Paralinguística Ampliada", "as5", 57, "passiva",
    "Há mais verdade na sua mente do que você gostaria. Você recebe +5 em testes para tentar extrair alguma informação das \"linguagens\" do Outro Lado (como os Sigilos de Conhecimento). Além disso, você aprende o ritual Compreensão Paranormal. Se já o conhecer, em vez disso, o custo para conjurá-lo diminui em −1 PE.",
    "O bônus muda para +10 e você está sempre sob efeito de Compreensão Paranormal em sua forma verdadeira.");
  PAR("as6.escudoespiral", "Morte", "Escudo Espiral Temporal", "as6", 71, "reacao",
    "Sua conexão com a Morte permite que crie proteções que envelhecem itens usados contra você. Uma vez por rodada, você pode gastar 2 PE como reação para afetar uma arma ou munição que vai causar dano. Se o dano for causado por uma munição, você recebe RD 20 contra ele e o projétil se desfaz em cinzas. Se o dano for causado por uma arma corpo a corpo, você recebe RD 10 contra ele e a arma envelhece (ela sofre 10 pontos de dano químico). A RD dessa habilidade não funciona contra dano de Energia.",
    "Você pode usar essa habilidade mais de uma vez por rodada e o dano químico muda para 20.",
    { custo: "2 PE", limite: "1 vez por rodada", requisitos: { elementos: { Morte: 2 } } });
  PAR("as6.grilhoeslodo", "Morte", "Grilhões de Lodo", "as6", 71, "padrao",
    "Você é capaz de criar correntes, vinhas e grilhões de Lodo pelo chão. Você pode gastar 2 PE para criar uma área afetada por esses grilhões com 9m de raio a partir de você. A área dura até o fim da cena. Todos os seres na área (exceto você e criaturas de Morte) sofrem 3d6 pontos de dano de Morte e ficam lentos (Fortitude DT <atributo mais alto> reduz o dano à metade e evita a condição por 1 rodada).",
    "O dano muda para 6d6 e a condição muda para enredado.", { custo: "2 PE" });
  PAR("as6.saltodados", "Energia", "Salto de Dados", "as6", 71, "completa",
    "Através da sua conexão com a Energia, você consegue \"copiar seus dados\" na realidade por um breve momento. Você pode gastar uma ação completa e 2 PE para marcar um símbolo em seu próprio corpo. Esse símbolo dura por 1 dia ou até ser consumido, o que acontecer primeiro. Você não pode ter dois símbolos marcados simultaneamente. A qualquer momento, você pode gastar 3 PE como uma reação para consumir a marca e retornar o seu estado físico e mental para o momento em que fez o símbolo em si mesmo (PV, PE, condições, efeitos, estatísticas da ficha, tudo retorna para o estado em que estava quando você fez a marca). Entretanto, você perde a memória de tudo o que vivenciou desde que se marcou. Além da interpretação, a perda de memória se reflete em regras, deixando você alquebrado e frustrado até o fim da cena e pasmo por 1d4+1 rodadas.",
    "A duração do símbolo muda para 1 ano ou até ser consumido, o que acontecer primeiro.",
    { custo: "2 PE (marcar) + 3 PE (consumir)", requisitos: { elementos: { Energia: 2 } } });

  /* =================================================================
     TRILHAS
     ================================================================= */
  /* ---- Maledictólogo (AS 1, p. 45) ---- */
  T("ocu.as1.maledictologo", "ocultista", "Maledictólogo", "as1", "45",
    "Domina as maldições de itens amaldiçoados: identifica, memoriza e aplica maldições em outros itens.", [
      H("ocu.as1.maledictologo", 10, "Identificação Macabra", "livre",
        "Compreender o paranormal fica cada vez mais prático com o tempo. Quando faz um teste para identificar item amaldiçoado ou identificar ritual, você pode gastar 1 PE para receber +1d10 neste teste. Além disso, sofre apenas −1 dado para identificar itens amaldiçoados como uma ação completa.", { custo: "1 PE" }),
      H("ocu.as1.maledictologo", 40, "Compreensão de Maldições", "interludio",
        "Você pode gastar uma ação de interlúdio e 3 PE para fazer leituras e rituais de identificação em um item amaldiçoado. Após isso, faça um teste de Ocultismo (DT 10 +5 por categoria do item). Se falhar, você perde 2d4+2 SAN e não pode tentar novamente com o mesmo item.\nSe passar e o item amaldiçoado contiver um ritual, você perde 1d4+1 SAN, aprende o ritual e o item é consumido. Esse ritual não conta no seu limite de rituais.\nSe passar e o item não contiver um ritual, você perde 1d4+1 SAN e pode transferir as maldições para outro item ou para um símbolo marcado em seu corpo ou no corpo de um aliado adjacente, como uma tatuagem, e o item amaldiçoado original é consumido. A pessoa tatuada pode usufruir das maldições como se estivesse usando o item, mas a mesma pessoa não pode ter mais do que uma tatuagem desse tipo. Você pode destruir esse símbolo em seu corpo gastando uma ação de interlúdio.", { custo: "3 PE" }),
      H("ocu.as1.maledictologo", 65, "Reproduzir Maldição", "interludio",
        "Você pode gastar uma ação de interlúdio e 3 PE para memorizar uma maldição de item com a qual já tenha lidado (por exemplo, um item que já estudou ou usou, ou mesmo um do qual já foi alvo). Uma vez que tenha memorizado uma maldição, pode gastar uma ação de interlúdio e 3 PE para aplicá-la a um novo item. Para isso, faça um teste de Ocultismo (DT 10 +5 por categoria do item). Se falhar, você perde 2d8+2 SAN. Se passar, você perde 1d8+1 SAN e o novo item recebe a maldição que você havia memorizado até o fim da missão. Maldições aumentam categorias de itens, e nenhum item pode ter categoria maior do que IV.", { custo: "3 PE" }),
      H("ocu.as1.maledictologo", 99, "Maldição Suprema", "passiva",
        "A loucura não o impede de fazer o impensável. Ao usar a habilidade Reproduzir Maldição, você considera o item três categorias efetivas a menos. Por exemplo, um item de categoria IV é considerado de categoria I, permitindo que você aplique maldições até ele voltar à categoria IV."),
    ]);

  /* ---- Performático (AS 3, p. 119) — trilha geral para as 3 classes ---- */
  const performatico = (pref, classe, nome) => {
    const id = `${pref}.as3.performatico`;
    T(id, classe, nome, "as3", "119",
      "Glamour, ritmo e trabalho em sinergia com a trupe: uma luta é uma performance violentamente cativante e colaborativa, digna de ser observada por uma plateia. Regra opcional do AS 3: trilha geral, pode ser escolhida por combatentes, especialistas e ocultistas (o nome muda para Especialista Performático ou Ocultista Performático).", [
        H(id, 10, "Ensaio", "interludio",
          "Você sabe que a prática leva à perfeição em qualquer contexto. Você recebe uma nova opção de ação de interlúdio: ensaiar combate. Quando fizer ela, você recebe +1 na margem de ameaça de seus ataques até o início da próxima cena de interlúdio. Esse bônus aumenta para +2 em NEX 40%, para +3 em NEX 65% e +4 em NEX 99%. Você só pode ensaiar uma vez por cena. Outros personagens podem gastar uma ação de interlúdio para ensaiar com você, recebendo o mesmo bônus pela mesma duração.", { limite: "1 vez por cena" }),
        H(id, 40, "Frase de Efeito", "especial",
          "Você tem uma frase de efeito que ilustra perfeitamente os momentos de maior performance. Quando você ou um aliado em alcance curto obter um acerto crítico, você pode gastar 2 PE para exclamar sua grande frase e mudar o multiplicador de crítico do ataque. Se o multiplicador for menor que sua Presença, ele aumenta em +2. Se for maior ou igual a sua Presença, ele aumenta em +1.", { custo: "2 PE" }),
        H(id, 65, "Mosh Pit", "passiva",
          "Conforme a música fica mais pesada, o clima fica cada vez mais violento. Quando está flanqueando um alvo, você e todos os seus aliados flanqueando ou adjacentes ao mesmo alvo recebem +1d6 nas rolagens de dano contra ele para cada aliado cercando-o (até o limite de +5d6). Por exemplo, se você está flanqueando o inimigo com um aliado e há mais dois aliados adjacentes ao alvo, todos vocês recebem +4d6 nas rolagens de dano contra este inimigo."),
        H(id, 99, "Ritmo Contagiante", "passiva",
          "Você e todos os membros da sua equipe já sabem de cor as suas coreografias icônicas, seu ritmo se torna contagiante e inevitável. No início de uma cena de combate, você e todos os aliados em alcance médio recebem +5 na Defesa até o fim do combate. Sempre que você obtiver um acerto crítico, esse bônus aumenta em +1 (até o limite total de +10 na Defesa)."),
      ]);
  };
  performatico("comb", "combatente", "Combatente Performático");
  performatico("esp", "especialista", "Especialista Performático");
  performatico("ocu", "ocultista", "Ocultista Performático");

  /* ---- Granadeiro Blaster (AS 4, p. 69) ---- */
  T("esp.as4.granadeiro", "especialista", "Granadeiro Blaster", "as4", "69",
    "Um nerd assustador do poder de fogo: granadas, explosivos, bombas, um pouco de pólvora e nitroglicerina. Quanto mais explosivo, mais eficiente.", [
      H("esp.as4.granadeiro", 10, "Meus Bebês", "passiva",
        "Se quer um trabalho bem feito, faça você mesmo. Você recebe treinamento em Profissão (químico) ou, se já for treinado nessa perícia, recebe +5 nela. Além disso, começa a missão com 1 explosivo autoral (não conta para o seu limite de itens). O número de explosivos autorais no começo da missão aumenta em +1 para cada outra habilidade desta trilha que adquirir. Explosivos autorais são explosivos fabricados por você e que você pode produzir mais deles com as regras de Fabricação em Campo (SaH, p. 94). Explosivos autorais são considerados 1 categoria menor (mínimo 0)."),
      H("esp.as4.granadeiro", 40, "O Calor do Momento", "padrao",
        "Não se pode estar preparado para tudo. Quando a hora \"H\" chegar, o improviso virá à calhar. Uma vez por cena, você pode gastar uma ação padrão e 2 PE, mais 2 PE por categoria do explosivo escolhido, para criar um explosivo autoral. Se não usá-lo no fim da cena de um jeito ou de outro, ele vai explodir. Além disso, você consegue usar granadas 40mm como se fossem granadas arremessáveis.", { custo: "2 PE + 2 PE por categoria", limite: "1 vez por cena" }),
      H("esp.as4.granadeiro", 65, "Fogo Amigo", "passiva",
        "É bom que quem te acompanhe tenha assinado um termo de condições à respeito de seus comportamentos explosivos. Você recebe o poder Perito em Explosivos (OPRPG, p. 30). Se já o tiver, ou o adquirir novamente (é permitido uma única vez), você aumenta em +2 o valor adicionado para resistir aos seus explosivos e a quantidade de alvos que pode excluir dos seus efeitos. Além disso, a medida da área afetada pelos seus explosivos aumenta em +6m. Por exemplo, uma granada passa a afetar um raio de 12m enquanto uma mina antipessoal passa a afetar um cone de 12m."),
      H("esp.as4.granadeiro", 99, "Memória Muscular", "livre",
        "Suas criações agem quase como uma extensão do seu corpo ou de quem as use. Você e qualquer aliado adjacente podem sacar qualquer explosivo autoral em seu inventário como uma ação livre, e você pode gastar 4 PE para usar um explosivo autoral como uma ação de movimento (mesmo em um lança-granadas). Além disso, seus explosivos autorais causam o dobro dos dados de dano.", { custo: "4 PE (opcional)" }),
    ]);

  /* ---- Criptologista do Oculto (AS 5, p. 58) ---- */
  T("ocu.as5.criptologista", "ocultista", "Criptologista do Oculto", "as5", "58",
    "Estuda e compreende as linguagens usadas para se comunicar com o Outro Lado e ensina os aliados a aprimorar suas súplicas ao paranormal. Seus Selos são mais fáceis e mais fortes.", [
      H("ocu.as5.criptologista", 10, "Método Intuitivo", "passiva",
        "Você recebe o poder Criar Selo (OPRPG, p. 33). Se recebê-lo novamente, dobra a quantidade máxima de selos criados ao mesmo tempo. Você pode criar 2 selos com uma ação de interlúdio, em vez de apenas 1. O número de selos que você pode criar em uma ação de interlúdio aumenta em +1 para cada outra habilidade desta trilha que adquirir."),
      H("ocu.as5.criptologista", 40, "Caligrafia Eficiente", "passiva",
        "Selos feitos por você são mais fáceis de usar. O teste para usar o Selo de um ritual que o usuário não conhece muda para Ocultismo (DT 10 + custo em PE do ritual). Além disso, você recebe +5 em testes para identificar rituais."),
      H("ocu.as5.criptologista", 65, "Decifrar à Distância", "passiva",
        "Quando usa um Selo Paranormal, você não precisa estar empunhando-o nem precisa lê-lo em voz alta. Basta poder lê-lo, mesmo que apenas mentalmente, mas o Selo precisa estar, no máximo, em alcance curto de você. Além disso, você recebe +5 em testes para extrair alguma informação das \"linguagens\" do Outro Lado como Sigilos ou Sinais."),
      H("ocu.as5.criptologista", 99, "Selo Supremo", "passiva",
        "Selos feitos por você dispensam testes de Ocultismo para serem usados. Além disso, os rituais dos seus Selos sofrem as seguintes alterações:\n• Se o ritual pede testes de resistência, a DT aumenta em +5;\n• Se o ritual causa dano, a rolagem de dano aumenta em +3 dados extras do mesmo tipo;\n• Se o ritual for usado em forma avançada (discente ou verdadeira), o usuário não precisa pagar o custo adicional em pontos de esforço da forma avançada."),
    ]);

  /* ---- Incursor (AS 9, p. 40) ---- */
  T("comb.as9.incursor", "combatente", "Incursor", "as9", "40",
    "Treinado para invadir complexos, combater ameaças encasteladas entre paredes e escombros e realizar uma série de ações disruptivas para cumprir a missão. Precisão e velocidade tática.", [
      H("comb.as9.incursor", 10, "Close Quarters Battle", "passiva",
        "Você treinou táticas para usar suas armas de fogo eficientemente enquanto evita baixas acidentais. Você recebe treinamento em Tática. Se já for treinado, recebe +2 nessa perícia. Além disso, quando causa dano com uma arma de fogo, você causa dano extra equivalente ao seu bônus em Tática. Finalmente, você não sofre a penalidade de −1 dado contra um alvo engajado em combate corpo a corpo.", { efeitos: [tr("Tática")] }),
      H("comb.as9.incursor", 40, "Especialista Tático", "passiva",
        "Nada como um bom plano. Você recebe o poder Tática de Abordagem (p. 39), mesmo que não atenda seus pré-requisitos. Quando receber um poder de combatente, você pode escolher adquirir Tática de Abordagem novamente (mas dessa vez, precisa atender aos pré-requisitos). Se o fizer, recebe o seguinte efeito: quando usa o poder Tática de Abordagem, você pode aumentar o tipo do dado de tática em um passo para cada 3 PE gastos, até seu limite de PE ou até d12, o que for menor (3 PE: d6 muda para d8; 6 PE: d6 muda para d10; 9 PE: d6 muda para d12)."),
      H("comb.as9.incursor", 65, "Proteger Reféns", "reacao",
        "Não basta tirar o civil do perigo iminente, é preciso levá-lo até uma área segura. Se estiver a até 3m de um ser e ele for alvo de qualquer efeito negativo, você pode gastar 2 PE como reação para se tornar o alvo do efeito negativo, no lugar dele. Se o efeito negativo for dano, você também pode gastar 2 PE para reduzir o dano que vai sofrer à metade. Você consegue usar essa habilidade várias vezes por rodada, mas apenas com até três seres diferentes. Além disso, se estiver agarrando um alvo, pode optar por anular a probabilidade de 50% do alvo errado ser atingido.", { custo: "2 PE" }),
      H("comb.as9.incursor", 99, "Alvo-prioritário", "especial",
        "Com a experiência do campo de batalha você aprendeu a identificar as ameaças e eliminá-las antes que seja tarde. Sempre que um inimigo estiver na sua linha de visão, o mestre deve informar qual o VD dele. Você pode gastar 5 PE para determinar um inimigo que possa ver como alvo prioritário. Se ele tiver VD 200 ou menos, qualquer dano que você causar nele imediatamente reduz os PV dele para 0. Se ele tiver VD 201 ou mais, você recebe +5 nas margens de ameaça contra ele. Esses efeitos duram até o inimigo ser eliminado ou até você determinar outro inimigo como alvo prioritário.", { custo: "5 PE" }),
    ]);

  /* ---- Piloto de Drone (AS 9, p. 41) ---- */
  T("esp.as9.piloto", "especialista", "Piloto de Drone", "as9", "41",
    "Expert em uso de drones para todo tipo de função: transforma o que muitos consideram um brinquedo em uma ferramenta.", [
      H("esp.as9.piloto", 10, "Companheiro Drone", "passiva",
        "Um drone é seu melhor amigo. Você recebe treinamento em Pilotagem ou Tecnologia (escolha uma). Se já for treinado na perícia escolhida, em vez disso, recebe +2 nela. Além disso, você recebe um drone de combate tático (p. 44) que não conta no seu limite de itens (e que não pode receber modificações, exceto por essa trilha). Se, por qualquer razão, seu drone for danificado ou destruído, você pode consertá-lo ou receber um novo da Ordo Realitas gastando uma ação de interlúdio. Você não vai receber um novo se não tiver como a Ordem fornecê-lo, a critério do mestre."),
      H("esp.as9.piloto", 40, "Drone em Combate", "reacao",
        "Você se especializa em combater com seu drone. Quando ele correr risco de ser danificado, você pode gastar 3 PE para garantir que ele continue intacto. Além disso, seu drone recebe duas modificações que não aumentam a categoria do item.", { custo: "3 PE" }),
      H("esp.as9.piloto", 65, "Drone em Interlúdio", "especial",
        "Seu drone não é só uma ferramenta de combate. Se estiver com seu drone em uma cena de interlúdio, você pode gastar 3 PE para o drone manter a segurança enquanto todos dormem. Se o fizer, isso impede que o interlúdio seja interrompido por qualquer ameaça, além de aumentar a recuperação por dormir em +2 PV e +2 PE. Se o mestre determinar que é impossível que o drone interrompa a ameaça, pelo menos você e seu grupo não serão surpreendidos ou pegos desprevenidos. Além disso, seu drone recebe mais duas modificações que não aumentam a categoria do item (para um total de 4 modificações). Finalmente, o custo em PE para garantir que seu drone continue intacto é reduzido para 2 PE.", { custo: "3 PE" }),
      H("esp.as9.piloto", 99, "Drone de Eficiência Máxima", "padrao",
        "Seu drone é eficiente para todo o grupo. Você pode gastar uma ação padrão e 5 PE para escolher até cinco seres em alcance longo de você. Todos os seres escolhidos (e você) são ajudados pelo seu drone ao mesmo tempo (todos recebem os bônus e podem usar as habilidades), até o fim da cena. Se algum ser escolhido ficar mais distante do que 36m de você, ele perde a ajuda até voltar para dentro do alcance. Além disso, seu drone recebe mais três modificações que não aumentam a categoria do item (para um total de 7 modificações). Finalmente, o custo em PE para garantir que seu drone continue intacto é reduzido para 1 PE.", { custo: "5 PE" }),
    ]);

  /* ---- Monstruoso (AS 7, p. 81-88): variante para Especialista e Ocultista ---- */
  const ESPECIAL_MONSTRUOSO =
    " Variante do Monstruoso para combatentes (SaH, pp. 17-21 e Monstruosa Transformação, p. 21). Usa a \"Progressão de NEX\" da regra opcional Nível de Experiência e Nível de Exposição (SaH, p. 98), mesmo que a regra não esteja sendo usada: o personagem recebe todas as alterações apropriadas ao seu NEX e, se a regra de Nível de Experiência estiver em uso, recebe o dobro de NEX sempre que se expõe ao paranormal.";
  const SEM_ALTERAR = "Essa alteração de atributo não afeta PV, PE, SAN ou o número de perícias treinadas. Você não pode alterar pontos que não sejam seus (como os fornecidos por itens ou rituais).";

  T("esp.as7.monstruoso", "especialista", "Monstruoso (Especialista)", "as7", "81-84",
    "Os limites impostos pela realidade em seu corpo o impedem de ser aquilo que você sente que deveria ser: você se apropria do que o Outro Lado fornece e se transforma com estratégia, buscando eficácia." + ESPECIAL_MONSTRUOSO, [
      H("esp.as7.monstruoso", 10, "Ser Experimentado", "completa",
        "Você se torna treinado em Ocultismo (se já for treinado, recebe +2 nessa perícia). Escolha um elemento paranormal entre Sangue, Morte, Conhecimento ou Energia e sofra as consequências (−2 em Diplomacia, Enganação e Intuição). Uma vez por dia, você precisa fazer experimentos cruéis com seu corpo (por exemplo, injetar sangue humano para Sangue, inalar cinzas de mortos para Morte, ingerir ouro puro para Conhecimento ou se eletrocutar para Energia). Fazer o experimento custa uma ação completa. Se fizer isso, você recupera 1d8+1 PV e, até o fim do dia, recebe os efeitos descritos a seguir, conforme o elemento escolhido. Caso contrário, você sofre efeitos nesse dia similares a fome e sede (OPRPG, p. 292). Só é possível fazer um experimento por dia. Por fim, se adquirir afinidade com um elemento, deverá escolher aquele selecionado para esta habilidade.\n" +
        "Sangue: considerado Grande (+2 em manobras e −2 em Furtividade) e soma sua Força em testes baseados nesse atributo. Passa a usar Força, em vez de Presença, para determinar seus PE.\n" +
        "Morte: 2d6 PV temporários, uma ação padrão adicional por cena e soma seu Vigor em testes baseados nesse atributo. Passa a usar Vigor, em vez de Presença, para determinar seus PE.\n" +
        "Conhecimento: escolha duas perícias. Você é considerado treinado nas perícias escolhidas e soma seu Intelecto em testes baseados nesse atributo. Passa a usar Intelecto, em vez de Presença, para determinar seus PE.\n" +
        "Energia: uma vez por rodada, saca um item como ação livre (cumulativo com os de itens como bandoleira), todos os seus deslocamentos aumentam em 6m e soma sua Agilidade em testes baseados nesse atributo. Passa a usar Agilidade, em vez de Presença, para determinar seus PE.",
        { efeitos: [tr("Ocultismo"), man("Elemento escolhido: ajuste PE (atributo no lugar de Presença) e as penalidades de perícia na ficha")] }),
      H("esp.as7.monstruoso", 40, "Ser Testado", "completa",
        "Seu corpo demonstra costume com os estímulos frequentes ao seu organismo, exigindo métodos alternativos para resultados mais surpreendentes. Você faz sacrifícios físicos e mentais ainda mais dolorosos para testar seus limites e sofre as consequências (−2 muda para −5 em Diplomacia, Enganação e Intuição). Agora, ao fazer o experimento, você recupera 2d8+2 PV e, até o fim do dia, também recebe os efeitos descritos a seguir, conforme seu elemento.\n" +
        "Sangue: seus ataques causam +1d6 pontos de dano de Sangue e você recebe RD 2. Você pode devorar seus pontos de Intelecto (até o limite de Intelecto 0). Para cada ponto devorado temporariamente, seus ataques causam +1d6 pontos de dano de Sangue e sua RD aumenta em +2.\n" +
        "Morte: o número de turnos em que pode ficar morrendo aumenta em +1 e você recebe 2d8 PV temporários no início de cada cena. Você pode necrosar seus pontos de Força (até o limite de Força 0). Para cada ponto necrosado temporariamente, o número de turnos em que pode ficar morrendo aumenta em +1 e você recebe +2d8 PV temporários no início de cada cena.\n" +
        "Conhecimento: você recebe +1d6 em testes baseados em Intelecto. Você pode inexistir seus pontos de Agilidade (até o limite de Agilidade 0). Para cada ponto inexistido temporariamente, você recebe +2 em testes baseados em Intelecto.\n" +
        "Energia: você recebe +1d6 em testes de ataque e +2 na Defesa. Você pode queimar seus pontos de Vigor (até o limite de Vigor 0). Para cada ponto queimado temporariamente, você recebe +1d4 em testes de ataque e +2 na Defesa.\n" + SEM_ALTERAR),
      H("esp.as7.monstruoso", 65, "Ser Expurgado", "completa",
        "Você expurga um braço do seu corpo para que ele, pouco a pouco, se desate das amarras limitantes da Realidade, substituindo-o por um braço paranormal alimentado por seus experimentos constantes (essa alteração faz sua Presença ser reduzida permanentemente em 1). Agora, ao fazer o experimento, você recupera 3d8+3 PV e, até o fim do dia, também se beneficia de um dos braços a seguir, conforme seu elemento. Sem fazer o experimento, o braço paranormal fica inutilizado.\n" +
        "Sangue: braço envolto por sangue, espinhos e lâminas. Você recebe +1 ponto em Força, +1d8 em testes de ataques corpo a corpo e o dano fornecido por Ser Testado muda para +1d8. Além disso, uma vez por rodada, quando ataca com outra arma, você pode gastar 1 PE para fazer um ataque desarmado com sua parte nova.\n" +
        "Morte: braço esquelético e pútrido, feito de uma aglomeração repulsiva de madeira podre, lodo, ossos e cinzas. Você recebe +1 ponto em Vigor e, quando toca em um item pela primeira vez com essa parte, pode gastar 3 PE e escolher entre envelhecê-lo ou interagir com o passado dele. Envelhecer: o item sofre 50 pontos de dano de Morte (tocar um item portado por alguém que resiste exige sucesso na manobra quebrar). Interagir com o passado: você tem uma visão nebulosa da última pessoa que pegou no item e o que ela fez enquanto estava com ele; dura 1 minuto.\n" +
        "Conhecimento: braço de ouro maldito, encravado por inúmeras escrituras antigas e Sigilos. Você recebe +1 ponto em Intelecto e pode gastar uma ação completa e 3 PE para tocar a sua cabeça ou a cabeça de outro ser com o braço (seres sem cabeça não sofrem esse efeito; tocar a cabeça de alguém que resiste exige sucesso em um teste de ataque corpo a corpo). Se tocou a própria cabeça, até o fim da cena você está sob efeito do ritual Detecção de Ameaças discente. Se tocou a cabeça de outro ser, o alvo fica sob efeito do ritual Mergulho Mental por 3 rodadas (você não precisa sustentar PE; o alvo não tem direito a teste de resistência; você não pode aumentar a duração; se perder o contato com a cabeça, o ritual acaba).\n" +
        "Energia: braço de prótese metálica energizada por cabos em sobrecarga e baterias vazadas. Você recebe +1 ponto em Agilidade e pode gastar uma ação de movimento e 2 PE para manipular a corporeidade do braço molécula por molécula até o fim da cena, permitindo, por exemplo, atravessar superfícies sólidas (em regras, sempre que fizer um teste e conseguir usar o braço dessa forma a seu favor criativamente, a critério do mestre, você recebe +5 nesse teste). Além disso, você pode gastar uma ação de interlúdio para acoplar um item de uma mão ao braço, podendo usá-lo sem manter a mão ocupada.",
        { efeitos: [man("Presença −1 permanente: ajuste na ficha")] }),
      H("esp.as7.monstruoso", 99, "Ser Apavorante", "completa",
        "Suas experimentações alcançaram o limite entre a humanidade e a monstruosidade, tornando seu corpo e o ambiente adequado para a entidade preenchê-lo (esse limite faz sua Presença ser reduzida permanentemente em 1 e a penalidade de −5 muda para −10 em Diplomacia, Enganação e Intuição). Agora, ao fazer o experimento, você recupera 4d8+4 PV e, até o fim do dia, também recebe os efeitos descritos a seguir, conforme seu elemento. Os efeitos de Ser Experimentado mudam para:\n" +
        "Sangue: você passa a ser considerado Enorme (+5 em manobras e −5 em Furtividade) e soma sua Força em testes baseados nesse atributo. Por fim, recebe +1 ponto em Força e aprende o ritual Vínculo de Sangue.\n" +
        "Morte: você recebe 4d6 PV temporários, duas ações padrão adicionais por cena e soma seu Vigor em testes baseados nesse atributo. Por fim, recebe +1 ponto em Vigor e aprende o ritual Distorção Temporal.\n" +
        "Conhecimento: escolha três perícias. Você é considerado expert nas perícias escolhidas e soma seu Intelecto em testes baseados nesse atributo. Por fim, recebe +1 ponto em Intelecto e aprende o ritual Controle Mental.\n" +
        "Energia: você pode, três vezes por rodada, sacar um item como ação livre (cumulativo com os de itens como bandoleira), todos os seus deslocamentos aumentam em 12m e você soma sua Agilidade em testes baseados nesse atributo. Por fim, recebe +1 ponto em Agilidade e aprende o ritual Teletransporte.",
        { efeitos: [man("Presença −1 permanente: ajuste na ficha")] }),
    ]);

  T("ocu.as7.monstruoso", "ocultista", "Monstruoso (Ocultista)", "as7", "85-88",
    "Para você, comunicar com a Realidade parece muito mais complexo do que conversar com o incompreensível: então você se envolveu com o Outro Lado, numa comunicação constante entre o seu corpo e uma entidade." + ESPECIAL_MONSTRUOSO, [
      H("ocu.as7.monstruoso", 10, "Ser Escarificado", "completa",
        "Você recebe +2 em Ocultismo. Escolha um elemento paranormal entre Sangue, Morte, Conhecimento ou Energia e sofra as consequências (−2 em Diplomacia, Enganação e Intuição). Uma vez por dia, você precisa eternizar símbolos em seu corpo (por exemplo, rasgar a pele com ossos humanos para Sangue, corroer a pele com Lodo para Morte, inserir na pele ouro com Sigilos para Conhecimento ou queimar a pele com eletricidade para Energia) e isso não se faz através de meras tatuagens, mas sim da escarificação, algo que leva tempo, cuidado e deve ser repetido diariamente. Fazer a escarificação custa uma ação completa. Se fizer isso, você recupera 1d4 PE e, até o fim do dia, recebe os efeitos descritos a seguir, conforme o elemento escolhido. Caso contrário, você sofre efeitos nesse dia similares a fome e sede (OPRPG, p. 292). Só é possível fazer uma escarificação por dia. Por fim, se adquirir afinidade com um elemento, deverá escolher aquele selecionado para esta habilidade.\n" +
        "Sangue: sua pele será a fundação da porta que você está construindo para o Sangue em seu corpo. Você passa a usar Força, em vez de Presença, para determinar seus PE e a DT dos seus rituais. Além disso, recebe +1 ponto em Força.\n" +
        "Morte: sua pele será a fundação da porta para a Morte. Você passa a usar Vigor, em vez de Presença, para determinar seus PE e a DT dos seus rituais. Além disso, recebe +1 ponto em Vigor.\n" +
        "Conhecimento: sua pele será a fundação da porta para o Conhecimento. Você passa a usar Intelecto, em vez de Presença, para determinar seus PE e a DT dos seus rituais. Além disso, recebe +1 ponto em Intelecto.\n" +
        "Energia: sua pele será a fundação da porta para a Energia. Você passa a usar Agilidade, em vez de Presença, para determinar seus PE e a DT dos seus rituais. Além disso, recebe +1 ponto em Agilidade.",
        { efeitos: [man("Elemento escolhido: PE e DT dos rituais usam outro atributo no lugar de Presença; +1 nesse atributo; −2 nas perícias sociais")] }),
      H("ocu.as7.monstruoso", 40, "Ser Perfurado", "completa",
        "Já parte de sua própria formação física, os símbolos ritualísticos se comunicam diretamente com as necessidades de seu corpo. Os símbolos agora clamam por permanecerem expostos e assim deverá ser, o que resulta em consequências (−2 muda para −5 em Diplomacia, Enganação e Intuição). Agora, ao fazer a escarificação, você recupera 1d6 PE e, até o fim do dia, também recebe os efeitos descritos a seguir, conforme seu elemento. Em todos os elementos você recebe o poder Tatuagem Ritualística (mas, diferente do normal, ele também se aplica a todos os rituais do elemento marcados em sua pele, não apenas aos de alcance pessoal que têm você como alvo; se já tiver o poder, troque-o por outro poder de ocultista), pode conjurar um ritual marcado em sua pele como reação uma vez por cena em certa condição e recebe +5 em testes de concentração com rituais do elemento marcados.\n" +
        "Sangue: condição para a reação: estar machucado ou sob efeito de uma condição de fadiga.\n" +
        "Morte: condição para a reação: estar morrendo ou sob efeito de uma condição de sentidos.\n" +
        "Conhecimento: condição para a reação: estar sob efeito de uma condição mental ou de medo.\n" +
        "Energia: condição para a reação: estar sob efeito de uma condição de paralisia ou de sentidos."),
      H("ocu.as7.monstruoso", 65, "Ser Rasgado", "completa",
        "Os símbolos precisam ir ainda mais fundo. Você consegue ouvir a entidade conversando com você, senti-la respirando como se fosse um organismo próprio se apossando cada vez mais do seu corpo. A entidade agora não só escuta suas súplicas e as de seu corpo, que vive dentro de você, respira através de você e te conhece melhor do que a sua própria mente (essa \"simbiose\" faz sua Presença ser reduzida permanentemente em 1). Agora, ao fazer a escarificação, você recupera 1d8 PE e, até o fim do dia, também recebe os efeitos descritos a seguir, conforme seu elemento.\n" +
        "Sangue: ao conjurar um ritual de Sangue, pode gastar uma ação de movimento e 2d8+2 PV para servir esse sangue a um aliado adjacente. Se o alvo aceitá-lo e ingeri-lo como reação, ele recebe +1 dado em testes baseados em Agilidade, Força e Vigor até o fim da cena. Além disso, a DT dos seus rituais de Sangue marcados na pele aumenta em +2.\n" +
        "Morte: você aprende o ritual Cicatrização. Se já o conhece, em vez disso, o custo para conjurá-lo diminui em −1 PE (cumulativo com outras fontes). Quando conjura um ritual de Morte diferente de Cicatrização, você pode conjurar Cicatrização como uma ação de movimento. Além disso, a DT dos seus rituais de Morte marcados na pele aumenta em +2.\n" +
        "Conhecimento: ao conjurar um ritual de Conhecimento, você pode gastar uma ação de movimento e 2 PE para obter revelações sobre o alvo do ritual (o mestre deve responder a 5 perguntas sobre a ficha, história e/ou personalidade do alvo com \"sim\" ou \"não\"). Se você mesmo for o alvo, em vez disso, torna-se capaz de ver coisas incorpóreas, invisíveis ou ocultas de outra forma pelo paranormal, até o fim da cena. Além disso, a DT dos seus rituais de Conhecimento marcados na pele aumenta em +2.\n" +
        "Energia: ao conjurar um ritual de Energia, você pode gastar uma ação de movimento e 3 PE para se teletransportar para um espaço desocupado a 3m de distância e receber bônus na Defesa igual ao número de PE gastos no ritual que conjurou. Esse bônus na Defesa dura por 1 rodada. Além disso, a DT dos seus rituais de Energia marcados na pele aumenta em +2.",
        { efeitos: [man("Presença −1 permanente: ajuste na ficha")] }),
      H("ocu.as7.monstruoso", 99, "Ser Mutilado", "completa",
        "As escarificações são tão profundas que os rituais marcados dispensam qualquer comunicação para serem conjurados, entrando em um estado de efeito frequente que só terminará com a morte de seu portador (essas feridas fazem sua Presença ser reduzida permanentemente em 1 e a penalidade de −5 muda para −10 em Diplomacia, Enganação e Intuição). Agora, ao fazer a escarificação, você recupera 1d12 PE e, até o fim do dia, também recebe os efeitos descritos a seguir, conforme seu elemento.\n" +
        "Sangue: você recebe +1 ponto em Força e pode conjurar rituais de Sangue marcados na pele sem a necessidade de fala, gestos e componentes. Além disso, aprende um ritual de Sangue de 4º círculo à sua escolha.\n" +
        "Morte: você recebe +1 ponto em Vigor e pode conjurar rituais de Morte marcados na pele sem a necessidade de fala, gestos e componentes. Além disso, aprende um ritual de Morte de 4º círculo à sua escolha.\n" +
        "Conhecimento: você recebe +1 ponto em Intelecto e pode conjurar rituais de Conhecimento marcados na pele sem a necessidade de fala, gestos e componentes. Além disso, aprende um ritual de Conhecimento de 4º círculo à sua escolha.\n" +
        "Energia: você recebe +1 ponto em Agilidade e pode conjurar rituais de Energia marcados na pele sem a necessidade de fala, gestos e componentes. Além disso, aprende um ritual de Energia de 4º círculo à sua escolha.",
        { efeitos: [man("Presença −1 permanente: ajuste na ficha")] }),
    ]);

  /* =================================================================
     ORIGENS (Arquivos Secretos + "fora dos livros")
     ================================================================= */
  const O = (id, nome, fonte, pagina, pericias, escolhas, poder, ativacao, custo, resumo, efeitos = [], extra = {}) => {
    ORIGENS_OP.push({ id, nome, fonte, pagina, pericias, escolhas, poder: { nome: poder, ativacao, custo, resumo }, ...extra });
    CAT.poderes.push({
      id: "ori." + id, classe: "origem", tipo: "origem", nome: poder, fonte, pagina: String(pagina || ""),
      ativacao, custo, resumo, efeitos, ...(extra.limite ? { limite: extra.limite } : {}),
    });
    EXTRAS_OP_IDS.poderes.push("ori." + id);
  };

  /* AS 1 */
  O("feridoritual", "Ferido por Ritual", "as1", 43, ["Ocultismo"], 1, "Mácula Ritualística", "especial", "",
    "Você sofreu os efeitos paranormais de um ritual (Sangue, Morte, Conhecimento ou Energia). Perícias: Ocultismo e 1 perícia definida pelo elemento do ritual (Fortitude para Sangue, Vontade para Morte e Conhecimento ou Reflexos para Energia). A entidade marcou você com um ritual de 1º círculo à sua escolha do elemento correspondente. Você aprende a conjurar o ritual. Além disso, uma vez por cena, pode conjurá-lo sem gastar PE (mas ainda precisa gastar PE para qualquer efeito adicional, como formas avançadas). Esse ritual não conta no seu limite de rituais conhecidos. Em contrapartida, sofre −1 dado em testes de resistência contra efeitos (como rituais ou poderes paranormais) desse elemento.",
    [man("Escolha o ritual de 1º círculo no grimório (não conta no limite). −1 dado em resistência contra esse elemento")],
    { limite: "1 vez por cena", dicaEscolha: "a perícia do elemento do ritual: Fortitude (Sangue), Vontade (Morte ou Conhecimento) ou Reflexos (Energia)" });
  O("transtornadoarrependido", "Transtornado Arrependido", "as1", 43, ["Luta", "Ocultismo"], 0, "Sofrimento de Sangue", "passiva", "",
    "Eles podem tentar… mas já não dói mais. Você recebe RD 2/mental. Para cada dois rituais de Sangue ou poderes paranormais de Sangue que possua, a RD aumenta em +1. Contudo, a lembrança das desgraças que você viveu causa pesadelos horríveis, que o impedem de repousar tranquilamente. Sua condição de descanso é sempre uma categoria pior (luxuosa se torna confortável, confortável se torna normal e normal se torna precária).",
    [man("RD 2/mental (+1 a cada 2 rituais/poderes de Sangue): anote na ficha")]);
  /* AS 4 */
  O("influencer", "Influencer Paranormal", "as4", 64, ["Enganação", "Tecnologia"], 0, "Registrar o Paranormal", "padrao", "2 PE",
    "Uma vez por cena, você pode gastar uma ação padrão e 2 PE para criar um registro de uma criatura paranormal ou ritual que tenha sido conjurado na mesma cena (a ação padrão deve ser gasta para tirar uma foto, fazer um vídeo ou algum tipo de registro). Uma vez por cena, você pode gastar uma ação de interlúdio e um dos registros de criatura para receber +5 em testes de identificar criatura e presença perturbadora envolvendo a criatura fotografada até o início da próxima cena de interlúdio. Alternativamente, uma vez por cena, você pode gastar uma ação de interlúdio e um dos registros de ritual para memorizar o ritual presente no registro, podendo conjurá-lo como se o conhecesse até o início de sua próxima cena de interlúdio, desde que tenha o NEX necessário (1º círculo a partir do NEX 5%, 2º círculo a partir do NEX 45% e 3º círculo a partir do NEX 75%); você também recebe +5 em testes para identificar o ritual. Esse ritual não conta no seu limite de rituais conhecidos.",
    [], { limite: "1 vez por cena" });
  O("cacadorrecompensas", "Caçador de Recompensas", "as4", 64, ["Crime", "Investigação"], 0, "Quem Não Arrisca, Não Petisca", "passiva", "",
    "Você recebe +2 em testes para resistir a condições mentais e de medo. Além disso, quando falha em algum desses testes, você recebe +1d20 no próximo teste que realizar até o fim da cena (não cumulativo com ele mesmo).");
  /* AS 5 */
  O("utologo", "Utólogo", "as5", 54, ["Ciências", "Ocultismo"], 0, "Minha Teoria Absurda", "interludio", "",
    "Uma vez por cena de interlúdio, você pode gastar uma ação para apresentar ao seu grupo sua tese sobre as prováveis respostas da investigação com a qual estão lidando. Isso deve ser feito antes de terem todas as respostas. A critério do mestre, se suas teorias forem boas (não necessariamente corretas), você recebe 1d4+1 PE temporários que duram até serem gastos. Se, quando a missão acabar, uma de suas teorias se provar correta, você recebe +1 PE máximo e atual.",
    [], { limite: "1 vez por cena de interlúdio" });
  O("funcionariobeira", "Funcionário de Beira de Estrada", "as5", 54, ["Fortitude", "Intuição"], 0, "Turno Invertido", "especial", "",
    "Uma vez por missão, durante uma cena de interlúdio, você pode receber os benefícios da ação dormir sem precisar realizá-la. Além disso, recebe +2 em testes contra qualquer efeito que tente te deixar inconsciente.",
    [], { limite: "1 vez por missão" });
  /* AS 6 */
  O("cientistapanacea", "Cientista Ex-Panacea", "as6", 66, ["Atualidades", "Ciências"], 0, "Existe uma Explicação", "livre", "2 PE",
    "Acostumado a ver o paranormal como um assunto científico, você prefere lidar com o sobrenatural através de teorias, cálculos e testes experimentais. Quando faz um teste de Ocultismo, você pode gastar 2 PE para usar Ciências no lugar dessa perícia.");
  O("cobaiasobrevivente", "Cobaia Sobrevivente", "as6", 66, ["Fortitude", "Vontade"], 0, "Forças para Enfrentar", "livre", "2 PE",
    "Ser uma cobaia por anos marcou você com experiências horríveis, mas que, às vezes, podem ser usadas como força para continuar sobrevivendo. Descreva para o mestre a parte mais traumática da sua história como cobaia. Quando estiver em uma cena em que há algo relacionado a esse trauma, a critério do mestre, você fica abalado. Entretanto, quando isso acontecer, você pode gastar 2 PE para, até o fim da cena, receber imunidade a efeitos de medo (se aplica também ao abalado desta habilidade).");
  O("segurancapanacea", "Segurança Ex-Panacea", "as6", 66, ["Luta", "Pontaria"], 0, "Técnicas de Contenção", "livre", "2 PE",
    "Você domina técnicas de luta para conter pessoas que podem causar problemas. Quando faz uma manobra de combate, você pode gastar 2 PE para receber +5 no teste de manobra.");
  /* AS 7 */
  O("exorcizado", "Exorcizado", "as7", 80, ["Fortitude", "Ocultismo"], 0, "O Que Restou", "passiva", "",
    "Uma parte da criatura paranormal que o possuiu continua dentro de você. Escolha um elemento (exceto Medo). Você recebe RD 10 contra o tipo do elemento escolhido. Entretanto, sempre que entrar em contato com esse elemento pela primeira vez em uma cena (seja ao presenciar rituais, itens amaldiçoados, criaturas ou poderes paranormais), você perde 3 SAN.",
    [man("RD 10 contra o elemento escolhido: anote na ficha")]);
  O("sensitivorebelde", "Sensitivo Rebelde", "as7", 80, ["Intuição", "Vontade"], 0, "Sussurros e Vultos", "livre", "2 SAN",
    "Ao lidar com outras pessoas, inesperadamente surgem vozes e vultos na sua cabeça que, por mais assustadoras que sejam, ajudam a compreendê-las. Quando faz um teste de Diplomacia, Enganação, Intimidação ou Intuição, você pode escolher perder 2 SAN para receber +5 nesse teste.");
  /* AS 9 */
  O("hellhunters", "Treinado pela Hell Hunters", "as9", 38, [], 2, "Treinamento com Arsenal", "passiva", "",
    "Você foi treinado pela organização Hell Hunters no combate contra o paranormal. Perícias: escolha entre Luta e Fortitude ou Pontaria e Reflexos. Você está pronto para usar equipamento de combate. Você recebe proficiência com armas táticas e proteções leves. Se for proficiente com armas táticas, recebe proficiência com armas pesadas. Se já for proficiente com proteções leves, recebe proficiência com proteções pesadas.",
    [man("Proficiências: ajuste na ficha")], { dicaEscolha: "uma destas duplas: Luta e Fortitude, ou Pontaria e Reflexos" });
  O("veteranoconflito", "Veterano de Conflito Armado", "as9", 38, ["Luta", "Pontaria"], 0, "Full Metal Jacket", "livre", "2 PE",
    "Independentemente da humanidade em seu interior, por fora, você tem um metafórico invólucro duro como metal — nada vai te impedir de continuar socando ou apertando o gatilho. Quando faz um teste de Luta ou Pontaria com uma ou mais penalidades, você pode gastar 2 PE para ignorar uma das penalidades nesse teste.");
  /* Origens fora dos livros */
  O("cientistaforense", "Cientista Forense", "fora", "", ["Ciências", "Investigação"], 0, "Investigação Científica", "livre", "",
    "Uma vez por cena de investigação, você pode gastar uma ação livre para procurar pistas, usando Ciências no lugar da perícia que seria usada para tentar encontrar a pista em questão.",
    [], { limite: "1 vez por cena de investigação" });
  O("duble", "Dublê", "fora", "", ["Pilotagem", "Reflexos"], 0, "Destemido", "passiva", "",
    "Quando faz um teste de perícia para o qual uma falha terá como consequência direta dano ou uma condição negativa, você recebe +5 nesse teste.");
  O("escritor", "Escritor", "fora", "", ["Artes", "Atualidades"], 0, "Bagagem de Leitura", "livre", "2 PE",
    "Por seu trabalho, você já leu — e aprendeu — de tudo um pouco. Uma vez por cena, pode gastar 2 PE para se tornar treinado em uma perícia qualquer até o fim da cena.",
    [], { limite: "1 vez por cena" });
  O("gauderioabutre", "Gaudério Abutre", "fora", "", ["Luta", "Pilotagem"], 0, "Fraternidade Gaudéria", "livre", "1 PE",
    "Uma vez por rodada, quando um aliado adjacente é alvo de um ataque ou efeito, você pode gastar 1 PE para trocar de lugar com este aliado e se tornar o alvo deste ataque ou efeito. Se fizer isso, em seu próximo turno você recebe +2 em testes de ataque contra o agressor.",
    [], { limite: "1 vez por rodada" });
  O("ginasta", "Ginasta", "fora", "", ["Acrobacia", "Reflexos"], 0, "Mobilidade Acrobática", "passiva", "",
    "Você recebe +2 na Defesa e seu deslocamento aumenta em +3m.",
    [man("+2 na Defesa e +3m de deslocamento: some na ficha")]);
  O("jornalista", "Jornalista", "fora", "", ["Atualidades", "Investigação"], 0, "Fontes Confiáveis", "livre", "1 PE",
    "Uma vez por sessão de jogo, você pode gastar 1 PE para contatar suas fontes — pessoas com acesso a informações nas quais você confia. Isso permite que você role novamente um teste já realizado para encontrar uma pista, com +5 de bônus, ou receba outra informação relevante (a critério do mestre).",
    [], { limite: "1 vez por sessão" });
  O("professor", "Professor", "fora", "", ["Ciências", "Intuição"], 0, "Aula de Campo", "padrao", "2 PE",
    "Você sabe extrair o melhor das pessoas. Uma vez por cena, pode gastar uma ação padrão e 2 PE para fornecer +1 em um atributo de outro personagem em alcance curto até o fim da cena.",
    [], { limite: "1 vez por cena" });
  O("revoltado", "Revoltado", "fora", "", ["Furtividade", "Vontade"], 0, "Antes Só", "passiva", "",
    "Você recebe +1 na Defesa, em testes de perícias e em seu limite de PE por turno se estiver sem nenhum aliado em alcance curto.");
})();

/* =====================================================================
   Quem já tem um conjunto de regras personalizado salvo (editor de regras)
   não via o conteúdo novo: aqui o que falta é acrescentado na hora.
   ===================================================================== */
(function () {
  const jaMesclados = new WeakSet();
  const original = typeof obterCatalogoOP === "function" ? obterCatalogoOP : null;
  if (!original) return;
  obterCatalogoOP = function () {
    const c = original();
    if (c === CATALOGO_OP_PADRAO || jaMesclados.has(c)) return c;
    jaMesclados.add(c);
    c.fontes = { ...CATALOGO_OP_PADRAO.fontes, ...(c.fontes || {}) };
    const idsT = new Set((c.trilhas || []).map((t) => t.id));
    const idsP = new Set((c.poderes || []).map((p) => p.id));
    CATALOGO_OP_PADRAO.trilhas.forEach((t) => { if (EXTRAS_OP_IDS.trilhas.includes(t.id) && !idsT.has(t.id)) c.trilhas.push(t); });
    CATALOGO_OP_PADRAO.poderes.forEach((p) => { if (EXTRAS_OP_IDS.poderes.includes(p.id) && !idsP.has(p.id)) c.poderes.push(p); });
    return c;
  };
})();
