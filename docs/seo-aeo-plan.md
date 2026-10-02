# SEO + AEO plan — alexblackwood.xyz

_Audit date: 2026-10-01. AEO = answer-engine optimization (ChatGPT search, Perplexity, Google AI Overviews, Claude)._

## Audit — what crawlers saw before this work

The site was a client-rendered SPA with no prerendering. Crawlers received:

```html
<div id="root"></div>
```

Googlebot executes JS eventually; the crawlers that feed answer engines (GPTBot, ClaudeBot, PerplexityBot, Bing's AI layer) largely do not. To them the site was a blank page with a title. Everything else in this plan depends on fixing that first.

| Area | State at audit |
|---|---|
| Titles / descriptions | One global title for every route; no meta description; no canonical; no OG/Twitter cards |
| `robots.txt` / `sitemap.xml` | Didn't exist — SPA fallback returned the HTML shell with a **200** for both |
| Structured data | None |
| `/intake` | Indexable (shouldn't be); `/Solutions` + `/AboutUs` legacy routes live as duplicates |
| hire. subdomain | Served the *home page* HTML to crawlers, then JS swapped in the deck |
| Images | `alt="Alexander"` on every headshot |
| Cruft | Google Fonts link for a font Google doesn't host; base44 analytics script injected with an empty app ID; base44 auth check blocking first paint on a 404 |
| Content | Strong brand copy, almost nothing a model can quote as "a GTM engineer does X" |

## Phases

### Phase 1 — Static HTML per route ✅
Vite SSR build + `scripts/prerender.mjs` renders every public route to `dist/<route>/index.html` at build time. Client hydrates on top. The base44 auth gate (a network call that 404s before rendering anything) was removed — nothing on the site uses it.

A small Express server (`server/index.js`) replaces `serve --single` so the hire. subdomain serves its own prerendered HTML and legacy routes 301.

### Phase 2 — Per-route head ✅
`src/seo.js` is the single source of truth for title / description / canonical / robots / OG per route. Injected into `<head>` at prerender time and kept in sync client-side on navigation. One generated OG image (`public/og.png`). `/intake` is `noindex`. Dead font link and base44 tracker removed.

### Phase 3 — Crawler plumbing ✅
Real `robots.txt` (explicitly allows GPTBot, ClaudeBot, PerplexityBot, Google-Extended, Bingbot), `sitemap.xml`, `llms.txt` + `llms-full.txt`.

### Phase 4 — Structured data
JSON-LD, prerendered into the HTML:
- `Person` — name, jobTitle, `sameAs` LinkedIn, `knowsAbout`
- `ProfessionalService` — the consultancy, areaServed, `hasOfferCatalog` with the six service lines
- `FAQPage` on `/services` (feeds Phase 5)

Entity consistency matters more than any tag: same name / title / one-line description on the site, LinkedIn, GitHub, and the resume PDF.

### Phase 5 — Content that gets cited (the actual AEO work)
The format answer engines lift: **a direct 40–60 word answer, then depth.**

1. **FAQ block on `/services`** — 8–10 questions people actually type: "What is a GTM engineer?", "What does a GTM engineer cost?", "How do you sync HubSpot and NetSuite without duplicates?", "Can Claude/MCP agents work with HubSpot?", "Fractional RevOps vs. hiring in-house?"
2. **Case studies get their own URLs** — `/work/modus-create` etc., problem → approach → outcome with numbers.
3. **4–6 short technical notes** — things actually built: the NetSuite sync rebuild, HubSpot lead-object architecture, an MCP agent on a CRM. 600–900 words, specific, opinionated.

### Phase 6 — Submit & measure
- Google Search Console **and Bing Webmaster Tools** (Bing powers ChatGPT search + Copilot). Verify the domain property so hire. is covered.
- Submit `sitemap.xml`; enable IndexNow.
- Baseline now, then monthly: ask ChatGPT / Perplexity / Claude "who is Alexander Blackwood, GTM engineer?" and "HubSpot NetSuite integration consultant"; record answers.
- `curl -A GPTBot https://alexblackwood.xyz/` must return readable HTML.

## Route → title map

| Route | Title |
|---|---|
| `/` | Alexander Blackwood — GTM Engineer · HubSpot, Salesforce & AI Systems |
| `/services` | GTM Engineering Case Studies — CRM, Integrations, AI Agents |
| `/about` | About Alexander Blackwood — 14 Years in RevOps & Systems |
| `/intake` | Start a Project — Alexander Blackwood (noindex) |
| `hire.` | Hire Alexander Blackwood — Resume & AI Interview |

Hero H1s stay as written; keywords live in titles, descriptions, subheads, and FAQ.

## Dev notes
- `npm run build` = client build → SSR build → prerender. Output: `dist/` with one `index.html` per route.
- Add a route: register it in `src/App.jsx`, add an entry to `src/seo.js`, add it to `scripts/prerender.mjs` ROUTES and `public/sitemap.xml`.
- Local check of what a crawler sees: `npm run build && cat dist/services/index.html | sed 's/<[^>]*>/ /g' | tr -s ' '`
