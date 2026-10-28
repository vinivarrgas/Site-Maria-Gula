---
name: Maria Gula Confeitaria
description: A confeitaria's site in three alternating grounds (chocolate, cream, berry), led by a full-screen photo of the dessert and a clear path to order today or for a party.
colors:
  noite: "#0f0909"
  espresso: "#2b120d"
  espresso-raised: "#3d1d16"
  vinho: "#7e2a2f"
  framboesa: "#b83a48"
  framboesa-deep: "#9b2f3c"
  creme: "#fdf2e7"
  creme-deep: "#f5e0cf"
  branco: "#fffaf5"
  rose: "#eaa69c"
  ink: "#2b120d"
  ink-soft: "#6b463c"
  light: "#fdf2e7"
  light-soft: "#dcc3b6"
  error: "#a3263f"
typography:
  name:
    fontFamily: "Gloock, Times New Roman, serif"
    fontSize: "clamp(4.25rem, 10.4vw, 10rem)"
    fontWeight: 400
    lineHeight: 0.9
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Gloock, Times New Roman, serif"
    fontSize: "clamp(2.5rem, 1.5rem + 3.6vw, 4.75rem)"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Gloock, Times New Roman, serif"
    fontSize: "clamp(1.375rem, 1.15rem + 0.8vw, 1.875rem)"
    fontWeight: 400
    lineHeight: 1.15
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
  gutter: "clamp(20px, 4vw, 48px)"
  gap: "clamp(16px, 2.4vw, 32px)"
  section: "clamp(96px, 11vw, 168px)"
components:
  button-primary:
    backgroundColor: "{colors.framboesa}"
    textColor: "{colors.light}"
    typography: "{typography.body}"
    rounded: "{rounded.pill}"
    padding: "0 1.75em"
    height: "56px"
  button-primary-hover:
    backgroundColor: "{colors.framboesa-deep}"
  button-light:
    backgroundColor: "{colors.creme}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0 1.75em"
    height: "56px"
  button-light-hover:
    backgroundColor: "{colors.creme-deep}"
  add-button:
    backgroundColor: "{colors.framboesa}"
    textColor: "{colors.light}"
    rounded: "{rounded.pill}"
    height: "44px"
  chip:
    backgroundColor: "{colors.creme-deep}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
  chip-active:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.light}"
  input:
    backgroundColor: "#ffffff"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "13px 14px"
  header:
    backgroundColor: "{colors.espresso}"
    textColor: "{colors.light}"
    height: "76px"
---

# Design System: Maria Gula Confeitaria

## Overview

**Creative North Star: "Dá água na boca, e dá para pedir"**

The site opens on one dessert photographed against black, filling the screen, with the name Maria Gula and her slogan beside it. Everything after that is organised around the two things a visitor comes to do: order today's menu, or order for a party. Each page has one job (Hoje, Encomendas), each section says one thing, and each section sits on its own ground, so the page reads as clear layers: chocolate, cream, berry.

Premium here means restraint and appetite: big photographs with square corners, large Gloock headings, generous space, one action colour, and no decoration that is not food. Type is two voices: Gloock for the name, headings and prices; Jost for everything read or operated.

The site refuses the template look of the category (and the earlier round of this project, judged "Canva" by the user): no stickers or doodles, no awning stripes, no rotating badges, no running phrase strips, no paper grain, no arches, no tilted photo stacks, no eyebrows, no gradients used as decoration.

**Key Characteristics:**
- A full-screen first screen: the dessert photo fills the background and fuses into black, with the name, the slogan, one sentence, two actions (today, party) and the live open/closed status.
- Three grounds that alternate with strong contrast: dark (noite, espresso), light (creme) and colour (vinho, framboesa footer).
- One action colour, framboesa, on every primary button and add button.
- Menus shown as clean grids of 4:5 photos with name, description, price and an "Adicionar" button; categories are filter chips, not scattered blocks.
- One pinned scroll scene (the cake run), quiet entrances elsewhere, and a slow drift on the first-screen photo.
- Square corners on every photo and field; fully round on every button and chip.
- Flat at rest; only floating things (header after the first screen, order bar, toast, drawer) carry shadow.

## Colors

The brand colours come from her opening poster (raspberry and wine over peach, with a reddish espresso ink), pushed darker and creamier for contrast.

### Primary
- **Framboesa** (framboesa): the one action colour. Primary buttons, add buttons, the footer field, the date in "Cardápio do dia", the open occasion name. Framboesa-deep is its hover.

### Grounds
- **Noite** (noite): the black of the first-screen photos. Only the first screen.
- **Espresso** (espresso): dark sections (Visite, Tortas), the solid header and the drawer header. Espresso-raised is one tone step above it.
- **Creme** (creme): light sections (Cardápio do dia, A Maria, Ocasiões, Tamanhos, Orçamento). Creme-deep fills chips, closed occasion rows, steppers and plate rims. Branco is the form panel and the open occasion row.
- **Vinho** (vinho): the colour sections ("Tem festa chegando?", Docinhos).

