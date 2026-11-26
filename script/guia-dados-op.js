/* =====================================================================
   guia-dados-op.js  ·  DADOS do guia de perícias e do guia de cenas
   ---------------------------------------------------------------------
   Aqui só tem texto/dados. A tela que mostra isso está em guia-op.js.
   Resumido com palavras próprias a partir do Livro de Regras (cap. 2 e 4).

   COMO ADICIONAR USOS DOS SUPLEMENTOS (AS etc.)
   Em qualquer lugar DEPOIS deste arquivo (ou no fim dele, na seção
   "SUPLEMENTOS" mais abaixo), chame:

     registrarUsosPericiaOP("Investigação", "Nome do suplemento", [
       { nome: "Nome do uso", req: 0, dt: "DT 20", acao: "Ação completa",
         cenas: ["I"], desc: "O que o uso faz, em uma ou duas frases." }
     ]);

   Campos de cada uso:
     nome   texto                      (obrigatório)
     req    0 = qualquer um, 1 = Treinado, 2 = Veterano, 3 = Expert
     dt     texto livre ("DT 15", "oposto a Vontade", "—")
     acao   quanto tempo gasta ("Ação padrão", "Reação", "1 minuto"…)
     cenas  lista com: "C" combate, "I" investigação, "L" interlúdio,
            "G" qualquer hora / fora de cena
     desc   explicação curta
   ===================================================================== */

/* req: 0 livre · 1 Treinado · 2 Veterano · 3 Expert
   cenas: C combate · I investigação · L interlúdio · G geral */
