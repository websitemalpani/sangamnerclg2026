(function () {
  const file = (location.pathname.split("/").pop() || "").toLowerCase();
  if (file !== "photo-gallery.html") return;
  const main = document.querySelector(".legacy-page-content");
  if (!main) return;

  const originalImages = [...main.querySelectorAll("figure img")];
  const photos = originalImages.map((img, index) => {
    const figure = img.closest("figure");
    const link = figure?.querySelector("a[href]");
    return {
      src: link?.getAttribute("href") || img.getAttribute("src"),
      thumb: img.getAttribute("src"),
      alt: img.getAttribute("alt") && img.getAttribute("alt") !== "example-image"
        ? img.getAttribute("alt")
        : `Sangamner College campus photograph ${index + 1}`
    };
  }).filter(photo => photo.src);
  if (!photos.length) return;

  main.className = "mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10 py-8 sm:py-10";

  const defaultGrid = "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4";
  const compactGrid = "grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-3";

  main.innerHTML = `
    <section class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-sky-950 to-blue-950 p-6 sm:p-8 mb-4 sm:mb-6 grid grid-cols-1 sm:grid-cols-[1.3fr_.7fr] gap-6 sm:gap-8 items-end">
      <div class="relative z-10">
        <span class="block mb-2 text-amber-300 text-xs font-extrabold uppercase tracking-widest">Campus through the lens</span>
        <h1 class="text-2xl sm:text-3xl font-extrabold text-white mb-2">Spaces made for learning.</h1>
        <p class="max-w-xl text-sm sm:text-base text-white/70 leading-relaxed">Explore classrooms, laboratories, cultural spaces, gardens and facilities that shape everyday life at Sangamner College.</p>
      </div>
      <div class="relative z-10 justify-self-start sm:justify-self-end rounded-2xl border border-white/15 bg-white/10 px-5 py-4">
        <strong class="block text-2xl sm:text-3xl font-extrabold text-amber-300">${photos.length}</strong>
        <span class="text-xs text-white/65">campus photographs</span>
      </div>
      <div class="absolute -right-16 -top-20 w-64 h-64 rounded-full border-[42px] border-amber-300/10 pointer-events-none" aria-hidden="true"></div>
    </section>

    <section aria-label="Gallery controls" class="flex flex-wrap items-center justify-between gap-4 mb-4 sm:mb-6 rounded-2xl border border-slate-200 bg-white p-3 sm:p-4">
      <div class="flex items-center gap-3">
        <span class="grid w-10 h-10 flex-shrink-0 place-items-center rounded-xl bg-amber-100 text-blue-800 text-lg" aria-hidden="true">⌾</span>
        <div><strong class="block text-sm font-extrabold text-slate-900">Infrastructure gallery</strong><small class="block text-xs text-slate-500">Select any photograph to view it larger</small></div>
      </div>
      <button type="button" class="gallery-view-toggle inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs sm:text-sm font-extrabold text-blue-700 hover:bg-slate-100 transition-colors" aria-pressed="false">Compact view</button>
    </section>

    <section class="campus-gallery ${defaultGrid}">
      ${photos.map((photo, index) => `<button class="campus-photo group relative overflow-hidden rounded-2xl bg-slate-200 aspect-square" type="button" data-index="${index}" aria-label="Open photograph ${index + 1}">
        <img src="${photo.thumb}" alt="${photo.alt}" loading="${index < 8 ? "eager" : "lazy"}" class="block w-full h-full object-cover transition-transform duration-300 group-hover:scale-105">
        <span class="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 px-3 sm:px-3.5 py-2.5 pt-8 bg-gradient-to-t from-black/70 to-transparent text-white opacity-0 group-hover:opacity-100 transition-opacity">
          <b class="grid w-7 h-7 flex-shrink-0 place-items-center rounded-full bg-amber-300 text-slate-900 text-[11px] font-extrabold">${String(index + 1).padStart(2, "0")}</b>
          <em class="not-italic text-xs font-extrabold truncate">View photograph ↗</em>
        </span>
      </button>`).join("")}
    </section>

    <div class="gallery-modal fixed inset-0 z-[999] hidden items-center justify-center bg-black/90 p-4 sm:p-8" role="dialog" aria-modal="true" aria-label="Campus photograph">
      <button class="gallery-modal__close absolute right-3 top-3 sm:right-6 sm:top-6 grid w-11 h-11 place-items-center rounded-full bg-white/10 hover:bg-white/20 text-white text-2xl transition-colors" type="button" aria-label="Close photograph">×</button>
      <button class="gallery-modal__prev absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 grid w-10 h-10 sm:w-12 sm:h-12 place-items-center rounded-full bg-white/10 hover:bg-white/20 text-white text-2xl sm:text-3xl transition-colors" type="button" aria-label="Previous photograph">‹</button>
      <figure class="m-0 max-w-4xl w-full">
        <img alt="" class="block max-w-full max-h-[70vh] sm:max-h-[80vh] mx-auto rounded-2xl object-contain shadow-2xl">
        <figcaption class="pt-3 text-center text-sm text-white/70"></figcaption>
      </figure>
      <button class="gallery-modal__next absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 grid w-10 h-10 sm:w-12 sm:h-12 place-items-center rounded-full bg-white/10 hover:bg-white/20 text-white text-2xl sm:text-3xl transition-colors" type="button" aria-label="Next photograph">›</button>
    </div>`;

  const grid = main.querySelector(".campus-gallery");
  const modal = main.querySelector(".gallery-modal");
  const modalImg = modal.querySelector("img");
  const caption = modal.querySelector("figcaption");
  let active = 0;
  let lastTrigger;
  let compact = false;
  let isOpen = false;

  const show = index => {
    active = (index + photos.length) % photos.length;
    modalImg.src = photos[active].src;
    modalImg.alt = photos[active].alt;
    caption.textContent = `Campus photograph ${active + 1} of ${photos.length}`;
    isOpen = true;
    modal.classList.remove("hidden");
    modal.classList.add("flex");
    document.body.classList.add("overflow-hidden");
    modal.querySelector(".gallery-modal__close").focus();
  };
  const close = () => {
    isOpen = false;
    modal.classList.add("hidden");
    modal.classList.remove("flex");
    modalImg.removeAttribute("src");
    document.body.classList.remove("overflow-hidden");
    lastTrigger?.focus();
  };

  grid.addEventListener("click", event => {
    const button = event.target.closest(".campus-photo");
    if (!button) return;
    lastTrigger = button;
    show(Number(button.dataset.index));
  });

  main.querySelector(".gallery-view-toggle").addEventListener("click", event => {
    compact = !compact;
    grid.className = `campus-gallery ${compact ? compactGrid : defaultGrid}`;
    event.currentTarget.setAttribute("aria-pressed", String(compact));
    event.currentTarget.textContent = compact ? "Editorial view" : "Compact view";
  });

  modal.querySelector(".gallery-modal__close").addEventListener("click", close);
  modal.querySelector(".gallery-modal__prev").addEventListener("click", () => show(active - 1));
  modal.querySelector(".gallery-modal__next").addEventListener("click", () => show(active + 1));
  modal.addEventListener("click", event => { if (event.target === modal) close(); });
  document.addEventListener("keydown", event => {
    if (!isOpen) return;
    if (event.key === "Escape") close();
    if (event.key === "ArrowLeft") show(active - 1);
    if (event.key === "ArrowRight") show(active + 1);
  });
})();
