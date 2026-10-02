/* Production server. Replaces `serve dist --single` so we can:
     - serve prerendered HTML per route (dist/<route>.html)
     - serve the recruiter deck for every path on hire.alexblackwood.xyz
     - 301 legacy paths and return a real 404 instead of a soft one
   Future: /api/interview/* for the Tavus replica lives here too. */
import express from "express";
import compression from "compression";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dist = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "dist");
const app = express();
app.disable("x-powered-by");
app.set("trust proxy", true); // Railway sits in front; honour X-Forwarded-Host
app.use(compression());

const LEGACY = { "/Solutions": "/services", "/AboutUs": "/about" };
const isHireHost = (req) => /^hire\./i.test(req.hostname || "");
const hasExtension = (p) => /\.[a-z0-9]+$/i.test(p);

app.use((req, res, next) => {
  if (LEGACY[req.path]) return res.redirect(301, LEGACY[req.path]);
  // /services/ → /services
  if (req.path.length > 1 && req.path.endsWith("/")) {
    return res.redirect(301, req.path.slice(0, -1) + (req.url.includes("?") ? req.url.slice(req.url.indexOf("?")) : ""));
  }
  if (isHireHost(req) && !hasExtension(req.path)) {
    res.setHeader("Cache-Control", "no-cache");
    return res.sendFile(path.join(dist, "hire.html"));
  }
  next();
});

app.use(
  express.static(dist, {
    extensions: ["html"], // /services → dist/services.html
    redirect: false,
    setHeaders(res, file) {
      if (file.includes(`${path.sep}assets${path.sep}`)) {
        res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
      } else if (file.endsWith(".html")) {
        res.setHeader("Cache-Control", "no-cache");
      }
    },
  })
);

app.use((req, res) => {
  res.status(404);
  if (req.accepts("html")) return res.sendFile(path.join(dist, "404.html"));
  res.type("txt").send("Not found");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`serving ${dist} on :${port}`));
