(function () {
  const file = (location.pathname.split("/").pop() || "").toLowerCase();
  const main = document.querySelector(".legacy-page-content");
  if (!main || !["library.html", "examination.html"].includes(file)) return;
  document.body.classList.add("academic-service-page");

  const icon = path => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${path}</svg>`;
  const icons = {
    book: icon('<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V4H6.5A2.5 2.5 0 0 0 4 6.5z"/><path d="M4 6.5v13A2.5 2.5 0 0 0 6.5 22H20"/>'),
    search: icon('<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>'),
    download: icon('<path d="M12 3v12m-4-4 4 4 4-4M5 21h14"/>'),
    clock: icon('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),
    exam: icon('<path d="M9 3h6m-7 4h8M5 3h2v4H5zM5 10h14v11H5z"/><path d="m9 15 2 2 4-4"/>'),
    people: icon('<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8M22 21v-2a4 4 0 0 0-3-3.87"/>'),
    phone: icon('<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.4 1.8.6 2.8.7a2 2 0 0 1 1.7 2.1z"/>')
  };

  if (file === "library.html") {
    const source = main.querySelector(".rightsect-content");
    const sidebar = main.querySelector(".leftlinks ul");
    if (!source) return;
    const navLinks = sidebar ? [...sidebar.querySelectorAll("a")].filter(a => a.getAttribute("href") !== "#") : [];
    const nodes = [...source.children];
    const about = document.createElement("div");
    about.className = "rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-6";
    about.innerHTML = '<div class="mb-4 flex items-center gap-3"><span class="rounded-full bg-sky-100 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.2em] text-blue-700">About the library</span><h2 class="text-xl font-extrabold text-slate-900 md:text-2xl">A library that grows with its learners</h2></div>';
    const sections = [];
    let current = about;
    nodes.forEach(node => {
      if (/^H6$/i.test(node.tagName)) {
        current = document.createElement("article");
        current.className = "rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6";
        const title = node.textContent.trim();
        current.dataset.title = title.toLowerCase();
        node.textContent = title;
        node.className = "mb-3 text-lg font-extrabold text-slate-900";
        current.appendChild(node);
        sections.push(current);
      } else {
        current.appendChild(node);
      }
    });
    const resourceGroups = [
      ["Explore the collection", "Catalogues, holdings and new material", icons.search, /about library|collection|holdings|new arrivals|opac/i],
      ["Digital learning", "Subscribed and open academic resources", icons.book, /e-resources|repository|syllabus/i],
      ["Student support", "Guidance, papers, orientation and answers", icons.people, /student|orientation|photo|faq|previous exam/i],
      ["Using the library", "Staff, timings, rules and feedback", icons.clock, /staff|working|rules|feedback/i]
    ];
    const grouped = resourceGroups.map(([title, text, groupIcon, pattern]) => ({
      title, text, groupIcon, links: navLinks.filter(link => pattern.test(link.textContent.trim()))
    }));
    const assigned = new Set(grouped.flatMap(group => group.links));
    navLinks.filter(link => !assigned.has(link)).forEach((link, index) => grouped[index % grouped.length].links.push(link));
    const resourceCards = grouped.map(group => `<article class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div class="mb-4 flex items-center gap-3"><span class="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700">${group.groupIcon}</span><div><h3 class="text-base font-extrabold text-slate-900">${group.title}</h3><p class="text-sm text-slate-600">${group.text}</p></div></div><ul class="space-y-2">${group.links.map(link => {
      const href = link.getAttribute("href") || "#";
      const pdf = /\.pdf(?:$|[?#])/i.test(href);
      return `<li><a class="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700" href="${href}"${link.target ? ` target="${link.target}"` : ""}><span>${link.textContent.trim()}</span><b class="text-[11px] font-extrabold uppercase tracking-[0.16em] text-slate-500">${pdf ? "PDF ↓" : "↗"}</b></a></li>`;
    }).join("")}</ul></article>`).join("");
    const libraryTabs = navLinks.map((link, index) => {
      const href = link.getAttribute("href") || "#";
      const external = /^https?:/i.test(href) || /\.pdf(?:$|[?#])/i.test(href);
      return `<a href="${href}"${link.target ? ` target="${link.target}"` : ""}${index === 0 ? ' class="flex items-center justify-between rounded-xl bg-sky-700 px-4 py-3 text-sm font-extrabold text-white shadow-sm" aria-current="page"' : ' class="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-blue-400 hover:text-blue-700"'}><span>${link.textContent.replace(/\s+/g, " ").trim()}</span><b aria-hidden="true" class="text-[11px] font-black uppercase tracking-[0.16em]">${external ? "↗" : "→"}</b></a>`;
    }).join("");
    main.innerHTML = `
      <div class="mx-auto max-w-7xl px-4 py-6 md:px-6 lg:px-8">
        <div class="grid gap-6 lg:grid-cols-[300px_minmax(0,1fr)]">
          <aside class="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
            <div class="mb-4 rounded-2xl bg-slate-900 px-4 py-3 text-white">
              <span class="block text-[10px] font-extrabold uppercase tracking-[0.24em] text-sky-200">Library</span>
              <strong class="block text-base font-extrabold">Explore services</strong>
            </div>
            <nav aria-label="Library sections" class="space-y-2">${libraryTabs}</nav>
          </aside>
          <div class="space-y-6">
            <section class="rounded-3xl bg-gradient-to-r from-sky-900 via-blue-900 to-slate-900 p-6 text-white shadow-sm">
              <div class="grid gap-4 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:items-end">
                <div>
                  <span class="mb-2 block text-[11px] font-extrabold uppercase tracking-[0.22em] text-sky-200">Knowledge centre · Since 1961</span>
                  <h2 class="text-2xl font-extrabold md:text-3xl">Ideas live here.</h2>
                  <p class="mt-3 max-w-3xl text-sm leading-6 text-slate-100">Explore a library built for focused study, meaningful research and lifelong curiosity—with trusted print collections and digital knowledge within easy reach.</p>
                </div>
                <div class="grid grid-cols-3 gap-2 text-center">
                  <span class="rounded-2xl bg-white/10 px-2 py-3"><strong class="block text-lg font-extrabold">1.22L+</strong><small class="text-[11px] uppercase tracking-[0.16em] text-sky-100">Books</small></span>
                  <span class="rounded-2xl bg-white/10 px-2 py-3"><strong class="block text-lg font-extrabold">116</strong><small class="text-[11px] uppercase tracking-[0.16em] text-sky-100">Journals</small></span>
                  <span class="rounded-2xl bg-white/10 px-2 py-3"><strong class="block text-lg font-extrabold">24/7</strong><small class="text-[11px] uppercase tracking-[0.16em] text-sky-100">Digital</small></span>
                </div>
              </div>
            </section>
            <section class="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
              <div class="mb-4 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                <div>
                  <span class="mb-1 block text-[10px] font-extrabold uppercase tracking-[0.2em] text-blue-700">Library services</span>
                  <h2 class="text-xl font-extrabold text-slate-900 md:text-2xl">Find what you need</h2>
                </div>
                <p class="max-w-2xl text-sm text-slate-600">Collections, online learning, student support and essential library information.</p>
              </div>
              <div class="grid gap-4 xl:grid-cols-2">${resourceCards}</div>
            </section>
            <section class="grid gap-4 md:grid-cols-2 xl:grid-cols-3"></section>
          </div>
        </div>
      </div>`;
    main.querySelector("section.grid").appendChild(about);
    const grid = main.querySelector("section.grid");
    sections.forEach(section => {
      if (/librarian|open educational/i.test(section.dataset.title)) section.classList.add("md:col-span-2");
      grid.appendChild(section);
    });
    main.querySelectorAll(".imglogoborder").forEach(link => {
      link.closest('[class*="col-"]')?.classList.add("rounded-2xl", "border", "border-slate-200", "bg-white", "p-3", "shadow-sm");
      const img = link.querySelector("img");
      if (img && !img.alt) img.alt = "Open educational resource";
    });
  }

  if (file === "examination.html") {
    const table = main.querySelector(".rightsect-content table");
    if (!table) return;
    const contacts = [
      ["Shri. Maruti Kadale", "8888147195"],
      ["Smt. Sandhya Gaikwad", "9766473137"],
      ["Shri. Vijay Raut", "8888567032"],
      ["Smt. Anita Sheral", "7385879889"]
    ];
    main.innerHTML = `
      <section class="service-intro service-intro--exam">
        <div><span class="service-eyebrow">Fair · Transparent · Student focused</span><h2>Examinations made clearer.</h2><p>Find examination leadership, essential support contacts and timely assistance from the college examination section.</p></div>
        <div class="exam-actions"><a href="students-corner.html">${icons.book}<span>Student’s Corner<small>Access student resources</small></span></a><a href="boe-committee.html">${icons.people}<span>BOE Committee<small>View committee details</small></span></a></div>
      </section>
      <section class="exam-grid">
        <article class="exam-board"><div class="section-heading"><div><span>Academic governance</span><h2>Board of Examination</h2></div><span class="section-icon">${icons.exam}</span></div><div class="responsive-table"></div></article>
        <aside class="exam-support"><div class="section-heading"><div><span>Student support</span><h2>Examination helpline</h2></div><span class="section-icon">${icons.phone}</span></div><p>Contact the examination team during office hours for guidance.</p><div class="exam-contacts">${contacts.map(([name, number]) => `<a href="tel:+91${number}"><span>${name}</span><strong>+91 ${number}</strong></a>`).join("")}</div><div class="exam-office"><span>${icons.clock}<b>Office hours</b></span><p>Monday to Saturday<br>9:30 AM–5:30 PM</p><a href="tel:02425225893">(02425) 225893</a><a href="mailto:info@sangamnercollege.edu.in">info@sangamnercollege.edu.in</a></div></aside>
      </section>`;
    main.querySelector(".responsive-table").appendChild(table);
    table.classList.add("service-table");
  }
})();
