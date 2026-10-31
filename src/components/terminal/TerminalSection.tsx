"use client";

import React, { useState, useRef, useEffect } from "react";
import { useSound } from "@/lib/soundContext";
import {
  Terminal as TerminalIcon,
  Maximize2,
  Minimize2,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
} from "lucide-react";

interface CommandHistoryItem {
  command: string;
  output: React.ReactNode;
  time: string;
}

export default function TerminalSection() {
  const { playTerminalKey, playSuccess, playClick, playHover } = useSound();
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<CommandHistoryItem[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [isMaximized, setIsMaximized] = useState(false);
  const [copied, setCopied] = useState(false);

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize with welcome message
  useEffect(() => {
    const welcomeItem: CommandHistoryItem = {
      command: "init",
      output: (
        <div className="space-y-2 text-gray-300">
          <p className="text-cyan-400 font-bold">
            ANU.OS v2.6 // CYBER COMMAND INTERFACE INITIALIZED
          </p>
          <p className="text-gray-400">
            Welcome, visitor. Type <span className="text-cyan-300 font-bold">help</span> or click any command tag below to inspect system records.
          </p>
        </div>
      ),
      time: new Date().toLocaleTimeString(),
    };
    setHistory([welcomeItem]);
  }, []);

  // Auto scroll to bottom
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    playTerminalKey();
    const timeStr = new Date().toLocaleTimeString();

    // Update command history for Up/Down arrows
    setCommandHistory((prev) => [...prev, rawCmd.trim()]);
    setHistoryIndex(-1);

    let responseNode: React.ReactNode = null;

    switch (cmd) {
      case "help":
        responseNode = (
          <div className="space-y-1.5 text-gray-300">
            <p className="text-cyan-400 font-bold mb-1">AVAILABLE COMMANDS:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs">
              <p><span className="text-yellow-400 font-bold">about</span> : Read Anu&apos;s digital identity and bio</p>
              <p><span className="text-yellow-400 font-bold">skills</span> : Output confirmed technologies</p>
              <p><span className="text-yellow-400 font-bold">projects</span> : View built systems &amp; prototypes</p>
              <p><span className="text-yellow-400 font-bold">github</span> : Display verified GitHub profile</p>
              <p><span className="text-yellow-400 font-bold">contact</span> : Transmission channels &amp; email</p>
              <p><span className="text-yellow-400 font-bold">clear</span> : Clear terminal display buffer</p>
              <p><span className="text-yellow-400 font-bold">matrix</span> : Enter the matrix stream</p>
              <p><span className="text-yellow-400 font-bold">whoami</span> : Print current session permissions</p>
              <p><span className="text-yellow-400 font-bold">date</span> : Get current system timestamp</p>
            </div>
          </div>
        );
        break;

      case "about":
        responseNode = (
          <div className="space-y-1.5 text-gray-300 border-l-2 border-cyan-500 pl-3 my-1">
            <p><span className="text-cyan-400 font-bold">Name:</span> Anu Sah</p>
            <p><span className="text-cyan-400 font-bold">Role:</span> IT Enthusiast | Creative Developer</p>
            <p><span className="text-cyan-400 font-bold">Focus:</span> Technology &amp; Web Development</p>
            <p><span className="text-cyan-400 font-bold">Status:</span> Always Learning.</p>
            <p className="text-gray-400 text-xs mt-2">
              Passionate about exploring modern web development, interactive user interfaces, and the future of digital computing.
            </p>
          </div>
        );
        break;

      case "skills":
        responseNode = (
          <div className="space-y-1.5 text-gray-300 border-l-2 border-emerald-500 pl-3 my-1">
            <p className="text-emerald-400 font-bold mb-1">CONFIRMED CORE STACK:</p>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/40 text-emerald-300">HTML5</span>
              <span className="px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/40 text-emerald-300">CSS3</span>
              <span className="px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/40 text-emerald-300">JavaScript (ES6+)</span>
              <span className="px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/40 text-emerald-300">Tailwind CSS</span>
            </div>
            <p className="text-gray-400 text-xs mt-1">
              GitHub Mastery: Advanced // Exploring Modern Frontend Frameworks
            </p>
          </div>
        );
        break;

      case "projects":
        responseNode = (
          <div className="space-y-2 text-gray-300 border-l-2 border-purple-500 pl-3 my-1">
            <p className="text-purple-400 font-bold">DEPLOYED SYSTEM REPOSITORY (SAMPLE SLOTS):</p>
            <div className="space-y-1 text-xs">
              <p className="text-white font-semibold">1. Cyberpunk OS Portfolio (Current)</p>
              <p className="text-gray-400 pl-2">Stack: Next.js, Three.js, Tailwind CSS, TypeScript</p>
              <p className="text-white font-semibold mt-1">2. Interactive Web Lab [Editable Slot 01]</p>
              <p className="text-gray-400 pl-2">Ready for custom repository integration</p>
              <p className="text-white font-semibold mt-1">3. Creative Frontend Showcase [Editable Slot 02]</p>
              <p className="text-gray-400 pl-2">Ready for custom repository integration</p>
            </div>
            <p className="text-cyan-400 text-xs">
              Type <span className="underline cursor-pointer" onClick={() => handleQuickCommand("github")}>github</span> to inspect raw repositories.
            </p>
          </div>
        );
        break;

      case "github":
        responseNode = (
          <div className="space-y-1.5 text-gray-300 border-l-2 border-cyan-400 pl-3 my-1">
            <p className="text-cyan-400 font-bold">VERIFIED GITHUB IDENTITY:</p>
            <p>
              <a
                href="https://github.com/Anusah99"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-300 underline hover:text-white flex items-center gap-1.5 font-bold"
              >
                https://github.com/Anusah99
              </a>
            </p>
            <p className="text-gray-400 text-xs">
              Status: Advanced GitHub Experience // Open-source exploration &amp; code archives.
            </p>
          </div>
        );
        break;

      case "contact":
        responseNode = (
          <div className="space-y-1.5 text-gray-300 border-l-2 border-pink-500 pl-3 my-1">
            <p className="text-pink-400 font-bold">TRANSMISSION CHANNELS:</p>
            <p><span className="text-gray-400">Email:</span> <span className="text-white font-mono">Code.anukrsah@gmail.com</span></p>
            <p><span className="text-gray-400">GitHub:</span> <a href="https://github.com/Anusah99" target="_blank" rel="noreferrer" className="text-cyan-300 underline">https://github.com/Anusah99</a></p>
            <p><span className="text-gray-400">Instagram:</span> <a href="https://instagram.com/itz_anukrsah_xd" target="_blank" rel="noreferrer" className="text-pink-300 underline">https://instagram.com/itz_anukrsah_xd</a></p>
          </div>
        );
        break;

      case "clear":
        setHistory([]);
        setInputVal("");
        return;

      case "matrix":
        responseNode = (
          <div className="text-emerald-400 font-mono text-xs leading-tight py-1">
            <p>01000001 01001110 01010101 00100000 01010011 01000001 01001000</p>
            <p>&gt; &quot;The future belongs to those who learn more skills and combine them in creative ways.&quot;</p>
            <p className="text-emerald-300 font-bold mt-1">REALITY MATRIX: CONNECTED.</p>
          </div>
        );
        break;

      case "whoami":
        responseNode = (
          <p className="text-cyan-300 text-xs">
            visitor@anu-sah-network [AUTHENTICATED // LEVEL: GUEST // ACCESS: FULL READ]
          </p>
        );
        break;

      case "date":
        responseNode = (
          <p className="text-cyan-300 text-xs font-mono">
            {new Date().toUTCString()} (SYSTEM_SYNC_OK)
          </p>
        );
        break;

      case "sudo":
        responseNode = (
          <p className="text-red-400 text-xs font-mono">
            [ACCESS_DENIED] You already possess full guest exploration privileges. No sudo required.
          </p>
        );
        break;

      default:
        responseNode = (
          <p className="text-red-400 text-xs">
            command not found: &apos;{rawCmd}&apos;. Type <span className="text-cyan-300 font-bold">&apos;help&apos;</span> to inspect valid operations.
          </p>
        );
        break;
    }

    setHistory((prev) => [
      ...prev,
      { command: rawCmd, output: responseNode, time: timeStr },
    ]);
    setInputVal("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleCommand(inputVal);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIdx = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIdx);
      setInputVal(commandHistory[nextIdx]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIdx = historyIndex + 1;
      if (nextIdx >= commandHistory.length) {
        setHistoryIndex(-1);
        setInputVal("");
      } else {
        setHistoryIndex(nextIdx);
        setInputVal(commandHistory[nextIdx]);
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const valid = ["help", "about", "skills", "projects", "github", "contact", "clear", "matrix", "whoami", "date"];
      const match = valid.find((v) => v.startsWith(inputVal.trim().toLowerCase()));
      if (match) {
        setInputVal(match);
      }
    } else {
      playTerminalKey();
    }
  };

  const handleQuickCommand = (cmd: string) => {
    playClick();
    handleCommand(cmd);
    inputRef.current?.focus();
  };

  const copyTerminalOutput = () => {
    playSuccess();
    const text = history
      .map((item) => `ANU@SAH:~$ ${item.command}\n`)
      .join("");
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const quickCommands = ["help", "about", "skills", "projects", "github", "contact", "clear"];

  return (
    <section
      id="terminal"
      className="relative py-24 px-4 sm:px-6 lg:px-8 border-b border-cyan-500/10 bg-[#050505] cyber-dots overflow-hidden"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-400 font-mono text-xs mb-3">
            <TerminalIcon className="w-3.5 h-3.5 animate-pulse" />
            <span>03 // COMMAND LINE SYSTEM</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            INTERACTIVE <span className="gradient-cyber-text">TERMINAL</span>
          </h2>
          <p className="text-gray-400 max-w-2xl text-base">
            Direct interface to Anu Sah&apos;s digital OS. Execute commands or run quick queries below.
          </p>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="flex flex-wrap items-center gap-2 mb-4 font-mono text-xs">
          <span className="text-gray-500 mr-1 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-cyan-400" />
            <span>Quick:</span>
          </span>
          {quickCommands.map((cmd) => (
            <button
              key={cmd}
              onClick={() => handleQuickCommand(cmd)}
              onMouseEnter={playHover}
              className="px-2.5 py-1 rounded bg-black/60 border border-cyan-500/30 text-cyan-300 hover:border-cyan-400 hover:bg-cyan-500/20 active:scale-95 transition-all"
            >
              ${cmd}
            </button>
          ))}
        </div>

        {/* Terminal Container */}
        <div
          className={`relative rounded-2xl glass-panel border border-cyan-500/40 shadow-2xl shadow-cyan-950/60 overflow-hidden font-mono transition-all duration-300 scanline ${
            isMaximized ? "min-h-[640px]" : "min-h-[440px]"
          }`}
          onClick={() => inputRef.current?.focus()}
        >
          {/* Terminal Window Header Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#080d1a] border-b border-cyan-500/20">
            {/* Window Dots */}
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block border border-red-400/50" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block border border-yellow-400/50" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block border border-emerald-400/50" />
              <span className="text-xs text-gray-400 ml-2 font-semibold">
                ANU@SAH:~$ &mdash; bash &mdash; 80x24
              </span>
            </div>

            {/* Window Actions */}
            <div className="flex items-center gap-3 text-gray-400">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  copyTerminalOutput();
                }}
                className="hover:text-cyan-400 transition-colors p-1"
                title="Copy Terminal Logs"
                aria-label="Copy Terminal Logs"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleCommand("clear");
                }}
                className="hover:text-cyan-400 transition-colors p-1"
                title="Clear Terminal"
                aria-label="Clear Terminal"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMaximized(!isMaximized);
                }}
                className="hover:text-cyan-400 transition-colors p-1 hidden sm:inline"
                title={isMaximized ? "Restore Window" : "Maximize Window"}
                aria-label="Toggle Window Size"
              >
                {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Terminal Body Screen */}
          <div className="p-4 sm:p-6 text-sm text-gray-200 overflow-y-auto max-h-[500px] space-y-4">
            {history.map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-2">
                    <span className="text-cyan-400 font-bold">ANU@SAH:~$</span>
                    <span className="text-white font-semibold">{item.command}</span>
                  </div>
                  <span>{item.time}</span>
                </div>
                <div className="pl-2 sm:pl-4 text-xs sm:text-sm">{item.output}</div>
              </div>
            ))}

            {/* Active Input Line */}
            <div className="flex items-center gap-2 pt-2 text-xs sm:text-sm">
              <span className="text-cyan-400 font-bold whitespace-nowrap">
                ANU@SAH:~$
              </span>
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="type 'help' or tab to complete..."
                className="w-full bg-transparent text-white font-mono focus:outline-none placeholder:text-gray-600 caret-cyan-400 text-xs sm:text-sm"
                autoComplete="off"
                spellCheck="false"
              />
            </div>
            <div ref={terminalEndRef} />
          </div>

          {/* Terminal Status Footer */}
          <div className="px-4 py-2 bg-black/80 border-t border-cyan-500/10 flex items-center justify-between text-[11px] text-gray-500">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>TERMINAL READY (UTF-8)</span>
            </span>
            <span className="text-cyan-500/60 hidden sm:inline">
              TAB=AUTOCOMPLETE | UP/DOWN=HISTORY
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
