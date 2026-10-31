"use client";

import React, { useState, useRef } from "react";
import { useSound } from "@/lib/soundContext";
import {
  Code,
  FileCode2,
  Palette,
  Terminal,
  Cpu,
  Database,
  Cloud,
  Wrench,
  CheckCircle2,
  Sparkles,
  Layers,
} from "lucide-react";

// Confirmed technologies
const CONFIRMED_TECH = [
  {
    id: "html",
    name: "HTML5",
    level: "CONFIRMED",
    description: "Semantic web architecture, accessible DOM structures, and modern SEO-optimized layout foundations.",
    icon: <FileCode2 className="w-8 h-8 text-orange-400" />,
    color: "#f97316",
    borderColor: "border-orange-500/40",
    glowColor: "rgba(249, 115, 22, 0.25)",
    tag: "CORE_MARKUP",
    metrics: "Semantic • SEO • A11y",
  },
  {
    id: "css",
    name: "CSS3",
    level: "CONFIRMED",
    description: "Advanced styling, responsive Flexbox & Grid layouts, keyframe animations, glassmorphism and modern visual aesthetics.",
    icon: <Palette className="w-8 h-8 text-blue-400" />,
    color: "#38bdf8",
    borderColor: "border-blue-500/40",
    glowColor: "rgba(56, 189, 248, 0.25)",
    tag: "STYLING_ENGINE",
    metrics: "Responsive • Keyframes • Flex/Grid",
  },
  {
    id: "javascript",
    name: "JavaScript (ES6+)",
    level: "CONFIRMED",
    description: "Dynamic DOM interactions, asynchronous programming, event handling, logic architecture and modern ES modules.",
    icon: <Code className="w-8 h-8 text-yellow-400" />,
    color: "#facc15",
    borderColor: "border-yellow-500/40",
    glowColor: "rgba(250, 204, 21, 0.25)",
    tag: "CORE_LOGIC",
    metrics: "Async/Await • DOM • ES6+",
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    level: "CONFIRMED",
    description: "Rapid utility-first workflow, custom design systems, responsive utilities, and cyber aesthetic theming.",
    icon: <Layers className="w-8 h-8 text-cyan-400" />,
    color: "#06b6d4",
    borderColor: "border-cyan-500/40",
    glowColor: "rgba(6, 182, 212, 0.25)",
    tag: "UTILITY_FRAMEWORK",
    metrics: "Design Systems • Custom Theme",
  },
];

// Additional categories as requested: "Create additional categories as editable placeholders: Frontend Development, Backend Development, Programming Languages, Databases, Developer Tools, Cloud and Emerging Technologies."
const PLACEHOLDER_CATEGORIES = [
  {
    name: "Frontend Ecosystem",
    icon: <Sparkles className="w-4 h-4 text-cyan-400" />,
    status: "Exploring",
    slots: ["Modern UI Frameworks", "Component Systems", "State Management", "WebGL / Canvas"],
  },
  {
    name: "Backend Exploration",
    icon: <Cpu className="w-4 h-4 text-purple-400" />,
    status: "Roadmap",
    slots: ["Node.js Runtime", "RESTful Endpoints", "API Integration", "Server Logic"],
  },
  {
    name: "Programming Languages",
    icon: <Terminal className="w-4 h-4 text-emerald-400" />,
    status: "Roadmap",
    slots: ["TypeScript", "Scripting Languages", "Object-Oriented Design", "Syntax Studies"],
  },
  {
    name: "Databases & Storage",
    icon: <Database className="w-4 h-4 text-blue-400" />,
    status: "Roadmap",
    slots: ["Document Stores", "Relational Concepts", "Local Caching", "Data Modeling"],
  },
  {
    name: "Developer Tools",
    icon: <Wrench className="w-4 h-4 text-pink-400" />,
    status: "Active Use",
    slots: ["Git / GitHub (Advanced)", "VS Code", "Terminal CLI", "Browser DevTools"],
  },
  {
    name: "Cloud & Emerging Tech",
    icon: <Cloud className="w-4 h-4 text-amber-400" />,
    status: "Curious",
    slots: ["Hosting & Vercel", "Edge Computing", "AI Integrations", "Automation"],
  },
];

interface TiltCardProps {
  tech: typeof CONFIRMED_TECH[0];
  onHover: () => void;
}

