import { NavLink } from "react-router-dom";

function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-72 text-center bg-gray-100 p-2">
      <h1 className="text-5xl sm:text-4xl font-light text-gray-900 leading-tight">
        Degree Application Form/ Current Status
        <br />
        <span className="block"></span>
      </h1>
      <p className="mt-1 text-lg text-gray-600 max-w-xl">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </p>
      <div className="mt-8 flex space-x-4">
        <NavLink
          to="/student-form"
          className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:opacity-90 transition"
        >
          Student Form
        </NavLink>

        <NavLink
          to="/status"
          className="px-6 py-3 border-2 border-gray-600 rounded-lg font-medium hover:bg-gray-600 hover:text-white transition"
        >
          Check Status
        </NavLink>
      </div>
    </div>
  );
}
export default Home;
