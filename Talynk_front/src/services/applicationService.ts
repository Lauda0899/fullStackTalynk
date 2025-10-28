import { apiService } from './api';

export interface Application {
  _id: string;
  job_id: string;
  candidate_id: string;
  cv_id: string;
  status: string;
  notes?: string;
  applied_at: string;
  updated_at: string;
}

export const applicationService = {
  getAll: () => apiService.get<Application[]>('/applications'),

  getById: (id: string) => apiService.get<Application>(`/applications/${id}`),

  getByJobId: (jobId: string) => apiService.get<Application[]>(`/applications/job/${jobId}`),

  create: (data: { job_id: string; cv_id: string; notes?: string }) =>
    apiService.post<Application>('/applications', data),

  updateStatus: (id: string, status: string) =>
    apiService.put<Application>(`/applications/${id}/status`, { status }),

  delete: (id: string) => apiService.delete<void>(`/applications/${id}`),
};
