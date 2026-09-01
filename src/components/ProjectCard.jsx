import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { soundEngine } from "../utils/audioUtils";

export default function ProjectCard({ project, viewMode = "slider", onSelectProject }) {
  const isSlider = viewMode === "slider";

  const handleClick = (e) => {
    soundEngine.playWhoosh("open");
    if (onSelectProject) {
      e.preventDefault();
      onSelectProject(project);
    }
  };

  return (
    <article
      className={isSlider ? "project-slide-card" : "project-slide-card grid-card"}
      data-cursor="project"
    >
      <Link
        to={`/work/${project.slug}`}
        onClick={handleClick}
        style={{ display: "block", textDecoration: "none" }}
      >
        {/* Media Container */}
        <div className="project-card-media">
          <img
            src={project.previewImage}
            alt={project.title}
            className="project-card-img"
            loading="lazy"
          />
          <div className="project-card-overlay" />

          {/* Top Info Pill Row */}
          <div className="project-card-pill-row">
            <span className="project-card-number">{project.number}</span>
            <span className="badge-tag" style={{ background: "rgba(0,0,0,0.6)" }}>
              {project.category}
            </span>
          </div>
        </div>

        {/* Card Metadata & Body */}
        <div className="project-card-info">
          <div className="project-card-title-row">
            <h3 className="project-card-title">{project.title}</h3>
            <span className="project-card-year">{project.year}</span>
          </div>

          <p className="project-card-desc">{project.shortDescription}</p>

          <div className="project-card-tags">
            {project.technologies.slice(0, 4).map((tech, i) => (
              <span key={i} className="project-card-tag">
                {tech}
              </span>
            ))}
          </div>

          <div className="project-card-footer">
            <span className="text-meta" style={{ color: "var(--text-secondary)" }}>
              CLIENT: {project.client.split("(")[0]}
            </span>
            <div className="project-card-cta">
              <span>EXPLORE CASE STUDY</span>
              <ArrowUpRight size={16} />
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
