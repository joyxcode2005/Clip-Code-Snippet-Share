import Sidebar from "../components/Sidebar";
import {
  Settings as SettingsIcon,
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  Download,
  Trash2,
  Eye,
  Moon,
  Sun,
  Monitor,
  Lock,
  Mail,
  Smartphone,
  Key,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

const Settings = () => {
  const [activeSection, setActiveSection] = useState("profile");
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    updates: true,
  });

  const settingSections = [
    { id: "profile", label: "Profile", icon: User },
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "privacy", label: "Privacy & Security", icon: Shield },
    { id: "language", label: "Language & Region", icon: Globe },
    { id: "data", label: "Data Management", icon: Download },
  ];

  const renderProfileSection = () => (
    <div className="space-y-6">
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 backdrop-blur-sm">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">John Developer</h3>
            <p className="text-slate-400">john.dev@clipcode.com</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Full Name
            </label>
            <input
              type="text"
              defaultValue="John Developer"
              className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Username
            </label>
            <input
              type="text"
              defaultValue="johndev"
              className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Bio
            </label>
            <textarea
              rows={3}
              defaultValue="Full-stack developer passionate about clean code and innovative solutions."
              className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderAppearanceSection = () => (
    <div className="space-y-6">
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 backdrop-blur-sm">
        <h3 className="text-lg font-semibold text-white mb-4">
          Theme Preferences
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Moon className="w-5 h-5 text-slate-400" />
              <span className="text-slate-300">Dark Mode</span>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                darkMode ? "bg-cyan-500" : "bg-slate-600"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  darkMode ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-3 text-center cursor-pointer hover:border-cyan-500 transition-colors">
              <Sun className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
              <span className="text-sm text-slate-300">Light</span>
            </div>
            <div className="bg-slate-700/50 border-2 border-cyan-500 rounded-lg p-3 text-center cursor-pointer">
              <Moon className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
              <span className="text-sm text-white">Dark</span>
            </div>
            <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-3 text-center cursor-pointer hover:border-cyan-500 transition-colors">
              <Monitor className="w-6 h-6 text-slate-400 mx-auto mb-2" />
              <span className="text-sm text-slate-300">System</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationsSection = () => (
    <div className="space-y-6">
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 backdrop-blur-sm">
        <h3 className="text-lg font-semibold text-white mb-4">
          Notification Preferences
        </h3>
        <div className="space-y-4">
          {Object.entries(notifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                {key === "email" && <Mail className="w-5 h-5 text-slate-400" />}
                {key === "push" && (
                  <Smartphone className="w-5 h-5 text-slate-400" />
                )}
                {key === "updates" && (
                  <Bell className="w-5 h-5 text-slate-400" />
                )}
                <div>
                  <span className="text-slate-300 capitalize">
                    {key} Notifications
                  </span>
                  <p className="text-sm text-slate-500">
                    {key === "email" && "Receive notifications via email"}
                    {key === "push" && "Get push notifications on your device"}
                    {key === "updates" && "Stay updated with new features"}
                  </p>
                </div>
              </div>
              <button
                onClick={() =>
                  setNotifications((prev) => ({ ...prev, [key]: !value }))
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  value ? "bg-cyan-500" : "bg-slate-600"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    value ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPrivacySection = () => (
    <div className="space-y-6">
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 backdrop-blur-sm">
        <h3 className="text-lg font-semibold text-white mb-4">
          Security Settings
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-slate-700/50">
            <div className="flex items-center gap-3">
              <Key className="w-5 h-5 text-slate-400" />
              <span className="text-slate-300">Change Password</span>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </div>
          <div className="flex items-center justify-between py-3 border-b border-slate-700/50">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-slate-400" />
              <span className="text-slate-300">Two-Factor Authentication</span>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </div>
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <Eye className="w-5 h-5 text-slate-400" />
              <span className="text-slate-300">Privacy Settings</span>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </div>
        </div>
      </div>
    </div>
  );

  const renderDataSection = () => (
    <div className="space-y-6">
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 backdrop-blur-sm">
        <h3 className="text-lg font-semibold text-white mb-4">
          Data Management
        </h3>
        <div className="space-y-4">
          <button className="w-full flex items-center justify-between p-4 bg-slate-700/30 hover:bg-slate-700/50 rounded-lg transition-colors">
            <div className="flex items-center gap-3">
              <Download className="w-5 h-5 text-cyan-400" />
              <span className="text-slate-300">Export Data</span>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </button>
          <button className="w-full flex items-center justify-between p-4 bg-red-900/20 hover:bg-red-900/30 rounded-lg transition-colors">
            <div className="flex items-center gap-3">
              <Trash2 className="w-5 h-5 text-red-400" />
              <span className="text-red-300">Delete Account</span>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </button>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case "profile":
        return renderProfileSection();
      case "appearance":
        return renderAppearanceSection();
      case "notifications":
        return renderNotificationsSection();
      case "privacy":
        return renderPrivacySection();
      case "data":
        return renderDataSection();
      default:
        return renderProfileSection();
    }
  };

  return (
    <div className="w-full h-screen flex bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex relative overflow-hidden py-8">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 bg-cyan-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-32 right-32 w-48 h-48 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-purple-500 rounded-full blur-2xl"></div>
        </div>

        <div className="flex w-full max-w-7xl mx-auto relative z-10">
          {/* Settings Navigation */}
          <div className="w-80 p-6">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-xl flex items-center justify-center">
                  <SettingsIcon className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-white">Settings</h1>
              </div>
              <p className="text-slate-400">
                Manage your account and application preferences
              </p>
            </div>

            <nav className="space-y-2">
              {settingSections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                      activeSection === section.id
                        ? "bg-cyan-500/20 text-cyan-400 border-r-2 border-cyan-400"
                        : "text-slate-300 hover:bg-slate-700/50 hover:text-white"
                    }`}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span className="font-medium">{section.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Settings Content */}
          <div className="flex-1 p-6 max-h-[90vh] overflow-y-auto">
            <div className="max-w-3xl">
              {renderContent()}

              {/* Save Button */}
              <div className="mt-8 flex justify-end">
                <button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-cyan-500/25 transform hover:scale-105">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Floating particles effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-ping opacity-75"></div>
          <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-blue-400 rounded-full animate-pulse"></div>
          <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
