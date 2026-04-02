import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-8 mb-12">
          {/* Logo + description */}
          <div className="col-span-2">
            <Link to="/" className="inline-block mb-4">
              <img
                src="https://media.base44.com/images/public/69cdf02cda99287bd2ab8650/d86bb56ea_framerusercontent_com_cqIDj9sk1fQiszAbKgUfv8ZmJxE_37a4524c.png"
                alt="throxy"
                className="h-7 w-auto object-contain"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextElementSibling.style.display = "inline";
                }}
              />
              <span className="font-bold text-lg text-secondary-foreground" style={{ display: "none" }}>throxy</span>
            </Link>
            <p className="text-xs text-secondary-foreground/40 leading-relaxed max-w-xs">
              The outbound partner built for hard-to-crack traditional industries. Powered by proprietary technology and managed by experts.
            </p>
          </div>

          {/* Company */}
          <div>
            <p className="text-xs font-semibold text-secondary-foreground uppercase tracking-widest mb-4">Company</p>
            <div className="space-y-2.5">
              <div><Link to="/" className="text-xs text-secondary-foreground/50 hover:text-secondary-foreground transition-colors">Home</Link></div>
              <div><Link to="/AboutUs" className="text-xs text-secondary-foreground/50 hover:text-secondary-foreground transition-colors">About Us</Link></div>
              <div><a href="https://careers.throxy.com/" target="_blank" rel="noopener noreferrer" className="text-xs text-secondary-foreground/50 hover:text-secondary-foreground transition-colors">Careers</a></div>
            </div>
          </div>

          {/* Solutions */}
          <div>
            <p className="text-xs font-semibold text-secondary-foreground uppercase tracking-widest mb-4">Solutions</p>
            <div className="space-y-2.5">
              <div><Link to="/Solutions" className="text-xs text-secondary-foreground/50 hover:text-secondary-foreground transition-colors">Lead Finding and Qualification</Link></div>
              <div><a href="#" className="text-xs text-secondary-foreground/50 hover:text-secondary-foreground transition-colors">Cold Calling</a></div>
              <div><a href="#" className="text-xs text-secondary-foreground/50 hover:text-secondary-foreground transition-colors">Messaging</a></div>
              <div><a href="#" className="text-xs text-secondary-foreground/50 hover:text-secondary-foreground transition-colors">Deliverability</a></div>
              <div><a href="#" className="text-xs text-secondary-foreground/50 hover:text-secondary-foreground transition-colors">Closed Loop Optimisation</a></div>
              <div><a href="#" className="text-xs text-secondary-foreground/50 hover:text-secondary-foreground transition-colors">Done For You</a></div>
            </div>
          </div>

          {/* Resources */}
          <div>
            <p className="text-xs font-semibold text-secondary-foreground uppercase tracking-widest mb-4">Resources</p>
            <div className="space-y-2.5">
              <div><a href="#" className="text-xs text-secondary-foreground/50 hover:text-secondary-foreground transition-colors">Blog</a></div>
              <div><a href="#" className="text-xs text-secondary-foreground/50 hover:text-secondary-foreground transition-colors">Tools</a></div>
              <div><a href="#" className="text-xs text-secondary-foreground/50 hover:text-secondary-foreground transition-colors">Glossary</a></div>
              <div><a href="https://careers.throxy.com/" target="_blank" rel="noopener noreferrer" className="text-xs text-secondary-foreground/50 hover:text-secondary-foreground transition-colors">Jobs</a></div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-secondary-foreground/10 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-xs text-secondary-foreground/30">© 2025 Throxy. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <a href="#" className="text-xs text-secondary-foreground/30 hover:text-secondary-foreground/60 transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-secondary-foreground/30 hover:text-secondary-foreground/60 transition-colors">Terms of Service</a>
            <button className="text-xs text-secondary-foreground/30 hover:text-secondary-foreground/60 transition-colors">Cookie Settings</button>
          </div>
        </div>
      </div>
    </footer>
  );
}