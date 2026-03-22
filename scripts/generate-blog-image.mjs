#!/usr/bin/env node
/**
 * Generates a blog cover image for QoreDB articles.
 * Usage: node generate-blog-image.mjs --title "Article Title" --subtitle "Short excerpt" --category "Security" --output "./output.png"
 */

import puppeteer from "puppeteer";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Parse CLI args
const args = process.argv.slice(2);
function getArg(name) {
  const idx = args.indexOf(`--${name}`);
  return idx !== -1 ? args[idx + 1] : null;
}

const title = getArg("title") || "Article Title";
const subtitle = getArg("subtitle") || "";
const category = getArg("category") || "Architecture";
const output = getArg("output") || "./blog-cover.png";

// Category color accents
const categoryColors = {
  Architecture: { accent: "#818cf8", bg2: "rgba(99, 102, 241, 0.15)" },
  Security: { accent: "#f472b6", bg2: "rgba(244, 114, 182, 0.15)" },
  "Open Source": { accent: "#34d399", bg2: "rgba(52, 211, 153, 0.15)" },
  Produit: { accent: "#60a5fa", bg2: "rgba(96, 165, 250, 0.15)" },
  Updates: { accent: "#fbbf24", bg2: "rgba(251, 191, 36, 0.15)" },
  Vision: { accent: "#a78bfa", bg2: "rgba(167, 139, 250, 0.15)" },
};

const colors = categoryColors[category] || categoryColors["Architecture"];

// Load logo as base64
const logoPath = resolve(__dirname, "../public/logo-white.png");
let logoBase64 = "";
try {
  const logoBuffer = readFileSync(logoPath);
  logoBase64 = `data:image/png;base64,${logoBuffer.toString("base64")}`;
} catch {
  console.warn("Logo not found, generating without it");
}

// Category icons (simple SVG icons)
const categoryIcons = {
  Architecture: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="${colors.accent}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><line x1="10" y1="6.5" x2="14" y2="6.5"/><line x1="6.5" y1="10" x2="6.5" y2="14"/><line x1="17.5" y1="10" x2="17.5" y2="14"/></svg>`,
  Security: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="${colors.accent}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  "Open Source": `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="${colors.accent}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
  Produit: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="${colors.accent}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
  Updates: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="${colors.accent}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/><polyline points="22 2 22 8 16 8"/></svg>`,
  Vision: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="${colors.accent}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`,
};

const icon = categoryIcons[category] || "";

// Adjust font size based on title length
let titleFontSize = "42px";
let titleLineHeight = "1.2";
if (title.length > 60) {
  titleFontSize = "34px";
  titleLineHeight = "1.25";
} else if (title.length > 40) {
  titleFontSize = "38px";
  titleLineHeight = "1.22";
}

const html = `<!DOCTYPE html>
<html>
<head>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

  body {
    width: 1200px;
    height: 630px;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    overflow: hidden;
  }

  .container {
    width: 1200px;
    height: 630px;
    background: linear-gradient(145deg, #0c0a1a 0%, #13102b 40%, #1a1540 70%, #0f0d20 100%);
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 60px 80px;
  }

  /* Subtle grid pattern */
  .container::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(129, 140, 248, 0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(129, 140, 248, 0.03) 1px, transparent 1px);
    background-size: 40px 40px;
  }

  /* Glow effect */
  .glow {
    position: absolute;
    width: 500px;
    height: 500px;
    border-radius: 50%;
    background: ${colors.accent};
    opacity: 0.06;
    filter: blur(120px);
    top: -100px;
    right: -100px;
  }

  .glow-2 {
    position: absolute;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: ${colors.accent};
    opacity: 0.04;
    filter: blur(80px);
    bottom: -50px;
    left: 100px;
  }

  .content {
    position: relative;
    z-index: 1;
    max-width: 900px;
  }

  .category-badge {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: ${colors.bg2};
    border: 1px solid ${colors.accent}33;
    border-radius: 8px;
    padding: 8px 18px;
    margin-bottom: 28px;
  }

  .category-text {
    font-size: 15px;
    font-weight: 600;
    color: ${colors.accent};
    text-transform: uppercase;
    letter-spacing: 1.5px;
  }

  .title {
    font-size: ${titleFontSize};
    font-weight: 800;
    color: #ffffff;
    line-height: ${titleLineHeight};
    margin-bottom: 20px;
    letter-spacing: -0.5px;
  }

  .subtitle {
    font-size: 18px;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.55);
    line-height: 1.5;
    max-width: 750px;
  }

  .logo {
    position: absolute;
    bottom: 40px;
    right: 50px;
    width: 48px;
    height: 48px;
    opacity: 0.35;
    z-index: 1;
  }

  /* Decorative line */
  .accent-line {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, ${colors.accent}, transparent);
  }
</style>
</head>
<body>
  <div class="container">
    <div class="glow"></div>
    <div class="glow-2"></div>
    <div class="content">
      <div class="category-badge">
        ${icon}
        <span class="category-text">${category}</span>
      </div>
      <h1 class="title">${title}</h1>
      ${subtitle ? `<p class="subtitle">${subtitle}</p>` : ""}
    </div>
    ${logoBase64 ? `<img class="logo" src="${logoBase64}" alt="QoreDB" />` : ""}
    <div class="accent-line"></div>
  </div>
</body>
</html>`;

async function generate() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 2 });
  await page.setContent(html, { waitUntil: "networkidle0" });
  await page.screenshot({ path: output, type: "png" });
  await browser.close();
  console.log(`Image generated: ${output}`);
}

generate().catch((err) => {
  console.error(err);
  process.exit(1);
});
