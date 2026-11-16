/* ==========================================================================
   COMPORTAMENTO DO SITE
   O conteúdo fica em js/config.js; aqui ficam apenas as interações.
   ========================================================================== */

(() => {
  "use strict";

  const cfg = window.PORTFOLIO || {};
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const motionOK = () => !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const pad = (n) => String(n).padStart(2, "0");
  const esc = (value) =>
    String(value ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  const icon = (id, extra = "") => `<svg class="icon ${extra}" aria-hidden="true"><use href="#${id}"/></svg>`;

  const CATEGORIES = { video: "Vídeo", stories: "Stories", foto: "Fotografia" };
  const RATIOS = { "16:9": 16 / 9, "9:16": 9 / 16, "1:1": 1, "4:5": 4 / 5 };

  /* ---- Navegação ---------------------------------------------------------- */

  function initNav() {
    const nav = $("[data-nav]");
    const toggle = $("[data-nav-toggle]");
    if (!nav || !toggle) return;

    const setOpen = (open) => {
      nav.classList.toggle("is-open", open);
      document.documentElement.classList.toggle("is-locked", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    };

    toggle.addEventListener("click", () => setOpen(!nav.classList.contains("is-open")));
    nav.addEventListener("click", (e) => {
      if (e.target.closest("a")) setOpen(false);
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        setOpen(false);
        toggle.focus();
      }
    });
    window.matchMedia("(min-width: 60rem)").addEventListener("change", (e) => e.matches && setOpen(false));

    const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Destaca no menu a seção que está no meio da tela
    const links = $$(".nav__link");
    const byId = new Map(links.map((a) => [a.getAttribute("href").slice(1), a]));
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          links.forEach((a) => a.removeAttribute("aria-current"));
          byId.get(entry.target.id)?.setAttribute("aria-current", "true");
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    $$("main > section[id]").forEach((section) => spy.observe(section));
  }

  /* ---- Animações ao rolar --------------------------------------------------- */

  let revealObserver;

  function initReveal() {
    $$("[data-stagger]").forEach((group) => {
      Array.from(group.children).forEach((el, i) => {
        el.setAttribute("data-reveal", "");
        el.style.setProperty("--reveal-delay", `${Math.min(i, 8) * 70}ms`);
      });
    });

    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -5% 0px" }
    );
    $$("[data-reveal]").forEach((el) => revealObserver.observe(el));
  }

  /* ---- Números de destaque (contagem) --------------------------------------- */

  function initCounters() {
    if (!motionOK()) return;
    const run = (el) => {
      const target = Number(el.dataset.count);
      const start = performance.now();
      const duration = 1400;
      const step = (now) => {
        const t = Math.min((now - start) / duration, 1);
        el.textContent = Math.round(target * (1 - Math.pow(1 - t, 3)));
        if (t < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          observer.unobserve(entry.target);
          run(entry.target);
        });
      },
      { threshold: 0.6 }
    );
    $$("[data-count]").forEach((el) => observer.observe(el));
  }

  /* ---- Hero: timecode e vídeo de fundo ---------------------------------------- */

  function initTimecode() {
    const el = $("[data-timecode]");
    const hero = $(".hero");
    if (!el || !hero || !motionOK()) return;

    const start = performance.now();
    let timer;
    const tick = () => {
      const t = (performance.now() - start) / 1000;
      el.textContent = `${pad(Math.floor(t / 3600))}:${pad(Math.floor(t / 60) % 60)}:${pad(Math.floor(t) % 60)}:${pad(Math.floor((t % 1) * 24))}`;
    };
    // Só roda enquanto o hero está visível
    new IntersectionObserver(([entry]) => {
      clearInterval(timer);
      if (entry.isIntersecting) timer = setInterval(tick, 1000 / 12);
    }).observe(hero);
  }

  function initHeroVideo() {
    const url = cfg.hero?.video;
    const box = $("[data-hero-media]");
    if (!url || !box || !motionOK() || navigator.connection?.saveData) return;

    const video = document.createElement("video");
    video.muted = true;
    video.loop = true;
    video.autoplay = true;
    video.playsInline = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("aria-hidden", "true");
    video.preload = "auto";
    video.addEventListener("canplay", () => box.classList.add("has-video"), { once: true });
    video.src = url;
    box.appendChild(video);
  }

  /* ---- Links de contato ---------------------------------------------------------- */

  function initLinks() {
    const c = cfg.contato || {};
    const pretty = (url) => (url || "").replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
    const handle = (c.instagram || "").replace(/^@/, "");
    const phone = (c.whatsapp || "").replace(/\D/g, "");

    const hrefs = {
      whatsapp: phone && `https://wa.me/${phone}${c.whatsappMensagem ? `?text=${encodeURIComponent(c.whatsappMensagem)}` : ""}`,
      email: c.email && `mailto:${c.email}`,
      instagram: handle && `https://www.instagram.com/${handle}/`,
      linkedin: c.linkedin,
      behance: c.behance,
      curriculo: c.curriculo,
    };
    const texts = {
      whatsapp: c.whatsappExibicao || (phone && `+${phone}`),
      email: c.email,
      instagram: handle && `@${handle}`,
      linkedin: pretty(c.linkedin),
      behance: pretty(c.behance),
    };

    $$("[data-link]").forEach((a) => {
      const href = hrefs[a.dataset.link];
      if (href) a.setAttribute("href", href);
      else (a.closest("li") || a).hidden = true; // contato não informado: some da página
    });
    $$("[data-text]").forEach((el) => {
      const text = texts[el.dataset.text];
      if (text) el.textContent = text;
    });
  }

  /* ---- Player de vídeo --------------------------------------------------------------- */

  function createEmbed(url, title) {
    let match;
    const frame = (src) => {
      const el = document.createElement("iframe");
      el.className = "player__embed";
      el.src = src;
      el.title = title;
      el.allow = "autoplay; fullscreen; picture-in-picture; encrypted-media";
      el.allowFullscreen = true;
      return el;
    };

    if ((match = url.match(/(?:youtube\.com\/(?:watch\?.*?v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{11})/))) {
      return frame(`https://www.youtube-nocookie.com/embed/${match[1]}?autoplay=1&rel=0&playsinline=1`);
    }
    if ((match = url.match(/vimeo\.com\/(?:video\/)?(\d+)/))) {
      return frame(`https://player.vimeo.com/video/${match[1]}?autoplay=1`);
    }
    const video = document.createElement("video");
    video.className = "player__embed";
    video.src = url;
    video.controls = true;
    video.autoplay = true;
    video.playsInline = true;
    video.setAttribute("aria-label", title);
    return video;
  }

  // O vídeo só é carregado quando a pessoa aperta o play: a página fica leve.
  function initPlayer(player, url, title) {
    const button = $(".player__play", player);
    if (!button) return;
    button.addEventListener("click", () => {
      if (!url) {
        const note = $(".player__note", player);
        if (note) note.hidden = false;
        return;
      }
      const embed = createEmbed(url, title);
      button.remove();
      player.appendChild(embed);
      embed.focus?.();
    });
  }

  function playerHTML({ poster, ratio = "16:9", label = "Assistir", title }) {
    return `
      <div class="player" style="--ar:${(RATIOS[ratio] || RATIOS["16:9"]).toFixed(4)}">
        <img class="player__poster" src="${esc(poster)}" alt="" decoding="async">
        <button class="player__play" type="button" aria-label="Reproduzir: ${esc(title)}">
          <span class="player__play-icon">${icon("i-play")}</span>
          <span class="player__play-label">${esc(label)}</span>
        </button>
        <p class="player__note" role="status" hidden>Vídeo de exemplo. O link deste vídeo ainda não foi adicionado.</p>
      </div>`;
  }

  function initShowreel() {
    const player = $("[data-showreel]");
    if (player) initPlayer(player, cfg.showreel?.url, "Showreel de Ana Julia");
  }

  /* ---- Galeria ------------------------------------------------------------------------ */

  function galleryHTML(images, { stories, title }) {
    const items = images
      .map(
        (src, i) =>
          `<li class="gallery__item"><img src="${esc(src)}" alt="${esc(title)}: imagem ${i + 1} de ${images.length}" loading="${i < 3 ? "eager" : "lazy"}" decoding="async"></li>`
      )
      .join("");
    return `
      <div class="gallery ${stories ? "gallery--stories" : ""}">
        <ul class="gallery__track" tabindex="0" aria-label="Galeria com ${images.length} imagens. Use as setas para navegar.">${items}</ul>
        <div class="gallery__bar">
          <span class="gallery__count" aria-hidden="true">01 / ${pad(images.length)}</span>
          <div class="gallery__nav">
            <button class="icon-btn" type="button" data-gallery="prev" aria-label="Imagem anterior">${icon("i-chevron-left")}</button>
            <button class="icon-btn" type="button" data-gallery="next" aria-label="Próxima imagem">${icon("i-chevron-right")}</button>
          </div>
        </div>
      </div>`;
  }

  function initGallery(gallery) {
    const track = $(".gallery__track", gallery);
    const count = $(".gallery__count", gallery);
    const prev = $('[data-gallery="prev"]', gallery);
    const next = $('[data-gallery="next"]', gallery);
    const total = track.children.length;
    const stepSize = () => {
      const first = track.children[0];
      return first ? first.getBoundingClientRect().width + parseFloat(getComputedStyle(track).columnGap || 0) : 0;
    };
    const update = () => {
      const max = track.scrollWidth - track.clientWidth;
      const atEnd = track.scrollLeft >= max - 2;
      const index = atEnd ? total : Math.min(total, Math.round(track.scrollLeft / (stepSize() || 1)) + 1);
      count.textContent = `${pad(index)} / ${pad(total)}`;
      prev.disabled = track.scrollLeft <= 2;
      next.disabled = atEnd;
    };
    const move = (dir) => track.scrollBy({ left: dir * stepSize(), behavior: motionOK() ? "smooth" : "auto" });

    prev.addEventListener("click", () => move(-1));
    next.addEventListener("click", () => move(1));
    track.addEventListener("scroll", () => requestAnimationFrame(update), { passive: true });
    track.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") { e.preventDefault(); move(1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); move(-1); }
    });
    requestAnimationFrame(update);
  }

  /* ---- Projetos: grid, filtros e modal --------------------------------------------------- */

  function initProjects() {
    const projects = cfg.projetos || [];
    const grid = $("[data-project-grid]");
    const filters = $$("[data-filter]");
    const countEl = $("[data-project-count]");
    const modal = $("[data-modal]");
    if (!grid || !projects.length) return;

    let visible = projects;
    let current = null;

    const cardHTML = (p, i) => `
      <li data-reveal style="--reveal-delay:${Math.min(i, 5) * 70}ms">
        <article class="project-card">
          <img class="project-card__img" src="${esc(p.capa)}" alt="" width="800" height="1000" loading="lazy" decoding="async">
          <div class="project-card__top">
            <span aria-hidden="true">${pad(projects.indexOf(p) + 1)}</span>
            <span class="tag tag--solid">${esc(p.formato)}</span>
          </div>
          <div class="project-card__body">
            <p class="project-card__client">${esc(p.cliente)} · ${esc(CATEGORIES[p.categoria] || "")}</p>
            <h3 class="project-card__title">
              <button class="project-card__trigger" type="button" data-project="${esc(p.id)}" aria-haspopup="dialog">${esc(p.titulo)}</button>
            </h3>
            <div class="project-card__more"><div>
              <p class="project-card__desc">${esc(p.resumo)}</p>
              <span class="project-card__cta" aria-hidden="true">Ver case ${icon("i-arrow-up-right")}</span>
            </div></div>
          </div>
        </article>
      </li>`;

    const render = (animateNow) => {
      grid.innerHTML = visible.map(cardHTML).join("");
      $$("[data-reveal]", grid).forEach((el) => {
        if (animateNow) requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add("is-visible")));
        else revealObserver.observe(el);
      });
      if (countEl) countEl.textContent = `${pad(visible.length)} ${visible.length === 1 ? "projeto" : "projetos"}`;
    };

    // Contadores nos filtros
    filters.forEach((btn) => {
      const key = btn.dataset.filter;
      const total = key === "todos" ? projects.length : projects.filter((p) => p.categoria === key).length;
      const badge = $(".chip__count", btn);
      if (badge) badge.textContent = pad(total);
    });

    filters.forEach((btn) => {
      btn.addEventListener("click", () => {
        if (btn.getAttribute("aria-pressed") === "true") return;
        const key = btn.dataset.filter;
        filters.forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
        visible = key === "todos" ? projects : projects.filter((p) => p.categoria === key);
        render(true);
      });
    });

    render(false);

    /* -- Modal -- */
    if (!modal) return;
    const media = $("[data-modal-media]", modal);
    const body = $("[data-modal-body]", modal);

    const fill = (p) => {
      current = p;
      const isVideo = p.midia?.tipo === "video";
      const title = `${p.cliente}: ${p.titulo}`;

      media.innerHTML = isVideo
        ? playerHTML({ poster: p.midia.capa || p.capa, ratio: p.midia.proporcao, title, label: "Assistir ao vídeo" })
        : galleryHTML(p.midia?.imagens || [p.capa], { stories: p.categoria === "stories", title });

      if (isVideo) initPlayer($(".player", media), p.midia.url, title);
      else initGallery($(".gallery", media));

      body.innerHTML = `
        <p class="eyebrow"><span class="eyebrow__num">${pad(projects.indexOf(p) + 1)}</span>${esc(CATEGORIES[p.categoria] || "")} · ${esc(p.ano)}</p>
        <h2 class="modal__title" id="modal-title">${esc(p.titulo)}</h2>
        <p class="modal__client">${esc(p.cliente)} · ${esc(p.formato)}</p>
        <dl class="modal__facts">
          <div><dt>O desafio</dt><dd>${esc(p.desafio)}</dd></div>
          <div><dt>O resultado</dt><dd>${esc(p.resultado)}</dd></div>
        </dl>
        ${
          p.metricas?.length
            ? `<ul class="modal__metrics">${p.metricas.map((m) => `<li><strong>${esc(m.valor)}</strong><span>${esc(m.rotulo)}</span></li>`).join("")}</ul>`
            : ""
        }
        <div class="modal__actions">
          <a class="btn btn--primary" href="#contato" data-modal-cta>Quero um projeto assim ${icon("i-arrow-right", "icon--move")}</a>
          ${visible.length > 1 ? `<button class="btn btn--ghost" type="button" data-modal-next>Próximo projeto</button>` : ""}
        </div>`;
      $(".modal__scroll", modal).scrollTop = 0;
    };

    const open = (id) => {
      const project = projects.find((p) => p.id === id);
      if (!project) return;
      fill(project);
      modal.showModal();
    };

    grid.addEventListener("click", (e) => {
      const trigger = e.target.closest("[data-project]");
      if (trigger) open(trigger.dataset.project);
    });

    modal.addEventListener("click", (e) => {
      // Clique fora do painel ou no botão de fechar
      if (e.target === modal || e.target.closest("[data-modal-close]")) return modal.close();
      if (e.target.closest("[data-modal-cta]")) return modal.close();
      if (e.target.closest("[data-modal-next]")) {
        const list = visible.includes(current) ? visible : projects;
        fill(list[(list.indexOf(current) + 1) % list.length]);
        $("[data-modal-close]", modal).focus();
      }
    });

    // Ao fechar, remove o vídeo para interromper a reprodução
    modal.addEventListener("close", () => {
      media.innerHTML = "";
      current = null;
    });
  }

  /* ---- Formulário de contato ------------------------------------------------------------- */

  function initForm() {
    const form = $("[data-contact-form]");
    if (!form) return;
    const status = $("[data-form-status]", form);
    const submit = $('[type="submit"]', form);
    const note = $("[data-form-note]", form);
    const endpoint = cfg.contato?.formEndpoint;
    const email = cfg.contato?.email;

    if (endpoint && note) note.hidden = true;

    const say = (text, state = "") => {
      status.textContent = text;
      status.dataset.state = state;
    };

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form));
      if (data.website) return; // campo-isca contra robôs
      delete data.website;

      if (!endpoint) {
        if (!email) return say("Adicione um e-mail de contato para receber as mensagens.", "error");
        const subject = `Contato pelo portfólio: ${data.nome}`;
        const text = `${data.mensagem}\n\n${data.nome}\n${data.email}`;
        window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
        return say(`Abrindo seu aplicativo de e-mail. Se nada acontecer, escreva para ${email}.`, "ok");
      }

      submit.disabled = true;
      say("Enviando…");
      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error(String(response.status));
        form.reset();
        say("Mensagem enviada. Agradeço o contato e respondo em breve!", "ok");
      } catch {
        say(`Não foi possível enviar agora. Tente de novo ou escreva para ${email || "o e-mail ao lado"}.`, "error");
      } finally {
        submit.disabled = false;
      }
    });
  }

  /* ---- Rodapé ------------------------------------------------------------------------------ */

  function initYear() {
    const el = $("[data-year]");
    if (el) el.textContent = new Date().getFullYear();
  }

  /* ---- Início -------------------------------------------------------------------------------- */

  initNav();
  initReveal();
  initCounters();
  initTimecode();
  initHeroVideo();
  initLinks();
  initShowreel();
  initProjects();
  initForm();
  initYear();
})();
