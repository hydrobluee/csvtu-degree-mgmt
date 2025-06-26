import { Routes, Route, NavLink } from "react-router-dom";

import StudentForm from "../components/StudentForm";
import StatusTracker from "../components/StatusTracker";
import DegreeCellDashboard from "../components/DegreeCellDashboard";
import MPConDashboard from "../components/MPConDashboard";
import DispatchDashboard from "../components/DispatchDashboard";

function Main() {
  return (
    <div className="container mx-auto px-4 py-6">
      {/* ─── Navigation Pills ──────────────────────────── */}
      <nav className="flex flex-wrap justify-center sm:justify-end gap-2 sm:gap-4 mb-6">
        <NavLink
          to="/"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Student Form
        </NavLink>
        <NavLink
          to="/status"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Check Status
        </NavLink>
        <NavLink
          to="/degree-cell"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Degree Cell
        </NavLink>
        <NavLink
          to="/mpcon"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          MPCon
        </NavLink>
        <NavLink
          to="/dispatch"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Dispatch
        </NavLink>
      </nav>

      {/* ─── Page Card ────────────────────────────────── */}
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <Routes>
          <Route path="/" element={<StudentForm />} />
          <Route path="/status" element={<StatusTracker />} />
          <Route path="/degree-cell" element={<DegreeCellDashboard />} />
          <Route path="/mpcon" element={<MPConDashboard />} />
          <Route path="/dispatch" element={<DispatchDashboard />} />
        </Routes>
      </div>
    </div>
  );
}
export default Main;
