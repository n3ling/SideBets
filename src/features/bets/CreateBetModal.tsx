import { useState } from "react";
import { createBet } from "./bets.service";

export function CreateBetModal({ jamId }: { jamId: string }) {
  const [open, setOpen] = useState(false);
  const [desc, setDesc] = useState("");
  const [line, setLine] = useState(2.5);
  const [overOdds, setOverOdds] = useState(-110);
  const [underOdds, setUnderOdds] = useState(-110);

  async function submit() {
    await createBet(jamId, {
      description: desc,
      type: "over_under",
      options: {
        over: { label: `Over ${line}`, odds: overOdds },
        under: { label: `Under ${line}`, odds: underOdds },
      },
      closesAt: new Date(Date.now() + 60 * 60 * 1000),
    });

    setOpen(false);
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Create Bet
      </button>
    );
  }

  return (
    <div className="border rounded p-4 space-y-2">
      <input
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        placeholder="Bet description"
        className="border rounded w-full px-2 py-1"
      />

      <input
        type="number"
        value={line}
        onChange={(e) => setLine(Number(e.target.value))}
        className="border rounded w-full px-2 py-1"
      />

      <button
        onClick={submit}
        className="bg-blue-600 text-white rounded px-4 py-2"
      >
        Create
      </button>
    </div>
  );
}
