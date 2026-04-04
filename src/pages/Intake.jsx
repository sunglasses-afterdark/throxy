import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Send, RotateCcw, Check } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";

// ─── Typewriter hook ──────────────────────────────────────────────────────────
function useTypewriter(text, speed = 18, enabled = true) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!enabled || !text) { setDisplayed(text || ""); setDone(true); return; }
    setDisplayed("");
    setDone(false);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) { clearInterval(interval); setDone(true); }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed, enabled]);

  return { displayed, done };
}

// ─── Scripted conversation fallback ──────────────────────────────────────────
const TYPE_LABEL = {
  workflow: "Workflow Redesign",
  integration: "System Integration",
  ai: "AI / MCP Build",
  data: "Data Architecture",
  other: "Something else",
};

function formatTypeList(types) {
  if (!types || types.length === 0) return null;
  const labels = types.map((t) => TYPE_LABEL[t] || t);
  if (labels.length === 1) return labels[0];
  return labels.slice(0, -1).join(", ") + " and " + labels[labels.length - 1];
}

function getScriptedResponse(step, context) {
  const { name, types } = context;
  const typeList = formatTypeList(types);

  const scripts = [
    `Hi there. I help scope projects for Alexander so he can respond quickly and with the right context. What's your name?`,
    `Nice to meet you, ${name || "there"}. ${typeList ? `You've flagged interest in ${typeList} — ` : ""}What's the core problem you're trying to solve? Describe it in plain terms — no need to be technical.`,
    `Got it. What tools or systems are currently involved? Think: CRM, ERP, databases, spreadsheets, custom code, any platform your team touches.`,
    `Helpful context. What does success look like? What needs to be true in 3–6 months for this to be a real win for your team?`,
    `Last question: what's your urgency, and do you have a rough sense of budget range? Even a ballpark helps Alexander scope the engagement correctly.`,
    `Perfect — I have everything I need to put together a brief for Alexander. Drop your email and he'll review this personally and follow up within 24 hours.`,
  ];

  return scripts[step] || scripts[scripts.length - 1];
}

// ─── Claude API call ──────────────────────────────────────────────────────────
async function callClaude(messages) {
  const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
  if (!apiKey) return null;

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
        "anthropic-dangerous-direct-browser-access": "true",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 200,
        system: `You are the intake assistant for Alexander Blackwood, a senior GTM engineer and AI systems consultant based in Delray Beach, FL.

Your job: conduct a friendly, focused project intake conversation to help scope potential engagements.

Conversation flow (strictly ONE question per message):
1. Ask for the person's name
2. Ask about their core workflow/systems problem (plain terms)
3. Ask what tools/systems are involved (CRM, ERP, databases, etc.)
4. Ask what success looks like in 3–6 months
5. Ask about urgency and rough budget range
6. Ask for their email to send the brief to Alexander

After you've collected all 5 pieces of information + email, summarize the project brief clearly.

Rules:
- Keep responses under 60 words
- Warm but professional tone
- Ask exactly ONE question per message
- Reference details the person has shared to show you're listening
- Sound like a knowledgeable consultant, not a chatbot`,
        messages,
      }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.content[0]?.text || null;
  } catch {
    return null;
  }
}

// ─── Message component ────────────────────────────────────────────────────────
function AssistantMessage({ text, isLatest }) {
  const { displayed, done } = useTypewriter(text, 16, isLatest);

  return (
    <div className="flex items-start gap-3 max-w-[85%]">
      <div className="w-7 h-7 rounded-sm bg-primary flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
        <span className="text-primary-foreground font-black text-xs leading-none" style={{ fontFamily: "'PP Neue Montreal Arabic Medium', system-ui, sans-serif" }}>A</span>
      </div>
      <div className="bg-card rounded-xl rounded-tl-sm px-4 py-3 border border-white/5 shadow-sm">
        <p className="text-sm text-card-foreground/85 leading-relaxed">
          {displayed}
          {!done && <span className="inline-block w-0.5 h-4 bg-primary/70 ml-0.5 animate-typing-cursor align-middle" />}
        </p>
      </div>
    </div>
  );
}

function UserMessage({ text, initial }) {
  return (
    <div className="flex items-start gap-3 max-w-[85%] ml-auto flex-row-reverse">
      <div className="w-7 h-7 rounded-full bg-muted border border-border flex items-center justify-center flex-shrink-0 mt-0.5">
        <span className="text-xs text-muted-foreground font-semibold">{initial || "•"}</span>
      </div>
      <div className="bg-background rounded-xl rounded-tr-sm px-4 py-3 border border-border shadow-sm">
        <p className="text-sm text-foreground leading-relaxed">{text}</p>
      </div>
    </div>
  );
}

