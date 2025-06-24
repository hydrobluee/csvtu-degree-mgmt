import React from "react";
import { ChevronDownIcon, EyeIcon, CheckIcon } from "lucide-react";

export default function ApplicationTable({
  apps,
  statuses,
  onStatusChange,
  onView,
  showStatusColumn = true,
  showCheckbox = false,
  onCheck,
  checkedIds = new Set(),
}) {
  return (
    <table className="w-full table-auto border-collapse">
      <thead>
        <tr className="bg-gray-100">
          <th className="px-3 py-2">Type</th>
          <th className="px-3 py-2">Certificate Type</th>
          <th className="px-3 py-2">Roll No</th>
          <th className="px-3 py-2">Enrollment No</th>
          <th className="px-3 py-2">Name</th>
          {showStatusColumn && <th className="px-3 py-2">Status</th>}
          {showCheckbox && <th className="px-3 py-2">Dispatch?</th>}
          <th className="px-3 py-2">Passing Year</th>
          <th className="px-3 py-2">View</th>
        </tr>
      </thead>
      <tbody>
        {apps.map((app) => (
          <tr key={app.id} className="border-t">
            <td className="px-3 py-2">{app.type}</td>
            <td className="px-3 py-2">{app.certificate_type}</td>
            <td className="px-3 py-2">{app.roll_number}</td>
            <td className="px-3 py-2">{app.enrollment_number}</td>
            <td className="px-3 py-2">{app.student_name}</td>

            {showStatusColumn && (
              <td className="px-3 py-2">
                <div className="relative inline-block text-left">
                  <select
                    value={app.current_status}
                    onChange={(e) => onStatusChange(app.id, e.target.value)}
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
            )}

            {showCheckbox && (
              <td className="px-3 py-2 text-center">
                <input
                  type="checkbox"
                  checked={checkedIds.has(app.id)}
                  onChange={() => onCheck(app.id)}
                  className="h-5 w-5"
                />
              </td>
            )}

            <td className="px-3 py-2">{app.passing_year}</td>
            <td className="px-3 py-2">
              <button
                onClick={() => onView(app.id)}
                className="flex items-center px-3 py-1 bg-green-500 text-white rounded-md"
              >
                <EyeIcon className="w-4 h-4 mr-1" /> View
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
