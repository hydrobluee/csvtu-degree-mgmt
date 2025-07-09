import { NavLink } from "react-router-dom";
import Footer from "./Footer";

function Home() {
  return (
    <>
      <div className="flex justify-center">
        <div className=" bg-white p-6 rounded-2xl w-sm md:w-2xl mt-10">
          <h1 className=" font-semibold  text-center mb-6 text-2xl md:text-3xl">
            Degree Application Form/ Current Status
            <br />
          </h1>
          <div className="flex justify-center">
            <p className="mt-1 text-lg text-gray-600 max-w-xl mx-1 md:mx-10 ">
              Submit your degree application and track its current approval
              status in one place.
            </p>
          </div>
          <div className="mt-8 flex space-x-4 justify-center">
            <NavLink
              to="/student-form"
              className="px-3 py-2  md:px-4  md:pt-2 bg-blue-500 text-white font-bold  rounded hover:bg-blue-600 transition "
            >
              Student Form
            </NavLink>
            <NavLink
              to="/status"
              className="px-3 py-2  md:px-4  md:pt-2 border-2 border-gray-600 rounded-lg font-medium hover:bg-gray-600 hover:text-white transition"
            >
              Check Status
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}
export default Home;
