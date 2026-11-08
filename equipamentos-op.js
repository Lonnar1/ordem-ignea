/* =====================================================================
   Equipamentos de Ordem Paranormal — catálogo de armas, vestimentas
   (proteções) e modificações, tudo editável.
   Fonte: Livro de Regras v1.3, cap. 3 (tabelas 3.3, 3.5, 3.6 e 3.7).
   Também cuida da CATEGORIA FINAL: cada modificação aumenta a categoria
   do item em I, então categoria final = categoria base + modificações.
   ===================================================================== */

const EQUIP_OP_PADRAO = {
  /* ---------------- ARMAS (tabela 3.3, p. 56-57) ---------------- */
  armas: [],
  /* ---------------- PROTEÇÕES (tabela 3.6, p. 62) ---------------- */
  protecoes: [
    { id: "eq.prot.leve", grupo: "Proteções", nome: "Proteção leve", ca: "+5", categoria: "I", espacos: 2, resistencias: "", penalidades: "", requisitos: "", desc: "Jaqueta de couro pesada ou colete de kevlar, usada tipicamente por seguranças e policiais. Defesa +5.", pagina: "62" },
    { id: "eq.prot.pesada", grupo: "Proteções", nome: "Proteção pesada", ca: "+10", categoria: "II", espacos: 5, resistencias: "Balístico 2, Corte 2, Impacto 2, Perfuração 2", penalidades: "-5 em perícias com penalidade de carga", requisitos: "Proficiência com proteções pesadas", desc: "Equipamento de forças especiais da polícia e do exército: capacete, ombreiras, joelheiras e caneleiras, além de colete com várias camadas de kevlar. Defesa +10. Por ser desconfortável e volumosa, impõe -5 em testes de perícias que sofrem penalidade de carga.", pagina: "62" },
    { id: "eq.prot.escudo", grupo: "Proteções", nome: "Escudo", ca: "+2", categoria: "I", espacos: 2, resistencias: "", penalidades: "", requisitos: "Empunhar em uma mão", desc: "Escudo medieval ou moderno, como os de tropas de choque. Precisa ser empunhado em uma mão e fornece Defesa +2, que acumula com a de uma proteção. Para proficiência e penalidade por não proficiência, conta como proteção pesada.", pagina: "62" },
    { id: "eq.prot.escudobalistico", grupo: "Arquivos Secretos · Proteções", nome: "Escudo balístico LED", ca: "+2", categoria: "II", espacos: 2, resistencias: "Balístico 10", penalidades: "", requisitos: "Empunhar em uma mão", desc: "Escudo largo e reforçado que conta como proteção pesada. Ação de movimento: cobertura leve para você e qualquer ser Médio ou menor atrás de você (anulada se você se deslocar). A lanterna tática do escudo ilumina um cone de 9m e, com ação de movimento, deixa um ser em alcance curto ofuscado por 1 rodada (imune pelo resto da cena).", fonte: "Arquivos Secretos 9", pagina: "50" },
    { id: "eq.prot.capacete", grupo: "Arquivos Secretos · Proteções", nome: "Capacete tático", ca: "", categoria: "II", espacos: 1, resistencias: "Fortificação 25%", penalidades: "", requisitos: "", desc: "Proteção especial de liga leve para o crânio. Item vestido que conta como proteção pesada. Fortificação 25% (chance de 1 em 1d4 de ignorar o dano adicional de acerto crítico ou ataque furtivo).", fonte: "Arquivos Secretos 9", pagina: "43" },
  ],
  /* ---------------- MODIFICAÇÕES (tabelas 3.5 e 3.7, p. 60-62) ---------------- */
  mods: [
    // armas corpo a corpo e de disparo
    { id: "eq.mod.certeira", aplica: "arma", grupo: "Corpo a corpo e disparo", nome: "Certeira", efeito: "+2 em testes de ataque. Fabricada para ser mais precisa e balanceada.", pagina: "60" },
    { id: "eq.mod.cruel", aplica: "arma", grupo: "Corpo a corpo e disparo", nome: "Cruel", efeito: "+2 em rolagens de dano. Lâmina especialmente afiada ou materiais mais densos.", pagina: "60" },
    { id: "eq.mod.discreta", aplica: "arma", grupo: "Qualquer arma", nome: "Discreta", efeito: "+5 em testes de Crime para ser ocultada (mesmo sem treino na perícia) e reduz o espaço ocupado em 1.", pagina: "60" },
    { id: "eq.mod.perigosa", aplica: "arma", grupo: "Corpo a corpo e disparo", nome: "Perigosa", efeito: "+2 na margem de ameaça. Lâmina afiada como navalha ou materiais maciços.", pagina: "60" },
    { id: "eq.mod.tatica", aplica: "arma", grupo: "Qualquer arma", nome: "Tática", efeito: "Cabo texturizado, bandoleira e outros acessórios: você pode sacar a arma como ação livre.", pagina: "61" },
    // armas de fogo
    { id: "eq.mod.alongada", aplica: "arma", grupo: "Armas de fogo", nome: "Alongada", efeito: "Cano mais longo: +2 em testes de ataque.", pagina: "60" },
    { id: "eq.mod.calibre", aplica: "arma", grupo: "Armas de fogo", nome: "Calibre Grosso", efeito: "Aumenta o dano em mais um dado do mesmo tipo (um revólver causa 3d6; um fuzil de precisão, 3d10). Exige munição específica de calibre grosso, de mesmo custo em categoria, que não serve em armas normais.", pagina: "60" },
    { id: "eq.mod.compensador", aplica: "arma", grupo: "Armas de fogo", nome: "Compensador", efeito: "Apenas armas automáticas: anula a penalidade em testes de ataque por disparar rajadas.", pagina: "60" },
    { id: "eq.mod.ferrolho", aplica: "arma", grupo: "Armas de fogo", nome: "Ferrolho Automático", efeito: "A arma se torna automática (rajadas: -1 dado no ataque, +1 dado de dano).", pagina: "61" },
    { id: "eq.mod.laser", aplica: "arma", grupo: "Armas de fogo", nome: "Mira Laser", efeito: "Aumenta a margem de ameaça em +2.", pagina: "61" },
    { id: "eq.mod.telescopica", aplica: "arma", grupo: "Armas de fogo", nome: "Mira Telescópica", efeito: "Aumenta o alcance da arma em uma categoria (curto → médio → longo → extremo) e permite usar Ataque Furtivo em qualquer alcance.", pagina: "61" },
    { id: "eq.mod.silenciador", aplica: "arma", grupo: "Armas de fogo", nome: "Silenciador", efeito: "Reduz em -2 dados a penalidade em Furtividade para se esconder no mesmo turno em que atacou com a arma de fogo.", pagina: "61" },
    { id: "eq.mod.calor", aplica: "arma", grupo: "Armas de fogo", nome: "Visão de Calor", efeito: "Ao disparar com a arma, você ignora qualquer camuflagem do alvo.", pagina: "61" },
    // munições
    { id: "eq.mod.dumdum", aplica: "arma", grupo: "Munições (balas curtas e longas)", nome: "Dum Dum", efeito: "Balas que se expandem no impacto: +1 no multiplicador de crítico. Só em balas curtas e longas.", pagina: "60" },
    { id: "eq.mod.explosiva", aplica: "arma", grupo: "Munições (balas curtas e longas)", nome: "Explosiva", efeito: "Gota de mercúrio ou glicerina que explode ao atingir o alvo: +2d6 de dano. Só em balas curtas e longas.", pagina: "60" },
    // armas: Sobrevivendo ao Horror
    { id: "eq.mod.carregador", aplica: "arma", grupo: "Armas de fogo, bestas e balestras (SaH)", nome: "Carregador Rápido", efeito: "Arma de fogo: recarregar como ação livre uma vez por rodada. Bestas e balestras: até cinco recargas como ação livre, exigindo apenas uma mão; depois é preciso carregar um virote por vez (ação de movimento por virote). Regra opcional de contagem de munição.", fonte: "Sobrevivendo ao Horror", pagina: "38" },
    // granadas (Arquivos Secretos 4, p. 71)
    { id: "eq.mod.adesiva", aplica: "granada", grupo: "Granadas (AS4)", nome: "Adesiva", efeito: "A granada gruda no alvo. Se for um ser, faça um ataque à distância contra a Defesa dele: se errar, gruda no espaço onde ele está; se acertar, gruda no ser (que falha automaticamente nos testes de resistência contra ela). Se o efeito não for instantâneo, a granada se move com o alvo até ele gastar uma ação padrão para removê-la.", fonte: "Arquivos Secretos 4", pagina: "71" },
    { id: "eq.mod.dupla", aplica: "granada", grupo: "Granadas (AS4)", nome: "Dupla", efeito: "A granada tem um efeito adicional: escolha o efeito de outra granada de categoria igual ou menor (exceto itens amaldiçoados), diferente do principal, que se ativa junto com ele.", fonte: "Arquivos Secretos 4", pagina: "71" },
    { id: "eq.mod.programada", aplica: "granada", grupo: "Granadas (AS4)", nome: "Programada", efeito: "A granada tem um temporizador: após arremessá-la ou posicioná-la, você define em quantos turnos ela se ativa.", fonte: "Arquivos Secretos 4", pagina: "71" },
    // acessórios
    { id: "eq.mod.aprimorado", aplica: "acessorio", grupo: "Acessórios", nome: "Aprimorado", efeito: "O bônus em perícia concedido pelo acessório aumenta para +5. Se o item tiver função adicional, pode ser escolhida uma segunda vez para essa função.", pagina: "64" },
    { id: "eq.mod.discreto", aplica: "acessorio", grupo: "Acessórios", nome: "Discreto", efeito: "Item miniaturizado ou disfarçado: reduz o espaço em 1, dá +5 em testes de Crime para ser ocultado (mesmo sem treino na perícia).", pagina: "64" },
    { id: "eq.mod.funcaoadicional", aplica: "acessorio", grupo: "Acessórios", nome: "Função Adicional", efeito: "O acessório fornece +2 em uma perícia adicional à sua escolha, sujeita à aprovação do mestre.", pagina: "64" },
    { id: "eq.mod.instrumental", aplica: "acessorio", grupo: "Acessórios", nome: "Instrumental", efeito: "O acessório pode ser usado como um kit de perícia específico (escolhido ao aplicar a modificação).", pagina: "64" },
    { id: "eq.mod.bateria", aplica: "acessorio", grupo: "Acessórios (SaH)", nome: "Bateria Potente", efeito: "Para objetos elétricos: em lanternas, celulares e notebooks, dobra a duração da bateria e o alcance da luz. Em um taser, dobra os usos, aumenta o dano para 1d8 e a DT para resistir em +5. Outros objetos, a critério do mestre.", fonte: "Sobrevivendo ao Horror", pagina: "39" },
    { id: "eq.mod.lente", aplica: "acessorio", grupo: "Acessórios (SaH)", nome: "Lente de Revelação", efeito: "Para câmeras de aura paranormal: permite ver seres invisíveis e incorpóreos e ignorar a camuflagem deles. Ação padrão + 1 PE para fotografar uma criatura em alcance curto: até o fim da cena ela perde camuflagem e invisibilidade e se torna corpórea (Vontade DT Pre evita).", fonte: "Sobrevivendo ao Horror", pagina: "45" },
    // drones (Arquivos Secretos 9, p. 47)
    { id: "eq.mod.dronecirurgiao", aplica: "drone", grupo: "Drones (AS9)", nome: "Drone Cirurgião", efeito: "Apenas para o drone médico. O bônus muda para veterano (em vez de treinado) e a habilidade ganha o efeito: gaste 4 PE para curar 4d10 PV ou remover uma condição negativa (exceto morrendo) de si ou de um aliado adjacente.", fonte: "Arquivos Secretos 9", pagina: "47" },
    { id: "eq.mod.dronecodificador", aplica: "drone", grupo: "Drones (AS9)", nome: "Drone Codificador", efeito: "Apenas para o drone hacker. O bônus muda para veterano e a habilidade ganha: ao falhar em um teste de Tecnologia, gaste 2 PE para rolá-lo novamente.", fonte: "Arquivos Secretos 9", pagina: "47" },
    { id: "eq.mod.droneeficiente", aplica: "drone", grupo: "Drones (AS9)", nome: "Drone Eficiente", efeito: "Apenas para o drone utilitário. O bônus muda para veterano e o custo da habilidade cai para 1 PE (em vez de 2 PE).", fonte: "Arquivos Secretos 9", pagina: "47" },
    { id: "eq.mod.dronefuzilador", aplica: "drone", grupo: "Drones (AS9)", nome: "Drone Fuzilador", efeito: "Apenas para o drone atirador. O bônus muda para veterano e o dano da habilidade muda para +5d8 de dano balístico extra.", fonte: "Arquivos Secretos 9", pagina: "47" },
    { id: "eq.mod.dronegenial", aplica: "drone", grupo: "Drones (AS9)", nome: "Drone Genial", efeito: "Apenas para o drone inteligente. Comando por tecnologia neural (receptor no ouvido, controle por pensamento), alcance do controle 20km, carga de 10 espaços e a habilidade passa a durar até o fim da missão (como na ação de interlúdio ler).", fonte: "Arquivos Secretos 9", pagina: "47" },
    { id: "eq.mod.droneguardiao", aplica: "drone", grupo: "Drones (AS9)", nome: "Drone Guardião", efeito: "Apenas para o drone protetor. O bônus aumenta para +10 na Defesa e a habilidade ganha: ao sofrer dano, gaste 2 PE para receber RD 5 contra esse dano.", fonte: "Arquivos Secretos 9", pagina: "47" },
    { id: "eq.mod.droneobservador", aplica: "drone", grupo: "Drones (AS9)", nome: "Drone Observador", efeito: "Apenas para o drone espião. O bônus muda para veterano e também afeta Percepção; o custo da habilidade cai para 1 PE (em vez de 2 PE).", fonte: "Arquivos Secretos 9", pagina: "47" },
    { id: "eq.mod.droneversatil", aplica: "drone", grupo: "Drones (AS9)", nome: "Drone Versátil", efeito: "O drone recebe o bônus e a habilidade de um tipo de aliado drone diferente do dele. Pode ser aplicada várias vezes.", fonte: "Arquivos Secretos 9", pagina: "47" },
    // proteções
    { id: "eq.mod.antibombas", aplica: "vestimenta", grupo: "Proteções", nome: "Antibombas", efeito: "+5 em testes de resistência contra efeitos de área. Acompanha capacete com viseira. Só em proteções pesadas.", pagina: "62" },
    { id: "eq.mod.blindada", aplica: "vestimenta", grupo: "Proteções", nome: "Blindada", efeito: "Aumenta a resistência a dano para 5 e o espaço ocupado em +1. Só em proteções pesadas.", pagina: "62" },
    { id: "eq.mod.discretaP", aplica: "vestimenta", grupo: "Proteções", nome: "Discreta", efeito: "Reduz o espaço em 1 e dá +5 em testes de Crime para ser ocultada (mesmo sem treino). Só em proteções leves. Não combina com Reforçada.", pagina: "62" },
    { id: "eq.mod.reforcada", aplica: "vestimenta", grupo: "Proteções", nome: "Reforçada", efeito: "Aumenta a Defesa em +2 e o espaço ocupado em +1. Não pode ser reforçada e discreta ao mesmo tempo.", pagina: "62" },
  ],
};

