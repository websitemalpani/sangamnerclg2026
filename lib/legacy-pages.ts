import "server-only";

import * as cheerio from "cheerio";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";

const contentDirectory = path.join(process.cwd(), "content", "legacy-pages");
const virtualAdministrationStaffSlugs = [
  "administration-grantable-non-teaching-staff",
  "administration-non-grantable-non-teaching-staff",
] as const;
// Legacy page CSS: base/ is linked by every page, sections/ is added per page below.
const styleHrefPrefix = "styles/legacy-pages";
const styleDirectory = path.join(process.cwd(), "styles", "legacy-pages");

export type LegacyPage = { slug: string; title: string; description: string; html: string; css: string };

export function getLegacySlugs() {
  if (!existsSync(contentDirectory)) return [];
  return [...readdirSync(contentDirectory)
    .filter((file) => file.toLowerCase().endsWith(".html") && file.toLowerCase() !== "index.html")
    .map((file) => file.replace(/\.html$/i, ""))
    , ...virtualAdministrationStaffSlugs]
    .filter((slug, index, all) => all.indexOf(slug) === index)
    .sort();
}

export function getLegacyPage(slug: string): LegacyPage | null {
  if (!/^[a-zA-Z0-9-]+$/.test(slug)) return null;
  const filename = path.join(contentDirectory, `${slug}.html`);
  if (!existsSync(filename)) return getVirtualAdministrationStaffPage(slug);

  const $ = cheerio.load(readFileSync(filename, "utf8"), { xml: false });
  const title = cleanText($("title").first().text()) || titleFromSlug(slug);
  const description = cleanText($("meta[name='description']").attr("content") || "") || `${title} at Sangamner College.`;

  $("script, noscript").remove();
  $(".site-utility, .site-footer, .toplinks, .toplogosect, .topbluesect, body > nav.navbar, body > footer, body > .copyright").remove();
  $("a[href]").each((_, element) => {
    const anchor = $(element);
    const href = anchor.attr("href");
    if (href) anchor.attr("href", normalizeInternalLink(href));
  });
  $("img").each((_, element) => {
    const image = $(element);
    const src = image.attr("src");
    if (src && !/^(https?:|data:)/i.test(src)) image.attr("src", encodeInternalPath(src));
    if (!image.attr("loading")) image.attr("loading", "lazy");
    if (!image.attr("alt")) image.attr("alt", "Sangamner College");
  });

  // The shared page hero owns the document's single H1. Imported page titles become H2s.
  $("h1").each((_, element) => {
    const heading = $(element);
    const attributes = Object.entries(element.attribs || {}).map(([key, value]) => `${key}="${value.replaceAll('"', "&quot;")}"`).join(" ");
    heading.replaceWith(`<h2${attributes ? ` ${attributes}` : ""}>${heading.html() || ""}</h2>`);
  });

  if (slug === "autonomous-bos") transformBoardOfStudies($);
  if (usesBosResponsiveTable(slug)) transformBosTable($);
  if (slug === "administration") transformAdministration($);
  if (slug === "administration-office-bearers") transformOfficeBearers($);
  if (isAdministrationSuitePage(slug)) addAdministrationTabs($, slug);
  if (slug === "contact") transformContact($);
  if (slug === "application" || slug === "scholarships-for-students") transformEligibilitySearch($, slug);
  if (slug === "alumni") transformAlumniForm($);
  if (slug === "news-and-events") transformNewsAndEvents($);
  if (slug === "iqac") transformIqac($);
  if (slug === "aqar-reports" || slug === "policies-and-procedures") transformIqacResourcePage($, slug);
  if (usesFacultyResponsiveTable(slug)) transformFacultyTables($);
  const hasDepartmentSuite = transformDepartmentSuite($);
  const hasIqacNavigation = transformIqacNavigation($);
  const hasLibrarySubpage = usesLibrarySubpage(slug) ? transformLibrarySubpage($) : false;

  const linkedStyles = $("link[rel='stylesheet']").map((_, element) => $(element).attr("href")).get()
    .filter((href): href is string => Boolean(href && href.startsWith(`${styleHrefPrefix}/`) && href.endsWith(".css")))
    .map((href) => scopeLegacyCss(readStyle(href.slice(styleHrefPrefix.length + 1))));
  const inlineStyles = $("head style").map((_, element) => $(element).html() || "").get();
  if (slug === "autonomous-bos") linkedStyles.push(scopeLegacyCss(readStyle("sections/autonomy-suite.css")));
  if (usesBosResponsiveTable(slug)) linkedStyles.push(readStyle("sections/bos-responsive.css"));
  if (usesFacultyResponsiveTable(slug)) linkedStyles.push(readStyle("sections/faculty-table.css"));
  if (hasDepartmentSuite) linkedStyles.push(readStyle("sections/department-suite.css"));
  if (slug === "iqac") linkedStyles.push(readStyle("sections/iqac-creative.css"));
  if (slug === "aqar-reports" || slug === "policies-and-procedures") linkedStyles.push(readStyle("sections/iqac-resources.css"));
  if (hasIqacNavigation) linkedStyles.push(readStyle("sections/iqac-nav.css"));
  if (hasIqacNavigation === "suite") linkedStyles.push(readStyle("sections/iqac-inner-pages.css"));
  if (hasLibrarySubpage) linkedStyles.push(readStyle("sections/library-responsive.css"));
  if (slug === "contact") linkedStyles.push(readStyle("sections/contact-creative.css"));
  const libraryRoot = $(".library-suite-layout").first();
  const main = $("body main").first();
  const html = libraryRoot.length ? $.html(libraryRoot) : main.length ? $.html(main) : ($("body").html() || "");

  return { slug, title, description, html, css: [...linkedStyles, ...inlineStyles].join("\n") };
}

