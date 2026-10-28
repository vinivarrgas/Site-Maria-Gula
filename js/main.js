(() => {
  'use strict';

  const D = window.MARIA_GULA;
  if (!D) return;
  window.__mgPronto = true;

  // O mesmo script serve as duas páginas (hoje e encomendas): cada parte só roda se o seu bloco existir.
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
  const precoKg = (v) => `${brl.format(v)} o kg`;
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const rola = (alvo) => alvo.scrollIntoView({ behavior: reduzMovimento ? 'auto' : 'smooth' });
  const alturaCabecalho = () => $('[data-topo]').offsetHeight;
  const precosTortas = D.tortas.map((t) => t.precoKg);
  const precoDoce = (g) => {
    if (g.preco) return `${brl.format(g.preco)} cada`;
    const valores = g.itens.map((i) => i.preco);
    return `${brl.format(Math.min(...valores))} a ${brl.format(Math.max(...valores))}`;
  };
  const menorPrecoDoce = Math.min(...D.docinhos.flatMap((g) => (g.preco ? [g.preco] : g.itens.map((i) => i.preco))));

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
    if (!aviso) return;
    aviso.hidden = deliveryAberto;
    const volta = h < D.delivery[0] ? `hoje às ${hora(D.delivery[0])}` : `amanhã às ${hora(D.delivery[0])}`;
    aviso.textContent = `O delivery está fechado agora e volta ${volta}. Você pode enviar o pedido e combinar o horário no WhatsApp.`;
  }
  atualizaStatus();
  setInterval(atualizaStatus, 60_000);

  /* Aviso curto, com ação opcional (desfazer) */
  const gaveta = $('[data-drawer]');
  const toast = $('[data-toast]');
  let toastTimer;
  const escondeAviso = () => toast.classList.remove('is-visible');
  function aviso(texto, acao) {
    // Com a gaveta aberta, o aviso precisa estar dentro dela para ficar acima do fundo escuro.
    const lugar = gaveta?.open ? gaveta : document.body;
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

  /* ——— Página de hoje ——— */

  // Cardápio do dia: categorias à esquerda, produtos com foto, descrição, preço e "Adicionar".
  let grupoSabor = 0;
  function produtoHTML(item) {
    const grupo = `sabor-${item.id}-${grupoSabor++}`;
    const sabores = item.sabores
      ? `<fieldset class="sabores"><legend>Sabor</legend>${item.sabores
          .map((s, k) => `<label><input type="radio" name="${grupo}" value="${esc(s)}" data-sabor${k === 0 ? ' checked' : ''}><span>${esc(s)}</span></label>`)
          .join('')}</fieldset>`
      : '';
    return `<li class="produto" data-item="${item.id}">
        <figure class="produto__foto"><img src="${foto(item.id)}" alt="${esc(item.nome)}" width="800" height="1000" loading="lazy"></figure>
        <div class="produto__info">
          <h4 class="produto__nome">${esc(item.nome)}${item.nota ? `<span class="produto__nota">${esc(item.nota)}</span>` : ''}</h4>
          ${item.descricao ? `<p class="produto__desc">${esc(item.descricao)}</p>` : ''}
          ${sabores}
          <div class="produto__pe">
            <span class="produto__preco">${precoCurto(item.preco)}</span>
            <button type="button" class="add" data-add="${item.id}" aria-label="Adicionar ${esc(item.nome)} ao pedido">
              <svg aria-hidden="true"><use href="#i-plus"></use></svg>Adicionar
              <span class="add__count" data-count="${item.id}" aria-hidden="true"></span>
            </button>
          </div>
        </div>
      </li>`;
  }

  // Uma grade só; os botões de categoria filtram o que aparece.
  const cardapio = $('[data-menu]');
  if (cardapio) {
    cardapio.innerHTML = `<ul class="produtos" id="produtos" data-reveal>${D.cardapio
      .flatMap((cat) => cat.itens.map((item) => produtoHTML(item).replace('<li class="produto"', `<li class="produto" data-cat="${cat.id}"`)))
      .join('')}</ul>`;
    const filtros = $('[data-filtros]');
    filtros.innerHTML = [{ id: '', nome: 'Tudo' }, ...D.cardapio]
      .map((cat) => `<button type="button" class="chip" data-filtro="${cat.id}" aria-pressed="${cat.id === ''}" aria-controls="produtos">${esc(cat.nome)}</button>`)
      .join('');
    filtros.addEventListener('click', (e) => {
      const botao = e.target.closest('[data-filtro]');
      if (!botao) return;
      const cat = botao.dataset.filtro;
      $$('[data-filtro]', filtros).forEach((b) => b.setAttribute('aria-pressed', String(b === botao)));
      $$('.produto', cardapio).forEach((li) => {
        li.hidden = Boolean(cat) && li.dataset.cat !== cat;
      });
      // Se a pessoa já desceu pela grade, volta para o começo dela.
      const grade = $('#produtos');
      if (grade.getBoundingClientRect().top < alturaCabecalho()) rola(grade);
    });
  }

  // A chamada para as encomendas usa os preços reais.
  const fatoTortas = $('[data-fato-tortas]');
  if (fatoTortas) fatoTortas.textContent = `${D.tortas.length} sabores, de ${brl.format(Math.min(...precosTortas))} a ${brl.format(Math.max(...precosTortas))} o kg`;
  const fatoDoces = $('[data-fato-doces]');
  if (fatoDoces) fatoDoces.textContent = `A partir de 25 unidades por sabor, desde ${brl.format(menorPrecoDoce)} cada`;

  /* ——— Página de encomendas ——— */

  /* Ocasiões: uma aberta por vez; a foto da escolhida ocupa a direita */
  const listaOcasioes = $('[data-ocasioes]');
  if (listaOcasioes) {
    listaOcasioes.innerHTML = (D.ocasioes || [])
      .map(
        (o, i) => `<li class="ocasiao${i === 0 ? ' is-ativa' : ''}" data-ocasiao-item="${o.id}">
          <button type="button" class="ocasiao__nome" aria-expanded="${i === 0}" aria-controls="ocasiao-${o.id}">${esc(o.nome)}<svg aria-hidden="true"><use href="#i-arrow"></use></svg></button>
          <div class="ocasiao__corpo" id="ocasiao-${o.id}"${i === 0 ? '' : ' hidden'}>
            <img class="ocasiao__foto-celular" src="${foto(`ocasiao-${o.id}`)}" alt="${esc(o.nome)}" width="800" height="1000" loading="lazy">
            <p>${esc(o.texto)}</p>
            <button type="button" class="btn btn--primario btn--p" data-ocasiao="${o.id}">Pedir orçamento</button>
          </div>
        </li>`
      )
      .join('');
    $('[data-ocasioes-fotos]').innerHTML = (D.ocasioes || [])
      .map((o, i) => `<img src="${foto(`ocasiao-${o.id}`)}" alt="" width="800" height="1000"${i === 0 ? ' class="is-ativa"' : ''} data-foto-ocasiao="${o.id}">`)
      .join('');
    listaOcasioes.addEventListener('click', (e) => {
      const nome = e.target.closest('.ocasiao__nome');
      if (!nome) return;
      const id = nome.closest('[data-ocasiao-item]').dataset.ocasiaoItem;
      $$('[data-ocasiao-item]').forEach((li) => {
        const ativa = li.dataset.ocasiaoItem === id;
        li.classList.toggle('is-ativa', ativa);
        $('.ocasiao__nome', li).setAttribute('aria-expanded', String(ativa));
        $('.ocasiao__corpo', li).hidden = !ativa;
      });
      $$('[data-foto-ocasiao]').forEach((img) => img.classList.toggle('is-ativa', img.dataset.fotoOcasiao === id));
    });
  }

  /* Tortas: os mais pedidos no trilho, com foto; depois a lista com todos os sabores */
  const tortas = $('[data-tortas]');
  if (tortas) {
    tortas.innerHTML = D.tortas
      .filter((t) => t.foto)
      .map(
        (t) => `<article class="torta">
          <figure class="torta__pic"><img src="${foto(`torta-${t.id}`)}" alt="Torta ${esc(t.nome)}" width="800" height="1000" loading="lazy"></figure>
          <div class="torta__body">
            <div class="torta__head"><h3 class="torta__name">${esc(t.nome)}</h3><span class="torta__price">${precoKg(t.precoKg)}</span></div>
            <p class="torta__desc">${esc(t.descricao)}</p>
            <button type="button" class="btn btn--primario btn--p" data-quero="${t.id}">Quero esta torta</button>
          </div>
        </article>`
      )
      .join('');
  }
  const listaSabores = $('[data-lista-sabores]');
  if (listaSabores) {
    listaSabores.innerHTML = D.tortas
      .map(
        (t) => `<li>
          <div><h4>${esc(t.nome)}</h4><span>${precoKg(t.precoKg)}</span></div>
          <p>${esc(t.descricao)}</p>
        </li>`
      )
      .join('');
    $('[data-faixa-precos]').textContent = `${D.tortas.length} sabores, de ${brl.format(Math.min(...precosTortas))} a ${brl.format(Math.max(...precosTortas))} o quilo.`;
  }

  /* Tamanhos: pratos desenhados em escala */
  const tamanhos = $('[data-tamanhos]');
  if (tamanhos) {
    tamanhos.innerHTML = D.tamanhos
      .map(
        (t) => `<li class="plate" data-plate="${t.id}">
          <button type="button" class="plate__btn" style="--d: calc(${t.id} * clamp(4.4px, 0.8vw, 8px))" aria-label="Escolher ${esc(t.forma.toLowerCase())}, até ${t.fatias} fatias, no orçamento"><span></span></button>
          <p class="plate__forma">${t.id} cm</p>
          <p class="plate__fatias">até ${t.fatias} fatias</p>
        </li>`
      )
      .join('');
  }

  /* Docinhos: grupos com preço e as fotos */
  const grupos = $('[data-grupos]');
  if (grupos) {
    grupos.innerHTML = D.docinhos
      .map(
        (g) => `<div class="grupo">
          <dt>${esc(g.nome)} <span>${precoDoce(g)}</span></dt>
          <dd>${g.itens.length} sabores.${g.nota ? ` ${esc(g.nota)}` : ''}</dd>
        </div>`
      )
      .join('');
  }
  const docinhos = $('[data-docinhos]');
  if (docinhos) {
    docinhos.innerHTML = D.docinhos
      .flatMap((g) => g.itens.filter((i) => i.foto).map((i) => ({ ...i, preco: i.preco ?? g.preco })))
      .map(
        (i) => `<li class="doce">
          <figure>
            <img src="${foto(`${i.foto}-${i.id}`)}" alt="${esc(i.nome)}" width="800" height="1000" loading="lazy">
            <figcaption>${esc(i.nome)}<span>${brl.format(i.preco)}</span></figcaption>
          </figure>
        </li>`
      )
      .join('');
  }

  /* Créditos: só das fotos ilustrativas que aparecem nesta página */
  const listaCreditos = $('[data-creditos]');
  if (listaCreditos) {
    const nomesPorFoto = new Map([
      ...D.cardapio.flatMap((c) => c.itens.map((i) => [i.id, i.nome])),
      ...D.tortas.map((t) => [`torta-${t.id}`, `Torta ${t.nome}`]),
      ...D.docinhos.flatMap((g) => g.itens.filter((i) => i.foto).map((i) => [`${i.foto}-${i.id}`, i.nome])),
      ...(D.ocasioes || []).map((o) => [`ocasiao-${o.id}`, o.nome]),
    ]);
    const naPagina = new Set($$('img').map((img) => img.getAttribute('src')));
    const creditos = (window.MG_CREDITOS || []).filter((c) => nomesPorFoto.has(c.id) && naPagina.has(foto(c.id)));
    listaCreditos.innerHTML = creditos
      .map(
        (c) =>
          `<li>${esc(nomesPorFoto.get(c.id))}: <a href="${esc(c.source_page)}" target="_blank" rel="noopener">${esc(c.creator || 'autor desconhecido')}</a>, ${esc(c.license)}</li>`
      )
      .join('');
  }

  /* Pedido do delivery (página de hoje) */
  if (gaveta) {
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
    const form = $('[data-order-form]');

    const desenha = () => {
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
    };

    const adiciona = (id, sabor) => {
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
    };

    const altera = (i, delta) => {
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
    };

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

    /* Gaveta do pedido */
    const campoEndereco = form.elements.endereco;
    const erroEndereco = $('[data-address-error]');
    const limpaErroEndereco = () => {
      erroEndereco.hidden = true;
      campoEndereco.removeAttribute('aria-invalid');
    };
    const atualizaModo = () => {
      const entrega = form.elements.modo.value === 'entrega';
      $('[data-address]').hidden = !entrega;
      $('[data-fee]').hidden = !entrega;
      if (!entrega) limpaErroEndereco();
    };

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
      rola($('#cardapio'));
    });

    form.addEventListener('change', (e) => {
      if (e.target.name !== 'modo') return;
      modoEscolhido = true;
      atualizaModo();
    });
    campoEndereco.addEventListener('input', () => {
      if (campoEndereco.value.trim()) limpaErroEndereco();
    });

    const mensagemPedido = () => {
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
    };

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

    atualizaModo();
    desenha();
  }

  /* Orçamento de encomendas (página de encomendas) */
  const orc = $('[data-orcamento]');
  if (orc) {
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

    const marcaPrato = () => $$('[data-plate]').forEach((p) => p.classList.toggle('is-chosen', p.dataset.plate === orc.elements.tamanho.value));
    const escolheTorta = (id) => {
      selectTorta.value = id;
      rola($('#orcamento'));
      aviso(`Torta ${TORTAS.get(id).nome} escolhida no orçamento.`);
    };
    const escolheTamanho = (id) => {
      orc.elements.tamanho.value = id;
      marcaPrato();
      aviso(`Forma de ${id} cm escolhida no orçamento.`);
    };
    const escolheOcasiao = (id) => {
      selectOcasiao.value = id;
      rola($('#orcamento'));
      aviso(`Orçamento para ${D.ocasioes.find((o) => o.id === id).nome}.`);
    };
    document.addEventListener('click', (e) => {
      const quero = e.target.closest('[data-quero]');
      if (quero) escolheTorta(quero.dataset.quero);
      const ocasiao = e.target.closest('[data-ocasiao]');
      if (ocasiao) escolheOcasiao(ocasiao.dataset.ocasiao);
      const prato = e.target.closest('.plate__btn');
      if (prato) escolheTamanho(prato.closest('[data-plate]').dataset.plate);
    });
    orc.addEventListener('change', (e) => {
      if (e.target.name === 'tamanho') marcaPrato();
    });
    marcaPrato();

    const marcaErro = (campo, erro, temErro) => {
      $(erro).hidden = !temErro;
      if (temErro) campo.setAttribute('aria-invalid', 'true');
      else campo.removeAttribute('aria-invalid');
    };
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
  }

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

  /* ——— Movimento e rolagem ——— */

  /* Entradas: cada parte sobe em sequência, uma vez */
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

  // Cabeçalho: transparente sobre a capa, sólido depois dela.
  const topo = $('[data-topo]');
  const capa = $('.capa');
  function quadroTopo() {
    const passou = !capa || capa.getBoundingClientRect().bottom <= alturaCabecalho() + 1;
    topo.classList.toggle('is-solido', passou);
  }

  // Capa: a foto desce mais devagar que a página e chega um pouco mais perto.
  const fotoCapa = $('[data-capa-foto]');
  function quadroCapa() {
    if (reduzMovimento || !fotoCapa) return;
    const y = window.scrollY;
    if (y > window.innerHeight * 1.2) return;
    fotoCapa.style.setProperty('--desce', `${(y * 0.28).toFixed(1)}px`);
    fotoCapa.style.setProperty('--zoom', (1 + (y / window.innerHeight) * 0.06).toFixed(4));
  }

  // Atalhos da página de encomendas: marca a parte em que a pessoa está.
  const espioes = $$('[data-espiao]').map((barra) => {
    const links = $$('a[href^="#"]', barra);
    return { barra, links, alvos: links.map((a) => document.getElementById(a.getAttribute('href').slice(1))) };
  });
  function quadroEspioes() {
    const linha = alturaCabecalho() + 140;
    espioes.forEach(({ barra, links, alvos }) => {
      let atual = -1;
      alvos.forEach((alvo, i) => {
        if (alvo && alvo.getBoundingClientRect().top <= linha) atual = i;
      });
      // Depois do fim do último alvo, nenhum fica marcado.
      const ultimo = alvos[alvos.length - 1];
      if (ultimo && ultimo.getBoundingClientRect().bottom < alturaCabecalho()) atual = -1;
      links.forEach((a, i) => {
        const ativo = i === atual;
        if (ativo && !a.classList.contains('is-ativo')) barra.scrollTo({ left: a.offsetLeft - 16, behavior: 'smooth' });
        a.classList.toggle('is-ativo', ativo);
        if (ativo) a.setAttribute('aria-current', 'true');
        else a.removeAttribute('aria-current');
      });
    });
  }

  /* Cenas de rolagem: só no computador e sem "reduzir movimento" */
  const telaGrande = window.matchMedia('(min-width: 900px) and (min-height: 620px)');

  // Trilho de tortas: o palco para e as tortas correm da direita para a esquerda.
  const trilho = $('[data-trilho]');
  const trilhoTrack = $('[data-trilho-track]');
  let trilhoDist = 0;
  function preparaTrilho() {
    if (!trilho) return;
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
    if (!trilho?.classList.contains('is-live')) return;
    // O palco prende abaixo do cabeçalho e da barra de atalhos.
    const preso = parseFloat(getComputedStyle(trilho.querySelector('.tortas__stage')).top) || alturaCabecalho();
    const topoTrilho = trilho.getBoundingClientRect().top;
    const percurso = trilho.offsetHeight - (window.innerHeight - preso);
    const p = clamp((preso - topoTrilho) / Math.max(1, percurso));
    trilhoTrack.style.transform = `translate3d(${(-p * trilhoDist).toFixed(1)}px, 0, 0)`;
    // As fotos correm um pouco mais devagar que os cartões: dá profundidade.
    const meio = window.innerWidth / 2;
    $$('.torta__pic img', trilhoTrack).forEach((img) => {
      const r = img.parentElement.getBoundingClientRect();
      const desvio = (r.left + r.width / 2 - meio) / window.innerWidth;
      img.style.transform = `translate3d(${(desvio * -8).toFixed(2)}%, 0, 0) scale(1.14)`;
    });
  }

  let pedidoQuadro = false;
  function quadro() {
    pedidoQuadro = false;
    quadroTopo();
    quadroCapa();
    quadroEspioes();
    quadroTrilho();
  }
  const agenda = () => {
    if (pedidoQuadro) return;
    pedidoQuadro = true;
    requestAnimationFrame(quadro);
  };
  const prepara = () => {
    preparaTrilho();
    quadro();
  };

  window.addEventListener('scroll', agenda, { passive: true });
  window.addEventListener('resize', prepara);
  telaGrande.addEventListener?.('change', prepara);
  window.addEventListener('load', () => {
    prepara();
    setTimeout(() => document.documentElement.classList.add('suave'), 0);
  });
  document.fonts?.ready.then(prepara);
  prepara();

  $$('[data-year]').forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
})();
