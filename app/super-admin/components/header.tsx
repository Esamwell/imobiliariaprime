"use client"

import { useState } from "react"
import Link from "next/link"
import { MoonIcon, SunIcon, Building2, LogOut, ShieldCheck, Crown, Bell, Clock } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface HeaderProps {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

export function Header({ sidebarOpen, setSidebarOpen }: HeaderProps) {
  const { setTheme, theme } = useTheme()
  const [showNotifications, setShowNotifications] = useState(false)
  const [notifCount, setNotifCount] = useState(3)

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    window.location.href = "/login"
  }
  
  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between border-b border-border/50 bg-background/80 backdrop-blur-xl px-4 sm:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-muted/60 text-muted-foreground hover:text-foreground transition-colors"
          title={sidebarOpen ? "Recolher menu" : "Expandir menu"}
        >
          <span className="sr-only">Toggle Menu</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn(
              "transition-all",
              sidebarOpen ? "rotate-90 transform" : ""
            )}
          >
            <line x1="18" x2="6" y1="6" y2="18" />
            <line x1="6" x2="18" y1="6" y2="18" />
          </svg>
        </button>

        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">
            <Crown className="h-4 w-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-sm tracking-tight text-foreground">Super Admin</span>
              <span className="rounded-full bg-purple-500/20 text-purple-700 dark:text-purple-300 px-1.5 py-0.2 text-[9px] font-black uppercase">
                Console
              </span>
            </div>
            <span className="hidden sm:block text-[10px] text-muted-foreground font-medium">Gestão Multi-Empresa & Assinaturas</span>
          </div>
        </div>
      </div>

      {/* Center Apple Status Capsule */}
      <div className="hidden lg:flex items-center gap-2.5 rounded-full border border-black/[0.08] dark:border-white/[0.10] bg-white/60 dark:bg-white/[0.04] backdrop-blur-md px-3.5 py-1.5 text-xs shadow-sm">
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="font-bold text-foreground text-[11px]">SaaS Operacional</span>
        <span className="text-muted-foreground/60">•</span>
        <span className="text-muted-foreground text-[11px] font-semibold">210 Imobiliárias Ativas</span>
        <span className="text-muted-foreground/60">•</span>
        <span className="text-emerald-600 dark:text-emerald-400 font-bold text-[11px]">MRR R$ 284.500</span>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 hover:bg-blue-500/20 px-3.5 py-1.5 text-xs font-bold text-blue-700 dark:text-blue-300 transition-all hover:scale-102"
        >
          <Building2 className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Painel do</span> Corretor / CRM
        </Link>

        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="h-8 w-8 rounded-full hover:bg-muted/60"
          title="Alternar tema"
        >
          {theme === "dark" ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
        </Button>

        {/* User Capsule */}
        <div className="flex items-center gap-2 rounded-full border border-black/[0.08] dark:border-white/[0.12] bg-white/60 dark:bg-white/[0.04] pl-1.5 pr-2 py-1 backdrop-blur-md shadow-sm">
          <div className="h-7 w-7 rounded-full bg-purple-500/20 text-purple-700 dark:text-purple-300 flex items-center justify-center font-bold text-xs ring-1 ring-purple-500/30">
            SA
          </div>
          <span className="hidden md:block text-xs font-bold text-foreground pr-1">
            Super Admin
          </span>
          <Button
            variant="ghost"
            size="icon"
            title="Sair do Sistema"
            onClick={handleLogout}
            className="h-6 w-6 rounded-full text-muted-foreground hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40"
          >
            <LogOut className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </header>
  )
}
