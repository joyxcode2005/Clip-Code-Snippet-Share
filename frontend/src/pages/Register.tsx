import { useState, useEffect, useRef } from "react";
import { Code2, ChevronRight, Sparkles } from "lucide-react";

import { authPageCardInfo, authPageInfo, BACKEND_URL } from "../constants";
import FloatingCubes from "../components/FloatingCubes";
import FloatingParticles from "../components/FloatingParticles";
import Input from "../components/Input";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";

export default function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [err, setErr] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const navigate = useNavigate();
  const formRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Mouse tracking for interactive effects
    const handleMouseMove = (e: any) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Animate background particles
    const particles = document.querySelectorAll(".particle");
    particles.forEach((particle, index) => {
      const delay = index * 0.15;
      const duration = 4 + Math.random() * 3;
      (particle as HTMLElement).style.animationDelay = `${delay}s`;
      (particle as HTMLElement).style.animationDuration = `${duration}s`;
    });

    // 3D Cubes animation
    const cubes = document.querySelectorAll(".floating-cube");
    cubes.forEach((cube, index) => {
      const delay = index * 0.5;
      const duration = 8 + Math.random() * 4;
      (cube as HTMLElement).style.animationDelay = `${delay}s`;
      (cube as HTMLElement).style.animationDuration = `${duration}s`;
    });

    // Form entrance animation
    if (formRef.current) {
      formRef.current.style.transform = "translateY(60px) scale(0.95)";
      formRef.current.style.opacity = "0";
      setTimeout(() => {
        if (formRef.current) {
          formRef.current.style.transition =
            "all 1s cubic-bezier(0.22, 1, 0.36, 1)";
          formRef.current.style.transform = "translateY(0) scale(1)";
          formRef.current.style.opacity = "1";
        }
      }, 300);
    }

    // Hero section animation
    if (heroRef.current) {
      heroRef.current.style.transform = "translateX(-120px)";
      heroRef.current.style.opacity = "0";
      setTimeout(() => {
        if (heroRef.current) {
          heroRef.current.style.transition =
            "all 1.2s cubic-bezier(0.22, 1, 0.36, 1)";
          heroRef.current.style.transform = "translateX(0)";
          heroRef.current.style.opacity = "1";
        }
      }, 500);
    }

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    setErr("");

    if (!username || !email || !password || !confirmPassword) {
      setIsLoading(false);
      setErr("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setIsLoading(false);
      setErr("Passwords do not match.");
      return;
    }

    // Sending backend request to register the user
    try {
      // Replace with your actual API endpoint
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/register`, {
        username,
        email,
        password,
      });

      if (response.status === 200) {
        useAuthStore.getState().login(response.data.token);
        setIsLoading(false);
        navigate("/home");
      } else {
        setIsLoading(false);
        setErr("Registration failed. Please try again.");
      }
    } catch (error: any) {
      setIsLoading(false);
      setErr(error.message || "An error occurred. Please try again.");
    }
  };

  const handleFocus = (field: any) => {
    setFocusedField(field);
  };

  const handleBlur = () => {
    setFocusedField("");
  };

  return (
    <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 text-white relative overflow-hidden">
      {/* Interactive Background */}
      <div ref={backgroundRef} className="absolute inset-0">
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>

        {/* Dynamic Gradient Overlay */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.15), transparent 40%)`,
          }}
        ></div>

        {/* Floating 3D Cubes */}
        <FloatingCubes />

        {/* Enhanced Floating Particles */}
        <FloatingParticles />

        {/* Ambient Light Orbs with Enhanced Colors */}
        <div className="absolute top-1/4 left-1/6 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-cyan-500/8 rounded-full blur-3xl animate-pulse-slow"></div>
        <div
          className="absolute bottom-1/4 right-1/6 w-80 h-80 bg-gradient-to-r from-indigo-500/8 to-purple-500/6 rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 w-72 h-72 bg-gradient-to-r from-cyan-500/6 to-blue-600/5 rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row">
        {/* Enhanced Left Hero Section */}
        <div
          ref={heroRef}
          className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-8 xl:px-16 py-5 lg:py-0 order-2 lg:order-1"
        >
          <div className="max-w-2xl mx-auto lg:mx-0">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative p-3 bg-gradient-to-br from-blue-500 via-blue-600 to-cyan-600 rounded-xl shadow-xl shadow-blue-500/20">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-300 bg-clip-text text-transparent">
                  ClipCode
                </h1>
                <p className="text-xs text-blue-300/70 font-medium tracking-wider">
                  DEVELOPER PLATFORM
                </p>
              </div>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-3xl font-black mb-4 leading-tight">
              Code Smarter,
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300 bg-clip-text text-transparent flex items-center gap-3">
                Ship Faster
                <Sparkles className="w-6 h-6 text-cyan-400 animate-spin-slow" />
              </span>
            </h2>

            <p className="text-lg text-slate-300 mb-6 leading-relaxed">
              Join the elite community of developers who share, discover, and
              collaborate on premium code snippets. Build faster with
              battle-tested solutions.
            </p>

            <div className="space-y-4 mb-12">
              {authPageCardInfo.map((feature, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden p-4 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 hover:border-blue-400/30 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/10"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative flex items-center gap-4">
                    <div
                      className={`p-2 bg-gradient-to-br ${feature.color} rounded-lg shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <feature.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-base font-medium text-slate-200 group-hover:text-white transition-colors duration-300">
                      {feature.text}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats Section */}
            <div className="flex flex-wrap -mt-5 gap-6 sm:gap-8 justify-center lg:justify-start">
              {authPageInfo.map((stat, index) => (
                <div key={index} className="text-center">
                  <div
                    className={`text-2xl sm:text-3xl font-black ${stat.color} mb-1`}
                  >
                    {stat.value}
                  </div>
                  <div className="text-xs text-slate-400 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Right Form Section */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-4 sm:px-6 py-8 lg:py-12 lg:order-2">
          <div ref={formRef} className="w-full max-w-md lg:max-w-lg -mt-5">
            <div className="relative group">
              {/* Glowing border effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-indigo-500 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-1000"></div>

              <div className="relative bg-slate-900/90 backdrop-blur-2xl rounded-3xl border border-blue-500/20 p-6 sm:p-8 lg:p-10 shadow-2xl shadow-blue-900/20">
                {/* Header */}
                <div className="text-center mb-4">
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <div className="relative p-3 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl shadow-lg">
                      <Code2 className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-center lg:text-left">
                      <span className="text-2xl sm:text-3xl font-bold text-white block">
                        Join ClipCode
                      </span>
                      <p className="text-blue-300/70 text-sm font-medium">
                        Elite Developer Access
                      </p>
                    </div>
                  </div>
                </div>

                {/* Error Message */}
                {err && (
                  <div className=" mb-1 p-1 rounded-2xl text-red-300 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                      {err}
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Username Field */}
                  <Input
                    focusedField={focusedField}
                    placeholder="Choose your Username"
                    input={username}
                    setInput={setUsername}
                    handleFocus={handleFocus}
                    handleBlur={handleBlur}
                    type="username"
                  />

                  {/* Email Field */}
                  <Input
                    focusedField={focusedField}
                    placeholder="Enter your Email"
                    input={email}
                    setInput={setEmail}
                    handleFocus={handleFocus}
                    handleBlur={handleBlur}
                    type="email"
                  />

                  {/* Password Field */}
                  <Input
                    focusedField={focusedField}
                    placeholder="Choose your Password"
                    input={password}
                    setInput={setPassword}
                    handleFocus={handleFocus}
                    handleBlur={handleBlur}
                    type="password"
                  />

                  {/* Confirm Password Field */}
                  <Input
                    focusedField={focusedField}
                    placeholder="Confirm your Password"
                    input={confirmPassword}
                    setInput={setconfirmPassword}
                    handleFocus={handleFocus}
                    handleBlur={handleBlur}
                    type="password"
                  />

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="group relative w-full overflow-hidden bg-gradient-to-r from-blue-500 via-cyan-500 to-indigo-500 hover:from-blue-600 hover:via-cyan-600 hover:to-indigo-600 transition-all duration-500 py-4 rounded-2xl font-bold text-white shadow-2xl shadow-blue-500/30 hover:shadow-cyan-500/40 hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 cursor-pointer"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    {isLoading ? (
                      <div className="relative flex items-center justify-center gap-3">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span className="text-base sm:text-lg">
                          Initializing Account...
                        </span>
                      </div>
                    ) : (
                      <div className="relative flex items-center justify-center gap-3">
                        <span className="text-base sm:text-lg">
                          Launch Your Journey
                        </span>
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    )}
                  </button>
                </form>

                {/* Divider */}
                {/* <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-700/50"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-slate-900 px-4 text-slate-400 font-medium">
                      or continue with
                    </span>
                  </div>
                </div> */}

                {/* GitHub OAuth */}
                {/* <button
                  type="button"
                  className="group w-full flex items-center justify-center gap-3 py-4 bg-slate-800/50 hover:bg-slate-700/50 border-2 border-slate-700/50 hover:border-slate-600/70 rounded-2xl transition-all duration-500 text-white font-medium backdrop-blur-sm hover:scale-[1.02]"
                >
                  <Github className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-base">Continue with GitHub</span>
                </button> */}

                {/* Footer */}
                <div className="mt-2 text-center">
                  <p className="text-slate-400 text-sm">
                    Already part of the elite?{" "}
                    <a
                      href="/login"
                      className="text-blue-400 hover:text-cyan-300 font-semibold transition-colors duration-300 hover:underline"
                    >
                      Access your vault →
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes floatAdvanced {
          0% { transform: translateY(0px) rotate(0deg); opacity: 0.4; }
          50% { transform: translateY(-30px) rotate(180deg); opacity: 0.8; }
          100% { transform: translateY(-60px) rotate(360deg); opacity: 0.4; }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }
        
        @keyframes cube3d {
          0% { transform: rotateX(0deg) rotateY(0deg) translateZ(0px); }
          33% { transform: rotateX(180deg) rotateY(180deg) translateZ(50px); }
          66% { transform: rotateX(360deg) rotateY(90deg) translateZ(25px); }
          100% { transform: rotateX(360deg) rotateY(360deg) translateZ(0px); }
        }
        
        .bg-grid-pattern {
          background-image: 
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px);
          background-size: 60px 60px;
        }
        
        .floating-cube {
          animation: cube3d 12s ease-in-out infinite;
        }
        
        .cube-3d {
          position: relative;
          width: 30px;
          height: 30px;
          transform-style: preserve-3d;
        }
        
        .cube-face {
          position: absolute;
          width: 30px;
          height: 30px;
          border: 1px solid rgba(59, 130, 246, 0.3);
          background: rgba(59, 130, 246, 0.1);
          backdrop-filter: blur(10px);
        }
        
        .cube-front { transform: rotateY(0deg) translateZ(15px); }
        .cube-back { transform: rotateY(180deg) translateZ(15px); }
        .cube-right { transform: rotateY(90deg) translateZ(15px); }
        .cube-left { transform: rotateY(-90deg) translateZ(15px); }
        .cube-top { transform: rotateX(90deg) translateZ(15px); }
        .cube-bottom { transform: rotateX(-90deg) translateZ(15px); }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }

        @media (max-width: 1024px) {
          .floating-cube {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
