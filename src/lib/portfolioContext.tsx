"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  PortfolioProfile,
  ProjectItem,
  MilestoneItem,
  ContactMessage,
  INITIAL_PROFILE,
  INITIAL_PROJECTS,
  INITIAL_MILESTONES,
} from "./portfolioData";

interface PortfolioContextType {
  profile: PortfolioProfile;
  projects: ProjectItem[];
  milestones: MilestoneItem[];
  messages: ContactMessage[];
  isAdmin: boolean;
  loginAdmin: (password: string) => boolean;
  logoutAdmin: () => void;
  updateProfile: (profile: Partial<PortfolioProfile>) => void;
  addProject: (project: Omit<ProjectItem, "id">) => void;
  updateProject: (id: string, project: Partial<ProjectItem>) => void;
  deleteProject: (id: string) => void;
  updateMilestone: (id: string, milestone: Partial<MilestoneItem>) => void;
  addMessage: (msg: Omit<ContactMessage, "id" | "date">) => void;
  resetToDefaults: () => void;
}

const PortfolioContext = createContext<PortfolioContextType | null>(null);

const STORAGE_KEYS = {
  PROFILE: "anu_portfolio_profile",
  PROJECTS: "anu_portfolio_projects",
  MILESTONES: "anu_portfolio_milestones",
  MESSAGES: "anu_portfolio_messages",
  AUTH: "anu_portfolio_is_admin",
};

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<PortfolioProfile>(INITIAL_PROFILE);
  const [projects, setProjects] = useState<ProjectItem[]>(INITIAL_PROJECTS);
  const [milestones, setMilestones] = useState<MilestoneItem[]>(INITIAL_MILESTONES);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Load from LocalStorage
  useEffect(() => {
    try {
      const storedProfile = localStorage.getItem(STORAGE_KEYS.PROFILE);
      if (storedProfile) setProfile(JSON.parse(storedProfile));

      const storedProjects = localStorage.getItem(STORAGE_KEYS.PROJECTS);
      if (storedProjects) setProjects(JSON.parse(storedProjects));

      const storedMilestones = localStorage.getItem(STORAGE_KEYS.MILESTONES);
      if (storedMilestones) setMilestones(JSON.parse(storedMilestones));

      const storedMessages = localStorage.getItem(STORAGE_KEYS.MESSAGES);
      if (storedMessages) setMessages(JSON.parse(storedMessages));

      const storedAuth = localStorage.getItem(STORAGE_KEYS.AUTH);
      if (storedAuth === "true") setIsAdmin(true);
    } catch {
      // LocalStorage not available or corrupted
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const loginAdmin = (pass: string) => {
    // Default master password as requested for Anu Sah admin login
    if (pass === "anu2026" || pass === "admin") {
      setIsAdmin(true);
      localStorage.setItem(STORAGE_KEYS.AUTH, "true");
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
    localStorage.removeItem(STORAGE_KEYS.AUTH);
  };

  const updateProfile = (data: Partial<PortfolioProfile>) => {
    setProfile((prev) => {
      const updated = { ...prev, ...data };
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(updated));
      return updated;
    });
  };

  const addProject = (projectData: Omit<ProjectItem, "id">) => {
    setProjects((prev) => {
      const newProj: ProjectItem = {
        ...projectData,
        id: `proj-${Date.now()}`,
      };
      const updated = [newProj, ...prev];
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(updated));
      return updated;
    });
  };

  const updateProject = (id: string, data: Partial<ProjectItem>) => {
    setProjects((prev) => {
      const updated = prev.map((p) => (p.id === id ? { ...p, ...data } : p));
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(updated));
      return updated;
    });
  };

  const deleteProject = (id: string) => {
    setProjects((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(updated));
      return updated;
    });
  };

  const updateMilestone = (id: string, data: Partial<MilestoneItem>) => {
    setMilestones((prev) => {
      const updated = prev.map((m) => (m.id === id ? { ...m, ...data } : m));
      localStorage.setItem(STORAGE_KEYS.MILESTONES, JSON.stringify(updated));
      return updated;
    });
  };

  const addMessage = (msg: Omit<ContactMessage, "id" | "date">) => {
    const newMsg: ContactMessage = {
      ...msg,
      id: `msg-${Date.now()}`,
      date: new Date().toLocaleString(),
    };
    setMessages((prev) => {
      const updated = [newMsg, ...prev];
      localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(updated));
      return updated;
    });
  };

  const resetToDefaults = () => {
    setProfile(INITIAL_PROFILE);
    setProjects(INITIAL_PROJECTS);
    setMilestones(INITIAL_MILESTONES);
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(INITIAL_PROFILE));
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(INITIAL_PROJECTS));
    localStorage.setItem(STORAGE_KEYS.MILESTONES, JSON.stringify(INITIAL_MILESTONES));
  };

  return (
    <PortfolioContext.Provider
      value={{
        profile,
        projects,
        milestones,
        messages,
        isAdmin,
        loginAdmin,
        logoutAdmin,
        updateProfile,
        addProject,
        updateProject,
        deleteProject,
        updateMilestone,
        addMessage,
        resetToDefaults,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const ctx = useContext(PortfolioContext);
  if (!ctx) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return ctx;
}
