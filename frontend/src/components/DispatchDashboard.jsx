import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function DispatchDashboard() {
  const [apps, setApps] = useState([]);
  useEffect(() => {
    fetchApps();
  }, []);
  const fetchApps = async () => {
    const res = await api.get("/applications?status=Ready for Dispatch");
    setApps(res.data);
  };
  const dispatchApp = async (id) => {
    await api.put(`/applications/${id}`, { currentStatus: "Dispatched" });
    fetchApps();
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-xl mb-4">Dispatch Dashboard</h2>
    </div>
  );
}