const USOS_PERICIAS_OP = {
  "Acrobacia": {
    resumo: "Proezas acrobáticas: equilíbrio, quedas, escapar de amarras e se mover por onde os outros não passam.",
    usos: [
      { nome: "Amortecer queda", req: 2, dt: "DT 15", acao: "Reação", cenas: ["C", "G"], desc: "Ao cair, reduz o dano em 1d6, mais 1d6 para cada 5 pontos que o teste passar da DT. Se o dano zerar, você cai de pé." },
      { nome: "Equilíbrio", req: 0, dt: "DT 10 / 15 / 20", acao: "Ação de movimento", cenas: ["C", "G"], desc: "Andar em piso escorregadio (10), superfície estreita (15) ou muito estreita (20). Passou: avança metade do deslocamento (ou o total, com –1 dado no teste). Falhou por 5+: cai. Você fica desprevenido enquanto se equilibra." },
      { nome: "Escapar", req: 0, dt: "Agi de quem amarrou +10 (corda) ou 30 (algemas)", acao: "Ação completa", cenas: ["G", "I"], desc: "Soltar-se de amarras." },
      { nome: "Levantar-se rapidamente", req: 1, dt: "DT 20", acao: "Ação de movimento", cenas: ["C"], desc: "Levanta do chão como ação livre se passar. Se falhar, gasta a ação e continua caído." },
      { nome: "Passar por espaço apertado", req: 1, dt: "DT 25", acao: "Ação completa", cenas: ["C", "I", "G"], desc: "Espremer-se por onde só a cabeça passaria, avançando metade do deslocamento." },
      { nome: "Passar por inimigo", req: 0, dt: "oposto: Acrobacia, Iniciativa ou Luta dele", acao: "Parte do movimento", cenas: ["C"], desc: "Atravessa o espaço ocupado por um inimigo. Falhou: não atravessa e a ação de movimento acaba." }
    ]
  },
  "Adestramento": {
    resumo: "Lidar com animais e montarias.",
    usos: [
      { nome: "Acalmar animal", req: 0, dt: "DT 25", acao: "Ação completa", cenas: ["C", "I", "G"], desc: "Acalma um animal nervoso ou agressivo (um cão de guarda, um touro furioso)." },
      { nome: "Cavalgar", req: 0, dt: "DT 15 / 20 em obstáculos", acao: "Parte do movimento", cenas: ["C", "G"], desc: "Montar como ação livre exige DT 20. Terreno plano não pede teste; obstáculos e terreno ruim pedem (15 ruim, 20 muito ruim). Falhou: cai e sofre 1d6." },
      { nome: "Galopar", req: 0, dt: "—", acao: "Ação completa", cenas: ["C"], desc: "A cavalo, avança em linha reta (quadrados de 1,5m) deslocamento + resultado do teste. Não funciona em terreno difícil." },
      { nome: "Manejar animal", req: 0, dt: "DT 15", acao: "Ação de movimento", cenas: ["C", "G"], desc: "Faz um animal cumprir uma tarefa que ele foi treinado para fazer. Serve também para conduzir carroças." }
    ]
  },
  "Artes": {
    resumo: "Expressão artística: música, dança, escrita, pintura, atuação.",
    usos: [
      { nome: "Impressionar", req: 0, dt: "oposto a Vontade do alvo", acao: "Minutos a horas", cenas: ["G"], desc: "Passou: +2 em testes de perícias de Presença contra essa pessoa na cena. Falhou: –2 e não pode tentar de novo na cena. Com plateia, o mestre faz um teste só, pelo melhor bônus." }
    ]
  },
  "Atletismo": {
    resumo: "Façanhas físicas: correr, escalar, nadar e saltar.",
    usos: [
      { nome: "Corrida", req: 0, dt: "—", acao: "Ação completa", cenas: ["C", "G"], desc: "Avança em linha reta: deslocamento + resultado do teste, em quadrados de 1,5m. Pode correr por tantas rodadas quanto seu Vigor; depois, Fortitude por rodada (DT 5 +5 por teste) ou fica fatigado." },
      { nome: "Escalar", req: 0, dt: "DT 10 / 15 / 20 / 25", acao: "Ação de movimento", cenas: ["C", "I", "G"], desc: "10 com apoios, 15 portão/árvore, 20 muro com reentrâncias, 25 parede lisa. Passou: avança metade do deslocamento (ou o total, com –1 dado no teste). Falhou por 5+: cai. Você fica desprevenido enquanto escala." },
      { nome: "Natação", req: 0, dt: "DT 10 / 15 / 20+", acao: "Ação de movimento", cenas: ["C", "G"], desc: "Um teste por rodada na água: calma 10, agitada 15, tempestuosa 20+. Falhou por 5+: afunda. Submerso, prende o fôlego por rodadas iguais ao Vigor." },
      { nome: "Saltar", req: 0, dt: "5 por quadrado (longo) · 15 por quadrado (altura)", acao: "Parte do movimento", cenas: ["C", "G"], desc: "Longo: DT 10 para 3m, 15 para 4,5m, 20 para 6m. Altura: DT 30 para 3m. Sem 6m de corrida, DT +5." }
    ]
  },
  "Atualidades": {
    resumo: "Conhecimento geral: política, esporte, entretenimento.",
    usos: [
      { nome: "Responder dúvidas", req: 0, dt: "DT 15 / 20 / 25", acao: "—", cenas: ["I", "G"], desc: "15 informação comum, 20 específica, 25 quase desconhecida." }
    ]
  },
  "Ciências": {
    resumo: "Matemática, física, química, biologia e outros campos científicos.",
    usos: [
      { nome: "Responder dúvidas", req: 0, dt: "sem teste / DT 20 / DT 30", acao: "—", cenas: ["I", "G"], desc: "Pergunta simples não exige teste. Complexa: DT 20. Campo experimental (ex.: avaliar uma liga recém-criada): DT 30." }
    ]
  },
  "Crime": {
    resumo: "Atividades ilícitas. Arrombar e sabotar pedem um kit; sem ele, –5 no teste.",
    usos: [
      { nome: "Arrombar", req: 0, dt: "DT 20 / 25 / 30", acao: "Ação completa", cenas: ["I", "G"], desc: "Abre fechadura: 20 comum, 25 reforçada, 30 avançada (cofre). Exige kit." },
      { nome: "Furto", req: 0, dt: "DT 20", acao: "Ação padrão", cenas: ["I", "G"], desc: "Pega (ou planta) um objeto de outra pessoa. A vítima faz Percepção contra o seu resultado; se passar, percebe a tentativa." },
      { nome: "Ocultar", req: 0, dt: "oposto a Percepção", acao: "Ação padrão", cenas: ["I", "G"], desc: "Esconde um objeto em você. Quem revistar ganha +10 na Percepção." },
      { nome: "Sabotar", req: 2, dt: "DT 20 simples · 30 complexa", acao: "1d4+1 ações completas", cenas: ["I", "C", "G"], desc: "Desabilita um dispositivo. Dá para fazer em uma ação completa com –1 dado. Falhou por 5+: algo dá errado. Exige kit." }
    ]
  },
  "Diplomacia": {
    resumo: "Convencer com lábia e argumentos.",
    usos: [
      { nome: "Acalmar", req: 1, dt: "DT 20 (+5 por vez na cena)", acao: "Ação padrão", cenas: ["C", "I"], desc: "Estabiliza alguém adjacente que esteja enlouquecendo: fica com Sanidade 1." },
      { nome: "Mudar atitude", req: 0, dt: "oposto a Vontade do alvo", acao: "1 minuto", cenas: ["I", "G"], desc: "Sobe ou desce a atitude de um NPC em uma categoria (duas se passar por 10+). Falhou por 5+: vai na direção oposta. Uma vez por dia por pessoa. Em ação completa, com –2 dados, serve para evitar uma briga." },
      { nome: "Persuasão", req: 0, dt: "DT 20", acao: "1 minuto ou mais", cenas: ["I", "G"], desc: "Convence alguém a fazer algo. Se for custoso: –5; se for perigoso: –10 ou falha automática. O mestre pode pedir teste oposto de Vontade." }
    ]
  },
  "Enganação": {
    resumo: "Blefes, mentiras e trapaças.",
    usos: [
      { nome: "Disfarce", req: 1, dt: "oposto a Percepção", acao: "10 minutos+", cenas: ["I", "G"], desc: "Muda sua aparência (ou a de outra pessoa). Quem conhece a pessoa imitada ganha +10. Exige kit, senão –5." },
      { nome: "Falsificação", req: 2, dt: "oposto a Percepção", acao: "—", cenas: ["I", "G"], desc: "Falsifica um documento. Documento complexo ou com assinatura/carimbo específico: –2 dados no teste." },
      { nome: "Fintar", req: 1, dt: "oposto a Reflexos", acao: "Ação padrão", cenas: ["C"], desc: "Contra um ser em alcance curto. Passou: ele fica desprevenido contra seu próximo ataque, até o fim do seu próximo turno." },
      { nome: "Insinuação", req: 0, dt: "DT 20", acao: "—", cenas: ["I", "G"], desc: "Passa uma mensagem velada. Falhou por 5+: o receptor entende outra coisa. Quem passar em Intuição oposta entende também." },
      { nome: "Intriga", req: 0, dt: "DT 20 (30 se improvável)", acao: "1 dia+", cenas: ["G"], desc: "Espalha uma fofoca. Alguém pode investigar a origem com Investigação contra o seu resultado." },
      { nome: "Mentir", req: 0, dt: "oposto a Intuição", acao: "—", cenas: ["I", "G"], desc: "Faz alguém acreditar numa mentira. Mentira muito implausível: –2 dados no teste." }
    ]
  },
  "Fortitude": {
    resumo: "Resistência física: doenças, venenos, dano massivo e fôlego.",
    usos: [
      { nome: "Resistir a efeitos", req: 0, dt: "definida pelo efeito", acao: "Reação", cenas: ["C", "G"], desc: "Teste de resistência contra doenças, venenos e outros efeitos que exigem vitalidade." },
      { nome: "Dano massivo", req: 0, dt: "DT 15 +2 por 10 de dano", acao: "Reação", cenas: ["C"], desc: "Se sofrer de uma vez dano igual ou maior que metade dos seus PV totais sem cair a 0, teste de Fortitude. Falhou: cai a 0 PV." },
      { nome: "Fôlego", req: 0, dt: "DT 5 +5 por teste anterior", acao: "—", cenas: ["C", "G"], desc: "Depois de correr ou ficar sem respirar por rodadas iguais ao Vigor, um teste por rodada." },
      { nome: "Bloqueio", req: 1, dt: "—", acao: "Reação (1 por rodada)", cenas: ["C"], desc: "Se for treinado: contra um ataque corpo a corpo, ganha RD igual ao bônus de Fortitude contra esse ataque. Declare antes de o inimigo rolar." }
    ]
  },
  "Furtividade": {
    resumo: "Ser discreto e sorrateiro.",
    usos: [
      { nome: "Esconder-se", req: 0, dt: "oposto a Percepção de quem puder notar", acao: "Ação livre, no fim do turno", cenas: ["C", "I", "G"], desc: "Só se terminar o turno num lugar onde dê para se esconder. Quem falhar não percebe você (camuflagem total). Se se moveu, –1 dado (ande só metade do deslocamento para evitar). Se atacou ou fez algo chamativo, –3 dados." },
      { nome: "Seguir", req: 0, dt: "oposto a Percepção de quem é seguido", acao: "—", cenas: ["I", "G"], desc: "Segue alguém sem ser notado. –5 em lugar sem esconderijo; a vítima ganha +5 se estiver tomando cuidado." }
    ]
  },
  "Iniciativa": {
    resumo: "Velocidade de reação. É o primeiro teste de toda cena de combate.",
    usos: [
      { nome: "Rolar iniciativa", req: 0, dt: "—", acao: "Início do combate", cenas: ["C"], desc: "No começo do combate todos rolam. Age primeiro quem tirou mais. A ordem fica fixa: não se rola de novo a cada rodada. Cena de investigação não usa iniciativa." }
    ]
  },
  "Intimidação": {
    resumo: "Assustar ou coagir. Todos os usos são efeito de medo.",
    usos: [
      { nome: "Assustar", req: 1, dt: "oposto a Vontade (alcance curto)", acao: "Ação padrão", cenas: ["C", "I"], desc: "Passou: o alvo fica abalado pelo resto da cena. Passou por 10+: apavorado por 1 rodada e depois abalado." },
      { nome: "Coagir", req: 0, dt: "oposto a Vontade (adjacente)", acao: "1 minuto+", cenas: ["I", "G"], desc: "Faz a pessoa obedecer uma ordem simples. Se for perigoso ou contra a natureza dela: +5 ou passa automático. A pessoa fica hostil contra você." }
    ]
  },
  "Intuição": {
    resumo: "Empatia e \"sexto sentido\".",
    usos: [
      { nome: "Perceber mentira", req: 0, dt: "oposto a Enganação", acao: "—", cenas: ["I", "G"], desc: "Descobre se alguém está mentindo." },
      { nome: "Pressentimento", req: 1, dt: "DT 20", acao: "—", cenas: ["I", "G"], desc: "Analisa uma pessoa (índole) ou uma situação (algo estranho?). Só diz SE há algo anormal; descobrir a causa é com Investigação." }
    ]
  },
  "Investigação": {
    resumo: "Descobrir pistas e informações.",
    usos: [
      { nome: "Interrogar", req: 0, dt: "sem teste / DT 20 / DT 30", acao: "1 hora a 1 dia", cenas: ["I", "G"], desc: "Perguntar ou ficar de ouvido atento num lugar movimentado. Info geral: sem teste. Restrita: 20. Confidencial ou arriscada: 30." },
      { nome: "Procurar", req: 0, dt: "DT 15 / 20 / 30", acao: "Ação completa a 1 dia", cenas: ["I", "G"], desc: "Examina um local. 15 item discreto ou no meio da bagunça, 20 item escondido, 30 muito bem escondido (passagem secreta, tinta invisível)." }
    ]
  },
  "Luta": {
    resumo: "Ataques corpo a corpo. A DT é a Defesa do alvo.",
    usos: [
      { nome: "Ataque corpo a corpo", req: 0, dt: "Defesa do alvo", acao: "Ação padrão", cenas: ["C"], desc: "Acertou: dano da arma + Força. Alcance 1,5m." },
      { nome: "Manobras de combate", req: 0, dt: "oposto: Luta do alvo", acao: "Ação padrão", cenas: ["C"], desc: "Troca um ataque por: agarrar, derrubar, desarmar, empurrar ou quebrar. Só corpo a corpo; o alvo usa o bônus de Luta mesmo com arma de distância." },
      { nome: "Contra-ataque", req: 1, dt: "—", acao: "Reação (1 por rodada)", cenas: ["C"], desc: "Se for treinado: quando um ataque corpo a corpo contra você erra, você ataca esse inimigo." },
      { nome: "Facilitar investigação", req: 0, dt: "DT 15 a 25", acao: "Ação de investigação", cenas: ["I"], desc: "Em investigação, Luta não ataca: serve para uma ideia que modifica a cena (ex.: quebrar as tábuas de uma janela). Passou: aliados ganham +2 no próximo Procurar Pistas." }
    ]
  },
  "Medicina": {
    resumo: "Tratar ferimentos, doenças e venenos. Pede um kit; sem ele –5. Em si mesmo: –5 também.",
    usos: [
      { nome: "Primeiros socorros", req: 0, dt: "DT 20 (+5 por vez na cena)", acao: "Ação padrão", cenas: ["C"], desc: "Alvo adjacente que esteja morrendo e inconsciente perde as duas condições e fica com 1 PV." },
      { nome: "Cuidados prolongados", req: 2, dt: "DT 20", acao: "Ação de interlúdio", cenas: ["L"], desc: "Trata até 1 ser por ponto de Intelecto. Passou: eles recuperam o dobro de PV pela ação dormir." },
      { nome: "Necropsia", req: 1, dt: "DT 20 (+10 se causa rara)", acao: "10 minutos", cenas: ["I"], desc: "Examina um cadáver para descobrir causa e hora aproximada da morte." },
      { nome: "Tratamento", req: 1, dt: "a DT da doença/veneno", acao: "Ação completa", cenas: ["C", "G"], desc: "Ajuda vítima de doença ou veneno contínuo: passou, o paciente ganha +5 no próximo Fortitude contra o efeito." },
      { nome: "Encerrar \"morrendo\"", req: 0, dt: "DT 20", acao: "—", cenas: ["C"], desc: "A condição morrendo só termina com um teste de Medicina DT 20 (ou efeitos específicos)." }
    ]
  },
  "Ocultismo": {
    resumo: "Estudo do paranormal. Não exige que você conjure rituais.",
    usos: [
      { nome: "Identificar criatura", req: 0, dt: "a DT de Presença Perturbadora da criatura", acao: "Ação completa", cenas: ["C", "I"], desc: "Descobre uma característica (poder, vulnerabilidade) e mais uma a cada 5 pontos acima da DT. Falhou por 5+: conclusão errada." },
      { nome: "Identificar item amaldiçoado", req: 0, dt: "DT 20", acao: "Ação de interlúdio", cenas: ["L", "I"], desc: "Descobre os poderes ou o ritual do item. Em ação completa, com –2 dados." },
      { nome: "Identificar ritual", req: 0, dt: "DT 10 +5 por círculo", acao: "Reação", cenas: ["C", "I"], desc: "Quando alguém conjura um ritual, você reconhece qual é pelos gestos, palavras e componentes." },
      { nome: "Informação", req: 0, dt: "sem teste / DT 20 / DT 30", acao: "—", cenas: ["I", "G"], desc: "Dúvidas sobre o Outro Lado, objetos amaldiçoados, runas, profecias. Mistérios e enigmas: 30." }
    ]
  },
  "Percepção": {
    resumo: "Notar coisas com os sentidos. Também é a reação para perceber ameaças.",
    usos: [
      { nome: "Observar", req: 0, dt: "DT 15 a 30", acao: "Reação / ação", cenas: ["C", "I", "G"], desc: "Vê coisas discretas ou escondidas. Contra alguém escondido, a DT é o resultado de Furtividade ou Crime dele. Ler lábios: DT 20." },
      { nome: "Ouvir", req: 0, dt: "DT 0 / 15 (+5 atrás de porta)", acao: "Reação / ação", cenas: ["C", "I", "G"], desc: "Conversa casual: DT 0. Sussurros: 15. Do outro lado de uma porta: +5. Dormindo: –2 dados (sucesso acorda). Ser que não pode ser visto: DT 20 ou +10 sobre a Furtividade dele." },
      { nome: "Perceber inimigos no começo do combate", req: 0, dt: "oposto a Furtividade deles", acao: "Reação", cenas: ["C"], desc: "O mestre pode pedir. Quem não perceber o inimigo começa o combate surpreendido (desprevenido e sem agir na 1ª rodada)." }
    ]
  },
  "Pilotagem": {
    resumo: "Veículos terrestres e aquáticos. Pilotar gasta uma ação de movimento por turno.",
    usos: [
      { nome: "Pilotar", req: 1, dt: "sem teste / DT 15 / DT 25", acao: "Ação de movimento", cenas: ["C", "G"], desc: "Situação comum não exige teste. Ruim (estrada de chão sem luz, chuva): 15 por turno. Terrível (terreno acidentado, tempestade): 25." },
      { nome: "Veículos aéreos", req: 2, dt: "—", acao: "—", cenas: ["G"], desc: "Só quem tem grau Veterano pode pilotar aviões e helicópteros." }
    ]
  },
  "Pontaria": {
    resumo: "Ataques à distância. A DT é a Defesa do alvo.",
    usos: [
      { nome: "Ataque à distância", req: 0, dt: "Defesa do alvo", acao: "Ação padrão", cenas: ["C"], desc: "Alvo que você veja, dentro do alcance (até o dobro, com –1 dado). Acertou: dano da arma. Atirar contra alvo em combate corpo a corpo: –1 dado no ataque." },
      { nome: "Mirar", req: 1, dt: "—", acao: "Ação de movimento", cenas: ["C"], desc: "Se for treinado: até o fim do próximo turno, anula o –1 dado de atirar contra alvo em combate corpo a corpo." }
    ]
  },
  "Profissão": {
    resumo: "Sua profissão específica (advogado, engenheiro, jornalista…). Combine com o mestre o que dá para fazer.",
    usos: [
      { nome: "Usos da profissão", req: 1, dt: "definida pelo mestre", acao: "—", cenas: ["I", "G"], desc: "Ex.: um advogado argumenta com a polícia; um administrador investiga documentos de uma empresa." },
      { nome: "Rendimento extra", req: 1, dt: "—", acao: "Início da missão", cenas: ["G"], desc: "Você começa cada missão com 1 item extra: categoria I se treinado, II se veterano, III se expert." }
    ]
  },
  "Reflexos": {
    resumo: "Reação rápida: armadilhas, explosões e evitar fintas.",
    usos: [
      { nome: "Resistir a efeitos", req: 0, dt: "definida pelo efeito", acao: "Reação", cenas: ["C", "G"], desc: "Escapar de explosões, armadilhas e outros perigos que exigem reação." },
      { nome: "Esquiva", req: 1, dt: "—", acao: "Reação (1 por rodada)", cenas: ["C"], desc: "Se for treinado: contra um ataque, soma o bônus de Reflexos na sua Defesa contra aquele ataque. Declare antes de o inimigo rolar." },
      { nome: "Evitar finta", req: 0, dt: "oposto a Enganação", acao: "Reação", cenas: ["C"], desc: "Teste que impede o inimigo de te deixar desprevenido." }
    ]
  },
  "Religião": {
    resumo: "Teologia e religiões do mundo.",
    usos: [
      { nome: "Acalmar", req: 0, dt: "DT 20", acao: "Ação padrão", cenas: ["C", "I"], desc: "Como o uso de Diplomacia: estabiliza alguém enlouquecendo." },
      { nome: "Informação", req: 0, dt: "DT 10 / 20 / 30", acao: "—", cenas: ["I", "G"], desc: "Mitos, profecias, relíquias sagradas. 10 simples, 20 complexa, 30 mistérios e enigmas." },
      { nome: "Rito", req: 2, dt: "DT 20", acao: "—", cenas: ["G"], desc: "Realiza uma cerimônia religiosa (batizado, casamento, funeral…)." }
    ]
  },
  "Sobrevivência": {
    resumo: "Se guiar nos ermos e evitar perigos da natureza.",
    usos: [
      { nome: "Acampamento", req: 1, dt: "DT 15 / 20 / 25", acao: "—", cenas: ["L"], desc: "Abrigo e comida nos ermos. 15 campo aberto, 20 mata fechada, 25 deserto/pântano/montanha (clima ruim: –5). Passou: o grupo pode usar alimentar-se e dormir mesmo ao relento." },
      { nome: "Identificar animal", req: 1, dt: "DT 20", acao: "Ação completa", cenas: ["I", "C"], desc: "Reconhece um animal exótico." },
      { nome: "Orientar-se", req: 0, dt: "DT 15 / 20 / 25", acao: "1 vez por dia", cenas: ["G"], desc: "Para avançar em regiões selvagens. Passou: avança o deslocamento normal. Falhou: metade. Falhou por 5+: se perde." },
      { nome: "Rastrear", req: 1, dt: "DT 15 / 20 / 25 (+1 por dia)", acao: "1 vez por dia", cenas: ["I", "G"], desc: "Seguir rastros: 15 grupo grande ou solo macio, 20 solo comum, 25 solo duro. Visibilidade ruim ou clima ruim: –1 dado. Seu deslocamento cai pela metade." }
    ]
  },
  "Tática": {
    resumo: "Educação militar.",
    usos: [
      { nome: "Analisar terreno", req: 0, dt: "DT 20", acao: "Ação de movimento", cenas: ["C"], desc: "Observa o campo de batalha. Passou: descobre uma vantagem (cobertura, camuflagem, terreno elevado), se houver." },
      { nome: "Plano de ação", req: 2, dt: "DT 20", acao: "Ação padrão", cenas: ["C"], desc: "Orienta um aliado em alcance médio. Passou: +5 na Iniciativa dele (e ele pode passar a agir logo depois de você)." }
    ]
  },
  "Tecnologia": {
    resumo: "Eletrônica e informática avançadas. Uso do dia a dia não exige teste nem treino.",
    usos: [
      { nome: "Hackear", req: 0, dt: "DT 15 / 20 / 25", acao: "1d4+1 ações completas", cenas: ["I", "G"], desc: "Invade computador: 15 pessoal, 20 rede profissional, 25 servidor corporativo/militar. Em ação completa, com –1 dado. Falhou: só tenta de novo com informação nova. Falhou por 5+: pode ser rastreado." },
      { nome: "Localizar arquivo", req: 0, dt: "DT 15 / 20 / 25", acao: "1 a 1d6+2 ações completas", cenas: ["I"], desc: "Procura um arquivo em sistema que você já acessa. Para info pública na internet, use Investigação." },
      { nome: "Operar dispositivo", req: 0, dt: "DT 15 / 20 / 25", acao: "1d4+1 ações completas", cenas: ["I", "G"], desc: "Câmeras remotas, fechaduras eletrônicas, alarmes. Exige kit; sem ele, –5. Em ação completa, com –1 dado." },
      { nome: "Falsificação (eletrônica)", req: 2, dt: "oposto a Percepção", acao: "—", cenas: ["I", "G"], desc: "Como a de Enganação, mas só para documentos eletrônicos." }
    ]
  },
  "Vontade": {
    resumo: "Determinação mental: resistir a medo, intimidação e rituais que afetam a mente.",
    usos: [
      { nome: "Resistir a efeitos", req: 0, dt: "definida pelo efeito", acao: "Reação", cenas: ["C", "I", "G"], desc: "Teste de resistência contra efeitos mentais." },
      { nome: "Conjurar em condição adversa", req: 0, dt: "ver cap. de Rituais", acao: "—", cenas: ["C"], desc: "Usada para conjurar rituais quando a situação atrapalha." }
    ]
  }
};

