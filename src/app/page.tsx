"use client";

import React, { useState, useEffect } from "react";
import { SoundProvider } from "@/lib/soundContext";
import Navbar from "@/components/nav/Navbar";
import HeroSection from "@/components/hero/HeroSection";
import AboutSection from "@/components/about/AboutSection";
import TechStackSection from "@/components/tech/TechStackSection";
import TerminalSection from "@/components/terminal/TerminalSection";
import ProjectsAndGithubSection from "@/components/projects/ProjectsAndGithubSection";
import JourneyAndContactSection from "@/components/journey/JourneyAndContactSection";
import Footer from "@/components/footer/Footer";
import CustomCursor from "@/components/effects/CustomCursor";
import ScrollProgress from "@/components/effects/ScrollProgress";
import BootLoader from "@/components/loader/BootLoader";

export default function Home() {
  const [booted, setBooted] = useState(false);

  useEffect(() => {
    // Check session storage so return visits don't force bootloader
    const hasBooted = sessionStorage.getItem("anu_os_booted");
    if (hasBooted === "true") {
      setBooted(true);
    }
  }, []);

  const handleBootComplete = () => {
    setBooted(true);
    sessionStorage.setItem("anu_os_booted", "true");
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <ScrollProgress />

      {/* Cyber Reticle Custom Cursor */}
      <CustomCursor />

      {/* Futuristic System Boot Loader */}
      {!booted && <BootLoader onBootComplete={handleBootComplete} />}

      {/* Main Portfolio Surface */}
      <div className="relative min-h-screen bg-[#050505] text-[#f0f6fc] selection:bg-cyan-400 selection:text-black">
        {/* Navigation */}
        <Navbar />

        {/* Content Stream */}
        <main className="relative">
          <HeroSection />
          <AboutSection />
          <TechStackSection />
          <TerminalSection />
          <ProjectsAndGithubSection />
          <JourneyAndContactSection />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
