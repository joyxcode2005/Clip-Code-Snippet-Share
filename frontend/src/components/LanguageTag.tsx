import { styles, type LanguageStyle } from "../constants";

const Language = ({ text }: { text: string }) => {
  const getLanguageStyle = (language: string): LanguageStyle => {
    const normalizedLang = language.toLowerCase();
    return (
      styles[normalizedLang] || {
        bg: "bg-gray-500",
        text: "text-white",
        icon: language.substring(0, 2).toUpperCase(),
        glow: "shadow-gray-500/50",
        border: "border-gray-400/40",
      }
    );
  };

  const style = getLanguageStyle(text);

  return (
    <div className="relative group">
      {/* Illuminated background */}
      <div
        className={`absolute inset-0 ${style.bg} rounded-xl blur-lg opacity-20`}
      ></div>

      {/* Main component */}
      <div
        className={`relative inline-flex items-center p-2 rounded-xl 
          ${style.bg} ${style.text} font-semibold text-sm 
          border-2 ${style.border}
          shadow-lg ${style.glow} `}
      >
        <span className="relative z-10 capitalize">{text}</span>

        {/* Inner highlight */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-60"></div>

        {/* Animated border shine */}
        <div
          className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/10 to-transparent 
          opacity-0"
        ></div>
      </div>
    </div>
  );
};

export default Language;
