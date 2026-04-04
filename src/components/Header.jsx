import { Link } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, ArrowRight } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-background/75 backdrop-blur-md py-3">
      <div className="max-w-7xl mx-auto px-5">
        {/* Outer neumorphic pill — always visible */}
        <div className="neuo-nav rounded-full px-4 py-2 flex items-center justify-between gap-6">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 flex-shrink-0 group">
            <div className="w-8 h-8 flex items-end justify-center overflow-hidden transition-all duration-300">
              <img src="/avatar.png" alt="Alexander Blackwood" className="w-full h-full object-contain object-bottom" />
            </div>
            <span className="font-bold text-base tracking-tight text-foreground" style={{ fontFamily: "'PP Neue Montreal Arabic Medium', system-ui, sans-serif" }}>
              Alexander
            </span>
          </Link>

          {/* Desktop nav — each item is its own neumorphic pill */}
          <nav className="hidden sm:flex items-center gap-2">
            <Link
              to="/services"
              className="neuo-sm rounded-full px-4 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Services
            </Link>
            <Link
              to="/about"
              className="neuo-sm rounded-full px-4 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              About
            </Link>
            <a
              href="mailto:alexander@alexblackwood.xyz"
              className="neuo-sm rounded-full px-4 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Contact
            </a>
          </nav>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-3">
            <Link
              to="/intake"
              className="hidden sm:inline-flex items-center justify-center gap-2 bg-foreground text-background text-xs font-semibold px-5 py-2.5 rounded-full btn-neuo hover:bg-foreground/90 active:scale-95 transition-all duration-200"
            >
              Start a Project
              <ArrowRight className="w-3 h-3" />
            </Link>

            <Sheet>
              <SheetTrigger asChild className="sm:hidden">
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full hover:bg-muted neuo-sm">
                  <Menu className="h-4 w-4 text-foreground" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-background border-l border-border w-[300px]">
                <nav className="flex flex-col gap-5 mt-12">
                  <Link to="/" className="text-lg font-medium text-foreground hover:text-primary transition-colors">Home</Link>
                  <Link to="/services" className="text-lg font-medium text-foreground hover:text-primary transition-colors">Services</Link>
                  <Link to="/about" className="text-lg font-medium text-foreground hover:text-primary transition-colors">About</Link>
                  <a href="mailto:alexander@alexblackwood.xyz" className="text-lg font-medium text-foreground hover:text-primary transition-colors">Contact</a>
                  <div className="h-px bg-border my-2" />
                  <Link to="/intake"
                    className="inline-flex items-center justify-center gap-2 bg-foreground text-background text-base font-semibold px-6 py-4 rounded-full btn-neuo hover:bg-foreground/90 transition-all active:scale-95">
                    Start a Project
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>

        </div>
      </div>
    </header>
  );
}