### Accent on dark
- **Rose** (rose): small highlights on dark grounds only: the slogan, prices per kilo, fact labels, the wordmark hat.

### Inks
- **Ink / ink-soft** on light grounds; **light / light-soft** on dark grounds. Running text is always the full ink; the soft inks are for secondary notes.

### Named Rules
**The Layer Rule.** Neighbouring sections never share a ground. Dark follows light follows colour; the change happens at the section edge, never in a fade.

**The One Action Rule.** Framboesa is reserved for actions (and the footer field). Nothing decorative is framboesa.

**The Dark-Ground Rule.** Rose appears only on dark grounds, and only on short text.

## Typography

**Display Font:** Gloock (with Times New Roman, serif)
**Body Font:** Jost (with Segoe UI, system-ui, sans-serif)

**Character:** Gloock's sharp, high-contrast serif is the pâtisserie voice and echoes the "MARIA GULA" lettering; Jost's geometric calm carries reading, prices' currency marks and controls.

### Hierarchy
- **Name** (400, clamp 4.25–10rem, 0.9): the first-screen h1 ("Maria Gula", "Encomendas") and the footer name, which fills the width.
- **Headline** (400, clamp 2.5–4.75rem, 1.0): one per section, naming it.
- **Title** (400, clamp 1.375–1.875rem, 1.15): the slogan, prices, occasion names, fact labels, cake names, the address, the quote.
- **Body** (400, 1.125rem, 1.55): running text and buttons, measure about 27–32em.
- **Label** (500, 0.9375rem): product names, captions, helper text, chips, small buttons, nav links. Sentence case, never tracked capitals.

### Named Rules
**The Currency Rule.** "R$" is always set in Jost at 0.55em, raised; Gloock's dollar sign reads as "RS" at display sizes. Prices use tabular figures.

**The Two-Line Rule.** No heading runs past two lines at any width; a one-word name scales with the viewport (min(name size, 15vw)) so it never crosses the edge.

## Layout

A 12-column grid inside a 1320px container, with equal outer gutters (clamp 20–48px) and column gaps (clamp 16–32px). Sections are separated by their ground change and clamp(96px, 11vw, 168px) of padding.

Two pages, one job each, sharing the header, the footer, the stylesheet and the script:
- **Hoje** (`index.html`): first screen (noite), Cardápio do dia (creme), Tem festa chegando? (vinho), Quem faz é a Maria (creme), Visite a loja (espresso), footer (framboesa).
- **Encomendas** (`encomendas.html`): first screen (noite), a sticky bar of in-page links, Ocasiões (creme), Tortas and all flavours (espresso), Tamanhos (creme), Docinhos (vinho), Orçamento (creme), footer (framboesa).

Compositions:
- **First screen:** the photo fills the right two thirds and fuses into black on its left edge; the copy block sits in the left half. On phones the photo fills the top and fuses into black at the bottom, with the copy under it.
- **Cardápio do dia:** heading and date on the left, how-to sentence on the right, sticky filter chips, then a four-column grid (three on tablet, two on phones).
- **Tem festa chegando?:** a photo bleeding to the left edge for half the width; heading, sentence, three facts with prices and two actions on the right.
- **Maria:** large portrait in 5 columns, story, quote and three of her photos in 6.
- **Visite:** address, hours, status and actions in 5 columns beside the map in 6.
- **Ocasiões:** heading and an accordion of occasions in 5 columns; the open occasion's photo fills 6 columns on the right (inline in each row on tablet and phones).
- **Tortas:** a pinned horizontal run of the six most-ordered cakes, then all 21 flavours in three columns with price and description.
- **Tamanhos:** copy beside three plates drawn to scale.
- **Docinhos:** groups with prices in 4 columns beside a four-column grid of sweets (two on phones).
- **Orçamento:** sticky rules in 5 columns beside the form panel in 6.
- **Footer:** the name across the full width, then four columns (address, hours, contact, ordering links).

## Elevation & Depth

Flat by default. Depth comes from tone steps between surfaces (branco over creme, creme-deep under chips, espresso-raised over espresso). Shadows exist only on things that float.

### Shadow Vocabulary
- **Header** (`0 10px 30px -18px rgba(15,9,9,.7)`): only once it turns solid after the first screen.
- **Order bar** (`0 0 0 3px #f5e0cf, 0 14px 32px -12px rgba(43,18,13,.6)`): the floating order summary.
- **Toast** (`0 0 0 2px #2b120d, 0 12px 28px -12px rgba(43,18,13,.5)`): short confirmations with undo.
- **Drawer** (`-20px 0 48px -24px rgba(43,18,13,.5)`): the order panel over a 60% noite backdrop.

