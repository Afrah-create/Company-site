import { mkdir } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const ROOT = path.join(process.cwd(), "public/images/projects");

const SITES = [
  {
    folder: "green-gold-perks",
    url: "https://www.greengoldperks.com/",
    scrollY: 1400,
  },
  {
    folder: "elroy-skilled-services",
    url: "https://elroyskilledservices.com/",
    scrollY: 1100,
  },
];

async function capture(page, dir, name) {
  const filePath = path.join(dir, name);
  await page.screenshot({ path: filePath, type: "png", animations: "disabled" });
  console.log(filePath);
}

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
  });

  for (const site of SITES) {
    const dir = path.join(ROOT, site.folder);
    await mkdir(dir, { recursive: true });
    await page.goto(site.url, { waitUntil: "domcontentloaded", timeout: 90_000 });
    await page.waitForTimeout(2500);
    await capture(page, dir, "hero.png");
    await capture(page, dir, "gallery-1.png");
    await page.evaluate((y) => window.scrollTo(0, y), site.scrollY);
    await page.waitForTimeout(800);
    await capture(page, dir, "gallery-2.png");
  }

  await browser.close();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
