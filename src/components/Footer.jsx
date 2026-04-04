import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-10 mb-14">
          {/* Logo + description */}
          <div className="sm:col-span-2">
            <Link to="/" className="inline-flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 flex items-end justify-center overflow-hidden">
                <img src="/avatar.png" alt="Alexander Blackwood" className="w-full h-full object-contain object-bottom" />
              </div>
              <span className="font-bold text-lg text-secondary-foreground" style={{ fontFamily: "'PP Neue Montreal Arabic Medium', system-ui, sans-serif" }}>Alexander</span>
            </Link>
            <p className="text-sm text-secondary-foreground/55 leading-relaxed max-w-xs mb-6">
              GTM engineering consultancy. Data integrations, automations, AI solutions, and custom software — scoped, built, and delivered by a senior engineer. No agency overhead. No handoffs.
            </p>
            <a href="mailto:alexander@alexblackwood.xyz" className="inline-flex items-center gap-1.5 text-sm text-secondary-foreground/55 hover:text-secondary-foreground transition-colors">
              alexander@alexblackwood.xyz
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Work */}
          <div>
            <p className="text-sm font-semibold text-secondary-foreground uppercase tracking-widest mb-4">Work</p>
            <div className="space-y-3">
              <div><Link to="/services" className="text-sm text-secondary-foreground/55 hover:text-secondary-foreground transition-colors">All Services</Link></div>
              <div><Link to="/services#ai" className="text-sm text-secondary-foreground/55 hover:text-secondary-foreground transition-colors">AI & MCP Systems</Link></div>
              <div><Link to="/services#integrations" className="text-sm text-secondary-foreground/55 hover:text-secondary-foreground transition-colors">Data Integrations</Link></div>
              <div><Link to="/services#automation" className="text-sm text-secondary-foreground/55 hover:text-secondary-foreground transition-colors">Automation</Link></div>
              <div><Link to="/services#fractional" className="text-sm text-secondary-foreground/55 hover:text-secondary-foreground transition-colors">Fractional CTO</Link></div>
            </div>
          </div>

          {/* Company */}
          <div>
            <p className="text-sm font-semibold text-secondary-foreground uppercase tracking-widest mb-4">Company</p>
            <div className="space-y-3">
              <div><Link to="/about" className="text-sm text-secondary-foreground/55 hover:text-secondary-foreground transition-colors">About Alexander</Link></div>
              <div><Link to="/intake" className="text-sm text-secondary-foreground/55 hover:text-secondary-foreground transition-colors">Start a Project</Link></div>
              <div><a href="mailto:alexander@alexblackwood.xyz" className="text-sm text-secondary-foreground/55 hover:text-secondary-foreground transition-colors">Contact</a></div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-secondary-foreground/10 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-sm text-secondary-foreground/35">© {new Date().getFullYear()} Alexander Blackwood. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <a href="mailto:alexander@alexblackwood.xyz" className="text-sm text-secondary-foreground/35 hover:text-secondary-foreground/65 transition-colors">alexander@alexblackwood.xyz</a>
            <span className="text-sm text-secondary-foreground/25">Delray Beach, FL</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
