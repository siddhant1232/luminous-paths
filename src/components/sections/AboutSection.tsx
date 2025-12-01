import React, { useEffect, useRef, useState } from "react";
import {
  MapPin,
  BatteryCharging,
  Wifi,
  Siren,
  LocateFixed,
  Clock,
  Smartphone,
  Bell,
} from "lucide-react";

/* IMAGES */
import radioImg from "../../assets/radio.jpg";
import autoSwitchImg from "../../assets/auto-switch.jpg";
import battlefieldImg from "../../assets/battlefield.jpg";

/* ------------------ DATA ------------------ */

type Feature = {
  title: string;
  description: string;
  image: string;
};

const FEATURES: Feature[] = [
  {
    title: "Seamless two-way radio",
    description:
      "Crystal-clear field communication over VHF/UHF networks. Noise suppression, encrypted channels, and reliability under any condition.",
    image: radioImg,
  },
  {
    title: "Multi-network auto-switch",
    description:
      "Zero-interruption switching between radio, GSM, and satellite — ensuring teams stay connected under every scenario.",
    image: autoSwitchImg,
  },
  {
    title: "Built for the battlefield",
    description:
      "Designed to survive dust, shock, signal loss, and long deployments, while maintaining mission-ready performance.",
    image: battlefieldImg,
  },
];

const MODES: { step: string; title: string; description?: string }[] = [
  { step: "Step 1", title: "Radio mode" },
  { step: "Step 2", title: "GSM mode" },
  { step: "Step 3", title: "Satellite fallback" },
];

const IMPACT_ZONES = [
  { label: "Field", sub: "For Soldiers" },
  { label: "HQ", sub: "Command Ready" },
  { label: "BSF", sub: "Force-wide Impact" },
];

const ICON_FEATURES = [
  { icon: MapPin, label: "Live map" },
  { icon: BatteryCharging, label: "Battery" },
  { icon: Wifi, label: "Network" },
  { icon: Siren, label: "SOS" },
  { icon: LocateFixed, label: "Geofence" },
  { icon: Clock, label: "Replay" },
  { icon: Smartphone, label: "Dashboard" },
  { icon: Bell, label: "Alerts" },
];

/* IMAGES FOR STEP CARDS */
const STEP_IMAGES: string[] = [
  "https://res.cloudinary.com/dxtewwe9a/image/upload/v1764579766/WhatsApp_Image_2025-12-01_at_13.49.42_qokuww.jpg",
  "https://res.cloudinary.com/dxtewwe9a/image/upload/v1764580012/WhatsApp_Image_2025-12-01_at_13.51.46_mx53ux.jpg",
  "https://res.cloudinary.com/dxtewwe9a/image/upload/v1764580048/WhatsApp_Image_2025-12-01_at_13.55.29_yirdl1.jpg",
];

/* ------------------ HOOK ------------------ */

function useReveal() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.25 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return [ref, visible] as const;
}

/* ------------------ MAIN COMPONENT ------------------ */

export default function AboutSection() {
  return (
    <section
      id="about"
      className=" bg-gradient-to-br from-neutral-50 to-blue-50/40 text-neutral-900
        relative py-24 
        overflow-hidden
      "
    >
      {/* BACKGROUND GRID */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.04),transparent)] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.04] bg-[url('/grid.svg')] bg-cover" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-36 relative z-10">
        {FEATURES.map((feature, i) => (
          <FeatureRow key={i} feature={feature} reverse={i % 2 === 1} />
        ))}

        <div className="space-y-28">
          <StepCards />
          <FeaturesGrid />
          <Zones />
        </div>
      </div>
    </section>
  );
}

/* ===================== FEATURE ROW ===================== */

function FeatureRow({
  feature,
  reverse,
}: {
  feature: Feature;
  reverse: boolean;
}) {
  const [ref, visible] = useReveal();

  return (
    <div
      ref={ref}
      className={`
        grid grid-cols-1 md:grid-cols-2 items-center gap-24 
        transition-all duration-[900ms]
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
      `}
    >
      <div className={`${reverse ? "md:order-2" : ""} space-y-6`}>
        <div className="flex items-center gap-2">
          <div className="w-2 h-8 bg-orange-500 rounded-full" />
          <span className="text-xs font-semibold tracking-[0.2em] text-neutral-700">
            MMTT SYSTEM
          </span>
        </div>

        <h3 className="text-4xl font-bold text-black">{feature.title}</h3>

        <p className="text-lg text-neutral-600 leading-relaxed max-w-lg">
          {feature.description}
        </p>
      </div>

      <div
        className={`${
          reverse ? "md:order-1 justify-start" : "justify-end"
        } flex`}
      >
        <div className="relative group">
          <div
            className="
            absolute inset-0 rounded-[32px] 
            bg-orange-400/20 blur-2xl opacity-40 
            group-hover:opacity-60 transition-all
          "
          />
          <img
            src={feature.image}
            alt={feature.title}
            className="
              w-44 h-44 sm:w-60 sm:h-60 lg:w-80 lg:h-80 
              rounded-[32px] object-cover
              shadow-[0_18px_40px_rgba(0,0,0,0.25)]
              transition-all duration-300 group-hover:-translate-y-2
            "
          />
        </div>
      </div>
    </div>
  );
}

