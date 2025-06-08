import { Terminal, Zap, Shield, Home, Plus, Code, Heart } from "lucide-react";

export const authPageInfo = [
  { label: "Developers", value: "50K+", color: "text-blue-400" },
  { label: "Snippets", value: "2M+", color: "text-cyan-400" },
  { label: "Languages", value: "200+", color: "text-indigo-400" },
];

export const authPageCardInfo = [
  {
    icon: Terminal,
    text: "Lightning-fast snippet sharing",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Shield,
    text: "Enterprise-grade security",
    color: "from-cyan-500 to-indigo-500",
  },
  {
    icon: Zap,
    text: "AI-powered code optimization",
    color: "from-indigo-500 to-purple-500",
  },
];

export const navigationItems = [
  { path: "/home", label: "Home", icon: Home },
  { path: "/create", label: "Create a Snippet", icon: Plus },
  { path: "/your-snippets", label: "Your Snippets", icon: Code },
  { path: "/favourites", label: "Favourites", icon: Heart },
];

type CategoryColors = {
  [key: string]: { bg: string; glow: string; border: string };
};

export const colors: CategoryColors = {
  "web dev": {
    bg: "bg-blue-500",
    glow: "shadow-blue-500/50",
    border: "border-blue-400/30",
  },
  "ai ml": {
    bg: "bg-purple-500",
    glow: "shadow-purple-500/50",
    border: "border-purple-400/30",
  },
  mobile: {
    bg: "bg-green-500",
    glow: "shadow-green-500/50",
    border: "border-green-400/30",
  },
  backend: {
    bg: "bg-orange-500",
    glow: "shadow-orange-500/50",
    border: "border-orange-400/30",
  },
  frontend: {
    bg: "bg-cyan-500",
    glow: "shadow-cyan-500/50",
    border: "border-cyan-400/30",
  },
  devops: {
    bg: "bg-red-500",
    glow: "shadow-red-500/50",
    border: "border-red-400/30",
  },
  "data science": {
    bg: "bg-indigo-500",
    glow: "shadow-indigo-500/50",
    border: "border-indigo-400/30",
  },
  cybersecurity: {
    bg: "bg-gray-700",
    glow: "shadow-gray-500/50",
    border: "border-gray-400/30",
  },
  blockchain: {
    bg: "bg-yellow-500",
    glow: "shadow-yellow-500/50",
    border: "border-yellow-400/30",
  },
  "game dev": {
    bg: "bg-pink-500",
    glow: "shadow-pink-500/50",
    border: "border-pink-400/30",
  },
};

export interface LanguageStyle {
  bg: string;
  text: string;
  icon: string;
  glow: string;
  border: string;
}

interface StyleMap {
  [key: string]: LanguageStyle;
}

export const styles: StyleMap = {
  javascript: {
    bg: "bg-yellow-400",
    text: "text-black",
    icon: "JS",
    glow: "shadow-yellow-400/50",
    border: "border-yellow-300/40",
  },
  python: {
    bg: "bg-blue-600",
    text: "text-white",
    icon: "PY",
    glow: "shadow-blue-600/50",
    border: "border-blue-400/40",
  },
  java: {
    bg: "bg-red-600",
    text: "text-white",
    icon: "JA",
    glow: "shadow-red-600/50",
    border: "border-red-400/40",
  },
  c: {
    bg: "bg-gray-700",
    text: "text-white",
    icon: "C",
    glow: "shadow-gray-500/50",
    border: "border-gray-400/40",
  },
  "c++": {
    bg: "bg-blue-700",
    text: "text-white",
    icon: "C+",
    glow: "shadow-blue-700/50",
    border: "border-blue-500/40",
  },
  typescript: {
    bg: "bg-blue-500",
    text: "text-white",
    icon: "TS",
    glow: "shadow-blue-500/50",
    border: "border-blue-300/40",
  },
  react: {
    bg: "bg-cyan-400",
    text: "text-black",
    icon: "RE",
    glow: "shadow-cyan-400/50",
    border: "border-cyan-300/40",
  },
  "node.js": {
    bg: "bg-green-600",
    text: "text-white",
    icon: "ND",
    glow: "shadow-green-600/50",
    border: "border-green-400/40",
  },
  go: {
    bg: "bg-cyan-600",
    text: "text-white",
    icon: "GO",
    glow: "shadow-cyan-600/50",
    border: "border-cyan-400/40",
  },
  rust: {
    bg: "bg-orange-600",
    text: "text-white",
    icon: "RS",
    glow: "shadow-orange-600/50",
    border: "border-orange-400/40",
  },
  php: {
    bg: "bg-indigo-600",
    text: "text-white",
    icon: "PHP",
    glow: "shadow-indigo-600/50",
    border: "border-indigo-400/40",
  },
  swift: {
    bg: "bg-orange-500",
    text: "text-white",
    icon: "SW",
    glow: "shadow-orange-500/50",
    border: "border-orange-300/40",
  },
};

export const BACKEND_URL =
  "https://snippet-share-backend.joysengupta252005.workers.dev";
