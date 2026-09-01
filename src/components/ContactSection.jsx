import React from "react";
import { PERSONAL_INFO } from "../data/portfolioData";
import { useMagnetic } from "../hooks/useMagnetic";
import { soundEngine } from "../utils/audioUtils";
import { Mail, ArrowUpRight, Globe, MessageSquare } from "lucide-react";

export default function ContactSection({ onOpenInquiry }) {
  const magneticRef = useMagnetic(0.35);

  return (
    <section id="contact" className="contact-section">
      <div className="badge-tag">
        <MessageSquare size={13} color="var(--accent-gold)" />
        INITIALIZE COLLABORATION
      </div>

      <h2 className="contact-headline">
        LET'S WORK <br />
        <span style={{ color: "var(--accent-gold)" }}>TOGETHER.</span>
      </h2>

      <p className="body-editorial" style={{ maxWidth: 580 }}>
        Have an idea, web application, or complex technical problem worth solving? Let's build something remarkable.
      </p>

      {/* Magnetic CTA Button */}
      <div style={{ marginTop: "1rem" }}>
        <button
          ref={magneticRef}
          className="magnetic-btn"
          onClick={() => {
            soundEngine.playWhoosh("open");
            onOpenInquiry?.();
          }}
          data-cursor="link"
        >
          START A CONVERSATION →
        </button>
      </div>

      {/* Direct Social & Email Links */}
      <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap", justifyContent: "center", marginTop: "1.5rem" }}>
        <a
          href={`mailto:${PERSONAL_INFO.email}`}
          className="badge-tag"
          data-cursor="link"
          onClick={() => soundEngine.playClick()}
        >
          <Mail size={14} color="var(--accent-gold)" />
          <span>{PERSONAL_INFO.email}</span>
        </a>

        {PERSONAL_INFO.socials.map((soc, idx) => (
          <a
            key={idx}
            href={soc.url}
            target="_blank"
            rel="noopener noreferrer"
            className="badge-tag"
            data-cursor="link"
            onClick={() => soundEngine.playClick()}
          >
            <span>{soc.label}</span>
            <ArrowUpRight size={12} />
          </a>
        ))}
      </div>
    </section>
  );
}
