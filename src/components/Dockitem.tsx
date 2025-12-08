"use client"

import { useNavigate } from "react-router-dom"
import Dock from "@/components/ui/dock"

import {
  Home,
  BadgeAlert,
  Contact2,
  UsersRound,
  Images,
} from "lucide-react"

export default function DemoOne() {
  const navigate = useNavigate()

  // Smooth Scroll for same-page IDs
  const goTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" })
      return true
    }
    return false
  }

  const dockItems = [
    { icon: Home,       label: "Hero",    onClick: () => goTo("hero") },
    { icon: BadgeAlert, label: "About",   onClick: () => goTo("about") },
    { icon: UsersRound, label: "Team",    onClick: () => goTo("team") },

    // ⭐ Navigate to a different route
    { 
      icon: Images,   
      label: "Gallery", 
      onClick: () => navigate("/gallary") 
    },

    { icon: Contact2,   label: "Contact", onClick: () => goTo("contact") },
  ]

  return <Dock items={dockItems} />
}
