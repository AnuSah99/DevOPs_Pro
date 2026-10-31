"use client";

import React from "react";
import { PortfolioProvider } from "@/lib/portfolioContext";
import { SoundProvider } from "@/lib/soundContext";

export default function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <PortfolioProvider>
      <SoundProvider>
        {children}
      </SoundProvider>
    </PortfolioProvider>
  );
}