/* ===================== STEP CARDS — SHORTER VERSION ===================== */

function StepCards() {
  const [ref, visible] = useReveal();

  return (
    <div
      ref={ref}
      className={`
        grid gap-8 md:gap-10 md:grid-cols-3
        transition-all duration-[900ms]
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
      `}
    >
      {MODES.map((mode, index) => (
        <div
          key={mode.step}
          style={{ transitionDelay: visible ? `${index * 120}ms` : "0ms" }}
          className={`
            group relative flex flex-col items-center 
            rounded-[28px] bg-black text-white
            px-6 py-10 sm:px-8 sm:py-12
            shadow-[0_18px_36px_rgba(0,0,0,0.55)]
            border border-neutral-800
            overflow-hidden transform-gpu
            transition-all duration-500
            ${visible ? "translate-y-0" : "translate-y-8"}
            hover:-translate-y-2 hover:border-orange-500/70
          `}
        >
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-orange-500 via-orange-400 to-orange-600" />

          {/* IMAGE -- BIG + CLEAN */}
          <div className="relative mt-6 mb-6 flex w-full justify-center">
            <div
              className={`
                relative 
                w-44 h-24 sm:w-56 sm:h-32 lg:w-64 lg:h-36
                rounded-[1.6rem]
                bg-black/90 overflow-hidden
                border border-orange-500/70
                shadow-[0_0_35px_rgba(249,115,22,0.45)]
                transform-gpu
                transition-all duration-500
                group-hover:shadow-[0_0_55px_rgba(249,115,22,0.8)]
                group-hover:-translate-y-1
              `}
            >
              <div className="pointer-events-none absolute inset-[5px] rounded-[1.2rem] border border-orange-400/70" />

              <IconShape index={index} />
            </div>
          </div>

          <p className="text-[0.7rem] tracking-[0.25em] text-neutral-400 uppercase">
            {mode.step}
          </p>

          <p className="mt-2 text-lg sm:text-xl font-semibold text-neutral-50 text-center">
            {mode.title}
          </p>

          {mode.description && (
            <p className="mt-2 text-sm text-neutral-400/90 text-center leading-relaxed max-w-xs">
              {mode.description}
            </p>
          )}

          <div className="mt-5 h-[2px] w-14 bg-gradient-to-r from-transparent via-orange-400/80 to-transparent opacity-80 group-hover:w-24 transition-all duration-500" />
        </div>
      ))}
    </div>
  );
}

/* ===================== IMAGE INSIDE CARD ===================== */

function IconShape({ index }: { index: number }) {
  const src = STEP_IMAGES[index];

  return (
    <img
      src={src}
      alt={`Step ${index + 1}`}
      className="
        h-full w-full object-cover
        transition-transform duration-500
        group-hover:scale-[1.03]
      "
    />
  );
}

/* ===================== ICON GRID ===================== */

function FeaturesGrid() {
  const [ref, visible] = useReveal();

  return (
    <div
      ref={ref}
      className={`
        grid grid-cols-4 gap-y-20 place-items-center
        transition-all duration-[1000ms]
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
      `}
    >
      {ICON_FEATURES.map(({ icon: Icon, label }) => (
        <div key={label} className="flex flex-col items-center">
          <div
            className="
            h-14 w-14 flex items-center justify-center
            rounded-full border-2 border-black
            bg-white shadow-[0_8px_18px_rgba(0,0,0,0.15)]
            hover:-translate-y-1 hover:shadow-xl 
            transition-all
          "
          >
            <Icon className="h-6 w-6 text-black" />
          </div>
          <span className="text-sm font-semibold text-black mt-3">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ===================== IMPACT ZONES ===================== */

function Zones() {
  const [ref, visible] = useReveal();

  return (
    <div
      ref={ref}
      className={`
        relative
        grid grid-cols-1 sm:grid-cols-3 gap-10
        transition-all duration-[900ms]
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
      `}
    >
      {IMPACT_ZONES.map((zone, index) => (
        <div
          key={zone.label}
          className="
            relative flex flex-col items-center text-center
            px-8 py-10
            bg-white/90 backdrop-blur-md
            border border-neutral-200
            rounded-[28px]
            shadow-[0_6px_18px_rgba(0,0,0,0.08)]
            hover:shadow-[0_12px_28px_rgba(0,0,0,0.12)]
            hover:-translate-y-1
            transition-all duration-300
          "
        >
          <div
            className="
            absolute -z-10 inset-0 
            bg-gradient-to-b from-orange-500/10 to-transparent 
            opacity-40 rounded-[28px]
          "
          />

          <p className="text-xs font-semibold tracking-[0.25em] text-neutral-500 mb-3">
            ZONE {index + 1}
          </p>

          <p className="text-3xl font-bold text-orange-600 drop-shadow-sm">
            {zone.label}
          </p>

          <p className="text-lg text-neutral-800 mt-1">{zone.sub}</p>

          <div className="mt-6 h-[2px] w-16 bg-gradient-to-r from-orange-500 to-black/20 rounded-full" />

          <p className="mt-4 text-sm text-neutral-600 leading-relaxed max-w-[260px]">
            Strategically optimized for deployment, command, and full-force
            coordination.
          </p>
        </div>
      ))}
    </div>
  );
}
