const puppeteer = require("puppeteer-core");
const path = require("path");

const PORT = 4195;
const EDGE = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const OUT = "C:\\Users\\abuba\\.gemini\\antigravity\\brain\\40660eb6-75e5-485a-826e-489fc59dd77c";

(async () => {
  const browser = await puppeteer.launch({
    executablePath: EDGE,
    headless: true,
    args: ["--no-sandbox", "--disable-gpu"],
  });
  try {
    const page = await browser.newPage();

    // 1. Matched User Ratio 1024x453
    await page.setViewport({ width: 1024, height: 453 });
    await page.goto(`http://localhost:${PORT}/`, { waitUntil: "domcontentloaded" });
    await page.waitForFunction(() => !document.querySelector('.editorial-preloader'), { timeout: 15000 });
    await new Promise(r => setTimeout(r, 2000));
    await page.screenshot({ path: path.join(OUT, "hero_matched_latest_1024.png") });
    console.log("Matched 1024x453 OK");

    // 2. Desktop 1440x900
    await page.setViewport({ width: 1440, height: 900 });
    await new Promise(r => setTimeout(r, 1200));
    await page.screenshot({ path: path.join(OUT, "hero_matched_latest_desktop.png") });
    console.log("Desktop 1440x900 OK");

    // 3. Mobile 390x844
    await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
    await page.goto(`http://localhost:${PORT}/`, { waitUntil: "domcontentloaded" });
    await page.waitForFunction(() => !document.querySelector('.editorial-preloader'), { timeout: 15000 });
    await new Promise(r => setTimeout(r, 1500));
    await page.screenshot({ path: path.join(OUT, "hero_matched_latest_mobile.png") });
    console.log("Mobile OK");
  } catch (err) {
    console.error("Snap error:", err);
  } finally {
    await browser.close();
  }
})();

