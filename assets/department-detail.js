(function () {
  const file = (location.pathname.split("/").pop() || "").toLowerCase();
  const families = [
    { prefix: "arts-", label: "Humanities", home: "arts.html", className: "arts", icon: "✦" },
    { prefix: "commerce-", label: "Commerce & Management", home: "commerce.html", className: "commerce", icon: "▥" },
    { prefix: "science-", label: "Science & Technology", home: "science.html", className: "science", icon: "⚗" },
    { prefix: "vocational-degrees-", label: "Vocational Courses", home: "vocational-degrees.html", className: "vocational", icon: "⌁" },
    { prefix: "bvoc-", label: "Vocational Courses", home: "vocational-degrees.html", className: "vocational", icon: "⌁" },
    { prefix: "other-bvoc-", label: "Physical Education", home: "physical-education.html", className: "physical", icon: "◎" },
    { prefix: "other-gymkhana", label: "Physical Education", home: "physical-education.html", className: "physical", icon: "◎" }
  ];
  const family = families.find(item => file.startsWith(item.prefix));
  if (!family) return;

  const main = document.querySelector(".legacy-page-content");
  if (!main) return;
  document.body.classList.add("department-detail-page", `department-detail-page--${family.className}`);

  const subpage = main.querySelector(".subpage");
  const content = main.querySelector(".rightsect-content");
  const sidebar = main.querySelector(".leftlinks");
  const oldHeading = main.querySelector(".headingsect");
  const breadcrumbLinks = oldHeading ? [...oldHeading.querySelectorAll(".rightsmall-link a")] : [];
  const subject = (breadcrumbLinks.at(-1)?.textContent || file
    .replace(/\.(html|php)$/i, "")
    .replace(family.prefix, "")
    .replace(/-(faculty-profile|research-center|syllabus|bos|photogallery|photo-gallery|achievements|activities).*$/i, "")
    .replace(/-/g, " "))
    .replace(/\s+/g, " ").trim().replace(/\b\w/g, c => c.toUpperCase());
  const sectionTitle = (oldHeading?.querySelector("h1,h2,h3")?.textContent || "Department Profile").replace(/\s+/g, " ").trim();

  const intro = document.createElement("section");
  intro.className = "department-intro";
  intro.innerHTML = `
    <a class="department-intro__back" href="${family.home}">← All ${family.label} departments</a>
    <div class="department-intro__main">
      <span class="department-intro__icon" aria-hidden="true">${family.icon}</span>
      <div><span class="department-intro__eyebrow">${family.label}</span><h2>${subject}</h2><p>Explore the department’s academic profile, faculty, learning resources and achievements.</p></div>
    </div>`;
  const iconPaths = {
    arts: '<path d="M12 22a10 10 0 1 0 0-20 7 7 0 0 0 0 14h1.5a1.5 1.5 0 0 1 0 3H12"/><circle cx="8" cy="10" r=".5"/>',
    commerce: '<path d="M3 21h18M6 18V9m4 9V9m4 9V9m4 9V9M4 6l8-4 8 4v3H4z"/>',
    science: '<path d="M9 3h6m-5 0v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3M8 15h8"/>',
    vocational: '<path d="M14.7 6.3a4 4 0 0 0-5-5L7.5 3.5l3 3L12.7 4.3a2 2 0 0 1 2.5 2.5L13 9l3 3M3 21l6-6"/>',
    physical: '<circle cx="12" cy="5" r="2"/><path d="m9 22 1-7-3-3 4-4 2 3 4 1m-3 10-2-6 4-3 3 3"/>'
  };
  intro.querySelector(".department-intro__icon").innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true">${iconPaths[family.className]}</svg>`;
  intro.querySelector(".department-intro__back").innerHTML = `&larr; All ${family.label} departments`;
  intro.querySelector(".department-intro__main p").innerHTML = "Explore the department&rsquo;s academic profile, faculty, learning resources and achievements.";
  main.insertBefore(intro, main.firstChild);

  if (subpage) subpage.classList.add("department-workspace");
  if (oldHeading) {
    oldHeading.classList.add("department-content-head");
    const crumbs = oldHeading.querySelector(".rightsmall-link");
    if (crumbs) crumbs.remove();
    const heading = oldHeading.querySelector("h1,h2,h3");
    if (heading) heading.textContent = sectionTitle;
  }
  if (content) content.classList.add("department-content");

  if (sidebar) {
    sidebar.classList.add("department-tabs");
    const links = [...sidebar.querySelectorAll("a")];
    links.forEach(link => {
      const href = link.getAttribute("href") || "";
      if (/^(other|other-muktangan)\.html$/i.test(href)) link.setAttribute("href", family.home);
      if (/\.html(?:#.*)?$/i.test(href) && !href.startsWith("http")) {
        link.removeAttribute("target");
        link.removeAttribute("rel");
      }
      if ((link.getAttribute("href") || "").toLowerCase() === file) {
        link.classList.add("active");
        link.setAttribute("aria-current", "page");
      }
    });
    const label = document.createElement("strong");
    label.className = "department-tabs__label";
    label.textContent = "Explore department";
    sidebar.prepend(label);
  }

  main.querySelectorAll("table").forEach(table => {
    if (table.closest(".department-table-scroll")) return;
    const wrap = document.createElement("div");
    wrap.className = "department-table-scroll";
    wrap.tabIndex = 0;
    wrap.setAttribute("role", "region");
    wrap.setAttribute("aria-label", `${subject} information table; scroll horizontally on smaller screens`);
    table.parentNode.insertBefore(wrap, table);
    wrap.appendChild(table);
  });
  main.querySelectorAll(".rightsect-content img").forEach(img => {
    img.loading = "lazy";
    if (!img.getAttribute("alt")) img.setAttribute("alt", `${subject} department`);
    img.classList.add("department-image");
  });
  main.querySelectorAll('.rightsect-content a[href$=".pdf"]').forEach(link => {
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener");
  });
})();
