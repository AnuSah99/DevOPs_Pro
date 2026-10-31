"use client";

import React, { useState } from "react";
import { useSound } from "@/lib/soundContext";
import { usePortfolio } from "@/lib/portfolioContext";
import {
  Shield,
  Cpu,
  Globe,
  Sparkles,
  Terminal,
  ExternalLink,
  Code2,
  Layers,
  Flame,
  CheckCircle2,
} from "lucide-react";

export default function AboutSection() {
  const { playHover, playClick } = useSound();
  const { profile } = usePortfolio();
  const [activeTab, setActiveTab] = useState<"overview" | "identity" | "interests">("overview");

  // Editable personal interests as instructed
  const interests = [
    {
      title: "Creative Frontend & UI/UX",
      desc: "Crafting fluid, high-fidelity responsive interfaces that bridge design and engineering.",
      icon: <Sparkles className="w-4 h-4 text-cyan-400" />,
      tag: "CORE_FOCUS",
    },
    {
      title: "Interactive Web & 3D Graphics",
      desc: "Experimenting with Three.js, shaders, and physics-driven micro-interactions.",
      icon: <Layers className="w-4 h-4 text-purple-400" />,
      tag: "EXPLORING",
    },
    {
      title: "Cyberpunk & Developer Aesthetics",
      desc: "Obsessed with HUD interfaces, neon telemetry, and minimalist hacker design languages.",
      icon: <Terminal className="w-4 h-4 text-emerald-400" />,
      tag: "PASSION",
    },
    {
      title: "Open Source & GitHub Ecosystem",
      desc: "Actively exploring repositories, modern frameworks, and collaborative developer workflows.",
      icon: <Flame className="w-4 h-4 text-pink-400" />,
      tag: "ACTIVE",
    },
  ];

  return (
    <section
      id="about"
      className="relative py-24 px-4 sm:px-6 lg:px-8 border-b border-cyan-500/10 bg-[#050505] cyber-dots overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-400 font-mono text-xs mb-3">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>01 // IDENTITY DOSSIER</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            BEHIND THE <span className="gradient-cyber-text">CODE.</span>
          </h2>
          <p className="text-gray-400 max-w-2xl text-base sm:text-lg">
            Unraveling digital architecture through creative curiosity and persistent experimentation.
          </p>
        </div>

        {/* Split Screen Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">

          {/* Left Column: Interactive Cyber Identity Card */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="relative rounded-2xl glass-panel p-6 sm:p-8 cyber-corner border border-cyan-500/30 h-full flex flex-col justify-between shadow-xl shadow-cyan-950/30">

              {/* Holographic ID Card Header */}
              <div>
                <div className="flex items-center justify-between border-b border-cyan-500/20 pb-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 flex items-center justify-center font-mono font-black text-black text-lg shadow-lg shadow-cyan-500/30">
                        AS
                      </div>
                      <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-black animate-pulse" />
                    </div>
                    <div>
                      <h3 className="font-mono text-lg font-bold text-white tracking-wide">
                        {profile.name.toUpperCase()}
                      </h3>
                      <p className="font-mono text-xs text-cyan-400">
                        @Anusah99 // CLEARANCE: LVL_1
                      </p>
                    </div>
                  </div>
                  <Shield className="w-6 h-6 text-cyan-400/60" />
                </div>

                {/* Identity Telemetry Matrix */}
                <div className="space-y-3 font-mono text-xs mb-6">
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-black/40 border border-white/5">
                    <span className="text-gray-400">ROLE_DESIGNATION:</span>
                    <span className="text-cyan-300 font-semibold">{profile.role}</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-black/40 border border-white/5">
                    <span className="text-gray-400">STATUS:</span>
                    <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      ALWAYS LEARNING &amp; BUILDING
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-black/40 border border-white/5">
                    <span className="text-gray-400">GITHUB_STATUS:</span>
                    <span className="text-purple-300 font-semibold">Advanced Experience</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-black/40 border border-white/5">
                    <span className="text-gray-400">COMMUNICATION:</span>
                    <span className="text-gray-300">{profile.email}</span>
                  </div>
                </div>

                {/* Confirmed Foundation Tech Stack */}
                <div className="mb-6">
                  <div className="text-xs font-mono text-gray-400 mb-2 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                    <span>CONFIRMED TECHNOLOGIES:</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 font-mono text-xs">
                    {["HTML5", "CSS3", "JavaScript (ES6+)", "Tailwind CSS"].map((t) => (
                      <div
                        key={t}
                        className="p-2 rounded bg-cyan-950/30 border border-cyan-500/20 text-cyan-200 flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                        <span>{t}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Quick Links */}
              <div className="pt-4 border-t border-cyan-500/20 flex items-center justify-between font-mono text-xs">
                <span className="text-gray-500">SYSTEM ID: #ANU-2026-X</span>
                <a
                  href="https://github.com/Anusah99"
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={playHover}
                  onClick={playClick}
                  className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 hover:underline"
                >
                  <span>GITHUB PROFILE</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative, Interactive Tabs, & Interests */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            {/* Nav Tabs */}
            <div className="flex items-center gap-2 border-b border-white/10 pb-4 mb-6 font-mono text-xs">
              <button
                onClick={() => {
                  playClick();
                  setActiveTab("overview");
                }}
                onMouseEnter={playHover}
                className={`px-4 py-2 rounded-lg transition-all ${
                  activeTab === "overview"
                    ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 font-bold"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                // 01. OVERVIEW
              </button>
              <button
                onClick={() => {
                  playClick();
                  setActiveTab("interests");
                }}
                onMouseEnter={playHover}
                className={`px-4 py-2 rounded-lg transition-all ${
                  activeTab === "interests"
                    ? "bg-purple-500/20 text-purple-400 border border-purple-500/40 font-bold"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                // 02. EXPLORATION HORIZONS
              </button>
            </div>

            {/* Tab 1: Overview Narrative */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div className="rounded-2xl glass-panel p-6 sm:p-8 border border-white/10 relative overflow-hidden">
                  <div className="absolute -right-8 -top-8 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

                  <h3 className="font-mono text-cyan-400 text-sm font-semibold tracking-wider uppercase mb-3 flex items-center gap-2">
                    <Code2 className="w-4 h-4" />
                    <span>PHILOSOPHY &amp; MOTIVATION</span>
                  </h3>

                  <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-4">
                    &ldquo;{profile.bio1}&rdquo;
                  </p>

                  <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-6">
                    &ldquo;{profile.bio2}&rdquo;
                  </p>

                  {/* Simulated Terminal Code Snippet */}
                  <div className="rounded-xl bg-black/70 border border-cyan-500/20 p-4 font-mono text-xs overflow-x-auto">
                    <div className="flex items-center gap-2 text-gray-500 mb-2 border-b border-white/5 pb-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                      <span className="text-[11px] text-gray-400 ml-2">identity.ts</span>
                    </div>
                    <pre className="text-gray-300 leading-relaxed">
                      <span className="text-purple-400">const</span> developer = {"{"}
                      {"\n"}  name: <span className="text-cyan-300">&quot;Anu Sah&quot;</span>,
                      {"\n"}  passion: <span className="text-cyan-300">&quot;Creative Web Development&quot;</span>,
                      {"\n"}  confirmedTech: [<span className="text-emerald-300">&quot;HTML&quot;</span>, <span className="text-emerald-300">&quot;CSS&quot;</span>, <span className="text-emerald-300">&quot;JavaScript&quot;</span>, <span className="text-emerald-300">&quot;Tailwind CSS&quot;</span>],
                      {"\n"}  gitHubMastery: <span className="text-purple-300">&quot;Advanced&quot;</span>,
                      {"\n"}  mindset: <span className="text-amber-300">&quot;Perpetual Exploration&quot;</span>,
                      {"\n"}{"};"}
                    </pre>
                  </div>
                </div>

                {/* Key Pillars */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono">
                  <div className="p-4 rounded-xl glass-panel border border-cyan-500/20 text-center">
                    <Cpu className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
                    <div className="text-white font-bold text-sm">ARCHITECT</div>
                    <div className="text-gray-400 text-xs mt-1">Structured Modern Web</div>
                  </div>
                  <div className="p-4 rounded-xl glass-panel border border-purple-500/20 text-center">
                    <Sparkles className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                    <div className="text-white font-bold text-sm">CREATIVE</div>
                    <div className="text-gray-400 text-xs mt-1">Futuristic Micro-UI</div>
                  </div>
                  <div className="p-4 rounded-xl glass-panel border border-emerald-500/20 text-center">
                    <Globe className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
                    <div className="text-white font-bold text-sm">EXPLORER</div>
                    <div className="text-gray-400 text-xs mt-1">Next-Gen Tech Horizons</div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Interests & Horizons */}
            {activeTab === "interests" && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {interests.map((item, idx) => (
                    <div
                      key={idx}
                      onMouseEnter={playHover}
                      className="p-5 rounded-xl glass-panel border border-white/10 hover:border-purple-500/40 hover:bg-purple-950/20 transition-all duration-200 group"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="p-2.5 rounded-lg bg-black/60 border border-white/10 group-hover:border-purple-400/40">
                          {item.icon}
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-gray-400 group-hover:text-purple-300">
                          {item.tag}
                        </span>
                      </div>
                      <h4 className="text-white font-mono font-bold text-sm mb-2 group-hover:text-purple-300 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-gray-400 text-xs leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Editable Placeholder Note */}
                <div className="p-3.5 rounded-lg bg-cyan-950/20 border border-cyan-500/20 font-mono text-xs text-gray-400 flex items-center justify-between">
                  <span>// PLACEHOLDER: Additional education, certs &amp; milestones can be configured here</span>
                  <span className="text-cyan-400 text-[10px]">EDITABLE</span>
                </div>
              </div>
            )}

          </div>

        </div>
      </div>
    </section>
  );
}
