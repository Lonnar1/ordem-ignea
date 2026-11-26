/* =====================================================================
   Catálogo: itens, armas, vestimentas, modificações e maldições dos
   Arquivos Secretos 2 (v1.1, já com a errata), 6 e 7.
   Entra no mesmo catálogo editável de equipamentos-op.js.
   Carregar DEPOIS de itens-op.js.
   ===================================================================== */
(function () {
  const E = EQUIP_OP_PADRAO;
  E.itens = E.itens || [];
  E.mods = E.mods || [];
  E.maldicoes = E.maldicoes || [];
  E.armas = E.armas || [];
  E.protecoes = E.protecoes || [];

  const AS2 = "Arquivos Secretos 2", AS6 = "Arquivos Secretos 6", AS7 = "Arquivos Secretos 7";

  const I = (id, grupo, nome, cat, esp, desc, fonte, pagina, extra = {}) =>
    E.itens.push({ id: "eq.item." + id, grupo, nome, categoria: cat, espacos: esp, desc, fonte, pagina: String(pagina), ...extra });
  const V = (id, grupo, nome, cat, esp, desc, fonte, pagina, extra = {}) =>
    E.protecoes.push({ id: "eq.vest." + id, grupo, nome, ca: "", categoria: cat, espacos: esp, resistencias: "", penalidades: "", requisitos: "", desc, fonte, pagina: String(pagina), ...extra });
  const W = (id, grupo, nome, cat, dano, crit, mult, alc, tipo, esp, per, atr, desc, fonte, pagina) =>
    E.armas.push({ id: "eq.arma." + id, grupo, nome, categoria: cat, dano, critico: String(crit), multiplicador: String(mult), alcance: alc, tipoDano: tipo, espacos: esp, pericia: per, atributoDano: atr, desc, fonte, pagina: String(pagina) });
  const M = (id, aplica, grupo, nome, efeito, fonte, pagina, extra = {}) =>
    E.mods.push({ id: "eq.mod." + id, aplica, grupo, nome, efeito, fonte, pagina: String(pagina), ...extra });
  const MA = (id, aplica, el, nome, efeito, fonte, pagina) =>
    E.maldicoes.push({ id: "eq.mald." + id, aplica, grupo: `Maldições de ${el}`, nome, efeito, elemento: el, fonte, pagina: String(pagina) });

  /* =================================================================
     AS 2 · HEXATOMBE: ARMAS E VESTIMENTA AMALDIÇOADAS
     ================================================================= */
  W("as2mutilador", "Amaldiçoadas · Sangue", "Machado do Mutilador", "IV", "1d8 + 1d8 Sangue", 20, 3, "Corpo a corpo", "Corte", 1, "Luta", "Força",
    "Arma com cabo de madeira e lâmina vermelha. Arma tática corpo a corpo de uma mão: 1d8 de corte mais 1d8 de Sangue (multiplicados em crítico), crítico 20/x3. Quando atinge uma vítima, você pode gastar 1 PE para deixá-la sangrando; o efeito é cumulativo, e ela pode ficar sangrando várias vezes ao mesmo tempo (perde 1d6 PV por sangramento).", AS2, 41);

  V("as2elmocolosso", "Amaldiçoadas · Energia", "Elmo do Colosso", "III", 3,
    "Elmo de escafandro trabalhado em metal e imbuído com uma forte pressão eletrostática de Energia. É uma vestimenta que fornece resistência a dano 10. Se usado em conjunto com o resto do equipamento de escafandro, conta como um traje de mergulho (SaH, p. 44).", AS2, 47,
    { resistencias: "Dano 10" });

  W("as2manoplas", "Amaldiçoadas · Energia", "Manoplas do Colosso", "IV", "1d8 + 1d10 Energia", 20, 3, "Corpo a corpo", "Impacto", 3, "Luta", "Força",
    "Par de manoplas de metal imbuídas com uma violenta onda de Energia. Cada Manopla é uma arma tática corpo a corpo e de uma mão, mas elas só funcionam se usadas em par. Cada uma causa 1d8 de dano de impacto mais 1d10 de dano de Energia e tem crítico 20/x3. As regras e efeitos de ataque desarmado se aplicam às Manoplas, assim como efeitos que mencionem objetos ou armas.", AS2, 47);

  W("as2punhalx", "Amaldiçoadas · Conhecimento", "Punhal X", "IV", "1d4 + 1d6 Conhecimento", 19, 3, "Corpo a corpo ou curto (arremesso)", "Perfuração", 1, "Luta", "Agilidade",
    "Grande faca de cabo sombrio e guarda dourada. Arma simples corpo a corpo, de uma mão e ágil, que pode ser arremessada em alcance curto. Ao atacar, você pode gastar 2 PE para deixar o alvo desprevenido contra o ataque e, se acertar, ele fica cego por 1 rodada. Um mesmo alvo só pode ficar cego por esta arma uma vez por cena.", AS2, 53);

  W("as2sniper", "Amaldiçoadas · Morte", "Sniper Fantasma", "IV", "2d10 + 3d4 Morte", 19, 3, "Longo", "Balístico", 2, "Pontaria", "",
    "Fuzil de precisão sombrio enrolado em bandagens amaldiçoadas. Arma de fogo tática, de duas mãos e alcance longo. Se você for veterano em Pontaria e mirar com esta arma (OPRPG, p. 87), recebe +5 na margem de ameaça do ataque. Um ser reduzido a 0 PV por dano desta arma morre se iniciar 2 turnos morrendo (em vez de 3).", AS2, 59);

  W("as2antena", "Amaldiçoadas · Sem elemento", "A Antena", "IV", "1d6", 20, 2, "Corpo a corpo", "Impacto", 2, "Luta", "Força",
    "Antena parabólica encaixada na ponta de um bastão de ferro; transmite medo primal. Arma simples corpo a corpo, de duas mãos, que conta como arma improvisada (–1d20 em testes de ataque). Nas mãos de um conjurador de rituais: a DT dos seus rituais aumenta em +3. Você pode conjurar um ritual n'A Antena; ele não faz efeito na hora e fica contido nela. Gaste uma ação padrão para libertá-lo e gerar o efeito (sem ações de conjuração nem PE). Só contém um ritual por vez.", AS2, 67);

  W("as2facapredadora", "Amaldiçoadas · Sangue", "Faca Predadora", "IV", "1d4 + 2d10 Sangue", 19, 3, "Corpo a corpo ou curto (arremesso)", "Perfuração", 1, "Luta", "Agilidade",
    "Faca de cabo escuro com várias ondas na lâmina. Arma simples corpo a corpo, de uma mão e ágil, que pode ser arremessada em alcance curto. Ao atacar, você pode gastar 2 PE: se acertar, recupera 2d10 PV. Qualquer PV recuperado acima do seu máximo vira PV temporário.", AS2, 93);

  /* =================================================================
     AS 2 · ITEM PARANORMAL
     ================================================================= */
  I("as2catalisadorsof", "Itens paranormais", "Catalisador Sofisticado e Horrorizado", "III", 1,
    "Catalisador ritualístico (SaH, p. 44) horrorizado pelo Outro Lado. Pode ser usado como vestimenta semelhante a uma bijuteria ou acessório, sem precisar ser empunhado, e não é consumido. Uma vez por cena, você recebe 3d6. Como ação livre, pode gastar 1d6 para: aumentar o dano de um ritual em +1d6; aumentar a recuperação de PV de um ritual em +1d6; ou aumentar a DT de um ritual em +1d6. Só pode gastar 1d6 no mesmo ritual, e só ao conjurá-lo. No fim da cena, os d6 não gastos se perdem.", AS2, 75);

  /* =================================================================
     AS 2 · RECURSOS DO HEXATOMBE (água, comida, sucata e novos itens)
     ================================================================= */
  const RC = "Recursos (Hexatombe)";
  I("as2agua", RC, "Água (recurso)", "0", 1, "1 unidade de água. Cada participante precisa consumir ao menos 1 unidade por dia; se não fizer isso, seus PV máximos são reduzidos em 10 no dia seguinte. Recuperar esses PV máximos exige consumir 1 unidade de água a mais ao final do dia seguinte.", AS2, 20);
  I("as2comida", RC, "Comida (recurso)", "0", 1, "1 unidade de comida. Como a água, mas se não for consumida no dia, os PE máximos diminuem em 10.", AS2, 20);
  I("as2sucata", RC, "Sucata", "0", 1, "Termo genérico para tábuas de madeira, chapas de metal, pregos, arames, motores, galões de gasolina, baterias e outros objetos usados em melhorias na base.", AS2, 20);
  I("as2bandagem", RC, "Bandagem", "I", 0.5, "Tecido eficiente para estancar sangramentos. Ação padrão e este item: cura 2d4+2 PV e remove a condição sangrando em você ou em um ser adjacente.", AS2, 21);
  I("as2bussola", RC, "Bússola", "I", 1, "Instrumento de navegação. Utensílio que fornece +5 em Sobrevivência para se guiar e não se perder.", AS2, 21);
  I("as2caixaferr", RC, "Caixa de Ferramentas", "I", 2, "Caixa metálica com ferramentas mecânicas. Utensílio que fornece +5 em Profissão, desde que faça sentido o teste ser auxiliado por essas ferramentas.", AS2, 21);
  I("as2doseacool", RC, "Dose de Álcool", "I", 0.5, "Substância antisséptica útil para limpar feridas ou causar incêndios. Ação padrão e este item: +2 em testes contra infecções e doenças transmitidas por contato. Junto com uma bandagem, aumenta a cura da bandagem para 2d8+2 PV. Pega fogo facilmente, mas não o bastante para causar explosões.", AS2, 21);
  I("as2incenso", RC, "Incenso", "I", 0.5, "Substância aromática queimada em rituais religiosos, meditação ou purificação. Ação de interlúdio para queimar: todos os personagens na mesma cena de interlúdio recuperam 1d4 PE. Só dá para se beneficiar uma vez por dia.", AS2, 21);
  I("as2kitescalada", RC, "Kit de Escalada", "I", 2, "Corda dinâmica e equipamentos de segurança (sapatilhas, cadeirinha, capacete, freio, mosquetões, fitas, magnésio). Utensílio que fornece +5 em Atletismo para escalar.", AS2, 21);
  I("as2pedraamolar", RC, "Pedra de Amolar", "I", 0.5, "Ferramenta abrasiva usada para restaurar o fio de lâminas. Ação de interlúdio para amolar uma arma corpo a corpo de corte ou perfuração: a arma causa +1d4 de dano do mesmo tipo na primeira cena em que for usada depois de amolada.", AS2, 21);

  /* =================================================================
     AS 2 · MODIFICAÇÃO E HABILIDADE DE ARMA
     ================================================================= */
  M("as2encaixe", "arma", "Modificações de armas", "Encaixe",
    "O cabo da arma é modificado para permitir ser acoplado a outra arma que tenha a mesma modificação. A arma se torna acoplável. Só pode ser aplicada em armas corpo a corpo de uma mão, leves, simples e táticas.", AS2, 71);
  M("as2acoplavel", "arma", "Modificações de armas", "Acoplável (habilidade de arma)",
    "Arma acoplável é a fusão de duas armas de uma mão que, unidas com uma ação de movimento, viram uma arma de duas mãos (outra ação de movimento para desacoplar). Unida, é considerada arma tática. As formas separadas contam como uma única arma: a cada ataque, defina com qual ponta atacar (e quais modificações e maldições valem). Acoplada: muda para duas mãos; o dano é o da arma separada +1 dado do mesmo tipo; a margem ou o multiplicador de crítico aumenta em +1 (escolha ao receber a habilidade); os espaços dobram; pode ser usada com Combater com Duas Armas (e similares), como arma de uma mão e uma leve.", AS2, 71,
    { cat: 0 });

  /* =================================================================
     AS 6 · ITENS, MODIFICAÇÕES E MALDIÇÕES DE MEDICAMENTOS
     ================================================================= */
  I("as6anelinvertido", "Amaldiçoados · Morte", "Anel Invertido", "II", 0.5,
    "Anel de aparência sinistra que parece querer se prender ao dedo e torná-lo mais forte para observá-lo sofrer por mais tempo. Se estiver usando o anel, quando sofrer dano causado por um nidere, você pode gastar uma reação e 2 PE para receber RD 4d10 contra esse dano.", AS6, 73, { elemento: "Morte" });

  W("as6lancanitro", "Armas especiais (AS 6)", "Lança-nitrogênio", "III", "6d6", 20, 2, "Curto", "Frio", 2, "Pontaria", "",
    "Equipamento das Indústrias Panacea que esguicha nitrogênio líquido. Arma de fogo pesada, de duas mãos, alcance curto. Atinge todos os seres em uma linha de 1,5m de largura até o alcance curto: faça um único teste de ataque e compare com a Defesa de todos na área. Além do dano, os atingidos ficam enredados pelo congelamento até gastarem uma ação padrão para quebrar o gelo (Fortitude DT Agi muda para lento). Usa combustível (OPRPG, p. 59) como munição, como um lança-chamas.", AS6, 73);

  I("as6adrenalina", "Itens operacionais", "Aplicador de Adrenalina", "I", 1,
    "Caneta aplicadora pronta para injetar epinefrina. Ação padrão e este item para injetar em você ou em um ser adjacente: 2d8+2 PV temporários, +3m de deslocamento e +2 em testes baseados em Força, Agilidade e Vigor até o fim da cena. Quando o efeito acaba, o ser sofre rebote (fica fatigado por uma cena). Conta como medicamento (SaH, p. 43).", AS6, 73);

  M("as6emulsificante", "medicamento", "Modificações de medicamentos", "Emulsificante Químico",
    "Aumenta a categoria do medicamento em I. O medicamento tem um efeito adicional: ao aplicar esta modificação, escolha um efeito de outro medicamento de categoria igual ou menor (exceto itens amaldiçoados) que se ativa junto com o efeito principal. O efeito adicional deve ser diferente do principal. Modificações iguais não se acumulam.", AS6, 74, { cat: 1 });
  M("as6potencializador", "medicamento", "Modificações de medicamentos", "Potencializador Químico",
    "Aumenta a categoria do medicamento em I. Escolha uma opção: se o medicamento dá bônus em testes, o bônus aumenta em +5; se dá PV temporários, +2d8 PV temporários; se recupera PV, +2d8 PV; se só funciona uma vez por cena, passa a funcionar duas vezes por cena. Modificações iguais não se acumulam.", AS6, 74, { cat: 1 });

  MA("as6aceleracao", "medicamento", "Morte", "Aceleração Espiral",
    "Além dos efeitos normais do medicamento, você pode gastar 3 PE para fazer uma única ação padrão adicional (não pode conjurar rituais). O efeito termina quando você faz a ação ou quando a cena acaba. Ao usar o item, faça um teste de Fortitude (DT 20): se falhar, um órgão envelhece mais do que devia e você perde 2d8 PV.", AS6, 74);
  MA("as6esforco", "medicamento", "Morte", "Esforço Espiral",
    "Além dos efeitos normais do medicamento, você recupera 1d8+1 PE. Ao usar o item, faça um teste de Fortitude (DT 20): se falhar, você envelhece 1 ano e fica frustrado até o fim da cena.", AS6, 74);

  /* =================================================================
     AS 7 · ITENS
     ================================================================= */
  I("as7carranca", "Itens paranormais", "Carranca Caçadora", "I", 2,
    "Cabeça raivosa de proporções animalescas esculpida em tronco de madeira, com olhos que parecem se mover. Ao colocar na boca da carranca um material ligado a uma criatura paranormal (roupa rasgada por zumbi de sangue, cabelo sujo pelo Lodo de um esqueleto etc.), os olhos apontam o caminho até a criatura ou o último lugar em que ela esteve antes de sumir da Realidade. O caminho guiado é sempre o mais perigoso. O efeito dura 10 minutos; depois a carranca consome o material e nunca mais serve para localizar a mesma criatura (mas pode ser usada com outras).", AS7, 78);
  W("as7cajado", "Amaldiçoadas · Sangue", "Cajado da Cruz de Sangue", "III", "1d12", 20, 2, "Corpo a corpo", "Corte", 2, "Luta", "Agilidade",
    "Cajado ancestral, pesado, forjado com metal extraído de sangue humano; em uma ponta, lâminas formam a cruz de Sangue. Arma simples corpo a corpo, de duas mãos e ágil; pode ser usada com Combater com Duas Armas (e poderes similares) como se fosse uma arma de uma mão e uma leve. Se você for ocultista e conhecer pelo menos um ritual de Sangue: o custo em PE de rituais e poderes de Sangue diminui em –1; as DT de rituais e poderes de Sangue aumentam em +1; e o dano de rituais e poderes de Sangue aumenta em +1 dado do mesmo tipo.", AS7, 78);
  I("as7pecoelho", "Itens paranormais", "Pé de Coelho", "I", 1,
    "Pata decepada de um pequeno animal, companhia de sorte e proteção para trapaceiros, ao custo do sangue inocente derramado. Deve ser vestido como uma vestimenta. Uma vez por cena, ação de movimento para esfregar a pata e soprá-la: até o fim da cena você recebe +1d4 em todos os seus testes. Se o resultado do d4 for ímpar, acontece um acidente com seu pé e você perde 1d4 PV.", AS7, 79);
  I("as7saldourado", "Itens paranormais", "Sal Dourado", "I", 1,
    "Sal produzido com ouro usado em rituais de Conhecimento, receita usada por agentes da Ordo Realitas contra criaturas de Energia. Colocado em linha numa porta ou janela (3 usos esvaziam o saleiro) ou formando um círculo (1 uso esvazia o saleiro). Criatura de Energia com VD 80 ou menos que tente cruzar o sal faz um teste de Vontade (DT 20): se passar, fica fatigada até o fim da cena, mas cruza normalmente; se falhar, fica enjoada e não atravessa o sal até o fim da cena.", AS7, 79);
  I("as7tercomaculado", "Amaldiçoados · Sangue", "Terço Maculado", "II", 1,
    "Símbolo religioso corrompido, com contas rubras afiadas como espinhos e corrente de ferro dourado. Deve ser vestido como uma vestimenta. Ao vesti-lo você herda uma súplica reprimida do usuário original, definida pelo mestre. Sempre que agir a favor dessa súplica e a ação envolver um teste, recebe +2d10 nele. Depois de vestido, não dá mais para remover enquanto estiver vivo: ao tentar, falha automaticamente e perde 2d10 PV. Agir diretamente contra a súplica, a critério do mestre, também custa 2d10 PV. Só sai se outra pessoa decepar a parte do corpo onde está, ou se a súplica for cumprida (o terço vira um item mundano).", AS7, 79, { elemento: "Sangue" });
})();
