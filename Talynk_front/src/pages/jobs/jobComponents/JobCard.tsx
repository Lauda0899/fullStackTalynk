import { Bookmark, MapPin, Building2, DollarSign, Star, Briefcase, Clock, ExternalLink } from 'lucide-react';
import type { JobWithMatch } from '../types';

interface JobCardProps {
  job: JobWithMatch;
  onBookmark: (jobId: string) => void;
  onView: (job:JobWithMatch) => void;
  onApply: (jobId: string, applyUrl: string) => void;
}

export function JobCard({ job, onBookmark, onView, onApply }: JobCardProps) {
  const formatSalary = () => {
    if (!job.salary_min && !job.salary_max) return null;

    const format = (num: number) => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: job.salary_currency,
        maximumFractionDigits: 0,
      }).format(num);
    };

    if (job.salary_min && job.salary_max) {
      return `${format(job.salary_min)} - ${format(job.salary_max)}`;
    }
    return job.salary_min ? `${format(job.salary_min)}+` : `Up to ${format(job.salary_max!)}`;
  };

  const getTimeAgo = (date: string) => {
    const now = new Date();
    const posted = new Date(date);
    const diffInHours = Math.floor((now.getTime() - posted.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    const diffInWeeks = Math.floor(diffInDays / 7);
    return `${diffInWeeks}w ago`;
  };

  const handleCardClick = () => {
    onView(job);
  };

  const handleApplyClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onApply(job.id, job.apply_url);
  };

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onBookmark(job.id);
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-200 cursor-pointer group"
    >
      <div className="flex gap-4">
        <div className="flex-shrink-0">
          {job.company_logo_url ? (
            <img
              src={job.company_logo_url}
              alt={job.company_name}
              className="w-14 h-14 rounded-lg object-cover border border-gray-200"
            />
          ) : (
            <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <Building2 className="w-7 h-7 text-white" />
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4 mb-2">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {job.title}
                </h3>
                {job.is_new && (
                  <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                    New
                  </span>
                )}
                {job.match_score && job.match_score >= 70 && (
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                    {job.match_score}% Match
                  </span>
                )}
              </div>
              <p className="text-gray-700 font-medium">{job.company_name}</p>
            </div>

            <button
              onClick={handleBookmarkClick}
              className="flex-shrink-0 p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Bookmark job"
            >
              <Bookmark
                className={`w-5 h-5 ${
                  job.is_bookmarked ? 'fill-blue-600 text-blue-600' : 'text-gray-400'
                }`}
              />
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{job.location}</span>
              {job.is_remote && (
                <span className="ml-1 px-2 py-0.5 bg-green-50 text-green-700 text-xs font-medium rounded">
                  Remote
                </span>
              )}
            </div>

            <div className="flex items-center gap-1">
              <Briefcase className="w-4 h-4" />
              <span>{job.employment_type}</span>
            </div>

            {formatSalary() && (
              <div className="flex items-center gap-1 text-gray-900 font-medium">
                <DollarSign className="w-4 h-4" />
                <span>{formatSalary()}</span>
              </div>
            )}

            <div className="flex items-center gap-1 text-gray-500">
              <Clock className="w-4 h-4" />
              <span>{getTimeAgo(job.posted_date)}</span>
            </div>
          </div>

          <p className="text-gray-600 text-sm line-clamp-2 mb-3">
            {job.description}
          </p>

          {job.match_reasons && job.match_reasons.length > 0 && (
            <div className="mb-3">
              <div className="flex flex-wrap gap-1.5">
                {job.match_reasons.slice(0, 3).map((reason, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
                  >
                    {reason}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <div className="flex items-center gap-4 text-sm text-gray-500">
              {job.company_rating && (
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium text-gray-700">{job.company_rating}</span>
                </div>
              )}
              {job.company_size && (
                <span>{job.company_size}</span>
              )}
              {job.company_industry && (
                <span className="text-gray-400">•</span>
              )}
              {job.company_industry && (
                <span>{job.company_industry}</span>
              )}
            </div>

            <button
              onClick={handleApplyClick}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              <span>Apply Now</span>
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
