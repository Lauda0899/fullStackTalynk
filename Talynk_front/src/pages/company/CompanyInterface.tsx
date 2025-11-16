import React, { useState } from 'react';
import { Plus, Trash2, Eye, FileText, X, CheckCircle, Briefcase, Users, TrendingUp, AlertCircle, Download, Mail, Calendar, MapPin, DollarSign, Clock } from 'lucide-react';

export default function CompanyInterface() {
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: 'Senior React Developer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      salary: '$80k - $120k',
      datePosted: '2025-11-10',
      views: 124,
      applicants: [
        { id: 1, name: 'Ahmed dossari ', email: 'ahmed@email.com', phone: '+966 50 123 4567', appliedDate: '2025-11-09', cv: 'ahmed_cv.pdf' , status: 'new' },
        { id: 2, name: 'Sara Mansour', email: 'sara@email.com', phone: '+216 02 345 678', appliedDate: '2025-11-13', cv: 'sara_cv.pdf', status: 'reviewed' },
        { id: 3, name: 'Aminata Diouf ', email: 'aminata@email.com', phone: '+221 77 123 4567', appliedDate: '2025-11-14', cv: 'aminata_cv.pdf', status: 'new' }
      ]
    },
    {
      id: 2,
      title: 'UX/UI Designer',
      department: 'Design',
      location: 'Tunis',
      type: 'Contract',
      salary: '$50k - $70k',
      datePosted: '2025-11-08',
      views: 89,
      applicants: [
        { id: 4, name: 'Ahmed Ben Ali', email: 'ahmed@email.com', phone: '+216 08 765 432', appliedDate: '2025-11-12', cv: 'ahmed_cv.pdf', status: 'interviewed' }
      ]
    }
  ]);
  
  const [SAForm, setSAForm] = useState(false);
  const [notification, setNotification] = useState(null);
  const [newJob, setNewJob] = useState({ 
    title: '',
    Company_Name:'', 
    department: '', 
    location: '', 
    type: 'Full-time',
    salary: '' ,
    description :''
  });
  const [expdJob, setExpdJob] = useState(null);
  const [filterStat, setFilterStat] = useState('all');

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const addJob = () => {
    if (!newJob.title.trim() || !newJob.department.trim() || !newJob.location.trim() ||!newJob.description.trim()) {
      showNotification('Please fill all required fields', 'error');
      return;
    }

    const job = {
      id: Date.now(),
      title: newJob.title,
      companyName: newJob.Company_Name,
      department: newJob.department,
      location: newJob.location,
      type: newJob.type,
      salary: newJob.salary,
      description : newJob.description,
      datePosted: new Date().toISOString().split('T')[0],
      views: 0,
      applicants: []
    };

    setJobs([job, ...jobs]);
    setNewJob({ title: '',Company_Name:'', department: '', location: '', type: 'Full-time', salary: '' , description : ''});
    setSAForm(false);
    showNotification('🎉 Job posted successfully!');
  };

  const removeJob = (id) => {
    setJobs(jobs.filter(j => j.id !== id));
    setExpdJob(null);
    showNotification('Job removed successfully!', 'warning');
  };

  const updateAppStat = (jobId, applicantId, newStatus) => {
    setJobs(jobs.map(job => {
      if (job.id === jobId) {
        return {
          ...job,
          applicants: job.applicants.map(app => 
            app.id === applicantId ? { ...app, status: newStatus } : app
          )
        };
      }
      return job;
    }));
    showNotification('Applicant status updated!');
  };

  const totalJobs = jobs.length;
  const totalApplicants = jobs.reduce((sum, job) => sum + job.applicants.length, 0);
  const totalViews = jobs.reduce((sum, job) => sum + job.views, 0);

  const getStatC = (status) => {
    const colors = {
      new: 'bg-blue-50 text-blue-700 border-blue-200',
      reviewed: 'bg-amber-50 text-amber-700 border-amber-200',
      interviewed: 'bg-purple-50 text-purple-700 border-purple-200',
      hired: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      rejected: 'bg-red-50 text-red-700 border-red-200'
    };
    return colors[status] || colors.new;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-indigo-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-indigo-600 bg-clip-text text-transparent mb-2 flex items-center gap-3">
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-3 rounded-2xl shadow-lg">
                  <Briefcase className="text-white" size={36} />
                </div>
                Talynk
              </h1>
              <p className="text-gray-600 text-lg ml-1">Streamline your recruitment process</p>
            </div>
            <button
              onClick={() => setSAForm(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300 font-semibold"
            >
              <Plus size={20} />
              Post Job
            </button>
          </div>

         
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium mb-1">Active Positions</p>
                  <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">{totalJobs}</p>
                </div>
                <div className="bg-gradient-to-br from-blue-100 to-cyan-100 p-4 rounded-2xl">
                  <Briefcase className="text-blue-600" size={32} />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-indigo-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium mb-1">Total Candidates</p>
                  <p className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">{totalApplicants}</p>
                </div>
                <div className="bg-gradient-to-br from-indigo-100 to-purple-100 p-4 rounded-2xl">
                  <Users className="text-indigo-600" size={32} />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-cyan-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium mb-1">Total Impressions</p>
                  <p className="text-4xl font-bold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">{totalViews}</p>
                </div>
                <div className="bg-gradient-to-br from-cyan-100 to-teal-100 p-4 rounded-2xl">
                  <TrendingUp className="text-cyan-600" size={32} />
                </div>
              </div>
            </div>
          </div>
        </div>

        
        {notification && (
          <div className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-xl shadow-2xl backdrop-blur-lg transform transition-all ${
            notification.type === 'success' ? 'bg-emerald-500/95' : 
            notification.type === 'warning' ? 'bg-orange-500/95' :
            'bg-red-500/95'
          } text-white`}>
            <CheckCircle size={20} />
            <span className="font-medium">{notification.message}</span>
          </div>
        )}

        {SAForm && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-40 p-4">
            <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                  <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2 rounded-xl">
                    <Briefcase className="text-white" size={28} />
                  </div>
                  Post New Position
                </h2>
                <button 
                  onClick={() => setSAForm(false)} 
                  className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-2 transition-all"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Company Name</label>
                  <input
                    type="text"
                    value={newJob.Company_Name}
                    onChange={(e) => setNewJob({ ...newJob, Company_Name: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="e.g. Tech Solutions Inc."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Job Title *</label>
                  <input
                    type="text"
                    value={newJob.title}
                    onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="e.g. Senior React Developer"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Department *</label>
                    <input
                      type="text"
                      value={newJob.department}
                      onChange={(e) => setNewJob({ ...newJob, department: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="e.g. Engineering"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Location *</label>
                    <input
                      type="text"
                      value={newJob.location}
                      onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="e.g. Remote, Tunis"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Description *</label>
                  <textarea
                    value={newJob.description}
                    onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Brief job description..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Job Type</label>
                    <select
                      value={newJob.type}
                      onChange={(e) => setNewJob({ ...newJob, type: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                      <option>Full-time</option>
                      <option>Part-time</option>
                      <option>Contract</option>
                      <option>Internship</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Salary Range</label>
                    <input
                      type="text"
                      value={newJob.salary}
                      onChange={(e) => setNewJob({ ...newJob, salary: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="e.g. $80k - $120k"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <button
                  onClick={addJob}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl hover:shadow-xl transition-all font-semibold"
                >
                  Post Job
                </button>
                <button
                  onClick={() => setSAForm(false)}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl hover:bg-gray-200 transition-all font-semibold"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-5">
          {jobs.length === 0 ? (
            <div className="bg-white rounded-3xl shadow-lg p-16 text-center border border-gray-100">
              <div className="bg-gradient-to-br from-blue-100 to-indigo-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="text-blue-600" size={40} />
              </div>
              <p className="text-gray-800 text-xl font-semibold mb-2">No positions posted yet</p>
              <p className="text-gray-500">Start building your team by posting your first job</p>
            </div>
          ) : (
            jobs.map(job => (
              <div key={job.id} className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="bg-gradient-to-br from-blue-100 to-indigo-100 p-3 rounded-xl">
                          <Briefcase className="text-blue-600" size={24} />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-gray-800 mb-2">{job.title}</h3>
                          <div className="flex flex-wrap items-center gap-3 text-sm">
                            <span className="flex items-center gap-1 text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg font-medium">
                              <Briefcase size={14} />
                              {job.department}
                            </span>
                            <span className="flex items-center gap-1 text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg font-medium">
                              <MapPin size={14} />
                              {job.location}
                            </span>
                            <span className="flex items-center gap-1 text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg font-semibold border border-blue-200">
                              <Clock size={14} />
                              {job.type}
                            </span>
                            {job.salary && (
                              <span className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg font-semibold">
                                <DollarSign size={14} />
                                {job.salary}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-4 ml-14 text-sm">
                        <span className="flex items-center gap-1.5 text-gray-500">
                          <Calendar size={14} />
                          Posted {job.datePosted}
                        </span>
                        <span className="flex items-center gap-1.5 text-gray-500">
                          <Eye size={14} />
                          {job.views} views
                        </span>
                        <span className="flex items-center gap-1.5 text-gray-500">
                          <Users size={14} />
                          {job.applicants.length} applicants
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => setExpdJob(expdJob === job.id ? null : job.id)}
                        className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-all text-sm font-medium"
                      >
                        {expdJob === job.id ? 'Hide' : 'View'}
                      </button>
                      <button
                        onClick={() => removeJob(job.id)}
                        className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all text-sm font-medium flex items-center gap-1.5"
                      >
                        <Trash2 size={14} />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>

                {expdJob === job.id && (
                  <div className="border-t border-gray-100 bg-gray-50 p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h4 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        <Users size={24} />
                        Candidates ({job.applicants.length})
                      </h4>
                      <div className="flex gap-2">
                        {['all', 'new', 'reviewed', 'interviewed'].map(status => (
                          <button
                            key={status}
                            onClick={() => setFilterStat(status)}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                              filterStat === status 
                                ? 'bg-blue-600 text-white shadow-md' 
                                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                            }`}
                          >
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {job.applicants.length === 0 ? (
                      <div className="text-center py-12 bg-white rounded-2xl border border-gray-200">
                        <div className="bg-gradient-to-br from-blue-100 to-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                          <AlertCircle className="text-blue-600" size={32} />
                        </div>
                        <p className="text-gray-600 font-medium">No candidates yet</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {job.applicants
                          .filter(app => filterStat === 'all' || app.status === filterStat)
                          .map(applicant => (
                          <div key={applicant.id} className="bg-white rounded-2xl p-5 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all">
                            <div className="flex justify-between items-start gap-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="bg-gradient-to-br from-blue-100 to-indigo-100 w-12 h-12 rounded-xl flex items-center justify-center font-bold text-blue-600">
                                    {applicant.name.charAt(0)}
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                      <h5 className="text-lg font-bold text-gray-800">{applicant.name}</h5>
                                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getStatC(applicant.status)}`}>
                                        {applicant.status}
                                      </span>
                                    </div>
                                    <div className="space-y-1 text-sm text-gray-600">
                                      <p className="flex items-center gap-1.5">
                                        <Mail size={14} />
                                        {applicant.email}
                                      </p>
                                      <p className="flex items-center gap-1.5">
                                        📱 {applicant.phone}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <p className="flex items-center gap-1.5 text-xs text-gray-500 ml-14">
                                  <Calendar size={12} />
                                  Applied on {applicant.appliedDate}
                                </p>
                              </div>
                              
                              <div className="flex flex-col gap-2">
                                <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all text-sm font-medium">
                                  <Download size={14} />
                                  CV
                                </button>
                                <select
                                  value={applicant.status}
                                  onChange={(e) => updateAppStat(job.id, applicant.id, e.target.value)}
                                  className="px-3 py-2 bg-white text-gray-700 rounded-lg border-2 border-gray-200 text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                  <option value="new">New</option>
                                  <option value="reviewed">Reviewed</option>
                                  <option value="interviewed">Interviewed</option>
                                  <option value="hired">Hired</option>
                                  <option value="rejected">Rejected</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}