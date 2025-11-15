import React, { useState } from "react";
import { Copy } from "lucide-react";

export default function EmailTool() {
  const [resultVisible, setResultVisible] = useState(false);
  const [generatedContent, setGeneratedContent] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    emailType: "follow-up",
    recipientName: "",
    recipientTitle: "",
    context: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const generate = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/ai/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setGeneratedContent(data.text);
      setResultVisible(true);
    } catch (err) {
      console.error(err);
      setGeneratedContent("Error generating email.");
      setResultVisible(true);
    }
    setLoading(false);
  };

  const clear = () => {
    setFormData({ emailType: "follow-up", recipientName: "", recipientTitle: "", context: "" });
    setGeneratedContent("");
    setResultVisible(false);
  };

  const copyToClipboard = () => navigator.clipboard.writeText(generatedContent);

  function clearForm(event: MouseEvent<HTMLButtonElement, MouseEvent>): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="rounded-2xl p-6 bg-white border border-slate-100 shadow-lg">
      {/* Form */}
      <form className="space-y-4" onSubmit={e => e.preventDefault()}>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Email Type
          </label>
          <select
            name="emailType"
            value={formData.emailType}
            onChange={handleChange}
            className="block w-full rounded-md border border-slate-200 p-2"
          >
            <option value="follow-up">Follow-up Email</option>
            <option value="thank-you">Thank You Email</option>
            <option value="networking">Networking Email</option>
            <option value="inquiry">Job Inquiry</option>
            <option value="resignation">Resignation Letter</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Recipient Name
            </label>
            <input
              type="text"
              name="recipientName"
              value={formData.recipientName}
              onChange={handleChange}
              className="block w-full rounded-md border border-slate-200 p-2"
              placeholder="John Smith"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Recipient Title
            </label>
            <input
              type="text"
              name="recipientTitle"
              value={formData.recipientTitle}
              onChange={handleChange}
              className="block w-full rounded-md border border-slate-200 p-2"
              placeholder="Hiring Manager"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Context / Details
          </label>
          <textarea
            name="context"
            value={formData.context}
            onChange={handleChange}
            rows={3}
            className="block w-full rounded-md border border-slate-200 p-2"
            placeholder="Provide details for the email..."
          />
        </div>

        <div className="flex gap-3 mt-2">
          <button
            type="button"
            className="px-4 py-2 rounded-md bg-gray-100 border border-gray-200 text-gray-700"
            onClick={generate}
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate Email"}
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
        <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
          <h6 className="text-xl font-semibold text-gray-800 mb-4">
            Generated Email
          </h6>

          <div className="min-h-[150px] whitespace-pre-line rounded-lg border border-gray-300 bg-gray-50 p-4 text-gray-700 font-medium leading-relaxed">
            {generatedContent}
          </div>

          <div className="mt-5 flex items-center gap-3">
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-2 rounded-lg border border-blue-500 px-4 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-50 focus:ring-2 focus:ring-blue-400"
            >
              <Copy size={16} /> Copy to Clipboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