/* ----- armas: gerador compacto ----- */
(function () {
  const A = EQUIP_OP_PADRAO.armas;
  const TIPOS = { C: "Corte", I: "Impacto", P: "Perfuração", B: "Balístico", F: "Fogo" };
  // [id, grupo, nome, cat, dano, crit(margem), mult, alcance, tipo, espaços, perícia, atributo, descrição]
  const L = (id, grupo, nome, cat, dano, crit, mult, alc, tipo, esp, per, atr, desc, fonte = "Livro de Regras", pagina = "56") => {
    const o = { id: "eq.arma." + id, grupo, nome, categoria: cat, dano, critico: String(crit), multiplicador: String(mult), alcance: alc, tipoDano: TIPOS[tipo] || "", espacos: esp, pericia: per, atributoDano: atr, desc, fonte, pagina };
    A.push(o);
    return o;
  };

  const S = "Armas simples";
  const T = "Armas táticas";
  const P = "Armas pesadas";
  const CC = "Corpo a corpo", DS = "Disparo", FG = "Fogo";

  L("faca", S + " · Corpo a corpo leve", "Faca", "0", "1d4", 19, 2, "Curto", "C", 1, "Luta", "Agilidade", "Arma ágil (usa Agilidade no ataque e no dano). Pode ser arremessada. Facas de cozinha pequenas causam apenas 1d3.");
  L("martelo", S + " · Corpo a corpo leve", "Martelo", "0", "1d6", 20, 2, CC, "I", 1, "Luta", "Força", "Ferramenta comum usada como arma na falta de opções melhores.");
  L("punhal", S + " · Corpo a corpo leve", "Punhal", "0", "1d4", 20, 3, CC, "P", 1, "Luta", "Agilidade", "Faca de lâmina longa e pontiaguda, usada por cultistas em rituais. Arma ágil.");
  L("bastao", S + " · Corpo a corpo, uma mão", "Bastão", "0", "1d6/1d8", 20, 2, CC, "I", 1, "Luta", "Força", "Cilindro de madeira maciça (taco, cassetete, tonfa...). Dano 1d6 com uma mão ou 1d8 com as duas.");
  L("machete", S + " · Corpo a corpo, uma mão", "Machete", "0", "1d6", 19, 2, CC, "C", 1, "Luta", "Força", "Lâmina longa e larga, muito usada para abrir trilhas.");
  L("lanca", S + " · Corpo a corpo, uma mão", "Lança", "0", "1d6", 20, 2, "Curto", "P", 1, "Luta", "Força", "Haste de madeira com ponta metálica. Pode ser arremessada.");
  L("cajado", S + " · Corpo a corpo, duas mãos", "Cajado", "0", "1d6/1d6", 20, 2, CC, "I", 2, "Luta", "Agilidade", "Cabo de madeira ou barra de ferro longos (inclui o bo). Arma ágil; pode ser usado com Combater com Duas Armas como arma de uma mão e uma arma leve.");
  L("arco", S + " · Disparo, duas mãos", "Arco", "0", "1d6", 20, 3, "Médio", "P", 2, "Pontaria", "", "Arco e flecha comum, próprio para tiro ao alvo. Usa flechas (categoria 0, 1 espaço).");
  L("besta", S + " · Disparo, duas mãos", "Besta", "0", "1d8", 19, 2, "Médio", "P", 2, "Pontaria", "", "Arma antiga; exige uma ação de movimento para recarregar a cada disparo. Usa flechas.");
  L("pistola", S + " · Fogo, leve", "Pistola", "I", "1d12", 18, 2, "Curto", "B", 1, "Pontaria", "", "Arma de mão comum entre policiais e militares, facilmente recarregável. Usa balas curtas (categoria 0, 1 espaço).");
  L("revolver", S + " · Fogo, leve", "Revólver", "I", "2d6", 19, 3, "Curto", "B", 1, "Pontaria", "", "A arma de fogo mais comum e uma das mais confiáveis. Usa balas curtas.");
  L("fuzilcaca", S + " · Fogo, duas mãos", "Fuzil de caça", "I", "2d8", 19, 3, "Médio", "B", 2, "Pontaria", "", "Popular entre fazendeiros, caçadores e atiradores esportistas. Usa balas longas (categoria I, 1 espaço).");

  L("machadinha", T + " · Corpo a corpo leve", "Machadinha", "0", "1d6", 20, 3, "Curto", "C", 1, "Luta", "Força", "Ferramenta para cortar madeira, comum em fazendas e canteiros de obras. Pode ser arremessada.");
  L("nunchaku", T + " · Corpo a corpo leve", "Nunchaku", "0", "1d8", 20, 2, CC, "I", 1, "Luta", "Agilidade", "Dois bastões curtos de madeira ligados por uma corrente. Arma ágil.");
  L("corrente", T + " · Corpo a corpo, uma mão", "Corrente", "0", "1d8", 20, 2, CC, "I", 1, "Luta", "Força", "Corrente grossa usada como arma. Fornece +2 em testes para desarmar e derrubar.");
  L("espada", T + " · Corpo a corpo, uma mão", "Espada", "I", "1d8/1d10", 19, 2, CC, "C", 1, "Luta", "Força", "Espada longa medieval ou cimitarra. Dano 1d8 com uma mão ou 1d10 com as duas.");
  L("florete", T + " · Corpo a corpo, uma mão", "Florete", "I", "1d6", 18, 2, CC, "C", 1, "Luta", "Agilidade", "Espada de lâmina fina e comprida usada por esgrimistas. Arma ágil.");
  L("machado", T + " · Corpo a corpo, uma mão", "Machado", "I", "1d8", 20, 3, CC, "C", 1, "Luta", "Força", "Ferramenta de lenhadores e bombeiros que causa ferimentos terríveis.");
  L("maca", T + " · Corpo a corpo, uma mão", "Maça", "I", "2d4", 20, 2, CC, "I", 1, "Luta", "Força", "Bastão com uma cabeça metálica cheia de protuberâncias.");
  L("acha", T + " · Corpo a corpo, duas mãos", "Acha", "I", "1d12", 20, 3, CC, "C", 2, "Luta", "Força", "Machado grande e pesado, usado no corte de árvores largas.");
  L("gadanho", T + " · Corpo a corpo, duas mãos", "Gadanho", "I", "2d4", 20, 4, CC, "C", 2, "Luta", "Força", "Versão maior da foice, para duas mãos. Criada para ceifar cereais, mas também ceifa vidas.");
  L("katana", T + " · Corpo a corpo, duas mãos", "Katana", "I", "1d10", 19, 2, CC, "C", 2, "Luta", "Agilidade", "Espada longa e levemente curvada. Arma ágil. Se você for veterano em Luta, pode usá-la como arma de uma mão.");
  L("marreta", T + " · Corpo a corpo, duas mãos", "Marreta", "I", "3d4", 20, 2, CC, "I", 2, "Luta", "Força", "Usada para demolir paredes (e pessoas). Serve também para picaretas e outras ferramentas de construção.");
  L("montante", T + " · Corpo a corpo, duas mãos", "Montante", "I", "2d6", 19, 2, CC, "C", 2, "Luta", "Força", "Espada enorme de 1,5m, uma das armas mais poderosas de seu tempo.");
  L("motosserra", T + " · Corpo a corpo, duas mãos", "Motosserra", "I", "3d6", 20, 2, CC, "C", 2, "Luta", "Força", "Ao rolar 6 em um dado de dano, role um dado de dano adicional. Desajeitada: -1 dado nos testes de ataque. Ligar gasta uma ação de movimento.");
  L("arcocomposto", T + " · Disparo, duas mãos", "Arco composto", "I", "1d10", 20, 3, "Médio", "P", 2, "Pontaria", "Força", "Arco moderno com roldanas. Permite aplicar a Força às rolagens de dano. Usa flechas.");
  L("balestra", T + " · Disparo, duas mãos", "Balestra", "I", "1d12", 19, 2, "Médio", "P", 2, "Pontaria", "", "Besta pesada, de disparos poderosos. Exige uma ação de movimento para recarregar a cada disparo. Usa flechas.");
  L("submetralhadora", T + " · Fogo, uma mão", "Submetralhadora", "I", "2d6", 19, 3, "Curto", "B", 1, "Pontaria", "", "Arma automática que pode ser empunhada com uma mão. Usa balas curtas.");
  L("espingarda", T + " · Fogo, duas mãos", "Espingarda", "I", "4d6", 20, 3, "Curto", "B", 2, "Pontaria", "", "Arma longa de cano liso; causa apenas metade do dano em alcance médio ou maior. Usa cartuchos (categoria I, 1 espaço).");
  L("fuzilassalto", T + " · Fogo, duas mãos", "Fuzil de assalto", "II", "2d10", 19, 3, "Médio", "B", 2, "Pontaria", "", "Arma padrão da maioria dos exércitos. Automática. Usa balas longas.");
  L("fuzilprecisao", T + " · Fogo, duas mãos", "Fuzil de precisão", "III", "2d10", 19, 3, "Longo", "B", 2, "Pontaria", "", "Uso militar, projetado para disparos longos e precisos. Se for veterano em Pontaria e mirar, recebe +5 na margem de ameaça do ataque. Usa balas longas.");

  L("bazuca", P + " · Fogo, duas mãos", "Bazuca", "III", "10d8", 20, 2, "Médio", "I", 2, "Pontaria", "", "Lança-foguetes anti-tanque. Causa dano no alvo e em todos os seres em 3m (Reflexos DT Agi reduz à metade, exceto o alvo direto). Pode disparar em um ponto sem rolar ataque. Recarregar: ação de movimento. Usa foguetes (categoria I, 1 espaço, um disparo cada).");
  L("lancachamas", P + " · Fogo, duas mãos", "Lança-chamas", "III", "6d6", 20, 2, "Curto", "F", 2, "Pontaria", "", "Atinge todos os seres em uma linha de 1,5m de largura e alcance curto com um único teste de ataque. Seres atingidos ficam em chamas. Usa combustível (categoria I, 1 espaço).");
  L("metralhadora", P + " · Fogo, duas mãos", "Metralhadora", "II", "2d12", 19, 3, "Médio", "B", 2, "Pontaria", "", "Arma pesada e automática. Exige Força 4 ou gastar uma ação de movimento para apoiá-la no tripé; senão, -5 nos ataques. Usa balas longas.");

  /* ---- Sobrevivendo ao Horror, tabela 1.4 (p. 37-38) ---- */
  const SH = "Sobrevivendo ao Horror", SG = "SaH · ";
  L("pregador", SG + "Armas simples · Disparo, uma mão", "Pregador pneumático", "0", "1d4", 20, 4, "Curto", "P", 1, "Pontaria", "", "Aparelho que dispara pregos sob pressão. Embora seja mecânico, conta como arma de fogo para poderes que afetam esse tipo. Armazena 300 pregos em rolo, o bastante para uma missão inteira.", SH, "37");
  L("estilingue", SG + "Armas simples · Disparo, duas mãos", "Estilingue", "0", "1d4", 20, 2, "Curto", "I", 1, "Pontaria", "Força", "Permite aplicar a Força às rolagens de dano. Dispara bolinhas reaproveitáveis (ou pedrinhas): um pacote dura uma missão, tem categoria 0 e ocupa o mesmo espaço do estilingue. Também lança granadas, o que permite arremessá-las em alcance longo.", SH, "37");
  L("revolvercompacto", SG + "Armas simples · Fogo, leve", "Revólver compacto", "I", "2d4", 19, 3, "Curto", "P", 1, "Pontaria", "", "Arma de baixo calibre, fácil de esconder. Se for treinado em Crime, você carrega uma sem que ela ocupe espaço. Usa balas curtas (capacidade de 5 balas na contagem de munição).", SH, "37");
  L("baioneta", SG + "Armas táticas · Corpo a corpo leve", "Baioneta", "0", "1d4", 19, 2, CC, "P", 1, "Luta", "Agilidade", "Lâmina para fixar em fuzil. Ação de movimento para fixar em arma de fogo de duas mãos: vira arma de duas mãos ágil com dano 1d6, mas você sofre -1 dado em ataques à distância com a arma de fogo.", SH, "37");
  L("facatatica", SG + "Armas táticas · Corpo a corpo leve", "Faca tática", "I", "1d6", 19, 2, "Curto", "C", 1, "Luta", "Agilidade", "Faca balanceada para contra-ataques e bloqueios. Na ação contra-atacar: +2 no ataque. Na ação bloquear: gaste 2 PE e sacrifique a faca para aumentar a RD do bloqueio em +20. Arma ágil, pode ser arremessada.", SH, "37");
  L("ganchocarne", SG + "Armas táticas · Corpo a corpo leve", "Gancho de carne", "0", "1d4", 20, 4, CC, "P", 1, "Luta", "Força", "Gancho metálico usado em frigoríficos. Amarrado a corda ou corrente, seu alcance vai a 4,5m e ele passa a ocupar 2 espaços.", SH, "37");
  L("bastaopolicial", SG + "Armas táticas · Corpo a corpo, uma mão", "Bastão policial", "I", "1d6", 20, 2, "Curto", "I", 1, "Luta", "Agilidade", "Bastão com guarda lateral, arma branca padrão das forças policiais. Na ação esquiva com ele, o bônus na Defesa aumenta em +1. Arma ágil.", SH, "37");
  L("picareta", SG + "Armas táticas · Corpo a corpo, uma mão", "Picareta", "0", "1d6", 20, 4, CC, "P", 1, "Luta", "Força", "Ferramenta de mineração e demolição empregada em combate na falta de armas melhores.", SH, "37");
  L("shuriken", SG + "Armas táticas · Arremesso", "Shuriken", "I", "1d4", 20, 2, "Curto", "P", 0.5, "Pontaria", "", "Projéteis metálicos de artistas marciais. Se for veterano em Pontaria, uma vez por rodada, ao atacar com shuriken pode gastar 1 PE para um ataque adicional contra o mesmo alvo. Um pacote dura duas cenas (ou 10 shurikens, com a contagem de munição).", SH, "37");
  L("pistolapesada", SG + "Armas táticas · Fogo, uma mão", "Pistola pesada", "I", "2d8", 18, 2, "Curto", "B", 1, "Pontaria", "", "Pistola de calibre superior. Potência e recuo impõem -1 dado nos ataques; empunhá-la com as duas mãos anula a penalidade. Usa balas curtas (10 balas na contagem de munição).", SH, "37");
  L("espingardaduplo", SG + "Armas táticas · Fogo, duas mãos", "Espingarda de cano duplo", "II", "4d6", 20, 3, "Curto", "B", 2, "Pontaria", "", "Dois canos, cada um com gatilho e um cartucho. Após disparar os dois, recarregar custa uma ação de movimento. Pode disparar os dois canos no mesmo alvo: -1 dado no ataque, mas o dano vira 6d6. Usa cartuchos (2 balas).", SH, "37");

  /* ---- Arquivos Secretos ---- */
  const AG = "Arquivos Secretos · ";
  L("lancagranadas", AG + "Armas de fogo pesadas", "Lançador de granadas", "II", "Conforme a granada", "", "", "Longo", "", 2, "Pontaria", "", "Arma de fogo pesada de duas mãos, alcance longo, sem dano próprio: causa o efeito da granada usada no alvo atingido e em todos no raio dela (teste de ataque contra Defesa; o alvo direto só resiste a efeitos que não sejam dano). Comporta até 6 granadas de 40mm; recarregar uma gasta ação de movimento. Pode disparar em um ponto em alcance longo sem rolar ataque. Não dispara granadas arremessáveis nem pode ser automático.", "Arquivos Secretos 4", "71");
  L("lancagranadasport", AG + "Armas táticas", "Lançador de granadas portátil", "II", "Conforme a granada", "", "", "Longo", "", 1, "Pontaria", "", "Versão compacta, popular entre militares que marcham longas distâncias. Funciona como um lançador de granadas, mas só comporta uma granada por vez.", "Arquivos Secretos 9", "51");
  L("dmr", AG + "Armas táticas", "Rifle de atirador designado (DMR)", "III", "2d10", 19, 3, "Médio", "B", 3, "Pontaria", "", "Fuzil tático de duas mãos para confrontos de médio alcance. Permite usar Ataque Furtivo até alcance médio. Pode atacar até o dobro do alcance com -5 no ataque (em vez de -1 dado). Se for veterano em Pontaria e mirar, +5 na margem de ameaça. Usa balas longas.", "Arquivos Secretos 9", "43");
  L("serrada", AG + "Armas táticas", "Espingarda serrada", "I", "3d6", 20, 3, "Curto", "B", 1, "Pontaria", "", "Modelo portátil de escopeta, de uma mão, muito usado em arrombamentos. Causa apenas metade do dano em alcance médio ou maior. Usa cartuchos.", "Arquivos Secretos 9", "51");
  L("machadotatico", AG + "Armas táticas", "Machado tático", "II", "1d8", 20, 3, "Curto", "C", 1, "Luta", "Agilidade", "Arma corpo a corpo de uma mão em aço, balanceada. Na ação contra-atacar: +2 no ataque. Na ação bloquear: gaste 2 PE e sacrifique o machado para aumentar a RD do bloqueio em +20. Arma ágil, pode ser arremessada.", "Arquivos Secretos 9", "51");
  L("pistolataser", AG + "Armas simples", "Pistola taser", "II", "2d6", 20, 3, "Curto", "", 1, "Pontaria", "", "Arma de disparo simples, de uma mão. O ser atingido fica atordoado por uma rodada (Fortitude DT Agi evita); um mesmo alvo só fica atordoado uma vez por cena. Dano de eletricidade. Usa dardos condutores (categoria I, 1 espaço; 20 ataques por pacote).", "Arquivos Secretos 9", "52").tipoDano = "Eletricidade";
  L("garraharpia", AG + "Armas únicas", "Garra do Harpia", "II", "2d8", 19, 2, "Curto", "C", 2, "Luta", "Agilidade", "Rastelo transformado em arma tática ágil de duas mãos. Pode ser arremessada em alcance curto. Ao causar dano, gaste 2 PE para fazer uma manobra de agarrar como ação livre (sem soltar a arma). Usável com Combater com Duas Armas como arma de uma mão e uma arma leve. Item único (apenas um agente pode escolhê-lo).", "Arquivos Secretos 3", "112");
})();

/* =====================================================================
   Catálogo editável (guardado na ficha)
   ===================================================================== */
let limiteItensOP = { pp: 0, lim: {} }; // pontos de prestígio e limites editados (null/ausente = automático)
let equipOPCustom = null; // { over: {id: entrada}, rem: [ids], add: {armas:[], protecoes:[], mods:[]} }

function _eqCust() {
  if (!equipOPCustom) equipOPCustom = { over: {}, rem: [], add: { armas: [], protecoes: [], mods: [], itens: [], rituais: [], maldicoes: [] } };
  const c = equipOPCustom;
  c.over = c.over || {};
  c.rem = c.rem || [];
  c.add = c.add || {};
  ["armas", "protecoes", "mods", "itens", "rituais", "maldicoes"].forEach((k) => { if (!Array.isArray(c.add[k])) c.add[k] = []; });
  return c;
}

function obterEquipOP(tipo) {
  const c = equipOPCustom || {};
  const rem = c.rem || [];
  const over = c.over || {};
  const base = (EQUIP_OP_PADRAO[tipo] || [])
    .filter((e) => !rem.includes(e.id))
    .map((e) => over[e.id] || e);
  const extras = ((c.add || {})[tipo] || []).map((e) => over[e.id] || e);
  return base.concat(extras);
}

function carregarEquipOP(p) {
  equipOPCustom = p && p.equipOP && typeof p.equipOP === "object" ? p.equipOP : null;
  limiteItensOP = p && p.limiteOP && typeof p.limiteOP === "object" ? p.limiteOP : { pp: 0, lim: {} };
  if (typeof montarLimiteItensOP === "function") setTimeout(() => montarLimiteItensOP(true), 0);
  if (typeof atualizarCatFinalOP === "function") setTimeout(atualizarCatFinalOP, 0);
}

function salvarEquipOP(p) {
  p.equipOP = equipOPCustom || null;
  p.limiteOP = limiteItensOP;
}

/* =====================================================================
   Categoria final = base + modificações (cada uma aumenta em I)
   ===================================================================== */
const _ROMANOS_OP = ["0", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

function categoriaParaNumeroOP(txt) {
  const t = String(txt ?? "").trim().toUpperCase();
  if (!t || t === "—" || t === "-") return null;
  if (/^\d+$/.test(t)) return parseInt(t, 10);
  const i = _ROMANOS_OP.indexOf(t);
  return i >= 0 ? i : null;
}

function numeroParaCategoriaOP(n) {
  return n >= 0 && n < _ROMANOS_OP.length ? _ROMANOS_OP[n] : String(n);
}

/* base: texto da categoria; mods: lista [{cat}] -> {texto, base, extra} */
function categoriaFinalOP(base, mods) {
  const extra = (mods || []).reduce((s, m) => s + Math.max(0, parseInt(m && m.cat) || 0), 0);
  const b = categoriaParaNumeroOP(base);
  if (b === null && !extra) return { texto: "", base: "", extra: 0 };
  const baseNum = b === null ? 0 : b;
  return { texto: numeroParaCategoriaOP(baseNum + extra), base: numeroParaCategoriaOP(baseNum), extra };
}

function categoriaDoItemOP(item) {
  const mods = typeof _modsDoItem === "function" ? _modsDoItem(item || {}) : [];
  return categoriaFinalOP(item && item.categoria, mods);
}

/* texto para o popup */
function categoriaPopupOP(item) {
  const c = categoriaDoItemOP(item);
  if (!c.texto) return "—";
  return c.extra ? `${c.texto} (base ${c.base} +${c.extra})` : c.texto;
}

/* chip do card */
function categoriaChipOP(item) {
  const c = categoriaDoItemOP(item);
  if (!c.texto) return "";
  const dica = c.extra ? ` title="Base ${esc(c.base)} + ${c.extra} por modificações"` : "";
  return `<span class="item-subtag item-subtag-categoria"${dica}>Cat. ${esc(c.texto)}</span>`;
}

/* indicador ao vivo nos formulários */
function atualizarCatFinalOP() {
  document.querySelectorAll('[id$="ModLista"]').forEach((lista) => {
    const tipo = lista.dataset.tipo;
    if (tipo !== "arma" && tipo !== "vestimenta") return;
    const prefixo = lista.id.slice(0, -"ModLista".length);
    const baseEl = document.getElementById(prefixo + "Categoria");
    if (!baseEl) return;
    const mods = [];
    lista.querySelectorAll(".mod-linha").forEach((l) => {
      mods.push({ cat: l.querySelector(".mod-cat")?.value });
    });
    const c = categoriaFinalOP(baseEl.value, mods);
    const pill = document.getElementById(prefixo + "FinalPill");
    if (pill) pill.textContent = c.texto ? `Final: ${c.texto}` : "Final: —";
    const conta = document.getElementById(prefixo + "Conta");
    if (conta) conta.textContent = c.extra ? `Base ${c.base} + ${c.extra} de aplicados = ${c.texto}` : "";
    const detalhes = lista.closest("details");
    if (!detalhes) return;
    let aviso = document.getElementById(prefixo + "CatFinal");
    if (!aviso) {
      aviso = document.createElement("small");
      aviso.id = prefixo + "CatFinal";
      aviso.className = "cat-final-op";
      detalhes.insertAdjacentElement("afterend", aviso);
    }
    aviso.textContent = c.texto
      ? c.extra
        ? `Categoria final: ${c.texto} (base ${c.base} + ${c.extra} por modificações)`
        : `Categoria final: ${c.texto}`
      : "";
    aviso.style.display = c.texto ? "block" : "none";
  });
}

document.addEventListener("input", (e) => {
  const t = e.target;
  if (!t || !t.closest) return;
  if (t.closest(".mod-lista") || /Categoria$/.test(t.id || "")) atualizarCatFinalOP();
});
document.addEventListener("click", (e) => {
  if (e.target.closest && (e.target.closest(".mod-remover") || e.target.closest(".mod-add") || e.target.closest(".eq-add-mod"))) {
    setTimeout(atualizarCatFinalOP, 0);
  }
});

/* =====================================================================
   Seletores nos formulários (preencher a partir do catálogo)
   ===================================================================== */
function _eqOptGroups(lista, rotulo) {
  const grupos = {};
  lista.forEach((e) => { (grupos[e.grupo || "Outros"] = grupos[e.grupo || "Outros"] || []).push(e); });
  return Object.entries(grupos)
    .map(([g, itens]) => `<optgroup label="${esc(g)}">${itens.map((e) => `<option value="${esc(e.id)}">${esc(rotulo(e))}</option>`).join("")}</optgroup>`)
    .join("");
}

/* barra no topo do formulário: tipo "arma" | "vestimenta" */
function htmlCatalogoEquipOP(prefixo, tipo) {
  const arma = tipo === "arma";
  const kind = arma ? "armas" : "protecoes";
  const lista = obterEquipOP(kind);
  const selId = prefixo + "CatalogoSel";
  const nome = arma ? "arma" : "vestimenta";
  const gerenciar = prefixo === "arma" || prefixo === "armadura"
    ? `<button type="button" class="eq-link" onclick="abrirGerenciadorEquipOP('${kind}')">⚙ Editar catálogo</button>`
    : "";
  _registrarSeletorOP(selId, { kind, lista, acao: `aplicarCatalogoEquipOP('${prefixo}','${tipo}')`, titulo: arma ? "Catálogo de armas" : "Catálogo de vestimentas", usar: `Usar ${arma ? "esta arma" : "esta vestimenta"}`, fecha: true });
  return `
    <div class="eq-catalogo" id="${prefixo}CatalogoBox">
      <label class="eq-rotulo">Catálogo de ${arma ? "armas" : "vestimentas"}</label>
      <button type="button" class="eq-cat-btn" onclick="abrirSeletorOP('${selId}')"><span>Escolher ${nome} do catálogo</span><i>›</i></button>
      <select id="${selId}" hidden aria-hidden="true"><option value=""></option>${lista.map((e) => `<option value="${esc(e.id)}"></option>`).join("")}</select>
      ${gerenciar}
    </div>`;
}

function _setValOP(id, valor) {
  const el = document.getElementById(id);
  if (el) { el.value = valor ?? ""; el.dispatchEvent(new Event("input", { bubbles: true })); }
}

function aplicarCatalogoEquipOP(prefixo, tipo) {
  const sel = document.getElementById(prefixo + "CatalogoSel");
  if (!sel || !sel.value) return;
  const lista = obterEquipOP(tipo === "arma" ? "armas" : "protecoes");
  const e = lista.find((x) => x.id === sel.value);
  if (!e) return;
  _setValOP(prefixo + "Nome", e.nome);
  _setValOP(prefixo + "Espacos", e.espacos ?? 0);
  _setValOP(prefixo + "Categoria", e.categoria || "");
  _setValOP(prefixo + "Desc", e.desc || "");
  if (tipo === "arma") {
    _setValOP(prefixo + "Dano", e.dano || "");
    ["critico", "multiplicador", "tipoDano", "alcance", "pericia", "atributoDano"].forEach((k) => {
      _setValOP(`${prefixo}Det_${k}`, e[k] || "");
    });
    // abre a seção de detalhes
    document.getElementById(`${prefixo}Det_critico`)?.closest("details")?.setAttribute("open", "");
  } else {
    _setValOP(prefixo + "CA", e.ca || "");
    ["resistencias", "penalidades", "requisitos"].forEach((k) => _setValOP(`${prefixo}Det_${k}`, e[k] || ""));
    document.getElementById(`${prefixo}Det_resistencias`)?.closest("details")?.setAttribute("open", "");
  }
  sel.value = "";
  atualizarCatFinalOP();
}

/* =====================================================================
   Seletor em popup (catálogos de armas, vestimentas, itens, modificações,
   maldições e rituais). Abre por cima do formulário, sem perder o que já foi
   preenchido: nome, resumo e, ao tocar, a descrição completa.
   ===================================================================== */
const APLICA_TAG_OP = { arma: "Armas", vestimenta: "Vestimentas", acessorio: "Acessórios", granada: "Granadas", drone: "Drones" };
const _seletoresOP = {};

function _registrarSeletorOP(selId, cfg) { _seletoresOP[selId] = cfg; }

function _eqTextoCat(kind, e) {
  if (kind === "maldicoes") return "+II (1ª) / +I";
  if (kind === "rituais") return "não muda a categoria";
  const n = e.cat ?? 1;
  return n ? `+${n} cat.` : "não muda a categoria";
}

function _statsSeletorOP(kind, e) {
  const par = (rot, v) => (v === undefined || v === null || v === "" ? "" : `<div><small>${rot}</small><b>${esc(String(v))}</b></div>`);
  if (kind === "armas")
    return par("Dano", e.dano) + par("Crítico", e.critico ? `${e.critico}/x${e.multiplicador || 2}` : "") + par("Alcance", e.alcance) + par("Tipo de dano", e.tipoDano) + par("Perícia", e.pericia) + par("Espaços", e.espacos);
  if (kind === "protecoes")
    return par("Defesa", e.ca) + par("Espaços", e.espacos) + par("Resistências", e.resistencias) + par("Penalidades", e.penalidades) + par("Requisitos", e.requisitos);
  if (kind === "itens") return par("Categoria", e.categoria) + par("Espaços", e.espacos);
  return "";
}

/* filtros do catálogo: cada tipo de lista tem as suas "gavetas" (tipo, uso, elemento, categoria…) */
function _facetasOP(kind, e) {
  if (kind === "poderes") return e.facetas || []; // página de poderes (catalogo-op.js) já traz as gavetas prontas
  const g = e.grupo || "";
  const t = _norm(g);
  const partes = g.split(" · ");
  const cat = e.categoria !== undefined && e.categoria !== "" ? [["Categoria", `Cat. ${e.categoria}`]] : [["Categoria", null]];
  if (kind === "armas") {
    const tipo = /unicas/.test(t) ? "Únicas" : /amaldic/.test(t) ? "Amaldiçoadas" : /pesadas/.test(t) ? "Pesadas" : /taticas/.test(t) ? "Táticas" : /simples/.test(t) ? "Simples" : "Outras";
    const alc = _norm(e.alcance || "");
    const uso = /corpo a corpo/.test(t) || /corpo/.test(alc) || /^luta/.test(_norm(e.pericia || "")) ? "Corpo a corpo" : /arremesso/.test(t) ? "Arremesso" : /disparo/.test(t) ? "Disparo" : /fogo/.test(t) || /^pontaria/.test(_norm(e.pericia || "")) ? "Fogo" : "Outras";
    return [["Tipo", tipo], ["Uso", uso], ...cat];
  }
  if (kind === "protecoes") {
    const am = /amaldic/.test(t);
    const tipo = am ? "Amaldiçoadas" : /trajes/.test(t) ? "Trajes" : /paranormais/.test(t) ? "Paranormais" : "Proteções";
    return [["Tipo", tipo], ["Elemento", am ? partes[1] || null : null], ...cat];
  }
  if (kind === "itens") {
    const am = /amaldic/.test(t);
    let tipo = partes[0];
    if (am) tipo = "Amaldiçoados";
    else if (/operacionais/.test(t)) tipo = "Operacionais";
    else if (/paranormais/.test(t)) tipo = "Paranormais";
    return [["Tipo", tipo], ["Elemento", am ? partes[1] || null : null], ...cat];
  }
  if (kind === "mods") return [["Serve para", APLICA_TAG_OP[e.aplica] || null]];
  if (kind === "maldicoes") return [["Serve para", APLICA_TAG_OP[e.aplica] || null], ["Elemento", g.replace("Maldições de ", "") || null]];
  return [];
}

/* organização do catálogo: por tema (uso, tipo, elemento), nunca por livro; o livro vai no fim de cada cartão */
const _ORDEM_TIER_OP = ["Simples", "Táticas", "Pesadas", "Únicas", "Amaldiçoadas", "Outras"];
const _ORDEM_USO_OP = ["Corpo a corpo", "Arremesso", "Disparo", "Fogo", "Outras"];
const _TITULO_USO_OP = { "Corpo a corpo": "Corpo a corpo", Arremesso: "Arremesso", Disparo: "Disparo (arcos e bestas)", Fogo: "Armas de fogo", Outras: "Outras" };
const _ORDEM_TIPO_PROT_OP = ["Proteções", "Trajes", "Paranormais", "Amaldiçoadas"];
const _ORDEM_TIPO_ITEM_OP = ["Operacionais", "Acessórios", "Medicamentos", "Explosivos", "Paranormais", "Amaldiçoados"];
const _ORDEM_ELEM_OP = ["Sangue", "Morte", "Conhecimento", "Energia", "Medo", "Varia"];
const _ORDEM_APLICA_OP = ["arma", "vestimenta", "acessorio", "granada", "drone"];
const _TITULO_APLICA_OP = { arma: "Modificações de armas", vestimenta: "Modificações de vestimentas", acessorio: "Modificações de acessórios", granada: "Modificações de granadas", drone: "Modificações de drones" };

function _idxOP(lista, v) { const i = lista.indexOf(v); return i < 0 ? 99 : i; }

function _titulosGrupoOP(kind, e) {
  const f = _facetasOP(kind, e).map((x) => x[1]);
  if (kind === "armas") return { titulo: _TITULO_USO_OP[f[1]] || "Outras", ordem: _idxOP(_ORDEM_USO_OP, f[1]) * 100 + _idxOP(_ORDEM_TIER_OP, f[0]) * 10, tag: f[0] };
  if (kind === "protecoes") return { titulo: f[0], ordem: _idxOP(_ORDEM_TIPO_PROT_OP, f[0]) * 100 + (f[1] ? _idxOP(_ORDEM_ELEM_OP, f[1]) : 0), tag: f[1] };
  if (kind === "itens") return { titulo: f[0] === "Amaldiçoados" ? "Itens amaldiçoados" : f[0] === "Operacionais" ? "Itens operacionais" : f[0] === "Paranormais" ? "Itens paranormais" : f[0], ordem: _idxOP(_ORDEM_TIPO_ITEM_OP, f[0]) * 100 + (f[1] ? _idxOP(_ORDEM_ELEM_OP, f[1]) : 0), tag: f[1] };
  if (kind === "mods") return { titulo: (e.grupo || "Outras").replace(/\s*\([^)]*\)\s*$/, ""), ordem: _idxOP(_ORDEM_APLICA_OP, e.aplica) * 100, tag: null };
  if (kind === "maldicoes") return { titulo: f[1] ? `Maldições de ${f[1]}` : "Maldições", ordem: _idxOP(_ORDEM_ELEM_OP, f[1]) * 100 + _idxOP(_ORDEM_APLICA_OP, e.aplica), tag: null };
  return { titulo: e.grupo || "Rituais", ordem: 0, tag: null };
}

