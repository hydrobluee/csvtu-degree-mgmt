import { useEffect, useState } from "react";
import api from "../services/api";
import { Tab } from "@headlessui/react";
import ApplicationTable from "./ApplicationTable";

const TABS = ["Dispatch", "Dispatched"];

export default function DispatchDashboard() {
  const [apps, setApps] = useState([]);
  const [checked, setChecked] = useState(new Set());
  const [tab, setTab] = useState(0);

  useEffect(() => void fetchApps(), []);
  const fetchApps = async () => {
    const { data } = await api.get("/applications/all");
    setApps(data);
  };
  const onCheck = (id) => {
    const next = new Set(checked);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setChecked(next);
    // immediately mark dispatched
    api
      .put(`/applications/${id}`, { current_status: "Dispatched" })
      .then(fetchApps);
  };
  const view = (id) => (window.location.href = `/applications/${id}`);

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Dispatch Dashboard</h1>
      <Tab.Group selectedIndex={tab} onChange={setTab}>
        <Tab.List className="flex space-x-2 mb-6">
          {TABS.map((t) => (
            <Tab
              key={t}
              className={({ selected }) =>
                `px-4 py-2 rounded-lg ${
                  selected ? "bg-blue-600 text-white" : "bg-gray-200"
                }`
              }
            >
              {t}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          {TABS.map((t, i) => (
            <Tab.Panel key={t}>
              <ApplicationTable
                apps={apps.filter((a) =>
                  t === "Dispatch"
                    ? a.current_status !== "Dispatched"
                    : a.current_status === "Dispatched"
                )}
                statuses={[]} // no status dropdown
                onStatusChange={() => {}}
                onView={view}
                showStatusColumn={false}
                showCheckbox={t === "Dispatch"}
                onCheck={onCheck}
                checkedIds={checked}
              />
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
