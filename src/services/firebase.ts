import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAnalytics, isSupported, Analytics } from 'firebase/analytics';

const LOG = '[SyncStudy:Firebase]';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBTi0bumLw0vhmJomrn8Ov0aCs7x4mM1dk",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "groupstudy-4ed1f.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "groupstudy-4ed1f",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "groupstudy-4ed1f.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "823878602732",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:823878602732:web:57bb81d0845a925b5b3ac9",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-RVVXFMMTGK"
};

// Check if real custom Firebase credentials are provided
export const isRealFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && 
  firebaseConfig.projectId &&
  !firebaseConfig.apiKey.includes('your_api_key')
);

console.log(`${LOG} Firebase configured:`, isRealFirebaseConfigured ? '✅ Real credentials' : '⚠️ Missing — will use Demo Store');
console.log(`${LOG} Project ID:`, firebaseConfig.projectId);

let app: FirebaseApp;
let auth: Auth;
let db: Firestore;
let analytics: Analytics | null = null;

try {
  const isNew = getApps().length === 0;
  app = isNew ? initializeApp(firebaseConfig) : getApp();
  console.log(`${LOG} App ${isNew ? 'initialized (new)' : 'reused (existing)'}`);

  auth = getAuth(app);
  console.log(`${LOG} Auth ready. Current user at init:`, auth.currentUser?.email ?? 'none');

  db = getFirestore(app);
  console.log(`${LOG} Firestore ready`);

  // Initialize Analytics if environment supports it
  if (typeof window !== 'undefined') {
    isSupported()
      .then(supported => {
        if (supported) {
          analytics = getAnalytics(app);
          console.log(`${LOG} Analytics initialized ✅`);
        } else {
          console.log(`${LOG} Analytics not supported in this environment`);
        }
      })
      .catch(err => {
        console.warn(`${LOG} Analytics init skipped:`, err);
      });
  }
} catch (error) {
  console.error(`${LOG} ❌ Firebase initialization FAILED:`, error);
}

export { app, auth, db, analytics };
export const googleProvider = new GoogleAuthProvider();
