"use client";

import React, { useState, useEffect } from "react";
import { Terminal, Shield, Cpu, Activity } from "lucide-react";

interface BootLoaderProps {
  onBootComplete: () => void;
}

export default function BootLoader({ onBootComplete }: BootLoaderProps) {
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  const BOOT_SEQUENCE = [
    "BIOS_LOAD // ANU.OS v2.6.0-CYBER",
    "CHECK_INTEGRITY // VERIFYING DIGITAL CORE...",
    "INIT_NEURAL_BUS // CYBERPUNK SUBSYSTEM ONLINE",
    "MOUNT_MODULES // HTML5, CSS3, JS, TAILWIND",
    "CONNECT_GITHUB // REPO IDENTIFIER: @Anusah99",
    "INITIALIZING THREE.JS 3D HOLOGRAM...",
    "LAUNCHING INTERACTIVE DEVELOPER OS...",
  ];

  useEffect(() => {
    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < BOOT_SEQUENCE.length) {
        setLogs((prev) => [...prev, BOOT_SEQUENCE[currentStep]]);
        setProgress(Math.round(((currentStep + 1) / BOOT_SEQUENCE.length) * 100));
        currentStep++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          onBootComplete();
        }, 400);
      }
    }, 180);

    return () => clearInterval(interval);
  }, [onBootComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-[#050505] flex flex-col items-center justify-center p-4 font-mono select-none cyber-grid">
      <div className="w-full max-w-lg p-6 rounded-2xl glass-panel border border-cyan-500/40 shadow-2xl shadow-cyan-950/80 scanline">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-3 border-b border-cyan-500/20 text-xs mb-4">
          <div className="flex items-center gap-2 text-cyan-400 font-bold">
            <Cpu className="w-4 h-4 animate-spin" />
            <span>ANU.OS // BOOT LOADER</span>
          </div>
          <span className="text-gray-500 text-[10px]">AUTH: GUEST</span>
        </div>

        {/* Console Logs */}
        <div className="space-y-1.5 text-xs text-gray-300 min-h-[160px] max-h-[200px] overflow-hidden">
          {logs.map((log, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="text-cyan-500">&gt;</span>
              <span className={idx === logs.length - 1 ? "text-cyan-300 font-bold" : "text-gray-400"}>
                {log}
              </span>
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="mt-6 space-y-2">
          <div className="flex items-center justify-between text-xs text-cyan-400">
            <span>INITIALIZING ENVIRONMENT</span>
            <span className="font-bold">{progress}%</span>
          </div>
          <div className="w-full h-2 bg-black/60 rounded-full border border-cyan-500/30 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-purple-600 transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] text-gray-500">
          <span>PORTFOLIO_SYSTEM // 2026</span>
          <button
            onClick={onBootComplete}
            className="text-cyan-400/80 hover:text-cyan-300 underline"
          >
            SKIP BOOT &gt;
          </button>
        </div>
      </div>
    </div>
  );
}
