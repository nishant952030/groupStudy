import {
  collection, doc, getDoc, getDocs, setDoc, updateDoc,
  query, where, deleteDoc
} from 'firebase/firestore';
import { db, isRealFirebaseConfigured } from './firebase';
import {
  User, Group, Plan, PlanTopic, PlanTask,
  UserSubtaskStatus, SubtaskStatus, TopicWithTasks,
  PlanMemberProgress, MemberProgress
} from '../types';

// ─── Utility Helpers ────────────────────────────────────────────────────────

export function getTodayDateString(offsetDays: number = 0): string {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().split('T')[0];
}

export function generateInviteCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) code += chars.charAt(Math.floor(Math.random() * chars.length));
  return code;
}

const todayStr = getTodayDateString(0);

// ─── Demo Data ──────────────────────────────────────────────────────────────

const DEMO_USERS: Record<string, User> = {
  'user-1': { id: 'user-1', name: 'Alex Chen', email: 'alex@example.com', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', createdAt: new Date().toISOString() },
  'user-2': { id: 'user-2', name: 'Sarah Miller', email: 'sarah@example.com', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80', createdAt: new Date().toISOString() },
  'user-3': { id: 'user-3', name: 'Marcus Vance', email: 'marcus@example.com', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', createdAt: new Date().toISOString() },
};

let demoGroups: Group[] = [
  { id: 'group-1', name: 'SDE Interview Prep Squad', invite_code: 'SDE001', members: ['user-1', 'user-2', 'user-3'], createdBy: 'user-1', createdAt: new Date().toISOString() }
];

let demoPlans: Plan[] = [
  {
    id: 'plan-dsa',
    group_id: 'group-1',
    title: 'DSA Mastery for Job Switch',
    description: 'Complete DSA preparation covering all major patterns needed for FAANG/top product company interviews.',
    type: 'roadmap',
    start_date: todayStr,
    end_date: getTodayDateString(60),
    createdBy: 'user-1',
    createdAt: new Date().toISOString()
  },
  {
    id: 'plan-sd',
    group_id: 'group-1',
    title: 'System Design Crash Course',
    description: '4-week crash course on system design fundamentals, from basics to designing real systems.',
    type: 'sprint',
    start_date: todayStr,
    end_date: getTodayDateString(28),
    createdBy: 'user-2',
    createdAt: new Date().toISOString()
  }
];

let demoTopics: PlanTopic[] = [
  // DSA Plan Topics
  { id: 't-dsa-1', plan_id: 'plan-dsa', group_id: 'group-1', title: 'Arrays & Hashing', description: 'Foundation of DSA — master hash maps, sets, and array manipulation patterns.', estimated_days: 4, order: 1 },
  { id: 't-dsa-2', plan_id: 'plan-dsa', group_id: 'group-1', title: 'Two Pointers', description: 'Solve O(n) problems that would otherwise be O(n²) using the two-pointer technique.', estimated_days: 3, order: 2 },
  { id: 't-dsa-3', plan_id: 'plan-dsa', group_id: 'group-1', title: 'Sliding Window', description: 'Subarray/substring problems using a dynamic window over the data.', estimated_days: 3, order: 3 },
  { id: 't-dsa-4', plan_id: 'plan-dsa', group_id: 'group-1', title: 'Binary Search', description: 'Beyond sorted arrays — apply binary search on answer ranges and 2D matrices.', estimated_days: 3, order: 4 },
  { id: 't-dsa-5', plan_id: 'plan-dsa', group_id: 'group-1', title: 'Linked Lists', description: 'Pointer manipulation, reversal, cycle detection, and merge patterns.', estimated_days: 4, order: 5 },
  { id: 't-dsa-6', plan_id: 'plan-dsa', group_id: 'group-1', title: 'Trees & BST', description: 'DFS, BFS, level-order, validate BST, LCA, and tree DP.', estimated_days: 5, order: 6 },
  { id: 't-dsa-7', plan_id: 'plan-dsa', group_id: 'group-1', title: 'Dynamic Programming', description: 'The hardest pattern — 1D, 2D DP, knapsack, and interval DP.', estimated_days: 7, order: 7 },
  // System Design Plan Topics
  { id: 't-sd-1', plan_id: 'plan-sd', group_id: 'group-1', title: 'Fundamentals', description: 'Scalability, availability, CAP theorem, and the language of system design.', estimated_days: 3, order: 1 },
  { id: 't-sd-2', plan_id: 'plan-sd', group_id: 'group-1', title: 'Databases & Storage', description: 'SQL vs NoSQL, indexing, sharding, and when to use each.', estimated_days: 4, order: 2 },
  { id: 't-sd-3', plan_id: 'plan-sd', group_id: 'group-1', title: 'Caching & CDN', description: 'Redis, cache invalidation strategies, CDN usage.', estimated_days: 3, order: 3 },
  { id: 't-sd-4', plan_id: 'plan-sd', group_id: 'group-1', title: 'Design Real Systems', description: 'URL Shortener, Instagram, WhatsApp, YouTube — full end-to-end designs.', estimated_days: 7, order: 4 },
];

let demoTasks: PlanTask[] = [
  // Arrays & Hashing
  { id: 'sk-dsa-1-1', plan_id: 'plan-dsa', topic_id: 't-dsa-1', group_id: 'group-1', title: 'Two Sum', description: 'Use a hash map to find pairs. Classic O(n) solution.', resources: 'LeetCode #1', order: 1 },
  { id: 'sk-dsa-1-2', plan_id: 'plan-dsa', topic_id: 't-dsa-1', group_id: 'group-1', title: 'Contains Duplicate', description: 'Hash set approach. Understand why sorted-array approach is O(n log n).', resources: 'LeetCode #217', order: 2 },
  { id: 'sk-dsa-1-3', plan_id: 'plan-dsa', topic_id: 't-dsa-1', group_id: 'group-1', title: 'Valid Anagram', description: 'Character frequency count. Two approaches: sort or hash map.', resources: 'LeetCode #242', order: 3 },
  { id: 'sk-dsa-1-4', plan_id: 'plan-dsa', topic_id: 't-dsa-1', group_id: 'group-1', title: 'Group Anagrams', description: 'Use sorted word as key in hash map to bucket anagrams.', resources: 'LeetCode #49', order: 4 },
  { id: 'sk-dsa-1-5', plan_id: 'plan-dsa', topic_id: 't-dsa-1', group_id: 'group-1', title: 'Top K Frequent Elements', description: 'Heap or bucket sort. Learn when to use each.', resources: 'LeetCode #347', priority: 'high', order: 5 },
  { id: 'sk-dsa-1-6', plan_id: 'plan-dsa', topic_id: 't-dsa-1', group_id: 'group-1', title: 'Product of Array Except Self', description: 'Prefix and postfix arrays. No division allowed — key constraint.', resources: 'LeetCode #238', priority: 'high', order: 6 },
  // Two Pointers
  { id: 'sk-dsa-2-1', plan_id: 'plan-dsa', topic_id: 't-dsa-2', group_id: 'group-1', title: 'Valid Palindrome', description: 'Two pointers from both ends. Handle non-alphanumeric chars.', resources: 'LeetCode #125', order: 1 },
  { id: 'sk-dsa-2-2', plan_id: 'plan-dsa', topic_id: 't-dsa-2', group_id: 'group-1', title: 'Two Sum II (Sorted Input)', description: 'Classic two-pointer on sorted array. Binary search alternative.', resources: 'LeetCode #167', order: 2 },
  { id: 'sk-dsa-2-3', plan_id: 'plan-dsa', topic_id: 't-dsa-2', group_id: 'group-1', title: '3Sum', description: 'Sort + fix one element + two pointers. Deduplication logic is key.', resources: 'LeetCode #15', priority: 'high', order: 3 },
  { id: 'sk-dsa-2-4', plan_id: 'plan-dsa', topic_id: 't-dsa-2', group_id: 'group-1', title: 'Container With Most Water', description: 'Greedy two-pointer. Always shrink the side with shorter height.', resources: 'LeetCode #11', priority: 'high', order: 4 },
  // Sliding Window
  { id: 'sk-dsa-3-1', plan_id: 'plan-dsa', topic_id: 't-dsa-3', group_id: 'group-1', title: 'Best Time to Buy & Sell Stock', description: 'Track running minimum. One-pass O(n).', resources: 'LeetCode #121', order: 1 },
  { id: 'sk-dsa-3-2', plan_id: 'plan-dsa', topic_id: 't-dsa-3', group_id: 'group-1', title: 'Longest Substring Without Repeating', description: 'Sliding window with a set. Expand right, shrink left on collision.', resources: 'LeetCode #3', priority: 'high', order: 2 },
  { id: 'sk-dsa-3-3', plan_id: 'plan-dsa', topic_id: 't-dsa-3', group_id: 'group-1', title: 'Longest Repeating Character Replacement', description: 'Window validity: count of majority char + replacements ≤ k.', resources: 'LeetCode #424', priority: 'high', order: 3 },
  { id: 'sk-dsa-3-4', plan_id: 'plan-dsa', topic_id: 't-dsa-3', group_id: 'group-1', title: 'Minimum Window Substring', description: 'Hard. Track frequency needs. Shrink window once all chars are met.', resources: 'LeetCode #76', priority: 'high', order: 4 },
  // Binary Search
  { id: 'sk-dsa-4-1', plan_id: 'plan-dsa', topic_id: 't-dsa-4', group_id: 'group-1', title: 'Binary Search (classic)', description: 'Template: lo, hi, mid. Off-by-one errors explained.', resources: 'LeetCode #704', order: 1 },
  { id: 'sk-dsa-4-2', plan_id: 'plan-dsa', topic_id: 't-dsa-4', group_id: 'group-1', title: 'Search in Rotated Sorted Array', description: 'Determine which half is sorted, then binary search within it.', resources: 'LeetCode #33', priority: 'high', order: 2 },
  { id: 'sk-dsa-4-3', plan_id: 'plan-dsa', topic_id: 't-dsa-4', group_id: 'group-1', title: 'Koko Eating Bananas', description: 'Binary search on the answer range. Common interview pattern.', resources: 'LeetCode #875', priority: 'high', order: 3 },
  // Linked Lists
  { id: 'sk-dsa-5-1', plan_id: 'plan-dsa', topic_id: 't-dsa-5', group_id: 'group-1', title: 'Reverse Linked List', description: 'Iterative and recursive. Master both — interviewers ask to switch.', resources: 'LeetCode #206', order: 1 },
  { id: 'sk-dsa-5-2', plan_id: 'plan-dsa', topic_id: 't-dsa-5', group_id: 'group-1', title: 'Merge Two Sorted Lists', description: 'Iterative pointer approach. Create dummy head to simplify.', resources: 'LeetCode #21', order: 2 },
  { id: 'sk-dsa-5-3', plan_id: 'plan-dsa', topic_id: 't-dsa-5', group_id: 'group-1', title: 'Linked List Cycle', description: 'Floyd\'s slow/fast pointer algorithm.', resources: 'LeetCode #141', priority: 'high', order: 3 },
  // Trees
  { id: 'sk-dsa-6-1', plan_id: 'plan-dsa', topic_id: 't-dsa-6', group_id: 'group-1', title: 'Invert Binary Tree', description: 'Recursive DFS. The classic "Did you invert a binary tree?" question.', resources: 'LeetCode #226', order: 1 },
  { id: 'sk-dsa-6-2', plan_id: 'plan-dsa', topic_id: 't-dsa-6', group_id: 'group-1', title: 'Maximum Depth of Binary Tree', description: 'DFS height calculation. Base case: null → 0.', resources: 'LeetCode #104', order: 2 },
  { id: 'sk-dsa-6-3', plan_id: 'plan-dsa', topic_id: 't-dsa-6', group_id: 'group-1', title: 'Level Order Traversal (BFS)', description: 'Queue-based BFS. Foundation for many tree interview questions.', resources: 'LeetCode #102', priority: 'high', order: 3 },
  { id: 'sk-dsa-6-4', plan_id: 'plan-dsa', topic_id: 't-dsa-6', group_id: 'group-1', title: 'Validate Binary Search Tree', description: 'Pass min/max bounds through recursion.', resources: 'LeetCode #98', priority: 'high', order: 4 },
  // DP
  { id: 'sk-dsa-7-1', plan_id: 'plan-dsa', topic_id: 't-dsa-7', group_id: 'group-1', title: 'Climbing Stairs', description: 'Fibonacci pattern. Your first DP problem.', resources: 'LeetCode #70', order: 1 },
  { id: 'sk-dsa-7-2', plan_id: 'plan-dsa', topic_id: 't-dsa-7', group_id: 'group-1', title: 'House Robber', description: '1D DP. dp[i] = max(dp[i-1], dp[i-2] + nums[i]).', resources: 'LeetCode #198', order: 2 },
  { id: 'sk-dsa-7-3', plan_id: 'plan-dsa', topic_id: 't-dsa-7', group_id: 'group-1', title: 'Coin Change', description: 'Bottom-up DP. Classic unbounded knapsack variant.', resources: 'LeetCode #322', priority: 'high', order: 3 },
  { id: 'sk-dsa-7-4', plan_id: 'plan-dsa', topic_id: 't-dsa-7', group_id: 'group-1', title: 'Longest Common Subsequence', description: '2D DP. Core of diff/merge algorithms.', resources: 'LeetCode #1143', priority: 'high', order: 4 },
  // System Design topics
  { id: 'sk-sd-1-1', plan_id: 'plan-sd', topic_id: 't-sd-1', group_id: 'group-1', title: 'What is scalability?', description: 'Vertical vs horizontal scaling. When to use each. Understand stateless services.', order: 1 },
  { id: 'sk-sd-1-2', plan_id: 'plan-sd', topic_id: 't-sd-1', group_id: 'group-1', title: 'CAP Theorem', description: 'Consistency, Availability, Partition Tolerance. Real examples: Cassandra vs MySQL.', priority: 'high', order: 2 },
  { id: 'sk-sd-1-3', plan_id: 'plan-sd', topic_id: 't-sd-1', group_id: 'group-1', title: 'Load Balancers', description: 'Round robin, L4 vs L7, health checks, sticky sessions.', order: 3 },
  { id: 'sk-sd-2-1', plan_id: 'plan-sd', topic_id: 't-sd-2', group_id: 'group-1', title: 'SQL vs NoSQL — when to choose', description: 'ACID vs BASE. Understand trade-offs with real use cases.', priority: 'high', order: 1 },
  { id: 'sk-sd-2-2', plan_id: 'plan-sd', topic_id: 't-sd-2', group_id: 'group-1', title: 'Database Indexing & Query Optimization', description: 'B-tree indexes, composite indexes, EXPLAIN query.', order: 2 },
  { id: 'sk-sd-2-3', plan_id: 'plan-sd', topic_id: 't-sd-2', group_id: 'group-1', title: 'Database Sharding & Replication', description: 'Horizontal partitioning, read replicas, master-slave.', order: 3 },
  { id: 'sk-sd-3-1', plan_id: 'plan-sd', topic_id: 't-sd-3', group_id: 'group-1', title: 'Redis fundamentals & use cases', description: 'Data types, eviction policies, persistence options.', priority: 'high', order: 1 },
  { id: 'sk-sd-3-2', plan_id: 'plan-sd', topic_id: 't-sd-3', group_id: 'group-1', title: 'Cache invalidation strategies', description: 'Write-through, write-back, cache-aside, read-through.', order: 2 },
  { id: 'sk-sd-4-1', plan_id: 'plan-sd', topic_id: 't-sd-4', group_id: 'group-1', title: 'Design URL Shortener', description: 'Full end-to-end: APIs, hash function, DB schema, caching, scaling.', priority: 'high', order: 1 },
  { id: 'sk-sd-4-2', plan_id: 'plan-sd', topic_id: 't-sd-4', group_id: 'group-1', title: 'Design Instagram', description: 'Photo storage, feed generation (push vs pull), CDN, follow graph.', priority: 'high', order: 2 },
  { id: 'sk-sd-4-3', plan_id: 'plan-sd', topic_id: 't-sd-4', group_id: 'group-1', title: 'Design WhatsApp / Chat System', description: 'WebSockets, message delivery guarantees, group chats, read receipts.', priority: 'high', order: 3 },
];

// Demo per-user subtask statuses
// Alex (user-1) is ahead — finished Arrays & Hashing, doing Two Pointers
// Sarah (user-2) is mid-way through Arrays & Hashing
// Marcus (user-3) just started
let demoStatuses: UserSubtaskStatus[] = [
  // Alex — Arrays & Hashing all completed
  ...['sk-dsa-1-1','sk-dsa-1-2','sk-dsa-1-3','sk-dsa-1-4','sk-dsa-1-5','sk-dsa-1-6'].map(id => ({
    id: `${id}_user-1`, task_id: id, topic_id: 't-dsa-1', plan_id: 'plan-dsa', group_id: 'group-1',
    user_id: 'user-1', status: 'completed' as SubtaskStatus, completed_at: getTodayDateString(-3)
  })),
  // Alex — Two Pointers: 2 done, 1 in progress
  { id: 'sk-dsa-2-1_user-1', task_id: 'sk-dsa-2-1', topic_id: 't-dsa-2', plan_id: 'plan-dsa', group_id: 'group-1', user_id: 'user-1', status: 'completed', completed_at: getTodayDateString(-1) },
  { id: 'sk-dsa-2-2_user-1', task_id: 'sk-dsa-2-2', topic_id: 't-dsa-2', plan_id: 'plan-dsa', group_id: 'group-1', user_id: 'user-1', status: 'completed', completed_at: todayStr },
  { id: 'sk-dsa-2-3_user-1', task_id: 'sk-dsa-2-3', topic_id: 't-dsa-2', plan_id: 'plan-dsa', group_id: 'group-1', user_id: 'user-1', status: 'in_progress', started_at: todayStr },
  // Sarah — Arrays: 4 done
  ...['sk-dsa-1-1','sk-dsa-1-2','sk-dsa-1-3','sk-dsa-1-4'].map(id => ({
    id: `${id}_user-2`, task_id: id, topic_id: 't-dsa-1', plan_id: 'plan-dsa', group_id: 'group-1',
    user_id: 'user-2', status: 'completed' as SubtaskStatus, completed_at: getTodayDateString(-2)
  })),
  { id: 'sk-dsa-1-5_user-2', task_id: 'sk-dsa-1-5', topic_id: 't-dsa-1', plan_id: 'plan-dsa', group_id: 'group-1', user_id: 'user-2', status: 'in_progress', started_at: todayStr },
  // Marcus — just the first 2
  { id: 'sk-dsa-1-1_user-3', task_id: 'sk-dsa-1-1', topic_id: 't-dsa-1', plan_id: 'plan-dsa', group_id: 'group-1', user_id: 'user-3', status: 'completed', completed_at: todayStr },
  { id: 'sk-dsa-1-2_user-3', task_id: 'sk-dsa-1-2', topic_id: 't-dsa-1', plan_id: 'plan-dsa', group_id: 'group-1', user_id: 'user-3', status: 'in_progress', started_at: todayStr },
];

// Personal notes per user per task
let demoNotes: { id: string; task_id: string; user_id: string; note: string; updated_at: string }[] = [];

// ─── Event Bus ──────────────────────────────────────────────────────────────
type Listener = () => void;
const demoListeners: Set<Listener> = new Set();
function notify() { demoListeners.forEach(fn => fn()); }

// ─── Service ────────────────────────────────────────────────────────────────
export const studyService = {
  isDemo: !isRealFirebaseConfigured,
  enableDemoMode() { this.isDemo = true; },
  enableFirebaseMode() { this.isDemo = false; },
  subscribe(cb: Listener): () => void {
    demoListeners.add(cb);
    return () => { demoListeners.delete(cb); };
  },

  // ── Users ────────────────────────────────────────────────────────────────
  async getCurrentUser(uid: string): Promise<User> {
    if (this.isDemo || !db) return DEMO_USERS[uid] || DEMO_USERS['user-1'];
    try {
      const snap = await getDoc(doc(db, 'users', uid));
      return snap.exists() ? snap.data() as User : DEMO_USERS['user-1'];
    } catch { return DEMO_USERS['user-1']; }
  },

  async saveUser(user: User): Promise<void> {
    if (this.isDemo || !db) return;
    try { await setDoc(doc(db, 'users', user.id), { ...user, updatedAt: new Date().toISOString() }, { merge: true }); }
    catch (e) { console.warn('saveUser:', e); }
  },

  // ── Groups ───────────────────────────────────────────────────────────────
  async getUserGroups(userId: string): Promise<Group[]> {
    if (this.isDemo || !db) return demoGroups.filter(g => g.members.includes(userId));
    try {
      const snap = await getDocs(query(collection(db, 'groups'), where('members', 'array-contains', userId)));
      return snap.docs.map(d => ({ id: d.id, ...d.data() } as Group));
    } catch { return demoGroups.filter(g => g.members.includes(userId)); }
  },

  async createGroup(name: string, userId: string): Promise<Group> {
    const newGroup: Group = { id: `group-${Date.now()}`, name, invite_code: generateInviteCode(), members: [userId], createdBy: userId, createdAt: new Date().toISOString() };
    if (this.isDemo || !db) { demoGroups.push(newGroup); notify(); return newGroup; }
    try {
      const ref = doc(collection(db, 'groups'));
      const g = { ...newGroup, id: ref.id };
      await setDoc(ref, g);
      return g;
    } catch { demoGroups.push(newGroup); return newGroup; }
  },

  async joinGroup(code: string, userId: string): Promise<Group> {
    const cleanCode = code.trim().toUpperCase();

    if (this.isDemo || !db) {
      const group = demoGroups.find(g => g.invite_code === cleanCode);
      if (!group) throw new Error(`No group found with invite code "${cleanCode}".`);
      if (!group.members.includes(userId)) group.members.push(userId);
      notify();
      return group;
    }

    try {
      const snap = await getDocs(query(collection(db, 'groups'), where('invite_code', '==', cleanCode)));
      if (snap.empty) {
        // Check if it exists in local memory as fallback
        const localGroup = demoGroups.find(g => g.invite_code === cleanCode);
        if (localGroup) {
          if (!localGroup.members.includes(userId)) localGroup.members.push(userId);
          notify();
          return localGroup;
        }
        throw new Error(`No group found with invite code "${cleanCode}".`);
      }
      const d = snap.docs[0];
      const group = { id: d.id, ...d.data() } as Group;
      if (!group.members.includes(userId)) {
        const updated = [...group.members, userId];
        await updateDoc(doc(db, 'groups', group.id), { members: updated });
        group.members = updated;
      }
      return group;
    } catch (e: any) {
      console.warn('Firestore joinGroup notice:', e);
      // Check local store before failing
      const localGroup = demoGroups.find(g => g.invite_code === cleanCode);
      if (localGroup) {
        if (!localGroup.members.includes(userId)) localGroup.members.push(userId);
        notify();
        return localGroup;
      }
      if (e?.code === 'permission-denied' || e?.message?.includes('permission')) {
        throw new Error('Firebase permission denied. Please ensure Firestore Security Rules are published in your Firebase Console.');
      }
      throw e;
    }
  },

  async getGroupMembers(groupId: string): Promise<User[]> {
    if (this.isDemo || !db) {
      const g = demoGroups.find(g => g.id === groupId);
      if (!g) return [];
      return g.members.map(id => DEMO_USERS[id] || { id, name: 'Member', email: '', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80' });
    }
    try {
      const snap = await getDoc(doc(db, 'groups', groupId));
      if (!snap.exists()) return [];
      const members = (snap.data() as Group).members;
      const users = await Promise.all(members.map(async id => {
        const us = await getDoc(doc(db, 'users', id));
        return us.exists() ? us.data() as User : null;
      }));
      return users.filter(Boolean) as User[];
    } catch { return []; }
  },

  // ── Plans ─────────────────────────────────────────────────────────────────
  async getGroupPlans(groupId: string): Promise<Plan[]> {
    if (this.isDemo || !db) return demoPlans.filter(p => p.group_id === groupId);
    try {
      const snap = await getDocs(query(collection(db, 'plans'), where('group_id', '==', groupId)));
      const plans = snap.docs.map(d => ({ id: d.id, ...d.data() } as Plan));
      return plans.length > 0 ? plans : demoPlans.filter(p => p.group_id === groupId);
    } catch { return demoPlans.filter(p => p.group_id === groupId); }
  },

  /**
   * Create a plan with a structured topic → subtask outline.
   * This is the main entry point from PlanSetupWizard.
   */
  async createPlanWithTopics(
    groupId: string,
    userId: string,
    planData: { title: string; description?: string; type: 'roadmap' | 'sprint'; start_date?: string; end_date?: string },
    topicsData: {
      title: string;
      description?: string;
      estimated_days?: number;
      tasks: {
        title: string;
        description?: string;
        resources?: string;
        priority?: 'low' | 'medium' | 'high';
        estimated_hours?: number;
      }[];
    }[]
  ): Promise<Plan> {
    const plan: Plan = {
      id: `plan-${Date.now()}`,
      group_id: groupId,
      title: planData.title,
      description: planData.description || null,
      type: planData.type,
      start_date: planData.start_date || null,
      end_date: planData.end_date || null,
      createdBy: userId,
      createdAt: new Date().toISOString()
    };

    if (this.isDemo || !db) {
      demoPlans.push(plan);
      topicsData.forEach((td, ti) => {
        const topic: PlanTopic = {
          id: `topic-${Date.now()}-${ti}`,
          plan_id: plan.id,
          group_id: groupId,
          title: td.title,
          description: td.description || null,
          estimated_days: td.estimated_days || null,
          order: ti + 1
        };
        demoTopics.push(topic);
        td.tasks.forEach((tk, ki) => {
          demoTasks.push({
            id: `task-${Date.now()}-${ti}-${ki}`,
            plan_id: plan.id,
            topic_id: topic.id,
            group_id: groupId,
            title: tk.title,
            description: tk.description || null,
            resources: tk.resources || null,
            priority: tk.priority || 'medium',
            estimated_hours: tk.estimated_hours || null,
            order: ki + 1
          });
        });
      });
      notify();
      return plan;
    }

    try {
      const planRef = doc(collection(db, 'plans'));
      const planWithId = { ...plan, id: planRef.id };
      await setDoc(planRef, planWithId);

      for (let ti = 0; ti < topicsData.length; ti++) {
        const td = topicsData[ti];
        const topicRef = doc(collection(db, 'plan_topics'));
        const topic: PlanTopic = {
          id: topicRef.id, plan_id: planWithId.id, group_id: groupId,
          title: td.title, description: td.description || null,
          estimated_days: td.estimated_days || null, order: ti + 1
        };
        await setDoc(topicRef, topic);

        for (let ki = 0; ki < td.tasks.length; ki++) {
          const tk = td.tasks[ki];
          const taskRef = doc(collection(db, 'plan_tasks'));
          const task: PlanTask = {
            id: taskRef.id, plan_id: planWithId.id, topic_id: topic.id, group_id: groupId,
            title: tk.title, description: tk.description || null, resources: tk.resources || null,
            priority: tk.priority || 'medium', estimated_hours: tk.estimated_hours || null, order: ki + 1
          };
          await setDoc(taskRef, task);
        }
      }
      return planWithId;
    } catch (err) {
      console.warn('createPlanWithTopics fallback:', err);
      demoPlans.push(plan);
      return plan;
    }
  },

  // ── Topics & Tasks ───────────────────────────────────────────────────────
  async getTopicsWithTasks(planId: string): Promise<TopicWithTasks[]> {
    if (this.isDemo || !db) {
      const topics = demoTopics.filter(t => t.plan_id === planId).sort((a, b) => a.order - b.order);
      return topics.map(topic => ({
        topic,
        tasks: demoTasks.filter(t => t.topic_id === topic.id).sort((a, b) => a.order - b.order)
      }));
    }
    try {
      const topicSnap = await getDocs(query(collection(db, 'plan_topics'), where('plan_id', '==', planId)));
      const topics = topicSnap.docs.map(d => ({ id: d.id, ...d.data() } as PlanTopic)).sort((a, b) => a.order - b.order);

      const taskSnap = await getDocs(query(collection(db, 'plan_tasks'), where('plan_id', '==', planId)));
      const allTasks = taskSnap.docs.map(d => ({ id: d.id, ...d.data() } as PlanTask));

      return topics.map(topic => ({
        topic,
        tasks: allTasks.filter(t => t.topic_id === topic.id).sort((a, b) => a.order - b.order)
      }));
    } catch {
      const topics = demoTopics.filter(t => t.plan_id === planId).sort((a, b) => a.order - b.order);
      return topics.map(topic => ({
        topic,
        tasks: demoTasks.filter(t => t.topic_id === topic.id).sort((a, b) => a.order - b.order)
      }));
    }
  },

  // ── Per-User Subtask Status ──────────────────────────────────────────────
  /**
   * Get all UserSubtaskStatuses for a user on a specific plan.
   * Returns a map: taskId → UserSubtaskStatus for O(1) lookup in UI.
   */
  async getUserSubtaskStatuses(planId: string, userId: string): Promise<Record<string, UserSubtaskStatus>> {
    if (this.isDemo || !db) {
      const statuses = demoStatuses.filter(s => s.plan_id === planId && s.user_id === userId);
      return Object.fromEntries(statuses.map(s => [s.task_id, s]));
    }
    try {
      const snap = await getDocs(query(
        collection(db, 'user_subtask_statuses'),
        where('plan_id', '==', planId),
        where('user_id', '==', userId)
      ));
      const statuses = snap.docs.map(d => ({ id: d.id, ...d.data() } as UserSubtaskStatus));
      return Object.fromEntries(statuses.map(s => [s.task_id, s]));
    } catch {
      const statuses = demoStatuses.filter(s => s.plan_id === planId && s.user_id === userId);
      return Object.fromEntries(statuses.map(s => [s.task_id, s]));
    }
  },

  async setSubtaskStatus(
    task: PlanTask,
    userId: string,
    newStatus: SubtaskStatus
  ): Promise<UserSubtaskStatus> {
    const now = new Date().toISOString();
    const statusObj: UserSubtaskStatus = {
      id: `${task.id}_${userId}`,
      task_id: task.id,
      topic_id: task.topic_id,
      plan_id: task.plan_id,
      group_id: task.group_id,
      user_id: userId,
      status: newStatus,
      started_at: newStatus === 'in_progress' ? now : (newStatus === 'completed' ? now : null),
      completed_at: newStatus === 'completed' ? now : null,
    };

    if (this.isDemo || !db) {
      const idx = demoStatuses.findIndex(s => s.id === statusObj.id);
      if (idx >= 0) demoStatuses[idx] = statusObj;
      else demoStatuses.push(statusObj);
      notify();
      return statusObj;
    }
    try {
      await setDoc(doc(db, 'user_subtask_statuses', statusObj.id), statusObj);
      notify();
      return statusObj;
    } catch {
      const idx = demoStatuses.findIndex(s => s.id === statusObj.id);
      if (idx >= 0) demoStatuses[idx] = statusObj;
      else demoStatuses.push(statusObj);
      notify();
      return statusObj;
    }
  },

  /**
   * Cycle status: not_started -> in_progress -> completed -> not_started
   */
  async cycleSubtaskStatus(
    task: PlanTask,
    userId: string,
    currentStatus: SubtaskStatus | undefined
  ): Promise<UserSubtaskStatus> {
    const nextStatus: SubtaskStatus =
      !currentStatus || currentStatus === 'not_started' ? 'in_progress' :
      currentStatus === 'in_progress' ? 'completed' : 'not_started';
    return this.setSubtaskStatus(task, userId, nextStatus);
  },

  // ── Plan Progress ────────────────────────────────────────────────────────
  async getPlanMembersProgress(planId: string, groupId: string): Promise<PlanMemberProgress[]> {
    const members = await this.getGroupMembers(groupId);
    const allTasks = demoTasks.filter(t => t.plan_id === planId);
    const total = this.isDemo || !db ? allTasks.length : (await this.getTopicsWithTasks(planId)).reduce((sum, tw) => sum + tw.tasks.length, 0);

    return Promise.all(members.map(async member => {
      const statusMap = await this.getUserSubtaskStatuses(planId, member.id);
      const completed = Object.values(statusMap).filter(s => s.status === 'completed').length;
      return {
        user: member,
        completed,
        total,
        percentage: total > 0 ? Math.round((completed / total) * 100) : 0
      };
    }));
  },

  // ── Personal Notes ────────────────────────────────────────────────────────
  async saveTaskNote(taskId: string, userId: string, note: string): Promise<void> {
    const id = `${taskId}_${userId}`;
    const obj = { id, task_id: taskId, user_id: userId, note, updated_at: new Date().toISOString() };
    if (this.isDemo || !db) {
      const idx = demoNotes.findIndex(n => n.id === id);
      if (idx >= 0) demoNotes[idx] = obj;
      else demoNotes.push(obj);
      return;
    }
    try { await setDoc(doc(db, 'task_notes', id), obj); }
    catch { const idx = demoNotes.findIndex(n => n.id === id); if (idx >= 0) demoNotes[idx] = obj; else demoNotes.push(obj); }
  },

  async getTaskNote(taskId: string, userId: string): Promise<string> {
    const id = `${taskId}_${userId}`;
    if (this.isDemo || !db) return demoNotes.find(n => n.id === id)?.note || '';
    try {
      const snap = await getDoc(doc(db, 'task_notes', id));
      return snap.exists() ? (snap.data() as any).note : '';
    } catch { return demoNotes.find(n => n.id === id)?.note || ''; }
  },

  // ── Group members daily progress (used by GroupView) ─────────────────────
  async getGroupMembersProgress(groupId: string): Promise<MemberProgress[]> {
    const members = await this.getGroupMembers(groupId);
    const plans = await this.getGroupPlans(groupId);

    return Promise.all(members.map(async member => {
      let completed = 0;
      let total = 0;
      for (const plan of plans) {
        const statusMap = await this.getUserSubtaskStatuses(plan.id, member.id);
        const tasks = this.isDemo ? demoTasks.filter(t => t.plan_id === plan.id) : [];
        total += tasks.length;
        completed += Object.values(statusMap).filter(s => s.status === 'completed' && s.completed_at?.startsWith(todayStr)).length;
      }
      return { user: member, completedCount: completed, totalCount: total, percentage: total > 0 ? Math.round((completed / total) * 100) : 0 };
    }));
  },

  // ── Member Detailed Progress Breakdown ───────────────────────────────────
  async getMemberDetailedProgress(groupId: string, userId: string): Promise<{
    plans: {
      plan: Plan;
      total: number;
      completed: number;
      percentage: number;
      topics: {
        topic: PlanTopic;
        total: number;
        completed: number;
        percentage: number;
        completedTasks: PlanTask[];
        inProgressTasks: PlanTask[];
      }[];
    }[];
    todayCompletedTasks: { task: PlanTask; completedAt?: string }[];
  }> {
    const plans = await this.getGroupPlans(groupId);
    const plansBreakdown = [];
    const todayCompleted: { task: PlanTask; completedAt?: string }[] = [];

    for (const plan of plans) {
      const topicsWithTasks = await this.getTopicsWithTasks(plan.id);
      const statusMap = await this.getUserSubtaskStatuses(plan.id, userId);

      let planTotal = 0;
      let planCompleted = 0;

      const topics = topicsWithTasks.map(({ topic, tasks }) => {
        const completedTasks = tasks.filter(t => statusMap[t.id]?.status === 'completed');
        const inProgressTasks = tasks.filter(t => statusMap[t.id]?.status === 'in_progress');

        completedTasks.forEach(t => {
          const completedAt = statusMap[t.id]?.completed_at;
          if (completedAt && completedAt.startsWith(todayStr)) {
            todayCompleted.push({ task: t, completedAt });
          }
        });

        planTotal += tasks.length;
        planCompleted += completedTasks.length;

        return {
          topic,
          total: tasks.length,
          completed: completedTasks.length,
          percentage: tasks.length > 0 ? Math.round((completedTasks.length / tasks.length) * 100) : 0,
          completedTasks,
          inProgressTasks
        };
      });

      plansBreakdown.push({
        plan,
        total: planTotal,
        completed: planCompleted,
        percentage: planTotal > 0 ? Math.round((planCompleted / planTotal) * 100) : 0,
        topics
      });
    }

    return {
      plans: plansBreakdown,
      todayCompletedTasks: todayCompleted
    };
  },
};
