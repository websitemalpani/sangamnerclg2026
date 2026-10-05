import "server-only";

import * as cheerio from "cheerio";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";

const contentDirectory = path.join(process.cwd(), "content", "legacy-pages");
const assetDirectory = path.join(process.cwd(), "assets");

export type LegacyPage = { slug: string; title: string; description: string; html: string; css: string };

export function getLegacySlugs() {
  if (!existsSync(contentDirectory)) return [];
  return readdirSync(contentDirectory)
    .filter((file) => file.toLowerCase().endsWith(".html") && file.toLowerCase() !== "index.html")
    .map((file) => file.replace(/\.html$/i, ""))
    .sort();
}

export function getLegacyPage(slug: string): LegacyPage | null {
  if (!/^[a-zA-Z0-9-]+$/.test(slug)) return null;
  const filename = path.join(contentDirectory, `${slug}.html`);
  if (!existsSync(filename)) return null;

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
    if (!image.attr("loading")) image.attr("loading", "lazy");
    if (!image.attr("alt")) image.attr("alt", "Sangamner College");
  });

  if (slug === "autonomous-bos") transformBoardOfStudies($);
  if (usesBosResponsiveTable(slug)) transformBosTable($);
  if (slug === "administration") transformAdministration($);
  if (slug === "contact") transformContact($);
  if (slug === "iqac") transformIqac($);
  if (slug === "aqar-reports" || slug === "policies-and-procedures") transformIqacResourcePage($, slug);
  if (usesFacultyResponsiveTable(slug)) transformFacultyTables($);
  const hasIqacNavigation = transformIqacNavigation($);
  const hasLibrarySubpage = usesLibrarySubpage(slug) ? transformLibrarySubpage($) : false;

  const linkedStyles = $("link[rel='stylesheet']").map((_, element) => $(element).attr("href")).get()
    .filter((href): href is string => Boolean(href && href.startsWith("assets/") && href.endsWith(".css")))
    .map((href) => {
      const cssFile = path.join(assetDirectory, path.basename(href));
      return existsSync(cssFile) ? scopeLegacyCss(readFileSync(cssFile, "utf8")) : "";
    });
  const inlineStyles = $("head style").map((_, element) => $(element).html() || "").get();
  if (slug === "autonomous-bos") {
    const autonomyCss = path.join(assetDirectory, "autonomy-suite.css");
    if (existsSync(autonomyCss)) linkedStyles.push(scopeLegacyCss(readFileSync(autonomyCss, "utf8")));
  }
  if (usesBosResponsiveTable(slug)) {
    const responsiveBosCss = path.join(assetDirectory, "bos-responsive.css");
    if (existsSync(responsiveBosCss)) linkedStyles.push(readFileSync(responsiveBosCss, "utf8"));
  }
  if (usesFacultyResponsiveTable(slug)) {
    const facultyTableCss = path.join(assetDirectory, "faculty-table.css");
    if (existsSync(facultyTableCss)) linkedStyles.push(readFileSync(facultyTableCss, "utf8"));
  }
  if (slug === "iqac") {
    const iqacCss = path.join(assetDirectory, "iqac-creative.css");
    if (existsSync(iqacCss)) linkedStyles.push(readFileSync(iqacCss, "utf8"));
  }
  if (slug === "aqar-reports" || slug === "policies-and-procedures") {
    const iqacResourceCss = path.join(assetDirectory, "iqac-resources.css");
    if (existsSync(iqacResourceCss)) linkedStyles.push(readFileSync(iqacResourceCss, "utf8"));
  }
  if (hasIqacNavigation) {
    const iqacNavCss = path.join(assetDirectory, "iqac-nav.css");
    if (existsSync(iqacNavCss)) linkedStyles.push(readFileSync(iqacNavCss, "utf8"));
  }
  if (hasLibrarySubpage) {
    const libraryCss = path.join(assetDirectory, "library-responsive.css");
    if (existsSync(libraryCss)) linkedStyles.push(readFileSync(libraryCss, "utf8"));
  }
  if (slug === "contact") {
    const contactCss = path.join(assetDirectory, "contact-creative.css");
    if (existsSync(contactCss)) linkedStyles.push(readFileSync(contactCss, "utf8"));
  }
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
  const cleanPath = pathname.replace(/^\.\//, "").replace(/\.html$/i, "");
  const normalized = cleanPath === "index" ? "/" : cleanPath.startsWith("/") ? cleanPath : `/${cleanPath}`;
  return `${normalized}${hash}`;
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
  return true;
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
