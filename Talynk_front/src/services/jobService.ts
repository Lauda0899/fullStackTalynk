import { apiService } from './api';

export interface Job {
  _id: string;
  title: string;
  company: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  skills: string[];
  location: string;
  salary_range?: {
    min: number;
    max: number;
    currency: string;
  };
  employment_type: string;
  experience_level: string;
  education_level: string;
  remote_work: boolean;
  contact_email: string;
  application_deadline: string;
  category: string;
  tags: string[];
  benefits: string[];
  status: string;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export const jobService = {
  getAll: (filters?: any) => apiService.get<Job[]>('/jobs'),

  getById: (id: string) => apiService.get<Job>(`/jobs/${id}`),

  create: (data: Partial<Job>) => apiService.post<Job>('/jobs', data),

  update: (id: string, data: Partial<Job>) => apiService.put<Job>(`/jobs/${id}`, data),

  delete: (id: string) => apiService.delete<void>(`/jobs/${id}`),
};
