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

  // ---- shared Tailwind class strings (kept as constants to avoid repeating long lists) ----
  const navLinkCls = "block xl:inline-block px-3.5 py-2.5 xl:py-1.5 rounded-full text-white font-bold text-sm hover:bg-white/10 hover:text-amber-300 transition-colors";
  const navTriggerCls = "flex items-center justify-between xl:inline-flex xl:justify-center gap-1.5 w-full xl:w-auto px-3.5 py-2.5 xl:py-1.5 rounded-full text-white font-bold text-sm hover:bg-white/10 hover:text-amber-300 transition-colors cursor-pointer bg-transparent border-0";
  const submenuWrapCls = "nav-submenu hidden group-hover:block group-focus-within:block static xl:absolute xl:top-[calc(100%+14px)] xl:left-0 z-40 w-full xl:w-64 mt-1 xl:mt-0 mb-1 xl:mb-0 ml-3 xl:ml-0 p-1.5 xl:p-2.5 rounded-xl border border-white/10 xl:border-slate-900/10 bg-white/5 xl:bg-white xl:shadow-2xl";
  const submenuLinkCls = "block px-3 py-2 rounded-lg text-white/85 xl:text-slate-900 text-sm font-semibold hover:bg-white/10 xl:hover:bg-amber-50 hover:text-amber-300 xl:hover:text-blue-700 transition-colors";
  const caret = '<span class="inline-block w-1.5 h-1.5 border-r-[1.5px] border-b-[1.5px] border-current rotate-45 transition-transform group-[.is-open]:rotate-[225deg]" aria-hidden="true"></span>';

  const header = `
    <div class="site-utility bg-[#111d45] text-white text-xs sm:text-sm">
      <div class="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 min-h-[42px] py-1.5 flex flex-wrap items-center justify-center sm:justify-between gap-x-5 gap-y-1.5">
        <div class="flex items-center gap-2.5 sm:gap-3 flex-wrap justify-center">
          <span class="px-3 py-1 rounded-full bg-amber-300 text-[#111d45] font-extrabold whitespace-nowrap">Admissions 2026–27</span>
          <span class="hidden sm:inline text-white/85">Applications are now open</span>
          <a href="application.html" class="text-amber-300 font-bold hover:text-amber-200 whitespace-nowrap">Apply today →</a>
        </div>
        <div class="hidden md:flex items-center gap-5 text-white/70 whitespace-nowrap">
          <span>☎ 76201 11689</span>
          <span>⌖ Sangamner, Maharashtra</span>
        </div>
      </div>
    </div>
    <header class="modern-header">
      <div class="bg-[#fffaf0]">
        <div class="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 min-h-[88px] xl:min-h-[106px] py-3 flex items-center justify-between gap-4">
          <a class="site-brand flex items-center gap-3 sm:gap-4 min-w-0 text-[#111d45]" href="index.html">
            <img class="w-[72px] h-[54px] sm:w-28 sm:h-[78px] object-contain flex-shrink-0" src="/media/assets/sangamner-college-logo.png" alt="Sangamner College emblem">
            <span class="min-w-0 pl-3 sm:pl-4 border-l border-[#111d45]/10">
              <span class="block font-extrabold text-[1.05rem] sm:text-xl leading-tight" style="font-family:'Manrope',sans-serif">Sangamner College</span>
              <span class="hidden lg:block max-w-xl mt-1 text-[#111d45]/70 font-semibold leading-snug text-sm">Shikshan Prasarak Sanstha’s Sangamner Nagarpalika Arts, D. J. Malpani Commerce & B. N. Sarda Science College</span>
              <span class="block mt-0.5 text-[#1f5cac] font-bold text-xs sm:text-sm">Autonomous College · Est. 1961</span>
            </span>
          </a>
          <div class="hidden xl:flex items-center gap-2 flex-shrink-0">
            <span class="px-3 py-2 rounded-full border border-[#111d45]/10 bg-white text-[#1f5cac] font-bold text-xs whitespace-nowrap">NAAC A+</span>
            <span class="px-3 py-2 rounded-full border border-[#111d45]/10 bg-white text-[#1f5cac] font-bold text-xs whitespace-nowrap">CGPA 3.58</span>
            <span class="px-3 py-2 rounded-full border border-[#111d45]/10 bg-white text-[#1f5cac] font-bold text-xs whitespace-nowrap">DBT Star</span>
            <a class="px-4 py-2.5 rounded-full bg-[#f15b3a] text-[#111d45] font-extrabold text-sm whitespace-nowrap hover:brightness-95 transition" href="application.html">Apply now</a>
          </div>
          <button class="site-menu-button xl:hidden grid place-items-center w-11 h-11 flex-shrink-0 rounded-full bg-[#183b73] text-white text-xl" type="button" aria-label="Open menu" aria-expanded="false">☰</button>
        </div>
      </div>
      <nav class="site-nav hidden xl:block bg-[#183b73]" aria-label="Main navigation">
        <div class="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-1 xl:gap-1 py-3 xl:py-0 xl:min-h-[54px]">
          <a href="index.html" class="${navLinkCls}">Home</a>
          <div class="nav-item group relative">
            <button class="nav-trigger ${navTriggerCls}" type="button" aria-expanded="false">About ${caret}</button>
            <div class="${submenuWrapCls}">
              <a href="about-sp-sanstha.html" class="${submenuLinkCls}">About S.P. Sanstha</a>
              <a href="about-college.html" class="${submenuLinkCls}">About College</a>
              <a href="organogram.html" class="${submenuLinkCls}">Organogram</a>
            </div>
          </div>
          <a href="administration.html" class="${navLinkCls}">Administration</a>
          <div class="nav-item group relative">
            <button class="nav-trigger ${navTriggerCls}" type="button" aria-expanded="false">Autonomy ${caret}</button>
            <div class="${submenuWrapCls}">
              <a href="autonomous-governing-body.html" class="${submenuLinkCls}">Governing Body</a>
              <a href="autonomous-composition-academic-council.html" class="${submenuLinkCls}">Academic Council</a>
              <a href="autonomous-bos.html" class="${submenuLinkCls}">Board of Studies</a>
              <a href="autonomous-finance-committee.html" class="${submenuLinkCls}">Finance Committee</a>
              <a href="meeting-minutes.html" class="${submenuLinkCls}">Meeting Minutes</a>
              <a href="autonomous-committee-new.html" class="${submenuLinkCls}">Other Committees</a>
              <a href="ugc-compliance.html#undertaking" class="${submenuLinkCls}">Undertaking</a>
              <a href="ugc-compliance.html" class="${submenuLinkCls}">UGC Compliance</a>
            </div>
          </div>
          <div class="nav-item group relative">
            <button class="nav-trigger ${navTriggerCls}" type="button" aria-expanded="false">Departments ${caret}</button>
            <div class="${submenuWrapCls}">
              <a href="arts.html" class="${submenuLinkCls}">Humanities</a>
              <a href="commerce.html" class="${submenuLinkCls}">Commerce & Management</a>
              <a href="science.html" class="${submenuLinkCls}">Science & Technology</a>
              <a href="vocational-degrees.html" class="${submenuLinkCls}">Vocational Courses</a>
              <a href="physical-education.html" class="${submenuLinkCls}">Physical Education</a>
              <a href="faculty-details.html" class="${submenuLinkCls}">Details of Faculty</a>
            </div>
          </div>
          <a href="iqac.html" class="${navLinkCls}">IQAC</a>
          <a href="library.html" class="${navLinkCls}">Library</a>
          <a href="examination.html" class="${navLinkCls}">Examination</a>
          <a href="photo-gallery.html" class="${navLinkCls}">Photos</a>
          <a href="contact.html" class="${navLinkCls}">Contact</a>
          <a href="naturopathy.html" class="${navLinkCls}">Naturopathy</a>
          <a href="aicte-bba-bca.html" class="${navLinkCls}">AICTE-BBA/BCA</a>
        </div>
      </nav>
    </header>
    <section class="page-hero relative overflow-hidden bg-gradient-to-br from-[#111d45] to-[#183b73] text-white">
      <div class="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-8 sm:py-10">
        <p class="page-hero__eyebrow mb-2 text-amber-300 text-xs sm:text-sm font-extrabold uppercase tracking-widest">Sangamner College</p>
        <h1 class="max-w-3xl text-2xl sm:text-3xl font-extrabold text-white">${pageTitle}</h1>
        <div class="page-hero__crumbs mt-2.5 text-white/70 text-sm sm:text-base"><a href="index.html" class="text-amber-300 hover:text-amber-200 font-semibold">Home</a>&nbsp;/&nbsp;${pageTitle}</div>
      </div>
      <div class="absolute right-[6%] -top-24 w-56 h-56 sm:w-60 sm:h-60 rounded-full border-[36px] border-amber-300/10 pointer-events-none" aria-hidden="true"></div>
    </section>`;

  document.body.insertAdjacentHTML("afterbegin", header);

  const shellNodes = new Set(document.querySelectorAll(".site-utility, .modern-header, .page-hero, .site-footer, script, style"));
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

  // If the page already wrapped its own content in a single top-level element
  // (e.g. a hand-authored <div class="mx-auto ...">), insert that element directly
  // instead of nesting it inside another padded wrapper — avoids doubled spacing.
  const toInsert = content.children.length === 1 ? content.children[0] : content;

  if (content.childNodes.length) {
    const pageHero = document.querySelector(".page-hero");
    if (pageHero) {
      pageHero.insertAdjacentElement("afterend", toInsert);
    } else {
      document.body.appendChild(toInsert);
    }
  }

  const footerLinkCls = "text-white/70 hover:text-amber-300 transition-colors";
  const footer = `
    <footer class="site-footer bg-[#111d45] text-white/70">
      <div class="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 pt-10 sm:pt-12 pb-5">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr] gap-8 sm:gap-10">
          <div>
            <div class="flex items-center gap-3.5 mb-3">
              <img class="w-[72px] h-[52px] p-1 rounded-lg bg-white object-contain flex-shrink-0" src="/media/assets/sangamner-college-logo.png" alt="">
              <div><h3 class="text-white font-extrabold text-base m-0">Sangamner College</h3><strong class="text-amber-300 text-sm font-bold">Spread knowledge unto the last.</strong></div>
            </div>
            <p class="text-sm text-white/70 leading-relaxed">Autonomous, NAAC A+ institution serving learners across the region since 1961.</p>
          </div>
          <div>
            <h3 class="text-white font-extrabold text-base mb-3">Explore</h3>
            <ul class="space-y-2 text-sm list-none p-0 m-0">
              <li><a href="about-sp-sanstha.html" class="${footerLinkCls}">About S.P. Sanstha</a></li>
              <li><a href="about-college.html" class="${footerLinkCls}">About College</a></li>
              <li><a href="campus.html" class="${footerLinkCls}">Campus</a></li>
              <li><a href="news-and-events.html" class="${footerLinkCls}">News & Events</a></li>
            </ul>
          </div>
          <div>
            <h3 class="text-white font-extrabold text-base mb-3">Students</h3>
            <ul class="space-y-2 text-sm list-none p-0 m-0">
              <li><a href="application.html" class="${footerLinkCls}">Admissions</a></li>
              <li><a href="examination.html" class="${footerLinkCls}">Examination</a></li>
              <li><a href="library.html" class="${footerLinkCls}">Library</a></li>
              <li><a href="students-corner.html" class="${footerLinkCls}">Student Corner</a></li>
              <li><a href="/media/pdf/RTI.pdf" class="${footerLinkCls}">RTI Information</a></li>
            </ul>
          </div>
          <div>
            <h3 class="text-white font-extrabold text-base mb-3">Get in touch</h3>
            <p class="text-sm text-white/70 leading-relaxed mb-2">Sangamner, Ahmednagar<br>Maharashtra, India</p>
            <p class="text-sm leading-relaxed"><a href="tel:+917620111689" class="${footerLinkCls}">+91 76201 11689</a><br><a href="mailto:info@sangamnercollege.edu.in" class="${footerLinkCls} break-all">info@sangamnercollege.edu.in</a></p>
          </div>
        </div>
        <div class="mt-8 sm:mt-9 pt-4 sm:pt-5 border-t border-white/10 text-center text-sm text-white/60">© 2026 Sangamner College. All rights reserved.</div>
      </div>
    </footer>`;
  document.body.insertAdjacentHTML("beforeend", footer);

  // ---- mobile menu button ----
  const menu = document.querySelector(".site-menu-button");
  const nav = document.querySelector(".site-nav");
  if (menu && nav) {
    menu.addEventListener("click", () => {
      const open = nav.classList.toggle("hidden") === false;
      menu.setAttribute("aria-expanded", String(open));
      menu.textContent = open ? "×" : "☰";
    });
  }

  // ---- dropdown submenus (hover on desktop via group-hover, click/tap everywhere) ----
  document.querySelectorAll(".nav-trigger").forEach(trigger => {
    trigger.addEventListener("click", event => {
      event.stopPropagation();
      const submenu = trigger.nextElementSibling;
      const item = trigger.closest(".nav-item");
      const willOpen = submenu.classList.contains("hidden");

      document.querySelectorAll(".nav-submenu").forEach(el => {
        if (el !== submenu) {
          el.classList.add("hidden");
          el.closest(".nav-item")?.classList.remove("is-open");
        }
      });

      submenu.classList.toggle("hidden", !willOpen);
      item?.classList.toggle("is-open", willOpen);
      trigger.setAttribute("aria-expanded", String(willOpen));
    });
  });
  document.addEventListener("click", () => {
    document.querySelectorAll(".nav-submenu").forEach(el => el.classList.add("hidden"));
    document.querySelectorAll(".nav-item.is-open").forEach(el => el.classList.remove("is-open"));
    document.querySelectorAll(".nav-trigger").forEach(el => el.setAttribute("aria-expanded", "false"));
  });

  // ---- active link highlight (inline style so it always wins over hover utilities) ----
  document.querySelectorAll(".site-nav a").forEach(link => {
    if ((link.getAttribute("href") || "").toLowerCase() === file) {
      link.classList.add("is-active");
      link.style.background = "#ffd84d";
      link.style.color = "#111d45";
      link.style.fontWeight = "800";
    }
  });
})();
