(function () {
  const file = (location.pathname.split("/").pop() || "").toLowerCase();
  const supported = ["nirf.html", "policies-and-procedures.html", "aicte-bba-bca.html", "alumni.html", "iqac.html"];
  if (!supported.includes(file)) return;
  const main = document.querySelector(".legacy-page-content");
  if (!main) return;
  document.body.classList.add("institutional-page", `institutional-page--${file.replace(/\..+$/, "")}`);
  const svg = path => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${path}</svg>`;
  const icons = {
    chart: svg('<path d="M4 20V10m6 10V4m6 16v-7m4 7H2"/>'),
    shield: svg('<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/>'),
    quality: svg('<path d="M12 2l2.2 2.1 3-.4.6 3 2.7 1.5-1.3 2.8 1.3 2.8-2.7 1.5-.6 3-3-.4L12 20l-2.2-2.1-3 .4-.6-3-2.7-1.5L4.8 11 3.5 8.2l2.7-1.5.6-3 3 .4z"/><path d="m9 11 2 2 4-4"/>'),
    people: svg('<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8M22 21v-2a4 4 0 0 0-3-3.87"/>'),
    book: svg('<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V4H6.5A2.5 2.5 0 0 0 4 6.5z"/><path d="M4 6.5v13A2.5 2.5 0 0 0 6.5 22H20"/>')
  };
  const meta = {
    "nirf.html": ["National rankings", "NIRF reports, organised by year.", "Access the college’s submitted Overall, College, Innovation and Sustainable Institution reports.", icons.chart],
    "policies-and-procedures.html": ["Institutional framework", "Policies that guide our work.", "A clear reference to the standards supporting ethical, inclusive and responsible institutional practice.", icons.shield],
    "aicte-bba-bca.html": ["Professional education", "AICTE · BBA and BCA.", "Explore programs, academic objectives, learning outcomes and infrastructure supporting management and computing education.", icons.book],
    "alumni.html": ["Stay connected", "Once Sangamner, always Sangamner.", "Share your journey, keep your college connection active and help inspire the learners who follow.", icons.people],
    "iqac.html": ["Continuous improvement", "Quality is a shared practice.", "The Internal Quality Assurance Cell strengthens academic standards through reflection, evidence and coordinated action.", icons.quality]
  };
  const [eyebrow, title, text, icon] = meta[file];
  const hero = `<section class="institution-hero"><div><span>${eyebrow}</span><h2>${title}</h2><p>${text}</p></div><span class="institution-hero__icon">${icon}</span></section>`;

  if (file === "nirf.html") {
    const source = main.querySelector(".rightsect-content");
    const groups = [];
    let current;
    [...(source?.children || [])].forEach(node => {
      if (/^H3$/i.test(node.tagName)) {
        current = { title: node.textContent.trim(), links: [] };
        groups.push(current);
      } else if (current) {
        const links = node.matches?.("a[href]") ? [node] : [...(node.querySelectorAll?.("a[href]") || [])];
        links.forEach(link => current.links.push({ label: link.textContent.trim(), href: link.getAttribute("href") }));
      }
    });
    main.innerHTML = hero + `<section class="nirf-grid">${groups.filter(g => g.links.length).map((group, i) => `<article class="nirf-year${i === 0 ? " is-latest" : ""}"><header><span>${i === 0 ? "Latest reports" : "Report archive"}</span><h3>${group.title}</h3></header><div>${group.links.map(link => `<a href="${link.href}" target="_blank"><span>${link.label}</span><b>PDF ↓</b></a>`).join("")}</div></article>`).join("")}</section>`;
  } else if (file === "policies-and-procedures.html") {
    const items = [...main.querySelectorAll(".ListNewGrid > li")].map(item => {
      const link = item.querySelector("a");
      return { label: item.textContent.trim(), href: link?.getAttribute("href") };
    });
    main.innerHTML = hero + `<section class="policy-panel"><div class="institution-heading"><div><span>Policy directory</span><h2>Institutional policies</h2></div><p>${items.length} policy areas supporting transparent college administration.</p></div><div class="policy-grid">${items.map((item, i) => item.href ? `<a href="${item.href}" target="_blank"><span class="policy-number">${String(i + 1).padStart(2, "0")}</span><strong>${item.label}</strong><b>PDF ↓</b></a>` : `<article><span class="policy-number">${String(i + 1).padStart(2, "0")}</span><strong>${item.label}</strong><small>Institutional policy</small></article>`).join("")}</div></section>`;
  } else if (file === "alumni.html") {
    const form = main.querySelector("#alumni_form");
    main.innerHTML = hero + `<section class="alumni-layout"><aside><span>${icons.people}</span><h2>Tell us where your journey led.</h2><p>Your experience helps strengthen the alumni community and gives today’s students a wider view of what is possible.</p><ul><li>Reconnect with your department</li><li>Share professional milestones</li><li>Support future learners</li></ul></aside><section class="alumni-form"><div class="institution-heading"><div><span>Alumni registration</span><h2>Update your details</h2></div><p>Fields marked with an asterisk are required.</p></div></section></section>`;
    if (form) main.querySelector(".alumni-form").appendChild(form);
    const $ = window.jQuery;
    if ($ && !$.validator) {
      $.validator = { addMethod: function () {} };
      $.fn.validate = function (options) {
        this.on("submit", function (event) {
          event.preventDefault();
          const required = ["faculty","department","course_completed","lname","fname","mname","passingyear","email","mobile","address","opinion","letters_code"];
          const missing = required.map(id => this.querySelector(`#${id}`)).filter(field => field && !String(field.value || "").trim());
          if (missing.length) {
            missing[0].focus();
            missing[0].setCustomValidity("Please complete this required field.");
            missing[0].reportValidity();
            missing[0].addEventListener("input", () => missing[0].setCustomValidity(""), { once: true });
            return;
          }
          if (options?.submitHandler) options.submitHandler(this);
        });
        return this;
      };
    }
  } else if (file === "iqac.html") {
    const source = main.querySelector(".rightsect-content");
    const clean = value => String(value || "").replace(/\s+/g, " ").trim();
    const headings = [...(source?.querySelectorAll("h4") || [])];
    const findHeading = name => headings.find(heading => clean(heading.textContent).toLowerCase().includes(name));
    const contentAfter = (heading, selector) => {
      let node = heading?.nextElementSibling;
      while (node && !/^H[1-6]$/i.test(node.tagName)) {
        if (node.matches?.(selector)) return node;
        node = node.nextElementSibling;
      }
      return null;
    };
    const items = (name, selector = "ol,ul") => [...(contentAfter(findHeading(name), selector)?.querySelectorAll("li") || [])].map(li => clean(li.textContent));
    const vision = clean(contentAfter(findHeading("vision"), "p")?.textContent);
    const objectives = items("objective");
    const strategies = items("strategies");
    const functions = items("functions");
    const benefits = items("benefits");
    const documentLink = source?.querySelector('.listbuttons a[href$=".pdf"]');
    const image = source?.querySelector('img[src*="iqac"]')?.getAttribute("src") || "/media/images/iqac.jpg";
    main.innerHTML = hero + `
      <section class="iqac-overview">
        <figure><img src="${image}" alt="Internal Quality Assurance Cell" loading="lazy"></figure>
        <div><span class="iqac-label">Our guiding vision</span><h2>Building quality into everyday academic life.</h2><p>${vision}</p><div class="iqac-objectives">${objectives.map((item, i) => `<article><b>0${i + 1}</b><p>${item}</p></article>`).join("")}</div></div>
      </section>
      <section class="iqac-resource-centre">
        <div class="institution-heading"><div><span>IQAC document centre</span><h2>Quality resources and reports</h2></div><a class="iqac-policy-link" href="policies-and-procedures.html">View all policies →</a></div>
        <div class="iqac-resource-columns">
          <article class="iqac-resource-group iqac-resource-group--naac">
            <header><span>${icons.quality}</span><div><small>Accreditation framework</small><h3>NAAC Criteria</h3></div></header>
            <div class="iqac-criteria-grid">
              <a href="student-satisfaction-survey.html"><b>I</b><span>Curricular Aspects<small>Feedback & ATR</small></span></a>
              <a href="programme-outcomes.html"><b>II</b><span>Teaching & Learning<small>PO, PSO & CO</small></span></a>
              <a href="research.html"><b>III</b><span>Research & Extension<small>Research activities</small></span></a>
              <a href="facilities.html"><b>IV</b><span>Infrastructure<small>Facilities</small></span></a>
              <a href="students-corner.html"><b>V</b><span>Student Support<small>Progression & activities</small></span></a>
              <a href="administration.html"><b>VI</b><span>Governance<small>Leadership & management</small></span></a>
              <a href="gender-equity.html"><b>VII</b><span>Institutional Values<small>Equity & best practices</small></span></a>
            </div>
          </article>
          <article class="iqac-resource-group iqac-resource-group--calendar">
            <header><span>${icons.book}</span><div><small>Academic planning</small><h3>Academic Calendars</h3></div></header>
            <div class="iqac-document-list">
              <a href="/media/pdf/new/Academic calendar 23-24.pdf" target="_blank"><span>2023–24</span><b>PDF ↓</b></a>
              <a href="/media/pdf/new/Academic calendar 22-23.pdf" target="_blank"><span>2022–23</span><b>PDF ↓</b></a>
              <a href="/media/pdf/Academic calendar 21-22.pdf" target="_blank"><span>2021–22</span><b>PDF ↓</b></a>
              <a href="/media/pdf/Academic calendar 20-21.pdf" target="_blank"><span>2020–21</span><b>PDF ↓</b></a>
              <a href="/media/pdf/Academi Calendar 2019-20 final.pdf" target="_blank"><span>2019–20</span><b>PDF ↓</b></a>
              <a href="/media/pdf/Academi Calendar 2018-19 final.pdf" target="_blank"><span>2018–19</span><b>PDF ↓</b></a>
              <a href="/media/pdf/Academi_Calendar_2017-18_final.pdf" target="_blank"><span>2017–18</span><b>PDF ↓</b></a>
              <a href="/media/pdf/Academi Calendar 2016-17 final.pdf" target="_blank"><span>2016–17</span><b>PDF ↓</b></a>
            </div>
          </article>
          <article class="iqac-resource-group iqac-resource-group--peer">
            <header><span>${icons.people}</span><div><small>Independent review</small><h3>External Peer Team</h3></div></header>
            <div class="iqac-document-list">
              <a href="/media/pdf/ext-peer-team-report/EPR 2024-2025.pdf" target="_blank"><span>2024–25</span><b>PDF ↓</b></a>
              <a href="/media/pdf/ext-peer-team-report/EPR 2023-2024.pdf" target="_blank"><span>2023–24</span><b>PDF ↓</b></a>
              <a href="/media/pdf/ext-peer-team-report/External Peer Team Report 2022-23.pdf" target="_blank"><span>2022–23</span><b>PDF ↓</b></a>
              <a href="/media/pdf/ext-peer-team-report/External Peer Team Report 2021-22.pdf" target="_blank"><span>2021–22</span><b>PDF ↓</b></a>
              <a href="/media/pdf/ext-peer-team-report/External Peer Team Report 2020-21.pdf" target="_blank"><span>2020–21</span><b>PDF ↓</b></a>
            </div>
            <a class="iqac-peer-archive" href="report-of-external-peer-team-review.html">Open report archive →</a>
          </article>
        </div>
      </section>
      <section class="iqac-work">
        <article class="iqac-list-card iqac-list-card--strategy"><header><span>How we work</span><h2>Quality strategies</h2><p>Mechanisms and procedures for consistent institutional improvement.</p></header><ol>${strategies.map(item => `<li>${item}</li>`).join("")}</ol></article>
        <article class="iqac-list-card iqac-list-card--functions"><header><span>What we do</span><h2>Core functions</h2><p>Coordinated action supporting evidence, participation and better outcomes.</p></header><ol>${functions.map(item => `<li>${item}</li>`).join("")}</ol></article>
      </section>
      <section class="iqac-benefits"><div class="institution-heading"><div><span>Institutional impact</span><h2>What IQAC enables</h2></div><p>A stronger quality culture that connects planning, evidence and improvement.</p></div><div>${benefits.map((item, i) => `<article><span>${String(i + 1).padStart(2, "0")}</span><p>${item}</p></article>`).join("")}</div></section>
      ${documentLink ? `<aside class="iqac-document"><div><span>${icons.quality}</span><div><strong>External Peer Team Review</strong><p>Access the independent peer-team report and institutional review document.</p></div></div><a href="${documentLink.getAttribute("href")}" target="_blank">Open report <b>PDF ↓</b></a></aside>` : ""}`;
  } else {
    const source = main.querySelector(".rightsect-content");
    main.innerHTML = hero + `<section class="institution-content"><div class="institution-content__inner"></div></section>`;
    if (source) main.querySelector(".institution-content__inner").append(...source.childNodes);
    main.querySelectorAll("table").forEach(table => {
      const wrap = document.createElement("div");
      wrap.className = "institution-table";
      table.parentNode.insertBefore(wrap, table);
      wrap.appendChild(table);
    });
    main.querySelectorAll('a[href$=".pdf"]').forEach(link => {
      link.target = "_blank";
      link.rel = "noopener";
      link.classList.add("institution-download");
    });
    main.querySelectorAll("img").forEach(img => { img.loading = "lazy"; if (!img.alt) img.alt = `${title} at Sangamner College`; });
  }
})();
