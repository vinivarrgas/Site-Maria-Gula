# Surface brief: index.html (home)

Scope: the whole one-page site. Visitor mode: **Persuade** (the visitor decides and orders).
Audience and job: a phone visitor from Instagram choosing today's sweet and sending the order on WhatsApp; secondarily, someone planning a custom order or a visit.
Action: build an order from the delivery menu and send it to WhatsApp. Proof: real photos of her sweets, the real menu with prices, the shop's real address and hours, a live open/closed status.
Constraints: low-resolution photos (show at modest sizes); no invented proof; code-led build (no comp tooling available in this session).

## Direction contract

THESIS: The page is the shop window of Maria Gula on Av. Nereu Ramos: a glass display case whose shelves hold today's delivery menu as price plaques you can tap into an order. It refuses the category default of a cream page with a hero photo, a centred menu list and a contact block.

OWN-WORLD (rewritten 27/10 for the user's brand palette, from her opening poster): framboesa #B83A48 (sign bar, quote field, primary and add buttons), vinho #892D32 (tortas and visit fields, awning stripe), rosé #C66D63 (awning stripe, names on dark), pêssego #FCE8D8 (first screen and Maria fields), espresso #3A140E (ink, display case, delivery menu, docinhos table field, footer); tints pêssego claro #FDEFE0 (plaques, tamanhos field, form panel), pêssego escuro #F9D8C2, vinho escuro #5E2420 (shelf bands, the table top). A framboesa sign bar over a scalloped vinho-and-rosé awning. Gloock for display and prices, Jost for text. Square photos and plaques, fully round buttons. No shadows at rest, no gradients, no eyebrows.

STORY: The visitor sees the shop window lit, knows it is a confeitaria in Meia Praia open now, taps into the delivery case, fills an order with flavours, sends it to WhatsApp; then sees custom orders, who Maria is, and how to get there.

FIRST VIEWPORT: Sign bar (wordmark, four links, "Fazer pedido") over the striped awning. On pink: left five columns hold h1 "Seu doce favorito, hoje!" at display size on two lines, one supporting sentence, the primary pill "Fazer pedido" and the live status with address. Right seven columns: the chocolate display case, its top shelf holding three photos that light up left to right, its lower shelf holding three real menu price plaques (from `destaques` in dados.js) that add to the order. The case runs down to meet the chocolate menu. Phone: copy first, then the case with a swipeable photo shelf and the plaques two per row.

FORM: Shop vitrine (third of four presented; chosen by the user). Signature interaction: tapping a plaque's add button puts the item in the order, the button shows the count, the plaque gets a pink base bar and the order bar rises. seed: none (unavailable). Reason: only the skill's markdown files were installed, at the user's choice; the concept-seed script and impeccable CLI are not on this machine, so no roll ran and the user chose among four directions presented by hand.

UPDATE 27/10/2026 (user request: "sofisticado", "WOW", scroll effects, a photo for every menu item, sample of the full menu, brand palette from the opening poster across the site):
- Every menu item is a photo standing in the case with its price plaque in front; demo photos are free-licence stock (credited in the footer), the hero photos of her own work move to "Quem faz é a Maria".
- Two scroll scenes from different families, with a quiet section between them: (1) "Tortas por encomenda" pins and runs the cake cards horizontally (vinho field); (2) "Docinhos de festa" pins while the sweets arrive scattered from the right and land in rows on the table (espresso field). Phone and reduced motion get the finished composition: tortas as a native swipe row, docinhos as a static grid.
- New sections: tamanhos (plates drawn to scale, pick one for the quote) and "Peça seu orçamento" (form that composes the WhatsApp quote with name, date ≥ 2 days, people, torta, size, docinhos, pickup or delivery).
- Quiet layer: headings and text rise per part, photos open as a curtain (clip-path on the child), hero copy drifts and fades as you scroll.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

- Awning (27/10, user's choice after seeing the real storefront): yellow #E3B03A and white #FFFBF4 stripes, straight edge, 6px #C9952A hem. Yellow is used only in the awning.
- 27/10, split into two pages (user's request): `index.html` is Hoje (vitrine, faixa, cardápio do dia, a bridge "Tem festa chegando?" to orders, Maria, visit) and `encomendas.html` is Encomendas (occasions as its first screen under the awning, tortas, tamanhos, docinhos, orçamento). The order cart lives on Hoje; the quote form on Encomendas. The nav links both pages and each page's header button matches its job.
- 27/10, premium redesign (user: "muito amadora, estilo Canva"; wants premium, clear, direct to sale, a first screen with a mouth-watering signature dessert, the name and the slogan, and strong contrast between layers). Removed every ornament (awning, stickers, rotating badge, phrase strip, paper grain, arches, display case, photo fan, the sweets-landing scene). New system in DESIGN.md: full-screen dessert photo fused into black, three alternating grounds (dark, creme, vinho/framboesa), one action colour, day's menu as one filterable grid, occasions as an accordion with a large photo, all 21 flavours listed. taste-skill applied by hand: its scripts (draw, inspect, assets) are not installed, so no direction was dealt and no inspector ran; checked with CDP screenshots at 1440x900 and 390x844 instead.
- 27/10 round from the user's chosen references (Bernice Bakery, Crumbl, Milk Bar): rotating badge on the case, phrase strip under the first screen, logo doodles as stickers, arches for people and occasions, the day's menu as round dishes with descriptions (sample copy, CONFIRMAR), orders by occasion feeding the quote form, paper grain overall.
