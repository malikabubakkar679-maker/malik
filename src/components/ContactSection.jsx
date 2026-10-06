import React, { useState } from "react";
import { PERSONAL_INFO } from "../data/portfolioData";
import { soundEngine } from "../utils/audioUtils";
import { sendContactEmail } from "../utils/resendEmail";
import confetti from "canvas-confetti";
import {
  Mail,
  ArrowUpRight,
  Send,
  CheckCircle2,
  Globe,
  Sparkles,
  MessageSquare,
  Clock,
  DollarSign,
  Laptop,
  Smartphone,
  Cpu,
  Palette,
  Compass,
} from "lucide-react";

const PROJECT_TYPES = [
  { id: "website", label: "Website Development", icon: <Laptop size={14} /> },
  { id: "app", label: "Mobile & Web App", icon: <Smartphone size={14} /> },
  { id: "software", label: "Software Architecture", icon: <Cpu size={14} /> },
  { id: "design", label: "UI/UX & Design Systems", icon: <Palette size={14} /> },
  { id: "creative", label: "Creative Motion & 3D", icon: <Sparkles size={14} /> },
  { id: "other", label: "Other / Custom Vision", icon: <Compass size={14} /> },
];

const BUDGET_OPTIONS = [
  "< $1,000",
  "$1,000 – $3,000",
  "$3,000 – $5,000",
  "$5,000+ (Flagship)",
];

const TIMELINE_OPTIONS = [
  "Immediate (< 2 Weeks)",
  "1 — 2 Months",
  "2 — 3 Months",
  "Flexible / Advisory",
];

