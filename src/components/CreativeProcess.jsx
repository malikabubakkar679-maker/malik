import React from "react";
import { CREATIVE_PROCESS } from "../data/portfolioData";
import { Compass } from "lucide-react";

export default function CreativeProcess() {
  return (
    <section className="process-section">
      <div>
        <div className="badge-tag" style={{ marginBottom: "0.85rem" }}>
          <Compass size={13} color="var(--accent-gold)" />
          METHODOLOGY & DELIVERY
        </div>
        <h2 className="heading-section">THE CREATIVE PROCESS</h2>
      </div>

      <div className="process-grid-cards">
        {CREATIVE_PROCESS.map((step) => (
          <div key={step.number} className="process-card" data-cursor="link">
            <span className="process-card-num">{step.number}</span>
            <h3 className="process-card-name">{step.name}</h3>
            <p className="process-card-detail">{step.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
