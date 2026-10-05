import { chromium } from "playwright-core";
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const browser = await chromium.launch({
  executablePath: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  headless: true,
});
const axeSource = readFileSync(path.join(root, "node_modules", "axe-core", "axe.min.js"), "utf8");
const allSlugs = readdirSync(path.join(root, "content", "legacy-pages"))
  .filter((file) => file.endsWith(".html") && file !== "index.html")
  .map((file) => file.replace(/\.html$/, ""));
const slugs = process.argv.length > 2 ? process.argv.slice(2) : allSlugs;

const failures = [];
const queue = [...slugs];
await Promise.all(Array.from({ length: 8 }, async () => {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  for (let slug = queue.shift(); slug; slug = queue.shift()) {
    await page.goto(`http://localhost:3000/${slug}`, { waitUntil: "domcontentloaded" });
    await page.addScriptTag({ content: axeSource });
    const result = await page.evaluate(async () => {
      const audit = await globalThis.axe.run(document, { runOnly: { type: "rule", values: ["color-contrast"] } });
      return audit.violations.flatMap((violation) => violation.nodes.map((node) => ({
        impact: violation.impact,
        target: node.target.join(" "),
        summary: node.failureSummary,
      })));
    });
    if (result.length) failures.push({ slug, issues: result });
  }
  await page.close();
}));

await browser.close();
const patterns = new Map();
for (const failure of failures) {
  for (const issue of failure.issues) {
    const entry = patterns.get(issue.target) || { count: 0, pages: [] };
    entry.count++;
    if (entry.pages.length < 5) entry.pages.push(failure.slug);
    patterns.set(issue.target, entry);
  }
}
const topPatterns = [...patterns.entries()].sort((a, b) => b[1].count - a[1].count).slice(0, 40)
  .map(([target, value]) => ({ target, ...value }));
console.log(JSON.stringify({ pages: slugs.length, failingPages: failures.length, totalIssues: failures.reduce((sum, page) => sum + page.issues.length, 0), topPatterns, ...(process.argv.length > 2 ? { failures } : {}) }, null, 2));
