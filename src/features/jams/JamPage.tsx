import { useParams } from "react-router-dom";
import { JamHeader } from "./JamHeader";
import { CreateBetModal } from "../bets/CreateBetModal";
import { BetList } from "../bets/BetList";
import { useJamRole } from "./useJamRole";

export function JamPage() {
  const { jamId } = useParams();
  const { isAdmin, loading } = useJamRole(jamId);

  if (!jamId) return null;
  if (loading) return <p className="p-4 text-gray-500">Loading…</p>;

  return (
    <div className="p-4 space-y-4">
      <JamHeader jamId={jamId} />

      {isAdmin && <CreateBetModal jamId={jamId} />}

      <BetList jamId={jamId} isAdmin={isAdmin} />
    </div>
  );
}
