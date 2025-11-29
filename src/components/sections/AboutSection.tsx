

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

/* ----------- IMPORT YOUR IMAGES HERE ----------- */
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
      "Command the field with seamless two-way communication over VHF/UHF networks. Experience brutal clarity, precision noise suppression, and ironclad encrypted links. Purpose-built for operations where range, reliability, and security must outperform everything else.",
    image: radioImg,
  },
  {
    title: "Multi-network auto-switch",
    description:
      "Command the field with seamless two-way communication over VHF/UHF networks. Experience brutal clarity, precision noise suppression, and ironclad encrypted links. Purpose-built for operations where range, reliability, and security must outperform everything else.",
    image: autoSwitchImg,
  },
  {
    title: "Built for the battlefield",
    description:
      "Command the field with seamless two-way communication over VHF/UHF networks. Experience brutal clarity, precision noise suppression, and ironclad encrypted links. Purpose-built for operations where range, reliability, and security must outperform everything else.",
    image: battlefieldImg,
  },
];

const MODES = [
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
  { icon: BatteryCharging, label: "Battery health" },
  { icon: Wifi, label: "Network mode" },
  { icon: Siren, label: "SOS alerts" },
  { icon: LocateFixed, label: "Geofencing" },
  { icon: Clock, label: "Mission replay" },
  { icon: Smartphone, label: "App dashboard" },
  { icon: Bell, label: "Instant notifications" },
];

/* ------------------ HOOK FOR SCROLL ANIMATIONS ------------------ */

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return [ref, visible] as const;
}

/* ------------------ COMPONENT ------------------ */

export default function AboutSection() {
  return (
    <section id="about" className="relative py-40 text-neutral-900">
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-neutral-50 via-transparent to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-36">
        
        {/* =============== FEATURE ROWS =============== */}
        {FEATURES.map((feature, index) => {
          const isReverse = index % 2 === 1;
          const [ref, visible] = useReveal();

          return (
            <div
              ref={ref}
              key={feature.title}
              className={`
                grid grid-cols-1 md:grid-cols-2 items-center gap-24 
                transition-all duration-[900ms] ease-out 
                ${
                  visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }
              `}
            >
              {/* TEXT */}
              <div
                className={`space-y-6 ${
                  isReverse ? "md:order-2" : "md:order-1"
                }`}
              >
                <h3 className="text-3xl sm:text-4xl font-semibold text-orange-600 tracking-tight">
                  {feature.title}
                </h3>

                <p className="text-lg text-neutral-700 leading-relaxed max-w-lg">
                  {feature.description}
                </p>
              </div>

              {/* IMAGE BOX */}
              <div
                className={`flex ${
                  isReverse ? "justify-start" : "justify-end"
                } ${isReverse ? "md:order-1" : "md:order-2"}`}
              >
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="
                    w-44 h-44 sm:w-60 sm:h-60 lg:w-80 lg:h-80 
                    rounded-[32px] bg-neutral-200 object-cover
                    shadow-[0_18px_40px_rgba(0,0,0,0.2)]
                    hover:shadow-[0_24px_50px_rgba(0,0,0,0.28)]
                    transition-all duration-300
                  "
                />
              </div>
            </div>
          );
        })}

        {/* ===================== OTHER SECTIONS ===================== */}
        <div className="space-y-28">
          <StepCards />
          <FeaturesGrid />
          <Zones />
        </div>
      </div>
    </section>
  );
}

/* ===================== STEP CARDS ===================== */

function StepCards() {
  const [ref, visible] = useReveal();

  return (
    <div
      ref={ref}
      className={`
        grid gap-12 md:grid-cols-3
        transition-all duration-[900ms] ease-out
        ${
          visible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }
      `}
    >
      {MODES.map((mode, index) => {
        const isMiddle = index === 1;
        return (
          <div
            key={mode.step}
            className="
              relative flex flex-col items-center rounded-[32px] 
              border border-neutral-900 bg-black px-10 py-16 text-white 
              shadow-[0_22px_45px_rgba(0,0,0,0.75)]
              transition-all duration-300 hover:-translate-y-2
            "
          >
            {/* Glow behind cards */}
            <div className="absolute inset-0 -z-10 rounded-[32px] bg-gradient-to-b from-orange-400/10 via-amber-300/5 to-transparent blur-xl" />

            <IconShape index={index} />

            <p className="mt-12 text-xs text-neutral-400">{mode.step}</p>
            <p
              className={`mt-2 text-lg ${
                isMiddle ? "font-semibold" : "font-medium"
              }`}
            >
              {mode.title}
            </p>
          </div>
        );
      })}
    </div>
  );
}

/* Shapes inside cards */
function IconShape({ index }: { index: number }) {
  return (
    <div className="flex h-28 w-28 items-center justify-center rounded-3xl bg-neutral-900">
      {index === 0 && (
        <div className="h-12 w-12 rounded-md bg-neutral-100/20" />
      )}
      {index === 1 && (
        <div className="h-14 w-14 rounded-full bg-neutral-100/20" />
      )}
      {index === 2 && (
        <div
          className="h-0 w-0"
          style={{
            borderLeft: "22px solid transparent",
            borderRight: "22px solid transparent",
            borderBottom: "38px solid rgba(255,255,255,0.18)",
          }}
        />
      )}
    </div>
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
        ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }
      `}
    >
      {ICON_FEATURES.map(({ icon: Icon, label }) => (
        <div
          key={label}
          className="flex flex-col items-center hover:-translate-y-1 transition-all"
        >
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border-2 border-black bg-lime-50/40 shadow-[0_8px_18px_rgba(110,231,183,0.25)]">
            <Icon className="h-7 w-7 text-black" strokeWidth={1.4} />
          </div>
          <span className="text-sm font-medium text-black">{label}</span>
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
        grid grid-cols-1 sm:grid-cols-3 gap-16 text-center
        transition-all duration-[1000ms]
        ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }
      `}
    >
      {IMPACT_ZONES.map((zone) => (
        <div
          key={zone.label}
          className="hover:-translate-y-2 transition-all duration-300"
        >
          <p className="text-2xl font-semibold text-orange-600">
            {zone.label}
          </p>
          <p className="text-lg text-neutral-800">{zone.sub}</p>
        </div>
      ))}
    </div>
  );
}
