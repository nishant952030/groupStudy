import { 
  collection, doc, getDoc, getDocs, setDoc, updateDoc, 
  query, where, onSnapshot, serverTimestamp, deleteDoc 
} from 'firebase/firestore';
import { db, isRealFirebaseConfigured } from './firebase';
import { User, Group, Plan, PlanTask, DailyLog, DailyPullTask, MemberProgress } from '../types';

// Helper: Get YYYY-MM-DD date string
export function getTodayDateString(offsetDays: number = 0): string {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().split('T')[0];
}

// Generate 6-character alphanumeric invite code
export function generateInviteCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// Demo Data Storage for seamless offline/standalone testing
const DEMO_USERS: Record<string, User> = {
  'user-1': {
    id: 'user-1',
    name: 'Alex Chen',
    email: 'alex@example.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    createdAt: new Date().toISOString()
  },
  'user-2': {
    id: 'user-2',
    name: 'Sarah Miller',
    email: 'sarah@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    createdAt: new Date().toISOString()
  },
  'user-3': {
    id: 'user-3',
    name: 'Marcus Vance',
    email: 'marcus@example.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    createdAt: new Date().toISOString()
  }
};

const yesterdayStr = getTodayDateString(-1);
const todayStr = getTodayDateString(0);
const tomorrowStr = getTodayDateString(1);

let demoGroups: Group[] = [
  {
    id: 'group-1',
    name: 'Quantum Physics Masters',
    invite_code: 'PHYS66',
    members: ['user-1', 'user-2', 'user-3'],
    createdBy: 'user-1',
    createdAt: new Date().toISOString()
  }
];

let demoPlans: Plan[] = [
  {
    id: 'plan-1',
    group_id: 'group-1',
    title: 'Physics Final Exam Prep',
    type: 'fixed',
    createdBy: 'user-1',
    createdAt: new Date().toISOString()
  },
  {
    id: 'plan-2',
    group_id: 'group-1',
    title: 'LeetCode & Algorithms Sprint',
    type: 'rolling',
    deadline: getTodayDateString(7),
    createdBy: 'user-2',
    createdAt: new Date().toISOString()
  },
  {
    id: 'plan-3',
    group_id: 'group-1',
    title: 'Week 1: System Design Foundations',
    type: 'fixed',
    deadline: getTodayDateString(6),
    createdBy: 'user-3',
    createdAt: new Date().toISOString()
  }
];

