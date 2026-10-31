import Link from "next/link";
import { Terminal, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#050505] text-[#f0f6fc] flex flex-col items-center justify-center p-4 font-mono cyber-grid relative overflow-hidden select-none">
      {/* Background Glow */}
      <div className="absolute w-96 h-96 bg-red-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-md w-full p-8 rounded-2xl glass-panel border border-red-500/30 text-center space-y-6 shadow-2xl shadow-red-950/40">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/60 border border-red-500/40 text-red-400 text-xs">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
          <span>HTTP 404 // SECTOR NOT FOUND</span>
        </div>

        <div className="text-6xl sm:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-400 to-red-500">
          404
        </div>

        <div className="space-y-2 text-sm text-gray-300">
          <p className="font-bold text-white">SYSTEM_ANOMALY: GRID COORDINATE UNKNOWN</p>
          <p className="text-xs text-gray-400">
            The target memory sector or route does not exist in the Anu.OS matrix.
          </p>
        </div>

        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold text-xs tracking-wider shadow-lg shadow-cyan-500/25 hover:shadow-cyan-400/40 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>RETURN TO HOME BASE</span>
          </Link>
        </div>

        <div className="text-[10px] text-gray-600 pt-2 border-t border-white/5">
          STATUS: RE-ROUTING AVAILABLE // PROTOCOL ACTIVE
        </div>
      </div>
    </div>
  );
}
