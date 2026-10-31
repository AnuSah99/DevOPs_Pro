"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Sparkles, Copy, Check, Terminal, Cpu, Bookmark, Layers, Send } from "lucide-react";

interface PromptTemplate {
  id: string;
  category: string;
  title: string;
  system: string;
  template: string;
  variables: string[];
}

const TEMPLATES: PromptTemplate[] = [
  {
    id: "clean-refactor",
    category: "Code Architecture",
    title: "Senior Full-Stack Code Refactoring",
    system: "You are a Principal Software Architect. Review the following code for scalability, idiomatic patterns, and performance optimizations.",
    template: "Refactor the following {{language}} module for maximum readability and zero side-effects. Target environment: {{environment}}.\n\nCode snippet:\n{{code}}",
    variables: ["language", "environment", "code"],
  },
  {
    id: "cyber-ui",
    category: "UI/UX & Creative",
    title: "Cyberpunk Futuristic UI Generator",
    system: "You are an elite creative frontend engineer specializing in dark-mode glassmorphic cyber interfaces.",
    template: "Design an interactive UI component for {{component_name}} with neon palette accents (#00f5ff, #9b5cff). Include Micro-interactions, CSS keyframes, and accessible markup.",
    variables: ["component_name"],
  },
  {
    id: "security-audit",
    category: "Defensive Security",
    title: "Web Application Defensive Security Audit",
    system: "You are a Senior Security Engineer conducting an authorized defensive audit.",
    template: "Perform a defensive review of the following API endpoints against OWASP Top 10 vulnerabilities (CSRF, XSS, SSRF). Suggest mitigation controls for: {{endpoint}}",
    variables: ["endpoint"],
  },
];

