"use client";
import { useState } from "react";
import BottomNav from "@/app/components/BottomNav";
import TopBar from "@/app/components/TopBar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh", background: "#000", position: "relative" }}>
      <TopBar />
      <main style={{ paddingBottom: "80px", minHeight: "100vh" }}>
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
