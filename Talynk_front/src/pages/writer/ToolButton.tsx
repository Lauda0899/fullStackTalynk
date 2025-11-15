import React from "react";

interface ToolButtonProps {
  id: string;
  label: string;
  icon: React.ElementType;
  isActive: boolean;
  onClick: () => void;
}

export default function ToolButton({ id, label, icon: Icon, isActive, onClick }: ToolButtonProps) {
  return (
    <button
      key={id}
      onClick={onClick}
      className={`w-full text-left flex items-center gap-3 px-4 py-3 rounded-lg border ${
        isActive ? "shadow-lg ring-2 ring-offset-1" : "shadow-sm hover:shadow-md"
      }`}
      style={{
        borderColor: isActive ? "rgba(99,102,241,0.12)" : undefined,
      }}
    >
      <span className="w-9 h-9 rounded-md flex items-center justify-center bg-white shadow-inner">
        <Icon className="w-5 h-5 text-slate-700" />
      </span>

      <div className="flex-1">
        <div className="font-medium">{label}</div>
        <div className="text-xs text-slate-400">AI-assisted templates & suggestions</div>
      </div>

      <div className="text-xs text-slate-400">{isActive ? "Selected" : "Open"}</div>
    </button>
  );
}
