import { useState } from 'react';
import { Sparkles, FileText, Mail, Briefcase, MessageSquare, PenTool, Copy, Download, RefreshCw, Settings, Wand2, CheckCircle } from 'lucide-react';

export default function AIWriting() {
  const [selectedType, setSelectedType] = useState('');
  const [tone, setTone] = useState('professional');
  const [length, setLength] = useState('medium');
  const [prompt, setPrompt] = useState('');
  const [generatedText, setGeneratedText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [copied, setCopied] = useState(false);

  const contentTypes = [
    { value: 'email', label: 'Email', icon: <Mail className="w-6 h-6" />, description: 'Professional emails and messages' },
    { value: 'cover-letter', label: 'Cover Letter', icon: <FileText className="w-6 h-6" />, description: 'Job application cover letters' },
    { value: 'resume', label: 'Resume Summary', icon: <Briefcase className="w-6 h-6" />, description: 'Professional resume summaries' },
    { value: 'linkedin', label: 'LinkedIn Post', icon: <MessageSquare className="w-6 h-6" />, description: 'Engaging LinkedIn content' },
    { value: 'blog', label: 'Blog Post', icon: <PenTool className="w-6 h-6" />, description: 'Blog articles and posts' },
    { value: 'social', label: 'Social Media', icon: <Wand2 className="w-6 h-6" />, description: 'Social media captions' }
  ];

  const toneOptions = [
    { value: 'professional', label: 'Professional', emoji: '💼' },
    { value: 'casual', label: 'Casual', emoji: '😊' },
    { value: 'friendly', label: 'Friendly', emoji: '🤝' },
    { value: 'formal', label: 'Formal', emoji: '🎩' },
    { value: 'confident', label: 'Confident', emoji: '💪' },
    { value: 'enthusiastic', label: 'Enthusiastic', emoji: '🎉' }
  ];

  const lengthOptions = [
    { value: 'short', label: 'Short', description: '~100 words' },
    { value: 'medium', label: 'Medium', description: '~250 words' },
    { value: 'long', label: 'Long', description: '~500 words' }
  ];

  const examplePrompts = {
    email: "Write an email to my manager requesting time off for a family vacation",
    'cover-letter': "Write a cover letter for a software engineer position at a tech startup",
    resume: "Create a professional summary for a marketing professional with 5 years of experience",
    linkedin: "Write a LinkedIn post about the importance of continuous learning in tech",
    blog: "Write a blog post about the future of remote work",
    social: "Create an Instagram caption for a photo of a successful team meeting"
  };

  const handleGenerate = () => {
    if (!selectedType || !prompt.trim()) {
      alert('Please select a content type and enter a prompt!');
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      const samples = {
        email: `Subject: Time Off Request - Family Vacation

Dear [Manager's Name],

I hope this email finds you well. I am writing to formally request time off from [start date] to [end date] for a family vacation that has been planned for several months.

I have ensured that all my current projects will be completed before my departure, and I have coordinated with [colleague's name] to cover any urgent matters during my absence. I will also be available via email for any critical issues that may arise.

I appreciate your consideration of this request and look forward to your response.

Best regards,
[Your Name]`,
        'cover-letter': `Dear Hiring Manager,

I am writing to express my strong interest in the Software Engineer position at [Company Name]. With a solid background in full-stack development and a passion for creating innovative solutions, I am excited about the opportunity to contribute to your dynamic team.

Throughout my career, I have demonstrated expertise in modern technologies including React, Node.js, and Python. My experience includes developing scalable applications, collaborating with cross-functional teams, and implementing best practices in software development.

What particularly attracts me to [Company Name] is your commitment to innovation and your impressive work in [specific area]. I am confident that my technical skills, combined with my problem-solving abilities and enthusiasm for learning, would make me a valuable addition to your team.

I would welcome the opportunity to discuss how my experience and skills align with your needs. Thank you for considering my application.

Sincerely,
[Your Name]`,
        resume: `Dynamic marketing professional with 5+ years of experience driving brand growth and customer engagement across digital and traditional channels. Proven track record of developing and executing data-driven marketing strategies that increase revenue and market share. Expert in content marketing, social media management, and campaign analytics. Strong leadership skills with experience managing cross-functional teams and collaborating with stakeholders at all levels. Known for creative problem-solving and ability to adapt strategies in fast-paced environments.`,
        linkedin: `🚀 The Power of Continuous Learning in Tech

In the ever-evolving tech landscape, standing still means falling behind. Here's why continuous learning isn't just beneficial—it's essential:

✨ Technology evolves rapidly. What's cutting-edge today might be outdated tomorrow.
💡 Learning keeps your skills relevant and marketable.
🌱 It opens doors to new opportunities and career growth.
🤝 Sharing knowledge strengthens the entire tech community.

My approach? Dedicate time each week to learning something new, whether it's a tutorial, online course, or side project. The investment always pays off.

What's your learning strategy? Share in the comments! 👇

#TechCareers #ContinuousLearning #ProfessionalDevelopment`,
        blog: `# The Future of Remote Work: Trends and Predictions

The pandemic accelerated a workplace revolution that was already underway. As we look ahead, remote work is not just a temporary solution—it's becoming the new normal. Here's what the future holds:

## Hybrid Models Will Dominate

Companies are discovering that the best approach isn't fully remote or fully in-office, but a flexible hybrid model. This allows employees to benefit from both in-person collaboration and the flexibility of remote work.

## Technology Will Continue to Evolve

Virtual reality meetings, AI-powered productivity tools, and advanced collaboration platforms will make remote work even more seamless and effective.

## Work-Life Integration

The traditional 9-to-5 schedule is becoming obsolete. Future workers will have more control over when and where they work, leading to better work-life balance and increased productivity.

## Global Talent Pools

Geography will matter less as companies embrace remote work, opening up opportunities for talent worldwide and creating more diverse teams.

The future of work is flexible, digital, and human-centered. Companies that adapt will thrive in this new era.`,
        social: `🎉 Success is sweeter when shared with an amazing team! 

This week's meeting brought together brilliant minds, innovative ideas, and endless energy. Grateful to work with people who inspire me every day. 💪✨

Here's to crushing goals together! 🚀

#TeamWork #Success #Collaboration #MondayMotivation #OfficeLife #TeamGoals`
      };

      setGeneratedText(samples[selectedType] || 'Generated content will appear here...');
      setIsGenerating(false);
    }, 2000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([generatedText], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${selectedType}-${Date.now()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleReset = () => {
    setPrompt('');
    setGeneratedText('');
    setSelectedType('');
  };

  const useExamplePrompt = () => {
    if (selectedType && examplePrompts[selectedType]) {
      setPrompt(examplePrompts[selectedType]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-10 h-10 text-purple-600" />
            <h1 className="text-4xl font-bold text-gray-800">AI Writing Assistant</h1>
          </div>
          <p className="text-gray-600 text-lg">Create professional content in seconds with AI-powered writing</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Content Type Selection */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FileText className="w-6 h-6 text-purple-600" />
                Content Type
              </h2>
              <div className="space-y-2">
                {contentTypes.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => setSelectedType(type.value)}
                    className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                      selectedType === type.value
                        ? 'border-purple-600 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`${selectedType === type.value ? 'text-purple-600' : 'text-gray-600'}`}>
                        {type.icon}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-800">{type.label}</div>
                        <div className="text-sm text-gray-500">{type.description}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Settings Panel */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="w-full flex items-center justify-between mb-4"
              >
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <Settings className="w-6 h-6 text-purple-600" />
                  Settings
                </h2>
                <span className="text-gray-400">{showSettings ? '−' : '+'}</span>
              </button>

              {showSettings && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tone</label>
                    <div className="grid grid-cols-2 gap-2">
                      {toneOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => setTone(option.value)}
                          className={`p-2 rounded-lg border transition-all text-sm ${
                            tone === option.value
                              ? 'border-purple-600 bg-purple-50'
                              : 'border-gray-200 hover:border-purple-300'
                          }`}
                        >
                          <span className="mr-1">{option.emoji}</span>
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Length</label>
                    <div className="space-y-2">
                      {lengthOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => setLength(option.value)}
                          className={`w-full p-3 rounded-lg border transition-all text-left ${
                            length === option.value
                              ? 'border-purple-600 bg-purple-50'
                              : 'border-gray-200 hover:border-purple-300'
                          }`}
                        >
                          <div className="font-medium text-gray-800">{option.label}</div>
                          <div className="text-xs text-gray-500">{option.description}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Panel - Input and Output */}
          <div className="lg:col-span-2 space-y-6">
            {/* Input Section */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <PenTool className="w-6 h-6 text-purple-600" />
                  Describe What You Want
                </h2>
                {selectedType && (
                  <button
                    onClick={useExamplePrompt}
                    className="text-sm text-purple-600 hover:text-purple-700 font-medium"
                  >
                    Use Example
                  </button>
                )}
              </div>

              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent mb-4"
                placeholder={
                  selectedType
                    ? `Describe the ${contentTypes.find(t => t.value === selectedType)?.label.toLowerCase()} you want to create...`
                    : 'Select a content type first, then describe what you want to write...'
                }
              />

              <div className="flex gap-3">
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating || !selectedType || !prompt.trim()}
                  className={`flex-1 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all ${
                    isGenerating || !selectedType || !prompt.trim()
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700'
                  }`}
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      Generate Content
                    </>
                  )}
                </button>

                <button
                  onClick={handleReset}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-all"
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Output Section */}
            {(generatedText || isGenerating) && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <Sparkles className="w-6 h-6 text-purple-600" />
                    Generated Content
                  </h2>
                  {generatedText && (
                    <div className="flex gap-2">
                      <button
                        onClick={handleCopy}
                        className="p-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-all relative"
                        title="Copy to clipboard"
                      >
                        {copied ? <CheckCircle className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                      </button>
                      <button
                        onClick={handleDownload}
                        className="p-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-all"
                        title="Download as text file"
                      >
                        <Download className="w-5 h-5" />
                      </button>
                      <button
                        onClick={handleGenerate}
                        className="p-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-all"
                        title="Regenerate"
                      >
                        <RefreshCw className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </div>

                {isGenerating ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <RefreshCw className="w-12 h-12 text-purple-600 animate-spin mb-4" />
                    <p className="text-gray-600">Generating your content...</p>
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-lg p-6 min-h-[300px]">
                    <pre className="whitespace-pre-wrap font-sans text-gray-800 leading-relaxed">
                      {generatedText}
                    </pre>
                  </div>
                )}
              </div>
            )}

            {/* Tips Section */}
            {!generatedText && !isGenerating && (
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-6 border border-purple-200">
                <h3 className="text-lg font-bold text-purple-900 mb-3">💡 Tips for Better Results</h3>
                <ul className="space-y-2 text-purple-800">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">•</span>
                    <span>Be specific about what you want to write</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">•</span>
                    <span>Include key details like names, dates, or specific requirements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">•</span>
                    <span>Mention your target audience if relevant</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">•</span>
                    <span>Adjust the tone and length settings to match your needs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">•</span>
                    <span>You can always regenerate or edit the output</span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}





