import { useState } from "react";
import { Search, Bookmark } from "lucide-react";
import { JobCard } from "./jobComponents/JobCard";
import { FilterPanel } from "./jobComponents/FilterPanel";
import { TopMatches } from "./jobComponents/TopMatches"; // your component
import type { JobWithMatch, JobFilters,JobAlert } from "../jobs/types";
import { RecentlyViewed } from "./jobComponents/RecentlyViewed";
import { AlertsPanel } from "./jobComponents/AlertsPanel";
import { recentlyViewed ,staticJobs,staticAlerts} from "./data";
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import JobDrawer from "./jobComponents/jobDrawer";


export function JobDashboard() {
  //Static Recently viewed
  // Inside your Dashboard component, before return


  // --- Static filters
  const [filters, setFilters] = useState<JobFilters>({
    search: "",
    location: "",
    company: "",
    salaryMin: null,
    salaryMax: null,
    isRemote: null,
    employmentType: [],
  });

  const handleClearFilters = () => {
    setFilters({
      search: "",
      location: "",
      company: "",
      salaryMin: null,
      salaryMax: null,
      isRemote: null,
      employmentType: [],
    });
  };

  // --- Static jobs
  

  // --- Tabs
  const [activeTab, setActiveTab] = useState<"all" | "bookmarked">("all");
  const filteredJobs =
    activeTab === "bookmarked"
      ? staticJobs.filter((j) => j.is_bookmarked)
      : staticJobs;

   const [selectedJob, setSelectedJob] = useState<JobWithMatch | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // --- Handlers
  const handleBookmark = (jobId: string) => console.log("Bookmark toggled:", jobId);
  const handleView = (job: JobWithMatch) => {
  setSelectedJob(job);
  setIsDrawerOpen(true);
};

const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedJob(null);
  };

  const handleApply = (jobId: string, applyUrl?: string) => {
    if (applyUrl) window.open(applyUrl, '_blank', 'noopener,noreferrer');
  };






  // --- Example: pick top matches
  const topMatches = staticJobs.filter((job) => job.match_score && job.match_score >= 70);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-2">
          <Search className="w-8 h-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">Job Dashboard</h1>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left sidebar filter */}
          <aside className="lg:col-span-1">
            <FilterPanel
              filters={filters}
              onFiltersChange={setFilters}
              onClearFilters={handleClearFilters}
            />
          </aside>

          {/* Main content */}
          <main className="lg:col-span-3">
            <AlertsPanel
            alerts={staticAlerts}
            onMarkAsRead={(id) => console.log("Mark as read", id)}
            onDismiss={(id) => console.log("Dismiss alert", id)}
        />
            {/* Top matches section */}
            {topMatches.length > 0 && (
              <TopMatches
                jobs={topMatches}
                onBookmark={handleBookmark}
                onView={handleView}
                onApply={handleApply}
              />
            )}

            {/* Tabs */}
            <div className="flex items-center gap-4 mb-6">
              <button
                onClick={() => setActiveTab("all")}
                className={`px-4 py-2 font-medium rounded-lg transition-colors ${
                  activeTab === "all"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                All Jobs
              </button>
              <button
                onClick={() => setActiveTab("bookmarked")}
                className={`flex items-center gap-2 px-4 py-2 font-medium rounded-lg transition-colors ${
                  activeTab === "bookmarked"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Bookmark className="w-4 h-4" />
                Saved Jobs
              </button>
            </div>

            {/* Job cards */}
            {filteredJobs.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                <p className="text-gray-600">No jobs to display</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onBookmark={handleBookmark}
                    onView={handleView}
                    onApply={handleApply}
                  />
                ))}
              </div>
              
            )}
            <RecentlyViewed
                jobs={recentlyViewed}
                onBookmark={handleBookmark}
                onView={handleView}
                onApply={handleApply}
             />
             
            <JobDrawer
            isOpen={isDrawerOpen}
            onClose={handleCloseDrawer}
            job={selectedJob}
            onApply={handleApply}
             />



          </main>
        </div>
      </div>
    </div>
  );
}
