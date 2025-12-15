import { Helmet } from "react-helmet";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type FilmImage = {
  id: string;
  src: string;
  label: string;
  sublabel?: string;
  description?: string;
  location?: string;
  date?: string;
};

const row1: FilmImage[] = [
  {
    id: "field-mesh",
    src: "https://res.cloudinary.com/demo/image/upload/v1700000001/sample.jpg",
    label: "Field Test · Mesh Network",
    sublabel: "Night deployment",
    description:
      "Testing the M.M.T.T mesh network stability in low-light, low-connectivity scenarios.",
    location: "IIT Roorkee Test Ground",
    date: "Nov 2025",
  },
  {
    id: "dashboard",
    src: "https://res.cloudinary.com/demo/image/upload/v1700000002/sample.jpg",
    label: "Control Room Dashboard",
    sublabel: "Live node tracking",
    description:
      "Operator dashboard showing all active nodes, alerts and tactical overlays.",
    location: "PlayMetrics Ops Desk",
    date: "Nov 2025",
  },
  {
    id: "prototype",
    src: "https://res.cloudinary.com/demo/image/upload/v1700000003/sample.jpg",
    label: "Device Prototype",
    sublabel: "Early hardware build",
    description:
      "First working prototype with multi-mode communication and power-failover circuitry.",
    location: "Lab Bench",
    date: "Oct 2025",
  },
  {
    id: "team-session",
    src: "https://res.cloudinary.com/demo/image/upload/v1700000004/sample.jpg",
    label: "Team Session",
    sublabel: "Strategy & planning",
    description:
      "Brainstorming field constraints, failure modes and tactical use-cases for M.M.T.T.",
    location: "IIT Roorkee Nodal Center",
    date: "Sept 2025",
  },
];

const row2: FilmImage[] = [
  {
    id: "sih-center",
    src: "https://res.cloudinary.com/demo/image/upload/v1700000005/sample.jpg",
    label: "SIH Nodal Center",
    sublabel: "IIT Roorkee",
    description:
      "Demonstrating the system to mentors, evaluators and fellow teams during Smart India Hackathon.",
    location: "IIT Roorkee",
    date: "Sept 2025",
  },
  {
    id: "on-ground-setup",
    src: "https://res.cloudinary.com/demo/image/upload/v1700000006/sample.jpg",
    label: "On-ground Setup",
    sublabel: "LoRa + ESP32 rig",
    description:
      "Deploying ESP32 units with LoRa antennas across the test zone for range validation.",
    location: "Outdoor field",
    date: "Nov 2025",
  },
  {
    id: "alert-workflow",
    src: "https://res.cloudinary.com/demo/image/upload/v1700000007/sample.jpg",
    label: "Alert Workflow",
    sublabel: "Operator view",
    description:
      "Simulating field alerts and verifying how quickly operators can react to changing situations.",
    location: "Ops Console",
    date: "Nov 2025",
  },
  {
    id: "system-arch",
    src: "https://res.cloudinary.com/demo/image/upload/v1700000008/sample.jpg",
    label: "System Architecture",
    sublabel: "Whiteboard session",
    description:
      "Finalizing the multi-mode tactical tracker architecture with mesh + GSM + satellite failover.",
    location: "Whiteboard Room",
    date: "Oct 2025",
  },
];

// duplicate for seamless scroll
const useLooped = (images: FilmImage[]) =>
  useMemo(() => [...images, ...images], [images]);

