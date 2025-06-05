import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";
import {
  Code,
  Terminal,
  ChevronDown,
  LogOut,
  User,
  Home,
  Settings,
  ChevronLeft,
  ChevronRight,
  Heart,
  Plus,
} from "lucide-react";
import { navigationItems } from "../constants";

const Sidebar = () => {
  const { isLoogedIn, user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div
      className={`h-screen bg-gradient-to-b from-slate-900 to-slate-800 border-r border-slate-700/50 sticky top-0 transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-700/50">
          <Link
            to="/home"
            className={`flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors ${
              isCollapsed ? "justify-center" : ""
            }`}
          >
            <div className="bg-blue-500/30 border-white p-2 rounded-xl">
              <Terminal className="h-5 w-5 text-white" />
            </div>
            {!isCollapsed && (
              <span className="font-bold text-lg tracking-tight">ClipCode</span>
            )}
          </Link>
          <button
            onClick={toggleCollapse}
            className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-700/50 transition-colors"
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          <div className="space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(item.path)
                      ? "bg-cyan-500/20 text-cyan-400 border-r-2 border-cyan-400"
                      : "text-slate-300 hover:bg-slate-700/50 hover:text-white"
                  } ${isCollapsed ? "justify-center" : ""}`}
                  title={isCollapsed ? item.label : ""}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  {!isCollapsed && <span>{item.label}</span>}
                </Link>
              );
            })}
          </div>

          {/* Divider */}
          <div className="my-6 border-t border-slate-700/50"></div>

          {/* Additional Links */}
          <div className="space-y-1">
            <Link
              to="/settings"
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive("/settings")
                  ? "bg-cyan-500/20 text-cyan-400 border-r-2 border-cyan-400"
                  : "text-slate-300 hover:bg-slate-700/50 hover:text-white"
              } ${isCollapsed ? "justify-center" : ""}`}
              title={isCollapsed ? "Settings" : ""}
            >
              <Settings className="h-5 w-5 flex-shrink-0" />
              {!isCollapsed && <span>Settings</span>}
            </Link>
          </div>
        </nav>

        {/* User Section */}
        <div className="border-t border-slate-700/50 p-3">
          {isLoogedIn ? (
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-200 hover:bg-slate-700/50 transition-all duration-200 ${
                  isCollapsed ? "justify-center" : ""
                }`}
                title={isCollapsed ? user?.username || "User" : ""}
              >
                <div className="bg-cyan-500/20 p-1.5 rounded-full">
                  <User className="h-4 w-4 text-cyan-400" />
                </div>
                {!isCollapsed && (
                  <>
                    <div className="flex-1 text-left">
                      <div className="text-sm font-medium">
                        {user?.username || "User"}
                      </div>
                      <div className="text-xs text-slate-400">
                        {user?.email || "user@example.com"}
                      </div>
                    </div>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${
                        isUserMenuOpen ? "rotate-180" : ""
                      }`}
                    />
                  </>
                )}
              </button>

              {/* User Dropdown Menu */}
              {isUserMenuOpen && !isCollapsed && (
                <div className="absolute bottom-full left-0 right-0 mb-2 bg-slate-800 border border-slate-700 rounded-lg shadow-lg overflow-hidden">
                  <div className="py-1">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      to="/account"
                      className="block px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Account Settings
                    </Link>
                    <div className="border-t border-slate-700 my-1"></div>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsUserMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-slate-700 hover:text-red-300 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <LogOut className="h-4 w-4" />
                        Logout
                      </div>
                    </button>
                  </div>
                </div>
              )}

              {/* Collapsed logout button */}
              {isCollapsed && (
                <button
                  onClick={handleLogout}
                  className="w-full mt-2 p-2 rounded-lg text-red-400 hover:bg-slate-700/50 hover:text-red-300 transition-colors"
                  title="Logout"
                >
                  <LogOut className="h-4 w-4 mx-auto" />
                </button>
              )}
            </div>
          ) : (
            <div className={`space-y-2 ${isCollapsed ? "text-center" : ""}`}>
              {isCollapsed ? (
                <div className="space-y-2">
                  <Link
                    to="/login"
                    className="block p-2 rounded-lg text-slate-300 hover:bg-slate-700/50 hover:text-white transition-colors"
                    title="Login"
                  >
                    <User className="h-4 w-4 mx-auto" />
                  </Link>
                </div>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block w-full px-3 py-2 text-center text-slate-300 hover:text-white text-sm font-medium transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-cyan-500/20 text-center"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
