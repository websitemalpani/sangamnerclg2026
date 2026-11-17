(function () {
  const file = (location.pathname.split("/").pop() || "").toLowerCase();
  const pages = {
    "arts.html": ["arts","Humanities","Explore language, culture, society and human experience through diverse disciplines that develop insight, communication and responsible citizenship."],
    "commerce.html": ["commerce","Commerce & Management","Build business understanding, financial capability, entrepreneurial confidence and the leadership skills required in a changing economy."],
    "science.html": ["science","Science & Technology","Question, investigate and discover through laboratory learning, scientific research and computational thinking."],
    "vocational-degrees.html": ["vocational","Vocational Courses","Develop practical, industry-relevant expertise through focused programs designed for skills, enterprise and employability."],
    "physical-education.html": ["physical","Physical Education","Advance fitness, sporting excellence, teamwork and holistic wellbeing through active campus opportunities."],
    "faculty-details.html": ["faculty","Faculty Directory","Explore our academic faculties and connect with the disciplines that shape teaching, research and student success."]
  };
  if (!pages[file]) return;
  const [theme,title,description] = pages[file];
  document.body.classList.add("faculty-page",`faculty-page--${theme}`);
  const main = document.querySelector(".legacy-page-content");
  if (!main) return;

  let sourceLinks = [...main.querySelectorAll(".listbuttons li a")];
  if (!sourceLinks.length) sourceLinks = [...main.querySelectorAll("a.servicebox")];
  const items = sourceLinks.map(link => ({
    label: link.textContent.replace(/\s+/g," ").trim(),
    href: link.getAttribute("href") || "#"
  })).filter(item => item.label);

  const icon = kind => {
    const paths = {
      arts: '<path d="M12 22a10 10 0 1 0 0-20 7 7 0 0 0 0 14h1.5a1.5 1.5 0 0 1 0 3H12"/><circle cx="7.5" cy="10.5" r=".5"/><circle cx="10" cy="7.5" r=".5"/><circle cx="14" cy="7.5" r=".5"/><circle cx="16.5" cy="10.5" r=".5"/>',
      commerce: '<path d="M3 21h18M6 18V9m4 9V9m4 9V9m4 9V9M4 6l8-4 8 4v3H4z"/>',
      science: '<path d="M9 3h6m-5 0v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3M8 15h8"/>',
      vocational: '<path d="M14.7 6.3a4 4 0 0 0-5-5L7.5 3.5l3 3L12.7 4.3a2 2 0 0 1 2.5 2.5L13 9l3 3 2.2-2.2a4 4 0 0 0-3.5-3.5zM3 21l6-6m-4-2 6 6"/>',
      physical: '<circle cx="12" cy="5" r="2"/><path d="m9 22 1-7-3-3 4-4 2 3 4 1m-3 10-2-6 4-3 3 3"/>',
      faculty: '<path d="m3 10 9-5 9 5-9 5z"/><path d="M7 12v5c3 2 7 2 10 0v-5M21 10v6"/>',
      book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V4H6.5A2.5 2.5 0 0 0 4 6.5z"/><path d="M4 6.5v13A2.5 2.5 0 0 0 6.5 22H20"/>',
      monitor: '<rect width="18" height="12" x="3" y="4" rx="2"/><path d="M8 20h8m-4-4v4"/>',
      activity: '<path d="M3 12h4l2-7 4 14 2-7h6"/>'
    };
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[kind] || paths.book}</svg>`;
  };
  const subjectIcon = label => /computer|software|electronic|bca/i.test(label) ? "monitor" : /physical|yoga|gym|sport/i.test(label) ? "activity" : /botany|chemistry|physics|zoology|microbiology|science/i.test(label) ? "science" : /commerce|bba|account|tax|management/i.test(label) ? "commerce" : /agriculture|dairy|hospitality|vocational/i.test(label) ? "vocational" : "book";

  const navLinks = [
    ["arts.html","Humanities"],["commerce.html","Commerce & Management"],["science.html","Science & Technology"],["vocational-degrees.html","Vocational"],["physical-education.html","Physical Education"],["faculty-details.html","Faculty Details"]
  ];
  main.innerHTML = `
    <section class="faculty-overview">
      <div class="faculty-overview__title"><span class="faculty-overview__icon">${icon(theme)}</span><div><span class="faculty-overview__label">Academic pathways</span><h2>${title}</h2></div></div>
      <p>${description}</p>
    </section>
    <nav class="faculty-nav" aria-label="Academic faculties">${navLinks.map(([href,label])=>`<a href="${href}"${href===file?' class="is-current" aria-current="page"':""}>${label}</a>`).join("")}</nav>
    <section class="faculty-directory">
      <div class="faculty-directory__head"><div><span class="faculty-overview__label">${theme === "faculty" ? "Academic community" : "Choose a discipline"}</span><h2>${theme === "faculty" ? "Explore our faculties" : "Departments & programs"}</h2></div><p>Select an area to discover its programs, learning environment and academic opportunities.</p></div>
      <div class="faculty-grid">${items.map(item=>`<a class="faculty-card" href="${item.href}"><span class="faculty-card__icon">${icon(subjectIcon(item.label))}</span><strong>${item.label}</strong></a>`).join("")}</div>
    </section>
    <aside class="faculty-cta"><div><strong>Ready to find your path?</strong><span>Explore admission information or speak with our student help desk.</span></div><div class="faculty-cta__actions"><a href="application.html">Admissions 2026–27</a><a href="contact.html">Contact us</a></div></aside>`;
})();
