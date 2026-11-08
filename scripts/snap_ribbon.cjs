const puppeteer = require("puppeteer-core");
const path = require("path");

const PORT = 4195;
const EDGE = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const OUT = "C:\\Users\\abuba\\.gemini\\antigravity\\brain\\40660eb6-75e5-485a-826e-489fc59dd77c";

(async () => {
  const browser = await puppeteer.launch({
    executablePath: EDGE,
    headless: "new",
    args: ["--no-sandbox", "--enable-webgl", "--ignore-gpu-blocklist"],
  });
  try {
    // 1. Desktop 1440x900
    const page1 = await browser.newPage();
    await page1.setViewport({ width: 1440, height: 900 });
    await page1.goto(`http://localhost:${PORT}/`, { waitUntil: "domcontentloaded" });
    await new Promise((r) => setTimeout(r, 4500));

    await page1.evaluate(() => {
      const el = document.getElementById("work");
      if (el) el.scrollIntoView({ behavior: "instant" });
    });
    await new Promise((r) => setTimeout(r, 2000));

    await page1.screenshot({ path: path.join(OUT, "webgl_ribbon_desktop_v5.png") });
    console.log("Desktop Ribbon Captured OK");
    await page1.close();

    // 2. Mobile 390x844
    const page2 = await browser.newPage();
    await page2.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
    await page2.goto(`http://localhost:${PORT}/`, { waitUntil: "domcontentloaded" });
    await new Promise((r) => setTimeout(r, 4500));

    await page2.evaluate(() => {
      const el = document.getElementById("work");
      if (el) el.scrollIntoView({ behavior: "instant" });
    });
    await new Promise((r) => setTimeout(r, 2000));

    await page2.screenshot({ path: path.join(OUT, "webgl_ribbon_mobile_v5.png") });
    console.log("Mobile Ribbon Captured OK");
    await page2.close();
  } catch (err) {
    console.error("Ribbon snap error:", err);
  } finally {
    await browser.close();
  }
})();
