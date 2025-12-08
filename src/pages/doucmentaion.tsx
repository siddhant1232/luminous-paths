"use client";

import React from "react";

type RationaleRow = {
  section: string;
  description: string;
  impact: string;
};

type SchedulePhase = {
  phase: string;
  duration: string;
  description: string;
};

type DataParam = {
  parameter: string;
  description: string;
  significance: string;
};

const rationaleRows: RationaleRow[] = [
  {
    section: "Problem Identification",
    description:
      "BSF often operates in varied border terrains (mountains, deserts) where single networks fail. Separate radio and satellite systems increase gear weight and complexity.",
    impact:
      "Mitigates communication loss in 'blind spots' near international borders, enhancing patrol security. Reduces load on field personnel.",
  },
  {
    section: "Need of the Project",
    description:
      "To provide an always-on communication link with automatic failover, simplifying command-and-control for BSF.",
    impact:
      "Ensures Mission Success and Soldier Safety by guaranteeing continuous, real-time tracking for the Border Guarding Force (BGF).",
  },
  {
    section: "Objectives",
    description:
      "Deliver a robust prototype integrating all three modes, featuring a live HQ dashboard, and implementing SOS/Geofencing specifically for restricted border zones.",
    impact:
      "Enhances Force Protection and enables immediate response to emergencies via the SOS feature.",
  },
];

const schedulePhases: SchedulePhase[] = [
  {
    phase: "Requirement Analysis",
    duration: "Week 1–2",
    description:
      "Defined objectives based on BSF operational requirements.",
  },
  {
    phase: "System Design",
    duration: "Week 3–4",
    description:
      "Circuit design and communication protocol, focusing on power efficiency.",
  },
  {
    phase: "Implementation",
    duration: "Week 5–8",
    description:
      "Rapid prototype assembly and Embedded C code development for fast execution.",
  },
  {
    phase: "Integration & Testing",
    duration: "Week 9–10",
    description:
      "Rigorous testing of network switching latency and GPS accuracy in various environments.",
  },
  {
    phase: "Monitoring App",
    duration: "Week 11–12",
    description:
      "Developed a responsive, secure web/mobile dashboard for Command Center visualization.",
  },
];

const dataParameters: DataParam[] = [
  {
    parameter: "MODE",
    description: "Current network status (VHF/GSM/SAT).",
    significance:
      "Immediate display of operative's link reliability to HQ.",
  },
  {
    parameter: "RSSI",
    description: "Received Signal Strength Indicator.",
    significance:
      "Used to trigger the automatic, predictive network switch before total signal loss.",
  },
  {
    parameter: "SOS_FLAG",
    description: "Emergency signal (instant alert).",
    significance:
      "Triggers high-priority alert and location pin at Command Center.",
  },
];
const TEAM_LOGO_URL ="https://res.cloudinary.com/dxtewwe9a/image/upload/v1764359375/teamicon_f5ttgc.jpg"; 


