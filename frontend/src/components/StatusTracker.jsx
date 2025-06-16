import React, { useState } from "react";
import api from "../services/api";

export default function StatusTracker() {
  const [enrollment, setEnrollment] = useState("");
  const [status, setStatus] = useState(null);

  const handleLookup = async (e) => {
    e.preventDefault();
    try {
      const res = await api.get(`/applications/enrollment/${enrollment}`);
      setStatus(res.data.currentStatus);
    } catch {
      setStatus("Not found");
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-xl mb-4">Check Application Status</h2>
      <form onSubmit={handleLookup} className="flex space-x-2">
        <input
          value={enrollment}
          onChange={(e) => setEnrollment(e.target.value)}
          placeholder="Enrollment No."
          className="border p-1 flex-grow"
        />
        <button type="submit" className="bg-green-600 text-white px-3 rounded">
          Check
        </button>
      </form>
      {status && <p className="mt-4">Current Status: {status}</p>}
    </div>
  );
}
