import React, { useEffect } from "react";
import { soundEngine } from "../utils/audioUtils";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function Lightbox({ isOpen, activeImage, gallery = [], onClose, onNext, onPrev }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === "Escape") {
        soundEngine.playWhoosh("close");
        onClose?.();
      } else if (e.key === "ArrowRight") {
        onNext?.();
      } else if (e.key === "ArrowLeft") {
        onPrev?.();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, onNext, onPrev]);

  if (!isOpen || !activeImage) return null;

  return (
    <div
      className="lightbox-overlay"
      onClick={() => {
        soundEngine.playWhoosh("close");
        onClose?.();
      }}
    >
      <button
        className="lightbox-close-btn"
        onClick={(e) => {
          e.stopPropagation();
          soundEngine.playWhoosh("close");
          onClose?.();
        }}
        data-cursor="link"
        aria-label="Close Lightbox"
      >
        <X size={20} />
      </button>

      {gallery.length > 1 && onPrev && (
        <button
          className="slider-arrow-btn"
          style={{ position: "fixed", left: "2rem", top: "50%", transform: "translateY(-50%)" }}
          onClick={(e) => {
            e.stopPropagation();
            soundEngine.playClick();
            onPrev();
          }}
          data-cursor="link"
          aria-label="Previous image"
        >
          <ChevronLeft size={24} />
        </button>
      )}

      {gallery.length > 1 && onNext && (
        <button
          className="slider-arrow-btn"
          style={{ position: "fixed", right: "2rem", top: "50%", transform: "translateY(-50%)" }}
          onClick={(e) => {
            e.stopPropagation();
            soundEngine.playClick();
            onNext();
          }}
          data-cursor="link"
          aria-label="Next image"
        >
          <ChevronRight size={24} />
        </button>
      )}

      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <img
          src={typeof activeImage === "string" ? activeImage : activeImage.url}
          alt={activeImage.caption || "Fullscreen view"}
          className="lightbox-img"
        />
        {activeImage.caption && (
          <p
            style={{
              marginTop: "1rem",
              fontFamily: "var(--font-mono)",
              fontSize: "0.85rem",
              color: "var(--text-secondary)",
              textAlign: "center",
              background: "rgba(0,0,0,0.7)",
              padding: "0.5rem 1rem",
              borderRadius: "8px",
            }}
          >
            {activeImage.caption}
          </p>
        )}
      </div>
    </div>
  );
}
