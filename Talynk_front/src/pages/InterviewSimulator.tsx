import { useState } from 'react';
import { Video, Mic, MicOff, MessageSquare, Play, RotateCcw, CheckCircle, XCircle, Clock, TrendingUp } from 'lucide-react';

export default function InterviewSimulator() {
  const [isStarted, setIsStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedJob, setSelectedJob] = useState('');
  const [difficulty, setDifficulty] = useState('intermediate');
  const [currentAnswer, setCurrentAnswer] = useState('');

  const jobTypes = [
    { value: 'software', label: 'Software Developer', icon: '💻' },
    { value: 'marketing', label: 'Marketing Manager', icon: '📊' },
    { value: 'sales', label: 'Sales Representative', icon: '🤝' },
    { value: 'design', label: 'UI/UX Designer', icon: '🎨' },
    { value: 'data', label: 'Data Analyst', icon: '📈' },
    { value: 'hr', label: 'HR Specialist', icon: '👥' }
  ];

  const questions = {
    software: [
      "Tell me about yourself and your experience in software development.",
      "Describe a challenging project you worked on and how you overcame obstacles.",
      "How do you stay updated with the latest technology trends?",
      "Explain your approach to debugging complex issues.",
      "Where do you see yourself in 5 years?"
    ],
    marketing: [
      "Tell me about yourself and your marketing experience.",
      "Describe a successful marketing campaign you led.",
      "How do you measure the success of a marketing initiative?",
      "How do you handle tight deadlines and multiple projects?",
      "What digital marketing tools are you proficient with?"
    ],
    sales: [
      "Tell me about yourself and your sales background.",
      "Describe a time when you exceeded your sales targets.",
      "How do you handle customer objections?",
      "What's your approach to building long-term client relationships?",
      "How do you stay motivated during slow periods?"
    ],
    design: [
      "Tell me about yourself and your design philosophy.",
      "Walk me through your design process from concept to completion.",
      "How do you handle feedback and revisions?",
      "Describe a project where you improved user experience significantly.",
      "How do you stay inspired and updated with design trends?"
    ],
    data: [
      "Tell me about yourself and your data analysis experience.",
      "Describe a complex data problem you solved.",
      "What tools and technologies do you use for data analysis?",
      "How do you communicate technical findings to non-technical stakeholders?",
      "Give an example of how your analysis drove business decisions."
    ],
    hr: [
      "Tell me about yourself and your HR experience.",
      "How do you handle conflict resolution between employees?",
      "Describe your approach to talent acquisition.",
      "How do you ensure diversity and inclusion in the workplace?",
      "What strategies do you use to improve employee engagement?"
    ]
  };

  const tips = [
    "Maintain eye contact with the camera",
    "Speak clearly and at a moderate pace",
    "Use the STAR method (Situation, Task, Action, Result)",
    "Be specific with examples",
    "Show enthusiasm and confidence"
  ];

  const handleStart = () => {
    if (!selectedJob) {
      alert('Please select a job role first!');
      return;
    }
    setIsStarted(true);
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
  };

  const handleNextQuestion = () => {
    if (currentAnswer.trim()) {
      setAnswers([...answers, { question: questions[selectedJob][currentQuestion], answer: currentAnswer }]);
      setCurrentAnswer('');
      
      if (currentQuestion < questions[selectedJob].length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowResults(true);
      }
    } else {
      alert('Please provide an answer before moving to the next question.');
    }
  };

  const handleReset = () => {
    setIsStarted(false);
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
    setCurrentAnswer('');
    setSelectedJob('');
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  const renderSetup = () => (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Setup Your Interview</h2>
        <p className="text-gray-600">Select your job role and difficulty level to begin</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
        <div className="mb-6">
          <label className="block text-lg font-semibold text-gray-700 mb-4">Select Job Role</label>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {jobTypes.map((job) => (
              <button
                key={job.value}
                onClick={() => setSelectedJob(job.value)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedJob === job.value
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="text-3xl mb-2">{job.icon}</div>
                <div className="font-semibold text-gray-800">{job.label}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-lg font-semibold text-gray-700 mb-4">Difficulty Level</label>
          <div className="flex gap-4">
            {['beginner', 'intermediate', 'advanced'].map((level) => (
              <button
                key={level}
                onClick={() => setDifficulty(level)}
                className={`flex-1 py-3 px-6 rounded-lg border-2 font-semibold capitalize transition-all ${
                  difficulty === level
                    ? 'border-blue-600 bg-blue-600 text-white'
                    : 'border-gray-200 text-gray-700 hover:border-blue-300'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleStart}
          disabled={!selectedJob}
          className={`w-full py-4 rounded-lg font-bold text-lg flex items-center justify-center gap-2 transition-all ${
            selectedJob
              ? 'bg-green-600 text-white hover:bg-green-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          <Play className="w-6 h-6" />
          Start Interview
        </button>
      </div>

      <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
        <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
          <MessageSquare className="w-6 h-6" />
          Interview Tips
        </h3>
        <ul className="space-y-2">
          {tips.map((tip, index) => (
            <li key={index} className="flex items-start gap-2 text-blue-800">
              <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  const renderInterview = () => (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Video Section */}
        <div className="lg:col-span-2">
          <div className="bg-gray-900 rounded-xl overflow-hidden shadow-2xl aspect-video relative">
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
              <Video className="w-24 h-24 text-gray-600" />
            </div>
            
            {/* Recording Indicator */}
            {isRecording && (
              <div className="absolute top-4 right-4 flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-full">
                <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                <span className="font-semibold">Recording</span>
              </div>
            )}

            {/* Controls */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-3">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className={`p-4 rounded-full transition-all ${
                  isMuted ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                {isMuted ? <MicOff className="w-6 h-6 text-white" /> : <Mic className="w-6 h-6 text-white" />}
              </button>
            </div>
          </div>

          {/* Question Display */}
          <div className="mt-6 bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-700">
                Question {currentQuestion + 1} of {questions[selectedJob].length}
              </h3>
              <div className="flex items-center gap-2 text-gray-500">
                <Clock className="w-5 h-5" />
                <span className="font-mono">02:00</span>
              </div>
            </div>
            
            <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-r-lg mb-6">
              <p className="text-lg text-gray-800">{questions[selectedJob][currentQuestion]}</p>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Your Answer</label>
              <textarea
                value={currentAnswer}
                onChange={(e) => setCurrentAnswer(e.target.value)}
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Type your answer here or use the microphone to record..."
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={toggleRecording}
                className={`flex-1 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all ${
                  isRecording
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <Mic className="w-5 h-5" />
                {isRecording ? 'Stop Recording' : 'Record Answer'}
              </button>
              
              <button
                onClick={handleNextQuestion}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all"
              >
                {currentQuestion < questions[selectedJob].length - 1 ? 'Next Question' : 'Finish Interview'}
              </button>
            </div>
          </div>
        </div>

        {/* Progress Panel */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              Progress
            </h3>
            
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Completed</span>
                <span>{currentQuestion}/{questions[selectedJob].length}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${(currentQuestion / questions[selectedJob].length) * 100}%` }}
                />
              </div>
            </div>

            <div className="space-y-2">
              {questions[selectedJob].map((_, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-3 p-3 rounded-lg ${
                    index < currentQuestion
                      ? 'bg-green-50 border border-green-200'
                      : index === currentQuestion
                      ? 'bg-blue-50 border border-blue-200'
                      : 'bg-gray-50 border border-gray-200'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                    index < currentQuestion
                      ? 'bg-green-600 text-white'
                      : index === currentQuestion
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-300 text-gray-600'
                  }`}>
                    {index + 1}
                  </div>
                  <span className="text-sm text-gray-700">Question {index + 1}</span>
                  {index < currentQuestion && <CheckCircle className="w-5 h-5 text-green-600 ml-auto" />}
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleReset}
            className="w-full bg-red-100 text-red-700 py-3 rounded-lg font-semibold hover:bg-red-200 transition-all flex items-center justify-center gap-2"
          >
            <XCircle className="w-5 h-5" />
            End Interview
          </button>
        </div>
      </div>
    </div>
  );

  const renderResults = () => (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-block p-4 bg-green-100 rounded-full mb-4">
          <CheckCircle className="w-16 h-16 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Interview Completed!</h2>
        <p className="text-gray-600">Great job! Here's a summary of your interview</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="text-center p-6 bg-blue-50 rounded-lg">
            <div className="text-3xl font-bold text-blue-600 mb-2">{questions[selectedJob].length}</div>
            <div className="text-gray-600">Questions Answered</div>
          </div>
          <div className="text-center p-6 bg-green-50 rounded-lg">
            <div className="text-3xl font-bold text-green-600 mb-2">~15 min</div>
            <div className="text-gray-600">Total Duration</div>
          </div>
          <div className="text-center p-6 bg-purple-50 rounded-lg">
            <div className="text-3xl font-bold text-purple-600 mb-2">85%</div>
            <div className="text-gray-600">Completion Rate</div>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-800 mb-4">Your Answers</h3>
        <div className="space-y-4">
          {answers.map((item, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="font-semibold text-gray-800 mb-2">Q{index + 1}: {item.question}</div>
              <div className="text-gray-600 bg-gray-50 p-3 rounded">{item.answer}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={handleStart}
          className="flex-1 bg-blue-600 text-white py-4 rounded-lg font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-5 h-5" />
          Practice Again
        </button>
        <button
          onClick={handleReset}
          className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-lg font-bold hover:bg-gray-300 transition-all"
        >
          Change Settings
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-3 flex items-center justify-center gap-3">
            <Video className="w-10 h-10 text-blue-600" />
            Interview Simulator
          </h1>
          <p className="text-gray-600 text-lg">Practice and ace your next job interview with confidence</p>
        </div>

        {!isStarted && !showResults && renderSetup()}
        {isStarted && !showResults && renderInterview()}
        {showResults && renderResults()}
      </div>
    </div>
  );
}



