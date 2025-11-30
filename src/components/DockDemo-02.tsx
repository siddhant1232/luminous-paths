"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { motion } from "framer-motion"

interface DockProps {
  className?: string
  items: {
    icon: React.ComponentType<{ className?: string }>
    label: string
    onClick?: () => void
  }[]
}

export default function DockDemo({ items, className }: DockProps) {
  const [active, setActive] = React.useState<string | null>(null)
  const [hovered, setHovered] = React.useState<number | null>(null)

  return (
    <div
      className={cn(
        "fixed left-1/2 bottom-6 -translate-x-1/2 z-50",
        // 👇 This makes the dock invert vs whatever is behind it
        "mix-blend-difference",
        // wrapper shouldn't block page interactions
        "pointer-events-none flex items-center justify-center w-full",
        className
      )}
    >
      {/* Small hint above dock so you KNOW this file is active */}
      <div className="mb-2 pointer-events-none">
        <span className="rounded-full px-3 py-1 text-[10px] tracking-[0.18em] uppercase bg-white/90 text-black/80 shadow-sm">
          Drag • Explore • Switch
        </span>
      </div>

      <motion.div
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className={cn(
          "flex items-end gap-4 px-5 py-3 rounded-3xl",
          // Dock itself is white, but because parent has mix-blend-difference,
          // it will look dark on light bg and light on dark bg.
          "bg-white text-black",
          "backdrop-blur-2xl border border-white/40",
          "shadow-[0_18px_45px_rgba(0,0,0,0.45)]",
          // make it clickable again
          "pointer-events-auto",
          // slight 3D look
          "origin-bottom [transform:perspective(700px)_rotateX(10deg)]"
        )}
      >
        <TooltipProvider delayDuration={80}>
          {items.map((item, i) => {
            const isActive = active === item.label
            const isHovered = hovered === i

            return (
              <Tooltip key={item.label}>
                <TooltipTrigger asChild>
                  <motion.div
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                    animate={{
                      scale: isHovered ? 1.2 : 1,
                      rotate: isHovered ? -6 : 0,
                    }}
                    transition={{ type: "spring", stiffness: 320, damping: 18 }}
                    className="relative flex flex-col items-center"
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      className={cn(
                        "rounded-2xl relative h-11 w-11",
                        "bg-transparent text-current",
                        "hover:bg-white/10",
                        "transition-all duration-200"
                      )}
                      onClick={() => {
                        setActive(item.label)
                        item.onClick?.()
                      }}
                    >
                      <item.icon
                        className={cn(
                          "h-6 w-6 transition-all duration-200",
                          isActive ? "scale-110 opacity-100" : "opacity-85"
                        )}
                      />

                      {isHovered && (
                        <motion.span
                          layoutId="dock-glow"
                          className="pointer-events-none absolute inset-0 rounded-2xl border border-white/50"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        />
                      )}
                    </Button>

                    {isActive && (
                      <motion.div
                        layoutId="dock-dot"
                        className="w-1.5 h-1.5 rounded-full bg-white mt-1"
                      />
                    )}
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent
                  side="top"
                  className={cn(
                    "text-xs px-2 py-1 rounded-full border border-white/40",
                    "bg-white/90 text-black",
                    // tooltip also inverts vs background because of parent blend
                    "mix-blend-difference"
                  )}
                >
                  {item.label}
                </TooltipContent>
              </Tooltip>
            )
          })}
        </TooltipProvider>
      </motion.div>
    </div>
  )
}
