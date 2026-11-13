"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  Building, 
  Home, 
  Kanban, 
  Key, 
  DollarSign, 
  Users, 
  Users2,
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
  ChevronRight,
  Settings
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

export default function UserDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileProfileOpen, setMobileProfileOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState<any>(null)
  const pathname = usePathname()
  const { setTheme, theme } = useTheme()

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated && data.user) {
          setCurrentUser(data.user)
        }
      })
      .catch(() => {})
  }, [])

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    window.location.href = "/login"
  }

  const isAutonomo = currentUser?.role === "AUTONOMO" || currentUser?.tenant?.type === "AUTONOMO"
  const isChief = currentUser?.role === "GESTOR"
  const isBroker = currentUser?.role === "CORRETOR"
  const canManageBilling = isChief || isAutonomo

  const userInitials = currentUser?.name
    ? currentUser.name.split(" ").filter(Boolean).slice(0, 2).map((n: string) => n[0].toUpperCase()).join("")
    : "CS"
  const displayName = currentUser?.name || (isAutonomo ? "Roberto Dias" : "Carlos Silveira")
  const displayCreci = currentUser?.creci ? `CRECI ${currentUser.creci}` : "CRECI 48.912"
  const roleLabel = isChief
    ? "Chefe da Imobiliária (Master)"
    : isAutonomo
    ? "Corretor Autônomo PF"
    : "Corretora Sênior"

  const tenantName = currentUser?.tenant?.name || (isAutonomo ? "Consultoria Individual" : "Tactus Imobiliária")
  const planTag = isAutonomo 
    ? "Plano Essencial Solo" 
    : (currentUser?.tenant?.plan || "Plano Imobiliária")

  const navItems = [
    { title: "Visão Geral", href: "/dashboard", icon: Home },
    { title: "Meus Imóveis", href: "/dashboard/imoveis", icon: Building },
    { title: "Funil de Vendas", href: "/dashboard/pipeline", icon: Kanban },
    { title: "Equipe & Corretores", href: "/dashboard/equipe", icon: Users2 },
    { title: "Gestão de Aluguéis", href: "/dashboard/alugueis", icon: Key },
    { title: "Clientes & Leads", href: "/dashboard/clientes", icon: Users },
    { title: "Financeiro & Comissões", href: "/dashboard/financeiro", icon: DollarSign },
    ...(canManageBilling ? [{ title: "Meu Plano & Upgrade", href: "/dashboard/plano", icon: Crown }] : []),
    { title: "Configurações", href: "/dashboard/configuracoes", icon: Settings },
  ]

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background">
      {/* Top Header - Apple Prime Glass (Desktop & Mobile Optimized) */}
      <header className="sticky top-0 z-30 flex h-20 shrink-0 items-center justify-between border-b border-border/50 bg-background/80 backdrop-blur-xl px-4 sm:px-6">
        
        {/* Left Side: Desktop and Mobile Branding */}
        <div className="flex items-center gap-3.5">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hidden md:flex h-10 w-10 rounded-full hover:bg-muted/60"
            title={sidebarOpen ? "Recolher menu" : "Expandir menu"}
          >
            <Menu className="h-4 w-4" />
          </Button>

          {/* Header Branding (Logo Oficial Grande e com Máximo Destaque) */}
          <Link href="/dashboard" className="flex items-center gap-3 group transition-transform hover:scale-105">
            <TactusLogo variant="auto" className="h-13 sm:h-15 md:h-16 w-auto" priority />
            <span className="inline-flex items-center rounded-full bg-lime-400/20 text-lime-700 dark:text-lime-300 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider">
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

          {/* User Profile Pill Capsule - Clicável direto para Configurações */}
          <div className="flex items-center rounded-full border border-black/[0.08] dark:border-white/[0.12] bg-white/60 dark:bg-white/[0.04] p-1 backdrop-blur-md shadow-sm">
            <Link
              href="/dashboard/configuracoes"
              className="flex items-center gap-2 pl-1 pr-2 py-0.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors group cursor-pointer"
              title="Acessar Meu Perfil e Configurações"
            >
              <div className={`h-7 w-7 rounded-full flex items-center justify-center font-bold text-xs ring-1 overflow-hidden shrink-0 ${
                isChief
                  ? "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 ring-emerald-500/30"
                  : isAutonomo
                  ? "bg-blue-500/20 text-blue-700 dark:text-blue-300 ring-blue-500/30"
                  : "bg-purple-500/20 text-purple-700 dark:text-purple-300 ring-purple-500/30"
              }`}>
                {currentUser?.avatarUrl ? (
                  <img src={currentUser.avatarUrl} alt={displayName} className="h-full w-full object-cover" />
                ) : (
                  userInitials
                )}
              </div>
              <div className="hidden xl:block text-left pr-1">
                <p className="text-xs font-semibold leading-tight text-foreground group-hover:text-primary transition-colors flex items-center gap-1">
                  {displayName}
                  <Settings className="h-2.5 w-2.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </p>
                <p className="text-[9px] text-muted-foreground font-medium">{displayCreci} • {roleLabel}</p>
              </div>
            </Link>

            <Button
              variant="ghost"
              size="icon"
              title="Sair do Sistema"
              onClick={handleLogout}
              className="h-6 w-6 rounded-full text-muted-foreground hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 mr-1"
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
                className={`h-9 w-9 rounded-full flex items-center justify-center font-bold text-xs ring-2 active:scale-95 transition-transform overflow-hidden ${
                  isChief
                    ? "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 ring-emerald-500/30"
                    : isAutonomo
                    ? "bg-blue-500/20 text-blue-700 dark:text-blue-300 ring-blue-500/30"
                    : "bg-purple-500/20 text-purple-700 dark:text-purple-300 ring-purple-500/30"
                }`}
                title="Meu Perfil e Ações"
              >
                {currentUser?.avatarUrl ? (
                  <img src={currentUser.avatarUrl} alt={displayName} className="h-full w-full object-cover" />
                ) : (
                  userInitials
                )}
              </button>
            </DialogTrigger>

            <DialogContent className="max-w-xs rounded-3xl p-5">
              <DialogHeader>
                <div className="flex items-center gap-3">
                  <div className={`h-11 w-11 rounded-2xl flex items-center justify-center font-bold text-sm ring-2 overflow-hidden ${
                    isChief
                      ? "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 ring-emerald-500/30"
                      : isAutonomo
                      ? "bg-blue-500/20 text-blue-700 dark:text-blue-300 ring-blue-500/30"
                      : "bg-purple-500/20 text-purple-700 dark:text-purple-300 ring-purple-500/30"
                  }`}>
                    {currentUser?.avatarUrl ? (
                      <img src={currentUser.avatarUrl} alt={displayName} className="h-full w-full object-cover" />
                    ) : (
                      userInitials
                    )}
                  </div>
                  <div className="text-left">
                    <DialogTitle className="text-sm font-extrabold text-foreground">{displayName}</DialogTitle>
                    <DialogDescription className="text-xs text-muted-foreground">
                      {roleLabel} • {displayCreci}
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              {/* Quick Actions List in Mobile Profile Sheet */}
              <div className="space-y-2 pt-2">
                <Link
                  href="/dashboard/configuracoes"
                  onClick={() => setMobileProfileOpen(false)}
                  className="w-full flex items-center justify-between p-3 rounded-2xl border border-black/[0.06] dark:border-white/[0.08] bg-muted/40 hover:bg-muted text-xs font-bold text-foreground transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Settings className="h-4 w-4 text-primary" />
                    Meu Perfil & Foto
                  </span>
                  <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                </Link>

                {canManageBilling && (
                  <Link
                    href="/dashboard/plano"
                    onClick={() => setMobileProfileOpen(false)}
                    className="w-full flex items-center justify-between p-3 rounded-2xl border border-amber-500/20 bg-amber-500/10 hover:bg-amber-500/20 text-xs font-bold text-amber-700 dark:text-amber-300 transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <Crown className="h-4 w-4 text-amber-500" />
                      Meu Plano & Upgrades
                    </span>
                    <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                  </Link>
                )}

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
          {/* Top Navigation Links */}
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

          {/* Bottom Area: Mini Perfil do Usuário + Tag de Plano */}
          <div className="shrink-0 space-y-2 pb-3">
            {/* MINI PERFIL DO USUÁRIO (Diretamente em cima da tag de plano) */}
            {sidebarOpen ? (
              <div className="px-3">
                <Link
                  href="/dashboard/configuracoes"
                  className="group flex items-center justify-between p-2.5 rounded-2xl border border-black/[0.08] dark:border-white/[0.10] bg-white/70 dark:bg-card/70 hover:bg-black/5 dark:hover:bg-white/[0.08] backdrop-blur-md shadow-xs transition-all"
                  title="Acessar Configurações & Meu Perfil"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="relative shrink-0">
                      {currentUser?.avatarUrl ? (
                        <img
                          src={currentUser.avatarUrl}
                          alt={displayName}
                          className="h-9 w-9 rounded-xl object-cover ring-1 ring-border shadow-xs"
                        />
                      ) : (
                        <div className={`h-9 w-9 rounded-xl flex items-center justify-center font-bold text-xs ring-1 ${
                          isChief
                            ? "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 ring-emerald-500/30"
                            : isAutonomo
                            ? "bg-blue-500/20 text-blue-700 dark:text-blue-300 ring-blue-500/30"
                            : "bg-purple-500/20 text-purple-700 dark:text-purple-300 ring-purple-500/30"
                        }`}>
                          {userInitials}
                        </div>
                      )}
                      <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-background"></span>
                    </div>

                    <div className="min-w-0 text-left">
                      <p className="text-xs font-bold text-foreground truncate group-hover:text-primary transition-colors">
                        {displayName}
                      </p>
                      <p className="text-[10px] text-muted-foreground truncate font-medium">
                        {tenantName}
                      </p>
                      <span className="inline-block text-[9px] font-semibold text-lime-700 dark:text-lime-400 bg-lime-400/15 rounded-md px-1.5 py-0.2 mt-0.5">
                        {planTag}
                      </span>
                    </div>
                  </div>

                  <div className="h-7 w-7 rounded-lg text-muted-foreground hover:text-foreground flex items-center justify-center shrink-0">
                    <Settings className="h-3.5 w-3.5 group-hover:rotate-45 transition-transform" />
                  </div>
                </Link>
              </div>
            ) : (
              <div className="px-2 flex justify-center">
                <Link
                  href="/dashboard/configuracoes"
                  className="h-10 w-10 rounded-2xl overflow-hidden ring-1 ring-border flex items-center justify-center hover:scale-105 transition-transform bg-card"
                  title={`${displayName} - Configurações`}
                >
                  {currentUser?.avatarUrl ? (
                    <img src={currentUser.avatarUrl} alt={displayName} className="h-full w-full object-cover" />
                  ) : (
                    <span className="font-bold text-xs">{userInitials}</span>
                  )}
                </Link>
              </div>
            )}

            {/* Plano Capsule Dinâmico (Imobiliária vs Autônomo) */}
            <div className="px-3">
              {sidebarOpen ? (
                <div className={`rounded-2xl border p-3.5 backdrop-blur-md shadow-sm space-y-1.5 ${
                  isAutonomo
                    ? "bg-gradient-to-br from-blue-500/15 via-card/80 to-transparent border-blue-500/30"
                    : "bg-gradient-to-br from-amber-500/15 via-card/80 to-transparent border-amber-500/30"
                }`}>
                  <div className="flex items-center justify-between">
                    <p className={`font-bold text-xs flex items-center gap-1.5 ${
                      isAutonomo ? "text-blue-600 dark:text-blue-400" : "text-amber-600 dark:text-amber-400"
                    }`}>
                      {isAutonomo ? <Sparkles className="h-3.5 w-3.5" /> : <Crown className="h-3.5 w-3.5" />}
                      {isAutonomo ? "Corretor Solo" : "Imobiliária VIP"}
                    </p>
                    <span className={`text-[9px] px-2 py-0.5 rounded-full font-extrabold uppercase tracking-wider ${
                      isAutonomo
                        ? "bg-blue-500/20 text-blue-700 dark:text-blue-300"
                        : "bg-amber-500/20 text-amber-700 dark:text-amber-300"
                    }`}>
                      {isAutonomo ? "1 Usuário" : "Equipe VIP"}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-[10px] leading-tight">
                    {isAutonomo
                      ? "Plano individual: 100% de comissão direta e vitrine exclusiva."
                      : "Plano Imobiliária: Corretores e imóveis ilimitados gerenciados."}
                  </p>
                  <div className={`w-full rounded-full h-1 mt-2 ${isAutonomo ? "bg-blue-500/20" : "bg-amber-500/20"}`}>
                    <div className={`h-1 rounded-full w-full ${isAutonomo ? "bg-blue-500" : "bg-amber-500"}`}></div>
                  </div>

                  {canManageBilling ? (
                    <Link
                      href="/dashboard/plano"
                      className="mt-2.5 flex items-center justify-between w-full px-2.5 py-1.5 rounded-xl bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/[0.12] text-[10px] font-bold text-foreground transition-colors group"
                      title="Gerenciar Plano & Fazer Upgrades"
                    >
                      <span className="flex items-center gap-1.5">
                        <Crown className="h-3 w-3 text-amber-500" />
                        Fazer Upgrade / Gerenciar
                      </span>
                      <ChevronRight className="h-3 w-3 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  ) : (
                    <div className="mt-2 text-[9px] text-muted-foreground/80 flex items-center gap-1">
                      <ShieldCheck className="h-3 w-3 text-emerald-500 shrink-0" />
                      <span>Faturamento gerido pelo Chefe Master</span>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href={canManageBilling ? "/dashboard/plano" : "/dashboard/configuracoes"}
                  className={`flex justify-center p-2 rounded-2xl border ${
                    isAutonomo ? "bg-blue-500/10 border-blue-500/30" : "bg-amber-500/10 border-amber-500/30"
                  }`}
                  title={isAutonomo ? "Corretor Solo - Ver Plano" : "Plano Imobiliária Master VIP - Ver Plano"}
                >
                  {isAutonomo ? <Sparkles className="h-4 w-4 text-blue-500" /> : <Crown className="h-4 w-4 text-amber-500" />}
                </Link>
              )}
            </div>
          </div>
        </aside>

        {/* Content Workspace */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 pb-28 md:pb-6 bg-muted/15 dark:bg-black/20">
          {children}
        </main>

        {/* Mobile Floating Dock (Apple iOS Style - Inspired by mobile.jpg) */}
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

              {/* Configurações */}
              <Link
                href="/dashboard/configuracoes"
                className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-full transition-colors ${
                  pathname === "/dashboard/configuracoes" ? "text-foreground font-bold" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Settings className="h-5 w-5" />
                <span className="text-[9px]">Ajustes</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
