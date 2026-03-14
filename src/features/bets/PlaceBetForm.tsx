import { useState } from "react";
import { placeSelection } from "./bets.service";

export function PlaceBetForm({
  jamId,
  betId,
  optionId,
  label,
  odds,
  disabled,
}: {
  jamId: string;
  betId: string;
  optionId: string;
  label: string;
  odds: number;
  disabled: boolean;
}) {
  const [amount, setAmount] = useState(0);

  async function submit() {
    if (amount <= 0) return;
    await placeSelection(jamId, betId, optionId, amount);
    setAmount(0);
  }

  return (
    <div className="border rounded p-2 flex flex-col gap-2">
      <div className="flex justify-between text-sm">
        <span>{label}</span>
        <span>{odds > 0 ? `+${odds}` : odds}</span>
      </div>

      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        disabled={disabled}
        className="border rounded px-2 py-1 text-sm"
        placeholder="Jellies"
      />

      <button
        onClick={submit}
        disabled={disabled}
        className="bg-blue-600 text-white rounded py-1 text-sm disabled:opacity-50"
      >
        Bet
      </button>
    </div>
  );
}
