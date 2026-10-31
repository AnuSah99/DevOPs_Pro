"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Play, RotateCcw, Copy, Check, Download, Sparkles, Terminal, Code2 } from "lucide-react";

const TEMPLATES = [
  {
    name: "Cyber Neon Glow Button",
    html: `<button class="cyber-btn">
  <span class="glitch-text">INITIALIZE SYSTEM</span>
</button>`,
    css: `body {
  background: #050505;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
  font-family: monospace;
}
.cyber-btn {
  background: transparent;
  color: #00f5ff;
  border: 2px solid #00f5ff;
  padding: 16px 36px;
  font-size: 18px;
  font-weight: bold;
  letter-spacing: 2px;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 0 15px rgba(0, 245, 255, 0.4), inset 0 0 10px rgba(0, 245, 255, 0.2);
  transition: all 0.3s ease;
}
.cyber-btn:hover {
  background: #00f5ff;
  color: #050505;
  box-shadow: 0 0 30px #00f5ff;
  transform: scale(1.05);
}`,
    js: `document.querySelector('.cyber-btn').addEventListener('click', () => {
  alert('// QUANTUM CORE PROTOCOL ACTIVATED!');
});`,
  },
  {
    name: "Matrix Rain Particle Stream",
    html: `<canvas id="matrixCanvas"></canvas>`,
    css: `body {
  margin: 0;
  background: #000;
  overflow: hidden;
}
canvas {
  display: block;
}`,
    js: `const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const chars = '01ANU_SAH_CYBERPUNK_2026';
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function draw() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#00f5ff';
  ctx.font = fontSize + 'px monospace';

  for (let i = 0; i < drops.length; i++) {
    const text = chars[Math.floor(Math.random() * chars.length)];
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}
setInterval(draw, 33);`,
  },
];

export default function CyberCodeEditor() {
  const [activeTab, setActiveTab] = useState<"html" | "css" | "js">("html");
  const [htmlCode, setHtmlCode] = useState(TEMPLATES[0].html);
  const [cssCode, setCssCode] = useState(TEMPLATES[0].css);
  const [jsCode, setJsCode] = useState(TEMPLATES[0].js);
  const [srcDoc, setSrcDoc] = useState("");
  const [copied, setCopied] = useState(false);

  const runCode = () => {
    const combined = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>${cssCode}</style>
        </head>
        <body>
          ${htmlCode}
          <script>${jsCode}<\/script>
        </body>
      </html>
    `;
    setSrcDoc(combined);
  };

  useEffect(() => {
    runCode();
  }, []);

  const loadTemplate = (tpl: typeof TEMPLATES[0]) => {
    setHtmlCode(tpl.html);
    setCssCode(tpl.css);
    setJsCode(tpl.js);
    const combined = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>${tpl.css}</style>
        </head>
        <body>
          ${tpl.html}
          <script>${tpl.js}<\/script>
        </body>
      </html>
    `;
    setSrcDoc(combined);
  };

  const copyCode = () => {
    let currentCode = htmlCode;
    if (activeTab === "css") currentCode = cssCode;
    if (activeTab === "js") currentCode = jsCode;
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
            <Code2 className="w-4 h-4 text-cyan-400" />
            <span>CYBER_IDE // NEURAL CODE STUDIO</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Preset Selector */}
          <div className="hidden sm:flex items-center gap-1.5 text-xs">
            <span className="text-gray-500">Presets:</span>
            {TEMPLATES.map((tpl, idx) => (
              <button
                key={idx}
                onClick={() => loadTemplate(tpl)}
                className="px-2 py-1 rounded bg-black/60 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20 text-[11px]"
              >
                {tpl.name}
              </button>
            ))}
          </div>

          <button
            onClick={copyCode}
            className="p-2 rounded bg-white/5 border border-white/10 hover:text-cyan-400 text-xs flex items-center gap-1"
            title="Copy Current Tab"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={runCode}
            className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold text-xs flex items-center gap-1.5 shadow-md shadow-cyan-500/30 hover:scale-105 active:scale-95 transition-all"
          >
            <Play className="w-3.5 h-3.5 fill-black" />
            <span>EXECUTE</span>
          </button>
        </div>
      </header>

      {/* Main Split Layout: Editor on Left, Live View on Right */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-cyan-500/20">

        {/* Left Column: Code Editor */}
        <div className="flex flex-col bg-[#050505]">
          {/* Editor Tab Headers */}
          <div className="flex items-center border-b border-cyan-500/20 bg-[#080d1a] px-3">
            {(["html", "css", "js"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-xs uppercase font-bold tracking-wider border-b-2 transition-all ${
                  activeTab === tab
                    ? "border-cyan-400 text-cyan-400 bg-cyan-500/10"
                    : "border-transparent text-gray-400 hover:text-white"
                }`}
              >
                {tab === "html" && "HTML (DOM)"}
                {tab === "css" && "CSS (STYLE)"}
                {tab === "js" && "JAVASCRIPT (LOGIC)"}
              </button>
            ))}
          </div>

          {/* Textarea Code Buffer */}
          <div className="flex-1 p-4 relative">
            <textarea
              value={activeTab === "html" ? htmlCode : activeTab === "css" ? cssCode : jsCode}
              onChange={(e) => {
                if (activeTab === "html") setHtmlCode(e.target.value);
                if (activeTab === "css") setCssCode(e.target.value);
                if (activeTab === "js") setJsCode(e.target.value);
              }}
              className="w-full h-[380px] lg:h-full bg-black/60 text-cyan-200 font-mono text-sm p-4 rounded-xl border border-cyan-500/20 focus:border-cyan-400 focus:outline-none resize-none selection:bg-cyan-500 selection:text-black leading-relaxed"
              spellCheck="false"
            />
          </div>
        </div>

        {/* Right Column: Live Iframe Sandbox Preview */}
        <div className="flex flex-col bg-[#080d1a]">
          <div className="h-10 border-b border-cyan-500/20 bg-black/40 px-4 flex items-center justify-between text-xs text-gray-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>LIVE BROWSER ENGINE // 60 FPS</span>
            </div>
            <span>SANDBOX: ISOLATED</span>
          </div>

          <div className="flex-1 p-2 bg-[#050505]">
            <iframe
              srcDoc={srcDoc}
              title="Code Preview"
              sandbox="allow-scripts allow-modals"
              className="w-full h-full min-h-[420px] rounded-lg border border-cyan-500/30 bg-black"
            />
          </div>
        </div>

      </div>
    </div>
  );
}
