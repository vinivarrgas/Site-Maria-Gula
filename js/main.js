(() => {
  'use strict';

  const D = window.MARIA_GULA;
  if (!D) return;
  window.__mgPronto = true;

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
  const reduzMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const ITENS = new Map(D.cardapio.flatMap((cat) => cat.itens.map((item) => [item.id, item])));
  const TORTAS = new Map(D.tortas.map((t) => [t.id, t]));

  const foto = (arquivo) => `assets/img/cardapio/${arquivo}.jpg`;
  const linkWhats = (texto) => `https://wa.me/${D.whatsapp}${texto ? `?text=${encodeURIComponent(texto)}` : ''}`;
  const hora = (h) => (Number.isInteger(h) ? `${h}h` : `${Math.floor(h)}h${String(Math.round((h % 1) * 60)).padStart(2, '0')}`);
  // No display, o "R$" da Gloock parece "RS"; o símbolo vai na fonte do texto.
  const moeda = (html) => html.replace('R$', '<span class="cur">R$</span>');
  const precoCurto = (p) => moeda(Number.isInteger(p) ? `R$&nbsp;${p}` : esc(brl.format(p)));
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));

  /* Links de WhatsApp */
  $$('[data-wa]').forEach((a) => {
    a.href = linkWhats(a.dataset.waText);
    a.target = '_blank';
    a.rel = 'noopener';
  });

  $$('[data-menu-date]').forEach((el) => {
    if (D.dataCardapio) el.textContent = D.dataCardapio;
  });

  /* Aberto ou fechado agora, no horário de Itapema */
  function agora() {
    const partes = new Intl.DateTimeFormat('en-US', {
      timeZone: D.fusoHorario,
      weekday: 'short',
      hour: 'numeric',
      minute: 'numeric',
      hourCycle: 'h23',
    }).formatToParts(new Date());
    const valor = (tipo) => partes.find((p) => p.type === tipo).value;
    return {
      dia: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(valor('weekday')),
      hora: Number(valor('hour')) + Number(valor('minute')) / 60,
    };
  }

  let lojaAberta = false;
  let deliveryAberto = false;

  function atualizaStatus() {
    const { dia, hora: h } = agora();
    const [abre, fecha] = D.horarios[dia];
    lojaAberta = h >= abre && h < fecha;
    deliveryAberto = h >= D.delivery[0] && h < D.delivery[1];

    let texto = `Aberto agora. Fecha às ${hora(fecha)}`;
    if (!lojaAberta && h < abre) texto = `Fechado agora. Abre hoje às ${hora(abre)}`;
    if (!lojaAberta && h >= fecha) texto = `Fechado agora. Abre amanhã às ${hora(D.horarios[(dia + 1) % 7][0])}`;
    $$('[data-status]').forEach((el) => {
      el.textContent = texto;
      el.classList.toggle('is-open', lojaAberta);
    });

    const aviso = $('[data-delivery-note]');
    aviso.hidden = deliveryAberto;
    const volta = h < D.delivery[0] ? `hoje às ${hora(D.delivery[0])}` : `amanhã às ${hora(D.delivery[0])}`;
    aviso.textContent = `O delivery está fechado agora e volta ${volta}. Você pode enviar o pedido e combinar o horário no WhatsApp.`;
  }
  atualizaStatus();
  setInterval(atualizaStatus, 60_000);

  /* Itens do delivery: a foto do doce e a plaquinha de preço */
  let grupoSabor = 0;
  function itemHTML(item, i = 0) {
    const grupo = `sabor-${item.id}-${grupoSabor++}`;
    const sabores = item.sabores
      ? `<fieldset class="item__flavors"><legend>Sabor</legend>${item.sabores
          .map((s, k) => `<label><input type="radio" name="${grupo}" value="${esc(s)}" data-sabor${k === 0 ? ' checked' : ''}><span>${esc(s)}</span></label>`)
          .join('')}</fieldset>`
      : '';
    return `<li class="item${item.sabores ? ' item--sabores' : ''}" data-item="${item.id}" style="--i:${i}">
        <figure class="item__pic"><img src="${foto(item.id)}" alt="${esc(item.nome)}" width="800" height="1000" loading="lazy"></figure>
        <div class="item__tag">
          <p class="item__name">${esc(item.nome)}${item.nota ? `<span class="item__note">${esc(item.nota)}</span>` : ''}</p>
          ${sabores}
          <div class="item__foot">
            <span class="item__price">${precoCurto(item.preco)}</span>
            <button type="button" class="add" data-add="${item.id}" aria-label="Adicionar ${esc(item.nome)} ao pedido">
              <svg aria-hidden="true"><use href="#i-plus"></use></svg>
              <span class="add__count" data-count="${item.id}" aria-hidden="true"></span>
            </button>
          </div>
        </div>
      </li>`;
  }

  $('[data-destaques]').innerHTML = (D.destaques || [])
    .filter((id) => ITENS.has(id))
    .map((id, i) => itemHTML(ITENS.get(id), i))
    .join('')
    .replaceAll('loading="lazy"', 'loading="eager"');

  // Cardápio do dia: cada item é um prato redondo visto de cima, com nome, descrição e preço.
  function pratoHTML(item) {
    const grupo = `sabor-${item.id}-${grupoSabor++}`;
    const sabores = item.sabores
      ? `<fieldset class="item__flavors"><legend>Sabor</legend>${item.sabores
          .map((s, k) => `<label><input type="radio" name="${grupo}" value="${esc(s)}" data-sabor${k === 0 ? ' checked' : ''}><span>${esc(s)}</span></label>`)
          .join('')}</fieldset>`
      : '';
    return `<li class="prato" data-item="${item.id}">
        <figure class="prato__foto"><img src="${foto(item.id)}" alt="${esc(item.nome)}" width="800" height="1000" loading="lazy"></figure>
        <h4 class="prato__nome">${esc(item.nome)}${item.nota ? `<span class="prato__nota">${esc(item.nota)}</span>` : ''}</h4>
        ${item.descricao ? `<p class="prato__desc">${esc(item.descricao)}</p>` : ''}
        ${sabores}
        <div class="prato__foot">
          <span class="prato__preco">${precoCurto(item.preco)}</span>
          <button type="button" class="add" data-add="${item.id}" aria-label="Adicionar ${esc(item.nome)} ao pedido">
            <svg aria-hidden="true"><use href="#i-plus"></use></svg>
            <span class="add__count" data-count="${item.id}" aria-hidden="true"></span>
          </button>
        </div>
      </li>`;
  }

  $('[data-menu]').innerHTML = D.cardapio
    .map(
      (cat) => `<section class="shelf${cat.itens.length === 1 ? (cat.itens[0].sabores ? ' shelf--um-sabores' : ' shelf--um') : ''}" aria-labelledby="prateleira-${cat.id}" data-reveal>
        <h3 class="shelf__name" id="prateleira-${cat.id}">${esc(cat.nome)}</h3>
        <ul class="shelf__row">${cat.itens.map(pratoHTML).join('')}</ul>
      </section>`
    )
    .join('');

  /* Faixa de frases */
  const faixaTrilho = $('[data-faixa-trilho]');
  const grupoFaixa = `<div class="faixa__grupo">${(D.frases || [])
    .map((f) => `<span>${esc(f)}</span><svg aria-hidden="true"><use href="#i-hat"></use></svg>`)
    .join('')}</div>`;
  faixaTrilho.innerHTML = grupoFaixa + grupoFaixa;

  /* Encomendas por ocasião */
  $('[data-ocasioes]').innerHTML = (D.ocasioes || [])
    .map(
      (o) => `<li class="ocasiao">
        <figure class="ocasiao__foto"><img src="${foto(`ocasiao-${o.id}`)}" alt="${esc(o.nome)}" width="800" height="1000" loading="lazy"></figure>
        <h3>${esc(o.nome)}</h3>
        <p>${esc(o.texto)}</p>
        <button type="button" class="btn btn--primary btn--sm" data-ocasiao="${o.id}">Pedir orçamento</button>
      </li>`
    )
    .join('');

  /* Tortas: cartões com foto; as outras entram numa lista */
  const comFoto = D.tortas.filter((t) => t.foto);
  const semFoto = D.tortas.filter((t) => !t.foto);
  const precoKg = (v) => `${brl.format(v)} o kg`;
  $('[data-tortas]').innerHTML =
    comFoto
      .map(
        (t) => `<article class="torta">
          <figure class="torta__pic"><img src="${foto(`torta-${t.id}`)}" alt="Torta ${esc(t.nome)}" width="800" height="1000" loading="lazy"></figure>
          <div class="torta__body">
            <div class="torta__head"><h3 class="torta__name">${esc(t.nome)}</h3><span class="torta__price">${precoKg(t.precoKg)}</span></div>
            <p class="torta__desc">${esc(t.descricao)}</p>
            <button type="button" class="btn btn--light btn--sm" data-quero="${t.id}">Quero esta torta</button>
          </div>
        </article>`
      )
      .join('') +
    `<article class="torta torta--mais">
      <h3 class="torta__name">E mais ${semFoto.length} sabores</h3>
      <p class="torta__desc">São ${D.tortas.length} tortas ao todo, de ${brl.format(Math.min(...D.tortas.map((t) => t.precoKg)))} a ${brl.format(Math.max(...D.tortas.map((t) => t.precoKg)))} o kg. Escolha a sua no orçamento.</p>
      <a class="btn btn--light btn--sm" href="#orcamento">Ver todos os sabores</a>
    </article>`;

  /* Tamanhos: pratos desenhados em escala */
  $('[data-tamanhos]').innerHTML = D.tamanhos
    .map(
      (t) => `<li class="plate" data-plate="${t.id}">
        <button type="button" class="plate__btn" style="--d: calc(${t.id} * clamp(4.4px, 0.8vw, 8px))" aria-label="Escolher ${esc(t.forma.toLowerCase())}, até ${t.fatias} fatias, no orçamento"><span></span></button>
        <p class="plate__forma">${t.id} cm</p>
        <p class="plate__fatias">até ${t.fatias} fatias</p>
      </li>`
    )
    .join('');

  /* Docinhos: grupos com preço e a mesa de fotos */
  const precoDoce = (g) => {
    if (g.preco) return `${brl.format(g.preco)} cada`;
    const valores = g.itens.map((i) => i.preco);
    return `${brl.format(Math.min(...valores))} a ${brl.format(Math.max(...valores))}`;
  };
  $('[data-grupos]').innerHTML = D.docinhos
    .map(
      (g) => `<div class="grupo">
        <dt>${esc(g.nome)} <span>${precoDoce(g)}</span></dt>
        <dd>${g.itens.length} sabores.${g.nota ? ` ${esc(g.nota)}` : ''}</dd>
      </div>`
    )
    .join('');
  $('[data-docinhos]').innerHTML = D.docinhos
    .flatMap((g) => g.itens.filter((i) => i.foto).map((i) => ({ ...i, preco: i.preco ?? g.preco })))
    .map(
      (i) => `<li class="tile">
        <figure>
          <img src="${foto(`${i.foto}-${i.id}`)}" alt="${esc(i.nome)}" width="800" height="1000" loading="lazy">
          <figcaption>${esc(i.nome)}<span>${brl.format(i.preco)}</span></figcaption>
        </figure>
      </li>`
    )
    .join('');

  /* Créditos das fotos ilustrativas */
  const nomesPorFoto = new Map([
    ...D.cardapio.flatMap((c) => c.itens.map((i) => [i.id, i.nome])),
    ...D.tortas.map((t) => [`torta-${t.id}`, `Torta ${t.nome}`]),
    ...D.docinhos.flatMap((g) => g.itens.filter((i) => i.foto).map((i) => [`${i.foto}-${i.id}`, i.nome])),
    ...(D.ocasioes || []).map((o) => [`ocasiao-${o.id}`, o.nome]),
  ]);
  const creditos = (window.MG_CREDITOS || []).filter((c) => nomesPorFoto.has(c.id));
  $('[data-creditos]').innerHTML = creditos
    .map(
      (c) =>
        `<li>${esc(nomesPorFoto.get(c.id))}: <a href="${esc(c.source_page)}" target="_blank" rel="noopener">${esc(c.creator || 'autor desconhecido')}</a>, ${esc(c.license)}</li>`
    )
    .join('');
  $('.credits').hidden = creditos.length === 0;

  /* Pedido do delivery */
  const CHAVE = 'mariagula:pedido';
  let pedido = [];
  try {
    pedido = JSON.parse(localStorage.getItem(CHAVE)) || [];
  } catch {
    pedido = [];
  }
  pedido = Array.isArray(pedido) ? pedido.filter((l) => ITENS.has(l.id) && l.qtd > 0) : [];

  const salva = () => {
    try {
      localStorage.setItem(CHAVE, JSON.stringify(pedido));
    } catch {
      /* navegador sem armazenamento: o pedido vale só nesta visita */
    }
  };
  const subtotal = () => pedido.reduce((soma, l) => soma + ITENS.get(l.id).preco * l.qtd, 0);
  const totalItens = () => pedido.reduce((soma, l) => soma + l.qtd, 0);

  const barra = $('[data-orderbar]');
  const lista = $('[data-order-list]');
  const gaveta = $('[data-drawer]');
  const form = $('[data-order-form]');

  function desenha() {
    const n = totalItens();
    const total = brl.format(subtotal());
    barra.hidden = n === 0;
    $('[data-order-count]').textContent = n;
    $('[data-order-items]').textContent = n === 1 ? '1 item' : `${n} itens`;
    $('[data-order-total]').innerHTML = moeda(total);
    $('[data-order-subtotal]').innerHTML = moeda(total);

    $$('[data-count]').forEach((el) => {
      const id = el.dataset.count;
      const q = pedido.filter((l) => l.id === id).reduce((soma, l) => soma + l.qtd, 0);
      el.textContent = q || '';
      el.closest('[data-item]').classList.toggle('is-in-order', q > 0);
      el.closest('.add').setAttribute('aria-label', `Adicionar ${ITENS.get(id).nome} ao pedido${q ? `, ${q} no pedido` : ''}`);
    });

    lista.innerHTML = pedido
      .map((l, i) => {
        const item = ITENS.get(l.id);
        const nome = esc(item.nome);
        const ultimo = l.qtd === 1;
        return `<li class="line">
          <img class="line__pic" src="${foto(item.id)}" alt="" width="800" height="1000">
          <div class="line__info">
            <p class="line__name">${nome}</p>
            ${l.sabor ? `<p class="line__flavor">${esc(l.sabor)}</p>` : ''}
            <p class="line__price">${brl.format(item.preco * l.qtd)}</p>
          </div>
          <div class="stepper">
            <button type="button" data-step="-1" data-index="${i}" aria-label="${ultimo ? `Tirar ${nome} do pedido` : `Diminuir ${nome}`}">
              <svg aria-hidden="true"><use href="#${ultimo ? 'i-trash' : 'i-minus'}"></use></svg>
            </button>
            <output aria-label="Quantidade de ${nome}">${l.qtd}</output>
            <button type="button" data-step="1" data-index="${i}" aria-label="Aumentar ${nome}">
              <svg aria-hidden="true"><use href="#i-plus"></use></svg>
            </button>
          </div>
        </li>`;
      })
      .join('');

    $('[data-order-empty]').hidden = n > 0;
    $('[data-order-fields]').hidden = n === 0;
    $('[data-order-foot]').hidden = n === 0;
  }

  function adiciona(id, sabor) {
    const linha = pedido.find((l) => l.id === id && l.sabor === sabor);
    if (linha) linha.qtd += 1;
    else pedido.push({ id, sabor, qtd: 1 });
    salva();
    desenha();
    aviso(`${ITENS.get(id).nome} entrou no pedido.`);
    if (!reduzMovimento) {
      barra.classList.remove('is-bump');
      void barra.offsetWidth;
      barra.classList.add('is-bump');
    }
  }

  function altera(i, delta) {
    const linha = pedido[i];
    if (!linha) return;
    linha.qtd += delta;
    if (linha.qtd > 0) {
      salva();
      desenha();
      return;
    }
    const [removida] = pedido.splice(i, 1);
    salva();
    desenha();
    aviso(`${ITENS.get(removida.id).nome} saiu do pedido.`, {
      rotulo: 'Desfazer',
      acao: () => {
        removida.qtd = 1;
        pedido.splice(Math.min(i, pedido.length), 0, removida);
        salva();
        desenha();
      },
    });
  }

  // Itens da vitrine e do cardápio usam o mesmo pedido.
  document.addEventListener('click', (e) => {
    const botao = e.target.closest('[data-add]');
    if (!botao) return;
    const item = botao.closest('[data-item]');
    adiciona(botao.dataset.add, item.querySelector('[data-sabor]:checked')?.value || '');
    if (!reduzMovimento) {
      item.classList.remove('is-pop');
      void item.offsetWidth;
      item.classList.add('is-pop');
    }
  });

  lista.addEventListener('click', (e) => {
    const botao = e.target.closest('[data-step]');
    if (!botao) return;
    const i = Number(botao.dataset.index);
    const delta = Number(botao.dataset.step);
    altera(i, delta);
    // A lista é redesenhada: devolve o foco ao mesmo controle, ou ao título se a linha saiu.
    const mesmo = lista.querySelector(`[data-index="${i}"][data-step="${delta}"]`);
    (mesmo || lista.querySelector('[data-step]') || $('#pedido-titulo')).focus();
  });

  /* Aviso curto, com ação opcional (desfazer) */
  const toast = $('[data-toast]');
  let toastTimer;
  const escondeAviso = () => toast.classList.remove('is-visible');
  function aviso(texto, acao) {
    // Com a gaveta aberta, o aviso precisa estar dentro dela para ficar acima do fundo escuro.
    const lugar = gaveta.open ? gaveta : document.body;
    if (toast.parentElement !== lugar) lugar.append(toast);
    toast.replaceChildren(Object.assign(document.createElement('span'), { textContent: texto }));
    if (acao) {
      const desfazer = Object.assign(document.createElement('button'), {
        type: 'button',
        className: 'toast__action',
        textContent: acao.rotulo,
      });
      desfazer.addEventListener('click', () => {
        acao.acao();
        escondeAviso();
      });
      toast.append(desfazer);
    }
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(escondeAviso, acao ? 6000 : 2400);
  }

  /* Gaveta do pedido */
  let modoEscolhido = false;
  const abrePedido = () => {
    atualizaStatus();
    // Com a loja aberta e o delivery fechado, a retirada é o caminho que funciona agora.
    if (!modoEscolhido && !deliveryAberto && lojaAberta) form.elements.modo.value = 'retirada';
    atualizaModo();
    if (typeof gaveta.showModal === 'function') gaveta.showModal();
    else gaveta.setAttribute('open', '');
    document.body.classList.add('pedido-aberto');
    $('#pedido-titulo').focus();
  };
  const fechaPedido = () => {
    if (typeof gaveta.close === 'function') gaveta.close();
    else gaveta.removeAttribute('open');
  };
  $$('[data-open-order]').forEach((b) => b.addEventListener('click', abrePedido));
  $$('[data-close-order]').forEach((b) => b.addEventListener('click', fechaPedido));
  gaveta.addEventListener('click', (e) => {
    if (e.target === gaveta) fechaPedido();
  });
  gaveta.addEventListener('close', () => {
    document.body.classList.remove('pedido-aberto');
    if (toast.parentElement === gaveta) document.body.append(toast);
  });
  $('[data-go-menu]').addEventListener('click', () => {
    fechaPedido();
    $('#cardapio').scrollIntoView({ behavior: reduzMovimento ? 'auto' : 'smooth' });
  });

  const campoEndereco = form.elements.endereco;
  const erroEndereco = $('[data-address-error]');
  function atualizaModo() {
    const entrega = form.elements.modo.value === 'entrega';
    $('[data-address]').hidden = !entrega;
    $('[data-fee]').hidden = !entrega;
    if (!entrega) limpaErroEndereco();
  }
  function limpaErroEndereco() {
    erroEndereco.hidden = true;
    campoEndereco.removeAttribute('aria-invalid');
  }
  form.addEventListener('change', (e) => {
    if (e.target.name !== 'modo') return;
    modoEscolhido = true;
    atualizaModo();
  });
  campoEndereco.addEventListener('input', () => {
    if (campoEndereco.value.trim()) limpaErroEndereco();
  });

  function mensagemPedido() {
    const f = form.elements;
    const entrega = f.modo.value === 'entrega';
    const nome = f.nome.value.trim();
    const obs = f.obs.value.trim();
    const itens = pedido.map((l) => {
      const item = ITENS.get(l.id);
      return `• ${l.qtd}x ${item.nome}${l.sabor ? ` (${l.sabor})` : ''}: ${brl.format(item.preco * l.qtd)}`;
    });
    return [
      'Olá, Maria Gula! Quero fazer um pedido:',
      '',
      ...itens,
      '',
      `Subtotal: ${brl.format(subtotal())}${entrega ? ' + taxa de entrega' : ''}`,
      nome ? `Nome: ${nome}` : null,
      entrega ? `Entrega em: ${f.endereco.value.trim()}` : 'Vou retirar na loja.',
      obs ? `Observações: ${obs}` : null,
    ]
      .filter((linha) => linha !== null)
      .join('\n');
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!pedido.length) return;
    if (form.elements.modo.value === 'entrega' && !campoEndereco.value.trim()) {
      erroEndereco.hidden = false;
      campoEndereco.setAttribute('aria-invalid', 'true');
      campoEndereco.focus();
      return;
    }
    window.open(linkWhats(mensagemPedido()), '_blank', 'noopener');
  });

  /* Orçamento de encomendas */
  const orc = $('[data-orcamento]');
  const selectOcasiao = $('[data-ocasiao-select]');
  selectOcasiao.innerHTML = [...(D.ocasioes || []).map((o) => `<option value="${o.id}">${esc(o.nome)}</option>`), '<option value="outra">Outra</option>'].join('');
  const selectTorta = $('[data-torta-select]');
  selectTorta.insertAdjacentHTML(
    'beforeend',
    D.tortas.map((t) => `<option value="${t.id}">${esc(t.nome)} (${precoKg(t.precoKg)})</option>`).join('')
  );

  // Data mínima: hoje + antecedência, no fuso da loja.
  const hojeLoja = new Intl.DateTimeFormat('en-CA', { timeZone: D.fusoHorario }).format(new Date());
  const minima = new Date(`${hojeLoja}T12:00:00`);
  minima.setDate(minima.getDate() + D.regrasEncomenda.antecedenciaDias);
  const isoMinima = minima.toISOString().slice(0, 10);
  const dataBR = (iso) => {
    const [a, m, d] = iso.split('-');
    const dia = new Date(`${iso}T12:00:00`).toLocaleDateString('pt-BR', { weekday: 'long' });
    return `${d}/${m}/${a} (${dia})`;
  };
  orc.elements.data.min = isoMinima;
  $('[data-data-minima]').textContent = dataBR(isoMinima);

  function escolheTorta(id) {
    selectTorta.value = id;
    $('#orcamento').scrollIntoView({ behavior: reduzMovimento ? 'auto' : 'smooth' });
    aviso(`Torta ${TORTAS.get(id).nome} escolhida no orçamento.`);
  }
  function escolheTamanho(id) {
    orc.elements.tamanho.value = id;
    $$('[data-plate]').forEach((p) => p.classList.toggle('is-chosen', p.dataset.plate === id));
    aviso(`Forma de ${id} cm escolhida no orçamento.`);
  }
  function escolheOcasiao(id) {
    selectOcasiao.value = id;
    $('#orcamento').scrollIntoView({ behavior: reduzMovimento ? 'auto' : 'smooth' });
    aviso(`Orçamento para ${D.ocasioes.find((o) => o.id === id).nome.toLowerCase()}.`);
  }
  document.addEventListener('click', (e) => {
    const quero = e.target.closest('[data-quero]');
    if (quero) escolheTorta(quero.dataset.quero);
    const ocasiao = e.target.closest('[data-ocasiao]');
    if (ocasiao) escolheOcasiao(ocasiao.dataset.ocasiao);
    const prato = e.target.closest('.plate__btn');
    if (prato) escolheTamanho(prato.closest('[data-plate]').dataset.plate);
  });
  const marcaPrato = () => $$('[data-plate]').forEach((p) => p.classList.toggle('is-chosen', p.dataset.plate === orc.elements.tamanho.value));
  orc.addEventListener('change', (e) => {
    if (e.target.name === 'tamanho') marcaPrato();
  });
  marcaPrato();

  function marcaErro(campo, erro, temErro) {
    $(erro).hidden = !temErro;
    if (temErro) campo.setAttribute('aria-invalid', 'true');
    else campo.removeAttribute('aria-invalid');
  }
  orc.addEventListener('input', (e) => {
    if (e.target.name === 'nome' && e.target.value.trim()) marcaErro(e.target, '#erro-nome', false);
    if (e.target.name === 'data' && e.target.value >= isoMinima) marcaErro(e.target, '#erro-data', false);
  });

  orc.addEventListener('submit', (e) => {
    e.preventDefault();
    const f = orc.elements;
    const nome = f.nome.value.trim();
    const data = f.data.value;
    const semNome = !nome;
    const dataRuim = !data || data < isoMinima;
    marcaErro(f.nome, '#erro-nome', semNome);
    marcaErro(f.data, '#erro-data', dataRuim);
    if (semNome || dataRuim) {
      (semNome ? f.nome : f.data).focus();
      return;
    }
    const torta = TORTAS.get(f.torta.value);
    const tamanho = D.tamanhos.find((t) => t.id === f.tamanho.value);
    const textoTamanho = tamanho ? `${tamanho.forma.toLowerCase()} (até ${tamanho.fatias} fatias)` : 'tamanho maior ou bolo de andar';
    const linhas = [
      'Olá, Maria Gula! Gostaria de um orçamento:',
      '',
      `Nome: ${nome}`,
      `Ocasião: ${f.ocasiao.options[f.ocasiao.selectedIndex].text}`,
      `Data do evento: ${dataBR(data)}`,
      f.pessoas.value ? `Pessoas: ${f.pessoas.value}` : null,
      `Torta: ${torta ? `${torta.nome}, ${textoTamanho}` : 'sem torta'}`,
      f.docinhos.value.trim() ? `Docinhos: ${f.docinhos.value.trim()}` : null,
      `Receber: ${f.receber.value === 'entrega' ? 'delivery' : 'retirada na loja'}`,
      f.obs.value.trim() ? `Observações: ${f.obs.value.trim()}` : null,
    ].filter((l) => l !== null);
    window.open(linkWhats(linhas.join('\n')), '_blank', 'noopener');
  });

  /* Menu no celular */
  const botaoMenu = $('[data-menu-toggle]');
  const nav = $('[data-nav]');
  const fechaMenu = () => {
    botaoMenu.setAttribute('aria-expanded', 'false');
    nav.classList.remove('is-open');
  };
  botaoMenu.addEventListener('click', () => {
    const abrir = botaoMenu.getAttribute('aria-expanded') !== 'true';
    botaoMenu.setAttribute('aria-expanded', String(abrir));
    nav.classList.toggle('is-open', abrir);
  });
  nav.addEventListener('click', (e) => {
    if (e.target.closest('a')) fechaMenu();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) {
      fechaMenu();
      botaoMenu.focus();
    }
  });

  /* ——— Movimento ——— */

  /* 1. A vitrine acende */
  const vitrine = $('[data-case]');
  requestAnimationFrame(() => setTimeout(() => vitrine.classList.add('is-lit'), 120));

  /* 2. Entradas: cada parte sobe em sequência, uma vez */
  const blocos = $$('[data-reveal]');
  blocos.forEach((bloco) => [...bloco.children].forEach((filho, i) => filho.style.setProperty('--i', i)));
  if (reduzMovimento || !('IntersectionObserver' in window)) {
    blocos.forEach((b) => b.classList.add('is-in'));
  } else {
    const observador = new IntersectionObserver(
      (entradas) =>
        entradas.forEach((en) => {
          if (!en.isIntersecting) return;
          en.target.classList.add('is-in');
          observador.unobserve(en.target);
        }),
      { rootMargin: '0px 0px -4% 0px', threshold: 0.05 }
    );
    blocos.forEach((b) => observador.observe(b));
  }

  /* 3. Cenas de rolagem: só no computador e sem "reduzir movimento" */
  const telaGrande = window.matchMedia('(min-width: 900px) and (min-height: 620px)');
  const alturaCabecalho = () => $('.sign').offsetHeight;
  const easeOut = (t) => 1 - Math.pow(1 - t, 3);

  // Trilho de tortas: o palco para e as tortas correm da direita para a esquerda.
  const trilho = $('[data-trilho]');
  const trilhoTrack = $('[data-trilho-track]');
  let trilhoDist = 0;
  function preparaTrilho() {
    const vivo = !reduzMovimento && telaGrande.matches;
    trilho.classList.toggle('is-live', vivo);
    trilhoTrack.style.transform = '';
    if (!vivo) {
      trilho.style.removeProperty('--trilho-altura');
      return;
    }
    // Distância a percorrer: do início do trilho até o último cartão encostar na margem direita.
    const caixa = trilhoTrack.getBoundingClientRect();
    const ultimo = trilhoTrack.querySelector('.torta:last-child').getBoundingClientRect();
    const margem = parseFloat(getComputedStyle(trilhoTrack).paddingRight) || 0;
    const palco = trilho.querySelector('.tortas__stage').clientWidth;
    trilhoDist = Math.max(0, ultimo.right - caixa.left + margem - palco);
    trilho.style.setProperty('--trilho-altura', `${trilhoDist + window.innerHeight}px`);
  }
  function quadroTrilho() {
    if (!trilho.classList.contains('is-live')) return;
    const topo = trilho.getBoundingClientRect().top;
    const percurso = trilho.offsetHeight - (window.innerHeight - alturaCabecalho());
    const p = clamp((alturaCabecalho() - topo) / Math.max(1, percurso));
    trilhoTrack.style.transform = `translate3d(${(-p * trilhoDist).toFixed(1)}px, 0, 0)`;
    // As fotos correm um pouco mais devagar que os cartões: dá profundidade.
    const meio = window.innerWidth / 2;
    $$('.torta__pic img', trilhoTrack).forEach((img) => {
      const r = img.parentElement.getBoundingClientRect();
      const desvio = (r.left + r.width / 2 - meio) / window.innerWidth;
      img.style.transform = `translate3d(${(desvio * -8).toFixed(2)}%, 0, 0) scale(1.14)`;
    });
  }

  // Mesa de doces: os docinhos chegam espalhados e pousam em fileiras.
  const mesa = $('[data-mesa]');
  const tiles = $$('.tile', mesa);
  const mesaTampo = $('.mesa__tiles', mesa);
  let espalhado = [];
  function preparaMesa() {
    const vivo = !reduzMovimento && telaGrande.matches;
    mesa.classList.toggle('is-live', vivo);
    mesaTampo.style.removeProperty('--abre');
    tiles.forEach((t) => {
      t.style.transform = '';
      t.style.opacity = '';
      t.querySelector('figcaption').style.opacity = '';
    });
    if (!vivo) return;
    let semente = 7;
    const acaso = () => ((semente = (semente * 16807) % 2147483647) / 2147483647);
    const W = window.innerWidth;
    const H = window.innerHeight;
    // Chegam pela direita, de cima e de baixo; nunca atravessam o texto da esquerda.
    espalhado = tiles.map(() => ({
      x: (0.08 + acaso() * 0.3) * W,
      y: (acaso() - 0.5) * H * 1.1,
      r: (acaso() - 0.5) * 50,
    }));
  }
  function quadroMesa() {
    if (!mesa.classList.contains('is-live')) return;
    const topo = mesa.getBoundingClientRect().top;
    const percurso = mesa.offsetHeight - (window.innerHeight - alturaCabecalho());
    const inicio = window.innerHeight;
    const fim = alturaCabecalho() - percurso;
    const p = clamp((inicio - topo) / (inicio - fim));
    // Ponto em que o palco prende no topo: tudo acontece em volta dele.
    const pPreso = (window.innerHeight - alturaCabecalho()) / (inicio - fim);
    // O tampo da mesa sobe pouco antes; os doces pousam logo em seguida, nunca numa mesa vazia por muito tempo.
    mesaTampo.style.setProperty('--abre', easeOut(clamp((p - (pPreso - 0.2)) / 0.15)).toFixed(3));
    tiles.forEach((t, i) => {
      const local = clamp((p - (pPreso - 0.15) - i * 0.02) / 0.3);
      const e = easeOut(local);
      const s = espalhado[i];
      t.style.opacity = clamp(local * 3).toFixed(2);
      t.style.transform =
        `translate3d(${(s.x * (1 - e)).toFixed(1)}px, ${(s.y * (1 - e)).toFixed(1)}px, 0) ` +
        `rotate(${(s.r * (1 - e)).toFixed(2)}deg) scale(${(0.8 + 0.2 * e).toFixed(3)})`;
      // O nome só aparece quando o doce já pousou: nada voa por cima de texto.
      t.querySelector('figcaption').style.opacity = clamp((local - 0.85) / 0.15).toFixed(2);
    });
  }

  // A primeira tela sai mais devagar que a página: o texto parece ficar para trás.
  const heroCopy = $('[data-parallax]');
  const fator = Number(heroCopy?.dataset.parallax || 0);
  function quadroHero() {
    if (reduzMovimento || !heroCopy) return;
    const y = window.scrollY;
    if (y > window.innerHeight * 1.2) return;
    heroCopy.style.transform = `translate3d(0, ${(y * fator).toFixed(1)}px, 0)`;
    heroCopy.style.opacity = clamp(1 - y / (window.innerHeight * 0.9)).toFixed(3);
  }

  // Selo da vitrine: além do giro lento, gira mais quando a página rola.
  const anelSelo = $('[data-selo] .selo__anel');
  function quadroSelo() {
    if (reduzMovimento || !anelSelo) return;
    anelSelo.style.setProperty('--giro', `${(window.scrollY * 0.25).toFixed(1)}deg`);
  }

  // Adesivos: andam um pouco mais devagar que a página e giram de leve (medidos pelo pai, que não se mexe).
  const adesivos = $$('[data-adesivo]');
  function quadroAdesivos() {
    if (reduzMovimento) return;
    const meio = window.innerHeight / 2;
    adesivos.forEach((a) => {
      const r = a.parentElement.getBoundingClientRect();
      if (r.bottom < -300 || r.top > window.innerHeight + 300) return;
      const d = r.top + r.height / 2 - meio;
      const f = Number(a.dataset.adesivo) || 0.05;
      a.style.setProperty('--sobe', `${(-d * f).toFixed(1)}px`);
      a.style.setProperty('--gira', `${(d * f * 0.1).toFixed(2)}deg`);
    });
  }

  // Faixa de frases: corre sozinha e acelera (ou volta) conforme a rolagem.
  const faixa = $('[data-faixa]');
  let faixaX = 0;
  let faixaVel = 0;
  let faixaUltimoY = window.scrollY;
  let faixaLargura = 0;
  let faixaRodando = false;
  let faixaVisivel = false;
  const medeFaixa = () => {
    faixaLargura = faixaTrilho.firstElementChild.getBoundingClientRect().width;
  };
  function animaFaixa() {
    const y = window.scrollY;
    faixaVel += ((y - faixaUltimoY) * 0.6 - faixaVel) * 0.12;
    faixaUltimoY = y;
    faixaX -= 0.7 + faixaVel;
    if (faixaLargura) {
      if (faixaX <= -faixaLargura) faixaX += faixaLargura;
      if (faixaX > 0) faixaX -= faixaLargura;
    }
    faixaTrilho.style.transform = `translate3d(${faixaX.toFixed(1)}px, 0, 0)`;
    if (faixaVisivel) requestAnimationFrame(animaFaixa);
    else faixaRodando = false;
  }
  if (!reduzMovimento && 'IntersectionObserver' in window) {
    new IntersectionObserver(([en]) => {
      faixaVisivel = en.isIntersecting;
      if (faixaVisivel && !faixaRodando) {
        faixaRodando = true;
        faixaUltimoY = window.scrollY;
        requestAnimationFrame(animaFaixa);
      }
    }).observe(faixa);
  }

  let pedidoQuadro = false;
  function quadro() {
    pedidoQuadro = false;
    quadroHero();
    quadroTrilho();
    quadroMesa();
    quadroSelo();
    quadroAdesivos();
  }
  const agenda = () => {
    if (pedidoQuadro) return;
    pedidoQuadro = true;
    requestAnimationFrame(quadro);
  };
  const prepara = () => {
    preparaTrilho();
    preparaMesa();
    medeFaixa();
    quadro();
  };

  window.addEventListener('scroll', agenda, { passive: true });
  window.addEventListener('resize', prepara);
  telaGrande.addEventListener?.('change', prepara);
  window.addEventListener('load', prepara);
  document.fonts?.ready.then(prepara);
  prepara();

  $$('[data-year]').forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  atualizaModo();
  desenha();
})();
