import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase/auth";
import { db } from "../../firebase/firestore";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";

export function login(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

export async function signup(
  email: string,
  password: string,
  displayName: string
) {
  const credential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = credential.user;
  const userRef = doc(db, "users", user.uid);

  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) {
    console.log("creating new user...");
    await setDoc(userRef, {
      displayName: displayName || email.split("@")[0],
      balance: 1000,
      createdAt: serverTimestamp(),
    });
  }

  return user;
}
