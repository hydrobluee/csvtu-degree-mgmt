import { NavLink } from "react-router-dom";

export default function Navbar() {
  const className =
    "ml-4 mr-4 px-3 py-2  md:px-2  md:pt-1  text-official-blue  font-medium  rounded hover:underline hover:text-blue-600 transition ";

  return (
    <nav>
      {/* <NavLink
        to="/"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        Home
      </NavLink> */}
      <NavLink to="/login?role=DegreeCell" className={className}>
        Degree Cell
      </NavLink>{" "}
      |
      <NavLink to="/login?role=MPCon" className={className}>
        MPCon
      </NavLink>{" "}
      |
      <NavLink to="/login?role=Dispatch" className={className}>
        Dispatch
      </NavLink>
    </nav>
  );
}
