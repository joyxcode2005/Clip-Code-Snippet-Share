import { Lock, Mail, User } from "lucide-react";

interface InputProps {
  focusedField: string;
  input: string;
  setInput: (value: string) => void;
  handleFocus: (field: string) => void;
  handleBlur: () => void;
  type: string;
  placeholder: string;
}

const Input = ({
  focusedField,
  input,
  setInput,
  handleFocus,
  handleBlur,
  type,
  placeholder,
}: InputProps) => {
  return (
    <div className="relative">
      <div
        className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-all duration-300 z-10 ${
          focusedField === "username"
            ? "text-blue-400 scale-110"
            : "text-slate-400"
        }`}
      >
        {type === "username" ? (
          <User className="w-5 h-5 sm:w-6 sm:h-6" />
        ) : type === "email" ? (
          <Mail className="w-5 h-5" />
        ) : type === "password" ? (
          <Lock className="w-5 h-5" />
        ) : null}
      </div>
      <input
        type="text"
        placeholder={placeholder}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onFocus={() => handleFocus("username")}
        onBlur={handleBlur}
        className={`w-full pl-12 sm:pl-14 pr-4 py-4 bg-slate-800/50 border-2 rounded-2xl transition-all duration-500 outline-none text-white placeholder-slate-400 backdrop-blur-sm text-sm sm:text-base foucs:border-blue-400 focus:bg-slate-800/70 focus:shadow-2xl focus:shadow-blue-500/20
        `}
        required
      />
    </div>
  );
};

export default Input;
