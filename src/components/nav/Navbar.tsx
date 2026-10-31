"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSound } from "@/lib/soundContext";
import CommandPalette from "./CommandPalette";
import {
  Menu,
  X,
  Volume2,
  VolumeX,
  Terminal,
  Activity,
  Command,
  Shield,
} from "lucide-react";

const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "technologies", label: "Technologies" },
  { id: "projects", label: "Projects" },
  { id: "journey", label: "Journey" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const { isMuted, toggleMute, playHover, playClick } = useSound();
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  // Live Digital Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const mins = String(now.getMinutes()).padStart(2, "0");
      const secs = String(now.getSeconds()).padStart(2, "0");
      setCurrentTime(`${hours}:${mins}:${secs}`);
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Scroll detection & active section
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      const sections = NAV_ITEMS.map((item) => document.getElementById(item.id));
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPos) {
          setActiveSection(NAV_ITEMS[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Shortcut key Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCmdOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const scrollTo = (id: string) => {
    playClick();
    setMobileMenuOpen(false);
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <CommandPalette isOpen={cmdOpen} onClose={() => setCmdOpen(false)} />

      {/* Top Futuristic HUD Telemetry Bar */}
      <header className="fixed top-0 left-0 right-0 z-40">
        <div className="w-full bg-[#050505]/95 border-b border-cyan-500/15 py-1 px-4 sm:px-8 text-[11px] font-mono text-gray-400 flex items-center justify-between backdrop-blur-md">
          {/* Left: System Status */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-cyan-400">
              <Activity className="w-3.5 h-3.5 animate-pulse" />
              <span className="font-semibold hidden sm:inline">SYS: ONLINE</span>
              <span className="text-gray-600 hidden sm:inline">|</span>
              <span className="text-emerald-400">LATENCY: 12ms</span>
            </div>
            <div className="hidden md:flex items-center gap-1.5 text-gray-500">
              <span>KERNEL: 2.6.0-CYBER</span>
            </div>
          </div>

          {/* Right: Clock & Audio & Quick Cmd Toggle */}
          <div className="flex items-center gap-4">
            {/* Clock */}
            <div className="text-cyan-300 font-mono tracking-wider flex items-center gap-1.5">
              <span className="text-gray-500 text-[10px]">TIME:</span>
              <span>{currentTime || "00:00:00"}</span>
            </div>

            {/* Audio Toggle */}
            <button
              onClick={toggleMute}
              onMouseEnter={playHover}
              className="flex items-center gap-1 text-gray-400 hover:text-cyan-400 transition-colors px-1.5 py-0.5 rounded border border-white/10 hover:border-cyan-500/30"
              title={isMuted ? "Unmute Sound" : "Mute Sound"}
              aria-label="Toggle Sound"
            >
              {isMuted ? (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-red-400" />
                  <span className="text-[10px] hidden sm:inline text-red-400 font-mono">MUTED</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="text-[10px] hidden sm:inline text-cyan-400 font-mono">AUDIO ON</span>
                  {/* Animated Wave */}
                  <span className="flex items-end gap-0.5 h-2.5 ml-0.5">
                    <span className="w-0.5 h-1.5 bg-cyan-400 animate-pulse" />
                    <span className="w-0.5 h-2.5 bg-cyan-400 animate-pulse delay-75" />
                    <span className="w-0.5 h-1 bg-cyan-400 animate-pulse delay-150" />
                  </span>
                </>
              )}
            </button>

            {/* Command Palette Button */}
            <button
              onClick={() => {
                playClick();
                setCmdOpen(true);
              }}
              onMouseEnter={playHover}
              className="hidden sm:flex items-center gap-1 text-[10px] text-gray-400 hover:text-white bg-white/5 hover:bg-cyan-500/10 border border-white/10 hover:border-cyan-500/30 px-2 py-0.5 rounded transition-all"
            >
              <Command className="w-3 h-3 text-cyan-400" />
              <span>CMD+K</span>
            </button>
          </div>
        </div>

        {/* Floating Main Navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-2">
          <nav
            className={`w-full rounded-2xl transition-all duration-300 px-4 sm:px-6 py-3 flex items-center justify-between border ${
              isScrolled
                ? "bg-[#080d1a]/85 border-cyan-500/30 shadow-xl shadow-cyan-950/40 backdrop-blur-xl"
                : "bg-[#080d1a]/50 border-white/10 backdrop-blur-md"
            }`}
          >
            {/* Brand Logo */}
            <button
              onClick={() => scrollTo("home")}
              onMouseEnter={playHover}
              className="flex items-center gap-2 group text-left"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center font-mono font-extrabold text-black text-sm shadow-md shadow-cyan-500/30 group-hover:scale-105 transition-transform">
                AS
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-base font-bold tracking-wider text-white group-hover:text-cyan-400 transition-colors flex items-center gap-1">
                  ANU<span className="text-cyan-400">.</span>SAH
                </span>
                <span className="text-[9px] font-mono text-cyan-500/70 tracking-widest uppercase">
                  CREATIVE DEV // 2026
                </span>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-1 lg:gap-2">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    onMouseEnter={playHover}
                    className={`relative px-3.5 py-1.5 rounded-lg font-mono text-xs tracking-wider transition-all duration-200 ${
                      isActive
                        ? "text-cyan-400 font-bold bg-cyan-500/10 border border-cyan-500/30 shadow-sm shadow-cyan-500/20"
                        : "text-gray-300 hover:text-white hover:bg-white/5 border border-transparent"
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-2 right-2 h-[2px] bg-cyan-400 shadow-[0_0_8px_#00f5ff]" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Right Action: Interactive Terminal Anchor & Admin CMS */}
            <div className="hidden md:flex items-center gap-2">
              <Link
                href="/admin"
                onMouseEnter={playHover}
                className="px-3 py-1.5 rounded-lg bg-black/40 hover:bg-cyan-500/10 border border-white/10 hover:border-cyan-500/40 text-gray-300 hover:text-cyan-300 font-mono text-xs flex items-center gap-1.5 transition-all"
                title="Admin CMS Portal"
              >
                <Shield className="w-3.5 h-3.5 text-cyan-400" />
                <span>ADMIN</span>
              </Link>

              <button
                onClick={() => scrollTo("terminal")}
                onMouseEnter={playHover}
                className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500/20 to-purple-500/20 hover:from-cyan-500/30 hover:to-purple-500/30 border border-cyan-500/40 text-cyan-300 font-mono text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm shadow-cyan-500/10 hover:shadow-cyan-500/30 hover:scale-[1.02]"
              >
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                <span>TERMINAL</span>
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={() => {
                  playClick();
                  setCmdOpen(true);
                }}
                className="p-2 rounded-lg bg-white/5 border border-white/10 text-cyan-400"
                aria-label="Open Command Search"
              >
                <Command className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  playClick();
                  setMobileMenuOpen((prev) => !prev);
                }}
                className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-200 hover:text-white"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </nav>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden max-w-7xl mx-auto px-4 sm:px-6 mt-2">
            <div className="rounded-2xl glass-panel border border-cyan-500/30 p-4 shadow-2xl shadow-cyan-950/90 font-mono text-sm space-y-2">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  onMouseEnter={playHover}
                  className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-left transition-colors ${
                    activeSection === item.id
                      ? "text-cyan-400 bg-cyan-500/15 font-bold border border-cyan-500/30"
                      : "text-gray-300 hover:bg-white/5"
                  }`}
                >
                  <span>{item.label}</span>
                  <span className="text-[10px] text-gray-500 uppercase">
                    #{item.id}
                  </span>
                </button>
              ))}

              <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
                <Link
                  href="/admin"
                  className="w-full py-2 px-3 rounded-lg bg-black/60 border border-white/10 text-gray-300 font-semibold text-center flex items-center justify-center gap-2 text-xs"
                >
                  <Shield className="w-4 h-4 text-cyan-400" />
                  <span>ADMIN CMS DASHBOARD</span>
                </Link>

                <button
                  onClick={() => {
                    scrollTo("terminal");
                  }}
                  className="w-full py-2 px-3 rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 font-semibold text-center flex items-center justify-center gap-2"
                >
                  <Terminal className="w-4 h-4" />
                  <span>OPEN INTERACTIVE TERMINAL</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
