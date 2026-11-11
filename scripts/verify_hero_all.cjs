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

    // Helper function to capture screenshot of hero
    async function capture(width, height, isMobile, name) {
      await page.setViewport({ width, height, isMobile, hasTouch: isMobile });
      await page.goto(`http://localhost:${PORT}/`, { waitUntil: "domcontentloaded" });
      try {
        await page.waitForFunction(() => !document.querySelector('.editorial-preloader'), { timeout: 8000 });
      } catch {}
      await new Promise(r => setTimeout(r, 1200));
      
      const outPath = path.join(OUT, `hero_test_${name}.png`);
      await page.screenshot({ path: outPath });
      console.log(`Saved ${name}: ${width}x${height} -> ${outPath}`);
    }

    // 1. Desktop
    await capture(1440, 900, false, "desktop_1440");
    await capture(1200, 800, false, "desktop_1200");

    // 2. Tablet
    await capture(768, 1024, false, "tablet_768");

    // 3. Mobile Viewports explicitly requested
    await capture(430, 932, true, "mobile_430");
    await capture(414, 896, true, "mobile_414");
    await capture(390, 844, true, "mobile_390");
    await capture(375, 667, true, "mobile_375");
    await capture(360, 780, true, "mobile_360");
    await capture(320, 568, true, "mobile_320");

    console.log("ALL HERO CAPTURES COMPLETED SUCCESSFULLY!");
  } catch (err) {
    console.error("Verification error:", err);
  } finally {
    await browser.close();
  }
})();
