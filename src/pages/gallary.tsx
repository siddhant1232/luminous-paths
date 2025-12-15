"use client";

import React from "react";
import { GalleryThumbnails } from "lucide-react";

const GalleryPage = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-black text-white">
      
      {/* Blurred Background Image */}
      <div className="absolute inset-0 -z-10">
        <img
          src="https://images.pexels.com/photos/1529881/pexels-photo-1529881.jpeg?auto=compress&cs=tinysrgb&w=1200"
          className="h-full w-full object-cover blur-lg scale-105 opacity-70"
          alt="Gallery Background"
        />
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/50 to-black/80" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-blue-900/20 via-transparent to-orange-700/10" />

      {/* Centered Content */}
      <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
        
        {/* Subtle glow behind content */}
        <div className="absolute h-[300px] w-[300px] bg-orange-500/10 blur-[120px] rounded-full -z-10" />

        {/* Icon Badge with animated ring */}
        <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl 
            bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
          
          {/* Animated ring */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-orange-400/40 to-blue-400/40 opacity-60 blur-xl animate-pulse" />

          <GalleryThumbnails className="relative h-9 w-9 text-white" />
        </div>

        {/* Title */}
        <h1 className="mt-8 text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
          Gallery is Coming Soon
        </h1>

        {/* Subtitle */}
        <p className="mt-4 max-w-lg text-base sm:text-lg text-white/80 leading-relaxed">
          We’re preparing a secure visual collection of mission logs, prototype builds,
          and field operations footage.  
          <span className="block mt-1 text-white/60">Stay tuned for the reveal.</span>
        </p>

        {/* Glass Card */}
        <div className="
          mt-10 px-6 py-4 rounded-full 
          bg-white/10 backdrop-blur-xl 
          border border-white/10 shadow-lg
          inline-flex items-center gap-3 animate-[float_4s_ease-in-out_infinite]
        ">
          <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-xs uppercase tracking-widest text-white/80">
            Access Locked — Coming Soon
          </span>
        </div>
      </div>

      {/* Floating animation keyframes */}
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-6px); }
            100% { transform: translateY(0px); }
          }
        `}
      </style>
    </div>
  );
};

export default GalleryPage;