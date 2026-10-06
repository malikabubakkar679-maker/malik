import React, { useState, useEffect } from "react";
import { soundEngine } from "../utils/audioUtils";
import { sendContactEmail } from "../utils/resendEmail";
import { X, Check, Send } from "lucide-react";
import confetti from "canvas-confetti";

export default function InquiryDrawer({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    services: [],
    budget: "$10k - $25k",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        soundEngine.playWhoosh("close");
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const toggleService = (service) => {
    soundEngine.playClick();
    setFormData((prev) => {
      const exists = prev.services.includes(service);
      return {
        ...prev,
        services: exists
          ? prev.services.filter((s) => s !== service)
          : [...prev.services, service],
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    soundEngine.playChime(660, 0.4, "sine");
    setIsSubmitted(true);

    try {
      await sendContactEmail({
        name: formData.name,
        email: formData.email,
        projectType: formData.services.length > 0 ? formData.services.join(", ") : "Inquiry Drawer Consultation",
        budget: formData.budget,
        timeline: "Flexible",
        message: `${formData.company ? `Company: ${formData.company}\n` : ""}${formData.message || "Requested collaboration via drawer."}`,
      });
    } catch (err) {
      console.warn("Drawer email dispatch handled:", err);
    }

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#e5b97c", "#ffffff", "#4f8cff"],
      });
    } catch {
      // Graceful fallback
    }

    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 2800);
  };

  return (
    <div className={`inquiry-drawer-overlay ${isOpen ? "open" : ""}`}>
      <div
        className="inquiry-drawer-backdrop"
        style={{ position: "absolute", inset: 0 }}
        onClick={() => {
          soundEngine.playWhoosh("close");
          onClose();
        }}
      />

      <div className="inquiry-drawer-card">
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
            <div className="badge-tag">
              <span className="status-dot" />
              START A COLLABORATION
            </div>
            <button
              onClick={() => {
                soundEngine.playWhoosh("close");
                onClose();
              }}
              className="inquiry-drawer-close-btn"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.45rem 0.95rem",
                borderRadius: "999px",
                background: "rgba(18, 18, 20, 0.08)",
                border: "1px solid var(--border-medium)",
                cursor: "pointer",
                color: "var(--text-primary)",
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                fontWeight: 700,
                textTransform: "uppercase",
              }}
              data-cursor="link"
              aria-label="Close inquiry drawer"
            >
              <span>CLOSE</span>
              <X size={16} />
            </button>
          </div>

          <h3 className="heading-md" style={{ marginBottom: "0.5rem" }}>
            Tell me about your vision.
          </h3>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginBottom: "2rem" }}>
            I typically respond within 24 hours with ideas and estimated timelines.
          </p>

          {isSubmitted ? (
            <div
              style={{
                padding: "3rem 1.5rem",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <div
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  background: "var(--accent-gold)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#000",
                }}
              >
                <Check size={32} />
              </div>
              <h4 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem" }}>
                Transmission Received!
              </h4>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
                Thank you for reaching out. I look forward to crafting something extraordinary together.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">YOUR NAME</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Elena Rostova"
                  className="form-input"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">EMAIL ADDRESS</label>
                <input
                  type="email"
                  required
                  placeholder="elena@studio.com"
                  className="form-input"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">SERVICES REQUIRED</label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "0.25rem" }}>
                  {[
                    "WebGL & 3D Web",
                    "Motion & Creative Dev",
                    "Full-Stack Web App",
                    "Art Direction & Design",
                    "Sound Design",
                  ].map((service) => {
                    const active = formData.services.includes(service);
                    return (
                      <button
                        type="button"
                        key={service}
                        className={`badge-tag ${active ? "active" : ""}`}
                        style={{
                          cursor: "pointer",
                          background: active ? "var(--accent-gold)" : undefined,
                          color: active ? "#000" : undefined,
                          borderColor: active ? "var(--accent-gold)" : undefined,
                        }}
                        onClick={() => toggleService(service)}
                      >
                        {service}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">ESTIMATED BUDGET (USD)</label>
                <select
                  className="form-input"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  style={{ background: "var(--bg-tertiary)" }}
                >
                  <option value="$10k - $25k">$10k – $25k</option>
                  <option value="$25k - $50k">$25k – $50k</option>
                  <option value="$50k+">$50k+ (Flagship Experience)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">PROJECT DETAILS</label>
                <textarea
                  rows={4}
                  placeholder="Share a brief overview of your timeline, objectives, and inspirations..."
                  className="form-textarea"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <button
                type="submit"
                className="magnetic-btn"
                style={{
                  width: "100%",
                  height: "54px",
                  borderRadius: "12px",
                  marginTop: "1rem",
                  gap: "0.5rem",
                }}
                data-cursor="link"
              >
                <span>TRANSMIT INQUIRY</span>
                <Send size={16} />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
