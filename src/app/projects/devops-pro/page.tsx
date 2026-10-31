"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useSound } from "@/lib/soundContext";
import {
  ArrowLeft,
  Server,
  Terminal,
  Activity,
  Play,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Cpu,
  Layers,
  GitBranch,
  ShieldCheck,
  Box,
  Cloud,
  Check,
  RefreshCw,
  Zap,
  Globe,
  Radio,
} from "lucide-react";
import { GithubIcon } from "@/components/icons/BrandIcons";

interface PipelineStage {
  id: string;
  name: string;
  category: string;
  duration: string;
  status: "idle" | "running" | "passed" | "failed";
  details: string;
}

interface PodItem {
  id: string;
  name: string;
  replicas: number;
  cpu: number;
  memory: number;
  status: "HEALTHY" | "SCALING" | "RESTARTING";
  uptime: string;
}

export default function DevOpsProPage() {
  const { playClick, playHover, playSuccess } = useSound();

  const [activeEnv, setActiveEnv] = useState<"PRODUCTION" | "STAGING" | "CANARY">("PRODUCTION");
  const [pipelineRunning, setPipelineRunning] = useState(false);
  const [pipelineProgress, setPipelineProgress] = useState(100);
  const [activeStageIndex, setActiveStageIndex] = useState(-1);
  const [autoRollback, setAutoRollback] = useState(true);

  // Cluster Metrics State
  const [clusterCpu, setClusterCpu] = useState(28.4);
  const [clusterMemory, setClusterMemory] = useState(62.1);
  const [ingressRps, setIngressRps] = useState(1482);
  const [errorRate, setErrorRate] = useState(0.002);

  // Pipeline Stages
  const [stages, setStages] = useState<PipelineStage[]>([
    {
      id: "source",
      name: "01 // GIT SYNC",
      category: "VCS PULL",
      duration: "1.2s",
      status: "passed",
      details: "Branch main synced from AnuSah99/DevOPs_Pro",
    },
    {
      id: "lint_build",
      name: "02 // TURBOPACK BUILD",
      category: "NEXT.JS 16",
      duration: "4.8s",
      status: "passed",
      details: "Static prerendering 100% complete, zero chunk warnings",
    },
    {
      id: "security",
      name: "03 // SAST SECURITY SCAN",
      category: "DEFENSIVE VULN CHECK",
      duration: "2.1s",
      status: "passed",
      details: "No dependency CVEs, secret leak scan passed",
    },
    {
      id: "container",
      name: "04 // DOCKER CONTAINERIZE",
      category: "OCI MULTI-STAGE",
      duration: "5.4s",
      status: "passed",
      details: "Image digest sha256:devops-pro-v2.6 cached & signed",
    },
    {
      id: "deploy",
      name: "05 // KUBERNETES ROLLOUT",
      category: "ROLLING UPDATE",
      duration: "3.7s",
      status: "passed",
      details: "Pods swapped with zero downtime, traffic ingress healthy",
    },
  ]);

  // Terminal Logs
  const [logs, setLogs] = useState<string[]>([
    "[19:15:02] [INGRESS-GATEWAY] Ingress controller routing 100% traffic to production cluster.",
    "[19:15:05] [K8S-AUTOSCALER] HPA target achieved: 13 pods active across 3 nodes.",
    "[19:15:10] [MONITORING] Prometheus telemetry polling OK: P99 latency at 14.2ms.",
    "[19:15:18] [SECURITY] Edge TLS 1.3 handshake verified. SSL certificates active.",
    "[19:15:22] [SYSTEM-READY] Cluster healthy. Pipeline ready for automated trigger.",
  ]);

  // Cluster Pods
  const [pods, setPods] = useState<PodItem[]>([
    { id: "p1", name: "devops-pro-api-gateway", replicas: 3, cpu: 14, memory: 142, status: "HEALTHY", uptime: "14d 6h" },
    { id: "p2", name: "portfolio-frontend-web", replicas: 4, cpu: 22, memory: 280, status: "HEALTHY", uptime: "14d 6h" },
    { id: "p3", name: "auth-guard-service", replicas: 2, cpu: 8, memory: 98, status: "HEALTHY", uptime: "8d 12h" },
    { id: "p4", name: "telemetry-collector-agent", replicas: 2, cpu: 18, memory: 160, status: "HEALTHY", uptime: "22d 4h" },
    { id: "p5", name: "redis-distributed-cache", replicas: 2, cpu: 6, memory: 74, status: "HEALTHY", uptime: "30d 1h" },
  ]);

  const terminalRef = useRef<HTMLDivElement>(null);

  // Auto-scroll terminal
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs]);

  // Live Jitter Metrics Simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setClusterCpu((prev) => +(prev + (Math.random() * 2 - 1)).toFixed(1));
      setClusterMemory((prev) => +(prev + (Math.random() * 0.8 - 0.4)).toFixed(1));
      setIngressRps((prev) => Math.max(800, Math.floor(prev + (Math.random() * 40 - 20))));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Run CI/CD Pipeline Simulation
  const handleTriggerPipeline = () => {
    if (pipelineRunning) return;
    playClick();
    setPipelineRunning(true);
    setPipelineProgress(5);
    setActiveStageIndex(0);

    const now = new Date().toLocaleTimeString();
    setLogs((prev) => [
      ...prev,
      `[${now}] [CI/CD TRIGGER] Manual pipeline execution initiated by operator Anu Sah.`,
      `[${now}] [STAGE-01] Fetching git commit refs from origin/main...`,
    ]);

    // Reset stages to idle
    setStages((prev) => prev.map((s, idx) => ({ ...s, status: idx === 0 ? "running" : "idle" })));

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      if (currentStep < 5) {
        setActiveStageIndex(currentStep);
        setPipelineProgress((currentStep + 1) * 20);
        setStages((prev) =>
          prev.map((s, idx) => ({
            ...s,
            status: idx < currentStep ? "passed" : idx === currentStep ? "running" : "idle",
          }))
        );

        const time = new Date().toLocaleTimeString();
        const stageMessages = [
          `[${time}] [STAGE-02] Compiling Next.js Turbopack client & server bundles...`,
          `[${time}] [STAGE-03] Running OWASP automated vulnerability scanner... Clean.`,
          `[${time}] [STAGE-04] Building multi-stage OCI Docker container. Compression 68%.`,
          `[${time}] [STAGE-05] Orchestrating rolling zero-downtime deployment on Kubernetes...`,
        ];
        setLogs((prev) => [...prev, stageMessages[currentStep - 1]]);
      } else {
        clearInterval(interval);
        setStages((prev) => prev.map((s) => ({ ...s, status: "passed" })));
        setPipelineProgress(100);
        setPipelineRunning(false);
        setActiveStageIndex(-1);
        playSuccess();
        const finishTime = new Date().toLocaleTimeString();
        setLogs((prev) => [
          ...prev,
          `[${finishTime}] [PIPELINE SUCCESS] All 5 pipeline stages verified. Deployment live on ${activeEnv}!`,
        ]);
      }
    }, 1800);
  };

  // Pod Scale Action
  const handleScalePod = (id: string, delta: number) => {
    playClick();
    setPods((prev) =>
      prev.map((pod) => {
        if (pod.id === id) {
          const newReplicas = Math.max(1, Math.min(8, pod.replicas + delta));
          return { ...pod, replicas: newReplicas, status: "SCALING" };
        }
        return pod;
      })
    );

    setTimeout(() => {
      setPods((prev) =>
        prev.map((pod) => (pod.id === id ? { ...pod, status: "HEALTHY" } : pod))
      );
      playSuccess();
    }, 1200);
  };

  // Rollback Action
  const handleRollback = () => {
    playClick();
    const time = new Date().toLocaleTimeString();
    setLogs((prev) => [
      ...prev,
      `[${time}] [ROLLBACK] Reverting cluster state to previous stable SHA digest...`,
      `[${time}] [ROLLBACK] Ingress swapped. Previous release restored successfully.`,
    ]);
    playSuccess();
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-mono flex flex-col cyber-grid">
      {/* Top Application Bar */}
      <header className="border-b border-cyan-500/20 bg-black/80 backdrop-blur-md px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <Link
            href="/#projects"
            onClick={playClick}
            onMouseEnter={playHover}
            className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-cyan-300 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-500/40 transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>BACK TO PORTFOLIO</span>
          </Link>
          <div className="h-4 w-px bg-white/20 hidden sm:block" />
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-black font-extrabold text-xs">
              <Server className="w-4 h-4 text-black" />
            </div>
            <div>
              <span className="font-extrabold text-sm tracking-wider text-white">
                DevOPs<span className="text-cyan-400">_Pro</span>
              </span>
              <span className="ml-2 text-[10px] text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-2 py-0.5 rounded font-bold">
                CI/CD &amp; CLOUD MATRIX
              </span>
            </div>
          </div>
        </div>

        {/* Global Controls */}
        <div className="flex items-center gap-3 text-xs">
          {/* Environment Switcher */}
          <div className="flex items-center p-1 rounded-lg bg-black/60 border border-white/10">
            {(["PRODUCTION", "STAGING", "CANARY"] as const).map((env) => (
              <button
                key={env}
                onClick={() => {
                  playClick();
                  setActiveEnv(env);
                }}
                className={`px-2.5 py-1 rounded text-[10px] font-bold transition-all ${
                  activeEnv === env
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-sm shadow-cyan-500/30"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {env}
              </button>
            ))}
          </div>

          {/* Trigger Pipeline Button */}
          <button
            onClick={handleTriggerPipeline}
            disabled={pipelineRunning}
            onMouseEnter={playHover}
            className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-extrabold text-xs flex items-center gap-1.5 transition-all shadow-lg shadow-cyan-500/20 disabled:opacity-50"
          >
            <Play className={`w-3.5 h-3.5 ${pipelineRunning ? "animate-spin" : ""}`} />
            <span>{pipelineRunning ? "RUNNING..." : "TRIGGER PIPELINE"}</span>
          </button>

          {/* Rollback Button */}
          <button
            onClick={handleRollback}
            onMouseEnter={playHover}
            className="px-3 py-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/40 border border-red-500/30 text-red-300 text-xs flex items-center gap-1.5 transition-all"
            title="Rollback Deployment"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">ROLLBACK</span>
          </button>

          {/* Public GitHub Repo */}
          <a
            href="https://github.com/AnuSah99/DevOPs_Pro"
            target="_blank"
            rel="noopener noreferrer"
            onClick={playClick}
            className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white text-xs flex items-center gap-1.5 transition-all"
          >
            <GithubIcon className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">REPO</span>
          </a>
        </div>
      </header>

      {/* Main Workspace Body */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-6">

        {/* 1. Cluster Status Telemetry Row */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl glass-panel border border-cyan-500/20 cyber-corner flex flex-col justify-between">
            <div className="flex items-center justify-between text-gray-400 text-xs mb-2">
              <span className="flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-cyan-400" />
                <span>CLUSTER CPU</span>
              </span>
              <span className="text-emerald-400 text-[10px]">OPTIMAL</span>
            </div>
            <div className="text-2xl font-black text-white flex items-baseline gap-1">
              <span>{clusterCpu}</span>
              <span className="text-xs text-cyan-400">%</span>
            </div>
            <div className="w-full bg-white/10 h-1.5 rounded-full mt-3 overflow-hidden">
              <div
                className="bg-cyan-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${clusterCpu}%` }}
              />
            </div>
          </div>

          <div className="p-4 rounded-xl glass-panel border border-purple-500/20 cyber-corner flex flex-col justify-between">
            <div className="flex items-center justify-between text-gray-400 text-xs mb-2">
              <span className="flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-purple-400" />
                <span>RAM ALLOCATION</span>
              </span>
              <span className="text-purple-300 text-[10px]">16GB NODE</span>
            </div>
            <div className="text-2xl font-black text-white flex items-baseline gap-1">
              <span>{clusterMemory}</span>
              <span className="text-xs text-purple-400">%</span>
            </div>
            <div className="w-full bg-white/10 h-1.5 rounded-full mt-3 overflow-hidden">
              <div
                className="bg-purple-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${clusterMemory}%` }}
              />
            </div>
          </div>

          <div className="p-4 rounded-xl glass-panel border border-blue-500/20 cyber-corner flex flex-col justify-between">
            <div className="flex items-center justify-between text-gray-400 text-xs mb-2">
              <span className="flex items-center gap-1.5">
                <Radio className="w-4 h-4 text-blue-400" />
                <span>INGRESS RPS</span>
              </span>
              <span className="text-blue-300 text-[10px]">LIVE</span>
            </div>
            <div className="text-2xl font-black text-white flex items-baseline gap-1">
              <span>{ingressRps.toLocaleString()}</span>
              <span className="text-xs text-blue-400">req/s</span>
            </div>
            <div className="text-[10px] text-gray-500 mt-3 font-mono">
              LATENCY P99: 14.2ms
            </div>
          </div>

          <div className="p-4 rounded-xl glass-panel border border-emerald-500/20 cyber-corner flex flex-col justify-between">
            <div className="flex items-center justify-between text-gray-400 text-xs mb-2">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>HEALTH STATUS</span>
              </span>
              <span className="text-emerald-400 text-[10px]">99.99%</span>
            </div>
            <div className="text-2xl font-black text-emerald-400 flex items-baseline gap-1">
              <span>ZERO FAILS</span>
            </div>
            <div className="text-[10px] text-gray-500 mt-3 font-mono">
              ERROR RATE: {errorRate}%
            </div>
          </div>
        </section>

        {/* 2. Visual CI/CD Pipeline Simulator */}
        <section className="p-5 sm:p-6 rounded-2xl glass-panel border border-cyan-500/30 cyber-corner space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
            <div>
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <GitBranch className="w-4 h-4 text-cyan-400" />
                <span>CI/CD PIPELINE EXECUTION ENGINE</span>
              </h2>
              <p className="text-xs text-gray-400">
                Automated continuous integration, vulnerability scanning, container build, and K8s rollout.
              </p>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="text-gray-400">PROGRESS:</span>
              <span className="text-cyan-300 font-bold">{pipelineProgress}%</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-black/60 h-2 rounded-full overflow-hidden border border-white/5">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 transition-all duration-500"
              style={{ width: `${pipelineProgress}%` }}
            />
          </div>

          {/* Pipeline Stages Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {stages.map((stg, idx) => (
              <div
                key={stg.id}
                className={`p-3.5 rounded-xl border transition-all flex flex-col justify-between ${
                  stg.status === "running"
                    ? "bg-cyan-950/40 border-cyan-400 shadow-[0_0_15px_rgba(0,245,255,0.2)]"
                    : stg.status === "passed"
                    ? "bg-black/50 border-emerald-500/30"
                    : "bg-black/30 border-white/10 opacity-70"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono mb-1.5">
                    <span className="text-gray-400">{stg.category}</span>
                    <span
                      className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                        stg.status === "running"
                          ? "bg-cyan-500/20 text-cyan-300 animate-pulse"
                          : stg.status === "passed"
                          ? "bg-emerald-950/60 text-emerald-300 border border-emerald-500/40"
                          : "bg-white/5 text-gray-500"
                      }`}
                    >
                      {stg.status.toUpperCase()}
                    </span>
                  </div>
                  <h4 className="font-bold text-xs text-white mb-1.5">{stg.name}</h4>
                  <p className="text-[11px] text-gray-400 leading-snug">{stg.details}</p>
                </div>

                <div className="pt-2 mt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-gray-500">
                  <span>TIME: {stg.duration}</span>
                  {stg.status === "passed" && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Split: Cluster Pods & Live Terminal Stream */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          {/* Left: Kubernetes Microservices Pod Monitor */}
          <div className="lg:col-span-6 p-5 sm:p-6 rounded-2xl glass-panel border border-white/10 cyber-corner space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs">
              <span className="font-bold text-white flex items-center gap-2">
                <Box className="w-4 h-4 text-cyan-400" />
                <span>KUBERNETES MICROSERVICE PODS</span>
              </span>
              <span className="text-gray-500">NAMESPACE: DEFAULT</span>
            </div>

            <div className="space-y-2.5">
              {pods.map((pod) => (
                <div
                  key={pod.id}
                  className="p-3 rounded-xl bg-black/60 border border-white/5 hover:border-cyan-500/30 transition-all flex items-center justify-between text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 font-bold text-white">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>{pod.name}</span>
                    </div>
                    <div className="text-[10px] text-gray-400 font-mono">
                      CPU: {pod.cpu}% • RAM: {pod.memory}MB • UPTIME: {pod.uptime}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 font-mono">
                    <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30 text-cyan-300">
                      {pod.replicas} REPLICAS
                    </span>
                    <button
                      onClick={() => handleScalePod(pod.id, 1)}
                      className="w-6 h-6 rounded bg-white/5 hover:bg-cyan-500/20 text-gray-300 hover:text-white flex items-center justify-center font-bold"
                      title="Scale Replicas Up"
                    >
                      +
                    </button>
                    <button
                      onClick={() => handleScalePod(pod.id, -1)}
                      className="w-6 h-6 rounded bg-white/5 hover:bg-cyan-500/20 text-gray-300 hover:text-white flex items-center justify-center font-bold"
                      title="Scale Replicas Down"
                    >
                      -
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Live Pipeline Terminal / Stdout Stream */}
          <div className="lg:col-span-6 p-5 sm:p-6 rounded-2xl glass-panel border border-cyan-500/30 cyber-corner space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs">
              <span className="font-bold text-white flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span>STDOUT TELEMETRY &amp; PIPELINE LOGS</span>
              </span>
              <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                LIVE STREAM
              </span>
            </div>

            <div
              ref={terminalRef}
              className="h-64 sm:h-72 overflow-y-auto bg-black/90 p-3.5 rounded-xl border border-white/10 font-mono text-[11px] leading-relaxed text-gray-300 space-y-1.5"
            >
              {logs.map((log, i) => (
                <div key={i} className="hover:text-cyan-300 transition-colors">
                  <span className="text-cyan-500/70">{log.substring(0, 10)}</span>
                  <span>{log.substring(10)}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-gray-400">
              <div className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-cyan-400" />
                <span>REPO: AnuSah99/DevOPs_Pro</span>
              </div>
              <button
                onClick={() => setLogs([])}
                className="text-[10px] text-gray-500 hover:text-white transition-colors"
              >
                CLEAR LOGS
              </button>
            </div>
          </div>

        </section>

      </main>

      {/* Footer Info Bar */}
      <footer className="border-t border-white/10 bg-black/80 px-4 sm:px-8 py-3 text-[11px] text-gray-500 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>DEVOPS PRO SYSTEM // VERIFIED FOR VERCEL &amp; GITHUB PAGES</span>
        </div>
        <div>
          <span>AUTHOR: ANU SAH</span> • <a href="https://github.com/AnuSah99/DevOPs_Pro" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">github.com/AnuSah99/DevOPs_Pro</a>
        </div>
      </footer>
    </div>
  );
}
