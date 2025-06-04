import { Terminal, Zap, Shield } from "lucide-react";

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

export const BACKEND_URL =
  "https://snippet-share-backend.joysengupta252005.workers.dev";
