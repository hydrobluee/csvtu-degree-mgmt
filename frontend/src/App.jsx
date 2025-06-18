import React from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import StudentForm from "./components/StudentForm";
import StatusTracker from "./components/StatusTracker";
import DegreeCellDashboard from "./components/DegreeCellDashboard";
import MPConDashboard from "./components/MPConDashboard";
import DispatchDashboard from "./components/DispatchDashboard";

function App() {
  return (
    <>
       <img
        src="/CSVTULogo.jpg"
        alt="University Banner"
        className="w-full h-36 object-cover"
      />

    <div className="p-6 space-y-4">
      <nav className="flex justify-end space-x-4">
        <NavLink to="/" className="text-blue-600">
          Student Form
        </NavLink>
        <NavLink to="/status" className="text-blue-600">
          Check Status
        </NavLink>
        <NavLink to="/degree-cell" className="text-blue-600">
          Degree Cell
        </NavLink>
        <NavLink to="/mpcon" className="text-blue-600">
          MPCon
        </NavLink>
        <NavLink to="/dispatch" className="text-blue-600">
          Dispatch
        </NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<StudentForm />} />
        <Route path="/status" element={<StatusTracker />} />
        <Route path="/degree-cell" element={<DegreeCellDashboard />} />
        <Route path="/mpcon" element={<MPConDashboard />} />
        <Route path="/dispatch" element={<DispatchDashboard />} />
      </Routes>
    </div>
    </>
  );
}

export default App;
