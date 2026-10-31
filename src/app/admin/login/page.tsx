"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { usePortfolio } from "@/lib/portfolioContext";
import { Shield, KeyRound, ArrowLeft, Terminal, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const { loginAdmin } = usePortfolio();
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginAdmin(password);
    if (success) {
      router.push("/admin");
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-mono flex flex-col items-center justify-center p-4 cyber-grid select-none">
      {/* Background Glow */}
      <div className="absolute w-96 h-96 bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-md p-6 sm:p-8 rounded-2xl glass-panel border border-cyan-500/40 shadow-2xl shadow-cyan-950/80 cyber-corner relative">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-cyan-400 transition-colors mb-6"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>RETURN TO PORTFOLIO</span>
        </Link>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-cyan-950/50 border border-cyan-500/30 text-cyan-400">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              <span>ANU.OS // CMS</span>
            </h1>
            <p className="text-xs text-gray-400">ADMINISTRATOR CLEARANCE PORTAL</p>
          </div>
        </div>

        {/* Security Notification */}
        <div className="p-3 rounded-lg bg-black/60 border border-cyan-500/20 text-xs text-gray-400 mb-6 flex items-start gap-2">
          <Terminal className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
          <p>
            Authenticate to modify live portfolio data, publish projects, manage journey milestones, and view message logs.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs uppercase text-gray-400 font-bold mb-2">
              MASTER SECURITY PASSCODE
            </label>
            <div className="relative">
              <input
                type="password"
                required
                autoFocus
                placeholder="Enter passcode..."
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                className="w-full px-4 py-3 bg-black/80 border border-white/20 focus:border-cyan-400 rounded-xl text-white font-mono text-sm focus:outline-none transition-colors"
              />
              <KeyRound className="w-4 h-4 text-cyan-400 absolute right-3.5 top-3.5" />
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-950/60 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400" />
              <span>[ACCESS_DENIED] Invalid passcode. Hint: &apos;anu2026&apos;</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-extrabold text-xs tracking-wider uppercase shadow-lg shadow-cyan-500/25 hover:shadow-cyan-400/40 active:scale-98 transition-all"
          >
            VERIFY CREDENTIALS &amp; ENTER
          </button>
        </form>

        {/* Passcode hint */}
        <div className="mt-6 pt-4 border-t border-white/5 text-center text-[11px] text-gray-500">
          Default Passcode: <span className="text-cyan-400 font-bold">anu2026</span>
        </div>
      </div>
    </div>
  );
}
