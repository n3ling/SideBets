import { auth } from "../../firebase/auth";
import {
  doc,
  collection,
  setDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase/firestore";
import type { BetType } from "../../types/types";

export async function createBet(
  jamId: string,
  bet: {
    description: string;
    type: BetType;
    options: Record<string, { label: string; odds: number }>;
    closesAt: Date;
  }
) {
  const user = auth.currentUser!;
  const betRef = doc(collection(db, "jams", jamId, "bets"));

  await setDoc(betRef, {
    authorId: user.uid,
    status: "open",
    type: bet.type,
    description: bet.description,
    options: bet.options,
    closesAt: bet.closesAt,
    resultOptionId: null,
    createdAt: serverTimestamp(),
  });
}

export async function placeSelection(
  jamId: string,
  betId: string,
  optionId: string,
  amount: number
) {
  const uid = auth.currentUser!.uid;

  await setDoc(doc(db, "jams", jamId, "bets", betId, "selections", uid), {
    optionId,
    amount,
    placedAt: serverTimestamp(),
  });
}

export async function resolveBet(
  jamId: string,
  betId: string,
  resultOptionId: string
) {
  await updateDoc(doc(db, "jams", jamId, "bets", betId), {
    status: "resolved",
    resultOptionId,
    resolvedAt: serverTimestamp(),
  });
}