const _ORDEM_CAT_OP = ["Cat. 0", "Cat. I", "Cat. II", "Cat. III", "Cat. IV"];

let _flSelOP = {};   // filtro escolhido por gaveta: { "0": "Táticas", "1": "Fogo" }
let _flRotOP = {};   // nome de cada gaveta

function _secoesFiltrosOP(kind, lista) {
  const linhas = [];
  lista.forEach((e) => _facetasOP(kind, e).forEach(([rot, val], i) => {
    if (!linhas[i]) linhas[i] = { rot, valores: new Map() };
    if (val) linhas[i].valores.set(val, (linhas[i].valores.get(val) || 0) + 1);
  }));
  const out = [];
  linhas.forEach((l, i) => {
    if (!l || l.valores.size < 2) return;
    let vals = [...l.valores.entries()];
    if (l.rot === "Categoria") vals.sort((x, y) => _ORDEM_CAT_OP.indexOf(x[0]) - _ORDEM_CAT_OP.indexOf(y[0]));
    out.push({ idx: i, rot: l.rot, vals });
  });
  return out;
}

const _ICONE_FILTRO_OP = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 5h18l-7 8v6l-4-2v-4z"/></svg>';

function _htmlFiltrosOP(kind, lista) {
  _flSelOP = {};
  _flRotOP = {};
  const secoes = _secoesFiltrosOP(kind, lista);
  if (!secoes.length) return { botao: "", painel: "" };
  secoes.forEach((x) => { _flRotOP[x.idx] = x.rot; });
  const botao = `<button type="button" class="eq-fl-btn" onclick="abrirPainelFiltrosOP()">${_ICONE_FILTRO_OP}<span>Filtros</span><b id="eqFlBadge" hidden>0</b></button>`;
  const painel = `
    <div class="eq-fl-painel" id="eqFlPainel" hidden>
      <div class="eq-fl-cab"><h4>Filtros</h4><button type="button" class="eq-fl-fechar" onclick="fecharPainelFiltrosOP()" aria-label="Fechar">&times;</button></div>
      <div class="eq-fl-corpo">
        ${secoes.map((x) => `
          <div class="eq-fl-secao">
            <h5>${esc(x.rot)}</h5>
            <div class="eq-fl-grade">
              ${x.vals.map(([v, n]) => `<button type="button" class="eq-fl-op" data-faceta="${x.idx}" data-val="${esc(v)}" onclick="alternarFiltroOP(this)"><span>${esc(v)}</span><small>${n}</small></button>`).join("")}
            </div>
          </div>`).join("")}
      </div>
      <div class="eq-fl-rodape">
        <button type="button" class="eq-fl-limpar" onclick="limparFiltrosOP()">Limpar</button>
        <button type="button" class="eq-fl-ver" id="eqFlVer" onclick="fecharPainelFiltrosOP()">Ver resultados</button>
      </div>
    </div>`;
  return { botao, painel };
}

function abrirPainelFiltrosOP() { const p = document.getElementById("eqFlPainel"); if (p) p.hidden = false; }
function fecharPainelFiltrosOP() { const p = document.getElementById("eqFlPainel"); if (p) p.hidden = true; }

function alternarFiltroOP(btn) {
  const f = btn.dataset.faceta, v = btn.dataset.val;
  if (_flSelOP[f] === v) delete _flSelOP[f]; else _flSelOP[f] = v;
  filtrarPickerOP();
}

function limparFiltrosOP() { _flSelOP = {}; filtrarPickerOP(); }

function removerFiltroOP(f) { delete _flSelOP[f]; filtrarPickerOP(); }

function _cartaoSeletorOP(kind, e, cfg) {
  const catalogoBase = kind === "armas" || kind === "protecoes" || kind === "itens";
  const etiquetas = [];
  if (kind === "armas" && e.dano) etiquetas.push(`<em class="cat">${esc(e.dano)}</em>`);
  if (kind === "protecoes" && e.ca) etiquetas.push(`<em class="cat">Def. ${esc(e.ca)}</em>`);
  if (catalogoBase) etiquetas.push(`<em>Cat. ${esc(e.categoria || "—")}</em>`);
  else {
    if (e.aplica && kind === "maldicoes") etiquetas.push(`<em>${esc(APLICA_TAG_OP[e.aplica] || "")}</em>`);
    etiquetas.push(`<em class="cat">${esc(_eqTextoCat(kind, e))}</em>`);
  }
  const texto = catalogoBase ? e.desc : e.efeito;
  const stats = _statsSeletorOP(kind, e);
  const tg = _titulosGrupoOP(kind, e).tag;
  if (tg) etiquetas.unshift(`<em>${esc(tg)}</em>`);
  const livro = e.fonte ? `${esc(e.fonte)}${e.pagina ? `, p. ${esc(e.pagina)}` : ""}` : "";
  return `
    <div class="eq-pk-card" data-f="${esc(JSON.stringify(_facetasOP(kind, e).map((f) => f[1] || "")))}" data-busca="${esc(_norm([e.nome, e.grupo, texto, e.dano, APLICA_TAG_OP[e.aplica] || ""].join(" ")))}" onclick="alternarCardPickerOP(event, this)">
      <div class="eq-pk-topo"><strong>${esc(e.nome)}</strong><span class="eq-pk-tags">${etiquetas.join("")}</span></div>
      <p class="eq-pk-resumo">${esc(texto || "")}</p>
      ${livro ? `<small class="eq-pk-livro">${livro}</small>` : ""}
      <div class="eq-pk-extra">
        ${stats ? `<div class="eq-pk-stats">${stats}</div>` : ""}
        <div class="eq-pk-rodape">
          <span></span>
          <button type="button" class="eq-btn eq-pk-add" onclick="event.stopPropagation(); aplicarSeletorOP('${esc(cfg.selId)}', '${esc(e.id)}', this)">${esc(cfg.usar || "Adicionar")}</button>
        </div>
      </div>
    </div>`;
}

/* kind: "mods" | "maldicoes" | "rituais"; devolve o botão e o select oculto usado pelas funções de adicionar */
function htmlPickerOP(prefixo, kind, lista, rotulo, selId, acao) {
  const nomes = { mods: "Modificações", maldicoes: "Maldições", rituais: "Rituais" };
  _registrarSeletorOP(selId, { kind, lista, acao, titulo: `${nomes[kind] || "Catálogo"} do catálogo`, usar: "Adicionar", fecha: false });
  const botao = `<button type="button" class="eq-seg-btn" onclick="abrirSeletorOP('${selId}')"><span>${rotulo}</span><i>›</i></button>`;
  const painel = `<select id="${selId}" hidden aria-hidden="true"><option value=""></option>${lista.map((e) => `<option value="${esc(e.id)}"></option>`).join("")}</select>`;
  return { botao, painel };
}

function _garantirSeletorOP() {
  let el = document.getElementById("eqSeletorOP");
  if (el) return el;
  el = document.createElement("div");
  el.id = "eqSeletorOP";
  el.className = "popup eq-seletor-popup";
  el.style.display = "none";
  el.innerHTML = `<div class="popup-content"><span class="fechar" onclick="fecharSeletorOP()">&times;</span><h3 id="eqSeletorTitulo"></h3><div id="eqSeletorCorpo"></div></div>`;
  el.addEventListener("click", (ev) => { if (ev.target === el) fecharSeletorOP(); });
  document.body.appendChild(el);
  return el;
}

function abrirSeletorOP(selId) {
  const cfg = _seletoresOP[selId];
  if (!cfg) return;
  cfg.selId = selId;
  const el = _garantirSeletorOP();
  const grupos = {};
  cfg.lista.forEach((e, i) => {
    const g = _titulosGrupoOP(cfg.kind, e);
    const k = g.titulo;
    (grupos[k] = grupos[k] || { ordem: g.ordem, itens: [] });
    grupos[k].ordem = Math.min(grupos[k].ordem, g.ordem);
    grupos[k].itens.push({ e, ord: g.ordem, i });
  });
  const corpo = Object.entries(grupos)
    .sort((a, b) => a[1].ordem - b[1].ordem)
    .map(([g, v]) => {
      v.itens.sort((a, b) => a.ord - b.ord || (parseInt(categoriaParaNumeroOP(a.e.categoria)) || 0) - (parseInt(categoriaParaNumeroOP(b.e.categoria)) || 0) || a.i - b.i);
      return `<h5 class="eq-pk-grupo">${esc(g)}</h5>${v.itens.map((x) => _cartaoSeletorOP(cfg.kind, x.e, cfg)).join("")}`;
    }).join("");
  document.getElementById("eqSeletorTitulo").textContent = cfg.titulo || "Catálogo";
  const fl = _htmlFiltrosOP(cfg.kind, cfg.lista);
  document.getElementById("eqSeletorCorpo").innerHTML = `
    <div class="eq-barra">
      <input type="search" class="eq-picker-busca" placeholder="Buscar pelo nome ou pelo efeito…" oninput="filtrarPickerOP()" />
      ${fl.botao}
    </div>
    <div class="eq-fl-ativos" id="eqFlAtivos" hidden></div>
    <small class="eq-pk-dica"><span id="eqSeletorContagem">${cfg.lista.length} resultados</span> · toque em um cartão para ler tudo e ${cfg.fecha ? "usar" : "adicionar"}.</small>
    <div class="eq-picker-lista">${corpo || '<p class="eq-dica">Nada no catálogo.</p>'}<p class="eq-pk-vazio" hidden>Nada encontrado com esses filtros.</p></div>
    ${fl.painel}`;
  el.style.display = "flex";
  filtrarPickerOP();
  if (window.matchMedia && matchMedia("(hover: hover) and (pointer: fine)").matches) setTimeout(() => document.querySelector("#eqSeletorCorpo .eq-picker-busca")?.focus({ preventScroll: true }), 50); // no celular o teclado não abre sozinho
}

function fecharSeletorOP() {
  const el = document.getElementById("eqSeletorOP");
  if (el) el.style.display = "none";
}

function filtrarPickerOP() {
  const busca = document.querySelector("#eqSeletorCorpo .eq-picker-busca");
  const t = _norm(busca ? busca.value : "");
  const lista = document.querySelector("#eqSeletorCorpo .eq-picker-lista");
  if (!lista) return;
  let achou = 0;
  lista.querySelectorAll(".eq-pk-card").forEach((c) => {
    let f = [];
    try { f = JSON.parse(c.dataset.f || "[]"); } catch (e) { /* sem filtros */ }
    const ok = (!t || c.dataset.busca.includes(t)) && Object.keys(_flSelOP).every((i) => f[i] === _flSelOP[i]);
    c.hidden = !ok;
    if (ok) achou++;
  });
  lista.querySelectorAll(".eq-pk-grupo").forEach((h) => {
    let el = h.nextElementSibling, algum = false;
    while (el && el.classList.contains("eq-pk-card")) { if (!el.hidden) algum = true; el = el.nextElementSibling; }
    h.hidden = !algum;
  });
  const vazio = lista.querySelector(".eq-pk-vazio");
  if (vazio) vazio.hidden = achou > 0;
  const txt = `${achou} ${achou === 1 ? "resultado" : "resultados"}`;
  const cont = document.getElementById("eqSeletorContagem");
  if (cont) cont.textContent = txt;
  const ver = document.getElementById("eqFlVer");
  if (ver) ver.textContent = `Ver ${txt}`;
  document.querySelectorAll("#eqFlPainel .eq-fl-op").forEach((b) => b.classList.toggle("on", _flSelOP[b.dataset.faceta] === b.dataset.val));
  const n = Object.keys(_flSelOP).length;
  const badge = document.getElementById("eqFlBadge");
  if (badge) { badge.hidden = !n; badge.textContent = n; }
  const btnF = document.querySelector(".eq-fl-btn");
  if (btnF) btnF.classList.toggle("on", n > 0);
  const at = document.getElementById("eqFlAtivos");
  if (at) {
    at.hidden = !n;
    at.innerHTML = Object.entries(_flSelOP).map(([f, v]) => `<button type="button" class="eq-fl-ativo" onclick="removerFiltroOP('${f}')">${esc(v)} <i>&times;</i></button>`).join("") + (n > 1 ? `<button type="button" class="eq-fl-ativo limpar" onclick="limparFiltrosOP()">Limpar tudo</button>` : "");
  }
  lista.scrollTop = 0;
}

function alternarCardPickerOP(ev, card) {
  if (ev.target.closest("button")) return;
  const abrir = !card.classList.contains("aberto");
  card.closest(".eq-picker-lista").querySelectorAll(".eq-pk-card.aberto").forEach((c) => c.classList.remove("aberto"));
  card.classList.toggle("aberto", abrir);
  if (abrir) card.scrollIntoView({ block: "nearest", behavior: "smooth" });
}

function aplicarSeletorOP(selId, id, btn) {
  const cfg = _seletoresOP[selId];
  const sel = document.getElementById(selId);
  if (!cfg || !sel) { fecharSeletorOP(); return; }
  sel.value = id;
  new Function(cfg.acao)();
  const ok = sel.value === ""; // as funções limpam o select quando conseguem aplicar
  sel.value = "";
  if (!ok) return;
  if (cfg.fecha) { fecharSeletorOP(); return; }
  if (btn) {
    btn.textContent = "Adicionado";
    btn.disabled = true;
    setTimeout(() => { btn.textContent = cfg.usar || "Adicionar"; btn.disabled = false; }, 1200);
  }
}

/* seletor de modificações dentro da seção "Modificações" */
function htmlSeletorModsOP(prefixo, tipo) {
  const lista = obterEquipOP("mods").filter((m) => m.aplica === tipo);
  const nomeTipo = tipo === "arma" ? "arma" : "vestimenta";
  const mod = htmlPickerOP(prefixo, "mods", lista, "Adicionar modificação", prefixo + "ModCatalogoSel", `adicionarModCatalogoOP('${prefixo}','${tipo}')`);
  const mal = htmlPickerOP(prefixo, "maldicoes", _maldicoesPara(tipo), "Adicionar maldição", prefixo + "MaldCatalogoSel", `adicionarMaldicaoCatalogoOP('${prefixo}','${tipo}')`);
  const rit = tipo === "arma" ? htmlPickerOP(prefixo, "rituais", obterEquipOP("rituais"), "Adicionar ritual", prefixo + "RitualCatalogoSel", `adicionarRitualCatalogoOP('${prefixo}')`) : null;
  return `
    <div class="eq-mods-sel">
      <div class="eq-seg">${mod.botao}${mal.botao}${rit ? rit.botao : ""}</div>
      ${mod.painel}${mal.painel}${rit ? rit.painel : ""}
      <div class="eq-legenda"><span class="k-mod">Modificação +I</span><span class="k-mal">Maldição +II, depois +I</span>${tipo === "arma" ? '<span class="k-rit">Ritual: sem custo</span>' : ""}</div>
      <div class="eq-editar-links"><button type="button" class="eq-link" onclick="abrirGerenciadorEquipOP('mods')">⚙ Editar catálogos</button></div>
    </div>`;
}

function adicionarModCatalogoOP(prefixo, tipo) {
  const sel = document.getElementById(prefixo + "ModCatalogoSel");
  const box = document.getElementById(prefixo + "ModLista");
  if (!sel || !box || !sel.value) return;
  const m = obterEquipOP("mods").find((x) => x.id === sel.value);
  if (!m) return;
  const repetida = Array.from(box.querySelectorAll(".mod-nome")).some((i) => _norm(i.value) === _norm(m.nome));
  if (repetida) {
    const aviso = `${m.nome} já está aplicada: modificações iguais não se acumulam.`;
    if (typeof alertBonito === "function") alertBonito(aviso); else alert(aviso);
    return;
  }
  // se só existe a linha vazia padrão, reaproveita
  const catMod = m.cat ?? 1;
  box.insertAdjacentHTML("beforeend", _linhaModHTML(prefixo, m.nome, m.efeito, catMod, tipo));
  sel.value = "";
  atualizarCatFinalOP();
}

/* maldições aplicáveis: arma -> armas; vestimenta -> vestimentas e acessórios */
function _maldicoesPara(tipo) {
  return obterEquipOP("maldicoes").filter((m) => (tipo === "vestimenta" ? m.aplica === "vestimenta" || m.aplica === "acessorio" : m.aplica === tipo));
}

function adicionarMaldicaoCatalogoOP(prefixo, tipo) {
  const sel = document.getElementById(prefixo + "MaldCatalogoSel");
  const box = document.getElementById(prefixo + "ModLista");
  if (!sel || !box || !sel.value) return;
  const m = obterEquipOP("maldicoes").find((x) => x.id === sel.value);
  if (!m) return;
  const nome = m.nome + " (maldição)";
  const nomes = Array.from(box.querySelectorAll(".mod-nome")).map((i) => i.value);
  if (nomes.some((n) => _norm(n) === _norm(nome))) {
    const aviso = `${m.nome} já está aplicada: maldições iguais não se acumulam.`;
    if (typeof alertBonito === "function") alertBonito(aviso); else alert(aviso);
    return;
  }
  const jaTem = nomes.some((n) => /\(maldição\)/i.test(n));
  box.insertAdjacentHTML("beforeend", _linhaModHTML(prefixo, nome, m.efeito, jaTem ? 1 : 2, tipo));
  sel.value = "";
  atualizarCatFinalOP();
}

function adicionarRitualCatalogoOP(prefixo) {
  const sel = document.getElementById(prefixo + "RitualCatalogoSel");
  const box = document.getElementById(prefixo + "ModLista");
  if (!sel || !box || !sel.value) return;
  const m = obterEquipOP("rituais").find((x) => x.id === sel.value);
  if (!m) return;
  const nome = m.nome + " (ritual)";
  if (Array.from(box.querySelectorAll(".mod-nome")).some((i) => _norm(i.value) === _norm(nome))) {
    const aviso = `${m.nome} já está na arma.`;
    if (typeof alertBonito === "function") alertBonito(aviso); else alert(aviso);
    return;
  }
  box.insertAdjacentHTML("beforeend", _linhaModHTML(prefixo, nome, m.efeito, 0, "arma"));
  sel.value = "";
  atualizarCatFinalOP();
}

/* envolve o formulário de extras para incluir o seletor de modificações */
(function () {
  if (typeof htmlExtrasItem !== "function" || htmlExtrasItem._eqOP) return;
  const original = htmlExtrasItem;
  htmlExtrasItem = function (prefixo, tipo, item) {
    let html = original(prefixo, tipo, item);
    if (tipo === "arma" || tipo === "vestimenta") {
      const marca = '<button type="button" class="mod-add"';
      const i = html.indexOf(marca);
      if (i >= 0) html = html.slice(0, i) + htmlSeletorModsOP(prefixo, tipo) + html.slice(i);
      html = html.replace("+ Adicionar modificação", "Adicionar modificação personalizada");
      setTimeout(atualizarCatFinalOP, 0);
    }
    return html;
  };
  htmlExtrasItem._eqOP = true;

  // uma modificação nova em branco já conta +1 categoria
  if (typeof addLinhaModificador === "function") {
    addLinhaModificador = function (prefixo) {
      const box = document.getElementById(`${prefixo}ModLista`);
      if (!box) return;
      const tipo = box.dataset.tipo || "arma";
      box.insertAdjacentHTML("beforeend", _linhaModHTML(prefixo, "", "", tipo === "veiculo" ? 0 : 1, tipo));
      atualizarCatFinalOP();
    };
  }
})();

/* ---- itens da mochila: modificações e maldições em texto (catálogos separados) ---- */
function htmlSeletorModsItemOP(prefixo) {
  const lista = obterEquipOP("mods").filter((m) => m.aplica !== "arma" && m.aplica !== "vestimenta");
  const mod = htmlPickerOP(prefixo, "mods", lista, "Adicionar modificação", prefixo + "ModCatalogoSel", `adicionarModItemOP('${prefixo}')`);
  return `
    <div class="eq-mods-sel">
      <div class="eq-seg">${mod.botao}</div>
      ${mod.painel}
      <div class="eq-editar-links"><button type="button" class="eq-link" onclick="abrirGerenciadorEquipOP('mods')">⚙ Editar catálogos</button></div>
    </div>`;
}

function htmlSeletorMaldicoesItemOP(prefixo) {
  const mal = htmlPickerOP(prefixo, "maldicoes", obterEquipOP("maldicoes"), "Adicionar maldição", prefixo + "MaldCatalogoSel", `adicionarMaldicaoItemOP('${prefixo}')`);
  return `
    <div class="eq-mods-sel">
      <div class="eq-seg">${mal.botao}</div>
      ${mal.painel}
      <div class="eq-editar-links"><button type="button" class="eq-link" onclick="abrirGerenciadorEquipOP('maldicoes')">⚙ Editar catálogos</button></div>
    </div>`;
}

