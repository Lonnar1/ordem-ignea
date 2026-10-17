/* =====================================================================
   CATALOGO-OP.JS  ·  Catálogo de trilhas e poderes + automação
   Dados transcritos (de forma resumida) a partir de:
     • Ordem Paranormal RPG – Livro de Regras v1.3 (Combatente, p. 24-27)
     • Sobrevivendo ao Horror v1.3 (Combatente, p. 14-21)
   As descrições são RESUMOS em português: o texto completo e as regras
   exatas continuam no livro. Tudo pode ser editado em "Editar regras".

   Efeitos suportados (seguros, sem JavaScript livre):
     { tipo: "recurso", alvo: "pv" | "pe" | "san", valor: N }        → soma N ao máximo
     { tipo: "recurso", alvo: "pv", porNivel: N }                    → soma N × (NEX ÷ 5)
     { tipo: "manual", texto: "..." }                                → só informativo
   ===================================================================== */

const CATALOGO_OP_PADRAO = {
  versao: 1,
  fontes: {
    livro: "Livro de Regras v1.3",
    sah: "Sobrevivendo ao Horror v1.3",
  },

  /* ---------------- TRILHAS ---------------- */
  trilhas: [
    {
      id: "comb.aniquilador", classe: "combatente", nome: "Aniquilador", fonte: "livro", pagina: "26",
      resumo: "Abate alvos com eficiência e velocidade, cuidando muito bem das próprias armas.",
      habilidades: [
        { id: "comb.aniquilador.10", nex: 10, nome: "A Favorita", ativacao: "passiva",
          resumo: "Escolha uma arma favorita (ex.: katana, fuzil de assalto). A categoria dela conta 1 a menos para você.", efeitos: [] },
        { id: "comb.aniquilador.40", nex: 40, nome: "Técnica Secreta", ativacao: "livre", custo: "2 PE (+2 por efeito extra)",
          resumo: "A categoria da favorita cai em II. Ao atacar com ela, gaste PE para somar efeitos ao ataque: Amplo (atinge um alvo adicional adjacente) ou Destruidor (+1 no multiplicador de crítico).", efeitos: [] },
        { id: "comb.aniquilador.65", nex: 65, nome: "Técnica Sublime", ativacao: "livre",
          resumo: "Adiciona à Técnica Secreta: Letal (+2 na margem de ameaça; escolhido 2 vezes, +5) e Perfurante (ignora até 5 de resistência a dano).", efeitos: [] },
        { id: "comb.aniquilador.99", nex: 99, nome: "Máquina de Matar", ativacao: "passiva",
          resumo: "A categoria da favorita cai em III, ela ganha +2 na margem de ameaça e +1 dado de dano do mesmo tipo.", efeitos: [] },
      ],
    },
    {
      id: "comb.comandante", classe: "combatente", nome: "Comandante de Campo", fonte: "livro", pagina: "26-27",
      resumo: "Coordena e auxilia os aliados em combate, tomando decisões rápidas.",
      habilidades: [
        { id: "comb.comandante.10", nex: 10, nome: "Inspirar Confiança", ativacao: "reacao", custo: "2 PE",
          resumo: "Um aliado em alcance curto rola novamente um teste que acabou de fazer.", efeitos: [] },
        { id: "comb.comandante.40", nex: 40, nome: "Estrategista", ativacao: "padrao", custo: "1 PE por aliado",
          resumo: "Direciona aliados em alcance curto (até seu Intelecto): no próximo turno deles, cada um ganha uma ação de movimento adicional.", efeitos: [] },
        { id: "comb.comandante.65", nex: 65, nome: "Brecha na Guarda", ativacao: "reacao", custo: "2 PE", limite: "1 vez por rodada",
          resumo: "Quando um aliado fere um inimigo no seu alcance curto, você ou outro aliado faz um ataque adicional contra ele. Inspirar Confiança e Estrategista passam a alcance médio.", efeitos: [] },
        { id: "comb.comandante.99", nex: 99, nome: "Oficial Comandante", ativacao: "padrao", custo: "5 PE",
          resumo: "Cada aliado que você vê em alcance médio recebe uma ação padrão adicional no próximo turno dele.", efeitos: [] },
      ],
    },
    {
      id: "comb.guerreiro", classe: "combatente", nome: "Guerreiro", fonte: "livro", pagina: "27",
      resumo: "Transforma o próprio corpo em arma, com golpes corpo a corpo devastadores.",
      habilidades: [
        { id: "comb.guerreiro.10", nex: 10, nome: "Técnica Letal", ativacao: "passiva",
          resumo: "+2 na margem de ameaça em todos os ataques corpo a corpo.", efeitos: [] },
        { id: "comb.guerreiro.40", nex: 40, nome: "Revidar", ativacao: "reacao", custo: "2 PE",
          resumo: "Ao bloquear um ataque, faz um ataque corpo a corpo contra o inimigo que o atacou.", efeitos: [] },
        { id: "comb.guerreiro.65", nex: 65, nome: "Força Opressora", ativacao: "livre", custo: "1 PE",
          resumo: "Ao acertar corpo a corpo, faz derrubar ou empurrar como ação livre (empurrar: +5 por 10 de dano causado; derrubar com sucesso permite 1 ataque adicional por 1 PE).", efeitos: [] },
        { id: "comb.guerreiro.99", nex: 99, nome: "Potência Máxima", ativacao: "passiva",
          resumo: "No Ataque Especial com armas corpo a corpo, todos os bônus numéricos são dobrados.", efeitos: [] },
      ],
    },
    {
      id: "comb.opespeciais", classe: "combatente", nome: "Operações Especiais", fonte: "livro", pagina: "27",
      resumo: "Combatente eficaz, que calcula as ações e antevê os movimentos do inimigo.",
      habilidades: [
        { id: "comb.opespeciais.10", nex: 10, nome: "Iniciativa Aprimorada", ativacao: "passiva",
          resumo: "+5 em Iniciativa e uma ação de movimento adicional na primeira rodada.", efeitos: [] },
        { id: "comb.opespeciais.40", nex: 40, nome: "Ataque Extra", ativacao: "livre", custo: "2 PE", limite: "1 vez por rodada",
          resumo: "Ao fazer um ataque, pode fazer um ataque adicional.", efeitos: [] },
        { id: "comb.opespeciais.65", nex: 65, nome: "Surto de Adrenalina", ativacao: "livre", custo: "5 PE", limite: "1 vez por rodada",
          resumo: "Realiza uma ação padrão ou de movimento adicional.", efeitos: [] },
        { id: "comb.opespeciais.99", nex: 99, nome: "Sempre Alerta", ativacao: "passiva",
          resumo: "Recebe uma ação padrão adicional no início de cada cena de combate.", efeitos: [] },
      ],
    },
    {
      id: "comb.tropachoque", classe: "combatente", nome: "Tropa de Choque", fonte: "livro", pagina: "27",
      resumo: "Duro na queda: treinou o corpo para resistir a traumas e proteger os aliados.",
      habilidades: [
        { id: "comb.tropachoque.10", nex: 10, nome: "Casca Grossa", ativacao: "passiva",
          resumo: "+1 PV para cada 5% de NEX. Ao bloquear, soma o Vigor na resistência a dano recebida.",
          efeitos: [{ tipo: "recurso", alvo: "pv", porNivel: 1 }] },
        { id: "comb.tropachoque.40", nex: 40, nome: "Cai Dentro", ativacao: "reacao", custo: "1 PE",
          resumo: "Quando um oponente em alcance curto ataca um aliado, ele faz teste de Vontade (DT Vig); se falhar, ataca você. Quem passa fica imune até o fim da cena.", efeitos: [] },
        { id: "comb.tropachoque.65", nex: 65, nome: "Duro de Matar", ativacao: "reacao", custo: "2 PE",
          resumo: "Ao sofrer dano não paranormal, reduz o dano à metade. A partir do NEX 85% também vale para dano paranormal.", efeitos: [] },
        { id: "comb.tropachoque.99", nex: 99, nome: "Inquebrável", ativacao: "passiva",
          resumo: "Enquanto machucado: +5 na Defesa e resistência a dano 5. Enquanto morrendo, não fica indefeso e ainda pode agir (as regras de morte seguem normais).", efeitos: [] },
      ],
    },

    /* ----- Sobrevivendo ao Horror ----- */
    {
      id: "comb.agentesecreto", classe: "combatente", nome: "Agente Secreto", fonte: "sah", pagina: "15-16",
      resumo: "Agente treinado para operar discretamente a serviço da Ordo Realitas.",
      habilidades: [
        { id: "comb.agentesecreto.10", nex: 10, nome: "Carteirada", ativacao: "passiva",
          resumo: "Treino em Diplomacia ou Enganação (ou +2 nela, se já treinado). No início de cada missão recebe documentos que dão privilégios jurídicos, a critério do mestre.", efeitos: [] },
        { id: "comb.agentesecreto.40", nex: 40, nome: "O Sorriso", ativacao: "livre", custo: "2 PE",
          resumo: "+2 em Diplomacia e Enganação. Ao falhar em um desses testes, repete a rolagem (uma vez por teste) e aceita o novo resultado. 1 vez por cena, Diplomacia para acalmar a si mesmo.", efeitos: [] },
        { id: "comb.agentesecreto.65", nex: 65, nome: "Método Investigativo", ativacao: "livre", custo: "2 PE (+2 a cada uso extra na cena)",
          resumo: "A urgência de qualquer cena de investigação aumenta em 1 rodada. Pode transformar uma rolagem do mestre na tabela de eventos de investigação em \"sem evento\".", efeitos: [] },
        { id: "comb.agentesecreto.99", nex: 99, nome: "Multifacetado", ativacao: "especial", custo: "5 SAN", limite: "1 vez por cena",
          resumo: "Recebe todas as habilidades até NEX 65% de uma trilha de combatente ou especialista à escolha, até o fim da cena (cumprindo os pré-requisitos). Não pode repetir a trilha na mesma missão.", efeitos: [] },
      ],
    },
    {
      id: "comb.cacador", classe: "combatente", nome: "Caçador", fonte: "sah", pagina: "16-17",
      resumo: "Decidiu deixar de ser presa e estuda como caçar as criaturas do Outro Lado.",
      habilidades: [
        { id: "comb.cacador.10", nex: 10, nome: "Rastrear o Paranormal", ativacao: "passiva",
          resumo: "Treino em Sobrevivência (ou +2, se já treinado). Pode usá-la no lugar de Ocultismo para identificar criaturas e no lugar de Investigação e Percepção para achar rastros e pistas paranormais.", efeitos: [] },
        { id: "comb.cacador.40", nex: 40, nome: "Estudar Fraquezas", ativacao: "especial", custo: "ação de interlúdio",
          resumo: "Com uma pista ligada a um ser, estuda-o num interlúdio: recebe uma informação útil e +1 em testes de perícia contra ele até o fim da missão (por pista).", efeitos: [] },
        { id: "comb.cacador.65", nex: 65, nome: "Atacar das Sombras", ativacao: "passiva",
          resumo: "Sem penalidade em Furtividade ao se mover no deslocamento normal; penalidade por atacar com arma silenciosa reduzida; visibilidade inicial em furtividade 1 ponto menor.", efeitos: [] },
        { id: "comb.cacador.99", nex: 99, nome: "Estudar a Presa", ativacao: "passiva",
          resumo: "Ao usar Estudar Fraquezas, pode marcar o tipo do ser como \"presa\": contra ele, +1 dado em perícias, +1 na margem de ameaça e no multiplicador de crítico e resistência a dano 5. Uma presa por vez.", efeitos: [] },
      ],
    },
    {
      id: "comb.monstruoso", classe: "combatente", nome: "Monstruoso", fonte: "sah", pagina: "17-21",
      resumo: "Altera o próprio corpo para que a Entidade o invada com mais intensidade. Usa a Progressão de NEX da regra opcional (p. 98 do SaH). Os efeitos dependem do elemento escolhido (Sangue, Morte, Conhecimento ou Energia): consulte o livro.",
      habilidades: [
        { id: "comb.monstruoso.10", nex: 10, nome: "Ser Amaldiçoado", ativacao: "especial",
          resumo: "Treino em Ocultismo (ou +2). Escolha um elemento (Sangue, Morte, Conhecimento ou Energia) e execute uma etapa ritualística 1 vez por dia para receber os efeitos desse elemento; sem ela, sofre fome e sede. Veja os efeitos no livro.",
          efeitos: [{ tipo: "manual", texto: "Efeitos por elemento: SaH p. 17-19" }] },
        { id: "comb.monstruoso.40", nex: 40, nome: "Ser Macabro", ativacao: "especial",
          resumo: "A resistência a dano da etapa ritualística sobe para 10 e a penalidade em perícias para -2 dados, com efeitos adicionais por elemento. Veja o livro.",
          efeitos: [{ tipo: "manual", texto: "Efeitos por elemento: SaH p. 18-19" }] },
        { id: "comb.monstruoso.65", nex: 65, nome: "Ser Assustador", ativacao: "especial",
          resumo: "A resistência sobe para 15, mas Presença cai 1 permanentemente, com efeitos adicionais por elemento. Veja o livro.",
          efeitos: [{ tipo: "manual", texto: "Presença -1. Efeitos por elemento: SaH p. 19-20" }] },
        { id: "comb.monstruoso.99", nex: 99, nome: "Ser Aterrorizante", ativacao: "especial",
          resumo: "Os efeitos da etapa ritualística tornam-se permanentes, a resistência sobe para 20 e você passa a contar como criatura paranormal, com efeitos finais por elemento. Veja o livro.",
          efeitos: [{ tipo: "manual", texto: "Efeitos por elemento: SaH p. 20-21" }] },
      ],
    },
  ],

  /* ---------------- PODERES ---------------- */
  poderes: [
    /* ----- Livro de Regras: poderes de combatente (p. 25-26) ----- */
    { id: "comb.armamentopesado", classe: "combatente", tipo: "classe", nome: "Armamento Pesado", fonte: "livro", pagina: "25", ativacao: "passiva",
      requisitos: { atributos: { forca: 2 } }, resumo: "Proficiência com armas pesadas.", efeitos: [] },
    { id: "comb.artistamarcial", classe: "combatente", tipo: "classe", geral: true, nome: "Artista Marcial", fonte: "livro", pagina: "25", ativacao: "passiva",
      resumo: "Ataques desarmados causam 1d6, podem ser letais e viram ágeis. O dano sobe para 1d8 no NEX 35% e 1d10 no NEX 70%.", efeitos: [] },
    { id: "comb.ataqueoportunidade", classe: "combatente", tipo: "classe", nome: "Ataque de Oportunidade", fonte: "livro", pagina: "25", ativacao: "reacao", custo: "1 PE",
      resumo: "Quando um ser sai voluntariamente de um espaço adjacente a você, faz um ataque corpo a corpo contra ele.", efeitos: [] },
    { id: "comb.duasarmas", classe: "combatente", tipo: "classe", geral: true, nome: "Combater com Duas Armas", fonte: "livro", pagina: "25", ativacao: "especial",
      requisitos: { atributos: { agilidade: 3 }, periciasAny: ["Luta", "Pontaria"] },
      resumo: "Empunhando duas armas (ao menos uma leve), ao agredir faz dois ataques, um com cada arma, com -1 dado nos ataques até o próximo turno.", efeitos: [] },
    { id: "comb.combatedefensivo", classe: "combatente", tipo: "classe", nome: "Combate Defensivo", fonte: "livro", pagina: "25", ativacao: "especial",
      requisitos: { atributos: { intelecto: 2 } },
      resumo: "Ao agredir, pode combater defensivamente: -1 dado nos ataques e +5 na Defesa até o próximo turno.", efeitos: [] },
    { id: "comb.golpedemolidor", classe: "combatente", tipo: "classe", nome: "Golpe Demolidor", fonte: "livro", pagina: "25", ativacao: "livre", custo: "1 PE",
      requisitos: { atributos: { forca: 2 }, periciasAll: ["Luta"] },
      resumo: "Ao quebrar ou atacar um objeto, causa dois dados de dano extra do mesmo tipo da arma.", efeitos: [] },
    { id: "comb.golpepesado", classe: "combatente", tipo: "classe", nome: "Golpe Pesado", fonte: "livro", pagina: "25", ativacao: "passiva",
      resumo: "Empunhando arma corpo a corpo, o dano dela aumenta em mais um dado do mesmo tipo.", efeitos: [] },
    { id: "comb.incansavel", classe: "combatente", tipo: "classe", nome: "Incansável", fonte: "livro", pagina: "25", ativacao: "livre", custo: "2 PE", limite: "1 vez por cena",
      resumo: "Faz uma ação de investigação adicional, usando Força ou Agilidade como atributo-base do teste.", efeitos: [] },
    { id: "comb.presteza", classe: "combatente", tipo: "classe", nome: "Presteza Atlética", fonte: "livro", pagina: "25", ativacao: "livre", custo: "1 PE",
      resumo: "Ao facilitar a investigação, pode usar Força ou Agilidade no lugar do atributo-base. Se passar, o próximo aliado que usar seu bônus recebe +1 dado.", efeitos: [] },
    { id: "comb.protecaopesada", classe: "combatente", tipo: "classe", nome: "Proteção Pesada", fonte: "livro", pagina: "25", ativacao: "passiva",
      requisitos: { nexMin: 30 }, resumo: "Proficiência com proteções pesadas.", efeitos: [] },
    { id: "comb.reflexosdefensivos", classe: "combatente", tipo: "classe", nome: "Reflexos Defensivos", fonte: "livro", pagina: "25", ativacao: "passiva",
      requisitos: { atributos: { agilidade: 2 } }, resumo: "+2 em Defesa e em testes de resistência.",
      efeitos: [{ tipo: "manual", texto: "+2 em Defesa e resistências (some à mão)" }] },
    { id: "comb.saquerapido", classe: "combatente", tipo: "classe", geral: true, nome: "Saque Rápido", fonte: "livro", pagina: "25", ativacao: "passiva",
      requisitos: { periciasAll: ["Iniciativa"] },
      resumo: "Sacar ou guardar itens vira ação livre. Com a regra opcional de munição, recarrega uma arma de disparo como ação livre uma vez por rodada.", efeitos: [] },
    { id: "comb.segurargatilho", classe: "combatente", tipo: "classe", nome: "Segurar o Gatilho", fonte: "livro", pagina: "25-26", ativacao: "livre", custo: "2 PE por ataque já feito no turno",
      requisitos: { nexMin: 60 }, resumo: "Ao acertar com arma de fogo, pode fazer outro ataque com a mesma arma no mesmo alvo, pagando 2 PE por cada ataque já realizado no turno.", efeitos: [] },
    { id: "comb.sentidotatico", classe: "combatente", tipo: "classe", nome: "Sentido Tático", fonte: "livro", pagina: "26", ativacao: "movimento", custo: "2 PE",
      requisitos: { atributos: { intelecto: 2 }, periciasAll: ["Percepção", "Tática"] },
      resumo: "Analisa o ambiente e recebe bônus em Defesa e testes de resistência igual ao seu Intelecto até o fim da cena.", efeitos: [] },
    { id: "comb.tanquedeguerra", classe: "combatente", tipo: "classe", nome: "Tanque de Guerra", fonte: "livro", pagina: "26", ativacao: "passiva",
      requisitos: { poderes: ["comb.protecaopesada"] }, resumo: "Com proteção pesada, a Defesa e a resistência a dano dela aumentam em +2.", efeitos: [] },
    { id: "comb.tirocerteiro", classe: "combatente", tipo: "classe", geral: true, nome: "Tiro Certeiro", fonte: "livro", pagina: "26", ativacao: "passiva",
      requisitos: { periciasAll: ["Pontaria"] },
      resumo: "Com arma de disparo, soma Agilidade ao dano e ignora a penalidade contra alvos em combate corpo a corpo.", efeitos: [] },
    { id: "comb.tirocobertura", classe: "combatente", tipo: "classe", nome: "Tiro de Cobertura", fonte: "livro", pagina: "26", ativacao: "padrao", custo: "1 PE",
      resumo: "Dispara para forçar um ser a se proteger: Pontaria contra Vontade. Se vencer, o alvo não sai do lugar e sofre -5 em ataques até o início do seu próximo turno (efeito de medo).", efeitos: [] },
    { id: "comb.transcender", classe: "combatente", tipo: "classe", nome: "Transcender", fonte: "livro", pagina: "26", ativacao: "passiva", repetivel: true,
      resumo: "Escolha um poder paranormal. Você o recebe, mas não ganha Sanidade neste aumento de NEX. Pode ser escolhido várias vezes.", efeitos: [] },
    { id: "comb.treinamentopericia", classe: "combatente", tipo: "classe", nome: "Treinamento em Perícia", fonte: "livro", pagina: "26", ativacao: "passiva", repetivel: true,
      resumo: "Escolha duas perícias para se tornar treinado. A partir do NEX 35% pode escolher perícias treinadas para virar veterano e, do NEX 70%, veteranas para virar expert. Pode ser escolhido várias vezes.", efeitos: [] },

    /* ----- Sobrevivendo ao Horror: novos poderes de combatente (p. 14-15) ----- */
    { id: "comb.sah.apegoangustiado", classe: "combatente", tipo: "classe", nome: "Apego Angustiado", fonte: "sah", pagina: "14", ativacao: "passiva",
      resumo: "Você não fica inconsciente por estar morrendo, mas perde 2 pontos de Sanidade sempre que termina uma rodada consciente nessa condição.", efeitos: [] },
    { id: "comb.sah.caminhoforca", classe: "combatente", tipo: "classe", nome: "Caminho para Forca", fonte: "sah", pagina: "14", ativacao: "livre", custo: "1 PE",
      resumo: "Em perseguição, a ação sacrifício dá +1 dado extra (total +2 dados) aos testes dos outros. Em furtividade, a ação chamar atenção reduz a visibilidade dos aliados próximos em -2.", efeitos: [] },
    { id: "comb.sah.cientecicatrizes", classe: "combatente", tipo: "classe", nome: "Ciente das Cicatrizes", fonte: "sah", pagina: "14", ativacao: "passiva",
      requisitos: { periciasAny: ["Luta", "Pontaria"] },
      resumo: "Em testes para achar pistas sobre armas ou ferimentos, pode usar Luta ou Pontaria no lugar da perícia original.", efeitos: [] },
    { id: "comb.sah.correriadesesperada", classe: "combatente", tipo: "classe", nome: "Correria Desesperada", fonte: "sah", pagina: "14", ativacao: "passiva",
      resumo: "+3 m de deslocamento e +1 dado em testes de perícia para fugir em uma perseguição.", efeitos: [] },
    { id: "comb.sah.engolirchoro", classe: "combatente", tipo: "classe", nome: "Engolir o Choro", fonte: "sah", pagina: "14", ativacao: "passiva",
      resumo: "Não sofre penalidades por condições em testes de perícia para fugir e em testes de Furtividade.", efeitos: [] },
    { id: "comb.sah.instintofuga", classe: "combatente", tipo: "classe", nome: "Instinto de Fuga", fonte: "sah", pagina: "14", ativacao: "passiva",
      requisitos: { periciasAll: ["Intuição"] },
      resumo: "Quando uma cena de perseguição (ou semelhante) começa, recebe +2 em todos os testes de perícia da cena.", efeitos: [] },
    { id: "comb.sah.mochileiro", classe: "combatente", tipo: "classe", nome: "Mochileiro", fonte: "sah", pagina: "14", ativacao: "passiva",
      requisitos: { atributos: { vigor: 2 } },
      resumo: "Seu limite de carga aumenta em 5 espaços e você pode se beneficiar de uma vestimenta adicional.",
      efeitos: [{ tipo: "manual", texto: "+5 espaços de carga e 1 vestimenta adicional (ajuste na capacidade do inventário)" }] },
    { id: "comb.sah.paranoiadefensiva", classe: "combatente", tipo: "classe", nome: "Paranoia Defensiva", fonte: "sah", pagina: "15", ativacao: "especial", custo: "3 PE + 1 rodada", limite: "1 vez por cena",
      resumo: "Você e cada aliado presente escolhem: +5 na Defesa contra o próximo ataque da cena ou +5 em um único teste de perícia até o fim da cena.", efeitos: [] },
    { id: "comb.sah.sacrificarjoelhos", classe: "combatente", tipo: "classe", nome: "Sacrificar os Joelhos", fonte: "sah", pagina: "15", ativacao: "livre", custo: "2 PE", limite: "1 vez por cena de perseguição",
      requisitos: { periciasAll: ["Atletismo"] },
      resumo: "Ao fazer a ação esforço extra em uma perseguição, passa automaticamente no teste de perícia.", efeitos: [] },
    { id: "comb.sah.semtempo", classe: "combatente", tipo: "classe", nome: "Sem Tempo, Irmão", fonte: "sah", pagina: "15", ativacao: "especial", limite: "1 vez por cena de investigação",
      resumo: "Ao facilitar a investigação, passa automaticamente no teste para auxiliar os aliados, mas faz uma rolagem adicional na tabela de eventos de investigação.", efeitos: [] },
    { id: "comb.sah.valentao", classe: "combatente", tipo: "classe", nome: "Valentão", fonte: "sah", pagina: "15", ativacao: "livre", custo: "1 PE", limite: "1 vez por cena",
      resumo: "Pode usar Força no lugar de Presença em Intimidação. Uma vez por cena, faz um teste de Intimidação para assustar como ação livre.", efeitos: [] },
  ],
};