function TiltCard({ tech, onHover }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    setTransform(`perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`);
  };

  const handleMouseLeave = () => {
    setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={onHover}
      onMouseLeave={handleMouseLeave}
      style={{
        transform,
        transition: "transform 0.15s ease-out, box-shadow 0.25s ease-out",
      }}
      className={`relative rounded-2xl glass-panel p-6 sm:p-7 border ${tech.borderColor} flex flex-col justify-between cyber-corner group hover:shadow-2xl cursor-pointer`}
    >
      {/* Top Banner */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 rounded-xl bg-black/60 border border-white/10 group-hover:scale-110 transition-transform">
            {tech.icon}
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-mono text-[10px] bg-emerald-950/60 border border-emerald-500/40 text-emerald-400">
            <CheckCircle2 className="w-3 h-3" />
            <span>CONFIRMED</span>
          </span>
        </div>

        {/* Title & Tag */}
        <div className="mb-3">
          <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">
            #{tech.tag}
          </span>
          <h3 className="text-xl sm:text-2xl font-bold font-mono text-white group-hover:text-cyan-300 transition-colors">
            {tech.name}
          </h3>
        </div>

        {/* Description */}
        <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-6">
          {tech.description}
        </p>
      </div>

      {/* Bottom Metrics */}
      <div className="pt-4 border-t border-white/10 flex items-center justify-between font-mono text-xs">
        <span className="text-gray-400 text-[11px]">{tech.metrics}</span>
        <span className="text-cyan-400 text-[11px] font-bold">100% READY</span>
      </div>
    </div>
  );
}

export default function TechStackSection() {
  const { playHover, playClick } = useSound();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <section
      id="technologies"
      className="relative py-24 px-4 sm:px-6 lg:px-8 border-b border-cyan-500/10 bg-[#050505] cyber-grid overflow-hidden"
    >
      {/* Ambient Lighting */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-400 font-mono text-xs mb-3">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>02 // CAPABILITIES &amp; FOUNDATIONS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            MY DIGITAL <span className="gradient-cyber-text">TOOLKIT</span>
          </h2>
          <p className="text-gray-400 max-w-2xl text-base sm:text-lg">
            Mastering core web foundations with precision, while actively charting new frontiers in modern engineering.
          </p>
        </div>

        {/* 1. Primary Confirmed Tech 3D Tilt Cards */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-6 font-mono text-xs text-cyan-400">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="tracking-wider uppercase font-bold text-white">
              CORE VERIFIED STACK (PRIMARY PROFICIENCIES)
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CONFIRMED_TECH.map((tech) => (
              <TiltCard key={tech.id} tech={tech} onHover={playHover} />
            ))}
          </div>
        </div>

        {/* 2. Categorized Future Toolkit Roadmaps (Clearly labeled as editable placeholders) */}
        <div className="rounded-2xl glass-panel p-6 sm:p-8 border border-white/10 cyber-corner">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-white/10 gap-3">
            <div>
              <h3 className="font-mono text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span>EXPANDABLE TOOLKIT MATRIX</span>
              </h3>
              <p className="text-gray-400 text-xs font-mono mt-1">
                Editable placeholders for future frameworks, tools, databases &amp; cloud stacks.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-purple-950/40 border border-purple-500/30 text-purple-300 font-mono text-[11px]">
              <span>ROADMAP STATUS: ADAPTIVE</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PLACEHOLDER_CATEGORIES.map((cat, idx) => (
              <div
                key={idx}
                onMouseEnter={playHover}
                onClick={() => {
                  playClick();
                  setSelectedCategory(cat.name === selectedCategory ? null : cat.name);
                }}
                className="p-4 rounded-xl bg-black/40 border border-white/10 hover:border-cyan-500/40 transition-all duration-200 cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {cat.icon}
                    <span className="font-mono text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors">
                      {cat.name}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-gray-400">
                    {cat.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-3">
                  {cat.slots.map((slot, sIdx) => (
                    <div
                      key={sIdx}
                      className="px-2.5 py-1.5 rounded bg-white/[0.03] border border-white/5 font-mono text-[11px] text-gray-400 group-hover:border-cyan-500/20 group-hover:text-gray-300 transition-colors"
                    >
                      {slot}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Clarity Disclaimer */}
          <div className="mt-6 p-3.5 rounded-lg bg-black/60 border border-dashed border-cyan-500/20 font-mono text-xs text-gray-400 flex items-center justify-between">
            <span>
              NOTE: Only HTML, CSS, JavaScript, and Tailwind CSS are confirmed as active proficiencies.
            </span>
            <span className="text-cyan-400 text-[10px] uppercase font-bold">STRICT INTEGRITY</span>
          </div>
        </div>
      </div>
    </section>
  );
}
