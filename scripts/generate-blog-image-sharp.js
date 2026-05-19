const sharp = require('sharp');
const https = require('https');
const fs = require('fs');
const path = require('path');

function loadEnvLocal() {
  const candidates = [
    path.join(__dirname, '..', '.env.local'),
    path.join(__dirname, '..', '.env'),
  ];
  for (const file of candidates) {
    if (!fs.existsSync(file)) continue;
    const content = fs.readFileSync(file, 'utf8');
    for (const rawLine of content.split('\n')) {
      const line = rawLine.trim();
      if (!line || line.startsWith('#')) continue;
      const eq = line.indexOf('=');
      if (eq === -1) continue;
      const key = line.slice(0, eq).trim();
      let value = line.slice(eq + 1).trim();
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      if (!process.env[key]) process.env[key] = value;
    }
  }
}

loadEnvLocal();

const WIDTH = 1920;
const HEIGHT = 1080;

const CATEGORY_COLORS = {
  'Architecture': '#3B82F6',
  'Security': '#EF4444',
  'Open Source': '#10B981',
  'Produit': '#8B5CF6',
  'Updates': '#F59E0B',
  'Vision': '#06B6D4',
};

let LOGO_BASE64 = null;
function getLogoBase64() {
  if (LOGO_BASE64 !== null) return LOGO_BASE64;
  const logoPath = path.join(__dirname, '..', 'public', 'logo.png');
  if (fs.existsSync(logoPath)) {
    LOGO_BASE64 = fs.readFileSync(logoPath).toString('base64');
  } else {
    LOGO_BASE64 = '';
  }
  return LOGO_BASE64;
}

function escapeXml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}

function wrapText(text, maxCharsPerLine) {
  const words = text.split(' ');
  const lines = [];
  let currentLine = '';
  for (const word of words) {
    if ((currentLine + ' ' + word).trim().length > maxCharsPerLine) {
      if (currentLine) lines.push(currentLine.trim());
      currentLine = word;
    } else {
      currentLine = currentLine ? currentLine + ' ' + word : word;
    }
  }
  if (currentLine) lines.push(currentLine.trim());
  return lines;
}

function generateSVG(title, subtitle, category) {
  const catColor = CATEGORY_COLORS[category] || '#3B82F6';
  const PAD_L = 110;
  const LOGO_SIZE = 76;
  const LOGO_Y = 110;
  const WORDMARK_Y = LOGO_Y + LOGO_SIZE / 2 + 14;
  const HEADER_BOTTOM = LOGO_Y + LOGO_SIZE + 24;

  const titleLines = wrapText(title, 32);
  const lineCount = Math.min(titleLines.length, 4);
  const titleFontSize = lineCount > 2 ? 76 : 88;
  const titleLineHeight = titleFontSize * 1.18;

  const subtitleLines = wrapText(subtitle, 64);
  const subLineCount = Math.min(subtitleLines.length, 3);
  const subtitleFontSize = 28;
  const subtitleLineHeight = subtitleFontSize * 1.4;

  const titleBlockHeight = lineCount * titleLineHeight;
  const subtitleBlockHeight = subLineCount * subtitleLineHeight;
  const gap = subLineCount > 0 ? 44 : 0;
  const totalBlock = titleBlockHeight + gap + subtitleBlockHeight;
  const verticalCenter = (HEIGHT + HEADER_BOTTOM) / 2;
  let titleFirstBaseline = verticalCenter - totalBlock / 2 + titleFontSize * 0.85;
  if (titleFirstBaseline < HEADER_BOTTOM + 60) titleFirstBaseline = HEADER_BOTTOM + 60;

  const titleSvg = titleLines.slice(0, 4).map((line, i) =>
    `<text x="${PAD_L}" y="${titleFirstBaseline + i * titleLineHeight}" font-family="system-ui, -apple-system, 'Segoe UI', sans-serif" font-size="${titleFontSize}" font-weight="700" fill="white" letter-spacing="-1.5">${escapeXml(line)}</text>`
  ).join('\n    ');

  const subtitleStartY = titleFirstBaseline + (lineCount - 1) * titleLineHeight + gap + subtitleFontSize;
  const subtitleSvg = subtitleLines.slice(0, 3).map((line, i) =>
    `<text x="${PAD_L}" y="${subtitleStartY + i * subtitleLineHeight}" font-family="system-ui, -apple-system, 'Segoe UI', sans-serif" font-size="${subtitleFontSize}" fill="#94A3B8" letter-spacing="0.2">${escapeXml(line)}</text>`
  ).join('\n    ');

  const logoBase64 = getLogoBase64();
  const logoSvg = logoBase64
    ? `<image x="${PAD_L}" y="${LOGO_Y}" width="${LOGO_SIZE}" height="${LOGO_SIZE}" href="data:image/png;base64,${logoBase64}" />`
    : '';

  const wordmarkX = PAD_L + LOGO_SIZE + 22;
  const wordmarkFontSize = 40;
  const wordmarkBaseline = LOGO_Y + LOGO_SIZE / 2 + wordmarkFontSize / 3;
  const approxWordmarkWidth = 175;
  const badgeX = wordmarkX + approxWordmarkWidth + 18;
  const badgeW = category.length * 14 + 36;
  const badgeH = 32;
  const badgeY = LOGO_Y + LOGO_SIZE / 2 - badgeH / 2;

  return `<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0F172A;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#1E293B;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:${catColor};stop-opacity:0.6" />
      <stop offset="100%" style="stop-color:${catColor};stop-opacity:0" />
    </linearGradient>
    <linearGradient id="glow" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:${catColor};stop-opacity:0.18" />
      <stop offset="100%" style="stop-color:${catColor};stop-opacity:0" />
    </linearGradient>
    <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
      <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#1E293B" stroke-width="0.5" opacity="0.5"/>
    </pattern>
  </defs>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)" />
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#grid)" opacity="0.4" />
  <rect x="0" y="0" width="${WIDTH}" height="420" fill="url(#glow)" />
  <rect x="0" y="0" width="6" height="${HEIGHT}" fill="${catColor}" />
  <rect x="6" y="0" width="${WIDTH}" height="3" fill="url(#accent)" />
  <circle cx="${WIDTH - 180}" cy="220" r="280" fill="${catColor}" opacity="0.04" />
  <circle cx="${WIDTH - 90}" cy="380" r="190" fill="${catColor}" opacity="0.05" />
  ${logoSvg}
  <text x="${wordmarkX}" y="${wordmarkBaseline}" font-family="system-ui, -apple-system, 'Segoe UI', sans-serif" font-size="${wordmarkFontSize}" font-weight="700" fill="white" letter-spacing="-0.5">QoreDB</text>
  <rect x="${badgeX}" y="${badgeY}" width="${badgeW}" height="${badgeH}" rx="${badgeH / 2}" fill="${catColor}" opacity="0.18" />
  <text x="${badgeX + badgeW / 2}" y="${badgeY + badgeH / 2 + 6}" font-family="system-ui, -apple-system, 'Segoe UI', sans-serif" font-size="17" font-weight="600" fill="${catColor}" text-anchor="middle" letter-spacing="1.2">${escapeXml(category.toUpperCase())}</text>
  ${titleSvg}
  ${subtitleSvg}
  <rect x="${PAD_L}" y="${HEIGHT - 100}" width="160" height="2" fill="#334155" />
  <text x="${PAD_L}" y="${HEIGHT - 60}" font-family="system-ui, -apple-system, 'Segoe UI', sans-serif" font-size="22" fill="#64748B" letter-spacing="0.5">qoredb.com/blog</text>
  <rect x="${WIDTH - 320}" y="${HEIGHT - 100}" width="200" height="2" fill="${catColor}" opacity="0.3" />
</svg>`;
}