let demoTasks: PlanTask[] = [
  // ── plan-1: Physics Final Exam Prep (Fixed) ──────────────────────────────
  {
    id: 'task-1',
    plan_id: 'plan-1',
    group_id: 'group-1',
    title: 'Review Electromagnetism Formulas & Maxwell Equations',
    scheduled_date: yesterdayStr,
    status: 'pending', // OVERDUE from yesterday
    order: 1
  },
  {
    id: 'task-2',
    plan_id: 'plan-1',
    group_id: 'group-1',
    title: 'Complete Optics Problem Set (Ch 24: #1-15)',
    scheduled_date: todayStr,
    status: 'completed',
    completed_by: 'user-1',
    completed_at: new Date().toISOString(),
    order: 2
  },
  {
    id: 'task-3',
    plan_id: 'plan-1',
    group_id: 'group-1',
    title: 'Watch Quantum Mechanics Wave Functions Lecture 4',
    scheduled_date: todayStr,
    status: 'pending',
    order: 3
  },
  {
    id: 'task-4',
    plan_id: 'plan-1',
    group_id: 'group-1',
    title: 'Thermodynamics & Entropy Practice Exam',
    scheduled_date: tomorrowStr,
    status: 'pending',
    order: 4
  },

  // ── plan-2: LeetCode & Algorithms Sprint (Rolling) ───────────────────────
  {
    id: 'task-5',
    plan_id: 'plan-2',
    group_id: 'group-1',
    title: 'Solve Two Sum & 3Sum (Arrays & Hash Maps)',
    status: 'completed',
    completed_by: 'user-1',
    completed_at: new Date().toISOString(),
    order: 1
  },
  {
    id: 'task-6',
    plan_id: 'plan-2',
    group_id: 'group-1',
    title: 'Implement Binary Search Tree Traversal (Inorder/Preorder)',
    status: 'pending',
    order: 2
  },
  {
    id: 'task-7',
    plan_id: 'plan-2',
    group_id: 'group-1',
    title: 'Solve Reversing a Linked List & Detect Cycle',
    status: 'pending',
    order: 3
  },
  {
    id: 'task-8',
    plan_id: 'plan-2',
    group_id: 'group-1',
    title: 'Master Dijkstra Shortest Path Algorithm',
    status: 'pending',
    order: 4
  },
  {
    id: 'task-9',
    plan_id: 'plan-2',
    group_id: 'group-1',
    title: 'Dynamic Programming: Coin Change & Knapsack Problem',
    status: 'pending',
    order: 5
  },

  // ── plan-3: Week 1 System Design Foundations (Fixed) ─────────────────────
  // Day 1 — What is System Design? (Today)
  {
    id: 'sd-d1-1', plan_id: 'plan-3', group_id: 'group-1', order: 1,
    title: 'Understand what system design means',
    scheduled_date: todayStr, status: 'pending'
  },
  {
    id: 'sd-d1-2', plan_id: 'plan-3', group_id: 'group-1', order: 2,
    title: 'Learn Functional vs Non-Functional Requirements',
    scheduled_date: todayStr, status: 'pending'
  },
  {
    id: 'sd-d1-3', plan_id: 'plan-3', group_id: 'group-1', order: 3,
    title: 'Understand scalability, availability, reliability, latency, throughput',
    scheduled_date: todayStr, status: 'pending'
  },
  {
    id: 'sd-d1-4', plan_id: 'plan-3', group_id: 'group-1', order: 4,
    title: 'Learn vertical vs horizontal scaling',
    scheduled_date: todayStr, status: 'pending'
  },
  {
    id: 'sd-d1-5', plan_id: 'plan-3', group_id: 'group-1', order: 5,
    title: 'Understand the difference between architecture and implementation',
    scheduled_date: todayStr, status: 'pending'
  },
  {
    id: 'sd-d1-6', plan_id: 'plan-3', group_id: 'group-1', order: 6,
    title: 'Design a simple URL Shortener at a high level (Practice: explain in 5 min)',
    scheduled_date: todayStr, status: 'pending'
  },

  // Day 2 — Client–Server Architecture (Tomorrow)
  {
    id: 'sd-d2-1', plan_id: 'plan-3', group_id: 'group-1', order: 7,
    title: 'Understand clients, servers and APIs',
    scheduled_date: getTodayDateString(1), status: 'pending'
  },
  {
    id: 'sd-d2-2', plan_id: 'plan-3', group_id: 'group-1', order: 8,
    title: 'Learn request/response lifecycle',
    scheduled_date: getTodayDateString(1), status: 'pending'
  },
  {
    id: 'sd-d2-3', plan_id: 'plan-3', group_id: 'group-1', order: 9,
    title: 'Understand HTTP and HTTPS',
    scheduled_date: getTodayDateString(1), status: 'pending'
  },
  {
    id: 'sd-d2-4', plan_id: 'plan-3', group_id: 'group-1', order: 10,
    title: 'Learn REST API fundamentals',
    scheduled_date: getTodayDateString(1), status: 'pending'
  },
  {
    id: 'sd-d2-5', plan_id: 'plan-3', group_id: 'group-1', order: 11,
    title: 'Understand HTTP methods and status codes',
    scheduled_date: getTodayDateString(1), status: 'pending'
  },
  {
    id: 'sd-d2-6', plan_id: 'plan-3', group_id: 'group-1', order: 12,
    title: 'Learn stateless vs stateful servers',
    scheduled_date: getTodayDateString(1), status: 'pending'
  },
  {
    id: 'sd-d2-7', plan_id: 'plan-3', group_id: 'group-1', order: 13,
    title: 'Design a simple backend for a Todo application',
    scheduled_date: getTodayDateString(1), status: 'pending'
  },

  // Day 3 — Databases (Day +2)
  {
    id: 'sd-d3-1', plan_id: 'plan-3', group_id: 'group-1', order: 14,
    title: 'Understand SQL vs NoSQL',
    scheduled_date: getTodayDateString(2), status: 'pending'
  },
  {
    id: 'sd-d3-2', plan_id: 'plan-3', group_id: 'group-1', order: 15,
    title: 'Learn tables, rows, indexes and relationships',
    scheduled_date: getTodayDateString(2), status: 'pending'
  },
  {
    id: 'sd-d3-3', plan_id: 'plan-3', group_id: 'group-1', order: 16,
    title: 'Understand primary keys and foreign keys',
    scheduled_date: getTodayDateString(2), status: 'pending'
  },
  {
    id: 'sd-d3-4', plan_id: 'plan-3', group_id: 'group-1', order: 17,
    title: 'Learn database normalization',
    scheduled_date: getTodayDateString(2), status: 'pending'
  },
  {
    id: 'sd-d3-5', plan_id: 'plan-3', group_id: 'group-1', order: 18,
    title: 'Understand database indexing',
    scheduled_date: getTodayDateString(2), status: 'pending'
  },
  {
    id: 'sd-d3-6', plan_id: 'plan-3', group_id: 'group-1', order: 19,
    title: 'Learn when to choose SQL vs NoSQL',
    scheduled_date: getTodayDateString(2), status: 'pending'
  },
  {
    id: 'sd-d3-7', plan_id: 'plan-3', group_id: 'group-1', order: 20,
    title: 'Understand basic database scaling (Practice: design e-commerce DB)',
    scheduled_date: getTodayDateString(2), status: 'pending'
  },

  // Day 4 — Caching (Day +3)
  {
    id: 'sd-d4-1', plan_id: 'plan-3', group_id: 'group-1', order: 21,
    title: 'Understand why caching is needed',
    scheduled_date: getTodayDateString(3), status: 'pending'
  },
  {
    id: 'sd-d4-2', plan_id: 'plan-3', group_id: 'group-1', order: 22,
    title: 'Learn cache-aside pattern',
    scheduled_date: getTodayDateString(3), status: 'pending'
  },
  {
    id: 'sd-d4-3', plan_id: 'plan-3', group_id: 'group-1', order: 23,
    title: 'Understand Redis at a high level',
    scheduled_date: getTodayDateString(3), status: 'pending'
  },
  {
    id: 'sd-d4-4', plan_id: 'plan-3', group_id: 'group-1', order: 24,
    title: 'Learn cache hit vs cache miss',
    scheduled_date: getTodayDateString(3), status: 'pending'
  },
  {
    id: 'sd-d4-5', plan_id: 'plan-3', group_id: 'group-1', order: 25,
    title: 'Understand TTL (Time-To-Live)',
    scheduled_date: getTodayDateString(3), status: 'pending'
  },
  {
    id: 'sd-d4-6', plan_id: 'plan-3', group_id: 'group-1', order: 26,
    title: 'Learn common caching problems',
    scheduled_date: getTodayDateString(3), status: 'pending'
  },
  {
    id: 'sd-d4-7', plan_id: 'plan-3', group_id: 'group-1', order: 27,
    title: 'Understand cache invalidation (Practice: add caching to e-commerce design)',
    scheduled_date: getTodayDateString(3), status: 'pending'
  },

  // Day 5 — Load Balancing (Day +4)
  {
    id: 'sd-d5-1', plan_id: 'plan-3', group_id: 'group-1', order: 28,
    title: 'Understand why load balancers are required',
    scheduled_date: getTodayDateString(4), status: 'pending'
  },
  {
    id: 'sd-d5-2', plan_id: 'plan-3', group_id: 'group-1', order: 29,
    title: 'Learn Layer 4 vs Layer 7 load balancing',
    scheduled_date: getTodayDateString(4), status: 'pending'
  },
  {
    id: 'sd-d5-3', plan_id: 'plan-3', group_id: 'group-1', order: 30,
    title: 'Understand round-robin and health checks',
    scheduled_date: getTodayDateString(4), status: 'pending'
  },
  {
    id: 'sd-d5-4', plan_id: 'plan-3', group_id: 'group-1', order: 31,
    title: 'Understand horizontal scaling',
    scheduled_date: getTodayDateString(4), status: 'pending'
  },
  {
    id: 'sd-d5-5', plan_id: 'plan-3', group_id: 'group-1', order: 32,
    title: 'Learn the concept of reverse proxy',
    scheduled_date: getTodayDateString(4), status: 'pending'
  },
  {
    id: 'sd-d5-6', plan_id: 'plan-3', group_id: 'group-1', order: 33,
    title: 'Practice: Draw Users → Load Balancer → Servers → Database',
    scheduled_date: getTodayDateString(4), status: 'pending'
  },

  // Day 6 — Scalability & Bottlenecks (Day +5)
  {
    id: 'sd-d6-1', plan_id: 'plan-3', group_id: 'group-1', order: 34,
    title: 'Learn how to identify bottlenecks',
    scheduled_date: getTodayDateString(5), status: 'pending'
  },
  {
    id: 'sd-d6-2', plan_id: 'plan-3', group_id: 'group-1', order: 35,
    title: 'Understand CPU-bound vs I/O-bound systems',
    scheduled_date: getTodayDateString(5), status: 'pending'
  },
  {
    id: 'sd-d6-3', plan_id: 'plan-3', group_id: 'group-1', order: 36,
    title: 'Learn database bottlenecks',
    scheduled_date: getTodayDateString(5), status: 'pending'
  },
  {
    id: 'sd-d6-4', plan_id: 'plan-3', group_id: 'group-1', order: 37,
    title: 'Understand read-heavy vs write-heavy workloads',
    scheduled_date: getTodayDateString(5), status: 'pending'
  },
  {
    id: 'sd-d6-5', plan_id: 'plan-3', group_id: 'group-1', order: 38,
    title: 'Learn read replicas',
    scheduled_date: getTodayDateString(5), status: 'pending'
  },
  {
    id: 'sd-d6-6', plan_id: 'plan-3', group_id: 'group-1', order: 39,
    title: 'Understand database connection pooling',
    scheduled_date: getTodayDateString(5), status: 'pending'
  },
  {
    id: 'sd-d6-7', plan_id: 'plan-3', group_id: 'group-1', order: 40,
    title: 'Learn basic capacity estimation (Practice: estimate servers for 10k req/s)',
    scheduled_date: getTodayDateString(5), status: 'pending'
  },

  // Day 7 — Mini System Design Interview: URL Shortener (Day +6)
  {
    id: 'sd-d7-1', plan_id: 'plan-3', group_id: 'group-1', order: 41,
    title: 'Clarify requirements for URL Shortener system design',
    scheduled_date: getTodayDateString(6), status: 'pending'
  },
  {
    id: 'sd-d7-2', plan_id: 'plan-3', group_id: 'group-1', order: 42,
    title: 'Estimate traffic and storage',
    scheduled_date: getTodayDateString(6), status: 'pending'
  },
  {
    id: 'sd-d7-3', plan_id: 'plan-3', group_id: 'group-1', order: 43,
    title: 'Define APIs for URL Shortener',
    scheduled_date: getTodayDateString(6), status: 'pending'
  },
  {
    id: 'sd-d7-4', plan_id: 'plan-3', group_id: 'group-1', order: 44,
    title: 'Design the database schema',
    scheduled_date: getTodayDateString(6), status: 'pending'
  },
  {
    id: 'sd-d7-5', plan_id: 'plan-3', group_id: 'group-1', order: 45,
    title: 'Create high-level architecture diagram',
    scheduled_date: getTodayDateString(6), status: 'pending'
  },
  {
    id: 'sd-d7-6', plan_id: 'plan-3', group_id: 'group-1', order: 46,
    title: 'Add caching layer to URL Shortener design',
    scheduled_date: getTodayDateString(6), status: 'pending'
  },
  {
    id: 'sd-d7-7', plan_id: 'plan-3', group_id: 'group-1', order: 47,
    title: 'Add load balancing to URL Shortener design',
    scheduled_date: getTodayDateString(6), status: 'pending'
  },
  {
    id: 'sd-d7-8', plan_id: 'plan-3', group_id: 'group-1', order: 48,
    title: 'Identify bottlenecks in URL Shortener design',
    scheduled_date: getTodayDateString(6), status: 'pending'
  },
  {
    id: 'sd-d7-9', plan_id: 'plan-3', group_id: 'group-1', order: 49,
    title: 'Explain how the URL Shortener scales — Week 1 Deliverable complete!',
    scheduled_date: getTodayDateString(6), status: 'pending'
  },
];

