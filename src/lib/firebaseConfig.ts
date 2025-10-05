// lib/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  OAuthProvider,
  signInWithPopup,
  UserCredential,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const appleProvider = new OAuthProvider("apple.com");

export const signInWithGoogle = async (): Promise<UserCredential | null> => {
  try {
    return await signInWithPopup(auth, googleProvider);
  } catch (error) {
    console.error("Google login failed:", error);
    return null;
  }
};

export const signInWithApple = async (): Promise<UserCredential | null> => {
  try {
    return await signInWithPopup(auth, appleProvider);
  } catch (error) {
    console.error("Apple login failed:", error);
    return null;
  }
};
