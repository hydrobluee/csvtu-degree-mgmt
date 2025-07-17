import { useEffect, useState } from "react";
import api from "../services/api";
import { Tab } from "@headlessui/react";
import ApplicationTable from "./ApplicationTable";
import ViewStudentData from "./ViewStudentData";

const STATUSES = ["To-Do", "Print", "Dispatch"];

export default function DegreeDashboard() {
  const [apps, setApps] = useState([]);
  const [tabIdx, setTabIdx] = useState(0);

  // modal state
  const [showModal, setShowModal] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);

  /* ───────────────────── fetch & helpers ───────────────────── */
  const fetchApps = async () => {
    const { data } = await api.get("/applications/all");
    setApps(data.filter((a) => a.passing_year <= 2016)); // ≤ 2016 only
  };

  const updateStatus = async (id, newStatus = "Dispatch") => {
    // optimistic UI
    setApps((prev) =>
      prev.map((a) => (a.id === id ? { ...a, current_status: newStatus } : a))
    );
    try {
      await api.put(`/applications/${id}`, { current_status: newStatus });
    } catch (err) {
      console.error("Failed to update:", err);
      fetchApps(); // rollback
    }
  };

  const handleView = (id) => {
    const student = apps.find((a) => a.id === id);
    setCurrentStudent(student);
    setShowModal(true);
  };

  /* ───────────────────── initial load ───────────────────── */
  useEffect(() => {
    fetchApps();
  }, []);

  /* ────────────────────────── UI ────────────────────────── */
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Degree Dashboard</h1>

      <Tab.Group selectedIndex={tabIdx} onChange={setTabIdx}>
        <Tab.List className="flex space-x-2 mb-6">
          {STATUSES.map((s) => (
            <Tab
              key={s}
              className={({ selected }) =>
                `px-4 py-2 rounded-lg ${
                  selected ? "bg-official-blue text-white" : "bg-gray-200"
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
                apps={apps.filter((a) => a.current_status === s)}
                statuses={STATUSES}
                onStatusChange={updateStatus}
                onView={handleView}
              />
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>

      {/* detail modal */}
      <ViewStudentData
        isOpen={showModal}
        student={currentStudent}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
}
