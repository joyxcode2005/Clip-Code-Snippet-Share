import { colors } from "../constants";

const Category = ({ text }: { text: string }) => {
  const getCategoryColor = (category: string) => {
    const normalizedCategory = category.toLowerCase();
    return (
      colors[normalizedCategory] || {
        bg: "bg-slate-500",
        glow: "shadow-slate-500/50",
        border: "border-slate-400/30",
      }
    );
  };

  const colorConfig = getCategoryColor(text);

  return (
    <div className="relative group">
      {/* Illuminated background */}
      <div
        className={`absolute inset-0 ${colorConfig.bg} rounded-full blur-lg opacity-20  transition-opacity duration-300`}
      ></div>

      {/* Main component */}
      <div
        className={`relative inline-flex items-center p-2 rounded-xl text-white font-medium text-sm 
          ${colorConfig.bg} border ${colorConfig.border}
          shadow-lg ${colorConfig.glow} 
          backdrop-blur-sm`}
      >
        <span className="relative z-10">{text}</span>

        {/* Inner glow effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/10 to-transparent opacity-50"></div>
      </div>
    </div>
  );
};

export default Category;
