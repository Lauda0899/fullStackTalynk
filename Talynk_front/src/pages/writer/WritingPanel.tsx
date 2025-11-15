import React from "react";
import ToolContent from "./ToolContent";
import { Edit3, UserCheck, FileText, FilePlus, Mail } from "lucide-react";

interface WritingPanelProps {
  activeTool: string | null;
  setActiveTool: (toolId: string | null) => void;
}

export default function WritingPanel({ activeTool, setActiveTool }: WritingPanelProps) {
  const tools = [
    { id: "motivation", label: "Motivation Letter", icon: Edit3 },
    { id: "recommendation", label: "Recommendation Letter", icon: UserCheck },
    { id: "cv", label: "CV Improvement", icon: FileText },
    { id: "cover", label: "Cover Letter", icon: FilePlus },
    { id: "email", label: "Professional Email", icon: Mail },
  ];

  return (
    <section className="col-span-12 lg:col-span-8">
      <div className="rounded-3xl p-10 bg-white shadow-2xl border border-slate-100">
        <div className="flex flex-col items-center text-center gap-6">
          <div className="w-full mt-6">
            <div className="rounded-2xl p-6 bg-gradient-to-br from-white to-slate-50 border border-slate-100">
              <ToolContent activeTool={activeTool} setActiveTool={setActiveTool} tools={tools} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
