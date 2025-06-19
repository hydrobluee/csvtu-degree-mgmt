import React, { useState } from "react";
import api from "../services/api";

export default function StatusTracker() {
  const [rollNo, setRollNo] = useState("");
  const [status, setStatus] = useState(null);

  const handleLookup = async (e) => {
    console.log("Looking up status for roll number:", rollNo);
    e.preventDefault();
    try {
      const res = await api.get(`/applications/roll/${rollNo}`);
      console.log("Status response:", res.data);
      console.log(status);
      setStatus(res.data.current_status);
    } catch {
      setStatus("Not found");
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-xl mb-4">Check Application Status</h2>
      <form onSubmit={handleLookup} className="flex space-x-2">
        <input
          value={rollNo}
          onChange={(e) => setRollNo(e.target.value)}
          placeholder="Roll No."
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
