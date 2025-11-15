import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ToolsSidebar from "./ToolsSidebar";
import WritingPanel from "./WritingPanel";

export default function AIWritingAssistantHero() {
  const [activeTool, setActiveTool] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-indigo-50 text-slate-800">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6">
        <section className="grid grid-cols-12 gap-8 items-start">
          <ToolsSidebar activeTool={activeTool} setActiveTool={setActiveTool} />
          <WritingPanel activeTool={activeTool} setActiveTool={setActiveTool} />
        </section>
      </main>

      <Footer />
    </div>
  );
}
