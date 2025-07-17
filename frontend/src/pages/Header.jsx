import { useLocation } from "react-router-dom";
import { FaLinkedin } from "react-icons/fa";
import Navbar from "./Navbar";

export default function Header() {
  const location = useLocation();
  const isLoginPage = location.pathname.startsWith("/login");

  return (
    <header className="bg-gray-100 shadow-md px-4 md:px-8 py-2">
      <div className="flex md:flex-row items-center justify-between gap-2 md:gap-20 ">
        {/* Left: Logo + Title */}
        <div className="flex text-sm md:flex-row items-center md:space-x-4 md:text-left w-2xs grow">
          <img
            src="/CSVTULogo.png"
            alt="CSVTU Logo"
            className="h-18 w-18 md:h-28 md:w-28 object-contain mb-2 md:mb-0"
          />
          <h1 className="text-xs md:text-3xl lg:5xl font-semibold ">
            Chhattisgarh Swami Vivekanand Technical University
          </h1>
        </div>

        {/* Middle: Staff Login (hidden on login page & mobile) */}
        {!isLoginPage && (
          <div className="hidden md:flex items-center space-x-4 font-semibold text-lg ">
            <span>Staff Login:</span>
            <Navbar />
          </div>
        )}

        {/* Right: Developer Info */}
        <div className="mt-4 md:mt-0 text-right flex flex-col items-end">
          <div className="font-semibold text-xs md:text-sm mb-1">
            Developed By:
          </div>

          {/* Vivek */}
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-xs md:text-lg">
              Vivek Verma
            </span>
            <a
              href="https://www.linkedin.com/in/vivek-verma-001"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="text-blue-500 text-2xl hover:scale-110 transition" />
            </a>
          </div>

          {/* Shubham */}
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-xs md:text-lg">
              Shubham Mallick
            </span>
            <a
              href="https://www.linkedin.com/in/shubham-mallick-002"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="text-blue-500 text-2xl hover:scale-110 transition" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
