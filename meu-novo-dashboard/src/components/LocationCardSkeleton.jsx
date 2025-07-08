export function LocationCardSkeleton() {
  return (
    <div className="
      bg-white/10 
      backdrop-blur-lg 
      rounded-2xl 
      p-4 
      border 
      border-white/20 
      shadow-lg 
      flex 
      flex-col 
      gap-4
      animate-pulse
    ">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-slate-700 rounded-full"></div>
        <div className="h-4 bg-slate-700 rounded w-2/4"></div>
      </div>

      <div className="flex-grow">
        <div className="w-full h-48 bg-slate-700 rounded-lg"></div>
      </div>

      <div className="w-full h-10 bg-slate-700 rounded-lg"></div>
    </div>
  );
}