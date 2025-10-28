import { apiService } from './api';

export interface Interview {
  _id: string;
  candidate_id: string;
  job_title: string;
  questions: Array<{
    id: number;
    text: string;
    duration: number;
  }>;
  responses?: Array<{
    question_id: number;
    video_url: string;
    transcript?: string;
    duration: number;
  }>;
  status: string;
  score?: number;
  created_at: string;
  completed_at?: string;
}

export const interviewService = {
  getAll: () => apiService.get<Interview[]>('/interviews'),

  getById: (id: string) => apiService.get<Interview>(`/interviews/${id}`),

  getStats: () => apiService.get<any>('/interviews/stats'),

  create: (data: { job_title: string; questions: any[] }) =>
    apiService.post<Interview>('/interviews', data),

  update: (id: string, data: Partial<Interview>) =>
    apiService.put<Interview>(`/interviews/${id}`, data),

  addResponse: (id: string, response: any) =>
    apiService.post<Interview>(`/interviews/${id}/response`, response),

  delete: (id: string) => apiService.delete<void>(`/interviews/${id}`),
};
