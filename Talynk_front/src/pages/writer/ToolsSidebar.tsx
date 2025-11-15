import React from "react";
import ToolButton from "./ToolButton";
import { Edit3, UserCheck, FileText, FilePlus, Mail } from "lucide-react";

interface ToolsSidebarProps {
  activeTool: string | null;
  setActiveTool: (toolId: string | null) => void;
}

export default function ToolsSidebar({ activeTool, setActiveTool }: ToolsSidebarProps) {
  const tools = [
    { id: "motivation", label: "Motivation Letter", icon: Edit3 },
    { id: "recommendation", label: "Recommendation Letter", icon: UserCheck },
    { id: "cv", label: "CV Improvement", icon: FileText },
    { id: "cover", label: "Cover Letter", icon: FilePlus },
    { id: "email", label: "Professional Email", icon: Mail },
  ];

  return (
    <aside className="col-span-12 lg:col-span-4">
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-md border border-slate-100">
        <h2 className="text-xl font-semibold mb-2">Writing Tools</h2>
        <p className="text-sm text-slate-500 mb-4">
          Get AI-powered help with motivation letters, recommendation letters, and CV improvements.
        </p>

        <div className="space-y-3">
          {tools.map((t) => (
            <ToolButton
              key={t.id}
              id={t.id}
              label={t.label}
              icon={t.icon}
              isActive={activeTool === t.id}
              onClick={() => setActiveTool(t.id)}
            />
          ))}
        </div>

        <div className="mt-5 pt-4 border-t border-slate-100">
          <h3 className="text-sm font-medium mb-2">Recent Documents</h3>
          <div className="text-sm text-slate-400">No recent documents</div>
        </div>
      </div>
    </aside>
  );
}
