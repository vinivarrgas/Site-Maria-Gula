/*
 * Dados da Maria Gula Confeitaria.
 * Para atualizar preços, itens, sabores ou horários, edite só este arquivo.
 * Fotos dos itens: assets/img/cardapio/<id>.jpg (retrato 4:5, 800x1000).
 */
window.MARIA_GULA = {
  whatsapp: '5547997524457',
  instagram: 'https://www.instagram.com/mariagulagula/',
  fusoHorario: 'America/Sao_Paulo',

  // Horário da loja por dia da semana (0 = domingo … 6 = sábado): [abre, fecha] em horas.
  // Use 8.5 para 8h30. CONFIRMAR: o horário de domingo (o story mais recente diz 8h às 18h, sem citar o dia).
  horarios: {
    0: [8, 18],
    1: [8, 18],
    2: [8, 18],
    3: [8, 18],
    4: [8, 18],
    5: [8, 18],
    6: [8, 18],
  },
  delivery: [9, 18],

  // Data do cardápio publicado nos stories. Atualize junto com os preços.
  dataCardapio: 'segunda, 26/10',

  // Cardápio de delivery: cada categoria vira um botão de filtro no "Cardápio do dia".
  // CONFIRMAR: as descrições são textos de exemplo, escritos para a demonstração.
  cardapio: [
    {
      id: 'bolos',
      nome: 'Bolos e vulcões',
      itens: [
        { id: 'vulcao-cenoura', nome: 'Vulcão de cenoura com chocolate', descricao: 'Bolo de cenoura fofinho com calda de chocolate escorrendo pelo meio.', preco: 35 },
        { id: 'vulcao-chocolate', nome: 'Vulcão de chocolate', descricao: 'Bolo de chocolate com ganache brilhante transbordando do centro.', preco: 35 },
        { id: 'vulcao-choconinho', nome: 'Vulcão Choconinho', descricao: 'Chocolate por dentro e creme de Ninho escorrendo por cima.', preco: 35 },
        { id: 'piscininha-cenoura', nome: 'Piscininha de cenoura', descricao: 'Bolo de cenoura na forma, com uma piscina de brigadeiro em cima.', preco: 25 },
      ],
    },
    {
      id: 'especiais',
      nome: 'Especiais',
      itens: [{ id: 'bolo-nuvem', nome: 'Bolo Nuvem', descricao: 'Massa leve e muito creme, alto como uma nuvem.', nota: 'o hypado', preco: 22 }],
    },
    {
      id: 'cucas',
      nome: 'Cucas',
      itens: [
        {
          id: 'cuca-alema',
          nome: 'Cuca alemã',
          descricao: 'Massa amanteigada, recheio cremoso e farofa crocante por cima.',
          preco: 25,
          sabores: ['Abacaxi com coco e creme belga', 'Creme belga com chocolate branco'],
        },
      ],
    },
    {
      id: 'doces',
      nome: 'Doces',
      itens: [
        { id: 'brownie', nome: 'Brownie tradicional', descricao: 'Casquinha fina por fora e molhadinho por dentro.', preco: 7 },
        { id: 'cookie', nome: 'Cookie tradicional', descricao: 'Bordas crocantes, centro macio e gotas de chocolate.', preco: 14 },
        {
          id: 'big-cookie',
          nome: 'Big Cookie recheado',
          descricao: 'Cookie grande e grosso, com recheio generoso.',
          preco: 22,
          sabores: ['Bueno', 'Nutella', 'Red Velvet com chocolate branco', 'Black com marshmallow'],
        },
      ],
    },
    {
      id: 'salgados',
      nome: 'Salgados',
      itens: [
        { id: 'esfiha-carne', nome: 'Esfiha de carne', descricao: 'Esfiha aberta de carne bem temperada.', preco: 7 },
        { id: 'esfiha-frango', nome: 'Esfiha de frango', descricao: 'Esfiha fechada de frango desfiado.', preco: 7 },
        { id: 'empadao-frango', nome: 'Empadão de frango com requeijão', descricao: 'Massa dourada que esfarela, frango cremoso com requeijão.', preco: 18 },
      ],
    },
  ],

  // Tortas sob encomenda (cardápio dos destaques "Cardápio Tortas").
  // CONFIRMAR: o preço por kg de cada sabor (R$ 109,90 ou R$ 89,90) foi lido de rodapés parcialmente cobertos.
  // foto: true quando já existe assets/img/cardapio/torta-<id>.jpg; as outras aparecem só na lista.
  tortas: [
    { id: 'pistache-dubai', nome: 'Pistache Dubai', precoKg: 109.9, foto: true, descricao: 'Pão de ló de cacau intenso, creme de pistache, ganache de chocolate meio amargo, morangos frescos e crocante.' },
    { id: 'snickers', nome: 'Snickers', precoKg: 109.9, foto: true, descricao: 'Pão de ló branco e de chocolate, caramelo salgado, crocante de amendoim, mousse branco e mousse de doce de leite.' },
    { id: 'napolitano', nome: 'Napolitano', precoKg: 89.9, descricao: 'Pão de ló branco e de chocolate, ganache meio amargo, mousse de morango, creme branco e morangos frescos.' },
    { id: 'matilda', nome: 'Matilda', precoKg: 89.9, foto: true, descricao: 'Pão de ló de cacau intenso e quatro camadas de mousse de chocolate com ganache meio amargo.' },
    { id: 'banoffe', nome: 'Banoffe', precoKg: 89.9, foto: true, descricao: 'Casquinha de bolacha, doce de leite, banana flambada no caramelo, creme de nata e canela.' },
    { id: 'cheesecake', nome: 'Cheesecake', precoKg: 89.9, foto: true, descricao: 'Casquinha de bolacha, creme de cheesecake e geleia de frutas vermelhas.' },
    { id: 'siria', nome: 'Síria', precoKg: 109.9, descricao: 'Massa de coco queimado, baba de moça, ameixa, damasco e creme de nata.' },
    { id: 'marta-rocha', nome: 'Marta Rocha', precoKg: 109.9, descricao: 'Pão de ló branco e de chocolate, baba de moça, pêssego, ameixa, suspiro, creme de nata, crocante de nozes e fios de ovos.' },
    { id: 'strogonoff-nozes', nome: 'Strogonoff de nozes', precoKg: 109.9, descricao: 'Pão de ló de chocolate, ganache meio amargo e brigadeiro de nozes.' },
    { id: 'neca', nome: 'Neca', precoKg: 109.9, descricao: 'Massa de aveia e coco queimado, com ovos moles, damasco e creme de nata.' },
    { id: 'maria-gula', nome: 'Maria Gula', precoKg: 89.9, descricao: 'Pão de ló de nozes, doce de leite, crema Maria Gula e crocante de nozes.' },
    { id: 'pudim', nome: 'Pudim', precoKg: 89.9, descricao: 'Pão de ló branco, pudim de leite condensado e mousse de doce de leite.' },
    { id: 'crunch-brownie', nome: 'Crunch Brownie', precoKg: 89.9, descricao: 'Brownie, brigadeiro de leite Ninho e ganache meio amargo com crocante.' },
    { id: 'chocolatudo', nome: 'Chocolatudo', precoKg: 89.9, descricao: 'Pão de ló de chocolate com brigadeiro belga e mousse de chocolate.' },
    { id: 'mineira', nome: 'Mineira', precoKg: 89.9, descricao: 'Pão de ló de baunilha com creme belga, coco e abacaxi.' },
    { id: 'duo-brigadeiro', nome: 'Duo Brigadeiro', precoKg: 89.9, descricao: 'Pão de ló de chocolate com uma camada de brigadeiro belga e uma de brigadeiro de Ninho.' },
    { id: 'quatro-leites', nome: 'Quatro leites', precoKg: 89.9, descricao: 'Pão de ló de baunilha com creme de quatro leites, com ou sem morango.' },
    { id: 'bombom', nome: 'Bombom', precoKg: 89.9, descricao: 'Pão de ló de chocolate, brigadeiro meio amargo, bombom (Sonho de Valsa ou Ouro Branco) e creme belga.' },
    { id: 'sensacao', nome: 'Sensação', precoKg: 89.9, foto: true, descricao: 'Pão de ló de chocolate, brigadeiro meio amargo, morango e chantilly.' },
    { id: 'suspiro-da-vovo', nome: 'Suspiro da vovó', precoKg: 89.9, descricao: 'Pão de ló branco, creme de nata, morango e suspiro.' },
    { id: 'trufado-morango', nome: 'Trufado de morango', precoKg: 89.9, descricao: 'Pão de ló branco e de chocolate, brigadeiro de chocolate branco e meio amargo, e morangos.' },
  ],

  tamanhos: [
    { id: '15', forma: 'Forma de 15 cm', fatias: 15 },
    { id: '20', forma: 'Forma de 20 cm', fatias: 22 },
    { id: '25', forma: 'Forma de 25 cm', fatias: 32 },
  ],

  // Docinhos de festa (destaque "Cardápio Doces"). CONFIRMAR: os preços são de stories de cerca de 49 semanas atrás. foto: true quando existe assets/img/cardapio/doce-<id>.jpg
  // ou fino-<id>.jpg; os outros aparecem só na lista de sabores.
  docinhos: [
    {
      id: 'classicos',
      nome: 'Clássicos',
      preco: 2,
      nota: 'O cento sai por R$ 180,00.',
      itens: [
        { id: 'brigadeiro-milk', nome: 'Brigadeiro Milk', foto: 'doce' },
        { id: 'brigadeiro-50', nome: 'Brigadeiro 50%', foto: 'doce' },
        { id: 'beijinho', nome: 'Beijinho', foto: 'doce' },
        { id: 'casadinho', nome: 'Casadinho', foto: 'doce' },
        { id: 'ninho', nome: 'Ninho', foto: 'doce' },
      ],
    },
    {
      id: 'especiais',
      nome: 'Especiais',
      preco: 2.5,
      itens: [
        { id: 'pacoca', nome: 'Paçoca', foto: 'doce' },
        { id: 'churros', nome: 'Churros', foto: 'doce' },
        { id: 'oreo', nome: 'Oreo', foto: 'doce' },
        { id: 'camafeu', nome: 'Camafeu', foto: 'doce' },
        { id: 'romeu-julieta', nome: 'Romeu e Julieta' },
        { id: 'limao', nome: 'Limão' },
        { id: 'ninho-nutella', nome: 'Ninho com Nutella' },
        { id: 'mini-brownie', nome: 'Mini brownie' },
        { id: 'olho-de-sogra', nome: 'Olho de sogra' },
        { id: 'mms', nome: "M&M's" },
        { id: 'coco-queimado', nome: 'Coco queimado' },
        { id: 'creme-brulee', nome: 'Crème brûlée' },
      ],
    },
    {
      id: 'finos',
      nome: 'Finos',
      itens: [
        { id: 'bombom-morango', nome: 'Bombom de morango', preco: 6, foto: 'fino' },
        { id: 'tortinha-limao', nome: 'Tortinha de limão', preco: 4, foto: 'fino' },
        { id: 'tortinha-frutas', nome: 'Tortinha de frutas vermelhas', preco: 4, foto: 'fino' },
        { id: 'copinho-uva', nome: 'Copinho de uva', preco: 3.8 },
        { id: 'copinho-fisalis', nome: 'Copinho de fisális', preco: 3.9 },
        { id: 'conchas', nome: 'Conchas', preco: 3.7 },
        { id: 'copinho-cafe', nome: 'Copinho de mousse de café', preco: 3.5 },
        { id: 'copo-rafaello', nome: 'Copo Rafaello', preco: 3.8 },
        { id: 'copinho-charge', nome: 'Copinho Charge', preco: 3.8 },
        { id: 'bombom-uva', nome: 'Bombom de uva', preco: 4.2 },
        { id: 'bombom-cereja', nome: 'Bombom de cereja', preco: 4.2 },
      ],
    },
  ],

  // Encomendas por ocasião (foto: assets/img/cardapio/ocasiao-<id>.jpg).
  // CONFIRMAR: o que a loja faz para empresas e eventos.
  ocasioes: [
    { id: 'aniversario', nome: 'Aniversário', texto: 'Torta ou bolo de andar do seu sabor favorito, com docinhos para a mesa.' },
    { id: 'casamento', nome: 'Casamento', texto: 'Bolo para os noivos e doces finos para a mesa da festa.' },
    { id: 'empresas', nome: 'Empresas e eventos', texto: 'Café da tarde e caixas de doces para a equipe ou para os clientes.' },
    { id: 'pascoa', nome: 'Páscoa', texto: 'Ovos e doces de Páscoa, sob encomenda na temporada.' },
  ],

  regrasEncomenda: {
    antecedenciaDias: 2,
    loteDocinhos: 25,
    pagamento: 'Pix ou cartão. A encomenda é confirmada com 50% do valor no ato do pedido.',
  },
};
