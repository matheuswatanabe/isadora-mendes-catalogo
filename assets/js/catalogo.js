/* ==========================================================================
   Isadora Mendes Semijoias · Dados do catálogo
   --------------------------------------------------------------------------
   Este é o ÚNICO arquivo que você precisa editar para mudar o catálogo.

   1. Troque o número do WhatsApp em IM_CONFIG.whatsapp
      (só números: 55 + DDD + número. Ex.: 5511987654321)
   2. Edite, adicione ou remova peças na lista IM_PECAS.
   3. Fotos ficam em assets/img/pecas/ (vertical 4:5, 1100 × 1375, até ~300 KB).

   As peças abaixo vieram do formulário "Cadastro de peças – IM Semijoias".
   ========================================================================== */

window.IM_CONFIG = {
  marca: "Isadora Mendes Semijoias",

  // Número do WhatsApp que recebe os pedidos (PLACEHOLDER, trocar)
  whatsapp: "5500000000000",

  // Mensagem enviada ao tocar em "Comprar pelo WhatsApp" numa peça.
  // {peca}, {codigo} e {preco} são preenchidos automaticamente.
  mensagemPeca:
    "Olá! Tenho interesse na peça {peca} ({codigo}), de {preco}. Ela está disponível?",

  // Mensagem do botão geral de contato
  mensagemGeral: "Olá! Vim pelo catálogo da Isadora Mendes Semijoias e gostaria de atendimento.",

  // Links (deixe "" para esconder)
  instagram: "https://www.instagram.com/isadoramendessemijoias/",
  cidade: "",
};

/* Categorias exibidas nos filtros, na ordem desejada.
   Categoria sem nenhuma peça fica escondida automaticamente. */
window.IM_CATEGORIAS = [
  { id: "conjuntos", nome: "Conjuntos" },
  { id: "colares", nome: "Colares" },
  { id: "brincos", nome: "Brincos" },
  { id: "aneis", nome: "Anéis" },
  { id: "pulseiras", nome: "Pulseiras" },
];

/* Caminho das fotos das peças */
function f(nome) {
  return "assets/img/pecas/" + nome + ".webp";
}


