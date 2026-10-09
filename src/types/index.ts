// ─── Core Entities ─────────────────────────────────────────────────────────

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  createdAt?: string;
}

/**
 * A study squad. Has one roadmap template baked in at creation.
 * Every member gets their own progress tracked per question.
 */
export interface Squad {
  id: string;
  name: string;
  invite_code: string;
  members: string[];   // user IDs
  createdBy: string;   // user ID of admin
  roadmapTemplate: 'striver180'; // Only one for now, easy to extend
  createdAt: string;
}

/**
 * A single user's solved status for one question in one squad.
 * Document ID: `${squadId}_${userId}_${questionId}`
 */
export interface QuestionProgress {
  id: string;          // `${squadId}_${userId}_${questionId}`
  squad_id: string;
  user_id: string;
  question_id: number; // Striver question ID
  solved: boolean;
  solved_at: string | null;
}

/**
 * Member with their solved count — used for the squad leaderboard tab.
 */
export interface MemberStats {
  user: User;
  solved: number;
  total: number;
  percentage: number;
}

/**
 * Daily Task created by or picked for a user on a given date in a squad.
 * Visible to all members; only author can toggle completed/delete.
 */
export interface DailyTask {
  id: string;
  squad_id: string;
  user_id: string;
  date: string;          // YYYY-MM-DD
  title: string;
  question_id?: number | null; // Optional reference to Striver question
  topic_title?: string;
  completed: boolean;
  completed_at?: string | null;
  created_at: string;
}

/**
 * An item recorded as solved on a specific date.
 */
export interface SolvedHistoryItem {
  id: string;
  user_id: string;
  title: string;
  question_id?: number | null;
  topic?: string;
  solved_at: string; // ISO date string
  date: string;      // YYYY-MM-DD
}

/**
 * Multi-day history entry grouped by date.
 */
export interface DailySolvedHistory {
  date: string;      // YYYY-MM-DD
  totalSolved: number;
  byUser: Record<string, number>; // user_id -> count
  items: SolvedHistoryItem[];
}

