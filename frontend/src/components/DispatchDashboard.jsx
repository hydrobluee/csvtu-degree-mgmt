import { useEffect, useState } from "react";
import api from "../services/api";
import { Tab } from "@headlessui/react";
import ApplicationTable from "./ApplicationTable";
import ViewStudentData from "./ViewStudentData";

const TABS = ["Dispatch", "Dispatched"];

export default function DispatchDashboard() {
  const [apps, setApps] = useState([]);
  const [checkedIds, setCheckedIds] = useState(new Set());
  const [tabIdx, setTabIdx] = useState(0);

  // modal
  const [showModal, setShowModal] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);

  /* ───────────────────── fetch ───────────────────── */
  const fetchApps = async () => {
    const { data } = await api.get("/applications/all");
    setApps(data);
  };
  useEffect(() => {
    fetchApps();
  }, []);

  /* ───────────────────── checkbox handler ───────────────────── */
  const onCheck = async (id) => {
    // optimistic move to Dispatched
    setApps((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, current_status: "Dispatched" } : a
      )
    );
    setCheckedIds((prev) => new Set(prev).add(id));

    try {
      await api.put(`/applications/${id}`, { current_status: "Dispatched" });
    } catch (err) {
      console.error("Failed to update:", err);
      await fetchApps(); // rollback from server truth
      setCheckedIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  };

  /* ───────────────────── view modal ───────────────────── */
  const handleView = (id) => {
    const student = apps.find((a) => a.id === id);
    setCurrentStudent(student);
    setShowModal(true);
  };

  /* ────────────────────────── UI ────────────────────────── */
  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Dispatch Dashboard</h1>

      <Tab.Group selectedIndex={tabIdx} onChange={setTabIdx}>
        <Tab.List className="flex space-x-2 mb-6">
          {TABS.map((t) => (
            <Tab
              key={t}
              className={({ selected }) =>
                `px-4 py-2 rounded-lg ${
                  selected ? "bg-official-blue text-white" : "bg-gray-200"
                }`
              }
            >
              {t}
            </Tab>
          ))}
        </Tab.List>

        <Tab.Panels>
          {TABS.map((t) => (
            <Tab.Panel key={t}>
              <ApplicationTable
                apps={apps.filter((a) =>
                  t === "Dispatch"
                    ? a.current_status !== "Dispatched"
                    : a.current_status === "Dispatched"
                )}
                statuses={[]}
                showStatusColumn={false}
                showCheckbox={t === "Dispatch"}
                onCheck={onCheck}
                checkedIds={checkedIds}
                onStatusChange={() => {}}
                onView={handleView}
              />
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>

      <ViewStudentData
        isOpen={showModal}
        student={currentStudent}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
}
