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
  Bell,
  Search,
  Plus,
  LogOut,
  Crown
} from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

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
  const pathname = usePathname()
  const { setTheme, theme } = useTheme()

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    window.location.href = "/login"
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Top Header */}
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background px-4 sm:px-6">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:flex"
          >
            <Menu className="h-5 w-5" />
          </Button>

          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
              <Building className="h-5 w-5" />
            </div>
            <div className="hidden sm:block">
              <span className="font-bold text-base leading-none">Imobiliária Prime</span>
              <span className="block text-xs text-muted-foreground">Portal do Corretor & Gestor</span>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          {/* Switcher to Super Admin */}
          <Link
            href="/super-admin"
            className="inline-flex items-center gap-1.5 rounded-lg border border-purple-300 dark:border-purple-800 bg-purple-50 dark:bg-purple-950/60 px-3 py-1.5 text-xs font-semibold text-purple-700 dark:text-purple-300 hover:bg-purple-100 transition-colors"
          >
            <ShieldCheck className="h-4 w-4" />
            <span className="hidden md:inline">Acessar</span> Painel Super Admin
          </Link>

          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="h-9 w-9"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>

          <div className="flex items-center gap-2 border-l pl-3">
            <div className="h-8 w-8 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold text-xs">
              CS
            </div>
            <div className="hidden lg:block text-left">
              <p className="text-xs font-medium leading-none">Carlos Silveira</p>
              <p className="text-[10px] text-muted-foreground">Corretor Sênior - CRECI 48.912</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              title="Sair do Sistema"
              onClick={handleLogout}
              className="h-8 w-8 text-muted-foreground hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/50"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className={`border-r bg-background transition-all duration-300 flex flex-col ${
            sidebarOpen ? "w-64" : "w-[68px]"
          }`}
        >
          <div className="flex-1 py-4">
            <nav className="grid gap-1 px-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    } ${!sidebarOpen && "justify-center"}`}
                  >
                    <item.icon className="h-5 w-5 shrink-0" />
                    {sidebarOpen && <span>{item.title}</span>}
                  </Link>
                )
              })}
            </nav>
          </div>

          <div className="border-t p-3">
            {sidebarOpen ? (
              <div className="rounded-lg bg-gradient-to-r from-amber-500/10 via-card to-card border border-amber-500/30 p-3 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <p className="font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                    <Crown className="h-3.5 w-3.5" /> Plano Master VIP
                  </p>
                  <span className="text-[10px] bg-amber-500/20 text-amber-700 dark:text-amber-300 px-1.5 py-0.5 rounded font-bold">
                    Ilimitado
                  </span>
                </div>
                <p className="text-muted-foreground text-[11px]">Concedido pelo Super Admin</p>
                <div className="w-full bg-amber-500/20 rounded-full h-1.5 mt-2">
                  <div className="bg-amber-500 h-1.5 rounded-full w-full"></div>
                </div>
                <p className="text-[10px] text-muted-foreground pt-0.5">Corretores e Imóveis Sem Limites</p>
              </div>
            ) : (
              <div className="flex justify-center" title="Plano Master VIP">
                <Crown className="h-5 w-5 text-amber-500" />
              </div>
            )}
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 overflow-x-hidden p-6 bg-muted/10">
          {children}
        </main>
      </div>
    </div>
  )
}

