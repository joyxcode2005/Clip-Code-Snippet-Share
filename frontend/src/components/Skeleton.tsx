export default function Skeleton() {
  return (
    <div className="px-4 py-4 bg-slate-400/20 w-[500px] h-[350px] rounded-xl border animate-pulse space-y-4">
      {/* Title Bar */}
      <div className="h-6 w-3/4 bg-slate-300/30 rounded" />

      {/* Code block preview */}
      <div className="h-[200px] bg-slate-300/20 rounded-md" />

      {/* Footer/User Info */}
      <div className="flex items-center justify-between mt-auto">
        {/* Left: User/avatar placeholder */}
        <div className="flex items-center space-x-3">
          <div className="h-4 w-45 bg-slate-300/30 rounded" />
        </div>

        {/* Right: Tag or time info */}
        <div className="h-8 w-16 bg-slate-300/30 rounded" />
        <div className="h-8 w-16 bg-slate-300/30 rounded" />
      </div>
    </div>
  );
}
