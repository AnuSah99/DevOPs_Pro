"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, Play, Square, Volume2, Sparkles, Radio, Activity, Disc } from "lucide-react";

export default function NeuralAudioLab() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [waveform, setWaveform] = useState<OscillatorType>("sawtooth");
  const [frequency, setFrequency] = useState(220);
  const [cutoff, setCutoff] = useState(1200);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const filterRef = useRef<BiquadFilterNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number | null>(null);

  const initAudio = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new AudioCtx();
    }
    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
  };

  const startTone = () => {
    initAudio();
    const ctx = audioCtxRef.current;
    if (!ctx) return;

    if (oscRef.current) {
      oscRef.current.stop();
      oscRef.current.disconnect();
    }

    const osc = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();
    const analyser = ctx.createAnalyser();

    analyser.fftSize = 256;

    osc.type = waveform;
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(cutoff, ctx.currentTime);

    gain.gain.setValueAtTime(0.15, ctx.currentTime);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(analyser);
    analyser.connect(ctx.destination);

    osc.start();

    oscRef.current = osc;
    filterRef.current = filter;
    gainRef.current = gain;
    analyserRef.current = analyser;

    setIsPlaying(true);
    startVisualizer();
  };

  const stopTone = () => {
    if (oscRef.current) {
      try {
        oscRef.current.stop();
        oscRef.current.disconnect();
      } catch {
        // Safe disconnect
      }
      oscRef.current = null;
    }
    setIsPlaying(false);
  };

  const changeFrequency = (val: number) => {
    setFrequency(val);
    if (oscRef.current && audioCtxRef.current) {
      oscRef.current.frequency.setValueAtTime(val, audioCtxRef.current.currentTime);
    }
  };

  const changeCutoff = (val: number) => {
    setCutoff(val);
    if (filterRef.current && audioCtxRef.current) {
      filterRef.current.frequency.setValueAtTime(val, audioCtxRef.current.currentTime);
    }
  };

  const changeWaveform = (type: OscillatorType) => {
    setWaveform(type);
    if (oscRef.current) {
      oscRef.current.type = type;
    }
  };

  // Drum & FX Pads
  const playTriggerSound = (freq: number, type: OscillatorType, duration: number) => {
    initAudio();
    const ctx = audioCtxRef.current;
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + duration);

    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  };

  const startVisualizer = () => {
    const canvas = canvasRef.current;
    if (!canvas || !analyserRef.current) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const analyser = analyserRef.current;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      animFrameRef.current = requestAnimationFrame(draw);
      analyser.getByteFrequencyData(dataArray);

      const width = (canvas.width = canvas.parentElement?.clientWidth || 600);
      const height = (canvas.height = 200);

      ctx.clearRect(0, 0, width, height);

      const barWidth = (width / bufferLength) * 2.5;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const barHeight = (dataArray[i] / 255) * height;

        const r = Math.min(255, 0 + i * 2);
        const g = Math.min(255, 245 - i * 1);
        const b = 255;

        ctx.fillStyle = `rgb(${r},${g},${b})`;
        ctx.fillRect(x, height - barHeight, barWidth, barHeight);

        x += barWidth + 1;
      }
    };

    draw();
  };

  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      stopTone();
    };
  }, []);

  const pads = [
    { name: "KICK SUB", freq: 140, type: "sine" as const, color: "border-cyan-500" },
    { name: "SNARE GLITCH", freq: 440, type: "square" as const, color: "border-purple-500" },
    { name: "NEURAL ZAP", freq: 880, type: "sawtooth" as const, color: "border-emerald-500" },
    { name: "CYBER LASER", freq: 1200, type: "triangle" as const, color: "border-pink-500" },
  ];

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
            <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>NEURO_SYNTH // AUDIO DSP MATRIX</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isPlaying ? (
            <button
              onClick={stopTone}
              className="px-4 py-1.5 rounded-lg bg-rose-500 text-black font-bold text-xs flex items-center gap-1.5 shadow-md shadow-rose-500/30 active:scale-95 transition-all"
            >
              <Square className="w-3.5 h-3.5 fill-black" />
              <span>HALT OSCILLATOR</span>
            </button>
          ) : (
            <button
              onClick={startTone}
              className="px-4 py-1.5 rounded-lg bg-cyan-400 text-black font-bold text-xs flex items-center gap-1.5 shadow-md shadow-cyan-400/30 active:scale-95 transition-all"
            >
              <Play className="w-3.5 h-3.5 fill-black" />
              <span>FIRE SYNTHESIZER</span>
            </button>
          )}
        </div>
      </header>

      {/* Main Studio Controls */}
      <div className="flex-1 max-w-6xl mx-auto w-full p-4 sm:p-6 space-y-6">

        {/* Real-time Visualizer Canvas */}
        <div className="p-4 rounded-2xl glass-panel border border-cyan-500/30 cyber-corner">
          <div className="flex items-center justify-between mb-3 text-xs text-gray-400">
            <span className="flex items-center gap-1.5 text-cyan-400 font-bold">
              <Activity className="w-3.5 h-3.5" />
              <span>REAL-TIME SPECTRUM OSCILLOSCOPE</span>
            </span>
            <span>DSP: ACTIVE</span>
          </div>
          <div className="w-full h-48 bg-black/60 rounded-xl overflow-hidden border border-white/5 flex items-center justify-center">
            <canvas ref={canvasRef} className="w-full h-full" />
          </div>
        </div>

        {/* Synth Parameter Knobs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Waveform Selector */}
          <div className="p-5 rounded-xl glass-panel border border-white/10 space-y-3">
            <label className="text-xs font-bold text-cyan-400 uppercase tracking-wider block">
              1. WAVEFORM ARCHITECTURE
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {(["sawtooth", "square", "sine", "triangle"] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => changeWaveform(type)}
                  className={`p-3 rounded-lg border font-bold uppercase transition-all ${
                    waveform === type
                      ? "bg-cyan-500/20 border-cyan-400 text-cyan-300"
                      : "bg-black/40 border-white/10 text-gray-400 hover:text-white"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Frequency Control */}
          <div className="p-5 rounded-xl glass-panel border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-purple-400 uppercase tracking-wider">
                2. OSC FREQUENCY
              </label>
              <span className="text-sm font-bold text-white">{frequency} Hz</span>
            </div>
            <input
              type="range"
              min="55"
              max="880"
              value={frequency}
              onChange={(e) => changeFrequency(Number(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-gray-500 font-mono">
              <span>A1 (55Hz)</span>
              <span>A4 (440Hz)</span>
              <span>A5 (880Hz)</span>
            </div>
          </div>

          {/* Filter Cutoff */}
          <div className="p-5 rounded-xl glass-panel border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                3. LOWPASS CUTOFF
              </label>
              <span className="text-sm font-bold text-white">{cutoff} Hz</span>
            </div>
            <input
              type="range"
              min="200"
              max="4000"
              value={cutoff}
              onChange={(e) => changeCutoff(Number(e.target.value))}
              className="w-full accent-emerald-400 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-gray-500 font-mono">
              <span>200Hz</span>
              <span>2000Hz</span>
              <span>4000Hz</span>
            </div>
          </div>

        </div>

        {/* Launchpad Drum Pads */}
        <div className="p-6 rounded-2xl glass-panel border border-cyan-500/30">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-bold text-sm text-cyan-400 flex items-center gap-2">
              <Disc className="w-4 h-4" />
              <span>LIVE CYBER LAUNCHPAD MATRIX</span>
            </h4>
            <span className="text-xs text-gray-500">CLICK TO TRIGGER DSP TRANSIENTS</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {pads.map((pad, idx) => (
              <button
                key={idx}
                onClick={() => playTriggerSound(pad.freq, pad.type, 0.25)}
                className={`p-6 rounded-xl bg-black/60 border ${pad.color} text-center group hover:scale-105 active:scale-95 transition-all shadow-lg hover:shadow-cyan-500/20`}
              >
                <div className="text-white font-bold text-sm mb-1 group-hover:text-cyan-300">
                  {pad.name}
                </div>
                <div className="text-[11px] text-gray-500 font-mono">
                  {pad.freq}Hz // {pad.type}
                </div>
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
