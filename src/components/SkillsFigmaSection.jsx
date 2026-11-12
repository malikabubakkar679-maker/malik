import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TrendingUp } from "lucide-react";

// Register ScrollTrigger plugin safely
gsap.registerPlugin(ScrollTrigger);

// Crisp SVG Icons matching the reference design cards
const ReactIcon = () => (
  <svg className="w-5 h-5 text-[#00D8FF]" viewBox="0 0 115.3 100" fill="currentColor">
    <ellipse cx="57.65" cy="50" rx="16.5" ry="50" fill="none" stroke="currentColor" strokeWidth="6" transform="rotate(30 57.65 50)" />
    <ellipse cx="57.65" cy="50" rx="16.5" ry="50" fill="none" stroke="currentColor" strokeWidth="6" transform="rotate(90 57.65 50)" />
    <ellipse cx="57.65" cy="50" rx="16.5" ry="50" fill="none" stroke="currentColor" strokeWidth="6" transform="rotate(150 57.65 50)" />
    <circle cx="57.65" cy="50" r="9" />
  </svg>
);

const NextIcon = () => (
  <svg className="w-5 h-5 text-[#121214]" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M52 46V134M128 46V134L68 46" stroke="currentColor" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const TSIcon = () => (
  <span className="font-mono font-black text-xs text-[#3178C6] tracking-tighter">TS</span>
);

const JSIcon = () => (
  <span className="font-mono font-black text-xs text-[#E9CA32] tracking-tighter">JS</span>
);

const NodeIcon = () => (
  <svg className="w-5 h-5 text-[#539E43]" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L3.5 6.9v9.8L12 22l8.5-4.9V6.9L12 2zm6.7 13.7L12 19.5l-6.7-3.8V8.1L12 4.3l6.7 3.8v7.6z" />
  </svg>
);

const TailwindIcon = () => (
  <svg className="w-5 h-5 text-[#38BDF8]" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
  </svg>
);

const HtmlCssIcon = () => (
  <span className="font-mono font-black text-[10px] text-[#E34F26] tracking-tighter">HTML5</span>
);

const ApiIcon = () => (
  <svg className="w-5 h-5 text-[#E535AB]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
);

const GsapIcon = () => (
  <span className="font-mono font-black text-xs text-[#0AE448] tracking-tighter">GSAP</span>
);

const MotionIcon = () => (
  <span className="font-mono font-black text-xs text-[#F05340] tracking-tighter">FM</span>
);

const FigmaIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 38 57" fill="none">
    <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE" />
    <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83" />
    <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262" />
    <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E" />
    <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF" />
  </svg>
);

const ThreeIcon = () => (
  <span className="font-mono font-black text-xs text-[#121214] tracking-tighter">3D</span>
);

const PythonIcon = () => (
  <span className="font-mono font-black text-xs text-[#3776AB] tracking-tighter">PY</span>
);

const DatabaseIcon = () => (
  <svg className="w-5 h-5 text-[#336791]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
  </svg>
);

const SparklesIcon = () => (
  <svg className="w-5 h-5 text-[#BA9B70]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z" />
  </svg>
);

const CpuIcon = () => (
  <svg className="w-5 h-5 text-[#BA9B70]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <rect x="9" y="9" width="6" height="6" />
    <line x1="9" y1="1" x2="9" y2="4" />
    <line x1="15" y1="1" x2="15" y2="4" />
    <line x1="9" y1="20" x2="9" y2="23" />
    <line x1="15" y1="20" x2="15" y2="23" />
    <line x1="20" y1="9" x2="23" y2="9" />
    <line x1="20" y1="14" x2="23" y2="14" />
    <line x1="1" y1="9" x2="4" y2="9" />
    <line x1="1" y1="14" x2="4" y2="14" />
  </svg>
);

