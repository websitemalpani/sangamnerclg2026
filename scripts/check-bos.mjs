import { chromium } from "playwright-core";

const browser = await chromium.launch({ executablePath: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe", headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
await page.goto("http://localhost:3000/autonomous-bos", { waitUntil: "networkidle" });
const result = await page.evaluate(() => {
  const groups = [...document.querySelectorAll(".bos-group")];
  return {
    groups: groups.length,
    subjects: document.querySelectorAll(".bos-subjects a").length,
    firstBackground: groups[0] ? getComputedStyle(groups[0]).backgroundColor : null,
    gridColumns: getComputedStyle(document.querySelector(".bos-grid")).gridTemplateColumns,
  };
});
await browser.close();
console.log(JSON.stringify(result));
