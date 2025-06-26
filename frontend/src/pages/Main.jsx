import { Routes, Route } from "react-router-dom";

import StudentForm from "../components/StudentForm";
import StatusTracker from "../components/StatusTracker";
import DegreeCellDashboard from "../components/DegreeCellDashboard";
import MPConDashboard from "../components/MPConDashboard";
import DispatchDashboard from "../components/DispatchDashboard";
import Navbar from "./Navbar";
import Home from "./Home";

function Main() {
  return (
    <div className="container mx-auto px-4 py-6">
      {/* ─── Navigation Pills ──────────────────────────── */}
      <Navbar />

      {/* ─── Page Card ────────────────────────────────── */}
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <Routes>
          {/* <Route path="/" element={<StudentForm />} /> */}
          <Route path="/" element={<Home />} />
          <Route path="/student-form" element={<StudentForm />} />
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
