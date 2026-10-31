"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, CheckCircle2, AlertTriangle, Layers, Trash2, ArrowRight } from "lucide-react";

interface CyberTask {
  id: string;
  title: string;
  column: "backlog" | "in_progress" | "review" | "deployed";
  priority: "CRITICAL" | "HIGH" | "NORMAL";
  tag: string;
}

const DEFAULT_TASKS: CyberTask[] = [
  { id: "t1", title: "Compile Next.js 16 WebGL Shaders", column: "deployed", priority: "HIGH", tag: "3D_GRAPHICS" },
  { id: "t2", title: "Refactor Web Audio Synthesizer Oscillators", column: "deployed", priority: "NORMAL", tag: "DSP_AUDIO" },
  { id: "t3", title: "Build Live Kanban Task OS Route", column: "in_progress", priority: "CRITICAL", tag: "FRONTEND" },
  { id: "t4", title: "Optimize Vercel Production Bundle Size", column: "in_progress", priority: "HIGH", tag: "DEVOPS" },
  { id: "t5", title: "Add Web Authentication to Admin Portal", column: "review", priority: "CRITICAL", tag: "SECURITY" },
  { id: "t6", title: "Explore Rust WebAssembly Micro-modules", column: "backlog", priority: "NORMAL", tag: "RESEARCH" },
];

export default function CyberTaskOs() {
  const [tasks, setTasks] = useState<CyberTask[]>(DEFAULT_TASKS);
  const [newTitle, setNewTitle] = useState("");
  const [newPriority, setNewPriority] = useState<"CRITICAL" | "HIGH" | "NORMAL">("HIGH");
  const [newTag, setNewTag] = useState("CORE_SYS");

  useEffect(() => {
    const saved = localStorage.getItem("anu_cyber_tasks");
    if (saved) {
      try {
        setTasks(JSON.parse(saved));
      } catch {
        // Fallback
      }
    }
  }, []);

  const saveTasks = (updated: CyberTask[]) => {
    setTasks(updated);
    localStorage.setItem("anu_cyber_tasks", JSON.stringify(updated));
  };

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newTask: CyberTask = {
      id: `task-${Date.now()}`,
      title: newTitle.trim(),
      column: "backlog",
      priority: newPriority,
      tag: newTag.toUpperCase().replace(/\s+/g, "_"),
    };

    saveTasks([newTask, ...tasks]);
    setNewTitle("");
  };

  const moveTask = (id: string, direction: "next" | "prev") => {
    const order: CyberTask["column"][] = ["backlog", "in_progress", "review", "deployed"];
    const updated = tasks.map((t) => {
      if (t.id !== id) return t;
      const currentIdx = order.indexOf(t.column);
      const nextIdx = direction === "next" ? Math.min(order.length - 1, currentIdx + 1) : Math.max(0, currentIdx - 1);
      return { ...t, column: order[nextIdx] };
    });
    saveTasks(updated);
  };

  const deleteTask = (id: string) => {
    saveTasks(tasks.filter((t) => t.id !== id));
  };

  const COLUMNS = [
    { key: "backlog", title: "01 // BACKLOG", color: "border-gray-500/40" },
    { key: "in_progress", title: "02 // IN PROGRESS", color: "border-cyan-500/40" },
    { key: "review", title: "03 // CODE REVIEW", color: "border-purple-500/40" },
    { key: "deployed", title: "04 // DEPLOYED", color: "border-emerald-500/40" },
  ] as const;

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
            <Layers className="w-4 h-4 text-cyan-400" />
            <span>TASK_MATRIX // KANBAN OS</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-gray-400">TOTAL TASKS:</span>
          <span className="text-cyan-300 font-bold">{tasks.length}</span>
        </div>
      </header>

      {/* Main Board */}
      <div className="flex-1 max-w-7xl mx-auto w-full p-4 space-y-6">

        {/* Task Creation Form */}
        <form
          onSubmit={addTask}
          className="p-4 rounded-xl glass-panel border border-cyan-500/30 flex flex-wrap items-center gap-3"
        >
          <input
            type="text"
            placeholder="Input new cyber task specification..."
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="flex-1 min-w-[240px] bg-black/60 border border-white/10 focus:border-cyan-400 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
          />

          <select
            value={newPriority}
            onChange={(e) => setNewPriority(e.target.value as any)}
            className="bg-black/60 border border-white/10 rounded-lg px-3 py-2 text-xs text-gray-300 focus:outline-none"
          >
            <option value="CRITICAL">PRIORITY: CRITICAL</option>
            <option value="HIGH">PRIORITY: HIGH</option>
            <option value="NORMAL">PRIORITY: NORMAL</option>
          </select>

          <input
            type="text"
            placeholder="TAG (e.g. ARCHITECTURE)"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            className="w-32 bg-black/60 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
          />

          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-cyan-400 text-black font-bold text-xs flex items-center gap-1 hover:bg-cyan-300 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>SPAWN TASK</span>
          </button>
        </form>

        {/* 4 Kanban Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
          {COLUMNS.map((col) => {
            const colTasks = tasks.filter((t) => t.column === col.key);
            return (
              <div
                key={col.key}
                className={`p-4 rounded-xl glass-panel border ${col.color} space-y-3 min-h-[460px] flex flex-col`}
              >
                <div className="flex items-center justify-between pb-2 border-b border-white/10 text-xs">
                  <span className="font-bold text-gray-200">{col.title}</span>
                  <span className="px-2 py-0.5 rounded bg-black/60 text-cyan-400 text-[10px] font-bold">
                    {colTasks.length}
                  </span>
                </div>

                <div className="space-y-3 flex-1">
                  {colTasks.length === 0 ? (
                    <div className="text-gray-600 text-xs text-center pt-8">
                      NO ACTIVE NODES
                    </div>
                  ) : (
                    colTasks.map((task) => (
                      <div
                        key={task.id}
                        className="p-3.5 rounded-lg bg-black/60 border border-white/10 hover:border-cyan-500/40 transition-all space-y-2 group"
                      >
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="text-cyan-400 font-mono">#{task.tag}</span>
                          <span
                            className={`px-1.5 py-0.5 rounded font-bold ${
                              task.priority === "CRITICAL"
                                ? "bg-red-950/80 text-red-400 border border-red-500/30"
                                : task.priority === "HIGH"
                                ? "bg-yellow-950/80 text-yellow-400 border border-yellow-500/30"
                                : "bg-white/5 text-gray-400"
                            }`}
                          >
                            {task.priority}
                          </span>
                        </div>

                        <p className="text-xs text-gray-200 leading-relaxed font-semibold">
                          {task.title}
                        </p>

                        <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs">
                          <button
                            onClick={() => deleteTask(task.id)}
                            className="text-gray-600 hover:text-red-400 transition-colors"
                            title="Delete Task"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>

                          <div className="flex items-center gap-1">
                            {col.key !== "backlog" && (
                              <button
                                onClick={() => moveTask(task.id, "prev")}
                                className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/15 text-[10px] text-gray-300"
                              >
                                &lt;
                              </button>
                            )}
                            {col.key !== "deployed" && (
                              <button
                                onClick={() => moveTask(task.id, "next")}
                                className="px-2 py-0.5 rounded bg-cyan-500/20 hover:bg-cyan-500/40 text-[10px] text-cyan-300 font-bold"
                              >
                                NEXT &gt;
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
