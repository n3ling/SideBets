import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

function getEnv(key: keyof ImportMetaEnv): string {
  const value = import.meta.env[key];
  if (value === undefined || value === "") {
    throw new Error(
      `Missing env: ${key}. Copy .env.example to .env and fill in your Firebase config.`
    );
  }
  return value as string;
}

const firebaseConfig = {
  apiKey: getEnv("VITE_FIREBASE_API_KEY"),
  authDomain: getEnv("VITE_FIREBASE_AUTH_DOMAIN"),
  projectId: getEnv("VITE_FIREBASE_PROJECT_ID"),
  storageBucket: getEnv("VITE_FIREBASE_STORAGE_BUCKET"),
  messagingSenderId: getEnv("VITE_FIREBASE_MESSAGING_SENDER_ID"),
  appId: getEnv("VITE_FIREBASE_APP_ID"),
  measurementId: getEnv("VITE_FIREBASE_MEASUREMENT_ID"),
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

// Optional: use Firebase emulators in development
// if (import.meta.env.DEV) {
//   const { connectAuthEmulator } = await import("firebase/auth");
//   const { connectFirestoreEmulator } = await import("firebase/firestore");
//   const { auth } = await import("./auth");
//   const { db } = await import("./firestore");
//   connectAuthEmulator(auth, "http://localhost:9099");
//   connectFirestoreEmulator(db, "localhost", 8080);
// }
