import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

const AnimatedElement = ({ children, className, delay = 0 }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) { setIsVisible(true); return; }
    const fallback = setTimeout(() => setIsVisible(true), 800 + delay);
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { clearTimeout(fallback); setTimeout(() => setIsVisible(true), delay); observer.unobserve(el); }
    }, { threshold: 0.05, rootMargin: "0px 0px 200px 0px" });
    observer.observe(el);
    return () => { observer.disconnect(); clearTimeout(fallback); };
  }, [delay]);
  return (
    <div ref={ref} className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className || ""}`}>
      {children}
    </div>
  );
};

export default function AboutUs() {
  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="min-h-[45vh] flex items-center bg-secondary relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-accent/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 py-20 w-full relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut" }}>
            <div className="inline-flex items-center gap-2 bg-primary/20 text-primary-foreground text-xs px-3 py-1.5 rounded-full mb-6 font-medium tracking-wide border border-primary/30">
              Backed by Y-Combinator
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-secondary-foreground mb-6 max-w-2xl leading-tight" style={{ fontFamily: "'PP Neue Montreal Arabic Medium', system-ui, sans-serif" }}>
              We exist to make outbound{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent animate-gradient-x">
                predictable, profitable, and painless.
              </span>
            </h1>
            <p className="text-sm text-secondary-foreground/50 max-w-lg leading-relaxed">
              We started throxy with a clear belief: outbound sales is broken, and AI will redefine how companies connect with their customers.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-16 items-center">
            <AnimatedElement>
              <img
                src="https://media.base44.com/images/public/69cdf02cda99287bd2ab8650/271260fef_framerusercontent_com_Ja6G5qS7zYgubxmra2xJYoTN2Y_34cd862f.png"
                alt="Throxy team"
                className="w-full h-auto rounded-lg shadow-2xl"
              />
            </AnimatedElement>
            <AnimatedElement delay={100}>
              <p className="text-xs text-muted-foreground uppercase tracking-widest mb-4">Our mission</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6 leading-tight" style={{ fontFamily: "'PP Neue Montreal Arabic Medium', system-ui, sans-serif" }}>
                The outbound growth partner you actually need.
              </h2>
              <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                <p>Throxy exists to solve this problem. We won’t be just another sales platform — we’re your outbound growth partner, combining proprietary technology, rich data intelligence, and human expertise to connect you with perfect-fit prospects others simply can’t reach.</p>
                <p>Our promise is simple: we deliver qualified meetings with decision-makers in hard-to-reach, lucrative industries. No dashboards to manage. No systems to learn. No resources to hire.</p>
                <p>Just a steady, predictable flow of high-value conversations that convert.</p>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-muted relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <AnimatedElement>
            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-3">How we work</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-16 max-w-xl leading-tight" style={{ fontFamily: "'PP Neue Montreal Arabic Medium', system-ui, sans-serif" }}>
              What makes us different.
            </h2>
          </AnimatedElement>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { num: "01", title: "Proprietary technology", desc: "We didn't buy a SaaS stack and resell it. We built our own outbound system from scratch — custom databases, niche-specific outreach engines, and feedback loops that improve every week." },
              { num: "02", title: "Managed execution", desc: "We don't give you a dashboard to stare at. We handle strategy, messaging, infrastructure, launch, and optimization. You just show up to the meetings we book." },
              { num: "03", title: "Traditional industry expertise", desc: "Manufacturing, logistics, construction, medical — these are our verticals. We understand how these buyers think, where they live online, and what messages resonate with them." },
            ].map((val, i) => (
              <AnimatedElement key={i} delay={i * 100}>
                <div className="bg-card rounded-lg p-6 h-full hover:-translate-y-1 hover:shadow-[0_20px_60px_-15px_hsl(var(--primary)/0.25)] transition-all duration-500">
                  <div className="text-4xl font-bold text-primary/30 mb-4 leading-none" style={{ fontFamily: "'PP Neue Montreal Arabic Medium', system-ui, sans-serif" }}>{val.num}</div>
                  <h3 className="text-base font-bold text-card-foreground mb-3" style={{ fontFamily: "'PP Neue Montreal Arabic Medium', system-ui, sans-serif" }}>{val.title}</h3>
                  <p className="text-sm text-card-foreground/60 leading-relaxed">{val.desc}</p>
                </div>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 bg-secondary relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[300px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <AnimatedElement>
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary-foreground mb-16 text-center" style={{ fontFamily: "'PP Neue Montreal Arabic Medium', system-ui, sans-serif" }}>
              Results that speak for themselves.
            </h2>
          </AnimatedElement>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { stat: "84%", label: "Average positive reply rate" },
              { stat: "5+", label: "Meetings booked per week on average" },
              { stat: "15h", label: "Hours saved per week per client" },
            ].map((item, i) => (
              <AnimatedElement key={i} delay={i * 100}>
                <div className="text-center">
                  <div className="text-5xl sm:text-6xl font-bold text-primary mb-3" style={{ fontFamily: "'PP Neue Montreal Arabic Medium', system-ui, sans-serif" }}>{item.stat}</div>
                  <p className="text-sm text-secondary-foreground/50">{item.label}</p>
                </div>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%270 0 256 256%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.9%27 numOctaves=%274%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23n)%27/%3E%3C/svg%3E")' }} />
        <AnimatedElement>
          <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground mb-4 leading-tight" style={{ fontFamily: "'PP Neue Montreal Arabic Medium', system-ui, sans-serif" }}>
              Ready to work with a team that actually delivers?
            </h2>
            <p className="text-sm text-primary-foreground/70 mb-8">Book a strategy call and let's talk about how we can fill your pipeline.</p>
            <a href="https://throxy.cal.com/forms/15483aea-e383-4659-97ec-60a125426c0c" target="_blank" rel="noopener noreferrer"
              className="relative inline-flex items-center gap-2 bg-secondary text-secondary-foreground text-sm font-medium px-7 py-3.5 rounded-sm overflow-hidden hover:opacity-90 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl">
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-secondary-foreground/5 to-transparent animate-[shimmer_3s_ease-in-out_infinite] bg-[length:200%_100%]" />
              Book a Strategy Call
            </a>
          </div>
        </AnimatedElement>
      </section>
    </div>
  );
}