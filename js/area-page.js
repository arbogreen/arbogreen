/* Logica condivisa delle pagine area (provincia e comune).
   Nessun nome di comune è scritto qui: provincia, comune della pagina ed
   elenco si leggono dal DOM, così una nuova pagina area richiede solo il
   markup della sezione e il file di configurazione delle foto. */

(() => {
  const root = document.querySelector("[data-territory-selector]");
  if (!root) return;

  const svg = root.querySelector("[data-territory-svg]");
  const scroll = root.querySelector("[data-territory-scroll]");
  const status = root.querySelector("[data-territory-status]");
  if (!svg || !scroll || !status) return;

  const province = root.dataset.province || "";
  const currentSlug = root.dataset.current || "";
  const options = [...scroll.querySelectorAll("[data-comune]")];
  if (!options.length) return;

  const shapes = [...svg.querySelectorAll("[data-comune]")].filter(
    (shape) => shape.dataset.comune !== currentSlug
  );
  const names = new Map(options.map((option) => [option.dataset.comune, option.textContent.trim()]));
  const currentName = root.querySelector(".siena-territory__option--current")?.textContent.trim() || "";

  // Sotto questa soglia l'hover non esiste: il selettore diventa una rotella.
  const wheel = window.matchMedia("(max-width: 920px)");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  let pinned = null;   // fissato dal click (o dalla casella, su mobile)
  let preview = null;  // anteprima transitoria da hover/focus
  let syncing = false; // scroll pilotato dal codice, non dall'utente
  let scrollFrame;

  const render = () => {
    const highlighted = preview || pinned;

    options.forEach((option) => {
      const slug = option.dataset.comune;
      const isPinned = slug === pinned;
      option.classList.toggle("is-active", isPinned);
      option.classList.toggle("is-preview", slug === preview && !isPinned);

      // Il capoluogo e ogni comune che ha gia una pagina sono <a>, non <button>:
      // aria-pressed non è valido su un link, lì lo stato si esprime con
      // aria-current. Non diamo role="button" al link, altrimenti perderebbe
      // la semantica di collegamento (apertura in nuova scheda, menu contestuale).
      if (option.tagName === "A") {
        if (isPinned) option.setAttribute("aria-current", "true");
        else option.removeAttribute("aria-current");
      } else {
        option.setAttribute("aria-pressed", String(isPinned));
      }
    });

    shapes.forEach((shape) => {
      const slug = shape.dataset.comune;
      shape.classList.toggle("is-pinned", slug === pinned);
      shape.classList.toggle("is-preview", slug === preview && slug !== pinned);
      shape.setAttribute("aria-pressed", String(slug === pinned));
    });

    const second = names.get(highlighted);
    status.textContent = second
      ? `Provincia di ${province}: comuni di ${currentName} e ${second} evidenziati.`
      : `Provincia di ${province}: comune di ${currentName} evidenziato.`;
  };

  const setPreview = (slug) => {
    if (preview === slug) return;
    preview = slug;
    render();
  };

  const pin = (slug) => {
    pinned = slug;
    preview = null;
    render();
  };

  const rowHeight = () => options[0].getBoundingClientRect().height || 58;

  const boxIndex = () =>
    Math.min(options.length - 1, Math.max(0, Math.round(scroll.scrollTop / rowHeight())));

  // Spazio in coda perché anche l'ultimo comune possa salire dentro la casella.
  const syncMetrics = () => {
    if (!wheel.matches) {
      scroll.style.removeProperty("padding-bottom");
      root.style.removeProperty("--territory-row-height");
      return;
    }

    const row = rowHeight();
    root.style.setProperty("--territory-row-height", `${row}px`);
    scroll.style.paddingBottom = `${Math.max(0, scroll.clientHeight - row)}px`;
  };

  const scrollToSlug = (slug) => {
    const index = options.findIndex((option) => option.dataset.comune === slug);
    if (index < 0) return;

    syncing = true;
    scroll.scrollTo({
      top: index * rowHeight(),
      behavior: reducedMotion.matches ? "auto" : "smooth",
    });
    window.setTimeout(() => {
      syncing = false;
    }, 420);
  };

  // Su desktop l'elenco non è la rotella: mostra circa sei voci su trenta e
  // resta fermo. Senza questo, cliccando un comune sulla mappa la voce si
  // accende fuori dall'area visibile e l'utente non vede accadere nulla.
  // Si misura sui rect, così non dipende da quale sia l'offsetParent.
  const centreOnSlug = (slug) => {
    const option = options.find((item) => item.dataset.comune === slug);
    if (!option) return;

    const optionBox = option.getBoundingClientRect();
    const scrollBox = scroll.getBoundingClientRect();
    const delta = optionBox.top - scrollBox.top - (scroll.clientHeight - optionBox.height) / 2;
    const limite = scroll.scrollHeight - scroll.clientHeight;

    scroll.scrollTo({
      // Ai bordi il centro non è raggiungibile: ci si ferma al massimo scroll,
      // senza aggiungere spazio vuoto in testa o in coda.
      top: Math.max(0, Math.min(scroll.scrollTop + delta, limite)),
      behavior: reducedMotion.matches ? "auto" : "smooth",
    });
  };

  const select = (slug) => {
    pin(slug);
    if (wheel.matches) scrollToSlug(slug);
    else centreOnSlug(slug);
  };

  shapes.forEach((shape) => {
    const slug = shape.dataset.comune;

    shape.addEventListener("pointerenter", (event) => {
      if (event.pointerType === "mouse") setPreview(slug);
    });
    shape.addEventListener("pointerleave", (event) => {
      if (event.pointerType === "mouse") setPreview(null);
    });
    shape.addEventListener("focus", () => setPreview(slug));
    shape.addEventListener("blur", () => setPreview(null));
    shape.addEventListener("click", () => select(slug));
    shape.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      select(slug);
    });
  });

  // I nomi in elenco sono solo anteprima: il click resta libero per il
  // futuro collegamento alla pagina del comune.
  options.forEach((option) => {
    const slug = option.dataset.comune;

    option.addEventListener("pointerenter", (event) => {
      if (event.pointerType === "mouse") setPreview(slug);
    });
    option.addEventListener("pointerleave", (event) => {
      if (event.pointerType === "mouse") setPreview(null);
    });
    option.addEventListener("focus", () => setPreview(slug));
    option.addEventListener("blur", () => setPreview(null));
  });

  scroll.addEventListener(
    "scroll",
    () => {
      if (!wheel.matches || syncing) return;

      window.cancelAnimationFrame(scrollFrame);
      scrollFrame = window.requestAnimationFrame(() => {
        const slug = options[boxIndex()].dataset.comune;
        if (slug !== pinned) pin(slug);
      });
    },
    { passive: true }
  );

  const applyMode = () => {
    syncMetrics();

    // Su mobile la casella ha sempre un comune dentro; su desktop si parte
    // dai soli contorni, con il comune della pagina già evidenziato.
    if (wheel.matches) pin(options[boxIndex()].dataset.comune);
    else {
      pinned = null;
      preview = null;
      render();
    }
  };

  wheel.addEventListener("change", applyMode);
  window.addEventListener("resize", syncMetrics);
  applyMode();
})();
(() => {
  const method = document.querySelector("[data-method]");
  if (!method) return;

  const steps = [...method.querySelectorAll("[data-method-step]")];
  const previous = method.querySelector("[data-method-prev]");
  const next = method.querySelector("[data-method-next]");
  const title = method.querySelector("[data-method-title]");
  const copy = method.querySelector("[data-method-copy]");
  const panel = method.querySelector('[role="tabpanel"]');
  if (!steps.length || !previous || !next || !title || !copy || !panel) return;

  let activeIndex = 0;

  const activate = (nextIndex, moveFocus = false) => {
    activeIndex = (nextIndex + steps.length) % steps.length;

    steps.forEach((step, index) => {
      const isActive = index === activeIndex;
      step.classList.toggle("is-active", isActive);
      step.setAttribute("aria-selected", String(isActive));
      step.tabIndex = isActive ? 0 : -1;
    });

    const activeStep = steps[activeIndex];
    title.textContent = activeStep.dataset.title || "";
    copy.textContent = activeStep.dataset.copy || "";
    panel.setAttribute("aria-labelledby", activeStep.id);

    if (moveFocus) activeStep.focus();
  };

  steps.forEach((step, index) => {
    step.addEventListener("click", () => activate(index));
    step.addEventListener("keydown", (event) => {
      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        event.preventDefault();
        activate(index + 1, true);
      } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        event.preventDefault();
        activate(index - 1, true);
      } else if (event.key === "Home") {
        event.preventDefault();
        activate(0, true);
      } else if (event.key === "End") {
        event.preventDefault();
        activate(steps.length - 1, true);
      }
    });
  });

  previous.addEventListener("click", () => activate(activeIndex - 1));
  next.addEventListener("click", () => activate(activeIndex + 1));

  activate(0);
})();
(() => {
  const carousel = document.querySelector("[data-contact-carousel]");
  if (!carousel) return;

  const slides = [...carousel.querySelectorAll("[data-contact-slide]")];
  const photos = window.arbogreenAreaPhotos;
  if (!Array.isArray(photos) || slides.length !== photos.length) return;

  // Foto generiche del territorio: nessun nome di comune, alt identico per tutte.
  slides.forEach((slide, index) => {
    const photo = photos[index];
    const image = document.createElement("img");
    image.src = photo.source;
    image.alt = "Intervento Arbogreen sul territorio";
    image.decoding = "async";
    slide.replaceChildren(image);
  });

  let activeIndex = 0;
  let rotationTimer;

  const activate = (nextIndex) => {
    activeIndex = (nextIndex + slides.length) % slides.length;

    slides.forEach((slide, index) => {
      const isActive = index === activeIndex;
      slide.classList.toggle("is-active", isActive);
      slide.setAttribute("aria-hidden", String(!isActive));
    });

    carousel.dataset.activeIndex = String(activeIndex);
  };

  const startRotation = () => {
    window.clearInterval(rotationTimer);
    rotationTimer = window.setInterval(() => activate(activeIndex + 1), 3000);
  };

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) window.clearInterval(rotationTimer);
    else startRotation();
  });

  activate(0);
  startRotation();
})();
(() => {
  const headline = document.querySelector("[data-contact-headline]");
  if (!headline) return;

  const title = headline.closest(".siena-contact__title");
  const grid = headline.closest(".siena-contact__grid");
  const actions = grid?.querySelector(".siena-contact__actions");
  if (!title || !grid || !actions) return;

  const desktop = window.matchMedia("(min-width: 1101px)");
  const fullText = headline.textContent.trim();
  const accentText = headline.querySelector(".hero__title-accent")?.textContent.trim() || "";
  let frameId;

  const setTextWithAccent = (element, text) => {
    const accentIndex = accentText ? text.lastIndexOf(accentText) : -1;
    if (accentIndex < 0) {
      element.textContent = text;
      return;
    }

    const accent = document.createElement("span");
    accent.className = "hero__title-accent";
    accent.textContent = accentText;
    element.replaceChildren(
      document.createTextNode(text.slice(0, accentIndex)),
      accent,
      document.createTextNode(text.slice(accentIndex + accentText.length))
    );
  };

  const renderHeadline = () => {
    headline.style.removeProperty("--contact-headline-rest-width");
    title.style.removeProperty("min-height");

    if (!desktop.matches) {
      setTextWithAccent(headline, fullText);
      return;
    }

    const columnGap = Number.parseFloat(window.getComputedStyle(grid).columnGap) || 0;
    const firstLineWidth = title.offsetWidth;
    const restWidth = Math.max(0, actions.offsetLeft - title.offsetLeft - columnGap);
    if (!firstLineWidth || !restWidth) return;

    const words = fullText.split(/\s+/);
    const measure = document.createElement("span");
    measure.style.position = "absolute";
    measure.style.visibility = "hidden";
    measure.style.whiteSpace = "nowrap";
    measure.style.pointerEvents = "none";
    headline.replaceChildren(measure);

    let firstLineEnd = 1;
    for (let index = 1; index <= words.length; index += 1) {
      measure.textContent = words.slice(0, index).join(" ");
      if (measure.getBoundingClientRect().width <= firstLineWidth) firstLineEnd = index;
      else break;
    }

    const firstLine = document.createElement("span");
    firstLine.className = "siena-contact__headline-first";
    setTextWithAccent(firstLine, words.slice(0, firstLineEnd).join(" "));

    const remainingText = words.slice(firstLineEnd).join(" ");
    if (!remainingText) {
      headline.replaceChildren(firstLine);
      return;
    }

    const rest = document.createElement("span");
    rest.className = "siena-contact__headline-rest";
    setTextWithAccent(rest, remainingText);
    headline.style.setProperty("--contact-headline-rest-width", `${restWidth}px`);
    headline.replaceChildren(firstLine, rest);

    const reservedTitleHeight = title.getBoundingClientRect().height;
    headline.style.setProperty("--contact-headline-rest-width", `${firstLineWidth}px`);
    title.style.minHeight = `${reservedTitleHeight}px`;
  };

  const scheduleHeadline = () => {
    window.cancelAnimationFrame(frameId);
    frameId = window.requestAnimationFrame(renderHeadline);
  };

  window.addEventListener("resize", scheduleHeadline);
  document.fonts?.ready.then(scheduleHeadline);
  scheduleHeadline();
})();

