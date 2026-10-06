import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useProjects } from "../utils/projectStore";
import { useInquiries } from "../utils/inquiryStore";
import { DEFAULT_RESEND_KEY, OWNER_EMAIL } from "../utils/resendEmail";
import { soundEngine } from "../utils/audioUtils";
import {
  Lock,
  Unlock,
  KeyRound,
  Plus,
  Pencil,
  Trash2,
  ExternalLink,
  CheckCircle2,
  Mail,
  FolderGit2,
  Layers,
  Sparkles,
  ArrowLeft,
  LogOut,
  Search,
  Eye,
  RefreshCw,
  Send,
  X,
  Star,
  Check,
} from "lucide-react";

const PIN_STORAGE_KEY = "malik_admin_pin";
const AUTH_SESSION_KEY = "malik_admin_auth_session";
const DEFAULT_PIN = "12345";

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinDigits, setPinDigits] = useState(["", "", "", "", ""]);
  const [pinError, setPinError] = useState("");
  const [isShaking, setIsShaking] = useState(false);
  const [activeTab, setActiveTab] = useState("projects");
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL");

  // Modal states
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [isChangePinModalOpen, setIsChangePinModalOpen] = useState(false);
  const [newPinDigits, setNewPinDigits] = useState(["", "", "", "", ""]);
  const [pinChangeSuccess, setPinChangeSuccess] = useState(false);
  const [testEmailStatus, setTestEmailStatus] = useState("");

  const pinInputRefs = useRef([]);

  const { projects, addProject, updateProject, deleteProject, resetProjects } = useProjects();
  const { inquiries, markInquiryRead, deleteInquiry } = useInquiries();

  // Initial authentication check
  useEffect(() => {
    const savedSession = sessionStorage.getItem(AUTH_SESSION_KEY);
    if (savedSession === "valid") {
      setIsAuthenticated(true);
    }
  }, []);

  // Get configured PIN or default
  const getMasterPin = () => {
    return localStorage.getItem(PIN_STORAGE_KEY) || DEFAULT_PIN;
  };

  // Handle PIN Digit Change
  const handlePinChange = (index, val) => {
    if (!/^\d*$/.test(val)) return;

    const newPin = [...pinDigits];
    newPin[index] = val ? val.slice(-1) : "";
    setPinDigits(newPin);
    setPinError("");

    soundEngine.playClick();

    // Auto advance
    if (val && index < 4) {
      pinInputRefs.current[index + 1]?.focus();
    }

    // Check when all 5 digits are entered
    if (val && index === 4 && newPin.every((d) => d !== "")) {
      const fullPin = newPin.join("");
      const targetPin = getMasterPin();

      if (fullPin === targetPin) {
        soundEngine.playChime(660, 0.35, "sine");
        sessionStorage.setItem(AUTH_SESSION_KEY, "valid");
        setIsAuthenticated(true);
      } else {
        soundEngine.playWhoosh("close");
        setPinError("Incorrect 5-digit passcode. Try again.");
        setIsShaking(true);
        setTimeout(() => {
          setIsShaking(false);
          setPinDigits(["", "", "", "", ""]);
          pinInputRefs.current[0]?.focus();
        }, 600);
      }
    }
  };

  const handlePinKeyDown = (index, e) => {
    if (e.key === "Backspace" && !pinDigits[index] && index > 0) {
      pinInputRefs.current[index - 1]?.focus();
    }
  };

  const handleLogout = () => {
    soundEngine.playClick();
    sessionStorage.removeItem(AUTH_SESSION_KEY);
    setIsAuthenticated(false);
    setPinDigits(["", "", "", "", ""]);
  };

  const handleSavePin = (e) => {
    e.preventDefault();
    const pin = newPinDigits.join("");
    if (pin.length !== 5) return;

    localStorage.setItem(PIN_STORAGE_KEY, pin);
    soundEngine.playChime(700, 0.4, "sine");
    setPinChangeSuccess(true);
    setTimeout(() => {
      setPinChangeSuccess(false);
      setIsChangePinModalOpen(false);
      setNewPinDigits(["", "", "", "", ""]);
    }, 1500);
  };

  // Form State for Project Editing/Creation
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "SOFTWARE",
    tagline: "",
    year: "2026",
    client: "",
    role: "Lead Software & Web Engineer",
    timeline: "2 Months",
    featured: true,
    previewImage: "/images/projects/hayatabad-school.jpg",
    shortDescription: "",
    overview: "",
    technologies: "React, Next.js, TypeScript, TailwindCSS",
    services: "Full-Stack Engineering, UI/UX",
    liveUrl: "https://",
    githubUrl: "https://github.com/",
    result: "",
  });

  const openAddModal = () => {
    soundEngine.playClick();
    setEditingProject(null);
    setFormData({
      title: "",
      slug: "",
      category: "SOFTWARE",
      tagline: "",
      year: "2026",
      client: "",
      role: "Lead Software & Web Engineer",
      timeline: "2 Months",
      featured: true,
      previewImage: "/images/projects/hayatabad-school.jpg",
      shortDescription: "",
      overview: "",
      technologies: "React, Next.js, TypeScript, Node.js",
      services: "Software Engineering, Architecture",
      liveUrl: "https://",
      githubUrl: "https://github.com/malikabubakkar523/",
      result: "Delivered scalable production system with fast latency.",
    });
    setIsProjectModalOpen(true);
  };

  const openEditModal = (proj) => {
    soundEngine.playClick();
    setEditingProject(proj);
    setFormData({
      title: proj.title || "",
      slug: proj.slug || "",
      category: proj.category || "SOFTWARE",
      tagline: proj.tagline || "",
      year: proj.year || "2026",
      client: proj.client || "",
      role: proj.role || "Lead Software Engineer",
      timeline: proj.timeline || "2 Months",
      featured: proj.featured ?? true,
      previewImage: proj.previewImage || "/images/projects/hayatabad-school.jpg",
      shortDescription: proj.shortDescription || "",
      overview: proj.overview || "",
      technologies: Array.isArray(proj.technologies) ? proj.technologies.join(", ") : proj.technologies || "",
      services: Array.isArray(proj.services) ? proj.services.join(", ") : proj.services || "",
      liveUrl: proj.liveUrl || "",
      githubUrl: proj.githubUrl || "",
      result: proj.result || "",
    });
    setIsProjectModalOpen(true);
  };

  const handleSaveProject = (e) => {
    e.preventDefault();
    soundEngine.playChime(660, 0.35, "sine");

    if (editingProject) {
      updateProject(editingProject.id || editingProject.slug, formData);
    } else {
      addProject(formData);
    }

    setIsProjectModalOpen(false);
  };

  const handleDeleteProject = (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      soundEngine.playClick();
      deleteProject(id);
    }
  };

  const handleToggleFeatured = (proj) => {
    soundEngine.playClick();
    updateProject(proj.id, { featured: !proj.featured });
  };

  const handleResetDefaults = () => {
    if (window.confirm("Reset all projects to original portfolio defaults? Custom added projects will be replaced.")) {
      soundEngine.playWhoosh("close");
      resetProjects();
    }
  };

  // Test Resend API Call
  const handleTestEmail = async () => {
    setTestEmailStatus("Sending test transmission via Resend...");
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          apiKey: DEFAULT_RESEND_KEY,
          to: OWNER_EMAIL,
          name: "Admin Self-Test",
          email: "admin@portfolio.local",
          projectType: "Admin Diagnostic Ping",
          budget: "N/A",
          timeline: "Instant",
          message: "This is a live diagnostic verification message sent from your Malik Abubakkar Portfolio Admin Control Suite via Resend API.",
        }),
      });

      if (res.ok) {
        soundEngine.playChime(750, 0.4, "sine");
        setTestEmailStatus("✅ Test email successfully transmitted to " + OWNER_EMAIL);
      } else {
        const data = await res.json().catch(() => ({}));
        setTestEmailStatus("⚠️ Transmission result: " + (data.error || "Check Resend API limits/domain"));
      }
    } catch (e) {
      setTestEmailStatus("⚠️ Proxy test error: " + e.message);
    }
  };

  // Filtered projects
  const filteredProjects = projects.filter((p) => {
    const matchesCat = categoryFilter === "ALL" || p.category === categoryFilter;
    const matchesQuery =
      searchQuery === "" ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  /* =========================================================================
     1. PIN AUTHENTICATION GATE
     ========================================================================= */
  if (!isAuthenticated) {
    return (
      <div className="admin-auth-container">
        <div className={`admin-auth-card ${isShaking ? "shake" : ""}`}>
          <div className="admin-lock-icon-wrap">
            <Lock size={32} className="admin-lock-icon" />
          </div>

          <div className="admin-auth-badge">PORTFOLIO SECURITY TERMINAL</div>
          <h1 className="admin-auth-title">ADMIN CONTROL SUITE</h1>
          <p className="admin-auth-desc">
            Enter your 5-digit security passcode to manage projects, review client transmissions, and configure settings.
          </p>

          <div className="admin-pin-inputs-row">
            {pinDigits.map((digit, idx) => (
              <input
                key={idx}
                ref={(el) => (pinInputRefs.current[idx] = el)}
                type="password"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                autoFocus={idx === 0}
                onChange={(e) => handlePinChange(idx, e.target.value)}
                onKeyDown={(e) => handlePinKeyDown(idx, e)}
                className={`admin-pin-digit-box ${digit ? "filled" : ""}`}
                aria-label={`Digit ${idx + 1}`}
              />
            ))}
          </div>

          {pinError && <div className="admin-auth-error">{pinError}</div>}

          <div className="admin-auth-hint">
            <span>Default Passcode: </span>
            <code className="admin-code-badge">12345</code>
            <span style={{ display: "block", marginTop: "4px", fontSize: "0.75rem", color: "#888894" }}>
              (You can change your 5-digit passcode inside the panel settings)
            </span>
          </div>

          <div className="admin-auth-footer">
            <Link to="/" className="admin-back-link">
              <ArrowLeft size={14} /> Back to Live Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  /* =========================================================================
     2. AUTHENTICATED DASHBOARD
     ========================================================================= */
  return (
    <div className="admin-dashboard-root">
      {/* Top Header */}
      <header className="admin-top-nav">
        <div className="admin-nav-left">
          <Link to="/" className="admin-logo-link" title="View Live Portfolio">
            <img src="/images/logo.svg" alt="Malik Abubakkar" style={{ height: "36px" }} />
          </Link>
          <div className="admin-nav-badge">
            <span className="admin-pulse-dot" />
            CONTROL SUITE v2.0
          </div>
        </div>

        <div className="admin-nav-right">
          <button
            onClick={() => setIsChangePinModalOpen(true)}
            className="admin-btn-secondary"
            title="Change 5-Digit PIN"
          >
            <KeyRound size={14} />
            <span>Passcode</span>
          </button>

          <Link to="/" className="admin-btn-secondary" title="View live portfolio">
            <Eye size={14} />
            <span>Live Site</span>
          </Link>

          <button onClick={handleLogout} className="admin-btn-logout" title="Sign out of admin session">
            <LogOut size={14} />
            <span>Log Out</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="admin-main-stage">
        {/* Metric Cards Banner */}
        <section className="admin-metrics-grid">
          <div className="admin-metric-card">
            <div className="admin-metric-icon-wrap" style={{ background: "rgba(197, 131, 43, 0.12)", color: "#c5832b" }}>
              <Layers size={22} />
            </div>
            <div>
              <div className="admin-metric-num">{projects.length}</div>
              <div className="admin-metric-label">Total Portfolio Projects</div>
            </div>
          </div>

          <div className="admin-metric-card">
            <div className="admin-metric-icon-wrap" style={{ background: "rgba(59, 130, 246, 0.12)", color: "#3b82f6" }}>
              <Sparkles size={22} />
            </div>
            <div>
              <div className="admin-metric-num">{projects.filter((p) => p.featured).length}</div>
              <div className="admin-metric-label">Featured on Homepage</div>
            </div>
          </div>

          <div className="admin-metric-card">
            <div className="admin-metric-icon-wrap" style={{ background: "rgba(16, 185, 129, 0.12)", color: "#10b981" }}>
              <Mail size={22} />
            </div>
            <div>
              <div className="admin-metric-num">{inquiries.length}</div>
              <div className="admin-metric-label">Client Inquiries Received</div>
            </div>
          </div>

          <div className="admin-metric-card">
            <div className="admin-metric-icon-wrap" style={{ background: "rgba(168, 85, 247, 0.12)", color: "#a855f7" }}>
              <CheckCircle2 size={22} />
            </div>
            <div>
              <div className="admin-metric-num">Active</div>
              <div className="admin-metric-label">Resend API Integration</div>
            </div>
          </div>
        </section>

        {/* Tab Switcher */}
        <div className="admin-tab-bar">
          <button
            className={`admin-tab-btn ${activeTab === "projects" ? "active" : ""}`}
            onClick={() => {
              soundEngine.playClick();
              setActiveTab("projects");
            }}
          >
            <FolderGit2 size={16} />
            <span>PROJECTS MANAGEMENT ({projects.length})</span>
          </button>

          <button
            className={`admin-tab-btn ${activeTab === "inquiries" ? "active" : ""}`}
            onClick={() => {
              soundEngine.playClick();
              setActiveTab("inquiries");
            }}
          >
            <Mail size={16} />
            <span>CLIENT INQUIRIES ({inquiries.length})</span>
          </button>

          <button
            className={`admin-tab-btn ${activeTab === "diagnostics" ? "active" : ""}`}
            onClick={() => {
              soundEngine.playClick();
              setActiveTab("diagnostics");
            }}
          >
            <Send size={16} />
            <span>EMAIL & API STATUS</span>
          </button>
        </div>

        {/* =========================================================================
           TAB 1: PROJECTS MANAGEMENT
           ========================================================================= */}
        {activeTab === "projects" && (
          <section className="admin-panel-section">
            {/* Action Bar */}
            <div className="admin-action-bar">
              <div className="admin-search-wrap">
                <Search size={16} className="admin-search-icon" />
                <input
                  type="text"
                  placeholder="Search projects by title, category, tech..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="admin-search-input"
                />
              </div>

              <div className="admin-cat-filter-wrap">
                {["ALL", "SOFTWARE", "WEB & APPS", "DESIGN SYSTEMS", "CREATIVE & 3D"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      soundEngine.playClick();
                      setCategoryFilter(cat);
                    }}
                    className={`admin-filter-pill ${categoryFilter === cat ? "active" : ""}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="admin-btn-group">
                <button onClick={handleResetDefaults} className="admin-btn-secondary" title="Restore initial project list">
                  <RefreshCw size={14} />
                  <span>Reset Defaults</span>
                </button>

                <button onClick={openAddModal} className="admin-btn-primary">
                  <Plus size={16} />
                  <span>ADD NEW PROJECT</span>
                </button>
              </div>
            </div>

            {/* Projects Table / Card List */}
            <div className="admin-table-container">
              <table className="admin-data-table">
                <thead>
                  <tr>
                    <th>PREVIEW</th>
                    <th>PROJECT TITLE</th>
                    <th>CATEGORY</th>
                    <th>YEAR</th>
                    <th>FEATURED</th>
                    <th>TECH STACK</th>
                    <th style={{ textAlign: "right" }}>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProjects.length === 0 ? (
                    <tr>
                      <td colSpan={7} style={{ textAlign: "center", padding: "3rem", color: "#888894" }}>
                        No projects found matching your search.
                      </td>
                    </tr>
                  ) : (
                    filteredProjects.map((p) => (
                      <tr key={p.id || p.slug}>
                        <td style={{ width: "90px" }}>
                          <img
                            src={p.previewImage || "/images/projects/hayatabad-school.jpg"}
                            alt={p.title}
                            className="admin-thumb-img"
                            onError={(e) => {
                              e.target.src = "/images/projects/hayatabad-school.jpg";
                            }}
                          />
                        </td>
                        <td>
                          <div className="admin-proj-title">{p.title}</div>
                          <div className="admin-proj-tagline">{p.tagline}</div>
                        </td>
                        <td>
                          <span className="admin-tag-badge">{p.category}</span>
                        </td>
                        <td style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem" }}>{p.year || "2026"}</td>
                        <td>
                          <button
                            onClick={() => handleToggleFeatured(p)}
                            className={`admin-feature-toggle ${p.featured ? "featured" : ""}`}
                            title="Click to toggle featured status"
                          >
                            <Star size={13} fill={p.featured ? "currentColor" : "none"} />
                            <span>{p.featured ? "Featured" : "Hidden"}</span>
                          </button>
                        </td>
                        <td>
                          <div className="admin-tech-pills">
                            {(Array.isArray(p.technologies) ? p.technologies : [p.technologies])
                              .slice(0, 3)
                              .map((t, idx) => (
                                <span key={idx} className="admin-tech-pill">
                                  {t}
                                </span>
                              ))}
                          </div>
                        </td>
                        <td style={{ textAlign: "right" }}>
                          <div className="admin-row-actions">
                            <Link
                              to={`/work/${p.slug}`}
                              target="_blank"
                              className="admin-action-icon-btn"
                              title="View detail page"
                            >
                              <ExternalLink size={15} />
                            </Link>

                            <button
                              onClick={() => openEditModal(p)}
                              className="admin-action-icon-btn edit"
                              title="Edit Project"
                            >
                              <Pencil size={15} />
                            </button>

                            <button
                              onClick={() => handleDeleteProject(p.id || p.slug, p.title)}
                              className="admin-action-icon-btn delete"
                              title="Delete Project"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* =========================================================================
           TAB 2: CLIENT INQUIRIES
           ========================================================================= */}
        {activeTab === "inquiries" && (
          <section className="admin-panel-section">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <h3 style={{ fontFamily: "var(--font-sans)", fontSize: "1.2rem", fontWeight: 700, margin: 0 }}>
                Incoming Client Transmissions ({inquiries.length})
              </h3>
              <p style={{ color: "#888894", fontSize: "0.85rem", margin: 0 }}>
                All contact form submissions & Resend emails are recorded here.
              </p>
            </div>

            {inquiries.length === 0 ? (
              <div style={{ padding: "4rem 2rem", textAlign: "center", background: "#ffffff", borderRadius: "16px", border: "1px solid #eee" }}>
                <Mail size={40} color="#c5832b" style={{ margin: "0 auto 1rem" }} />
                <h4>No Inquiries Received Yet</h4>
                <p style={{ color: "#888894", maxWidth: "400px", margin: "0 auto" }}>
                  When prospective clients submit inquiries through the contact page or drawer, they will appear right here in real time.
                </p>
              </div>
            ) : (
              <div className="admin-inquiries-grid">
                {inquiries.map((inq) => (
                  <div key={inq.id} className={`admin-inquiry-card ${inq.read ? "read" : "unread"}`}>
                    <div className="admin-inq-header">
                      <div>
                        <div className="admin-inq-name">{inq.name || "Anonymous Client"}</div>
                        <a href={`mailto:${inq.email}`} className="admin-inq-email">
                          {inq.email}
                        </a>
                      </div>
                      <span className="admin-inq-type-badge">{inq.projectType || "General"}</span>
                    </div>

                    <div className="admin-inq-meta-row">
                      <span><strong>Budget:</strong> {inq.budget || "Flexible"}</span>
                      <span>•</span>
                      <span><strong>Timeline:</strong> {inq.timeline || "Flexible"}</span>
                      <span>•</span>
                      <span>{new Date(inq.date).toLocaleDateString()}</span>
                    </div>

                    <div className="admin-inq-message-box">{inq.message || "No custom message provided."}</div>

                    <div className="admin-inq-footer">
                      <a
                        href={`mailto:${inq.email}?subject=Regarding Your ${inq.projectType || "Project"} Inquiry`}
                        className="admin-btn-primary"
                        style={{ padding: "0.5rem 1rem", fontSize: "0.8rem" }}
                      >
                        <Send size={13} /> Reply via Email
                      </a>

                      <button
                        onClick={() => deleteInquiry(inq.id)}
                        className="admin-action-icon-btn delete"
                        title="Delete Inquiry"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* =========================================================================
           TAB 3: DIAGNOSTICS & RESEND API
           ========================================================================= */}
        {activeTab === "diagnostics" && (
          <section className="admin-panel-section">
            <div className="admin-diagnostics-card">
              <h3 style={{ fontSize: "1.25rem", marginBottom: "0.5rem", color: "#121214" }}>
                Resend API Service Health
              </h3>
              <p style={{ color: "#737373", fontSize: "0.9rem", marginBottom: "1.5rem" }}>
                Configure and verify your email dispatch connection. Current target inbox: <strong>{OWNER_EMAIL}</strong>
              </p>

              <div style={{ background: "#f8f6f0", padding: "1.2rem", borderRadius: "10px", marginBottom: "1.5rem", border: "1px solid #ebd9c5" }}>
                <div style={{ fontSize: "0.8rem", color: "#737373", marginBottom: "4px", fontWeight: 700 }}>
                  ACTIVE API KEY (RESEND):
                </div>
                <code style={{ fontFamily: "monospace", fontSize: "0.95rem", color: "#92400e", wordBreak: "break-all" }}>
                  {DEFAULT_RESEND_KEY}
                </code>
              </div>

              <button onClick={handleTestEmail} className="admin-btn-primary">
                <Send size={15} /> Send Test Diagnostic Email
              </button>

              {testEmailStatus && (
                <div style={{ marginTop: "1.2rem", padding: "0.85rem 1.2rem", borderRadius: "8px", background: "#fdf8ec", border: "1px solid #f6dfad", color: "#784407", fontSize: "0.9rem" }}>
                  {testEmailStatus}
                </div>
              )}
            </div>
          </section>
        )}
      </main>

      {/* =========================================================================
         MODAL: ADD / EDIT PROJECT
         ========================================================================= */}
      {isProjectModalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-card">
            <div className="admin-modal-header">
              <h3 style={{ margin: 0, fontSize: "1.3rem", fontFamily: "var(--font-sans)" }}>
                {editingProject ? "EDIT PROJECT" : "ADD NEW PROJECT"}
              </h3>
              <button
                onClick={() => setIsProjectModalOpen(false)}
                className="admin-modal-close-btn"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="admin-modal-form">
              <div className="admin-form-row">
                <div className="admin-form-col">
                  <label className="admin-form-label">PROJECT TITLE *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Modern AI Workspace"
                    className="admin-form-input"
                  />
                </div>

                <div className="admin-form-col">
                  <label className="admin-form-label">CATEGORY *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="admin-form-input"
                  >
                    <option value="SOFTWARE">SOFTWARE</option>
                    <option value="WEB & APPS">WEB & APPS</option>
                    <option value="DESIGN SYSTEMS">DESIGN SYSTEMS</option>
                    <option value="CREATIVE & 3D">CREATIVE & 3D</option>
                  </select>
                </div>
              </div>

              <div className="admin-form-row">
                <div className="admin-form-col">
                  <label className="admin-form-label">TAGLINE / SUBTITLE *</label>
                  <input
                    type="text"
                    required
                    value={formData.tagline}
                    onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                    placeholder="e.g. Scalable enterprise management suite with real-time sync"
                    className="admin-form-input"
                  />
                </div>

                <div className="admin-form-col" style={{ maxWidth: "160px" }}>
                  <label className="admin-form-label">YEAR</label>
                  <input
                    type="text"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="admin-form-input"
                  />
                </div>
              </div>

              <div className="admin-form-row">
                <div className="admin-form-col">
                  <label className="admin-form-label">PREVIEW IMAGE URL / PATH</label>
                  <input
                    type="text"
                    value={formData.previewImage}
                    onChange={(e) => setFormData({ ...formData, previewImage: e.target.value })}
                    placeholder="/images/projects/hayatabad-school.jpg or https://..."
                    className="admin-form-input"
                  />
                </div>

                <div className="admin-form-col">
                  <label className="admin-form-label">CLIENT / ORGANIZATION</label>
                  <input
                    type="text"
                    value={formData.client}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                    placeholder="e.g. Apex Studio"
                    className="admin-form-input"
                  />
                </div>
              </div>

              <div className="admin-form-row">
                <div className="admin-form-col">
                  <label className="admin-form-label">TECHNOLOGIES (Comma separated)</label>
                  <input
                    type="text"
                    value={formData.technologies}
                    onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                    placeholder="React, Next.js, Node.js, TailwindCSS"
                    className="admin-form-input"
                  />
                </div>

                <div className="admin-form-col">
                  <label className="admin-form-label">TIMELINE / DURATION</label>
                  <input
                    type="text"
                    value={formData.timeline}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                    placeholder="e.g. 2.5 Months"
                    className="admin-form-input"
                  />
                </div>
              </div>

              <div className="admin-form-row">
                <div className="admin-form-col">
                  <label className="admin-form-label">LIVE DEMO URL</label>
                  <input
                    type="url"
                    value={formData.liveUrl}
                    onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                    placeholder="https://..."
                    className="admin-form-input"
                  />
                </div>

                <div className="admin-form-col">
                  <label className="admin-form-label">GITHUB REPOSITORY URL</label>
                  <input
                    type="url"
                    value={formData.githubUrl}
                    onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                    placeholder="https://github.com/..."
                    className="admin-form-input"
                  />
                </div>
              </div>

              <div className="admin-form-col">
                <label className="admin-form-label">SHORT DESCRIPTION (Shows on project spreads)</label>
                <textarea
                  rows={2}
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  placeholder="Summary of what the project solves and does..."
                  className="admin-form-input"
                />
              </div>

              <div className="admin-form-col">
                <label className="admin-form-label">FULL CASE STUDY OVERVIEW</label>
                <textarea
                  rows={3}
                  value={formData.overview}
                  onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
                  placeholder="In-depth details about the challenge, architecture, and impact..."
                  className="admin-form-input"
                />
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", margin: "0.5rem 0" }}>
                <input
                  type="checkbox"
                  id="featuredToggle"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  style={{ width: "18px", height: "18px", accentColor: "#c5832b" }}
                />
                <label htmlFor="featuredToggle" style={{ fontSize: "0.9rem", fontWeight: 600, color: "#121214" }}>
                  Feature on Portfolio Homepage Spread
                </label>
              </div>

              <div className="admin-modal-actions">
                <button
                  type="button"
                  onClick={() => setIsProjectModalOpen(false)}
                  className="admin-btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="admin-btn-primary">
                  <Check size={16} />
                  <span>{editingProject ? "SAVE CHANGES" : "CREATE PROJECT"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
         MODAL: CHANGE 5-DIGIT PIN
         ========================================================================= */}
      {isChangePinModalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-card" style={{ maxWidth: "440px", textAlign: "center" }}>
            <div className="admin-modal-header">
              <h3 style={{ margin: 0, fontSize: "1.2rem" }}>SET NEW 5-DIGIT PASSCODE</h3>
              <button
                onClick={() => setIsChangePinModalOpen(false)}
                className="admin-modal-close-btn"
              >
                <X size={18} />
              </button>
            </div>

            <p style={{ color: "#737373", fontSize: "0.85rem", margin: "1rem 0" }}>
              Enter 5 digits that you will use to access the /admin URL in the future.
            </p>

            <form onSubmit={handleSavePin}>
              <div className="admin-pin-inputs-row" style={{ justifyContent: "center", marginBottom: "1.5rem" }}>
                {newPinDigits.map((digit, idx) => (
                  <input
                    key={idx}
                    type="password"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    autoFocus={idx === 0}
                    onChange={(e) => {
                      if (!/^\d*$/.test(e.target.value)) return;
                      const next = [...newPinDigits];
                      next[idx] = e.target.value.slice(-1);
                      setNewPinDigits(next);
                      if (e.target.value && idx < 4) {
                        e.target.nextElementSibling?.focus();
                      }
                    }}
                    className={`admin-pin-digit-box ${digit ? "filled" : ""}`}
                  />
                ))}
              </div>

              {pinChangeSuccess && (
                <div style={{ color: "#10b981", fontSize: "0.9rem", fontWeight: 700, marginBottom: "1rem" }}>
                  ✅ Passcode successfully updated!
                </div>
              )}

              <div className="admin-modal-actions" style={{ justifyContent: "center" }}>
                <button
                  type="button"
                  onClick={() => setIsChangePinModalOpen(false)}
                  className="admin-btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={newPinDigits.some((d) => d === "")}
                  className="admin-btn-primary"
                >
                  SAVE PASSCODE
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
