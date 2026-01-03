import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-4 left-4 z-50">
      <div className="relative">
        {/* Burger Square */}
        <button
          className="w-10 h-10 bg-white text-gray-800 flex items-center justify-center rounded-md shadow-md"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          &#9776;
        </button>

        {/* Dropdown Menu */}
        {menuOpen && (
          <div className="absolute top-full left-0 mt-2 w-32 rounded-md flex flex-col gap-2">
            <Link
              to="/"
              className="bg-blue-600 px-4 py-2 hover:bg-blue-700 rounded-md"
              onClick={() => setMenuOpen(false)}
            >
              <span className="text-white">Start</span>
            </Link>
            <Link
              to="/plan"
              className="bg-blue-600 px-4 py-2 hover:bg-blue-700 rounded-md"
              onClick={() => setMenuOpen(false)}
            >
              <span className="text-white">Kalender</span>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