function _somarCategoriaOP(campo, aumento) {
  if (!campo) return;
  const base = categoriaParaNumeroOP(campo.value);
  campo.value = numeroParaCategoriaOP((base === null ? 0 : base) + aumento);
  campo.dispatchEvent(new Event("input", { bubbles: true }));
}

function _adicionarTextoItemOP(prefixo, areaId, entrada, aumento) {
  const area = document.getElementById(prefixo + areaId);
  if (!area) return false;
  if (area.value.split("\n").some((l) => _norm(l).startsWith(_norm(entrada.nome) + " "))) {
    const aviso = `${entrada.nome} já está aplicada: itens iguais não se acumulam.`;
    if (typeof alertBonito === "function") alertBonito(aviso); else alert(aviso);
    return false;
  }
  const texto = `${entrada.nome} (+${aumento} cat.): ${entrada.efeito}`;
  area.value = area.value.trim() ? area.value.trim() + "\n" + texto : texto;
  _somarCategoriaOP(document.getElementById(prefixo + "Categoria"), aumento);
  return true;
}

function adicionarModItemOP(prefixo) {
  const sel = document.getElementById(prefixo + "ModCatalogoSel");
  if (!sel || !sel.value) return;
  const m = obterEquipOP("mods").find((x) => x.id === sel.value);
  if (!m) return;
  if (_adicionarTextoItemOP(prefixo, "Modificacoes", m, m.cat ?? 1)) sel.value = "";
}

function adicionarMaldicaoItemOP(prefixo) {
  const sel = document.getElementById(prefixo + "MaldCatalogoSel");
  if (!sel || !sel.value) return;
  const m = obterEquipOP("maldicoes").find((x) => x.id === sel.value);
  if (!m) return;
  const area = document.getElementById(prefixo + "Maldicoes");
  const aumento = area && area.value.trim() ? 1 : 2;
  if (_adicionarTextoItemOP(prefixo, "Maldicoes", m, aumento)) sel.value = "";
}

/* ---- catálogo de itens da mochila ---- */
function htmlCatalogoItemOP(prefixo) {
  const lista = obterEquipOP("itens");
  const selId = prefixo + "CatalogoSel";
  _registrarSeletorOP(selId, { kind: "itens", lista, acao: `aplicarCatalogoItemOP('${prefixo}')`, titulo: "Catálogo de itens", usar: "Usar este item", fecha: true });
  return `
    <div class="eq-catalogo" id="${prefixo}CatalogoBox">
      <label class="eq-rotulo">Catálogo de itens</label>
      <button type="button" class="eq-cat-btn" onclick="abrirSeletorOP('${selId}')"><span>Escolher item do catálogo</span><i>›</i></button>
      <select id="${selId}" hidden aria-hidden="true"><option value=""></option>${lista.map((e) => `<option value="${esc(e.id)}"></option>`).join("")}</select>
      ${prefixo === "item" ? `<button type="button" class="eq-link" onclick="abrirGerenciadorEquipOP('itens')">⚙ Editar catálogo</button>` : ""}
    </div>`;
}

function aplicarCatalogoItemOP(prefixo) {
  const sel = document.getElementById(prefixo + "CatalogoSel");
  if (!sel || !sel.value) return;
  const e = obterEquipOP("itens").find((x) => x.id === sel.value);
  if (!e) return;
  _setValOP(prefixo + "Nome", e.nome);
  _setValOP(prefixo + "Desc", e.desc || "");
  _setValOP(prefixo + "Espacos", e.espacos ?? 0);
  _setValOP(prefixo + "Categoria", e.categoria || "");
  sel.value = "";
}

/* monta a barra de catálogo no formulário de adicionar */
function montarCatalogosEquipOP() {
  const alvos = [
    ["armaNome", "arma", "arma"],
    ["armaduraNome", "armadura", "vestimenta"],
  ];
  const itemNome = document.getElementById("itemNome");
  if (itemNome) {
    const antigoItem = document.getElementById("itemCatalogoBox");
    if (antigoItem) antigoItem.outerHTML = htmlCatalogoItemOP("item");
    else itemNome.insertAdjacentHTML("beforebegin", htmlCatalogoItemOP("item"));
  }
  const itemMod = document.getElementById("itemModificacoes");
  if (itemMod) {
    const ant = document.getElementById("itemModCatalogoSel");
    if (ant) ant.closest(".eq-mods-sel").outerHTML = htmlSeletorModsItemOP("item");
    else itemMod.insertAdjacentHTML("beforebegin", htmlSeletorModsItemOP("item"));
  }
  const itemMald = document.getElementById("itemMaldicoes");
  if (itemMald) {
    const antM = document.getElementById("itemMaldCatalogoSel");
    if (antM) antM.closest(".eq-mods-sel").outerHTML = htmlSeletorMaldicoesItemOP("item");
    else itemMald.insertAdjacentHTML("beforebegin", htmlSeletorMaldicoesItemOP("item"));
  }
  alvos.forEach(([campo, prefixo, tipo]) => {
    const el = document.getElementById(campo);
    if (!el) return;
    const antigo = document.getElementById(prefixo + "CatalogoBox");
    const html = htmlCatalogoEquipOP(prefixo, tipo);
    if (antigo) antigo.outerHTML = html;
    else el.insertAdjacentHTML("beforebegin", html);
  });
}

/* =====================================================================
   Gerenciador do catálogo (editar, apagar, criar, restaurar)
   ===================================================================== */
const APLICA_ROTULO_OP = { arma: "Armas", vestimenta: "Vestimentas", granada: "Granadas", acessorio: "Acessórios", drone: "Drones" };

let _eqAba = "armas";
let _eqEditando = null; // {tipo, id|null}

const EQ_ABAS = [
  ["armas", "Armas"],
  ["protecoes", "Vestimentas"],
  ["itens", "Itens"],
  ["mods", "Modificações"],
  ["maldicoes", "Maldições"],
  ["rituais", "Rituais"],
];

function abrirGerenciadorEquipOP(aba) {
  if (aba) _eqAba = aba;
  _eqEditando = null;
  const lista = obterEquipOP(_eqAba);
  const removidas = (EQUIP_OP_PADRAO[_eqAba] || []).filter((e) => (equipOPCustom?.rem || []).includes(e.id));
  const editadas = equipOPCustom?.over || {};

  const resumo = (e) => {
    if (_eqAba === "armas") return `${e.dano || "—"} · crít. ${e.critico || "20"}/x${e.multiplicador || "2"} · cat. ${e.categoria || "—"} · ${e.espacos ?? 0} esp.`;
    if (_eqAba === "maldicoes") return `${APLICA_ROTULO_OP[e.aplica] || "Item"} · ${e.efeito || ""}`
    if (_eqAba === "rituais") return `${e.efeito || ""}`
    if (_eqAba === "itens") return `cat. ${e.categoria || "—"} · ${e.espacos ?? 0} esp. · ${e.desc || ""}`
    if (_eqAba === "protecoes") return `Defesa ${e.ca || "—"} · cat. ${e.categoria || "—"} · ${e.espacos ?? 0} esp.`;
    return `${APLICA_ROTULO_OP[e.aplica] || "Item"} · +${e.cat ?? 1} cat. · ${e.efeito || ""}`
  };
  const cartao = (e) => `
    <div class="eq-cartao ${editadas[e.id] ? "editado" : ""}">
      <div class="eq-cartao-topo">
        <strong>${esc(e.nome)}</strong>
        <span class="eq-cartao-acoes">
          <button type="button" class="eq-mini" onclick="editarEntradaEquipOP('${esc(e.id)}')" aria-label="Editar">✏️</button>
          <button type="button" class="eq-mini" onclick="apagarEntradaEquipOP('${esc(e.id)}')" aria-label="Apagar">🗑</button>
        </span>
      </div>
      <small>${esc(e.grupo || "")}${editadas[e.id] ? " · editado" : ""}</small>
      <small>${esc(resumo(e))}</small>
    </div>`;

  const html = `
    <div class="popup-bloco rit-popup">
      <div class="rit-chips">
        ${EQ_ABAS.map(([k, r]) => `<button type="button" class="rit-chip ${_eqAba === k ? "ativo" : ""}" onclick="abrirGerenciadorEquipOP('${k}')">${r}</button>`).join("")}
      </div>
      <button type="button" class="eq-btn eq-novo" onclick="editarEntradaEquipOP(null)">Adicionar ao catálogo</button>
      <div class="cat-lista">${lista.map(cartao).join("") || '<p class="cat-resumo">Catálogo vazio.</p>'}</div>
      ${removidas.length ? `<button type="button" class="eq-link" onclick="restaurarRemovidosEquipOP()">↩ Restaurar ${removidas.length} item(ns) padrão apagado(s)</button>` : ""}
      ${Object.keys(editadas).length || removidas.length ? `<button type="button" class="eq-link" onclick="restaurarTudoEquipOP()">Restaurar todo o catálogo padrão</button>` : ""}
      <small class="evo-dica">Livro de Regras, Sobrevivendo ao Horror e Arquivos Secretos 3, 4, 5 e 9. As mudanças ficam salvas nesta ficha.</small>
    </div>`;
  abrirPopup("Catálogo de equipamentos", html, true);
}

function _eqCampos(tipo) {
  if (tipo === "armas")
    return [
      ["nome", "Nome", "text"], ["grupo", "Grupo", "text"], ["categoria", "Categoria (0, I, II…)", "text"], ["dano", "Dano", "text"],
      ["critico", "Margem de crítico", "text"], ["multiplicador", "Multiplicador", "text"], ["alcance", "Alcance", "text"],
      ["tipoDano", "Tipo de dano", "text"], ["espacos", "Espaços", "number"], ["pericia", "Perícia", "text"], ["atributoDano", "Atributo do dano", "text"],
      ["desc", "Descrição", "area"],
    ];
  if (tipo === "maldicoes")
    return [["nome", "Nome da maldição", "text"], ["grupo", "Grupo", "text"], ["aplica", "Aplica-se a", "aplica"], ["efeito", "Efeito", "area"]];
  if (tipo === "rituais")
    return [["nome", "Nome do ritual", "text"], ["grupo", "Grupo", "text"], ["efeito", "Efeito na arma", "area"]];
  if (tipo === "itens")
    return [
      ["nome", "Nome", "text"], ["grupo", "Grupo", "text"], ["categoria", "Categoria (0, I, II…)", "text"], ["espacos", "Espaços", "number"], ["desc", "Descrição", "area"],
    ];
  if (tipo === "protecoes")
    return [
      ["nome", "Nome", "text"], ["grupo", "Grupo", "text"], ["ca", "Defesa", "text"], ["categoria", "Categoria (0, I, II…)", "text"], ["espacos", "Espaços", "number"],
      ["resistencias", "Resistências", "text"], ["penalidades", "Penalidades", "text"], ["requisitos", "Requisitos", "text"], ["desc", "Descrição", "area"],
    ];
  return [
    ["nome", "Nome", "text"], ["grupo", "Grupo", "text"], ["aplica", "Aplica-se a", "aplica"], ["cat", "Aumenta a categoria em", "number"], ["efeito", "Efeito", "area"],
  ];
}

function editarEntradaEquipOP(id) {
  _eqEditando = { tipo: _eqAba, id };
  const atual = id ? obterEquipOP(_eqAba).find((e) => e.id === id) : null;
  const e = atual || (_eqAba === "mods" ? { aplica: "arma", cat: 1 } : _eqAba === "maldicoes" ? { aplica: "arma" } : {});
  const campos = _eqCampos(_eqAba)
    .map(([k, rot, t]) => {
      const v = e[k] ?? "";
      if (t === "area") return `<label class="popup-label">${rot}</label><textarea id="eqf_${k}">${esc(String(v))}</textarea>`;
      if (t === "aplica")
        return `<label class="popup-label">${rot}</label><select id="eqf_${k}">${Object.entries(APLICA_ROTULO_OP).map(([k, r]) => `<option value="${k}" ${v === k ? "selected" : ""}>${r}</option>`).join("")}</select>`;
      return `<label class="popup-label">${rot}</label><input id="eqf_${k}" type="${t}" ${t === "number" ? 'min="0" step="any"' : ""} value="${esc(String(v))}">`;
    })
    .join("");
  abrirPopup(
    id ? "Editar item do catálogo" : "Novo item do catálogo",
    `<div class="popup-form">${campos}
      <button type="button" class="popup-salvar-btn" onclick="salvarEntradaEquipOP()">Salvar</button>
      <button type="button" class="eq-link" onclick="abrirGerenciadorEquipOP()">← Voltar ao catálogo</button>
    </div>`,
    true,
  );
}

function salvarEntradaEquipOP() {
  if (!_eqEditando) return;
  const tipo = _eqEditando.tipo;
  const original = _eqEditando.id ? obterEquipOP(tipo).find((x) => x.id === _eqEditando.id) : null;
  const nova = { ...(original || {}) };
  _eqCampos(tipo).forEach(([k, , t]) => {
    const el = document.getElementById("eqf_" + k);
    if (!el) return;
    nova[k] = t === "number" ? Math.max(0, parseFloat(el.value) || 0) : el.value.trim();
  });
  if (!nova.nome) {
    const aviso = "Dê um nome ao item.";
    if (typeof alertBonito === "function") alertBonito(aviso); else alert(aviso);
    return;
  }
  const c = _eqCust();
  if (_eqEditando.id) {
    nova.id = _eqEditando.id;
    const nosPadrao = (EQUIP_OP_PADRAO[tipo] || []).some((e) => e.id === nova.id);
    if (nosPadrao) c.over[nova.id] = nova;
    else {
      const i = c.add[tipo].findIndex((e) => e.id === nova.id);
      if (i >= 0) c.add[tipo][i] = nova;
      delete c.over[nova.id];
    }
  } else {
    nova.id = "eq.custom." + Date.now().toString(36);
    if (tipo === "mods" && !nova.cat && nova.cat !== 0) nova.cat = 1;
    c.add[tipo].push(nova);
  }
  _depoisDeEditarEquipOP();
}

async function apagarEntradaEquipOP(id) {
  const e = obterEquipOP(_eqAba).find((x) => x.id === id);
  if (!e) return;
  const ok = typeof confirmBonito === "function" ? await confirmBonito(`Apagar ${e.nome} do catálogo? Itens já criados na ficha não são afetados.`) : true;
  if (!ok) return;
  const c = _eqCust();
  if ((EQUIP_OP_PADRAO[_eqAba] || []).some((x) => x.id === id)) {
    if (!c.rem.includes(id)) c.rem.push(id);
  } else {
    c.add[_eqAba] = c.add[_eqAba].filter((x) => x.id !== id);
  }
  delete c.over[id];
  _depoisDeEditarEquipOP();
}

function restaurarRemovidosEquipOP() {
  const c = _eqCust();
  const ids = (EQUIP_OP_PADRAO[_eqAba] || []).map((e) => e.id);
  c.rem = c.rem.filter((id) => !ids.includes(id));
  _depoisDeEditarEquipOP();
}

async function restaurarTudoEquipOP() {
  const ok = typeof confirmBonito === "function" ? await confirmBonito("Restaurar todo o catálogo de equipamentos ao padrão do livro? Itens que você criou também serão apagados do catálogo.") : true;
  if (!ok) return;
  equipOPCustom = null;
  _depoisDeEditarEquipOP();
}

function _depoisDeEditarEquipOP() {
  if (typeof salvarTudo === "function") salvarTudo();
  montarCatalogosEquipOP();
  abrirGerenciadorEquipOP();
}

function _iniciarEquipOP() {
  montarCatalogosEquipOP();
  atualizarCatFinalOP();
}
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", () => setTimeout(_iniciarEquipOP, 0));
else setTimeout(_iniciarEquipOP, 0);

/* =====================================================================
   Limite de itens por categoria (Livro de Regras, tabela 3.1: patentes)
   Calculado pelos pontos de prestígio; cada limite pode ser editado.
   Conta itens da mochila, armas e vestimentas (categoria final).
   ===================================================================== */
const PATENTES_OP = [
  { id: "recruta", nome: "Recruta", pp: 0, credito: "Baixo", lim: { I: 2, II: 0, III: 0, IV: 0 } },
  { id: "operador", nome: "Operador", pp: 20, credito: "Médio", lim: { I: 3, II: 1, III: 0, IV: 0 } },
  { id: "especial", nome: "Agente especial", pp: 50, credito: "Médio", lim: { I: 3, II: 2, III: 1, IV: 0 } },
  { id: "oficial", nome: "Oficial de operações", pp: 100, credito: "Alto", lim: { I: 3, II: 3, III: 2, IV: 1 } },
  { id: "elite", nome: "Agente de elite", pp: 200, credito: "Ilimitado", lim: { I: 3, II: 3, III: 3, IV: 2 } },
];
const CATS_LIM_OP = ["I", "II", "III", "IV"];

function patenteDosPP_OP(pp) {
  let atual = PATENTES_OP[0];
  PATENTES_OP.forEach((p) => { if ((Number(pp) || 0) >= p.pp) atual = p; });
  return atual;
}

function limitesDaFichaOP() {
  const pat = patenteDosPP_OP(limiteItensOP.pp);
  const lim = {};
  CATS_LIM_OP.forEach((c) => {
    const v = limiteItensOP.lim ? limiteItensOP.lim[c] : null;
    lim[c] = v === null || v === undefined || v === "" ? pat.lim[c] : Math.max(0, parseInt(v) || 0);
  });
  return { pat, lim };
}

/* quantos itens de cada categoria a ficha tem (categoria final; 0 não conta) */
function contarItensPorCategoriaOP() {
  const cont = { I: 0, II: 0, III: 0, IV: 0, acima: 0 };
  const somar = (n, qtd) => {
    if (!n || n < 1) return;
    if (n > 4) cont.acima += qtd; else cont[_ROMANOS_OP[n]] += qtd;
  };
  const num = (item) => {
    const c = categoriaDoItemOP(item);
    return categoriaParaNumeroOP(c.texto);
  };
  (typeof inventario !== "undefined" ? inventario : []).forEach((i) => somar(num(i), Math.max(1, parseInt(i.qtd) || 1)));
  (typeof armas !== "undefined" ? armas : []).forEach((i) => somar(num(i), 1));
  (typeof armaduras !== "undefined" ? armaduras : []).forEach((i) => somar(num(i), 1));
  return cont;
}

function montarLimiteItensOP(forcar) {
  const ancora = document.querySelector(".inventario-capacidade-box");
  if (!ancora) return;
  let box = document.getElementById("limiteItensOP");
  if (!box) {
    box = document.createElement("div");
    box.id = "limiteItensOP";
    box.className = "limite-itens-op";
    ancora.insertAdjacentElement("afterend", box);
    forcar = true;
  }
  if (forcar) {
    const { pat } = limitesDaFichaOP();
    const aberto = box.querySelector("details")?.open ? " open" : "";
    box.innerHTML = `
      <details${aberto}>
        <summary>
          <span class="limite-titulo">Itens por categoria</span>
          <span class="limite-resumo" id="limiteResumoOP"></span>
        </summary>
        <div class="limite-corpo">
          <div class="limite-pp">
            <label for="limitePPOP">Pontos de prestígio</label>
            <input id="limitePPOP" type="number" min="0" step="1" value="${Number(limiteItensOP.pp) || 0}" oninput="mudarPPLimiteOP(this.value)" />
            <span class="limite-patente" id="limitePatenteOP"></span>
          </div>
          <div class="limite-grade">
            ${CATS_LIM_OP.map((c) => `
              <div class="limite-cel" data-cat="${c}">
                <span class="limite-cat">${c}</span>
                <span class="limite-uso" id="limiteUso${c}"></span>
                <input type="number" min="0" step="1" id="limiteIn${c}" aria-label="Limite da categoria ${c}" oninput="editarLimiteOP('${c}', this.value)" />
              </div>`).join("")}
          </div>
          <small id="limiteAvisoOP"></small>
          <button type="button" class="eq-link" onclick="restaurarLimitesOP()">Restaurar limites da patente</button>
        </div>
      </details>`;
  }
  atualizarLimiteItensOP();
}

function atualizarLimiteItensOP() {
  const box = document.getElementById("limiteItensOP");
  if (!box) return;
  const { pat, lim } = limitesDaFichaOP();
  const cont = contarItensPorCategoriaOP();
  const editado = [];
  const pt = document.getElementById("limitePatenteOP");
  if (pt) pt.textContent = `${pat.nome} · crédito ${pat.credito}`;
  const rs = document.getElementById("limiteResumoOP");
  if (rs) {
    rs.innerHTML = CATS_LIM_OP.filter((c) => lim[c] > 0 || cont[c] > 0)
      .map((c) => `<span class="${cont[c] > lim[c] ? "excedido" : ""}">${c} ${cont[c]}/${lim[c]}</span>`).join("") || "<span>—</span>";
  }
  CATS_LIM_OP.forEach((c) => {
    const uso = document.getElementById("limiteUso" + c);
    const inp = document.getElementById("limiteIn" + c);
    const cel = box.querySelector(`.limite-cel[data-cat="${c}"]`);
    if (uso) uso.textContent = `${cont[c]} / ${lim[c]}`;
    if (inp && document.activeElement !== inp) inp.value = lim[c];
    if (cel) {
      cel.classList.toggle("excedido", cont[c] > lim[c]);
      cel.classList.toggle("editado", lim[c] !== pat.lim[c]);
    }
    if (lim[c] !== pat.lim[c]) editado.push(c);
  });
  const av = document.getElementById("limiteAvisoOP");
  if (av) {
    const partes = [];
    if (editado.length) partes.push(`Limite editado em: ${editado.join(", ")}.`);
    if (cont.acima) partes.push(`${cont.acima} item(ns) acima da categoria IV.`);
    partes.push("Categoria 0 é ilimitada (só conta a capacidade de carga).");
    av.textContent = partes.join(" ");
  }
}

function mudarPPLimiteOP(v) {
  limiteItensOP.pp = Math.max(0, parseInt(v) || 0);
  atualizarLimiteItensOP();
  if (typeof salvarTudo === "function") salvarTudo();
}

function editarLimiteOP(cat, v) {
  limiteItensOP.lim = limiteItensOP.lim || {};
  if (v === "") limiteItensOP.lim[cat] = null;
  else limiteItensOP.lim[cat] = Math.max(0, parseInt(v) || 0);
  atualizarLimiteItensOP();
  if (typeof salvarTudo === "function") salvarTudo();
}

function restaurarLimitesOP() {
  limiteItensOP.lim = {};
  CATS_LIM_OP.forEach((c) => { const i = document.getElementById("limiteIn" + c); if (i) i.value = ""; });
  atualizarLimiteItensOP();
  if (typeof salvarTudo === "function") salvarTudo();
}

/* recalcula sempre que o resumo do inventário muda (itens, armas, vestimentas) */
(function () {
  if (typeof atualizarResumoInventario === "function") {
    const original = atualizarResumoInventario;
    atualizarResumoInventario = function () {
      const r = original.apply(this, arguments);
      try { atualizarLimiteItensOP(); } catch (e) { /* painel ainda não montado */ }
      return r;
    };
  }
})();
document.addEventListener("DOMContentLoaded", () => setTimeout(() => montarLimiteItensOP(true), 50));

/* =====================================================================
   Visual dos formulários de arma, vestimenta e item:
   categoria em botões, espaços com − e +, linhas coloridas por tipo.
   Funciona nos formulários da página e nos popups de edição.
   ===================================================================== */