function ThinkingIndicator() {
  return (
    <div className="flex items-start gap-3 max-w-[85%]">
      <div className="w-7 h-7 rounded-sm bg-primary flex items-center justify-center flex-shrink-0 shadow-sm">
        <span className="text-primary-foreground font-black text-xs leading-none" style={{ fontFamily: "'PP Neue Montreal Arabic Medium', system-ui, sans-serif" }}>A</span>
      </div>
      <div className="bg-card rounded-xl rounded-tl-sm px-4 py-3.5 border border-white/5 shadow-sm">
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-card-foreground/30"
              style={{ animation: `pulse-dot 1.4s ease-in-out ${i * 0.2}s infinite` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Selection artifact ───────────────────────────────────────────────────────
const TYPE_ICONS = {
  workflow: "⟳",
  integration: "⚡",
  ai: "✦",
  data: "◈",
  other: "</>",
};

function SelectionArtifact({ types }) {
  if (!types || types.length === 0) return null;
  return (
    <div className="flex items-start gap-3 max-w-[92%]">
      <div className="w-7 h-7 rounded-sm bg-primary flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
        <span className="text-primary-foreground font-black text-xs leading-none" style={{ fontFamily: "'PP Neue Montreal Arabic Medium', system-ui, sans-serif" }}>A</span>
      </div>
      <div className="bg-card rounded-xl rounded-tl-sm px-4 py-3 border border-white/5 shadow-sm">
        <p className="text-xs text-card-foreground/50 mb-2.5 font-mono uppercase tracking-widest">Areas of interest</p>
        <div className="flex flex-wrap gap-2">
          {types.map((t) => (
            <span
              key={t}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border"
              style={{
                background: "hsl(225 78% 62% / 0.12)",
                border: "1px solid hsl(225 78% 62% / 0.35)",
                color: "hsl(225 78% 72%)",
              }}
            >
              <span style={{ fontSize: "10px" }}>{TYPE_ICONS[t] || "·"}</span>
              {TYPE_LABEL[t] || t}
            </span>
          ))}
        </div>
        <p className="text-xs text-card-foreground/40 mt-2.5 leading-snug">
          {types.length > 1
            ? "We'll tailor the conversation to cover each of these."
            : "We'll tailor the conversation around this."}
        </p>
      </div>
    </div>
  );
}

// ─── Summary card ─────────────────────────────────────────────────────────────
function SummaryCard({ context }) {
  return (
    <div className="neuo-dark rounded-xl p-6 space-y-4">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
          <Check className="w-3 h-3 text-primary" />
        </div>
        <p className="text-xs font-semibold text-card-foreground/60 uppercase tracking-widest">Project Brief Submitted</p>
      </div>
      {[
        { label: "Name", value: context.name },
        { label: "Problem", value: context.problem },
        { label: "Systems", value: context.systems },
        { label: "Success looks like", value: context.outcome },
        { label: "Timeline / Budget", value: context.timeline },
        { label: "Email", value: context.email },
      ].filter(f => f.value).map((field) => (
        <div key={field.label}>
          <p className="text-xs text-card-foreground/40 uppercase tracking-widest mb-1">{field.label}</p>
          <p className="text-sm text-card-foreground/80 leading-relaxed">{field.value}</p>
        </div>
      ))}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
const FIELDS = ["name", "problem", "systems", "outcome", "timeline", "email"];

export default function Intake() {
  const [searchParams] = useSearchParams();
  // Support both ?types=workflow,ai (multi) and legacy ?type=workflow (single)
  const initialTypes = (() => {
    const multi = searchParams.get("types");
    if (multi) return multi.split(",").filter(Boolean);
    const single = searchParams.get("type");
    if (single) return [single];
    return [];
  })();

  const [messages, setMessages] = useState([]);          // { role: "assistant"|"user", text: string, initial?: string }
  const [input, setInput] = useState("");
  const [step, setStep] = useState(0);
  const [thinking, setThinking] = useState(false);
  const [done, setDone] = useState(false);
  const [context, setContext] = useState({ types: initialTypes });
  const [apiMessages, setApiMessages] = useState([]);    // Claude API format
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  // Start conversation — selection artifact then opener
  useEffect(() => {
    const opener = getScriptedResponse(0, { types: initialTypes });
    setMessages([{ role: "assistant", text: opener }]);
  }, []);

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, thinking]);

  // Focus input when not thinking
  useEffect(() => {
    if (!thinking && !done) inputRef.current?.focus();
  }, [thinking, done]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || thinking) return;

    setInput("");

    // Store user message — use first letter of name if we have it, else first letter of what they typed
    const nameInitial = context.name
      ? context.name.trim()[0].toUpperCase()
      : (step === 0 ? text.trim()[0].toUpperCase() : "•");
    const userMsg = { role: "user", text, initial: nameInitial };
    setMessages((prev) => [...prev, userMsg]);

    // Update context with current field
    const field = FIELDS[step];
    const newContext = { ...context, [field]: text };
    setContext(newContext);

    // Build API messages
    const newApiMessages = [...apiMessages, { role: "user", content: text }];
    setApiMessages(newApiMessages);

    // Check if we're done after email
    if (step >= FIELDS.length - 1) {
      setThinking(true);
      await new Promise((r) => setTimeout(r, 800));
      setThinking(false);
      const closingText = `You're all set, ${newContext.name || "there"}. Alexander has your brief and will follow up at ${text} within 24 hours. You can also reach him directly at alexander@alexblackwood.xyz.`;
      setMessages((prev) => [...prev, { role: "assistant", text: closingText }]);
      setDone(true);
      return;
    }

    setThinking(true);

    // Try Claude API first, fallback to scripted
    let reply = await callClaude(newApiMessages);

    if (!reply) {
      // Fallback: scripted response for next step
      await new Promise((r) => setTimeout(r, 700 + Math.random() * 400));
      reply = getScriptedResponse(step + 1, newContext);
    }

    setApiMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    setMessages((prev) => [...prev, { role: "assistant", text: reply }]);
    setThinking(false);
    setStep((s) => s + 1);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const restart = () => {
    setMessages([{ role: "assistant", text: getScriptedResponse(0, { types: initialTypes }) }]);
    setInput("");
    setStep(0);
    setThinking(false);
    setDone(false);
    setContext({ types: initialTypes });
    setApiMessages([]);
  };

  const progress = done ? 100 : Math.min((step / FIELDS.length) * 100, 100);

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-3xl mx-auto px-4 py-12 sm:py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-muted-foreground uppercase tracking-widest">Project Intake</p>
            {step > 0 && !done && (
              <button onClick={restart} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
                <RotateCcw className="w-3 h-3" /> Start over
              </button>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Tell me about your project.</h1>
          <p className="text-sm text-muted-foreground">Takes 2 minutes. Alexander reviews every brief personally and responds within 24 hours.</p>

          {/* Progress bar */}
          <div className="mt-5 h-1 bg-border rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-xs text-muted-foreground">{FIELDS[Math.min(step, FIELDS.length - 1)].charAt(0).toUpperCase() + FIELDS[Math.min(step, FIELDS.length - 1)].slice(1)}</span>
            <span className="text-xs text-muted-foreground">{Math.round(progress)}%</span>
          </div>
        </motion.div>

        {/* Chat window */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="neuo-dark rounded-2xl overflow-hidden"
        >
          {/* Chat messages */}
          <div
            ref={scrollRef}
            className="h-[420px] overflow-y-auto p-5 space-y-4 scrollbar-hide"
          >
            {/* Selection artifact — shown once at top if types were pre-selected */}
            {initialTypes.length > 0 && (
              <SelectionArtifact types={initialTypes} />
            )}

            <AnimatePresence initial={false}>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {msg.role === "assistant" ? (
                    <AssistantMessage text={msg.text} isLatest={i === messages.length - 1 && !thinking} />
                  ) : (
                    <UserMessage text={msg.text} initial={msg.initial} />
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {thinking && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <ThinkingIndicator />
              </motion.div>
            )}
          </div>

          {/* Input area */}
          {!done ? (
            <div className="border-t border-white/6 p-4">
              <div className="flex items-end gap-3">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={step === FIELDS.length - 1 ? "your@email.com" : "Type your response..."}
                  rows={1}
                  disabled={thinking}
                  className="flex-1 bg-secondary-foreground/5 text-secondary-foreground placeholder-secondary-foreground/30 text-sm rounded-xl px-4 py-3 border border-secondary-foreground/10 focus:outline-none focus:border-primary/50 focus:bg-secondary-foreground/7 resize-none transition-all disabled:opacity-40"
                  style={{ minHeight: "44px", maxHeight: "120px" }}
                  onInput={(e) => {
                    e.target.style.height = "auto";
                    e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
                  }}
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || thinking}
                  className="w-11 h-11 rounded-full bg-primary flex items-center justify-center flex-shrink-0 btn-neuo-primary hover:opacity-90 transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:-translate-y-0.5 active:translate-y-0"
                >
                  <Send className="w-4 h-4 text-primary-foreground" />
                </button>
              </div>
              <p className="text-xs text-secondary-foreground/25 mt-2 ml-1">Press Enter to send · Shift+Enter for newline</p>
            </div>
          ) : (
            <div className="border-t border-white/6 p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <Check className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-secondary-foreground">Brief submitted</p>
                  <p className="text-xs text-secondary-foreground/50">Alexander will respond within 24 hours</p>
                </div>
              </div>
              <a
                href="mailto:alexander@alexblackwood.xyz"
                className="inline-flex items-center gap-2 text-xs text-secondary-foreground/50 hover:text-secondary-foreground transition-colors"
              >
                Or email directly: alexander@alexblackwood.xyz
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          )}
        </motion.div>

        {/* Summary (shown after completion) */}
        {done && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6"
          >
            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-3">Your project brief</p>
            <SummaryCard context={context} />
            <div className="mt-6 flex items-center gap-4">
              <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                ← Back to home
              </Link>
              <button onClick={restart} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <RotateCcw className="w-3.5 h-3.5" /> Submit another
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
