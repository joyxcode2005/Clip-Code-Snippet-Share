import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";
import {
  Menu,
  X,
  Code,
  Terminal,
  ChevronDown,
  LogOut,
  User,
} from "lucide-react";

const Navbar = () => {
  const { isLoogedIn, user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-gradient-to-r from-slate-900 to-slate-800 border-b border-slate-700/50 sticky top-0 z-50 backdrop-blur-sm bg-opacity-90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and brand */}
          <div className="flex items-center">
            <Link
              to="/home"
              className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <Terminal className="h-6 w-6 bg-green-500 text-white p-4 rounded-xl" />
              <span className="font-bold text-lg tracking-tight">ClipCode</span>
            </Link>
          </div>

          {/* User Auth Section - Desktop */}
          <div className="hidden md:flex items-center">
            {isLoogedIn ? (
              <div className="flex items-center space-x-2">
                <div className="relative group">
                  <button className="flex items-center space-x-1 text-slate-200 bg-slate-800/80 hover:bg-slate-700 px-3 py-1.5 rounded-md border border-slate-700 transition-all duration-200">
                    <User className="h-4 w-4 text-cyan-400" />
                    <span className="text-sm font-medium">
                      {user?.username || "User"}
                    </span>
                    <ChevronDown className="h-4 w-4 opacity-70" />
                  </button>
                  <div className="absolute right-0 w-48 mt-2 origin-top-right bg-slate-800 border border-slate-700 rounded-md shadow-lg overflow-hidden z-10 hidden group-hover:block">
                    <div className="py-1">
                      <a
                        href="#profile"
                        className="block px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-white"
                      >
                        Profile
                      </a>
                      <a
                        href="#settings"
                        className="block px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-white"
                      >
                        Settings
                      </a>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-white"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center justify-center rounded-md p-1.5 text-gray-400 hover:text-white focus:outline-none hover:bg-slate-700/50 transition-colors"
                >
                  <LogOut className="h-5 w-5 text-red-400 hover:text-red-300" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="text-slate-300 hover:text-white px-3 py-1.5 text-sm font-medium transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-1.5 rounded-md text-sm font-medium hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-cyan-500/20"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="block h-6 w-6\" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6\" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-slate-800 border-t border-slate-700/50 py-2">
          <div className="space-y-1 px-4 pb-3 pt-2">
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive("/")
                  ? "bg-slate-700 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
            >
              Home
            </Link>
            <Link
              to="/snippets"
              onClick={() => setIsMenuOpen(false)}
              className={`px-3 py-2 rounded-md text-base font-medium flex items-center gap-2 ${
                isActive("/snippets")
                  ? "bg-slate-700 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
            >
              <Code className="h-4 w-4" />
              Snippets
            </Link>

            <div className="pt-4 pb-3 border-t border-gray-700">
              <div className="space-y-2">
                <div className="flex items-center px-3">
                  <div className="flex-shrink-0 bg-slate-700 rounded-full p-1">
                    <User className="h-5 w-5 text-cyan-400" />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium leading-none text-white">
                      {user?.username || "User"}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full flex justify-between items-center px-3 py-2 text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 rounded-md cursor-pointer"
                >
                  <span>Logout</span>
                  <LogOut className="h-5 w-5 text-red-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
