(function () {
  const file = (location.pathname.split("/").pop() || "").toLowerCase();
  if (file !== "report-of-external-peer-team-review.html") return;
  const main = document.querySelector(".legacy-page-content");
  const source = main?.querySelector(".rightsect-contentxx");
  if (!main || !source) return;

  const years = [...source.querySelectorAll("li a")].map(link => ({
    label: link.textContent.trim(),
    href: link.getAttribute("href") || "#"
  }));
  main.innerHTML = `
    <section class="peer-review">
      <div class="peer-review__intro">
        <div><span>Quality assurance</span><h2>External Peer Team review reports</h2></div>
        <p>Independent academic review supports transparent evaluation, institutional learning and continuous improvement.</p>
      </div>
      <div class="peer-review__grid">
        ${years.map((year, index) => {
          const available = year.href !== "#";
          return `<article class="peer-year ${available ? "is-available" : "is-pending"}">
            <span class="peer-year__number">${String(index + 1).padStart(2, "0")}</span>
            <div><span class="peer-year__status">${available ? "Report available" : "Awaiting publication"}</span><h3>${year.label}</h3><p>${available ? "Open the locally archived peer-team review report." : "The college has not published a report for this academic year."}</p></div>
            ${available ? `<a href="${year.href}" target="_blank">Open PDF <span aria-hidden="true">↗</span></a>` : `<span class="peer-year__disabled">Not available</span>`}
          </article>`;
        }).join("")}
      </div>
      <a class="peer-review__back" href="ugc-compliance.html">← Return to UGC Compliance</a>
    </section>`;
})();
