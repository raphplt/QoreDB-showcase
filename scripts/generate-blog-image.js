#!/usr/bin/env node
/**
 * Generates a blog cover image for QoreDB articles and optionally uploads to Sanity.
 *
 * Usage:
 *   node generate-blog-image.js --title "Title" --subtitle "Excerpt" --category "Security" --output "./cover.png"
 *   node generate-blog-image.js --title "Title" --category "Security" --upload --post-id "abc123"
 *
 * Env:
 *   SANITY_TOKEN - API token with Editor role for image upload
 *   SANITY_PROJECT_ID - defaults to jnq6wixe
 *   SANITY_DATASET - defaults to production
 */

const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
const https = require("https");

// --- CLI args ---
const args = process.argv.slice(2);
function getArg(name) {
  const idx = args.indexOf(`--${name}`);
  return idx !== -1 ? args[idx + 1] : null;
}
const hasFlag = (name) => args.includes(`--${name}`);

const title = getArg("title") || "Article Title";
const subtitle = getArg("subtitle") || "";
const category = getArg("category") || "Architecture";
const output = getArg("output") || "/tmp/blog-cover.png";
const shouldUpload = hasFlag("upload");
const postId = getArg("post-id");

const SANITY_TOKEN = process.env.SANITY_TOKEN || "";
const PROJECT_ID = process.env.SANITY_PROJECT_ID || "jnq6wixe";
const DATASET = process.env.SANITY_DATASET || "production";

// --- Category styles ---
const categoryColors = {
  Architecture: { accent: "#818cf8", bg2: "rgba(99, 102, 241, 0.15)" },
  Security: { accent: "#f472b6", bg2: "rgba(244, 114, 182, 0.15)" },
  "Open Source": { accent: "#34d399", bg2: "rgba(52, 211, 153, 0.15)" },
  Produit: { accent: "#60a5fa", bg2: "rgba(96, 165, 250, 0.15)" },
  Updates: { accent: "#fbbf24", bg2: "rgba(251, 191, 36, 0.15)" },
  Vision: { accent: "#a78bfa", bg2: "rgba(167, 139, 250, 0.15)" },
};
const colors = categoryColors[category] || categoryColors["Architecture"];

// --- Logo ---
const logoPath = path.resolve(__dirname, "../public/logo-white.png");
let logoBase64 = "";
try {
  logoBase64 = `data:image/png;base64,${fs.readFileSync(logoPath).toString("base64")}`;
} catch {}

