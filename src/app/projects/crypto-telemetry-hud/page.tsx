"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, TrendingUp, TrendingDown, Activity, DollarSign, RefreshCw, Zap, Shield } from "lucide-react";

interface CryptoAsset {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  high24h: number;
  low24h: number;
  volume: string;
}

const ASSETS: CryptoAsset[] = [
  { symbol: "BTC/USDT", name: "Bitcoin Core", price: 88420.5, change24h: 3.42, high24h: 89100.0, low24h: 85200.0, volume: "2.4B" },
  { symbol: "ETH/USDT", name: "Ethereum 2.0", price: 3450.8, change24h: -1.15, high24h: 3550.0, low24h: 3380.0, volume: "1.1B" },
  { symbol: "CYBR/USDT", name: "Cyber Matrix", price: 42.15, change24h: 12.8, high24h: 44.5, low24h: 36.2, volume: "420M" },
  { symbol: "SOL/USDT", name: "Solana Supercluster", price: 184.6, change24h: 5.67, high24h: 190.2, low24h: 172.4, volume: "890M" },
];

export default function CryptoTelemetryHud() {
  const [selectedAsset, setSelectedAsset] = useState<CryptoAsset>(ASSETS[0]);
  const [balance, setBalance] = useState(10000);
  const [tradeAmount, setTradeAmount] = useState("0.1");
  const [orders, setOrders] = useState<{ type: string; price: number; amount: string; time: string }[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Simulated live chart ticks
  const [chartData, setChartData] = useState<number[]>([]);

  useEffect(() => {
    // Generate initial candle trend
    const base = selectedAsset.price;
    const initial = Array.from({ length: 40 }).map((_, i) => {
      return base + (Math.sin(i * 0.4) * base * 0.02) + (Math.random() - 0.5) * base * 0.01;
    });
    setChartData(initial);
  }, [selectedAsset]);

  // Real-time tick generator
  useEffect(() => {
    const timer = setInterval(() => {
      setChartData((prev) => {
        if (prev.length === 0) return prev;
        const last = prev[prev.length - 1];
        const delta = (Math.random() - 0.48) * (last * 0.004);
        const nextPrice = Number((last + delta).toFixed(2));
        return [...prev.slice(1), nextPrice];
      });
    }, 1500);

    return () => clearInterval(timer);
  }, []);

  // Draw HUD Canvas Chart
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || chartData.length === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = (canvas.width = canvas.parentElement?.clientWidth || 700);
    const height = (canvas.height = 260);

    ctx.clearRect(0, 0, width, height);

    // Draw Grid
    ctx.strokeStyle = "rgba(0, 245, 255, 0.08)";
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 50) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    const min = Math.min(...chartData);
    const max = Math.max(...chartData);
    const range = max - min || 1;

    // Draw Glowing Area
    const step = width / (chartData.length - 1);
    ctx.beginPath();
    chartData.forEach((val, i) => {
      const x = i * step;
      const y = height - ((val - min) / range) * (height - 40) - 20;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });

    const isUp = chartData[chartData.length - 1] >= chartData[0];
    ctx.strokeStyle = isUp ? "#00f5ff" : "#f43f5e";
    ctx.lineWidth = 2.5;
    ctx.shadowColor = isUp ? "#00f5ff" : "#f43f5e";
    ctx.shadowBlur = 10;
    ctx.stroke();

    // Area Fill
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, isUp ? "rgba(0, 245, 255, 0.25)" : "rgba(244, 63, 94, 0.25)");
    gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = gradient;
    ctx.fill();
    ctx.shadowBlur = 0;
  }, [chartData]);

  const executeTrade = (type: "BUY" | "SELL") => {
    const currentPrice = chartData[chartData.length - 1] || selectedAsset.price;
    const num = parseFloat(tradeAmount) || 0.1;
    const cost = currentPrice * num;

    if (type === "BUY" && balance >= cost) {
      setBalance((b) => Number((b - cost).toFixed(2)));
    } else if (type === "SELL") {
      setBalance((b) => Number((b + cost).toFixed(2)));
    }

    setOrders((prev) => [
      {
        type,
        price: currentPrice,
        amount: `${num} ${selectedAsset.symbol.split("/")[0]}`,
        time: new Date().toLocaleTimeString(),
      },
      ...prev.slice(0, 6),
    ]);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-mono flex flex-col">
      {/* Top Bar */}
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
            <Zap className="w-4 h-4 text-cyan-400" />
            <span>QUANTUM_TRADE // CRYPTO HUD MATRIX</span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <div className="hidden sm:flex items-center gap-2 bg-black/60 px-3 py-1 rounded border border-cyan-500/30">
            <span className="text-gray-400">PAPER BALANCE:</span>
            <span className="text-emerald-400 font-bold">${balance.toLocaleString()} USD</span>
          </div>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        </div>
      </header>

      {/* Main Trading HUD */}
      <div className="flex-1 max-w-7xl mx-auto w-full p-4 grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">

        {/* Left Column: Asset Selection & Telemetry */}
        <div className="lg:col-span-3 space-y-3">
          <div className="text-xs text-cyan-400 uppercase tracking-wider font-bold mb-2">
            // ACTIVE ASSETS
          </div>
          {ASSETS.map((asset) => (
            <button
              key={asset.symbol}
              onClick={() => setSelectedAsset(asset)}
              className={`w-full p-3 rounded-xl border text-left transition-all ${
                selectedAsset.symbol === asset.symbol
                  ? "bg-cyan-950/40 border-cyan-400/60 shadow-lg shadow-cyan-950/40"
                  : "bg-black/40 border-white/10 hover:border-cyan-500/30"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-white text-sm">{asset.symbol}</span>
                <span
                  className={`text-xs font-bold ${
                    asset.change24h >= 0 ? "text-emerald-400" : "text-rose-400"
                  }`}
                >
                  {asset.change24h >= 0 ? "+" : ""}
                  {asset.change24h}%
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>${asset.price.toLocaleString()}</span>
                <span>VOL: {asset.volume}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Middle Column: Interactive Live Chart */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-4 rounded-2xl glass-panel border border-cyan-500/30 cyber-corner">
            <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>{selectedAsset.symbol}</span>
                  <span className="text-xs text-gray-400 font-normal">{selectedAsset.name}</span>
                </h3>
                <div className="text-2xl font-black text-cyan-300 mt-1">
                  ${(chartData[chartData.length - 1] || selectedAsset.price).toLocaleString()}
                </div>
              </div>
              <div className="text-right text-xs text-gray-400 space-y-1">
                <div>HIGH: ${selectedAsset.high24h.toLocaleString()}</div>
                <div>LOW: ${selectedAsset.low24h.toLocaleString()}</div>
              </div>
            </div>

            {/* Canvas Telemetry Stream */}
            <div className="w-full relative h-[260px] bg-black/60 rounded-xl overflow-hidden border border-white/5">
              <canvas ref={canvasRef} className="w-full h-full" />
            </div>
          </div>

          {/* Quick Execution Trade Form */}
          <div className="p-4 rounded-xl bg-black/60 border border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
            <div>
              <label className="block text-[11px] text-gray-400 uppercase mb-1">Trade Size</label>
              <input
                type="number"
                value={tradeAmount}
                onChange={(e) => setTradeAmount(e.target.value)}
                className="w-full bg-black border border-white/20 focus:border-cyan-400 rounded-lg p-2 text-sm text-white focus:outline-none"
              />
            </div>
            <div className="flex gap-2 pt-4 sm:pt-0">
              <button
                onClick={() => executeTrade("BUY")}
                className="flex-1 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs shadow-md shadow-emerald-500/20 active:scale-95 transition-all"
              >
                BUY LONG
              </button>
              <button
                onClick={() => executeTrade("SELL")}
                className="flex-1 py-2.5 rounded-lg bg-rose-500 hover:bg-rose-400 text-black font-bold text-xs shadow-md shadow-rose-500/20 active:scale-95 transition-all"
              >
                SELL SHORT
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Simulated Order History Book */}
        <div className="lg:col-span-3 space-y-3">
          <div className="text-xs text-cyan-400 uppercase tracking-wider font-bold mb-2">
            // TELEMETRY LOGS
          </div>
          <div className="p-4 rounded-xl glass-panel border border-white/10 space-y-2 min-h-[360px]">
            {orders.length === 0 ? (
              <p className="text-xs text-gray-500 text-center pt-16">
                NO EXECUTIONS LOGGED. PLACE A SIMULATED TRADE TO MONITOR TELEMETRY.
              </p>
            ) : (
              orders.map((ord, idx) => (
                <div
                  key={idx}
                  className="p-2 rounded bg-black/40 border border-white/5 text-xs flex items-center justify-between"
                >
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`font-bold ${
                        ord.type === "BUY" ? "text-emerald-400" : "text-rose-400"
                      }`}
                    >
                      {ord.type}
                    </span>
                    <span className="text-gray-300">{ord.amount}</span>
                  </div>
                  <span className="text-gray-500 text-[10px]">{ord.time}</span>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