async function uploadToSanity(pngBuffer, token, projectId, dataset) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: `${projectId}.api.sanity.io`,
      port: 443,
      path: `/v2021-03-25/assets/images/${dataset}`,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'image/png',
        'Content-Length': pngBuffer.length,
      },
    };
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          if (res.statusCode >= 200 && res.statusCode < 300) resolve(parsed);
          else reject(new Error(`Sanity API error ${res.statusCode}: ${data}`));
        } catch (e) { reject(new Error(`Failed to parse: ${data}`)); }
      });
    });
    req.on('error', reject);
    req.write(pngBuffer);
    req.end();
  });
}

async function patchDocument(postId, imageAssetId, token, projectId, dataset) {
  const body = JSON.stringify({
    mutations: [{ patch: { id: postId, set: { mainImage: { _type: 'image', asset: { _type: 'reference', _ref: imageAssetId } } } } }],
  });
  return new Promise((resolve, reject) => {
    const options = {
      hostname: `${projectId}.api.sanity.io`,
      port: 443,
      path: `/v2021-03-25/data/mutate/${dataset}`,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
      },
    };
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          if (res.statusCode >= 200 && res.statusCode < 300) resolve(parsed);
          else reject(new Error(`Sanity API error ${res.statusCode}: ${data}`));
        } catch (e) { reject(new Error(`Failed to parse: ${data}`)); }
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

async function main() {
  const args = process.argv.slice(2);
  const getArg = (name) => { const idx = args.indexOf(`--${name}`); return idx !== -1 ? args[idx + 1] : null; };

  const title = getArg('title');
  const subtitle = getArg('subtitle') || '';
  const category = getArg('category') || 'Architecture';
  const output = getArg('output') || '/tmp/blog-cover.png';
  const postId = getArg('post-id');
  const upload = args.includes('--upload');
  const token = process.env.SANITY_TOKEN;
  const projectId = getArg('project-id') || 'jnq6wixe';
  const dataset = getArg('dataset') || 'production';

  if (!title) {
    console.error('Usage: node generate-blog-image-sharp.js --title "..." [--subtitle "..."] [--category "..."] [--output file.png] [--upload --post-id ID]');
    process.exit(1);
  }

  console.log(`Generating cover for: "${title}" [${category}]`);
  const svg = generateSVG(title, subtitle, category);
  const pngBuffer = await sharp(Buffer.from(svg)).png().toBuffer();
  fs.writeFileSync(output, pngBuffer);
  console.log(`Saved to ${output} (${(pngBuffer.length / 1024).toFixed(0)} KB)`);

  if (upload && token && postId) {
    console.log(`Uploading to Sanity...`);
    const uploadResult = await uploadToSanity(pngBuffer, token, projectId, dataset);
    const assetId = uploadResult.document._id;
    console.log(`Uploaded asset: ${assetId}`);
    console.log(`Patching post ${postId}...`);
    await patchDocument(postId, assetId, token, projectId, dataset);
    console.log(`Done! Post ${postId} now has a cover image.`);
  } else if (upload) {
    if (!token) console.error('Missing SANITY_TOKEN env var');
    if (!postId) console.error('Missing --post-id');
    process.exit(1);
  }
}

main().catch((err) => { console.error('Error:', err.message); process.exit(1); });
