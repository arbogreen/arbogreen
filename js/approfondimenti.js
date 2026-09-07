(() => {
  document.querySelectorAll("[data-appro-faq-toggle]").forEach((toggle) => {
    const item = toggle.closest(".appro-faq__item");
    if (!item) return;

    toggle.addEventListener("click", () => {
      toggle.setAttribute("aria-expanded", String(item.classList.toggle("is-open")));
    });
  });
})();
