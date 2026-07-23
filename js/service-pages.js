(() => {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const mobileViewport = window.matchMedia("(max-width: 640px)");
  const proofBlocks = [...document.querySelectorAll(".service-proof")];

  const setProofNumber = (number, value) => {
    const suffix = number.dataset.serviceProofSuffix || "";
    number.textContent = `${value}${value > 0 ? suffix : ""}`;
  };

  const animateProofNumber = (number) => {
    const target = Number(number.dataset.serviceProofTarget);
    if (!Number.isFinite(target)) return;

    const duration = 1000;
    const startTime = performance.now();

    const update = (timestamp) => {
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      setProofNumber(number, Math.round(target * easedProgress));

      if (progress < 1) window.requestAnimationFrame(update);
    };

    window.requestAnimationFrame(update);
  };

  const revealProofNumbers = (proof) => {
    [...proof.querySelectorAll("[data-service-proof-target]")].forEach((number) => {
      const item = number.closest(".service-proof__item");
      const itemIndex = item ? [...proof.children].indexOf(item) : 0;
      window.setTimeout(() => animateProofNumber(number), Math.max(itemIndex, 0) * 1000);
    });
  };

  proofBlocks.forEach((proof) => {
    proof.querySelectorAll("[data-service-proof-target]").forEach((number) => {
      const target = Number(number.dataset.serviceProofTarget);
      setProofNumber(number, reducedMotion.matches ? target : 0);
    });
  });

  if (proofBlocks.length && !reducedMotion.matches) {
    if ("IntersectionObserver" in window) {
      const proofObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          revealProofNumbers(entry.target);
          observer.unobserve(entry.target);
        });
      }, {
        threshold: 0.14,
        rootMargin: "0px 0px -8%"
      });

      proofBlocks.forEach((proof) => proofObserver.observe(proof));
    } else {
      proofBlocks.forEach(revealProofNumbers);
    }
  }

  document.querySelectorAll("[data-qualification-strip]").forEach((scroller) => {
    const track = scroller.querySelector(".qualification-strip__track");
    const group = track?.querySelector(".qualification-strip__group");
    if (!track || !group) return;

    const clone = group.cloneNode(true);
    clone.setAttribute("aria-hidden", "true");
    track.append(clone);

    let loopWidth = 0;
    let lastTimestamp = 0;
    let isDragging = false;
    let isTouching = false;
    let dragStartX = 0;
    let dragStartScroll = 0;

    const measure = () => {
      loopWidth = group.getBoundingClientRect().width;
    };

    const wrapScroll = (value) => {
      if (!loopWidth) return Math.max(value, 0);
      let nextValue = value;
      while (nextValue >= loopWidth) nextValue -= loopWidth;
      while (nextValue < 0) nextValue += loopWidth;
      return nextValue;
    };

    const finishDrag = (event) => {
      if (isDragging && scroller.hasPointerCapture(event.pointerId)) {
        scroller.releasePointerCapture(event.pointerId);
      }
      isDragging = false;
      scroller.classList.remove("is-dragging");
    };

    scroller.addEventListener("pointerdown", (event) => {
      if (event.pointerType !== "mouse" || event.button !== 0) return;
      isDragging = true;
      dragStartX = event.clientX;
      dragStartScroll = scroller.scrollLeft;
      scroller.setPointerCapture(event.pointerId);
      scroller.classList.add("is-dragging");
    });

    scroller.addEventListener("pointermove", (event) => {
      if (!isDragging) return;
      event.preventDefault();
      scroller.scrollLeft = wrapScroll(dragStartScroll - (event.clientX - dragStartX));
    });

    scroller.addEventListener("pointerup", finishDrag);
    scroller.addEventListener("pointercancel", finishDrag);
    scroller.addEventListener("touchstart", () => { isTouching = true; }, { passive: true });
    scroller.addEventListener("touchend", () => { isTouching = false; }, { passive: true });
    scroller.addEventListener("touchcancel", () => { isTouching = false; }, { passive: true });

    const advance = (timestamp) => {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const elapsed = Math.min(timestamp - lastTimestamp, 64);
      lastTimestamp = timestamp;

      if (!document.hidden && !reducedMotion.matches && !isDragging && !isTouching) {
        const scrollSpeed = mobileViewport.matches ? 0.05 : 0.03;
        scroller.scrollLeft = wrapScroll(scroller.scrollLeft + elapsed * scrollSpeed);
      }

      window.requestAnimationFrame(advance);
    };

    measure();
    window.addEventListener("resize", measure, { passive: true });
    window.requestAnimationFrame(advance);
  });

  document.querySelectorAll("[data-rank3-group]").forEach((group) => {
    const controls = [...group.querySelectorAll("[data-rank3-control]")];
    const images = [...group.querySelectorAll("[data-rank3-image]")];

    const activate = (nextIndex) => {
      controls.forEach((control, index) => {
        const isActive = index === nextIndex;
        control.classList.toggle("is-active", isActive);
        control.setAttribute("aria-pressed", String(isActive));
      });

      images.forEach((image, index) => {
        image.classList.toggle("is-active", index === nextIndex);
      });
    };

    controls.forEach((control, index) => {
      control.addEventListener("click", () => activate(index));
      control.addEventListener("pointerenter", () => activate(index));
      control.addEventListener("focus", () => activate(index));
    });
  });

  document.querySelectorAll(".service-visual--tree-climbing").forEach((visual) => {
    const scroller = visual.querySelector(".visual-climb");
    const panels = [...visual.querySelectorAll(".visual-climb__panel")];
    const controls = [...visual.querySelectorAll("[data-visual-climb-direction]")];
    if (!scroller || panels.length < 2 || controls.length !== 2) return;

    const getActiveIndex = () => panels.reduce((closestIndex, panel, index) => {
      const currentDistance = Math.abs(scroller.scrollLeft - panels[closestIndex].offsetLeft);
      const nextDistance = Math.abs(scroller.scrollLeft - panel.offsetLeft);
      return nextDistance < currentDistance ? index : closestIndex;
    }, 0);

    const updateControls = () => {
      const activeIndex = getActiveIndex();
      controls.forEach((control) => {
        const direction = Number(control.dataset.visualClimbDirection);
        control.disabled = direction < 0 ? activeIndex === 0 : activeIndex === panels.length - 1;
      });
    };

    let updateFrame;
    scroller.addEventListener("scroll", () => {
      window.cancelAnimationFrame(updateFrame);
      updateFrame = window.requestAnimationFrame(updateControls);
    }, { passive: true });

    controls.forEach((control) => {
      control.addEventListener("click", () => {
        const direction = Number(control.dataset.visualClimbDirection);
        const nextIndex = Math.min(Math.max(getActiveIndex() + direction, 0), panels.length - 1);
        scroller.scrollTo({
          left: panels[nextIndex].offsetLeft,
          behavior: reducedMotion.matches ? "auto" : "smooth"
        });
      });
    });

    window.addEventListener("resize", updateControls, { passive: true });
    updateControls();
  });

  document.querySelectorAll("[data-cinematic]").forEach((cinematic) => {
    const frames = [...cinematic.querySelectorAll("[data-cinematic-frame]")];
    const controls = [...cinematic.querySelectorAll("[data-cinematic-control]")];
    const requestedInterval = Number(cinematic.dataset.cinematicInterval);
    const autoplayInterval = Number.isFinite(requestedInterval) && requestedInterval > 0 ? requestedInterval : 4800;
    let activeIndex = 0;
    let timer;

    const activate = (nextIndex) => {
      activeIndex = (nextIndex + frames.length) % frames.length;
      frames.forEach((frame, index) => frame.classList.toggle("is-active", index === activeIndex));
      controls.forEach((control, index) => {
        const isActive = index === activeIndex;
        control.classList.toggle("is-active", isActive);
        control.setAttribute("aria-pressed", String(isActive));
      });
    };

    const stop = () => window.clearInterval(timer);
    const start = () => {
      stop();
      if (reducedMotion.matches || frames.length < 2) return;
      timer = window.setInterval(() => activate(activeIndex + 1), autoplayInterval);
    };

    controls.forEach((control, index) => control.addEventListener("click", () => {
      activate(index);
      start();
    }));

    cinematic.addEventListener("pointerenter", stop);
    cinematic.addEventListener("pointerleave", start);
    cinematic.addEventListener("focusin", stop);
    cinematic.addEventListener("focusout", start);
    start();
  });

  document.querySelectorAll("[data-visual-lens]").forEach((lensArea) => {
    const glass = lensArea.querySelector(".visual-lens__glass");
    if (!glass) return;

    let xRatio = 0.5;
    let yRatio = 0.5;

    const placeLens = (nextXRatio, nextYRatio) => {
      xRatio = Math.min(Math.max(nextXRatio, 0), 1);
      yRatio = Math.min(Math.max(nextYRatio, 0), 1);

      glass.style.left = `${xRatio * 100}%`;
      glass.style.top = `${yRatio * 100}%`;
      glass.style.backgroundPosition = `${xRatio * 100}% ${yRatio * 100}%`;
    };

    const moveLens = (clientX, clientY) => {
      const bounds = lensArea.getBoundingClientRect();
      const x = Math.min(Math.max(clientX - bounds.left, 0), bounds.width);
      const y = Math.min(Math.max(clientY - bounds.top, 0), bounds.height);
      placeLens(bounds.width ? x / bounds.width : 0.5, bounds.height ? y / bounds.height : 0.5);
    };

    lensArea.addEventListener("pointermove", (event) => moveLens(event.clientX, event.clientY));
    lensArea.addEventListener("pointerdown", (event) => moveLens(event.clientX, event.clientY));
    lensArea.addEventListener("keydown", (event) => {
      const movements = {
        ArrowLeft: [-0.08, 0],
        ArrowRight: [0.08, 0],
        ArrowUp: [0, -0.08],
        ArrowDown: [0, 0.08]
      };
      const movement = movements[event.key];
      if (!movement) return;
      event.preventDefault();
      placeLens(xRatio + movement[0], yRatio + movement[1]);
    });
  });
})();
