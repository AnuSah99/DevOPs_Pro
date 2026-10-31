"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSound } from "@/lib/soundContext";
import { usePortfolio } from "@/lib/portfolioContext";
import {
  ExternalLink,
  Sparkles,
  Layers,
  Code2,
  Terminal,
  AlertCircle,
  Eye,
  GitBranch,
  Star,
  Activity,
  FolderGit2,
  Shield,
  Plus,
} from "lucide-react";
import { GithubIcon } from "@/components/icons/BrandIcons";

export default function ProjectsAndGithubSection() {
  const { playHover, playClick } = useSound();
  const { projects } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  const categories = ["ALL", ...Array.from(new Set(projects.map((p) => p.category)))];

  const filteredProjects =
    selectedCategory === "ALL"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <section
      id="projects"
      className="relative py-24 px-4 sm:px-6 lg:px-8 border-b border-cyan-500/10 bg-[#050505] cyber-grid overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute top-1/3 -left-32 w-96 h-96 bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-24">

        {/* ================= SECTION 08: PROJECT SHOWCASE ================= */}
        <div>
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-400 font-mono text-xs mb-3">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span>04 // SYSTEM SHOWCASE</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-2">
                THINGS I&apos;VE <span className="gradient-cyber-text">BUILT.</span>
              </h2>
              <p className="text-gray-400 max-w-2xl text-base sm:text-lg">
                Explore real-life interactive modern web projects with live view URLs and GitHub repositories, including DevOPs_Pro.
              </p>
            </div>

            <Link
              href="/admin"
              className="px-4 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 font-mono text-xs flex items-center gap-2 self-start sm:self-auto transition-all"
            >
              <Shield className="w-3.5 h-3.5 text-cyan-400" />
              <span>EDIT VIA ADMIN CMS</span>
            </Link>
          </div>

          {/* Category Filter Chips */}
          <div className="flex flex-wrap items-center gap-2 mb-8 font-mono text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  playClick();
                  setSelectedCategory(cat);
                }}
                onMouseEnter={playHover}
                className={`px-3 py-1.5 rounded-lg border transition-all ${
                  selectedCategory === cat
                    ? "bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold shadow-sm shadow-cyan-500/30"
                    : "bg-black/40 border-white/10 text-gray-400 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Project Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProjects.map((proj, idx) => (
              <div
                key={proj.id}
                onMouseEnter={playHover}
                className="relative rounded-2xl glass-panel border border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300 flex flex-col justify-between overflow-hidden group shadow-xl shadow-cyan-950/20 cyber-corner hover:-translate-y-1.5"
              >
                {/* Top Browser Chrome Bar */}
                <div className="p-3 bg-black/60 border-b border-cyan-500/20 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                    <span className="text-gray-500 ml-2 text-[10px]">app://project-{idx + 1}</span>
                  </div>
                  <span className="text-[10px] text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30 font-bold">
                    {proj.status}
                  </span>
                </div>

                {/* Project Visual Representation / Mockup Window */}
                <div className="relative h-44 bg-gradient-to-br from-[#080d1a] to-black p-4 flex flex-col items-center justify-center border-b border-white/5 overflow-hidden">
                  <div className="absolute inset-0 cyber-grid-dense opacity-40" />

                  <div className="text-center z-10 space-y-2">
                    <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-400/40 mx-auto flex items-center justify-center text-cyan-300 shadow-lg shadow-cyan-500/30 group-hover:scale-110 transition-transform">
                      {idx % 3 === 0 ? (
                        <Terminal className="w-6 h-6" />
                      ) : idx % 3 === 1 ? (
                        <Code2 className="w-6 h-6" />
                      ) : (
                        <Layers className="w-6 h-6" />
                      )}
                    </div>
                    <div className="font-mono text-xs text-cyan-400 font-semibold tracking-wider">
                      {proj.category}
                    </div>
                  </div>

                  <div className="absolute bottom-2 left-2 font-mono text-[10px] text-gray-500">
                    NODE: {proj.id.toUpperCase()}
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-[11px] font-mono text-cyan-400 font-semibold tracking-wider uppercase mb-1">
                      {proj.category}
                    </div>
                    <h3 className="text-base sm:text-lg font-bold font-mono text-white mb-2 group-hover:text-cyan-300 transition-colors">
                      {proj.title}
                    </h3>
                    <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-4">
                      {proj.description}
                    </p>

                    {/* Highlights */}
                    {proj.highlights && proj.highlights.length > 0 && (
                      <div className="space-y-1 mb-4 font-mono text-[11px] text-gray-300">
                        {proj.highlights.map((hl, hIdx) => (
                          <div key={hIdx} className="flex items-center gap-1.5">
                            <span className="w-1 h-1 rounded-full bg-cyan-400" />
                            <span>{hl}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {proj.technologies.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-gray-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions: GitHub & Live View */}
                  <div className="pt-4 border-t border-white/10 flex items-center gap-3 font-mono text-xs">
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={playClick}
                      className="flex-1 py-2 rounded-lg bg-black/50 hover:bg-white/10 border border-white/10 hover:border-cyan-400/40 text-gray-200 hover:text-white flex items-center justify-center gap-1.5 transition-all"
                    >
                      <GithubIcon className="w-3.5 h-3.5 text-cyan-400" />
                      <span>CODE</span>
                    </a>
                    <Link
                      href={proj.viewUrl}
                      target={proj.viewUrl.startsWith("#") ? "_self" : "_blank"}
                      onClick={playClick}
                      className="flex-1 py-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 hover:text-cyan-200 flex items-center justify-center gap-1.5 transition-all font-semibold"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>LIVE VIEW</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Transparent Notice */}
          <div className="mt-8 p-4 rounded-xl bg-black/60 border border-dashed border-cyan-500/20 font-mono text-xs text-gray-400 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-cyan-400 flex-shrink-0" />
            <p>
              All projects are fully interactive web applications hosted directly in this Next.js portfolio. You can edit projects, add new ones, or modify details anytime via the <Link href="/admin" className="text-cyan-300 underline">Admin CMS Portal</Link>.
            </p>
          </div>
        </div>

        {/* ================= SECTION 10: GITHUB DEVELOPER IDENTITY ================= */}
        <div>
          {/* Section Header */}
          <div className="flex flex-col items-start mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-400 font-mono text-xs mb-3">
              <GithubIcon className="w-3.5 h-3.5" />
              <span>05 // GITHUB ECOSYSTEM</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
              MY CODE. <span className="gradient-cyber-text">MY JOURNEY.</span>
            </h2>
            <p className="text-gray-400 max-w-2xl text-base sm:text-lg">
              Verified GitHub footprint and code repository identity for Anu Sah.
            </p>
          </div>

          {/* GitHub Identity Showcase Banner */}
          <div className="rounded-2xl glass-panel p-6 sm:p-10 border border-cyan-500/30 cyber-corner relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

              {/* Left Profile Card */}
              <div className="lg:col-span-5 flex flex-col space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-600 to-purple-600 p-[2px] shadow-lg shadow-cyan-500/20">
                    <div className="w-full h-full bg-[#080d1a] rounded-2xl flex items-center justify-center font-mono font-black text-2xl text-cyan-400">
                      AS
                    </div>
                  </div>
                  <div>
                    <h3 className="font-mono text-xl font-bold text-white flex items-center gap-2">
                      <span>Anu Sah</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/40 text-cyan-300">
                        VERIFIED
                      </span>
                    </h3>
                    <p className="font-mono text-xs text-gray-400">@Anusah99</p>
                  </div>
                </div>

                <p className="text-gray-300 text-sm leading-relaxed">
                  Active GitHub profile featuring modern web repositories, code explorations, and creative frontend experiments.
                </p>

                <div className="space-y-2 font-mono text-xs text-gray-400">
                  <div className="flex items-center justify-between p-2 rounded bg-black/40 border border-white/5">
                    <span>GITHUB EXPERIENCE:</span>
                    <span className="text-emerald-400 font-bold">ADVANCED</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-black/40 border border-white/5">
                    <span>WORKFLOW:</span>
                    <span className="text-cyan-300">Git CLI • Branches • Commits</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-black/40 border border-white/5">
                    <span>TARGET DESTINATION:</span>
                    <span className="text-purple-300">Open Source Collaboration</span>
                  </div>
                </div>

                <a
                  href="https://github.com/Anusah99"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={playClick}
                  onMouseEnter={playHover}
                  className="w-full py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold font-mono text-xs tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-400/40 transition-all"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>VIEW PUBLIC GITHUB PROFILE</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Right Activity Matrix & Contribution Concept */}
              <div className="lg:col-span-7 space-y-4">
                <div className="p-4 sm:p-6 rounded-xl bg-black/60 border border-white/10 font-mono">
                  <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2 text-xs">
                    <span className="text-gray-400 flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5 text-cyan-400" />
                      <span>DEVELOPER TELEMETRY &amp; ACTIVITY</span>
                    </span>
                    <span className="text-cyan-400 text-[10px]">LIVE SYNC</span>
                  </div>

                  {/* Authentic Activity Pattern Indicator */}
                  <div className="space-y-3">
                    <div className="text-xs text-gray-300">
                      Consistent git commit workflow, repository branch management, and disciplined code structure:
                    </div>

                    {/* Futuristic Activity Grid visualizer */}
                    <div className="grid grid-cols-12 gap-1.5 py-2">
                      {Array.from({ length: 48 }).map((_, i) => {
                        const intensities = [
                          "bg-white/5",
                          "bg-cyan-950/60",
                          "bg-cyan-800/80",
                          "bg-cyan-500",
                          "bg-purple-600",
                        ];
                        const randomColor = intensities[(i * 3 + 1) % intensities.length];
                        return (
                          <div
                            key={i}
                            className={`h-3 rounded-[2px] ${randomColor} transition-all hover:scale-125 hover:shadow-[0_0_8px_#00f5ff]`}
                            title={`Matrix Activity Point #${i + 1}`}
                          />
                        );
                      })}
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-gray-500 pt-1">
                      <span>Less Activity</span>
                      <div className="flex items-center gap-1">
                        <span className="w-2.5 h-2.5 rounded-[2px] bg-white/5" />
                        <span className="w-2.5 h-2.5 rounded-[2px] bg-cyan-950" />
                        <span className="w-2.5 h-2.5 rounded-[2px] bg-cyan-700" />
                        <span className="w-2.5 h-2.5 rounded-[2px] bg-cyan-400" />
                      </div>
                      <span>More Activity</span>
                    </div>
                  </div>
                </div>

                {/* Key GitHub Repositories Anchor */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                  <div className="p-3.5 rounded-lg bg-black/40 border border-cyan-500/20 flex flex-col justify-between">
                    <div className="flex items-center gap-2 text-cyan-300 font-semibold mb-1">
                      <FolderGit2 className="w-4 h-4 text-cyan-400" />
                      <span>Portfolio-2026</span>
                    </div>
                    <p className="text-gray-400 text-[11px] mb-2">
                      Futuristic personal developer OS and interactive identity.
                    </p>
                    <div className="flex items-center justify-between text-[10px] text-gray-500">
                      <span>Next.js • TypeScript</span>
                      <span className="text-cyan-400">Public</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-lg bg-black/40 border border-purple-500/20 flex flex-col justify-between">
                    <div className="flex items-center gap-2 text-purple-300 font-semibold mb-1">
                      <FolderGit2 className="w-4 h-4 text-purple-400" />
                      <span>Web-Experiments</span>
                    </div>
                    <p className="text-gray-400 text-[11px] mb-2">
                      Frontend design systems, modern layouts &amp; interactive scripts.
                    </p>
                    <div className="flex items-center justify-between text-[10px] text-gray-500">
                      <span>HTML • CSS • JS</span>
                      <span className="text-purple-400">Public</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
