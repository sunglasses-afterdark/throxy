/* Single source of truth for per-route <head> content.
   Used at build time (scripts/prerender.mjs → headTags) and at runtime
   (App.jsx → applySeo on navigation). Add a route here when you add a page. */

export const SITE = "https://alexblackwood.xyz";
export const HIRE_SITE = "https://hire.alexblackwood.xyz";
const OG_IMAGE = `${SITE}/og.png`;

const BASE = {
  siteName: "Alexander Blackwood",
  image: OG_IMAGE,
  type: "website",
};

export const SEO = {
  "/": {
    title: "Alexander Blackwood — GTM Engineer · HubSpot, Salesforce & AI Systems",
    description:
      "Alexander Blackwood is a GTM engineer and revenue operations architect in Delray Beach, FL. 14 years building HubSpot, Salesforce, and NetSuite systems, AI agents via MCP, and the integrations that run go-to-market teams. One senior engineer, no agency overhead.",
    canonical: `${SITE}/`,
  },
  "/services": {
    title: "GTM Engineering Case Studies — CRM, Integrations, AI Agents",
    description:
      "Case studies and service lines from GTM engineer Alexander Blackwood: CRM architecture, HubSpot–NetSuite integration, workflow automation, AI agents via MCP, data architecture, and fractional CTO work.",
    canonical: `${SITE}/services`,
  },
  "/about": {
    title: "About Alexander Blackwood — 14 Years in RevOps & Systems",
    description:
      "About Alexander Blackwood — 14+ years in revenue operations, CRM architecture, and systems engineering across healthcare, mortgage lending, SaaS, and professional services. Swarthmore College, B.A. Linguistics.",
    canonical: `${SITE}/about`,
  },
  "/intake": {
    title: "Start a Project — Alexander Blackwood",
    description: "Tell Alexander about your project. A two-minute conversational brief; he responds personally.",
    canonical: `${SITE}/intake`,
    robots: "noindex, follow",
  },
  "/hire": {
    title: "Hire Alexander Blackwood — Resume & AI Interview",
    description:
      "Resume, selected work, and a live AI interview with Alexander Blackwood — GTM engineer and RevOps architect. Open to full-time and contract roles.",
    canonical: `${HIRE_SITE}/`,
    type: "profile",
  },
  "/404": {
    title: "Page not found — Alexander Blackwood",
    description: "That page doesn't exist.",
    robots: "noindex, nofollow",
  },
};

// Legacy paths → canonical of the real page (server also 301s these).
const ALIASES = { "/Solutions": "/services", "/AboutUs": "/about" };

export function resolveSeo(pathname, hireHost = false) {
  if (hireHost) return { ...BASE, ...SEO["/hire"] };
  const key = ALIASES[pathname] || pathname;
  return { ...BASE, ...(SEO[key] || SEO["/404"]) };
}

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");

/** Server: tags to inject into <head> at prerender time. */
export function headTags(seo) {
  const t = [];
  t.push(`<title>${esc(seo.title)}</title>`);
  t.push(`<meta name="description" content="${esc(seo.description)}" />`);
  if (seo.robots) t.push(`<meta name="robots" content="${esc(seo.robots)}" />`);
  if (seo.canonical) t.push(`<link rel="canonical" href="${esc(seo.canonical)}" />`);
  t.push(`<meta property="og:type" content="${esc(seo.type)}" />`);
  t.push(`<meta property="og:site_name" content="${esc(seo.siteName)}" />`);
  t.push(`<meta property="og:title" content="${esc(seo.title)}" />`);
  t.push(`<meta property="og:description" content="${esc(seo.description)}" />`);
  if (seo.canonical) t.push(`<meta property="og:url" content="${esc(seo.canonical)}" />`);
  t.push(`<meta property="og:image" content="${esc(seo.image)}" />`);
  t.push(`<meta property="og:image:width" content="1200" />`);
  t.push(`<meta property="og:image:height" content="630" />`);
  t.push(`<meta name="twitter:card" content="summary_large_image" />`);
  t.push(`<meta name="twitter:title" content="${esc(seo.title)}" />`);
  t.push(`<meta name="twitter:description" content="${esc(seo.description)}" />`);
  t.push(`<meta name="twitter:image" content="${esc(seo.image)}" />`);
  return t.map((l) => `    ${l}`).join("\n");
}

/** Client: keep <head> in sync on SPA navigation. */
export function applySeo(seo) {
  if (typeof document === "undefined") return;
  document.title = seo.title;
  const upsert = (selector, attrs) => {
    let el = document.head.querySelector(selector);
    if (!el) {
      el = document.createElement(attrs.tag || "meta");
      document.head.appendChild(el);
    }
    for (const [k, v] of Object.entries(attrs)) if (k !== "tag") el.setAttribute(k, v);
    return el;
  };
  const remove = (selector) => document.head.querySelector(selector)?.remove();

  upsert('meta[name="description"]', { name: "description", content: seo.description });
  if (seo.robots) upsert('meta[name="robots"]', { name: "robots", content: seo.robots });
  else remove('meta[name="robots"]');
  if (seo.canonical) upsert('link[rel="canonical"]', { tag: "link", rel: "canonical", href: seo.canonical });
  else remove('link[rel="canonical"]');
  upsert('meta[property="og:type"]', { property: "og:type", content: seo.type });
  upsert('meta[property="og:title"]', { property: "og:title", content: seo.title });
  upsert('meta[property="og:description"]', { property: "og:description", content: seo.description });
  if (seo.canonical) upsert('meta[property="og:url"]', { property: "og:url", content: seo.canonical });
  upsert('meta[property="og:image"]', { property: "og:image", content: seo.image });
  upsert('meta[name="twitter:title"]', { name: "twitter:title", content: seo.title });
  upsert('meta[name="twitter:description"]', { name: "twitter:description", content: seo.description });
}
