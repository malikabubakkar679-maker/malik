import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Code2,
  Sparkles,
  Layers,
  Cpu,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";

// Register ScrollTrigger plugin safely
gsap.registerPlugin(ScrollTrigger);

const SKILLS_DATA = [
  {
    category: "DEVELOPMENT",
    badge: "ENGINEERING",
    description: "Core programming languages, frameworks, and scalable web architectures.",
    icon: Code2,
    skills: [
      { name: "React", level: 96 },
      { name: "Next.js", level: 92 },
      { name: "TypeScript", level: 90 },
      { name: "JavaScript (ES6+)", level: 95 },
      { name: "Node.js", level: 88 },
      { name: "HTML5 & CSS3", level: 98 },
      { name: "TailwindCSS", level: 95 },
      { name: "REST & GraphQL", level: 88 },
      { name: "Git & CI/CD", level: 90 },
    ],
  },
  {
    category: "MOTION & INTERACTION",
    badge: "ANIMATION",
    description: "Frame-rate locked kinetic motion, scroll choreography, and tactile feedback.",
    icon: Sparkles,
    skills: [
      { name: "GSAP (GreenSock)", level: 95 },
      { name: "ScrollTrigger", level: 96 },
      { name: "Framer Motion", level: 90 },
      { name: "Lenis Smooth Scroll", level: 94 },
      { name: "CSS Keyframes & Transitions", level: 96 },
      { name: "Micro-Interactions", level: 92 },
      { name: "Kinetic Physics", level: 88 },
      { name: "Performance Profiling", level: 92 },
    ],
  },
  {
    category: "DESIGN & SYSTEMS",
    badge: "UI / UX",
    description: "Editorial design systems, typography tokens, and user experience strategy.",
    icon: Layers,
    skills: [
      { name: "Figma Mastery", level: 95 },
      { name: "UI/UX Prototyping", level: 92 },
      { name: "Design Systems & Tokens", level: 90 },
      { name: "Typography & Layouts", level: 94 },
      { name: "Wireframing & IA", level: 88 },
      { name: "Component Architecture", level: 94 },
      { name: "Responsive Scaling", level: 96 },
      { name: "Accessibility (WCAG)", level: 90 },
    ],
  },
  {
    category: "3D & CREATIVE",
    badge: "WEBGL",
    description: "Real-time GPU graphics, custom GLSL shaders, and spatial web experiences.",
    icon: Cpu,
    skills: [
      { name: "Three.js", level: 88 },
      { name: "WebGL & GLSL Shaders", level: 84 },
      { name: "HTML5 Canvas 2D", level: 90 },
      { name: "Web Audio API", level: 82 },
      { name: "GPU Memory Profiling", level: 92 },
      { name: "Blender 3D Modeling", level: 80 },
      { name: "Camera Choreography", level: 86 },
      { name: "Lighting & Materials", level: 85 },
    ],
  },
];