/* =====================================================================
   ESPECIALISTA e OCULTISTA  (Livro de Regras p. 28-35 · SaH p. 22-30)
   ===================================================================== */
(function () {
  const T = (id, classe, nome, fonte, pagina, resumo, habilidades, extra = {}) =>
    CATALOGO_OP_PADRAO.trilhas.push({ id, classe, nome, fonte, pagina, resumo, habilidades, ...extra });
  const H = (trilha, nex, nome, ativacao, resumo, extra = {}) =>
    ({ id: `${trilha}.${nex}`, nex, nome, ativacao, resumo, efeitos: [], ...extra });
  const P = (id, classe, nome, fonte, pagina, ativacao, resumo, extra = {}) =>
    CATALOGO_OP_PADRAO.poderes.push({ id, classe, tipo: "classe", nome, fonte, pagina, ativacao, resumo, efeitos: [], ...extra });

  /* ---------------- ESPECIALISTA: trilhas (livro) ---------------- */
  T("esp.atirador", "especialista", "Atirador de Elite", "livro", "30", "Neutraliza ameaças de longe, tratando a arma como instrumento de precisão.", [
    H("esp.atirador", 10, "Mira de Elite", "passiva", "Proficiência com armas de fogo de balas longas e soma o Intelecto ao dano com elas."),
    H("esp.atirador", 40, "Disparo Letal", "livre", "Ao mirar, +2 na margem de ameaça do próximo ataque até o fim do seu próximo turno.", { custo: "1 PE" }),
    H("esp.atirador", 65, "Disparo Impactante", "livre", "Ao atacar com arma de fogo, em vez de causar dano faz uma manobra: derrubar, desarmar, empurrar ou quebrar.", { custo: "2 PE" }),
    H("esp.atirador", 99, "Atirar para Matar", "passiva", "Em acerto crítico com arma de fogo, causa dano máximo sem rolar os dados."),
  ]);
  T("esp.infiltrador", "especialista", "Infiltrador", "livro", "30", "Perito em infiltração, neutraliza alvos desprevenidos sem alarde.", [
    H("esp.infiltrador", 10, "Ataque Furtivo", "livre", "Uma vez por rodada, contra alvo desprevenido (corpo a corpo ou alcance curto) ou flanqueado: +1d6 de dano do mesmo tipo. O extra sobe para +2d6 (40%), +3d6 (65%) e +4d6 (99%).", { custo: "1 PE", limite: "1 vez por rodada" }),
    H("esp.infiltrador", 40, "Gatuno", "passiva", "+5 em Atletismo e Crime, e percorre o deslocamento normal ao se esconder sem penalidade."),
    H("esp.infiltrador", 65, "Assassinar", "movimento", "Analisa um alvo em alcance curto: até o fim do próximo turno, seu primeiro Ataque Furtivo contra ele dobra os dados extras. Se sofrer o dano, o alvo fica inconsciente ou morrendo (Fortitude DT Agi evita).", { custo: "3 PE" }),
    H("esp.infiltrador", 99, "Sombra Fugaz", "livre", "Ao fazer Furtividade depois de atacar ou agir de forma chamativa, não sofre a penalidade de -3 dados.", { custo: "3 PE" }),
  ]);
  T("esp.medico", "especialista", "Médico de Campo", "livro", "31", "Primeiros socorros e emergência no campo de batalha. Exige treino em Medicina e um kit de medicina para usar as habilidades.", [
    H("esp.medico", 10, "Paramédico", "padrao", "Cura 2d10 PV de si ou de um aliado adjacente. Cura +1d10 em NEX 40%, 65% e 99%, pagando +1 PE por dado adicional.", { custo: "2 PE" }),
    H("esp.medico", 40, "Equipe de Trauma", "padrao", "Remove uma condição negativa (exceto morrendo) de um aliado adjacente.", { custo: "2 PE" }),
    H("esp.medico", 65, "Resgate", "livre", "Uma vez por rodada, se aproxima de aliado machucado ou morrendo em alcance curto como ação livre. Ao curar ou remover condições, você e o aliado ganham +5 na Defesa até o início do seu próximo turno; carregar personagens ocupa metade dos espaços."),
    H("esp.medico", 99, "Reanimação", "completa", "Traz de volta à vida um personagem que morreu na mesma cena (exceto dano massivo).", { custo: "10 PE", limite: "1 vez por cena" }),
  ], { requisitos: { periciasAll: ["Medicina"] } });
  T("esp.negociador", "especialista", "Negociador", "livro", "31", "Diplomata hábil, influencia pessoas por lábia ou intimidação.", [
    H("esp.negociador", 10, "Eloquência", "completa", "Teste de Diplomacia, Enganação ou Intimidação contra a Vontade dos alvos em alcance curto: se vencer, ficam fascinados enquanto você se concentrar. Alvo hostil ou em combate recebe +5 e novo teste por rodada. Quem passa fica imune por um dia.", { custo: "1 PE por alvo" }),
    H("esp.negociador", 40, "Discurso Motivador", "padrao", "Você e aliados em alcance curto ganham +1 dado em testes de perícia até o fim da cena. A partir do NEX 65%, gastando 8 PE o bônus é +2 dados.", { custo: "4 PE" }),
    H("esp.negociador", 65, "Eu Conheço um Cara", "especial", "Uma vez por missão, aciona sua rede de contatos para um favor (trocar o equipamento do grupo, obter local de descanso, ser resgatado de uma cena). O mestre decide quando e quais favores.", { limite: "1 vez por missão" }),
    H("esp.negociador", 99, "Truque de Mestre", "especial", "Simula o efeito de uma habilidade que viu um aliado usar na cena. Ignora os pré-requisitos, mas paga todos os custos e usa os seus parâmetros.", { custo: "5 PE" }),
  ]);
  T("esp.tecnico", "especialista", "Técnico", "livro", "31", "Manutenção e reparo de equipamento, improvisa ferramentas e sabota itens inimigos.", [
    H("esp.tecnico", 10, "Inventário Otimizado", "passiva", "Soma o Intelecto à Força para calcular a capacidade de carga.", { efeitos: [{ tipo: "manual", texto: "Capacidade de carga = (Força + Intelecto) × 5; ajuste no inventário" }] }),
    H("esp.tecnico", 40, "Remendão", "completa", "Remove a condição quebrado de um equipamento adjacente até o fim da cena. Além disso, equipamentos gerais têm a categoria reduzida em I para você.", { custo: "1 PE" }),
    H("esp.tecnico", 65, "Improvisar", "completa", "Cria uma versão funcional de um equipamento geral com materiais ao redor, respeitando espaço e categoria. Fica inútil ao fim da cena.", { custo: "2 PE + 2 PE por categoria" }),
    H("esp.tecnico", 99, "Preparado para Tudo", "movimento", "Lembra que sempre tem o item de que precisa (exceto armas). Depois de encontrado, segue as regras de inventário.", { custo: "3 PE por categoria do item" }),
  ]);

  /* ---------------- ESPECIALISTA: trilhas (SaH) ---------------- */
  T("esp.sah.bibliotecario", "especialista", "Bibliotecário", "sah", "23", "Vasto conhecimento como solução para situações desesperadoras.", [
    H("esp.sah.bibliotecario", 10, "Conhecimento Prático", "livre", "Em testes de perícia (exceto Luta e Pontaria), pode mudar o atributo-base para Int. Se já tem o poder Conhecimento Aplicado, o custo cai em 1 PE.", { custo: "2 PE" }),
    H("esp.sah.bibliotecario", 40, "Leitor Contumaz", "passiva", "Cada dado de bônus da ação de interlúdio ler vira 1d8 e pode ser aplicado em qualquer perícia. Ao usar esse bônus, gasta 2 PE para somar +1 dado.", { custo: "2 PE (opcional)" }),
    H("esp.sah.bibliotecario", 65, "Rato de Biblioteca", "especial", "Em ambiente com muitos livros, gasta alguns minutos (ou uma rodada em investigação) para receber os benefícios de uma ação de interlúdio ler ou revisar caso.", { limite: "1 vez por cena" }),
    H("esp.sah.bibliotecario", 99, "A Força do Saber", "passiva", "Intelecto +1 e soma o valor de Intelecto ao total de PE. Escolha uma perícia para trocar o atributo-base para Intelecto.",
      { efeitos: [{ tipo: "recurso", alvo: "pe", porAtributo: "intelecto" }, { tipo: "manual", texto: "Intelecto +1 (aumente na ficha) e escolha uma perícia com atributo-base Int" }] }),
  ]);
  T("esp.sah.perseverante", "especialista", "Perseverante", "sah", "24", "O sobrevivente que parece nunca desistir.", [
    H("esp.sah.perseverante", 10, "Soluções Improvisadas", "livre", "Rola novamente 1 dado de um teste recém-realizado (uma vez por teste) e fica com o melhor resultado.", { custo: "2 PE" }),
    H("esp.sah.perseverante", 40, "Fuga Obstinada", "passiva", "+1 dado em testes de perícia para fugir de um inimigo. Em perseguição, como presa, acumula até 4 falhas antes de ser pego."),
    H("esp.sah.perseverante", 65, "Determinação Inquestionável", "padrao", "Remove uma condição de medo, mental ou de paralisia que o aflija (o mestre pode vetar certas condições).", { custo: "5 PE", limite: "1 vez por cena" }),
    H("esp.sah.perseverante", 99, "Só Mais um Passo...", "reacao", "Ao sofrer dano que reduziria seus PV a 0, fica com 1 PV. Não funciona contra dano massivo.", { custo: "5 PE", limite: "1 vez por rodada" }),
  ]);
  T("esp.sah.muambeiro", "especialista", "Muambeiro", "sah", "25", "Bom com equipamentos: produz ou encontra o item certo em qualquer ocasião.", [
    H("esp.sah.muambeiro", 10, "Mascate", "passiva", "Treino em uma Profissão à escolha (armeiro, engenheiro ou químico), +5 na capacidade de carga e DT de item improvisado reduzida em 10.", { efeitos: [{ tipo: "manual", texto: "+5 na capacidade de carga (ajuste no inventário)" }] }),
    H("esp.sah.muambeiro", 40, "Fabricação Própria", "passiva", "Leva metade do tempo para fabricar itens mundanos (itens modificados ou paranormais não são afetados)."),
    H("esp.sah.muambeiro", 65, "Laboratório de Campo", "passiva", "Treino em uma Profissão (armeiro, engenheiro ou químico) ou +5 nela, se já treinado. Pode fabricar e consertar itens paranormais em campo (3 ações de interlúdio)."),
    H("esp.sah.muambeiro", 99, "Achado Conveniente", "completa", "\"Produz\" um item de até categoria III (exceto paranormal), que funciona até o fim da cena.", { custo: "5 PE" }),
  ]);

  /* ---------------- ESPECIALISTA: poderes (livro) ---------------- */
  P("esp.artistamarcial", "especialista", "Artista Marcial", "livro", "29", "passiva", "Ataques desarmados causam 1d6, podem ser letais e contam como armas ágeis. O dano sobe para 1d8 (NEX 35%) e 1d10 (NEX 70%).", { geral: true });
  P("esp.balisticaavancada", "especialista", "Balística Avançada", "livro", "29", "passiva", "Proficiência com armas táticas de fogo e +2 nas rolagens de dano com armas de fogo.");
  P("esp.conhecimentoaplicado", "especialista", "Conhecimento Aplicado", "livro", "29", "livre", "Em testes de perícia (exceto Luta e Pontaria), muda o atributo-base para Int.", { custo: "2 PE", requisitos: { atributos: { intelecto: 2 } } });
  P("esp.hacker", "especialista", "Hacker", "livro", "29", "passiva", "+5 em Tecnologia para invadir sistemas e hackear qualquer sistema com uma ação completa.", { requisitos: { periciasAll: ["Tecnologia"] } });
  P("esp.maosrapidas", "especialista", "Mãos Rápidas", "livro", "29", "livre", "Faz um teste de Crime como ação livre.", { custo: "1 PE", requisitos: { atributos: { agilidade: 3 }, periciasAll: ["Crime"] } });
  P("esp.mochilautilidades", "especialista", "Mochila de Utilidades", "livro", "29", "passiva", "Um item à escolha (exceto armas) conta como uma categoria abaixo e ocupa 1 espaço a menos.");
  P("esp.movimentotatico", "especialista", "Movimento Tático", "livro", "29", "livre", "Ignora a penalidade de deslocamento por terreno difícil e por escalar até o fim do turno.", { custo: "1 PE", requisitos: { periciasAll: ["Atletismo"] } });
  P("esp.natrilhacerta", "especialista", "Na Trilha Certa", "livro", "29", "livre", "Ao passar em teste para procurar pistas, ganha +1 dado no próximo teste. Custos e bônus são cumulativos (2 PE = +2 dados, e assim por diante).", { custo: "1 PE (cumulativo)" });
  P("esp.nerd", "especialista", "Nerd", "livro", "29", "especial", "Teste de Atualidades (DT 20): se passar, recebe uma informação útil para a cena (dica de pista em investigação, fraqueza de inimigo em combate).", { custo: "2 PE", limite: "1 vez por cena" });
  P("esp.ninjaurbano", "especialista", "Ninja Urbano", "livro", "29-30", "passiva", "Proficiência com armas táticas corpo a corpo e de disparo (exceto fogo) e +2 nas rolagens de dano com elas.");
  P("esp.pensamentoagil", "especialista", "Pensamento Ágil", "livro", "30", "livre", "Em cena de investigação, faz uma ação de procurar pistas adicional.", { custo: "2 PE", limite: "1 vez por rodada" });
  P("esp.peritoexplosivos", "especialista", "Perito em Explosivos", "livro", "30", "passiva", "Soma o Intelecto na DT para resistir aos seus explosivos e exclui da explosão um número de alvos igual ao Intelecto.");
  P("esp.primeiraimpressao", "especialista", "Primeira Impressão", "livro", "30", "passiva", "+2 dados no primeiro teste de Diplomacia, Enganação, Intimidação ou Intuição em uma cena.");
  P("esp.transcender", "especialista", "Transcender", "livro", "30", "passiva", "Escolha um poder paranormal. Você o recebe, mas não ganha Sanidade neste aumento de NEX. Pode ser escolhido várias vezes.", { repetivel: true });
  P("esp.treinamentopericia", "especialista", "Treinamento em Perícia", "livro", "30", "passiva", "Escolha duas perícias para se tornar treinado. A partir do NEX 35% pode evoluir perícias treinadas para veterano e, do NEX 70%, para expert. Pode ser escolhido várias vezes.", { repetivel: true });

  /* ---------------- ESPECIALISTA: poderes (SaH) ---------------- */
  P("esp.sah.acolherterror", "especialista", "Acolher o Terror", "sah", "22", "passiva", "Pode se entregar ao medo (SaH p. 88) uma vez adicional por sessão de jogo.");
  P("esp.sah.contatos", "especialista", "Contatos Oportunos", "sah", "22", "especial", "Em uma ação de interlúdio, aciona contatos locais e recebe um aliado de tipo à escolha até o fim da missão (um por vez). O mestre decide a disponibilidade.", { requisitos: { periciasAll: ["Crime"] } });
  P("esp.sah.disfarcesutil", "especialista", "Disfarce Sutil", "sah", "22", "livre", "Disfarça-se com Enganação como ação completa e sem kit de disfarces (com kit, +5 no teste).", { custo: "1 PE", requisitos: { atributos: { presenca: 2 }, periciasAll: ["Enganação"] } });
  P("esp.sah.esconderijo", "especialista", "Esconderijo Desesperado", "sah", "22", "passiva", "Sem penalidade em Furtividade por se mover no deslocamento normal. Em cenas de furtividade, ao passar em esconder-se a visibilidade diminui em 2.");
  P("esp.sah.diletante", "especialista", "Especialista Diletante", "sah", "22", "passiva", "Aprende um poder de fora da sua classe (exceto trilha ou paranormais), cumprindo os pré-requisitos.", { requisitos: { nexMin: 30 } });
  P("esp.sah.flashback", "especialista", "Flashback", "sah", "22", "passiva", "Escolha uma origem que não seja a sua e receba o poder dessa origem.");
  P("esp.sah.leiturafria", "especialista", "Leitura Fria", "sah", "22", "especial", "Uma vez por interlúdio, após interagir com um NPC, faz três perguntas pessoais sobre ele. Para cada pergunta não respondida, recebe 2 PE temporários até o fim da missão. Uma vez por pessoa.", { requisitos: { periciasAll: ["Intuição"] } });
  P("esp.sah.maosfirmes", "especialista", "Mãos Firmes", "sah", "22", "livre", "+1 dado em Furtividade para esconder-se ou em ação discreta que manipule um objeto.", { custo: "2 PE", requisitos: { periciasAll: ["Furtividade"] } });
  P("esp.sah.planofuga", "especialista", "Plano de Fuga", "sah", "23", "passiva", "Usa Intelecto no lugar de Força para a ação criar obstáculos em perseguição. Uma vez por cena, gasta 2 PE para ser bem-sucedido nessa ação sem teste.", { custo: "2 PE (opcional)" });
  P("esp.sah.remoermemorias", "especialista", "Remoer Memórias", "sah", "23", "livre", "Troca um teste de perícia baseada em Intelecto ou Presença por um teste de Intelecto (DT 15).", { custo: "2 PE", limite: "1 vez por cena", requisitos: { atributos: { intelecto: 1 } } });
  P("esp.sah.resistirpressao", "especialista", "Resistir à Pressão", "sah", "23", "especial", "Coordena os companheiros: a urgência da investigação aumenta em 1 rodada, e nela todos (você incluso) recebem +2 em testes de perícia.", { custo: "5 PE", limite: "1 vez por cena de investigação", requisitos: { periciasAll: ["Investigação"] } });

  /* ---------------- OCULTISTA: trilhas (livro) ---------------- */
  T("ocu.conduite", "ocultista", "Conduíte", "livro", "34", "Domina a conjuração, aumentando alcance e velocidade dos rituais e interferindo nos de outros.", [
    H("ocu.conduite", 10, "Ampliar Ritual", "livre", "Ao lançar um ritual, aumenta o alcance em um passo (curto→médio→longo→extremo) ou dobra a área de efeito.", { custo: "+2 PE" }),
    H("ocu.conduite", 40, "Acelerar Ritual", "livre", "Uma vez por rodada, aumenta o custo de um ritual para lançá-lo como ação livre.", { custo: "+4 PE", limite: "1 vez por rodada" }),
    H("ocu.conduite", 65, "Anular Ritual", "reacao", "Ao ser alvo de um ritual, gasta PE igual ao custo dele e faz teste oposto de Ocultismo contra o conjurador. Se vencer, anula o ritual.", { custo: "PE = custo do ritual" }),
    H("ocu.conduite", 99, "Canalizar o Medo", "passiva", "Aprende o ritual Canalizar o Medo.", { efeitos: [{ tipo: "manual", texto: "Adicione o ritual Canalizar o Medo ao seu grimório" }] }),
  ]);
  T("ocu.flagelador", "ocultista", "Flagelador", "livro", "34-35", "Transforma dor em poder para seus rituais.", [
    H("ocu.flagelador", 10, "Poder do Flagelo", "livre", "Ao conjurar um ritual, pode pagar o custo em PE com seus PV, à taxa de 2 PV por PE. Os PV gastos só se recuperam com descanso."),
    H("ocu.flagelador", 40, "Abraçar a Dor", "reacao", "Ao sofrer dano não paranormal, reduz esse dano à metade.", { custo: "2 PE" }),
    H("ocu.flagelador", 65, "Absorver Agonia", "passiva", "Ao reduzir um ou mais inimigos a 0 PV com um ritual, recebe PE temporários iguais ao círculo do ritual."),
    H("ocu.flagelador", 99, "Medo Tangível", "passiva", "Aprende o ritual Medo Tangível.", { efeitos: [{ tipo: "manual", texto: "Adicione o ritual Medo Tangível ao seu grimório" }] }),
  ]);
  T("ocu.graduado", "ocultista", "Graduado", "livro", "35", "Conjurador versátil que conhece mais rituais e os torna mais difíceis de resistir.", [
    H("ocu.graduado", 10, "Saber Ampliado", "passiva", "Aprende um ritual de 1º círculo. A cada novo círculo, aprende um ritual adicional dele. Esses rituais não contam no limite.", { efeitos: [{ tipo: "manual", texto: "Adicione os rituais extras ao seu grimório" }] }),
    H("ocu.graduado", 40, "Grimório Ritualístico", "passiva", "Cria um grimório com rituais de 1º ou 2º círculo em quantidade igual ao Intelecto (e um novo a cada círculo ganho). Para conjurar, precisa empunhar e folhear o grimório (ação completa). Ocupa 1 espaço."),
    H("ocu.graduado", 65, "Rituais Eficientes", "passiva", "A DT para resistir a todos os seus rituais aumenta em +5."),
    H("ocu.graduado", 99, "Conhecendo o Medo", "passiva", "Aprende o ritual Conhecendo o Medo.", { efeitos: [{ tipo: "manual", texto: "Adicione o ritual Conhecendo o Medo ao seu grimório" }] }),
  ]);
  T("ocu.intuitivo", "ocultista", "Intuitivo", "livro", "35", "Mente preparada para resistir ao Outro Lado e ir além dos limites paranormais.", [
    H("ocu.intuitivo", 10, "Mente Sã", "passiva", "Resistência paranormal +5 (+5 em testes de resistência contra efeitos paranormais)."),
    H("ocu.intuitivo", 40, "Presença Poderosa", "passiva", "Adiciona a Presença ao limite de PE por turno, apenas para conjurar rituais (não para DT)."),
    H("ocu.intuitivo", 65, "Inabalável", "passiva", "Resistência a dano mental e paranormal 10. Em efeitos paranormais com teste de Vontade para reduzir o dano à metade, não sofre dano algum se passar."),
    H("ocu.intuitivo", 99, "Presença do Medo", "passiva", "Aprende o ritual Presença do Medo.", { efeitos: [{ tipo: "manual", texto: "Adicione o ritual Presença do Medo ao seu grimório" }] }),
  ]);
  T("ocu.lamina", "ocultista", "Lâmina Paranormal", "livro", "35", "Usa o paranormal como arma, mesclando conjuração e combate.", [
    H("ocu.lamina", 10, "Lâmina Maldita", "passiva", "Aprende o ritual Amaldiçoar Arma (ou, se já o conhece, gasta +1 PE ao lançá-lo para conjurar com ação de movimento). Pode usar Ocultismo no lugar de Luta ou Pontaria nos ataques com a arma amaldiçoada.", { efeitos: [{ tipo: "manual", texto: "Adicione o ritual Amaldiçoar Arma ao seu grimório" }] }),
    H("ocu.lamina", 40, "Gladiador Paranormal", "passiva", "Ao acertar um ataque corpo a corpo, recebe 2 PE temporários (máximo por cena igual ao seu limite de PE). Somem no fim da cena."),
    H("ocu.lamina", 65, "Conjuração Marcial", "livre", "Uma vez por rodada, ao lançar ritual de execução padrão, faz um ataque corpo a corpo como ação livre.", { custo: "2 PE", limite: "1 vez por rodada" }),
    H("ocu.lamina", 99, "Lâmina do Medo", "passiva", "Aprende o ritual Lâmina do Medo.", { efeitos: [{ tipo: "manual", texto: "Adicione o ritual Lâmina do Medo ao seu grimório" }] }),
  ]);

  /* ---------------- OCULTISTA: trilhas (SaH) ---------------- */
  T("ocu.sah.exorcista", "ocultista", "Exorcista", "sah", "27-29", "Enfrenta o paranormal com fé e palavras, qualquer que seja a crença.", [
    H("ocu.sah.exorcista", 10, "Revelação do Mal", "passiva", "Treino em Religião (ou +2 nela). Pode usar Religião no lugar de Investigação e Percepção para notar seres, rastros ou pistas paranormais, e no lugar de Ocultismo."),
    H("ocu.sah.exorcista", 40, "Poder da Fé", "livre", "Torna-se veterano em Religião (ou +1 dado, se já for). Ao falhar em teste de resistência, pode repeti-lo usando Religião, aceitando o segundo resultado.", { custo: "2 PE" }),
    H("ocu.sah.exorcista", 65, "Parareligiosidade", "livre", "Ao conjurar um ritual, adiciona o efeito de um catalisador ritualístico à escolha.", { custo: "+2 PE" }),
    H("ocu.sah.exorcista", 99, "Chagas da Resistência", "reacao", "Quando sua Sanidade seria reduzida a 0, gasta PV para ficar com SAN 1.", { custo: "10 PV" }),
  ]);
  T("ocu.sah.possuido", "ocultista", "Possuído", "sah", "29-30", "O paranormal cresce dentro de você; sem opção, só resta lutar.", [
    H("ocu.sah.possuido", 10, "Poder Não Desejado", "passiva", "Sempre que receberia um poder de ocultista, recebe Transcender. Ganha pontos de possessão (PP): 3 + 2 por poder Transcender. Limite por turno igual à Presença; cada PP gasto recupera 10 PV ou 2 PE. Recupera 1 PP por ação dormir.", { efeitos: [{ tipo: "manual", texto: "Controle os PP na ficha (SaH p. 29)" }] }),
    H("ocu.sah.possuido", 40, "As Sombras Dentro de Mim", "livre", "Recupera 2 PP por ação dormir. Pode deixar a Entidade controlar seus músculos: +1 dado em Acrobacia, Atletismo e Furtividade por uma rodada e menor aumento de visibilidade em furtividade.", { custo: "2 PE" }),
    H("ocu.sah.possuido", 65, "Ele Me Ensina", "passiva", "Escolha entre transcender ou receber o primeiro poder de uma trilha de ocultista que não seja a sua (cumprindo os pré-requisitos)."),
    H("ocu.sah.possuido", 99, "Tornamo-nos Um", "especial", "Recebe um presente conforme o elemento de afinidade: Obsessão (Sangue), Tempo (Morte), Saber (Conhecimento) ou Espaço (Energia). Consulte o livro.", { efeitos: [{ tipo: "manual", texto: "Presente por elemento: SaH p. 30" }] }),
  ]);
  T("ocu.sah.parapsicologo", "ocultista", "Parapsicólogo", "sah", "30-31", "Usa o paranormal para curar a mente. Exige treino em Profissão (psicólogo).", [
    H("ocu.sah.parapsicologo", 10, "Terapia", "reacao", "Usa Profissão (psicólogo) como Diplomacia. Uma vez por rodada, quando você ou aliado em alcance curto falha em resistência contra dano mental, faz um teste de Profissão (psicólogo) no lugar.", { custo: "2 PE", limite: "1 vez por rodada" }),
    H("ocu.sah.parapsicologo", 40, "Palavras-chave", "livre", "Ao passar em teste de perícia para acalmar, gasta PE até o seu limite: cada 1 PE devolve 1 ponto de Sanidade à pessoa."),
    H("ocu.sah.parapsicologo", 65, "Reprogramação Mental", "especial", "Em uma ação de interlúdio, concede a uma pessoa voluntária em alcance curto um poder geral, da classe dela ou o primeiro de uma trilha que não seja a dela, até o próximo interlúdio.", { custo: "5 PE" }),
    H("ocu.sah.parapsicologo", 99, "A Sanidade Está Lá Fora", "movimento", "Remove todas as condições de medo ou mentais de uma pessoa adjacente (inclusive você).", { custo: "5 PE" }),
  ], { requisitos: { periciasAll: ["Profissão"] }, nota: "Profissão (psicólogo)" });

  /* ---------------- OCULTISTA: poderes (livro) ---------------- */
  P("ocu.camuflarocultismo", "ocultista", "Camuflar Ocultismo", "livro", "33", "livre", "Esconde símbolos e sigilos de objetos ou da pele, deixando-os invisíveis para os outros. Ao lançar um ritual, pode gastar +2 PE para lançá-lo sem componentes e sem gesticular (outros só percebem com Ocultismo DT 25).");
  P("ocu.criarselo", "ocultista", "Criar Selo", "livro", "33", "especial", "Fabrica selos paranormais de rituais que conhece (ação de interlúdio e PE iguais ao custo do ritual). Pode ter selos criados igual à sua Presença.");
  P("ocu.envoltomisterio", "ocultista", "Envolto em Mistério", "livro", "33", "passiva", "Aparência e postura assombrosas: +5 em Enganação e Intimidação contra pessoas não treinadas em Ocultismo (o mestre define quem se encaixa).");
  P("ocu.especialistaelemento", "ocultista", "Especialista em Elemento", "livro", "33", "passiva", "Escolha um elemento. A DT para resistir aos seus rituais desse elemento aumenta em +2.");
  P("ocu.ferramentasparanormais", "ocultista", "Ferramentas Paranormais", "livro", "33", "passiva", "Reduz em I a categoria de um item paranormal e ativa itens paranormais sem pagar o custo em PE.");
  P("ocu.fluxopoder", "ocultista", "Fluxo de Poder", "livro", "33", "passiva", "Mantém dois efeitos sustentados de rituais ao mesmo tempo com apenas uma ação livre, pagando o custo de cada um.", { requisitos: { nexMin: 60 } });
  P("ocu.guiadoparanormal", "ocultista", "Guiado pelo Paranormal", "livro", "34", "livre", "Faz uma ação de investigação adicional.", { custo: "2 PE", limite: "1 vez por cena" });
  P("ocu.identificacaoparanormal", "ocultista", "Identificação Paranormal", "livro", "34", "passiva", "+10 em testes de Ocultismo para identificar criaturas, objetos ou rituais.");
  P("ocu.improvisarcomponentes", "ocultista", "Improvisar Componentes", "livro", "34", "completa", "Teste de Investigação (DT 15): se passar, encontra objetos que servem como componentes ritualísticos de um elemento à escolha (o mestre define se é possível na cena).", { limite: "1 vez por cena" });
  P("ocu.intuicaoparanormal", "ocultista", "Intuição Paranormal", "livro", "34", "passiva", "Ao facilitar a investigação, soma seu Intelecto ou Presença (à escolha) no teste.");
  P("ocu.mestreelemento", "ocultista", "Mestre em Elemento", "livro", "34", "passiva", "Escolha um elemento: o custo para lançar rituais dele diminui em 1 PE.", { requisitos: { nexMin: 45, poderes: ["ocu.especialistaelemento"] } });
  P("ocu.ritualpotente", "ocultista", "Ritual Potente", "livro", "34", "passiva", "Soma seu Intelecto nas rolagens de dano e nos efeitos de cura dos seus rituais.", { requisitos: { atributos: { intelecto: 2 } } });
  P("ocu.ritualpredileto", "ocultista", "Ritual Predileto", "livro", "34", "passiva", "Escolha um ritual que conhece: o custo dele diminui em 1 PE (acumula com outras reduções).");
  P("ocu.tatuagemritualistica", "ocultista", "Tatuagem Ritualística", "livro", "34", "passiva", "Símbolos na pele reduzem em 1 PE o custo de rituais de alcance pessoal que têm você como alvo.");
  P("ocu.transcender", "ocultista", "Transcender", "livro", "34", "passiva", "Escolha um poder paranormal. Você o recebe, mas não ganha Sanidade neste aumento de NEX. Pode ser escolhido várias vezes.", { repetivel: true });
  P("ocu.treinamentopericia", "ocultista", "Treinamento em Perícia", "livro", "34", "passiva", "Escolha duas perícias para se tornar treinado. A partir do NEX 35% pode evoluir perícias treinadas para veterano e, do NEX 70%, para expert. Pode ser escolhido várias vezes.", { repetivel: true });

  /* ---------------- OCULTISTA: poderes (SaH) ---------------- */
  P("ocu.sah.sussurros", "ocultista", "Deixe os Sussurros Guiarem", "sah", "26", "especial", "Em uma rodada, abre a mente aos sussurros: +2 em perícias de investigação até o fim da cena, mas perde 1 ponto de Sanidade sempre que falha em um teste de perícia nesse período.", { custo: "2 PE", limite: "1 vez por cena" });
  P("ocu.sah.dominioesoterico", "ocultista", "Domínio Esotérico", "sah", "26", "passiva", "Ao lançar um ritual, combina os efeitos de até dois catalisadores ritualísticos diferentes.", { requisitos: { atributos: { intelecto: 3 } } });
  P("ocu.sah.estalos", "ocultista", "Estalos Macabros", "sah", "26", "livre", "Ao atrapalhar a atenção de outro ser (distrair, fintar), usa Ocultismo no lugar da perícia original, com +5 se o alvo for pessoa ou animal.", { custo: "1 PE" });
  P("ocu.sah.minhador", "ocultista", "Minha Dor me Impulsiona", "sah", "26", "livre", "Em testes de Acrobacia, Atletismo ou Furtividade, recebe +1d6. Só funciona com pelo menos 5 pontos de dano nos seus PV.", { custo: "1 PE", requisitos: { atributos: { vigor: 2 } } });
  P("ocu.sah.nosolhos", "ocultista", "Nos Olhos do Monstro", "sah", "26", "especial", "Gasta uma rodada encarando uma criatura paranormal: recebe +5 em testes contra ela (exceto ataques) até o fim da cena.", { custo: "3 PE" });
  P("ocu.sah.olharsinistro", "ocultista", "Olhar Sinistro", "sah", "26", "passiva", "Pode usar Presença no lugar de Intelecto em Ocultismo e usar essa perícia para coagir (como Intimidação).", { requisitos: { atributos: { presenca: 1 } } });
  P("ocu.sah.sentidopremonitorio", "ocultista", "Sentido Premonitório", "sah", "26", "especial", "Tem um déjà vu do futuro próximo (uma rodada): antecipa urgência e eventos de investigação e as ações dos inimigos em furtividade e perseguição. Sem efeito em combate. Custa 1 PE no início de cada rodada para manter.", { custo: "3 PE" });
  P("ocu.sah.sincronia", "ocultista", "Sincronia Paranormal", "sah", "26-27", "padrao", "Cria uma sincronia mental com aliados em alcance médio que já sobreviveram a um encontro paranormal com você. Em cada rodada distribui dados de bônus iguais à sua Presença para testes de perícias de Intelecto ou Presença. Manter custa 1 PE por rodada.", { custo: "2 PE", requisitos: { atributos: { presenca: 2 } } });
  P("ocu.sah.tracadoconjuratorio", "ocultista", "Traçado Conjuratório", "sah", "27", "completa", "Traça um símbolo em um quadrado de 1,5 m: dentro dele, +2 em Ocultismo e testes de resistência e +2 na DT dos seus rituais. Dura até o fim da cena.", { custo: "1 PE" });
})();

