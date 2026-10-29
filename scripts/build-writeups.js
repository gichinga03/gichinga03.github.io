#!/usr/bin/env node
/**
 * build-writeups.js
 *
 * Scans TWO folders, each a source of writeups, and writes one combined
 * writeups.json at the repo root:
 *
 *   writeups/<folder>/        -> category "writeups" -> shows on writeups.html
 *   azure-writeups/<folder>/  -> category "azure"     -> shows on azure.html
 *
 * Each writeup is its own folder (matches a Notion HTML export: the
 * page's .html file plus an asset folder for images, both inside
 * <source-dir>/<slug>/), e.g.:
 *
 *   writeups/
 *     keyVault-15/
 *       Key Vault 15 3feb23a1fcd5806fb781c07cabc94510.html   <- the page
 *       Key Vault 15/                                        <- its images
 *         image.png
 *
 * DESCRIPTION / TAGS / DATE — three ways to set these, checked in order:
 *
 *   1. writeups/<folder>/meta.json  (easiest — Notion's export HTML is a
 *      single minified line, painful to hand-edit; this isn't):
 *        {
 *          "description": "One-line summary.",
 *          "date": "2026-10-28",
 *          "tags": ["azure", "key-vault"]
 *        }
 *      Any field you omit falls through to the next option below.
 *
 *   2. <meta> tags in the exported .html file's <head>, if you'd rather
 *      edit those directly:
 *        <meta name="description" content="...">
 *        <meta name="date" content="2026-10-28">
 *        <meta name="tags" content="azure, key-vault">
 *
 *   3. Automatic fallback if neither above sets a description: the first
 *      real paragraph of the page's content (Notion's table-of-contents
 *      block is skipped). No tags fallback — tags just stay empty unless
 *      you set them one of the two ways above.
 *
 * None of this is required — a folder with nothing set still gets a
 * title (from <title>) and a date (file's last-modified time) and shows
 * up fine, just without an excerpt/tags.
 *
 * This script also injects the dark-theme stylesheet + a back link into
 * each exported page, once (idempotent — see injectTheme below).
 *
 * Run manually with: node scripts/build-writeups.js
 * Runs automatically via .github/workflows/build-writeups.yml on every push.
 */

const fs = require("fs");
const path = require("path");

const REPO_ROOT = path.resolve(__dirname, "..");
const OUTPUT_FILE = path.join(REPO_ROOT, "writeups.json");

// each source folder maps to a default category, and where its "back" link
// should point
const SOURCES = [
  { dir: "writeups", defaultCategory: "writeups", backHref: "../../writeups.html" },
  { dir: "azure-writeups", defaultCategory: "azure", backHref: "../../azure.html" },
];

const THEME_MARKER = "<!-- writeup-theme-injected -->";

// Adds the dark-theme stylesheet + a back link to a raw Notion export,
// exactly once. Re-running this on an already-themed file is a no-op
// (it checks THEME_MARKER first), so it's safe to call on every build.
function injectTheme(html, sourceDir, backHref) {
  if (html.includes(THEME_MARKER)) return html; // already done

  const themeLink = `${THEME_MARKER}\n<link rel="stylesheet" href="../../css/writeup-theme.css">\n</head>`;
  html = html.replace(/<\/head>/i, themeLink);

  const backLink = `<a class="writeup-back" href="${backHref}">&larr; Back to writeups</a>`;
  html = html.replace(/(<body[^>]*>)/i, `$1\n${backLink}`);

  return html;
}

function extractTag(html, regex) {
  const match = html.match(regex);
  return match ? match[1].trim() : null;
}

function getMeta(html, name) {
  const re1 = new RegExp(
    `<meta[^>]*name=["']${name}["'][^>]*content=["']([^"']*)["']`,
    "i"
  );
  const re2 = new RegExp(
    `<meta[^>]*content=["']([^"']*)["'][^>]*name=["']${name}["']`,
    "i"
  );
  return extractTag(html, re1) || extractTag(html, re2);
}

