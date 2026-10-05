(function () {
  const file = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  if (file === "index.html" || file === "") return;

  const exactTitles = {
    "about-sp-sanstha.html": "About S.P. Sanstha",
    "about-college.html": "About Sangamner College",
    "application.html": "Online Admissions",
    "campus.html": "Our Campus",
    "examination.html": "Examination Section",
    "library.html": "College Library",
    "library-e-databases.html": "Library E-Databases",
    "library-faculty-and-staff.html": "Library Faculty & Staff",
    "library-faq.html": "Library FAQ",
    "library-instituional-repository.html": "Institutional Repository",
    "library-membership.html": "Library Membership",
    "library-open-access-eresources.html": "Open Access E-Resources",
    "library-photo-gallery.html": "Library Photo Gallery",
    "library-previous-exam-question-papers.html": "Previous Exam Question Papers",
    "library-student-corner.html": "Library Student Corner",
    "library-syllabi.html": "Library Syllabi",
    "library-syllabus-autonomous.html": "Autonomous Syllabus",
    "library-syllabus-nep2020.html": "NEP 2020 Syllabus",
    "library-syllabus.html": "Library Syllabus",
    "aicte-bba-bca.html": "AICTE — BBA / BCA",
    "aishe-mis.html": "AISHE / MIS",
    "abc.html": "Academic Bank of Credits",
    "iqac.html": "Internal Quality Assurance Cell",
    "composition.html": "IQAC Composition",
    "aqar-reports.html": "AQAR Reports",
    "programme-outcomes.html": "Programme Outcomes",
    "student-satisfaction-survey.html": "Student Satisfaction Survey",
    "facilities.html": "Facilities and Maintenance",
    "gender-equity.html": "Gender Equity",
    "best-practices.html": "Best Practices",
    "institutional-distinctiveness.html": "Institutional Distinctiveness",
    "nirf.html": "NIRF",
    "policies-and-procedures.html": "Policies and Procedures",
    "alumni.html": "Alumni Community",
    "rti-info.html": "Right to Information",
    "autonomous-bos.html": "Board of Studies",
    "autonomous-committee-new.html": "Autonomous Committees",
    "autonomous-composition-academic-council.html": "Academic Council",
    "autonomous-finance-committee.html": "Finance Committee",
    "autonomous-governing-body.html": "Governing Body",
    "boe-committee.html": "Board of Examinations",
    "innovation-incubation-startup-cell.html": "Innovation, Incubation & Startup Cell",
    "scholarships-for-students.html": "Scholarships for Students",
    "students-corner.html": "Student’s Corner",
    "message-from-the-chairman.html": "Message from the Chairman",
    "message-from-the-principal.html": "Message from the Principal",
    "news-and-events.html": "News & Events",
    "photo-gallery.html": "Photo Gallery",
    "physical-education.html": "Physical Education",
    "vocational-degrees.html": "Vocational Degree Programs",
    "ugc-compliance.html": "UGC Compliance",
    "report-of-external-peer-team-review.html": "External Peer Team Reviews"
  };

  const pageTitle = exactTitles[file] || file.replace(/\.(html|php)$/i, "").replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());

  document.body.classList.add("modern-page");

  const header = `
    <div class="site-utility">
      <div class="site-utility__inner">
        <div class="site-utility__admission"><span class="site-utility__pill">Admissions 2026–27</span><span>Applications are now open</span><a href="application.html">Apply today →</a></div>
        <div class="site-utility__contact"><span>☎ 76201 11689</span><span>⌖ Sangamner, Maharashtra</span></div>
      </div>
    </div>
    <header class="modern-header">
      <div class="site-masthead">
        <div class="site-masthead__inner">
          <a class="site-brand" href="index.html">
            <img class="site-brand__logo" src="/media/assets/sangamner-college-logo.png" alt="Sangamner College emblem">
            <span class="site-brand__copy">
              <span class="site-brand__title">Sangamner College</span>
              <span class="site-brand__full">Shikshan Prasarak Sanstha’s Sangamner Nagarpalika Arts, D. J. Malpani Commerce & B. N. Sarda Science College</span>
              <span class="site-brand__meta">Autonomous College · Est. 1961</span>
            </span>
          </a>
          <div class="site-badges"><span class="site-badge">NAAC A+</span><span class="site-badge">CGPA 3.58</span><span class="site-badge">DBT Star</span><a class="site-apply" href="application.html">Apply now</a></div>
          <button class="site-menu-button" type="button" aria-label="Open menu" aria-expanded="false">☰</button>
        </div>
      </div>
      <nav class="site-nav" aria-label="Main navigation">
        <div class="site-nav__inner">
          <a href="index.html">Home</a>
          <div class="site-nav__item"><button class="site-nav__trigger" type="button">About</button><div class="site-submenu"><a href="about-sp-sanstha.html">About S.P. Sanstha</a><a href="about-college.html">About College</a><a href="organogram.html">Organogram</a></div></div>
          <a href="administration.html">Administration</a>
          <div class="site-nav__item"><button class="site-nav__trigger" type="button">Autonomy</button><div class="site-submenu"><a href="autonomous-governing-body.html">Governing Body</a><a href="autonomous-composition-academic-council.html">Academic Council</a><a href="autonomous-bos.html">Board of Studies</a><a href="autonomous-finance-committee.html">Finance Committee</a><a href="meeting-minutes.html">Meeting Minutes</a><a href="autonomous-committee-new.html">Other Committees</a><a href="ugc-compliance.html#undertaking">Undertaking</a><a href="ugc-compliance.html">UGC Compliance</a></div></div>
          <div class="site-nav__item"><button class="site-nav__trigger" type="button">Departments</button><div class="site-submenu"><a href="arts.html">Humanities</a><a href="commerce.html">Commerce & Management</a><a href="science.html">Science & Technology</a><a href="vocational-degrees.html">Vocational Courses</a><a href="physical-education.html">Physical Education</a><a href="faculty-details.html">Details of Faculty</a></div></div>
          <a href="iqac.html">IQAC</a><a href="library.html">Library</a><a href="examination.html">Examination</a><a href="photo-gallery.html">Photos</a><a href="contact.html">Contact</a><a href="naturopathy.html">Naturopathy</a><a href="aicte-bba-bca.html">AICTE-BBA/BCA</a>
        </div>
      </nav>
    </header>
    <section class="page-hero">
      <div class="page-hero__inner"><p class="page-hero__eyebrow">Sangamner College</p><h1>${pageTitle}</h1><div class="page-hero__crumbs"><a href="index.html">Home</a> &nbsp;/&nbsp; ${pageTitle}</div></div>
    </section>`;

  document.body.insertAdjacentHTML("afterbegin", header);

  const shellNodes = new Set(document.querySelectorAll(".site-utility, .modern-header, .page-hero, script, style"));
  const legacyChrome = new Set(document.querySelectorAll("body > .toplinks, body > .toplogosect, body > .topbluesect, body > nav.navbar, body > footer:not(.site-footer), body > .copyright"));

  legacyChrome.forEach(node => {
    if (node && node.parentNode) node.parentNode.removeChild(node);
  });

  const content = document.createElement("main");
  content.className = "legacy-page-content";
  [...document.body.children].forEach(node => {
    if (!shellNodes.has(node) && node.tagName !== "SCRIPT" && node.tagName !== "STYLE" && node.tagName !== "MAIN") {
      content.appendChild(node);
    }
  });

  const pageHero = document.querySelector(".page-hero");
  if (pageHero) {
    pageHero.insertAdjacentElement("afterend", content);
  } else {
    document.body.appendChild(content);
  }

  const footer = `
    <footer class="site-footer">
      <div class="site-footer__inner">
        <div class="site-footer__grid">
          <div><div class="site-footer__brand"><img class="site-footer__logo" src="/media/assets/sangamner-college-logo.png" alt=""><div><h3>Sangamner College</h3><strong style="color:var(--gold)">Spread knowledge unto the last.</strong></div></div><p>Autonomous, NAAC A+ institution serving learners across the region since 1961.</p></div>
          <div><h3>Explore</h3><ul><li><a href="about-sp-sanstha.html">About S.P. Sanstha</a></li><li><a href="about-college.html">About College</a></li><li><a href="campus.html">Campus</a></li><li><a href="news-and-events.html">News & Events</a></li></ul></div>
          <div><h3>Students</h3><ul><li><a href="application.html">Admissions</a></li><li><a href="examination.html">Examination</a></li><li><a href="library.html">Library</a></li><li><a href="students-corner.html">Student Corner</a></li><li><a href="/media/pdf/RTI.pdf">RTI Information</a></li></ul></div>
          <div><h3>Get in touch</h3><p>Sangamner, Ahmednagar<br>Maharashtra, India</p><p><a href="tel:+917620111689">+91 76201 11689</a><br><a href="mailto:info@sangamnercollege.edu.in">info@sangamnercollege.edu.in</a></p></div>
        </div>
        <div class="site-footer__bottom">© 2026 Sangamner College. All rights reserved.</div>
      </div>
    </footer>`;
  document.body.insertAdjacentHTML("beforeend", footer);

  const menu = document.querySelector(".site-menu-button");
  const nav = document.querySelector(".site-nav");
  if (menu && nav) {
    menu.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      menu.setAttribute("aria-expanded", String(open));
      menu.textContent = open ? "×" : "☰";
    });
  }

  document.querySelectorAll(".site-nav__trigger").forEach(trigger => {
    trigger.addEventListener("click", event => {
      event.stopPropagation();
      const item = trigger.closest(".site-nav__item");
      document.querySelectorAll(".site-nav__item.is-open").forEach(openItem => {
        if (openItem !== item) openItem.classList.remove("is-open");
      });
      if (item) item.classList.toggle("is-open");
    });
  });
  document.addEventListener("click", () => document.querySelectorAll(".site-nav__item.is-open").forEach(item => item.classList.remove("is-open")));

  document.querySelectorAll(".site-nav a").forEach(link => {
    if ((link.getAttribute("href") || "").toLowerCase() === file) link.classList.add("is-active");
  });
})();