export default function ContactSection() {
  const [selectedType, setSelectedType] = useState("Website Development");
  const [selectedBudget, setSelectedBudget] = useState("$1,000 – $3,000");
  const [selectedTimeline, setSelectedTimeline] = useState("1 — 2 Months");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [feedbackMsg, setFeedbackMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    soundEngine.playClick();
    setStatus("sending");

    try {
      const res = await sendContactEmail({
        name: formData.name,
        email: formData.email,
        projectType: selectedType,
        budget: selectedBudget,
        timeline: selectedTimeline,
        message: formData.message,
      });

      if (res && res.success) {
        soundEngine.playChime(660, 0.4, "sine");
        setStatus("success");
        setFeedbackMsg("Transmission received! I will review your project and reply within 24 hours.");

        try {
          confetti({
            particleCount: 90,
            spread: 75,
            origin: { y: 0.6 },
            colors: ["#c5832b", "#df993e", "#121214", "#faf8f5"],
          });
        } catch {
          // Graceful fallback
        }

        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
        setFeedbackMsg("Could not dispatch via email server. Please email directly at " + PERSONAL_INFO.email);
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
      setFeedbackMsg("An unexpected issue occurred. Please email directly at " + PERSONAL_INFO.email);
    }
  };

  return (
    <section id="contact" className="editorial-contact-section">
      <div className="contact-container">
        {/* Header Block */}
        <div className="contact-header-block">
          <div className="badge-tag" style={{ margin: "0 auto 1.25rem" }}>
            <Sparkles size={13} color="var(--accent-gold)" />
            INITIALIZE COLLABORATION
          </div>

          <h2 className="contact-main-headline">
            LET'S CRAFT SOMETHING <br />
            <span className="contact-highlight-serif">REMARKABLE TOGETHER.</span>
          </h2>

          <p className="contact-subtitle">
            Whether you need a cutting-edge web application, full-scale software architecture, or interactive digital experience, tell me about your goals below.
          </p>
        </div>

        {/* Interactive Contact Workspace */}
        <div className="contact-card-grid">
          {/* Left Info Panel */}
          <div className="contact-info-panel">
            <div className="contact-direct-card">
              <span className="contact-meta-label">DIRECT INBOX</span>
              <a href={`mailto:${PERSONAL_INFO.email}`} className="contact-email-link" onClick={() => soundEngine.playClick()}>
                <Mail size={18} color="var(--accent-gold)" />
                <span>{PERSONAL_INFO.email}</span>
                <ArrowUpRight size={16} />
              </a>
            </div>

            <div className="contact-direct-card">
              <span className="contact-meta-label">BASE LOCATION & AVAILABILITY</span>
              <div className="contact-location-text">
                <Globe size={16} color="var(--accent-gold)" />
                <span>{PERSONAL_INFO.location}</span>
              </div>
              <div className="contact-status-indicator">
                <span className="status-dot" />
                <span>{PERSONAL_INFO.status}</span>
              </div>
            </div>

            <div className="contact-direct-card">
              <span className="contact-meta-label">NETWORK & PROFILES</span>
              <div className="contact-socials-row">
                {PERSONAL_INFO.socials.map((soc, idx) => (
                  <a
                    key={idx}
                    href={soc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-social-pill"
                    onClick={() => soundEngine.playClick()}
                  >
                    <span>{soc.label}</span>
                    <ArrowUpRight size={12} />
                  </a>
                ))}
              </div>
            </div>

            <div className="contact-guarantee-card">
              <div className="guarantee-title">RESPONSE COMMITMENT</div>
              <p className="guarantee-desc">
                Every inquiry is reviewed personally. You will receive an architectural breakdown, estimated milestones, and direct pricing recommendations within 24 hours.
              </p>
            </div>
          </div>

          {/* Right Form Panel */}
          <div className="contact-form-panel">
            {status === "success" ? (
              <div className="contact-success-state">
                <div className="success-icon-wrap">
                  <CheckCircle2 size={42} />
                </div>
                <h3 className="success-title">Transmission Received!</h3>
                <p className="success-desc">{feedbackMsg}</p>
                <button
                  onClick={() => {
                    soundEngine.playClick();
                    setStatus("idle");
                  }}
                  className="btn-primary-editorial"
                  style={{ marginTop: "1rem" }}
                >
                  Send Another Transmission
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-editorial-form">
                {/* 1. Project Type Selector */}
                <div className="contact-field-group">
                  <label className="contact-field-label">
                    <span>1. WHAT KIND OF PROJECT ARE WE BUILDING?</span>
                  </label>
                  <div className="contact-chips-row">
                    {PROJECT_TYPES.map((pt) => {
                      const isSelected = selectedType === pt.label;
                      return (
                        <button
                          type="button"
                          key={pt.id}
                          className={`contact-chip-btn ${isSelected ? "selected" : ""}`}
                          onClick={() => {
                            soundEngine.playClick();
                            setSelectedType(pt.label);
                          }}
                        >
                          {pt.icon}
                          <span>{pt.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Budget Range Selector */}
                <div className="contact-field-group">
                  <label className="contact-field-label">
                    <span>2. ESTIMATED INVESTMENT / BUDGET (USD)</span>
                  </label>
                  <div className="contact-chips-row">
                    {BUDGET_OPTIONS.map((b) => {
                      const isSelected = selectedBudget === b;
                      return (
                        <button
                          type="button"
                          key={b}
                          className={`contact-chip-btn sm ${isSelected ? "selected" : ""}`}
                          onClick={() => {
                            soundEngine.playClick();
                            setSelectedBudget(b);
                          }}
                        >
                          <DollarSign size={12} />
                          <span>{b}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Timeline Selector */}
                <div className="contact-field-group">
                  <label className="contact-field-label">
                    <span>3. EXPECTED TIMELINE</span>
                  </label>
                  <div className="contact-chips-row">
                    {TIMELINE_OPTIONS.map((t) => {
                      const isSelected = selectedTimeline === t;
                      return (
                        <button
                          type="button"
                          key={t}
                          className={`contact-chip-btn sm ${isSelected ? "selected" : ""}`}
                          onClick={() => {
                            soundEngine.playClick();
                            setSelectedTimeline(t);
                          }}
                        >
                          <Clock size={12} />
                          <span>{t}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 4. Client Details (Name & Email) */}
                <div className="contact-inputs-split">
                  <div className="contact-input-wrap">
                    <label className="contact-field-label">YOUR NAME *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe / Studio Founder"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="contact-text-input"
                    />
                  </div>

                  <div className="contact-input-wrap">
                    <label className="contact-field-label">YOUR EMAIL ADDRESS *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. john@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="contact-text-input"
                    />
                  </div>
                </div>

                {/* 5. Project Message */}
                <div className="contact-field-group">
                  <label className="contact-field-label">
                    PROJECT VISION & OBJECTIVES *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Briefly describe what you are looking to build, any inspirations, or specific problems we need to solve..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="contact-textarea"
                  />
                </div>

                {status === "error" && (
                  <div className="contact-error-alert">{feedbackMsg}</div>
                )}

                {/* Submit Action */}
                <div className="contact-submit-row">
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="contact-submit-btn"
                  >
                    {status === "sending" ? (
                      <>
                        <span className="contact-spinner" />
                        <span>TRANSMITTING VIA RESEND...</span>
                      </>
                    ) : (
                      <>
                        <span>DISPATCH PROJECT INQUIRY</span>
                        <Send size={15} />
                      </>
                    )}
                  </button>

                  <div className="contact-secure-note">
                    🔒 Secured direct dispatch • Zero spam guarantee
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