export default function SkillsFigmaSection() {
  const sectionRef = useRef(null);
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const card3Ref = useRef(null);
  const card4Ref = useRef(null);
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Pin solidly for both desktop and mobile
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${window.innerHeight * 3.2}`,
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

      // --- CARD 1 (DEVELOPMENT): Starts visible, then transitions out ---
      tl.to(
        card1Ref.current,
        {
          opacity: 0,
          y: -50,
          scale: 0.96,
          ease: "power2.inOut",
          duration: 1.2,
        },
        1.5
      );

      // --- CARD 2 (MOTION & INTERACTION): Fades & glides in, holds, then fades out ---
      tl.fromTo(
        card2Ref.current,
        { opacity: 0, y: 60, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, ease: "power2.out", duration: 1.2 },
        2.8
      );
      tl.to(
        card2Ref.current,
        { opacity: 0, y: -50, scale: 0.96, ease: "power2.in", duration: 1.2 },
        5.2
      );

      // --- CARD 3 (DESIGN & SYSTEMS): Fades & glides in, holds, then fades out ---
      tl.fromTo(
        card3Ref.current,
        { opacity: 0, y: 60, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, ease: "power2.out", duration: 1.2 },
        6.5
      );
      tl.to(
        card3Ref.current,
        { opacity: 0, y: -50, scale: 0.96, ease: "power2.in", duration: 1.2 },
        8.8
      );

      // --- CARD 4 (3D & CREATIVE): Fades & glides in, settles till end ---
      tl.fromTo(
        card4Ref.current,
        { opacity: 0, y: 60, scale: 0.96 },
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

  const cardsRefs = [card1Ref, card2Ref, card3Ref, card4Ref];

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative w-full h-screen h-[100dvh] bg-[#FAF8F5] text-[#121214] select-none overflow-hidden flex flex-col justify-between py-6 sm:py-8 md:py-10 px-4 sm:px-8 md:px-12"
    >
      {/* Soft Ambient Radial Vignette */}
      <div
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(235,224,210,0.45)_0%,transparent_70%)] z-0"
        aria-hidden="true"
      />

      {/* 1. TOP CENTER PINNED HEADING & ACTIVE CATEGORY */}
      <header className="relative z-20 flex flex-col items-center text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-200/80 border border-neutral-300 text-neutral-800 text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] mb-2 shadow-sm">
          <TrendingUp className="w-3.5 h-3.5 text-[#BA9B70]" />
          <span>TECHNICAL ARSENAL</span>
        </div>

        <h2 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-[#121214]">
          SKILLS
        </h2>

        {/* Dynamic Category Subheading changing with scroll */}
        <div className="h-7 sm:h-8 flex items-center justify-center mt-1">
          <p className="text-sm sm:text-lg md:text-xl font-bold uppercase tracking-[0.25em] text-[#BA9B70] transition-all duration-300">
            {SKILLS_DATA[activeCategoryIndex].category}
          </p>
        </div>

        {/* Step Progress Pills */}
        <div className="flex items-center gap-1.5 sm:gap-2 mt-2">
          {SKILLS_DATA.map((item, idx) => (
            <div
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeCategoryIndex === idx
                  ? "w-7 sm:w-9 bg-[#BA9B70] shadow-[0_0_8px_rgba(186,155,112,0.8)]"
                  : "w-2 bg-neutral-300"
              }`}
            />
          ))}
        </div>
      </header>

      {/* 2. CENTER PINNED CARDS STACK */}
      <div className="relative z-10 w-full max-w-4xl mx-auto my-auto h-[62vh] sm:h-[60vh] max-h-[560px] flex items-center justify-center">
        {SKILLS_DATA.map((cat, catIdx) => {
          const Icon = cat.icon;
          return (
            <article
              key={catIdx}
              ref={cardsRefs[catIdx]}
              style={catIdx !== 0 ? { opacity: 0 } : undefined}
              className="absolute inset-0 w-full h-full bg-white/95 backdrop-blur-2xl border border-neutral-300/80 rounded-3xl p-5 sm:p-7 md:p-8 lg:p-9 shadow-[0_20px_50px_rgba(0,0,0,0.06)] flex flex-col justify-between will-change-transform"
            >
              {/* Card Header */}
              <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-neutral-200">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#BA9B70]/15 flex items-center justify-center text-[#BA9B70]">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-xl font-bold uppercase tracking-tight text-[#121214]">
                      {cat.category}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-neutral-500 font-sans hidden sm:block">
                      {cat.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-[10px] sm:text-xs font-mono uppercase tracking-wider bg-neutral-100 border border-neutral-300 text-neutral-700">
                    {cat.skills.length} TECHNOLOGIES
                  </span>
                  <span className="text-[11px] font-mono text-neutral-400 hidden sm:inline-block">
                    [ 0{catIdx + 1} / 04 ]
                  </span>
                </div>
              </div>

              {/* Skills Progress Bar Graphs Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 lg:gap-x-10 gap-y-3 sm:gap-y-4 my-auto py-2 overflow-y-auto max-h-[42vh] sm:max-h-none pr-1">
                {cat.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="space-y-1.5">
                    {/* Top Row: Skill Name & Percentage */}
                    <div className="flex items-center justify-between text-xs sm:text-sm font-medium">
                      <div className="flex items-center gap-2 text-[#121214]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#BA9B70] shrink-0" />
                        <span className="font-semibold">{skill.name}</span>
                      </div>
                      <span className="font-mono text-xs font-bold text-neutral-700">
                        {skill.level}%
                      </span>
                    </div>

                    {/* Progress Bar Graph */}
                    <div className="h-2 sm:h-2.5 w-full bg-neutral-200/80 rounded-full overflow-hidden p-[1px]">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#BA9B70] via-[#C9A675] to-[#121214] shadow-sm transition-all duration-1000 ease-out"
                        style={{
                          width: activeCategoryIndex === catIdx ? `${skill.level}%` : "0%",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Card Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-neutral-200 text-[10px] sm:text-xs font-mono text-neutral-500">
                <span>SCROLL DOWN TO REVEAL NEXT ARSENAL</span>
                <span className="text-[#BA9B70] font-semibold">
                  STAGE 0{catIdx + 1} OF 04
                </span>
              </div>
            </article>
          );
        })}
      </div>

      {/* 3. FOOTER HINT */}
      <footer className="relative z-20 flex items-center justify-between border-t border-neutral-300/80 pt-3 text-[10px] sm:text-xs font-mono text-neutral-500 max-w-4xl w-full mx-auto">
        <span className="uppercase tracking-widest font-semibold text-neutral-800">
          CHOREOGRAPHED SKILLS TIMELINE
        </span>
        <span className="text-neutral-500">
          Scroll to advance categories smoothly
        </span>
      </footer>
    </section>
  );
}