/* liga o catálogo ao conjunto de regras (assim o editor JSON mostra tudo) */
if (typeof REGRAS_OP_PADRAO !== "undefined") REGRAS_OP_PADRAO.catalogo = CATALOGO_OP_PADRAO;

/* =====================================================================
   MOTOR DO CATÁLOGO: trilha automática, poderes com requisitos, efeitos
   ===================================================================== */

let trilhaOP = ""; // id da trilha escolhida (salvo na ficha)

function obterCatalogoOP() {
  return (typeof regrasOPCustom !== "undefined" && regrasOPCustom && regrasOPCustom.catalogo) || CATALOGO_OP_PADRAO;
}

function trilhasDaClasseOP(classe) {
  const lista = obterCatalogoOP().trilhas.filter((t) => t.classe === classe);
  // catálogos salvos antes da classe Sobrevivente existir
  if (classe === "sobrevivente" && !lista.length) return CATALOGO_OP_PADRAO.trilhas.filter((t) => t.classe === classe);
  return lista;
}

function buscarTrilhaOP(id) {
  return obterCatalogoOP().trilhas.find((t) => t.id === id) || (/^sob\./.test(id || "") ? CATALOGO_OP_PADRAO.trilhas.find((t) => t.id === id) : null) || null;
}

/* tudo que o catálogo conhece por id (habilidades de trilha + poderes) */
function buscarItemCatalogoOP(id) {
  const cat = obterCatalogoOP();
  // habilidades de classe (ex.: Empenho do Sobrevivente)
  for (const [cls, lista] of Object.entries(CATALOGO_OP_PADRAO.habilidadesClasse || {})) {
    const h = lista.find((x) => x.id === id);
    if (h) return { ...h, classe: cls, tipo: "classe", fonte: h.fonte || "sah" };
  }
  // habilidade convertida pelo Treinamento Especial (id termina em .conv)
  if (/\.conv$/.test(id)) {
    const base = buscarItemCatalogoOP(id.replace(/\.conv$/, ""));
    if (base && base.conversao) return { ...base, ...base.conversao, id, efeitos: base.conversao.efeitos || [], conversao: null };
  }
  for (const t of cat.trilhas) {
    const h = (t.habilidades || []).find((x) => x.id === id);
    if (h) return { ...h, classe: t.classe, trilha: t.nome, tipo: "trilha", fonte: h.fonte || t.fonte, pagina: h.pagina || t.pagina };
  }
  return cat.poderes.find((p) => p.id === id) || (/^ori\./.test(id) ? CATALOGO_OP_PADRAO.poderes.find((p) => p.id === id) : null) || null;
}

