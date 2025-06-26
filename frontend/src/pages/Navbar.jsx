import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
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
  );
}