const _CATS_CHIP_OP = ["0", "I", "II", "III", "IV"];
const _RE_CAMPO_CAT = /^(arma|armadura|item|editArma|editArmadura|editItem)Categoria$/;
const _RE_CAMPO_ESP = /^(arma|armadura|item|editArma|editArmadura|editItem)Espacos$/;

function _valorCatChipOP(input) {
  const n = categoriaParaNumeroOP(input.value);
  return n === null ? "" : numeroParaCategoriaOP(n);
}

function _sincronizarChipsCatOP(input) {
  const caixa = input._chipsOP;
  if (!caixa) return;
  const v = _valorCatChipOP(input);
  const extra = caixa.querySelector(".eq-cat-extra");
  const pilulaCat = caixa.querySelector(".eq-final-pill");
  if (pilulaCat && !document.getElementById(input.id.replace(/Categoria$/, "") + "ModLista")) pilulaCat.textContent = v ? `Final: ${v}` : "Final: —";
  const fora = v !== "" && !_CATS_CHIP_OP.includes(v);
  if (fora) {
    if (extra) extra.textContent = v;
    else caixa.querySelectorAll(".eq-cat-chip").forEach((c, i, todos) => { if (i === todos.length - 1) c.insertAdjacentHTML("afterend", `<button type="button" class="eq-cat-chip eq-cat-extra" data-v="${esc(v)}">${esc(v)}</button>`); });
  } else if (extra) extra.remove();
  caixa.querySelectorAll(".eq-cat-chip").forEach((c) => c.classList.toggle("on", c.dataset.v === v));
}

function _melhorarCategoriaOP(input) {
  if (input.dataset.chipsOp) return;
  input.dataset.chipsOp = "1";
  const caixa = document.createElement("div");
  caixa.className = "eq-cat-chips";
  const prefixo = input.id.replace(/Categoria$/, "");
  const comPilula = !/^(item|editItem)$/.test(prefixo);
  caixa.innerHTML =
    (comPilula ? `<div class="eq-cat-topo"><span class="eq-final-pill" id="${prefixo}FinalPill">Final: —</span></div>` : "") +
    _CATS_CHIP_OP.map((c) => `<button type="button" class="eq-cat-chip" data-v="${c}">${c}</button>`).join("") +
    (comPilula ? `<small class="eq-conta" id="${prefixo}Conta"></small>` : "");
  caixa.addEventListener("click", (e) => {
    const b = e.target.closest(".eq-cat-chip");
    if (!b) return;
    const ja = b.classList.contains("on");
    input.value = ja && b.dataset.v === "0" ? "" : b.dataset.v;
    input.dispatchEvent(new Event("input", { bubbles: true }));
    _sincronizarChipsCatOP(input);
    if (typeof atualizarCatFinalOP === "function") atualizarCatFinalOP();
  });
  input._chipsOP = caixa;
  input.insertAdjacentElement("beforebegin", caixa);
  input.classList.add("eq-cat-oculto");
  input.addEventListener("input", () => _sincronizarChipsCatOP(input));
  _sincronizarChipsCatOP(input);
}

function _melhorarEspacosOP(input) {
  if (input.dataset.stepOp) return;
  input.dataset.stepOp = "1";
  const caixa = document.createElement("div");
  caixa.className = "eq-stepper";
  input.parentNode.insertBefore(caixa, input);
  const mudar = (d) => {
    const atual = parseFloat(String(input.value).replace(",", ".")) || 0;
    input.value = String(Math.max(0, Math.round((atual + d) * 10) / 10));
    input.dispatchEvent(new Event("input", { bubbles: true }));
    input.dispatchEvent(new Event("change", { bubbles: true }));
  };
  const menos = document.createElement("button");
  menos.type = "button"; menos.className = "eq-step"; menos.textContent = "−"; menos.setAttribute("aria-label", "Diminuir");
  menos.onclick = () => mudar(-0.5);
  const mais = document.createElement("button");
  mais.type = "button"; mais.className = "eq-step"; mais.textContent = "+"; mais.setAttribute("aria-label", "Aumentar");
  mais.onclick = () => mudar(0.5);
  caixa.append(menos, input, mais);
}

function melhorarFormulariosEquipOP() {
  document.querySelectorAll("input").forEach((el) => {
    if (!el.id) return;
    if (_RE_CAMPO_CAT.test(el.id)) _melhorarCategoriaOP(el);
    else if (_RE_CAMPO_ESP.test(el.id)) _melhorarEspacosOP(el);
  });
  // chips acompanham valores trocados por código (ex.: depois de adicionar item)
  document.querySelectorAll("input[data-chips-op]").forEach(_sincronizarChipsCatOP);
}

/* linhas de modificação coloridas por tipo (modificação, maldição, ritual) */
(function () {
  if (typeof _linhaModHTML !== "function") return;
  const original = _linhaModHTML;
  _linhaModHTML = function (prefix, nome) {
    const html = original.apply(this, arguments);
    const k = /\(maldição\)/i.test(nome || "") ? "mal" : /\(ritual\)/i.test(nome || "") ? "rit" : "mod";
    const compacta = (nome || "").trim() ? " compacta" : "";
    return html.replace('class="mod-linha"', `class="mod-linha mod-k-${k}${compacta}"`);
  };
})();

