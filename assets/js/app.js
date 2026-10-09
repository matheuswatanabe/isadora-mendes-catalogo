/* Isadora Mendes Semijoias · comportamento do catálogo */
(function () {
  "use strict";

  document.documentElement.classList.add("js");

  /* ---------- Recarregar sempre volta ao topo ---------- */

  // O navegador não restaura a rolagem nem pula para âncoras (#sobre, #catalogo):
  // a página abre do início e as entradas animam de novo. Link de peça (#peca/…) continua valendo.
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  if (location.hash && !/^#peca\//.test(location.hash)) {
    history.replaceState(null, "", location.pathname + location.search);
  }
  function irAoTopo() { window.scrollTo({ top: 0, left: 0, behavior: "instant" }); }
  irAoTopo();
  window.addEventListener("load", irAoTopo);

  var CFG = window.IM_CONFIG || {};
  var CATS = window.IM_CATEGORIAS || [];
  var PECAS = (window.IM_PECAS || []).map(function (p, i) {
    p._ordem = i;
    return p;
  });

  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  var brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
  function preco(v) {
    if (v == null) return "Valor a combinar"; // peça sem preço fixo (ex.: personalizada)
    return brl.format(v).replace(/ /g, " "); }

  function img(url, w, h) {
    if (url.indexOf("images.unsplash.com") === -1) return url;
    return url + (url.indexOf("?") === -1 ? "?" : "&") + "w=" + w + "&h=" + h + "&fit=crop&q=72&auto=format";
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /* ---------- WhatsApp ---------- */

  function waLink(texto) {
    var n = String(CFG.whatsapp || "").replace(/\D/g, "");
    return "https://wa.me/" + n + "?text=" + encodeURIComponent(texto);
  }

  function waPeca(p) {
    var modelo = p.preco == null ? CFG.mensagemPecaSemPreco : CFG.mensagemPeca;
    var msg = (modelo ||"Olá! Tenho interesse na peça {peca} ({codigo}).")
      .replace("{peca}", p.nome)
      .replace("{codigo}", p.codigo)
      .replace("{preco}", preco(p.preco));
    return waLink(msg + "\n" + linkPeca(p));
  }

  function linkPeca(p) {
    return location.href.split("#")[0] + "#peca/" + encodeURIComponent(p.codigo);
  }

  $$('[data-wa="geral"]').forEach(function (a) {
    a.href = waLink(CFG.mensagemGeral || "Olá!");
  });

  var insta = $("#link-instagram");
  if (insta) {
    if (CFG.instagram) insta.href = CFG.instagram;
    else insta.remove();
  }
  var ano = $("#ano");
  if (ano) ano.textContent = new Date().getFullYear();

  $$("[data-price-of]").forEach(function (el) {
    var p = porCodigo(el.getAttribute("data-price-of"));
    if (p) el.textContent = preco(p.preco);
  });

  function porCodigo(c) {
    for (var i = 0; i < PECAS.length; i++) if (PECAS[i].codigo === c) return PECAS[i];
    return null;
  }

  /* ---------- Catálogo ---------- */

  var grade = $("#grade");
  var filtros = $("#filtros");
  var ordem = $("#ordem");
  var contagem = $("#contagem");
  var vazio = $("#vazio");
  var estado = { cat: "todas", ordem: "destaques" };

  function montarFiltros() {
    var itens = [{ id: "todas", nome: "Todas", n: PECAS.length }].concat(
      CATS.map(function (c) {
        return {
          id: c.id,
          nome: c.nome,
          n: PECAS.filter(function (p) { return p.categoria === c.id; }).length,
        };
      }).filter(function (c) { return c.n > 0; }) // categoria sem peças não aparece
    );
    filtros.innerHTML = itens
      .map(function (c) {
        return (
          '<button class="filter" type="button" data-cat="' + esc(c.id) + '" aria-pressed="' +
          (c.id === estado.cat) + '">' + esc(c.nome) + "</button>"
        );
      })
      .join("");
  }

  function listaAtual() {
    var l = PECAS.filter(function (p) {
      return estado.cat === "todas" || p.categoria === estado.cat;
    });
    var o = estado.ordem;
    l.sort(function (a, b) {
      if ((o === "menor" || o === "maior") && (a.preco == null || b.preco == null))
        return (a.preco == null) - (b.preco == null); // sem preço vai para o fim
      if (o === "menor") return a.preco - b.preco;
      if (o === "maior") return b.preco - a.preco;
      if (o === "nome") return a.nome.localeCompare(b.nome, "pt-BR");
      return (b.fundoClaro ? 1 : 0) - (a.fundoClaro ? 1 : 0) ||
        (b.destaque ? 1 : 0) - (a.destaque ? 1 : 0) || a._ordem - b._ordem;
    });
    return l;
  }

  function cartao(p, i) {
    var f = p.fotos || [];
    var eager = i < 4 ? 'loading="eager"' : 'loading="lazy"';
    var fotos =
      '<img src="' + esc(img(f[0], 640, 800)) + '" srcset="' + esc(img(f[0], 400, 500)) + " 400w, " +
      esc(img(f[0], 640, 800)) + " 640w, " + esc(img(f[0], 900, 1125)) + ' 900w" ' +
      'sizes="(max-width: 760px) 50vw, (max-width: 1100px) 33vw, 25vw" width="640" height="800" ' +
      eager + ' decoding="async" alt="' + esc(p.alt || p.nome) + '">';
    if (f[1]) {
      fotos +=
        '<img src="' + esc(img(f[1], 640, 800)) + '" width="640" height="800" loading="lazy" decoding="async" alt="" aria-hidden="true">';
    }
    var tag = p.disponivel === false ? '<span class="card__tag">Sob encomenda</span>' : "";
    return (
      '<li data-reveal="card"><article class="card">' +
      '<a class="card__link" href="#peca/' + encodeURIComponent(p.codigo) + '" data-open="' + esc(p.codigo) + '">' +
      '<span class="card__media">' + tag + fotos + "</span>" +
      '<span class="card__body">' +
      '<span class="card__name">' + esc(p.nome) + "</span>" +
      (p.material ? '<span class="card__finish">' + esc(p.material) + "</span>" : "") +
      '<span class="card__price price">' + preco(p.preco) + "</span>" +
      "</span></a>" +
      '<a class="card__wa" href="' + esc(waPeca(p)) + '" target="_blank" rel="noopener" aria-label="Comprar ' +
      esc(p.nome) + ' pelo WhatsApp"><svg aria-hidden="true"><use href="#i-whatsapp"/></svg></a>' +
      "</article></li>"
    );
  }

  function render() {
    var l = listaAtual();
    grade.innerHTML = l.map(cartao).join("");
    observar(grade);
    vazio.hidden = l.length > 0;
    grade.hidden = l.length === 0;
    var nomeCat = estado.cat === "todas" ? "" : " em " + (CATS.filter(function (c) { return c.id === estado.cat; })[0] || {}).nome;
    contagem.textContent = l.length === 1 ? "1 peça" + nomeCat : l.length + " peças" + nomeCat;
  }

  filtros.addEventListener("click", function (e) {
    var b = e.target.closest("[data-cat]");
    if (!b) return;
    estado.cat = b.getAttribute("data-cat");
    $$(".filter", filtros).forEach(function (x) {
      x.setAttribute("aria-pressed", String(x === b));
    });
    b.scrollIntoView({ block: "nearest", inline: "nearest" });
    render();
    rolarParaCatalogo();
  });

  ordem.addEventListener("change", function () {
    estado.ordem = ordem.value;
    render();
  });

  /* Ordenação: lista própria, com o select nativo como base */
  (function montarOrdenacao() {
    var box = $("#ordenar");
    if (!box) return;
    var opts = Array.prototype.slice.call(ordem.options);

    box.insertAdjacentHTML(
      "beforeend",
      '<button class="sort__btn" type="button" aria-haspopup="listbox" aria-expanded="false" ' +
        'aria-labelledby="ordem-rotulo ordem-valor">' +
        '<span class="sort__label" id="ordem-rotulo">Ordenar</span>' +
        '<span class="sort__value" id="ordem-valor"></span>' +
        '<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M2 4.5l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.1"/></svg>' +
        "</button>" +
        '<ul class="sort__list" role="listbox" tabindex="-1" aria-labelledby="ordem-rotulo">' +
        opts
          .map(function (o) {
            return '<li class="sort__opt" role="option" id="ordem-' + esc(o.value) + '" data-value="' +
              esc(o.value) + '">' + esc(o.text) + "</li>";
          })
          .join("") +
        "</ul>"
    );
    box.classList.add("is-enhanced");

    var btn = $(".sort__btn", box);
    var lista = $(".sort__list", box);
    var itens = $$(".sort__opt", box);
    var valor = $("#ordem-valor");
    var ativo = 0;

    function sincronizar() {
      itens.forEach(function (li) {
        li.setAttribute("aria-selected", String(li.getAttribute("data-value") === ordem.value));
      });
      valor.textContent = ordem.options[ordem.selectedIndex].text;
    }

    function marcar(i) {
      ativo = (i + itens.length) % itens.length;
      itens.forEach(function (li, j) { li.classList.toggle("is-active", j === ativo); });
      lista.setAttribute("aria-activedescendant", itens[ativo].id);
    }

    function abrirLista() {
      box.classList.add("is-open");
      btn.setAttribute("aria-expanded", "true");
      marcar(ordem.selectedIndex);
      lista.focus({ preventScroll: true });
    }

    function fecharLista(devolverFoco) {
      if (!box.classList.contains("is-open")) return;
      box.classList.remove("is-open");
      btn.setAttribute("aria-expanded", "false");
      itens.forEach(function (li) { li.classList.remove("is-active"); });
      if (devolverFoco) btn.focus({ preventScroll: true });
    }

    function escolher(i) {
      if (ordem.selectedIndex !== i) {
        ordem.selectedIndex = i;
        ordem.dispatchEvent(new Event("change"));
        sincronizar();
      }
      fecharLista(true);
    }

    btn.addEventListener("click", function () {
      if (box.classList.contains("is-open")) fecharLista(true);
      else abrirLista();
    });
    btn.addEventListener("keydown", function (e) {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        abrirLista();
      }
    });

    lista.addEventListener("click", function (e) {
      var li = e.target.closest(".sort__opt");
      if (li) escolher(itens.indexOf(li));
    });
    lista.addEventListener("mousemove", function (e) {
      var li = e.target.closest(".sort__opt");
      if (li && itens.indexOf(li) !== ativo) marcar(itens.indexOf(li));
    });
    lista.addEventListener("keydown", function (e) {
      var k = e.key;
      if (k === "ArrowDown") marcar(ativo + 1);
      else if (k === "ArrowUp") marcar(ativo - 1);
      else if (k === "Home") marcar(0);
      else if (k === "End") marcar(itens.length - 1);
      else if (k === "Enter" || k === " ") escolher(ativo);
      else if (k === "Escape") fecharLista(true);
      else if (k === "Tab") { fecharLista(false); return; }
      else return;
      e.preventDefault();
    });

    document.addEventListener("pointerdown", function (e) {
      if (!box.contains(e.target)) fecharLista(false);
    });

    sincronizar();
  })();

  $$("[data-filter-reset]").forEach(function (b) {
    b.addEventListener("click", function () {
      var t = $('[data-cat="todas"]', filtros);
      if (t) t.click();
    });
  });

  function rolarParaCatalogo() {
    var bar = $(".toolbar");
    var topo = $("#catalogo-titulo").getBoundingClientRect().bottom;
    if (topo < 0) {
      var y = window.scrollY + $("#contagem").getBoundingClientRect().top - bar.offsetHeight - 56;
      window.scrollTo({ top: y, behavior: reduzido() ? "auto" : "smooth" });
    }
  }

  function reduzido() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  /* ---------- Detalhe da peça ---------- */

  var sheet = $("#peca");
  var ultimoFoco = null;

  function abrir(codigo, viaHash) {
    var p = porCodigo(codigo);
    if (!p) return;
    ultimoFoco = document.activeElement;

    $("#peca-nome").textContent = p.nome;
    $("#peca-preco").innerHTML =
      preco(p.preco) +
      (p.precoPrazo ? " <small>à vista</small>" : "") +
      (p.disponivel === false ? " <small>Sob encomenda</small>" : "") +
      (p.precoPrazo ? '<span class="sheet__prazo">ou ' + preco(p.precoPrazo) + " a prazo</span>" : "");
    $("#peca-descricao").textContent = p.descricao || "";
    $("#peca-detalhes").innerHTML = (p.detalhes || []).concat([["Referência", p.codigo]])
      .map(function (d) {
        return "<div><dt>" + esc(d[0]) + "</dt><dd>" + esc(d[1]) + "</dd></div>";
      })
      .join("");
    $("#peca-wa").href = waPeca(p);
    $("#peca-copiar").dataset.link = linkPeca(p);
    $("#peca-copiar span").textContent = "Copiar link da peça";

    var g = $("#peca-galeria");
    var fotos = p.fotos || [];
    g.innerHTML =
      '<div class="gallery__track" tabindex="0" aria-label="Fotos de ' + esc(p.nome) + '">' +
      fotos
        .map(function (f, i) {
          return (
            '<img src="' + esc(img(f, 1100, 1375)) + '" width="1100" height="1375" alt="' +
            esc(i === 0 ? p.alt || p.nome : p.nome + ", foto " + (i + 1)) + '"' +
            (i ? ' loading="lazy"' : "") + ">"
          );
        })
        .join("") +
      "</div>" +
      (fotos.length > 1
        ? '<button class="gallery__nav gallery__nav--prev" type="button" data-passo="-1" aria-label="Foto anterior" disabled>' +
          '<svg aria-hidden="true"><use href="#i-arrow"/></svg></button>' +
          '<button class="gallery__nav gallery__nav--next" type="button" data-passo="1" aria-label="Próxima foto">' +
          '<svg aria-hidden="true"><use href="#i-arrow"/></svg></button>' +
          '<div class="gallery__dots' + (p.indicador === "direita" ? " gallery__dots--direita" : "") + '">' +
          fotos
            .map(function (_, i) {
              return (
                '<button type="button" data-foto="' + i + '" aria-label="Ver foto ' + (i + 1) + " de " +
                fotos.length + '"' + (i === 0 ? ' aria-current="true"' : "") + "></button>"
              );
            })
            .join("") +
          "</div>"
        : "");

    var track = $(".gallery__track", g);
    track.addEventListener("scroll", function () {
      var i = Math.round(track.scrollLeft / track.clientWidth);
      $$(".gallery__dots button", g).forEach(function (b, j) {
        if (j === i) b.setAttribute("aria-current", "true");
        else b.removeAttribute("aria-current");
      });
      $$(".gallery__nav", g).forEach(function (b) {
        var alvo = i + +b.getAttribute("data-passo");
        b.disabled = alvo < 0 || alvo >= fotos.length;
      });
    }, { passive: true });

    if (!sheet.open) {
      sheet.classList.remove("is-closing");
      sheet.showModal();
      document.body.style.overflow = "hidden";
    }
    $(".sheet__info", sheet).scrollTop = 0;
    $(".sheet__body", sheet).scrollTop = 0;
    // foco no próprio diálogo, sem anel visível ao abrir; o Tab leva ao botão de fechar
    sheet.focus({ preventScroll: true });

    var alvo = "#peca/" + encodeURIComponent(p.codigo);
    if (!viaHash && location.hash !== alvo) history.pushState({ peca: p.codigo }, "", alvo);
    document.title = p.nome + " · Isadora Mendes Semijoias";
  }

  function fechar(viaHash) {
    if (!sheet.open) return;
    var fim = function () {
      sheet.classList.remove("is-closing");
      sheet.close();
    };
    if (reduzido()) fim();
    else {
      sheet.classList.add("is-closing");
      setTimeout(fim, 320);
    }
    document.body.style.overflow = "";
    document.title = "Isadora Mendes Semijoias · Catálogo";
    if (!viaHash && /^#peca\//.test(location.hash)) {
      if (history.state && history.state.peca) history.back();
      else history.replaceState(null, "", location.pathname + location.search + "#catalogo");
    }
    if (ultimoFoco && ultimoFoco.focus) ultimoFoco.focus({ preventScroll: true });
  }

  document.addEventListener("click", function (e) {
    var a = e.target.closest("[data-open]");
    if (a) {
      e.preventDefault();
      abrir(a.getAttribute("data-open"));
      return;
    }
    var dot = e.target.closest("[data-foto]");
    var nav = e.target.closest("[data-passo]");
    if (dot || nav) {
      var t = $(".gallery__track", sheet);
      var n = dot
        ? +dot.getAttribute("data-foto")
        : Math.round(t.scrollLeft / t.clientWidth) + +nav.getAttribute("data-passo");
      t.scrollTo({ left: t.clientWidth * n, behavior: reduzido() ? "auto" : "smooth" });
    }
  });

  sheet.addEventListener("click", function (e) {
    if (e.target.closest("[data-close]") || e.target === sheet) fechar();
  });
  sheet.addEventListener("cancel", function (e) {
    e.preventDefault();
    fechar();
  });

  $("#peca-copiar").addEventListener("click", function () {
    var btn = this;
    var link = btn.dataset.link;
    var ok = function () {
      $("span", btn).textContent = "Link copiado";
      // no celular o botão é só o ícone: um aviso curto aparece sobre ele
      btn.classList.add("is-copied");
      clearTimeout(btn._t);
      btn._t = setTimeout(function () { btn.classList.remove("is-copied"); }, 1800);
    };
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(link).then(ok, function () { prompt("Copie o link da peça:", link); });
    } else {
      prompt("Copie o link da peça:", link);
    }
  });

  function lerHash() {
    var m = location.hash.match(/^#peca\/(.+)$/);
    if (m) abrir(decodeURIComponent(m[1]), true);
    else fechar(true);
  }
  window.addEventListener("popstate", lerHash);

  /* ---------- Entradas ao rolar ---------- */

  // Sem IntersectionObserver ou com movimento reduzido, tudo já aparece pronto
  var revela = "IntersectionObserver" in window && !reduzido();
  if (revela) document.documentElement.classList.add("reveal");

  var io = revela
    ? new IntersectionObserver(
        function (entradas) {
          // o que entra junto aparece em cascata, um pouco depois do anterior
          var k = 0;
          entradas.forEach(function (e) {
            if (!e.isIntersecting) return;
            e.target._revela.forEach(function (el) {
              el.style.setProperty("--d", Math.min(k++, 5) * 90 + "ms");
              el.classList.add("is-in");
            });
            io.unobserve(e.target);
          });
        },
        { rootMargin: "0px 0px -10% 0px", threshold: 0 }
      )
    : null;

  function observar(ctx) {
    $$("[data-reveal]", ctx).forEach(function (el) {
      if (!io) return el.classList.add("is-in");
      // Títulos começam recortados (área zero); quem avisa que entraram na tela é o pai
      var alvo = el.getAttribute("data-reveal") === "sign" ? el.parentElement : el;
      alvo._revela = alvo._revela || [];
      if (alvo._revela.indexOf(el) === -1) alvo._revela.push(el);
      io.observe(alvo);
    });
  }

  /* ---------- Barra superior, wordmark e botão flutuante ---------- */

  var topbar = $(".topbar");
  var hero = $(".hero");
  var floatWa = $(".float-wa");
  // Trechos com fundo próprio: a barra fixa assume o tom de quem está embaixo dela
  var tomAtual = null;

  function tomDaBarra() {
    var h = topbar.offsetHeight;
    var alvo = null;
    $$("main > section:not(.hero)").forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.top <= h && r.bottom > h) alvo = el;
    });
    var cor = alvo ? getComputedStyle(alvo).backgroundColor : "";
    if (!cor || cor === "rgba(0, 0, 0, 0)") cor = "";
    if (cor !== tomAtual) {
      tomAtual = cor;
      if (cor) topbar.style.setProperty("--bar-tone", cor);
      else topbar.style.removeProperty("--bar-tone");
    }
  }

  function aoRolar() {
    var y = window.scrollY;
    topbar.classList.toggle("is-scrolled", y > 8);
    tomDaBarra();
    var passou = hero.getBoundingClientRect().bottom < 80;
    // Transparente e clara enquanto está sobre a foto do topo
    topbar.classList.toggle("is-over-hero", hero.getBoundingClientRect().bottom > topbar.offsetHeight);
    var rodape = $(".footer").getBoundingClientRect().top < window.innerHeight;
    // Na grade, cada peça já tem seu botão de WhatsApp: o flutuante sai de cena
    var g = grade.getBoundingClientRect();
    var naGrade = g.top < window.innerHeight * 0.8 && g.bottom > window.innerHeight * 0.2;
    floatWa.classList.toggle("is-visible", passou && !rodape && !naGrade);
  }
  window.addEventListener("scroll", aoRolar, { passive: true });

  /* ---------- Início ---------- */

  montarFiltros();
  render();
  observar(document);
  aoRolar();
  lerHash();
})();
