"use client";

import React from "react";
import {
  RadioTower,
  Shield,
  MapPin,
  Mail,
  Phone,
  Github,
  Linkedin,
  ArrowUpRight,
  Maximize2,
} from "lucide-react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Modes", href: "#modes" },
  { label: "Impact", href: "#impact" },
];

export default function Footer() {
  return (
    <section
      id="contact"
      data-page-theme="dark"
      className="relative mt-0 overflow-hidden bg-neutral-950 text-neutral-100"
    >
      {/* Background grid + glow */}
      <div className="pointer-events-none absolute inset-0">
        {/* subtle grid */}
        <div className="absolute inset-0 opacity-[0.18] mix-blend-screen [background-image:linear-gradient(to_right,rgba(148,163,184,0.25)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.25)_1px,transparent_1px)] [background-size:64px_64px]" />
        {/* glow from top hero */}
        <div className="absolute inset-x-0 -top-40 h-64 bg-[radial-gradient(circle_at_top,_rgba(249,115,22,0.35)_0,_transparent_55%)]" />
        {/* subtle circuits-ish noise */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(34,197,94,0.25)_0,_transparent_60%)] opacity-40" />
      </div>

      <footer className="relative border-t border-orange-500/20">
        {/* top accent line */}
        <div className="h-[2px] w-full bg-gradient-to-r from-orange-500 via-orange-400/70 to-transparent" />

        <div className="relative mx-auto max-w-6xl px-4 pb-10 pt-10 sm:px-6 lg:px-8 sm:pb-12 sm:pt-14 space-y-10">
          {/* CTA / heading */}
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-3">
              <p className="inline-flex items-center gap-2 text-[0.7rem] font-medium uppercase tracking-[0.25em] text-orange-400/90">
                <RadioTower size={16} className="animate-pulse" />
                Multi-Mode Tactical Tracker
              </p>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight leading-tight">
                Ready to modernise
                <span className="block text-orange-300">field comms?</span>
              </h2>
              <p className="max-w-xl text-sm sm:text-base text-neutral-300/90">
                One device, three networks, real-time situational awareness from
                field to HQ.
              </p>
            </div>

            <a
              href="mailto:ops@mmtt.systems"
              className="group inline-flex items-center justify-center rounded-full bg-orange-500 text-neutral-950 px-6 py-2.5 text-sm font-semibold shadow-[0_0_40px_rgba(249,115,22,0.6)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_60px_rgba(249,115,22,0.8)]"
            >
              Talk to us
              <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>

          {/* 3 HUD cards */}
          <div className="grid gap-6 md:grid-cols-3 mt-4">
            {/* CARD 1 – COMMS_DATA */}
            <div className="relative rounded-3xl border border-orange-500/50 bg-gradient-to-b from-neutral-900/90 via-neutral-950/95 to-neutral-950/95 shadow-[0_0_40px_rgba(249,115,22,0.5)] px-5 py-5 sm:px-6 sm:py-6">
              {/* neon corners */}
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute -left-0.5 -top-0.5 h-4 w-4 border-l border-t border-orange-400" />
                <div className="absolute -right-0.5 -top-0.5 h-4 w-4 border-r border-t border-orange-400" />
                <div className="absolute -left-0.5 -bottom-0.5 h-4 w-4 border-l border-b border-orange-400" />
                <div className="absolute -right-0.5 -bottom-0.5 h-4 w-4 border-r border-b border-orange-400" />
              </div>

              <div className="flex items-center justify-between text-[0.6rem] font-mono uppercase tracking-[0.25em] text-orange-300/90 mb-4">
                <span>[COMMS_DATA]</span>
                <Maximize2 className="h-3.5 w-3.5 text-orange-300/80" />
              </div>

              <button className="inline-flex items-center gap-2 rounded-full bg-neutral-900/90 px-3 py-1 text-[0.7rem] font-medium text-neutral-100 border border-orange-400/70 shadow-[0_0_20px_rgba(249,115,22,0.5)]">
                <Shield size={13} className="text-orange-400" />
                <span>Mission-critical ready</span>
              </button>

              <h3 className="mt-4 text-sm sm:text-base font-semibold">
                MMTT — Multi-Mode Tactical Tracker
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-neutral-300/90 leading-relaxed">
                Seamless handover between radio, GSM, and satellite so teams stay
                connected — whether on patrol, at HQ, or across the border.
              </p>

              <div className="mt-4 space-y-1.5 text-[0.72rem] sm:text-[0.78rem] text-neutral-300/90 font-mono">
                <p>
                  <span className="text-orange-400/90 mr-2">[LOC]</span> HQ_Ops
                </p>
                <p className="flex flex-wrap items-center gap-1">
                  <span className="text-orange-400/90 mr-1">[MAIL]</span>
                  <a
                    href="mailto:ops@mmtt.systems"
                    className="hover:text-orange-300 transition-colors"
                  >
                    ops@mmtt.systems
                  </a>
                </p>
                <p className="flex flex-wrap items-center gap-1">
                  <span className="text-orange-400/90 mr-1">[FREQ]</span>
                  <a
                    href="tel:+910000000000"
                    className="hover:text-orange-300 transition-colors"
                  >
                    +91-00000-00000
                  </a>
                </p>
              </div>
            </div>

            {/* CARD 2 – NAV_SYSTEM */}
            <div className="relative rounded-3xl border border-orange-500/40 bg-gradient-to-b from-neutral-900/80 via-neutral-950 to-neutral-950 px-5 py-5 sm:px-6 sm:py-6 shadow-[0_0_35px_rgba(249,115,22,0.4)]">
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute -left-0.5 -top-0.5 h-4 w-4 border-l border-t border-orange-400/80" />
                <div className="absolute -right-0.5 -top-0.5 h-4 w-4 border-r border-t border-orange-400/40" />
                <div className="absolute -left-0.5 -bottom-0.5 h-4 w-4 border-l border-b border-orange-400/40" />
                <div className="absolute -right-0.5 -bottom-0.5 h-4 w-4 border-r border-b border-orange-400/80" />
              </div>

              <div className="mb-4 flex items-center justify-between text-[0.6rem] font-mono uppercase tracking-[0.25em] text-orange-300/90">
                <span>[NAV_SYSTEM]</span>
                <Maximize2 className="h-3.5 w-3.5 text-orange-300/80" />
              </div>

              <ul className="space-y-2 text-sm text-neutral-300/90 mt-3">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="group flex items-center justify-between rounded-lg px-3 py-2 hover:bg-orange-500/10 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-orange-400 font-mono text-xs">
                          {link.label === "About" ? ">" : "·"}
                        </span>
                        <span>{link.label}</span>
                      </div>
                      <span className="h-px w-6 bg-neutral-600 group-hover:bg-orange-400 group-hover:w-10 transition-all" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* CARD 3 – SYNC_UPLINK */}
            <div className="relative rounded-3xl border border-orange-500/40 bg-gradient-to-b from-neutral-900/80 via-neutral-950 to-neutral-950 px-5 py-5 sm:px-6 sm:py-6 shadow-[0_0_35px_rgba(249,115,22,0.4)]">
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute -left-0.5 -top-0.5 h-4 w-4 border-l border-t border-orange-400/80" />
                <div className="absolute -right-0.5 -top-0.5 h-4 w-4 border-r border-t border-orange-400/40" />
                <div className="absolute -left-0.5 -bottom-0.5 h-4 w-4 border-l border-b border-orange-400/40" />
                <div className="absolute -right-0.5 -bottom-0.5 h-4 w-4 border-r border-b border-orange-400/80" />
              </div>

              <div className="mb-4 flex items-center justify-between text-[0.6rem] font-mono uppercase tracking-[0.25em] text-orange-300/90">
                <span>[SYNC_UPLINK]</span>
                <Maximize2 className="h-3.5 w-3.5 text-orange-300/80" />
              </div>

              <div className="mb-4 flex gap-3">
                <a
                  href="https://github.com/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500/10 text-orange-300 shadow-[0_0_20px_rgba(249,115,22,0.6)] border border-orange-400/70 hover:bg-orange-500/20 transition-all"
                >
                  <Github size={18} />
                </a>
                <a
                  href="https://www.linkedin.com/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500/10 text-orange-300 shadow-[0_0_20px_rgba(249,115,22,0.6)] border border-orange-400/70 hover:bg-orange-500/20 transition-all"
                >
                  <Linkedin size={18} />
                </a>
              </div>

              <p className="text-xs sm:text-sm text-neutral-300/90 leading-relaxed">
                Built for Smart India Hackathon — defence-grade comms for the next
                generation of forces.
              </p>
            </div>
          </div>

          {/* SYSTEM STATUS BAR */}
          <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="inline-flex items-center gap-3 rounded-full bg-emerald-500/10 px-4 py-2 text-[0.75rem] font-medium text-emerald-300 border border-emerald-500/60 shadow-[0_0_32px_rgba(16,185,129,0.8)]">
              <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono tracking-[0.18em] uppercase">
                System status: online
              </span>
            </div>

            {/* Bottom legal row */}
            <div className="flex flex-col gap-2 text-[0.7rem] text-neutral-500 sm:flex-row sm:items-center sm:justify-end sm:gap-6">
              <p>© {new Date().getFullYear()} MMTT Systems. All rights reserved.</p>
              <div className="flex gap-4">
                <button className="hover:text-orange-300 transition-colors">
                  Privacy
                </button>
                <button className="hover:text-orange-300 transition-colors">
                  Terms
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
}