(function () {
  let agendado = false;
  const traz = (n) => n.nodeType === 1 && (n.tagName === "INPUT" || (n.querySelector && n.querySelector("input")));
  const agendar = (muts) => {
    if (agendado) return;
    if (muts && !muts.some((m) => m.addedNodes && Array.prototype.some.call(m.addedNodes, traz))) return; // só importa quando entra campo novo
    agendado = true;
    setTimeout(() => { agendado = false; melhorarFormulariosEquipOP(); }, 180);
  };
  const iniciar = () => {
    new MutationObserver(agendar).observe(document.body, { childList: true, subtree: true });
    melhorarFormulariosEquipOP();
    setInterval(() => { if (!document.hidden) document.querySelectorAll("input[data-chips-op]").forEach(_sincronizarChipsCatOP); }, 1500);
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", () => setTimeout(iniciar, 80));
  else setTimeout(iniciar, 80);
})();

/* =====================================================================
   Aba Inventário em cartões
   - cartão de carga com os limites de categoria (I a IV)
   - abas: Itens | Recipientes | Mapas | Documentos; veículos fica embaixo
   - "Novo ..." abre uma folha de baixo para cima; o item aberto vira popup
   Reaproveita os formulários e as funções que já existiam.
   ===================================================================== */
let _invPaneOP = "itens";

const _IV_ICO = {
  plus: '<path d="M12 5v14M5 12h14"/>',
  search: '<circle cx="11" cy="11" r="6"/><path d="m20 20-4-4"/>',
  gear: '<circle cx="12" cy="12" r="3"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6 7 7M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4"/>',
  x: '<path d="M6 6l12 12M18 6 6 18"/>',
  edit: '<path d="M4 20h4L19 9l-4-4L4 16z"/>',
  gift: '<path d="M4 11h16v9H4zM3 8h18v3H3zM12 8v12"/>',
  trash: '<path d="M5 7h14M10 7V4h4v3M7 7l1 13h8l1-13"/>',
  text: '<path d="M5 6h14M5 12h14M5 18h9"/>',
  wrench: '<path d="M14 6a4 4 0 0 0 5 5l-9 9a2.1 2.1 0 0 1-3-3z"/>',
  skull: '<path d="M12 4a7 7 0 0 0-7 7c0 2 1 3.5 2 4.5V19h10v-3.5c1-1 2-2.5 2-4.5a7 7 0 0 0-7-7z"/><circle cx="9.5" cy="11.5" r="1"/><circle cx="14.5" cy="11.5" r="1"/>',
  img: '<rect x="4" y="5" width="16" height="14" rx="2"/><circle cx="9" cy="10" r="1.5"/><path d="m4 17 5-4 4 3 3-2 4 3"/>',
  link: '<path d="M10 14a4 4 0 0 0 5 0l3-3a4 4 0 0 0-5-5l-1 1M14 10a4 4 0 0 0-5 0l-3 3a4 4 0 0 0 5 5l1-1"/>',
  book: '<path d="M5 4h10a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3z"/><path d="M5 17a3 3 0 0 1 3-3h10"/>',
};
function _ivI(n) { return `<svg class="iv-i" viewBox="0 0 24 24" aria-hidden="true">${_IV_ICO[n] || ""}</svg>`; }
function _ivN(v) { return formatarNumeroInventario(v); }
function _ivNorm(t) { return String(t || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase(); }

/* ---------- montagem ---------- */
function montarInventarioOP() {
  const aba = document.getElementById("inventario");
  if (!aba) return false;
  if (document.getElementById("invOP")) return true;
  const q = (id) => document.getElementById(id);
  const cap = aba.querySelector(".inventario-capacidade-box");
  const fItens = q("boxItensForm"), fRec = q("boxRecipientesForm"), fMapa = q("boxMapasForm"), fDoc = q("boxDocumentosForm"), fVei = q("boxVeiculosForm");
  if (!cap || !fItens || !fRec || !fMapa || !fDoc || !fVei || !q("itemNome")) return false;
  if (!q("itemEspacos")?.closest(".eq-stepper") || !q("itemCategoria")?._chipsOP) return false; // aguarda o visual dos formulários

  const donos = new Set();
  [fItens, fRec, fMapa, fDoc, fVei].forEach((f) => { const d = f.closest(".secao-toggle"); if (d) donos.add(d); });

  const root = document.createElement("div");
  root.id = "invOP";
  root.innerHTML = `
    <div class="iv-carga">
      <div class="iv-carga-topo">
        <div><div class="iv-rot">Carga</div><div class="iv-carga-val"><b id="ivCargaUsoOP">0</b> <small>/ <span id="ivCargaMaxOP">0</span> espaços</small></div></div>
        <button type="button" class="iv-gear" aria-label="Ajustar capacidade e limites" onclick="alternarAjustesInvOP()">${_ivI("gear")}</button>
      </div>
      <div class="iv-barra"><i id="ivCargaBarOP"></i></div>
      <div class="iv-slots" id="ivSlotsOP"></div>
      <div class="iv-ajustes" id="ivAjustesOP" hidden></div>
    </div>
    <div class="iv-tabs" id="ivTabsOP">
      <button type="button" class="on" data-pane="itens" onclick="trocarPaneInvOP('itens')">Itens<em id="invCntItensOP">0</em></button>
      <button type="button" data-pane="mapas" onclick="trocarPaneInvOP('mapas')">Mapas<em id="invCntMapasOP">0</em></button>
      <button type="button" data-pane="docs" onclick="trocarPaneInvOP('docs')">Docs<em id="invCntDocsOP">0</em></button>
    </div>
    <div class="iv-pane" data-pane="itens">
      <button type="button" class="iv-addc iv-novo-largo" onclick="abrirFolhaOP('item')">${_ivI("plus")}Novo item</button>
      <div id="ivListaItensOP"></div>
      <section class="iv-bolsas" id="ivBolsasOP">
        <button type="button" class="iv-bolsas-cab" id="ivBolsasCabOP" aria-expanded="true" onclick="alternarBolsasOP()">
          <span class="iv-bolsas-ico">${_ivI("bag")}</span><b>Bolsas</b><em id="invCntRecOP">0</em><span class="iv-bolsas-chev">${_ivI("chev")}</span>
        </button>
        <div class="iv-bolsas-corpo" id="ivBolsasCorpoOP">
          <div id="ivSlotRecOP"></div>
          <button type="button" class="iv-addc" onclick="abrirFolhaOP('rec')">${_ivI("plus")}Nova bolsa</button>
        </div>
      </section>
    </div>
    <div class="iv-pane" data-pane="mapas" hidden><div id="ivSlotMapasOP"></div><button type="button" class="iv-addc" onclick="abrirFolhaOP('mapa')">${_ivI("plus")}Novo mapa</button></div>
    <div class="iv-pane" data-pane="docs" hidden><div id="ivSlotDocsOP"></div><button type="button" class="iv-addc" onclick="abrirFolhaOP('doc')">${_ivI("plus")}Novo documento</button></div>
    <div class="iv-veic" id="ivVeicOP">
      <div class="iv-sec"><b>Veículos</b><i></i></div>
      <div id="ivSlotVeicOP"></div>
      <button type="button" class="iv-addc" onclick="abrirFolhaOP('vei')">${_ivI("plus")}Novo veículo</button>
    </div>`;
  const primeiro = aba.querySelector(".secao-toggle");
  (primeiro || aba.lastElementChild).insertAdjacentElement(primeiro ? "beforebegin" : "afterend", root);

  const mover = (id, el) => { const alvo = root.querySelector("#" + id); if (alvo && el) alvo.appendChild(el); };
  mover("ivSlotRecOP", q("listaRecipientes"));
  mover("ivSlotMapasOP", q("listaMapas"));
  mover("ivSlotDocsOP", q("listaDocumentos"));
  mover("ivSlotVeicOP", q("listaVeiculos"));

  /* ajustes de capacidade e limites ficam atrás da engrenagem */
  const aj = root.querySelector("#ivAjustesOP");
  aj.appendChild(cap);
  const lim = q("limiteItensOP");
  if (lim) { aj.appendChild(lim); const d = lim.querySelector("details"); if (d) d.open = true; }

  /* veículos: o formulário vira folha; o cabeçalho antigo some */
  const ul = q("lista");
  if (ul) { ul.hidden = true; ul.style.display = "none"; }
  aba.querySelectorAll("h2.titulo-toggle").forEach((h) => {
    if (/boxItensForm|boxRecipientesForm|boxMapasForm|boxDocumentosForm|boxVeiculosForm/.test(h.getAttribute("onclick") || "")) h.style.display = "none";
  });

  _ivMontarFolhaItemOP();
  _ivMontarFolhaSimplesOP("rec", "Novo recipiente", fRec, "Adicionar recipiente", "addRecipiente", () => recipientes.length);
  _ivMontarFolhaSimplesOP("mapa", "Novo mapa", fMapa, "Adicionar mapa", "addMapa", () => mapas.length);
  _ivMontarFolhaSimplesOP("doc", "Novo documento", fDoc, "Adicionar documento", "addDocumento", () => documentos.length);
  _ivMontarFolhaSimplesOP("vei", "Novo veículo", fVei, "Adicionar veículo", "addVeiculo", () => veiculos.length);

  donos.forEach((d) => { d.style.display = "none"; });
  try { _ivMontarDiarioOP(); } catch (e) { /* o diário antigo continua funcionando */ }
  return true;
}

function alternarBolsasOP() {
  const corpo = document.getElementById("ivBolsasCorpoOP");
  const cab = document.getElementById("ivBolsasCabOP");
  if (!corpo || !cab) return;
  corpo.hidden = !corpo.hidden;
  cab.setAttribute("aria-expanded", String(!corpo.hidden));
  document.getElementById("ivBolsasOP")?.classList.toggle("fechada", corpo.hidden);
}

function trocarPaneInvOP(p) {
  if (p === "rec") p = "itens"; // as bolsas ficam embaixo dos itens
  _invPaneOP = p;
  document.querySelectorAll("#ivTabsOP button").forEach((b) => b.classList.toggle("on", b.dataset.pane === p));
  document.querySelectorAll("#invOP .iv-pane").forEach((x) => { x.hidden = x.dataset.pane !== p; });
}

function alternarAjustesInvOP() {
  const el = document.getElementById("ivAjustesOP");
  if (!el) return;
  el.hidden = !el.hidden;
  document.querySelector(".iv-gear")?.classList.toggle("on", !el.hidden);
}

/* ---------- folhas (de baixo para cima) ---------- */
const _ivFolhasOP = {};

function _ivCriarFolhaOP(k, titulo, textoBotao, aoConfirmar) {
  const ov = document.createElement("div");
  ov.id = "ivOv_" + k;
  ov.className = "iv-ov";
  ov.hidden = true;
  ov.innerHTML = `
    <div class="iv-sheet" role="dialog" aria-label="${esc(titulo)}">
      <div class="iv-grip"></div>
      <div class="iv-sheet-top"><b>${esc(titulo)}</b><button type="button" class="iv-x" aria-label="Fechar" onclick="fecharFolhaOP('${k}')">${_ivI("x")}</button></div>
      <div class="iv-sheet-body" id="ivBody_${k}"></div>
      <div class="iv-sheet-foot">
        <button type="button" class="iv-btn-o" onclick="fecharFolhaOP('${k}')">Cancelar</button>
        <button type="button" class="iv-btn-p" onclick="${aoConfirmar}">${esc(textoBotao)}</button>
      </div>
    </div>`;
  ov.addEventListener("click", (e) => { if (e.target === ov) fecharFolhaOP(k); });
  document.body.appendChild(ov);
  _ivFolhasOP[k] = ov;
  return ov.querySelector("#ivBody_" + k);
}

function abrirFolhaOP(k) {
  const ov = _ivFolhasOP[k];
  if (!ov) return;
  ov.hidden = false;
  document.documentElement.classList.add("iv-trava");
  if (typeof ov._sinc === "function") ov._sinc();
}

function fecharFolhaOP(k) {
  const ov = _ivFolhasOP[k];
  if (ov) ov.hidden = true;
  if (!Object.values(_ivFolhasOP).some((o) => !o.hidden)) document.documentElement.classList.remove("iv-trava");
}

/* recipiente, mapa, documento e veículo: o formulário que já existia entra na folha */
function _ivMontarFolhaSimplesOP(k, titulo, box, textoBotao, fn, contar) {
  const corpo = _ivCriarFolhaOP(k, titulo, textoBotao, `_ivConfirmarOP('${k}','${fn}')`);
  box.classList.remove("fechado");
  box.classList.add("aberto");
  box.removeAttribute("style");
  corpo.appendChild(box);
  _ivFolhasOP[k]._contar = contar;
}

async function _ivConfirmarOP(k, fn) {
  const ov = _ivFolhasOP[k];
  const antes = ov._contar();
  await window[fn]();
  if (ov._contar() > antes) fecharFolhaOP(k);
}

/* item: cada campo do formulário antigo vai para um lugar da folha */
const _IV_DETALHES = [
  ["desc", "text", "Descrição"],
  ["mod", "wrench", "Modificação"],
  ["mald", "skull", "Maldição"],
  ["img", "img", "Imagem"],
  ["sint", "link", "Sintonia"],
];

function _ivMontarFolhaItemOP() {
  const q = (id) => document.getElementById(id);
  const corpo = _ivCriarFolhaOP("item", "Novo item", "Adicionar item", "confirmarItemOP()");
  _ivFolhasOP.item._sinc = _ivSincFolhaItemOP;
  corpo.innerHTML = `
    <div class="iv-seg"><button type="button" class="on" id="ivSegBrancoOP">Em branco</button><button type="button" id="ivSegCatOP" onclick="abrirSeletorOP('itemCatalogoSel')">Do catálogo</button></div>
    <div class="iv-campo" id="ivfNome"></div>
    <div class="iv-duplo">
      <div><span class="iv-rot">Quantidade</span><div id="ivfQtd"></div></div>
      <div><span class="iv-rot">Espaços (cada)</span><div id="ivfEsp"></div></div>
    </div>
    <div class="iv-campo"><span class="iv-rot">Categoria</span><div id="ivfCat"></div></div>
    <span class="iv-rot">Adicionar detalhes</span>
    <div class="iv-ex" id="ivExOP">${_IV_DETALHES.map(([d, ic, nome]) => `<button type="button" data-det="${d}" onclick="alternarDetalheItemOP('${d}')">${_ivI(ic)}${nome}</button>`).join("")}</div>
    ${_IV_DETALHES.map(([d]) => `<div class="iv-det" data-det="${d}" id="ivd_${d}" hidden></div>`).join("")}`;

  const nome = q("itemNome"); nome.placeholder = "Nome do item";
  corpo.querySelector("#ivfNome").appendChild(nome);

  const qtd = q("itemQtd"); qtd.placeholder = "1"; qtd.min = "1";
  const stp = document.createElement("div");
  stp.className = "iv-stp";
  const mudar = (d) => { qtd.value = String(Math.max(1, (parseInt(qtd.value) || 1) + d)); qtd.dispatchEvent(new Event("input", { bubbles: true })); };
  const menos = document.createElement("button"); menos.type = "button"; menos.textContent = "−"; menos.setAttribute("aria-label", "Diminuir"); menos.onclick = () => mudar(-1);
  const mais = document.createElement("button"); mais.type = "button"; mais.textContent = "+"; mais.setAttribute("aria-label", "Aumentar"); mais.onclick = () => mudar(1);
  stp.append(menos, qtd, mais);
  corpo.querySelector("#ivfQtd").appendChild(stp);

  const esp = q("itemEspacos");
  corpo.querySelector("#ivfEsp").appendChild(esp.closest(".eq-stepper") || esp);

  const cat = q("itemCategoria");
  const alvoCat = corpo.querySelector("#ivfCat");
  if (cat._chipsOP) alvoCat.appendChild(cat._chipsOP);
  alvoCat.appendChild(cat);

  corpo.querySelector("#ivd_desc").appendChild(q("itemDesc"));
  const mod = q("itemModCatalogoSel")?.closest(".eq-mods-sel");
  if (mod) corpo.querySelector("#ivd_mod").appendChild(mod);
  corpo.querySelector("#ivd_mod").appendChild(q("itemModificacoes"));
  const mal = q("itemMaldCatalogoSel")?.closest(".eq-mods-sel");
  if (mal) corpo.querySelector("#ivd_mald").appendChild(mal);
  corpo.querySelector("#ivd_mald").appendChild(q("itemMaldicoes"));

  const dImg = corpo.querySelector("#ivd_img");
  const inpImg = q("itemImagem");
  const lbl = document.querySelector('label[for="itemImagem"]');
  const prev = q("itemImagemPreview");
  const rem = prev ? prev.nextElementSibling : null;
  [inpImg, lbl, prev, rem].forEach((e) => { if (e) dImg.appendChild(e); });

  const dSint = corpo.querySelector("#ivd_sint");
  const tog = q("itemRequerSintonia")?.closest(".toggle-cargas");
  if (tog) dSint.appendChild(tog);
  if (q("boxItemSintonizado")) dSint.appendChild(q("boxItemSintonizado"));

  /* o formulário antigo fica só como depósito (catálogo escondido) */
  fItens_esconder();
  function fItens_esconder() { const f = q("boxItensForm"); if (f) f.style.display = "none"; }
}

function alternarDetalheItemOP(d, forcar) {
  const det = document.getElementById("ivd_" + d);
  const btn = document.querySelector(`#ivExOP button[data-det="${d}"]`);
  if (!det || !btn) return;
  const mostrar = forcar === undefined ? det.hidden : forcar;
  det.hidden = !mostrar;
  btn.classList.toggle("on", mostrar);
}

/* abre sozinho os detalhes que já têm conteúdo (ex.: depois de escolher no catálogo) */
function _ivSincFolhaItemOP() {
  const q = (id) => document.getElementById(id);
  const tem = {
    desc: !!(q("itemDesc")?.value || "").trim(),
    mod: !!(q("itemModificacoes")?.value || "").trim(),
    mald: !!(q("itemMaldicoes")?.value || "").trim(),
    img: !!q("itemImagemPreview") && q("itemImagemPreview").style.display !== "none" && q("itemImagemPreview").style.display !== "",
    sint: !!q("itemRequerSintonia")?.checked,
  };
  Object.entries(tem).forEach(([d, v]) => { if (v) alternarDetalheItemOP(d, true); });
}

function _ivLimparFolhaItemOP() {
  const q = (id) => document.getElementById(id);
  ["itemNome", "itemDesc", "itemQtd", "itemEspacos", "itemCategoria", "itemModificacoes", "itemMaldicoes"].forEach((id) => {
    const el = q(id); if (el) { el.value = ""; el.dispatchEvent(new Event("input", { bubbles: true })); }
  });
  if (q("itemRequerSintonia")) { q("itemRequerSintonia").checked = false; if (typeof toggleSintoniaItem === "function") toggleSintoniaItem(); }
  if (typeof removerImagemItem === "function") try { removerImagemItem(); } catch (e) { /* sem imagem */ }
  _IV_DETALHES.forEach(([d]) => alternarDetalheItemOP(d, false));
}

async function confirmarItemOP() {
  const nome = document.getElementById("itemNome");
  if (!nome || !nome.value.trim()) {
    if (nome) { nome.classList.add("iv-erro"); nome.focus(); setTimeout(() => nome.classList.remove("iv-erro"), 1400); }
    return;
  }
  const antes = inventario.length;
  await addItem();
  if (inventario.length > antes) {
    fecharFolhaOP("item");
    _IV_DETALHES.forEach(([d]) => alternarDetalheItemOP(d, false));
  }
}

/* catálogo: depois de escolher, os campos aparecem preenchidos na folha */
(function () {
  if (typeof aplicarCatalogoItemOP !== "function") return;
  const original = aplicarCatalogoItemOP;
  aplicarCatalogoItemOP = function (prefixo) {
    const r = original.apply(this, arguments);
    if (prefixo === "item") {
      abrirFolhaOP("item");
      const inp = document.getElementById("itemCategoria");
      if (inp && typeof _sincronizarChipsCatOP === "function") _sincronizarChipsCatOP(inp);
    }
    return r;
  };
})();

/* ---------- carga ---------- */
function atualizarCargaOP() {
  const set = (id, v) => { const e = document.getElementById(id); if (e) e.textContent = v; };
  if (!document.getElementById("ivCargaUsoOP")) return;
  const uso = calcularEspacosInventario();
  const max = numeroInventario(document.getElementById("inventarioEspacosMax")?.value);
  set("ivCargaUsoOP", _ivN(uso));
  set("ivCargaMaxOP", _ivN(max));
  const barra = document.getElementById("ivCargaBarOP");
  if (barra) {
    barra.style.width = (max > 0 ? Math.min(100, (uso / max) * 100) : 0) + "%";
    barra.classList.toggle("exc", max > 0 && uso > max);
  }
  const slots = document.getElementById("ivSlotsOP");
  if (slots) {
    const { lim } = limitesDaFichaOP();
    const cont = contarItensPorCategoriaOP();
    slots.innerHTML = CATS_LIM_OP.map((c) => {
      const exc = cont[c] > lim[c];
      const pct = lim[c] > 0 ? Math.min(100, (cont[c] / lim[c]) * 100) : cont[c] > 0 ? 100 : 0;
      return `<div class="iv-slot${exc ? " exc" : ""}"><b>${c}</b><small>${cont[c]}/${lim[c]}</small><div class="iv-barra"><i style="width:${pct}%"></i></div></div>`;
    }).join("");
  }
}

function atualizarContagensInvOP() {
  const set = (id, v) => { const e = document.getElementById(id); if (e) e.textContent = v; };
  set("invCntItensOP", (typeof inventario !== "undefined" ? inventario : []).length);
  set("invCntRecOP", (typeof recipientes !== "undefined" ? recipientes : []).length);
  set("invCntMapasOP", (typeof mapas !== "undefined" ? mapas : []).length);
  set("invCntDocsOP", (typeof documentos !== "undefined" ? documentos : []).length);
}

/* ---------- lista de itens (a categoria aparece no próprio cartão) ---------- */
function _ivBuscarOP() { _renderListaItensOP(); }
function _ivFiltrarCatOP() { _renderListaItensOP(); }

function _ivCatItemOP(item) { return categoriaDoItemOP(item).texto || "0"; }

function _renderListaItensOP() {
  const box = document.getElementById("ivListaItensOP");
  if (!box) return;
  if (!inventario.length) {
    box.innerHTML = "";
    return;
  }
  box.innerHTML = inventario.map((it, i) => {
    const qtd = Math.max(1, parseInt(it.qtd) || 1);
    const mods = _modsDoItem(it).map((m) => m.nome).filter(Boolean);
    const cat = _ivCatItemOP(it);
    const meta = [`<span class="iv-cat">Cat. ${esc(cat)}</span>`, `×${qtd}`, `${_ivN(it.espacos || 0)} esp cada`]
      .concat(mods.length ? [`mod. ${esc(mods[0])}${mods.length > 1 ? " +" + (mods.length - 1) : ""}`] : []).join('<i class="iv-pt"></i>');
    const ponto = it.requerSintonia ? `<i class="iv-ponto${it.sintonizado ? " on" : ""}" title="${it.sintonizado ? "Sintonizado" : "Requer sintonia"}"></i>` : "";
    return `<div class="iv-item" onclick="abrirItemInvOP(${i})" role="button" tabindex="0">
      <div class="iv-seal">${esc(cat)}</div>
      <div class="iv-info"><div class="iv-nome">${esc(it.nome || "Sem nome")}${ponto}</div><div class="iv-meta">${meta}</div></div>
      <div class="iv-dir"><b>${_ivN(calcularEspacosItem(it))}</b><small>esp</small></div>
    </div>`;
  }).join("");
}

/* ---------- popup do item inteiro ---------- */
let _ivPopIdxOP = null;
let _ivPopTipoOP = "item";

function abrirItemInvOP(i) {
  const it = inventario[i];
  if (!it) return;
  _ivPopIdxOP = i;
  _ivPopTipoOP = "item";
  let ov = document.getElementById("ivPopOP");
  if (!ov) {
    ov = document.createElement("div");
    ov.id = "ivPopOP";
    ov.className = "iv-ov iv-ov-pop";
    ov.addEventListener("click", (e) => { if (e.target === ov) fecharItemInvOP(); });
    document.body.appendChild(ov);
  }
  const qtd = Math.max(1, parseInt(it.qtd) || 1);
  const c = categoriaDoItemOP(it);
  const mods = _modsDoItem(it);
  const modTxt = typeof it.modificacoes === "string" ? it.modificacoes.trim() : "";
  const mald = typeof it.maldicoes === "string" ? it.maldicoes.trim() : "";
  const desc = (it.desc || "").trim();
  const sint = it.requerSintonia ? (it.sintonizado ? "Sintonizado" : "Requer sintonia") : "";
  ov.innerHTML = `
    <div class="iv-pop" role="dialog" aria-label="${esc(it.nome || "Item")}">
      <div class="iv-pop-top">
        <div class="iv-seal iv-seal-g">${esc(c.texto || "0")}</div>
        <div class="iv-pop-tit"><b>${esc(it.nome || "Sem nome")}</b>${sint ? `<small>${sint}<i class="iv-ponto${it.sintonizado ? " on" : ""}"></i></small>` : ""}</div>
        <button type="button" class="iv-x" aria-label="Fechar" onclick="fecharItemInvOP()">${_ivI("x")}</button>
      </div>
      <div class="iv-pop-corpo">
        ${it.imagemUrl ? `<img class="iv-pop-img" src="${esc(it.imagemUrl)}" alt="" />` : ""}
        <div class="iv-st3">
          <div><span class="iv-rot">Qtd</span><div class="iv-qtd"><button type="button" onclick="ajustarQtdItemOP(${i}, -1)" aria-label="Diminuir">−</button><b>${qtd}</b><button type="button" onclick="ajustarQtdItemOP(${i}, 1)" aria-label="Aumentar">+</button></div></div>
          <div><span class="iv-rot">Espaços</span><b>${_ivN(calcularEspacosItem(it))}</b></div>
          <div><span class="iv-rot">Cat.</span><b>${esc(c.texto || "0")}${c.extra ? `<small> (${esc(c.base)}+${c.extra})</small>` : ""}</b></div>
        </div>
        ${mods.length || modTxt ? `<div class="iv-bloco"><span class="iv-rot">Modificações</span>${mods.map((m) => `<p><b>${esc(m.nome || "Sem nome")}</b>${m.desc ? " — " + esc(m.desc) : ""}</p>`).join("")}${modTxt ? `<p>${esc(modTxt)}</p>` : ""}</div>` : ""}
        ${mald ? `<div class="iv-bloco"><span class="iv-rot">Maldições</span><p>${esc(mald)}</p></div>` : ""}
        <div class="iv-bloco"><span class="iv-rot">Descrição</span><p>${desc ? esc(desc) : "Sem descrição."}</p></div>
      </div>
      <div class="iv-pop-acoes">
        <button type="button" onclick="_ivPopAcaoOP('editar')">${_ivI("edit")}Editar</button>
        <button type="button" onclick="_ivPopAcaoOP('dar')">${_ivI("gift")}Dar</button>
        <button type="button" class="perigo" onclick="_ivPopAcaoOP('remover')">${_ivI("trash")}Remover</button>
      </div>
    </div>`;
  ov.hidden = false;
  document.documentElement.classList.add("iv-trava");
}

function fecharItemInvOP() {
  const ov = document.getElementById("ivPopOP");
  if (ov) ov.hidden = true;
  _ivPopIdxOP = null;
  if (!Object.values(_ivFolhasOP).some((o) => !o.hidden)) document.documentElement.classList.remove("iv-trava");
}

function _ivPopAcaoOP(acao) {
  const i = _ivPopIdxOP;
  if (i === null) return;
  const tipo = _ivPopTipoOP;
  fecharItemInvOP();
  const f = {
    item: { editar: () => editarItem(i), dar: () => window.abrirDarItem("inventario", i), remover: () => removerItem(i) },
    arma: { editar: () => editarArma(i), dar: () => window.abrirDarItem("armas", i), remover: () => removerArma(i) },
    armadura: { editar: () => editarArmadura(i), dar: () => window.abrirDarItem("armaduras", i), remover: () => removerArmadura(i) },
  }[tipo];
  if (f && f[acao]) f[acao]();
}

function ajustarQtdItemOP(i, d) {
  const it = inventario[i];
  if (!it) return;
  it.qtd = Math.max(1, (parseInt(it.qtd) || 1) + d);
  renderInv();
  salvarTudo();
  const ov = document.getElementById("ivPopOP");
  if (ov && !ov.hidden) abrirItemInvOP(i);
}

/* ---------- recipientes e veículos em cartões ---------- */
function _ivBarraOP(pct, exc) {
  return `<div class="iv-barra iv-barra-g"><i class="${exc ? "exc" : ""}" style="width:${Math.max(0, Math.min(100, pct))}%"></i></div>`;
}

renderRecipientes = function () {
  const ul = document.getElementById("listaRecipientes");
  if (!ul) return;
  ul.innerHTML = "";
  recipientes.forEach((rec, index) => {
    if (!Array.isArray(rec.itens)) rec.itens = [];
    const usado = calcularEspacosDentroRecipiente(rec);
    const cap = numeroInventario(rec.capacidade);
    const exc = cap > 0 && usado > cap;
    const n = rec.itens.length;
    const card = document.createElement("li");
    card.className = "iv-cartao";
    card.onclick = () => verRecipiente(index);
    card.innerHTML = `
      <div class="iv-ctop">
        <div class="iv-seal">${iconeRecipienteHTML(rec.icone, "iv-rec-ico")}</div>
        <div class="iv-info"><div class="iv-nome">${esc(rec.nome || "Recipiente")}</div><div class="iv-meta">${n} ${n === 1 ? "item guardado" : "itens guardados"}</div></div>
        <div class="iv-dir"><b class="${exc ? "exc" : ""}">${_ivN(usado)}${cap > 0 ? ` <small>/ ${_ivN(cap)}</small>` : ""}</b></div>
      </div>
      ${cap > 0 ? _ivBarraOP((usado / cap) * 100, exc) : ""}
      <div class="iv-chips">${n ? rec.itens.slice(0, 6).map((it) => `<span>${esc(it.nome || "Item")}${(parseInt(it.qtd) || 1) > 1 ? " ×" + parseInt(it.qtd) : ""}</span>`).join("") + (n > 6 ? `<span>+${n - 6}</span>` : "") : '<span class="vazio">Vazio</span>'}</div>
      <div class="iv-acoes">
        <button type="button" onclick="event.stopPropagation(); abrirColocarNoRecipiente(${index})">${_ivI("plus")}Guardar</button>
        <button type="button" onclick="event.stopPropagation(); abrirTirarVariosRecipiente(${index})">Retirar</button>
        <button type="button" class="ico" aria-label="Editar" onclick="event.stopPropagation(); editarRecipiente(${index})">${_ivI("edit")}</button>
        <button type="button" class="ico perigo" aria-label="Remover" onclick="event.stopPropagation(); removerRecipiente(${index})">${_ivI("trash")}</button>
      </div>`;
    ul.appendChild(card);
  });
  atualizarResumoInventario();
};

renderVeiculos = function () {
  const lista = document.getElementById("listaVeiculos");
  if (!lista) return;
  lista.innerHTML = "";
  veiculos.forEach((v, index) => {
    const vidaMax = numeroInventario(v.vidaMax);
    const vida = numeroInventario(v.vidaAtual ?? vidaMax);
    const gasMax = numeroInventario(v.gasolinaMax);
    const gas = numeroInventario(v.gasolinaAtual ?? gasMax);
    const carga = calcularEspacosVeiculo(v);
    const meta = [`${v.passageirosMax || 0} ${(parseInt(v.passageirosMax) || 0) === 1 ? "pessoa" : "pessoas"}`, `${_ivN(carga)}/${_ivN(v.espacosMax || 0)} esp. de carga`].join(" · ");
    const card = document.createElement("li");
    card.className = "iv-cartao";
    card.onclick = () => verVeiculo(index);
    card.innerHTML = `
      <div class="iv-ctop">
        <div class="iv-seal iv-seal-emoji">${esc(v.icone || "🚗")}</div>
        <div class="iv-info"><div class="iv-nome">${esc(v.nome || "Veículo")}</div><div class="iv-meta">${meta}</div></div>
        <button type="button" class="iv-x iv-x-mini" aria-label="Remover veículo" onclick="event.stopPropagation(); removerVeiculo(${index})">${_ivI("x")}</button>
      </div>
      <div class="iv-vb"><span>Vida</span>${_ivBarraOP(vidaMax > 0 ? (vida / vidaMax) * 100 : 0).replace('iv-barra-g', 'iv-barra-v')}<em>${_ivN(vida)}/${_ivN(vidaMax)}</em></div>
      <div class="iv-vb"><span>Gasolina</span>${_ivBarraOP(gasMax > 0 ? (gas / gasMax) * 100 : 0)}<em>${_ivN(gas)}/${_ivN(gasMax)}</em></div>`;
    lista.appendChild(card);
  });
};

/* ---------- renderização geral ---------- */
renderInv = function () {
  montarInventarioOP();
  atualizarResumoInventario();
  const ul = document.getElementById("lista");
  if (ul) ul.innerHTML = "";
  _renderListaItensOP();
  atualizarContagensInvOP();
  atualizarCargaOP();
  atualizarLimiteItensOP();
};

(function () {
  if (typeof atualizarResumoInventario === "function") {
    const original = atualizarResumoInventario;
    atualizarResumoInventario = function () {
      const r = original.apply(this, arguments);
      try { atualizarContagensInvOP(); atualizarCargaOP(); } catch (e) { /* ainda não montado */ }
      return r;
    };
  }
})();

/* o formulário se esconde e a lista cresce depois do addItem: nada a fazer aqui */

function _iniciarInventarioOP() {
  if (!montarInventarioOP()) { setTimeout(_iniciarInventarioOP, 200); return; }
  trocarPaneInvOP(_invPaneOP);
  renderInv();
  if (typeof renderRecipientes === "function") renderRecipientes();
  if (typeof renderVeiculos === "function") renderVeiculos();
  atualizarCargaOP();
}
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", () => setTimeout(_iniciarInventarioOP, 200));
else setTimeout(_iniciarInventarioOP, 200);


/* =====================================================================
   Aba Combate: armas e vestimentas em cartões recolhíveis
   (Vida, Sanidade e Esforço continuam como estavam)
   ===================================================================== */
let _cbPaneOP = "armas";
const _cbAbertoOP = { arma: null, armadura: null };

const _CB_DET = {
  arma: [["comb", "wrench", "Combate"], ["desc", "text", "Descrição"], ["img", "img", "Imagem"], ["carg", "dice", "Cargas"], ["sint", "link", "Sintonia"]],
  armadura: [["comb", "shield", "Detalhes"], ["desc", "text", "Descrição"], ["img", "img", "Imagem"], ["carg", "dice", "Cargas"], ["sint", "link", "Sintonia"]],
};
Object.assign(_IV_ICO, {
  sword: '<path d="M19 5 9 15M7 13l4 4M9 15l-4 4M19 5h-4M19 5v4"/>',
  shield: '<path d="M12 3l7 3v6c0 4-3 7-7 9-4-2-7-5-7-9V6z"/>',
  dice: '<rect x="5" y="5" width="14" height="14" rx="3"/><circle cx="9.5" cy="9.5" r="1"/><circle cx="14.5" cy="14.5" r="1"/>',
  chev: '<path d="m6 9 6 6 6-6"/>',
  check: '<path d="m5 12 5 5 9-10"/>',
  target: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/>',
});

function montarCombateOP() {
  const aba = document.getElementById("combate");
  if (!aba) return false;
  if (document.getElementById("cbOP")) return true;
  const q = (id) => document.getElementById(id);
  const fArma = q("boxArmasForm"), fArm = q("boxArmadurasForm"), fRes = q("boxResistencias");
  if (!fArma || !fArm || !fRes || !q("armaNome") || !q("armaduraNome")) return false;
  if (!q("armaCategoria")?._chipsOP || !q("armaduraCategoria")?._chipsOP || !q("armaEspacos")?.closest(".eq-stepper") || !q("armaduraEspacos")?.closest(".eq-stepper")) return false;

  const donos = [fArma, fArm, fRes].map((f) => f.closest(".secao-toggle")).filter(Boolean);
  const root = document.createElement("div");
  root.id = "cbOP";
  root.innerHTML = `
    <div class="iv-fil cb-seg" id="cbSegOP">
      <button type="button" class="on" data-pane="armas" onclick="trocarPaneCombateOP('armas')">Armas <em id="cbCntArmasOP">0</em></button>
      <button type="button" data-pane="armaduras" onclick="trocarPaneCombateOP('armaduras')">Vestimentas <em id="cbCntArmadOP">0</em></button>
      <button type="button" data-pane="res" onclick="trocarPaneCombateOP('res')">Resistências</button>
    </div>
    <div class="iv-pane" data-pane="armas"><div id="cbSlotArmasOP"></div><button type="button" class="iv-addc" onclick="abrirFolhaOP('arma')">${_ivI("plus")}Nova arma</button></div>
    <div class="iv-pane" data-pane="armaduras" hidden><div id="cbSlotArmadOP"></div><button type="button" class="iv-addc" onclick="abrirFolhaOP('armadura')">${_ivI("plus")}Nova vestimenta</button></div>
    <div class="iv-pane" data-pane="res" hidden><div id="cbSlotResOP"></div></div>`;
  const primeiro = donos[0];
  (primeiro || aba.lastElementChild).insertAdjacentElement(primeiro ? "beforebegin" : "afterend", root);

  root.querySelector("#cbSlotArmasOP").appendChild(q("listaArmas"));
  root.querySelector("#cbSlotArmadOP").appendChild(q("listaArmaduras"));
  /* só o campo de texto vai para o painel (o recipiente antigo pode estar recolhido) */
  const campoRes = q("resistencias");
  root.querySelector("#cbSlotResOP").innerHTML = `
    <div class="cb-res">
      <span class="iv-rot">Resistências e proteções</span>
      <div id="cbResCampoOP"></div>
      <span class="iv-rot cb-res-rot">Adicionar tipo</span>
      <div class="iv-tags cb-res-tipos">${["Balístico", "Corte", "Impacto", "Perfuração", "Fogo", "Frio", "Eletricidade", "Químico", "Mental", "Sangue", "Morte", "Conhecimento", "Energia"].map((t) => `<button type="button" class="iv-tag" onclick="inserirResistenciaOP('${t}')">${t}</button>`).join("")}</div>
      <small class="cb-res-dica">Toque num tipo para inserir no texto e depois digite o valor (ex.: Balístico 5).</small>
    </div>`;
  root.querySelector("#cbResCampoOP").appendChild(campoRes);
  campoRes.placeholder = "Ex.: Balístico 5, Fogo 2, imune a veneno…";

  _cbMontarFolhaEquipOP("arma", "Nova arma", "Adicionar arma", "addArma", fArma, () => armas.length);
  _cbMontarFolhaEquipOP("armadura", "Nova vestimenta", "Adicionar vestimenta", "addArmadura", fArm, () => armaduras.length);
  donos.forEach((d) => { d.style.display = "none"; });
  return true;
}

function inserirResistenciaOP(tipo) {
  const t = document.getElementById("resistencias");
  if (!t) return;
  const v = t.value;
  const sep = !v.trim() ? "" : /\n$/.test(v) ? "" : ", ";
  t.value = v.replace(/[\s,]+$/, (m) => (m.includes("\n") ? m : "")) + sep + tipo + " ";
  t.dispatchEvent(new Event("input", { bubbles: true }));
  t.focus();
  t.setSelectionRange(t.value.length, t.value.length);
}

function trocarPaneCombateOP(p) {
  _cbPaneOP = p;
  document.querySelectorAll("#cbSegOP button").forEach((b) => b.classList.toggle("on", b.dataset.pane === p));
  document.querySelectorAll("#cbOP .iv-pane").forEach((x) => { x.hidden = x.dataset.pane !== p; });
}

/* o formulário antigo de arma/vestimenta é desmontado e cada campo vai para um lugar da folha */
function _cbMontarFolhaEquipOP(k, titulo, textoBotao, fn, box, contar) {
  const q = (id) => document.getElementById(id);
  const arma = k === "arma";
  const pre = arma ? "arma" : "armadura";
  const corpo = _ivCriarFolhaOP(k, titulo, textoBotao, `confirmarEquipOP('${k}','${fn}')`);
  const ov = _ivFolhasOP[k];
  ov._contar = contar;
  ov._sinc = () => _cbSincFolhaEquipOP(k);

  corpo.innerHTML = `
    <div class="iv-seg"><button type="button" class="on">Em branco</button><button type="button" onclick="abrirSeletorOP('${pre}CatalogoSel')">Do catálogo</button></div>
    <div class="iv-campo" id="ive_${k}_nome"></div>
    <div class="iv-duplo">
      <div><span class="iv-rot">${arma ? "Dano" : "CA"}</span><div id="ive_${k}_main"></div></div>
      <div><span class="iv-rot">Espaços</span><div id="ive_${k}_esp"></div></div>
    </div>
    <div class="iv-campo"><span class="iv-rot">Categoria</span><div id="ive_${k}_cat"></div></div>
    <span class="iv-rot">Adicionar detalhes</span>
    <div class="iv-ex" id="ive_${k}_ex">${_CB_DET[k].map(([d, ic, nome]) => `<button type="button" data-det="${d}" onclick="alternarDetalheEquipOP('${k}','${d}')">${_ivI(ic)}${nome}</button>`).join("")}</div>
    ${_CB_DET[k].map(([d]) => `<div class="iv-det" data-det="${d}" id="ive_${k}_${d}" hidden></div>`).join("")}`;
  const slot = (n) => corpo.querySelector("#ive_" + k + "_" + n);

  slot("nome").appendChild(q(pre + "Nome"));
  slot("main").appendChild(arma ? q("armaDano") : q("armaduraCA"));
  slot("esp").appendChild(q(pre + "Espacos").closest(".eq-stepper"));
  const cat = q(pre + "Categoria");
  slot("cat").append(cat._chipsOP, cat);
  slot("comb").appendChild(q(pre + "ExtrasBox"));
  slot("desc").appendChild(q(pre + "Desc"));
  const inpImg = q(pre + "Imagem"), lbl = document.querySelector(`label[for="${pre}Imagem"]`), prev = q(pre + "ImagemPreview");
  [inpImg, lbl, prev, prev ? prev.nextElementSibling : null].forEach((e) => { if (e) slot("img").appendChild(e); });
  const togCarg = q(pre + "TemCargas")?.closest(".toggle-cargas");
  if (togCarg) slot("carg").appendChild(togCarg);
  slot("carg").appendChild(q(pre + "MaxCargas"));
  const togSint = q(pre + "RequerSintonia")?.closest(".toggle-cargas");
  if (togSint) slot("sint").appendChild(togSint);
  const bs = q(arma ? "boxArmaSintonizado" : "boxArmaduraSintonizado");
  if (bs) slot("sint").appendChild(bs);
  box.style.display = "none"; /* depósito: catálogo escondido e botão antigo */
}

function alternarDetalheEquipOP(k, d, forcar) {
  const det = document.getElementById(`ive_${k}_${d}`);
  const btn = document.querySelector(`#ive_${k}_ex button[data-det="${d}"]`);
  if (!det || !btn) return;
  const mostrar = forcar === undefined ? det.hidden : forcar;
  det.hidden = !mostrar;
  btn.classList.toggle("on", mostrar);
}

function _cbSincFolhaEquipOP(k) {
  const q = (id) => document.getElementById(id);
  const pre = k === "arma" ? "arma" : "armadura";
  const prev = q(pre + "ImagemPreview");
  const tem = {
    desc: !!(q(pre + "Desc")?.value || "").trim(),
    comb: [...(q(pre + "ExtrasBox")?.querySelectorAll("input") || [])].some((i) => (i.value || "").trim()) || !!q(pre + "ExtrasBox")?.querySelector(".mod-linha"),
    img: !!prev && prev.style.display !== "none" && prev.style.display !== "",
    carg: !!q(pre + "TemCargas")?.checked,
    sint: !!q(pre + "RequerSintonia")?.checked,
  };
  Object.entries(tem).forEach(([d, v]) => { if (v) alternarDetalheEquipOP(k, d, true); });
}

async function confirmarEquipOP(k, fn) {
  const pre = k === "arma" ? "arma" : "armadura";
  const nome = document.getElementById(pre + "Nome");
  if (!nome || !nome.value.trim()) {
    if (nome) { nome.classList.add("iv-erro"); nome.focus(); setTimeout(() => nome.classList.remove("iv-erro"), 1400); }
    return;
  }
  const ov = _ivFolhasOP[k];
  const antes = ov._contar();
  await window[fn]();
  if (ov._contar() > antes) {
    fecharFolhaOP(k);
    _CB_DET[k].forEach(([d]) => alternarDetalheEquipOP(k, d, false));
  }
}

/* catálogo: depois de escolher, a folha abre com tudo preenchido */
(function () {
  if (typeof aplicarCatalogoEquipOP !== "function") return;
  const original = aplicarCatalogoEquipOP;
  aplicarCatalogoEquipOP = function (prefixo, tipo) {
    const r = original.apply(this, arguments);
    if (_ivFolhasOP[prefixo]) abrirFolhaOP(prefixo);
    return r;
  };
})();

/* ---------- cartões ---------- */
function alternarCartaoCombateOP(tipo, i) {
  _cbAbertoOP[tipo] = _cbAbertoOP[tipo] === i ? null : i;
  if (tipo === "arma") renderArmas(); else renderArmaduras();
}

function _cbTagsOP(item, tipo) {
  const d = item.detalhes || {};
  const t = [];
  const add = (txt, cls) => t.push(`<span class="iv-tag${cls ? " " + cls : ""}">${txt}</span>`);
  if (tipo === "arma") {
    if (d.critico || d.multiplicador) add(`${_ivI("target")}Crít. ${esc(d.critico || "20")}/x${esc(d.multiplicador || "2")}`);
    if (d.ataqueBonus && d.ataqueBonus !== "0") add(`Atq ${esc(d.ataqueBonus)}`);
    if (d.tipoDano) add(esc(d.tipoDano));
    if (d.alcance) add(esc(d.alcance));
    if (d.pericia) add(esc(d.pericia) + (d.atributoDano ? ` · ${esc(d.atributoDano)}` : ""));
    if (d.danoExtra) add(`+ ${esc(d.danoExtra)}`);
  } else {
    if (d.resistencias) add(esc(d.resistencias));
    if (d.penalidades) add(`Penal.: ${esc(d.penalidades)}`);
    if (d.requisitos) add(`Req. ${esc(d.requisitos)}`);
  }
  if (numeroInventario(item.espacos) > 0) add(`${_ivN(item.espacos)} ${numeroInventario(item.espacos) === 1 ? "espaço" : "espaços"}`);
  const c = categoriaDoItemOP(item);
  if (c.texto) add(`Cat. ${esc(c.texto)}`);
  _modsDoItem(item).forEach((m) => add(`${_ivI("wrench")}${esc(m.nome || "Modificação")}${m.cat ? ` +${m.cat} cat.` : ""}`, "m"));
  if (item.requerSintonia) add(item.sintonizado ? "Sintonizado" : "Requer sintonia");
  return t.join("");
}

function _cbCartaoOP(tipo, item, i) {
  const arma = tipo === "arma";
  const aberto = _cbAbertoOP[tipo] === i;
  const d = item.detalhes || {};
  const c = categoriaDoItemOP(item);
  const partes = [];
  if (arma) { if (d.critico || d.multiplicador) partes.push(`Crít. ${esc(d.critico || "20")}/x${esc(d.multiplicador || "2")}`); }
  else if (d.resistencias) partes.push(esc(d.resistencias));
  if (numeroInventario(item.espacos) > 0) partes.push(`${_ivN(item.espacos)} esp`);
  partes.push(`Cat ${esc(c.texto || "0")}`);
  const ponto = item.requerSintonia ? `<i class="iv-ponto${item.sintonizado ? " on" : ""}"></i>` : "";
  const direita = arma
    ? `<div class="cb-dano">${esc(item.dano) || "—"}</div>`
    : `<div class="cb-dano">${esc(item.ca) || "—"}<small>CA</small></div>`;
  let cargas = "";
  if (item.temCargas && item.maxCargas > 0) {
    const fn = arma ? "toggleCargaArma" : "toggleCargaArmadura";
    cargas = `<div class="arma-cargas-box"><span class="arma-cargas-label">Cargas</span><div class="arma-cargas-checks">${Array.from({ length: item.maxCargas }, (_, n) =>
      `<div class="arma-carga-check ${item.cargasGastas?.[n] ? "ativo" : ""}" onclick="event.stopPropagation(); ${fn}(${i}, ${n})"></div>`).join("")}</div></div>`;
  }
  const desc = (item.desc || "").trim();
  const ver = arma ? `verArma(${i})` : `verArmadura(${i})`;
  const edit = arma ? `editarArma(${i})` : `editarArmadura(${i})`;
  const dar = arma ? `window.abrirDarItem('armas', ${i})` : `window.abrirDarItem('armaduras', ${i})`;
  const rem = arma ? `removerArma(${i})` : `removerArmadura(${i})`;
  const det = aberto ? `
    <div class="cb-det">
      <div class="iv-tags">${_cbTagsOP(item, tipo)}</div>
      ${desc ? `<p class="cb-desc">${esc(desc.length > 260 ? desc.slice(0, 260) + "…" : desc)}</p>` : ""}
      ${cargas}
      <div class="iv-acoes">
        <button type="button" onclick="event.stopPropagation(); ${ver}">${_ivI("book")}Detalhes</button>
        <button type="button" onclick="event.stopPropagation(); ${edit}">${_ivI("edit")}Editar</button>
        <button type="button" onclick="event.stopPropagation(); ${dar}">${_ivI("gift")}Dar</button>
        <button type="button" class="ico perigo" aria-label="Remover" onclick="event.stopPropagation(); ${rem}">${_ivI("trash")}</button>
      </div>
    </div>` : "";
  return `
    <div class="cb-top" onclick="alternarCartaoCombateOP('${tipo}', ${i})" role="button" tabindex="0">
      <div class="iv-seal">${_ivI(arma ? "sword" : "shield")}</div>
      <div class="iv-info"><div class="iv-nome">${esc(item.nome) || "Sem nome"}${ponto}</div><div class="iv-meta">${partes.join(" · ")}</div></div>
      ${direita}
      <span class="cb-seta${aberto ? " aberto" : ""}">${_ivI("chev")}</span>
    </div>${det}`;
}

function _cbContagensOP() {
  const set = (id, v) => { const e = document.getElementById(id); if (e) e.textContent = v; };
  set("cbCntArmasOP", (typeof armas !== "undefined" ? armas : []).length);
  set("cbCntArmadOP", (typeof armaduras !== "undefined" ? armaduras : []).length);
}

renderArmas = function () {
  montarCombateOP();
  const ul = document.getElementById("listaArmas");
  if (!ul) return;
  if (_cbAbertoOP.arma !== null && !armas[_cbAbertoOP.arma]) _cbAbertoOP.arma = null;
  ul.innerHTML = "";
  armas.forEach((arma, i) => {
    const li = document.createElement("li");
    li.className = "iv-cartao cb-card" + (_cbAbertoOP.arma === i ? " aberto" : "");
    li.innerHTML = _cbCartaoOP("arma", arma, i);
    ul.appendChild(li);
  });
  _cbContagensOP();
  atualizarResumoInventario();
};

renderArmaduras = function () {
  montarCombateOP();
  const ul = document.getElementById("listaArmaduras");
  if (!ul) return;
  if (_cbAbertoOP.armadura !== null && !armaduras[_cbAbertoOP.armadura]) _cbAbertoOP.armadura = null;
  ul.innerHTML = "";
  armaduras.forEach((arm, i) => {
    const li = document.createElement("li");
    li.className = "iv-cartao cb-card" + (_cbAbertoOP.armadura === i ? " aberto" : "");
    li.innerHTML = _cbCartaoOP("armadura", arm, i);
    ul.appendChild(li);
  });
  _cbContagensOP();
  atualizarResumoInventario();
};

function _iniciarCombateOP() {
  if (!montarCombateOP()) { setTimeout(_iniciarCombateOP, 200); return; }
  trocarPaneCombateOP(_cbPaneOP);
  renderArmas();
  renderArmaduras();
}
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", () => setTimeout(_iniciarCombateOP, 250));
else setTimeout(_iniciarCombateOP, 250);


/* =====================================================================
   Popups compactos de arma, vestimenta e item (mesmo visual do inventário)
   ===================================================================== */
function abrirDetalheEquipOP(tipo, i) {
  const lista = tipo === "arma" ? armas : armaduras;
  const it = lista[i];
  if (!it) return;
  _ivPopIdxOP = i;
  _ivPopTipoOP = tipo;
  const arma = tipo === "arma";
  let ov = document.getElementById("ivPopOP");
  if (!ov) {
    ov = document.createElement("div");
    ov.id = "ivPopOP";
    ov.className = "iv-ov iv-ov-pop";
    ov.addEventListener("click", (e) => { if (e.target === ov) fecharItemInvOP(); });
    document.body.appendChild(ov);
  }
  const c = categoriaDoItemOP(it);
  const d = it.detalhes || {};
  const campos = _camposExtras(arma ? "arma" : "vestimenta");
  const chips = campos.filter((f) => d[f.id]).map((f) => `<span class="iv-tag"><b>${esc(f.label)}</b> ${esc(d[f.id])}</span>`).join("");
  const mods = _modsDoItem(it);
  const desc = (it.desc || "").trim();
  const sint = it.requerSintonia ? (it.sintonizado ? "Sintonizado" : "Requer sintonia") : "";
  const principal = arma ? ["Dano", esc(it.dano) || "—"] : ["CA", esc(it.ca) || "—"];
  const totalCat = mods.reduce((t, m) => t + (m.cat || 0), 0);
  let cargas = "";
  if (it.temCargas && it.maxCargas > 0) {
    const fn = arma ? "toggleCargaArma" : "toggleCargaArmadura";
    cargas = `<div class="iv-bloco"><span class="iv-rot">Cargas</span><div class="arma-cargas-checks iv-cargas">${Array.from({ length: it.maxCargas }, (_, n) =>
      `<div class="arma-carga-check ${it.cargasGastas?.[n] ? "ativo" : ""}" onclick="${fn}(${i}, ${n}); abrirDetalheEquipOP('${tipo}', ${i})"></div>`).join("")}</div></div>`;
  }
  ov.innerHTML = `
    <div class="iv-pop" role="dialog" aria-label="${esc(it.nome || "Item")}">
      <div class="iv-pop-top">
        <div class="iv-seal iv-seal-g">${_ivI(arma ? "sword" : "shield")}</div>
        <div class="iv-pop-tit"><b>${esc(it.nome || "Sem nome")}</b>${sint ? `<small>${sint}<i class="iv-ponto${it.sintonizado ? " on" : ""}"></i></small>` : ""}</div>
        <button type="button" class="iv-x" aria-label="Fechar" onclick="fecharItemInvOP()">${_ivI("x")}</button>
      </div>
      <div class="iv-pop-corpo">
        ${it.imagemUrl ? `<img class="iv-pop-img" src="${esc(it.imagemUrl)}" alt="" />` : ""}
        <div class="iv-st3">
          <div><span class="iv-rot">${principal[0]}</span><b class="iv-gd">${principal[1]}</b></div>
          <div><span class="iv-rot">Espaços</span><b>${_ivN(it.espacos || 0)}</b></div>
          <div><span class="iv-rot">Cat.</span><b>${esc(c.texto || "0")}${c.extra ? `<small> (${esc(c.base)}+${c.extra})</small>` : ""}</b></div>
        </div>
        ${chips ? `<div class="iv-tags iv-tags-pop">${chips}</div>` : ""}
        ${cargas}
        ${mods.length ? `<div class="iv-bloco"><span class="iv-rot">Modificações${totalCat > 0 ? ` · +${totalCat} cat.` : ""}</span>${mods.map((m) => `
          <div class="iv-mod" onclick="this.classList.toggle('aberto')"><div class="iv-mod-n"><b>${esc(m.nome || "Modificação")}</b>${m.cat ? `<em>+${m.cat} cat.</em>` : ""}</div>${m.desc ? `<p>${esc(m.desc)}</p>` : ""}</div>`).join("")}</div>` : ""}
        <div class="iv-bloco"><span class="iv-rot">Descrição</span><p>${desc ? esc(desc) : "Sem descrição."}</p></div>
      </div>
      <div class="iv-pop-acoes">
        <button type="button" onclick="_ivPopAcaoOP('editar')">${_ivI("edit")}Editar</button>
        <button type="button" onclick="_ivPopAcaoOP('dar')">${_ivI("gift")}Dar</button>
        <button type="button" class="perigo" onclick="_ivPopAcaoOP('remover')">${_ivI("trash")}Remover</button>
      </div>
    </div>`;
  ov.hidden = false;
  document.documentElement.classList.add("iv-trava");
}

verArma = function (i) { abrirDetalheEquipOP("arma", i); };
verArmadura = function (i) { abrirDetalheEquipOP("armadura", i); };
verItem = function (i) { abrirItemInvOP(i); };

/* =====================================================================
   Aba Personagem: capa com foto, cartões de dados e seções recolhíveis
   Os campos originais (ids) são apenas movidos; nada do que salva muda.
   ===================================================================== */
let _pjAbertoOP = {};
try { _pjAbertoOP = JSON.parse(localStorage.getItem("pjAccOP") || "{}") || {}; } catch (e) { _pjAbertoOP = {}; }

function _pjSecaoOP(id, titulo, corpoHTML, extra) {
  const aberto = !!_pjAbertoOP[id];
  return `
    <section class="pj-acc${aberto ? " aberto" : ""}" id="pjAcc_${id}">
      <button type="button" class="pj-acc-top" onclick="alternarSecaoPjOP('${id}')">
        <b>${titulo}</b><span class="pj-acc-dir">${extra || ""}<span class="pj-seta">${_ivI("chev")}</span></span>
      </button>
      <div class="pj-acc-corpo" id="pjCorpo_${id}">${corpoHTML}</div>
    </section>`;
}

function alternarSecaoPjOP(id) {
  const el = document.getElementById("pjAcc_" + id);
  if (!el) return;
  const on = el.classList.toggle("aberto");
  _pjAbertoOP[id] = on;
  try { localStorage.setItem("pjAccOP", JSON.stringify(_pjAbertoOP)); } catch (e) {}
}

function montarPersonagemOP() {
  const aba = document.getElementById("personagem");
  if (!aba) return false;
  if (document.getElementById("pjOP")) return true;
  const q = (id) => document.getElementById(id);
  const necessarios = ["nome", "racaSelect", "idade", "altura", "classe", "nivel", "antecedentes", "classeOP", "nex", "idiomas", "lorePersonagem", "listaAliados", "boxAliadosForm", "carrosselWrapper", "preview"];
  if (necessarios.some((id) => !q(id))) return false;
  const tentativa = (montarPersonagemOP._t = (montarPersonagemOP._t || 0) + 1);
  const camposOP = q("origemOP") && q("trilhaOP") && q("campoNivelOP") && document.querySelector(".op-campo-nex");
  if (!camposOP && tentativa < 40) return false;

  const topo = aba.firstElementChild;
  const root = document.createElement("div");
  root.id = "pjOP";
  root.innerHTML = `
    <div class="pj-hero sem-foto" id="pjHeroOP">
      <div class="pj-hero-vazio">Toque para adicionar foto</div>
      <div class="pj-hero-grad"></div>
      <div class="pj-hero-info">
        <div id="pjSlotNomeOP"></div>
        <div class="pj-chips" id="pjChipsOP"></div>
      </div>
    </div>
    <div class="pj-grid">
      <div class="pj-card" id="pjCardOrigemOP"></div>
      <div class="pj-card" id="pjCardTrilhaOP"></div>
      <div class="pj-card" id="pjCardIdadeOP"><span class="iv-rot">Idade</span></div>
      <div class="pj-card" id="pjCardAlturaOP"><span class="iv-rot">Altura</span></div>
    </div>
    <div id="pjSlotTreinoOP"></div>
    <div id="pjSlotOcultosOP" hidden></div>
    ${_pjSecaoOP("idi", "Idiomas", `<div id="pjSlotIdiomasOP"></div>`)}
    ${_pjSecaoOP("vin", "Vínculos", `<div id="pjSlotVinOP"></div><button type="button" class="iv-addc" onclick="abrirFolhaOP('aliado')">${_ivI("plus")}Novo vínculo</button>`, `<em id="pjCntVinOP"></em>`)}
    ${_pjSecaoOP("lore", "Lore", `<div id="pjSlotLoreOP"></div>`)}`;
  topo.insertAdjacentElement("afterend", root);

  const s = (id) => root.querySelector("#" + id);
  const hero = s("pjHeroOP");
  hero.insertBefore(q("carrosselWrapper"), hero.firstChild);
  s("pjSlotNomeOP").appendChild(q("nome"));

  const chips = s("pjChipsOP");
  const campoClasse = q("classeOP").closest(".op-campo");
  campoClasse.classList.add("pj-chip-classe");
  [campoClasse, q("campoNivelOP"), document.querySelector(".op-campo-nex")].forEach((c) => { if (c) chips.appendChild(c); });

  const cardPorSelect = (id, cardId) => { const sel = q(id); const c = sel && sel.closest(".op-campo"); if (c) s(cardId).appendChild(c); };
  cardPorSelect("origemOP", "pjCardOrigemOP");
  cardPorSelect("trilhaOP", "pjCardTrilhaOP");
  s("pjCardIdadeOP").appendChild(q("idade"));
  s("pjCardAlturaOP").appendChild(q("altura"));
  const treino = q("linhaTreinoEspecialOP");
  if (treino) s("pjSlotTreinoOP").appendChild(treino);

  /* campos antigos sem tela: continuam existindo só para a ficha carregar e salvar como antes */
  s("pjSlotOcultosOP").append(q("antecedentes"), q("classe"), q("nivel"), q("racaSelect").closest(".select-wrapper") || q("racaSelect"));
  s("pjSlotIdiomasOP").appendChild(q("idiomas"));
  s("pjSlotLoreOP").appendChild(q("lorePersonagem"));
  const filtros = document.querySelector("#personagem .aliados-filtros");
  if (filtros) s("pjSlotVinOP").appendChild(filtros);
  s("pjSlotVinOP").appendChild(q("listaAliados"));

  _ivMontarFolhaSimplesOP("aliado", "Novo vínculo", q("boxAliadosForm"), "Adicionar vínculo", "adicionarAliado",
    () => ((typeof personagens !== "undefined" && personagens[personagemAtual]?.aliados) || []).length);

  aba.classList.add("pj-montado");
  [["classeOP", "Classe"], ["nex", "NEX"], ["nivelSelectOP", "Nível"], ["origemOP", "Origem"], ["trilhaOP", "Trilha"]].forEach(([id, t]) => _pjSeletorOP(q(id), t, "campo"));
  _pjSeletorOP(q("aliadoTipo"), "Relação", "form");

  const prev = q("preview");
  const atualizarFoto = () => { const src = prev.getAttribute("src") || ""; hero.classList.toggle("sem-foto", !src || src === window.location.href); };
  new MutationObserver(atualizarFoto).observe(prev, { attributes: true, attributeFilter: ["src"] });
  atualizarFoto();
  atualizarContagemVinculosOP();
  return true;
}

function atualizarContagemVinculosOP() {
  const e = document.getElementById("pjCntVinOP");
  if (!e) return;
  const n = ((typeof personagens !== "undefined" && personagemAtual !== null && personagens[personagemAtual]?.aliados) || []).length;
  e.textContent = n ? n : "";
}

(function () {
  if (typeof renderAliados !== "function") return;
  const original = renderAliados;
  renderAliados = function () {
    const r = original.apply(this, arguments);
    atualizarContagemVinculosOP();
    return r;
  };
})();

function _iniciarPersonagemOP() {
  if (!montarPersonagemOP()) { setTimeout(_iniciarPersonagemOP, 200); return; }
}
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", () => setTimeout(_iniciarPersonagemOP, 300));
else setTimeout(_iniciarPersonagemOP, 300);


/* =====================================================================
   Listas de escolha bonitas (no lugar da lista nativa do navegador)
   O <select> original continua existindo, escondido: todo o resto do app o usa normalmente.
   ===================================================================== */
const _pjSelsOP = [];

function _pjSeletorOP(sel, titulo, variante) {
  if (!sel || sel._pjOP) return;
  sel._pjOP = true;
  const wrap = document.createElement("div");
  wrap.className = "pj-sel pj-sel-" + variante;
  sel.insertAdjacentElement("beforebegin", wrap);
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "pj-sel-btn";
  btn.innerHTML = `<span class="pj-sel-txt"></span>${_ivI("chev")}`;
  wrap.append(btn, sel);
  sel.tabIndex = -1;
  sel.setAttribute("aria-hidden", "true");
  btn.addEventListener("click", (e) => { e.stopPropagation(); _pjAbrirListaOP(sel, titulo); });
  sel.addEventListener("change", () => _pjAtualizarSeletorOP(sel));
  sel._pjBtn = btn;
  _pjSelsOP.push(sel);
  _pjAtualizarSeletorOP(sel);
}

function _pjAtualizarSeletorOP(sel) {
  const txt = sel._pjBtn && sel._pjBtn.querySelector(".pj-sel-txt");
  if (!txt) return;
  const op = sel.options[sel.selectedIndex];
  const t = op ? op.textContent.trim() : "";
  const vazio = !op || op.value === "";
  if (txt.textContent !== t) txt.textContent = t;
  sel._pjBtn.classList.toggle("vazio", vazio);
}
/* alterações feitas por código (carregar ficha, trocar classe…) não geram evento: confere de vez em quando */
setInterval(() => { if (!document.hidden) _pjSelsOP.forEach(_pjAtualizarSeletorOP); }, 1200);

function _pjAbrirListaOP(sel, titulo) {
  let ov = document.getElementById("pjSelOP");
  if (!ov) {
    ov = document.createElement("div");
    ov.id = "pjSelOP";
    ov.className = "iv-ov";
    ov.hidden = true;
    ov.innerHTML = `
      <div class="iv-sheet" role="dialog">
        <div class="iv-grip"></div>
        <div class="iv-sheet-top"><b id="pjSelTitOP"></b><button type="button" class="iv-x" aria-label="Fechar" onclick="_pjFecharListaOP()">${_ivI("x")}</button></div>
        <div class="iv-sheet-body" id="pjSelCorpoOP"></div>
      </div>`;
    ov.addEventListener("click", (e) => { if (e.target === ov) _pjFecharListaOP(); });
    document.body.appendChild(ov);
  }
  ov.querySelector("#pjSelTitOP").textContent = titulo;
  const corpo = ov.querySelector("#pjSelCorpoOP");
  const opcoes = [...sel.querySelectorAll("option")];
  const curtas = opcoes.length > 8 && opcoes.every((o) => o.textContent.trim().length <= 4);
  const item = (o) => `<button type="button" class="pj-opt${o.value === sel.value ? " on" : ""}${o.value === "" ? " vazio" : ""}" ${o.disabled ? "disabled" : ""} data-i="${o.index}">${esc(o.textContent.trim() || "—")}${o.value === sel.value ? `<i>${_ivI("check")}</i>` : ""}</button>`;
  const blocos = [];
  [...sel.children].forEach((g) => {
    if (g.tagName === "OPTGROUP") blocos.push(`<div class="pj-opt-grupo">${esc(g.label)}</div><div class="pj-opts">${[...g.querySelectorAll("option")].map(item).join("")}</div>`);
    else if (g.tagName === "OPTION") {
      const ult = blocos[blocos.length - 1];
      if (ult && ult.solta) ult.itens.push(item(g));
      else blocos.push({ solta: true, itens: [item(g)] });
    }
  });
  const html = blocos.map((b) => (typeof b === "string" ? b : `<div class="pj-opts">${b.itens.join("")}</div>`)).join("");
  corpo.className = "iv-sheet-body pj-lista" + (curtas ? " pj-grade" : "");
  corpo.innerHTML = html;
  corpo.onclick = (e) => {
    const b = e.target.closest(".pj-opt");
    if (!b || b.disabled) return;
    sel.selectedIndex = parseInt(b.dataset.i);
    sel.dispatchEvent(new Event("input", { bubbles: true }));
    sel.dispatchEvent(new Event("change", { bubbles: true }));
    _pjAtualizarSeletorOP(sel);
    _pjFecharListaOP();
  };
  ov.hidden = false;
  document.documentElement.classList.add("iv-trava");
  const atual = corpo.querySelector(".pj-opt.on");
  if (atual) setTimeout(() => atual.scrollIntoView({ block: "center" }), 30);
}

function _pjFecharListaOP() {
  const ov = document.getElementById("pjSelOP");
  if (ov) ov.hidden = true;
  if (!document.querySelector(".iv-ov:not([hidden])")) document.documentElement.classList.remove("iv-trava");
}

/* =====================================================================
   Poderes e rituais: formulários de "novo" em folha que sobe de baixo
   ===================================================================== */
function montarPoderFolhaOP() {
  const box = document.getElementById("boxPoderForm");
  if (!box || !document.getElementById("poderNome") || !document.getElementById("poderCategoria") || typeof poderes === "undefined") return false;
  if (_ivFolhasOP.poder) return true;
  const dono = box.closest(".secao-toggle");
  _ivMontarFolhaSimplesOP("poder", "Novo poder", box, "Adicionar poder", "addPoder", () => poderes.length);
  if (dono) dono.style.display = "none";
  _pjSeletorOP(document.getElementById("poderCategoria"), "Categoria", "form");
  _pjSeletorOP(document.getElementById("poderAtivacao"), "Ativação", "form");
  return true;
}

novoPoderPWOP = function () { montarPoderFolhaOP(); abrirFolhaOP("poder"); };

function _iniciarPoderFolhaOP() {
  if (!montarPoderFolhaOP()) setTimeout(_iniciarPoderFolhaOP, 250);
}
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", () => setTimeout(_iniciarPoderFolhaOP, 300));
else setTimeout(_iniciarPoderFolhaOP, 300);

/* ritual personalizado */
function _ritFolhaOP() {
  if (_ivFolhasOP.rit) return _ivFolhasOP.rit;
  const corpo = _ivCriarFolhaOP("rit", "Ritual personalizado", "Adicionar ritual", "confirmarRitualOP()");
  const el = typeof ICONE_ELEMENTO_OP !== "undefined" ? Object.keys(ICONE_ELEMENTO_OP) : ["Sangue", "Morte", "Conhecimento", "Energia"];
  corpo.innerHTML = `
    <div class="rit-sheet">
      <div class="pj-campo2"><span class="iv-rot">Nome</span><input id="ritpNome" placeholder="Nome do ritual" /></div>
      <div class="iv-duplo">
        <div><span class="iv-rot">Círculo</span><select id="ritpCirculo">${[1, 2, 3, 4].map((c) => `<option value="${c}">${c}º círculo</option>`).join("")}</select></div>
        <div><span class="iv-rot">Elemento</span><select id="ritpElemento">${el.map((e) => `<option value="${e}">${e}</option>`).join("")}</select></div>
      </div>
      <div class="iv-duplo">
        <div><span class="iv-rot">Execução</span><input id="ritpExec" placeholder="padrão" value="padrão" /></div>
        <div><span class="iv-rot">Alcance</span><input id="ritpAlcance" placeholder="curto" /></div>
      </div>
      <div class="iv-duplo">
        <div><span class="iv-rot">Alvo / Área</span><input id="ritpAlvo" placeholder="1 ser" /></div>
        <div><span class="iv-rot">Duração</span><input id="ritpDuracao" placeholder="cena" /></div>
      </div>
      <div class="iv-duplo">
        <div><span class="iv-rot">Resistência</span><input id="ritpResist" placeholder="Vontade parcial" /></div>
        <div><span class="iv-rot">Custo em PE</span><input id="ritpCusto" type="number" min="0" placeholder="automático" /></div>
      </div>
      <div class="pj-campo2"><span class="iv-rot">Descrição</span><textarea id="ritpDesc" rows="5" placeholder="O que o ritual faz, Discente, Verdadeiro…"></textarea></div>
    </div>`;
  _pjSeletorOP(document.getElementById("ritpCirculo"), "Círculo", "form");
  _pjSeletorOP(document.getElementById("ritpElemento"), "Elemento", "form");
  _ivFolhasOP.rit._contar = () => poderes.length;
  return _ivFolhasOP.rit;
}

abrirRitualPersonalizadoOP = function () {
  _ritFolhaOP();
  ["ritpNome", "ritpAlcance", "ritpAlvo", "ritpDuracao", "ritpResist", "ritpCusto", "ritpDesc"].forEach((id) => { const e = document.getElementById(id); if (e) e.value = ""; });
  const ex = document.getElementById("ritpExec"); if (ex) ex.value = "padrão";
  abrirFolhaOP("rit");
};

function confirmarRitualOP() {
  const nome = document.getElementById("ritpNome");
  if (!nome || !nome.value.trim()) {
    if (nome) { nome.classList.add("iv-erro"); nome.focus(); setTimeout(() => nome.classList.remove("iv-erro"), 1400); }
    return;
  }
  const antes = poderes.length;
  salvarRitualPersonalizadoOP();
  if (poderes.length > antes) fecharFolhaOP("rit");
}


/* =====================================================================
   VEÍCULO: popup do veículo, transferir e retirar (visual novo)
   - usa as mesmas funções de antes (alterar vida/gasolina, editar, remover item…)
   - transferir/retirar: lista compacta em duas colunas, título centralizado
   ===================================================================== */
Object.assign(_IV_ICO, {
  heart: '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>',
  fuel: '<path d="M5 20V5.5A1.5 1.5 0 0 1 6.5 4h6A1.5 1.5 0 0 1 14 5.5V20M4 20h11M14 9h2a2 2 0 0 1 2 2v5a1.5 1.5 0 0 0 3 0V9l-3-3"/><path d="M7.5 8h4"/>',
  users: '<circle cx="9" cy="8" r="3"/><path d="M3 20a6 6 0 0 1 12 0M16 5.2a3 3 0 0 1 0 5.6M18 14.5A6 6 0 0 1 21 20"/>',
  bag: '<path d="M6 8h12l1 12H5zM9 8a3 3 0 0 1 6 0"/>',
  minus: '<path d="M5 12h14"/>',
  entra: '<path d="M4 12h11M11 8l4 4-4 4M20 5v14"/>',
  sai: '<path d="M20 12H9M13 8l-4 4 4 4M4 5v14"/>',
  check2: '<path d="m5 12 5 5 9-10"/>',
});

/* "Categoria 3 / Tamanho médio / Defesa 17…" no começo da descrição viram etiquetas; o resto vira texto corrido */
function _vpSpecOP(desc) {
  const linhas = String(desc || "").replace(/\r/g, "").split("\n");
  const chips = [];
  let i = 0;
  while (i < linhas.length) {
    const t = linhas[i].trim();
    if (!t || t.length > 28 || /[.:;,]$/.test(t)) break;
    chips.push(t);
    i++;
  }
  const resto = linhas.slice(i).join("\n").trim();
  const paragrafos = resto ? resto.split(/\n\s*\n/).map((p) => p.replace(/\s*\n\s*/g, " ").trim()).filter(Boolean) : [];
  const html = chips.map((t) => {
    const m = t.match(/^(.*\S)\s+(\S*\d\S*)$/);
    return m ? `<span class="vp-chip"><i>${esc(m[1])}</i><b>${esc(m[2])}</b></span>` : `<span class="vp-chip"><b>${esc(t)}</b></span>`;
  });
  return { chips: html, paragrafos };
}

function _vpMedidorOP(tipo, rotulo, icone, atual, max, index) {
  const Tipo = tipo === "vida" ? "Vida" : "Gasolina";
  const pct = max > 0 ? Math.max(0, Math.min(100, (atual / max) * 100)) : 0;
  return `
    <div class="vp-med vp-med-${tipo}">
      <div class="vp-med-t">${_ivI(icone)}<span>${rotulo}</span><strong id="veiculo${Tipo}Texto">${_ivN(atual)} / ${_ivN(max)}</strong></div>
      <div class="vp-med-c">
        <button type="button" class="vp-passo" aria-label="Diminuir ${rotulo}" onclick="vpPassoOP('${tipo}', ${index}, -1)">${_ivI("minus")}</button>
        <input id="vpR_${tipo}" class="vp-range" type="range" min="0" max="${Math.max(1, max)}" step="1" value="${atual}" ${max <= 0 ? "disabled" : ""}
          style="--p:${pct}%" oninput="vpSlideOP('${tipo}', ${index}, this, false)" onchange="vpSlideOP('${tipo}', ${index}, this, true)">
        <button type="button" class="vp-passo" aria-label="Aumentar ${rotulo}" onclick="vpPassoOP('${tipo}', ${index}, 1)">${_ivI("plus")}</button>
      </div>
    </div>`;
}

function vpSlideOP(tipo, index, el, salvar) {
  const max = Math.max(1, parseInt(el.max) || 1);
  el.style.setProperty("--p", Math.max(0, Math.min(100, (el.value / max) * 100)) + "%");
  if (tipo === "vida") alterarVidaVeiculo(index, el.value, salvar);
  else alterarGasolinaVeiculo(index, el.value, salvar);
}

function vpPassoOP(tipo, index, d) {
  const el = document.getElementById("vpR_" + tipo);
  if (!el || el.disabled) return;
  el.value = String(Math.max(0, Math.min(parseInt(el.max) || 0, (parseInt(el.value) || 0) + d)));
  vpSlideOP(tipo, index, el, true);
}

verVeiculo = function (index) {
  const v = veiculos[index];
  if (!v) return;
  if (!Array.isArray(v.itens)) v.itens = [];

  const vidaMax = numeroInventario(v.vidaMax);
  v.vidaAtual = Math.min(vidaMax, numeroInventario(v.vidaAtual ?? vidaMax));
  const gasMax = numeroInventario(v.gasolinaMax);
  v.gasolinaAtual = Math.min(gasMax, numeroInventario(v.gasolinaAtual ?? gasMax));

  const carga = calcularEspacosVeiculo(v);
  const cargaMax = numeroInventario(v.espacosMax);
  const cargaPct = cargaMax > 0 ? Math.min(100, (carga / cargaMax) * 100) : 0;
  const spec = _vpSpecOP(v.desc);
  const cats = String(v.categoriasPermitidas || "").split(/[,;\s]+/).map((c) => c.trim()).filter(Boolean);

  const itens = v.itens.length
    ? v.itens.map((item, k) => {
        const total = calcularEspacosItem(item);
        return `
        <div class="vp-item" onclick="verItemVeiculo(${index}, ${k})" role="button" tabindex="0">
          <div class="vp-item-info">
            <b>${esc(item.nome || "Item")}</b>
            <div class="vp-item-meta">
              <span>×${item.qtd || 1}</span>
              <span>${_ivI("bag")}${_ivN(total)}</span>
              ${item.categoria ? `<span class="cat">Cat. ${esc(item.categoria)}</span>` : ""}
            </div>
          </div>
          <div class="vp-item-acoes">
            <button type="button" aria-label="Editar item" onclick="event.stopPropagation(); editarItemVeiculo(${index}, ${k})">${_ivI("edit")}</button>
            <button type="button" class="perigo" aria-label="Tirar item" onclick="event.stopPropagation(); removerItemVeiculo(${index}, ${k})">${_ivI("x")}</button>
          </div>
        </div>`;
      }).join("")
    : `<p class="vp-vazio">Nenhum item guardado.</p>`;

  const extras = typeof extrasPopupHTML === "function" ? extrasPopupHTML(v, "veiculo") : "";
  const textoLongo = spec.paragrafos.join(" ").length > 240;

  const html = `
    <div class="vp">
      ${spec.chips.length ? `<div class="vp-chips">${spec.chips.join("")}</div>` : ""}
      ${spec.paragrafos.length ? `<details class="vp-det"${textoLongo ? "" : " open"}><summary>Descrição</summary><div class="vp-texto">${spec.paragrafos.map((p) => `<p>${esc(p)}</p>`).join("")}</div></details>` : ""}
      ${extras}
      <div class="vp-medidores">
        ${_vpMedidorOP("vida", "Vida", "heart", v.vidaAtual, vidaMax, index)}
        ${_vpMedidorOP("gas", "Gasolina", "fuel", v.gasolinaAtual, gasMax, index)}
      </div>
      <div class="vp-grade">
        <div class="vp-dado">${_ivI("users")}<span>Lugares</span><b>${v.passageirosMax || 0}</b></div>
        <div class="vp-dado">${_ivI("bag")}<span>Carga</span><b>${_ivN(carga)} <small>/ ${_ivN(cargaMax)}</small></b><div class="vp-mini"><i class="${cargaMax > 0 && carga > cargaMax ? "exc" : ""}" style="width:${cargaPct}%"></i></div></div>
      </div>
      <div class="vp-cats"><span>Categorias permitidas</span>${cats.length ? cats.map((c) => `<em>${esc(c)}</em>`).join("") : `<em class="vazio">Não definidas</em>`}</div>
      <div class="vp-sec"><i></i><b>Itens no veículo</b><em>${v.itens.length}</em><i></i></div>
      <div class="vp-acoes">
        <button type="button" onclick="abrirGuardarNoVeiculo(${index})">${_ivI("entra")}Transferir</button>
        ${v.itens.length ? `<button type="button" onclick="abrirRetirarVariosVeiculo(${index})">${_ivI("sai")}Retirar</button>` : ""}
        <button type="button" onclick="abrirAdicionarItemVeiculo(${index})">${_ivI("plus")}Novo item</button>
      </div>
      <div class="vp-itens">${itens}</div>
    </div>`;

  abrirPopup(`${v.icone || ""} ${v.nome || "Veículo"}`.trim(), html, true, () => editarVeiculo(index));
  document.getElementById("popup")?.classList.add("vp-aberto");
};

/* o quadro do veículo só vale enquanto ele está aberto */
(function () {
  if (typeof abrirPopup !== "function") return;
  const original = abrirPopup;
  abrirPopup = function () {
    document.getElementById("popup")?.classList.remove("vp-aberto");
    return original.apply(this, arguments);
  };
})();

/* ---------- seleção múltipla (transferir / retirar / guardar) ---------- */
abrirMultiSelecao = function ({ titulo, grupos, confirmar, aoConfirmar }) {
  _multiCtx = { aoConfirmar, confirmar };

  const tile = (it) => {
    const q = Math.max(1, parseInt(it.qtd) || 1);
    const info = String(it.info || "").replace(/🎒/g, "").trim();
    const sub = [q > 1 ? `×${q}` : "", info ? `${_ivI("bag")}${esc(info)}` : ""].filter(Boolean).join('<i class="ms-pt"></i>');
    return `
      <div class="ms-tile">
        <label class="ms-lab">
          <input type="checkbox" class="multi-chk" data-chave="${esc(it.chave)}" onchange="multiAtualizar()" />
          <span class="ms-txt"><span class="ms-nome">${esc(it.nome || "Sem nome")}</span>${sub ? `<small class="ms-info">${sub}</small>` : ""}</span>
        </label>
        ${q > 1 ? `<span class="multi-qtd"><span>Quantos?</span><input type="number" class="multi-qtd-input" data-chave="${esc(it.chave)}" min="1" max="${q}" value="${q}" inputmode="numeric" /><small>de ${q}</small></span>` : ""}
      </div>`;
  };

  const comItens = grupos.filter((g) => g.itens.length);
  const corpo = comItens.length
    ? comItens.map((g) => `
        <section class="ms-grupo">
          <h4 class="ms-gt"><i></i><span>${esc(g.titulo)}</span><small>${g.itens.length}</small><i></i></h4>
          <div class="ms-grade">${g.itens.map(tile).join("")}</div>
        </section>`).join("")
    : `<p class="ms-vazio">Nada para escolher aqui.</p>`;

  const html = `
    <div class="multi-sel ms2">
      <div class="ms-topo">
        <button type="button" class="multi-todos" onclick="multiSelecionarTodos()">Selecionar todos</button>
        <span class="ms-cont" id="msContOP">nenhum selecionado</span>
      </div>
      ${corpo}
      <div class="ms-rodape"><button type="button" class="multi-confirmar" id="multiConfirmar" onclick="multiConfirmar()" disabled>${esc(confirmar)}</button></div>
    </div>`;

  abrirSubPopupVeiculo(titulo, html);
};

multiAtualizar = function () {
  const n = document.querySelectorAll(".multi-sel .multi-chk:checked").length;
  const btn = document.getElementById("multiConfirmar");
  if (btn && _multiCtx) {
    btn.disabled = n === 0;
    btn.textContent = n ? `${_multiCtx.confirmar} (${n})` : _multiCtx.confirmar;
  }
  const c = document.getElementById("msContOP");
  if (c) c.textContent = n === 0 ? "nenhum selecionado" : n === 1 ? "1 selecionado" : `${n} selecionados`;
};

/* =====================================================================
   DIÁRIO: botão pequeno no título do Inventário; abre de baixo para cima
   As sessões continuam separadas (Geral + uma página por sessão) e tudo é salvo sozinho.
   ===================================================================== */
Object.assign(_IV_ICO, { diario: '<path d="M12 6.5C10 5 7 4.5 4 4.5v13c3 0 6 .5 8 2 2-1.5 5-2 8-2v-13c-3 0-6 .5-8 2zM12 6.5v13"/>' });

function _ivSalvoOP() {
  const el = document.getElementById("ivSalvoOP");
  if (!el) return;
  el.textContent = "Salvo";
  el.classList.add("ok");
  clearTimeout(_ivSalvoOP._t);
  _ivSalvoOP._t = setTimeout(() => { el.textContent = "Salvo automaticamente"; el.classList.remove("ok"); }, 1600);
}

function _ivMontarDiarioOP() {
  const q = (id) => document.getElementById(id);
  const aba = q("inventario");
  const box = q("diario-box");
  if (!aba || !box || q("ivOv_diario")) return;

  const corpo = _ivCriarFolhaOP("diario", "Diário", "", "fecharFolhaOP('diario')");
  const ov = _ivFolhasOP.diario;
  ov.classList.add("iv-ov-diario");
  ov.querySelector(".iv-sheet-foot")?.remove();
  ov.querySelector(".iv-sheet-top b")?.insertAdjacentHTML("afterend", `<small class="iv-salvo" id="ivSalvoOP">Salvo automaticamente</small>`);

  box.style.removeProperty("display"); // quem manda é o CSS da folha (o estado antigo "fechada" não esconde mais)
  corpo.appendChild(box);
  aba.querySelector(".btn-diario")?.style.setProperty("display", "none", "important");

  const h2 = aba.querySelector("h2.titulo-secao");
  if (h2 && !h2.querySelector(".iv-diario-btn")) {
    h2.insertAdjacentHTML("beforeend", `<button type="button" class="iv-diario-btn" aria-label="Abrir o diário" onclick="abrirDiarioOP()">${_ivI("diario")}</button>`);
  }

  ["digitarDiarioOP", "mudarTituloDiarioOP", "novaSessaoDiarioOP", "excluirSessaoDiarioOP", "abrirAbaDiarioOP"].forEach((nome) => {
    const f = window[nome];
    if (typeof f !== "function" || f._salvo) return;
    const g = function () { const r = f.apply(this, arguments); _ivSalvoOP(); return r; };
    g._salvo = true;
    window[nome] = g;
  });
}

function abrirDiarioOP() {
  _ivMontarDiarioOP();
  document.getElementById("diario-box")?.style.removeProperty("display");
  if (typeof renderDiarioOP === "function") renderDiarioOP();
  /* se o diario-op.js estiver faltando ou antigo, mostra ao menos o texto geral para escrever */
  const raiz = document.getElementById("diarioOP");
  const geral = document.getElementById("diario");
  if (geral) {
    const semSessoes = !raiz || !raiz.children.length;
    geral.style.display = semSessoes ? "block" : "none";
    geral.classList.toggle("diario-editor", semSessoes);
  }
  abrirFolhaOP("diario");
  /* com o teclado aberto no celular a folha sobe junto, sem ficar escondida atrás dele */
  const ov = _ivFolhasOP.diario;
  const vv = window.visualViewport;
  if (ov && vv && !ov._vv) {
    ov._vv = () => {
      ov.style.paddingBottom = Math.max(0, window.innerHeight - vv.height - vv.offsetTop) + "px";
      const s = ov.querySelector(".iv-sheet");
      if (s) s.style.maxHeight = Math.round(vv.height * 0.96) + "px";
    };
    vv.addEventListener("resize", ov._vv);
  }
}
