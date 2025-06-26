import React from "react";
import { Routes, Route, NavLink } from "react-router-dom";

import StudentForm from "./components/StudentForm";
import StatusTracker from "./components/StatusTracker";
import DegreeCellDashboard from "./components/DegreeCellDashboard";
import MPConDashboard from "./components/MPConDashboard";
import DispatchDashboard from "./components/DispatchDashboard";
import Header from "./pages/Header";
import Main from "./pages/Main";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* ─── Logo Banner ─────────────────────────────────── */}
      <Header />

      {/* ─── Main Container ─────────────────────────────── */}
      <Main />
    </div>
  );
}

export default App;
