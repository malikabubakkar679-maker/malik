const puppeteer = require("puppeteer-core");
const path = require("path");

const PORT = 4196;
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
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(`http://localhost:${PORT}/`, { waitUntil: "domcontentloaded" });
    try {
      await page.waitForFunction(() => !document.querySelector('.editorial-preloader'), { timeout: 8000 });
    } catch {}
    await new Promise(r => setTimeout(r, 1500));

    const viewports = [
      { width: 1440, height: 900, isMobile: false, name: "desktop_1440" },
      { width: 1200, height: 800, isMobile: false, name: "desktop_1200" },
      { width: 768, height: 1024, isMobile: false, name: "tablet_768" },
      { width: 430, height: 932, isMobile: true, name: "mobile_430" },
      { width: 414, height: 896, isMobile: true, name: "mobile_414" },
      { width: 390, height: 844, isMobile: true, name: "mobile_390" },
      { width: 375, height: 667, isMobile: true, name: "mobile_375" },
      { width: 360, height: 780, isMobile: true, name: "mobile_360" },
      { width: 320, height: 568, isMobile: true, name: "mobile_320" },
    ];

    for (const vp of viewports) {
      await page.setViewport({ width: vp.width, height: vp.height, isMobile: vp.isMobile, hasTouch: vp.isMobile });
      try {
        await page.waitForFunction(() => !document.querySelector('.editorial-preloader'), { timeout: 6000 });
      } catch {}
      await new Promise(r => setTimeout(r, 600));
      const outPath = path.join(OUT, `hero_test_${vp.name}.png`);
      await page.screenshot({ path: outPath });
      console.log(`Saved ${vp.name}: ${vp.width}x${vp.height} -> ${outPath}`);
    }

    console.log("ALL HERO CAPTURES COMPLETED SUCCESSFULLY!");
  } catch (err) {
    console.error("Verification error:", err);
  } finally {
    await browser.close();
  }
})();
