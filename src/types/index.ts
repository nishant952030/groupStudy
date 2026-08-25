// ─── Plan Types ────────────────────────────────────────────────────────────

export type PlanType = 'roadmap' | 'sprint'; // roadmap = open-ended, sprint = time-boxed
export type SubtaskStatus = 'not_started' | 'in_progress' | 'completed';
export type TaskPriority = 'low' | 'medium' | 'high';

// ─── Core Entities ─────────────────────────────────────────────────────────

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

/**
 * A shared study plan for the whole group.
 * Contains Topics → Subtasks. Shared progress is per-user.
 */
export interface Plan {
  id: string;
  group_id: string;
  title: string;
  description?: string | null;
  type: PlanType;           // 'roadmap' = no deadline, 'sprint' = fixed window
  start_date?: string | null; // YYYY-MM-DD
  end_date?: string | null;   // YYYY-MM-DD (sprint deadline)
  createdBy: string;
  createdAt: string;
}

/**
 * A section/chapter within a Plan.
 * e.g. "Arrays & Hashing", "Dynamic Programming", "System Design Basics"
 */
export interface PlanTopic {
  id: string;
  plan_id: string;
  group_id: string;
  title: string;
  description?: string | null;
  estimated_days?: number | null; // How many days this topic roughly takes
  order: number;
}

/**
 * An individual task/problem/chapter within a Topic.
 * Status is NOT stored here — it's per-user in UserSubtaskStatus.
 */
export interface PlanTask {
  id: string;
  plan_id: string;
  topic_id: string;
  group_id: string;
  title: string;
  description?: string | null;   // What to do / learn
  resources?: string | null;     // Links, chapter refs, LeetCode URLs etc
  priority?: TaskPriority;
  estimated_hours?: number | null;
  order: number;
}

/**
 * Per-user status for a specific subtask.
 * This is the core of the personal progress tracking system.
 * A new user joining a plan starts with no records = 0% progress.
 */
export interface UserSubtaskStatus {
  id: string;           // `${task_id}_${user_id}`
  task_id: string;
  topic_id: string;
  plan_id: string;
  group_id: string;
  user_id: string;
  status: SubtaskStatus; // 'not_started' | 'in_progress' | 'completed'
  started_at?: string | null;
  completed_at?: string | null;
  note?: string | null;  // Personal note on this subtask
}

// ─── Dashboard / Progress Types ────────────────────────────────────────────

/** Group member's DAILY progress (Today tab) */
export interface MemberProgress {
  user: User;
  completedCount: number; // subtasks completed today
  totalCount: number;     // subtasks in active plan
  percentage: number;
}

/** A topic with all its subtasks (used for rendering plan detail) */
export interface TopicWithTasks {
  topic: PlanTopic;
  tasks: PlanTask[];
}

/** Per-user overall progress on a Plan (Plans tab) */
export interface PlanMemberProgress {
  user: User;
  completed: number;
  total: number;
  percentage: number;
  // Per-topic breakdown
  topicProgress?: { topicId: string; topicTitle: string; completed: number; total: number }[];
}

// ─── Legacy DailyLog (kept for backward compat) ────────────────────────────
export interface DailyLog {
  id: string;
  task_id: string;
  plan_id: string;
  group_id: string;
  user_id: string;
  completed_at: string;
  date: string; // YYYY-MM-DD
}

// ─── Retained for old code compat ──────────────────────────────────────────
export type PlanType_Old = 'fixed' | 'rolling';
export interface DailyPullTask extends PlanTask {
  isOverdue?: boolean;
  planTitle?: string;
  planType?: PlanType;
  userNote?: string;
  status?: SubtaskStatus; // Current user's status for this task
  topic_title?: string;
}

export interface PlanMemberProgress_Old {
  user: User;
  completed: number;
  total: number;
  percentage: number;
}

export interface TaskNote {
  id: string;
  task_id: string;
  user_id: string;
  group_id: string;
  plan_id: string;
  note: string;
  updated_at: string;
}
