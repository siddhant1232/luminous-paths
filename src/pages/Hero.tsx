// src/components/Home.tsx
import React from "react";

const Home: React.FC = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-50">
      {/* ===== Background Layer (fixed, blurred, animated-ish) ===== */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        {/* Gradient blobs */}
        <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-sky-500/20 blur-3xl" />
        <div className="absolute -bottom-52 -right-32 h-96 w-96 rounded-full bg-purple-500/25 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(148,163,184,0.15),_transparent_55%)]" />

        {/* Subtle noise overlay */}
        <div className="absolute inset-0 opacity-[0.18] mix-blend-soft-light"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 160 160' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='noStitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.45'/%3E%3C/svg%3E\")",
          }}
        />
      </div>

      {/* ===== Page Content ===== */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col px-4 pb-16 pt-6 sm:px-6 lg:px-8">
        {/* Top nav */}
        <header className="flex items-center justify-between py-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-900/70 ring-1 ring-slate-700/60 backdrop-blur">
              <span className="text-xs font-semibold tracking-[0.2em] text-sky-400">
                SG
              </span>
            </div>
            <span className="text-sm font-medium tracking-wide text-slate-200">
              YourBrand
            </span>
          </div>

          <nav className="hidden items-center gap-6 text-xs font-medium text-slate-300/90 sm:flex">
            <button className="transition hover:text-slate-50/90">Overview</button>
            <button className="transition hover:text-slate-50/90">Features</button>
            <button className="transition hover:text-slate-50/90">Showcase</button>
            <button className="rounded-full border border-slate-700/70 bg-slate-900/60 px-4 py-1.5 text-xs text-slate-100 shadow-sm shadow-slate-900/60 backdrop-blur transition hover:border-sky-500/70 hover:bg-slate-900">
              Get Started
            </button>
          </nav>
        </header>

        {/* ===== Hero Section ===== */}
        <main className="mt-10 grid flex-1 gap-10 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] md:items-center">
          {/* Left column: text */}
          <section className="space-y-7">
            {/* Small badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-700/80 bg-slate-900/60 px-3 py-1 text-[11px] text-slate-300 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_14px_rgba(52,211,153,0.9)]" />
              Live preview-ready UI • Tailwind + React
            </div>

            {/* Heading */}
            <div className="space-y-3">
              <h1
                className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl"
                style={{
                  textShadow: "0 0 36px rgba(148,163,184,0.85)", // soft grey glow
                }}
              >
                Ship interfaces that
                <span className="block bg-gradient-to-r from-sky-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  look senior-level.
                </span>
              </h1>
              <p className="max-w-xl text-sm leading-relaxed text-slate-300/85 sm:text-base">
                A clean, modern hero section with blurred gradients, glass cards,
                and subtle depth — ready to plug into your React + Tailwind project.
                No extra libraries, no drama.
              </p>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button className="inline-flex items-center justify-center rounded-full bg-sky-500 px-5 py-2.5 text-xs font-medium text-slate-950 shadow-[0_18px_45px_rgba(56,189,248,0.35)] transition hover:bg-sky-400 active:translate-y-[1px]">
                View Components
                <span className="ml-1.5 text-[11px]">↗</span>
              </button>
              <button className="inline-flex items-center justify-center rounded-full border border-slate-600/80 bg-slate-900/60 px-4 py-2.5 text-xs font-medium text-slate-100 shadow-sm shadow-slate-950/60 backdrop-blur transition hover:border-slate-400/70">
                Minimal setup, copy–paste UI
              </button>
            </div>

            {/* Metrics row */}
            <dl className="mt-4 grid max-w-md grid-cols-3 gap-3 text-xs text-slate-300">
              <div>
                <dt className="text-[11px] text-slate-400">Setup time</dt>
                <dd className="text-sm font-semibold text-slate-50">~5 mins</dd>
              </div>
              <div>
                <dt className="text-[11px] text-slate-400">Components</dt>
                <dd className="text-sm font-semibold text-slate-50">10+</dd>
              </div>
              <div>
                <dt className="text-[11px] text-slate-400">Responsive</dt>
                <dd className="text-sm font-semibold text-emerald-400">
                  Ready ✓
                </dd>
              </div>
            </dl>
          </section>

          {/* Right column: glass cards */}
          <section className="space-y-4">
            {/* Top big card */}
            <div className="relative overflow-hidden rounded-3xl border border-slate-700/70 bg-slate-900/70 p-4 shadow-[0_22px_45px_rgba(15,23,42,0.85)] backdrop-blur-xl">
              {/* Accent line */}
              <div className="mb-3 h-px w-16 rounded-full bg-gradient-to-r from-sky-400/70 via-blue-400/70 to-transparent" />

              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-medium text-slate-300">
                    Hero Layout
                  </p>
                  <p className="mt-1 text-[11px] text-slate-400">
                    Inspired by landing pages like Linear, Vercel, and Framer —
                    but tuned to be copy–paste friendly.
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-700/70 bg-slate-900/90 px-3 py-2 text-right">
                  <p className="text-[11px] text-slate-400">Perceived level</p>
                  <p className="text-sm font-semibold text-sky-400">Senior+</p>
                </div>
              </div>

              {/* Mini “preview” pill row */}
              <div className="mt-4 flex flex-wrap gap-2 text-[10px]">
                <span className="rounded-full bg-slate-800/80 px-2 py-1 text-slate-300">
                  • Glassmorphism cards
                </span>
                <span className="rounded-full bg-slate-800/80 px-2 py-1 text-slate-300">
                  • Blur + depth
                </span>
                <span className="rounded-full bg-slate-800/80 px-2 py-1 text-slate-300">
                  • Fixed gradient background
                </span>
              </div>
            </div>

            {/* Bottom small cards grid */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-700/70 bg-slate-900/70 p-3 backdrop-blur">
                <p className="text-[11px] font-medium text-slate-300">
                  Tailwind-first
                </p>
                <p className="mt-1 text-[11px] text-slate-400">
                  Only utility classes. No custom config required for this section.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-700/70 bg-gradient-to-br from-sky-500/15 via-blue-500/10 to-purple-500/10 p-3 backdrop-blur">
                <p className="text-[11px] font-medium text-slate-200">
                  Plug & Play
                </p>
                <p className="mt-1 text-[11px] text-slate-300/90">
                  Drop this component into{" "}
                  <code className="rounded bg-slate-900/80 px-1 py-[1px] text-[10px]">
                    src/components/Home.tsx
                  </code>{" "}
                  and wire it to your sections.
                </p>
              </div>
            </div>
          </section>
        </main>

        {/* ===== Tiny footer hint ===== */}
        <footer className="mt-8 flex items-center justify-between text-[11px] text-slate-500">
          <span>Built with React + Tailwind CSS</span>
          <span className="hidden sm:inline">
            Tip: Split hero / about / contact into separate components and mount them below this.
          </span>
        </footer>
      </div>
    </div>
  );
};

export default Home;
