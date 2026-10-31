"use client";

import React, { useState } from "react";
import { useSound } from "@/lib/soundContext";
import { usePortfolio } from "@/lib/portfolioContext";
import {
  Compass,
  CheckCircle2,
  Milestone,
  ArrowRight,
  Send,
  Mail,
  Copy,
  Check,
  Terminal,
  Clock,
  Sparkles,
} from "lucide-react";
import { GithubIcon, InstagramIcon } from "@/components/icons/BrandIcons";
import confetti from "canvas-confetti";

// Milestone data as requested:
// Beginning my technology journey, Exploring web development, Learning HTML and CSS, Exploring JavaScript, Working with Tailwind CSS, Future development goals
const TIMELINE_MILESTONES = [
  {
    phase: "PHASE 01",
    title: "Beginning The Technology Journey",
    status: "COMPLETED",
    description:
      "Ignited passion for information technology, computer architectures, and understanding how modern digital software operates.",
    tag: "ORIGIN",
    editableNote: "Early technology curiosity & foundational IT principles.",
  },
  {
    phase: "PHASE 02",
    title: "Exploring Web Development",
    status: "COMPLETED",
    description:
      "Entered the world of the web. Discovered client-server fundamentals, browser rendering engines, and developer tools.",
    tag: "FOUNDATION",
    editableNote: "Stepped into frontend architecture & web protocols.",
  },
  {
    phase: "PHASE 03",
    title: "Learning HTML & CSS",
    status: "CONFIRMED & APPLIED",
    description:
      "Mastered semantic markup, accessible HTML structures, and responsive CSS styling with modern Flexbox and Grid designs.",
    tag: "CORE_SKILL",
    editableNote: "Semantic HTML5, CSS3 typography, layouts and glassmorphism.",
  },
  {
    phase: "PHASE 04",
    title: "Exploring JavaScript",
    status: "CONFIRMED & APPLIED",
    description:
      "Dived into JavaScript logic, DOM manipulation, asynchronous event loops, promises, APIs, and modern ES6+ paradigms.",
    tag: "DYNAMIC_LOGIC",
    editableNote: "ES6+, DOM interactions, async algorithms, state logic.",
  },
  {
    phase: "PHASE 05",
    title: "Working With Tailwind CSS",
    status: "CONFIRMED & APPLIED",
    description:
      "Adopted rapid utility-first workflow to construct clean, scalable design systems and futuristic dark-mode interfaces.",
    tag: "DESIGN_SYSTEM",
    editableNote: "Custom Tailwind themes, token management, cyber styling.",
  },
  {
    phase: "PHASE 06",
    title: "Future Development Goals",
    status: "IN PROGRESS",
    description:
      "Expanding into advanced frontend frameworks, 3D WebGL experiences, full-stack architectures, and creative computing.",
    tag: "HORIZON",
    editableNote: "Next.js, Three.js, backend APIs, open-source engineering.",
  },
];

