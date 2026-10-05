(function () {
  const file = (location.pathname.split("/").pop() || "").toLowerCase();
  const pages = new Set([
    "dictionaries-and-encyclopedia.html",
    "ebooks.html",
    "institutional-repository.html",
    "library-e-databases.html",
    "library-faculty-and-staff.html",
    "library-faq.html",
    "library-instituional-repository.html",
    "library-membership.html",
    "library-open-access-eresources.html",
    "library-photo-gallery.html",
    "library-previous-exam-question-papers.html",
    "library-student-corner.html",
    "library-syllabi.html",
    "library-syllabus.html",
    "library-syllabus-autonomous.html",
    "library-syllabus-nep2020.html",
    "newspapers.html",
    "theses-and-dissertations.html"
  ]);
  if (!pages.has(file) && !file.endsWith("-syllabus.html")) return;
  document.body.classList.add("library-subpage");
  if (file === "library-e-databases.html") document.body.classList.add("library-databases-page");
  if (file === "library-instituional-repository.html") document.body.classList.add("library-repository-page");
  if (file === "ebooks.html") document.body.classList.add("library-ebooks-page");
  if (file === "library-previous-exam-question-papers.html") document.body.classList.add("library-question-papers-page");
  if (file === "library-syllabus-autonomous.html") document.body.classList.add("library-autonomous-syllabus-page");
  if (file === "library-syllabus-nep2020.html") document.body.classList.add("library-nep2020-syllabus-page");
  if (file === "library-faq.html") {
    document.body.classList.add("library-faq-page");
    const content = document.querySelector(".rightsect-content");
    if (content) {
      const fragment = document.createDocumentFragment();
      const faqCards = [];
      let currentCard = null;
      let currentAnswer = null;

      [...content.children].forEach(node => {
        if (node.tagName === "H6") {
          if (currentCard) faqCards.push(currentCard);
          currentCard = document.createElement("article");
          currentCard.className = "rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:p-5";
          const question = document.createElement("div");
          question.className = "mb-3 border-b border-slate-100 pb-3";
          const heading = node;
          heading.className = "text-base font-extrabold text-slate-900";
          question.appendChild(heading);
          currentCard.appendChild(question);
          currentAnswer = document.createElement("div");
          currentAnswer.className = "space-y-3 text-sm leading-6 text-slate-600";
          currentCard.appendChild(currentAnswer);
        } else if (node.tagName === "HR") {
          if (currentCard) faqCards.push(currentCard);
          currentCard = null;
          currentAnswer = null;
        } else if (currentCard && currentAnswer) {
          currentAnswer.appendChild(node);
        }
      });

      if (currentCard) faqCards.push(currentCard);
      faqCards.forEach(card => fragment.appendChild(card));
      content.replaceChildren(fragment);
    }
  }
  if (file === "library-student-corner.html") {
    document.body.classList.add("library-student-corner-page");
    const content = document.querySelector(".rightsect-content");
    if (content) {
      [...content.querySelectorAll(":scope > h6")].forEach(heading => {
        const links = heading.nextElementSibling;
        if (!links?.classList.contains("listbuttons")) return;
        const group = document.createElement("section");
        group.className = "rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:p-5";
        heading.className = "mb-3 text-base font-extrabold text-slate-900";
        links.className = "grid gap-3 md:grid-cols-2";
        heading.before(group);
        group.append(heading, links);
      });
    }
  }
  if (file === "library-faculty-and-staff.html") document.body.classList.add("library-staff-page");
  if (file === "library-open-access-eresources.html") {
    document.body.classList.add("library-open-resources-page");
    const content = document.querySelector(".rightsect-content");
    if (content) {
      [...content.querySelectorAll(":scope > h6")].forEach(heading => {
        const links = heading.nextElementSibling;
        if (!links?.classList.contains("listbuttons")) return;
        const group = document.createElement("section");
        group.className = "rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:p-5";
        heading.className = "mb-3 text-base font-extrabold text-slate-900";
        links.className = "grid gap-3 md:grid-cols-2";
        heading.before(group);
        group.append(heading, links);
      });
    }
  }
  document.querySelectorAll(".leftlinks a").forEach(link => {
    const href = (link.getAttribute("href") || "").toLowerCase();
    if (href === file) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });
})();
