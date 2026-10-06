import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { CATEGORIES } from "../data/portfolioData";
import { useProjects } from "../utils/projectStore";
import { soundEngine } from "../utils/audioUtils";
import { ArrowUpRight, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";

export default function FeaturedProjects() {
  const { projects } = useProjects();
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [mobileSlideIndex, setMobileSlideIndex] = useState(0);
  const touchStartXRef = useRef(0);

  const filteredProjects = selectedCategory === "ALL"
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

  const handleNextSlide = () => {
    soundEngine.playClick();
    setMobileSlideIndex((prev) => (prev + 1) % filteredProjects.length);
  };

  const handlePrevSlide = () => {
    soundEngine.playClick();
    setMobileSlideIndex((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length);
  };

  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartXRef.current - touchEndX;

    if (diff > 45) {
      handleNextSlide();
    } else if (diff < -45) {
      handlePrevSlide();
    }
  };

  const currentMobileProject = filteredProjects[mobileSlideIndex] || filteredProjects[0];

  return (
    <section id="work" className="editorial-projects-section">
      {/* Header & Filter Bar */}
      <div className="projects-section-header">
        <div>
          <div className="badge-tag" style={{ marginBottom: "0.85rem" }}>
            <Sparkles size={13} color="var(--accent-gold)" />
            SELECTED COMMISSIONS
          </div>
          <h2 className="heading-section">FEATURED WORK</h2>
        </div>

        {/* Category Filters */}
        <div className="category-filter-bar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`category-filter-btn ${selectedCategory === cat ? "active" : ""}`}
              onClick={() => {
                soundEngine.playClick();
                setSelectedCategory(cat);
                setMobileSlideIndex(0);
              }}
              data-cursor="link"
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* MOBILE TOUCH SLIDER (Rendered on Mobile screens) */}
      <div
        className="mobile-projects-slider-container"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="mobile-slider-top-nav">
          <span className="mobile-slider-counter">
            {String(mobileSlideIndex + 1).padStart(2, "0")} / {String(filteredProjects.length).padStart(2, "0")}
          </span>
          <div className="mobile-slider-arrows">
            <button
              onClick={handlePrevSlide}
              className="mobile-slider-btn"
              aria-label="Previous project"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={handleNextSlide}
              className="mobile-slider-btn"
              aria-label="Next project"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {currentMobileProject && (
          <div className="mobile-project-card">
            <Link
              to={`/work/${currentMobileProject.slug}`}
              onClick={() => soundEngine.playWhoosh("open")}
              className="mobile-project-media-wrap"
            >
              <img
                src={currentMobileProject.previewImage}
                alt={currentMobileProject.title}
                className="mobile-project-img"
              />
              <div className="mobile-project-badge-pill">
                {currentMobileProject.category}
              </div>
            </Link>

            <div className="mobile-project-info">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.4rem" }}>
                <span className="spread-project-number">{currentMobileProject.number}</span>
                <span className="text-meta">{currentMobileProject.year}</span>
              </div>

              <h3 className="mobile-project-title">
                <Link
                  to={`/work/${currentMobileProject.slug}`}
                  onClick={() => soundEngine.playWhoosh("open")}
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  {currentMobileProject.title}
                </Link>
              </h3>

              <p className="mobile-project-desc">{currentMobileProject.shortDescription}</p>

              <div className="spread-tech-pills" style={{ marginBottom: "1.25rem" }}>
                {(Array.isArray(currentMobileProject.technologies)
                  ? currentMobileProject.technologies
                  : String(currentMobileProject.technologies || "").split(",")
                )
                  .map((t) => String(t).trim())
                  .filter(Boolean)
                  .slice(0, 3)
                  .map((tech, i) => (
                    <span key={i} className="spread-tech-pill">
                      {tech}
                    </span>
                  ))}
              </div>

              <Link
                to={`/work/${currentMobileProject.slug}`}
                className="btn-primary-editorial"
                onClick={() => soundEngine.playWhoosh("open")}
                style={{ width: "100%", justifyContent: "center" }}
              >
                <span>EXPLORE CASE STUDY</span>
                <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>
        )}

        {/* Swipe Dots Indicator */}
        <div className="mobile-slider-dots">
          {filteredProjects.map((_, dotIdx) => (
            <button
              key={dotIdx}
              className={`mobile-dot ${dotIdx === mobileSlideIndex ? "active" : ""}`}
              onClick={() => setMobileSlideIndex(dotIdx)}
              aria-label={`Go to slide ${dotIdx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* DESKTOP Asymmetric Magazine Spreads Stack */}
      <div className="projects-spreads-stack desktop-spreads-view">
        {filteredProjects.map((project, idx) => {
          // Alternating editorial layout classes: wide-65, reverse-35, full-bleed, split-equal
          const layoutClass =
            idx % 4 === 0
              ? "spread-wide-65"
              : idx % 4 === 1
              ? "spread-reverse-35"
              : idx % 4 === 2
              ? "spread-full-bleed"
              : "spread-split-equal";

          return (
            <article key={project.id} className="project-spread-item">
              <div className={layoutClass}>
                {/* Media Box */}
                <div
                  className="spread-media-box"
                  data-cursor="project"
                  onClick={() => soundEngine.playWhoosh("open")}
                >
                  <Link to={`/work/${project.slug}`}>
                    <img
                      src={project.previewImage}
                      alt={project.title}
                      className="spread-img"
                      loading="lazy"
                    />
                  </Link>
                </div>

                {/* Editorial Text Content */}
                <div className="spread-text-content">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <span className="spread-project-number">{project.number}</span>
                    <span className="text-meta">{project.year} • {project.category}</span>
                  </div>

                  <h3 className="spread-project-title">
                    <Link
                      to={`/work/${project.slug}`}
                      onClick={() => soundEngine.playWhoosh("open")}
                      style={{ color: "inherit", textDecoration: "none" }}
                      data-cursor="project"
                    >
                      {project.title}
                    </Link>
                  </h3>

                  <p className="spread-project-desc">{project.shortDescription}</p>

                  <div className="spread-tech-pills">
                    {(Array.isArray(project.technologies)
                      ? project.technologies
                      : String(project.technologies || "").split(",")
                    )
                      .map((t) => String(t).trim())
                      .filter(Boolean)
                      .slice(0, 4)
                      .map((tech, i) => (
                        <span key={i} className="spread-tech-pill">
                          {tech}
                        </span>
                      ))}
                  </div>

                  <Link
                    to={`/work/${project.slug}`}
                    className="spread-view-cta"
                    onClick={() => soundEngine.playWhoosh("open")}
                    data-cursor="link"
                  >
                    <span>VIEW CASE STUDY</span>
                    <ArrowUpRight size={16} />
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
