import React, { useState } from "react";
import { PERSONAL_INFO } from "../data/portfolioData";
import { soundEngine } from "../utils/audioUtils";
import { sendContactEmail } from "../utils/resendEmail";
import confetti from "canvas-confetti";
import {
  Mail,
  ArrowUpRight,
  Send,
  CheckCircle2,
  Globe,
  Sparkles,
  Copy,
  Check,
  Code2,
  Palette,
  Laptop,
  Cpu,
} from "lucide-react";

const PROJECT_CATEGORIES = [
  { id: "web", label: "Full-Stack Web App", icon: <Laptop size={14} /> },
  { id: "software", label: "Software Architecture", icon: <Cpu size={14} /> },
  { id: "frontend", label: "UI/UX & Design Systems", icon: <Palette size={14} /> },
  { id: "creative", label: "WebGL & Creative Tech", icon: <Code2 size={14} /> },
];

export default function ContactSection() {
  const [selectedCategory, setSelectedCategory] = useState("Full-Stack Web App");
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [feedbackMsg, setFeedbackMsg] = useState("");

  const handleCopyEmail = () => {
    soundEngine.playClick();
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    soundEngine.playClick();
    setStatus("sending");

    try {
      const res = await sendContactEmail({
        name: formData.name,
        email: formData.email,
        projectType: selectedCategory,
        budget: "Flexible / Commission",
        timeline: "Standard Scope",
        message: formData.message,
      });

      if (res && res.success) {
        soundEngine.playChime(660, 0.4, "sine");
        setStatus("success");
        setFeedbackMsg(
          "Transmission successfully received! I will review your project requirements and reply within 24 hours."
        );

        try {
          confetti({
            particleCount: 100,
            spread: 80,
            origin: { y: 0.6 },
            colors: ["#BA9B70", "#121214", "#EBE0D2", "#10B981"],
          });
        } catch {
          // Graceful fallback
        }

        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
        setFeedbackMsg(
          `Could not dispatch automatically. Please email me directly at ${PERSONAL_INFO.email}`
        );
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
      setFeedbackMsg(
        `An unexpected issue occurred. Please email me directly at ${PERSONAL_INFO.email}`
      );
    }
  };

  return (
    <section
      id="contact"
      className="relative w-full bg-[#FAF8F5] text-[#121214] py-20 sm:py-28 md:py-36 px-6 sm:px-12 md:px-16 lg:px-20 border-t border-neutral-300/80 overflow-hidden"
    >
      {/* Ambient Radial Soft Backdrop Glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] pointer-events-none bg-[radial-gradient(ellipse_at_top,rgba(235,224,210,0.45)_0%,transparent_70%)] z-0"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* 1. Header Block with High-Impact Editorial Typography */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 md:mb-24">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-neutral-300/80 text-neutral-800 text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] mb-4 sm:mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#BA9B70]" />
            <span>INITIATE COLLABORATION</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-[#121214] leading-[1.06]">
            LET'S CRAFT SOMETHING <br className="hidden sm:block" />
            <span className="font-serif italic font-normal text-[#BA9B70] tracking-normal">
              EXTRAORDINARY TOGETHER.
            </span>
          </h2>

          <p className="text-neutral-600 text-sm sm:text-base md:text-lg leading-relaxed mt-4 sm:mt-6 max-w-2xl mx-auto">
            Whether you need a high-performance web platform, full-scale software architecture, or an interactive creative digital experience, let's discuss your vision.
          </p>
        </div>

        {/* 2. Interactive Workspace: 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column (5 Cols): Direct Contacts, Availability & Socials */}
          <div className="lg:col-span-5 flex flex-col gap-5 sm:gap-6">
            
            {/* Direct Email Card with One-Click Copy */}
            <div className="bg-white/85 backdrop-blur-sm border border-neutral-200/90 rounded-2xl p-6 sm:p-7 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:border-[#BA9B70]/70 transition-all duration-300">
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-[#BA9B70] font-bold block mb-2">
                DIRECT INBOX
              </span>
              <div className="flex items-center justify-between gap-3">
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="text-base sm:text-lg font-bold text-[#121214] hover:text-[#BA9B70] transition-colors truncate"
                  title="Click to Send Email"
                >
                  {PERSONAL_INFO.email}
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="p-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200/80 text-neutral-700 transition-colors shrink-0 cursor-pointer"
                  title="Copy email to clipboard"
                  aria-label="Copy email"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
              {copied && (
                <span className="text-xs text-emerald-600 font-medium mt-1.5 block">
                  ✓ Copied to clipboard!
                </span>
              )}
            </div>

            {/* Base Location & Live Status Card */}
            <div className="bg-white/85 backdrop-blur-sm border border-neutral-200/90 rounded-2xl p-6 sm:p-7 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-[#BA9B70] font-bold">
                  LOCATION & STATUS
                </span>
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-semibold tracking-wide">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>ACTIVE</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 text-neutral-800 text-sm sm:text-base font-medium">
                <Globe className="w-4 h-4 text-[#BA9B70] shrink-0" />
                <span>{PERSONAL_INFO.location}</span>
              </div>

              <p className="text-neutral-500 text-xs sm:text-sm mt-2 leading-relaxed">
                Available for selective worldwide remote contracts, engineering consulting, and technical collaborations.
              </p>
            </div>

            {/* Verified Network Profiles */}
            <div className="bg-white/85 backdrop-blur-sm border border-neutral-200/90 rounded-2xl p-6 sm:p-7 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-[#BA9B70] font-bold block mb-4">
                VERIFIED PROFILES
              </span>
              <div className="grid grid-cols-2 gap-2.5">
                {PERSONAL_INFO.socials.map((soc, idx) => (
                  <a
                    key={idx}
                    href={soc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-neutral-50 hover:bg-neutral-100 border border-neutral-200/70 text-xs sm:text-sm font-semibold text-[#121214] transition-all hover:border-[#BA9B70]/60"
                  >
                    <span>{soc.label}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-black" />
                  </a>
                ))}
              </div>
            </div>

            {/* Response Commitment Note */}
            <div className="p-5 rounded-2xl bg-[#EBE0D2]/40 border border-[#BA9B70]/30 text-xs sm:text-sm text-neutral-700 leading-relaxed">
              <span className="font-bold text-neutral-900 block mb-1">
                ⏱️ Quick Turnaround Commitment
              </span>
              Every inquiry is reviewed personally. You will receive technical feedback, architecture scope, and scheduling within 24 hours.
            </div>

          </div>

          {/* Right Column (7 Cols): Sleek Minimalist Project Inquiry Form */}
          <div className="lg:col-span-7 bg-white/95 backdrop-blur-md border border-neutral-200/90 rounded-3xl p-6 sm:p-9 md:p-10 shadow-[0_10px_35px_rgba(0,0,0,0.04)]">
            
            {status === "success" ? (
              <div className="py-12 text-center flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mb-5 shadow-sm">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#121214] tracking-tight">
                  Transmission Received!
                </h3>
                <p className="text-neutral-600 text-sm sm:text-base max-w-md mt-3 leading-relaxed">
                  {feedbackMsg}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    soundEngine.playClick();
                    setStatus("idle");
                  }}
                  className="mt-8 px-7 py-3 rounded-full bg-[#121214] text-white hover:bg-neutral-800 text-xs sm:text-sm font-semibold transition-all shadow-md cursor-pointer"
                >
                  Send Another Transmission
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* 1. Project Type Selector */}
                <div>
                  <label className="block text-[11px] sm:text-xs font-mono uppercase tracking-[0.15em] font-bold text-neutral-700 mb-3">
                    01. WHAT TYPE OF PROJECT ARE WE DISCUSSING?
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {PROJECT_CATEGORIES.map((cat) => {
                      const isSelected = selectedCategory === cat.label;
                      return (
                        <button
                          type="button"
                          key={cat.id}
                          onClick={() => {
                            soundEngine.playClick();
                            setSelectedCategory(cat.label);
                          }}
                          className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border text-xs sm:text-sm font-medium transition-all text-left cursor-pointer ${
                            isSelected
                              ? "bg-[#121214] text-white border-[#121214] shadow-sm"
                              : "bg-neutral-50/70 hover:bg-neutral-100/90 text-neutral-800 border-neutral-200/90"
                          }`}
                        >
                          <span className={isSelected ? "text-[#BA9B70]" : "text-neutral-500"}>
                            {cat.icon}
                          </span>
                          <span className="truncate">{cat.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Client Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] sm:text-xs font-mono uppercase tracking-[0.15em] font-bold text-neutral-700 mb-2">
                      YOUR NAME *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah Jenkins"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-neutral-50/80 border border-neutral-200/90 text-[#121214] placeholder-neutral-400 text-sm focus:outline-none focus:border-[#BA9B70] focus:bg-white transition-all shadow-inner"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] sm:text-xs font-mono uppercase tracking-[0.15em] font-bold text-neutral-700 mb-2">
                      EMAIL ADDRESS *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. sarah@studio.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-neutral-50/80 border border-neutral-200/90 text-[#121214] placeholder-neutral-400 text-sm focus:outline-none focus:border-[#BA9B70] focus:bg-white transition-all shadow-inner"
                    />
                  </div>
                </div>

                {/* 3. Project Message / Vision */}
                <div>
                  <label className="block text-[11px] sm:text-xs font-mono uppercase tracking-[0.15em] font-bold text-neutral-700 mb-2">
                    PROJECT VISION & OBJECTIVES *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell me briefly about what you're building, target timelines, or any links..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-neutral-50/80 border border-neutral-200/90 text-[#121214] placeholder-neutral-400 text-sm focus:outline-none focus:border-[#BA9B70] focus:bg-white transition-all resize-y shadow-inner"
                  />
                </div>

                {status === "error" && (
                  <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm">
                    {feedbackMsg}
                  </div>
                )}

                {/* Submit Action */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-[#121214] text-white hover:bg-neutral-800 text-xs sm:text-sm font-bold uppercase tracking-widest transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-60 cursor-pointer"
                  >
                    {status === "sending" ? (
                      <>
                        <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                        <span>DISPATCHING VIA RESEND...</span>
                      </>
                    ) : (
                      <>
                        <span>DISPATCH INQUIRY</span>
                        <Send size={15} />
                      </>
                    )}
                  </button>
                  <p className="text-center text-[11px] text-neutral-400 mt-3 font-mono">
                    Direct confidential transmission • Encrypted & zero spam
                  </p>
                </div>
              </form>
            )}

          </div>

        </div>
      </div>
    </section>
  );
}