const MMTTDocumentationPage: React.FC = () => {
  return (

    <div className="min-h-screen bg-slate-950 text-slate-100 pt-[3.25rem]">

      <header className="fixed inset-x-0 top-0 z-40 border-b border-slate-800 bg-slate-950/90 backdrop-blur">
        <div className="flex items-center justify-between px-4 py-3 lg:pl-6 lg:pr-8">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-sky-500/10 ring-1 ring-sky-500/40">
             <img
                src={TEAM_LOGO_URL}
                alt="Team logo"
                className="h-8 w-8 rounded-md object-cover bg-sky-500/10 ring-1 ring-sky-500/40"
              />
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold tracking-tight">
                MMTT Documentation
              </p>
              <p className="text-xs text-slate-400">
                Multi-Mode Tactical Tracker • SIH 2025
              </p>
            </div>
          </div>

          <div className="hidden items-center gap-2 text-xs sm:flex">
            <span className="rounded-full border border-sky-500/40 bg-sky-500/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-sky-300">
              SIH 2025
            </span>
            <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-emerald-300">
              Defense &amp; Security
            </span>
          </div>
        </div>
      </header>


      <aside className="pointer-events-auto fixed left-0 top-[3.25rem] hidden h-[calc(100vh-3.25rem)] w-64 border-r border-slate-800 bg-slate-950/95 px-4 py-4 text-sm backdrop-blur lg:block">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
          On this page
        </p>
        <nav className="space-y-3 overflow-y-auto pr-1 text-sm">
          <div>
            <a
              href="#overview"
              className="block text-[13px] font-medium text-slate-100 hover:text-sky-300"
            >
              1. Executive Summary
            </a>
          </div>

          <div>
            <a
              href="#rationale"
              className="block text-[13px] font-medium text-slate-100 hover:text-sky-300"
            >
              2. Project Rationale &amp; BSF Applicability
            </a>
            <ul className="mt-1 space-y-1 border-l border-slate-700/60 pl-3 text-xs text-slate-400">
              <li>
                <a href="#rationale-table" className="hover:text-sky-300">
                  2.1 Rationale &amp; Impact
                </a>
              </li>
              <li>
                <a href="#schedule" className="hover:text-sky-300">
                  2.2 Project Scheduling
                </a>
              </li>
            </ul>
          </div>

          <div>
            <a
              href="#technical"
              className="block text-[13px] font-medium text-slate-100 hover:text-sky-300"
            >
              3. Technical Specifications
            </a>
            <ul className="mt-1 space-y-1 border-l border-slate-700/60 pl-3 text-xs text-slate-400">
              <li>
                <a href="#system-req" className="hover:text-sky-300">
                  3.1 System Requirements
                </a>
              </li>
              <li>
                <a href="#hardware-software" className="hover:text-sky-300">
                  3.2 Hardware &amp; Software
                </a>
              </li>
            </ul>
          </div>

          <div>
            <a
              href="#design"
              className="block text-[13px] font-medium text-slate-100 hover:text-sky-300"
            >
              4. System Design &amp; Connectivity
            </a>
            <ul className="mt-1 space-y-1 border-l border-slate-700/60 pl-3 text-xs text-slate-400">
              <li>
                <a href="#flowchart" className="hover:text-sky-300">
                  4.1 Failover Logic
                </a>
              </li>
              <li>
                <a href="#data-parameters" className="hover:text-sky-300">
                  4.2 Data Parameters
                </a>
              </li>
            </ul>
          </div>

          <div>
            <a
              href="#implementation"
              className="block text-[13px] font-medium text-slate-100 hover:text-sky-300"
            >
              5. Implementation &amp; Conclusion
            </a>
            <ul className="mt-1 space-y-1 border-l border-slate-700/60 pl-3 text-xs text-slate-400">
              <li>
                <a href="#testing" className="hover:text-sky-300">
                  5.1 Testing
                </a>
              </li>
              <li>
                <a href="#conclusion" className="hover:text-sky-300">
                  5.2 Conclusion
                </a>
              </li>
              <li>
                <a href="#future" className="hover:text-sky-300">
                  5.3 Future Enhancements
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="pb-16 pt-6 lg:pl-64">
        <div className="px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <div className="mb-3 text-xs text-slate-400">
            <span className="hover:text-sky-300">Docs</span>
            <span className="mx-1">/</span>
            <span className="text-slate-300">MMTT Overview</span>
          </div>

          {/* 1. Overview */}
          <section
            id="overview"
            className="rounded-xl border border-slate-800 bg-gradient-to-br from-sky-950/70 via-slate-950 to-slate-950 p-6 shadow-lg shadow-sky-900/30 sm:p-8"
          >
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
              MMTT: Multi-Mode Tactical Tracker{" "}
              <span className="text-sky-400">(SIH 2025 Edition)</span>
            </h1>

            <p className="mt-3 text-sm font-medium text-slate-300">
              Presented to:{" "}
              <span className="font-semibold">
                Border Security Force (BSF) &amp; IIT Roorkee Panel
              </span>
            </p>
            <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-400">
              Problem Focus: BSF Operational Safety &amp; Situational Awareness
            </p>

            <div className="mt-6 grid gap-4 text-sm md:grid-cols-2">
              <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-4">
                <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Executive Summary
                </h3>
                <p className="mt-2 text-slate-200">
                  The Multi-Mode Tactical Tracker (MMTT) is an{" "}
                  <strong>SIH 2025 solution</strong> designed to eliminate
                  communication failures faced by <strong>BSF personnel</strong>{" "}
                  during patrol and security operations. It integrates{" "}
                  <strong>VHF, GSM, and Satellite</strong> technologies into a
                  single smart device.
                </p>
              </div>

              <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-4">
                <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Innovation
                </h3>
                <p className="mt-2 text-slate-200">
                  Core innovation:{" "}
                  <strong>intelligent, autonomous network switching</strong>,
                  ensuring a <strong>BSF operative is never offline</strong>. A
                  secure cloud dashboard offers{" "}
                  <strong>real-time, centralized visibility</strong> for HQ
                  commanders, filling critical gaps in conventional defense
                  tracking systems.
                </p>
              </div>
            </div>

            <p className="mt-4 text-sm text-slate-200">
              MMTT provides assured connectivity for mission-critical tasks,
              acting as a reliable, unified communication instrument for BSF
              operations in remote and challenging terrains.
            </p>
          </section>

          {/* 2. Project Rationale */}
          <section
            id="rationale"
            className="mt-8 rounded-xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8"
          >
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
              2. Project Rationale and BSF Applicability
            </h2>
            <p className="mt-3 text-sm text-slate-200">
              MMTT’s design is rooted in real BSF use-cases where terrain,
              weight, and communication reliability directly affect mission
              success and troop safety.
            </p>

            {/* Rationale Table */}
            <div id="rationale-table" className="mt-5">
              <h3 className="text-sm font-semibold text-slate-200">
                2.1 Rationale &amp; Operational Impact
              </h3>
              <div className="mt-3 overflow-hidden rounded-lg border border-slate-800 bg-slate-950/60">
                <table className="min-w-full border-collapse text-left text-sm">
                  <thead className="bg-slate-900/90">
                    <tr className="border-b border-slate-800/80">
                      <th className="px-4 py-3 font-medium text-slate-300">
                        Section
                      </th>
                      <th className="px-4 py-3 font-medium text-slate-300">
                        Description
                      </th>
                      <th className="px-4 py-3 font-medium text-slate-300">
                        BSF Operational Impact
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80">
                    {rationaleRows.map((row) => (
                      <tr key={row.section} className="align-top">
                        <td className="px-4 py-3 text-sm font-semibold text-sky-300">
                          {row.section}
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-200">
                          {row.description}
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-200">
                          {row.impact}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Schedule */}
            <div id="schedule" className="mt-7">
              <h3 className="text-sm font-semibold text-slate-200">
                2.2 Project Scheduling (SIH Rapid Development Model)
              </h3>
              <div className="mt-3 overflow-hidden rounded-lg border border-slate-800 bg-slate-950/60">
                <table className="min-w-full border-collapse text-left text-sm">
                  <thead className="bg-slate-900/90">
                    <tr className="border-b border-slate-800/80">
                      <th className="px-4 py-3 font-medium text-slate-300">
                        Phase
                      </th>
                      <th className="px-4 py-3 font-medium text-slate-300">
                        Duration
                      </th>
                      <th className="px-4 py-3 font-medium text-slate-300">
                        Description (SIH Relevance)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80">
                    {schedulePhases.map((phase) => (
                      <tr key={phase.phase} className="align-top">
                        <td className="px-4 py-3 text-sm font-semibold text-sky-300">
                          {phase.phase}
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-200">
                          {phase.duration}
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-200">
                          {phase.description}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* 3. Technical Specifications */}
          <section
            id="technical"
            className="mt-8 rounded-xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8"
          >
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
              3. Technical Specifications and Hardware Focus
            </h2>

            {/* System Requirements */}
            <div id="system-req" className="mt-4 space-y-3 text-sm text-slate-200">
              <h3 className="text-sm font-semibold text-slate-200">
                3.1 System Requirements (BSF Grade)
              </h3>
              <p>
                Designed for robustness and low-power consumption, optimized for
                long-duration BSF patrols in remote terrains:
              </p>
              <ul className="ml-5 list-disc space-y-1">
                <li>
                  <strong>Positioning:</strong> GNSS for high precision.
                </li>
                <li>
                  <strong>Communication:</strong> Tri-mode redundancy
                  (VHF/GSM/SAT).
                </li>
                <li>
                  <strong>Alerts:</strong> Immediate SOS and customizable
                  geofencing for border violations/entry points.
                </li>
              </ul>
            </div>

            {/* Hardware / Software Split */}
            <div
              id="hardware-software"
              className="mt-6 grid gap-4 md:grid-cols-2"
            >
              <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-4 text-sm">
                <h3 className="text-sm font-semibold text-sky-300">
                  Hardware (Prototype Components)
                </h3>
                <ul className="mt-2 ml-4 list-disc space-y-1 text-slate-200">
                  <li>
                    <strong>Microcontroller:</strong> Atmega328 (simplicity +
                    low-power profile).
                  </li>
                  <li>
                    <strong>Power:</strong> Lithium Battery 3.7V (×4) targeting
                    extended operation.
                  </li>
                  <li>
                    <strong>Design Goal:</strong> Future device to be{" "}
                    <strong>compact, ruggedized, IP67 certified</strong>.
                  </li>
                </ul>
              </div>

              <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-4 text-sm">
                <h3 className="text-sm font-semibold text-sky-300">
                  Software &amp; Tools
                </h3>
                <ul className="mt-2 ml-4 list-disc space-y-1 text-slate-200">
                  <li>
                    <strong>Device Firmware:</strong> Embedded C (Arduino IDE),
                    tuned for minimal latency.
                  </li>
                  <li>
                    <strong>Database:</strong> Firebase / MongoDB for scalable,
                    real-time HQ sync.
                  </li>
                  <li>
                    <strong>Process Model:</strong>{" "}
                    <strong>Iterative Model</strong> enabling rapid MVP delivery
                    (VHF → GSM) for SIH demonstration.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* 4. System Design */}
          <section
            id="design"
            className="mt-8 rounded-xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8"
          >
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
              4. System Design and Connectivity Assurance
            </h2>

            {/* Flowchart */}
            <div id="flowchart" className="mt-4 text-sm text-slate-200">
              <h3 className="text-sm font-semibold text-slate-200">
                4.1 Autonomous Failover Logic
              </h3>
              <p className="mt-2">
                The core value for BSF is the{" "}
                <strong>autonomous failover logic</strong> that ensures the
                device always selects the best available communication link.
              </p>

              <div className="mt-4 rounded-lg border border-slate-800 bg-slate-950/60 p-4 text-xs sm:text-sm font-mono leading-relaxed">
                <p className="mb-2 font-semibold text-sky-300">
                  Logic Flow (High Level)
                </p>
                <p>
                  Start → Check <strong>VHF Signal (Proximity)</strong> →{" "}
                  <span className="italic">if available</span>: Send via VHF
                  (Low Power) → <span className="italic">else</span>: Check{" "}
                  <strong>GSM Coverage</strong> →{" "}
                  <span className="italic">if available</span>: Send via GSM →
                  <span className="italic"> else</span>:{" "}
                  <strong>Send via Satellite (Last Resort)</strong> → Update HQ
                  Dashboard.
                </p>
              </div>
            </div>

            {/* Data Parameters */}
            <div
              id="data-parameters"
              className="mt-6 text-sm text-slate-200"
            >
              <h3 className="text-sm font-semibold text-slate-200">
                4.2 Data Parameters
              </h3>
              <p className="mt-2">
                Key telemetry values transmitted from field devices to HQ:
              </p>

              <div className="mt-3 overflow-hidden rounded-lg border border-slate-800 bg-slate-950/60">
                <table className="min-w-full border-collapse text-left text-sm">
                  <thead className="bg-slate-900/90">
                    <tr className="border-b border-slate-800/80">
                      <th className="px-4 py-3 font-medium text-slate-300">
                        Parameter
                      </th>
                      <th className="px-4 py-3 font-medium text-slate-300">
                        Description
                      </th>
                      <th className="px-4 py-3 font-medium text-slate-300">
                        Significance for BSF
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80">
                    {dataParameters.map((item) => (
                      <tr key={item.parameter} className="align-top">
                        <td className="px-4 py-3 text-sm font-semibold text-sky-300">
                          {item.parameter}
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-200">
                          {item.description}
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-200">
                          {item.significance}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* 5. Implementation & Conclusion */}
          <section
            id="implementation"
            className="mt-8 rounded-xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8"
          >
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
              5. Implementation, Testing, and Conclusion
            </h2>

            {/* Testing */}
            <div id="testing" className="mt-4 text-sm text-slate-200">
              <h3 className="text-sm font-semibold text-slate-200">
                5.1 Successful Testing (Field Condition Simulation)
              </h3>
              <p className="mt-2">
                The prototype demonstrated seamless switching across simulated
                field conditions:
              </p>
              <ol className="ml-5 mt-2 list-decimal space-y-1">
                <li>
                  <strong>Low Latency:</strong> Minimal delay during VHF ↔ GSM /
                  Satellite transitions.
                </li>
                <li>
                  <strong>Accuracy:</strong> GPS lock sustained during network
                  changes.
                </li>
                <li>
                  <strong>Reliability:</strong> SOS alerts routed via the best
                  available link instantly.
                </li>
              </ol>
            </div>

            {/* Conclusion */}
            <div id="conclusion" className="mt-6 text-sm text-slate-200">
              <h3 className="text-sm font-semibold text-slate-200">
                5.2 Conclusion (SIH 2025 Achievement)
              </h3>
              <p className="mt-2">
                MMTT directly addresses BSF&apos;s need for{" "}
                <strong>uninterrupted, simplified communication</strong> in
                border environments. It offers a{" "}
                <strong>low-cost, high-impact</strong> solution that strengthens
                force coordination, situational awareness, and troop safety for
                critical missions.
              </p>
            </div>

            {/* Future Enhancements */}
            <div id="future" className="mt-6 text-sm text-slate-200">
              <h3 className="text-sm font-semibold text-slate-200">
                5.3 Future Enhancements (Post-SIH Roadmap)
              </h3>
              <ul className="ml-5 mt-2 list-disc space-y-1">
                <li>
                  Integrate <strong>LoRa communication</strong> for ultra-low
                  power, short-range mesh networking.
                </li>
                <li>
                  Add <strong>AI-based anomaly detection</strong> to flag
                  unusual troop movement and potential threats.
                </li>
                <li>
                  Develop a fully{" "}
                  <strong>ruggedized, wearable vest-mount form factor</strong>{" "}
                  optimized for BSF field operators.
                </li>
              </ul>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default MMTTDocumentationPage;
