// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { connectAuthEmulator } from "firebase/auth";
import { connectFirestoreEmulator } from "firebase/firestore";
import { auth } from "./auth";
import { db } from "./firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBSfml2qp_W3mi1NjRTt6ATAUtTGQHkZW0",
  authDomain: "sidebets-bd1a8.firebaseapp.com",
  projectId: "sidebets-bd1a8",
  storageBucket: "sidebets-bd1a8.firebasestorage.app",
  messagingSenderId: "215396088874",
  appId: "1:215396088874:web:41af030e3c384398a0d753",
  measurementId: "G-19KW549503",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

// if (import.meta.env.DEV) {
//   connectAuthEmulator(auth, "http://localhost:9099");
//   connectFirestoreEmulator(db, "localhost", 8080);
// }
