import Sidebar from "../components/Sidebar";
import { Star, Sparkles, Zap, Heart } from "lucide-react";

const Favourites = () => {
  return (
    <div className="w-full h-screen flex bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 bg-cyan-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-32 right-32 w-48 h-48 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-purple-500 rounded-full blur-2xl"></div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-2xl mx-auto text-center p-8">
          {/* Icon with gradient background */}
          <div className="mb-8 relative">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-cyan-400 to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-cyan-500/25">
              <Heart className="w-12 h-12 text-white" />
            </div>
            {/* Floating decorative stars */}
            <Star className="absolute -top-2 -right-2 w-6 h-6 text-yellow-400 animate-pulse" />
            <Sparkles className="absolute -bottom-1 -left-3 w-5 h-5 text-cyan-400 animate-bounce" />
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl font-bold mb-6 text-white p-4 z-50">
            🚧 Coming Soon
          </h1>

          {/* Subtitle */}
          <div className="mb-8 space-y-4">
            <p className="text-xl text-slate-300 leading-relaxed">
              The{" "}
              <span className="font-semibold text-cyan-400">Favourites</span>{" "}
              feature will be available in{" "}
              <span className="font-bold text-blue-400 bg-blue-500/10 px-2 py-1 rounded-md">
                Version 2.0
              </span>{" "}
              of the app.
            </p>
            <p className="text-slate-400 text-lg">
              Bookmark your most-used code snippets and access them instantly.
            </p>
          </div>

          {/* Feature Preview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 backdrop-blur-sm">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Star className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Quick Access
              </h3>
              <p className="text-slate-400 text-sm">
                Save your favorite snippets for instant access
              </p>
            </div>

            <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 backdrop-blur-sm">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Smart Organization
              </h3>
              <p className="text-slate-400 text-sm">
                Automatically categorize and organize favorites
              </p>
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

export default Favourites;
