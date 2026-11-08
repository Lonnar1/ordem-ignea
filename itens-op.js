/* =====================================================================
   Catálogo de ITENS, VESTIMENTAS especiais, MALDIÇÕES e itens amaldiçoados.
   Fontes: Livro de Regras v1.3 (cap. 3 e itens amaldiçoados, p. 63-67 e
   144-151), Sobrevivendo ao Horror v1.3-1 (p. 37-45 e 57-62) e
   Arquivos Secretos 3, 4, 5 e 9.
   Entra no mesmo catálogo editável de equipamentos-op.js.
   ===================================================================== */
(function () {
  const E = EQUIP_OP_PADRAO;
  E.itens = E.itens || [];
  E.rituais = E.rituais || [];
  E.maldicoes = E.maldicoes || [];

  const LIV = "Livro de Regras", SAH = "Sobrevivendo ao Horror";
  const AS3 = "Arquivos Secretos 3", AS4 = "Arquivos Secretos 4", AS5 = "Arquivos Secretos 5", AS9 = "Arquivos Secretos 9";

  /* item da mochila */
  const I = (id, grupo, nome, cat, esp, desc, fonte, pagina, extra = {}) =>
    E.itens.push({ id: "eq.item." + id, grupo, nome, categoria: cat, espacos: esp, desc, fonte, pagina: String(pagina), ...extra });

  /* vestimenta / proteção especial (vai para o catálogo de vestimentas) */
  const V = (id, grupo, nome, cat, esp, desc, fonte, pagina, extra = {}) =>
    E.protecoes.push({ id: "eq.vest." + id, grupo, nome, ca: "", categoria: cat, espacos: esp, resistencias: "", penalidades: "", requisitos: "", desc, fonte, pagina: String(pagina), ...extra });

  /* arma especial */
  const W = (id, grupo, nome, cat, dano, crit, mult, alc, tipo, esp, per, atr, desc, fonte, pagina) =>
    E.armas.push({ id: "eq.arma." + id, grupo, nome, categoria: cat, dano, critico: String(crit), multiplicador: String(mult), alcance: alc, tipoDano: tipo, espacos: esp, pericia: per, atributoDano: atr, desc, fonte, pagina: String(pagina) });

  /* modificação / maldição */
  const M = (id, aplica, grupo, nome, efeito, fonte, pagina, extra = {}) =>
    E.mods.push({ id: "eq.mod." + id, aplica, grupo, nome, efeito, fonte, pagina: String(pagina), ...extra });

  /* =================================================================
     ACESSÓRIOS
     ================================================================= */
  const AC = "Acessórios";
  I("kitpericia", AC, "Kit de perícia", "0", 1, "Conjunto de ferramentas necessárias para algumas perícias ou usos de perícias. Sem o kit, você sofre -5 no teste. Existe um kit para cada perícia que exige este item.", LIV, 63);
  I("utensilio", AC, "Utensílio", "I", 1, "Item comum com utilidade específica (canivete, lupa, smartphone, notebook). Fornece +2 em uma perícia (exceto Luta e Pontaria). Sempre ocupa 1 espaço e precisa ser empunhado para o bônus valer. O mestre aprova o utensílio.", LIV, 63);
  I("vestimentaacess", AC, "Vestimenta (acessório)", "I", 1, "Peça de vestuário que fornece +2 em uma perícia (exceto Luta e Pontaria), como botas militares (Atletismo), terno elegante (Diplomacia) ou manto com glifos (Ocultismo). Você recebe os bônus de no máximo duas vestimentas ao mesmo tempo. Vestir ou despir é uma ação completa.", LIV, 63);
  I("amuleto", AC, "Amuleto sagrado", "0", 1, "Utensílio especial (shimenawa, rosário, fio de contas...) que reforça a fé. Fornece +2 em Religião e Vontade.", SAH, 39);
  I("celular", AC, "Celular", "0", 1, "Utensílio especial: tira fotos, grava áudio e vídeo, acessa a internet. Com internet, +2 em testes de perícia que envolvam adquirir informações. Lanterna fraca que ilumina um cone de 4,5m.", SAH, 39);
  I("chavefenda", AC, "Chave de fenda universal", "0", 1, "Ferramenta que resolve quase qualquer problema. +2 em testes para criar ou reparar objetos. Também dá o bônus como item de apoio em situações especiais, como lidar com cabos para hackear.", SAH, 39);
  I("chaves", AC, "Chaves", "0", 1, "Molhos de chaves são itens comuns. Usar o barulho para distrair alguém (jogando as chaves) dá +2 em Furtividade na mesma rodada.", SAH, 39);
  I("docsfalsos", AC, "Documentos falsos", "I", 1, "Identidade funcional, habilitação, cartões etc. em nome de uma identidade falsa. +2 em Diplomacia, Enganação e Intimidação para se passar pela pessoa representada.", SAH, 39);
  I("manualop", AC, "Manual operacional", "I", 1, "Livro com lições práticas sobre um assunto (um para cada perícia). Gastar uma ação de interlúdio lendo permite usar a perícia como se fosse treinado até o próximo interlúdio. Manual aprimorado dá também +5. Só um manual por vez.", SAH, 39);
  I("notebook", AC, "Notebook", "0", 2, "Utensílio especial. Com internet, +2 em testes que envolvam adquirir informações. Ao relaxar em interlúdio, recupera 1 SAN adicional. A luz do monitor ilumina um cone de 4,5m. Tablets contam como variação.", SAH, 39);
  I("camerafilm", AC, "Câmera filmadora", "I", 1, "Filmadora antiga que captura o que os olhos deixam passar. Utensílio com +2 em Investigação e Percepção; pode servir de lanterna (cone de 9m) ou visão noturna de fósforo verde (visão no escuro).", AS5, 60);

  /* =================================================================
     EXPLOSIVOS
     ================================================================= */
  const EX = "Explosivos";
  const GR = "Para usar uma granada, empunhe-a e gaste uma ação padrão para arremessá-la em um ponto em alcance médio; afeta um raio de 6m. ";
  I("gatordoamento", EX, "Granada de atordoamento", "0", 1, GR + "Flash-bang: seres na área ficam atordoados por 1 rodada (Fortitude DT Agi reduz para ofuscado e surdo por uma rodada).", LIV, 64);
  I("grfragmentacao", EX, "Granada de fragmentação", "I", 1, GR + "Seres na área sofrem 8d6 de dano de perfuração (Reflexos DT Agi reduz à metade).", LIV, 64);
  I("grfumaca", EX, "Granada de fumaça", "0", 1, GR + "Fumaça espessa e escura: seres na área ficam cegos e sob camuflagem total. Dura 2 rodadas.", LIV, 64);
  I("grincendiaria", EX, "Granada incendiária", "I", 1, GR + "Seres na área sofrem 6d6 de dano de fogo e ficam em chamas (Reflexos DT Agi reduz o dano à metade e evita a condição).", LIV, 64);
  I("mina", EX, "Mina antipessoal", "I", 1, "Ativada por controle remoto: a até alcance longo, ação padrão para detonar. Dispara bolas de aço em um cone de 6m, causando 12d6 de perfuração (Reflexos DT Int reduz à metade). Você define a direção ao posicioná-la. Instalar exige ação completa e teste de Tática DT 15 (falha gasta a mina). Encontrá-la exige Percepção (DT igual ao teste de instalação).", LIV, 64);
  I("dinamite", EX, "Dinamite", "I", 1, "Bastão de nitroglicerina. Com a mesma ação padrão acende o pavio e arremessa em alcance médio. Raio de 6m: 4d6 de impacto + 4d6 de fogo e em chamas (Reflexos DT Agi reduz à metade e evita a condição).", SAH, 41);
  I("explplastico", EX, "Explosivo plástico", "I", 1, "Massa adesiva com pinos de ignição e detonador remoto. Preparar exige duas rodadas; detona por detonador (ação livre, até alcance longo) ou 1 ponto de dano de fogo/eletricidade. Causa 16d6 de impacto em raio de 3m (Reflexos DT Int reduz à metade). Especialista em explosivos causa o dobro em objetos e estruturas e ignora a RD deles.", SAH, 41);
  I("galaovermelho", EX, "Galão vermelho", "0", 2, "Substância inflamável. Ao sofrer dano de fogo ou balístico, explode em esfera de 6m: 12d6 de fogo e em chamas (Reflexos DT 25 reduz à metade e evita a condição). A área fica em chamas (1d6 por rodada) até ser apagada ou a cena acabar.", SAH, 41);
  I("grsonifero", EX, "Granada de gás sonífero", "I", 1, "Libera fumaça branca em raio de 6m. Seres que começam o turno na área ficam inconscientes e caídos (ou exaustos por 1 rodada e depois fatigados, se em atividade intensa). Fortitude DT Agi reduz para fatigado por 1d4 rodadas. O gás dura 2 rodadas.", SAH, 41);
  I("grpem", EX, "Granada de PEM", "I", 1, "Pulso eletromagnético que desativa todos os equipamentos elétricos em raio de 18m até o fim da cena. Criaturas de Energia na área sofrem 6d6 de impacto e ficam paralisadas por 1 rodada (uma vez por cena, Fortitude DT Agi reduz à metade e evita a condição).", SAH, 41);
  I("grlacrimogenio", EX, "Granada de gás lacrimogêneo", "I", 1, GR + "Nuvem química: 4d6 de dano químico, enjoados e asfixiados. Após deixar a área, seguem asfixiados por 1d4 rodadas e enjoados até o fim da cena (Fortitude DT Agi reduz o dano à metade e evita enjoado).", AS4, 70);
  I("grtinta", EX, "Granada de tinta", "0", 1, GR + "Espalha tintas fosforescentes: seres na área ficam vulneráveis e sofrem -2 dados em Furtividade até o fim da cena (Reflexos DT Agi evita a condição).", AS4, 70);

  /* =================================================================
     ITENS OPERACIONAIS
     ================================================================= */
  const OP = "Itens operacionais";
  I("algemas", OP, "Algemas", "0", 1, "Par de algemas de aço. Para prender quem não está indefeso, empunhe, agarre e vença novo teste de agarrar. Prende os dois pulsos (-5 em testes com as mãos, impede conjuração) ou um pulso em objeto imóvel. Escapar: Acrobacia DT 30 (ou ter as chaves).", LIV, 64);
  I("arpeu", OP, "Arpéu", "0", 1, "Gancho de aço para amarrar na ponta de uma corda. Prender exige Pontaria DT 15. Subir com corda dá +5 em Atletismo.", LIV, 65);
  I("bandoleira", OP, "Bandoleira", "I", 1, "Cinto com bolsos e alças. Uma vez por rodada, saque ou guarde um item do inventário como ação livre.", LIV, 65);
  I("binoculos", OP, "Binóculos", "0", 1, "Binóculos militares: +5 em Percepção para observar coisas distantes.", LIV, 65);
  I("bloqsinal", OP, "Bloqueador de sinal", "I", 1, "Dispositivo compacto que polui a frequência de rádio dos celulares: nenhum aparelho em alcance médio se conecta.", LIV, 65);
  I("cicatrizante", OP, "Cicatrizante", "I", 1, "Spray com remédio de potente efeito cicatrizante. Ação padrão: cura 2d8+2 PV em você ou em um ser adjacente.", LIV, 65);
  I("corda", OP, "Corda", "0", 1, "Rolo de 10m de corda resistente: +5 em Atletismo para descer buracos ou prédios, amarrar pessoas inconscientes etc.", LIV, 65);
  I("eqsobrevivencia", OP, "Equipamento de sobrevivência", "0", 2, "Mochila com saco de dormir, panelas, GPS e outros itens. +5 em Sobrevivência para acampar e orientar-se, e permite fazer esses testes sem treinamento.", LIV, 65);
  I("lanternatatica", OP, "Lanterna tática", "I", 1, "Ilumina um cone de 9m. Ação de movimento: mira a luz nos olhos de um ser em alcance curto, que fica ofuscado por 1 rodada (imune pelo resto da cena).", LIV, 65);
  I("mascaragas", OP, "Máscara de gás", "0", 1, "Máscara com filtro que cobre o rosto: +10 em Fortitude contra efeitos que dependam de respiração.", LIV, 66);
  I("mochilamilitar", OP, "Mochila militar", "I", 0, "Mochila leve e de alta qualidade. Não usa espaço e aumenta sua capacidade de carga em 2 espaços.", LIV, 66);
  I("oculostermica", OP, "Óculos de visão térmica", "I", 1, "Eliminam a penalidade em testes por camuflagem.", LIV, 66);
  I("pistoladardos", OP, "Pistola de dardos", "I", 1, "Arma leve que dispara dardos com sonífero em alcance curto. Ataque à distância: se acertar, o alvo fica inconsciente até o fim da cena (Fortitude DT Agi reduz para desprevenido e lento por 1 rodada). Vem com 2 dardos; caixa adicional (2 dardos) é categoria 0, 1 espaço.", LIV, 66);
  I("pistolasinal", OP, "Pistola sinalizadora", "0", 1, "Dispara um sinalizador luminoso. Pode ser usada como arma de disparo leve, alcance curto, 2d6 de fogo. Vem com 2 cargas; caixa adicional (2 cargas) é categoria 0, 1 espaço.", LIV, 66);
  I("spraypimenta", OP, "Spray de pimenta", "I", 1, "Ação padrão: atinge um ser adjacente, que fica cego por 1d4 rodadas (Fortitude DT Agi evita). A carga dura dois usos.", LIV, 66);
  I("taser", OP, "Taser", "I", 1, "Eletrochoque. Ação padrão: atinge um ser adjacente, que sofre 1d6 de eletricidade e fica atordoado por 1 rodada (Fortitude DT Agi evita). A bateria dura dois usos.", LIV, 66);
  I("alarme", OP, "Alarme de movimento", "0", 1, "Controlado por celular. Ação completa para posicionar e ativar; sinaliza movimento significativo em um cone de 30m (padrão: ser Pequeno ou maior). Sinalização discreta ou sonora.", SAH, 42);
  I("alimentoenerg", OP, "Alimento energético", "II", 1, "Alimento ou suplemento de alta tecnologia. Ação padrão: recupera 1d4 PE.", SAH, 42);
  I("aplicadormed", OP, "Aplicador de medicamentos", "I", 1, "Bomba injetora presa ao braço ou perna: aplica uma substância (cicatrizante, medicamento) com ação de movimento. Espaço para três doses; carregar uma dose é ação padrão.", SAH, 42);
  I("bracadeira", OP, "Braçadeira reforçada", "I", 1, "Protege ao bloquear com o braço: +2 na RD do bloqueio.", SAH, 42);
  I("caoadestrado", OP, "Cão adestrado", "I", 0, "Cão grande treinado, aliado para quem for treinado em Adestramento. Bônus: +2 em Investigação e Percepção. Ladrar e Morder: 1 PE para +2 na Defesa por 1 rodada.", SAH, 42);
  I("coldre", OP, "Coldre saque rápido", "I", 1, "Uma vez por rodada, saque ou guarde uma arma de fogo leve como ação livre.", SAH, 42);
  I("escuta", OP, "Equipamento de escuta", "I", 1, "Receptor (alcance 90m) e três transmissores (raio 9m). Instalar: Crime DT 20 (também é a DT para achá-lo). Instalar discretamente com gente presente: ação completa, Furtividade oposta à Percepção e +5 na DT.", SAH, 42);
  I("estrepes", OP, "Estrepes (saco)", "0", 1, "Ação padrão cobre um quadrado de 1,5m. Quem pisa sofre 1d4 de perfuração e fica lento por um dia (Reflexos DT Agi evita). Em perseguição: -1 dado na sua rodada; o perseguidor que pisa sofre -1 dado até o fim da cena.", SAH, 42);
  I("faixapregos", OP, "Faixa de pregos", "I", 2, "Funciona como estrepes em uma linha de 9m. Veículos com pneus de borracha têm os pneus perfurados e o deslocamento reduzido pela metade.", SAH, 43);
  I("isqueiro", OP, "Isqueiro", "0", 0.5, "Ação de movimento para produzir uma chama. Incendeia inflamáveis e ilumina um raio de 3m.", SAH, 43);
  I("oculosnoturna", OP, "Óculos de visão noturna", "I", 1, "Com bateria, dão visão no escuro. O usuário sofre -1 dado em resistência contra ofuscado e efeitos baseados em luz.", SAH, 43);
  I("oculosescuros", OP, "Óculos escuros", "0", 1, "Quem os veste não pode ser ofuscado.", SAH, 43);
  I("paraquedas", OP, "Paraquedas", "I", 2, "Anula o dano de queda. Veteranos em Acrobacia, Pilotagem, Reflexos, Tática ou Profissão específica sabem usar; senão (ou em quedas curtas) exige Reflexos DT 20, e a falha reduz o dano à metade.", SAH, 43);
  I("arietePortatil", OP, "Aríete portátil", "0", 5, "Cilindro de aço com empunhaduras laterais para romper portas e barricadas. Exige as duas mãos. +10 em testes para arrombar com ele.", AS9, 42);
  I("boroscopio", OP, "Boroscópio articulado", "I", 1, "Visor e câmera na ponta de cabo flexível (alcance 3m). Duas mãos; ação completa para ver ambientes sem entrar, com testes de Investigação e Percepção através da câmera (visão no escuro).", AS9, 43);
  I("dronetatico", OP, "Drone de combate tático", "III", 2, "Pequeno veículo aéreo não tripulado com IA, câmera e controle remoto (alcance 5km; o controle só serve ao seu drone). Aliado especial do tipo drone: escolha o tipo ao adquirir (espião, hacker, atirador, protetor, inteligente, médico ou utilitário). Operar exige uma mão no controle.", AS9, 44);
  I("bloodymary", OP, "Bloody Mary batizada", "II", 1, "Bebida especial que livra de uma condição mental e/ou de medo, ao custo de 2d4 de dano mental.", AS3, 112);
  I("pacoca", OP, "Paçoca", "0", 0.5, "Conta como prato rápido; em ocasiões especiais, a critério do mestre, uma vez por dia recupera 1d8+1 PV, PE e SAN.", AS3, 112);

  /* =================================================================
     MEDICAMENTOS (SaH, p. 43)
     ================================================================= */
  const MD = "Medicamentos";
  const MED = "Ação padrão com o medicamento aplica o efeito em você ou em um ser adjacente. ";
  I("antibiotico", MD, "Antibiótico", "I", 0.5, MED + "+5 no próximo teste de Fortitude contra doença até o fim do dia.", SAH, 43);
  I("antidoto", MD, "Antídoto", "I", 0.5, MED + "+5 no próximo teste de Fortitude contra veneno até o fim do dia. Antídoto de veneno específico remove o veneno.", SAH, 43);
  I("antiemetico", MD, "Antiemético", "I", 0.5, MED + "Remove a condição enjoado e dá +5 para evitá-la até o fim da cena.", SAH, 43);
  I("antihistaminico", MD, "Antihistamínico", "I", 0.5, MED + "+5 no próximo teste contra efeitos de alergia até o fim do dia.", SAH, 43);
  I("antiinflamatorio", MD, "Anti-inflamatório", "I", 0.5, MED + "Fornece 1d8+2 PV temporários.", SAH, 43);
  I("antitermico", MD, "Antitérmico", "I", 0.5, MED + "Permite um novo teste contra uma condição mental. Só funciona uma vez por cena.", SAH, 43);
  I("broncodilatador", MD, "Broncodilatador", "I", 0.5, MED + "+5 para evitar asfixiado ou fatigado até o fim do dia.", SAH, 43);
  I("coagulante", MD, "Coagulante", "I", 0.5, MED + "+5 para se estabilizar de sangrando até o fim do dia (e +5 em Medicina para remover morrendo, se usado junto).", SAH, 43);

  /* =================================================================
     ITENS PARANORMAIS
     ================================================================= */
  const PN = "Itens paranormais";
  I("amarras", PN, "Amarras de (elemento)", "II", 1, "Cordas ou correntes de um elemento, feitas para imobilizar criaturas vulneráveis a ele. Armadilha: gasta as amarras, ação completa e 2 PE para armar 3x3m; quem atravessa pela primeira vez no turno faz Reflexos (DT Int) ou fica imóvel até o fim da cena (se passar, o espaço é terreno difícil). Laçar: ação padrão e 1 PE em criatura em alcance curto; se falhar em Vontade (DT Agi) fica paralisada até o início do seu próximo turno; manter custa 1 PE por rodada.", LIV, 66);
  I("cameraaura", PN, "Câmera de aura paranormal", "II", 1, "Câmera amaldiçoada com Energia e sigilos de Conhecimento. Tirar uma foto gasta ação padrão e 1 PE; as fotos revelam auras paranormais em pessoas e objetos, na cor do elemento.", LIV, 66);
  I("componentes", PN, "Componentes ritualísticos de (elemento)", "0", 1, "Objetos usados em rituais de um elemento (Sangue, Morte, Conhecimento ou Energia). São necessários para conjurar rituais do elemento.", LIV, 66);
  I("emissorpulsos", PN, "Emissor de pulsos paranormais", "II", 1, "Isca de criaturas paranormais. Ativar: ação completa e 1 PE. Emite um pulso de um elemento definido por quem ativa, que atrai criaturas do mesmo elemento e afasta as do elemento oposto (Vontade DT Pre evita).", LIV, 67);
  I("escutaruidos", PN, "Escuta de ruídos paranormais", "II", 1, "Microfone espião que capta ruídos paranormais. Ativar: ação completa e 2 PE; grava por até 24 horas. Ouvir fornece +5 em Ocultismo para identificar criatura.", LIV, 67);
  I("medidormembrana", PN, "Medidor de estabilidade da membrana", "II", 1, "Dispositivo complexo (temperatura, campo magnético, dilatação temporal...). Um agente treinado em Ocultismo avalia o estado da Membrana em uma área, o que indica a chance de uma entidade se manifestar. Não dá respostas definitivas.", LIV, 67);
  I("scanner", PN, "Scanner de manifestação paranormal de (elemento)", "II", 1, "Dispositivo ligado a objetos amaldiçoados de uma entidade. Ativar: ação padrão; consome 1 PE por rodada. O usuário sabe a direção de todas as manifestações paranormais ativas do elemento em alcance longo (inclusive criaturas que o tenham como complemento).", LIV, 67);
  const CAT = "Catalisador ritualístico de (elemento). Precisa estar empunhado e é consumido; só um por ritual. ";
  I("catampliador", PN, "Catalisador: Ampliador", "I", 0.5, CAT + "Aumenta o alcance do ritual em um passo (curto→médio→longo→extremo) ou dobra a área.", SAH, 44);
  I("catperturbador", PN, "Catalisador: Perturbador", "I", 0.5, CAT + "A DT para resistir ao ritual aumenta em +2.", SAH, 44);
  I("catpotencializador", PN, "Catalisador: Potencializador", "I", 0.5, CAT + "O dano do ritual aumenta em um dado do mesmo tipo.", SAH, 44);
  I("catprolongador", PN, "Catalisador: Prolongador", "I", 0.5, CAT + "A duração do ritual dobra. Não funciona para rituais instantâneos ou sustentados.", SAH, 44);
  I("ligacaodireta", PN, "Ligação Direta Infernal", "II", 1, "Fios de cobre contaminados com Sangue e Energia. Ação completa para ligar um veículo automaticamente: o veículo ganha RD 20 e imunidade a Sangue e você recebe +5 em Pilotagem. Em contrapartida o veículo causa confusão: falhas em Pilotagem têm danos e penalidades dobrados. Remover é ação completa.", SAH, 44);
  I("medidorvertebral", PN, "Medidor de Condição Vertebral", "II", 1, "Coluna vertebral sustentada por Lodo de Morte e cabos de Energia, conectada à sua coluna (ação completa, causa dor profunda e deixa atordoado por uma rodada). Conta como vestimenta que dá +2 em Fortitude; as cores indicam sua saúde, luzes lilás indicam efeito paranormal, e dá +5 em Medicina feita para auxiliar o usuário.", SAH, 44);
  I("pendrive", PN, "Pen drive selado", "II", 0.5, "Gravado com sigilos de Conhecimento: não pode ser invadido nem afetado por rituais, seres e efeitos de Energia. Permite invadir outros dispositivos sem contaminação. Existem HDs externos e celulares selados.", SAH, 45);
  I("valete", PN, "Valete da Salvação", "I", 0.5, "Carta de valete de ouros com sigilos de Conhecimento. Ação padrão para atirá-la ao ar: voa em alcance médio apontando a melhor rota de fuga e deixa de existir. Em perseguição, vence automaticamente um cortar caminho.", SAH, 45);
  I("cranio", PN, "Crânio Dominador", "III", 1, "Item paranormal. Empunhando-o, ação padrão e 2 PE invocam correntes que envolvem até dois alvos em alcance curto: paralisados (Reflexos DT Pre evita). Libertar exige romper a corrente (Defesa 10, RD 10, 20 PV). Uma vez por 24 horas; as correntes antigas somem.", AS3, 113);
  I("gaiola", PN, "Gaiola do Corvo", "III", 2, "Item paranormal. Ação padrão para colocá-la no chão e abrir a portinhola: o solo em raio de 18m vira Lodo e terreno difícil, e no começo de cada rodada quem está no Lodo sofre 3d10 de Morte (Fortitude DT Vig reduz à metade). Quem ficar morrendo no Lodo é consumido e levado para dentro da gaiola, que então se fecha. Pode ser fechada a qualquer momento como ação padrão.", AS3, 113);

  /* =================================================================
     ITENS AMALDIÇOADOS ESPECIAIS (Livro, p. 148-151)
     Exceto quando indicado, categoria II e 1 espaço; contam como uma maldição.
     ================================================================= */
  const IA = (id, el, nome, desc, pag, cat = "II", esp = 1) =>
    I(id, "Amaldiçoados · " + el, nome, cat, esp, desc, LIV, pag, { elemento: el });
  IA("perola", "Sangue", "Pérola de Sangue", "Esfera vermelho-viva. Ação de movimento para absorvê-la: +5 em Agilidade, Força, Vigor e testes baseados neles até o fim da cena. Ao fim, Fortitude DT 20; se falhar, fatigado até o fim do dia; falhar por 5 ou mais causa parada cardíaca (morrendo) e, se morrer assim, você vira criatura de Sangue de VD similar ao seu NEX.", 148);
  IA("coracao", "Sangue", "Coração Pulsante", "Coração humano banhado em Sangue. Empunhando-o e sofrendo dano, reação para reduzir o dano à metade. A cada uso, Fortitude DT 15 +5 por uso adicional no dia; se falhar, o item é destruído. O compartimento onde fica deve ser drenado uma vez por dia.", 148);
  IA("coroaespinhos", "Sangue", "Coroa de Espinhos", "Coroa, colar ou pulseira de espinhos. Uma vez por rodada, reação para transformar dano mental em dano de Sangue, mas você não recupera sanidade por descanso enquanto a veste. É preciso vesti-la por uma semana para ativar.", 148);
  IA("frascovitalidade", "Sangue", "Frasco de Vitalidade", "Gaste 1 minuto e sofra até 20 de dano para encher o frasco com seu sangue. Ação padrão para beber e recuperar os PV armazenados; Fortitude DT 20 para não ficar enjoado por uma rodada.", 148);
  IA("punhos", "Sangue", "Punhos Enraivecidos", "Soqueiras de metal vermelho. Ataques desarmados causam +1d8 de Sangue e são letais. Ao acertar um ataque desarmado, pode atacar de novo o mesmo alvo pagando 2 PE por cada ataque já feito no turno (2, 4, 6...).", 148);
  IA("seringatransf", "Sangue", "Seringa de Transfiguração", "Ação padrão para sugar sangue de um alvo adjacente (ataque corpo a corpo se não voluntário) e outra para injetá-lo em alguém adjacente, que assume a aparência do dono do sangue (Distorcer Aparência por um dia). Ao acabar, 1d6: 1 = perde 1 PV permanentemente.", 148);
  IA("amarrasmortais", "Morte", "Amarras Mortais", "Correntes de ferro negro nos antebraços. Uma vez por rodada, ação padrão e 2 PE para agarrar um alvo Grande ou menor em alcance curto com +10 no teste oposto. Ação de movimento para puxar um agarrado até ficar adjacente.", 148);
  IA("frascolodo", "Morte", "Frasco de Lodo", "Lodo da Morte para uma única ativação. Ação padrão para aplicar em um ferimento. Ferida recente (até uma rodada atrás): recupera 6d8+20 PV. Mais antiga: d6 par recupera 3d8+10 PV; ímpar infecciona e causa 3d8+10 de Morte.", 149);
  IA("vislumbrefim", "Morte", "Vislumbre do Fim", "Óculos escuros com espirais. Ação de movimento para se concentrar em um ser que veja e obter informações sobre a morte dele: um contador de tempo (pessoas comuns) ou o pior valor de resistência e as vulnerabilidades (Marcados e criaturas).", 149);
  IA("anelmental", "Conhecimento", "Anéis do Elo Mental", "Par de anéis com símbolos de Ligação Telepática, usados por duas pessoas por 24h. Depois ficam ligados (Invadir Mente) enquanto usados: testes de Vontade usam a melhor quantidade de dados e bônus das duas, mas dano mental e condições mentais/de medo se repetem na outra.", 149);
  IA("coletora", "Conhecimento", "Coletora", "Punhal de lâmina negra. Ação completa para apunhalar uma pessoa morrendo: mata o alvo e armazena 1d8 PE (máximo 20 PE, usáveis como seus enquanto portar a adaga há uma semana). Pesadelos: sempre descanso ruim.", 149);
  IA("craniespiral", "Conhecimento", "Crânio Espiral", "Crânio com Lodo escorrendo dos olhos. Empunhando, ação livre uma vez por rodada para receber uma ação padrão adicional. A cada uso, Vontade DT 15 +5 por uso adicional no dia; se falhar, recebe o benefício, envelhece 1d4 anos e não pode usá-lo mais no dia.", 149);
  IA("lanternarev", "Conhecimento", "Lanterna Reveladora", "Lanterna dourada. Ativar: ação padrão e 1 PE; fica ligada por uma cena com as propriedades do ritual Terceiro Olho. A luz atrai criaturas de Sangue iluminadas, que o atacam em detrimento de outros alvos na mesma categoria de alcance.", 149);
  IA("mascarasombras", "Conhecimento", "Máscara das Pessoas nas Sombras", "Marca da Seita das Máscaras. Resistência a Conhecimento 10 e, com ação de movimento e 2 PE, entra em uma sombra adjacente e se transporta para outra sombra que veja em alcance médio. Vestir é como assinar um acordo, com consequências severas.", 149);
  IA("municaojurada", "Conhecimento", "Munição Jurada", "Bala com sigilo. Ritual de uma hora vincula a um ser que você conheça. Contra ele: +10 no ataque, dobra a margem de ameaça e +6d12 de Conhecimento. Deixa o usuário obcecado: -2 em Defesa e ataques contra outros alvos.", 150);
  IA("pergaminho", "Conhecimento", "Pergaminho da Pertinácia", "Ação padrão para encarar os sigilos e receber 5 PE temporários até o fim da cena. A cada uso, Ocultismo DT 15 +5 por uso adicional no dia; se falhar, o pergaminho se desfaz.", 150);
  IA("bateriarev", "Energia", "Bateria Reversa", "Ação padrão e 2 PE para absorver a carga de um dispositivo eletrônico em alcance curto (descarregando-o). Se cheia, ação padrão para transferir a carga a um dispositivo descarregado. A cada uso, Ocultismo DT 15 +5 por uso adicional no dia; se falhar, explode (12d6 de Energia em 3m).", 150);
  IA("relogioarnaldo", "Energia", "Relógio de Arnaldo", "Relógio de ouro manchado. Uma vez por rodada, 1 PE para rolar de novo qualquer dado com resultado 1. O custo aumenta em +1 a cada ativação no mesmo dia. Item único (apenas um agente pode escolhê-lo).", 150);
  IA("talisma", "Energia", "Talismã da Sorte", "Moeda, pé de coelho ou badulaque modificado. Vestindo-o e sofrendo dano, reação e 3 PE para rolar 1d4: 2 ou 3 evita o dano; 4 evita e o talismã vira cinzas; 1 causa o dobro do dano e o talismã vira cinzas.", 150);
  IA("teclado", "Energia", "Teclado de Conexão Neural", "Teclado USB com glifos de Energia. Plugar (ação de movimento) conecta sua mente à máquina: sem impedimento tecnológico ou de idioma, +10 para hackear e metade do tempo para localizar arquivos, mas sofre 1d6 de dano mental por rodada de uso.", 150);
  IA("telapesadelo", "Energia", "Tela do Pesadelo", "Dispositivo com tela e sigilos nas bordas. Ação padrão e 2 PE para ativar. Quem a tocar vê uma imagem horrível: Vontade (DT do usuário +5); se falhar, fica atordoado, sofre 4d6 de dano mental e repete o teste na próxima rodada, até passar ou enlouquecer (ou a tela ser destruída).", 151);
  IA("veiculoenerg", "Energia", "Veículo Energizado", "O motor do veículo não precisa de combustível. O motorista pode gastar uma reação e fazer Pilotagem DT 25 para o carro e ocupantes assumirem energia pura e atravessarem um objeto como incorpóreos.", 151);
  IA("dedodecepado", "Varia", "Dedo Decepado", "Dedo seco de alguém com alto nível de exposição paranormal. Você recebe um poder paranormal do dono do dedo (o elemento do poder define o da maldição). Ao dormir ou relaxar em interlúdio, 1d4: 1 = assombrado, não recupera PV, PE nem sanidade. -10 em Diplomacia se visto com o item. Vestir por uma semana para ativar.", 151);
  IA("selos", "Varia", "Selos Paranormais", "Sigilos gravados em objeto pequeno, cada selo com um ritual. Empunhe e leia em voz alta (ação padrão ou a do ritual, o que for maior); é preciso conhecer o ritual ou passar em Ocultismo (DT 20 + custo em PE). O ritual é conjurado e o selo vira cinzas. Sem componentes ritualísticos. A categoria do selo é o círculo do ritual (I a IV).", 151);

  /* =================================================================
     ITENS AMALDIÇOADOS DO SaH (p. 57-62)
     ================================================================= */
  const SA = (id, el, nome, cat, esp, desc, pag) =>
    I(id, "Amaldiçoados · " + el, nome, cat, esp, desc, SAH, pag, { elemento: el });
  SA("conector", "Sangue", "Conector de Membros", "III", 1, "Dois anéis metálicos banhados em Sangue ligados por tecido humano. Ação padrão para reconectar braço, perna ou cabeça decepados (até 3 rodadas depois): não cura PV, mas quem estava morrendo ou morto perde a condição e fica inconsciente com 1 PV. 25% de chance de a parte ganhar vida própria (perna: lento; braço: -1 dado com ele; cabeça: 25% de confuso no início de cenas de tensão).", 57);
  SA("dosepraga", "Sangue", "Dose d'A Praga", "III", 1, "Frasco de líquido vermelho. Ação padrão: você ou um ser adjacente recebe Arma de Sangue, Sangue de Ferro e Sangue Vivo até o fim da cena. Ao fim, Fortitude DT 20 +5 por dose anterior desde o último interlúdio; se falhar, sofre 2d4 de dano mental e mantém os poderes até o fim da próxima cena, sob o ritual Ódio Incontrolável.", 57);
  SA("mandibula", "Sangue", "Mandíbula Agonizante", "II", 1, "Parte inferior de um crânio que emite sons de tortura. Ação padrão para arremessá-la em alcance médio: grita muito alto e abafa outros sons em 30m até o fim da cena (passa automaticamente em um teste para distrair em furtividade). Criaturas de Sangue precisam de Vontade DT 35 para não ir comê-la. Só pode ser usada de novo após descansar uma cena.", 57);
  SA("retalho", "Sangue", "Retalho Tenebroso", "II", 1, "Pedaço de carne com pele e pelos bestiais. Ação padrão para aplicar no rosto: faro e visão no escuro, mas vulnerabilidade a Morte e -2 dados em interação social. Cada dia seguido dá +1 cumulativo no dano, mas ao fim de cada dia perde 1d6 PV (Fortitude DT 15, +5 a cada teste seguido, evita). Remover: ação padrão e o mesmo teste.", 57);
  SA("ampulheta", "Morte", "Ampulheta do Tempo Sofrido", "II", 1, "Ampulheta com areia negra. Empunhando-a, 5 PE para receber os benefícios de uma ação de interlúdio à escolha. Só pode usar de novo após gastar uma ação de interlúdio para devolver o tempo emprestado.", 58);
  SA("injecaolodo", "Morte", "Injeção de Lodo", "II", 0.5, "Seringa de bronze com Lodo da Morte. Ação padrão: você ou um voluntário adjacente fica vulnerável a balístico e Energia até o fim da cena, mas na próxima vez que for reduzido a 0 PV na cena fica com 1 PV.", 59);
  SA("instantaneo", "Morte", "Instantâneo Mortal", "II", 0.5, "Fotografia de um dos últimos momentos de uma pessoa. Ao procurar pistas, 1 PE para olhar a imagem: se a perícia se relacionar à morte retratada, a imagem aponta uma direção útil (+1 dado no teste). O mestre decide as perícias.", 59);
  SA("projetilcurto", "Morte", "Projétil de Lodo (curto)", "I", 1, "Munição forjada com Lodo. Troca todo o dano da arma para Morte, mas ao fim da cena a arma é consumida pelo tempo. Eficaz contra criaturas de Sangue.", 59);
  SA("projetillongo", "Morte", "Projétil de Lodo (longo)", "II", 1, "Munição forjada com Lodo. Troca todo o dano da arma para Morte, mas ao fim da cena a arma é consumida pelo tempo. Eficaz contra criaturas de Sangue.", 59);
  SA("radiochiador", "Morte", "Rádio Chiador", "II", 1, "Rádio gravador de bolso. Pilhas duram 12 horas. Ligado, chia se houver criatura paranormal em alcance extremo (mais alto quanto mais perto, indicando direção e alcance aproximados). Criaturas paranormais tendem a ser atraídas pelo chiado.", 59);
  SA("cameraobscura", "Conhecimento", "Câmera Obscura", "III", 1, "Polaroid Model 95: câmera de aura paranormal com a modificação lente de revelação, mas a DT para resistir aumenta em +10. Se falhar, a criatura também sofre 6d6 de frio (só criaturas com invisibilidade, incorporeidade ou camuflagem).", 59);
  SA("repositorio", "Conhecimento", "Repositório do Fracasso", "II", 1, "Caixinha de madeira. Cada resultado 1 em d20 de criaturas paranormais em alcance médio dá uma carga (máximo 6). Uma vez por rodada, consuma uma carga para recuperar 1d4 PE, sofrendo -1 cumulativo em Vontade até o próximo interlúdio.", 60);
  SA("tabula", "Conhecimento", "Tábula do Saber Custoso", "II", 1, "Empunhando-a, recebe os benefícios de ser treinado em uma perícia por um único teste. Perde SAN igual ao valor do atributo-chave da perícia.", 60);
  SA("arreio", "Energia", "Arreio Neural", "II", 1, "Correias de couro e fivelas fixadas à cabeça. Ao sofrer 5 ou mais de dano de eletricidade ou Energia, recupera 1 PE (máximo de PE por dia igual ao dobro do Vigor).", 60);
  SA("centrifugador", "Energia", "Centrifugador Existencial", "III", 1, "Dois círculos de cobre concêntricos. Ação padrão e 3 PE: você se divide em duas possibilidades de futuro e recebe um turno adicional na última contagem de iniciativa da rodada; ao fim, sorteia qual versão se dissipa. A cada uso, Ocultismo DT 15 +5 por uso adicional no dia; se falhar, perde metade dos atributos (recupera 1 de cada por interlúdio).", 60);
  SA("espelho", "Energia", "Espelho Refletor", "II", 1, "Placa metálica polida. Ação de movimento para observar um ponto ou ser fora do seu ângulo de visão em alcance médio (+1 dado em Percepção, pode ver além de cobertura total). Ao sofrer dano de Energia, sacrifique o espelho para evitá-lo e refleti-lo à origem.", 61);
  SA("primeiraadaga", "Medo", "A Primeira Adaga", "III", 1, "Lâmina de pedra polida, a primeira adaga usada em um ritual. Como componente ritualístico, dá ao ritual os efeitos dos catalisadores ampliador, perturbador, potencializador e prolongador e o torna de 1 rodada de conjuração. Custo: perde PV igual à metade dos seus PV totais (conta como dano para dano massivo); uma vítima de sacrifício pode pagar.", 61);

  /* =================================================================
     ITENS AMALDIÇOADOS DOS ARQUIVOS SECRETOS
     ================================================================= */
  const AI = (id, el, nome, cat, esp, desc, fonte, pag) =>
    I(id, "Amaldiçoados · " + el, nome, cat, esp, desc, fonte, pag, { elemento: el });
  AI("ctrlcv", "Energia", "Granada Ctrl+C Ctrl+V", "II", 1, "Granada de fragmentação transparente envolta em fios de cobre. Raio de 6m: 8d6 de Energia (Reflexos DT Agi reduz à metade). Ao explodir, role 1d4: se par, gera uma segunda granada idêntica em outro espaço da área, repetindo até a quarta explosão ou um d4 ímpar.", AS4, 70);
  AI("larva", "Sangue", "Larva da Fúria", "II", 1, "Larva de Sangue de 15cm com dentes longos. Item operacional maldito ingerido com ação de movimento: ódio até o fim da cena (+4 em ataque e dano corpo a corpo, sem ações de calma ou concentração, como Furtividade e rituais). A fúria termina se, ao fim da rodada, você não atacou nem foi alvo de efeito hostil.", AS5, 61);
  AI("skate", "Energia", "Skate Caótico", "II", 2, "Skate com sigilos e raios verdes. Como transporte (treinado em Acrobacia, Atletismo ou Pilotagem): +3m de deslocamento. Como arma improvisada corpo a corpo de duas mãos: 1d12 de impacto, crítico x2. Como escudo de 'consciência caótica': +5 na Defesa, sem exigir proficiência em proteção pesada. Para modificações e maldições conta como proteção pesada. Mudar o uso é ação de movimento.", AS5, 61);

  /* =================================================================
     ARMAS ESPECIAIS (amaldiçoadas)
     ================================================================= */
  W("arcabuz", "Amaldiçoadas · Energia", "Arcabuz dos Moretti", "II", "2d4/2d6/2d8/2d10/2d12/2d20", 20, 3, "Curto", "Energia", 1, "Pontaria", "", "Arma simples de fogo, uma mão. +2 em ataque, dano de Energia, alcance curto, crítico x3, sem munição. Ao disparar, role 1d6 para o dano básico: 2d4, 2d6, 2d8, 2d10, 2d12 ou 2d20.", LIV, 150);
  W("fuzilalheio", "Amaldiçoadas · Energia", "Fuzil Alheio", "IV", "2d10", 19, 3, "Longo", "Energia", 2, "Pontaria", "", "Fuzil de precisão alienígena com mira telescópica e mira laser, que causa dano de Energia e não precisa de munição. Deixado pelo Estrangeiro e seus Alheios.", SAH, 61);
  W("duplamaca", "Amaldiçoadas · Sangue", "Dupla Obsessiva (maça)", "III", "2d4 + 1d6 Sangue", 20, 3, "Corpo a corpo", "Perfuração", 1, "Luta", "Força", "Maça tática de uma mão que causa 2d4 de perfuração mais 1d6 de Sangue (multiplicado em crítico). Faz par com o florete (conta como um item de 2 espaços): com as duas armas, uma ação padrão para dois ataques, um com cada. Se um aliado em alcance curto for alvo de ataque, reação e 2 PE para tomar o lugar (e, se a fonte estiver corpo a corpo, 2 PE para atacá-la com a maça). Com Combater com Duas Armas e/ou Ambidestria, os custos viram 1 PE.", AS3, 114);
  W("duplaflorete", "Amaldiçoadas · Sangue", "Dupla Obsessiva (florete)", "III", "1d6 + 2d4 Sangue", 18, 2, "Corpo a corpo", "Perfuração", 1, "Luta", "Agilidade", "Florete tático ágil de uma mão que causa 1d6 de perfuração mais 2d4 de Sangue (multiplicado em crítico). Faz par com a maça (ver Dupla Obsessiva).", AS3, 114);

  /* =================================================================
     VESTIMENTAS / PROTEÇÕES ESPECIAIS
     ================================================================= */
  V("trajemergulho", "Trajes", "Traje de mergulho", "I", 2, "Roupa impermeável acompanhada de tanque e máscara (1 hora de oxigênio). Ocupa o espaço de uma vestimenta; vestir ou despir é ação completa.", SAH, 44, { resistencias: "Químico 5", requisitos: "+5 em resistência contra efeitos ambientais" });
  V("trajeespacial", "Trajes", "Traje espacial", "II", 5, "Roupa impermeável com suprimento de água e oxigênio de oito horas e proteção contra raios cósmicos e rochas. Ocupa o espaço de uma vestimenta; vestir ou despir demora duas rodadas.", SAH, 44, { resistencias: "Químico 20", requisitos: "+10 em resistência contra efeitos ambientais" });
  V("trajehazmat", "Trajes", "Traje hazmat", "I", 2, "Roupa impermeável que cobre o corpo todo, usada para impedir contato com materiais tóxicos. +5 em testes de resistência contra efeitos ambientais.", LIV, 66, { resistencias: "Químico 10" });
  V("casacolodo", "Amaldiçoadas · Morte", "Casaco de Lodo", "II", 1, "Sobretudo de Lodo ativo que amortece ataques. Vulnerabilidade a dano balístico e de Energia.", LIV, 149, { resistencias: "Corte 5, Impacto 5, Morte 5, Perfuração 5", penalidades: "Vulnerável a balístico e Energia" });
  V("jaquetaverissimo", "Amaldiçoadas · Medo", "Jaqueta de Veríssimo", "IV", 1, "Jaqueta aviador de couro marrom passada entre agentes importantes da Ordem. Quando um aliado adjacente for sofrer dano, reação e 2 PE para tomar o dano no lugar. Item único (apenas um agente pode escolhê-la).", LIV, 151, { resistencias: "Dano paranormal 15" });
  V("peitoral", "Amaldiçoadas · Energia", "Peitoral da Segunda Chance", "II", 1, "Colete com peça eletrônica sobre o coração. Se reduzido a 0 PV, gasta 5 PE seus para reanimá-lo com 4d10 PV (falha sem PE suficiente). A cada ativação, 1 chance em 1d10 de matá-lo, transformando corpo e equipamento em plasma.", LIV, 150);
  V("camisetapsiko", "Amaldiçoadas · Sangue", "Camiseta Psikolera", "II", 1, "Camiseta de banda manchada de sangue. Se estiver machucado enquanto a usa, todas as suas rolagens de dano causam +2d8 de dano de Sangue.", AS3, 114);
  V("armaduracouracas", "Amaldiçoadas · Sangue", "Armaduras dos Couraças", "III", 0, "Armaduras de Guevara: proteção pesada amaldiçoada de Sangue, com partes orgânicas. Defesa +10, +1 por semana de uso até +20. Ocupa 0 espaços, não dá penalidades e dispensa proficiência. Vulnerável a Morte. Tocá-la exige Vontade (6d6) para resistir ao desejo de equipá-la; equipada, Fortitude (DT 6d6) para não ser controlado pelo Sangue. Testes se repetem a cada semana ou nova missão. Tirá-la é quase impossível.", AS3, 115, { ca: "+10 (até +20)", resistencias: "Balístico 5, Impacto 5, Perfuração 5, Sangue 10", penalidades: "Vulnerável a Morte" });
  V("faixasvidencia", "Amaldiçoadas · Morte", "Faixas da Vidência", "III", 1, "Faixa de tecido preto com espirais. +5 na Defesa e em resistência contra ataques e habilidades de origem em alcance médio, mas -5 contra os de origem além de 9m. +2 em Intimidação e, ao procurar pista, 1 PE para +2 no teste.", AS5, 60);
  V("joiasmente", "Amaldiçoadas · Conhecimento", "Joias da Mente", "III", 1, "Piercing e brinco dourados com sigilos de Conhecimento. +2 em Diplomacia. Só funciona com as duas peças, que contam como uma única vestimenta.", AS5, 60, { resistencias: "Mental 10" });
  V("tenislepidos", "Amaldiçoadas · Energia", "Tênis Lépidos", "III", 1, "Tênis para skate com partes queimadas e cabos neon. +12 em Atletismo e +3m de deslocamento. 2 PE para se mover de forma sobrenatural até o fim do turno: ignora terreno difícil, deslocamento de escalada igual ao terrestre e imunidade a dano de queda de até 9m.", AS5, 61);
  V("enxame", "Amaldiçoadas · Conhecimento", "Enxame Fantasmagórico", "III", 1, "Manto de traças e mariposas. Enquanto vestido deixa o usuário invisível, mas ele sofre 1 de dano mental no início de cada turno (ignora resistência).", SAH, 60);
  V("pedemorto", "Itens paranormais", "Pé de Morto", "II", 1, "Botas de pele de cadáveres amaldiçoados pela Morte. +5 em Furtividade; em furtividade, ações chamativas que envolvam apenas se mover aumentam a visibilidade em apenas +1.", SAH, 45);

  /* =================================================================
     MALDIÇÕES (Livro, p. 144-147)
     A primeira maldição de um item aumenta a categoria em II; as seguintes, em I.
     Itens amaldiçoados têm +10 PV e +10 RD por maldição.
     ================================================================= */
  const MA = (id, aplica, el, nome, efeito, pag) =>
    E.maldicoes.push({ id: "eq.mald." + id.replace(/^m\./, ""), aplica, grupo: `Maldições de ${el}`, nome, efeito, elemento: el, fonte: LIV, pagina: String(pag) });

  // armas
  MA("m.antielemento", "arma", "Conhecimento", "Antielemento", "A arma é letal contra criaturas de um elemento. Ao atacar uma criatura desse elemento, gaste 2 PE: se acertar, +4d8 de dano. Elemento aleatório: 1d4 (1 Conhecimento, 2 Energia, 3 Morte, 4 Sangue).", 145);
  MA("m.ritualistica", "arma", "Conhecimento", "Ritualística", "Armazena na arma um ritual de alvo único ou de área, gastando os PE normalmente. O ritual fica guardado; ao acertar um ataque, descarregue-o como ação livre (o alvo ou o centro da área é o ser atingido). Depois outro pode ser armazenado.", 145);
  MA("m.senciente", "arma", "Conhecimento", "Senciente", "Ação de movimento e 2 PE para imbuir a arma de consciência: ela flutua ao seu lado e, uma vez por rodada, ataca um ser em alcance curto (ou no alcance da arma) com as mesmas estatísticas. 1 PE no início de cada turno para manter; senão a arma cai. Ação de movimento para apanhá-la.", 146);
  MA("m.empuxo", "arma", "Energia", "Empuxo", "A arma pode ser arremessada em alcance curto (se já podia, o alcance aumenta uma categoria) e causa mais um dado de dano do mesmo tipo assim. Após o ataque à distância ela volta voando no mesmo turno; pegá-la é reação. Só armas corpo a corpo.", 146);
  MA("m.energetica", "arma", "Energia", "Energética", "2 PE por ataque para transformar a arma (exceto o cabo) ou a munição em Energia pura: +5 no ataque, ignora resistência a dano e converte todo o dano em Energia.", 146);
  MA("m.vibrante", "arma", "Energia", "Vibrante", "A arma vibra com Energia: você recebe Ataque Extra da trilha operações especiais; se já tem, o custo para usá-lo diminui em -1 PE.", 146);
  MA("m.consumidora", "arma", "Morte", "Consumidora", "Drena a entropia dos alvos, deixando-os lentos até o fim da cena. Ao atacar, gaste 2 PE: se acertar, o alvo fica imóvel por uma rodada.", 146);
  MA("m.erosiva", "arma", "Morte", "Erosiva", "Acelera o envelhecimento: +1d8 de dano de Morte. Ao atacar, 2 PE: se acertar, a vítima sofre 2d4 de Morte no início dos turnos pelas próximas duas rodadas.", 146);
  MA("m.repulsora", "arma", "Morte", "Repulsora", "Aura de fumaça que desacelera ataques: +2 de Defesa enquanto empunhada. Ao bloquear, 2 PE para +5 adicionais na Defesa.", 146);
  MA("m.lancinante", "arma", "Sangue", "Lancinante", "+1d8 de dano de Sangue, multiplicado em acertos críticos.", 146);
  MA("m.predadora", "arma", "Sangue", "Predadora", "Persegue os alvos: anula penalidades por camuflagem e cobertura leves. Arma de disparo: alcance +1 categoria. A margem de ameaça duplica (aplicada antes de efeitos que a aumentem).", 146);
  MA("m.sanguinaria", "arma", "Sangue", "Sanguinária", "Ferimentos se rasgam: o ser atingido fica sangrando (cumulativo: atingido duas vezes perde 2d6 por rodada). Em acerto crítico drena o sangue: alvo fraco e você recebe 2d10 PV temporários.", 146);
  // proteções
  MA("m.abascanta", "vestimenta", "Conhecimento", "Abascanta", "+5 em resistência contra rituais. Uma vez por cena, ao ser alvo de um ritual, reação e PE iguais ao custo dele para refleti-lo ao conjurador (você toma as decisões).", 146);
  MA("m.profetica", "vestimenta", "Conhecimento", "Profética", "Vislumbres do futuro imediato: resistência a Conhecimento 10 e, em teste de resistência, 2 PE para rolar de novo.", 146);
  MA("m.sombria", "vestimenta", "Conhecimento", "Sombria", "+5 em Furtividade e ignora a penalidade de carga nessa perícia. Ação de movimento e 1 PE para o item parecer uma roupa comum, mantendo suas propriedades.", 147);
  MA("m.cinetica", "vestimenta", "Energia", "Cinética", "Barreira que desvia ataques: +2 em Defesa e resistência a dano 2 (proteção leve ou escudo) ou 5 (pesada).", 147);
  MA("m.lepida", "vestimenta", "Energia", "Lépida", "+10 em Atletismo e +3m de deslocamento. 2 PE para se mover de forma sobrenatural até o fim do turno: ignora terreno difícil, escalada igual ao deslocamento e imunidade a dano de queda até 9m.", 147);
  MA("m.voltaica", "vestimenta", "Energia", "Voltaica", "Resistência a Energia 10. Ação de movimento e 2 PE para emitir arcos de Energia até o fim da cena: no fim de cada turno, 2d6 de Energia em todos os seres adjacentes.", 147);
  MA("m.letargica", "vestimenta", "Morte", "Letárgica", "Desacelera ataques perigosos: +2 em Defesa e 25% (leve ou escudo) ou 50% (pesada) de chance de ignorar o dano extra de críticos e ataques furtivos.", 147);
  MA("m.repulsiva", "vestimenta", "Morte", "Repulsiva", "Resistência a Morte 10. Ação de movimento e 2 PE para cobrir o corpo de Lodo até o fim da cena: quem o atacar corpo a corpo sofre 2d8 de Morte.", 147);
  MA("m.regenerativa", "vestimenta", "Sangue", "Regenerativa", "Resistência a Sangue 10. Ação de movimento e 1 PE para recuperar 1d12 PV.", 147);
  MA("m.sadica", "vestimenta", "Sangue", "Sádica", "No início do turno, +1 em ataques e dano para cada 10 pontos de dano sofridos desde o fim do seu último turno.", 147);
  // acessórios (utensílios e vestimentas)
  MA("m.carisma", "acessorio", "Conhecimento", "Carisma", "Aura de carisma e autoconfiança: +1 em Presença (não dá PE adicionais).", 147);
  MA("m.conjuracao", "acessorio", "Conhecimento", "Conjuração", "Tem um ritual de 1º círculo: empunhando o item você o conjura como se o conhecesse; se já conhece, o custo diminui em -1 PE.", 147);
  MA("m.escudomental", "acessorio", "Conhecimento", "Escudo Mental", "Barreira psíquica: resistência mental 10.", 147);
  MA("m.reflexao", "acessorio", "Conhecimento", "Reflexão", "Uma vez por rodada, ao ser alvo de um ritual, gaste PE iguais ao custo dele para refleti-lo ao conjurador (você toma as decisões).", 147);
  MA("m.sagacidade", "acessorio", "Conhecimento", "Sagacidade", "+1 em Intelecto (não dá perícias nem graus de treinamento).", 147);
  MA("m.defesaE", "acessorio", "Energia", "Defesa", "Barreira de energia invisível: +5 de Defesa.", 147);
  MA("m.destreza", "acessorio", "Energia", "Destreza", "+1 em Agilidade.", 147);
  MA("m.potencia", "acessorio", "Energia", "Potência", "Aumenta a DT contra suas habilidades, poderes e rituais em +1.", 147);
  MA("m.esforco", "acessorio", "Morte", "Esforço Adicional", "+5 PE. Só se ativa após um dia de uso.", 147);
  MA("m.disposicao", "acessorio", "Sangue", "Disposição", "+1 em Vigor.", 147);
  MA("m.pujanca", "acessorio", "Sangue", "Pujança", "+1 em Força.", 147);
  MA("m.vitalidade", "acessorio", "Sangue", "Vitalidade", "+15 PV. Só se ativa após um dia de uso.", 147);
  MA("m.protecaoelemental", "acessorio", "Varia", "Proteção Elemental", "Resistência 10 contra um elemento. O acessório conta como item do elemento contra o qual dá resistência.", 147);

  /* =================================================================
     ARMAS COMUNS QUE FALTAVAM (itens operacionais que viram arma)
     ================================================================= */
  W("pedecabra", "Armas simples · Corpo a corpo, uma mão", "Pé de cabra", "0", "1d6", 20, 2, "Corpo a corpo", "Impacto", 1, "Luta", "Força", "Barra de ferro. Funciona como um bastão em combate e dá +5 em Força para arrombar portas.", LIV, 66);
  W("pa", "Armas simples · Corpo a corpo, duas mãos", "Pá", "0", "1d6", 20, 2, "Corpo a corpo", "Impacto", 2, "Luta", "Força", "Ferramenta de cavar. Funciona como um bastão em combate e dá +5 em Força para cavar e mover detritos.", SAH, 43);
  W("soqueira", "Armas simples · Corpo a corpo, uma mão", "Soqueira", "0", "+1 no dano desarmado", 20, 2, "Corpo a corpo", "Impacto", 1, "Luta", "Força", "Peça de metal entre os dedos: +1 no dano desarmado e torna o ataque letal. Pode receber modificações e maldições de armas corpo a corpo.", LIV, 66);

  /* =================================================================
     RITUAIS QUE AFETAM ARMAS (lista própria, não alteram a categoria)
     ================================================================= */
  const RT = "Rituais que afetam armas";
  const R = (id, nome, efeito, pag) => E.rituais.push({ id: "eq.rit." + id, grupo: RT, nome, efeito, fonte: LIV, pagina: String(pag) });
  R("amaldicoar", "Amaldiçoar Arma", "1º círculo (1 PE), padrão, toque, duração cena. Alvo: 1 arma corpo a corpo ou pacote de munição. Ao aprender escolha um elemento (Conhecimento, Energia, Morte ou Sangue): a arma ou as munições causam +1d6 de dano do elemento. Discente (+2 PE, 2º círculo): +2d6. Verdadeiro (+5 PE, 3º círculo e afinidade): +4d6.", 124);
  R("amaldicoartec", "Amaldiçoar Tecnologia", "1º círculo de Energia (1 PE), padrão, toque, duração cena. Alvo: 1 acessório ou arma de fogo, que recebe uma modificação à sua escolha. Discente (+2 PE, 2º círculo): duas modificações. Verdadeiro (+5 PE, 3º círculo e afinidade): três modificações.", 124);
  R("armaatroz", "Arma Atroz", "1º círculo de Sangue (1 PE), padrão, toque, sustentada. Alvo: 1 arma corpo a corpo, que fornece +2 em ataque e +1 na margem de ameaça. Discente (+2 PE): +5 em ataque. Verdadeiro (+5 PE, afinidade): +5 em ataque e +2 na margem de ameaça e no multiplicador de crítico.", 125);
  R("chamejar", "Chamas do Caos: Chamejar", "2º círculo de Energia (3 PE), padrão, alcance curto, duração cena. O alvo é uma arma corpo a corpo, que causa +1d6 de dano de fogo.", 126);
  R("decadencia", "Decadência (Discente)", "1º círculo de Morte, versão Discente (+2 PE): ao conjurar, transfira as espirais de trevas para uma arma e faça um ataque corpo a corpo contra o alvo. Se acertar, causa o dano da arma somado a 3d8+3 de dano de Morte (sem resistência).", 129);
})();