function _fonteTextoOP(item) {
  const f = obterCatalogoOP().fontes?.[item.fonte] || item.fonte || "";
  return f ? `${f}${item.pagina ? `, p. ${item.pagina}` : ""}` : "";
}

/* ---------- poderes que a ficha possui vindos do catálogo ---------- */
function poderesDoCatalogoNaFichaOP() {
  return (typeof poderes !== "undefined" ? poderes : []).filter((p) => p.origemCatalogo);
}

function _possuiPoderCatalogoOP(id) {
  return poderesDoCatalogoNaFichaOP().some((p) => p.origemCatalogo === id);
}

/* ---------- efeitos automáticos (PV/PE/SAN) ---------- */
function somarEfeitosCatalogoOP(nivel) {
  const total = { pv: 0, pe: 0, san: 0 };

  poderesDoCatalogoNaFichaOP().forEach((p) => {
    const item = buscarItemCatalogoOP(p.origemCatalogo);
    const lista = p.afinidadeSegundo ? item?.efeitosAfinidade || [] : item?.efeitos || [];
    lista.forEach((e) => {
      if (e.tipo !== "recurso" || !(e.alvo in total)) return;
      const valor = Number(e.valor) || 0;
      const porNivel = (Number(e.porNivel) || 0) * nivel + (e.cadaNiveis ? Math.floor(nivel / e.cadaNiveis) * (Number(e.porCada) || 1) : 0);
      const impares = e.impares ? Math.floor((nivel - 1) / 2) * (Number(e.impares) || 1) : 0;
      const porAtributo = e.porAtributo ? _atributoOP(e.porAtributo) : 0;
      total[e.alvo] += valor + porNivel + porAtributo + impares;
    });
  });

  return total;
}

