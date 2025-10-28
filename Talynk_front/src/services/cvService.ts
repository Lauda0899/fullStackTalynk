import { apiService } from './api';

export interface CV {
  _id: string;
  user_id: string;
  title: string;
  language: string;
  content: {
    experience?: any[];
    education?: any[];
    skills?: any[];
  };
  created_at: string;
  updated_at: string;
}

export const cvService = {
  getAll: () => apiService.get<CV[]>('/cvs'),

  getById: (id: string) => apiService.get<CV>(`/cvs/${id}`),

  create: (data: Partial<CV>) => apiService.post<CV>('/cvs', data),

  update: (id: string, data: Partial<CV>) => apiService.put<CV>(`/cvs/${id}`, data),

  delete: (id: string) => apiService.delete<void>(`/cvs/${id}`),
};
