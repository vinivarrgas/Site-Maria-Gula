# Maria Gula Confeitaria · site demonstrativo

Site da Maria Gula Confeitaria (Meia Praia, Itapema/SC), em duas páginas:

- **Hoje** (`index.html`): capa com a frase "Uma pausa para saborear." e a torta sobre fundo rosa, o cardápio do dia (com filtro por categoria e pedido montado e enviado pelo WhatsApp), a chamada para encomendas, a confeiteira e como chegar.
- **Encomendas** (`encomendas.html`): capa, ocasiões, tortas (as mais pedidas e a lista com os 21 sabores), tamanhos, docinhos de festa e o formulário de orçamento pelo WhatsApp.

Visual claro: fundo baunilha, rosa blush com moderação e o chocolate da logo nos títulos, no botão principal e no rodapé. As seções se alternam entre baunilha e blush claro.

HTML, CSS e JavaScript puros, sem etapa de build.

## Abrir no computador

Abra o `index.html` no navegador, ou rode um servidor local na pasta:

```bash
python -m http.server 5173
```

e acesse http://localhost:5173.

## Editar cardápio, preços e horários

Tudo fica em [`js/dados.js`](js/dados.js):

- `cardapio`: categorias e itens do delivery, com `nome`, `descricao`, `preco` e, quando houver, `sabores` e `nota`.
- `ocasioes`: as encomendas por ocasião (foto em `assets/img/cardapio/ocasiao-<id>.jpg`).
- `tortas`: os 21 sabores, com `precoKg` e `descricao`. Os que têm `foto: true` aparecem como cartão no trilho; todos aparecem na lista "Todos os sabores".
- `tamanhos` e `docinhos` (clássicos, especiais e finos, com preços): os docinhos com `foto` aparecem na mesa.
- `horarios` e `delivery`: horário da loja por dia da semana (0 = domingo) e do delivery. O aviso "Aberto agora / Fechado agora" usa esses valores, no fuso de São Paulo.
- `whatsapp`: número que recebe os pedidos (só dígitos, com 55 e DDD).

Cada item usa a foto `assets/img/cardapio/<id>.jpg` (tortas: `torta-<id>.jpg`; docinhos: `doce-<id>.jpg` ou `fino-<id>.jpg`), em retrato 4:5 (800x1000). As fotos atuais são ilustrativas, de bancos de imagens livres; os créditos ficam em `js/creditos.js` e aparecem no rodapé. Ao trocar por fotos da Maria, apague o crédito correspondente.

Os textos fixos ficam no HTML de cada página. O cabeçalho e o rodapé se repetem nas duas: ao mudar endereço, horário ou contato, altere em `index.html` e em `encomendas.html`.

## Publicar no GitHub Pages

1. Crie um repositório e envie estes arquivos.
2. Em **Settings → Pages**, escolha a branch `main` e a pasta `/ (root)`.

## Estrutura

- `index.html`: página de hoje (vitrine, cardápio do dia, a Maria, visite)
- `encomendas.html`: página de encomendas (ocasiões, tortas, tamanhos, docinhos, orçamento)
- `css/style.css`: estilos (cores e tamanhos em variáveis no topo)
- `js/dados.js`: cardápio, preços e horários
- `js/main.js`: serve as duas páginas; cada parte só roda se o seu bloco existir na página (pedido, orçamento, aviso de aberto/fechado, menu do celular e animações)
- `assets/img/`: fotos recortadas do Instagram @mariagulagula (baixa resolução, trocar por originais) e as fotos de capa (`capa-torta-chocolate.jpg`, `capa-torta-morango.jpg`)
- `PRODUCT.md`, `DESIGN.md`, `.impeccable/`: contexto de produto e sistema visual (skill Impeccable)

## Antes de publicar de verdade

- Trocar as fotos de capa pelas tortas da Maria fotografadas no mesmo estilo: torta inteira no prato, fundo rosa, luz suave de janela, em retrato (pelo menos 1100 x 1400 px). As atuais foram geradas por IA só como referência de estilo e não podem ir ao ar como se fossem produtos dela.
- Ao trocar a capa, medir o rosa do fundo da foto nova e ajustar `--capa` em `css/style.css`.
- Trocar as fotos ilustrativas pelas fotos reais dos produtos, e as da Maria por originais em alta resolução.
- Confirmar com a Maria: horário de domingo, o preço por quilo de cada torta (R$ 109,90 ou R$ 89,90), se os preços dos docinhos (de cerca de 49 semanas atrás) continuam valendo, e o texto da seção "Quem faz é a Maria".
