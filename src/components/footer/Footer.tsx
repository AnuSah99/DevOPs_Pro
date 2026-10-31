"use client";

import React from "react";
import Link from "next/link";
import { useSound } from "@/lib/soundContext";
import { ChevronUp, Mail, Heart, Terminal, Shield } from "lucide-react";
import { GithubIcon, InstagramIcon } from "@/components/icons/BrandIcons";

export default function Footer() {
  const { playHover, playClick } = useSound();

  const scrollToTop = () => {
    playClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#050505] border-t border-cyan-500/20 pt-16 pb-12 px-4 sm:px-6 lg:px-8 font-mono text-xs overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-cyan-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">

          {/* Left Column: Brand & Bio */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center font-bold text-black text-xs">
                AS
              </div>
              <span className="text-base font-bold text-white tracking-wider">
                ANU<span className="text-cyan-400">.</span>SAH
              </span>
              <span className="px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30 text-[10px] text-cyan-300">
                v2.6 // 2026
              </span>
            </div>

            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              IT Enthusiast • Creative Developer • Tech Explorer.
              Exploring modern web architectures, creative interfaces, and the future of technology.
            </p>

            <div className="text-[11px] text-gray-500 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-cyan-400" />
              <span>Strict Data Integrity: No fabricated milestones or credentials.</span>
            </div>
          </div>

          {/* Middle Column: Quick Anchors */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-cyan-400 font-bold uppercase tracking-wider text-xs">
              // NAVIGATION NODES
            </div>
            <ul className="space-y-2 text-gray-400">
              {["home", "about", "technologies", "projects", "journey", "contact"].map((id) => (
                <li key={id}>
                  <button
                    onClick={() => {
                      playClick();
                      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
                    }}
                    onMouseEnter={playHover}
                    className="hover:text-cyan-300 transition-colors uppercase text-left"
                  >
                    &gt; {id}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: Transmission Channels & Socials */}
          <div className="md:col-span-4 space-y-4">
            <div className="text-cyan-400 font-bold uppercase tracking-wider text-xs">
              // CONNECTIVITY PORTALS
            </div>

            <div className="space-y-2 text-gray-300">
              <p className="text-gray-400">
                Email: <span className="text-white">Code.anukrsah@gmail.com</span>
              </p>
            </div>

            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://github.com/Anusah99"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={playHover}
                onClick={playClick}
                className="p-2.5 rounded-lg bg-black/60 border border-white/10 text-gray-300 hover:text-cyan-400 hover:border-cyan-400/40 transition-all"
                aria-label="GitHub Profile"
              >
                <GithubIcon className="w-4 h-4" />
              </a>

              <a
                href="https://instagram.com/itz_anukrsah_xd"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={playHover}
                onClick={playClick}
                className="p-2.5 rounded-lg bg-black/60 border border-white/10 text-gray-300 hover:text-pink-400 hover:border-pink-400/40 transition-all"
                aria-label="Instagram Profile"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>

              <a
                href="mailto:Code.anukrsah@gmail.com"
                onMouseEnter={playHover}
                onClick={playClick}
                className="p-2.5 rounded-lg bg-black/60 border border-white/10 text-gray-300 hover:text-white hover:border-white/40 transition-all"
                aria-label="Send Direct Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Sub-bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-gray-500 text-[11px]">
          <div>
            &copy; 2026 Anu Sah. All rights reserved. // ANU.OS DIGITAL UNIVERSE
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/admin"
              className="text-gray-400 hover:text-cyan-300 transition-colors flex items-center gap-1"
            >
              <Shield className="w-3 h-3 text-cyan-400" />
              <span>ADMIN CMS PORTAL</span>
            </Link>
            <span className="text-gray-600">|</span>
            <span className="text-cyan-500/70">ALL SYSTEMS OPERATIONAL</span>
            <button
              onClick={scrollToTop}
              onMouseEnter={playHover}
              className="p-2 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center gap-1 transition-all"
            >
              <span>TOP</span>
              <ChevronUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
