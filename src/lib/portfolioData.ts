export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  status: string;
  description: string;
  technologies: string[];
  viewUrl: string;
  githubUrl: string;
  featured: boolean;
  highlights: string[];
}

export interface SkillItem {
  id: string;
  name: string;
  category: "core" | "frontend" | "tools" | "exploration";
  description: string;
  confirmed: boolean;
}

export interface MilestoneItem {
  id: string;
  phase: string;
  title: string;
  status: string;
  description: string;
  tag: string;
}

export interface PortfolioProfile {
  name: string;
  role: string;
  email: string;
  github: string;
  instagram: string;
  tagline: string;
  bio1: string;
  bio2: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
}

// 6 Real-life Futuristic Projects with Live Working In-App View URLs
export const INITIAL_PROJECTS: ProjectItem[] = [
  {
    id: "devops-pro",
    title: "DevOPs_Pro // CI/CD Telemetry & Cloud Matrix",
    category: "DEVOPS & CLOUD",
    status: "LIVE PRODUCTION",
    description:
      "A futuristic cloud infrastructure orchestration dashboard featuring simulated CI/CD pipelines, Kubernetes microservice pod monitoring, zero-downtime rollouts, and real-time stdout telemetry.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "CI/CD", "Kubernetes"],
    viewUrl: "/projects/devops-pro",
    githubUrl: "https://github.com/AnuSah99/DevOPs_Pro",
    featured: true,
    highlights: ["Interactive CI/CD Pipeline", "Kubernetes Pod Monitor", "Live Stdout Log Stream"],
  },
  {
    id: "cyber-code-editor",
    title: "CyberIDE // Neural Web Code Editor",
    category: "DEVELOPER TOOL",
    status: "LIVE PRODUCTION",
    description:
      "A futuristic browser-based code studio with live preview, real-time syntax styling, quick code snippets (HTML/CSS/JS), theme switcher, and instant execution.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Web APIs"],
    viewUrl: "/projects/cyber-code-editor",
    githubUrl: "https://github.com/Anusah99",
    featured: true,
    highlights: ["Live Code Execution", "Syntax Customization", "Instant Export"],
  },
  {
    id: "crypto-telemetry-hud",
    title: "QuantumTrade // Crypto Telemetry HUD",
    category: "FINTECH & ANALYTICS",
    status: "LIVE PRODUCTION",
    description:
      "A cyberpunk financial terminal featuring real-time market telemetry, interactive candlestick simulation, asset order books, and algorithmic price monitors.",
    technologies: ["Next.js", "TypeScript", "Canvas Graphics", "Tailwind CSS"],
    viewUrl: "/projects/crypto-telemetry-hud",
    githubUrl: "https://github.com/Anusah99",
    featured: true,
    highlights: ["Interactive Telemetry HUD", "Simulated Order Book", "Real-Time Volatility Feed"],
  },
  {
    id: "neural-audio-lab",
    title: "NeuroSynth // Web Audio Synthesizer Lab",
    category: "CREATIVE AUDIO & DSP",
    status: "LIVE PRODUCTION",
    description:
      "A browser synthesizer and audio visualizer utilizing the Web Audio API with customizable oscillators (sine, square, sawtooth), audio filters, and beat pads.",
    technologies: ["Web Audio API", "HTML5 Canvas", "React", "TypeScript"],
    viewUrl: "/projects/neural-audio-lab",
    githubUrl: "https://github.com/Anusah99",
    featured: true,
    highlights: ["Multi-Waveform Oscillator", "Real-Time Spectrum Visualizer", "Interactive Drum/FX Pads"],
  },
  {
    id: "ai-prompt-matrix",
    title: "PromptMatrix // AI Engineering Studio",
    category: "ARTIFICIAL INTELLIGENCE",
    status: "LIVE PRODUCTION",
    description:
      "A modern AI prompt workspace for developers. Build, test, token-count, organize prompt templates, and benchmark variables with instant copy.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "LocalStorage"],
    viewUrl: "/projects/ai-prompt-matrix",
    githubUrl: "https://github.com/Anusah99",
    featured: true,
    highlights: ["Prompt Template Library", "Real-Time Token Counter", "Variable Injection Engine"],
  },
  {
    id: "cyber-task-os",
    title: "TaskMatrix // Futuristic Kanban OS",
    category: "PRODUCTIVITY OS",
    status: "LIVE PRODUCTION",
    description:
      "A high-velocity cyberpunk task orchestration system featuring interactive Kanban columns, priority matrices, progress diagnostics, and persistent state.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "LocalStorage"],
    viewUrl: "/projects/cyber-task-os",
    githubUrl: "https://github.com/Anusah99",
    featured: true,
    highlights: ["Interactive Kanban Board", "Priority Matrix Filter", "Persistent Browser Storage"],
  },
];

export const INITIAL_PROFILE: PortfolioProfile = {
  name: "Anu Sah",
  role: "IT Enthusiast | Creative Developer | Tech Explorer",
  email: "Code.anukrsah@gmail.com",
  github: "https://github.com/Anusah99",
  instagram: "https://instagram.com/itz_anukrsah_xd",
  tagline: "EXPLORING TECHNOLOGY. CREATING DIGITAL EXPERIENCES.",
  bio1: "I'm Anu Sah, an IT enthusiast who loves exploring technology, understanding how digital systems work, and experimenting with creative web experiences.",
  bio2: "I'm interested in modern web development, frontend technologies, interactive design, and continuously discovering what's possible with technology.",
};

export const INITIAL_MILESTONES: MilestoneItem[] = [
  {
    id: "m1",
    phase: "PHASE 01",
    title: "Beginning The Technology Journey",
    status: "COMPLETED",
    description: "Ignited passion for information technology, computer architectures, and understanding how modern digital software operates.",
    tag: "ORIGIN",
  },
  {
    id: "m2",
    phase: "PHASE 02",
    title: "Exploring Web Development",
    status: "COMPLETED",
    description: "Entered the world of the web. Discovered client-server fundamentals, browser rendering engines, and developer tools.",
    tag: "FOUNDATION",
  },
  {
    id: "m3",
    phase: "PHASE 03",
    title: "Learning HTML & CSS",
    status: "CONFIRMED & APPLIED",
    description: "Mastered semantic markup, accessible HTML structures, and responsive CSS styling with modern Flexbox and Grid designs.",
    tag: "CORE_SKILL",
  },
  {
    id: "m4",
    phase: "PHASE 04",
    title: "Exploring JavaScript",
    status: "CONFIRMED & APPLIED",
    description: "Dived into JavaScript logic, DOM manipulation, asynchronous event loops, promises, APIs, and modern ES6+ paradigms.",
    tag: "DYNAMIC_LOGIC",
  },
  {
    id: "m5",
    phase: "PHASE 05",
    title: "Working With Tailwind CSS",
    status: "CONFIRMED & APPLIED",
    description: "Adopted rapid utility-first workflow to construct clean, scalable design systems and futuristic dark-mode interfaces.",
    tag: "DESIGN_SYSTEM",
  },
  {
    id: "m6",
    phase: "PHASE 06",
    title: "Future Development Goals",
    status: "IN PROGRESS",
    description: "Expanding into advanced frontend frameworks, 3D WebGL experiences, full-stack architectures, and creative computing.",
    tag: "HORIZON",
  },
];
