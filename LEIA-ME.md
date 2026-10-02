# Catálogo Isadora Mendes Semijoias

Site estático (HTML, CSS e JavaScript). Não precisa de banco de dados, Node ou instalação.

## Estrutura

```
site/
├── index.html              ← a página
├── assets/
│   ├── css/style.css       ← visual
│   ├── js/catalogo.js      ← PEÇAS, PREÇOS E WHATSAPP (edite aqui)
│   ├── js/app.js           ← funcionamento (não precisa mexer)
│   └── img/
│       ├── favicon.svg, favicon-48.png, apple-touch-icon.png
│       ├── logo/           ← logos vetorizadas (SVG) usadas no site
│       └── pecas/          ← coloque aqui as fotos reais das peças
└── LEIA-ME.md
```

## 1. Antes de publicar: troque o WhatsApp

Abra `assets/js/catalogo.js` e altere:

```js
whatsapp: "5500000000000",
```

Use só números: 55 (Brasil) + DDD + número. Exemplo: `"5511987654321"`.

Aproveite para ajustar o link do Instagram (`instagram:`) e as mensagens automáticas (`mensagemPeca` e `mensagemGeral`).

## 2. Peças do catálogo

As peças atuais vieram do formulário "Cadastro de peças – IM Semijoias". Para adicionar ou editar uma peça, mexa num bloco em `IM_PECAS`:

```js
{
  codigo: "CO-01",
  nome: "Colar Coração Cravejado",
  categoria: "colares",            // conjuntos | colares | brincos | aneis | pulseiras
  preco: 239.9,                    // preço à vista; use ponto, não vírgula
  precoPrazo: 249.9,               // opcional: aparece como "ou R$ … a prazo"
  descricao: "Texto sobre a peça.",
  detalhes: [["Material", "Prata 925"], ["Comprimento", "45 cm"]],
  fotos: [f("colar-coracao-cravejado-1"), f("colar-coracao-cravejado-2")],
  alt: "Descrição da foto para quem usa leitor de tela",
  destaque: true,                  // aparece primeiro em "Destaques"
  disponivel: true,                // false mostra "Sob encomenda"
  indicador: "direita",            // opcional: bolinhas da galeria no canto direito
},
```

**Fotos:** envie para `assets/img/pecas/`, em formato vertical (proporção 4:5, por exemplo 1200 × 1500 px), com até ~300 KB cada. A 1ª foto é a principal; a 2ª aparece ao passar o mouse e na galeria da peça. Na galeria, bolinhas no canto inferior esquerdo mostram quantas fotos a peça tem e qual está aberta; deixe esse canto livre nas fotos ou, se a peça ficar ali, use `indicador: "direita"`.

A foto de abertura é a 1ª foto do Colar Coração Cravejado (`assets/img/pecas/colar-coracao-cravejado-1.webp`), enviada no cadastro das peças. Para trocar, mude o `src` das **duas** imagens dentro de `<section class="hero">` no `index.html` (a `hero__photo` e a `hero__fill`, que é a mesma foto desfocada nas laterais em telas largas). No computador, a foto é dimensionada pela altura da abertura e posicionada para o pingente (entre 49% e 60% da altura da foto) ficar inteiro na parte de baixo; no celular, o pingente fica logo acima do nome. Use uma foto vertical (4:5), com 2000 px ou mais de largura, com a peça um pouco abaixo do centro.

A foto da seção "Sobre" fica em `assets/img/sobre-modelo.webp`. Revise também o texto dessa seção no `index.html`.

Para criar uma categoria nova, adicione-a em `IM_CATEGORIAS` e use o mesmo `id` nas peças. Categorias sem nenhuma peça ficam escondidas nos filtros.

## Logos

As logos vetorizadas estão em `assets/img/logo/` (usadas pelo site) e, com versões PNG em alta (3000 px, fundo transparente), na pasta `logos/` do projeto:

| Arquivo | Uso |
|---|---|
| `isadora-mendes-logo` (+ `-claro`, `-escuro`) | Logo completa: monograma + nome + "Semijóias" |
| `isadora-mendes-assinatura` (+ `-claro`) | Só o nome, sem o monograma (para peças gráficas; no site o nome do topo é escrito em texto) |
| `isadora-mendes-simbolo` (+ `-claro`) | Monograma IM da logo completa (topo do site, favicon) |
| `im-monograma` (+ `-marrom`) | Monograma IM com as duas estrelas (versão avulsa, ideal para foto de perfil) |

Cor da marca: marrom `#7D654E`. Versão clara: `#F3EFE8`.

Tipografia do site: **Playfair Display** (títulos e destaques) e **Inter** (interface e textos), carregadas do Google Fonts.

## 3. Publicar na Hostinger

1. Entre no hPanel → **Sites** → **Gerenciar** → **Gerenciador de Arquivos**.
2. Abra a pasta `public_html` (apague o `default.php` se existir).
3. Envie **o conteúdo** da pasta `site/` (o `index.html` e a pasta `assets`), não a pasta `site` em si.
4. Acesse seu domínio. Pronto.

Para atualizar depois, basta reenviar o arquivo alterado (normalmente só o `catalogo.js` e as fotos novas).

## Link direto para uma peça

Cada peça tem endereço próprio, ótimo para enviar no WhatsApp ou colocar no Instagram:

```
https://seudominio.com.br/#peca/BR-01
```

Na página da peça, o botão "Copiar link da peça" faz isso automaticamente.
