// ToolResult.tsx
import React, { useEffect } from "react";
import { jsPDF } from "jspdf";

interface ToolResultProps {
  contentId: string;
  title: string;
  regenerate?: () => void;
  content?: string; // ✅ new optional prop
}

export default function ToolResult({ contentId, title, regenerate, content }: ToolResultProps) {
  // ✅ when "content" changes, put it inside the DOM element
  useEffect(() => {
    if (content) {
      const el = document.getElementById(contentId);
      if (el) el.innerText = content;
    }
  }, [content, contentId]);

  const copyToClipboard = () => {
    const text = content || document.getElementById(contentId)?.innerText || "";
    navigator.clipboard.writeText(text);
  };

  const downloadPDF = () => {
    const text = content || document.getElementById(contentId)?.innerText || "";
    if (!text) return;

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "a4",
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const margin = 40;
    const maxWidth = pageWidth - margin * 2;
    const lines = pdf.splitTextToSize(text, maxWidth);

    pdf.text(lines, margin, 60);
    pdf.save(`${title.replace(/\s+/g, "_")}.pdf`);
  };

  return (
    <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
      {/* Title */}
      <h6 className="text-xl font-semibold text-gray-800 mb-4">{title}</h6>

      {/* Content Box */}
      <div
        id={contentId}
        className="min-h-[150px] whitespace-pre-line rounded-lg border border-gray-300 bg-gray-50 p-4 text-gray-700 font-medium leading-relaxed"
      ></div>

      {/* Buttons */}
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button
          onClick={downloadPDF}
          className="flex items-center gap-2 rounded-lg border border-blue-500 px-4 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-50 focus:ring-2 focus:ring-blue-400"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
}
