import { useQuery } from '@tanstack/react-query';
import { cvService, CV } from '@/services/cvService';
import { applicationService, Application } from '@/services/applicationService';
import { interviewService, Interview } from '@/services/interviewService';
import { jobService, Job } from '@/services/jobService';

export const useCVs = () => {
  return useQuery<CV[], Error>({ queryKey: ['cvs'], queryFn: () => cvService.getAll() });
};

export const useApplications = () => {
  return useQuery<Application[], Error>({ queryKey: ['applications'], queryFn: () => applicationService.getAll() });
};

export const useInterviews = () => {
  return useQuery<Interview[], Error>({ queryKey: ['interviews'], queryFn: () => interviewService.getAll() });
};

export const useJobs = () => {
  return useQuery<Job[], Error>({ queryKey: ['jobs'], queryFn: () => jobService.getAll() });
};

export default {
  useCVs,
  useApplications,
  useInterviews,
  useJobs,
};
