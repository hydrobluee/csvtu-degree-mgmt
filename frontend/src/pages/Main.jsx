import { Routes, Route } from "react-router-dom";

import StudentForm from "../components/StudentForm";
import StatusTracker from "../components/StatusTracker";
import DegreeCellDashboard from "../components/DegreeCellDashboard";
import MPConDashboard from "../components/MPConDashboard";
import DispatchDashboard from "../components/DispatchDashboard";
import Navbar from "./Navbar";
import Home from "./Home";
import Login from "../components/Login";

import PrivateRoute from "../components/PrivateRoute";

function Main() {
  return (
    <div className="container mx-auto px-4 py-6 ">
      {/* ─── Page Card ────────────────────────────────── */}
      <Routes>
        {/* <Route path="/" element={<StudentForm />} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/student-form" element={<StudentForm />} />
        <Route path="/status" element={<StatusTracker />} />

        <Route path="/login" element={<Login />} />

        {/* ─── Protected Routes 👇🏻  ────────────────────────── */}
        {/* <Route element={<PrivateRoute requiredRole="DegreeCell" />}> */}
        <Route path="/degree-cell" element={<DegreeCellDashboard />} />
        {/* </Route> */}

        {/* <Route element={<PrivateRoute requiredRole="MPCon" />}> */}
        <Route path="/mpcon" element={<MPConDashboard />} />
        {/* </Route> */}

        {/* <Route element={<PrivateRoute requiredRole="Dispatch" />}> */}
        <Route path="/dispatch" element={<DispatchDashboard />} />
        {/* </Route> */}
        {/* Protected Routes 👆🏻 ────────────────────────── */}
      </Routes>
    </div>
    //   </div>
    // </div>
  );
}
export default Main;
