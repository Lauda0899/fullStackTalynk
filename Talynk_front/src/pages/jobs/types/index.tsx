export interface Job {
  id: string;
  title: string;
  company_name: string;
  company_logo_url: string | null;
  location: string;
  is_remote: boolean;
  employment_type: string;
  salary_min: number | null;
  salary_max: number | null;
  salary_currency: string;
  description: string;
  requirements?: string[];
  benefits?: string[];
  company_size: string | null;
  company_industry: string | null;
  company_rating: number | null;
  apply_url: string;
  posted_date: string;
  is_active?: boolean;
  created_at?: string;
}

export interface JobWithMatch extends Job {
  match_score?: number;
  match_reasons?: string[];
  is_bookmarked?: boolean;
  is_new?: boolean;
}

export interface JobFilters {
  search: string;
  location: string;
  company: string;
  salaryMin: number | null;
  salaryMax: number | null;
  isRemote: boolean | null;
  employmentType: string[];
}

export interface UserProfile {
  id: string;
  full_name: string | null;
  email: string;
  job_preferences: {
    titles?: string[];
    locations?: string[];
    salaryMin?: number;
    salaryMax?: number;
    remoteOnly?: boolean;
  };
  skills: string[];
  experience_level: string;
  created_at: string;
  updated_at: string;
}

export interface JobAlert {
  id: string;
  user_id: string;
  alert_type: string;
  job_id: string | null;
  is_read: boolean;
  message: string;
  created_at: string;
}