function normalizeInternalLink(href: string) {
  if (/^(https?:|mailto:|tel:|#|javascript:)/i.test(href)) return href;
  const hashAt = href.indexOf("#");
  const pathname = hashAt >= 0 ? href.slice(0, hashAt) : href;
  const hash = hashAt >= 0 ? href.slice(hashAt) : "";
  const legacyPdfPaths: Record<string, string> = {
    "iqac/AQAR 2019-20 as uploaded.pdf": "pdf/iqac/aqar/AQAR 2019-20 as uploaded.pdf",
    "iqac/sangamnercollegeaqar1819.pdf": "pdf/iqac/aqar/sangamnercollegeaqar1819.pdf",
    "iqac/sangamnercollegeaqar1718.pdf": "pdf/iqac/aqar/sangamnercollegeaqar1718.pdf",
    "iqac/sangamnercollegeaqar1617.pdf": "pdf/iqac/aqar/sangamnercollegeaqar1617.pdf",
  };
  const cleanPath = (legacyPdfPaths[pathname.replace(/^\.\//, "")] || pathname).replace(/^\.\//, "").replace(/\.html$/i, "");
  const normalized = cleanPath === "index" ? "/" : cleanPath.startsWith("/") ? cleanPath : `/${cleanPath}`;
  return `${encodeInternalPath(normalized)}${hash}`;
}

function encodeInternalPath(value: string) {
  const [pathname, query = ""] = value.split("?", 2);
  const encoded = pathname.split("/").map((segment) => {
    try { return encodeURIComponent(decodeURIComponent(segment)); }
    catch { return encodeURIComponent(segment); }
  }).join("/");
  return query ? `${encoded}?${query}` : encoded;
}

function getVirtualAdministrationStaffPage(slug: string): LegacyPage | null {
  const page = slug === "administration-grantable-non-teaching-staff"
    ? { panel: "#panel-grantable-staff", title: "Grantable Non-Teaching Staff", count: "19 staff members" }
    : slug === "administration-non-grantable-non-teaching-staff"
      ? { panel: "#panel-non-grantable-staff", title: "Non Grantable Non-Teaching Staff", count: "76 staff members" }
      : null;
  if (!page) return null;

  const administrationFile = path.join(contentDirectory, "administration.html");
  if (!existsSync(administrationFile)) return null;
  const $ = cheerio.load(readFileSync(administrationFile, "utf8"), { xml: false });
  const section = $(page.panel).find("section").first();
  if (!section.length) return null;
  section.find(".hidden").remove();

  const sourceStyles = $("head style").map((_, style) => $(style).html() || "").get().join("\n");
  const html = `<main class="staff-directory mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10 py-8 sm:py-10"><section class="staff-directory__hero"><span>Administration directory</span><h2>${page.title}</h2><p>Official staff listing for Sangamner College.</p><strong>${page.count}</strong></section>${administrationTabs(slug)}<section class="staff-directory__table">${$.html(section)}</section></main>`;
  const css = `${sourceStyles}
.staff-directory{max-width:1320px}.staff-directory__hero{position:relative;overflow:hidden;margin-bottom:1rem;padding:1.5rem 1.75rem;border-radius:24px;background:linear-gradient(120deg,#111d45,#1f5cac);color:#fff;box-shadow:0 20px 38px -30px #111d45aa}.staff-directory__hero::after{content:"";position:absolute;right:-42px;top:-70px;width:190px;height:190px;border:32px solid #ffffff1c;border-radius:50%}.staff-directory__hero>*{position:relative;z-index:1}.staff-directory__hero span{display:block;color:#ffd84d;font-size:.72rem;font-weight:800;letter-spacing:.13em;text-transform:uppercase}.staff-directory__hero h2{margin:.35rem 0;font:800 clamp(1.45rem,3vw,2.25rem)/1.08 var(--font-display)}.staff-directory__hero p{margin:0;color:#ffffffc7}.staff-directory__hero strong{display:inline-block;margin-top:.85rem;padding:.35rem .7rem;border-radius:999px;background:#fff;color:#1f5cac;font-size:.78rem}.staff-directory__table{padding:1.25rem;border:1px solid #dbe3ef;border-radius:22px;background:#fff;box-shadow:0 18px 36px -34px #111d458f}.staff-directory__table section>div:first-child{margin-bottom:1rem!important}.staff-directory__table h2{margin:0!important;color:#111d45!important;font:800 1.3rem/1.2 var(--font-display)!important}.staff-directory__table .admin-data-table{max-width:100%;scrollbar-width:thin;scrollbar-color:#1f5cac #e8eef7}@media(max-width:700px){.staff-directory{padding-inline:1rem!important}.staff-directory__hero{padding:1.25rem;border-radius:20px}.staff-directory__hero h2{font-size:1.45rem}.staff-directory__table{padding:1rem;border-radius:18px}.staff-directory__table .admin-data-table{margin-inline:-.1rem!important}.staff-directory__table .admin-data-table::after{content:"Swipe to view all columns";display:block;padding:.45rem .7rem;background:#edf3fa;color:#52677f;font-size:.72rem;font-weight:700}}
`;
  return { slug, title: `${page.title} | Sangamner College`, description: `${page.title} at Sangamner College.`, html, css };
}

function isAdministrationSuitePage(slug: string) {
  return slug === "administration" || slug === "administration-office-bearers";
}

function administrationTabs(activeSlug: string) {
  const links = [
    ["administration", "Academic"],
    ["administration-office-bearers", "Office Bearers"],
    ["administration-grantable-non-teaching-staff", "Grantable staff"],
    ["administration-non-grantable-non-teaching-staff", "Non-grantable staff"],
  ];
  return `<nav class="administration-tabs" aria-label="Administration pages">${links.map(([slug, label]) => `<a href="/${slug}"${slug === activeSlug ? ' aria-current="page"' : ""}>${label}</a>`).join("")}</nav>`;
}

function addAdministrationTabs($: cheerio.CheerioAPI, slug: string) {
  const tabs = administrationTabs(slug);
  if (slug === "administration") {
    $(".admin-page-directory").closest("section").first().replaceWith(tabs);
    return;
  }
  const intro = $(".office-intro").first();
  if (intro.length) intro.after(tabs);
}

function transformEligibilitySearch($: cheerio.CheerioAPI, slug: string) {
  const form = $("#search_form").first();
  if (!form.length) return;
  const isAdmission = slug === "application";
  form.replaceWith(`<div class="service-notice" role="note"><h3>${isAdmission ? "Admission eligibility assistance" : "Scholarship eligibility assistance"}</h3><p>For a secure eligibility check, please use the official student portal or contact the college help desk. Do not submit Aadhaar information on this page.</p><div class="service-notice__actions">${isAdmission ? '<a href="https://sangamnercollege.vriddhionline.com/OrganizationInfo_13InstructionForStudents_OCMS2.aspx" target="_blank" rel="noopener noreferrer">Open official admission portal</a>' : '<a href="https://mahadbt.maharashtra.gov.in/" target="_blank" rel="noopener noreferrer">Open MahaDBT scholarship portal</a>'}<a href="/contact">Contact the college</a></div></div>`);
}

function transformAlumniForm($: cheerio.CheerioAPI) {
  const form = $("#alumni_form").first();
  if (!form.length) return;
  form.replaceWith('<div class="service-notice" role="note"><h2>Alumni registration assistance</h2><p>The legacy registration form depended on a retired CAPTCHA service. Please contact the college while the secure replacement form is being prepared.</p><div class="service-notice__actions"><a href="mailto:info@sangamnercollege.edu.in?subject=Alumni%20registration">Email alumni registration</a><a href="/contact">Contact the college</a></div></div>');
}

function transformNewsAndEvents($: cheerio.CheerioAPI) {
  const list = $("#UserModalContent").first();
  if (!list.length || list.children().length) return;
  list.html('<li><a href="/application"><span>Admissions 2026-27 are open</span><span aria-hidden="true">→</span></a></li><li><a href="/pdf/campus/Information_broucher-26-27.pdf" target="_blank"><span>Information Brochure 2026-27</span><span aria-hidden="true">↗</span></a></li><li><a href="/examination"><span>Examination notices and results</span><span aria-hidden="true">→</span></a></li>');
}

function readStyle(relativePath: string) {
  const cssFile = path.join(styleDirectory, relativePath);
  if (!cssFile.startsWith(styleDirectory + path.sep) || !existsSync(cssFile)) return "";
  return readFileSync(cssFile, "utf8");
}

function scopeLegacyCss(css: string) {
  return css.replace(/@import\s+url\([^)]*\)[^;]*;/g, "").replaceAll("body.modern-page", ".legacy-page").replaceAll(":where(body.modern-page)", ":where(.legacy-page)");
}

function transformBoardOfStudies($: cheerio.CheerioAPI) {
  const themes = ["arts", "commerce", "science", "vocational", "management", "experiential"];
  const icons = [
    '<path d="M12 22a10 10 0 1 0 0-20 7 7 0 0 0 0 14h1.5a1.5 1.5 0 0 1 0 3H12"/><circle cx="8" cy="10" r=".5"/><circle cx="11" cy="7" r=".5"/><circle cx="15" cy="8" r=".5"/>',
    '<path d="M3 21h18M6 18V9m4 9V9m4 9V9m4 9V9M4 6l8-4 8 4v3H4z"/>',
    '<path d="M9 3h6m-5 0v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3M8 15h8"/>',
    '<path d="M14.7 6.3a4 4 0 0 0-5-5L7.5 3.5l3 3L12.7 4.3a2 2 0 0 1 2.5 2.5L13 9l3 3 2.2-2.2M3 21l6-6"/>',
    '<rect width="18" height="12" x="3" y="4" rx="2"/><path d="M8 20h8m-4-4v4"/>',
    '<path d="M12 2v20M2 12h20"/><circle cx="12" cy="12" r="7"/>',
  ];
  const groups = $("body main .space-y-8 > section").map((index, section) => {
    const heading = $(section).find("h2").first().text().trim();
    const links = $(section).find("a").map((_, anchor) => ({ href: $(anchor).attr("href") || "#", label: $(anchor).text().trim() })).get();
    if (!heading || !links.length) return "";
    const icon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[index] || icons[0]}</svg>`;
    return `<section class="bos-group bos-group--${themes[index] || "arts"}"><div class="bos-group__head"><div class="bos-group__identity"><span class="bos-group__icon">${icon}</span><h3>${heading}</h3></div><span class="bos-count">${links.length} ${links.length === 1 ? "board" : "boards"}</span></div><ul class="bos-subjects">${links.map((link) => `<li><a href="${normalizeInternalLink(link.href)}">${link.label}</a></li>`).join("")}</ul></section>`;
  }).get().join("");

  if (!groups) return;
  const main = $("body main").first();
  main.html(`<div class="bos-intro"><div><span class="bos-label">Academic curriculum bodies</span><h2>Boards of Studies</h2></div><p>Explore the discipline-based boards responsible for curriculum design, academic standards, learning outcomes and continuous program development.</p></div><div class="bos-grid">${groups}</div>`);
}

function transformAdministration($: cheerio.CheerioAPI) {
  const officeBearersFile = path.join(contentDirectory, "administration-office-bearers.html");
  if (!existsSync(officeBearersFile)) return;

  const profiles = cheerio.load(readFileSync(officeBearersFile, "utf8"));
  const responsibilities = new Map<string, string>();

  profiles(".office-profile").each((_, profile) => {
    const name = cleanText(profiles(profile).find("h3").first().text()).toLowerCase();
    const responsibilityItems = profiles(profile).find(".office-profile__responsibilities li");
    const items = responsibilityItems.map((__, item) =>
      `<li>${profiles(item).html() || ""}</li>`
    ).get().join("");
    if (name && items) responsibilities.set(name, `<details><summary><span>Responsibilities</span><small>${responsibilityItems.length} items</small></summary><ul>${items}</ul></details>`);
  });

  const table = $("#panel-office-bearers .admin-data-table table").first();
  if (!table.length || !responsibilities.size) return;

  table.find("thead tr").append("<th>Responsibilities</th>");
  table.find("tbody tr").each((_, row) => {
    const current = $(row);
    if (current.hasClass("group-row")) {
      current.find("td[colspan]").attr("colspan", "5");
      return;
    }

    const name = cleanText(current.find("strong").first().text()).toLowerCase();
    current.append(`<td class="admin-responsibilities">${responsibilities.get(name) || "<span>Responsibilities not listed.</span>"}</td>`);
  });
}

function transformOfficeBearers($: cheerio.CheerioAPI) {
  $(".office-profile__responsibilities").each((_, element) => {
    const responsibilities = $(element);
    const items = responsibilities.find("li");
    if (!items.length) return;
    responsibilities.replaceWith(`<details class="office-profile__details"><summary><span>Responsibilities</span><small>${items.length} points</small><b aria-hidden="true">+</b></summary><ul>${items.map((__, item) => `<li>${$(item).html() || ""}</li>`).get().join("")}</ul></details>`);
  });
}

function transformContact($: cheerio.CheerioAPI) {
  const main = $("body main").first();
  const sections = main.children("div");
  if (!main.length || sections.length < 2) return;
  main.addClass("contact-layout");
  sections.eq(0).addClass("contact-campus");
  sections.eq(1).addClass("contact-help");
  sections.eq(1).children("div").first().addClass("contact-grid");
}

function transformIqac($: cheerio.CheerioAPI) {
  const layout = $("body main > div").first();
  const nav = layout.children("nav").first();
  const article = layout.children("article").first();
  const content = article.children("div").first();
  if (!layout.length || !nav.length || !article.length || !content.length) return;

  layout.addClass("iqac-layout");
  nav.addClass("iqac-nav");
  article.addClass("iqac-content");
  content.addClass("iqac-sections");

  const firstHeading = content.children("h3").first();
  if (firstHeading.length) {
    const intro = firstHeading.prevAll().get().reverse();
    if (intro.length) $(intro).wrapAll('<section class="iqac-intro"></section>');
  }

  content.children("h3").each((index, heading) => {
    const sectionItems = [heading, ...$(heading).nextUntil("h3").get()];
    $(sectionItems).wrapAll(`<section class="iqac-section iqac-section--${index + 1}"></section>`);
  });
}

function transformIqacResourcePage($: cheerio.CheerioAPI, slug: string) {
  const layout = $("body main > div").first();
  const nav = layout.children("nav").first();
  const article = layout.children("article").first();
  if (!layout.length || !nav.length || !article.length) return;

  layout.addClass("iqac-resource-layout");
  nav.addClass("iqac-resource-nav");
  article.addClass(`iqac-resource-content iqac-resource-content--${slug}`);
  article.children("h1").first().addClass("iqac-resource-title");
  article.children("h2").first().addClass("iqac-resource-subtitle");

  const grid = article.children("div").first();
  grid.addClass("iqac-resource-grid");
  grid.children("div, a").addClass("iqac-resource-card");
}

function transformIqacNavigation($: cheerio.CheerioAPI) {
  const nav = $('nav[aria-label="IQAC section navigation"]').first();
  if (!nav.length) return false;
  nav.addClass("iqac-shared-nav");

  // The hub and resource pages have dedicated layouts. The remaining IQAC pages
  // share the classic navigation + article pattern, so turn that into one shell.
  if (nav.hasClass("iqac-nav") || nav.hasClass("iqac-resource-nav")) return true;
  const layout = nav.parent();
  const article = layout.children("article").first();
  if (!layout.length || !article.length) return true;
  layout.addClass("iqac-inner-layout");
  nav.addClass("iqac-inner-nav");
  article.addClass("iqac-inner-content");
  return "suite" as const;
}

function transformLibrarySubpage($: cheerio.CheerioAPI) {
  const labelledAside = $("aside").filter((_, element) => /Library Navigation|Library Menu/i.test($(element).text())).first();
  const aside = labelledAside.length ? labelledAside : $("aside.library-sidebar").first();
  if (aside.length) {
    const layout = aside.parent();
    layout.addClass("library-suite-layout");
    aside.addClass("library-suite-nav");
    aside.find('a[style*="ffffff"], a.bg-blue-700').each((_, link) => {
      $(link).removeAttr("style").addClass("library-active");
    });
    layout.children("main").first().addClass("library-suite-content");
    return true;
  }

  const legacyLayout = $(".container.subpage > .row").first();
  if (legacyLayout.length) {
    legacyLayout.addClass("library-suite-layout library-suite-layout--legacy");
    legacyLayout.find(".leftlinks").first().addClass("library-suite-nav");
    legacyLayout.find(".leftlinks a.active").addClass("library-active");
    legacyLayout.children().last().addClass("library-suite-content");
    return true;
  }
  return false;
}

function usesLibrarySubpage(slug: string) {
  return slug.startsWith("library-") || [
    "ebooks",
    "newspapers",
    "dictionaries-and-encyclopedia",
    "theses-and-dissertations",
    "institutional-repository",
  ].includes(slug);
}

function transformBosTable($: cheerio.CheerioAPI) {
  $("table").each((_, tableElement) => {
    const table = $(tableElement);
    const rows = table.find("tr");
    if (!rows.length) return;

    const staleWidthClasses = (table.attr("class") || "").split(/\s+/).filter((cls) => /^min-w-\[/.test(cls));
    table.addClass("bos-responsive-table").removeClass(staleWidthClasses.join(" "));
    table.parent().addClass("bos-responsive-wrap");

    const defaultLabels = ["Sr. No.", "Name", "Institution", "Address", "Email", "Contact"];
    let labels = [...defaultLabels];

    rows.each((index, rowElement) => {
      const row = $(rowElement);
      const cells = row.children("td, th");
      const text = cleanText(row.text());

      if (cells.length === 1) {
        cells.first().attr("colspan", String(labels.length));
        row.addClass(index < 2 ? "bos-responsive-title" : "bos-responsive-section");
        return;
      }

      if (/^Sr\.?\s*No/i.test(text)) {
        row.addClass("bos-responsive-header");
        return;
      }

      row.addClass("bos-responsive-member");
      cells.each((cellIndex, cell) => {
        $(cell).attr("data-label", labels[cellIndex] || defaultLabels[cellIndex] || `Column ${cellIndex + 1}`);
        if (cellIndex === 1) $(cell).addClass("bos-responsive-name");
        if (cellIndex === 4 && !$(cell).find("a").length) {
          const email = cleanText($(cell).text());
          if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) $(cell).html(`<a href="mailto:${email}">${email}</a>`);
        }
        if (cellIndex === 5) {
          const phone = cleanText($(cell).text()).replace(/\s+/g, "");
          if (/^\+?\d{10,13}$/.test(phone) && !$(cell).find("a").length) $(cell).html(`<a href="tel:${phone}">${phone}</a>`);
        }
      });
    });
  });
}

// Faculty tables: label every cell from the header row so phones can show each row as a card,
// and stretch single-cell group rows (e.g. "Department Nonteaching Staff") across all columns.
function transformFacultyTables($: cheerio.CheerioAPI) {
  $("table").each((_, tableElement) => {
    const table = $(tableElement);
    const header = table.find("tr").filter((_, row) => $(row).children("th").length > 1).first();
    const labels = header.children("th").map((_, th) => cleanText($(th).clone().find("br").replaceWith(" ").end().text())).get();
    if (!labels.some((label) => /name/i.test(label))) return;

    table.addClass("faculty-table");
    table.parent().addClass("faculty-table-wrap");
    header.addClass("faculty-table-head");
    header.children("th").removeAttr("width");

    table.find("tr").not(header).each((_, rowElement) => {
      const row = $(rowElement);
      const cells = row.children("td, th");
      if (cells.length === 1) {
        cells.first().attr("colspan", String(labels.length));
        row.addClass("faculty-table-group");
        return;
      }
      row.addClass("faculty-table-row");
      cells.each((index, cell) => { $(cell).attr("data-label", labels[index] || ""); });
    });
  });
}

// Department profile pages share a legacy structure. Adding stable, semantic hooks here
// lets one responsive treatment cover every subject profile and its related subpages.
function transformDepartmentSuite($: cheerio.CheerioAPI) {
  const nav = $('nav[aria-label="Department section navigation"]').first();
  if (!nav.length) return false;

  const main = $("body main").first();
  const layout = nav.parent();
  const banner = main.children("div").first();
  const article = layout.children("article").first();

  if (!main.length || !layout.length || !banner.length || !article.length) return false;

  main.addClass("department-suite");
  banner.addClass("department-suite__banner");
  layout.addClass("department-suite__layout");
  nav.addClass("department-suite__nav");
  article.addClass("department-suite__content");
  return true;
}

function usesFacultyResponsiveTable(slug: string) {
  return slug.endsWith("-faculty-profile");
}

function usesBosResponsiveTable(slug: string) {
  if (slug === "experiantial-learning-bos" || slug === "autonomous-finance-committee") return true;
  const prefixes = ["arts-", "commerce-", "science-", "bvoc-"];
  return prefixes.some((prefix) => slug.startsWith(prefix)) && slug.endsWith("-bos");
}

function cleanText(value: string) { return value.replace(/\s+/g, " ").trim(); }
function titleFromSlug(slug: string) { return slug.split("-").map((word) => word ? word[0].toUpperCase() + word.slice(1) : word).join(" "); }
