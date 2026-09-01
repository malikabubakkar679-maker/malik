import React from "react";
import { SERVICES } from "../data/portfolioData";
import { soundEngine } from "../utils/audioUtils";
import { ArrowRight, Wrench } from "lucide-react";

export default function ServicesSection() {
  return (
    <section id="services" className="services-section">
      <div style={{ marginBottom: "3rem" }}>
        <div className="badge-tag" style={{ marginBottom: "0.85rem" }}>
          <Wrench size={13} color="var(--accent-gold)" />
          DISCIPLINES & CAPABILITIES
        </div>
        <h2 className="heading-section">SERVICES & EXPERTISE</h2>
      </div>

      <div className="services-rows-list">
        {SERVICES.map((srv) => (
          <div
            key={srv.number}
            className="service-row-item"
            onMouseEnter={() => soundEngine.playHover()}
            data-cursor="link"
          >
            <div className="service-row-num">{srv.number}</div>

            <div className="service-row-title-wrap">
              <h3 className="service-row-title">{srv.title}</h3>
              <span className="service-row-tagline">{srv.tagline}</span>
            </div>

            <p className="service-row-desc">{srv.description}</p>

            <div className="service-row-arrow">
              <ArrowRight size={20} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
