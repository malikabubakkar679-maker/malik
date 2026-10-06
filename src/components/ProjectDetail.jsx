import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useProjects } from "../utils/projectStore";
import { soundEngine } from "../utils/audioUtils";
import Lightbox from "./Lightbox";
import { ArrowLeft, ArrowUpRight, ExternalLink, Code2, Sparkles, CheckCircle2 } from "lucide-react";

export default function ProjectDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [activeLightboxImg, setActiveLightboxImg] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const { projects } = useProjects();

  // Find current project
  const projectIndex = projects.findIndex((p) => p.slug === slug);
  const project = projects[projectIndex] || projects[0] || {};

  // Find next project for seamless bottom transition
  const nextIndex = (projectIndex + 1) % (projects.length || 1);
  const nextProject = projects[nextIndex] || projects[0] || {};

  // Scroll to top on slug change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const openLightbox = (img, index) => {
    soundEngine.playWhoosh("open");
    setActiveLightboxImg(img);
    setLightboxIndex(index);
  };

  const handleNextLightbox = () => {
    if (!project.gallery || project.gallery.length === 0) return;
    const next = (lightboxIndex + 1) % project.gallery.length;
    setLightboxIndex(next);
    setActiveLightboxImg(project.gallery[next]);
  };

  const handlePrevLightbox = () => {
    if (!project.gallery || project.gallery.length === 0) return;
    const prev = (lightboxIndex - 1 + project.gallery.length) % project.gallery.length;
    setLightboxIndex(prev);
    setActiveLightboxImg(project.gallery[prev]);
  };

  return (
    <article className="case-study-page">
      {/* Hero Container */}
      <div className="case-study-hero">
        <button
          onClick={() => {
            soundEngine.playClick();
            navigate("/#work");
          }}
          className="case-study-back-btn"
          data-cursor="link"
        >
          <ArrowLeft size={16} />
          <span>RETURN TO ARCHIVE</span>
        </button>

        <div className="badge-tag" style={{ alignSelf: "flex-start" }}>
          <span className="status-dot" style={{ background: "var(--accent-gold)" }} />
          PROJECT CASE STUDY • {project.number}
        </div>

        <h1 className="case-study-title">{project.title}</h1>
        <p className="body-lead" style={{ maxWidth: 880 }}>
          {project.tagline}
        </p>

        {/* Metadata Grid */}
        <div className="case-study-meta-grid">
          <div className="meta-column">
            <span className="meta-col-label">CLIENT</span>
            <span className="meta-col-value">{project.client}</span>
          </div>

          <div className="meta-column">
            <span className="meta-col-label">ROLE</span>
            <span className="meta-col-value">{project.role}</span>
          </div>

          <div className="meta-column">
            <span className="meta-col-label">TIMELINE</span>
            <span className="meta-col-value">{project.timeline} ({project.year})</span>
          </div>

          <div className="meta-column">
            <span className="meta-col-label">DISCIPLINE</span>
            <span className="meta-col-value">{project.category}</span>
          </div>
        </div>

        {/* Action Links */}
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="badge-tag"
              style={{
                background: "var(--text-primary)",
                color: "var(--bg-primary)",
                borderColor: "var(--text-primary)",
                fontWeight: 700,
                padding: "0.5rem 1.25rem",
              }}
              data-cursor="link"
              onClick={() => soundEngine.playClick()}
            >
              <span>LAUNCH LIVE PROJECT</span>
              <ExternalLink size={14} />
            </a>
          )}

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="badge-tag"
              style={{ padding: "0.5rem 1.25rem" }}
              data-cursor="link"
              onClick={() => soundEngine.playClick()}
            >
              <Code2 size={14} />
              <span>SOURCE ARCHITECTURE</span>
            </a>
          )}
        </div>

        {/* Full-bleed Hero Visual */}
        <div
          className="case-study-hero-media"
          data-cursor="explore"
          onClick={() => openLightbox({ url: project.heroImage, caption: project.title }, 0)}
        >
          <img
            src={project.heroImage}
            alt={project.title}
            className="case-study-hero-img"
          />
        </div>
      </div>

      {/* Narrative Section: Challenge & Solution */}
      <div className="case-study-narrative">
        <div className="narrative-split">
          <div>
            <div className="badge-tag" style={{ marginBottom: "1rem" }}>
              THE CORE CHALLENGE
            </div>
            <h3 className="heading-md">Complex engineering meets delicate aesthetics.</h3>
          </div>
          <div className="narrative-body">
            <p>{project.challenge}</p>
          </div>
        </div>

        <div className="narrative-split" style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: "3rem" }}>
          <div>
            <div className="badge-tag" style={{ marginBottom: "1rem" }}>
              THE ARCHITECTURAL SOLUTION
            </div>
            <h3 className="heading-md">Tailored shader pipelines and worker threads.</h3>
          </div>
          <div className="narrative-body">
            <p>{project.solution}</p>
          </div>
        </div>

        {/* Project Outcome Metrics */}
        {project.metrics && (
          <div className="statement-grid-stats" style={{ marginTop: "1rem" }}>
            {project.metrics.map((m, idx) => (
              <div key={idx} className="stat-item">
                <div className="stat-number" style={{ fontSize: "2.4rem" }}>
                  {m.value}
                </div>
                <div className="stat-label">{m.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Technologies Grid */}
        <div style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: "3rem" }}>
          <span className="text-meta" style={{ display: "block", marginBottom: "1rem" }}>
            TECHNOLOGIES & PROTOCOLS
          </span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
            {project.technologies.map((tech, i) => (
              <span
                key={i}
                className="badge-tag"
                style={{ background: "rgba(255,255,255,0.06)", fontSize: "0.85rem", padding: "0.45rem 1rem" }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Visual Story Gallery */}
        {project.gallery && project.gallery.length > 0 && (
          <div className="case-study-gallery" style={{ marginTop: "2rem" }}>
            <span className="text-meta" style={{ marginBottom: "1rem" }}>
              VISUAL EXPLORATION & CASE ARTIFACTS
            </span>

            {project.gallery.map((item, idx) => (
              <div
                key={idx}
                className="gallery-row-wide"
                data-cursor="explore"
                onClick={() => openLightbox(item, idx)}
              >
                <img src={item.url} alt={item.caption} loading="lazy" />
                {item.caption && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: "1.25rem",
                      left: "1.25rem",
                      background: "rgba(0,0,0,0.75)",
                      padding: "0.4rem 0.85rem",
                      borderRadius: "6px",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.78rem",
                      color: "var(--text-secondary)",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    {item.caption}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Next Project Bottom Banner */}
      <Link
        to={`/work/${nextProject.slug}`}
        className="next-project-banner"
        onClick={() => soundEngine.playWhoosh("open")}
        data-cursor="project"
      >
        <span className="text-meta" style={{ color: "var(--accent-gold)" }}>
          NEXT COMMISSION • {nextProject.number}
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          <span className="next-project-title">{nextProject.title}</span>
          <ArrowUpRight size={48} color="var(--accent-gold)" />
        </div>
      </Link>

      {/* Lightbox Viewer */}
      <Lightbox
        isOpen={!!activeLightboxImg}
        activeImage={activeLightboxImg}
        gallery={project.gallery}
        onClose={() => setActiveLightboxImg(null)}
        onNext={handleNextLightbox}
        onPrev={handlePrevLightbox}
      />
    </article>
  );
}
