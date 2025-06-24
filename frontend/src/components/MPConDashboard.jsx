import { useEffect, useState } from "react";
import api from "../services/api";
import { Tab } from "@headlessui/react";
import ApplicationTable from "./ApplicationTable";

const STATUSES = ["To-Do", "Print", "Dispatch"];

export default function MPConDashboard() {
  const [apps, setApps] = useState([]);
  const [idx, setIdx] = useState(0);

  useEffect(() => void fetchApps(), []);
  const fetchApps = async () => {
    const { data } = await api.get("/applications/all");
    setApps(data);
  };
  const updateStatus = async (id) => {
    await api.put(`/applications/${id}`, { current_status: "Dispatch" });
    fetchApps();
  };
  const view = (id) => (window.location.href = `/applications/${id}`);

  // only show passingYear > 2016
  const filtered = apps.filter((a) => a.passing_year > 2016);

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">MPCon Dashboard</h1>
      <Tab.Group selectedIndex={idx} onChange={setIdx}>
        <Tab.List className="flex space-x-2 mb-6">
          {STATUSES.map((s) => (
            <Tab
              key={s}
              className={({ selected }) =>
                `px-4 py-2 rounded-lg ${
                  selected ? "bg-blue-600 text-white" : "bg-gray-200"
                }`
              }
            >
              {s}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          {STATUSES.map((s) => (
            <Tab.Panel key={s}>
              <ApplicationTable
                apps={filtered.filter((a) => a.current_status === s)}
                statuses={STATUSES}
                onStatusChange={updateStatus}
                onView={view}
              />
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