export default function Gallary() {
  const scrollingRow1 = useLooped(row1);
  const scrollingRow2 = useLooped(row2);

  const [selected, setSelected] = useState<FilmImage | null>(null);
  const isSomethingSelected = !!selected;

  return (
    <>
      <Helmet>
        <title>Gallery | PlayMetrics M.M.T.T</title>
        <meta
          name="description"
          content="A cinematic film-roll gallery of field tests, prototypes and moments from the PlayMetrics M.M.T.T journey."
        />
      </Helmet>

      <div className="relative min-h-screen overflow-hidden bg-black text-slate-100">
        {/* background glow */}
        <div className="pointer-events-none absolute inset-0 -z-20">
          <div className="absolute -left-40 top-10 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl" />
        </div>

        {/* subtle texture */}
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-40 mix-blend-soft-light bg-[radial-gradient(circle_at_top,_#ffffff0a,_transparent_60%),radial-gradient(circle_at_bottom,_#ffffff05,_transparent_55%)]" />

        {/* main content */}
        <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 pb-32 pt-20 md:pt-24">
          {/* Heading */}
          <div className="mb-12 text-center md:mb-16">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300/80">
              PlayMetrics · M.M.T.T
            </p>
            <h1 className="text-balance text-3xl font-semibold md:text-4xl lg:text-5xl">
              Mission Logs,{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
                Captured on Film
              </span>
            </h1>
            <p className="mx-auto mt-3 max-w-xl text-sm text-slate-400 md:text-base">
              A moving film roll of our tests, prototypes and moments from the
              Smart India Hackathon journey at IIT Roorkee.
            </p>
          </div>

          {/* FILM STRIPS AREA */}
          <div className="relative h-[430px] w-full max-w-6xl">
            {/* Top strip */}
            <div
              className={
                "film-strip-outer film-strip-outer-1" +
                (isSomethingSelected ? " pointer-events-none" : "")
              }
            >
              <div
                className={
                  "film-strip-inner film-strip-inner-left" +
                  (isSomethingSelected ? " !animation-pause" : "")
                }
              >
                {scrollingRow1.map((item, idx) =>
                  selected?.id === item.id ? null : (
                    <Frame
                      key={`r1-${idx}-${item.id}`}
                      item={item}
                      onClick={() => setSelected(item)}
                    />
                  )
                )}
              </div>
            </div>

            {/* Bottom strip */}
            <div
              className={
                "film-strip-outer film-strip-outer-2" +
                (isSomethingSelected ? " pointer-events-none" : "")
              }
            >
              <div
                className={
                  "film-strip-inner film-strip-inner-right" +
                  (isSomethingSelected ? " !animation-pause" : "")
                }
              >
                {scrollingRow2.map((item, idx) =>
                  selected?.id === item.id ? null : (
                    <Frame
                      key={`r2-${idx}-${item.id}`}
                      item={item}
                      onClick={() => setSelected(item)}
                    />
                  )
                )}
              </div>
            </div>
          </div>

          <p className="mt-10 text-center text-xs text-slate-500 md:text-sm">
            Click a frame to pull it out of the reel and view its mission
            details.
          </p>
        </div>

        {/* DETAIL BAR – CARD LEFT, TEXT RIGHT */}
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="fixed bottom-6 left-1/2 z-40 w-[95%] max-w-5xl -translate-x-1/2"
            >
              <div className="flex flex-col gap-4 rounded-3xl border border-slate-800 bg-slate-950/95 p-4 shadow-2xl shadow-black/70 backdrop-blur-md md:flex-row md:p-5">
                {/* the SAME frame, moved here */}
                <motion.div
                  layoutId={`frame-${selected.id}`}
                  className="film-frame !w-[260px] md:!w-[300px]"
                >
                  {/* sprockets */}
                  <div className="film-holes film-holes-left" />
                  <div className="film-holes film-holes-right" />

                  <div className="overflow-hidden rounded-[10px] border border-slate-900/60 bg-black">
                    <img
                      src={selected.src}
                      alt={selected.label}
                      className="h-40 w-full object-cover md:h-48"
                    />
                  </div>

                  <div className="mt-1.5 space-y-0.5">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-300/90">
                      {selected.label}
                    </p>
                    {selected.sublabel && (
                      <p className="text-[11px] text-slate-300">
                        {selected.sublabel}
                      </p>
                    )}
                  </div>
                </motion.div>

                {/* TEXT RIGHT SIDE */}
                <div className="flex flex-1 flex-col justify-between gap-3 text-left">
                  <div className="space-y-1.5">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-cyan-300/80">
                      Mission Frame
                    </p>
                    <h2 className="text-base font-semibold text-slate-50 md:text-lg">
                      {selected.label}
                    </h2>

                    {selected.description && (
                      <p className="mt-1 text-xs text-slate-300 md:text-sm">
                        {selected.description}
                      </p>
                    )}

                    {(selected.location || selected.date) && (
                      <div className="mt-2 space-y-1 rounded-xl bg-slate-900/80 p-3 text-xs text-slate-300">
                        {selected.location && (
                          <p>
                            <span className="font-medium text-slate-100">
                              Location:
                            </span>{" "}
                            {selected.location}
                          </p>
                        )}
                        {selected.date && (
                          <p>
                            <span className="font-medium text-slate-100">
                              Date:
                            </span>{" "}
                            {selected.date}
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => setSelected(null)}
                      className="inline-flex items-center justify-center rounded-full border border-slate-600 bg-slate-900 px-4 py-1.5 text-xs font-medium text-slate-100 transition hover:border-cyan-400 hover:bg-cyan-500/20 hover:text-cyan-100"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

function Frame({ item, onClick }: { item: FilmImage; onClick: () => void }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
      className="cursor-pointer bg-transparent p-0"
    >
      {/* whole frame participates in layout animation */}
      <motion.div layoutId={`frame-${item.id}`} className="film-frame group">
        <div className="film-holes film-holes-left" />
        <div className="film-holes film-holes-right" />

        <div className="overflow-hidden rounded-[10px] border border-slate-900/60 bg-black">
          <img
            src={item.src}
            alt={item.label}
            loading="lazy"
            className="h-32 w-full object-cover transition duration-500 group-hover:scale-[1.07] group-hover:brightness-110 md:h-40"
          />
        </div>

        <div className="mt-1.5 space-y-0.5 text-left">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-300/90">
            {item.label}
          </p>
          {item.sublabel && (
            <p className="text-[11px] text-slate-300">{item.sublabel}</p>
          )}
        </div>
      </motion.div>
    </motion.button>
  );
}
