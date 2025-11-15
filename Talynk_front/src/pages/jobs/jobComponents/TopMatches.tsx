import { TrendingUp } from 'lucide-react';
import { JobCard } from './JobCard';
import type { JobWithMatch } from '../types';

interface TopMatchesProps {
  jobs: JobWithMatch[];
  onBookmark: (jobId: string) => void;
  onView: (job:JobWithMatch) => void;
  onApply: (jobId: string, applyUrl: string) => void;
}

export function TopMatches({ jobs, onBookmark, onView, onApply }: TopMatchesProps) {
  if (jobs.length === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-900">Top Matches for You</h2>
      </div>
      <p className="text-gray-600 mb-6">
        Based on your profile, skills, and preferences
      </p>
      <div className="space-y-4">
        {jobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            onBookmark={onBookmark}
            onView={()=>onView(job)}
            onApply={onApply}
          />
        ))}
      </div>
    </div>
  );
}
