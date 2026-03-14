import type { Bet } from "../../types/types";
import { PlaceBetForm } from "./PlaceBetForm";

export function BetOptions({
  bet,
  jamId,
  disabled,
}: {
  bet: Bet;
  jamId: string;
  disabled: boolean;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      {Object.entries(bet.options).map(([optionId, option]) => (
        <PlaceBetForm
          key={optionId}
          jamId={jamId}
          betId={bet.id}
          optionId={optionId}
          label={option.label}
          odds={option.odds}
          disabled={disabled}
        />
      ))}
    </div>
  );
}
