import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { soundEngine } from "../utils/audioUtils";
import { PERSONAL_INFO } from "../data/portfolioData";
import { ArrowUpRight, MessageSquare } from "lucide-react";

function Navigation({ onOpenInquiry }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  // Smart Hide on Scroll Down, Show on Scroll Up
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 60) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (currentScrollY > lastScrollY && currentScrollY > 180 && !isMobileMenuOpen) {
        setIsHidden(true); // scrolling down
      } else {
        setIsHidden(false); // scrolling up
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobileMenuOpen]);

  const handleNavClick = (anchorId) => {
    soundEngine.playClick();
    setIsMobileMenuOpen(false);

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById(anchorId);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } else {
      const el = document.getElementById(anchorId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`nav-header ${isScrolled ? "nav-scrolled" : ""} ${
          isHidden ? "nav-hidden" : ""
        }`}
      >
        {/* Official Transparent Logo — Large & Crisp */}
        <Link
          to="/"
          className="nav-logo-brand"
          onClick={() => soundEngine.playClick()}
          data-cursor="link"
        >
          <img
            src="/images/logo.svg"
            alt={PERSONAL_INFO.name}
            className="nav-logo-img"
          />
        </Link>

        {/* Desktop Editorial Navigation Links */}
        <nav className="desktop-nav-wrap">
          <ul className="nav-links">
            <li>
              <button
                className="nav-link-item"
                onClick={() => handleNavClick("hero")}
                data-cursor="link"
              >
                Home
              </button>
            </li>
            <li>
              <button
                className="nav-link-item"
                onClick={() => handleNavClick("work")}
                data-cursor="link"
              >
                Work
              </button>
            </li>
            <li>
              <button
                className="nav-link-item"
                onClick={() => handleNavClick("about")}
                data-cursor="link"
              >
                About
              </button>
            </li>
            <li>
              <button
                className="nav-link-item"
                onClick={() => handleNavClick("services")}
                data-cursor="link"
              >
                Services
              </button>
            </li>
            <li>
              <button
                className="nav-link-item"
                onClick={() => handleNavClick("skills")}
                data-cursor="link"
              >
                Skills
              </button>
            </li>
            <li>
              <button
                className="nav-link-item"
                onClick={() => handleNavClick("experience")}
                data-cursor="link"
              >
                Experience
              </button>
            </li>
            <li>
              <button
                className="nav-link-item"
                onClick={() => handleNavClick("contact")}
                data-cursor="link"
              >
                Contact
              </button>
            </li>
          </ul>
        </nav>

        {/* Right Actions: Desktop CTA & Mobile Hamburger */}
        <div className="nav-actions">
          <button
            onClick={() => {
              soundEngine.playWhoosh("open");
              onOpenInquiry?.();
            }}
            className="btn-primary-editorial nav-desktop-cta"
            data-cursor="link"
          >
            LET'S TALK
          </button>

          {/* Mobile Hamburger Menu Trigger */}
          <button
            className={`mobile-menu-trigger ${isMobileMenuOpen ? "open" : ""}`}
            onClick={() => {
              soundEngine.playClick();
              setIsMobileMenuOpen(!isMobileMenuOpen);
            }}
            aria-label="Toggle mobile menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* Fullscreen Mobile Drawer Containing All Navigation Buttons */}
      <div className={`mobile-drawer ${isMobileMenuOpen ? "open" : ""}`}>
        <div className="mobile-drawer-top">
          <div className="badge-tag" style={{ marginBottom: "1.5rem" }}>
            <span className="status-dot" />
            {PERSONAL_INFO.status}
          </div>

          <ul className="mobile-nav-links">
            <li>
              <button className="mobile-nav-item" onClick={() => handleNavClick("hero")}>
                HOME
              </button>
            </li>
            <li>
              <button className="mobile-nav-item" onClick={() => handleNavClick("work")}>
                WORK
              </button>
            </li>
            <li>
              <button className="mobile-nav-item" onClick={() => handleNavClick("about")}>
                ABOUT ME
              </button>
            </li>
            <li>
              <button className="mobile-nav-item" onClick={() => handleNavClick("services")}>
                SERVICES
              </button>
            </li>
            <li>
              <button className="mobile-nav-item" onClick={() => handleNavClick("skills")}>
                SKILLS & FIGMA
              </button>
            </li>
            <li>
              <button className="mobile-nav-item" onClick={() => handleNavClick("experience")}>
                EXPERIENCE
              </button>
            </li>
            <li>
              <button className="mobile-nav-item" onClick={() => handleNavClick("contact")}>
                CONTACT
              </button>
            </li>
          </ul>

          {/* Mobile Drawer CTA Button */}
          <div style={{ marginTop: "2rem" }}>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                soundEngine.playWhoosh("open");
                onOpenInquiry?.();
              }}
              className="btn-primary-editorial"
              style={{ width: "100%", justifyContent: "center", padding: "1rem" }}
            >
              <MessageSquare size={16} />
              <span>START A PROJECT / LET'S TALK</span>
            </button>
          </div>
        </div>

        <div className="mobile-drawer-footer">
          <div className="text-meta" style={{ marginBottom: "0.5rem" }}>
            DIRECT EMAIL
          </div>
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            style={{
              fontSize: "1.1rem",
              fontFamily: "var(--font-serif)",
              color: "var(--text-primary)",
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              fontWeight: 700,
            }}
          >
            {PERSONAL_INFO.email} <ArrowUpRight size={18} />
          </a>
        </div>
      </div>
    </>
  );
}

export default Navigation;
