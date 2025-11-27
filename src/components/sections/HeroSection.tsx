// src/components/Home.tsx
"use client";

import React, { useEffect, useState } from "react";

const Home: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-neutral-50 text-neutral-900">
      {/* ===== Background accents ===== */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className={`absolute -left-40 top-[-140px] h-80 w-80 rounded-full bg-gradient-to-br from-orange-400/40 via-amber-300/30 to-yellow-100/0 blur-3xl transition-transform duration-[4000ms] ${
            mounted ? "translate-y-0" : "translate-y-6"
          }`}
        />
        <div
          className={`absolute -right-40 bottom-[-160px] h-96 w-96 rounded-full bg-gradient-to-tl from-sky-400/30 via-indigo-400/10 to-transparent blur-3xl transition-transform duration-[4000ms] delay-150 ${
            mounted ? "translate-y-0" : "translate-y-6"
          }`}
        />
        <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(to_right,rgba(148,163,184,0.18)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.12)_1px,transparent_1px)] [background-size:60px_60px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.95),_transparent_55%)]" />
      </div>

      {/* ===== Top bar / Team identity strip ===== */}
      <header
        className={`
          relative z-10 mx-auto mt-4 flex max-w-6xl items-center justify-between 
          rounded-full border border-white/50 bg-white/60 px-4 py-2.5 
          shadow-sm backdrop-blur-xl sm:px-6 sm:py-3
          transition-all duration-700
          ${
            mounted
              ? "translate-y-0 opacity-100"
              : "translate-y-2 opacity-0"
          }
        `}
      >
        {/* Left: logo + team name */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Logo mark */}
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-orange-500 via-amber-400 to-yellow-300 shadow-[0_10px_26px_rgba(249,115,22,0.45)]">
            <span className="text-[0.6rem] font-semibold tracking-[0.22em] text-white">
              PM
            </span>
          </div>

          {/* Text lockup */}
          <div className="flex flex-col gap-0.5 leading-tight">
            <div className="flex items-center gap-2">
              <p className="text-[0.7rem] font-semibold tracking-[0.22em] text-neutral-800">
                PLAY METRICS
              </p>
              <span className="hidden h-1 w-1 rounded-full bg-neutral-300 sm:inline-block" />
              <span className="hidden text-[0.7rem] text-neutral-500 sm:inline-block">
                Tactical Innovation Team
              </span>
            </div>
            <div className="flex items-center gap-2 text-[0.65rem]">
              <span className="rounded-full bg-neutral-900 px-2 py-[2px] text-[0.6rem] font-medium text-neutral-50">
                M.M.T.T
              </span>
              <span className="text-neutral-500">Multi-Mode Tactical Tracker</span>
            </div>
          </div>
        </div>

        {/* Right: mini nav + status */}
        <div className="flex items-center gap-3 sm:gap-4">
          <nav className="hidden items-center gap-3 text-[0.7rem] text-neutral-600 sm:flex">
            <button className="rounded-full px-2 py-1 text-[0.7rem] font-medium text-neutral-800 transition hover:bg-neutral-100">
              Overview
            </button>
            <button className="rounded-full px-2 py-1 text-[0.7rem] text-neutral-500 transition hover:bg-neutral-100">
              Tech
            </button>
            <button className="rounded-full px-2 py-1 text-[0.7rem] text-neutral-500 transition hover:bg-neutral-100">
              Docs
            </button>
          </nav>

          {/* SIH status pill */}
          <div className="flex items-center gap-2 rounded-full border border-neutral-200 bg-white/90 px-3 py-1 text-[0.7rem] font-medium text-neutral-600 shadow-sm">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
            <span className="hidden sm:inline">SIH Finalist • 2025</span>
            <span className="sm:hidden">SIH ’25</span>
          </div>
        </div>
      </header>

      {/* ===== Main hero card ===== */}
      <main className="relative z-10 mx-auto flex min-h-[78vh] max-w-5xl items-center px-4 pb-16 pt-10 sm:px-6 lg:px-8">
        {/* gradient frame wrapper */}
        <div
          className={`
            w-full rounded-[36px] bg-gradient-to-r from-orange-200/70 via-amber-100/40 to-sky-200/70 
            p-[1.5px] sm:p-[2px]
            transition-all duration-700 ease-out
            ${
              mounted
                ? "translate-y-0 opacity-100"
                : "translate-y-6 opacity-0"
            }
          `}
        >
          <div className="h-full w-full rounded-[32px] border border-white/40 bg-white/40 px-6 py-10 shadow-[0_22px_60px_rgba(15,23,42,0.14)] backdrop-blur-xl sm:px-10 sm:py-14">
            {/* Top row inside card: overline + tag */}
            <div
              className={`
                mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between
                transition-all duration-700 delay-100
                ${
                  mounted
                    ? "translate-y-0 opacity-100"
                    : "translate-y-3 opacity-0"
                }
              `}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200/80 bg-white/90 px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.18em] text-neutral-500 shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                CONNECTION BEYOND THE LIMITS
              </div>

              <div className="flex items-center gap-2 text-[0.7rem] text-neutral-500">
                <span className="rounded-full bg-neutral-900 px-2 py-[2px] text-[0.65rem] font-medium text-neutral-50">
                  Prototype v0.1
                </span>
                <span className="hidden sm:inline-block text-neutral-400">
                  Internal • PlayMetrics Tactical Lab
                </span>
              </div>
            </div>

            {/* Main Title & subtitle */}
            <div
              className={`
                space-y-4 transition-all duration-700 delay-150
                ${
                  mounted
                    ? "translate-y-0 opacity-100"
                    : "translate-y-3 opacity-0"
                }
              `}
            >
              <div className="inline-flex flex-col items-start gap-2">
                <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl md:text-[2.7rem] md:leading-[1.1]">
                  Multi Mode Tactical Tracker
                </h1>
                <div className="h-[3px] w-28 rounded-full bg-gradient-to-r from-orange-400 via-amber-400 to-sky-400" />
              </div>

              <p className="text-base font-semibold text-neutral-800 sm:text-lg">
                <span className="underline decoration-sky-500 decoration-[3px] underline-offset-[6px]">
                  Connection Beyond The Limits
                </span>
              </p>
            </div>

            {/* Description */}
            <p
              className={`
                mt-5 max-w-xl text-sm leading-relaxed text-neutral-600 sm:text-base
                transition-all duration-700 delay-200
                ${
                  mounted
                    ? "translate-y-0 opacity-100"
                    : "translate-y-3 opacity-0"
                }
              `}
            >
              Multi-Mode Tactical Tracker designed for teams that can’t afford
              disconnection. Seamless failover across LoRa, GSM, satellite and
              offline coordination, built for field operations where every packet
              matters.
            </p>

            {/* CTA + status row */}
            <div
              className={`
                mt-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between
                transition-all duration-700 delay-300
                ${
                  mounted
                    ? "translate-y-0 opacity-100"
                    : "translate-y-3 opacity-0"
                }
              `}
            >
              <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4">
                <button
                  onClick={() => console.log("Open documents")}
                  className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-7 py-3 text-sm font-semibold text-white shadow-[0_16px_40px_rgba(15,23,42,0.55)] transition-all duration-200 hover:-translate-y-[1px] hover:shadow-[0_18px_40px_rgba(15,23,42,0.6)] active:translate-y-[1px] active:shadow-[0_10px_26px_rgba(15,23,42,0.45)]"
                >
                  Download App
                  <span className="text-lg">↗</span>
                </button>

                <button
                  onClick={() => console.log("Open overview")}
                  className="inline-flex items-center gap-1 rounded-full border border-neutral-300 bg-white/80 px-5 py-2.5 text-xs font-medium text-neutral-700 shadow-sm transition-all duration-200 hover:-translate-y-[1px] hover:border-neutral-400 hover:bg-white active:translate-y-[1px]"
                >
                  Documents
                  <span className="text-base">→</span>
                </button>
              </div>

              <div className="flex flex-col items-start gap-3 text-[0.7rem] text-neutral-500 sm:text-xs">
                <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200/70 bg-white/60 px-3 py-1 shadow-sm">
                  <span className="flex h-1.5 w-5 items-center justify-between">
                    <span className="h-1 w-1 rounded-full bg-emerald-500" />
                    <span className="h-1.5 w-1 rounded-full bg-emerald-400" />
                    <span className="h-2 w-1 rounded-full bg-emerald-300" />
                    <span className="h-2.5 w-1 rounded-full bg-emerald-300" />
                  </span>
                  <span className="font-medium text-neutral-700">
                    Link stable • 99.2% uptime
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1">
                    LoRa mesh ready
                  </span>
                  <span className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1">
                    GSM + Satellite failover
                  </span>
                  <span className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1">
                    Offline mission sync
                  </span>
                </div>
              </div>
            </div>

            {/* Tiny stats row */}
            <dl
              className={`
                mt-8 grid grid-cols-3 gap-4 border-t border-neutral-100 pt-5 
                text-[0.7rem] text-neutral-500 sm:text-xs
                transition-all duration-700 delay-[380ms]
                ${
                  mounted
                    ? "translate-y-0 opacity-100"
                    : "translate-y-3 opacity-0"
                }
              `}
            >
              <div className="transition-transform duration-500 hover:-translate-y-[1px]">
                <dt className="uppercase tracking-[0.12em]">Networks</dt>
                <dd className="mt-1 font-semibold text-neutral-800">
                  LoRa • GSM • Sat
                </dd>
              </div>
              <div className="transition-transform duration-500 hover:-translate-y-[1px]">
                <dt className="uppercase tracking-[0.12em]">Modes</dt>
                <dd className="mt-1 font-semibold text-neutral-800">
                  3-step failover
                </dd>
              </div>
              <div className="transition-transform duration-500 hover:-translate-y-[1px]">
                <dt className="uppercase tracking-[0.12em]">Use case</dt>
                <dd className="mt-1 font-semibold text-neutral-800">
                  Field Ops & HQ
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </main>

      {/* Bottom tagline */}
      <div
        className={`
          pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 
          text-[0.7rem] text-neutral-400
          transition-all duration-700 delay-[450ms]
          ${
            mounted
              ? "translate-y-0 opacity-100"
              : "translate-y-2 opacity-0"
          }
        `}
      >
        Secure • Resilient • Mission-ready
      </div>
    </div>
  );
};

export default Home;
