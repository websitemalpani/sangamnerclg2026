(function () {
  const file = (location.pathname.split("/").pop() || "").toLowerCase();
  const pages = {
    "iqac.html": ["IQAC Overview", "Quality assurance"],
    "composition.html": ["Composition", "People and roles"],
    "aqar-reports.html": ["AQAR Reports", "Annual reports"],
    "programme-outcomes.html": ["Programme Outcomes", "Learning outcomes"],
    "student-satisfaction-survey.html": ["Student Satisfaction", "Feedback and analysis"],
    "facilities.html": ["Facilities", "Maintenance framework"],
    "gender-equity.html": ["Gender Equity", "Inclusive campus"],
    "best-practices.html": ["Best Practices", "Institutional initiatives"],
    "institutional-distinctiveness.html": ["Distinctiveness", "Our defining purpose"]
  };
  if (!pages[file]) return;
  const main = document.querySelector(".legacy-page-content");
  if (!main) return;
  document.body.classList.add("iqac-suite-page");
  const tabs = [
    { label: "Composition", href: "composition.html" },
    { label: "AQAR", href: "aqar-reports.html" },
    { label: "Meeting Minutes", children: [
      ["meeting-minutes.html", "All meeting records"],
      ["meeting-minutes.html", "2020–21"],
      ["/media/pdf/iqac/All Minutes of IQAC MEETING -2019-20.pdf", "2019–20"],
      ["/media/pdf/iqac/IQAC meeting minutes 2018-19.pdf", "2018–19"]
    ]},
    { label: "NAAC", children: [
      ["student-satisfaction-survey.html", "Criterion I · Feedback & ATR"],
      ["programme-outcomes.html", "Criterion II · PO, PSO & CO"],
      ["research.html", "Criterion III · Research"],
      ["facilities.html", "Criterion IV · Facilities"],
      ["students-corner.html", "Criterion V · Student Support"],
      ["administration.html", "Criterion VI · Governance"],
      ["gender-equity.html", "Criterion VII · Values & Equity"],
      ["best-practices.html", "Criterion VII · Best Practices"],
      ["institutional-distinctiveness.html", "Criterion VII · Distinctiveness"]
    ]},
    { label: "Academic Calendars", children: [
      ["/media/pdf/new/Academic calendar 23-24.pdf", "2023–24"],
      ["/media/pdf/new/Academic calendar 22-23.pdf", "2022–23"],
      ["/media/pdf/Academic calendar 21-22.pdf", "2021–22"],
      ["/media/pdf/Academic calendar 20-21.pdf", "2020–21"],
      ["/media/pdf/Academi Calendar 2019-20 final.pdf", "2019–20"],
      ["/media/pdf/Academi Calendar 2018-19 final.pdf", "2018–19"],
      ["/media/pdf/Academi_Calendar_2017-18_final.pdf", "2017–18"],
      ["/media/pdf/Academi Calendar 2016-17 final.pdf", "2016–17"]
    ]},
    { label: "Policies and Procedures", href: "policies-and-procedures.html" },
    { label: "External Peer Team Report", children: [
      ["/media/pdf/ext-peer-team-report/EPR 2024-2025.pdf", "2024–25"],
      ["/media/pdf/ext-peer-team-report/EPR 2023-2024.pdf", "2023–24"],
      ["/media/pdf/ext-peer-team-report/External Peer Team Report 2022-23.pdf", "2022–23"],
      ["/media/pdf/ext-peer-team-report/External Peer Team Report 2021-22.pdf", "2021–22"],
      ["/media/pdf/ext-peer-team-report/External Peer Team Report 2020-21.pdf", "2020–21"],
      ["report-of-external-peer-team-review.html", "Complete report archive"]
    ]}
  ];
  const nav = document.createElement("nav");
  nav.className = "iqac-suite-nav";
  nav.setAttribute("aria-label", "IQAC pages");
  nav.innerHTML = tabs.map(tab => {
    if (tab.href) return `<a href="${tab.href}"${tab.href === file ? ' class="is-current" aria-current="page"' : ""}>${tab.label}</a>`;
    const current = tab.children.some(([href]) => href === file);
    return `<details class="iqac-tab"${current ? " open" : ""}><summary${current ? ' class="is-current"' : ""}>${tab.label}<span aria-hidden="true">⌄</span></summary><div class="iqac-subtabs">${tab.children.map(([href, label]) => `<a href="${href}"${/\.pdf$/i.test(href) ? ' target="_blank"' : ""}${href === file ? ' class="is-current" aria-current="page"' : ""}>${label}<b aria-hidden="true">${/\.pdf$/i.test(href) ? "PDF ↓" : "→"}</b></a>`).join("")}</div></details>`;
  }).join("");
  nav.addEventListener("toggle", event => {
    if (!event.target.open) return;
    nav.querySelectorAll("details[open]").forEach(details => {
      if (details !== event.target) details.removeAttribute("open");
    });
  }, true);

  if (file === "iqac.html") {
    document.body.classList.add("iqac-overview-page");
    main.querySelector(".iqac-resource-centre")?.remove();
    const pageContent = document.createElement("section");
    pageContent.className = "iqac-overview-content";
    [...main.children].forEach(node => pageContent.appendChild(node));
    const layout = document.createElement("div");
    layout.className = "iqac-live-layout";
    layout.append(nav, pageContent);
    main.appendChild(layout);
    return;
  }
  const [title, eyebrow] = pages[file];
  const descriptions = {
    "composition.html": "Meet the team coordinating quality assurance, academic review and continuous institutional improvement.",
    "aqar-reports.html": "Access the college’s Annual Quality Assurance Reports submitted across successive academic years.",
    "programme-outcomes.html": "Review faculty-wise programme outcomes and course outcomes that make learning expectations clear.",
    "student-satisfaction-survey.html": "Explore student feedback analysis and action-taken reports supporting evidence-led improvement.",
    "facilities.html": "Understand the procedures that keep physical, academic and support facilities safe, effective and sustainable.",
    "gender-equity.html": "Our action framework for awareness, inclusion, equal opportunity and a respectful campus environment.",
    "best-practices.html": "Institutional initiatives that turn research, self-reliance and community values into meaningful student experiences.",
    "institutional-distinctiveness.html": "How the college advances its mission to spread knowledge unto the last and support learners at risk of dropping out."
  };
  const source = main.querySelector(".rightsect-content");
  const hero = document.createElement("section");
  hero.className = "iqac-subhero";
  hero.innerHTML = `<div><span>${eyebrow}</span><h2>${title}</h2><p>${descriptions[file]}</p></div><span class="iqac-subhero__mark" aria-hidden="true">Q</span>`;
  main.innerHTML = "";
  main.append(hero, nav);
  if (!source) return;

  const localHref = href => {
    let value = href || "#";
    value = value.replace(/^https?:\/\/(?:www\.)?sangamnercollege\.edu\.in\//i, "");
    if (/POs & COs of Arts Faculty\./media/pdf/i.test(value)) return "/media/pdf/iqac/Programme outcomes Arts Final.pdf";
    if (/autonomous-undertaking\./media/pdf/i.test(value)) return "ugc-compliance.html#undertaking";
    if (/4 C Faculty with qulification/i.test(value)) return "faculty-details.html";
    if (value === "policies-and-procedures.html") return "policies-and-procedures.html";
    return value;
  };
  const resourcePages = ["aqar-reports.html", "programme-outcomes.html", "student-satisfaction-survey.html", "best-practices.html"];
  if (file === "facilities.html") {
    const titles = [...source.querySelectorAll("h6")].map(heading => heading.textContent.replace(/\s+/g, " ").replace(/:$/, "").trim());
    const descriptions = [...source.querySelectorAll("h6")].map(heading => {
      let node = heading.nextElementSibling;
      while (node && node.tagName !== "P") node = node.nextElementSibling;
      return node?.textContent.replace(/\s+/g, " ").trim() || "";
    });
    const photos = [...source.querySelectorAll('.imgStyle img')].map(img => img.getAttribute("src"));
    const photoMap = [photos[0], photos[1], photos[1], photos[2], photos[3], photos[3]];
    const iconPaths = [
      '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8m-4-4v4M8 9h.01M12 9h4"/>',
      '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/>',
      '<path d="M3 21h18M5 21V8l7-5 7 5v13M9 21v-6h6v6"/>',
      '<path d="M12 3v12m-4-4 4 4 4-4M5 21h14"/><path d="M7 6h10"/>',
      '<path d="M4 20h16M6 16h12V5H6zM9 9h6M9 12h6"/>',
      '<path d="M12 21V10M7 15c-3-1-4-4-3-7 3 0 6 2 6 5M17 15c3-1 4-4 3-7-3 0-6 2-6 5"/>'
    ];
    const facilityIcon = path => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${path}</svg>`;
    const panel = document.createElement("section");
    panel.className = "facility-experience";
    panel.innerHTML = `
      <div class="facility-lead">
        <figure><img src="${photos[0]}" alt="Maintained academic facilities at Sangamner College" loading="eager"></figure>
        <div><span>Care behind every space</span><h2>Facilities that work as hard as our learners.</h2><p>Our maintenance framework connects skilled teams, trusted service partners and daily oversight to keep academic and community spaces safe, functional and welcoming.</p><div class="facility-stats"><span><strong>${titles.length}</strong>maintenance areas</span><span><strong>Daily</strong>campus upkeep</span><span><strong>Year-round</strong>support</span></div></div>
      </div>
      <div class="facility-grid">${titles.map((cardTitle, index) => `<article class="facility-card"><div class="facility-card__photo"><img src="${photoMap[index]}" alt="${cardTitle}" loading="lazy"><span>${facilityIcon(iconPaths[index])}</span></div><div class="facility-card__body"><small>${String(index + 1).padStart(2, "0")} · Campus care</small><h3>${cardTitle}</h3><p>${descriptions[index]}</p></div></article>`).join("")}</div>
      <aside class="facility-commitment"><span>${facilityIcon('<path d="m12 2 3 6 7 .9-5 4.8 1.3 6.8L12 17l-6.3 3.5L7 13.7 2 8.9 9 8z"/>')}</span><div><strong>Our maintenance commitment</strong><p>Clear responsibility, regular monitoring and responsive support protect the quality of every learning environment.</p></div><a href="photo-gallery.html">View campus gallery →</a></aside>`;
    main.appendChild(panel);
  } else if (file === "composition.html") {
    const rows = [...source.querySelectorAll("table tr")].slice(1).map(row => {
      const cells = [...row.querySelectorAll("td")].map(cell => cell.textContent.replace(/\s+/g, " ").trim());
      return { name: cells[0] || "", role: cells[1] || "" };
    }).filter(member => member.name && member.role);
    const intro = [...source.querySelectorAll("p")].find(paragraph => /established/i.test(paragraph.textContent));
    const signature = source.querySelector('img[src*="iqac-sign"]');
    const leadership = rows.filter(member => /chairman|co-ordinator|secretary/i.test(member.role)).slice(0, 4);
    const representatives = rows.filter(member => /representative/i.test(member.role)).length;
    const initials = name => name.replace(/^(prof\.?|dr\.?|ca|mr\.?|mrs\.?)\s+/i, "").split(/\s+/).filter(Boolean).slice(0, 2).map(part => part[0]).join("").toUpperCase();
    const experience = document.createElement("section");
    experience.className = "composition-experience";
    experience.innerHTML = `
      <div class="composition-intro">
        <div><span>Internal Quality Assurance Cell</span><h2>A collective commitment to quality.</h2><p>${intro?.textContent.replace(/\s+/g, " ").trim() || "The IQAC meets regularly to guide academic quality and continuous institutional improvement."}</p></div>
        <dl><div><dt>${rows.length}</dt><dd>Members</dd></div><div><dt>${representatives}</dt><dd>Representatives</dd></div><div><dt>2004</dt><dd>Established</dd></div></dl>
      </div>
      <div class="composition-section-head"><div><span>Leadership</span><h2>Guiding the quality agenda</h2></div><p>Key office bearers responsible for direction, coordination and continuity.</p></div>
      <div class="composition-leaders">${leadership.map((member, index) => `<article><span class="composition-avatar">${initials(member.name)}</span><div><small>${index === 0 ? "Institutional leadership" : "IQAC office bearer"}</small><h3>${member.name}</h3><p>${member.role}</p></div></article>`).join("")}</div>
      <div class="composition-roster">
        <div class="composition-section-head"><div><span>Full composition · 2020–21</span><h2>Members and responsibilities</h2></div><p>${rows.length} members bringing together institutional, academic and community perspectives.</p></div>
        <div class="composition-table" role="table" aria-label="IQAC composition 2020–21">
          <div class="composition-table__head" role="row"><span role="columnheader">Member</span><span role="columnheader">Role in IQAC</span></div>
          ${rows.map((member, index) => `<div class="composition-table__row" role="row"><span class="composition-index" aria-hidden="true">${String(index + 1).padStart(2, "0")}</span><div role="cell"><strong>${member.name}</strong></div><div role="cell"><span>${member.role}</span></div></div>`).join("")}
        </div>
      </div>
      ${signature ? `<aside class="composition-approval"><div><span>Official record</span><strong>Approved composition of the Internal Quality Assurance Cell</strong><p>Signature reproduced from the institutional record.</p></div><img src="${signature.getAttribute("src")}" alt="Official IQAC approval signature" loading="lazy"></aside>` : ""}`;
    main.appendChild(experience);
  } else if (resourcePages.includes(file)) {
    const resources = [...source.querySelectorAll("a[href]")].map(link => ({
      label: link.textContent.replace(/\s+/g, " ").trim(),
      href: localHref(link.getAttribute("href"))
    })).filter(item => item.label);
    const panel = document.createElement("section");
    panel.className = "iqac-resource-panel";
    panel.innerHTML = `<div class="iqac-section-head"><div><span>Document centre</span><h2>${title}</h2></div><p>${resources.length} verified ${resources.length === 1 ? "resource" : "resources"} available locally.</p></div><div class="iqac-resource-grid">${resources.map((item, index) => `<a href="${item.href}" target="_blank"><span class="iqac-resource-icon">↓</span><span><small>Resource ${String(index + 1).padStart(2, "0")}</small><strong>${item.label}</strong></span><b>PDF</b></a>`).join("")}</div>`;
    main.appendChild(panel);
  } else {
    const panel = document.createElement("section");
    panel.className = `iqac-detail iqac-detail--${file.replace(".html", "")}`;
    panel.append(...source.childNodes);
    main.appendChild(panel);
    panel.querySelectorAll("table").forEach(table => {
      const wrap = document.createElement("div");
      wrap.className = "iqac-table";
      table.parentNode.insertBefore(wrap, table);
      wrap.appendChild(table);
    });
    panel.querySelectorAll("img").forEach((img, index) => {
      img.loading = "lazy";
      if (!img.alt) img.alt = `${title} ${index + 1}`;
    });
    panel.querySelectorAll("a[href]").forEach(link => link.setAttribute("href", localHref(link.getAttribute("href"))));
  }
})();
