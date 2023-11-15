// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  GoogleAuthProvider,
  User,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
} from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAQsYzV_mntRIpVswM3eO5W9bC2ZMDVMHM',
  authDomain: 'v-stream-796a1.firebaseapp.com',
  projectId: 'v-stream-796a1',
  appId: '1:163905519514:web:91604396c98cab6dca0423',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

/**
 * Signs the user in with a Google popup.
 * @returns A promise that resolves with the user credentials
 */

export function signInWithGoogle() {
  return signInWithPopup(auth, new GoogleAuthProvider());
}

/**
 * Signs-out the user
 * @returns a promise that resolves when the user signs out
 */
export function signOut() {
  return auth.signOut();
}

/**
 * Trigger a callback when user auth state changes
 * @returns a function to unsubscribe callback
 */
export function onAuthStateChangedHelper(
  callback: (user: User | null) => void
) {
  return onAuthStateChanged(auth, callback);
}
