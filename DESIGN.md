---
name: Maria Gula Confeitaria
description: A confeitaria's shop window on the web, in the colours of her opening poster, where every item stands in the case with its price plaque.
colors:
  framboesa: "#b83a48"
  vinho: "#892d32"
  vinho-dark: "#5e2420"
  rose: "#c66d63"
  pessego: "#fce8d8"
  pessego-deep: "#f9d8c2"
  pessego-light: "#fdefe0"
  espresso: "#3a140e"
  espresso-raised: "#4d1f17"
  awning-yellow: "#e3b03a"
  awning-white: "#fffbf4"
  awning-hem: "#c9952a"
  ink-on-light: "#7a3a30"
  ink-on-dark: "#ecc9b8"
  error: "#a3263f"
typography:
  display:
    fontFamily: "Gloock, Times New Roman, serif"
    fontSize: "clamp(2.75rem, 6vw - 4px, 5.25rem)"
    fontWeight: 400
    lineHeight: 0.98
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Gloock, Times New Roman, serif"
    fontSize: "clamp(2.25rem, 1.6rem + 2.4vw, 3.5rem)"
    fontWeight: 400
    lineHeight: 1.02
    letterSpacing: "-0.015em"
  title:
    fontFamily: "Gloock, Times New Roman, serif"
    fontSize: "clamp(1.5rem, 1.25rem + 0.7vw, 1.875rem)"
    fontWeight: 400
    lineHeight: 1.1
  body:
    fontFamily: "Jost, Segoe UI, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Jost, Segoe UI, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 500
    lineHeight: 1.3
rounded:
  none: "0px"
  pill: "999px"
spacing:
  gutter: "clamp(16px, 4vw, 40px)"
  gap: "clamp(16px, 2.4vw, 32px)"
  section: "clamp(88px, 11vw, 160px)"
  tag: "14px"
components:
  button-primary:
    backgroundColor: "{colors.framboesa}"
    textColor: "{colors.pessego-light}"
    typography: "{typography.body}"
    rounded: "{rounded.pill}"
    padding: "0 1.6em"
    height: "54px"
  button-primary-hover:
    backgroundColor: "{colors.vinho}"
  button-on-dark:
    backgroundColor: "{colors.pessego-light}"
    textColor: "{colors.vinho}"
    rounded: "{rounded.pill}"
    padding: "0 1.6em"
    height: "54px"
  button-on-dark-hover:
    backgroundColor: "{colors.pessego-deep}"
  button-sign:
    backgroundColor: "{colors.pessego}"
    textColor: "{colors.vinho}"
    rounded: "{rounded.pill}"
    height: "42px"
  item-tag:
    backgroundColor: "{colors.pessego-light}"
    textColor: "{colors.espresso}"
    rounded: "{rounded.none}"
    padding: "{spacing.tag}"
  item-add:
    backgroundColor: "{colors.framboesa}"
    textColor: "{colors.pessego-light}"
    rounded: "{rounded.pill}"
    size: "46px"
  input:
    backgroundColor: "#ffffff"
    textColor: "{colors.espresso}"
    rounded: "{rounded.none}"
    padding: "13px 14px"
  nav-bar:
    backgroundColor: "{colors.framboesa}"
    textColor: "{colors.pessego-light}"
    height: "64px"
---

# Design System: Maria Gula Confeitaria

## Overview

**Creative North Star: "A Vitrine da Maria"**

The site is the front of Maria Gula's shop on Av. Nereu Ramos, painted in the colours of her opening poster. A framboesa sign bar sits over the shop's real awning, yellow and white stripes with a straight edge; behind the glass, a lit display case holds the sweets. Every item on every menu is a photo standing in the case with a cream price plaque stuck in front of it, so choosing feels like pointing at the vitrine.

The page moves like a shop you walk past. The case lights up when the page opens. The cake section holds still while the cakes slide past like a counter. The party sweets arrive scattered and land in rows on the table. Between these two scenes, quiet sections let each one land. Colour works in whole fields: each section takes one ground (pêssego, espresso, vinho, pêssego claro, framboesa) and changes at its edge with no blending. Type is two voices: Gloock for titles, prices and the name; Jost for everything read or operated.

The world refuses the generic bakery template: no cream page with a centred hero photo, no icon cards, no eyebrows above headings, no gradients or glass.

