import { chromium } from "playwright-core";
import { readdirSync } from "node:fs";
import path from "node:path";

const browser = await chromium.launch({ executablePath: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe", headless: true });
const slugs = readdirSync(path.join(process.cwd(), "content", "legacy-pages"))
  .filter((file) => file.endsWith(".html") && file !== "index.html")
  .map((file) => file.replace(/\.html$/, ""));
const queue = [...slugs];
const failures = [];

await Promise.all(Array.from({ length: 8 }, async () => {
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  for (let slug = queue.shift(); slug; slug = queue.shift()) {
    await page.goto(`http://localhost:3000/${slug}`, { waitUntil: "domcontentloaded" });
    const issues = await page.evaluate(() => {
      const parse = (value) => (value.match(/[\d.]+/g) || []).map(Number);
      const elements = [...document.querySelectorAll(".legacy-page *")];
      return elements.flatMap((element) => {
        if (!element.textContent?.trim() || element.children.length || element.getClientRects().length === 0) return [];
        const style = getComputedStyle(element);
        if (style.visibility === "hidden" || style.display === "none" || Number(style.opacity) === 0) return [];
        const foreground = parse(style.color);
        let background = [0, 0, 0, 0];
        for (let node = element; node; node = node.parentElement) {
          const candidate = parse(getComputedStyle(node).backgroundColor);
          if ((candidate[3] ?? 1) > 0.9) { background = candidate; break; }
        }
        if (foreground.length < 3 || background.length < 3) return [];
        const distance = Math.abs(foreground[0] - background[0]) + Math.abs(foreground[1] - background[1]) + Math.abs(foreground[2] - background[2]);
        return distance < 18 ? [{ text: element.textContent.trim().slice(0, 50), className: element.className, color: style.color, background: background.slice(0, 3).join(",") }] : [];
      });
    });
    if (issues.length) failures.push({ slug, issues });
  }
  await page.close();
}));

await browser.close();
console.log(JSON.stringify({ pages: slugs.length, failingPages: failures.length, totalIssues: failures.reduce((sum, item) => sum + item.issues.length, 0), failures: failures.slice(0, 30) }, null, 2));
