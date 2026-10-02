import { Toaster } from "@/components/ui/toaster";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClientInstance } from "@/lib/query-client";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import PageNotFound from "./lib/PageNotFound";
import Home from "./pages/Home";
import Solutions from "./pages/Solutions";
import AboutUs from "./pages/AboutUs";
import Intake from "./pages/Intake";
import Hire from "./pages/Hire";
import Layout from "./components/Layout";
import { resolveSeo, applySeo } from "@/seo";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, left: 0, behavior: "instant" }); }, [pathname]);
  return null;
}

function SeoSync({ hireHost }) {
  const { pathname } = useLocation();
  useEffect(() => { applySeo(resolveSeo(pathname, hireHost)); }, [pathname, hireHost]);
  return null;
}

/** Providers shared by the browser app and the prerenderer. */
export function AppShell({ children }) {
  return (
    <QueryClientProvider client={queryClientInstance}>
      {children}
      <Toaster />
    </QueryClientProvider>
  );
}

/** Route table. hire.alexblackwood.xyz serves the recruiter deck for every path;
    the main site also exposes it at /hire. */
export function AppRoutes({ hireHost = false }) {
  if (hireHost) {
    return (
      <Routes>
        <Route path="*" element={<Hire />} />
      </Routes>
    );
  }
  return (
    <Routes>
      <Route path="/hire" element={<Hire />} />
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Solutions />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/intake" element={<Intake />} />
        {/* Legacy paths — the server 301s these; kept so client nav never 404s */}
        <Route path="/Solutions" element={<Solutions />} />
        <Route path="/AboutUs" element={<AboutUs />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default function App() {
  const hireHost = typeof window !== "undefined" && /^hire\./i.test(window.location.hostname);
  return (
    <AppShell>
      <BrowserRouter>
        <ScrollToTop />
        <SeoSync hireHost={hireHost} />
        <AppRoutes hireHost={hireHost} />
      </BrowserRouter>
    </AppShell>
  );
}
