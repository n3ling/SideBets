import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { signup } from "./auth.service";

export function SignupPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await signup(email, password, displayName);
    navigate("/me");
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        <h1 className="text-2xl font-bold">Sign Up</h1>

        <input
          className="w-full border p-2 rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full border p-2 rounded"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          className="w-full border p-2 rounded"
          placeholder="Display Name"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />

        <button className="w-full bg-black text-white py-2 rounded">
          Sign up
        </button>

        <p className="text-sm">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}
