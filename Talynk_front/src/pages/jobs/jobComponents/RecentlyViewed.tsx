import { Clock } from 'lucide-react';
import { JobCard } from './JobCard';
import type { JobWithMatch } from '../types';

interface RecentlyViewedProps {
  jobs: JobWithMatch[];
  onBookmark: (jobId: string) => void;
  onView: (job:JobWithMatch) => void;
  onApply: (jobId: string, applyUrl: string) => void;
}

export function RecentlyViewed({ jobs, onBookmark, onView, onApply }: RecentlyViewedProps) {
  if (jobs.length === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-6 h-6 text-gray-600" />
        <h2 className="text-2xl font-bold text-gray-900">Recently Viewed</h2>
      </div>
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
