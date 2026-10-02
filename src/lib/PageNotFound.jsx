import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function PageNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <div className="max-w-md w-full text-center">
        <p className="text-7xl font-bold tracking-tight text-foreground/15">404</p>
        <h1 className="mt-4 text-2xl font-bold text-foreground">Page not found</h1>
        <p className="mt-2 text-sm text-muted-foreground">That page doesn't exist — or it moved.</p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Link to="/" className="inline-flex items-center gap-2 bg-foreground text-background text-sm font-semibold px-5 py-2.5 rounded-full btn-neuo hover:bg-foreground/90 transition-all">
            Home <ArrowRight className="w-4 h-4" />
          </Link>
          <Link to="/services" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-2">
            Case studies
          </Link>
        </div>
      </div>
    </div>
  );
}
