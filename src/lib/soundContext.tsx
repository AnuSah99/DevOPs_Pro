"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { cyberAudio } from "./audio";

interface SoundContextType {
  isMuted: boolean;
  toggleMute: () => void;
  playHover: () => void;
  playClick: () => void;
  playTerminalKey: () => void;
  playSuccess: () => void;
  playWarp: () => void;
}

const SoundContext = createContext<SoundContextType>({
  isMuted: false,
  toggleMute: () => {},
  playHover: () => {},
  playClick: () => {},
  playTerminalKey: () => {},
  playSuccess: () => {},
  playWarp: () => {},
});

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [isMuted, setIsMuted] = useState<boolean>(false);

  useEffect(() => {
    const saved = localStorage.getItem("anu_sound_muted");
    if (saved !== null) {
      const muted = saved === "true";
      setIsMuted(muted);
      cyberAudio.isMuted = muted;
    }
  }, []);

  const toggleMute = () => {
    setIsMuted((prev) => {
      const next = !prev;
      cyberAudio.isMuted = next;
      localStorage.setItem("anu_sound_muted", String(next));
      if (!next) {
        cyberAudio.playSuccess();
      }
      return next;
    });
  };

  return (
    <SoundContext.Provider
      value={{
        isMuted,
        toggleMute,
        playHover: () => cyberAudio.playHover(),
        playClick: () => cyberAudio.playClick(),
        playTerminalKey: () => cyberAudio.playTerminalKey(),
        playSuccess: () => cyberAudio.playSuccess(),
        playWarp: () => cyberAudio.playWarp(),
      }}
    >
      {children}
    </SoundContext.Provider>
  );
}

export const useSound = () => useContext(SoundContext);
