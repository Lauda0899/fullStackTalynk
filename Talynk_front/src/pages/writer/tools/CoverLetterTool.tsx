import React, { useState } from "react";
import ToolResult from "../ToolOutput";

export default function CoverLetterTool({ backToSelection }) {
  const [resultVisible, setResultVisible] = useState(false);
  const [generatedContent, setGeneratedContent] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    jobTitle: "",
    companyName: "",
    experience: "",
    interest: "",
    skills: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // AI-powered generation
  const generate = async () => {
    setLoading(true);
    setResultVisible(true);

    try {
      const response = await fetch("http://localhost:5000/api/ai/cover-letter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
      });

      const data = await response.json();
      setGeneratedContent(data.letter || "No content returned.");
    } catch (error) {
      console.error(error);
      setGeneratedContent("Error generating cover letter.");
    }

    setLoading(false);
  };

  const clearForm = () => {
    setFormData({
      jobTitle: "",
      companyName: "",
      experience: "",
      interest: "",
      skills: "",
    });
    setGeneratedContent("");
    setResultVisible(false);
  };

  return (
    <div className="rounded-2xl p-6 bg-gradient-to-br from-white to-slate-50 border border-slate-100 shadow-lg">

      <form className="space-y-4" onSubmit={e => e.preventDefault()}>
        {/* Top Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Job Title */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Job Title
            </label>
            <input
              type="text"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              className="block w-full rounded-md border border-slate-200 p-2"
              placeholder="Marketing Manager"
            />
          </div>

          {/* Company Name */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Company Name
            </label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className="block w-full rounded-md border border-slate-200 p-2"
              placeholder="TechCorp Inc."
            />
          </div>
        </div>

        {/* Experience */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Your Relevant Experience
          </label>
          <textarea
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            className="block w-full rounded-md border border-slate-200 p-2"
            rows={3}
            placeholder="Describe your relevant experience..."
          />
        </div>

        {/* Interest */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Why You're Interested
          </label>
          <textarea
            name="interest"
            value={formData.interest}
            onChange={handleChange}
            className="block w-full rounded-md border border-slate-200 p-2"
            rows={3}
            placeholder="Explain why you're interested..."
          />
        </div>

        {/* Skills */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Key Skills to Highlight
          </label>
          <textarea
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            className="block w-full rounded-md border border-slate-200 p-2"
            rows={2}
            placeholder="List key skills..."
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-2">
          <button
            type="button"
            className="px-4 py-2 rounded-md bg-amber-50 border border-amber-100 text-amber-700"
            onClick={generate}
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate Cover Letter"}
          </button>

          <button
            type="button"
            className="px-4 py-2 rounded-md bg-white border border-slate-200 text-slate-700"
            onClick={clearForm}
          >
            Clear
          </button>
        </div>
      </form>

      {/* Result */}
      {resultVisible && (
        <ToolResult
          contentId="coverLetter"
          title="Generated Cover Letter"
          regenerate={generate}
          content={generatedContent}
        />
      )}
    </div>
  );
}
