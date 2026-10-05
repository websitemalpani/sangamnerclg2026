import { chromium } from "playwright-core";

const browser = await chromium.launch({ executablePath: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe", headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
await page.goto("http://localhost:3000/administration", { waitUntil: "domcontentloaded" });
await page.waitForFunction(() => document.querySelector("#tabbtn-academic")?.classList.contains("text-white"));
await page.click("#tabbtn-office-bearers");
const result = await page.evaluate(() => {
  const heading = document.querySelector("#admin-summary-heading");
  const principalCard = heading?.parentElement?.nextElementSibling;
  return {
    selected: document.querySelector("#tabbtn-office-bearers")?.getAttribute("aria-selected"),
    officeHidden: document.querySelector("#panel-office-bearers")?.classList.contains("hidden"),
    academicHidden: document.querySelector("#panel-academic")?.classList.contains("hidden"),
    principalBackground: principalCard ? getComputedStyle(principalCard).backgroundImage : null,
  };
});
await browser.close();
console.log(JSON.stringify(result));
