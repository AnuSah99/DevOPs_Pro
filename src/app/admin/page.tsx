"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { usePortfolio } from "@/lib/portfolioContext";
import {
  Shield,
  User,
  FolderGit2,
  Milestone,
  Mail,
  Plus,
  Trash2,
  Save,
  RotateCcw,
  LogOut,
  ExternalLink,
  Check,
  Eye,
} from "lucide-react";

export default function AdminDashboardPage() {
  const {
    profile,
    projects,
    milestones,
    messages,
    isAdmin,
    logoutAdmin,
    updateProfile,
    addProject,
    updateProject,
    deleteProject,
    updateMilestone,
    resetToDefaults,
  } = usePortfolio();

  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"profile" | "projects" | "milestones" | "messages">("projects");
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Profile form state
  const [profileForm, setProfileForm] = useState(profile);

  // New project modal / form state
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [newProject, setNewProject] = useState({
    title: "",
    category: "WEB APPLICATION",
    status: "LIVE PRODUCTION",
    description: "",
    technologies: "React, TypeScript, Tailwind CSS",
    viewUrl: "",
    githubUrl: "https://github.com/Anusah99",
    featured: true,
    highlights: "Modern UI, High Performance",
  });

  useEffect(() => {
    setProfileForm(profile);
  }, [profile]);

  // Auth gate
  useEffect(() => {
    if (!isAdmin) {
      router.push("/admin/login");
    }
  }, [isAdmin, router]);

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#050505] text-white font-mono flex items-center justify-center p-4">
        <p className="text-gray-400">AUTHENTICATING SESSION CLEARANCE...</p>
      </div>
    );
  }

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(profileForm);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.title.trim()) return;

    addProject({
      title: newProject.title,
      category: newProject.category,
      status: newProject.status,
      description: newProject.description,
      technologies: newProject.technologies.split(",").map((s) => s.trim()).filter(Boolean),
      viewUrl: newProject.viewUrl || "/#projects",
      githubUrl: newProject.githubUrl || "https://github.com/Anusah99",
      featured: newProject.featured,
      highlights: newProject.highlights.split(",").map((s) => s.trim()).filter(Boolean),
    });

    setIsAddingProject(false);
    setNewProject({
      title: "",
      category: "WEB APPLICATION",
      status: "LIVE PRODUCTION",
      description: "",
      technologies: "React, TypeScript, Tailwind CSS",
      viewUrl: "",
      githubUrl: "https://github.com/Anusah99",
      featured: true,
      highlights: "Modern UI, High Performance",
    });

    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-mono flex flex-col">
      {/* Top Header */}
      <header className="h-16 border-b border-cyan-500/20 bg-[#080d1a] px-4 sm:px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center font-bold text-black text-xs">
            AS
          </div>
          <div>
            <h1 className="font-bold text-sm text-white flex items-center gap-2">
              <span>ANU.OS // WEB CMS DASHBOARD</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/40 text-emerald-300">
                ACTIVE
              </span>
            </h1>
            <p className="text-[10px] text-gray-400">EDIT PORTFOLIO LIVE FROM BROWSER</p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <Link
            href="/"
            target="_blank"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-cyan-300 border border-white/10"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>VIEW LIVE SITE</span>
          </Link>

          <button
            onClick={() => {
              logoutAdmin();
              router.push("/");
            }}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-950/40 border border-red-500/30 text-red-300 hover:bg-red-950/60 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>LOGOUT</span>
          </button>
        </div>
      </header>

      {/* Main CMS Layout */}
      <div className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

        {/* Sidebar Nav Tabs */}
        <div className="lg:col-span-3 space-y-2">
          {[
            { id: "projects", label: `Projects (${projects.length})`, icon: <FolderGit2 className="w-4 h-4" /> },
            { id: "profile", label: "Profile & Identity", icon: <User className="w-4 h-4" /> },
            { id: "milestones", label: `Journey (${milestones.length})`, icon: <Milestone className="w-4 h-4" /> },
            { id: "messages", label: `Inbox Messages (${messages.length})`, icon: <Mail className="w-4 h-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-xl text-left text-xs font-bold transition-all ${
                activeTab === tab.id
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-md shadow-cyan-950/40"
                  : "bg-black/40 border border-white/10 text-gray-400 hover:text-white"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}

          <div className="pt-4 border-t border-white/10">
            <button
              onClick={() => {
                if (confirm("Reset all portfolio data to factory defaults?")) {
                  resetToDefaults();
                  setSaveSuccess(true);
                  setTimeout(() => setSaveSuccess(false), 2000);
                }
              }}
              className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-black/60 border border-white/10 text-gray-400 hover:text-white text-xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>RESET TO DEFAULTS</span>
            </button>
          </div>
        </div>

        {/* Content Panel */}
        <div className="lg:col-span-9">
          {saveSuccess && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs flex items-center gap-2 animate-fadeIn">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>SYNCED SUCCESSFULLY! All changes are live on the portfolio.</span>
            </div>
          )}

          {/* TAB 1: PROJECTS MANAGER */}
          {activeTab === "projects" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <FolderGit2 className="w-4 h-4 text-cyan-400" />
                  <span>MANAGE SHOWCASED PROJECTS</span>
                </h2>
                <button
                  onClick={() => setIsAddingProject(!isAddingProject)}
                  className="px-3.5 py-1.5 rounded-lg bg-cyan-400 text-black font-bold text-xs flex items-center gap-1.5 hover:bg-cyan-300 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>{isAddingProject ? "CANCEL" : "ADD NEW PROJECT"}</span>
                </button>
              </div>

              {/* Add Project Form Drawer */}
              {isAddingProject && (
                <form
                  onSubmit={handleCreateProject}
                  className="p-5 rounded-2xl glass-panel border border-cyan-500/30 space-y-4"
                >
                  <h3 className="text-sm font-bold text-cyan-300">PUBLISH NEW PROJECT</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">PROJECT TITLE *</label>
                      <input
                        type="text"
                        required
                        value={newProject.title}
                        onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                        className="w-full bg-black/60 border border-white/15 rounded-lg p-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">CATEGORY</label>
                      <input
                        type="text"
                        value={newProject.category}
                        onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                        className="w-full bg-black/60 border border-white/15 rounded-lg p-2 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-gray-400 mb-1">DESCRIPTION *</label>
                    <textarea
                      rows={2}
                      required
                      value={newProject.description}
                      onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                      className="w-full bg-black/60 border border-white/15 rounded-lg p-2 text-xs text-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">VIEW URL (PATH OR LINK) *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. /projects/cyber-code-editor or https://..."
                        value={newProject.viewUrl}
                        onChange={(e) => setNewProject({ ...newProject, viewUrl: e.target.value })}
                        className="w-full bg-black/60 border border-white/15 rounded-lg p-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">GITHUB REPO URL</label>
                      <input
                        type="text"
                        value={newProject.githubUrl}
                        onChange={(e) => setNewProject({ ...newProject, githubUrl: e.target.value })}
                        className="w-full bg-black/60 border border-white/15 rounded-lg p-2 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-gray-400 mb-1">TECHNOLOGIES (COMMA-SEPARATED)</label>
                    <input
                      type="text"
                      value={newProject.technologies}
                      onChange={(e) => setNewProject({ ...newProject, technologies: e.target.value })}
                      className="w-full bg-black/60 border border-white/15 rounded-lg p-2 text-xs text-white"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-lg bg-emerald-400 text-black font-bold text-xs"
                  >
                    SAVE &amp; PUBLISH PROJECT
                  </button>
                </form>
              )}

              {/* Projects List */}
              <div className="space-y-4">
                {projects.map((proj) => (
                  <div
                    key={proj.id}
                    className="p-4 rounded-xl glass-panel border border-white/10 space-y-3"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] text-cyan-400 font-bold uppercase">
                          {proj.category}
                        </span>
                        <h3 className="text-sm font-bold text-white">{proj.title}</h3>
                        <p className="text-xs text-gray-400 mt-1">{proj.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Link
                          href={proj.viewUrl}
                          target={proj.viewUrl.startsWith("#") ? "_self" : "_blank"}
                          className="p-1.5 rounded bg-white/5 text-cyan-300 hover:text-white"
                          title="Open View URL"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          onClick={() => deleteProject(proj.id)}
                          className="p-1.5 rounded bg-red-950/40 text-red-400 hover:text-red-300"
                          title="Delete Project"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/5 text-xs text-gray-400">
                      <div className="flex flex-wrap gap-1">
                        {proj.technologies.map((t) => (
                          <span key={t} className="px-1.5 py-0.5 rounded bg-black/60 text-[10px] text-gray-300">
                            {t}
                          </span>
                        ))}
                      </div>
                      <span className="text-cyan-400 text-[11px]">{proj.viewUrl}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: PROFILE & IDENTITY */}
          {activeTab === "profile" && (
            <form
              onSubmit={handleSaveProfile}
              className="p-6 rounded-2xl glass-panel border border-cyan-500/30 space-y-4"
            >
              <h2 className="text-base font-bold text-white flex items-center gap-2 pb-3 border-b border-white/10">
                <User className="w-4 h-4 text-cyan-400" />
                <span>EDIT PROFILE IDENTITY</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">DEVELOPER NAME</label>
                  <input
                    type="text"
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    className="w-full bg-black/60 border border-white/15 rounded-lg p-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">PRIMARY EMAIL</label>
                  <input
                    type="email"
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    className="w-full bg-black/60 border border-white/15 rounded-lg p-2 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-1">ROLE / TITLE</label>
                <input
                  type="text"
                  value={profileForm.role}
                  onChange={(e) => setProfileForm({ ...profileForm, role: e.target.value })}
                  className="w-full bg-black/60 border border-white/15 rounded-lg p-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-1">HERO TYPED TAGLINE</label>
                <input
                  type="text"
                  value={profileForm.tagline}
                  onChange={(e) => setProfileForm({ ...profileForm, tagline: e.target.value })}
                  className="w-full bg-black/60 border border-white/15 rounded-lg p-2 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">GITHUB PROFILE URL</label>
                  <input
                    type="text"
                    value={profileForm.github}
                    onChange={(e) => setProfileForm({ ...profileForm, github: e.target.value })}
                    className="w-full bg-black/60 border border-white/15 rounded-lg p-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">INSTAGRAM URL</label>
                  <input
                    type="text"
                    value={profileForm.instagram}
                    onChange={(e) => setProfileForm({ ...profileForm, instagram: e.target.value })}
                    className="w-full bg-black/60 border border-white/15 rounded-lg p-2 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-1">ABOUT NARRATIVE PARAGRAPH 1</label>
                <textarea
                  rows={2}
                  value={profileForm.bio1}
                  onChange={(e) => setProfileForm({ ...profileForm, bio1: e.target.value })}
                  className="w-full bg-black/60 border border-white/15 rounded-lg p-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-1">ABOUT NARRATIVE PARAGRAPH 2</label>
                <textarea
                  rows={2}
                  value={profileForm.bio2}
                  onChange={(e) => setProfileForm({ ...profileForm, bio2: e.target.value })}
                  className="w-full bg-black/60 border border-white/15 rounded-lg p-2 text-xs text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-cyan-400 text-black font-bold text-xs flex items-center justify-center gap-2 hover:bg-cyan-300 transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>SAVE PROFILE MODIFICATIONS</span>
              </button>
            </form>
          )}

          {/* TAB 3: MILESTONES */}
          {activeTab === "milestones" && (
            <div className="space-y-4">
              <h2 className="text-base font-bold text-white flex items-center gap-2 pb-3 border-b border-white/10">
                <Milestone className="w-4 h-4 text-cyan-400" />
                <span>EDIT JOURNEY TIMELINE</span>
              </h2>

              {milestones.map((m) => (
                <div
                  key={m.id}
                  className="p-4 rounded-xl glass-panel border border-white/10 space-y-2"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-cyan-400 font-bold">{m.phase}</span>
                    <input
                      type="text"
                      value={m.status}
                      onChange={(e) => updateMilestone(m.id, { status: e.target.value })}
                      className="bg-black/60 border border-white/10 rounded px-2 py-0.5 text-[11px] text-emerald-400"
                    />
                  </div>
                  <input
                    type="text"
                    value={m.title}
                    onChange={(e) => updateMilestone(m.id, { title: e.target.value })}
                    className="w-full bg-transparent border-b border-white/10 font-bold text-sm text-white focus:outline-none"
                  />
                  <textarea
                    rows={2}
                    value={m.description}
                    onChange={(e) => updateMilestone(m.id, { description: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded p-2 text-xs text-gray-300"
                  />
                </div>
              ))}
            </div>
          )}

          {/* TAB 4: MESSAGES INBOX */}
          {activeTab === "messages" && (
            <div className="space-y-4">
              <h2 className="text-base font-bold text-white flex items-center gap-2 pb-3 border-b border-white/10">
                <Mail className="w-4 h-4 text-cyan-400" />
                <span>INCOMING CONTACT TRANSMISSIONS</span>
              </h2>

              {messages.length === 0 ? (
                <div className="p-8 text-center glass-panel rounded-xl text-gray-500 text-xs">
                  NO TRANSMISSIONS LOGGED YET. Form submissions from visitors will appear here.
                </div>
              ) : (
                messages.map((msg) => (
                  <div
                    key={msg.id}
                    className="p-4 rounded-xl glass-panel border border-white/10 space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between text-gray-400">
                      <span className="font-bold text-cyan-300">{msg.name} ({msg.email})</span>
                      <span>{msg.date}</span>
                    </div>
                    {msg.subject && (
                      <div className="text-white font-semibold">Subject: {msg.subject}</div>
                    )}
                    <p className="text-gray-300 bg-black/60 p-3 rounded-lg border border-white/5">
                      {msg.message}
                    </p>
                  </div>
                ))
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
