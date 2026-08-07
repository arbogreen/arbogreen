(() => {
  const territory = document.querySelector("[data-territory-selector]");
  if (!territory) return;

  const choices = [...territory.querySelectorAll("[data-territory-choice]")];
  const image = territory.querySelector("[data-territory-image]");
  const previewImage = territory.querySelector("[data-territory-preview]");
  const map = territory.querySelector("[data-territory-map]");
  const status = territory.querySelector("[data-territory-status]");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (!choices.length || !image || !previewImage || !map || !status) return;

  let selectedSwapTimer;
  let previewSwapTimer;
  let selectedIndex = 0;

  const hideLayer = (layer, timer) => {
    window.clearTimeout(timer);
    layer.classList.remove("is-switching");
    layer.hidden = true;
    layer.removeAttribute("src");
  };

  const showLayer = (layer, nextSource, timer, setTimer) => {
    window.clearTimeout(timer);

    const swap = () => {
      layer.src = nextSource;
      layer.hidden = false;
      layer.classList.remove("is-switching");
    };

    if (!layer.hidden && layer.getAttribute("src") === nextSource) {
      layer.classList.remove("is-switching");
      return;
    }

    if (reducedMotion.matches) swap();
    else {
      layer.classList.add("is-switching");
      setTimer(window.setTimeout(swap, 150));
    }
  };

  const showProvince = () => {
    hideLayer(image, selectedSwapTimer);
    hideLayer(previewImage, previewSwapTimer);
    map.setAttribute("aria-label", "Provincia di Perugia, nessun comune selezionato");
    status.textContent = "Provincia di Perugia, nessun comune selezionato.";
  };

  const showSelectedMunicipality = () => {
    const choice = choices[selectedIndex];
    if (!choice?.dataset.image) return;

    showLayer(image, choice.dataset.image, selectedSwapTimer, (timer) => {
      selectedSwapTimer = timer;
    });
    map.setAttribute("aria-label", `Provincia di Perugia con il comune di ${choice.textContent.trim()} evidenziato`);
    status.textContent = `${choice.dataset.alt || ""}.`;
  };

  const previewMunicipality = (nextIndex) => {
    const choice = choices[nextIndex];
    if (!choice?.dataset.image) return;

    if (nextIndex === selectedIndex) {
      hideLayer(previewImage, previewSwapTimer);
      showSelectedMunicipality();
      return;
    }

    showLayer(previewImage, choice.dataset.image, previewSwapTimer, (timer) => {
      previewSwapTimer = timer;
    });

    if (selectedIndex >= 0) {
      const selectedChoice = choices[selectedIndex];
      map.setAttribute("aria-label", `Provincia di Perugia con i comuni di ${selectedChoice.textContent.trim()} e ${choice.textContent.trim()} evidenziati`);
      status.textContent = `${selectedChoice.dataset.alt || ""}. ${choice.dataset.alt || ""}.`;
    } else {
      map.setAttribute("aria-label", `Provincia di Perugia con il comune di ${choice.textContent.trim()} evidenziato`);
      status.textContent = `${choice.dataset.alt || ""}.`;
    }
  };

  const selectMunicipality = (nextIndex) => {
    selectedIndex = nextIndex;
    hideLayer(previewImage, previewSwapTimer);

    choices.forEach((item, index) => {
      const isActive = index === selectedIndex;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });

    showSelectedMunicipality();
  };

  const restoreSelection = () => {
    hideLayer(previewImage, previewSwapTimer);
    if (selectedIndex >= 0) showSelectedMunicipality();
    else showProvince();
  };

  choices.forEach((choice, index) => {
    choice.addEventListener("pointerenter", () => previewMunicipality(index));
    choice.addEventListener("pointerleave", restoreSelection);
    choice.addEventListener("focus", () => previewMunicipality(index));
    choice.addEventListener("blur", restoreSelection);
    choice.addEventListener("click", () => selectMunicipality(index));
  });
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
  const location = carousel.querySelector("[data-contact-location]");
  if (slides.length !== 6) return;

  const photos = [
    { source: "../assets/provincia-perugia/contatti-perugia-01.jpeg", location: "Perugia" },
    { source: "../assets/provincia-perugia/contatti-perugia-02.jpeg", location: "Assisi" },
    { source: "../assets/provincia-perugia/contatti-perugia-03.jpeg", location: "Bastia Umbra" },
    { source: "../assets/provincia-perugia/contatti-perugia-04.jpeg", location: "Bettona" },
    { source: "../assets/provincia-perugia/contatti-perugia-05.jpeg", location: "Cannara" },
    { source: "../assets/provincia-perugia/contatti-perugia-06.jpeg", location: "Collazzone" },
  ];

  slides.forEach((slide, index) => {
    const photo = photos[index];
    const image = document.createElement("img");
    image.src = photo.source;
    image.alt = `Intervento Arbogreen a ${photo.location}`;
    image.decoding = "async";
    slide.dataset.location = photo.location;
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

    if (location) location.textContent = slides[activeIndex].dataset.location || "";
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