let demoDailyLogs: DailyLog[] = [
  {
    id: 'log-1',
    task_id: 'task-2',
    plan_id: 'plan-1',
    group_id: 'group-1',
    user_id: 'user-1',
    completed_at: new Date().toISOString(),
    date: todayStr
  },
  {
    id: 'log-2',
    task_id: 'task-5',
    plan_id: 'plan-2',
    group_id: 'group-1',
    user_id: 'user-1',
    completed_at: new Date().toISOString(),
    date: todayStr
  },
  // Sarah completed 2 tasks today
  {
    id: 'log-3',
    task_id: 'task-2',
    plan_id: 'plan-1',
    group_id: 'group-1',
    user_id: 'user-2',
    completed_at: new Date().toISOString(),
    date: todayStr
  },
  {
    id: 'log-4',
    task_id: 'task-6',
    plan_id: 'plan-2',
    group_id: 'group-1',
    user_id: 'user-2',
    completed_at: new Date().toISOString(),
    date: todayStr
  }
];

// Event listeners for demo mode reactive updates
type Listener = () => void;
const demoListeners: Set<Listener> = new Set();
function notifyDemoListeners() {
  demoListeners.forEach(fn => fn());
}

export const studyService = {
  // isDemo can be toggled at runtime:
  // - starts false if real Firebase creds are detected
  // - set to true explicitly when user picks Demo Mode
  isDemo: !isRealFirebaseConfigured,

  enableDemoMode() {
    this.isDemo = true;
  },

  enableFirebaseMode() {
    this.isDemo = false;
  },

  // Subscribe to updates (triggers callback on change)
  subscribe(callback: Listener): () => void {
    demoListeners.add(callback);
    return () => demoListeners.delete(callback);
  },

  // USER FUNCTIONS
  async getCurrentUser(uid: string): Promise<User> {
    if (this.isDemo || !db) {
      return DEMO_USERS[uid] || DEMO_USERS['user-1'];
    }
    const snap = await getDoc(doc(db, 'users', uid));
    if (snap.exists()) {
      return snap.data() as User;
    }
    return DEMO_USERS['user-1'];
  },

  async saveUser(user: User): Promise<void> {
    if (this.isDemo || !db) {
      DEMO_USERS[user.id] = user;
      notifyDemoListeners();
      return;
    }
    await setDoc(doc(db, 'users', user.id), user, { merge: true });
  },

  // GROUP FUNCTIONS
  async getUserGroups(userId: string): Promise<Group[]> {
    if (this.isDemo || !db) {
      const groups = demoGroups.filter(g => g.members.includes(userId));
      return groups.length > 0 ? groups : demoGroups;
    }
    try {
      const q = query(collection(db, 'groups'), where('members', 'array-contains', userId));
      const snap = await getDocs(q);
      if (!snap.empty) {
        return snap.docs.map((d: any) => ({ id: d.id, ...d.data() } as Group));
      }
      // If user has no groups in Firestore yet, auto-create a starter group with the System Design & LeetCode plans
      const starter = await this.createStarterGroupForUser(userId);
      return [starter];
    } catch (err) {
      console.warn("Firestore getUserGroups query warning, fallback to demo groups:", err);
      return demoGroups;
    }
  },

  async createStarterGroupForUser(userId: string): Promise<Group> {
    const starterGroup = await this.createGroup('System Design & Core CS Sprint', userId);
    // Add Week 1 System Design tasks
    const sdTasks = demoTasks.filter(t => t.plan_id === 'plan-3').map(t => ({
      title: t.title,
      scheduled_date: t.scheduled_date || undefined
    }));
    await this.createPlan(starterGroup.id, 'Week 1: System Design Foundations', 'fixed', getTodayDateString(6), sdTasks, userId);

    // Add LeetCode Sprint
    const leetTasks = demoTasks.filter(t => t.plan_id === 'plan-2').map(t => ({
      title: t.title
    }));
    await this.createPlan(starterGroup.id, 'LeetCode & Algorithms Sprint', 'rolling', getTodayDateString(7), leetTasks, userId);
    return starterGroup;
  },

  async createGroup(name: string, userId: string): Promise<Group> {
    const invite_code = generateInviteCode();
    const newGroup: Group = {
      id: `group-${Date.now()}`,
      name,
      invite_code,
      members: [userId],
      createdBy: userId,
      createdAt: new Date().toISOString()
    };

    if (this.isDemo || !db) {
      demoGroups.push(newGroup);
      notifyDemoListeners();
      return newGroup;
    }

    const ref = doc(collection(db, 'groups'));
    const groupWithId = { ...newGroup, id: ref.id };
    await setDoc(ref, groupWithId);
    return groupWithId;
  },

  async joinGroup(inviteCode: string, userId: string): Promise<Group> {
    const code = inviteCode.trim().toUpperCase();
    if (this.isDemo || !db) {
      const group = demoGroups.find(g => g.invite_code === code);
      if (!group) throw new Error('Invalid invite code');
      if (!group.members.includes(userId)) {
        group.members.push(userId);
        notifyDemoListeners();
      }
      return group;
    }

    const q = query(collection(db, 'groups'), where('invite_code', '==', code));
    const snap = await getDocs(q);
    if (snap.empty) throw new Error('Group not found with that invite code');
    const groupDoc = snap.docs[0];
    const group = { id: groupDoc.id, ...groupDoc.data() } as Group;

    if (!group.members.includes(userId)) {
      const updatedMembers = [...group.members, userId];
      await updateDoc(doc(db, 'groups', group.id), { members: updatedMembers });
      group.members = updatedMembers;
    }
    return group;
  },

  async getGroupMembers(groupId: string): Promise<User[]> {
    if (this.isDemo || !db) {
      const group = demoGroups.find(g => g.id === groupId);
      if (!group) return [];
      return group.members.map(mId => DEMO_USERS[mId] || {
        id: mId,
        name: `Member (${mId.slice(0, 5)})`,
        email: `${mId}@study.app`,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
      });
    }

    const groupSnap = await getDoc(doc(db, 'groups', groupId));
    if (!groupSnap.exists()) return [];
    const group = groupSnap.data() as Group;

    const users: User[] = [];
    for (const mId of group.members) {
      const uSnap = await getDoc(doc(db, 'users', mId));
      if (uSnap.exists()) {
        users.push(uSnap.data() as User);
      }
    }
    return users;
  },

  // PLAN FUNCTIONS
  async getGroupPlans(groupId: string): Promise<Plan[]> {
    if (this.isDemo || !db) {
      const plans = demoPlans.filter(p => p.group_id === groupId);
      return plans.length > 0 ? plans : demoPlans;
    }
    try {
      const q = query(collection(db, 'plans'), where('group_id', '==', groupId));
      const snap = await getDocs(q);
      const plans = snap.docs.map((d: any) => ({ id: d.id, ...d.data() } as Plan));
      return plans.length > 0 ? plans : demoPlans;
    } catch (err) {
      console.warn("Firestore getGroupPlans warning, using fallback plans:", err);
      return demoPlans;
    }
  },

  async createPlan(
    groupId: string,
    title: string,
    type: 'fixed' | 'rolling',
    deadline: string | undefined,
    tasks: { title: string; scheduled_date?: string }[],
    userId: string
  ): Promise<Plan> {
    const newPlan: Plan = {
      id: `plan-${Date.now()}`,
      group_id: groupId,
      title,
      type,
      deadline: deadline || null,
      createdBy: userId,
      createdAt: new Date().toISOString()
    };

    if (this.isDemo || !db) {
      demoPlans.push(newPlan);
      tasks.forEach((t, index) => {
        demoTasks.push({
          id: `task-${Date.now()}-${index}`,
          plan_id: newPlan.id,
          group_id: groupId,
          title: t.title,
          scheduled_date: t.scheduled_date || null,
          status: 'pending',
          order: index + 1
        });
      });
      notifyDemoListeners();
      return newPlan;
    }

    try {
      const planRef = doc(collection(db, 'plans'));
      const planWithId = { ...newPlan, id: planRef.id };
      await setDoc(planRef, planWithId);

      // Save tasks
      for (let i = 0; i < tasks.length; i++) {
        const taskRef = doc(collection(db, 'plan_tasks'));
        const task: PlanTask = {
          id: taskRef.id,
          plan_id: planWithId.id,
          group_id: groupId,
          title: tasks[i].title,
          scheduled_date: tasks[i].scheduled_date || null,
          status: 'pending',
          order: i + 1
        };
        await setDoc(taskRef, task);
      }
      return planWithId;
    } catch (err) {
      console.warn("Firestore createPlan fallback to local:", err);
      demoPlans.push(newPlan);
      return newPlan;
    }
  },

  // THE DAILY PULL LOGIC (CRUCIAL ENGINE)
  // Dynamic daily pull logic:
  // For Fixed Plans: Pull tasks scheduled for today + overdue tasks from past dates that are pending.
  // For Rolling Plans: Pull top 3-5 pending tasks in the backlog queue.
  async getDailyTasksForUser(groupId: string, userId: string): Promise<{
    tasks: DailyPullTask[];
    userCompletedToday: number;
    userTotalToday: number;
    dailyPercentage: number;
  }> {
    const today = getTodayDateString(0);

    let allGroupPlans: Plan[] = [];
    let allGroupTasks: PlanTask[] = [];
    let todayLogs: DailyLog[] = [];

    if (this.isDemo || !db) {
      allGroupPlans = demoPlans.filter(p => p.group_id === groupId);
      if (allGroupPlans.length === 0) allGroupPlans = demoPlans;
      allGroupTasks = demoTasks.filter(t => t.group_id === groupId || allGroupPlans.some(p => p.id === t.plan_id));
      if (allGroupTasks.length === 0) allGroupTasks = demoTasks;
      todayLogs = demoDailyLogs.filter(l => l.group_id === groupId && l.date === today && l.user_id === userId);
    } else {
      try {
        const pSnap = await getDocs(query(collection(db, 'plans'), where('group_id', '==', groupId)));
        allGroupPlans = pSnap.docs.map((d: any) => ({ id: d.id, ...d.data() } as Plan));

        const tSnap = await getDocs(query(collection(db, 'plan_tasks'), where('group_id', '==', groupId)));
        allGroupTasks = tSnap.docs.map((d: any) => ({ id: d.id, ...d.data() } as PlanTask));

        const lSnap = await getDocs(query(
          collection(db, 'daily_logs'), 
          where('group_id', '==', groupId),
          where('date', '==', today),
          where('user_id', '==', userId)
        ));
        todayLogs = lSnap.docs.map((d: any) => ({ id: d.id, ...d.data() } as DailyLog));
      } catch (err) {
        console.warn("Firestore getDailyTasks error, using demo fallback:", err);
      }

      if (allGroupPlans.length === 0) {
        allGroupPlans = demoPlans;
      }
      if (allGroupTasks.length === 0) {
        allGroupTasks = demoTasks;
      }
    }

    const pulledTasks: DailyPullTask[] = [];
    const completedTaskIdsUserToday = new Set(todayLogs.map(l => l.task_id));

    for (const plan of allGroupPlans) {
      const planTasks = allGroupTasks.filter(t => t.plan_id === plan.id);

      if (plan.type === 'fixed') {
        // FIXED PLAN PULL LOGIC:
        // 1. Scheduled for Today (whether pending or completed)
        // 2. Overdue: Scheduled before Today AND status is pending
        for (const task of planTasks) {
          const isCompletedByMe = completedTaskIdsUserToday.has(task.id);
          const isToday = task.scheduled_date === today;
          const isPast = task.scheduled_date && task.scheduled_date < today;
          const isOverdue = Boolean(isPast && task.status === 'pending');

          if (isToday || isOverdue || isCompletedByMe) {
            pulledTasks.push({
              ...task,
              isOverdue,
              planTitle: plan.title,
              planType: plan.type
            });
          }
        }
      } else if (plan.type === 'rolling') {
        // ROLLING BACKLOG PULL LOGIC:
        // Automatically queue next 3 to 5 incomplete backlog tasks + tasks completed today
        const completedToday = planTasks.filter(t => completedTaskIdsUserToday.has(t.id));
        const pendingBacklog = planTasks
          .filter(t => t.status === 'pending' && !completedTaskIdsUserToday.has(t.id))
          .sort((a, b) => a.order - b.order)
          .slice(0, 4); // Pull top 4 next items

        const combined = [...completedToday, ...pendingBacklog];
        for (const task of combined) {
          pulledTasks.push({
            ...task,
            isOverdue: false,
            planTitle: plan.title,
            planType: plan.type
          });
        }
      }
    }

    // Calculate metrics
    const userTotalToday = pulledTasks.length;
    const userCompletedToday = pulledTasks.filter(t => 
      completedTaskIdsUserToday.has(t.id) || (t.status === 'completed' && t.completed_by === userId)
    ).length;
    const dailyPercentage = userTotalToday > 0 ? Math.round((userCompletedToday / userTotalToday) * 100) : 0;

    return {
      tasks: pulledTasks,
      userCompletedToday,
      userTotalToday,
      dailyPercentage
    };
  },

  // TOGGLE TASK COMPLETION
  async toggleTaskCompletion(taskId: string, userId: string, currentStatus: 'pending' | 'completed', groupId: string): Promise<boolean> {
    const today = getTodayDateString(0);
    const newStatus = currentStatus === 'completed' ? 'pending' : 'completed';
    const nowIso = new Date().toISOString();

    if (this.isDemo || !db) {
      const taskIndex = demoTasks.findIndex(t => t.id === taskId);
      if (taskIndex !== -1) {
        demoTasks[taskIndex].status = newStatus;
        demoTasks[taskIndex].completed_by = newStatus === 'completed' ? userId : null;
        demoTasks[taskIndex].completed_at = newStatus === 'completed' ? nowIso : null;
      }

      if (newStatus === 'completed') {
        // Create daily log if not existing
        const exists = demoDailyLogs.some(l => l.task_id === taskId && l.user_id === userId && l.date === today);
        if (!exists) {
          demoDailyLogs.push({
            id: `log-${Date.now()}`,
            task_id: taskId,
            plan_id: demoTasks[taskIndex]?.plan_id || 'plan-1',
            group_id: groupId,
            user_id: userId,
            completed_at: nowIso,
            date: today
          });
        }
      } else {
        // Remove daily log
        demoDailyLogs = demoDailyLogs.filter(l => !(l.task_id === taskId && l.user_id === userId && l.date === today));
      }

      notifyDemoListeners();
      return newStatus === 'completed';
    }

    // Firestore Real DB Updates
    const taskRef = doc(db, 'plan_tasks', taskId);
    const taskSnap = await getDoc(taskRef);
    const taskData = taskSnap.exists() ? taskSnap.data() as PlanTask : null;

    await updateDoc(taskRef, {
      status: newStatus,
      completed_by: newStatus === 'completed' ? userId : null,
      completed_at: newStatus === 'completed' ? nowIso : null
    });

    const logRef = doc(db, 'daily_logs', `${taskId}_${userId}_${today}`);
    if (newStatus === 'completed') {
      await setDoc(logRef, {
        id: logRef.id,
        task_id: taskId,
        plan_id: taskData?.plan_id || '',
        group_id: groupId,
        user_id: userId,
        completed_at: nowIso,
        date: today
      });
    } else {
      await deleteDoc(logRef);
    }

    return newStatus === 'completed';
  },

  // METRICS & DASHBOARD HELPERS
  async getGroupMembersProgress(groupId: string): Promise<MemberProgress[]> {
    const members = await this.getGroupMembers(groupId);
    const results: MemberProgress[] = [];

    for (const member of members) {
      const { userCompletedToday, userTotalToday, dailyPercentage } = await this.getDailyTasksForUser(groupId, member.id);
      results.push({
        user: member,
        completedCount: userCompletedToday,
        totalCount: userTotalToday,
        percentage: dailyPercentage
      });
    }
    return results;
  },

  async getOverallPlanProgress(planId: string): Promise<{ total: number; completed: number; percentage: number }> {
    let tasks: PlanTask[] = [];
    if (this.isDemo || !db) {
      tasks = demoTasks.filter(t => t.plan_id === planId);
    } else {
      const q = query(collection(db, 'plan_tasks'), where('plan_id', '==', planId));
      const snap = await getDocs(q);
      tasks = snap.docs.map((d: any) => ({ id: d.id, ...d.data() } as PlanTask));
    }

    const total = tasks.length;
    const completed = tasks.filter(t => t.status === 'completed').length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    return { total, completed, percentage };
  }
};