/* ---------- requisitos ---------- */
function _atributoOP(chave) {
  return typeof get === "function" ? get(chave) : 0;
}

function verificarRequisitosOP(item) {
  const falhas = [];
  const r = item.requisitos || {};
  const nex = nexClasseOP();
  const nomesAttr = { forca: "Força", agilidade: "Agilidade", intelecto: "Intelecto", presenca: "Presença", vigor: "Vigor" };
  const treinado = (n) => (typeof profs !== "undefined" ? (profs[n] || 0) >= 1 : false);

  if (r.nexMin && nex < r.nexMin) falhas.push(rotuloNivelNexOP(r.nexMin));

  Object.entries(r.atributos || {}).forEach(([a, v]) => {
    if (_atributoOP(a) < v) falhas.push(`${nomesAttr[a] || a} ${v}`);
  });

  (r.periciasAll || []).forEach((p) => {
    if (!treinado(p)) falhas.push(`treinado em ${p}`);
  });

  if (r.periciasAny?.length && !r.periciasAny.some(treinado)) {
    falhas.push(`treinado em ${r.periciasAny.join(" ou ")}`);
  }

  (r.poderes || []).forEach((id) => {
    if (!_possuiPoderCatalogoOP(id)) {
      const p = buscarItemCatalogoOP(id);
      falhas.push(`poder ${p?.nome || id}`);
    }
  });

  Object.entries(r.elementos || {}).forEach(([el, n]) => {
    if (_contarParanormaisOP(el) < n) falhas.push(`${el} ${n} (já ter ${n} poder${n > 1 ? "es" : ""} de ${el})`);
  });

  return falhas;
}

function _requisitosTextoOP(item) {
  const r = item.requisitos || {};
  const nomesAttr = { forca: "For", agilidade: "Agi", intelecto: "Int", presenca: "Pre", vigor: "Vig" };
  const partes = [];
  if (r.nexMin) partes.push(rotuloNivelNexOP(r.nexMin));
  Object.entries(r.atributos || {}).forEach(([a, v]) => partes.push(`${nomesAttr[a] || a} ${v}`));
  if (r.periciasAll?.length) partes.push(`treinado em ${r.periciasAll.join(" e ")}`);
  if (r.periciasAny?.length) partes.push(`treinado em ${r.periciasAny.join(" ou ")}`);
  (r.poderes || []).forEach((id) => partes.push(buscarItemCatalogoOP(id)?.nome || id));
  Object.entries(r.elementos || {}).forEach(([el, n]) => partes.push(`${el} ${n}`));
  return partes.join(" · ");
}

/* ---------- criar o poder na lista de poderes da ficha ---------- */
function _poderDaFichaOP(item, extra = {}) {
  const efeitosAuto = (item.efeitos || []).some((e) => e.tipo === "recurso");
  const manuais = (item.efeitos || []).filter((e) => e.tipo === "manual").map((e) => e.texto);

  let desc = item.resumo || "";
  if (manuais.length) desc += `\n\n✋ Manual: ${manuais.join("; ")}`;
  if (efeitosAuto) desc += `\n\n⚙ Efeito automático aplicado nos máximos de PV/PE/SAN.`;
  if ((item.efeitos || []).some((e) => e.tipo === "treino")) desc += `\n\n🎓 Treino aplicado automaticamente (treinado, ou +2 se você já era treinado).`;
  const fonte = _fonteTextoOP(item);
  if (fonte) desc += `\n\n📖 ${fonte}`;

  return {
    nome: item.nome,
    categoria: item.tipo === "trilha" ? "trilha" : item.tipo || "classe",
    ativacao: item.ativacao || "passiva",
    custo: item.custo || "",
    limite: item.limite || "",
    requisito: _requisitosTextoOP(item) || (item.nex ? rotuloNivelNexOP(item.nex) : ""),
    dano: "",
    alcance: "",
    duracao: "",
    desc,
    temCargas: false,
    maxCargas: 0,
    origemCatalogo: item.id,
    ...extra,
  };
}

/* ---------- trilha: habilidades entram/saem conforme o NEX ---------- */
function sincronizarTrilhaOP() {
  if (typeof poderes === "undefined") return false;

  const nex = nexClasseOP();
  const trilha = buscarTrilhaOP(trilhaOP);
  const desejadas = new Map();

  if (trilha) {
    (trilha.habilidades || [])
      .filter((h) => Number(h.nex) <= nex)
      .forEach((h) => desejadas.set(h.id, h));
  }

  // habilidades de classe automáticas (Empenho, Cicatrizado…)
  const classeAtual = document.getElementById("classeOP")?.value || "";
  ((CATALOGO_OP_PADRAO.habilidadesClasse || {})[classeAtual] || [])
    .filter((h) => Number(h.nex) <= nex)
    .forEach((h) => desejadas.set(h.id, h));

  // herança do Sobrevivente (Treinamento Especial): mantém o que já tinha recebido
  if (typeof habilidadesHerancaOP === "function") {
    habilidadesHerancaOP(classeAtual).forEach((h) => desejadas.set(h.id, h));
  }

  let mudou = false;

  // remove habilidades de trilha concedidas automaticamente que não valem mais
  for (let i = poderes.length - 1; i >= 0; i--) {
    const p = poderes[i];
    if (p.autoTrilha && !desejadas.has(p.origemCatalogo)) {
      poderes.splice(i, 1);
      mudou = true;
    }
  }

  // adiciona as que faltam
  desejadas.forEach((h, id) => {
    if (poderes.some((p) => p.origemCatalogo === id)) return;
    const item = buscarItemCatalogoOP(id);
    poderes.push(_poderDaFichaOP(item, { autoTrilha: true }));
    mudou = true;
  });

  if (mudou && typeof renderPoderes === "function") renderPoderes();
  return mudou;
}

function atualizarSeletorTrilhaOP() {
  const sel = document.getElementById("trilhaOP");
  if (!sel) return;

  const classe = document.getElementById("classeOP")?.value || "";
  const lista = trilhasDaClasseOP(classe);

  sel.innerHTML =
    `<option value="">${lista.length ? (classe === "sobrevivente" ? "Sem trilha (escolha no estágio 2)" : "Sem trilha (escolha no NEX 10%)") : "Sem trilhas cadastradas"}</option>` +
    lista
      .map((t) => `<option value="${esc(t.id)}" ${t.id === trilhaOP ? "selected" : ""}>${esc(t.nome)}${t.fonte === "sah" ? " (SaH)" : ""}</option>`)
      .join("");

  sel.disabled = !lista.length;

  const info = document.getElementById("trilhaInfoOP");
  const t = buscarTrilhaOP(trilhaOP);
  if (info) {
    info.textContent = t ? t.resumo + (t.nota ? ` (Exige: ${t.nota})` : "") : "";
  }
  sel.title = t ? t.resumo + (t.nota ? ` (Exige: ${t.nota})` : "") : "";
}

async function aoMudarTrilhaOP() {
  const sel = document.getElementById("trilhaOP");
  const novaId = sel?.value || "";
  const t = buscarTrilhaOP(novaId);

  // pré-requisito da trilha (ex.: Médico de Campo exige treino em Medicina)
  if (t?.requisitos) {
    const falhas = verificarRequisitosOP(t);
    if (falhas.length) {
      const ok = await confirmBonito(
        `A trilha ${t.nome} exige ${t.nota || falhas.join(", ")}. Você ainda não cumpre: ${falhas.join(", ")}. Escolher mesmo assim?`,
      );
      if (!ok) {
        if (sel) sel.value = trilhaOP;
        return;
      }
    }
  }

  const anterior = buscarTrilhaOP(trilhaOP);
  if (novaId === trilhaOP) return;

  trilhaOP = novaId;
  sincronizarTrilhaOP();
  atualizarSeletorTrilhaOP();
  if (typeof aplicarRecursosAutomaticosOP === "function") aplicarRecursosAutomaticosOP();
  if (typeof atualizarResumoAutoOP === "function") atualizarResumoAutoOP();
  atualizarContadorPoderesClasseOP();
  salvarTudo();
  mostrarResumoTrilhaOP(t, anterior);
}

function mostrarResumoTrilhaOP(t, anterior) {
  const nex = nexClasseOP();
  const linha = (h, ok) => `
    <div class="evo-marco">${ok ? "🧭" : "🔒"} <b>${esc(h.nome)}</b> <em>(${esc(rotuloNivelNexOP(h.nex))})</em><br>${esc(h.resumo || "")}</div>`;

  let html;
  if (t) {
    const habs = t.habilidades || [];
    const ja = habs.filter((h) => Number(h.nex) <= nex);
    const futuras = habs.filter((h) => Number(h.nex) > nex);
    html = `
      <div class="popup-bloco evo-popup">
        <div class="evo-titulo">${esc(t.nome)} <small>(${t.fonte === "sah" ? "Sobrevivendo ao Horror" : "Livro de Regras"}${t.pagina ? `, p. ${esc(t.pagina)}` : ""})</small></div>
        ${t.resumo ? `<div class="evo-bloco"><div class="evo-marco">${esc(t.resumo)}${t.nota ? ` <b>(Exige: ${esc(t.nota)})</b>` : ""}</div></div>` : ""}
        ${anterior ? `<div class="evo-bloco"><div class="evo-sub">Saiu da ficha (${esc(anterior.nome)})</div><div class="evo-marco">❌ As habilidades da trilha anterior foram removidas.</div></div>` : ""}
        <div class="evo-bloco">
          <div class="evo-sub">Recebido agora</div>
          ${ja.length ? ja.map((h) => linha(h, true)).join("") : `<div class="evo-marco">Nada ainda: a primeira habilidade vem no ${esc(rotuloNivelNexOP(habs[0]?.nex ?? 10))}.</div>`}
        </div>
        ${futuras.length ? `<div class="evo-bloco"><div class="evo-sub">Vem depois</div>${futuras.map((h) => linha(h, false)).join("")}</div>` : ""}
        <small class="evo-dica">As habilidades foram para a aba Poderes (categoria Trilha) e as próximas entram sozinhas conforme o NEX.</small>
        <button type="button" class="evo-ok" onclick="fecharPopup()">OK, continuar</button>
      </div>`;
    abrirPopup("Trilha escolhida", html, true);
  } else if (anterior) {
    html = `
      <div class="popup-bloco evo-popup">
        <div class="evo-titulo">${esc(anterior.nome)} <small>removida</small></div>
        <div class="evo-bloco"><div class="evo-marco">❌ As habilidades dessa trilha saíram da ficha.</div></div>
        <button type="button" class="evo-ok" onclick="fecharPopup()">OK, continuar</button>
      </div>`;
    abrirPopup("Trilha removida", html, true);
  }
}

/* ---------- poderes de classe: quantos já usou / quantos tem direito ---------- */
function poderesDeClasseDisponiveisOP(classe, nex) {
  const marcos = typeof marcosDaClasseOP === "function" ? marcosDaClasseOP(classe) : [];
  return marcos.filter((m) => m.tipo === "poder" && Number(m.nex) <= nex).length;
}

function poderesDeClasseUsadosOP() {
  return poderesDoCatalogoNaFichaOP().filter((p) => {
    const item = buscarItemCatalogoOP(p.origemCatalogo);
    return item && !item.habilidadeDeClasse && (item.tipo === "classe" || item.tipo === "geral");
  }).length;
}

function atualizarContadorPoderesClasseOP() {
  const el = document.getElementById("contadorPoderesClasseOP");
  if (!el) return;

  const classe = document.getElementById("classeOP")?.value || "";
  const nex = nexClasseOP();
  const tem = poderesDeClasseDisponiveisOP(classe, nex);

  el.textContent = tem ? `Poderes de classe: ${poderesDeClasseUsadosOP()} de ${tem}` : "";
}

/* ---------- catálogo de poderes (escolher e adicionar) ---------- */
function alternarDetalheCatalogoOP(el, ev) {
  if (ev && ev.target.closest("button, select, option")) return;
  const d = el.querySelector(".cat-detalhe");
  const m = el.querySelector(".cat-mais");
  if (!d) return;
  const abrir = d.style.display === "none";
  d.style.display = abrir ? "block" : "none";
  if (m) m.textContent = abrir ? "Recolher ▴" : "Toque para ver detalhes ▾";
}

async function escolherTrilhaCatalogoOP(id) {
  const sel = document.getElementById("trilhaOP");
  if (!sel) return;
  sel.value = id;
  await aoMudarTrilhaOP();
}