/*
  Campos de cada peça:
  - codigo:     referência curta (aparece no catálogo e na mensagem)
  - nome:       nome da peça
  - categoria:  um dos ids de IM_CATEGORIAS
  - preco:      preço à vista, em reais (ex.: 189.9)
  - precoPrazo: preço a prazo (opcional; aparece no detalhe da peça)
  - material:   linha curta abaixo do nome no catálogo (ex.: "Prata 925")
  - descricao:  texto sobre a peça (quebras de linha com \n)
  - detalhes:   lista de pares [rótulo, valor] (material, medidas, variações...)
  - fotos:      lista de fotos; a 1ª é a principal, a 2ª aparece ao passar o mouse
  - alt:        descrição da 1ª foto para acessibilidade
  - fundoClaro: true quando a 1ª foto tem fundo branco/claro; essas peças
                vêm primeiro na ordem padrão ("Destaques")
  - destaque:   true para aparecer logo depois, ainda na ordem padrão
  - disponivel: false mostra "Sob encomenda" em vez de esconder a peça
  - indicador:  "direita" põe as bolinhas da galeria no canto inferior direito
                (use quando a peça, ou outra joia, ocupa o canto esquerdo das fotos)
*/
window.IM_PECAS = [
  {
    codigo: "CJ-01",
    nome: "Conjunto Flor de Neve",
    categoria: "conjuntos",
    preco: 419.9,
    precoPrazo: 429.9,
    material: "Prata 925",
    descricao:
      "Delicado e encantador, o Conjunto Flor de Neve é composto por colar e brincos com um lindo design floral cravejado de pedras brilhantes.\nAs pétalas cuidadosamente trabalhadas criam um efeito sofisticado e luminoso, deixando a composição elegante e feminina. Uma escolha perfeita para quem ama peças delicadas, mas que se destacam no look.",
    detalhes: [["Material", "Prata 925"], ["Composição", "Colar e par de brincos"], ["Comprimento do colar", "45 cm, com regulagem"]],
    fotos: [f("conjunto-flor-de-neve-1"), f("conjunto-flor-de-neve-2"), f("conjunto-flor-de-neve-3")],
    alt: "Colar de prata com pingente de flor cravejada, usado no colo",
    destaque: true,
    disponivel: true,
  },
  {
    codigo: "CJ-02",
    nome: "Conjunto Três Corações",
    categoria: "conjuntos",
    preco: 499.9,
    precoPrazo: 519.9,
    material: "Prata 925",
    descricao:
      "Delicado, romântico e cheio de brilho, o Conjunto Três Corações é composto por colar e brincos com detalhes em formato de coração, trazendo um toque feminino e sofisticado à produção.\nAs pedras brilhantes destacam o desenho das peças e deixam o conjunto ainda mais elegante. Perfeito para quem ama joias delicadas, românticas e versáteis, que combinam facilmente com diferentes ocasiões.",
    detalhes: [["Material", "Prata 925"], ["Composição", "Colar e par de brincos"], ["Comprimento do colar", "45 cm, com regulagem"]],
    fotos: [f("conjunto-tres-coracoes-1"), f("conjunto-tres-coracoes-2"), f("conjunto-tres-coracoes-3")],
    alt: "Colar de prata com três corações cravejados lado a lado, usado no colo",
    destaque: true,
    disponivel: true,
  },
  {
    codigo: "CO-01",
    nome: "Colar Coração Cravejado",
    categoria: "colares",
    preco: 239.9,
    precoPrazo: 249.9,
    material: "Prata 925",
    descricao:
      "Delicado e romântico, o Colar Coração possui um lindo pingente em formato de coração, com uma pedra central brilhante contornada por detalhes cravejados, trazendo ainda mais destaque e sofisticação à peça.\nPerfeito para representar o amor, o carinho e sentimentos especiais, é uma joia versátil que pode ser usada tanto no dia a dia quanto em ocasiões especiais.",
    detalhes: [["Material", "Prata 925"], ["Comprimento", "45 cm, com regulagem"], ["Cor da pedra", "Vermelho ou cristal"]],
    fotos: [f("colar-coracao-cravejado-1"), f("colar-coracao-cravejado-2"), f("colar-coracao-cravejado-3")],
    alt: "Colar de prata com pingente de coração vermelho contornado por pedras, usado sobre blusa branca",
    destaque: true,
    disponivel: true,
  },
  {
    codigo: "CO-02",
    nome: "Colar Infinito Cravejado",
    categoria: "colares",
    preco: 319.9,
    material: "Prata 925",
    descricao:
      "Delicado e cheio de significado, o Colar Infinito traz o clássico símbolo do infinito, representando eternidade, conexão e amor sem fim. Seu design elegante combina uma corrente delicada em elos com um pingente sofisticado, com detalhes cravejados que acrescentam um toque sutil de brilho à peça.\nPerfeito para quem busca uma joia delicada, atemporal e versátil, podendo ser usada tanto no dia a dia quanto em ocasiões especiais.",
    detalhes: [["Material", "Prata 925"], ["Comprimento", "45 cm, com extensor"]],
    fotos: [f("colar-infinito-1"), f("colar-infinito-2")],
    alt: "Colar de prata com pingente de infinito cravejado, apoiado sobre a mão",
    indicador: "direita", // anel no canto esquerdo da 1ª foto
    destaque: true,
    disponivel: true,
  },
  {
    codigo: "CO-03",
    nome: "Colar Círculo Cravejado",
    categoria: "colares",
    preco: 169.9,
    precoPrazo: 179.9,
    material: "Prata 925",
    descricao:
      "Delicado e sofisticado, o Colar Círculo em Prata 925 possui um pingente circular cravejado com pequenas pedras brilhantes, criando um visual elegante e atemporal.",
    detalhes: [["Material", "Prata 925"], ["Comprimento", "45 cm, com regulagem"]],
    fotos: [f("colar-circulo-cravejado-1"), f("colar-circulo-cravejado-2")],
    alt: "Colar de prata com pingente em círculo cravejado de pedras, sobre fundo branco",
    fundoClaro: true,
    destaque: false,
    disponivel: true,
  },
  {
    codigo: "CO-04",
    nome: "Colar Letter",
    categoria: "colares",
    preco: 99.9,
    precoPrazo: 119.9,
    material: "Prata 925",
    descricao:
      "Delicado e personalizado, o Colar Letter é perfeito para levar consigo uma letra que tenha um significado especial. O pingente com inicial possui detalhes brilhantes que dão um toque elegante e sofisticado à peça.\nUma joia minimalista e versátil, ideal para usar sozinha ou combinar com outros colares em um mix delicado.",
    detalhes: [["Material", "Prata 925"], ["Comprimento", "40 cm ou 45 cm"], ["Inicial", "À sua escolha"]],
    fotos: [f("colar-letter-1"), f("colar-letter-2")],
    alt: "Colar de prata com pingente da letra A cravejada, sobre fundo branco",
    fundoClaro: true,
    destaque: false,
    disponivel: true,
  },
  {
    codigo: "CO-05",
    nome: "Colar Ponto de Luz",
    categoria: "colares",
    preco: 49.9,
    precoPrazo: 59.9,
    material: "Aço inoxidável",
    descricao:
      "Delicado, elegante e atemporal, o Colar Ponto de Luz possui uma corrente fina com um delicado detalhe brilhante, perfeito para quem ama joias minimalistas e sofisticadas.\nConfeccionado em aço inoxidável, é uma peça prática e resistente, ideal para acompanhar sua rotina: tem alta durabilidade, resiste à água, mantém o brilho e é fácil de cuidar.",
    detalhes: [["Material", "Aço inoxidável"], ["Comprimento", "45 cm, com regulagem"]],
    fotos: [f("colar-ponto-de-luz-1"), f("colar-ponto-de-luz-2")],
    alt: "Colar dourado de corrente fina com um único ponto de luz, sobre fundo branco",
    fundoClaro: true,
    destaque: false,
    disponivel: true,
  },
  {
    codigo: "CO-06",
    nome: "Choker Discos",
    categoria: "colares",
    preco: 49.9,
    precoPrazo: 59.9,
    material: "Aço inoxidável",
    descricao:
      "Delicada e moderna, a Choker Discos em aço inoxidável possui um design com pequenas placas douradas que refletem a luz e dão um toque sofisticado ao look.\nO aço inoxidável oferece alta durabilidade, resistência à oxidação e praticidade para o dia a dia. É uma peça versátil, perfeita para usar sozinha ou combinar com outros colares em um mix elegante.",
    detalhes: [["Material", "Aço inoxidável"], ["Comprimento", "40 cm, com regulagem"]],
    fotos: [f("choker-discos-1"), f("choker-discos-2"), f("choker-discos-3")],
    alt: "Choker dourada de pequenos discos lisos, sobre fundo branco",
    fundoClaro: true,
    destaque: false,
    disponivel: true,
  },

  /* ------------------------------------------------------------------------
     As fotos das 4 peças abaixo foram retocadas para tirar gravações de marca
     de terceiros (originais em /originais-com-marca, fora do site). Confira se
     a peça entregue corresponde à foto; o ideal é trocar por fotos próprias.
     ------------------------------------------------------------------------ */
  {
    codigo: "CO-07",
    nome: "Colar Tiff",
    categoria: "colares",
    preco: 179.9,
    precoPrazo: 189.9,
    material: "Prata 925",
    descricao:
      "Delicado e cheio de significado, o Colar Tiff traz dois pingentes em formato de coração, sendo um deles com um lindo detalhe em azul-turquesa, que dá um toque de cor e personalidade à peça, além de um pequeno brilhante no centro.\nO design é inspirado no estilo clássico e sofisticado das joias, combinando delicadeza e elegância em uma peça versátil para o dia a dia ou ocasiões especiais.",
    detalhes: [["Material", "Prata 925"], ["Comprimento", "45 cm, com regulagem"]],
    fotos: [f("colar-tiff-1")],
    alt: "Colar de prata com dois pingentes de coração, um prateado e um azul-turquesa, sobre fundo branco",
    fundoClaro: true,
    destaque: false,
    disponivel: true,
  },
  {
    codigo: "PU-01",
    nome: "Pulseira Tiff",
    categoria: "pulseiras",
    preco: 169.9,
    precoPrazo: 179.9,
    material: "Prata 925",
    descricao:
      "Delicada e sofisticada, a Pulseira Tiff traz dois pingentes em formato de coração, sendo um deles com acabamento em azul-turquesa, criando um contraste delicado e cheio de charme.\nSeu design clássico e atemporal combina facilmente com diferentes estilos e ocasiões. Uma peça perfeita para usar sozinha ou criar um mix de pulseiras cheio de personalidade.",
    detalhes: [["Material", "Prata 925"], ["Comprimento", "18 cm, com regulagem"]],
    fotos: [f("pulseira-tiff-1")],
    alt: "Pulseira de prata de corrente fina com dois pingentes de coração, um prateado e um azul-turquesa",
    fundoClaro: true,
    destaque: false,
    disponivel: true,
  },
  {
    codigo: "PU-02",
    nome: "Pulseira Fecho T",
    categoria: "pulseiras",
    preco: 229.9,
    precoPrazo: 239.9,
    material: "Aço inoxidável",
    descricao:
      "A Pulseira com Fecho T combina um design clássico e sofisticado com detalhes marcantes. Seu fecho em formato de T traz um toque moderno à peça, enquanto o charm em formato de coração complementa o visual com delicadeza.\nVersátil e cheia de personalidade, é perfeita para usar sozinha ou combinada com outras pulseiras, criando um mix elegante e autêntico.",
    detalhes: [["Material", "Aço inoxidável"], ["Comprimento", "17 cm"], ["Fecho", "Em T"]],
    fotos: [f("pulseira-fecho-t-1"), f("pulseira-fecho-t-2"), f("pulseira-fecho-t-3")],
    alt: "Pulseira prateada de elos redondos com fecho em T e pingente de coração, sobre fundo branco",
    fundoClaro: true,
    destaque: false,
    disponivel: true,
  },
  {
    codigo: "PU-03",
    nome: "Pulseira para Berloques",
    categoria: "pulseiras",
    preco: 319.9,
    precoPrazo: 329.9,
    material: "Prata 925",
    descricao:
      "Delicada e versátil, a Pulseira para Berloques em Prata 925 é perfeita para personalizar do seu jeito. Possui duas opções de fecho: fecho básico e fecho em formato de coração cravejado, permitindo escolher o estilo que mais combina com você.\nIdeal para adicionar seus berloques favoritos e criar uma composição única, cheia de significado e personalidade.",
    detalhes: [["Material", "Prata 925"], ["Tamanhos", "16, 17, 18, 19 e 22 cm"], ["Fecho", "Básico ou coração cravejado"]],
    fotos: [f("pulseira-berloques-1"), f("pulseira-berloques-2"), f("pulseira-berloques-3")],
    alt: "Pulseira de prata para berloques com fecho de coração cravejado, sobre fundo branco",
    fundoClaro: true,
    destaque: false,
    disponivel: true,
  },
];
