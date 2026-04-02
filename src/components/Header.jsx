import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, ChevronDown } from "lucide-react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm py-2" : "bg-background border-b border-transparent py-4"}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center flex-shrink-0 group">
          <img
            src="https://media.base44.com/images/public/69cdf02cda99287bd2ab8650/f94f7fa6c_framerusercontent_com_CmLPhKjPeVVsOmnDVXZhkbBLvM_aa3bfed3.png"
            alt="throxy"
            className="h-6 w-auto object-contain group-hover:opacity-80 transition-opacity"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.nextElementSibling.style.display = "inline";
            }}
          />
          <span className="font-bold text-xl tracking-tight text-foreground" style={{ display: "none" }}>throxy</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-8">
          <div className="relative group">
            <button className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5 py-2">
              Solutions
              <ChevronDown className="w-3 h-3 opacity-50 group-hover:opacity-100 group-hover:rotate-180 transition-all duration-300" />
            </button>
            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 z-50 min-w-[240px]">
              <div className="bg-popover rounded-xl shadow-2xl border border-border p-2 backdrop-blur-xl relative">
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-popover border-t border-l border-border rotate-45" />
                <div className="relative z-10 space-y-1">
                  <Link to="/Solutions" className="block px-4 py-2.5 text-sm font-medium text-popover-foreground hover:bg-muted rounded-md transition-colors">All Solutions</Link>
                  <a href="#" className="block px-4 py-2.5 text-sm text-muted-foreground hover:text-popover-foreground hover:bg-muted rounded-md transition-colors">Lead Finding & Qualification</a>
                  <a href="#" className="block px-4 py-2.5 text-sm text-muted-foreground hover:text-popover-foreground hover:bg-muted rounded-md transition-colors">Messaging</a>
                  <a href="#" className="block px-4 py-2.5 text-sm text-muted-foreground hover:text-popover-foreground hover:bg-muted rounded-md transition-colors">Done For You</a>
                </div>
              </div>
            </div>
          </div>
          <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2">Resources</a>
          <a href="https://careers.throxy.com/" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2">Careers</a>
          <Link to="/AboutUs" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2">About Us</Link>
        </nav>

        {/* CTA + Mobile */}
        <div className="flex items-center gap-4">
          <a
            href="https://throxy.cal.com/forms/15483aea-e383-4659-97ec-60a125426c0c"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center justify-center bg-foreground text-background text-xs font-semibold px-5 py-2.5 rounded-sm hover:bg-foreground/90 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-foreground/10"
          >
            Strategy Call
          </a>
          <Sheet>
            <SheetTrigger asChild className="sm:hidden">
              <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full hover:bg-muted">
                <Menu className="h-5 w-5 text-foreground" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-background border-l border-border w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-6 mt-12">
                <Link to="/" className="text-lg font-medium text-foreground hover:text-primary transition-colors">Home</Link>
                <Link to="/Solutions" className="text-lg font-medium text-foreground hover:text-primary transition-colors">Solutions</Link>
                <Link to="/AboutUs" className="text-lg font-medium text-foreground hover:text-primary transition-colors">About Us</Link>
                <a href="#" className="text-lg font-medium text-foreground hover:text-primary transition-colors">Resources</a>
                <a href="https://careers.throxy.com/" target="_blank" rel="noopener noreferrer" className="text-lg font-medium text-foreground hover:text-primary transition-colors">Careers</a>
                <div className="h-px bg-border my-2" />
                <a href="https://throxy.cal.com/forms/15483aea-e383-4659-97ec-60a125426c0c" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-foreground text-background text-base font-semibold px-6 py-4 rounded-sm hover:bg-foreground/90 transition-all shadow-lg active:scale-95">
                  Book Strategy Call
                </a>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}