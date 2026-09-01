import React from "react";
import Hero from "./Hero";
import IntroStatement from "./IntroStatement";
import FeaturedProjects from "./FeaturedProjects";
import AboutSection from "./AboutSection";
import ServicesSection from "./ServicesSection";
import DarkFeatureSection from "./DarkFeatureSection";
import SkillsFigmaSection from "./SkillsFigmaSection";
import ExperienceTimeline from "./ExperienceTimeline";
import CreativeProcess from "./CreativeProcess";
import MotionShowcase from "./MotionShowcase";
import ContactSection from "./ContactSection";
import Footer from "./Footer";

export default function Home({ isIntroReady, onOpenInquiry }) {
  return (
    <main className="home-editorial-wrap">
      {/* 1. Hero with Kinetic Typography & Liquid Portrait */}
      <Hero isIntroReady={isIntroReady} />

      {/* 2. Editorial Statement & Stats */}
      <IntroStatement />

      {/* 3. Featured Projects (Asymmetric Magazine Spreads) */}
      <FeaturedProjects />

      {/* 4. About Me (Malik Abubakkar Engineering Profile) */}
      <AboutSection />

      {/* 5. Services (Numbered Interactive Rows) */}
      <ServicesSection />

      {/* 6. Strategic Dark Feature Section (Deep Midnight Navy Contrast) */}
      <DarkFeatureSection onOpenInquiry={onOpenInquiry} />

      {/* 7. Skills & Figma Workflow Pipeline */}
      <SkillsFigmaSection />

      {/* 8. Experience & Career Timeline */}
      <ExperienceTimeline />

      {/* 9. Creative Process (6-Stage Methodology) */}
      <CreativeProcess />

      {/* 10. Motion & Kinetic Typography Lab */}
      <MotionShowcase />

      {/* 11. Contact (Let's Work Together) */}
      <ContactSection onOpenInquiry={onOpenInquiry} />

      {/* 12. Editorial Footer */}
      <Footer />
    </main>
  );
}
