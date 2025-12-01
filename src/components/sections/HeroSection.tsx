// src/components/Home.tsx
"use client";

import React, { useEffect, useState } from "react";

const Home: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section id="hero" data-page-theme="light" className="min-h-screen bg-gradient-to-br overflow-x-hidden from-neutral-50 to-blue-50/40 text-neutral-900">
      {/* Simple Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -left-20 top-20 h-80 w-80 rounded-full bg-orange-200/20 blur-3xl" />
        <div className="absolute -right-20 bottom-20 h-80 w-80 rounded-full bg-blue-200/20 blur-3xl" />
      </div>

      <header className="px-4 py-4 sm:px-6 sm:py-5 lg:px-8">
  <div className="mx-auto max-w-6xl">
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Left: Logo + Title */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* RESPONSIVE ICON SIZE */}
        <div className="
          flex items-center justify-center flex-shrink-0
          h-12 w-12          /* mobile */
          sm:h-16 sm:w-16    /* sm+ */
          md:h-20 md:w-20    /* md+ */
        ">
          <img
            src="https://res.cloudinary.com/dxtewwe9a/image/upload/v1764396504/teamicon_feiai7.png"
            alt="Play Metrics Logo"
            className="h-full w-full object-contain rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          />
        </div>

        <div className="min-w-0">
          {/* RESPONSIVE TITLE SIZE */}
          <h1 className="
            font-bold text-neutral-900 tracking-tight truncate
            text-lg            /* mobile */
            sm:text-2xl
            md:text-3xl
          ">
            Play Metrics
          </h1>

          {/* RESPONSIVE SUBTITLE */}
          <p className="text-[11px] sm:text-sm text-neutral-500 mt-0.5 sm:mt-1">
            Innovation Team
          </p>
        </div>
      </div>

      {/* Right: SIH Badge */}
      <div className="flex sm:justify-end">
        <div className="
          inline-flex items-center gap-2 sm:gap-3
          px-2.5 py-1.5      /* smaller on mobile */
          sm:px-4 sm:py-2.5
          bg-gradient-to-r from-green-50 to-emerald-50
          rounded-full shadow-sm flex-shrink-0
        ">
          <div className="flex items-center gap-1 sm:gap-2">

            {/* SMALLER PULSE ON MOBILE */}
            <div className="
              bg-green-500 rounded-full animate-pulse
              w-1.5 h-1.5      /* mobile */
              sm:w-2 sm:h-2    /* larger on sm+ */
            " />

            {/* RESPONSIVE TEXT */}
            <span className="
              font-semibold text-green-700 whitespace-nowrap
              text-xs       /* mobile */
              sm:text-sm
            ">
              SIH 2025
            </span>
          </div>
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
                  <div className="h-3 w-3 bg-orange-500 rounded-full animate-ping"></div>
                  <div className="absolute h-2.5 w-2.5 bg-orange-400 rounded-full"></div>
                  <div className="absolute h-2 w-2 bg-orange-300 rounded-full animate-pulse"></div>
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
              Advanced communication system with seamless failover across multiple networks for mission-critical operations.
            </p>

            {/* CTA Buttons */}
            <div className="mb-16 flex flex-wrap justify-center gap-4">
              <button className="rounded-full bg-neutral-900 px-8 py-3 font-semibold text-white shadow-lg transition hover:bg-neutral-800">
                Download App
              </button>
              <button className="rounded-full border border-neutral-300 bg-white px-6 py-3 font-semibold text-neutral-700 shadow-sm transition hover:bg-neutral-50">
                View Documentation
              </button>
            </div>
          </div>

          {/* Key Benefits Section */}
          <div className="mb-4">
            <div className="text-center mb-4">
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">
                Why Choose Our System
              </h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                Built for reliability in the most demanding environments with cutting-edge technology
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  icon: "🌐",
                  title: "Multi-Network Support",
                  description: "Seamlessly switch between LoRa, GSM, and Satellite networks based on availability and signal strength."
                },
                {
                  icon: "⚡",
                  title: "Instant Failover",
                  description: "Automatic network switching ensures continuous connectivity even in remote locations."
                },
                {
                  icon: "🔒",
                  title: "Military-Grade Security",
                  description: "End-to-end encryption protects all communications and data transfers."
                }
              ].map((benefit, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl mb-4">{benefit.icon}</div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-neutral-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-8 text-center mt-2">
        <p className="text-sm text-neutral-500">
          Secure • Reliable • Mission-Ready
        </p>
        {/* <p className="text-xs text-neutral-400 mt-2">
          © 2024 PlayMetrics Tactical Systems. All rights reserved.
        </p> */}
      </footer>
    </section>
  );
};

export default Home;