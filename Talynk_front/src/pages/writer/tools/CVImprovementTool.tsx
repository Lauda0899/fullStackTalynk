import React, { useState } from "react";
import ToolResult from "../ToolOutput";

export default function CVImprovementTool({ backToSelection }) {
  const [cvFile, setCvFile] = useState(null);
  const [targetPosition, setTargetPosition] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [resultVisible, setResultVisible] = useState(false);

  const improveCV = async () => {
    if (!cvFile) {
      alert("Please upload your CV first.");
      return;
    }

    setLoading(true);
    setResultVisible(true);

    const formData = new FormData();
    formData.append("file", cvFile);
    formData.append("position", targetPosition);

    try {
      const response = await fetch("http://localhost:5000/api/ai/improve-cv", {
        method: "POST",
        body: formData
      });

      const data = await response.json();
      setResult(data.suggestions || "No suggestions received.");
    } catch (err) {
      console.error(err);
      setResult("Error contacting AI model.");
    }

    setLoading(false);
  };

  const clearForm = () => {
    setCvFile(null);
    setTargetPosition("");
    setResult("");
    setResultVisible(false);
  };

  return (
    <div className="rounded-2xl p-6 bg-gradient-to-br from-white to-slate-50 border border-slate-100 shadow-lg">
      
      {/* Upload / Form */}
      <div className="space-y-4">
        {/* File Upload */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Upload Your CV
          </label>
          <input
            type="file"
            className="block w-full rounded-md border border-slate-200 p-2"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setCvFile(e.target.files[0])}
          />
          <small className="text-slate-400">
            Supported formats: PDF, DOC, DOCX
          </small>
        </div>

        {/* Target Position */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Target Job Position
          </label>
          <input
            type="text"
            className="block w-full rounded-md border border-slate-200 p-2"
            placeholder="e.g., Senior Software Engineer"
            value={targetPosition}
            onChange={(e) => setTargetPosition(e.target.value)}
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-2">
          <button
            type="button"
            className="px-4 py-2 rounded-md bg-sky-50 border border-sky-100 text-sky-700"
            onClick={improveCV}
            disabled={loading}
          >
            {loading ? "Processing..." : "Get Improvement Suggestions"}
          </button>
          <button
            type="button"
            className="px-4 py-2 rounded-md bg-white border border-slate-200 text-slate-700"
            onClick={clearForm}
          >
            Clear
          </button>
        </div>
      </div>

      {/* ToolResult */}
      {resultVisible && (
        <ToolResult
        contentId="Cv improvement"
          title="Improvement Suggestions"
          content={result}
          regenerate={improveCV}
        />
      )}
    </div>
  );
}



