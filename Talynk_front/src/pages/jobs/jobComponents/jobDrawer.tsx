import { X, MapPin, Briefcase, DollarSign, Building2, Users, Star, Calendar } from 'lucide-react';
import { useEffect } from 'react';
import { Job, JobWithMatch } from '../types';

interface JobDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  job: JobWithMatch | null;
  onApply: (jobId: string, applyUrl?: string) => void;
}

export default function JobDrawer({ isOpen, onClose, job, onApply }: JobDrawerProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!job) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[680px] bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors z-10"
            aria-label="Close drawer"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto">
            {/* Header Section */}
            <div className="bg-gradient-to-b from-gray-50 to-white border-b border-gray-200 px-6 sm:px-8 pt-6 pb-6">
              <div className="flex items-start gap-4 mb-4">
                {job.company_logo_url ? (
                  <img
                    src={job.company_logo_url}
                    alt={job.company_name}
                    className="w-16 h-16 rounded-lg object-cover border border-gray-200 flex-shrink-0"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0 shadow-sm">
                    {job.company_name[0]}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h1 className="text-2xl font-semibold text-gray-900 mb-1 leading-tight">
                    {job.title}
                  </h1>
                  <p className="text-lg text-gray-700 mb-2">{job.company_name}</p>
                  <div className="flex flex-wrap gap-2 text-sm text-gray-600">
                    {job.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </span>
                    )}
                    {job.employment_type && (
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4" />
                        {job.employment_type}
                      </span>
                    )}
                    {job.is_remote && (
                      <span className="px-2 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium">
                        Remote
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Salary & Quick Info */}
              <div className="flex flex-wrap gap-3 items-center">
                {job.salary_min && job.salary_max && (
                  <div className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg">
                    <DollarSign className="w-5 h-5 text-gray-600" />
                    <span className="font-semibold text-gray-900">
                      {job.salary_currency} {job.salary_min.toLocaleString()} - {job.salary_max.toLocaleString()}
                    </span>
                  </div>
                )}
                {job.posted_date && (
                  <div className="flex items-center gap-1.5 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>Posted {job.posted_date}</span>
                  </div>
                )}
              </div>

              {/* Match Score */}
              {job.match_score && (
                <div className="mt-4 p-4 bg-blue-50 border border-blue-100 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-blue-900">Your Match Score</span>
                    <span className="text-2xl font-bold text-blue-600">{job.match_score}%</span>
                  </div>
                  {job.match_reasons && job.match_reasons.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {job.match_reasons.map((reason, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-white text-blue-700 text-xs rounded-full border border-blue-200"
                        >
                          {reason}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Content Sections */}
            <div className="px-6 sm:px-8 py-6 space-y-8">
              {/* About the Job */}
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">About the job</h2>
                <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {job.description}
                </div>
              </section>

              {/* Requirements */}
              {job.requirements && job.requirements.length > 0 && (
                <section>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">Requirements</h2>
                  <ul className="space-y-2">
                    {job.requirements.map((req, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-gray-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 flex-shrink-0" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Benefits */}
              {job.benefits && job.benefits.length > 0 && (
                <section>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">Benefits</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {job.benefits.map((benefit, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* About the Company */}
              <section className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">About the company</h2>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Building2 className="w-5 h-5 text-gray-600" />
                    <div>
                      <span className="text-sm text-gray-600">Industry</span>
                      <p className="font-medium text-gray-900">{job.company_industry || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-gray-600" />
                    <div>
                      <span className="text-sm text-gray-600">Company Size</span>
                      <p className="font-medium text-gray-900">{job.company_size || 'N/A'}</p>
                    </div>
                  </div>
                  {job.company_rating && (
                    <div className="flex items-center gap-3">
                      <Star className="w-5 h-5 text-gray-600" />
                      <div>
                        <span className="text-sm text-gray-600">Rating</span>
                        <div className="flex items-center gap-1">
                          <p className="font-medium text-gray-900">{job.company_rating}</p>
                          <span className="text-gray-600">/ 5.0</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </section>
            </div>
          </div>

          {/* Sticky Footer */}
          <div className="border-t border-gray-200 bg-white px-6 sm:px-8 py-4">
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-full font-semibold hover:bg-blue-50 transition-colors"
              >
                Save
              </button>
              <button
                onClick={() => onApply(job.id, job.apply_url)}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors shadow-sm"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}