export default function AiPromptMatrix() {
  const [selectedTemplate, setSelectedTemplate] = useState<PromptTemplate>(TEMPLATES[0]);
  const [varValues, setVarValues] = useState<Record<string, string>>({
    language: "TypeScript / Next.js",
    environment: "Node 22 / Cloudflare Edge",
    code: `function processData(raw: any[]) {\n  return raw.map(x => x.val);\n}`,
  });
  const [copied, setCopied] = useState(false);
  const [testOutput, setTestOutput] = useState<string | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  const handleVarChange = (key: string, val: string) => {
    setVarValues((prev) => ({ ...prev, [key]: val }));
  };

  const getInterpolatedPrompt = () => {
    let result = selectedTemplate.template;
    selectedTemplate.variables.forEach((v) => {
      const val = varValues[v] || `{{${v}}}`;
      result = result.split(`{{${v}}}`).join(val);
    });
    return result;
  };

  const fullPromptText = `[SYSTEM INSTRUCTION]\n${selectedTemplate.system}\n\n[USER INSTRUCTION]\n${getInterpolatedPrompt()}`;
  const estimatedTokens = Math.round(fullPromptText.length / 3.8);

  const copyPrompt = () => {
    navigator.clipboard.writeText(fullPromptText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const simulateAiResponse = () => {
    setIsSimulating(true);
    setTestOutput(null);
    setTimeout(() => {
      setIsSimulating(false);
      setTestOutput(
        `[QUANTUM AI COGNITIVE RESPONSE]\n> Analysis completed for: ${selectedTemplate.title}\n> Tokens Consumed: ${estimatedTokens} in / 148 out\n> Evaluation: High modularity, zero detected memory leak vectors.\n> Solution synthesized with modern defensive parameters.`
      );
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-mono flex flex-col">
      {/* Top Navbar */}
      <header className="h-14 border-b border-cyan-500/20 bg-[#080d1a] px-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/#projects"
            className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-cyan-400 transition-colors px-2.5 py-1 rounded bg-white/5 border border-white/10"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>BACK TO PORTFOLIO</span>
          </Link>
          <div className="h-4 w-[1px] bg-white/10" />
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>PROMPT_MATRIX // AI ENGINEERING STUDIO</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400 hidden sm:inline">
            TOKENS: <span className="text-cyan-300 font-bold">~{estimatedTokens}</span>
          </span>
          <button
            onClick={copyPrompt}
            className="px-3.5 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 font-bold text-xs flex items-center gap-1.5 transition-all"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? "COPIED!" : "COPY PROMPT"}</span>
          </button>
        </div>
      </header>

      {/* Main Studio Grid */}
      <div className="flex-1 max-w-7xl mx-auto w-full p-4 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

        {/* Left Column: Template Library */}
        <div className="lg:col-span-4 space-y-4">
          <div className="text-xs text-cyan-400 uppercase tracking-wider font-bold">
            // PROMPT TEMPLATE ARSENAL
          </div>
          <div className="space-y-3">
            {TEMPLATES.map((tpl) => (
              <button
                key={tpl.id}
                onClick={() => {
                  setSelectedTemplate(tpl);
                  setTestOutput(null);
                }}
                className={`w-full p-4 rounded-xl border text-left transition-all ${
                  selectedTemplate.id === tpl.id
                    ? "bg-cyan-950/40 border-cyan-400/60 shadow-lg shadow-cyan-950/40"
                    : "bg-black/40 border-white/10 hover:border-cyan-500/30"
                }`}
              >
                <div className="text-[10px] text-cyan-400 uppercase font-bold mb-1">
                  {tpl.category}
                </div>
                <div className="text-sm font-bold text-white mb-2">{tpl.title}</div>
                <div className="flex flex-wrap gap-1">
                  {tpl.variables.map((v) => (
                    <span
                      key={v}
                      className="px-1.5 py-0.5 rounded bg-white/5 text-[10px] text-gray-400 font-mono"
                    >
                      &#123;&#123;{v}&#125;&#125;
                    </span>
                  ))}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Prompt Builder & Live Interpolation */}
        <div className="lg:col-span-8 space-y-5">

          {/* Variable Inputs */}
          <div className="p-5 rounded-2xl glass-panel border border-cyan-500/30 cyber-corner space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span>DYNAMIC VARIABLE INJECTION</span>
            </h3>

            <div className="space-y-3">
              {selectedTemplate.variables.map((v) => (
                <div key={v}>
                  <label className="block text-xs text-gray-400 uppercase font-bold mb-1">
                    &#123;&#123;{v}&#125;&#125;
                  </label>
                  {v === "code" ? (
                    <textarea
                      rows={3}
                      value={varValues[v] || ""}
                      onChange={(e) => handleVarChange(v, e.target.value)}
                      className="w-full bg-black/60 border border-white/15 focus:border-cyan-400 rounded-lg p-2.5 text-xs text-white focus:outline-none"
                    />
                  ) : (
                    <input
                      type="text"
                      value={varValues[v] || ""}
                      onChange={(e) => handleVarChange(v, e.target.value)}
                      className="w-full bg-black/60 border border-white/15 focus:border-cyan-400 rounded-lg p-2 text-xs text-white focus:outline-none"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Interpolated Payload Output */}
          <div className="p-5 rounded-2xl glass-panel border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-purple-400 uppercase tracking-wider">
                SYNTHESIZED PROMPT STREAM
              </h4>
              <span className="text-[11px] text-gray-500">READY FOR LLM COMPILER</span>
            </div>

            <pre className="p-4 rounded-xl bg-black/70 border border-white/5 text-xs text-cyan-200 whitespace-pre-wrap max-h-60 overflow-y-auto leading-relaxed">
              {fullPromptText}
            </pre>

            <button
              onClick={simulateAiResponse}
              disabled={isSimulating}
              className="w-full py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 text-black font-bold text-xs flex items-center justify-center gap-2 active:scale-98 transition-all disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isSimulating ? "EVALUATING INFERENCE..." : "TEST PROMPT SIMULATION"}</span>
            </button>
          </div>

          {/* Test Output Console */}
          {testOutput && (
            <div className="p-4 rounded-xl bg-black/80 border border-emerald-500/30 text-xs text-emerald-300 space-y-1">
              <pre className="whitespace-pre-wrap">{testOutput}</pre>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
