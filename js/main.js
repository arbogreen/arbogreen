(() => {
  const reviews = [
    {
      author: "Nicolas F. Riveros",
      initials: "NR",
      rating: 5,
      date: "6 giorni fa",
      text: "Impeccabile taglio dell’erba, lavoro preciso, meraviglioso! Siamo estremamente soddisfatti del servizio! Saverio è una persona seria, puntuale, molto in gamba! Chiederemo di nuovo i suoi servizi per mantenere bene e in ordine il giardino."
    },
    {
      author: "Carlotta Piandoro",
      initials: "CP",
      rating: 5,
      date: "2 settimane fa",
      text: "Cercando online un giardiniere ho trovato casualmente la ditta di Saverio e sono rimasto davvero soddisfatto della scelta. Si è dimostrato estremamente professionale, sempre puntuale nei riscontri e molto preciso nella condivisione delle informazioni e delle tempistiche.\n\nUna persona affidabile, competente e attento ai bisogni del cliente. Consigliatissimo!"
    },
    {
      author: "Michele Marchetti",
      initials: "MM",
      rating: 5,
      date: "3 settimane fa",
      text: "Ottimo professionista, consigliato per i lavori di potatura e taglio piante."
    },
    {
      author: "Sophie Davies",
      initials: "SD",
      rating: 5,
      date: "1 mese fa",
      text: "Un servizio dedicato e davvero professionale. Saverio è un esperto competente nel suo campo e mi sento completamente tranquillo nell'affidargli la cura del nostro giardino mentre siamo all'estero. Consigliatissimo!"
    },
    {
      author: "Mario Specchia",
      initials: "MS",
      rating: 5,
      date: "1 mese fa",
      text: "Consiglio vivamente Arbogreen Service di Saverio. Un’azienda seria, affidabile e altamente professionale, sempre attenta ai dettagli e alla qualità del lavoro svolto.\n\nSaverio è una persona competente, disponibile e molto appassionata del proprio lavoro. Il giardino viene sempre curato con grande attenzione, precisione e puntualità, con risultati davvero eccellenti.\n\nOggi è difficile trovare persone così affidabili e professionali. Un servizio impeccabile sotto ogni aspetto. Assolutamente consigliato!"
    },
    {
      author: "Marco Bernoni",
      initials: "MB",
      rating: 5,
      date: "1 mese fa",
      text: "Azienda seria, professionale e molto competente. Hanno svolto con grande cura e precisione il loro lavoro. Il personale è puntuale disponibile e attento ad ogni dettaglio. Consiglio vivamente questa Azienda."
    },
    {
      author: "Manuela",
      initials: "M",
      rating: 5,
      date: "2 mesi fa",
      text: "Ho contattato Saverio per farmi fare un preventivo. Si è da subito dimostrato disponibile e molto preparato dimostrando una grande esperienza. Ha capito nell'immediato le mie esigenze, e mi ha consigliato diverse opzioni possibili, lasciando a me la scelta. Ho trovato una persona molto affidabile e soprattutto onesta. Si percepisce da subito l'amore che ha per il suo lavoro. Lo consiglio vivamente! Voto 10 +"
    },
    {
      author: "jf studio",
      initials: "JF",
      rating: 5,
      date: "2 mesi fa",
      text: "Mi sono rivolta ad Arbogreen per sistemare il giardino. Saverio il titolare, si è dimostrato competente, serio e preciso. Lo consiglio vivamente. Francesca"
    },
    {
      author: "Luana Centini",
      initials: "LC",
      rating: 5,
      date: "2 mesi fa",
      text: "Grande professionista Saverio conosciuto presso la mia proprietà sito in Marina di Grosseto! Persona altamente qualificata! Grazie per il lavoro svolto"
    },
    {
      author: "Maria Cristiana",
      initials: "MC",
      rating: 5,
      date: "2 mesi fa",
      text: "Sono tre anni che questa ditta si occupa del mio giardino. Sempre disponibile e tutto molto curato."
    },
    {
      author: "carolina bifolchi",
      initials: "CB",
      rating: 5,
      date: "2 mesi fa",
      text: "Saverio e il suo team di Arbogreen rappresentano una straordinaria combinazione di professionalità, gentilezza e puntualità. Dal primo contatto fino al completamento del lavoro, la loro attenzione ai dettagli è stata impeccabile.\n\nIl team ha eseguito con grande competenza potature precise, rimozione delle processionarie dalle piante e abbattimento di alberi pericolosi, operando sempre nel pieno rispetto delle norme di sicurezza. Ogni intervento è stato svolto con cura, precisione e pulizia, lasciando l’area ordinata e perfettamente gestita.\n\nIl sopralluogo iniziale ha permesso di valutare correttamente i lavori da eseguire, e il preventivo concordato è stato rispettato senza sorprese. La comunicazione è stata eccellente: ogni fase dell’intervento è stata confermata e programmata tenendo conto delle condizioni meteo e delle nostre esigenze.\n\nIn sintesi, un servizio completo, affidabile e altamente professionale. Saverio e il suo team sono cortesi, disponibili e preparati, e li consigliamo senza riserve a chiunque abbia bisogno di lavori di arboricoltura e manutenzione del verde.\n\nSuper consigliati!"
    },
    {
      author: "Tommaso Santoro",
      initials: "TS",
      rating: 5,
      date: "11 mesi fa",
      text: "Ditta seria, che lavora molto bene e con passione. Saverio si è dimostrato competente e affidabile fin dal nostro primo incontro, mostrandosi disponibile ad intervenire sia per prendersi cura e \"sanare\" un giardino non progettato né eseguito da lui, sia per effettuare interventi di sana pianta. Il risultato è stato ottimo, sia per la scelta delle piante che per la qualità dell'intervento e i suoi consigli sono stati preziosi anche per contenere la spesa, dimostrandosi serio e onesto. Consigliatissimo."
    },
    {
      author: "Ivano Mariotti",
      initials: "IM",
      rating: 5,
      date: "un anno fa",
      text: "Prima volta che avevo a che fare con questa Ditta. Sono rimasto veramente soddisfatto. Serietà, precisione, disponibilità. Ottimo rapporto qualità/prezzo. Ottimo."
    },
    {
      author: "giovanni di betto",
      initials: "GB",
      rating: 5,
      date: "un anno fa",
      text: "Saverio si è dimostrato persona competente, ben organizzato da tutti i punti di vista, ha provveduto alla parte burocratica, il lavoro è stato svolto con puntualità competenza e precisione, consiglio senz'altro di contattarlo al bisogno...."
    },
    {
      author: "Jadwiga Jasińska-Ścisłowska",
      initials: "JS",
      rating: 5,
      date: "un anno fa",
      text: "Saverio e il suo team si prendono cura del mio piccolo giardino da aprile 2024, ma i risultati del loro ottimo lavoro sono già visibili. Tutti sono professionisti con esperienza profonda, sanno cosa fare e offrono soluzioni e le piante che cresceranno bene in condizioni difficili. Saverio ha le mani d’oro, sa riparare vari impianti nel giardino e si vede che gli piace lavorare con le piante. Grazie mille Saverio!"
    }
  ];

  const avatarColors = ["#1769aa", "#8e3b46", "#406d47", "#815b4b", "#315d73", "#147e72"];
  const slides = [...document.querySelectorAll(".hero__slide")];
  const selectors = [...document.querySelectorAll(".hero__selector")];
  const heroCopy = document.querySelector(".hero__copy");
  const navToggle = document.querySelector(".nav-toggle");
  const siteNav = document.querySelector(".site-nav");
  const dropdownToggles = [...document.querySelectorAll(".dropdown-toggle")];
  const reviewSlider = document.querySelector(".reviews-slider");
  const reviewTrack = document.querySelector(".reviews-slider__track");
  const serviceTabs = [...document.querySelectorAll(".service-tab")];
  const servicePanels = [...document.querySelectorAll(".service-panel")];
  const peopleCopyBlocks = [...document.querySelectorAll(".people-copy")];
  const peopleMediaBlocks = [...document.querySelectorAll(".about__gallery > *")];
  const areasSection = document.querySelector(".areas");
  const areaOptions = [...document.querySelectorAll("[data-area-option]")];
  const areaMapRegions = [...document.querySelectorAll("[data-area-map]")];
  const areaCityMarkers = [...document.querySelectorAll("[data-area-city]")];
  const statNumbers = [...document.querySelectorAll(".hero-stats strong[data-target]")];
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const serviceCtaBanner = document.querySelector(".service-cta-banner");
  const serviceFieldSection = document.querySelector(".service-main > .service-visual");

  if (serviceCtaBanner) {
    if (serviceFieldSection) {
      serviceFieldSection.insertAdjacentElement("afterend", serviceCtaBanner);
    } else {
      serviceCtaBanner.remove();
    }
  }

  const serviceRevealBlocks = [...document.querySelectorAll(".service-reveal")];

  if (reviewTrack) {
    reviewTrack.style.animationPlayState = "paused";
  }

  if (serviceRevealBlocks.length) {
    document.documentElement.classList.add("service-js");
  }

  let activeSlide = 0;
  let slideTimer;
  let serviceSlideTimer;
  let transitionTimer;
  let entryTimer;
  let statsAnimationFrame;

  const closeDropdowns = (exception) => {
    dropdownToggles.forEach((toggle) => {
      if (toggle === exception) return;

      toggle.setAttribute("aria-expanded", "false");
      toggle.nextElementSibling?.classList.remove("is-open");
    });
  };

  const closeNavigation = () => {
    navToggle?.setAttribute("aria-expanded", "false");
    siteNav?.classList.remove("is-open");
    closeDropdowns();
  };

  dropdownToggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const willOpen = toggle.getAttribute("aria-expanded") !== "true";
      closeDropdowns(toggle);
      toggle.setAttribute("aria-expanded", String(willOpen));
      toggle.nextElementSibling?.classList.toggle("is-open", willOpen);
    });
  });

  navToggle?.addEventListener("click", () => {
    const willOpen = navToggle.getAttribute("aria-expanded") !== "true";
    navToggle.setAttribute("aria-expanded", String(willOpen));
    siteNav?.classList.toggle("is-open", willOpen);
  });

  document.addEventListener("click", (event) => {
    if (!event.target.closest(".site-header")) closeNavigation();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeNavigation();
  });

  document.querySelectorAll(".site-nav a").forEach((link) => {
    link.addEventListener("click", closeNavigation);
  });

  document.querySelectorAll('.service-panel__link[href=""]').forEach((link) => {
    link.addEventListener("click", (event) => event.preventDefault());
  });

  if ("IntersectionObserver" in window && !reducedMotion.matches) {
    const peopleCopyObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("is-entering", entry.isIntersecting);
      });
    }, {
      threshold: 0.3
    });

    peopleCopyBlocks.forEach((copyBlock) => peopleCopyObserver.observe(copyBlock));
    peopleMediaBlocks.forEach((mediaBlock) => peopleCopyObserver.observe(mediaBlock));
  }

  if (serviceRevealBlocks.length) {
    if ("IntersectionObserver" in window && !reducedMotion.matches) {
      const serviceRevealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("is-entering", entry.isIntersecting);
        });
      }, {
        threshold: 0.14,
        rootMargin: "0px 0px -8%"
      });

      serviceRevealBlocks.forEach((block) => serviceRevealObserver.observe(block));
    } else {
      serviceRevealBlocks.forEach((block) => block.classList.add("is-entering"));
    }
  }

  if (areasSection) {
    if ("IntersectionObserver" in window && !reducedMotion.matches) {
      const areasObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("is-visible", entry.isIntersecting);
        });
      }, {
        threshold: 0.18
      });

      areasObserver.observe(areasSection);
    } else {
      areasSection.classList.add("is-visible");
    }
  }

  const activateArea = (areaId, moveFocus = false) => {
    areaOptions.forEach((option) => {
      const isActive = option.dataset.areaOption === areaId;
      option.classList.toggle("is-active", isActive);
      option.setAttribute("aria-pressed", String(isActive));
      if (isActive && moveFocus) option.focus();
    });

    areaMapRegions.forEach((region) => {
      const isActive = region.dataset.areaMap === areaId;
      region.classList.toggle("is-active", isActive);
      region.setAttribute("aria-pressed", String(isActive));
    });

    areaCityMarkers.forEach((marker) => {
      marker.classList.toggle("is-active", marker.dataset.areaCity === areaId);
    });
  };

  areaOptions.forEach((option) => {
    option.addEventListener("click", () => {
      activateArea(option.dataset.areaOption);

      const pageUrl = option.dataset.pageUrl?.trim();
      if (pageUrl) window.location.assign(pageUrl);
    });
    option.addEventListener("pointerenter", () => activateArea(option.dataset.areaOption));
  });

  areaMapRegions.forEach((region) => {
    region.addEventListener("click", () => activateArea(region.dataset.areaMap, true));
    region.addEventListener("focus", () => activateArea(region.dataset.areaMap));
    region.addEventListener("keydown", (event) => {
      if (!['Enter', ' '].includes(event.key)) return;
      event.preventDefault();
      activateArea(region.dataset.areaMap, true);
    });
  });

  const updateSlide = (nextIndex) => {
    slides.forEach((slide, index) => {
      slide.classList.toggle("is-active", index === nextIndex);
    });

    selectors.forEach((selector, index) => {
      const isActive = index === nextIndex;
      selector.classList.toggle("is-active", isActive);
      selector.setAttribute("aria-selected", String(isActive));
      selector.tabIndex = isActive ? 0 : -1;
    });

    activeSlide = nextIndex;
  };

  const animateStats = () => {
    window.cancelAnimationFrame(statsAnimationFrame);

    const setFinalValues = () => {
      statNumbers.forEach((number) => {
        number.textContent = `${number.dataset.target}${number.dataset.suffix || ""}`;
      });
    };

    if (!statNumbers.length || reducedMotion.matches) {
      setFinalValues();
      return;
    }

    statNumbers.forEach((number) => {
      number.textContent = "0";
      number.classList.remove("is-counting");
    });

    void statNumbers[0].offsetWidth;
    statNumbers.forEach((number) => number.classList.add("is-counting"));

    const duration = 2400;
    const startTime = performance.now();

    const updateNumbers = (currentTime) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      statNumbers.forEach((number) => {
        const target = Number(number.dataset.target);
        const suffix = number.dataset.suffix || "";
        const currentValue = Math.round(target * easedProgress);
        number.textContent = `${currentValue}${currentValue > 0 ? suffix : ""}`;
      });

      if (progress < 1) {
        statsAnimationFrame = window.requestAnimationFrame(updateNumbers);
      } else {
        setFinalValues();
      }
    };

    statsAnimationFrame = window.requestAnimationFrame(updateNumbers);
  };

  const changeSlide = (nextIndex) => {
    if (!slides.length || nextIndex === activeSlide) return;

    window.clearTimeout(transitionTimer);
    window.clearTimeout(entryTimer);
    animateStats();

    if (reducedMotion.matches) {
      updateSlide(nextIndex);
      return;
    }

    heroCopy?.classList.add("is-leaving");

    transitionTimer = window.setTimeout(() => {
      updateSlide(nextIndex);
      heroCopy?.classList.remove("is-leaving");
      heroCopy?.classList.add("is-entering");

      entryTimer = window.setTimeout(() => {
        heroCopy?.classList.remove("is-entering");
      }, 980);
    }, 380);
  };

  const startAutoplay = () => {
    window.clearInterval(slideTimer);
    slideTimer = window.setInterval(() => {
      changeSlide((activeSlide + 1) % slides.length);
    }, 10000);
  };

  selectors.forEach((selector) => {
    selector.addEventListener("click", () => {
      changeSlide(Number(selector.dataset.slide));
      startAutoplay();
    });

    selector.addEventListener("keydown", (event) => {
      if (!['ArrowUp', 'ArrowDown'].includes(event.key)) return;

      event.preventDefault();
      const direction = event.key === "ArrowDown" ? 1 : -1;
      const nextIndex = (activeSlide + direction + selectors.length) % selectors.length;
      selectors[nextIndex].focus();
      changeSlide(nextIndex);
      startAutoplay();
    });
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      window.clearInterval(slideTimer);
      window.clearInterval(serviceSlideTimer);
    } else {
      startAutoplay();
      startServiceAutoplay();
    }
  });

  let reviewsInitialized = false;

  const initializeReviews = () => {
    if (!reviewTrack || reviewsInitialized) return;

    reviewsInitialized = true;
    const googleReviewsUrl = document.querySelector(".reviews__google-link")?.href || "#";

    const reviewCards = reviews.map((review, index) => {
      const card = document.createElement("a");
      card.className = "review-card";
      card.href = googleReviewsUrl;
      card.target = "_blank";
      card.rel = "noopener noreferrer";
      card.setAttribute("aria-label", `Recensione Google di ${review.author}, ${review.rating} stelle su 5`);

      const avatar = document.createElement("span");
      avatar.className = "review-card__avatar";
      avatar.style.setProperty("--avatar-color", avatarColors[index % avatarColors.length]);
      avatar.textContent = review.initials;

      const googleBadge = document.createElement("span");
      googleBadge.className = "review-card__google-badge";
      googleBadge.setAttribute("aria-hidden", "true");
      googleBadge.textContent = "G";
      avatar.appendChild(googleBadge);

      const author = document.createElement("strong");
      author.className = "review-card__author";
      author.textContent = review.author;

      const meta = document.createElement("span");
      meta.className = "review-card__meta";

      const stars = document.createElement("span");
      stars.className = "review-card__stars";
      stars.setAttribute("aria-hidden", "true");
      stars.textContent = "★".repeat(review.rating);

      const date = document.createElement("span");
      date.textContent = review.date;
      meta.append(stars, date);

      const text = document.createElement("p");
      text.className = "review-card__text";
      text.textContent = review.text;

      const action = document.createElement("span");
      action.className = "review-card__action";
      action.textContent = "Leggi su Google →";

      card.append(avatar, author, meta, text, action);
      return card;
    });

    reviewTrack.replaceChildren(...reviewCards);
    reviewTrack.style.setProperty("--review-duration", `${reviews.length * 7}s`);

    [...reviewTrack.children].forEach((card) => {
      const clone = card.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      clone.tabIndex = -1;
      reviewTrack.appendChild(clone);
    });

    reviewTrack.style.removeProperty("animation-play-state");

    if (reviewSlider) {
      let reviewResumeTimer;
      let reviewHoldTimer;
      let reviewClickSuppressionTimer;
      let reviewTouchOrigin;
      let reviewLongPressActive = false;
      let suppressNextReviewClick = false;
      const reviewHoldDelay = 320;
      const reviewMoveThreshold = 10;

      const pauseReviewScroll = () => {
        window.clearTimeout(reviewResumeTimer);
        reviewSlider.classList.add("is-paused");
      };

      const resumeReviewScroll = (delay = 1800) => {
        window.clearTimeout(reviewResumeTimer);

        if (delay === 0) {
          reviewSlider.classList.remove("is-paused");
          return;
        }

        reviewResumeTimer = window.setTimeout(() => {
          reviewSlider.classList.remove("is-paused");
        }, delay);
      };

      const clearReviewHold = () => {
        window.clearTimeout(reviewHoldTimer);
        reviewHoldTimer = undefined;
      };

      const endReviewTouch = () => {
        clearReviewHold();
        reviewTouchOrigin = undefined;

        if (reviewLongPressActive) {
          suppressNextReviewClick = true;
          window.clearTimeout(reviewClickSuppressionTimer);
          reviewClickSuppressionTimer = window.setTimeout(() => {
            suppressNextReviewClick = false;
          }, 500);
        }

        reviewLongPressActive = false;
        resumeReviewScroll(0);
      };

      reviewSlider.addEventListener("touchstart", (event) => {
        if (event.touches.length !== 1) return;

        const touch = event.touches[0];
        reviewTouchOrigin = { x: touch.clientX, y: touch.clientY };
        reviewLongPressActive = false;
        suppressNextReviewClick = false;
        window.clearTimeout(reviewClickSuppressionTimer);
        clearReviewHold();
        reviewHoldTimer = window.setTimeout(() => {
          reviewLongPressActive = true;
          pauseReviewScroll();
        }, reviewHoldDelay);
      }, { passive: true });

      reviewSlider.addEventListener("touchmove", (event) => {
        if (!reviewTouchOrigin || event.touches.length !== 1) return;

        const touch = event.touches[0];
        const moved = Math.hypot(
          touch.clientX - reviewTouchOrigin.x,
          touch.clientY - reviewTouchOrigin.y
        );

        if (moved <= reviewMoveThreshold) return;

        clearReviewHold();
        reviewTouchOrigin = undefined;
        reviewLongPressActive = false;
        resumeReviewScroll(0);
      }, { passive: true });

      reviewSlider.addEventListener("touchend", endReviewTouch, { passive: true });
      reviewSlider.addEventListener("touchcancel", endReviewTouch, { passive: true });
      reviewSlider.addEventListener("pointerenter", (event) => {
        if (event.pointerType === "mouse") pauseReviewScroll();
      });
      reviewSlider.addEventListener("pointerleave", (event) => {
        if (event.pointerType === "mouse") resumeReviewScroll();
      });
      reviewSlider.addEventListener("focusin", (event) => {
        if (event.target.matches(":focus-visible")) pauseReviewScroll();
      });
      reviewSlider.addEventListener("focusout", () => resumeReviewScroll());
      reviewSlider.addEventListener("contextmenu", (event) => {
        if (reviewLongPressActive || suppressNextReviewClick) event.preventDefault();
      });
      reviewSlider.addEventListener("click", (event) => {
        if (!suppressNextReviewClick) return;

        event.preventDefault();
        suppressNextReviewClick = false;
      });
    }
  };

  if (reviewTrack) {
    const reviewsSection = reviewSlider?.closest(".reviews") || reviewTrack;

    if ("IntersectionObserver" in window) {
      const reviewsObserver = new IntersectionObserver((entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;

        initializeReviews();
        reviewsObserver.disconnect();
      }, {
        threshold: 0.1
      });

      reviewsObserver.observe(reviewsSection);
    } else {
      initializeReviews();
    }
  }

  const serviceCarousels = servicePanels.map((panel) => ({
    panel,
    slides: [...panel.querySelectorAll(".service-panel__slide")],
    activeIndex: 0
  }));

  const changeServiceSlide = (carousel, nextIndex) => {
    if (!carousel?.slides.length) return;

    const normalizedIndex = (nextIndex + carousel.slides.length) % carousel.slides.length;
    carousel.slides.forEach((slide, index) => {
      slide.classList.toggle("is-active", index === normalizedIndex);
    });
    carousel.activeIndex = normalizedIndex;
  };

  const startServiceAutoplay = () => {
    window.clearInterval(serviceSlideTimer);
    serviceSlideTimer = window.setInterval(() => {
      const activeServiceIndex = servicePanels.findIndex((panel) => panel.classList.contains("is-active"));
      const carousel = serviceCarousels[activeServiceIndex];
      if (!carousel || carousel.slides.length < 2) return;

      changeServiceSlide(carousel, carousel.activeIndex + 1);
    }, 4000);
  };

  const activateService = (nextIndex, moveFocus = false) => {
    serviceTabs.forEach((tab, index) => {
      const isActive = index === nextIndex;
      tab.classList.toggle("is-active", isActive);
      tab.setAttribute("aria-selected", String(isActive));
      tab.tabIndex = isActive ? 0 : -1;
    });

    servicePanels.forEach((panel, index) => {
      const isActive = index === nextIndex;
      panel.classList.toggle("is-active", isActive);
      panel.setAttribute("aria-hidden", String(!isActive));
    });

    if (moveFocus) serviceTabs[nextIndex]?.focus();
    startServiceAutoplay();
  };

  serviceCarousels.forEach((carousel) => {
    carousel.panel.querySelectorAll("[data-slide-direction]").forEach((control) => {
      control.addEventListener("click", () => {
        const direction = control.dataset.slideDirection === "next" ? 1 : -1;
        changeServiceSlide(carousel, carousel.activeIndex + direction);
        startServiceAutoplay();
      });
    });
  });

  serviceTabs.forEach((tab, index) => {
    tab.addEventListener("click", () => activateService(index));
    tab.addEventListener("keydown", (event) => {
      const previousKeys = ["ArrowUp", "ArrowLeft"];
      const nextKeys = ["ArrowDown", "ArrowRight"];
      let nextIndex = index;

      if (previousKeys.includes(event.key)) nextIndex = (index - 1 + serviceTabs.length) % serviceTabs.length;
      if (nextKeys.includes(event.key)) nextIndex = (index + 1) % serviceTabs.length;
      if (event.key === "Home") nextIndex = 0;
      if (event.key === "End") nextIndex = serviceTabs.length - 1;
      if (nextIndex === index) return;

      event.preventDefault();
      activateService(nextIndex, true);
    });
  });

  const openLinkedPanel = (hash, shouldScroll = false) => {
    if (!hash) return false;

    const serviceIndex = serviceTabs.findIndex((tab) => `#${tab.id}` === hash);
    if (serviceIndex >= 0) {
      activateService(serviceIndex);
      if (shouldScroll) document.querySelector("#servizi")?.scrollIntoView({ behavior: "smooth", block: "start" });
      return true;
    }

    const areaOption = areaOptions.find((option) => `#${option.id}` === hash);
    if (areaOption) {
      activateArea(areaOption.dataset.areaOption);
      if (shouldScroll) document.querySelector("#aree")?.scrollIntoView({ behavior: "smooth", block: "start" });
      return true;
    }

    return false;
  };

  document.querySelectorAll('a[href^="#service-tab-"], a[href^="#area-"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const hash = link.getAttribute("href");
      if (!openLinkedPanel(hash, true)) return;

      event.preventDefault();
      history.pushState(null, "", hash);
    });
  });

  openLinkedPanel(window.location.hash);
  window.addEventListener("hashchange", () => openLinkedPanel(window.location.hash));

  animateStats();
  startAutoplay();
  startServiceAutoplay();
})();