/* Atributo-base e outros metadados de apoio não ficam aqui (vêm do script.js). */

/* ---------------------------------------------------------------------
   CENAS
   Cada cena tem: id, nome, icone, resumo, tags (rótulos rápidos),
   blocos[] com {titulo, itens:[{nome, texto}]} (cada bloco é uma sanfona).
   --------------------------------------------------------------------- */
const CENAS_OP = [
  {
    id: "investigacao",
    nome: "Investigação",
    icone: "lupa",
    resumo: "Você descobre PISTAS. Ninguém ataca, ninguém rola iniciativa. Cada jogador tem uma ação por turno e o tempo é limitado (urgência).",
    tags: ["Sem iniciativa", "1 ação por turno", "Tempo limitado"],
    blocos: [
      {
        titulo: "Como funciona",
        aberto: true,
        itens: [
          { nome: "Início", texto: "O mestre avisa que a cena começou, descreve o lugar e anuncia a PISTA BÁSICA. Nada de iniciativa." },
          { nome: "Rodadas", texto: "Cada rodada é um tempo abstrato: de segundos a horas, o mestre decide. Serve só para dividir a vez entre todos." },
          { nome: "Seu turno", texto: "Você faz UMA ação de investigação (abaixo). Não existe ação padrão + movimento aqui." },
          { nome: "Pontos de interesse", texto: "O mestre cita os pontos de interesse da cena. Você escolhe um, diz o que quer fazer e com qual perícia. Se a perícia serve naquele ponto, o mestre revela o que você achou. Se não serve, você perde a ação do turno." },
          { nome: "Fim", texto: "A cena acaba quando as pistas acabam ou quando a urgência estoura (acabaram as rodadas). Pode haver uma penalidade para quem não terminou a tempo." }
        ]
      },
      {
        titulo: "Ações de investigação",
        aberto: true,
        itens: [
          { nome: "Procurar pistas", texto: "Escolha UMA perícia sua e descreva como vai usá-la (Diplomacia para falar com uma testemunha, Tecnologia para mexer em um computador…). O mestre define a DT pela dificuldade e pela sua descrição." },
          { nome: "Facilitar investigação", texto: "Em vez de buscar pista, você faz algo que muda a cena a favor do grupo (abrir as janelas do galpão com Atletismo para iluminar). DT 15 se a ideia faz sentido, até 25 se for abstrata. Passou: cada aliado ganha +2 no próximo teste de procurar pistas da cena (não acumula)." },
          { nome: "Usar habilidade ou item", texto: "Algumas habilidades e itens têm efeito próprio na investigação. Também vale usar de forma criativa (machado para quebrar tábuas = teste de Luta para facilitar). Habilidade sem bônus, mas que ajuda a ideia, pode dar +5. O mestre tem a palavra final." },
          { nome: "Ajudar", texto: "Você gasta sua ação para ajudar o teste de outro personagem (regra normal de ajudar)." }
        ]
      },
      {
        titulo: "DTs de procurar pistas",
        itens: [
          { nome: "DT 15", texto: "Ação simples e adequada à perícia." },
          { nome: "DT 20", texto: "Plausível, mas complexa (interrogar testemunha pouco interessada)." },
          { nome: "DT 25 ou mais", texto: "Tarefa complexa ou descrição vaga (usar Percepção só para \"procurar algo estranho\")." },
          { nome: "Absurdo", texto: "Ideia sem chance de dar certo: o mestre só narra o fracasso, sem teste, e você perde a ação." }
        ]
      },
      {
        titulo: "Urgência (quantas rodadas o grupo tem)",
        itens: [
          { nome: "Muito baixo", texto: "6 rodadas" },
          { nome: "Baixo", texto: "5 rodadas" },
          { nome: "Médio", texto: "4 rodadas" },
          { nome: "Alto", texto: "3 rodadas" },
          { nome: "Muito alto", texto: "2 rodadas" },
          { nome: "Pressão extra", texto: "O mestre pode decidir que a cada 3 falhas em procurar pistas some 1 rodada." }
        ]
      },
      {
        titulo: "Pistas",
        itens: [
          { nome: "Pista básica", texto: "Todo grupo recebe de graça no início da cena. Guia a cena, mas revela pouco sobre o mistério." },
          { nome: "Pistas complementares", texto: "Precisam ser descobertas nos testes. Você pode terminar a cena sem achar todas se falhar demais." },
          { nome: "Ficha de investigação", texto: "Anotem as pistas na ficha do grupo: só o que estiver nela vale na Conclusão do Caso." }
        ]
      },
      {
        titulo: "O que NÃO existe nessa cena",
        itens: [
          { nome: "Sem combate", texto: "Não se rola iniciativa e não se ataca. Se um monstro aparecer, o mestre encerra a investigação e começa uma cena de combate." },
          { nome: "Sem movimento detalhado", texto: "Nada de deslocamento em metros, ação padrão + ação de movimento, ações livres e reações do combate." }
        ]
      }
    ]
  },
  {
    id: "combate",
    nome: "Combate",
    icone: "espadas",
    resumo: "Rodadas de 6 segundos, turnos na ordem da iniciativa. Cada turno: uma ação padrão e uma de movimento (ou uma completa).",
    tags: ["Rola iniciativa", "Padrão + movimento", "6 s por rodada"],
    blocos: [
      {
        titulo: "Como funciona",
        aberto: true,
        itens: [
          { nome: "1. Iniciativa", texto: "Todos rolam Iniciativa. O mestre faz um único teste para os inimigos. A ordem fica fixa até o fim; não rola de novo a cada rodada." },
          { nome: "2. Surpresa", texto: "O mestre diz quem percebeu os inimigos (muitas vezes com Percepção contra Furtividade). Quem não percebeu fica surpreendido: desprevenido e não age na 1ª rodada." },
          { nome: "3. Turnos", texto: "Cada um age na ordem da iniciativa." },
          { nome: "4. Nova rodada", texto: "Acabou a ordem, começa outra rodada com a mesma ordem. Quem estava surpreendido já pode agir." }
        ]
      },
      {
        titulo: "O que você pode fazer no turno",
        aberto: true,
        itens: [
          { nome: "Opção A", texto: "1 ação padrão + 1 ação de movimento (em qualquer ordem)." },
          { nome: "Opção B", texto: "2 ações de movimento (troca a padrão por movimento, nunca o contrário)." },
          { nome: "Opção C", texto: "1 ação completa (gasta as duas)." },
          { nome: "Sempre disponível", texto: "Ações livres e reações, em qualquer quantidade razoável." }
        ]
      },
      {
        titulo: "Ações padrão",
        itens: [
          { nome: "Agredir", texto: "Ataque corpo a corpo (alvo a até 1,5m) ou à distância (alvo visível, no alcance; até o dobro, com –1 dado). Atirar em alvo já em corpo a corpo: –1 dado." },
          { nome: "Manobra de combate", texto: "Ataque corpo a corpo para algo além de dano, com teste oposto de Luta: agarrar, derrubar, desarmar, empurrar, quebrar." },
          { nome: "Atropelar", texto: "Atravessa o espaço de um ser durante o movimento. Se ele resistir, teste oposto de manobra; vencendo, o deixa caído." },
          { nome: "Conjurar ritual", texto: "A maioria dos rituais gasta ação padrão." },
          { nome: "Fintar", texto: "Enganação contra Reflexos (alcance curto). Passou: ele fica desprevenido contra seu próximo ataque." },
          { nome: "Preparar", texto: "Diz a ação e a condição (\"atiro no primeiro que passar pela porta\"). Você faz como reação antes do seu próximo turno; se não acontecer, perde a ação." },
          { nome: "Usar habilidade ou item", texto: "Muitas habilidades e itens pedem ação padrão." }
        ]
      },
      {
        titulo: "Ações de movimento",
        itens: [
          { nome: "Movimentar-se", texto: "Percorre seu deslocamento (normalmente 9m). Nadar e escalar usam essa ação também." },
          { nome: "Levantar-se", texto: "Sair do chão." },
          { nome: "Manipular item", texto: "Pegar objeto na mochila, abrir ou fechar porta, entrar em carro." },
          { nome: "Sacar ou guardar item", texto: "Sacar ou guardar uma arma, por exemplo." },
          { nome: "Mirar", texto: "Treinado em Pontaria: até o fim do próximo turno, anula o –1 dado de atirar em alvo em corpo a corpo." }
        ]
      },
      {
        titulo: "Ações completas",
        itens: [
          { nome: "Corrida", texto: "Corre mais que o deslocamento (ver Atletismo)." },
          { nome: "Investida", texto: "Avança até o dobro do deslocamento em linha reta e ataca corpo a corpo, com +1 dado no ataque mas –5 na Defesa até o próximo turno." },
          { nome: "Golpe de misericórdia", texto: "Crítico automático em oponente adjacente e indefeso. A vítima ainda pode morrer na hora (25% personagem/NPC importante, 75% secundário)." },
          { nome: "Atrasar", texto: "Você age mais tarde na ordem, reduzindo sua iniciativa de propósito pelo resto do combate." }
        ]
      },
      {
        titulo: "Ações livres e reações",
        itens: [
          { nome: "Livres", texto: "Falar (curto), largar um item, jogar-se no chão, dar uma ordem curta." },
          { nome: "Reações", texto: "Acontecem em resposta a algo, até fora do seu turno: testes de Percepção ou Reflexos, ou as defesas abaixo." },
          { nome: "Bloqueio", texto: "Treinado em Fortitude: contra ataque corpo a corpo, ganha RD igual ao bônus de Fortitude." },
          { nome: "Contra-ataque", texto: "Treinado em Luta: se o ataque corpo a corpo contra você errar, você ataca o atacante." },
          { nome: "Esquiva", texto: "Treinado em Reflexos: soma o bônus de Reflexos na Defesa contra um ataque." },
          { nome: "Regra das defesas", texto: "Só UMA dessas três por rodada, e declarada antes de o inimigo rolar o ataque." }
        ]
      },
      {
        titulo: "Ataque, dano e crítico",
        itens: [
          { nome: "Teste de ataque", texto: "Luta (corpo a corpo) ou Pontaria (distância) contra a Defesa do alvo. Igual ou maior que a Defesa: acerta." },
          { nome: "Dano", texto: "Dados da arma. Corpo a corpo e arremesso somam Força; armas de disparo e de fogo, não." },
          { nome: "Crítico", texto: "Rolou na margem de ameaça da arma: multiplica os dados de dano (bônus fixos e dados extras não multiplicam)." }
        ]
      },
      {
        titulo: "Situações especiais",
        itens: [
          { nome: "Cobertura leve", texto: "+5 na Defesa. Cobertura total: não pode ser alvo." },
          { nome: "Camuflagem", texto: "Leve: 20% de falha nos ataques contra você. Total: 50%." },
          { nome: "Flanquear", texto: "Dois aliados em lados opostos do inimigo, só corpo a corpo: ambos ganham +1 dado no ataque." },
          { nome: "Caído", texto: "Atacando caído: –2 dados. Alvo caído: –5 na Defesa contra corpo a corpo e +5 contra distância." },
          { nome: "Terreno difícil", texto: "Mover-se custa o dobro." },
          { nome: "Dano não letal", texto: "Usar arma letal para não matar: –5 no ataque." }
        ]
      },
      {
        titulo: "Ferimentos e morte",
        itens: [
          { nome: "Machucado", texto: "Metade ou menos dos PV totais." },
          { nome: "Morrendo", texto: "0 PV: inconsciente e morrendo. 3 turnos morrendo na mesma cena = morte. Encerra com Medicina DT 20." },
          { nome: "Dano massivo", texto: "Dano de uma vez ≥ metade dos PV totais sem zerar: Fortitude (DT 15 +2 por 10 de dano) ou cai a 0." },
          { nome: "Perturbado", texto: "Menos da metade da Sanidade: efeito de insanidade na 1ª vez da cena (só interpretação)." },
          { nome: "Enlouquecendo", texto: "Sanidade 0. 3 turnos na mesma cena e o personagem vira NPC. Encerra com Diplomacia DT 20 ou cura de Sanidade." }
        ]
      }
    ]
  },
  {
    id: "interludio",
    nome: "Interlúdio",
    icone: "lua",
    resumo: "Cena de descanso entre investigação e ação. Você escolhe até DUAS ações para se recuperar e se preparar.",
    tags: ["Descanso", "Até 2 ações", "Mestre decide o local"],
    blocos: [
      {
        titulo: "Como funciona",
        aberto: true,
        itens: [
          { nome: "Quando", texto: "O mestre decide quando começa e termina. Em geral é num lugar seguro (esconderijo, hotel). Quem está ao relento, sem acampamento, não faz interlúdio (Sobrevivência: Acampamento resolve)." },
          { nome: "Forçar", texto: "Os jogadores podem pedir um interlúdio, mas o mestre decide. Pedir demais pode aumentar a urgência das próximas investigações." },
          { nome: "Ações", texto: "Cada personagem faz até DUAS das ações abaixo." }
        ]
      },
      {
        titulo: "Ações de interlúdio",
        aberto: true,
        itens: [
          { nome: "Alimentar-se", texto: "Uma refeição especial por interlúdio (se houver onde achar). Prato Favorito: +2 de Sanidade se relaxar. Nutritivo: dormir cura PV uma vez a mais. Energético: dormir recupera PE uma vez a mais. Rápido: +5 em revisar caso." },
          { nome: "Dormir", texto: "Recupera PV e PE iguais ao limite de PE. Normal: 1x. Precária (carro, tenda): metade. Confortável (hotel 3 estrelas): dobro. Luxuosa: triplo. Uma vez por interlúdio." },
          { nome: "Exercitar-se", texto: "+1d6 em um teste de Agilidade, Força ou Vigor até o fim da missão. Acumula até seu Vigor, um bônus por teste." },
          { nome: "Ler", texto: "+1d6 em um teste de Intelecto ou Presença até o fim da missão. Acumula até seu Intelecto, um bônus por teste." },
          { nome: "Manutenção", texto: "Conserta um item quebrado, devolvendo os PV dele ao máximo." },
          { nome: "Relaxar", texto: "Como dormir, mas recupera Sanidade. Cada personagem que relaxar no mesmo interlúdio dá +1 de Sanidade para todos. Uma vez por interlúdio." },
          { nome: "Revisar caso", texto: "Escolha uma cena de investigação passada, narre como estuda as anotações e use uma perícia adequada. Passou: ganha uma pista complementar que tinha deixado passar. Pode repetir a ação." }
        ]
      }
    ]
  }
];

