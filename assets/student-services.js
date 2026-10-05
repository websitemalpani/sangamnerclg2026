(function () {
  const file = (location.pathname.split("/").pop() || "").toLowerCase();
  const main = document.querySelector(".legacy-page-content");
  if (!main || !["news-and-events.html", "campus.html", "application.html", "students-corner.html"].includes(file)) return;
  document.body.classList.add("student-service-page", `student-service-page--${file.replace(/\..+$/, "")}`);

  const svg = path => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${path}</svg>`;
  const icons = {
    bell: svg('<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>'),
    arrow: svg('<path d="M5 12h14m-5-5 5 5-5 5"/>'),
    people: svg('<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8M22 21v-2a4 4 0 0 0-3-3.87"/>'),
    star: svg('<path d="m12 2 3 6 7 .9-5 4.8 1.3 6.8L12 17l-6.3 3.5L7 13.7 2 8.9 9 8z"/>'),
    book: svg('<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V4H6.5A2.5 2.5 0 0 0 4 6.5z"/><path d="M4 6.5v13A2.5 2.5 0 0 0 6.5 22H20"/>'),
    shield: svg('<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/>'),
    form: svg('<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h6"/>'),
    phone: svg('<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.4 1.8.6 2.8.7a2 2 0 0 1 1.7 2.1z"/>')
  };

  const intro = (eyebrow, title, text, extra = "") => `<section class="ss-intro"><div><span>${eyebrow}</span><h2>${title}</h2><p>${text}</p></div>${extra}</section>`;

  if (file === "news-and-events.html") {
    const list = main.querySelector("#UserModalContent");
    main.innerHTML = intro("Stay informed", "News that keeps you connected.", "Official notices, circulars, deadlines and college updates—organised in one clear place.", `<span class="ss-intro__icon">${icons.bell}</span>`) + `
      <section class="news-hub"><div class="ss-heading"><div><span>Latest updates</span><h2>Notices & Circulars</h2></div><p>New announcements appear here when they are published.</p></div><div class="news-feed"></div></section>`;
    if (list) main.querySelector(".news-feed").appendChild(list);
    const decorate = () => list?.querySelectorAll(":scope > li").forEach((item, index) => {
      item.classList.add("news-item");
      if (!item.querySelector(".news-item__number")) item.insertAdjacentHTML("afterbegin", `<span class="news-item__number">${String(index + 1).padStart(2, "0")}</span>`);
      const link = item.querySelector("a");
      if (link && !link.querySelector(".news-item__arrow")) link.insertAdjacentHTML("beforeend", `<span class="news-item__arrow">↗</span>`);
    });
    decorate();
    if (list) new MutationObserver(decorate).observe(list, { childList: true });
  }

  if (file === "campus.html") {
    const notices = [...main.querySelectorAll(".newsrightsect li a")];
    const photos = ["/media/images/gallery/gallery1.jpg", "/media/images/gallery/gallery4.jpg", "/media/images/gallery/gallery10.jpg"];
    main.innerHTML = intro("Life at Sangamner", "A campus designed around possibility.", "Green spaces, learning facilities and an active community come together to create a welcoming place to study and grow.", `<a class="ss-intro__button" href="photo-gallery.html">Explore photo gallery ${icons.arrow}</a>`) + `
      <section class="campus-showcase">${photos.map((src, i) => `<figure class="campus-showcase__photo campus-showcase__photo--${i + 1}"><img src="${src}" alt="Sangamner College campus" loading="lazy"><figcaption>${["A green learning environment","Spaces for discovery","A connected community"][i]}</figcaption></figure>`).join("")}</section>
      <section class="campus-paths"><a href="library.html">${icons.book}<span><strong>Library</strong><small>Knowledge and digital resources</small></span></a><a href="photo-gallery.html">${icons.star}<span><strong>Campus Gallery</strong><small>Explore college facilities</small></span></a><a href="students-corner.html">${icons.people}<span><strong>Student Life</strong><small>Activities and opportunities</small></span></a></section>
      <section class="campus-updates"><div class="ss-heading"><div><span>Campus bulletin</span><h2>Updates and useful links</h2></div></div><ul>${notices.map(link => `<li><a href="${link.getAttribute("href")}"${link.target ? ' target="_blank"' : ""}><span>${link.textContent.trim()}</span><b>↗</b></a></li>`).join("")}</ul></section>`;
  }

  if (file === "students-corner.html") {
    const links = [...main.querySelectorAll(".listbuttons li a")];
    const meta = [
      ["Student Development", "Leadership, welfare and development initiatives", icons.people],
      ["National Cadet Corps", "Discipline, leadership and community service", icons.shield],
      ["National Service Scheme", "Learn through meaningful social action", icons.star],
      ["Earn & Learn", "Supportive work and learning opportunities", icons.book],
      ["Cultural Forum", "Creativity, expression and campus culture", icons.star],
      ["Reservation Grievance Cell", "Support, representation and redressal", icons.shield]
    ];
    main.innerHTML = intro("Your college experience", "Learn beyond the classroom.", "Discover programs, communities and support systems that help every student participate, contribute and thrive.", `<a class="ss-intro__button" href="contact.html">Need guidance? ${icons.arrow}</a>`) + `
      <section class="student-opportunities"><div class="ss-heading"><div><span>Explore student life</span><h2>Find your community</h2></div><p>Activities and support for personal growth, leadership and wellbeing.</p></div><div class="student-card-grid">${links.map((link, i) => {
        const [title, text, icon] = meta[i] || [link.textContent.trim(), "Open this student resource", icons.people];
        return `<a class="student-card student-card--${i + 1}" href="${link.getAttribute("href")}"${link.target ? ' target="_blank"' : ""}><span class="student-card__icon">${icon}</span><span><strong>${title}</strong><small>${text}</small></span><b>↗</b></a>`;
      }).join("")}</div></section>`;
  }

  if (file === "application.html") {
    const form = main.querySelector("#search_form");
    const updates = main.querySelector("#OA");
    const applyLink = main.querySelector("a.flashing");
    main.innerHTML = intro("Admissions 2026–27", "Start your Sangamner journey.", "Explore programs, understand the admission process and complete your online application with support whenever you need it.", `<a class="ss-intro__button ss-intro__button--bright" href="${applyLink?.getAttribute("href") || "#"}" target="_blank">Apply online ${icons.arrow}</a>`) + `
      <section class="admission-steps"><article><span>01</span>${icons.book}<h3>Explore programs</h3><p>Review available courses and choose the right academic pathway.</p><a href="/media/pdf/new/Courses-Offered.pdf" target="_blank">View courses ↗</a></article><article><span>02</span>${icons.form}<h3>Understand the process</h3><p>Check the required steps and prepare your admission information.</p><a href="/media/pdf/new/Admission-Procedure.pdf" target="_blank">Admission procedure ↗</a></article><article><span>03</span>${icons.star}<h3>Apply online</h3><p>Complete your application using the official admissions portal.</p><a href="${applyLink?.getAttribute("href") || "#"}" target="_blank">Begin application ↗</a></article></section>
      <section class="admission-layout"><div class="admission-main"><div class="ss-heading"><div><span>Applicant services</span><h2>Admission updates</h2></div></div><div class="admission-updates"></div><div class="eligibility-panel"><div class="ss-heading"><div><span>Eligibility assistance</span><h2>Check your eligibility</h2></div></div><p>Enter your date of birth and Aadhaar number exactly as submitted in your application.</p></div></div><aside class="admission-help"><span class="admission-help__icon">${icons.phone}</span><h2>Admission helpline</h2><p>Monday to Saturday<br>9:30 AM–5:30 PM</p><a href="tel:+917620111689"><span>Smt. Janisha Abhale</span><strong>+91 76201 11689</strong></a><a href="tel:+918806519740"><span>Shri. Dadasaheb Wale</span><strong>+91 88065 19740</strong></a><hr><a href="tel:02425225893"><span>College office</span><strong>(02425) 225893</strong></a><a href="mailto:info@sangamnercollege.edu.in"><span>Email support</span><strong>info@sangamnercollege.edu.in</strong></a></aside></section>`;
    if (updates) main.querySelector(".admission-updates").appendChild(updates);
    if (form) main.querySelector(".eligibility-panel").appendChild(form);
  }
})();
