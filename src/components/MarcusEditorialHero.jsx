import React, { useState, useEffect } from "react";
import { X, Sparkles, UserCheck } from "lucide-react";

const BG_IMAGE_URL =
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260729_022513_486985a2-ac8c-4278-91a8-071dcd9fcaff.png&w=1280&q=85";

const REFERENCE_PORTRAIT_URL =
  "https://stone-expand-60400629.figma.site/_assets/v11/8da570354e86aa0d44ac3e4aa335a72c8e750d68.png";

const USER_CUSTOM_PORTRAIT_URL = "/images/user-portrait-hero.png";

export default function MarcusEditorialHero({
  initialUseUserPortrait = true,
  nameMode = "marcus",
}) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [useUserPortrait, setUseUserPortrait] = useState(initialUseUserPortrait);
  const [currentNameMode, setCurrentNameMode] = useState(nameMode);
  const [showSwitcher, setShowSwitcher] = useState(false);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isDrawerOpen]);

  const navItems = ["Story", "Jobs", "Message"];
  const socialItems = ["Instagram", "TikTok", "YouTube"];

  const displayName =
    currentNameMode === "marcus" ? "Marcus — Bennet" : "Malik — Abubakkar";
  const brandName = currentNameMode === "marcus" ? "Marcus" : "Malik";
  const portraitSrc = useUserPortrait
    ? USER_CUSTOM_PORTRAIT_URL
    : REFERENCE_PORTRAIT_URL;

  return (
    <section className="editorial-hero-root relative h-[100dvh] w-full overflow-hidden text-cream font-hn select-none">
      {/* 1. BACKGROUND IMAGE (Full-bleed, behind everything, Layer default / z-0) */}
      <img
        src={BG_IMAGE_URL}
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = "/images/editorial-bg.webp";
        }}
        alt=""
        className="editorial-hero-img absolute inset-0 h-full w-full object-cover anim-fade-in"
      />

      {/* 2. MARQUEE NAME (Layer: z-10) */}
      <div
        className="absolute inset-x-0 top-[16vh] sm:top-[14vh] z-10 overflow-hidden anim-fade-up pointer-events-none"
        style={{ animationDelay: "500ms" }}
      >
        <div className="marquee flex w-max whitespace-nowrap font-hn text-[16vh] sm:text-[26vh] leading-none text-cream tracking-tight">
          <span className="pr-[6vw] inline-block font-hn">
            {brandName} &mdash;{" "}
            {currentNameMode === "marcus" ? "Bennet" : "Abubakkar"}&nbsp;
          </span>
          <span className="pr-[6vw] inline-block font-hn">
            {brandName} &mdash;{" "}
            {currentNameMode === "marcus" ? "Bennet" : "Abubakkar"}&nbsp;
          </span>
        </div>
      </div>

      {/* 3. HORIZONTAL CREAM RULE (Layer: z-10) */}
      <div
        className="absolute inset-x-6 sm:inset-x-10 bottom-[5.5rem] sm:bottom-28 z-10 h-0.5 bg-cream anim-line"
        style={{ animationDelay: "1200ms", transformOrigin: "left" }}
      />

      {/* 4. FRONT PORTRAIT (Cutout overlay, above marquee, pointer-events none, Layer: z-20) */}
      <img
        src={portraitSrc}
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = "/images/reference-portrait.png";
        }}
        alt="Portrait"
        className="editorial-hero-img absolute inset-0 h-full w-full object-cover pointer-events-none z-20 anim-rise-in"
        style={{ animationDelay: "300ms" }}
      />

      {/* 5. HEADER (Layer: z-30) */}
      <header className="absolute inset-x-0 top-0 z-30 flex items-start justify-between px-6 pt-6 sm:px-10 sm:pt-8 text-cream">
        {/* Brand / logo link (top-left) */}
        <a
          href="#"
          className="font-hn text-lg tracking-wide text-cream anim-fade-up hover:opacity-80 transition-opacity duration-300"
          style={{ animationDelay: "800ms" }}
        >
          {brandName}
        </a>

        {/* Right cluster (desktop only) */}
        <div className="hidden sm:flex items-start gap-16 lg:gap-24">
          {/* Year */}
          <span
            className="text-sm font-hn text-cream anim-fade-up"
            style={{ animationDelay: "900ms" }}
          >
            2025
          </span>

          {/* Nav column */}
          <nav className="flex flex-col gap-0.5 text-sm font-hn">
            {navItems.map((item, idx) => (
              <a
                key={item}
                href="#"
                className="text-cream transition-opacity duration-300 hover:opacity-60 anim-fade-up"
                style={{ animationDelay: `${1000 + idx * 80}ms` }}
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Social column */}
          <div className="flex flex-col gap-0.5 text-sm font-hn">
            {socialItems.map((item, idx) => (
              <a
                key={item}
                href="#"
                className="text-cream transition-opacity duration-300 hover:opacity-60 anim-fade-up"
                style={{ animationDelay: `${1150 + idx * 80}ms` }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>

        {/* Hamburger / Close morph button (mobile only, Layer: z-50) */}
        <button
          type="button"
          aria-label={isDrawerOpen ? "Close menu" : "Open menu"}
          onClick={() => setIsDrawerOpen(!isDrawerOpen)}
          className="sm:hidden relative z-50 h-10 w-10 flex items-center justify-center cursor-pointer anim-fade-up p-1"
          style={{ animationDelay: "900ms" }}
        >
          <div className="relative h-4 w-6 flex flex-col justify-between">
            <span
              className={`h-0.5 w-full bg-cream transition-all duration-500 origin-center ${
                isDrawerOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
              style={{ transitionTimingFunction: "cubic-bezier(0.76, 0, 0.24, 1)" }}
            />
            <span
              className={`h-0.5 w-full bg-cream transition-opacity duration-300 ${
                isDrawerOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`h-0.5 w-full bg-cream transition-all duration-500 origin-center ${
                isDrawerOpen ? "-translate-y-[7px] -rotate-45" : ""
              }`}
              style={{ transitionTimingFunction: "cubic-bezier(0.76, 0, 0.24, 1)" }}
            />
          </div>
        </button>
      </header>

      {/* 6. FOOTER (Desktop Layer: sm:z-10, Mobile Layer: z-30) */}
      <footer className="absolute inset-x-0 bottom-0 z-30 sm:z-10 flex items-end justify-between px-6 pb-5 sm:px-10 sm:pb-8 text-xs sm:text-sm leading-relaxed font-hn text-cream pointer-events-none">
        {/* Footer left (three lines) */}
        <div
          className="anim-fade-up flex flex-col pointer-events-auto"
          style={{ animationDelay: "1400ms" }}
        >
          <span>Visuals Composer</span>
          <span>Digital Crafter</span>
          <span>Obsessed by The Office</span>
        </div>

        {/* Footer right (right-aligned) */}
        <div
          className="anim-fade-up flex flex-col text-right pointer-events-auto"
          style={{ animationDelay: "1550ms" }}
        >
          <span>A homage to</span>
          <span>Marcus Holloway</span>
        </div>
      </footer>

      {/* 7. MOBILE DRAWER (Layer: z-40) */}
      {/* Backdrop */}
      <div
        onClick={() => setIsDrawerOpen(false)}
        className={`sm:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-500 ${
          isDrawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer Panel */}
      <aside
        className={`sm:hidden fixed right-0 top-0 bottom-0 z-40 w-[80%] max-w-sm bg-[#141414] px-8 py-10 transition-transform duration-600 flex flex-col justify-between ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          transitionTimingFunction: "cubic-bezier(0.76, 0, 0.24, 1)",
        }}
      >
        {/* Dedicated Close Button (Lucide X size 26, strokeWidth 1.5) */}
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setIsDrawerOpen(false)}
          className={`absolute right-6 top-6 text-cream cursor-pointer transition-all duration-300 ${
            isDrawerOpen
              ? "rotate-0 opacity-100 delay-300"
              : "rotate-90 opacity-0"
          }`}
        >
          <X size={26} strokeWidth={1.5} />
        </button>

        {/* Top: Site Index */}
        <div className="pt-8">
          <span
            className={`block text-xs uppercase tracking-[0.2em] text-cream/50 transition-all duration-500 ${
              isDrawerOpen
                ? "opacity-100 translate-y-0 delay-[250ms]"
                : "opacity-0 -translate-y-2"
            }`}
          >
            Site Index
          </span>
          <nav className="mt-6 flex flex-col gap-4">
            {navItems.map((item, idx) => (
              <a
                key={item}
                href="#"
                onClick={() => setIsDrawerOpen(false)}
                className={`text-4xl font-hn text-cream transition-all duration-500 hover:opacity-60 ${
                  isDrawerOpen
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }`}
                style={{
                  transitionDelay: isDrawerOpen
                    ? `${300 + idx * 80}ms`
                    : "0ms",
                }}
              >
                {item}
              </a>
            ))}
          </nav>
        </div>

        {/* Bottom: Find Me */}
        <div className="pb-4">
          <span
            className={`block text-xs uppercase tracking-[0.2em] text-cream/50 transition-all duration-500 ${
              isDrawerOpen
                ? "opacity-100 translate-y-0 delay-[500ms]"
                : "opacity-0 -translate-y-2"
            }`}
          >
            Find Me
          </span>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
            {socialItems.map((item, idx) => (
              <a
                key={item}
                href="#"
                onClick={() => setIsDrawerOpen(false)}
                className={`text-sm font-hn text-cream transition-all duration-500 hover:opacity-60 ${
                  isDrawerOpen
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
                style={{
                  transitionDelay: isDrawerOpen
                    ? `${550 + idx * 60}ms`
                    : "0ms",
                }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </aside>

      {/* Discreet Interactive Identity & Portrait Switcher (Bottom-center, subtle) */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-30 pointer-events-auto">
        {showSwitcher ? (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-cream/20 text-[11px] text-cream/90 shadow-2xl transition-all">
            <button
              type="button"
              onClick={() => setUseUserPortrait(true)}
              className={`px-2.5 py-1 rounded-full transition-all ${
                useUserPortrait
                  ? "bg-cream text-black font-semibold"
                  : "hover:text-cream text-cream/60"
              }`}
            >
              My Photo (Editorial Outfit)
            </button>
            <button
              type="button"
              onClick={() => setUseUserPortrait(false)}
              className={`px-2.5 py-1 rounded-full transition-all ${
                !useUserPortrait
                  ? "bg-cream text-black font-semibold"
                  : "hover:text-cream text-cream/60"
              }`}
            >
              Prompt Reference Cutout
            </button>
            <span className="w-px h-3 bg-cream/20" />
            <button
              type="button"
              onClick={() =>
                setCurrentNameMode(
                  currentNameMode === "marcus" ? "malik" : "marcus"
                )
              }
              className="px-2 py-1 hover:text-cream text-cream/60 underline underline-offset-2"
            >
              Name: {brandName}
            </button>
            <button
              type="button"
              onClick={() => setShowSwitcher(false)}
              className="text-cream/40 hover:text-cream ml-1 text-xs"
              title="Close switcher"
            >
              ✕
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setShowSwitcher(true)}
            title="Toggle Portrait (User Styled vs Reference)"
            className="opacity-25 hover:opacity-90 transition-opacity text-cream p-1 rounded-full text-[10px] flex items-center gap-1 bg-black/30 backdrop-blur-sm px-2"
          >
            <Sparkles size={11} />
            <span>Portrait: {useUserPortrait ? "User Photo" : "Reference"}</span>
          </button>
        )}
      </div>
    </section>
  );
}
