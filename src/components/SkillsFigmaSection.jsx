import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TrendingUp, CheckCircle2 } from "lucide-react";

// Register ScrollTrigger plugin safely
gsap.registerPlugin(ScrollTrigger);

const SKILLS_DATA = [
  {
    category: "DEVELOPMENT",
    skills: [
      { name: "React", level: 96 },
      { name: "Next.js", level: 92 },
      { name: "TypeScript", level: 90 },
      { name: "JavaScript (ES6+)", level: 95 },
      { name: "Node.js", level: 88 },
      { name: "HTML5 & CSS3", level: 98 },
      { name: "TailwindCSS", level: 95 },
      { name: "REST & GraphQL", level: 88 },
    ],
  },
  {
    category: "MOTION & INTERACTION",
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
  const stage1Ref = useRef(null);
  const stage2Ref = useRef(null);
  const stage3Ref = useRef(null);
  const stage4Ref = useRef(null);
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

      // --- STAGE 1 (DEVELOPMENT): Starts visible, then transitions out ---
      tl.to(
        stage1Ref.current,
        {
          opacity: 0,
          y: -50,
          scale: 0.96,
          ease: "power2.inOut",
          duration: 1.2,
        },
        1.5
      );

      // --- STAGE 2 (MOTION & INTERACTION): Fades & glides in, holds, then fades out ---
      tl.fromTo(
        stage2Ref.current,
        { opacity: 0, y: 50, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, ease: "power2.out", duration: 1.2 },
        2.8
      );
      tl.to(
        stage2Ref.current,
        { opacity: 0, y: -50, scale: 0.96, ease: "power2.in", duration: 1.2 },
        5.2
      );

      // --- STAGE 3 (DESIGN & SYSTEMS): Fades & glides in, holds, then fades out ---
      tl.fromTo(
        stage3Ref.current,
        { opacity: 0, y: 50, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, ease: "power2.out", duration: 1.2 },
        6.5
      );
      tl.to(
        stage3Ref.current,
        { opacity: 0, y: -50, scale: 0.96, ease: "power2.in", duration: 1.2 },
        8.8
      );

      // --- STAGE 4 (3D & CREATIVE): Fades & glides in, settles till end ---
      tl.fromTo(
        stage4Ref.current,
        { opacity: 0, y: 50, scale: 0.96 },
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

  const stagesRefs = [stage1Ref, stage2Ref, stage3Ref, stage4Ref];

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative w-full h-screen h-[100dvh] bg-[#FAF8F5] text-[#121214] select-none overflow-hidden flex flex-col justify-between py-6 sm:py-8 md:py-10 px-4 sm:px-8 md:px-12"
    >
      {/* Soft Ambient Radial Vignette */}
      <div
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(235,224,210,0.5)_0%,transparent_70%)] z-0"
        aria-hidden="true"
      />

      {/* 1. TOP CENTER PINNED HEADING & ACTIVE CATEGORY */}
      <header className="relative z-20 flex flex-col items-center text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-200/80 border border-neutral-300 text-neutral-800 text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] mb-2 shadow-sm">
          <TrendingUp className="w-3.5 h-3.5 text-[#BA9B70]" />
          <span>TECHNICAL ARSENAL</span>
        </div>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-[#121214]">
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

      {/* 2. PAGE CENTER: PURE DIRECT CONTENT WITHOUT ANY BOXES OR CONTAINERS */}
      <div className="relative z-10 w-full max-w-4xl mx-auto my-auto flex items-center justify-center min-h-[46vh] sm:min-h-[48vh]">
        {SKILLS_DATA.map((cat, catIdx) => (
          <div
            key={catIdx}
            ref={stagesRefs[catIdx]}
            style={catIdx !== 0 ? { opacity: 0 } : undefined}
            className="absolute inset-0 w-full flex items-center justify-center will-change-transform"
          >
            {/* Skills Progress Bar Graphs Grid - Perfectly Centered & Inline Side-by-Side */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-14 gap-y-3 sm:gap-y-4 px-4 sm:px-6">
              {cat.skills.map((skill, sIdx) => (
                <div key={sIdx} className="flex items-center gap-3 sm:gap-4 py-1">
                  {/* Left: Icon + Technology Name */}
                  <div className="flex items-center gap-2 w-36 sm:w-44 shrink-0 text-[#121214]">
                    <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#BA9B70] shrink-0" />
                    <span className="font-bold text-xs sm:text-sm tracking-tight text-[#121214] truncate">
                      {skill.name}
                    </span>
                  </div>

                  {/* Center: Inline Bar Graph in front of the name */}
                  <div className="h-2 sm:h-2.5 flex-1 bg-neutral-200/90 rounded-full overflow-hidden p-[1px] shadow-inner">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#BA9B70] via-[#C9A675] to-[#121214] shadow-sm transition-all duration-1000 ease-out"
                      style={{
                        width: activeCategoryIndex === catIdx ? `${skill.level}%` : "0%",
                      }}
                    />
                  </div>

                  {/* Right: Percentage */}
                  <span className="font-mono text-xs sm:text-sm font-bold text-[#BA9B70] w-10 text-right shrink-0">
                    {skill.level}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 3. FOOTER HINT */}
      <footer className="relative z-20 flex items-center justify-between border-t border-neutral-300/80 pt-3 text-[10px] sm:text-xs font-mono text-neutral-500 max-w-4xl w-full mx-auto">
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
