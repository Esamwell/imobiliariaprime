"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { TactusLogo } from "@/components/tactus-logo"
import { 
  BarChart3, 
  Building2, 
  CreditCard, 
  HelpCircle, 
  Home, 
  LucideIcon, 
  Settings, 
  Users,
  ShieldCheck,
  Crown
} from "lucide-react"

interface NavItem {
  title: string
  href: string
  icon: LucideIcon
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/super-admin",
    icon: Home,
  },
  {
    title: "Imobiliárias",
    href: "/super-admin/tenants",
    icon: Building2,
  },
  {
    title: "Usuários",
    href: "/super-admin/users",
    icon: Users,
  },
  {
    title: "Assinaturas",
    href: "/super-admin/subscriptions",
    icon: CreditCard,
  },
  {
    title: "Relatórios",
    href: "/super-admin/reports",
    icon: BarChart3,
  },
  {
    title: "Configurações",
    href: "/super-admin/settings",
    icon: Settings,
  },
  {
    title: "Suporte",
    href: "/super-admin/support",
    icon: HelpCircle,
  },
]

interface SidebarProps {
  open: boolean
}

export function Sidebar({ open }: SidebarProps) {
  const pathname = usePathname()

  return (
    <aside
      className={cn(
        "flex h-full shrink-0 flex-col border-r border-border/50 bg-background/80 backdrop-blur-xl transition-all duration-300 overflow-y-auto",
        open ? "w-64" : "w-[72px]"
      )}
    >
      {/* Top Sidebar Logo Brand */}
      <div className="p-3.5 border-b border-border/40">
        <Link href="/super-admin" className="flex items-center gap-2 group transition-transform hover:scale-105">
          <TactusLogo variant="auto" className={cn("w-auto transition-all", open ? "h-9" : "h-7")} />
          {open && (
            <span className="text-[9px] font-black text-purple-600 dark:text-purple-400 uppercase tracking-widest bg-purple-500/10 px-1.5 py-0.5 rounded-full">
              Admin
            </span>
          )}
        </Link>
      </div>

      <div className="flex-1 py-4">
        <nav className="grid gap-1.5 px-3">
          {navItems.map((item, index) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={index}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-2xl px-3.5 py-2.5 text-xs font-semibold transition-all duration-200",
                  isActive
                    ? "bg-foreground text-background shadow-sm shadow-foreground/10"
                    : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                  !open && "justify-center px-0"
                )}
                title={!open ? item.title : undefined}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                {open && <span>{item.title}</span>}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Super Admin Master Access Badge */}
      <div className="p-3 shrink-0">
        {open ? (
          <div className="rounded-2xl bg-gradient-to-br from-purple-500/15 via-card/80 to-transparent border border-purple-500/30 p-3.5 backdrop-blur-md shadow-sm space-y-1.5">
            <div className="flex items-center justify-between">
              <p className="font-bold text-xs text-purple-700 dark:text-purple-300 flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5" /> Controle Total
              </p>
              <span className="text-[9px] bg-purple-500/20 text-purple-700 dark:text-purple-300 px-2 py-0.5 rounded-full font-black uppercase tracking-wider">
                Root
              </span>
            </div>
            <p className="text-muted-foreground text-[10px] leading-tight">
              Acesso irrestrito a bancos de dados, tenants e planos.
            </p>
          </div>
        ) : (
          <div className="flex justify-center p-2 rounded-2xl bg-purple-500/10 border border-purple-500/30" title="Controle Total Root">
            <Crown className="h-4 w-4 text-purple-500" />
          </div>
        )}
      </div>
    </aside>
  )
}
