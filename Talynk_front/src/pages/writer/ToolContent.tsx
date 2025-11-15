import React from "react";
import { Bot } from "lucide-react";
import MotivationLetterTool from "./tools/MotivationLetterTool";
import RecommendationLetterTool from "./tools/RecommendationLetterTool";
import CVImprovementTool from "./tools/CVImprovementTool";
import CoverLetterTool from "./tools/CoverLetterTool";
import EmailTool from "./tools/EmailTool";

interface Tool {
  id: string;
  label: string;
  icon: React.ElementType;
}

interface ToolSelectorProps {
  activeTool: string | null;
  setActiveTool: (toolId: string | null) => void;
  tools: Tool[];
}

export default function ToolSelector({ activeTool, setActiveTool, tools }: ToolSelectorProps) {
  if (!activeTool) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Bot className="w-14 h-14 text-slate-300" />
        <div className="mt-4 text-slate-500">Select a Writing Tool</div>
        <div className="text-sm text-slate-400 text-center">
          Choose from the tools on the left to get started with AI-powered writing assistance.
        </div>
      </div>
    );
  }

  const tool = tools.find((t) => t.id === activeTool);
  if (!tool) return null;

  const Icon = tool.icon;


  const renderToolComponent = () => {
    switch (activeTool) {
      case "motivation":
        return <MotivationLetterTool back={() => setActiveTool(null)} />;
      case "recommendation":
        return <RecommendationLetterTool back={() => setActiveTool(null)} />;
      case "cv":
        return <CVImprovementTool back={() => setActiveTool(null)} />;
      case "cover":
        return <CoverLetterTool back={() => setActiveTool(null)} />;
      case "email":
        return <EmailTool back={() => setActiveTool(null)} />;
      default:
        return null;
    }
  };

  return (
    <div>
      {/* Top bar: icon + title + back */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-indigo-50 flex items-center justify-center">
            <Icon className="w-6 h-6 text-indigo-600" />
          </div>
          <div className="text-lg font-semibold">{tool.label}</div>
        </div>

        <button
          onClick={() => setActiveTool(null)}
          className="text-sm text-slate-500 hover:text-slate-700 flex items-center gap-1"
        >
          ← Back
        </button>
      </div>

      {/* Render the actual tool component below */}
      <div>{renderToolComponent()}</div>
    </div>
  );
}
