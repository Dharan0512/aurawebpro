import React from "react";

export default function MatchCardSkeleton() {
  return (
    <div className="flex flex-col bg-slate-900/30 backdrop-blur-sm border border-white/5 rounded-[2.5rem] overflow-hidden animate-pulse">
      {/* Photo Area */}
      <div className="relative h-[28rem] m-3 overflow-hidden rounded-[2rem] bg-slate-800">
        {/* Top Badge Placeholder */}
        <div className="absolute top-5 right-5 w-24 h-10 bg-slate-700 rounded-full" />

        {/* Bottom Text Area */}
        <div className="absolute bottom-6 left-6 right-6 space-y-3">
          <div className="w-3/4 h-10 bg-slate-700/50 rounded-lg" />
          <div className="w-1/2 h-4 bg-slate-700/50 rounded-lg" />
        </div>
      </div>

      {/* Details & Actions Area */}
      <div className="px-8 pb-8 pt-2">
        <div className="flex flex-wrap gap-2 mb-6">
          <div className="w-16 h-8 bg-slate-800 rounded-lg" />
          <div className="w-20 h-8 bg-slate-800 rounded-lg" />
        </div>

        <div className="flex gap-4">
          <div className="flex-1 h-12 bg-slate-800 rounded-2xl" />
          <div className="flex-[1.5] h-12 bg-slate-800 rounded-2xl" />
        </div>
      </div>
    </div>
  );
}
