import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import type { Bet } from "../../types/types";
import { db } from "../../firebase/firestore";
import { BetCard } from "./BetCard";

export function BetList({
  jamId,
  isAdmin,
}: {
  jamId: string;
  isAdmin: boolean;
}) {
  const [bets, setBets] = useState<Bet[]>([]);

  useEffect(() => {
    const q = collection(db, "jams", jamId, "bets");
    return onSnapshot(q, (snap) => {
      setBets(
        snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Bet, "id">) }))
      );
    });
  }, [jamId]);

  if (!bets.length) {
    return <p className="text-gray-500">No bets yet</p>;
  }

  return (
    <div className="space-y-3">
      {bets.map((bet) => (
        <BetCard key={bet.id} bet={bet} jamId={jamId} isAdmin={isAdmin} />
      ))}
    </div>
  );
}