// Four Stages Data matching the exact Reference Design & Technical Arsenal
const SKILLS_DATA = [
  {
    label: "Development",
    category: "DEVELOPMENT",
    skills: [
      { name: "React", level: 96, icon: <ReactIcon /> },
      { name: "Next.js", level: 92, icon: <NextIcon /> },
      { name: "TypeScript", level: 90, icon: <TSIcon /> },
      { name: "JavaScript (ES6+)", level: 95, icon: <JSIcon /> },
      { name: "Node.js", level: 88, icon: <NodeIcon /> },
      { name: "TailwindCSS", level: 95, icon: <TailwindIcon /> },
      { name: "HTML5 & CSS3", level: 98, icon: <HtmlCssIcon /> },
      { name: "REST & GraphQL", level: 88, icon: <ApiIcon /> },
    ],
  },
  {
    label: "Frontend & UI",
    category: "FRONTEND & UI",
    skills: [
      { name: "GSAP (ScrollTrigger)", level: 96, icon: <GsapIcon /> },
      { name: "Framer Motion", level: 92, icon: <MotionIcon /> },
      { name: "Design Systems", level: 94, icon: <FigmaIcon /> },
      { name: "UI/UX Prototyping", level: 93, icon: <SparklesIcon /> },
      { name: "Micro-Interactions", level: 91, icon: <TailwindIcon /> },
      { name: "Lenis Smooth Scroll", level: 95, icon: <NextIcon /> },
      { name: "Responsive Scaling", level: 98, icon: <HtmlCssIcon /> },
      { name: "Accessibility (WCAG)", level: 90, icon: <TSIcon /> },
    ],
  },
  {
    label: "Backend & Cloud",
    category: "BACKEND & CLOUD",
    skills: [
      { name: "Python & FastAPI", level: 88, icon: <PythonIcon /> },
      { name: "PostgreSQL & Prisma", level: 92, icon: <DatabaseIcon /> },
      { name: "MongoDB & Mongoose", level: 89, icon: <NodeIcon /> },
      { name: "Firebase & Supabase", level: 94, icon: <ApiIcon /> },
      { name: "Docker & Containers", level: 86, icon: <NextIcon /> },
      { name: "Vercel & Edge Runtime", level: 95, icon: <NextIcon /> },
      { name: "Redis & Caching", level: 88, icon: <DatabaseIcon /> },
      { name: "CI/CD & Git Actions", level: 90, icon: <TSIcon /> },
    ],
  },
  {
    label: "AI & Tools",
    category: "AI & TOOLS",
    skills: [
      { name: "Claude & Gemini API", level: 95, icon: <CpuIcon /> },
      { name: "LangChain & RAG", level: 88, icon: <ApiIcon /> },
      { name: "Prompt Engineering", level: 96, icon: <SparklesIcon /> },
      { name: "Three.js & WebGL", level: 88, icon: <ThreeIcon /> },
      { name: "Figma to Code", level: 98, icon: <FigmaIcon /> },
      { name: "Vite & Rollup", level: 94, icon: <TailwindIcon /> },
      { name: "Chrome DevTools", level: 95, icon: <ReactIcon /> },
      { name: "GPU & Profiling", level: 92, icon: <CpuIcon /> },
    ],
  },
];

