"use client"

import Dock from "@/components/ui/dock"
import {
  Home,
  BadgeAlert,
  Contact2,
  UsersRound,

} from "lucide-react"


export default function DemoOne() {
  const goTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  const dockItems = [
    { icon: Home,       label: "Hero",    onClick: () => goTo("hero") },
    { icon: BadgeAlert, label: "About",   onClick: () => goTo("about") },
    { icon: UsersRound, label: "Team",    onClick: () => goTo("team") },
    { icon: Contact2,   label: "Contact", onClick: () => goTo("contact") },
  ]

  return <Dock items={dockItems} />
}
