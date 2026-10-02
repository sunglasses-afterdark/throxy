/* Runs after `vite build` + the SSR build. Renders each public route to a
   static HTML file in dist/ so crawlers (and AI answer engines, which mostly
   don't execute JS) get the full page. The client hydrates on top.

   File naming: dist/services.html is served for /services by the Express
   server (extensions: ['html']). dist/hire.html is served for every path on
   hire.alexblackwood.xyz. dist/404.html is the not-found page. */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const serverEntry = path.join(dist, "server", "entry-server.js");

if (!fs.existsSync(serverEntry)) {
  console.error("prerender: missing dist/server/entry-server.js — run the SSR build first");
  process.exit(1);
}

const { render, resolveSeo, headTags } = await import(serverEntry);
const template = fs.readFileSync(path.join(dist, "index.html"), "utf8");

const ROUTES = [
  { url: "/", file: "index.html" },
  { url: "/services", file: "services.html" },
  { url: "/about", file: "about.html" },
  { url: "/intake", file: "intake.html" },
  { url: "/", file: "hire.html", hireHost: true },
  { url: "/__not_found", file: "404.html" },
];

// React 18 warns about useLayoutEffect on the server; it's harmless here.
const origError = console.error;
console.error = (...a) => { if (!String(a[0]).includes("useLayoutEffect")) origError(...a); };

for (const r of ROUTES) {
  const app = render(r.url, !!r.hireHost);
  const seo = resolveSeo(r.url, !!r.hireHost);
  const html = template
    .replace(/<title>[\s\S]*?<\/title>\s*/, "")
    .replace(/<meta name="description"[^>]*>\s*/, "")
    .replace("</head>", `${headTags(seo)}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${app}</div>`);
  fs.writeFileSync(path.join(dist, r.file), html);
  console.log(`prerender  ${r.file.padEnd(14)} ${(app.length / 1024).toFixed(1)} kB`);
}

console.error = origError;
fs.rmSync(path.join(dist, "server"), { recursive: true, force: true });
