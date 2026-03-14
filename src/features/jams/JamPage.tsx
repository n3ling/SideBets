import { useParams } from "react-router-dom";
import { JamHeader } from "./JamHeader";
import { CreateBetModal } from "../bets/CreateBetModal";
import { BetList } from "../bets/BetList";

export function JamPage() {
  const { jamId } = useParams();
  if (!jamId) return null;

  const isAdmin = true; // replace with real check

  return (
    <div className="p-4 space-y-4">
      <JamHeader jamId={jamId} />

      {isAdmin && <CreateBetModal jamId={jamId} />}

      <BetList jamId={jamId} isAdmin={isAdmin} />
    </div>
  );
}