/* Comparativo rápido (tabela mostrada no topo do guia de cenas) */
const CENAS_COMPARA_OP = {
  colunas: ["", "Investigação", "Combate", "Interlúdio"],
  linhas: [
    ["Objetivo", "Achar pistas", "Vencer ou sobreviver", "Recuperar e se preparar"],
    ["Começa com", "Pista básica do mestre", "Teste de Iniciativa", "Mestre libera o descanso"],
    ["Seu turno", "1 ação de investigação", "Padrão + movimento (ou completa)", "Até 2 ações de interlúdio"],
    ["Duração do turno", "Abstrata (segundos a horas)", "6 segundos", "—"],
    ["Termina quando", "Pistas ou urgência acabam", "Um lado cai ou foge", "Mestre encerra"],
    ["Ataques", "Não", "Sim", "Não"]
  ]
};

/* ---------------------------------------------------------------------
   Registro de usos extras (suplementos). Chamado pela tela e por você.
   --------------------------------------------------------------------- */
const USOS_EXTRAS_OP = {}; // { "Perícia": [ {fonte, ...uso} ] }

function registrarUsosPericiaOP(pericia, fonte, usos) {
  if (!USOS_PERICIAS_OP[pericia]) USOS_PERICIAS_OP[pericia] = { resumo: "", usos: [] };
  if (!USOS_EXTRAS_OP[pericia]) USOS_EXTRAS_OP[pericia] = [];
  (usos || []).forEach((u) => USOS_EXTRAS_OP[pericia].push(Object.assign({ fonte: fonte || "Suplemento" }, u)));
}

