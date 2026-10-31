"use client";

import React, { useState, useEffect } from "react";
import HolographicCore from "./HolographicCore";
import { useSound } from "@/lib/soundContext";
import { usePortfolio } from "@/lib/portfolioContext";
import { ArrowRight, Terminal, Sparkles, ChevronDown } from "lucide-react";
import { GithubIcon, InstagramIcon } from "@/components/icons/BrandIcons";

export default function HeroSection() {
  const { playHover, playClick } = useSound();
  const { profile } = usePortfolio();
  const [typedTitle, setTypedTitle] = useState("");
  const fullTitle = profile.tagline || "EXPLORING TECHNOLOGY. CREATING DIGITAL EXPERIENCES.";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedTitle(fullTitle.slice(0, index));
      index++;
      if (index > fullTitle.length) {
        clearInterval(interval);
      }
    }, 45);
    return () => clearInterval(interval);
  }, [fullTitle]);

  const scrollTo = (id: string) => {
    playClick();
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex flex-col justify-center pt-28 pb-16 overflow-hidden cyber-grid border-b border-cyan-500/10"
    >
      {/* Ambient Lighting Gradients */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-cyan-500/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 -right-48 w-96 h-96 bg-purple-600/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Futuristic Scanline Horizon */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* Left Column: Typography & Identity */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* System Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-6 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <span>DIGITAL IDENTITY // ARCHITECTURE 2026</span>
              <span className="text-cyan-500/40">|</span>
              <span className="text-gray-400">SYS: ACTIVE</span>
            </div>

            {/* Main Greeting */}
            <h2 className="text-cyan-400 font-mono text-sm sm:text-base font-semibold tracking-widest uppercase mb-2 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span>HEY, I&apos;M</span>
            </h2>

            {/* Name with Cyber Glitch Accent */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-4">
              {profile.name.toUpperCase()}
            </h1>

            {/* Typing Subtitle */}
            <div className="min-h-[56px] sm:min-h-[64px] mb-6">
              <p className="text-lg sm:text-2xl font-mono text-gray-200 font-medium leading-relaxed tracking-wide">
                {typedTitle}
                <span className="terminal-cursor" />
              </p>
            </div>

            {/* Supporting Intro Statement */}
            <p className="text-sm sm:text-base text-gray-400 max-w-xl leading-relaxed mb-8 font-normal">
              An IT enthusiast passionate about web technologies, creative development,
              modern interfaces, and exploring the future of technology.
            </p>

            {/* Confirmed Tech Pills Bar */}
            <div className="flex flex-wrap items-center gap-2.5 mb-8">
              <span className="text-xs font-mono text-gray-400 mr-1 uppercase">Core Stack:</span>
              {["HTML", "CSS", "JavaScript", "Tailwind CSS"].map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 text-xs font-mono font-medium rounded bg-white/5 border border-cyan-500/20 text-cyan-300 hover:border-cyan-400/50 hover:bg-cyan-500/10 transition-colors"
                >
                  #{tech}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
              {/* Explore My Work CTA */}
              <button
                onClick={() => scrollTo("projects")}
                onMouseEnter={playHover}
                className="relative group px-6 py-3.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-semibold font-mono text-sm tracking-wide shadow-lg shadow-cyan-500/25 hover:shadow-cyan-400/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>EXPLORE MY WORK</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Let's Connect CTA */}
              <button
                onClick={() => scrollTo("contact")}
                onMouseEnter={playHover}
                className="relative px-6 py-3.5 rounded-lg bg-gray-900/80 hover:bg-cyan-950/30 text-white font-mono text-sm tracking-wide border border-cyan-500/30 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/10 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2"
              >
                <span>LET&apos;S CONNECT</span>
              </button>

              {/* Social Links */}
              <div className="flex items-center gap-3 ml-0 sm:ml-2 pt-2 sm:pt-0">
                <a
                  href={profile.github || "https://github.com/Anusah99"}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={playHover}
                  onClick={playClick}
                  className="p-3 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:text-cyan-400 hover:border-cyan-400/40 hover:bg-cyan-500/10 transition-all"
                  aria-label="GitHub Profile"
                >
                  <GithubIcon className="w-5 h-5" />
                </a>
                <a
                  href={profile.instagram || "https://instagram.com/itz_anukrsah_xd"}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={playHover}
                  onClick={playClick}
                  className="p-3 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:text-pink-400 hover:border-pink-400/40 hover:bg-pink-500/10 transition-all"
                  aria-label="Instagram Profile"
                >
                  <InstagramIcon className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive 3D Holographic Core */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Holographic Base Ring Aura */}
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-purple-500/10 to-transparent rounded-3xl blur-2xl pointer-events-none" />

            {/* Cyber Container Frame */}
            <div className="w-full relative rounded-2xl glass-panel p-2 cyber-corner shadow-2xl shadow-cyan-950/40 border border-cyan-500/20">
              <HolographicCore />

              {/* Bottom Interactive Prompt */}
              <div className="absolute bottom-3 left-0 right-0 text-center pointer-events-none">
                <span className="inline-block text-[10px] font-mono uppercase tracking-widest text-cyan-400/60 bg-black/60 px-3 py-0.5 rounded-full border border-cyan-500/20">
                  DRAG &amp; HOVER TO INTERACT
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Scroll Indicator */}
        <div className="mt-12 flex justify-center">
          <button
            onClick={() => scrollTo("about")}
            onMouseEnter={playHover}
            aria-label="Scroll to about section"
            className="flex flex-col items-center gap-1 text-gray-500 hover:text-cyan-400 transition-colors group"
          >
            <span className="text-[10px] font-mono tracking-widest uppercase text-gray-500 group-hover:text-cyan-400">
              DISCOVER MORE
            </span>
            <ChevronDown className="w-4 h-4 animate-bounce text-cyan-400/70" />
          </button>
        </div>
      </div>
    </section>
  );
}
