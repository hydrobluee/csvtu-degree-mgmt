import React, { useCallback, useEffect, useState } from "react";
import api from "../services/api";
import { Tab } from "@headlessui/react";
import { ChevronDownIcon, EyeIcon } from "lucide-react";

const statuses = ["To-Do", "Print", "Dispatch"];

export default function DepartmentDashboard() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [apps, setApps] = useState([]);

  useEffect(() => {
    fetchApps();
  }, []);
  const fetchApps = async () => {
    try {
      const res = await api.get("/applications/all");
      setApps(res.data);
    } catch (err) {
      console.error("Failed to fetch applications:", err);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await api.put(`/applications/${id}`, { current_status: newStatus });
      fetchApps();
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Department Dashboard</h1>

      <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
        <Tab.List className="flex space-x-2 mb-6">
          {statuses.map((status) => (
            <Tab
              key={status}
              className={({ selected }) =>
                `px-4 py-2 font-medium rounded-lg transition-colors ${
                  selected
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700"
                }`
              }
            >
              {status}
            </Tab>
          ))}
        </Tab.List>

        <Tab.Panels>
          {statuses.map((status, idx) => {
            const filteredApps = apps.filter(
              (app) => app.current_status === status
            );

            return (
              <Tab.Panel key={status} className="overflow-x-auto">
                {filteredApps.length ? (
                  <table className="w-full table-auto border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="px-3 py-2">Type</th>
                        <th className="px-3 py-2">Certificate Type</th>
                        <th className="px-3 py-2">Roll No</th>
                        <th className="px-3 py-2">Enrollment No</th>
                        <th className="px-3 py-2">Name</th>
                        <th className="px-3 py-2">Status</th>
                        <th className="px-3 py-2">Passing Year</th>
                        <th className="px-3 py-2">View Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredApps.map((app) => (
                        <tr key={app.id} className="border-t">
                          <td className="px-3 py-2">{app.type}</td>
                          <td className="px-3 py-2">{app.certificate_type}</td>
                          <td className="px-3 py-2">{app.roll_number}</td>
                          <td className="px-3 py-2">{app.enrollment_number}</td>
                          <td className="px-3 py-2">{app.student_name}</td>
                          <td className="px-3 py-2">
                            <div className="relative inline-block text-left">
                              <select
                                value={app.current_status}
                                onChange={(e) =>
                                  updateStatus(app.id, e.target.value)
                                }
                                className="appearance-none px-2 py-1 border rounded-md bg-white"
                              >
                                {statuses.map((s) => (
                                  <option key={s} value={s}>
                                    {s}
                                  </option>
                                ))}
                              </select>
                              <ChevronDownIcon className="absolute right-1 top-1.5 w-4 h-4 text-gray-600 pointer-events-none" />
                            </div>
                          </td>
                          <td className="px-3 py-2">{app.passing_year}</td>
                          <td className="px-3 py-2">
                            <button
                              onClick={() =>
                                (window.location.href = `/applications/${app.id}`)
                              }
                              className="flex items-center px-3 py-1 bg-green-500 text-white rounded-md"
                            >
                              <EyeIcon className="w-4 h-4 mr-1" /> View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className="mt-4 text-gray-500">
                    No applications in "{status}".
                  </p>
                )}
              </Tab.Panel>
            );
          })}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
