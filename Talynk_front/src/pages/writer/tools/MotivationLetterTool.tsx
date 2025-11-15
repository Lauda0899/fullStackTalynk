import React, { useState } from "react";
import ToolResult from "../ToolOutput";

export default function MotivationLetterTool() {
  const [resultVisible, setResultVisible] = useState(false);
  const [generatedContent, setGeneratedContent] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    position: "",
    company: "",
    background: "",
    why: "",
    achievements: "",
    tone: "professional",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const generate = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/ai/motivation-letter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setGeneratedContent(data.text);
      setResultVisible(true);
    } catch (err) {
      console.error(err);
      setGeneratedContent("Error generating motivation letter.");
      setResultVisible(true);
    }
    setLoading(false);
  };

  const clear = () => {
    setFormData({
      position: "",
      company: "",
      background: "",
      why: "",
      achievements: "",
      tone: "professional",
    });
    setGeneratedContent("");
    setResultVisible(false);
  };

  return (
    <div className="rounded-2xl p-6 bg-white border border-slate-100 shadow-lg">
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Position/Program
            </label>
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-slate-200 p-2"
              placeholder="e.g., Software Engineer"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Company/Institution
            </label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-slate-200 p-2"
              placeholder="e.g., Google"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">
            Your Background
          </label>
          <textarea
            name="background"
            value={formData.background}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-slate-200 p-2"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">
            Why This Position?
          </label>
          <textarea
            name="why"
            value={formData.why}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-slate-200 p-2"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">
            Key Achievements
          </label>
          <textarea
            name="achievements"
            value={formData.achievements}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-slate-200 p-2"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">Tone</label>
          <select
            name="tone"
            value={formData.tone}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-slate-200 p-2"
          >
            <option value="professional">Professional</option>
            <option value="enthusiastic">Enthusiastic</option>
            <option value="formal">Formal</option>
            <option value="conversational">Conversational</option>
          </select>
        </div>

        <div className="flex gap-3 mt-4">
          <button
            type="button"
            className="px-4 py-2 rounded-md bg-indigo-50 border border-indigo-100 text-indigo-700"
            onClick={generate}
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate Letter"}
          </button>
          <button
            type="button"
            className="px-4 py-2 rounded-md bg-white border border-slate-200 text-slate-700"
            onClick={clear}
          >
            Clear
          </button>
        </div>
      </form>


      {resultVisible && (
        <ToolResult
          contentId="motivationLetterContent"
          title="Generated Motivation Letter"
          regenerate={generate}
          content={generatedContent}
        />
      )}
    </div>
  );
}
