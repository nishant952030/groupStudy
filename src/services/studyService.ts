import {
  collection, doc, getDoc, getDocs, setDoc, updateDoc,
  query, where, arrayRemove, arrayUnion, deleteDoc
} from 'firebase/firestore';
import { db, isRealFirebaseConfigured } from './firebase';
import { User, Squad, QuestionProgress, MemberStats, DailyTask, SolvedHistoryItem, DailySolvedHistory } from '../types';
import { STRIVER_180_TOPICS } from '../data/striver180Data';

// ─── Helpers ────────────────────────────────────────────────────────────────

function withTimeout<T>(promise: Promise<T>, ms = 5000): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error('Firestore timeout')), ms)
    )
  ]);
}

export function generateInviteCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
}

// Total questions in the striver sheet (used for % calculations)
export const TOTAL_STRIVER_QUESTIONS = STRIVER_180_TOPICS.reduce(
  (sum, t) => sum + t.subtopics.reduce((ss, s) => ss + s.questions.length, 0), 0
);

// ─── Event Bus ──────────────────────────────────────────────────────────────
type Listener = () => void;
const listeners: Set<Listener> = new Set();
function notify() { listeners.forEach(fn => fn()); }

// ─── Service ────────────────────────────────────────────────────────────────
export const studyService = {
  isDemo: !isRealFirebaseConfigured,
  enableDemoMode() { this.isDemo = true; },
  enableFirebaseMode() { this.isDemo = false; },

  subscribe(cb: Listener): () => void {
    listeners.add(cb);
    return () => listeners.delete(cb);
  },

  // ── Users ────────────────────────────────────────────────────────────────

  async saveUser(user: User): Promise<void> {
    if (!db) return;
    try {
      await setDoc(doc(db, 'users', user.id), user, { merge: true });
    } catch (e) {
      console.warn('[studyService] saveUser failed:', e);
    }
  },

  async getUser(uid: string): Promise<User | null> {
    if (!db) return null;
    try {
      const snap = await withTimeout(getDoc(doc(db, 'users', uid)));
      return snap.exists() ? (snap.data() as User) : null;
    } catch {
      return null;
    }
  },

  async getUsers(uids: string[]): Promise<Record<string, User>> {
    if (!db || uids.length === 0) return {};
    const result: Record<string, User> = {};
    await Promise.all(
      uids.map(async uid => {
        try {
          const snap = await withTimeout(getDoc(doc(db!, 'users', uid)));
          if (snap.exists()) result[uid] = snap.data() as User;
        } catch {
          // generate a fallback user
          result[uid] = {
            id: uid,
            name: `Member ${uid.slice(-4)}`,
            email: '',
            avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${uid}`
          };
        }
      })
    );
    return result;
  },

  // ── Squads ───────────────────────────────────────────────────────────────

  async getUserSquads(userId: string): Promise<Squad[]> {
    if (!db) return [];
    try {
      const snap = await withTimeout(
        getDocs(query(collection(db, 'squads'), where('members', 'array-contains', userId)))
      );
      return snap.docs.map(d => ({ id: d.id, ...d.data() } as Squad));
    } catch (e) {
      console.warn('[studyService] getUserSquads failed:', e);
      return [];
    }
  },

  async createSquad(name: string, userId: string): Promise<Squad> {
    if (!db) throw new Error('Firebase not configured');
    const ref = doc(collection(db, 'squads'));
    const squad: Squad = {
      id: ref.id,
      name: name.trim(),
      invite_code: generateInviteCode(),
      members: [userId],
      createdBy: userId,
      roadmapTemplate: 'striver180',
      createdAt: new Date().toISOString()
    };
    await setDoc(ref, squad);
    notify();
    return squad;
  },

  async joinSquad(inviteCode: string, userId: string): Promise<Squad> {
    if (!db) throw new Error('Firebase not configured');
    const code = inviteCode.trim().toUpperCase();
    try {
      const snap = await withTimeout(
        getDocs(query(collection(db, 'squads'), where('invite_code', '==', code)))
      );
      if (snap.empty) throw new Error(`No squad found with invite code "${code}"`);

      const d = snap.docs[0];
      const squad = { id: d.id, ...d.data() } as Squad;

      if (!squad.members.includes(userId)) {
        await updateDoc(doc(db, 'squads', squad.id), {
          members: arrayUnion(userId)
        });
        squad.members = [...squad.members, userId];
      }
      notify();
      return squad;
    } catch (err: any) {
      if (err?.code === 'permission-denied' || err?.message?.toLowerCase().includes('permission')) {
        throw new Error('Firestore permission denied. Please publish the updated security rules in your Firebase Console.');
      }
      throw err;
    }
  },

  async removeMember(squadId: string, memberIdToRemove: string, requestingUserId: string): Promise<void> {
    if (!db) return;
    const squadRef = doc(db, 'squads', squadId);
    const snap = await withTimeout(getDoc(squadRef));
    if (!snap.exists()) throw new Error('Squad not found');
    const squad = snap.data() as Squad;
    if (squad.createdBy !== requestingUserId) throw new Error('Only the squad creator can remove members');
    if (memberIdToRemove === squad.createdBy) throw new Error('Creator cannot remove themselves');
    await updateDoc(squadRef, { members: arrayRemove(memberIdToRemove) });
    notify();
  },

  // ── Progress ─────────────────────────────────────────────────────────────

  /**
   * Get progress for a single user in a squad.
   * Returns a Set of solved question IDs for O(1) lookup.
   */
  async getUserProgress(squadId: string, userId: string): Promise<Set<number>> {
    if (!db) return new Set();
    try {
      const snap = await withTimeout(
        getDocs(query(
          collection(db, 'progress'),
          where('squad_id', '==', squadId),
          where('user_id', '==', userId),
          where('solved', '==', true)
        ))
      );
      const ids = snap.docs.map(d => (d.data() as QuestionProgress).question_id);
      return new Set(ids);
    } catch (e) {
      console.warn('[studyService] getUserProgress failed:', e);
      return new Set();
    }
  },

  /**
   * Get ALL users' progress for a squad.
   * Returns a map: questionId → Set of userIds who solved it.
   */
  async getSquadProgress(squadId: string): Promise<Record<number, Set<string>>> {
    if (!db) return {};
    try {
      const snap = await withTimeout(
        getDocs(query(
          collection(db, 'progress'),
          where('squad_id', '==', squadId),
          where('solved', '==', true)
        ))
      );
      const result: Record<number, Set<string>> = {};
      snap.docs.forEach(d => {
        const p = d.data() as QuestionProgress;
        if (!result[p.question_id]) result[p.question_id] = new Set();
        result[p.question_id].add(p.user_id);
      });
      return result;
    } catch (e) {
      console.warn('[studyService] getSquadProgress failed:', e);
      return {};
    }
  },

  /**
   * Mark a question as solved or unsolved for a user.
   */
  async setQuestionSolved(
    squadId: string,
    userId: string,
    questionId: number,
    solved: boolean
  ): Promise<void> {
    if (!db) return;
    const id = `${squadId}_${userId}_${questionId}`;
    const progress: QuestionProgress = {
      id,
      squad_id: squadId,
      user_id: userId,
      question_id: questionId,
      solved,
      solved_at: solved ? new Date().toISOString() : null
    };
    try {
      await setDoc(doc(db, 'progress', id), progress);
      notify();
    } catch (e) {
      console.warn('[studyService] setQuestionSolved failed:', e);
    }
  },

  /**
   * Get solved count per squad member for leaderboard.
   */
  async getSquadMemberStats(squadId: string, members: User[]): Promise<MemberStats[]> {
    if (!db || members.length === 0) return [];
    try {
      const snap = await withTimeout(
        getDocs(query(
          collection(db, 'progress'),
          where('squad_id', '==', squadId),
          where('solved', '==', true)
        ))
      );
      // Count solved per user
      const solvedCounts: Record<string, number> = {};
      snap.docs.forEach(d => {
        const uid = (d.data() as QuestionProgress).user_id;
        solvedCounts[uid] = (solvedCounts[uid] || 0) + 1;
      });

      return members.map(user => {
        const solved = solvedCounts[user.id] || 0;
        return {
          user,
          solved,
          total: TOTAL_STRIVER_QUESTIONS,
          percentage: Math.round((solved / TOTAL_STRIVER_QUESTIONS) * 100)
        };
      }).sort((a, b) => b.solved - a.solved);
    } catch (e) {
      console.warn('[studyService] getSquadMemberStats failed:', e);
      return members.map(user => ({
        user,
        solved: 0,
        total: TOTAL_STRIVER_QUESTIONS,
        percentage: 0
      }));
    }
  },

  // ── Daily Tasks (Shared across squad, per-user progress) ────────────────────

  /**
   * Get all daily tasks for a squad on a specific date (YYYY-MM-DD).
   * All members can read everyone's daily tasks.
   */
  async getDailyTasks(squadId: string, date: string): Promise<DailyTask[]> {
    if (!db) return [];
    try {
      const snap = await withTimeout(
        getDocs(query(
          collection(db, 'daily_tasks'),
          where('squad_id', '==', squadId),
          where('date', '==', date)
        ))
      );
      const tasks = snap.docs.map(d => ({ id: d.id, ...d.data() } as DailyTask));
      return tasks.sort((a, b) => (a.created_at || '').localeCompare(b.created_at || ''));
    } catch (e) {
      console.warn('[studyService] getDailyTasks failed:', e);
      return [];
    }
  },

  /**
   * Add a daily task for a user in the squad.
   */
  async addDailyTask(
    squadId: string,
    userId: string,
    date: string,
    title: string,
    questionId?: number | null,
    topicTitle?: string
  ): Promise<DailyTask> {
    if (!db) throw new Error('Firebase not configured');
    const ref = doc(collection(db, 'daily_tasks'));
    const task: DailyTask = {
      id: ref.id,
      squad_id: squadId,
      user_id: userId,
      date,
      title: title.trim(),
      question_id: questionId ?? null,
      topic_title: topicTitle || '',
      completed: false,
      completed_at: null,
      created_at: new Date().toISOString()
    };
    await setDoc(ref, task);
    notify();
    return task;
  },

  /**
   * Toggle a daily task completion. Only the owner can toggle their task.
   * If the task is linked to a Striver question, keeps roadmap progress in sync!
   */
  async toggleDailyTask(
    taskId: string,
    completed: boolean,
    squadId: string,
    userId: string,
    questionId?: number | null
  ): Promise<void> {
    if (!db) return;
    try {
      await updateDoc(doc(db, 'daily_tasks', taskId), {
        completed,
        completed_at: completed ? new Date().toISOString() : null
      });

      // If tied to a roadmap question, sync question progress as well
      if (questionId) {
        await this.setQuestionSolved(squadId, userId, questionId, completed);
      }
      notify();
    } catch (e) {
      console.warn('[studyService] toggleDailyTask failed:', e);
    }
  },

  /**
   * Delete a daily task.
   */
  async deleteDailyTask(taskId: string): Promise<void> {
    if (!db) return;
    try {
      await deleteDoc(doc(db, 'daily_tasks', taskId));
      notify();
    } catch (e) {
      console.warn('[studyService] deleteDailyTask failed:', e);
    }
  },

  /**
   * Get multi-day history of solved questions and completed tasks across all squad members.
   * Grouped by date (YYYY-MM-DD) in reverse chronological order.
   */
  async getSquadSolvedHistory(squadId: string): Promise<DailySolvedHistory[]> {
    if (!db) return [];
    try {
      const [progSnap, tasksSnap] = await Promise.all([
        withTimeout(getDocs(query(
          collection(db, 'progress'),
          where('squad_id', '==', squadId),
          where('solved', '==', true)
        ))),
        withTimeout(getDocs(query(
          collection(db, 'daily_tasks'),
          where('squad_id', '==', squadId),
          where('completed', '==', true)
        )))
      ]);

      // Quick lookup map for Striver questions
      const questionMap = new Map<number, { label: string; topicLabel: string }>();
      STRIVER_180_TOPICS.forEach(topic => {
        topic.subtopics.forEach(sub => {
          sub.questions.forEach(q => {
            questionMap.set(q.id, { label: q.label, topicLabel: topic.label });
          });
        });
      });

      const historyByDate: Record<string, SolvedHistoryItem[]> = {};
      const seenKeys = new Set<string>();

      // 1. Process roadmap progress solves
      progSnap.docs.forEach(docSnap => {
        const p = docSnap.data() as QuestionProgress;
        const qMeta = questionMap.get(p.question_id);
        const solvedAt = p.solved_at || new Date().toISOString();
        const date = solvedAt.split('T')[0];
        const dedupeKey = `${p.user_id}_q_${p.question_id}_${date}`;

        if (!seenKeys.has(dedupeKey)) {
          seenKeys.add(dedupeKey);
          if (!historyByDate[date]) historyByDate[date] = [];
          historyByDate[date].push({
            id: p.id,
            user_id: p.user_id,
            title: qMeta?.label || `Question #${p.question_id}`,
            question_id: p.question_id,
            topic: qMeta?.topicLabel || 'DSA Problem',
            solved_at: solvedAt,
            date
          });
        }
      });

      // 2. Process daily tasks completed
      tasksSnap.docs.forEach(docSnap => {
        const t = docSnap.data() as DailyTask;
        const date = t.date || (t.completed_at ? t.completed_at.split('T')[0] : new Date().toISOString().split('T')[0]);
        const dedupeKey = t.question_id ? `${t.user_id}_q_${t.question_id}_${date}` : `${t.id}`;

        if (!seenKeys.has(dedupeKey)) {
          seenKeys.add(dedupeKey);
          if (!historyByDate[date]) historyByDate[date] = [];
          historyByDate[date].push({
            id: t.id,
            user_id: t.user_id,
            title: t.title,
            question_id: t.question_id,
            topic: t.topic_title || 'Daily Goal',
            solved_at: t.completed_at || t.created_at || new Date().toISOString(),
            date
          });
        }
      });

      // Format into DailySolvedHistory sorted newest date first
      const sortedDates = Object.keys(historyByDate).sort((a, b) => b.localeCompare(a));

      return sortedDates.map(date => {
        const items = historyByDate[date].sort((a, b) => b.solved_at.localeCompare(a.solved_at));
        const byUser: Record<string, number> = {};
        items.forEach(it => {
          byUser[it.user_id] = (byUser[it.user_id] || 0) + 1;
        });

        return {
          date,
          totalSolved: items.length,
          byUser,
          items
        };
      });
    } catch (e) {
      console.warn('[studyService] getSquadSolvedHistory failed:', e);
      return [];
    }
  }
};


