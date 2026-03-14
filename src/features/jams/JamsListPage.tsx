import { useState, useEffect } from "react";
import { createJam, getUserJams } from "./jams.service";
import { useAuth } from "../auth/useAuth";
import { useNavigate } from "react-router-dom";
import type { UserJam } from "../../types/types";

export function JamsListPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [jams, setJams] = useState<UserJam[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    getUserJams(user.uid).then((jams) => {
      setJams(jams);
      setLoading(false);
    });
  }, [user]);

  async function handleCreate() {
    if (!user || !name.trim()) return;

    const jamId = await createJam(name, user.uid);
    navigate(`/jams/${jamId}`);
  }

  return (
    <div className="p-4 max-w-xl mx-auto space-y-6">
      <h1 className="text-xl font-bold">Your Jams</h1>

      <div className="flex gap-2">
        <input
          className="border p-2 flex-1"
          placeholder="New jam name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button className="bg-black text-white px-4" onClick={handleCreate}>
          Create
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading…</p>
      ) : jams.length === 0 ? (
        <p className="text-gray-500">You’re not in any jams yet</p>
      ) : (
        <ul className="space-y-2">
          {jams.map((jam) => (
            <li
              key={jam.jamId}
              onClick={() => navigate(`/jams/${jam.jamId}`)}
              className="border rounded p-3 cursor-pointer hover:bg-gray-50"
            >
              <div className="font-semibold">{jam.name}</div>
              <div className="text-xs text-gray-500">Role: {jam.role}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