**Key Characteristics:**
- References chosen with the user: Bernice Bakery (rotating badge, arches, doodle stickers), Crumbl (the day's lineup as round top-down plates), Milk Bar (orders by occasion, a running phrase strip).
- Whole-section colour fields from the opening-poster palette.
- Shop objects drawn in CSS: the sign bar, the real yellow-and-white awning, the case's light strip and shelves, plates drawn to scale.
- Every menu item has a 4:5 photo with its price plaque in front.
- Two pinned scroll scenes (horizontal cake counter, sweets landing on the table), finished compositions on phones and under reduced motion.
- Square corners on photos, plaques, fields and inputs; fully round on every button and chip.
- Flat at rest; only floating things (order bar, toast, drawer) carry shadow.

## Colors

The palette comes from her opening poster ("Abertura", 26/09): raspberry and wine reds over peach, with a reddish espresso ink.

### Primary
- **Framboesa** (framboesa): the poster's raspberry band. The sign bar, the "Peça seu orçamento" field and every primary button and add button.
- **Pêssego** (pessego): the poster's peach ground. The first screen and "Quem faz é a Maria".

### Secondary
- **Vinho** (vinho): the tortas scene and "Visite a loja" fields, hover for framboesa and text on light buttons.
- **Rosé** (rose): shelf and group names on espresso, the footer name, and the "in your order" bar on plaques.

### Neutral
- **Espresso** (espresso): ink on light grounds; the display case, the delivery menu, the docinhos table and the footer. Espresso-raised is the one tone step above it.
- **Pêssego claro** (pessego-light): price plaques, the tamanhos field, the quote form panel, the order drawer and light text on dark fields. Pêssego escuro (pessego-deep) fills chips, steppers and plate rims.
- **Vinho escuro** (vinho-dark): the case's shelf bands and the "Mais sabores" card.
- **Tinted inks** (ink-on-light, ink-on-dark): secondary text, tinted from its ground.

### Awning
- **Awning yellow, white and hem** (awning-yellow, awning-white, awning-hem): the colours of the real awning over the shop on Av. Nereu Ramos, chosen by the user. They appear only in the awning.

### Named Rules
**The Whole Field Rule.** A section changes colour as a whole field at its edge. Colours never fade into each other and never appear as scattered decorative accents.

**The Real Awning Rule.** Yellow belongs to the awning alone. It never becomes a button, a field or an accent elsewhere.

**The Tinted Ink Rule.** Running text is full espresso or full pêssego claro. Secondary text uses the tinted ink for its ground; grey text does not exist in this system.

## Typography

**Display Font:** Gloock (with Times New Roman, serif)
**Body Font:** Jost (with Segoe UI, system-ui, sans-serif)

**Character:** Gloock's sharp, high-contrast serif echoes the "MARIA GULA" lettering and her poster headlines; Jost's geometric calm carries reading, prices' currency marks and controls.

### Hierarchy
- **Display** (400, clamp 2.75–5.25rem, 0.98): the hero title and the footer name. Two lines at most at every width.
- **Headline** (400, clamp 2.25–3.5rem, 1.02): one per section, naming it.
- **Title** (400, clamp 1.5–1.875rem, 1.1): shelf, cake and group names, prices, the address, the quote, totals, plate sizes.
- **Body** (400, 1.125rem, 1.55): running text and buttons, measure about 26–32em.
- **Label** (500, 0.9375rem): item names on plaques, captions, helper text, chips, small buttons, nav links. Sentence case, never tracked capitals.

### Named Rules
**The Currency Rule.** "R$" is always set in Jost at 0.55em, raised; Gloock's dollar sign reads as "RS" at display sizes. Prices use tabular figures.

**The Two-Line Rule.** No heading runs past two lines at any width; cut words before shrinking type.

## Layout

A 12-column grid inside a 1320px container, with equal outer gutters (clamp 16–40px) and column gaps (clamp 16–32px). Sections are separated by their colour change and clamp(88px, 11vw, 160px) of padding.

The site has two pages, one per job, sharing the sign bar, the footer, the stylesheet and the script:
- **Hoje** (`index.html`): what you can buy today. Vitrine, phrase strip, cardápio do dia, a bridge to orders, Maria, visit. Grounds: pêssego, framboesa, pêssego claro, espresso, pêssego, vinho, espresso footer.
- **Encomendas** (`encomendas.html`): what you plan ahead. Occasions under the same awning, tortas, tamanhos, docinhos, orçamento. Grounds: pêssego, vinho, pêssego claro, espresso, framboesa, espresso footer.

Each section has its own composition:
- **First screen (Hoje):** copy in 5 columns beside the display case in 7.
- **Day's menu:** a sticky heading block in 4 columns beside dishes in 8. Rows of four round dishes; single-item rows pair up as half rows.
- **Bridge to orders:** copy in 5 columns beside a fan of three framed product photos in 7.
- **Maria:** copy with a strip of her own photos beside a large portrait.
- **Visit:** the map beside the address and hours.
- **First screen (Encomendas):** the awning, then the h1 in 7 columns beside the lead, actions and in-page links in 5 (bottom-aligned), then the four occasion cards in a staggered row.
- **Tortas:** a horizontal run of cake cards, plus a final "Mais sabores" list card.
- **Tamanhos:** copy beside three plates drawn to scale.
- **Docinhos:** groups with prices in 4 columns beside a four-column table of sweets.
- **Orçamento:** sticky rules in 5 columns beside the form panel in 6.

At 1023px and below every pair stacks to one column. At 760px and below:
- the navigation collapses behind a menu button;
- the first-screen case becomes a horizontal snap shelf touching the menu;
- shelves run two items per row;
- tortas swipe natively;
- docinhos sit three per row.

## Elevation & Depth

Flat by default. Depth comes from tone steps between surfaces (plaque over photo, pêssego claro over pêssego escuro, espresso over shelf bands) and from the drawn case. Shadows exist only on things that float.

### Shadow Vocabulary
- **Order bar** (`box-shadow: 0 0 0 3px #f9d8c2, 0 14px 32px -12px rgba(58,20,14,.6)`): the floating order summary.
- **Toast** (`box-shadow: 0 0 0 2px #3a140e, 0 12px 28px -12px rgba(58,20,14,.5)`): short confirmations with undo.
- **Drawer** (`box-shadow: -20px 0 48px -24px rgba(58,20,14,.5)`): the order panel over a 55% espresso backdrop.

### Named Rules
**The Flat-At-Rest Rule.** Nothing that sits in the page flow casts a shadow. If it does not float, it does not have one.

## Shapes

Three shapes, each with one job:
- **Square:** product photos in the display case and the tortas run, plaques, fields and panels.
- **Circle:** the day's menu dishes, seen from above like plates, and the rotating badge.
- **Arch** (999px 999px 0 0): people and occasions (the Maria portrait, her strip of photos, the occasion cards).


Two corner values only:
- **Square (0):** photos, plaques, fields, inputs, the case and the form panel.
- **Fully round (999px):** every button, chip, stepper and the order bar.

The awning copies the one over the shop door: 24px stripes, alternating yellow and white, with a straight edge and a 6px darker yellow hem that outlines it against the peach. The tamanhos plates are the only curved forms.

## Components

### Buttons
- **Shape:** fully round pill, 54px tall (42px small).
- **Primary:** framboesa fill with pêssego claro text; hover vinho; press scales to 0.96.
- **On dark grounds:** pêssego claro fill with vinho text; hover pêssego escuro.
- **Sign bar:** pêssego fill with vinho text.
- **Text link:** the secondary action, underlined 2px with a 0.22em offset; the underline turns rosé on hover.

### Item (signature)
- **Photo:** 4:5, square corners, with a 1.04 zoom on hover.
- **Plaque:** pêssego claro, 14px padding, overlapping the photo's bottom edge by 26px. It holds:
  - the name, with an optional note;
  - optional flavour chips, a radio group;
  - the price in Title with the Currency Rule;
  - a 46px round framboesa add button.
- **State:** once in the order, the button carries an espresso count badge and the plaque a 6px rosé base bar; adding lifts the plaque 6px for a moment.
- **With flavours:** on a shelf, the item spans two columns, with its photo beside the plaque instead of above it.

### Display Case
- An espresso box holding:
  - an 8px pêssego claro light strip;
  - three featured items;
  - a vinho escuro shelf band where the case meets the menu.
- On load the photos go from dimmed (brightness 0.35) to lit, left to right, 160ms apart.

### Cake Card
- A 4:5 photo, the name in Title with its price per kilo, a two-line description, and a "Quero esta torta" button on dark that pre-selects the cake in the quote form.
- The last card lists the remaining flavours in two columns on vinho escuro.

### Plates
- Pêssego escuro rims with rosé centres, sized in proportion to 15, 20 and 25 cm.
- A plate is a button that selects that size in the quote form; when chosen, its centre turns framboesa.

### Inputs / Fields
- **Style:** white field, 2px pêssego escuro border, square, persistent label above, helper text below.
- **Focus:** the border turns espresso.
- **Error:** error red border and message, tied with aria-describedby.
- **Choice chips:** pêssego escuro pills; the selected one turns espresso.

### Rotating Badge
- A 132px framboesa disc pinned to the top-right corner of the display case, with "FEITO HOJE • MEIA PRAIA • ITAPEMA •" in pêssego claro around the chef's hat.
- It spins slowly (28s) and turns further as the page scrolls. It stays still under reduced motion.

### Phrase Strip
- A framboesa band right under the first screen, with brand phrases in Gloock at headline size, separated by the hat icon.
- It runs on its own and speeds up or reverses with the scroll. It pauses off screen and is static under reduced motion.

### Doodle Stickers
- The logo's line drawings (hat, whisk, cupcake, heart, cake slice, strawberry), drawn twice: an 11px outline in the ground's light tone under a 3.2px coloured line, so they read as die-cut stickers.
- One or two per section, beside text and never over it. They drift slower than the page and tilt slightly.

### Dish (day's menu)
- A round top-down photo (up to 196px) with the name in Jost 600, a one-line description, optional flavour chips, a Gloock price and the round add button.
- On hover the photo turns 8° and zooms; once in the order it gets a rosé ring.

### Occasion Card
- An arched 4:5 photo, the occasion name in Title, one line of text and a framboesa "Pedir orçamento" button that preselects the occasion in the quote form.
- Even cards sit 64px lower, so the row reads as a staggered line instead of a grid.

### Bridge to Orders
- An espresso field on the Hoje page, right after the day's menu: "Tem festa chegando?", one sentence, a pêssego claro "Ver encomendas" button with an arrow and a "Pedir orçamento" link.
- Three product photos in 8px pêssego claro frames, like prints on a table. They arrive stacked and fan out (±10°) as the section rises into view; reduced motion shows them already fanned.

### Paper Grain
- A fixed fractal-noise overlay at 32% over the whole page, like the printed poster.

### Navigation
- A framboesa sign bar, 64px, sticky, holding:
  - the hat-and-name wordmark in Gloock;
  - four Jost links (Cardápio do dia, Encomendas, A Maria, Visite) with a 2px pêssego underline on hover; the current page keeps it;
  - one button for the page's job: "Fazer pedido" on Hoje, "Pedir orçamento" on Encomendas (shortened to "Orçamento" on phones).
- On phones the links drop into a full-width framboesa panel.
- Smooth scrolling turns on only after the page loads, so a link from the other page (`encomendas.html#docinhos`) lands in place instead of sliding through the scenes.

### Order Bar and Drawer
- **Order bar:** a floating espresso pill with the count in a framboesa circle, "Ver pedido", and the total in Gloock.
- **Drawer:** opens on the right in pêssego claro, with an espresso header. It holds:
  - line items with thumbnails and round steppers;
  - the name, delivery choice, address and notes fields;
  - a pêssego escuro footer with the subtotal and the send button.

### Motion
- **One focal move per scene:**
  - the case lighting up;
  - the cake counter sliding while each photo drifts slightly slower than its card;
  - the sweets landing on the table;
  - the bridge photos fanning out.
- **Quiet layer:**
  - headings and text rise 28px in order (90ms apart);
  - photos open like a curtain (clip-path on the image, scale 1.12 to 1);
  - the hero copy drifts and fades as you scroll.
- **Easing:** cubic-bezier(0.16, 1, 0.3, 1) throughout.
- **Reduced motion:** gets the finished compositions.

## Do's and Don'ts

### Do:
- **Do** give each section one whole colour field and change it at the section edge.
- **Do** show every menu item with its own 4:5 photo and price plaque.
- **Do** set every price with the Currency Rule and tabular figures.
- **Do** use framboesa for the primary action on light grounds and pêssego claro buttons on dark grounds, one primary per screen.
- **Do** keep a quiet section between two scroll scenes, and give each scene a finished composition for phones and reduced motion.

### Don't:
- **Don't** put a small label or eyebrow above a heading.
- **Don't** use gradients, glass, glows or shadows on anything that sits in the page.
- **Don't** add a third typeface or use tracked uppercase labels.
- **Don't** use a medium radius: corners are square or fully round.
- **Don't** let anything move across a heading or a statement while it is being read.
- **Don't** place a doodle sticker over text, or use more than two in one section.
