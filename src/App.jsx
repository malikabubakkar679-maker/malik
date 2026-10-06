import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navigation from "./components/Navigation";
import CustomCursor from "./components/CustomCursor";
import Preloader from "./components/Preloader";
import Home from "./components/Home";
import ProjectDetail from "./components/ProjectDetail";
import InquiryDrawer from "./components/InquiryDrawer";
import AdminPanel from "./components/AdminPanel";
import { useSmoothScroll } from "./hooks/useSmoothScroll";
import "./styles/index.css";

function AppContent() {
  const [isIntroReady, setIsIntroReady] = useState(false);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  // Initialize Lenis smooth scroll; locks when modal is open or disabled on admin
  useSmoothScroll(isInquiryOpen || isAdminRoute);

  return (
    <div className="portfolio-app-root">
      {/* Custom Cursor System */}
      <CustomCursor />

      {/* Cinematic Session-Aware Preloader (Disabled on Admin) */}
      {!isAdminRoute && <Preloader onComplete={() => setIsIntroReady(true)} />}

      {/* Floating Glass Navigation (Disabled on Admin) */}
      {!isAdminRoute && <Navigation onOpenInquiry={() => setIsInquiryOpen(true)} />}

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
        <Route path="/admin" element={<AdminPanel />} />
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
      {!isAdminRoute && (
        <InquiryDrawer
          isOpen={isInquiryOpen}
          onClose={() => setIsInquiryOpen(false)}
        />
      )}
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