/* =====================  SUPLEMENTOS (AS)  =====================
   Quando o Giovane mandar a lista, cole aqui embaixo, assim:

   registrarUsosPericiaOP("Investigação", "AS: Nome do suplemento", [
     { nome: "…", req: 1, dt: "DT 20", acao: "Ação padrão", cenas: ["I"], desc: "…" }
   ]);
   ============================================================== */

/* ---- Arquivos Secretos: usos de perícia encontrados nos pacotes (#1, #4, #5, #7) ---- */
registrarUsosPericiaOP("Ocultismo", "AS #1", [
  { nome: "Blindar a mente", req: 2, dt: "DT 20 (aliado: DT 25)", acao: "Ação completa + 1 PE", cenas: ["C", "I", "L"],
    desc: "Você foca no que sabe do paranormal para proteger sua sanidade. Passou: +5 no seu próximo teste de Vontade até o fim da cena. Pode fazer o mesmo com um aliado adjacente (DT 25), mas ele também precisa passar em Vontade DT 20; se falhar, perde 1d4 SAN e não recebe o bônus." }
]);
registrarUsosPericiaOP("Tecnologia", "AS #4", [
  { nome: "Obter informações", req: 0, dt: "DT 5", acao: "Ação completa", cenas: ["I", "G"],
    desc: "Pesquisa rápida na internet sobre um local ou pessoa. Passou: você descobre 1 informação, mais 1 para cada 5 pontos acima da DT." }
]);
registrarUsosPericiaOP("Tecnologia", "AS #5", [
  { nome: "Rastrear trilha digital", req: 2, dt: "DT 20 / 25 / 30", acao: "1d4+1 ações completas", cenas: ["I"],
    desc: "Usa um algoritmo que interpreta a radiação dos aparelhos eletrônicos para refazer o trajeto de quem carregava um deles. Trajeto simples: DT 20. Tortuoso: DT 25. Enigmático: DT 30." }
]);
registrarUsosPericiaOP("Religião", "AS #7", [
  { nome: "Resguardar espírito", req: 1, dt: "DT 20", acao: "Ação completa", cenas: ["C", "I", "L"],
    desc: "Um breve rito de proteção (reza, oferenda, mantra) em você ou numa pessoa adjacente. Passou: o alvo recebe +2 em testes de Vontade até o fim da cena. Falhou: não pode tentar de novo na mesma pessoa na cena. É fé, sem efeito paranormal." }
]);