import React, { useState } from "react";
import ToolResult from "../ToolOutput";

export default function RecommendationLetterTool() {
  const [resultVisible, setResultVisible] = useState(false);
  const [generatedContent, setGeneratedContent] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    candidate: "",
    author: "",
    title: "",
    institution: "",
    program: "",
    relationship: "supervisor",
    qualities: "",
    examples: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const generate = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/ai/recommendation-letter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setGeneratedContent(data.text);
      setResultVisible(true);
    } catch (err) {
      console.error(err);
      setGeneratedContent("Error generating recommendation letter.");
      setResultVisible(true);
    }
    setLoading(false);
  };

  const clear = () => {
    setFormData({
      candidate: "",
      author: "",
      title: "",
      institution: "",
      program: "",
      relationship: "supervisor",
      qualities: "",
      examples: "",
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
              Candidate Name
            </label>
            <input
              type="text"
              name="candidate"
              value={formData.candidate}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-slate-200 p-2"
              placeholder="John Smith"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">
              Your Name
            </label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-slate-200 p-2"
              placeholder="Dr. Jane Doe"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Your Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-slate-200 p-2"
              placeholder="Professor of Computer Science"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">
              Institution
            </label>
            <input
              type="text"
              name="institution"
              value={formData.institution}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-slate-200 p-2"
              placeholder="University of Technology"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">
            Program / Position
          </label>
          <input
            type="text"
            name="program"
            value={formData.program}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-slate-200 p-2"
            placeholder="Master's Program in Data Science"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">
            Relationship to Candidate
          </label>
          <select
            name="relationship"
            value={formData.relationship}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-slate-200 p-2"
          >
            <option value="supervisor">Supervisor/Manager</option>
            <option value="professor">Professor/Teacher</option>
            <option value="colleague">Colleague</option>
            <option value="mentor">Mentor</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">
            Key Qualities
          </label>
          <textarea
            name="qualities"
            value={formData.qualities}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-slate-200 p-2"
            rows={3}
            placeholder="Leadership, technical skills, adaptability..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">
            Specific Examples
          </label>
          <textarea
            name="examples"
            value={formData.examples}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-slate-200 p-2"
            rows={3}
            placeholder="Provide concrete examples of achievements..."
          />
        </div>

        <div className="flex gap-3 mt-4">
          <button
            type="button"
            className="px-4 py-2 rounded-md bg-green-50 border border-green-100 text-green-700"
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
          contentId="recommendationLetterContent"
          title="Generated Recommendation Letter"
          regenerate={generate}
          content={generatedContent}
        />
      )}
    </div>
  );
}