// --- Category icons ---
const icons = {
  Architecture: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${colors.accent}" stroke-width="1.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>`,
  Security: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${colors.accent}" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  "Open Source": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${colors.accent}" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
  Produit: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${colors.accent}" stroke-width="1.5"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
  Updates: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${colors.accent}" stroke-width="1.5"><path d="M21 12a9 9 0 1 1-6.219-8.56"/><polyline points="22 2 22 8 16 8"/></svg>`,
  Vision: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${colors.accent}" stroke-width="1.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`,
};
const icon = icons[category] || "";

let titleFontSize = "44px";
if (title.length > 65) titleFontSize = "34px";
else if (title.length > 45) titleFontSize = "38px";

// --- HTML template ---
const html = `<!DOCTYPE html>
<html><head>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { width: 1200px; height: 630px; font-family: 'Inter', sans-serif; overflow: hidden; }
  .c {
    width: 1200px; height: 630px;
    background: linear-gradient(145deg, #0c0a1a 0%, #13102b 40%, #1a1540 70%, #0f0d20 100%);
    position: relative; display: flex; flex-direction: column; justify-content: center;
    padding: 60px 80px;
  }
  .c::before {
    content: ''; position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(129,140,248,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(129,140,248,0.04) 1px, transparent 1px);
    background-size: 40px 40px;
  }
  .glow { position: absolute; width: 500px; height: 500px; border-radius: 50%;
    background: ${colors.accent}; opacity: 0.07; filter: blur(120px); top: -100px; right: -100px; }
  .glow2 { position: absolute; width: 300px; height: 300px; border-radius: 50%;
    background: ${colors.accent}; opacity: 0.04; filter: blur(80px); bottom: -50px; left: 100px; }
  .content { position: relative; z-index: 1; max-width: 920px; }
  .badge {
    display: inline-flex; align-items: center; gap: 10px;
    background: ${colors.bg2}; border: 1px solid ${colors.accent}33;
    border-radius: 8px; padding: 8px 18px; margin-bottom: 28px;
  }
  .badge span { font-size: 14px; font-weight: 600; color: ${colors.accent};
    text-transform: uppercase; letter-spacing: 1.5px; }
  .title { font-size: ${titleFontSize}; font-weight: 800; color: #fff;
    line-height: 1.2; margin-bottom: 20px; letter-spacing: -0.5px; }
  .sub { font-size: 18px; font-weight: 400; color: rgba(255,255,255,0.5);
    line-height: 1.5; max-width: 750px; }
  .logo { position: absolute; bottom: 40px; right: 50px; width: 48px; height: 48px; opacity: 0.3; z-index: 1; }
  .line { position: absolute; bottom: 0; left: 0; right: 0; height: 4px;
    background: linear-gradient(90deg, ${colors.accent}, transparent); }
</style></head>
<body>
  <div class="c">
    <div class="glow"></div><div class="glow2"></div>
    <div class="content">
      <div class="badge">${icon}<span>${category}</span></div>
      <h1 class="title">${title}</h1>
      ${subtitle ? `<p class="sub">${subtitle}</p>` : ""}
    </div>
    ${logoBase64 ? `<img class="logo" src="${logoBase64}" />` : ""}
    <div class="line"></div>
  </div>
</body></html>`;

// --- Sanity upload helpers ---
function uploadToSanity(filePath, filename) {
  return new Promise((resolve, reject) => {
    const data = fs.readFileSync(filePath);
    const url = `https://${PROJECT_ID}.api.sanity.io/v2024-01-24/assets/images/${DATASET}?filename=${encodeURIComponent(filename)}`;
    const parsed = new URL(url);

    const req = https.request(
      {
        hostname: parsed.hostname,
        path: parsed.pathname + parsed.search,
        method: "POST",
        headers: {
          Authorization: `Bearer ${SANITY_TOKEN}`,
          "Content-Type": "image/png",
          "Content-Length": data.length,
        },
      },
      (res) => {
        let body = "";
        res.on("data", (c) => (body += c));
        res.on("end", () => {
          try {
            const json = JSON.parse(body);
            if (json.document && json.document._id) {
              resolve(json.document);
            } else {
              reject(new Error(`Upload failed: ${body}`));
            }
          } catch (e) {
            reject(new Error(`Parse error: ${body}`));
          }
        });
      }
    );
    req.on("error", reject);
    req.write(data);
    req.end();
  });
}

function patchPost(postId, assetId) {
  return new Promise((resolve, reject) => {
    const mutations = [
      {
        patch: {
          id: postId,
          set: {
            mainImage: {
              _type: "image",
              asset: { _type: "reference", _ref: assetId },
            },
          },
        },
      },
    ];
    const body = JSON.stringify({ mutations });
    const url = `https://${PROJECT_ID}.api.sanity.io/v2024-01-24/data/mutate/${DATASET}`;
    const parsed = new URL(url);

    const req = https.request(
      {
        hostname: parsed.hostname,
        path: parsed.pathname,
        method: "POST",
        headers: {
          Authorization: `Bearer ${SANITY_TOKEN}`,
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(body),
        },
      },
      (res) => {
        let result = "";
        res.on("data", (c) => (result += c));
        res.on("end", () => {
          try {
            const json = JSON.parse(result);
            resolve(json);
          } catch (e) {
            reject(new Error(`Patch parse error: ${result}`));
          }
        });
      }
    );
    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

// --- Main ---
(async () => {
  // 1. Generate image
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

  // 2. Upload to Sanity if requested
  if (shouldUpload && SANITY_TOKEN) {
    const slug = title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    const filename = `${slug}-cover.png`;

    console.log(`Uploading to Sanity as ${filename}...`);
    const asset = await uploadToSanity(output, filename);
    console.log(`Asset uploaded: ${asset._id}`);

    // 3. Patch post if post-id provided
    if (postId) {
      console.log(`Patching post ${postId} with image...`);
      const result = await patchPost(postId, asset._id);
      console.log(`Post patched:`, JSON.stringify(result));
    }

    // Output asset info for scripting
    console.log(JSON.stringify({ assetId: asset._id, assetUrl: asset.url }));
  }
})();
