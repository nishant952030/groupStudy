export type PlanType = 'fixed' | 'rolling';
export type TaskStatus = 'pending' | 'completed';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  createdAt?: string;
}

export interface Group {
  id: string;
  name: string;
  invite_code: string;
  members: string[]; // user IDs
  createdBy: string;
  createdAt: string;
}

export interface Plan {
  id: string;
  group_id: string;
  title: string;
  type: PlanType;
  deadline?: string | null; // ISO format or YYYY-MM-DD
  createdBy: string;
  createdAt: string;
}

export interface PlanTask {
  id: string;
  plan_id: string;
  group_id: string;
  title: string;
  scheduled_date?: string | null; // YYYY-MM-DD format
  status: TaskStatus;
  completed_by?: string | null;
  completed_at?: string | null;
  order: number;
}

export interface DailyLog {
  id: string;
  task_id: string;
  plan_id: string;
  group_id: string;
  user_id: string;
  completed_at: string;
  date: string; // YYYY-MM-DD
}

// UI extended types for TodayView
export interface DailyPullTask extends PlanTask {
  isOverdue?: boolean;
  planTitle?: string;
  planType?: PlanType;
}

// Group member progress state
export interface MemberProgress {
  user: User;
  completedCount: number;
  totalCount: number;
  percentage: number;
}
