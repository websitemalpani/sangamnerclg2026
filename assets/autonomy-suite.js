(function () {
  const file = (location.pathname.split("/").pop() || "").toLowerCase();
  const pages = {
    "autonomous-governing-body.html": ["Governing Body", "The apex statutory body guiding institutional direction, policy, accountability and the effective management of autonomous college responsibilities."],
    "autonomous-composition-academic-council.html": ["Academic Council", "The principal academic body responsible for programs, regulations, curriculum quality and continuous academic improvement."],
    "autonomous-bos.html": ["Board of Studies", "Discipline-led boards that shape relevant curricula, learning outcomes and assessment practices across faculties."],
    "autonomous-finance-committee.html": ["Finance Committee", "Responsible financial planning, oversight and recommendations that sustain the college’s academic mission."],
    "meeting-minutes.html": ["Meeting Minutes", "A central place for records, decisions and proceedings of statutory autonomous bodies."],
    "autonomous-committee-new.html": ["Other Committees", "Committees supporting transparent governance, student welfare, institutional quality and statutory compliance."],
    "ugc-compliance.html": ["UGC Compliance", "Institutional disclosures and documents aligned with UGC guidelines and regulations for autonomous colleges."]
  };
  if (!pages[file]) return;

  document.body.classList.add("governance-page");
  const main = document.querySelector(".legacy-page-content");
  if (!main) return;

  const original = [...main.children];
  const content = document.createElement("section");
  content.className = "governance-content";
  original.forEach(node => content.appendChild(node));

  const [title, description] = pages[file];
  const overview = document.createElement("section");
  overview.className = "governance-overview";
  overview.innerHTML = `<div><span class="governance-overview__label">Autonomous governance</span><h2>${title}</h2></div><p>${description}</p>`;

  const links = [
    ["autonomous-governing-body.html","Governing Body"],
    ["autonomous-composition-academic-council.html","Academic Council"],
    ["autonomous-bos.html","Board of Studies"],
    ["autonomous-finance-committee.html","Finance Committee"],
    ["meeting-minutes.html","Meeting Minutes"],
    ["autonomous-committee-new.html","Other Committees"],
    ["ugc-compliance.html#undertaking","Undertaking"],
    ["ugc-compliance.html","UGC Compliance"]
  ];
  const nav = document.createElement("nav");
  nav.className = "governance-nav";
  nav.setAttribute("aria-label", "Autonomy pages");
  nav.innerHTML = links.map(([href,label]) => `<a href="${href}"${href === file ? ' class="is-current" aria-current="page"' : ""}>${label}</a>`).join("");

  main.append(overview, nav, content);

  if (file === "ugc-compliance.html") {
    const undertakingLink = [...content.querySelectorAll("a")].find(link => /undertaking/i.test(link.textContent));
    const undertakingSection = undertakingLink?.closest("article, section, li") || undertakingLink?.parentElement;
    if (undertakingSection) undertakingSection.id = "undertaking";
    const currentNav = location.hash === "#undertaking"
      ? nav.querySelector('a[href$="#undertaking"]')
      : nav.querySelector('a[href="ugc-compliance.html"]');
    nav.querySelectorAll("a").forEach(link => {
      link.classList.remove("is-current");
      link.removeAttribute("aria-current");
    });
    if (currentNav) {
      currentNav.classList.add("is-current");
      currentNav.setAttribute("aria-current", "page");
    }

    const ugc = content.querySelector(".UGCDiv");
    const cards = ugc ? [...ugc.querySelectorAll(":scope > article")] : [];
    const cardMeta = [
      ["Statutory Bodies", "Governance", "landmark"],
      ["Institutional Committees", "Committees", "users"],
      ["Quality & Peer Review", "Quality", "badge"],
      ["Academic Disclosures", "Academics", "book"],
      ["UGC-Mandated Cells", "Compliance", "shield"],
      ["Meeting Records", "Records", "calendar"],
      ["Institutional Undertaking", "Declaration", "check"]
    ];
    const icons = {
      landmark: '<path d="M3 21h18M6 18V9m4 9V9m4 9V9m4 9V9M4 6l8-4 8 4v3H4z"/>',
      users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
      badge: '<path d="M12 2l2.2 2.1 3-.4.6 3 2.7 1.5-1.3 2.8 1.3 2.8-2.7 1.5-.6 3-3-.4L12 20l-2.2-2.1-3 .4-.6-3-2.7-1.5L4.8 11 3.5 8.2l2.7-1.5.6-3 3 .4z"/><path d="m9 11 2 2 4-4"/>',
      book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V4H6.5A2.5 2.5 0 0 0 4 6.5z"/><path d="M4 6.5v13A2.5 2.5 0 0 0 6.5 22H20"/>',
      shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/>',
      calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 11h18"/>',
      check: '<circle cx="12" cy="12" r="9"/><path d="m8 12 2.5 2.5L16 9"/>'
    };
    if (ugc && cards.length) {
      ugc.classList.add("ugc-dashboard");
      const intro = document.createElement("div");
      intro.className = "ugc-dashboard__intro";
      const resourceCount = cards.reduce((sum, card) => sum + card.querySelectorAll("a").length, 0);
      intro.innerHTML = `<div><span class="ugc-dashboard__eyebrow">Transparent by design</span><h2>Compliance documents, clearly organised.</h2><p>Access statutory bodies, committee records, academic disclosures, peer reviews and institutional declarations from one verified resource centre.</p></div><div class="ugc-dashboard__stats"><span><strong>${cards.length}</strong> disclosure areas</span><span><strong>${resourceCount}</strong> linked resources</span></div>`;
      ugc.before(intro);
      cards.forEach((card, index) => {
        const [title, label, icon] = cardMeta[index] || [`Compliance Area ${index + 1}`, "Resource", "check"];
        card.classList.add("ugc-card", `ugc-card--${index + 1}`);
        const heading = document.createElement("header");
        heading.className = "ugc-card__head";
        heading.innerHTML = `<span class="ugc-card__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[icon]}</svg></span><div><span>${String(index + 1).padStart(2, "0")} · ${label}</span><h3>${title}</h3></div>`;
        card.prepend(heading);
        card.querySelectorAll("ul").forEach(list => list.classList.add("ugc-resources"));
        card.querySelectorAll(".ugc-resources a").forEach(link => {
          const isPdf = /\.pdf(?:$|[?#])/i.test(link.getAttribute("href") || "");
          link.insertAdjacentHTML("beforeend", `<span aria-hidden="true">${isPdf ? "PDF" : "VIEW"} ↗</span>`);
        });
      });
    }
  }

  content.querySelectorAll("table").forEach(table => {
    table.classList.add("governance-table");
    const headers = [...table.querySelectorAll("tr:first-child th")].map(th => th.textContent.trim().toLowerCase());
    if (headers.length === 3 && headers[0].includes("name")) table.classList.add("governance-table--members");
    if (headers[0] && /^(sr|s\.?n|no|serial)/i.test(headers[0])) table.classList.add("governance-table--numbered");
    if (table.parentElement.classList.contains("governance-table-wrap")) return;
    const wrap = document.createElement("div");
    wrap.className = "governance-table-wrap";
    table.parentNode.insertBefore(wrap, table);
    wrap.appendChild(table);
  });

  if (file === "autonomous-bos.html") {
    const groups = [...content.querySelectorAll('h3[id^="BOS-"]')].map((heading, index) => {
      const list = heading.nextElementSibling;
      const links = list ? [...list.querySelectorAll("a")].map(a => ({ label: a.textContent.trim(), href: a.getAttribute("href") })) : [];
      return { title: heading.textContent.trim(), links, index };
    }).filter(group => group.links.length);
    const themes = ["arts","commerce","science","vocational","management","experiential"];
    const icons = [
      '<path d="M12 22a10 10 0 1 0 0-20 7 7 0 0 0 0 14h1.5a1.5 1.5 0 0 1 0 3H12"/><circle cx="8" cy="10" r=".5"/><circle cx="11" cy="7" r=".5"/><circle cx="15" cy="8" r=".5"/>',
      '<path d="M3 21h18M6 18V9m4 9V9m4 9V9m4 9V9M4 6l8-4 8 4v3H4z"/>',
      '<path d="M9 3h6m-5 0v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3M8 15h8"/>',
      '<path d="M14.7 6.3a4 4 0 0 0-5-5L7.5 3.5l3 3L12.7 4.3a2 2 0 0 1 2.5 2.5L13 9l3 3 2.2-2.2M3 21l6-6"/>',
      '<rect width="18" height="12" x="3" y="4" rx="2"/><path d="M8 20h8m-4-4v4"/>',
      '<path d="M12 2v20M2 12h20"/><circle cx="12" cy="12" r="7"/>'
    ];
    const svg = path => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${path}</svg>`;
    content.innerHTML = `<div class="bos-intro"><div><span class="bos-label">Academic curriculum bodies</span><h2>Boards of Studies</h2></div><p>Explore the discipline-based boards responsible for curriculum design, academic standards, learning outcomes and continuous program development.</p></div><div class="bos-grid">${groups.map(group => `<section class="bos-group bos-group--${themes[group.index] || "arts"}"><div class="bos-group__head"><div class="bos-group__identity"><span class="bos-group__icon">${svg(icons[group.index] || icons[0])}</span><h3>${group.title}</h3></div><span class="bos-count">${group.links.length} ${group.links.length === 1 ? "board" : "boards"}</span></div><ul class="bos-subjects">${group.links.map(link => `<li><a href="${link.href}">${link.label}</a></li>`).join("")}</ul></section>`).join("")}</div>`;
  }

  const help = document.createElement("aside");
  help.className = "governance-help";
  help.innerHTML = `<div><strong>Need an official document?</strong><span>Contact the college office for governance records and verified copies.</span></div><a href="contact.html">Contact the office →</a>`;
  main.appendChild(help);
})();
