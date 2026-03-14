import type { Bet } from "../../types/types";
import { resolveBet } from "./bets.service";

export function ResolveBetButton({ jamId, bet }: { jamId: string; bet: Bet }) {
  async function resolve(optionId: string) {
    await resolveBet(jamId, bet.id, optionId);
  }

  return (
    <div className="flex gap-2 pt-2">
      {Object.entries(bet.options).map(([id, option]) => (
        <button
          key={id}
          onClick={() => resolve(id)}
          className="text-xs bg-red-600 text-white px-2 py-1 rounded"
        >
          Resolve {option.label}
        </button>
      ))}
    </div>
  );
}