function _blocoTrilhasCatOP(classe, nex, busca) {
  const t = _semAcentoOP(busca).trim();
  const lista = trilhasDaClasseOP(classe).filter(
    (tr) => !t || _semAcentoOP([tr.nome, tr.resumo, ...(tr.habilidades || []).map((h) => h.nome + " " + h.resumo)].join(" ")).includes(t),
  );
  const html = lista.map((tr) => {
    const minha = tr.id === trilhaOP;
    const habs = (tr.habilidades || []).map((h) => {
      const ok = Number(h.nex) <= nex;
      return `
        <div class="cat-item trilha-hab ${minha && ok ? "" : "bloqueado"}" style="cursor:default">
          <div class="cat-topo">
            <strong>${esc(h.nome)}</strong>
            <span class="cat-tags">
              <em class="cat-tag">${esc(rotuloNivelNexOP(h.nex))}</em>
              ${h.ativacao ? `<em class="cat-tag">${esc(_nomeAtivacaoOP(h.ativacao))}</em>` : ""}
              ${h.custo ? `<em class="cat-tag">${esc(h.custo)}</em>` : ""}
            </span>
          </div>
          <p class="cat-resumo">${esc(h.resumo || "")}</p>
          ${minha && ok ? `<div class="cat-estado">✔ Já na sua ficha</div>` : minha ? `<div class="cat-estado falta">Chega em ${esc(rotuloNivelNexOP(h.nex))}</div>` : ""}
        </div>`;
    }).join("");
    return `
      <details class="cat-trilha" ${minha || t ? "open" : ""}>
        <summary>
          <strong>${esc(tr.nome)}</strong>
          ${minha ? `<em class="cat-tag auto">Sua trilha</em>` : ""}
          ${tr.fonte === "sah" ? `<em class="cat-tag">SaH</em>` : ""}
        </summary>
        <p class="cat-resumo">${esc(tr.resumo || "")}${tr.nota ? ` <b>(Exige: ${esc(tr.nota)})</b>` : ""}</p>
        <div class="cat-lista">${habs}</div>
        ${minha ? "" : `<button type="button" class="cat-add" onclick="escolherTrilhaCatalogoOP('${esc(tr.id)}')">Escolher esta trilha</button>`}
      </details>`;
  }).join("");
  return { n: lista.length, html };
}

