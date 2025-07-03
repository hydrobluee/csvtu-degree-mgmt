import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../services/api";

export default function Login() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const role = params.get("role") || "DegreeCell";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post(
        "/login",
        { email, password, role },
        { withCredentials: true }
      );
      if (res.data.success || res.data.success === false) {
        if (role === "DegreeCell") navigate("/degree-cell");
        if (role === "MPCon") navigate("/mpcon");
        if (role === "Dispatch") navigate("/dispatch");
      }
    } catch {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-xl rounded-xl p-8 w-96">
        <h2 className="text-2xl font-semibold text-center mb-6">
          {role} Login
        </h2>
        {error && (
          <p className="mb-4 text-red-600 text-center text-sm">{error}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}
