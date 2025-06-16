import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function DegreeCellDashboard() {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    fetchApps();
  }, []);
  const fetchApps = async () => {
    const res = await api.get("/applications?status=Forwarded to Degree Cell");
    setApps(res.data);
  };

  const updateStatus = async (id, newStatus) => {
    await api.put(`/applications/${id}`, { currentStatus: newStatus });
    fetchApps();
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-xl mb-4">Degree Cell Dashboard</h2>
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
              <td className="space-x-2">
                <button
                  onClick={() => updateStatus(a.id, "Verified by Degree Cell")}
                  className="px-2 py-1 bg-blue-500 text-white rounded"
                >
                  Verify
                </button>
                <button
                  onClick={() => updateStatus(a.id, "Ready for Dispatch")}
                  className="px-2 py-1 bg-green-500 text-white rounded"
                >
                  Mark Checked
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
