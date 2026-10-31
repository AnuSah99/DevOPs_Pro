"use client";

import React, { useState, useEffect } from "react";
import { useSound } from "@/lib/soundContext";
import {
  Search,
  Terminal,
  Volume2,
  VolumeX,
  Code,
  FolderGit2,
  Send,
  User,
  Compass,
  Mail,
  Copy,
  Check,
  X,
  ArrowRight,
} from "lucide-react";
import { GithubIcon } from "@/components/icons/BrandIcons";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const { isMuted, toggleMute, playHover, playClick, playSuccess } = useSound();
  const [search, setSearch] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) {
          onClose();
        }
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const navigateTo = (id: string) => {
    playClick();
    onClose();
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  const copyEmail = () => {
    playSuccess();
    navigator.clipboard.writeText("Code.anukrsah@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const commands = [
    {
      group: "Navigation",
      items: [
        { label: "Home // Top", icon: <Compass className="w-4 h-4 text-cyan-400" />, action: () => navigateTo("home") },
        { label: "About // Behind The Code", icon: <User className="w-4 h-4 text-blue-400" />, action: () => navigateTo("about") },
        { label: "Technologies // Digital Toolkit", icon: <Code className="w-4 h-4 text-purple-400" />, action: () => navigateTo("technologies") },
        { label: "Projects // Things I've Built", icon: <FolderGit2 className="w-4 h-4 text-emerald-400" />, action: () => navigateTo("projects") },
        { label: "Terminal // Interactive CLI", icon: <Terminal className="w-4 h-4 text-amber-400" />, action: () => navigateTo("terminal") },
        { label: "Journey // Milestone Timeline", icon: <Compass className="w-4 h-4 text-cyan-400" />, action: () => navigateTo("journey") },
        { label: "Contact // Connect Terminal", icon: <Send className="w-4 h-4 text-pink-400" />, action: () => navigateTo("contact") },
      ],
    },
    {
      group: "Quick Actions",
      items: [
        {
          label: copied ? "Email Copied to Clipboard!" : "Copy Email: Code.anukrsah@gmail.com",
          icon: copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-cyan-400" />,
          action: copyEmail,
        },
        {
          label: "Open GitHub Profile (Anusah99)",
          icon: <GithubIcon className="w-4 h-4 text-white" />,
          action: () => {
            playClick();
            window.open("https://github.com/Anusah99", "_blank");
            onClose();
          },
        },
        {
          label: isMuted ? "Unmute Cyber Audio Synthesizer" : "Mute Cyber Audio Synthesizer",
          icon: isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />,
          action: () => {
            toggleMute();
            onClose();
          },
        },
      ],
    },
  ];

  const filteredCommands = commands
    .map((grp) => ({
      ...grp,
      items: grp.items.filter((item) =>
        item.label.toLowerCase().includes(search.toLowerCase())
      ),
    }))
    .filter((grp) => grp.items.length > 0);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-xl rounded-xl glass-panel border border-cyan-500/30 shadow-2xl shadow-cyan-950/80 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Search Input */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-cyan-500/20 bg-black/60">
          <Search className="w-5 h-5 text-cyan-400" />
          <input
            type="text"
            placeholder="Type a command or navigate... (e.g. 'projects', 'email')"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-white font-mono text-sm placeholder:text-gray-500 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded text-gray-400 hover:text-white transition-colors"
            aria-label="Close Command Palette"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Command List */}
        <div className="max-h-[380px] overflow-y-auto p-2 divide-y divide-white/5 font-mono text-sm">
          {filteredCommands.length > 0 ? (
            filteredCommands.map((grp, gIdx) => (
              <div key={gIdx} className="py-2 first:pt-0 last:pb-0">
                <div className="text-[11px] uppercase tracking-wider text-cyan-500/80 px-3 py-1 font-semibold">
                  {grp.group}
                </div>
                <div className="space-y-1 mt-1">
                  {grp.items.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={item.action}
                      onMouseEnter={playHover}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-left text-gray-300 hover:text-white hover:bg-cyan-500/15 transition-colors group"
                    >
                      <div className="flex items-center gap-2.5">
                        {item.icon}
                        <span className="text-xs sm:text-sm">{item.label}</span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-gray-600 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all" />
                    </button>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="py-8 text-center text-gray-500 text-xs">
              NO COMMANDS MATCHED &quot;{search}&quot;
            </div>
          )}
        </div>

        {/* Footer shortcuts hint */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-black/80 border-t border-cyan-500/20 text-[11px] font-mono text-gray-400">
          <div className="flex items-center gap-3">
            <span>
              <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-cyan-400">ESC</kbd> to exit
            </span>
            <span>
              <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-cyan-400">ENTER</kbd> to execute
            </span>
          </div>
          <span className="text-cyan-400/80">ANU.OS // 2026</span>
        </div>
      </div>
    </div>
  );
}
