// src/components/Home.tsx
"use client";

import React from "react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();
  return (
    <section
      id="hero"
      className="relative bg-gradient-to-br from-neutral-50 to-blue-50/40 text-neutral-900"
    >
      {/* Simple Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -left-20 top-20 h-80 w-80 rounded-full bg-orange-200/20 blur-3xl" />
        <div className="absolute -right-20 bottom-20 h-80 w-80 rounded-full bg-blue-200/20 blur-3xl" />
      </div>

      <header className="px-6 py-8 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center justify-between">
            {/* Logo + Title */}
            <div className="flex items-center gap-0">
              <div className="flex h-20 w-20 items-center justify-center">
                <img
                  src="https://res.cloudinary.com/dxtewwe9a/image/upload/v1764396504/teamicon_feiai7.png"
                  alt="Play Metrics Logo"
                  className="h-16 w-16 rounded-xl object-contain shadow-transparent transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
                  PlayMetrics
                </h1>
                <p className="mt-1 text-sm text-neutral-500">Innovation Team</p>
              </div>
            </div>

            {/* SIH Badge without border */}
            <div className="flex items-center gap-3 rounded-full bg-gradient-to-r from-green-50 to-emerald-50 px-4 py-2.5 shadow-sm">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                <span className="text-sm font-semibold text-green-700">SIH 2025</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-12 sm:px-8">
        <div className="mx-auto max-w-6xl">
          {/* Hero Section */}
          <div className="text-center">
            <div className="mb-8">
              <div className="inline-flex items-center gap-3 rounded-full bg-white px-4 py-2 shadow-sm">
                {/* Continuous Glowing Pulse */}
                <div className="relative flex items-center justify-center">
                  <div className="h-3 w-3 animate-ping rounded-full bg-orange-500" />
                  <div className="absolute h-2.5 w-2.5 rounded-full bg-orange-400" />
                  <div className="absolute h-2 w-2 animate-pulse rounded-full bg-orange-300" />
                </div>
                <span className="text-sm font-medium text-neutral-700">
                  CONNECTION BEYOND LIMITS
                </span>
              </div>
            </div>

            <h1 className="mb-6 text-4xl font-bold text-neutral-900 sm:text-5xl md:text-6xl">
              Multi Mode
              <span className="block bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent">
                Tactical Tracker
              </span>
            </h1>

            <p className="mx-auto mb-8 max-w-2xl text-xl text-neutral-700">
              Advanced communication system with seamless failover across multiple networks
              for mission-critical operations.
            </p>

            {/* CTA Buttons */}
            <div className="mb-16 flex flex-wrap items-center justify-center gap-4">
              {/* Download App (coming soon) */}
              <button
                className="
                  group relative inline-flex items-center 
                  gap-3 rounded-full 
                  bg-neutral-900 px-8 py-3 
                  font-semibold text-white 
                  shadow-[0_12px_30px_rgba(0,0,0,0.25)]
                  transition-all duration-200
                  hover:bg-neutral-800 hover:shadow-[0_16px_40px_rgba(0,0,0,0.32)]
                  active:scale-[0.98]
                  cursor-not-allowed
                "
                aria-disabled="true"
              >
                <span className="flex items-center gap-2">
                  Download App
                  <span className="inline-block transform transition-transform duration-200 group-hover:translate-x-1">
                    →
                  </span>
                </span>

                {/* Coming Soon pill
                <span
                  className="
                    ml-2 rounded-full 
                    border border-white/20
                    bg-white/10 px-2 py-0.5 
                    text-[11px] font-medium uppercase tracking-wide
                    text-white/80
                    backdrop-blur-sm
                  "
                >
                  Coming Soon
                </span> */}
              </button>
              {/* View Documentation */}
              <button onClick={() => navigate("/docs")}
                className="
                  inline-flex items-center gap-2 
                  rounded-full border border-neutral-300 
                  bg-white px-6 py-3 
                  font-semibold text-neutral-700 
                  shadow-sm transition-all duration-200
                  hover:bg-neutral-50 hover:border-neutral-400
                  hover:shadow-md hover:-translate-y-[1px]
                  active:translate-y-0
                "
              >
              
                Documentation
                <span className="text-sm">↗</span>
              </button>
            </div>

            {/* Key Benefits Section */}
            <div className="mb-4">
              <div className="mb-4 text-center">
                <h2 className="mb-4 text-3xl font-bold text-neutral-900">
                  Why Choose Our System
                </h2>
                <p className="mx-auto max-w-2xl text-lg text-neutral-600">
                  Built for reliability in the most demanding environments with cutting-edge
                  technology
                </p>
              </div>

              <div className="grid gap-8 md:grid-cols-3">
                {[
                  {
                    icon: "🌐",
                    title: "Multi-Network Support",
                    description:
                      "Seamlessly switch between LoRa, GSM, and Satellite networks based on availability and signal strength.",
                  },
                  {
                    icon: "⚡",
                    title: "Instant Failover",
                    description:
                      "Automatic network switching ensures continuous connectivity even in remote locations.",
                  },
                  {
                    icon: "🔒",
                    title: "Military-Grade Security",
                    description:
                      "End-to-end encryption protects all communications and data transfers.",
                  },
                ].map((benefit, index) => (
                  <div key={index} className="text-center">
                    <div className="mb-4 text-4xl">{benefit.icon}</div>
                    <h3 className="mb-3 text-xl font-semibold text-neutral-900">
                      {benefit.title}
                    </h3>
                    <p className="leading-relaxed text-neutral-600">
                      {benefit.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-2 px-6 py-8 text-center">
        <p className="text-sm text-neutral-500">
          Secure • Reliable • Mission-Ready
        </p>
        {/* <p className="mt-2 text-xs text-neutral-400">
          © 2024 PlayMetrics Tactical Systems. All rights reserved.
        </p> */}
      </footer>
    </section>
  );
};

export default Home;
