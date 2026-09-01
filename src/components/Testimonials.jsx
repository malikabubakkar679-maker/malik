import React, { useState } from "react";
import { TESTIMONIALS } from "../data/portfolioData";
import { soundEngine } from "../utils/audioUtils";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const current = TESTIMONIALS[currentIndex];

  const handlePrev = () => {
    soundEngine.playClick();
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    soundEngine.playClick();
    setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="testimonials-section">
      <div style={{ marginBottom: "2.5rem" }}>
        <div className="badge-tag" style={{ marginBottom: "1rem" }}>
          <Quote size={14} color="var(--accent-gold)" />
          CLIENT PERSPECTIVES & ACCLAIM
        </div>
        <h2 className="heading-lg">ENDORSEMENTS</h2>
      </div>

      <div className="testimonial-card-editorial">
        <div className="testimonial-stars">
          {Array.from({ length: current.rating }).map((_, i) => (
            <Star key={i} size={18} fill="var(--accent-gold)" />
          ))}
        </div>

        <blockquote className="testimonial-quote">
          "{current.quote}"
        </blockquote>

        <div className="testimonial-author-row">
          <img
            src={current.avatar}
            alt={current.author}
            className="testimonial-avatar"
            loading="lazy"
          />
          <div className="testimonial-meta">
            <span className="testimonial-name">{current.author}</span>
            <span className="testimonial-company">
              {current.role} • {current.company}
            </span>
          </div>

          <div style={{ marginLeft: "auto", display: "flex", gap: "0.5rem" }}>
            <button
              onClick={handlePrev}
              className="slider-arrow-btn"
              data-cursor="link"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={handleNext}
              className="slider-arrow-btn"
              data-cursor="link"
              aria-label="Next testimonial"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
