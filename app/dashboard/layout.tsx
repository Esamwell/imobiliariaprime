"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  Building, 
  Home, 
  Kanban, 
  Key, 
  DollarSign, 
  Users, 
  ShieldCheck, 
  Menu, 
  Sun, 
  Moon, 
  Plus, 
  LogOut, 
  Crown, 
  Share2,
  Clock,
  Sparkles,
  ExternalLink,
  ChevronRight
} from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { NotificationCenter } from "@/components/notification-center"
import { TactusLogo } from "@/components/tactus-logo"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const navItems = [
  { title: "Visão Geral", href: "/dashboard", icon: Home },
  { title: "Meus Imóveis", href: "/dashboard/imoveis", icon: Building },
  { title: "Funil de Vendas", href: "/dashboard/pipeline", icon: Kanban },
  { title: "Gestão de Aluguéis", href: "/dashboard/alugueis", icon: Key },
  { title: "Clientes & Leads", href: "/dashboard/clientes", icon: Users },
  { title: "Financeiro & Comissões", href: "/dashboard/financeiro", icon: DollarSign },
]

export default function UserDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileProfileOpen, setMobileProfileOpen] = useState(false)
  const pathname = usePathname()
  const { setTheme, theme } = useTheme()

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    window.location.href = "/login"
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background">
      {/* Top Header - Apple Prime Glass (Desktop & Mobile Optimized) */}
      <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between border-b border-border/50 bg-background/80 backdrop-blur-xl px-4 sm:px-6">
        
        {/* Left Side: Desktop and Mobile Branding */}
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hidden md:flex h-9 w-9 rounded-full hover:bg-muted/60"
            title={sidebarOpen ? "Recolher menu" : "Expandir menu"}
          >
            <Menu className="h-4 w-4" />
          </Button>

          {/* Header Branding (Mobile & Desktop - Logo Oficial sem caixinha) */}
          <Link href="/dashboard" className="flex items-center gap-2.5 group transition-transform hover:scale-105">
            <TactusLogo variant="auto" className="h-9 sm:h-10 w-auto" priority />
            <span className="inline-flex items-center rounded-full bg-lime-400/20 text-lime-700 dark:text-lime-300 px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wide">
              PRO
            </span>
          </Link>
        </div>

        {/* Center: Apple Timeline / Schedule Status Capsule (Desktop only) */}
        <div className="hidden lg:flex items-center gap-2.5 rounded-full border border-black/[0.08] dark:border-white/[0.10] bg-white/60 dark:bg-white/[0.04] backdrop-blur-md px-3.5 py-1.5 text-xs shadow-sm">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-lime-500"></span>
          </span>
          <span className="font-semibold text-foreground text-[11px]">Agenda do Dia</span>
          <span className="text-muted-foreground/60">•</span>
          <span className="text-muted-foreground text-[11px] flex items-center gap-1 font-medium">
            <Clock className="h-3 w-3 text-lime-600 dark:text-lime-400" /> 3 Visitas Agendadas
          </span>
          <div className="flex -space-x-1.5 pl-1">
            <div className="h-5 w-5 rounded-full bg-amber-500 text-white text-[9px] font-bold flex items-center justify-center ring-1 ring-background" title="Dr. Marcelo">
              M
            </div>
            <div className="h-5 w-5 rounded-full bg-sky-500 text-white text-[9px] font-bold flex items-center justify-center ring-1 ring-background" title="Dra. Flávia">
              F
            </div>
            <div className="h-5 w-5 rounded-full bg-emerald-500 text-white text-[9px] font-bold flex items-center justify-center ring-1 ring-background" title="Eduardo">
              E
            </div>
          </div>
        </div>

        {/* Right Side: Desktop Controls */}
        <div className="hidden md:flex items-center gap-2">
          {/* Notification Center with PWA Push */}
          <NotificationCenter />

          {/* Link para a Vitrine Personalizada da Imobiliária/Corretor */}
          <Link
            href="/v/tactus"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-black/[0.08] dark:border-white/[0.12] bg-white/70 dark:bg-white/[0.05] hover:bg-black/5 dark:hover:bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-foreground shadow-sm transition-all hover:scale-102"
            title="Abrir minha vitrine pública personalizada de imóveis para clientes"
          >
            <Share2 className="h-3.5 w-3.5 text-lime-600 dark:text-lime-400" />
            <span>Minha Vitrine</span>
          </Link>

          {/* Switcher to Super Admin */}
          <Link
            href="/super-admin"
            className="inline-flex items-center gap-1.5 rounded-full border border-purple-500/20 bg-purple-500/10 hover:bg-purple-500/20 px-3 py-1.5 text-xs font-semibold text-purple-700 dark:text-purple-300 transition-all hover:scale-102"
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            <span className="hidden md:inline">Painel</span> Admin
          </Link>

          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="h-8 w-8 rounded-full hover:bg-muted/60"
            title="Alternar tema"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>

          {/* User Profile Pill Capsule */}
          <div className="flex items-center gap-2 rounded-full border border-black/[0.08] dark:border-white/[0.12] bg-white/60 dark:bg-white/[0.04] pl-1.5 pr-2 py-1 backdrop-blur-md shadow-sm">
            <div className="h-7 w-7 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold text-xs ring-1 ring-emerald-500/30">
              CS
            </div>
            <div className="hidden xl:block text-left pr-1">
              <p className="text-xs font-semibold leading-tight text-foreground">Carlos Silveira</p>
              <p className="text-[9px] text-muted-foreground font-medium">CRECI 48.912</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              title="Sair do Sistema"
              onClick={handleLogout}
              className="h-6 w-6 rounded-full text-muted-foreground hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 ml-0.5"
            >
              <LogOut className="h-3 w-3" />
            </Button>
          </div>
        </div>

        {/* Right Side: Mobile Native App Controls (Limpo, Espaçoso e Intuitivo) */}
        <div className="flex md:hidden items-center gap-2">
          {/* Notification Center com PWA Native Alerts */}
          <NotificationCenter />

          {/* Theme Toggle Button */}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="h-9 w-9 rounded-full border border-black/[0.08] dark:border-white/[0.12] bg-white/70 dark:bg-white/[0.05]"
            title="Alternar tema"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>

          {/* Mobile Profile Dialog Trigger */}
          <Dialog open={mobileProfileOpen} onOpenChange={setMobileProfileOpen}>
            <DialogTrigger asChild>
              <button
                className="h-9 w-9 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold text-xs ring-2 ring-emerald-500/30 active:scale-95 transition-transform"
                title="Meu Perfil e Ações"
              >
                CS
              </button>
            </DialogTrigger>

            <DialogContent className="max-w-xs rounded-3xl p-5">
              <DialogHeader>
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold text-sm ring-2 ring-emerald-500/30">
                    CS
                  </div>
                  <div className="text-left">
                    <DialogTitle className="text-sm font-extrabold text-foreground">Carlos Silveira</DialogTitle>
                    <DialogDescription className="text-xs text-muted-foreground">
                      Corretor Sênior • CRECI 48.912
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              {/* Quick Actions List in Mobile Profile Sheet */}
              <div className="space-y-2 pt-2">
                <Link
                  href="/v/tactus"
                  target="_blank"
                  onClick={() => setMobileProfileOpen(false)}
                  className="w-full flex items-center justify-between p-3 rounded-2xl border border-black/[0.06] dark:border-white/[0.08] bg-muted/40 hover:bg-muted text-xs font-bold text-foreground transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Share2 className="h-4 w-4 text-lime-600 dark:text-lime-400" />
                    Abrir Minha Vitrine Pública
                  </span>
                  <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
                </Link>

                <Link
                  href="/super-admin"
                  onClick={() => setMobileProfileOpen(false)}
                  className="w-full flex items-center justify-between p-3 rounded-2xl border border-black/[0.06] dark:border-white/[0.08] bg-muted/40 hover:bg-muted text-xs font-bold text-foreground transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                    Painel Super Admin
                  </span>
                  <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-between p-3 rounded-2xl border border-red-500/20 bg-red-500/10 hover:bg-red-500/20 text-xs font-bold text-red-600 dark:text-red-400 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <LogOut className="h-4 w-4" />
                    Sair do Sistema (Logout)
                  </span>
                </button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Desktop Sidebar - Frosted Apple Glass */}
        <aside
          className={`hidden md:flex border-r border-border/50 bg-background/80 backdrop-blur-xl transition-all duration-300 flex-col justify-between shrink-0 overflow-y-auto ${
            sidebarOpen ? "w-64" : "w-[72px]"
          }`}
        >
          <div className="flex-1 py-4">
            <nav className="grid gap-1.5 px-3">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 rounded-2xl px-3.5 py-2.5 text-xs font-semibold transition-all duration-200 ${
                      isActive
                        ? "bg-foreground text-background shadow-sm shadow-foreground/10"
                        : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                    } ${!sidebarOpen && "justify-center px-0"}`}
                    title={!sidebarOpen ? item.title : undefined}
                  >
                    <item.icon className="h-4 w-4 shrink-0" />
                    {sidebarOpen && <span>{item.title}</span>}
                  </Link>
                )
              })}
            </nav>
          </div>

          {/* Plano Master VIP - Apple Gold Glass Capsule */}
          <div className="p-3 shrink-0">
            {sidebarOpen ? (
              <div className="rounded-2xl bg-gradient-to-br from-amber-500/15 via-card/80 to-transparent border border-amber-500/30 p-3.5 backdrop-blur-md shadow-sm space-y-1.5">
                <div className="flex items-center justify-between">
                  <p className="font-bold text-xs text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                    <Crown className="h-3.5 w-3.5" /> Plano Master VIP
                  </p>
                  <span className="text-[9px] bg-amber-500/20 text-amber-700 dark:text-amber-300 px-2 py-0.5 rounded-full font-extrabold uppercase tracking-wider">
                    Ilimitado
                  </span>
                </div>
                <p className="text-muted-foreground text-[10px] leading-tight">
                  Corretores, imóveis e vitrines ilimitadas ativas.
                </p>
                <div className="w-full bg-amber-500/20 rounded-full h-1 mt-2">
                  <div className="bg-amber-500 h-1 rounded-full w-full"></div>
                </div>
              </div>
            ) : (
              <div className="flex justify-center p-2 rounded-2xl bg-amber-500/10 border border-amber-500/30" title="Plano Master VIP - Ativo">
                <Crown className="h-4 w-4 text-amber-500" />
              </div>
            )}
          </div>
        </aside>

        {/* Content Workspace */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 pb-28 md:pb-6 bg-muted/15 dark:bg-black/20">
          {children}
        </main>

        {/* Mobile Floating Dock (Apple iOS Style - Inspired by mobile.jpg & 4f94d76b4179d260a2c0cb2b13112928.jpg) */}
        <div className="md:hidden fixed bottom-4 inset-x-4 z-50 pointer-events-none">
          <div className="max-w-md mx-auto pointer-events-auto">
            <div className="rounded-full backdrop-blur-2xl bg-card/90 dark:bg-[#0c0e14]/90 border border-black/[0.08] dark:border-white/[0.12] px-4 py-2.5 shadow-[0_10px_35px_rgba(0,0,0,0.25)] flex items-center justify-between">
              {/* Home */}
              <Link
                href="/dashboard"
                className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-full transition-colors ${
                  pathname === "/dashboard" ? "text-foreground font-bold" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Home className="h-5 w-5" />
                <span className="text-[9px]">Início</span>
              </Link>

              {/* Imóveis */}
              <Link
                href="/dashboard/imoveis"
                className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-full transition-colors ${
                  pathname === "/dashboard/imoveis" ? "text-foreground font-bold" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Building className="h-5 w-5" />
                <span className="text-[9px]">Imóveis</span>
              </Link>

              {/* Center Floating Action Button (FAB) */}
              <Link
                href="/dashboard/imoveis"
                className="h-11 w-11 -mt-5 rounded-full bg-foreground text-background shadow-lg flex items-center justify-center font-bold hover:scale-105 active:scale-95 transition-transform"
                title="Novo Cadastro Rápido"
              >
                <Plus className="h-5 w-5" />
              </Link>

              {/* Funil */}
              <Link
                href="/dashboard/pipeline"
                className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-full transition-colors ${
                  pathname === "/dashboard/pipeline" ? "text-foreground font-bold" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Kanban className="h-5 w-5" />
                <span className="text-[9px]">Funil</span>
              </Link>

              {/* Clientes */}
              <Link
                href="/dashboard/clientes"
                className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-full transition-colors ${
                  pathname === "/dashboard/clientes" ? "text-foreground font-bold" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Users className="h-5 w-5" />
                <span className="text-[9px]">Clientes</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