// Fallback excerpt: first real paragraph of body content, skipping
// Notion's table-of-contents block and any trivial/empty <p>s.
function extractAutoExcerpt(html) {
  const withoutToc = html.replace(/<nav[\s\S]*?<\/nav>/i, "");
  const paragraphs = [...withoutToc.matchAll(/<p(?:\s[^>]*)?>([\s\S]*?)<\/p>/gi)];
  for (const [, inner] of paragraphs) {
    const text = inner
      .replace(/<[^>]+>/g, "")
      .replace(/&nbsp;/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    if (text.length >= 20) {
      return text.length > 200 ? text.slice(0, 197).trimEnd() + "…" : text;
    }
  }
  return "";
}

function readSidecar(folderPath, sourceDir, folderName) {
  const sidecarPath = path.join(folderPath, "meta.json");
  if (!fs.existsSync(sidecarPath)) return {};
  try {
    return JSON.parse(fs.readFileSync(sidecarPath, "utf8"));
  } catch (e) {
    console.warn(`Couldn't parse ${sourceDir}/${folderName}/meta.json: ${e.message}`);
    return {};
  }
}

function parseWriteupFolder(sourceDir, folderName, defaultCategory, backHref) {
  const folderPath = path.join(REPO_ROOT, sourceDir, folderName);

  // only .html files sitting directly in the folder — never descend into
  // a nested asset folder (e.g. Notion's "Key Vault 15/" image folder)
  const htmlFiles = fs
    .readdirSync(folderPath)
    .filter((f) => fs.statSync(path.join(folderPath, f)).isFile())
    .filter((f) => /\.html?$/i.test(f));

  if (htmlFiles.length === 0) {
    console.warn(`Skipping ${sourceDir}/${folderName}/ — no .html file found`);
    return null;
  }
  if (htmlFiles.length > 1) {
    console.warn(
      `${sourceDir}/${folderName}/ has ${htmlFiles.length} .html files — using "${htmlFiles[0]}"`
    );
  }

  const filename = htmlFiles[0];
  const fullPath = path.join(folderPath, filename);
  let html = fs.readFileSync(fullPath, "utf8");

  const themed = injectTheme(html, sourceDir, backHref);
  if (themed !== html) {
    fs.writeFileSync(fullPath, themed);
    html = themed;
    console.log(`Themed ${sourceDir}/${folderName}/${filename}`);
  }

  const sidecar = readSidecar(folderPath, sourceDir, folderName);

  const title = sidecar.title || extractTag(html, /<title>([^<]*)<\/title>/i) || folderName;

  const description =
    sidecar.description || getMeta(html, "description") || extractAutoExcerpt(html);

  const dateStr = sidecar.date || getMeta(html, "date");
  const date = dateStr || fs.statSync(fullPath).mtime.toISOString().slice(0, 10);

  let tags;
  if (Array.isArray(sidecar.tags)) {
    tags = sidecar.tags.map((t) => String(t).trim()).filter(Boolean);
  } else {
    const tagsStr = getMeta(html, "tags") || "";
    tags = tagsStr.split(",").map((t) => t.trim()).filter(Boolean);
  }

  const category = sidecar.category || getMeta(html, "category") || defaultCategory;

  // encode each path segment separately so spaces/hashes in Notion's
  // export filenames turn into a valid URL (not escaping the slashes)
  const link = [sourceDir, folderName, filename].map(encodeURIComponent).join("/");

  return {
    slug: folderName,
    title,
    date,
    excerpt: description,
    tags,
    category,
    link,
  };
}

function scanSource({ dir, defaultCategory, backHref }) {
  const sourcePath = path.join(REPO_ROOT, dir);
  if (!fs.existsSync(sourcePath)) return [];

  const folders = fs
    .readdirSync(sourcePath)
    .filter((f) => fs.statSync(path.join(sourcePath, f)).isDirectory());

  return folders
    .map((f) => parseWriteupFolder(dir, f, defaultCategory, backHref))
    .filter(Boolean);
}

function build() {
  const entries = SOURCES.flatMap(scanSource);

  // newest first
  entries.sort((a, b) => (a.date < b.date ? 1 : -1));

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(entries, null, 2) + "\n");
  console.log(`Wrote ${entries.length} writeup(s) to ${OUTPUT_FILE}`);
}

build();