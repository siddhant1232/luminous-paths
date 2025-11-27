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
} from "lucide-react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Modes", href: "#modes" },
  { label: "Impact", href: "#impact" },
];

export default function Footer() {
  return (
    <footer className="mt-24 bg-neutral-950 text-neutral-100">
      {/* Top accent line */}
      <div className="h-px w-full bg-gradient-to-r from-orange-500/70 via-orange-400/40 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
        {/* CTA row */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <p className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-orange-400">
              <RadioTower size={16} />
              Multi-Mode Tactical Tracker
            </p>
            <h2 className="text-2xl sm:text-3xl font-semibold">
              Ready to modernise field comms?
            </h2>
            <p className="max-w-xl text-sm sm:text-base text-neutral-300">
              One device, three networks, real-time situational awareness from
              field to HQ.
            </p>
          </div>

          <button className="inline-flex items-center justify-center rounded-full border border-orange-500/70 bg-orange-500/10 px-5 py-2.5 text-sm font-medium text-orange-300 hover:bg-orange-500/20 hover:border-orange-400 transition">
            Talk to us
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </button>
        </div>

        {/* Main footer grid */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-[1.4fr,1fr,1fr]">
          {/* Brand + summary */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-3 py-1 text-xs text-neutral-300 border border-neutral-800">
              <Shield size={14} />
              <span>Mission-critical ready</span>
            </div>
            <h3 className="text-lg font-semibold">MMTT — Multi-Mode Tactical Tracker</h3>
            <p className="text-sm text-neutral-300 leading-relaxed">
              Seamless handover between radio, GSM, and satellite so teams stay
              connected — whether on patrol, at HQ, or across the border.
            </p>

            {/* Location & contact */}
            <div className="space-y-2 text-sm text-neutral-300">
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-orange-400" />
                <span>Deployed for field units, HQ ops & command centers.</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-orange-400" />
                <span>ops@mmtt.systems</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-orange-400" />
                <span>+91-00000-00000</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold tracking-wide text-neutral-200">
              Navigate
            </h4>
            <ul className="space-y-2 text-sm text-neutral-300">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:text-orange-300 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social / repo */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold tracking-wide text-neutral-200">
              Stay in sync
            </h4>
            <div className="flex gap-3">
              <a
                href="https://github.com/"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-700 bg-neutral-900 hover:border-orange-400 hover:text-orange-300 transition"
              >
                <Github size={18} />
              </a>
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-700 bg-neutral-900 hover:border-orange-400 hover:text-orange-300 transition"
              >
                <Linkedin size={18} />
              </a>
            </div>
            <p className="text-xs text-neutral-400">
              Built for Smart India Hackathon — defence-grade comms for the next
              generation of forces.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-neutral-800 pt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-xs text-neutral-500">
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
    </footer>
  );
}