let _filtroCatalogoOP = "todos";
let _buscaCatalogoOP = "";
let _buscaParanormalOP = "";
function _semAcentoOP(t) {
  return String(t || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}
function _casaBuscaOP(p, termo) {
  const t = _semAcentoOP(termo).trim();
  if (!t) return true;
  return _semAcentoOP([p.nome, p.resumo, p.afinidade, p.elemento, p.classe].join(" ")).includes(t);
}
function filtrarCatalogoOP(f) {
  _filtroCatalogoOP = f;
  abrirCatalogoPoderesOP(true);
}
function buscarCatalogoOP(texto, paranormal) {
  if (paranormal) _buscaParanormalOP = texto; else _buscaCatalogoOP = texto;
  clearTimeout(window._tBuscaCatOP);
  window._tBuscaCatOP = setTimeout(() => {
    if (paranormal) abrirParanormaisOP(true); else abrirCatalogoPoderesOP(true);
    const el = document.getElementById(paranormal ? "buscaParOP" : "buscaCatOP");
    if (el) { el.focus(); el.setSelectionRange(el.value.length, el.value.length); }
  }, 250);
}

function abrirCatalogoPoderesOP(manter) {
  if (!manter) { _buscaCatalogoOP = ""; _filtroCatalogoOP = "todos"; }
  const classe = document.getElementById("classeOP")?.value || "";
  if (!classe) {
    alertBonito("Escolha uma classe para ver os poderes disponíveis.");
    return;
  }

  const todosCat = obterCatalogoOP().poderes.filter(
    (p) => (p.classe === classe || p.classe === "geral" || p.geral) && p.tipo !== "paranormal" && !(modoSeparadoOP() && /\.transcender$/.test(p.id)),
  );
  // poderes gerais não repetem um poder de mesmo nome que a própria classe já tem
  const nomesDaClasse = new Set(todosCat.filter((p) => p.classe === classe).map((p) => p.nome));
  const listaTotal = todosCat.filter((p) => p.classe === classe || !nomesDaClasse.has(p.nome));
  const lista = listaTotal.filter((p) => _casaBuscaOP(p, _buscaCatalogoOP));
  if (!listaTotal.length && !trilhasDaClasseOP(classe).length) {
    alertBonito("Ainda não há poderes cadastrados para esta classe. Você pode cadastrar em Editar regras.");
    return;
  }

  const nex = nexClasseOP();
  const tem = poderesDeClasseDisponiveisOP(classe, nex);
  const usados = poderesDeClasseUsadosOP();

  const cartao = (p) => {
    const jaTem = _possuiPoderCatalogoOP(p.id);
    const falhas = verificarRequisitosOP(p);
    const bloqueado = (jaTem && !p.repetivel) || falhas.length > 0;
    const auto = (p.efeitos || []).some((e) => e.tipo === "recurso");
    const req = _requisitosTextoOP(p);

    const efs = (p.efeitos || [])
      .map((e) => {
        if (e.tipo === "recurso") {
          const a = { pv: "PV", pe: "PE", san: "SAN" }[e.alvo] || e.alvo;
          if (e.valor) return `⚙ +${e.valor} ${a} (automático)`;
          if (e.porNivel) return `⚙ +${e.porNivel} ${a} por nível (automático)`;
          if (e.cadaNiveis) return `⚙ +${e.porCada} ${a} a cada ${e.cadaNiveis} níveis (automático)`;
          if (e.porAtributo) return `⚙ ${a} por atributo (automático)`;
          return `⚙ Altera ${a} (automático)`;
        }
        if (e.tipo === "treino") return `🎓 Treino em ${e.pericia} (ou +2 se já treinado)`;
        if (e.tipo === "manual") return `✋ ${e.texto || "Efeito aplicado manualmente na ficha"}`;
        return "";
      })
      .filter(Boolean);
    const detalhes = [
      p.ativacao ? `<div><b>Ativação:</b> ${esc(_nomeAtivacaoOP(p.ativacao))}</div>` : "",
      p.custo ? `<div><b>Custo:</b> ${esc(p.custo)}</div>` : "",
      p.limite ? `<div><b>Limite:</b> ${esc(p.limite)}</div>` : "",
      req ? `<div><b>Pré-requisitos:</b> ${esc(req)}</div>` : "",
      p.repetivel ? `<div><b>Pode ser escolhido várias vezes.</b></div>` : "",
      efs.length ? `<div><b>Na ficha:</b><br>${efs.map(esc).join("<br>")}</div>` : "",
      `<div class="cat-fonte">📖 ${p.fonte === "sah" ? "Sobrevivendo ao Horror" : "Livro de Regras"}${p.pagina ? `, p. ${esc(p.pagina)}` : ""} — o texto completo está no livro.</div>`,
    ].join("");

    return `
      <div class="cat-item ${bloqueado ? "bloqueado" : ""}" onclick="alternarDetalheCatalogoOP(this, event)">
        <div class="cat-topo">
          <strong>${esc(p.nome)}</strong>
          <span class="cat-tags">
            ${_ehGeralCatOP(p) ? `<em class="cat-tag auto">Geral</em>` : `<em class="cat-tag classe">${p.tipo === "trilha" ? "Trilha" : "Classe"}</em>`}
            ${p.fonte === "sah" ? `<em class="cat-tag">SaH</em>` : ""}
            ${p.ativacao ? `<em class="cat-tag">${esc(_nomeAtivacaoOP(p.ativacao))}</em>` : ""}
            ${p.custo ? `<em class="cat-tag">${esc(p.custo)}</em>` : ""}
            ${auto ? `<em class="cat-tag auto">⚙ automático</em>` : ""}
          </span>
        </div>
        ${req ? `<div class="cat-req">Pré-requisitos: ${esc(req)}</div>` : ""}
        <p class="cat-resumo">${esc(p.resumo || "")}</p>
        <div class="cat-detalhe" style="display:none">${detalhes}</div>
        <div class="cat-mais">Toque para ver detalhes ▾</div>
        ${
          jaTem && !p.repetivel
            ? `<div class="cat-estado">✔ Já adquirido</div>`
            : falhas.length
              ? `<div class="cat-estado falta">Falta: ${esc(falhas.join(", "))}</div>`
              : ""
        }
        ${p.escolhePericia && !falhas.length ? `<select id="focoPer_${esc(p.id.replace(/[^a-z0-9]/gi, "_"))}" class="rit-sel">${pericias.filter((x) => x.nome !== "Luta" && x.nome !== "Pontaria" && (profs[x.nome] || 0) >= 1 && !poderesDoCatalogoNaFichaOP().some((q) => q.origemCatalogo === p.id && q.perciaEscolhida === x.nome)).map((x) => `<option value="${esc(x.nome)}">${esc(x.nome)}</option>`).join("")}</select>` : ""}
        <button type="button" class="cat-add" ${bloqueado ? "disabled" : ""} onclick="adquirirPoderCatalogoOP('${esc(p.id)}')">
          ${jaTem && p.repetivel ? "Adquirir de novo" : "Adquirir"}
        </button>
      </div>`;
  };

  const gerais = lista.filter(_ehGeralCatOP);
  const deClasse = lista.filter((p) => !_ehGeralCatOP(p));
  const f = _filtroCatalogoOP;
  const trilhasCat = _blocoTrilhasCatOP(classe, nex, _buscaCatalogoOP);
  const secao = (titulo, itens) =>
    itens.length ? `<h4 class="cat-secao">${titulo} <span>${itens.length}</span></h4><div class="cat-lista">${itens.map(cartao).join("")}</div>` : "";
  const chip = (id, rotulo, n) => `<button type="button" class="cat-chip ${f === id ? "ativo" : ""}" onclick="filtrarCatalogoOP('${id}')">${rotulo} <span>${n}</span></button>`;

  const html = `
    <div class="popup-bloco">
      <input id="buscaCatOP" class="rit-busca" type="search" placeholder="Buscar poder…" value="${esc(_buscaCatalogoOP)}" oninput="buscarCatalogoOP(this.value)" />
      <div class="cat-filtros">${chip("todos", "Todos", lista.length)}${chip("classe", "Classe", deClasse.length)}${chip("trilhas", "Trilhas", trilhasCat.n)}${chip("gerais", "Gerais", gerais.length)}</div>
      ${tem ? `<div class="cat-contador">Poderes de classe: <b>${usados}</b> de <b>${tem}</b> disponíveis (${esc(rotuloNivelNexOP(nex))})</div>` : ""}
      ${f === "todos" || f === "classe" ? secao("Poderes de classe", deClasse) : ""}
      ${f === "todos" || f === "trilhas" ? (trilhasCat.n ? `<h4 class="cat-secao">Trilhas <span>${trilhasCat.n}</span></h4><small class="evo-dica">As habilidades da trilha entram sozinhas na ficha conforme o NEX. Escolha a trilha por aqui ou no campo Trilha da ficha.</small>${trilhasCat.html}` : "") : ""}
      ${f === "todos" || f === "gerais" ? secao("Poderes gerais", gerais) : ""}
      ${!lista.length && !trilhasCat.n ? `<p class="bp-dica">Nenhum poder encontrado.</p>` : ""}
      ${modoSeparadoOP() ? `<small class="evo-dica">Na regra de nível separado, Transcender não é poder de classe: ele vem do ritual de conexão quando o NEX permite.</small>` : ""}
      <small class="evo-dica">Descrições resumidas: o texto completo está no livro (fonte indicada ao adquirir).</small>
    </div>`;

  abrirPopup("Catálogo de poderes", html, true);
}

function _ehGeralCatOP(p) {
  return p.tipo === "geral" || !!p.geral;
}

function _nomeAtivacaoOP(v) {
  return { passiva: "Passiva", padrao: "Ação padrão", interludio: "Interlúdio", movimento: "Movimento", completa: "Completa", livre: "Livre", reacao: "Reação", especial: "Especial" }[v] || v;
}

async function adquirirPoderCatalogoOP(id) {
  const item = obterCatalogoOP().poderes.find((p) => p.id === id);
  if (!item) return;

  const falhas = verificarRequisitosOP(item);
  if (falhas.length) {
    alertBonito(`Requisitos não cumpridos: ${falhas.join(", ")}.`);
    return;
  }
  if (_possuiPoderCatalogoOP(id) && !item.repetivel) return;

  const classe = document.getElementById("classeOP")?.value || "";
  const nex = nexClasseOP();
  const tem = poderesDeClasseDisponiveisOP(classe, nex);
  if (tem && poderesDeClasseUsadosOP() >= tem) {
    const ok = await confirmBonito(`Você já usou os ${tem} poderes de classe disponíveis (${rotuloNivelNexOP(nex)}). Adquirir mesmo assim?`);
    if (!ok) return;
  }

  const novo = _poderDaFichaOP(item);
  if (item.escolhePericia) {
    const sel = document.getElementById("focoPer_" + id.replace(/[^a-z0-9]/gi, "_"));
    if (!sel || !sel.value) { alertBonito("Você precisa ser treinado em alguma perícia para escolher o Foco em Perícia."); return; }
    novo.perciaEscolhida = sel.value;
    novo.nome = `${item.nome} (${sel.value})`;
    novo.desc = `Ao fazer teste de ${sel.value}, você rola +1 dado.\n\n📖 Sobrevivendo ao Horror, p. ${item.pagina}`;
  }
  aplicarTreinoPoderOP(item, novo);
  poderes.push(novo);

  if (typeof renderPoderes === "function") renderPoderes();
  if (typeof atualizarTudo === "function") atualizarTudo();
  if (typeof aplicarRecursosAutomaticosOP === "function") aplicarRecursosAutomaticosOP();
  if (typeof atualizarResumoAutoOP === "function") atualizarResumoAutoOP();
  atualizarContadorPoderesClasseOP();
  salvarTudo();
  abrirCatalogoPoderesOP(true);
}

/* ---------- interface injetada ---------- */
function _iconeBtnOP(nome) {
  const t = {
    livro: '<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 21V5"/><path d="M9 7h6"/>',
    olho: '<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    pergaminho: '<path d="M7 4h11a2 2 0 0 1 2 2v1H9"/><path d="M7 4a2 2 0 0 0-2 2v11a3 3 0 0 0 3 3h9a3 3 0 0 0 3-3V7"/><path d="M9 11h7M9 15h5"/>',
    caveira: '<path d="M12 3a8 8 0 0 0-5 14v3h10v-3a8 8 0 0 0-5-14z"/><circle cx="9" cy="11" r="1.4"/><circle cx="15" cy="11" r="1.4"/><path d="M10 20v-2M14 20v-2"/>',
  }[nome] || "";
  return `<svg class="op-ico" viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${t}</svg>`;
}

function montarBarraCatalogoOP() {
  if (document.getElementById("barraCatalogoOP")) return;
  const lista = document.getElementById("listaPoderesOrdem");
  if (!lista) return;

  const barra = document.createElement("div");
  barra.id = "barraCatalogoOP";
  barra.className = "catalogo-op-barra";
  barra.innerHTML = `
    <button type="button" onclick="abrirCatalogoPoderesOP()">${_iconeBtnOP("livro")}<span>Catálogo de poderes</span></button>
    <button type="button" onclick="abrirParanormaisOP()">${_iconeBtnOP("olho")}<span>Poderes paranormais</span></button>
    <span id="contadorPoderesClasseOP" class="catalogo-op-contador"></span>`;
  lista.insertAdjacentElement("beforebegin", barra);
  atualizarContadorPoderesClasseOP();
}

function montarSeletorTrilhaOP() {
  if (document.getElementById("trilhaOP")) return;
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
    <span class="op-label">TRILHA</span>
    <select id="trilhaOP" onchange="aoMudarTrilhaOP()"></select>`;
  linha.appendChild(campo);
  atualizarSeletorTrilhaOP();
}

/* ---------- ligação com a ficha ---------- */
function carregarTrilhaOP(p) {
  trilhaOP = p.trilhaOP || "";
  if (typeof carregarHerancaOP === "function") carregarHerancaOP(p);
  atualizarSeletorTrilhaOP();
  atualizarContadorPoderesClasseOP();
}

function salvarTrilhaOP(p) {
  p.trilhaOP = trilhaOP || "";
  if (typeof salvarHerancaOP === "function") salvarHerancaOP(p);
}

/* =====================================================================
   PODERES PARANORMAIS (Livro de Regras p. 114-116)
   Qualquer classe pode ter: vêm do poder Transcender (ou do ritual de
   conexão, na regra de nível separado). Cada elemento tem o seu bloco; a
   2ª escolha de um poder do seu elemento dá o benefício de "Afinidade".
   ===================================================================== */
(function () {
  const E = (id, elemento, nome, ativacao, resumo, afinidade, extra = {}) =>
    CATALOGO_OP_PADRAO.poderes.push({
      id: "par." + id, classe: "paranormal", tipo: "paranormal", elemento, nome,
      fonte: "livro", pagina: "114", ativacao, resumo, afinidade, efeitos: [], ...extra,
    });

  E("aprenderritual", "", "Aprender Ritual", "passiva",
    "Você aprende e pode conjurar um ritual de 1º círculo à sua escolha, e pode trocar um ritual que já conhece por outro. A partir do NEX 45% aprende um ritual de até 2º círculo e, do NEX 75%, de até 3º. Pode escolher quantas vezes quiser, sujeito ao limite de rituais conhecidos (Intelecto). Conta como poder do elemento do ritual escolhido.",
    "", { repetivel: true, abreGrimorio: true });
  E("resistir", "", "Resistir a Elemento", "passiva",
    "Escolha entre Conhecimento, Energia, Morte ou Sangue. Você recebe resistência 10 contra esse elemento. Conta como poder do elemento escolhido.",
    "a resistência sobe para 20.", { repetivel: true, escolheElemento: true, pagina: "115" });

  // CONHECIMENTO
  E("expansaoconhecimento", "Conhecimento", "Expansão de Conhecimento", "passiva",
    "Você aprende um poder de classe que não pertença à sua classe (cumprindo os pré-requisitos dele).",
    "você aprende um segundo poder de classe que não pertença à sua classe.", { requisitos: { elementos: { Conhecimento: 1 } }, pagina: "115" });
  E("percepcaoparanormal", "Conhecimento", "Percepção Paranormal", "passiva",
    "Em cenas de investigação, ao fazer um teste para procurar pistas, você pode rolar novamente um dado com resultado menor que 10 (e deve aceitar a segunda rolagem).",
    "pode rolar novamente até dois dados com resultado menor que 10.", { pagina: "115" });
  E("precognicao", "Conhecimento", "Precognição", "passiva",
    "Um \"sexto sentido\" avisa do perigo antes que ele aconteça: +2 na Defesa e em testes de resistência.",
    "você fica imune à condição desprevenido.", { requisitos: { elementos: { Conhecimento: 1 } }, pagina: "115" });
  E("sensitivo", "Conhecimento", "Sensitivo", "passiva",
    "Você sente emoções e intenções de outros seres (medo, raiva, malícia): +5 em testes de Diplomacia, Intimidação e Intuição.",
    "em teste oposto com uma dessas perícias, o oponente sofre -1 dado.", { pagina: "115" });
  E("visaooculto", "Conhecimento", "Visão do Oculto", "passiva",
    "Você enxerga pela percepção do Conhecimento: +5 em testes de Percepção e enxerga no escuro.",
    "você ignora camuflagem.", { pagina: "116" });

  // ENERGIA
  E("afortunado", "Energia", "Afortunado", "passiva",
    "Uma vez por rolagem, você pode rolar novamente um resultado 1 em qualquer dado que não seja d20.",
    "além disso, uma vez por teste, pode rolar novamente um resultado 1 em d20.", { pagina: "116" });
  E("campoprotetor", "Energia", "Campo Protetor", "livre",
    "Ao usar a ação esquiva, você pode gastar 1 PE para receber +5 na Defesa.",
    "ao usar o poder, você também recebe +5 em Reflexos e, até o início do próximo turno, se passar num teste de Reflexos que reduziria o dano à metade, não sofre dano nenhum.",
    { custo: "1 PE", requisitos: { elementos: { Energia: 1 } }, pagina: "116" });
  E("causalidadefortuita", "Energia", "Causalidade Fortuita", "passiva",
    "Em cenas de investigação, a DT para procurar pistas diminui em 5 para você até encontrar uma pista.",
    "a DT para procurar pistas sempre diminui em 5 para você.", { pagina: "116" });
  E("golpedesorte", "Energia", "Golpe de Sorte", "passiva",
    "Seus ataques recebem +1 na margem de ameaça.",
    "seus ataques recebem +1 no multiplicador de crítico.", { requisitos: { elementos: { Energia: 1 } }, pagina: "116" });
  E("manipularentropia", "Energia", "Manipular Entropia", "reacao",
    "Quando outro ser em alcance curto faz um teste de perícia, você pode gastar 2 PE para fazê-lo rolar novamente um dos dados desse teste.",
    "o alvo rola novamente todos os dados que você escolher.", { custo: "2 PE", requisitos: { elementos: { Energia: 1 } }, pagina: "116" });

  // MORTE
  E("encararmorte", "Morte", "Encarar a Morte", "passiva",
    "Durante cenas de ação, seu limite de gasto de PE aumenta em +1 (não afeta a DT dos seus efeitos).",
    "durante cenas de ação, o limite de gasto de PE aumenta em +2 (total +3).", { pagina: "116" });
  E("escapardamorte", "Morte", "Escapar da Morte", "reacao",
    "Uma vez por cena, ao receber dano que o deixaria com 0 PV, você fica com 1 PV. Não funciona contra dano massivo.",
    "em vez do normal, você evita completamente o dano (em dano massivo, fica com 1 PV).",
    { limite: "1 vez por cena", requisitos: { elementos: { Morte: 1 } }, pagina: "116" });
  E("potencialaprimorado", "Morte", "Potencial Aprimorado", "passiva",
    "Você recebe +1 PE por NEX. Ao subir de NEX, os PE deste poder aumentam de acordo (ex.: escolhido no NEX 30% dá 6 PE; ao chegar a 35%, +1 PE).",
    "você recebe +1 PE adicional por NEX (total +2 por NEX).",
    { efeitos: [{ tipo: "recurso", alvo: "pe", porNivel: 1 }], efeitosAfinidade: [{ tipo: "recurso", alvo: "pe", porNivel: 1 }], pagina: "117" });
  E("potencialreaproveitado", "Morte", "Potencial Reaproveitado", "passiva",
    "Uma vez por rodada, ao passar num teste de resistência, você ganha 2 PE temporários cumulativos, que somem no fim da cena.",
    "você ganha 3 PE temporários em vez de 2.", { limite: "1 vez por rodada", pagina: "117" });
  E("surtotemporal", "Morte", "Surto Temporal", "livre",
    "Uma vez por cena, durante o seu turno, você pode gastar 3 PE para realizar uma ação padrão adicional.",
    "em vez de uma vez por cena, você pode usar este poder uma vez por turno.",
    { custo: "3 PE", limite: "1 vez por cena", requisitos: { elementos: { Morte: 2 } }, pagina: "117" });

  // SANGUE
  E("anatomiainsana", "Sangue", "Anatomia Insana", "passiva",
    "Você tem 50% de chance (resultado par em 1d4) de ignorar o dano adicional de um acerto crítico ou ataque furtivo.",
    "você é imune aos efeitos de acertos críticos e ataques furtivos.", { requisitos: { elementos: { Sangue: 2 } }, pagina: "117" });
  E("armadesangue", "Sangue", "Arma de Sangue", "movimento",
    "Gaste uma ação de movimento e 2 PE para produzir garras, chifres ou uma lâmina de sangue: arma simples, corpo a corpo e leve, que não precisa empunhar, 1d6 de dano de Sangue. Uma vez por turno, ao agredir, gasta 1 PE para um ataque adicional com ela. Dura até o fim da cena.",
    "a arma vira parte permanente de você e causa 1d10 de dano de Sangue.", { custo: "2 PE", pagina: "117" });
  E("sangueferro", "Sangue", "Sangue de Ferro", "passiva",
    "Você recebe +2 PV por NEX. Ao subir de NEX, os PV deste poder aumentam de acordo (ex.: escolhido no NEX 50% dá 20 PV; ao chegar a 55%, +2 PV).",
    "você recebe +5 em Fortitude e se torna imune a venenos e doenças.",
    { efeitos: [{ tipo: "recurso", alvo: "pv", porNivel: 2 }], pagina: "117" });
  E("sanguefervente", "Sangue", "Sangue Fervente", "passiva",
    "Enquanto estiver machucado, você recebe +1 em Agilidade ou Força, à sua escolha (escolha sempre que o efeito ativar).",
    "o bônus em Agilidade ou Força aumenta para +2.", { requisitos: { elementos: { Sangue: 2 } }, pagina: "118" });
  E("sanguevivo", "Sangue", "Sangue Vivo", "passiva",
    "Na primeira vez que ficar machucado numa cena, você recebe cura acelerada 2. Nunca cura acima da metade dos PV máximos e termina no fim da cena ou ao perder a condição machucado.",
    "a cura acelerada aumenta para 5.", { requisitos: { elementos: { Sangue: 1 } }, pagina: "117" });
})();

function _contarParanormaisOP(elemento) {
  const alvo = String(elemento || "").toLowerCase();
  return (typeof poderes !== "undefined" ? poderes : []).filter(
    (p) => p.elementoPar && String(p.elementoPar).toLowerCase() === alvo,
  ).length;
}

function _afinidadeOP() {
  return typeof elementoNexOP === "string" && elementoNexOP ? elementoNexOP.toLowerCase() : "";
}

function _copiasParanormalOP(id, elemento) {
  return poderesDoCatalogoNaFichaOP().filter(
    (p) => p.origemCatalogo === id && (!elemento || String(p.elementoPar || "").toLowerCase() === String(elemento).toLowerCase()),
  ).length;
}

/* ---------- janela dos poderes paranormais ---------- */
function abrirParanormaisOP(manter) {
  if (!manter) _buscaParanormalOP = "";
  const lista = obterCatalogoOP().poderes.filter((p) => p.tipo === "paranormal" && _casaBuscaOP(p, _buscaParanormalOP));
  const afin = _afinidadeOP();
  const elementos = ["Conhecimento", "Energia", "Morte", "Sangue"];

  const cartao = (p) => {
    const idSeg = p.id.replace(/[^a-z0-9]/gi, "_");
    const el = p.elemento;
    const elLow = el.toLowerCase();
    const jaTem = !p.escolheElemento && !p.repetivel ? _copiasParanormalOP(p.id) : 0;
    const temAfin = !!afin && elLow === afin;
    const podeSegunda = !p.repetivel && !p.escolheElemento && jaTem === 1 && temAfin;
    const bloqueadoUnico = !p.repetivel && !p.escolheElemento && jaTem >= (temAfin ? 2 : 1);
    const falhas = verificarRequisitosOP(p);
    const req = _requisitosTextoOP(p);
    const bloqueado = bloqueadoUnico || (falhas.length > 0 && !podeSegunda);
    const tags = [
      el ? `<em class="cat-tag rit-el rit-el-${elLow}">${ICONE_ELEMENTO_PAR_OP[el] || ""} ${esc(el)}</em>` : `<em class="cat-tag">Qualquer elemento</em>`,
      p.ativacao ? `<em class="cat-tag">${esc(_nomeAtivacaoOP(p.ativacao))}</em>` : "",
      p.custo ? `<em class="cat-tag">${esc(p.custo)}</em>` : "",
      (p.efeitos || []).some((e) => e.tipo === "recurso") ? `<em class="cat-tag auto">⚙ automático</em>` : "",
    ].join("");

    const seletor = p.escolheElemento
      ? `<select id="parEl_${idSeg}" class="rit-sel">${elementos.map((e) => `<option value="${e}">${e}</option>`).join("")}</select>`
      : "";

    let botao;
    if (bloqueadoUnico) botao = `<div class="cat-estado">✔ Já adquirido${temAfin ? " (com afinidade)" : ""}</div>`;
    else if (podeSegunda) botao = `<button type="button" class="cat-add" onclick="adquirirParanormalOP('${esc(p.id)}', true)">Adquirir 2ª vez (afinidade)</button>`;
    else if (falhas.length) botao = `<div class="cat-estado falta">Falta: ${esc(falhas.join(", "))}</div><button type="button" class="cat-add" disabled>Adquirir</button>`;
    else botao = `<div class="rit-acoes">${seletor}<button type="button" class="cat-add" onclick="adquirirParanormalOP('${esc(p.id)}', false)">Adquirir</button></div>`;

    return `
      <div class="cat-item ${bloqueado ? "bloqueado" : ""}">
        <div class="cat-topo"><strong>${esc(p.nome)}</strong><span class="cat-tags">${tags}</span></div>
        ${req ? `<div class="cat-req">Pré-requisitos: ${esc(req)}</div>` : ""}
        <p class="cat-resumo">${esc(p.resumo)}</p>
        ${p.afinidade ? `<p class="cat-resumo"><b>Afinidade:</b> ${esc(p.afinidade)}</p>` : ""}
        ${botao}
      </div>`;
  };

  const grupo = (titulo, itens) =>
    itens.length ? `<div class="rit-circ-titulo"><span>${titulo}</span></div>${itens.map(cartao).join("")}` : "";

  const html = `
    <div class="popup-bloco">
      <p class="bp-dica">Poderes paranormais vêm do poder <b>Transcender</b> (ou do ritual de conexão na regra de nível separado). Sempre que transcende você <b>não recebe a Sanidade</b> daquele aumento de NEX. Qualquer classe pode escolher.</p>
      <div class="rit-regra">
        <label for="afinidadeParSelOP">Afinidade elemental</label>
        <select id="afinidadeParSelOP" onchange="mudarAfinidadeParOP(this.value)">
          <option value="">Ainda sem afinidade</option>
          ${elementos.map((e) => `<option value="${e.toLowerCase()}" ${afin === e.toLowerCase() ? "selected" : ""}>${e}</option>`).join("")}
        </select>
        <small class="evo-dica">Com afinidade você pode escolher poderes do seu elemento uma 2ª vez para receber o benefício de "Afinidade". A afinidade vem no NEX 50%, na primeira vez que transcende.</small>
      </div>
      <input id="buscaParOP" class="rit-busca" type="search" placeholder="Buscar poder paranormal…" value="${esc(_buscaParanormalOP)}" oninput="buscarCatalogoOP(this.value, true)" />
      ${!lista.length ? `<p class="bp-dica">Nenhum poder encontrado.</p>` : ""}
      <div class="cat-lista">
        ${grupo("Gerais", lista.filter((p) => !p.elemento))}
        ${elementos.map((e) => grupo(`${ICONE_ELEMENTO_PAR_OP[e]} ${e}`, lista.filter((p) => p.elemento === e))).join("")}
      </div>
      <small class="evo-dica">Livro de Regras, p. 114 a 118. Descrições condensadas: o texto completo está no livro.</small>
    </div>`;
  abrirPopup("Poderes paranormais", html, true);
}

const ICONE_ELEMENTO_PAR_OP = { Sangue: "🩸", Morte: "💀", Conhecimento: "📘", Energia: "⚡" };

function mudarAfinidadeParOP(v) {
  if (typeof aoMudarElementoNexOP === "function") aoMudarElementoNexOP(v);
  else { elementoNexOP = v; salvarTudo(); }
  abrirParanormaisOP(true);
}

async function adquirirParanormalOP(id, segunda) {
  const item = obterCatalogoOP().poderes.find((p) => p.id === id);
  if (!item) return;

  let elemento = item.elemento;
  if (item.escolheElemento) {
    const sel = document.getElementById("parEl_" + id.replace(/[^a-z0-9]/gi, "_"));
    elemento = sel ? sel.value : "Sangue";
    if (_copiasParanormalOP(id, elemento) >= 1) { alertBonito(`Você já tem Resistir a ${elemento}.`); return; }
  }

  const falhas = verificarRequisitosOP(item);
  if (falhas.length && !segunda) { alertBonito(`Requisitos não cumpridos: ${falhas.join(", ")}.`); return; }

  const base = _poderDaFichaOP(item, { elementoPar: elemento || "", afinidadeSegundo: !!segunda });
  if (item.escolheElemento) {
    base.nome = `Resistir a ${elemento}`;
    base.desc = `Você recebe resistência 10 contra ${elemento}. Conta como poder de ${elemento}.\nAfinidade: ${item.afinidade}\n\n📖 Livro de Regras, p. ${item.pagina}`;
    base.elementoPar = elemento;
  }
  if (segunda) {
    base.nome = `${item.nome} (afinidade)`;
    base.desc = `Benefício de afinidade (${item.elemento}): ${item.afinidade}\n\n📖 Livro de Regras, p. ${item.pagina}`;
  }

  poderes.push(base);
  if (typeof renderPoderes === "function") renderPoderes();
  if (typeof aplicarRecursosAutomaticosOP === "function") aplicarRecursosAutomaticosOP();
  if (typeof atualizarResumoAutoOP === "function") atualizarResumoAutoOP();
  salvarTudo();

  if (item.abreGrimorio && typeof abrirGrimorioOP === "function") abrirGrimorioOP();
  else abrirParanormaisOP(true);
}

/* =====================================================================
   PODERES GERAIS (Sobrevivendo ao Horror v1.3-1, p. 33-36)
   Acessíveis a todas as classes: sempre que puder escolher um poder de
   classe, pode escolher um poder geral no lugar. Artista Marcial, Combater
   com Duas Armas, Saque Rápido e Tiro Certeiro também são considerados
   gerais. Efeito {tipo:"treino"}: treina a perícia ou, se já treinada, +2.
   ===================================================================== */
(function () {
  const G = (id, nome, pagina, ativacao, resumo, extra = {}) =>
    CATALOGO_OP_PADRAO.poderes.push({
      id: "ger." + id, classe: "geral", tipo: "geral", nome, fonte: "sah", pagina, ativacao, resumo, efeitos: [], ...extra,
    });
  const tr = (pericia) => ({ tipo: "treino", pericia });
  const attr = (a, v) => ({ requisitos: { atributos: { [a]: v } } });
  const comTreino = (pericia, extra = {}) => ({ efeitos: [tr(pericia)], ...extra });

  G("acrobatico", "Acrobático", "33", "passiva",
    "Treino em Acrobacia (ou +2 se já treinado). Terreno difícil não reduz seu deslocamento nem impede investidas.",
    comTreino("Acrobacia", attr("agilidade", 2)));
  G("asdovolante", "Ás do Volante", "33", "passiva",
    "Treino em Pilotagem (ou +2). Uma vez por rodada, quando um veículo que você pilota sofre dano, faça teste de Pilotagem (DT = ataque ou DT do efeito); se passar, evita o dano.",
    comTreino("Pilotagem", { ...attr("agilidade", 2), limite: "1 vez por rodada" }));
  G("atletico", "Atlético", "33", "passiva",
    "Treino em Atletismo (ou +2) e +3m de deslocamento.",
    comTreino("Atletismo", attr("forca", 2)));
  G("atraente", "Atraente", "33", "passiva",
    "+5 em Artes, Diplomacia, Enganação e Intimidação contra pessoas que possam se sentir fisicamente atraídas por você.",
    attr("presenca", 2));
  G("dedosageis", "Dedos Ágeis", "33", "passiva",
    "Treino em Crime (ou +2). Arromba com ação padrão, furta com ação livre (uma vez por rodada) e sabota com ação completa.",
    comTreino("Crime", attr("agilidade", 2)));
  G("detectormentiras", "Detector de Mentiras", "33", "passiva",
    "Treino em Intuição (ou +2). Outros seres sofrem -10 em testes de Enganação para mentir para você.",
    comTreino("Intuição", attr("presenca", 2)));
  G("especemergencias", "Especialista em Emergências", "33", "passiva",
    "Treino em Medicina (ou +2). Aplica cicatrizantes e medicamentos como ação de movimento e, uma vez por rodada, saca um desses itens como ação livre.",
    comTreino("Medicina", attr("intelecto", 2)));
  G("estigmado", "Estigmado", "33", "passiva",
    "Ao sofrer dano mental de efeitos de medo, pode converter esse dano em perda de PV (5 de dano mental vira 5 PV perdidos).");
  G("focopericia", "Foco em Perícia", "33", "passiva",
    "Escolha uma perícia (exceto Luta e Pontaria): ao fazer teste dela, você rola +1 dado. Pode escolher várias vezes, para perícias diferentes.",
    { repetivel: true, escolhePericia: true });
  G("inventarioorganizado", "Inventário Organizado", "33", "passiva",
    "Soma o Intelecto ao limite de espaços que pode carregar. Itens que ocupam 0,5 espaço passam a ocupar 0,25.",
    { ...attr("intelecto", 2), efeitos: [{ tipo: "manual", texto: "Soma o Intelecto ao limite de espaços (ajuste no inventário)" }] });
  G("informado", "Informado", "34", "passiva",
    "Treino em Atualidades (ou +2). Pode usar Atualidades no lugar de qualquer outra perícia em testes envolvendo informações, desde que o mestre aprove.",
    comTreino("Atualidades", attr("intelecto", 2)));
  G("interrogador", "Interrogador", "34", "padrao",
    "Treino em Intimidação (ou +2). Faz testes de Intimidação para coagir como ação padrão, mas só uma vez por cena contra a mesma pessoa.",
    comTreino("Intimidação", attr("forca", 2)));
  G("mentirosonato", "Mentiroso Nato", "34", "passiva",
    "Treino em Enganação (ou +2). A penalidade por mentiras muito implausíveis diminui para -1 dado.",
    comTreino("Enganação", attr("presenca", 2)));
  G("observador", "Observador", "34", "passiva",
    "Treino em Investigação (ou +2) e soma o Intelecto em Intuição.",
    comTreino("Investigação", attr("intelecto", 2)));
  G("paidepet", "Pai de Pet", "34", "passiva",
    "Treino em Adestramento (ou +2). Possui um animal de estimação, aliado que fornece +2 em duas perícias à sua escolha (exceto Luta e Pontaria; mestre aprova).",
    comTreino("Adestramento", attr("presenca", 2)));
  G("palavrasdevocao", "Palavras de Devoção", "35", "completa",
    "Treino em Religião (ou +2). Uma vez por cena, gasta 3 PE e uma ação completa para orar por um número de pessoas até o dobro da sua Presença: até o fim da cena, resistência a dano mental 5.",
    comTreino("Religião", { ...attr("presenca", 2), custo: "3 PE", limite: "1 vez por cena" }));
  G("parceiro", "Parceiro", "35", "especial",
    "Você tem um parceiro, pessoa que o acompanha e ajuda em missões (aliado de um tipo à sua escolha, OPRPG p. 171). Se perder o aliado, gasta uma folga da Ordem para receber outro.",
    { requisitos: { nexMin: 30, periciasAll: ["Diplomacia"] } });
  G("pensamentotatico", "Pensamento Tático", "35", "passiva",
    "Treino em Tática (ou +2). Ao passar em Tática para analisar terreno, você e aliados em alcance médio ganham uma ação de movimento adicional na primeira rodada do próximo combate nesse terreno (até o fim do dia).",
    comTreino("Tática", attr("intelecto", 2)));
  G("personalidadeesoterica", "Personalidade Esotérica", "35", "passiva",
    "Recebe +3 PE e treino em Ocultismo (ou +2 se já treinado).",
    { ...attr("intelecto", 2), efeitos: [{ tipo: "recurso", alvo: "pe", valor: 3 }, tr("Ocultismo")] });
  G("persuasivo", "Persuasivo", "35", "passiva",
    "Treino em Diplomacia (ou +2). Ao persuadir, a penalidade por pedir coisas custosas ou perigosas diminui em 5.",
    comTreino("Diplomacia", attr("presenca", 2)));
  G("pesquisadorcientifico", "Pesquisador Científico", "35", "passiva",
    "Treino em Ciências (ou +2). Pode usar Ciências no lugar de Ocultismo (identificar criaturas) e de Sobrevivência (identificar animais).",
    comTreino("Ciências", attr("intelecto", 2)));
  G("proativo", "Proativo", "35", "passiva",
    "Treino em Iniciativa (ou +2). Ao rolar 19 ou 20 em pelo menos um dado de Iniciativa, recebe uma ação padrão adicional no primeiro turno.",
    comTreino("Iniciativa", attr("agilidade", 2)));
  G("provisoesemergencia", "Provisões de Emergência", "35", "especial",
    "Tem um esconderijo com equipamentos. Uma vez por missão, usa uma ação de interlúdio para recuperar o conteúdo e recebe equipamentos equivalentes à sua patente (como uma nova fase de preparação).",
    { limite: "1 vez por missão" });
  G("racionalidadeinflexivel", "Racionalidade Inflexível", "35", "passiva",
    "Pode usar Intelecto no lugar de Presença como atributo-chave de Vontade e para calcular seus PE.",
    { ...attr("intelecto", 3), efeitos: [{ tipo: "manual", texto: "Cálculo de PE e Vontade com Intelecto no lugar de Presença (ajuste na ficha)" }] });
  G("ratocomputador", "Rato de Computador", "36", "passiva",
    "Treino em Tecnologia (ou +2). Hackeia, localiza arquivo ou opera dispositivo como ação completa e, uma vez por cena de investigação com computador, faz teste de Tecnologia para procurar pistas sem gastar rodada de investigação.",
    comTreino("Tecnologia", attr("intelecto", 2)));
  G("respostarapida", "Resposta Rápida", "36", "reacao",
    "Treino em Reflexos (ou +2). Ao falhar em Percepção para evitar ficar desprevenido, gasta 2 PE para rolar de novo usando Reflexos.",
    comTreino("Reflexos", { ...attr("agilidade", 2), custo: "2 PE" }));
  G("talentoso", "Talentoso", "36", "passiva",
    "Treino em Artes (ou +2). Em teste de Artes para impressionar, o bônus em perícias aumenta em +1 para cada 5 pontos que o resultado passar a DT.",
    comTreino("Artes", attr("presenca", 2)));
  G("teimosiaobstinada", "Teimosia Obstinada", "36", "reacao",
    "Treino em Vontade (ou +2). Em teste de Vontade contra efeito que cause condição mental ou mude sua atitude (como Enfeitiçar), gasta 2 PE para +5 no teste.",
    comTreino("Vontade", { ...attr("presenca", 2), custo: "2 PE" }));
  G("tenacidade", "Tenacidade", "36", "livre",
    "Treino em Fortitude (ou +2). Morrendo mas consciente (1+ PV), faz teste de Fortitude (DT 20 +10 por teste anterior na cena) como ação livre; se passar, encerra a condição morrendo.",
    comTreino("Fortitude", attr("vigor", 2)));
  G("sentidosagucados", "Sentidos Aguçados", "36", "passiva",
    "Treino em Percepção (ou +2). Não fica desprevenido contra inimigos que não pode ver e, ao errar ataque por camuflagem, rola de novo o dado de chance de falha.",
    comTreino("Percepção", attr("presenca", 2)));
  G("sobrevivencialista", "Sobrevivencialista", "36", "passiva",
    "Treino em Sobrevivência (ou +2), +2 em testes para resistir a clima, e terreno difícil natural não reduz deslocamento nem impede investidas.",
    comTreino("Sobrevivência", attr("intelecto", 2)));
  G("sorrateiro", "Sorrateiro", "36", "passiva",
    "Treino em Furtividade (ou +2). Sem penalidade por se mover normalmente furtivo nem por seguir alguém em ambientes sem esconderijo ou movimento.",
    comTreino("Furtividade", attr("agilidade", 2)));
  G("vitalidadereforcada", "Vitalidade Reforçada", "36", "passiva",
    "Recebe +1 PV para cada 5% de NEX (ou cada nível, na regra de nível de experiência) e +2 em Fortitude.",
    { ...attr("vigor", 2), efeitos: [{ tipo: "recurso", alvo: "pv", porNivel: 1 }, { tipo: "manual", texto: "+2 em Fortitude: use o bônus personalizado da perícia" }] });
  G("vontadeinabalavel", "Vontade Inabalável", "36", "passiva",
    "Recebe +1 PE para cada 10% de NEX (ou cada 2 níveis) e +2 em Vontade.",
    { ...attr("presenca", 2), efeitos: [{ tipo: "recurso", alvo: "pe", cadaNiveis: 2, porCada: 1 }, { tipo: "manual", texto: "+2 em Vontade: use o bônus personalizado da perícia" }] });
})();

/* aplica / desfaz o treino dado por poderes gerais (treinar, ou +2 se já treinado) */
function aplicarTreinoPoderOP(item, poder) {
  const ef = (item.efeitos || []).find((e) => e.tipo === "treino");
  const nome = poder.perciaEscolhida || ef?.pericia;
  if (!nome || typeof profs === "undefined") return;
  if ((profs[nome] || 0) >= 1) {
    if (typeof bonusPericiasOP !== "undefined") bonusPericiasOP[nome] = (Number(bonusPericiasOP[nome]) || 0) + 2;
    poder.treinoAplicado = { pericia: nome, modo: "bonus" };
  } else {
    profs[nome] = 1;
    poder.treinoAplicado = { pericia: nome, modo: "treino" };
  }
}

function reverterTreinoPoderOP(poder) {
  const t = poder && poder.treinoAplicado;
  if (!t || typeof profs === "undefined") return;
  if (t.modo === "bonus" && typeof bonusPericiasOP !== "undefined") {
    const v = (Number(bonusPericiasOP[t.pericia]) || 0) - 2;
    if (v === 0) delete bonusPericiasOP[t.pericia]; else bonusPericiasOP[t.pericia] = v;
  } else if (t.modo === "treino" && (profs[t.pericia] || 0) === 1) {
    profs[t.pericia] = 0;
  }
}

function _iniciarCatalogoOP() {
  montarSeletorTrilhaOP();
  montarBarraCatalogoOP();
  document.getElementById("classeOP")?.addEventListener("change", () => {
    const t = buscarTrilhaOP(trilhaOP);
    const classe = document.getElementById("classeOP")?.value || "";
    if (t && t.classe !== classe) {
      trilhaOP = "";
      sincronizarTrilhaOP();
    }
    atualizarSeletorTrilhaOP();
    atualizarContadorPoderesClasseOP();
  });
}

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", () => setTimeout(_iniciarCatalogoOP, 0));
else setTimeout(_iniciarCatalogoOP, 0);
