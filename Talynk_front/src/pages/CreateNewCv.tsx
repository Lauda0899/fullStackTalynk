import { useState } from 'react';
import { FileText, User, Briefcase, GraduationCap, Award, Plus, X } from 'lucide-react';


const  CreateNewCV: React.FC =() =>{
  const [step, setStep] = useState(1);
  const [cvData, setCvData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    title: '',
    summary: '',
    
    // Experiences
    experiences: [{ company: '', position: '', startDate: '', endDate: '', description: '' }],
    
    // Education
    education: [{ school: '', degree: '', field: '', year: '' }],
    
    // Skills
    skills: [''],
    
    // Languages
    languages: [{ language: '', level: '' }]
  });

  const updateField = (field, value) => {
    setCvData(prev => ({ ...prev, [field]: value }));
  };

  const addArrayItem = (field, template) => {
    setCvData(prev => ({
      ...prev,
      [field]: [...prev[field], template]
    }));
  };

  const removeArrayItem = (field, index) => {
    setCvData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const updateArrayItem = (field, index, key, value) => {
    setCvData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => 
        i === index ? { ...item, [key]: value } : item
      )
    }));
  };

  const handleSubmit = () => {
    console.log('CV Data:', cvData);
    alert('CV created successfully! (Check the console to see the data)');
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <User className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-800">Personal Information</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
          <input
            type="text"
            value={cvData.firstName}
            onChange={(e) => updateField('firstName', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="John"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
          <input
            type="text"
            value={cvData.lastName}
            onChange={(e) => updateField('lastName', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Doe"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
            type="email"
            value={cvData.email}
            onChange={(e) => updateField('email', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="john.doe@email.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
          <input
            type="tel"
            value={cvData.phone}
            onChange={(e) => updateField('phone', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="+1 555 123 4567"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
        <input
          type="text"
          value={cvData.address}
          onChange={(e) => updateField('address', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="123 Main Street, New York, NY 10001"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Professional Title</label>
        <input
          type="text"
          value={cvData.title}
          onChange={(e) => updateField('title', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Full Stack Developer"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Professional Summary</label>
        <textarea
          value={cvData.summary}
          onChange={(e) => updateField('summary', e.target.value)}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Briefly describe your professional profile..."
        />
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Briefcase className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-800">Work Experience</h2>
      </div>

      {cvData.experiences.map((exp, index) => (
        <div key={index} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-700">Experience {index + 1}</h3>
            {cvData.experiences.length > 1 && (
              <button
                onClick={() => removeArrayItem('experiences', index)}
                className="text-red-500 hover:text-red-700"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          <div className="space-y-3">
            <input
              type="text"
              value={exp.company}
              onChange={(e) => updateArrayItem('experiences', index, 'company', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Company name"
            />
            <input
              type="text"
              value={exp.position}
              onChange={(e) => updateArrayItem('experiences', index, 'position', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Position"
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                value={exp.startDate}
                onChange={(e) => updateArrayItem('experiences', index, 'startDate', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Start date"
              />
              <input
                type="text"
                value={exp.endDate}
                onChange={(e) => updateArrayItem('experiences', index, 'endDate', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="End date"
              />
            </div>
            <textarea
              value={exp.description}
              onChange={(e) => updateArrayItem('experiences', index, 'description', e.target.value)}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Description of responsibilities..."
            />
          </div>
        </div>
      ))}

      <button
        onClick={() => addArrayItem('experiences', { company: '', position: '', startDate: '', endDate: '', description: '' })}
        className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition"
      >
        <Plus className="w-5 h-5" />
        Add experience
      </button>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <GraduationCap className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-800">Education</h2>
      </div>

      {cvData.education.map((edu, index) => (
        <div key={index} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-700">Education {index + 1}</h3>
            {cvData.education.length > 1 && (
              <button
                onClick={() => removeArrayItem('education', index)}
                className="text-red-500 hover:text-red-700"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          <div className="space-y-3">
            <input
              type="text"
              value={edu.school}
              onChange={(e) => updateArrayItem('education', index, 'school', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="School name"
            />
            <input
              type="text"
              value={edu.degree}
              onChange={(e) => updateArrayItem('education', index, 'degree', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Degree obtained"
            />
            <input
              type="text"
              value={edu.field}
              onChange={(e) => updateArrayItem('education', index, 'field', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Field of study"
            />
            <input
              type="text"
              value={edu.year}
              onChange={(e) => updateArrayItem('education', index, 'year', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Year"
            />
          </div>
        </div>
      ))}

      <button
        onClick={() => addArrayItem('education', { school: '', degree: '', field: '', year: '' })}
        className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition"
      >
        <Plus className="w-5 h-5" />
        Add education
      </button>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Award className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-800">Skills & Languages</h2>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold text-gray-700 mb-3">Skills</h3>
        {cvData.skills.map((skill, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              value={skill}
              onChange={(e) => {
                const newSkills = [...cvData.skills];
                newSkills[index] = e.target.value;
                updateField('skills', newSkills);
              }}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g. JavaScript, React, Node.js"
            />
            {cvData.skills.length > 1 && (
              <button
                onClick={() => {
                  const newSkills = cvData.skills.filter((_, i) => i !== index);
                  updateField('skills', newSkills);
                }}
                className="px-3 py-2 text-red-500 hover:text-red-700"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        ))}
        <button
          onClick={() => updateField('skills', [...cvData.skills, ''])}
          className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition mt-2"
        >
          <Plus className="w-5 h-5" />
          Add skill
        </button>
      </div>

      <div>
        <h3 className="font-semibold text-gray-700 mb-3">Languages</h3>
        {cvData.languages.map((lang, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              value={lang.language}
              onChange={(e) => updateArrayItem('languages', index, 'language', e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Language"
            />
            <select
              value={lang.level}
              onChange={(e) => updateArrayItem('languages', index, 'level', e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Level</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="Fluent">Fluent</option>
              <option value="Native">Native</option>
            </select>
            {cvData.languages.length > 1 && (
              <button
                onClick={() => removeArrayItem('languages', index)}
                className="px-3 py-2 text-red-500 hover:text-red-700"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        ))}
        <button
          onClick={() => addArrayItem('languages', { language: '', level: '' })}
          className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition mt-2"
        >
          <Plus className="w-5 h-5" />
          Add language
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center gap-3 mb-8">
            <FileText className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-800">Create New CV</h1>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              {[1, 2, 3, 4].map((s) => (
                <div key={s} className="flex flex-col items-center flex-1">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    step >= s ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
                  }`}>
                    {s}
                  </div>
                  <span className="text-xs mt-1 text-gray-600">
                    {s === 1 && 'Info'}
                    {s === 2 && 'Experience'}
                    {s === 3 && 'Education'}
                    {s === 4 && 'Skills'}
                  </span>
                </div>
              ))}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(step / 4) * 100}%` }}
              />
            </div>
          </div>

          {/* Form Steps */}
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
          {step === 4 && renderStep4()}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={() => setStep(Math.max(1, step - 1))}
              disabled={step === 1}
              className={`px-6 py-3 rounded-lg font-semibold transition ${
                step === 1
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Previous
            </button>

            {step < 4 ? (
              <button
                onClick={() => setStep(Math.min(4, step + 1))}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
              >
                Create CV
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateNewCV;

