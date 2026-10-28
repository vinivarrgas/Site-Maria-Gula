---
name: Maria Gula Confeitaria
description: A light, warm confeitaria site on vanilla and blush, with the chocolate of the logo for brand and actions, led by a whole cake photographed on pink.
colors:
  chocolate: "#321a14"
  chocolate-raised: "#4a2a21"
  baunilha: "#fbf7f1"
  baunilha-deep: "#f2e9df"
  blush: "#ebc4bf"
  blush-deep: "#e2b2ac"
  blush-light: "#f7e8e4"
  capa: "#f4c8c6"
  caramelo: "#c49a78"
  cacau: "#85563f"
  ink: "#321a14"
  ink-soft: "#76665f"
  light: "#fbf7f1"
  light-soft: "#d9c8bf"
  error: "#a3263f"
typography:
  hero:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "clamp(2.75rem, 1.6rem + 4.4vw, 5.5rem)"
    fontWeight: 400
    lineHeight: 0.98
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "clamp(2.25rem, 1.4rem + 3vw, 4rem)"
    fontWeight: 400
    lineHeight: 1.02
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "clamp(1.3rem, 1.12rem + 0.7vw, 1.75rem)"
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
  soft: "4px"
  pill: "999px"
spacing:
  gutter: "clamp(20px, 4vw, 48px)"
  gap: "clamp(16px, 2.4vw, 32px)"
  section: "clamp(88px, 10vw, 152px)"
components:
  button-primary:
    backgroundColor: "{colors.chocolate}"
    textColor: "{colors.light}"
    rounded: "{rounded.pill}"
    height: "56px"
  button-primary-hover:
    backgroundColor: "{colors.chocolate-raised}"
  button-blush:
    backgroundColor: "{colors.blush}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    height: "56px"
  button-blush-hover:
    backgroundColor: "{colors.blush-deep}"
  add-button:
    backgroundColor: "{colors.chocolate}"
    textColor: "{colors.light}"
    rounded: "{rounded.pill}"
    height: "44px"
  chip:
    backgroundColor: "{colors.baunilha-deep}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
  chip-active:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.light}"
  input:
    backgroundColor: "#ffffff"
    textColor: "{colors.ink}"
    rounded: "{rounded.soft}"
    padding: "13px 14px"
  header:
    backgroundColor: "{colors.baunilha}"
    textColor: "{colors.ink}"
    height: "80px"
---

# Design System: Maria Gula Confeitaria

## Overview

**Creative North Star: "Uma pausa para saborear"**

A handmade confeitaria where a slice, a coffee and a pause get special care. The site should feel like a more organised, more refined extension of her shop and her Instagram: warm, close and inviting, with a light elegance. Products are the protagonists; the people behind them (Maria, the team, the shop) give it warmth.

The look is light and delicate: vanilla grounds, blush used sparingly, and the chocolate of the logo for the brand, headings, the main action and the footer. Strawberry red and chocolate brown come from the photographs, not from the UI.

**Key Characteristics:**
- A first screen on pink: the phrase and the invitation on the left, a whole cake on its plate, photographed on the same pink, on the right (on top on phones). The photo's edge fades into the pink.
- Two grounds that alternate: baunilha and blush-light. The footer is chocolate.
- One primary action colour, chocolate; blush for secondary actions and small highlights.
- Menus as clean grids of 4:5 photos with name, short description, price and "Adicionar".
- Two typefaces: Fraunces for headings and the wordmark, Jost for everything read or operated. Script fonts only for special occasions, never for information.

## Colors

Proposed tones, not yet measured from the original logo file.

