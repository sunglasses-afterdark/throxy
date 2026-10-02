/* Build-time only: scripts/prerender.mjs imports this from dist/server/ to
   render each public route to static HTML. Never shipped to the browser. */
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { AppShell, AppRoutes } from "./App";

export { resolveSeo, headTags } from "./seo";

export function render(url, hireHost = false) {
  return renderToString(
    <AppShell>
      <StaticRouter location={url}>
        <AppRoutes hireHost={hireHost} />
      </StaticRouter>
    </AppShell>
  );
}