/* Nastro dei servizi (modello 2, pagine comune).

   Tre cose devono convivere: lo scorrimento automatico continuo, lo
   scorrimento manuale dell'utente e il click sul link della card. Per questo
   il nastro è un contenitore realmente scrollabile e l'automatismo muove
   scrollLeft, invece di essere una animazione CSS di transform: così il
   trascinamento non "strappa" e il browser gestisce da solo l'inerzia al dito.
   Mentre l'utente interagisce l'automatismo va in pausa e riprende poco dopo. */

(() => {
  const ribbon = document.querySelector("[data-service-ribbon]");
  if (!ribbon) return;

  const track = ribbon.querySelector("[data-service-ribbon-track]");
  if (!track) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const SPEED = 0.035;        // px per millisecondo
  const RESUME_DELAY = 250;   // ripresa quasi immediata: si aspetta solo che
                              // l'inerzia del rilascio si assesti

  let paused = false;
  let lastFrame = 0;
  let frame;
  let idleTimer;

  // Il track contiene due copie della stessa sequenza: superata la prima metà
  // si torna indietro di metà larghezza e il salto è invisibile.
  const half = () => track.scrollWidth / 2;

  const wrap = () => {
    const h = half();
    if (h <= 0) return;
    if (ribbon.scrollLeft >= h) ribbon.scrollLeft -= h;
    else if (ribbon.scrollLeft <= 0) ribbon.scrollLeft += h;
  };

  const pause = () => {
    paused = true;
    window.clearTimeout(idleTimer);
  };

  const resumeLater = () => {
    window.clearTimeout(idleTimer);
    idleTimer = window.setTimeout(() => {
      paused = false;
    }, RESUME_DELAY);
  };

  const step = (now) => {
    if (!lastFrame) lastFrame = now;
    const elapsed = now - lastFrame;
    lastFrame = now;

    if (!paused && !document.hidden) {
      ribbon.scrollLeft += SPEED * elapsed;
      wrap();
    }

    frame = window.requestAnimationFrame(step);
  };

  // --- scorrimento manuale col mouse -------------------------------------
  // Su touch lasciamo fare al browser: lo scorrimento nativo ha già inerzia
  // e non va disturbato. Col mouse invece il trascinamento va implementato.
  let pointerId = null;
  let startX = 0;
  let startScroll = 0;
  let travelled = 0;
  let dragging = false;

  // Nessuna pausa qui: a questo punto non si sa ancora se sarà un trascinamento
  // o un semplice tap. La pausa scatta solo al superamento della soglia.
  ribbon.addEventListener("pointerdown", (event) => {
    if (event.pointerType !== "mouse" || event.button !== 0) return;
    pointerId = event.pointerId;
    startX = event.clientX;
    startScroll = ribbon.scrollLeft;
    travelled = 0;
    dragging = false;
  });

  ribbon.addEventListener("pointermove", (event) => {
    if (pointerId !== event.pointerId) return;
    const delta = event.clientX - startX;
    travelled = Math.abs(delta);

    if (!dragging) {
      if (travelled < 6) return;
      dragging = true;
      pause();                     // da qui in poi trascinamento e rotazione si combatterebbero
      ribbon.classList.add("is-dragging");
      // Il puntatore può essere già stato rilasciato: in quel caso la cattura
      // fallisce e senza try il drag si interromperebbe a metà.
      try {
        ribbon.setPointerCapture(pointerId);
      } catch (error) {
        /* si prosegue senza cattura */
      }
    }

    ribbon.scrollLeft = startScroll - delta;
    wrap();
  });

  const endDrag = (event) => {
    if (pointerId !== null && pointerId === event.pointerId) {
      try {
        if (dragging && ribbon.hasPointerCapture(pointerId)) ribbon.releasePointerCapture(pointerId);
      } catch (error) {
        /* la cattura non era attiva */
      }
      ribbon.classList.remove("is-dragging");
      dragging = false;
      pointerId = null;
    }
    resumeLater();
  };

  ribbon.addEventListener("pointerup", endDrag);
  ribbon.addEventListener("pointercancel", endDrag);

  // Dopo un trascinamento il click non deve seguire il link.
  ribbon.addEventListener(
    "click",
    (event) => {
      if (travelled > 6) {
        event.preventDefault();
        event.stopPropagation();
        travelled = 0;
      }
    },
    true
  );

  // --- quando fermarsi ----------------------------------------------------
  // Il nastro ruota sempre. Si ferma solo se l'utente lo sta davvero
  // trascinando in orizzontale: il puntatore fermo sopra non lo ferma, e nemmeno
  // lo scorrimento verticale della pagina, che è il modo normale di arrivare
  // alla sezione.
  ribbon.addEventListener("wheel", (event) => {
    if (Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;   // scroll di pagina
    pause();
    resumeLater();
  }, { passive: true });

  // Sul telefono un tocco non basta: si guarda dove va il dito, e si mette in
  // pausa solo se prevale lo spostamento orizzontale.
  let touchX = 0;
  let touchY = 0;
  let touchDeciso = false;

  ribbon.addEventListener("touchstart", (event) => {
    const t = event.touches[0];
    if (!t) return;
    touchX = t.clientX;
    touchY = t.clientY;
    touchDeciso = false;
  }, { passive: true });

  ribbon.addEventListener("touchmove", (event) => {
    if (touchDeciso) return;
    const t = event.touches[0];
    if (!t) return;
    const dx = Math.abs(t.clientX - touchX);
    const dy = Math.abs(t.clientY - touchY);
    if (dx < 6 && dy < 6) return;      // troppo presto per decidere
    touchDeciso = true;
    if (dx > dy) pause();              // trascinamento orizzontale del nastro
  }, { passive: true });

  ribbon.addEventListener("touchend", () => {
    if (touchDeciso) resumeLater();
    touchDeciso = false;
  }, { passive: true });

  // Il focus da tastiera su una card ferma il nastro, altrimenti la card
  // appena raggiunta scivolerebbe via da sola.
  ribbon.addEventListener("focusin", pause);
  ribbon.addEventListener("focusout", (event) => {
    if (!ribbon.contains(event.relatedTarget)) resumeLater();
  });

  ribbon.addEventListener("scroll", wrap, { passive: true });

  const start = () => {
    window.cancelAnimationFrame(frame);
    lastFrame = 0;
    if (reducedMotion.matches) return;   // solo scorrimento manuale
    frame = window.requestAnimationFrame(step);
  };

  reducedMotion.addEventListener("change", start);
  start();
})();

/* Forma 1d — righe che si aprono: accordion a apertura singola.
   Il titolo della riga resta un <a> al servizio; l'apertura vive solo
   sul bottone chevron (aria-expanded). Da chiusa, la riga è anche
   visibility: hidden via CSS, così i link interni escono dal tab order. */

(() => {
  const rows = document.querySelector("[data-svc-rows]");
  if (!rows) return;

  const items = [...rows.querySelectorAll(".svc-rows__item")];
  if (!items.length) return;

  const setOpen = (item, open) => {
    item.classList.toggle("is-open", open);
    const toggle = item.querySelector(".svc-rows__toggle");
    if (toggle) toggle.setAttribute("aria-expanded", String(open));
  };

  items.forEach((item) => {
    const toggle = item.querySelector(".svc-rows__toggle");
    if (!toggle) return;

    toggle.addEventListener("click", () => {
      const willOpen = !item.classList.contains("is-open");
      items.forEach((other) => setOpen(other, false));
      if (willOpen) setOpen(item, true);
    });
  });
})();

/* Forma 4a — mazzo di schede. La card attiva sta al centro, le precedenti
   spuntano come bordi impilati a sinistra e le successive a destra: il
   mazzo è lineare, non circolare, quindi la sua distribuzione dice a che
   punto della fila si è. Si scorre con le frecce ai lati, con il click su
   un bordo e da tastiera; col dito anche trascinando (il verticale resta al
   browser via touch-action: pan-y). Col mouse il trascinamento non c'è: su
   desktop si scorre con le frecce. Niente rotazione automatica. I sei
   link restano sempre nel DOM: se il focus entra in una card del mazzo,
   quella card viene portata al centro. Non essendoci più un indicatore
   visivo, la posizione viene annunciata in una regione aria-live. */

(() => {
  const fan = document.querySelector("[data-svc-fan]");
  if (!fan) return;

  const viewport = fan.querySelector("[data-fan-viewport]");
  const cards = [...fan.querySelectorAll("[data-fan-card]")];
  const status = fan.querySelector("[data-fan-status]");
  const arrowPrev = fan.querySelector("[data-fan-prev]");
  const arrowNext = fan.querySelector("[data-fan-next]");
  if (!viewport || !cards.length) return;

  const SCALE_STEP = 0.05;   // quanto si rimpicciolisce ogni passo di profondità

  let front = 0;

  // Il passo voluto vive nel CSS perché è una scelta di disegno; qui si limita
  // allo spazio che c'è davvero. La card davanti è centrata, quindi il lato
  // più profondo del mazzo arriva a cinque passi più mezza card dal centro:
  // oltre quel punto le card uscirebbero dalla finestra.
  const stepPx = () => {
    const voluto = Number.parseFloat(getComputedStyle(fan).getPropertyValue("--fan-step"));
    const width = cards[0].offsetWidth || 340;
    // Senza @property il valore torna come stringa clamp(): si ripiega su una
    // quota della card, che è già responsive di suo.
    const scelto = Number.isFinite(voluto) ? voluto : width * 0.21;
    const massimo = (viewport.clientWidth - width - 12) / (2 * (cards.length - 1));
    return Math.max(0, Math.min(scelto, massimo));
  };

  const layout = (drag = 0) => {
    const step = stepPx();
    const width = cards[0].offsetWidth || 0;

    cards.forEach((card, index) => {
      const depth = index - front;
      const distance = Math.abs(depth);
      const scale = Math.max(0.5, 1 - SCALE_STEP * distance);
      // Con la scala la card si stringe verso il proprio centro: senza questa
      // compensazione il bordo che spunta sarebbe più stretto del passo.
      const shrink = (width * (1 - scale)) / 2;

      card.style.setProperty("--fan-x", `${depth * step + Math.sign(depth) * shrink + drag}px`);
      card.style.setProperty("--fan-scale", String(scale));
      card.style.setProperty("--fan-z", String(cards.length - distance));
      card.classList.toggle("is-front", depth === 0);
    });
  };

  const announce = () => {
    if (!status) return;
    const name = cards[front].querySelector(".svc-fan__label strong")?.textContent.trim() || "";
    status.textContent = `Servizio ${front + 1} di ${cards.length}: ${name}`;
  };

  const activate = (index, moveFocus = false) => {
    front = (index + cards.length) % cards.length;
    layout();
    announce();
    // Il focus su un elemento fuori scena fa scorrere la finestra anche con
    // overflow: hidden: si riporta sempre a zero.
    viewport.scrollLeft = 0;
    if (moveFocus) cards[front].querySelector(".svc-fan__cta")?.focus();
  };

  cards.forEach((card, index) => {
    // Il bordo di una card nel mazzo è un bersaglio di navigazione, non il
    // link del servizio: il click la porta al centro senza seguire l'ancora.
    card.addEventListener("click", (event) => {
      if (index === front) return;
      event.preventDefault();
      activate(index);
    });

    card.addEventListener("focusin", () => {
      if (index !== front) activate(index);
      else viewport.scrollLeft = 0;
    });
  });

  if (arrowPrev) arrowPrev.addEventListener("click", () => activate(front - 1));
  if (arrowNext) arrowNext.addEventListener("click", () => activate(front + 1));

  // La tastiera sta sul componente, non su un singolo controllo: funziona con
  // il focus sulle frecce come dentro una card. Con il focus dentro una card
  // lo si porta dietro alla nuova, altrimenti resterebbe su una card finita
  // nel mazzo; sulle frecce invece il focus non si sposta.
  fan.addEventListener("keydown", (event) => {
    const step = { ArrowRight: 1, ArrowLeft: -1, Home: "first", End: "last" }[event.key];
    if (step === undefined) return;

    event.preventDefault();
    const insideCard = cards.some((card) => card.contains(event.target));
    if (step === "first") activate(0, insideCard);
    else if (step === "last") activate(cards.length - 1, insideCard);
    else activate(front + step, insideCard);
  });

  // --- trascinamento, stessa impostazione del nastro ----------------------
  let pointerId = null;
  let startX = 0;
  let delta = 0;
  let travelled = 0;
  let dragging = false;

  viewport.addEventListener("pointerdown", (event) => {
    // Su desktop si scorre con le frecce: il mouse non trascina il mazzo.
    if (event.pointerType === "mouse") return;
    pointerId = event.pointerId;
    startX = event.clientX;
    delta = 0;
    travelled = 0;
    dragging = false;
  });

  viewport.addEventListener("pointermove", (event) => {
    if (pointerId !== event.pointerId) return;
    delta = event.clientX - startX;
    travelled = Math.max(travelled, Math.abs(delta));

    if (!dragging) {
      if (Math.abs(delta) < 6) return;
      dragging = true;
      viewport.classList.add("is-dragging");
      // Il puntatore può essere già stato rilasciato: senza try il drag si
      // interromperebbe a metà.
      try {
        viewport.setPointerCapture(pointerId);
      } catch (error) {
        /* si prosegue senza cattura */
      }
    }

    layout(delta);
  });

  const endDrag = (event) => {
    if (pointerId === null || event.pointerId !== pointerId) return;
    try {
      if (dragging && viewport.hasPointerCapture(pointerId)) viewport.releasePointerCapture(pointerId);
    } catch (error) {
      /* la cattura non era attiva */
    }
    pointerId = null;
    if (!dragging) return;

    dragging = false;
    viewport.classList.remove("is-dragging");

    // Oltre la soglia si cambia card nel verso del gesto, altrimenti si torna.
    const soglia = Math.min(90, (cards[0].offsetWidth || 1) * 0.25);
    if (delta <= -soglia) activate(front + 1);
    else if (delta >= soglia) activate(front - 1);
    else activate(front);
    delta = 0;
  };

  viewport.addEventListener("pointerup", endDrag);
  viewport.addEventListener("pointercancel", endDrag);

  // Dopo un trascinamento il click non deve seguire il link della card.
  viewport.addEventListener(
    "click",
    (event) => {
      if (travelled > 6) {
        event.preventDefault();
        event.stopPropagation();
        travelled = 0;
      }
    },
    true
  );

  // La compensazione della scala si misura sulla card: a ogni cambio di
  // larghezza il mazzo va ricalcolato.
  window.addEventListener("resize", () => layout());

  activate(0);
})();

/* Forma 4g — soffietto orizzontale: il passaggio del mouse o il focus
   spostano la colonna aperta. Le larghezze le fa il CSS (flex-grow su
   .is-open): qui si muove solo la classe, così lo stato resta uno solo
   e prefers-reduced-motion viene rispettato dalla transizione CSS. */

(() => {
  const bellows = document.querySelector("[data-svc-bellows]");
  if (!bellows) return;

  const cols = [...bellows.querySelectorAll(".svc-bellows__col")];
  if (!cols.length) return;

  const open = (target) => {
    cols.forEach((col) => col.classList.toggle("is-open", col === target));
  };

  cols.forEach((col) => {
    col.addEventListener("pointerenter", (event) => {
      if (event.pointerType === "mouse") open(col);
    });
    col.addEventListener("focusin", () => open(col));
  });
})();

/* FAQ 5c — tre linguette e un riquadro: pattern tab scritto a mano.
   role="tablist"/"tab"/"tabpanel" stanno nel markup; qui si gestiscono
   aria-selected, tabindex, frecce e l'attributo hidden dei pannelli.
   Le tre risposte restano tutte nel DOM. */

(() => {
  const tabsRoot = document.querySelector("[data-faq-tabs]");
  if (!tabsRoot) return;

  const tabs = [...tabsRoot.querySelectorAll('[role="tab"]')];
  const panels = tabs.map((tab) => document.getElementById(tab.getAttribute("aria-controls")));
  if (!tabs.length || panels.some((panel) => !panel)) return;

  const activate = (index, moveFocus = false) => {
    const active = (index + tabs.length) % tabs.length;

    tabs.forEach((tab, i) => {
      const isActive = i === active;
      tab.classList.toggle("is-active", isActive);
      tab.setAttribute("aria-selected", String(isActive));
      tab.tabIndex = isActive ? 0 : -1;
      panels[i].hidden = !isActive;
    });

    if (moveFocus) tabs[active].focus();
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => activate(index));
    tab.addEventListener("keydown", (event) => {
      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        event.preventDefault();
        activate(index + 1, true);
      } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        event.preventDefault();
        activate(index - 1, true);
      } else if (event.key === "Home") {
        event.preventDefault();
        activate(0, true);
      } else if (event.key === "End") {
        event.preventDefault();
        activate(tabs.length - 1, true);
      }
    });
  });

  activate(0);
})();
