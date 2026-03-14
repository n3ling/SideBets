import type { Bet } from "../../types/types";
import { BetOptions } from "./BetOptions";
import { ResolveBetButton } from "./ResolveBetButton";

export function BetCard({
  bet,
  jamId,
  isAdmin,
}: {
  bet: Bet;
  jamId: string;
  isAdmin: boolean;
}) {
  return (
    <div className="border rounded-lg p-4 space-y-3">
      <p className="font-semibold">{bet.description}</p>

      <BetOptions jamId={jamId} bet={bet} disabled={bet.status !== "open"} />

      {isAdmin && bet.status === "open" && (
        <ResolveBetButton jamId={jamId} bet={bet} />
      )}

      {bet.status === "resolved" && (
        <p className="text-green-600 text-sm">
          Resolved: {bet.options[bet.resultOptionId!]?.label}
        </p>
      )}
    </div>
  );
}
