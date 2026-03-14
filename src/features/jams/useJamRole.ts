import { useState, useEffect } from "react";
import { useAuth } from "../auth/useAuth";
import { getMemberRole } from "./jams.service";

export function useJamRole(jamId: string | undefined) {
  const { user } = useAuth();
  const [role, setRole] = useState<"admin" | "member" | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!jamId || !user) {
      setRole(null);
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);

    getMemberRole(jamId, user.uid).then((r) => {
      if (!cancelled) {
        setRole(r);
        setLoading(false);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [jamId, user]);

  return { role, isAdmin: role === "admin", loading };
}