- **Chocolate** (#321A14): logo, headings, primary button, add button, footer, drawer header. Chocolate-raised is its hover.
- **Baunilha** (#FBF7F1): the predominant ground and the header once solid. Baunilha-deep fills chips, steppers, closed occasion rows, field borders and the in-page bar.
- **Blush** (#EBC4BF): secondary buttons (chocolate text), the order count, small highlights. Blush-light (#F7E8E4) is the alternating section ground.
- **Capa** (#F4C8C6): the pink of the cover photos' backgrounds, measured at their edges. Only the first screen.
- **Caramelo** (#C49A78): details only (link underlines, list markers, nav underline, scrollbar). Never text: it fails contrast on vanilla.
- **Cacau** (#85563F): caramelo darkened for text: prices per kilo, fact labels, the menu date, the open occasion.
- **Cinza quente** (#76665F, ink-soft): descriptions and secondary information.

### Named Rules
**The Blush-Sparingly Rule.** Blush is a highlight and a secondary button, not a ground for whole sections (blush-light is). On the pink first screen, the secondary button turns baunilha so it does not disappear.

**The Chocolate-Text-On-Pink Rule.** Text on blush or on the cover pink is always chocolate.

## Typography

**Display Font:** Fraunces (optical size 144 for headings), with Georgia.
**Body Font:** Jost, with Segoe UI and system-ui.

- **Hero** (clamp 2.75–5.5rem): the first-screen phrase ("Uma pausa para saborear.", "Uma torta especial para a sua próxima comemoração.").
- **Headline** (clamp 2.25–4rem): one per section.
- **Title** (clamp 1.3–1.75rem): prices, occasion and cake names, fact labels, the address, the quote.
- **Body** (1.125rem): running text and buttons.
- **Label** (0.9375rem, 500): product names, captions, chips, nav links.

The wordmark is the hat icon beside "MARIA GULA" in Fraunces capitals and "CONFEITARIA" in spaced Jost capitals. The cover's small line ("Maria Gula · Confeitaria artesanal & café") is the only other place for spaced capitals.

**The Currency Rule.** "R$" in Jost at 0.55em, raised; prices use tabular figures.

## Layout

A 12-column grid inside 1320px, gutters clamp 20–48px. Sections change ground at their edge and have clamp(88px, 10vw, 152px) of padding.

- **Hoje** (`index.html`): first screen (capa pink), Cardápio do dia (baunilha), Tem festa chegando? (blush-light), Quem faz é a Maria (baunilha), Visite a loja (blush-light), footer (chocolate).
- **Encomendas** (`encomendas.html`): first screen (capa pink), in-page bar (baunilha-deep), Ocasiões (baunilha), Tortas and all flavours (blush-light), Tamanhos (baunilha), Docinhos (blush-light), Orçamento (baunilha), footer (chocolate).

## Photography

- **Catalogue:** the whole cake or the whole plate, margin around it, blush or cream background, soft window light. The same setup for every flavour gives the catalogue unity.
- **Brand story:** real photos of Maria, the team, the making and the shop.
- Product photos must show faithfully what the customer receives. The current cover photos are AI-made style references and must be replaced by Maria's own cakes shot this way.

## Shapes and Depth

- **Soft (4px):** photos, fields, the form panel, occasion rows, the map.
- **Fully round:** buttons, chips, steppers, the order bar.
- Flat at rest; only floating things (solid header, order bar, toast, drawer) carry a soft chocolate-tinted shadow.

## Voice

Warm, simple and appetising. Concrete descriptions beat adjectives:
- Product: "Creme de morango, cobertura de chocolate branco e morangos no topo."
- Invitation: "Escolha sua fatia e fique para um café."
- Order: "Uma torta especial para a sua próxima comemoração."
- Signature: "Uma pausa para saborear."

## Motion

The cover photo fades in from 1.06 and drifts slower than the page on scroll; section parts rise in order; photos open like a curtain; the cake run pins on large screens. Easing cubic-bezier(0.16, 1, 0.3, 1). Reduced motion gets the finished compositions.

## Do's and Don'ts

### Do:
- **Do** let the photograph carry the colour (strawberry red, chocolate) and keep the UI vanilla, blush and chocolate.
- **Do** show every product with its own 4:5 photo, price and add button.
- **Do** keep one primary (chocolate) action per screen.
- **Do** use only prices and hours the shop published, and one single, current set of hours.

### Don't:
- **Don't** use blush as text or caramelo as text.
- **Don't** bring back the dark grounds, wine or raspberry of the previous version.
- **Don't** add stickers, doodles, stripes, grain or tilted photos.
- **Don't** add a third typeface for information; script only for special pieces.
- **Don't** present AI or stock photos as Maria's products in the published site.
