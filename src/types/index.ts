export interface User {
  id: string;
  username: string;
  password: string;
}

export interface Job {
  id: string;
  userId: string;
  companyName: string;
  role: string;
  status: 'Applied' | 'Interviewed' | 'Rejected';
  dateApplied: string;
  companyAddress?: string;
  contactDetails?: string;
  jobDuties?: string;
  requirements?: string;
  notes?: string;
}

export interface AppContextType {
  currentUser: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  register: (username: string, password: string) => boolean;
  jobs: Job[];
  addJob: (job: Omit<Job, 'id' | 'userId'>) => void;
  updateJob: (id: string, job: Partial<Job>) => void;
  deleteJob: (id: string) => void;
}