import { Link } from "react-router";
import { useProfileStore } from "../store/profileStore";

const NavBar = () => {
  const searchTerm = useProfileStore((state) => state.searchTerm);
  const setSearchTerm = useProfileStore((state) => state.setSearchTerm);
  return (
    <nav className="bg-white shadow-md px-4 py-4">
      <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        {/* Left - Branding & Nav Links */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
          <Link to="/" className="text-xl font-bold text-blue-600">
            MyApp
          </Link>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-6">
            <Link to="/" className="text-gray-700 hover:text-blue-500">
              Home
            </Link>
            <Link to="/admin" className="text-gray-700 hover:text-blue-500">
              Admin Page
            </Link>
          </div>
        </div>

        {/* Right - Search */}
        <div className="flex items-center">
          <input
            type="text"
            aria-label="Search profiles"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-1 border rounded-md focus:outline-none w-full sm:w-64"
          />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
