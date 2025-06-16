import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function MPConDashboard() {
  const [apps, setApps] = useState([]);
  useEffect(() => {
    fetchApps();
  }, []);
  const fetchApps = async () => {
    const res = await api.get("/applications?status=Forwarded to MPCon");
    setApps(res.data);
  };
  const updateStatus = async (id) => {
    await api.put(`/applications/${id}`, {
      currentStatus: "Ready for Dispatch",
    });
    fetchApps();
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-xl mb-4">MPCon Dashboard</h2>
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th>Name</th>
            <th>Enrollment</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {apps.map((a) => (
            <tr key={a.id} className="border-t">
              <td>{a.name}</td>
              <td>{a.enrollmentNo}</td>
              <td>
                <button
                  onClick={() => updateStatus(a.id)}
                  className="px-2 py-1 bg-green-600 text-white rounded"
                >
                  Verify & Forward
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
