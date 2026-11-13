import { spawn } from "node:child_process";
import { mkdir } from "node:fs/promises";
import http from "node:http";
import path from "node:path";
import { chromium } from "playwright";

const ORIGIN = "http://localhost:3000";
const STUDIO = `${ORIGIN}/dev/mockups`;
const PROJECTS_ROOT = path.join(process.cwd(), "public/images/projects");
const SERVICES_ROOT = path.join(process.cwd(), "public/images/services");

function isUp() {
  return new Promise((resolve) => {
    const req = http.get(ORIGIN, (res) => {
      res.resume();
      resolve(true);
    });
    req.on("error", () => resolve(false));
    req.setTimeout(1500, () => {
      req.destroy();
      resolve(false);
    });
  });
}

async function waitForServer(timeoutMs = 90_000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    if (await isUp()) return;
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  throw new Error("Dev server did not start on localhost:3000");
}

async function ensureServer() {
  if (await isUp()) return null;
  const child = spawn("npm", ["run", "dev"], {
    cwd: process.cwd(),
    stdio: "inherit",
    shell: true,
  });
  await waitForServer();
  return child;
}

async function launchBrowser() {
  try {
    return await chromium.launch();
  } catch {
    return await chromium.launch({
      executablePath: "/usr/bin/google-chrome",
      args: ["--no-sandbox", "--disable-dev-shm-usage"],
    });
  }
}

async function main() {
  const started = await ensureServer();
  const browser = await launchBrowser();
  const page = await browser.newPage({
    viewport: { width: 1720, height: 1100 },
    deviceScaleFactor: 2,
  });

  await page.addInitScript(() => {
    sessionStorage.setItem("sct-loader-seen", "done");
  });
  await page.goto(STUDIO, { waitUntil: "networkidle", timeout: 120_000 });
  await page.addStyleTag({
    content: `
      header, footer, .skip-to-content { display: none !important; }
      body > * { }
      [class*="fixed"] { visibility: hidden !important; }
      [id^="mockup-"], [id^="mockup-"] * { visibility: visible !important; }
    `,
  });
  await page.waitForSelector('[id^="mockup-"]');

  const ids = await page.$$eval('[id^="mockup-"]', (nodes) => nodes.map((node) => node.id));
  const only = process.argv.slice(2);
  const written = [];

  for (const id of ids) {
    const match = id.match(/^mockup-(.+)-(\d+)$/);
    if (!match) continue;
    const [, slug, n] = match;
    if (only.length && !only.includes(slug)) continue;
    const isService = slug.startsWith("service-");
    const folder = isService ? slug.slice("service-".length) : slug;
    const dir = path.join(isService ? SERVICES_ROOT : PROJECTS_ROOT, folder);
    await mkdir(dir, { recursive: true });
    const filePath = path.join(dir, `ui-${n}.png`);
    const locator = page.locator(`[id="${id}"]`);
    await locator.scrollIntoViewIfNeeded();
    await locator.screenshot({ path: filePath, type: "png", animations: "disabled" });
    written.push(filePath);
    console.log(filePath);
  }

  await browser.close();
  if (started) started.kill("SIGTERM");
  if (written.length === 0) {
    throw new Error("No mockup frames were exported.");
  }
  console.log(`\nWrote ${written.length} PNGs.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