export default function SkillsFigmaSection() {
  const sectionRef = useRef(null);
  const stage1Ref = useRef(null);
  const stage2Ref = useRef(null);
  const stage3Ref = useRef(null);
  const stage4Ref = useRef(null);
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const scrollTriggerInstanceRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Pin solidly for both desktop and mobile while scrolling scrubs through categories
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${window.innerHeight * 3.0}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;
            const index = Math.min(3, Math.floor(p * 4));
            setActiveCategoryIndex(index);
          },
        },
      });

      scrollTriggerInstanceRef.current = tl.scrollTrigger;

      // STAGE 1 (DEVELOPMENT): Starts visible, then transitions out
      tl.to(
        stage1Ref.current,
        {
          opacity: 0,
          y: -40,
          scale: 0.96,
          ease: "power2.inOut",
          duration: 1.2,
        },
        1.5
      );

      // STAGE 2 (FRONTEND & UI): Fades & glides in, holds, then fades out
      tl.fromTo(
        stage2Ref.current,
        { opacity: 0, y: 40, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, ease: "power2.out", duration: 1.2 },
        2.8
      );
      tl.to(
        stage2Ref.current,
        { opacity: 0, y: -40, scale: 0.96, ease: "power2.in", duration: 1.2 },
        5.2
      );

      // STAGE 3 (BACKEND & CLOUD): Fades & glides in, holds, then fades out
      tl.fromTo(
        stage3Ref.current,
        { opacity: 0, y: 40, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, ease: "power2.out", duration: 1.2 },
        6.5
      );
      tl.to(
        stage3Ref.current,
        { opacity: 0, y: -40, scale: 0.96, ease: "power2.in", duration: 1.2 },
        8.8
      );

      // STAGE 4 (AI & TOOLS): Fades & glides in, settles till end
      tl.fromTo(
        stage4Ref.current,
        { opacity: 0, y: 40, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, ease: "power2.out", duration: 1.4 },
        10.1
      );

      // Settle at end
      tl.to({}, { duration: 1.2 });
    }, sectionRef);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  const handlePillClick = (idx) => {
    setActiveCategoryIndex(idx);
    if (scrollTriggerInstanceRef.current) {
      const st = scrollTriggerInstanceRef.current;
      const targetScroll = st.start + (st.end - st.start) * (idx / 3.6);
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    }
  };

  const stagesRefs = [stage1Ref, stage2Ref, stage3Ref, stage4Ref];

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative w-full h-[100dvh] bg-[#FAF8F5] text-[#121214] select-none overflow-hidden flex flex-col justify-between py-6 sm:py-8 md:py-10 px-4 sm:px-6 md:px-10"
    >
      {/* Soft Ambient Radial Vignette */}
      <div
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(235,224,210,0.5)_0%,transparent_70%)] z-0"
        aria-hidden="true"
      />

      {/* 1. TOP HEADER & CATEGORY PILLS (§2 Matching Reference Design Image) */}
      <header className="relative z-20 flex flex-col items-center text-center max-w-3xl mx-auto shrink-0 mb-2 sm:mb-4">
        {/* Top Tag Pill */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-200/80 border border-neutral-300 text-neutral-800 text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] mb-1.5 shadow-xs">
          <TrendingUp className="w-3.5 h-3.5 text-[#BA9B70]" />
          <span>TECHNICAL ARSENAL</span>
        </div>

        {/* Big Title: SKILLS */}
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-[#121214] font-sans">
          SKILLS
        </h2>

        {/* Subtitle: Category Name */}
        <p className="text-xs sm:text-sm md:text-base font-bold uppercase tracking-[0.28em] text-[#BA9B70] mt-1 transition-all duration-300">
          {SKILLS_DATA[activeCategoryIndex].category}
        </p>

        {/* Category Filter Pills (matching uploaded image exactly) */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mt-3 sm:mt-3.5">
          {SKILLS_DATA.map((cat, idx) => (
            <button
              key={cat.category}
              onClick={() => handlePillClick(idx)}
              className={`px-3.5 sm:px-4.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 cursor-pointer ${
                activeCategoryIndex === idx
                  ? "bg-[#201D19] text-[#FAF7F0] shadow-md ring-1 ring-[#D6A13D]/40 scale-102"
                  : "bg-[#FFFDF9] text-neutral-700 border border-[#E5DAC6] hover:border-[#D6A13D]/60 hover:text-neutral-900"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </header>

      {/* 2. 8 CARDS GRID IN CENTER (4x2 on Desktop, 2x4 on Mobile/Tablet) */}
      <div className="relative z-10 w-full flex-1 flex items-center justify-center max-w-6xl mx-auto px-3 sm:px-6 my-auto min-h-0">
        {SKILLS_DATA.map((cat, catIdx) => (
          <div
            key={catIdx}
            ref={stagesRefs[catIdx]}
            style={catIdx !== 0 ? { opacity: 0 } : undefined}
            className="absolute inset-0 w-full h-full flex items-center justify-center will-change-transform pointer-events-auto"
          >
            <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 lg:gap-5">
              {cat.skills.map((skill, sIdx) => (
                <div
                  key={sIdx}
                  className="group relative rounded-2xl bg-[#FFFDF9] border border-[#E5DAC6] p-4 sm:p-5 lg:p-6 shadow-[0_6px_20px_rgba(32,35,43,0.04),inset_0_1px_1px_rgba(255,255,255,0.9)] hover:shadow-[0_10px_28px_rgba(214,161,61,0.16)] hover:border-[#D6A13D]/60 transition-all duration-300 min-h-[118px] sm:min-h-[135px] lg:min-h-[148px] flex flex-col justify-between"
                >
                  {/* Upper Row: Icon Badge + Technology Name */}
                  <div className="flex items-center gap-3 sm:gap-3.5">
                    {/* Rounded Squircle Icon Badge with Soft Shadow & Border */}
                    <div className="w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 rounded-xl sm:rounded-2xl bg-[#FAF6EE] border border-[#E5DAC6] flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 group-hover:border-[#D6A13D]/40 transition-all duration-300">
                      {skill.icon}
                    </div>

                    {/* Technology Name */}
                    <span className="font-bold text-xs sm:text-sm lg:text-base text-[#121214] tracking-tight truncate">
                      {skill.name}
                    </span>
                  </div>

                  {/* Lower Row: Progress Bar + Percentage on the Right */}
                  <div className="flex items-center gap-2.5 sm:gap-3.5 mt-3 sm:mt-4">
                    <div className="flex-1 h-2 sm:h-2.5 bg-[#E8DDD0] rounded-full overflow-hidden p-[1px]">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#D6A13D] via-[#A87928] to-[#1F1E1B] transition-all duration-1000 ease-out"
                        style={{
                          width: activeCategoryIndex === catIdx ? `${skill.level}%` : "0%",
                        }}
                      />
                    </div>

                    {/* Percentage Label */}
                    <span className="font-bold text-xs sm:text-sm text-[#121214] font-mono shrink-0">
                      {skill.level}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 3. FOOTER STATUS BAR (matching Image 1) */}
      <footer className="relative z-20 flex items-center justify-between border-t border-neutral-300/80 pt-2.5 text-[10px] sm:text-xs font-mono text-neutral-500 max-w-5xl w-full mx-auto shrink-0">
        <span className="uppercase tracking-widest font-semibold text-neutral-800">
          STAGE 0{activeCategoryIndex + 1} OF 04
        </span>
        <span className="text-neutral-500">
          Scroll down to advance categories
        </span>
      </footer>
    </section>
  );
}
