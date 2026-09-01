import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navigation from "./components/Navigation";
import CustomCursor from "./components/CustomCursor";
import Preloader from "./components/Preloader";
import Home from "./components/Home";
import ProjectDetail from "./components/ProjectDetail";
import InquiryDrawer from "./components/InquiryDrawer";
import { useSmoothScroll } from "./hooks/useSmoothScroll";
import "./styles/index.css";

function AppContent() {
  const [isIntroReady, setIsIntroReady] = useState(false);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);

  // Initialize Lenis smooth scroll; locks when modal is open
  useSmoothScroll(isInquiryOpen);

  return (
    <div className="portfolio-app-root">
      {/* Custom Cursor System */}
      <CustomCursor />

      {/* Cinematic Session-Aware Preloader */}
      <Preloader onComplete={() => setIsIntroReady(true)} />

      {/* Floating Glass Navigation */}
      <Navigation onOpenInquiry={() => setIsInquiryOpen(true)} />

      {/* Route Switcher */}
      <Routes>
        <Route
          path="/"
          element={
            <Home
              isIntroReady={isIntroReady}
              onOpenInquiry={() => setIsInquiryOpen(true)}
            />
          }
        />
        <Route path="/work/:slug" element={<ProjectDetail />} />
        <Route
          path="*"
          element={
            <Home
              isIntroReady={isIntroReady}
              onOpenInquiry={() => setIsInquiryOpen(true)}
            />
          }
        />
      </Routes>

      {/* Interactive Project Inquiry Drawer */}
      <InquiryDrawer
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