export default function JourneyAndContactSection() {
  const { playHover, playClick, playSuccess } = useSound();
  const { profile, milestones, addMessage } = usePortfolio();

  // Contact form state
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    playSuccess();
    navigator.clipboard.writeText(profile.email || "Code.anukrsah@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playClick();

    if (!formState.name || !formState.email || !formState.message) {
      setSubmitStatus("error");
      return;
    }

    setIsSubmitting(true);

    // Save transmission to persistent CMS messages inbox
    addMessage({
      name: formState.name,
      email: formState.email,
      subject: formState.subject,
      message: formState.message,
    });

    // Simulated transmission with feedback
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      playSuccess();
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.8 },
          colors: ["#00f5ff", "#9b5cff", "#2563eb"],
        });
      } catch {
        // Confetti optional
      }
      setFormState({ name: "", email: "", subject: "", message: "" });
    }, 1200);
  };

  return (
    <section
      id="journey"
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#050505] cyber-dots overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-28">

        {/* ================= SECTION 11: DIGITAL JOURNEY TIMELINE ================= */}
        <div>
          {/* Section Header */}
          <div className="flex flex-col items-start mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-400 font-mono text-xs mb-3">
              <Compass className="w-3.5 h-3.5 animate-pulse" />
              <span>06 // PROGRESSION ARCHIVE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
              THE JOURNEY <span className="gradient-cyber-text">CONTINUES.</span>
            </h2>
            <p className="text-gray-400 max-w-2xl text-base sm:text-lg">
              A chronological map of technological curiosity, skill acquisition, and future development horizons.
            </p>
          </div>

          {/* Futuristic Timeline */}
          <div className="relative border-l border-cyan-500/30 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-10">
            {milestones.map((item, idx) => (
              <div
                key={item.id || idx}
                onMouseEnter={playHover}
                className="relative group transition-all"
              >
                {/* Node Bullet On Vertical Line */}
                <span className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-black border-2 border-cyan-400 flex items-center justify-center group-hover:scale-125 group-hover:border-purple-400 group-hover:shadow-[0_0_12px_#00f5ff] transition-all">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 group-hover:bg-purple-400" />
                </span>

                {/* Milestone Card */}
                <div className="p-6 rounded-2xl glass-panel border border-white/10 group-hover:border-cyan-500/40 group-hover:bg-cyan-950/20 transition-all cyber-corner">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2 font-mono text-xs">
                    <span className="text-cyan-400 font-bold tracking-wider">
                      {item.phase} // {item.tag}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded font-semibold text-[10px] ${
                        item.status === "IN PROGRESS"
                          ? "bg-purple-950/60 border border-purple-500/40 text-purple-300"
                          : "bg-emerald-950/60 border border-emerald-500/40 text-emerald-300"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold font-mono text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-gray-300 text-sm leading-relaxed mb-4">
                    {item.description}
                  </p>

                  <div className="pt-3 border-t border-white/5 flex items-center justify-between font-mono text-xs text-gray-500">
                    <span>RECORD: {item.tag}</span>
                    <span className="text-cyan-400/60 text-[10px]">EDITABLE</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= SECTION 12: CONTACT — LET'S CONNECT ================= */}
        <div id="contact" className="pt-8">
          {/* Section Header */}
          <div className="flex flex-col items-start mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-950/40 border border-pink-500/30 text-pink-400 font-mono text-xs mb-3">
              <Mail className="w-3.5 h-3.5" />
              <span>07 // TRANSMISSION PORTAL</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
              LET&apos;S BUILD SOMETHING <span className="gradient-cyber-text">FROM THE FUTURE.</span>
            </h2>
            <p className="text-gray-400 max-w-2xl text-base sm:text-lg">
              Have an interesting idea, project, or opportunity? Let&apos;s connect.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* Left Column: Direct Transmission Channels */}
            <div className="lg:col-span-5 space-y-4">

              {/* Email Transmission Card */}
              <div className="p-6 rounded-2xl glass-panel border border-cyan-500/30 cyber-corner space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-xl bg-cyan-950/50 border border-cyan-500/30 text-cyan-400">
                    <Mail className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono text-cyan-400 bg-black/60 px-2 py-0.5 rounded border border-cyan-500/20">
                    DIRECT DISPATCH
                  </span>
                </div>

                <div>
                  <h4 className="font-mono text-xs text-gray-400 uppercase tracking-wider mb-1">
                    PRIMARY EMAIL
                  </h4>
                  <p className="font-mono text-base font-bold text-white break-all">
                    {profile.email || "Code.anukrsah@gmail.com"}
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={handleCopyEmail}
                    onMouseEnter={playHover}
                    className="flex-1 py-2.5 px-4 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 font-mono text-xs font-semibold flex items-center justify-center gap-2 transition-all active:scale-95"
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedEmail ? "EMAIL COPIED!" : "COPY EMAIL"}</span>
                  </button>

                  <a
                    href={`mailto:${profile.email || "Code.anukrsah@gmail.com"}`}
                    onMouseEnter={playHover}
                    onClick={playClick}
                    className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white transition-all"
                    title="Send Email"
                    aria-label="Send Email"
                  >
                    <Send className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* GitHub Card */}
              <div className="p-5 rounded-xl glass-panel border border-white/10 hover:border-cyan-500/30 transition-all flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-black/60 border border-white/10 text-cyan-400">
                    <GithubIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-mono text-sm font-bold text-white">GitHub Profile</h5>
                    <p className="font-mono text-xs text-gray-400">github.com/Anusah99</p>
                  </div>
                </div>
                <a
                  href="https://github.com/Anusah99"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={playClick}
                  onMouseEnter={playHover}
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-cyan-500/20 border border-white/10 text-cyan-300 font-mono text-xs transition-colors"
                >
                  VISIT
                </a>
              </div>

              {/* Instagram Card */}
              <div className="p-5 rounded-xl glass-panel border border-white/10 hover:border-pink-500/30 transition-all flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-black/60 border border-white/10 text-pink-400">
                    <InstagramIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-mono text-sm font-bold text-white">Instagram</h5>
                    <p className="font-mono text-xs text-gray-400">@itz_anukrsah_xd</p>
                  </div>
                </div>
                <a
                  href="https://instagram.com/itz_anukrsah_xd"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={playClick}
                  onMouseEnter={playHover}
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-pink-500/20 border border-white/10 text-pink-300 font-mono text-xs transition-colors"
                >
                  VISIT
                </a>
              </div>

              {/* Availability Status */}
              <div className="p-4 rounded-xl bg-black/40 border border-emerald-500/20 font-mono text-xs flex items-center justify-between">
                <span className="text-gray-400 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>TRANSMISSION STATUS:</span>
                </span>
                <span className="text-emerald-400 font-bold">READY TO RECEIVE</span>
              </div>
            </div>

            {/* Right Column: Interactive Cyber Contact Form */}
            <div className="lg:col-span-7">
              <form
                onSubmit={handleFormSubmit}
                className="p-6 sm:p-8 rounded-2xl glass-panel border border-cyan-500/30 cyber-corner shadow-2xl shadow-cyan-950/30 space-y-5"
              >
                <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs font-mono">
                  <span className="text-cyan-400 font-bold flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5" />
                    <span>ENCRYPTED MESSAGE DISPATCH</span>
                  </span>
                  <span className="text-gray-500">PROTOCOL: SSL/TLS</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-gray-400 uppercase tracking-wider mb-2">
                      YOUR NAME *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Chen"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-black/60 border border-white/10 focus:border-cyan-400 text-white font-mono text-sm focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-gray-400 uppercase tracking-wider mb-2">
                      YOUR EMAIL *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. alex@future.io"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-black/60 border border-white/10 focus:border-cyan-400 text-white font-mono text-sm focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-gray-400 uppercase tracking-wider mb-2">
                    TRANSMISSION SUBJECT
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Creative Collaboration / Opportunity"
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-black/60 border border-white/10 focus:border-cyan-400 text-white font-mono text-sm focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-gray-400 uppercase tracking-wider mb-2">
                    MESSAGE PAYLOAD *
                  </label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Describe your vision, inquiry, or idea..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-black/60 border border-white/10 focus:border-cyan-400 text-white font-mono text-sm focus:outline-none transition-colors resize-none"
                  />
                </div>

                {/* Status messages */}
                {submitStatus === "success" && (
                  <div className="p-3.5 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 font-mono text-xs flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>
                      TRANSMISSION SIMULATED SUCCESSFULLY! Message logged to client console. For live delivery, email directly to Code.anukrsah@gmail.com.
                    </span>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="p-3 rounded-lg bg-red-950/60 border border-red-500/40 text-red-300 font-mono text-xs">
                    Please populate all required fields before dispatching.
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  onMouseEnter={playHover}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-black font-extrabold font-mono text-sm tracking-widest uppercase shadow-lg shadow-cyan-500/25 hover:shadow-cyan-400/40 active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Clock className="w-4 h-4 animate-spin" />
                      <span>TRANSMITTING PACKETS...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>DISPATCH TRANSMISSION</span>
                    </>
                  )}
                </button>

                {/* Integrity footnote as requested */}
                <p className="text-[11px] font-mono text-gray-500 text-center">
                  * Note: Production email dispatch requires configured backend SMTP/API credentials.
                </p>
              </form>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