### Named Rules
**The Flat-At-Rest Rule.** Nothing that sits in the page flow casts a shadow. If it does not float, it does not have one.

## Shapes

Two corner values only:
- **Square (0):** every photo, the form panel, fields, the occasion rows, the map.
- **Fully round (999px):** every button, chip, stepper and the order bar.

The tamanhos plates are the only drawn circles. The first-screen photo's fused edge is a mask on the photograph, not a decorative gradient.

## Components

### Header
- Fixed, 76px (64px on phones): the hat-and-name wordmark, four links (Cardápio do dia, Encomendas, A Maria, Visite) with a 2px rose underline on hover and on the current page, and one framboesa button for the page's job ("Fazer pedido" or "Pedir orçamento", shortened to "Orçamento" on phones).
- Transparent over the first screen; espresso with a soft shadow once the first screen has passed. On phones the links drop into an espresso panel.

### First Screen
- The name in the Name size, the slogan in Title (rose), one sentence in light-soft, a primary and a light button, and the live status with a dot (green when open).
- On load the photo settles from 1.12 scale and fades in; the copy rises in order. On scroll the photo drifts down slower than the page and comes 6% closer.

### Buttons
- **Primary:** framboesa pill, 56px (44px small); hover framboesa-deep; press scales to 0.96; an arrow icon nudges 3px right on hover.
- **Light:** creme pill with ink text, for the second action on dark grounds.
- **Text link:** underlined 2px, rose underline that turns to the text colour on hover.

### Product (day's menu)
- A 4:5 photo (zooms 1.05 on hover), the name in Jost 600 with an optional framboesa note pill, a one-line description, optional flavour chips, then the price in Title and the "+ Adicionar" pill.
- In the order: a 4px framboesa ring inside the photo and an ink count badge on the button; adding pops the photo.

### Filter Chips
- Creme-deep pills; the pressed one turns ink. "Tudo" first. They filter the grid in place (aria-pressed) and stick under the header while the menu scrolls.

### Facts
- Three rows on vinho: the label in Title (rose), the fact in Body with real prices from the data file.

### Occasion Accordion
- Creme-deep rows with the name in Title and an arrow; the open row turns branco, its name framboesa and the arrow points down, showing one line of text and "Pedir orçamento" (which pre-selects the occasion in the form). The open occasion's photo crossfades in the right column.

### Cake Card and Flavour List
- Card: 4:5 photo, name in Title with the price per kilo in rose, description, a light "Quero esta torta" button that pre-selects the cake in the form.
- List: every flavour with its price per kilo and description, three columns on desktop.

### Plates
- Creme-deep rims with rose centres, sized in proportion to 15, 20 and 25 cm. A plate is a button that selects that size in the form; when chosen, its centre turns framboesa.

### Inputs / Fields
- **Style:** white field, 2px creme-deep border, square, persistent label above, helper text below.
- **Focus:** the border turns ink.
- **Error:** error red border and message, tied with aria-describedby.
- **Choice chips:** creme-deep pills; the selected one turns ink.

### Order Bar and Drawer
- **Order bar:** a floating ink pill with the count in a framboesa circle, "Ver pedido", and the total in Gloock.
- **Drawer:** opens on the right in creme, with an ink header: line items with thumbnails and round steppers; name, delivery choice, address and notes; a creme-deep footer with the subtotal and the send button.

### Motion
- **Signature:** the first-screen photo settling in and drifting on scroll.
- **Scene:** the cake run pinned under the header and the in-page bar, sliding horizontally while each photo drifts slightly slower than its card.
- **Quiet layer:** section parts rise 28px in order (80ms apart); photos open like a curtain (clip-path, scale 1.1 to 1); the occasion photo crossfades.
- **Easing:** cubic-bezier(0.16, 1, 0.3, 1) throughout.
- **Reduced motion:** gets the finished compositions; smooth scrolling turns on only after load, so links with anchors land in place.

## Do's and Don'ts

### Do:
- **Do** open every page with one large, appetising photograph and the page's name in the Name size.
- **Do** give neighbouring sections different grounds (dark, light, colour) and change them at the section edge.
- **Do** show every menu item with its own 4:5 photo, price and add button, in a regular grid.
- **Do** set every price with the Currency Rule and tabular figures, and fill price ranges from the data file.
- **Do** keep framboesa for actions, with one primary action per screen.

### Don't:
- **Don't** add stickers, doodles, badges, stripes, grain, arches or tilted photos: decoration that is not food reads as Canva.
- **Don't** put a small label or eyebrow above a heading.
- **Don't** use gradients, glass, glows or shadows on anything that sits in the page.
- **Don't** add a third typeface or use tracked uppercase labels.
- **Don't** use a medium radius: corners are square or fully round.
- **Don't** let a category or section leave a half-empty row: filter or merge instead.
