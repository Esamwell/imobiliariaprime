"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { 
  Search, 
  Plus, 
  ShieldCheck, 
  Mail, 
  Phone, 
  Check, 
  UserRound, 
  Building2, 
  Crown,
  Ban,
  CheckCircle2,
  Users
} from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  role: string
  tenant: string
  status: "Ativo" | "Inativo"
  lastLogin: string
}

const initialUsers: User[] = [
  { id: "1", name: "Carlos Eduardo Silveira", email: "carlos@tactus.com.br", role: "Chefe da Imobiliária (Master)", tenant: "Tactus Imobiliária", status: "Ativo", lastLogin: "Agora" },
  { id: "2", name: "Roberto Dias", email: "roberto@autonomo.com.br", role: "Corretor Autônomo (Solo)", tenant: "Roberto Dias Consultoria Solo", status: "Ativo", lastLogin: "Há 5 min" },
  { id: "3", name: "Super Administrador", email: "admin@tactus.com.br", role: "Super Admin Root", tenant: "Plataforma Central", status: "Ativo", lastLogin: "Online" },
  { id: "4", name: "Mariana Alencar", email: "mariana@tactus.com.br", role: "Corretora Vinculada (Braço)", tenant: "Tactus Imobiliária", status: "Ativo", lastLogin: "Hoje, 14:20" },
  { id: "5", name: "Ricardo Albuquerque", email: "ricardo@autonomo.com.br", role: "Corretor Autônomo (Solo)", tenant: "Albuquerque Consultoria Solo", status: "Ativo", lastLogin: "Hoje, 09:15" },
  { id: "6", name: "Lucas Farias", email: "lucas.farias@tactus.com.br", role: "Corretor Vinculado (Braço)", tenant: "Tactus Imobiliária", status: "Ativo", lastLogin: "Ontem, 18:30" },
]

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(initialUsers)
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("todos")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Form State
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [role, setRole] = useState("Corretor")
  const [tenant, setTenant] = useState("Imobiliária Alencar")

  const handleInviteUser = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email) return

    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      role,
      tenant,
      status: "Ativo",
      lastLogin: "Nunca acessou",
    }

    setUsers([newUser, ...users])
    setIsDialogOpen(false)
    setName("")
    setEmail("")
  }

  const toggleUserStatus = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === id) {
          const next = u.status === "Ativo" ? "Inativo" : "Ativo"
          return { ...u, status: next }
        }
        return u
      })
    )
  }

  const filtered = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.tenant.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === "todos" || u.role.toLowerCase().includes(roleFilter.toLowerCase())
    return matchesSearch && matchesRole
  })

  return (
    <div className="flex-1 space-y-6 p-4 sm:p-6 max-w-7xl mx-auto">
      {/* Header Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              Gestão de Usuários
            </h1>
            <span className="rounded-full bg-purple-500/10 text-purple-700 dark:text-purple-300 px-2.5 py-0.5 text-[10px] font-black uppercase">
              Acessos
            </span>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Controle de acessos, permissões e contas de usuários de todas as imobiliárias e corretores.
          </p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <button className="inline-flex items-center gap-2 rounded-full bg-foreground text-background hover:bg-foreground/90 px-5 py-2.5 text-xs font-bold shadow-md transition-all hover:scale-102">
              <Plus className="h-4 w-4" />
              <span>Convidar Usuário</span>
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-md rounded-[28px] border border-black/[0.08] dark:border-white/[0.12] bg-background/95 backdrop-blur-2xl p-6 shadow-2xl">
            <DialogHeader>
              <DialogTitle className="text-lg font-black text-foreground">Convidar Novo Usuário</DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground">
                Envie um convite de acesso para um gestor, corretor ou membro da equipe.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleInviteUser} className="space-y-3.5 pt-2">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                  Nome Completo
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Fernanda Lima"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-10 rounded-2xl border border-black/[0.08] dark:border-white/[0.10] bg-muted/20 px-3.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                  E-mail Profissional
                </label>
                <input
                  type="email"
                  required
                  placeholder="fernanda@imobiliaria.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-10 rounded-2xl border border-black/[0.08] dark:border-white/[0.10] bg-muted/20 px-3.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                    Cargo / Perfil
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full h-10 rounded-2xl border border-black/[0.08] dark:border-white/[0.10] bg-muted/20 px-3.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20"
                  >
                    <option value="Corretor">Corretor</option>
                    <option value="Gestor Geral">Gestor Geral</option>
                    <option value="Financeiro">Financeiro</option>
                    <option value="Super Admin">Super Admin</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                    Imobiliária
                  </label>
                  <select
                    value={tenant}
                    onChange={(e) => setTenant(e.target.value)}
                    className="w-full h-10 rounded-2xl border border-black/[0.08] dark:border-white/[0.10] bg-muted/20 px-3.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20"
                  >
                    <option value="Imobiliária Alencar">Imobiliária Alencar</option>
                    <option value="Horizonte Imóveis">Horizonte Imóveis</option>
                    <option value="Metrópole Empreendimentos">Metrópole</option>
                    <option value="Plataforma Central">Plataforma Central</option>
                  </select>
                </div>
              </div>

              <DialogFooter className="pt-3 gap-2">
                <Button 
                  type="button" 
                  variant="ghost" 
                  onClick={() => setIsDialogOpen(false)}
                  className="rounded-full text-xs"
                >
                  Cancelar
                </Button>
                <Button 
                  type="submit"
                  className="rounded-full text-xs font-bold"
                >
                  Enviar Convite
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* KPI Cards in Apple Prime Glass */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        <div className="glass-card glass-card-hover rounded-3xl p-4 sm:p-5 flex flex-col justify-between border border-black/[0.06] dark:border-white/[0.08]">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
              Total de Usuários
            </span>
            <div className="h-8 w-8 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Users className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">
              {users.length}
            </div>
            <p className="text-[11px] text-muted-foreground mt-0.5">Em todo o ecossistema</p>
          </div>
        </div>

        <div className="glass-card glass-card-hover rounded-3xl p-4 sm:p-5 flex flex-col justify-between border border-black/[0.06] dark:border-white/[0.08]">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
              Usuários Ativos
            </span>
            <div className="h-8 w-8 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-black tracking-tight text-emerald-600 dark:text-emerald-400">
              {users.filter((u) => u.status === "Ativo").length}
            </div>
            <p className="text-[11px] text-muted-foreground mt-0.5">Com login habilitado</p>
          </div>
        </div>

        <div className="glass-card glass-card-hover rounded-3xl p-4 sm:p-5 flex flex-col justify-between border border-black/[0.06] dark:border-white/[0.08]">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
              Gestores & Admins
            </span>
            <div className="h-8 w-8 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <ShieldCheck className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">
              {users.filter((u) => u.role.includes("Admin") || u.role.includes("Gestor")).length}
            </div>
            <p className="text-[11px] text-muted-foreground mt-0.5">Acesso administrativo</p>
          </div>
        </div>

        <div className="glass-card glass-card-hover rounded-3xl p-4 sm:p-5 flex flex-col justify-between border border-black/[0.06] dark:border-white/[0.08]">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
              Contas Inativas
            </span>
            <div className="h-8 w-8 rounded-full bg-slate-500/10 text-slate-600 dark:text-slate-400 flex items-center justify-center">
              <Ban className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-black tracking-tight text-muted-foreground">
              {users.filter((u) => u.status === "Inativo").length}
            </div>
            <p className="text-[11px] text-muted-foreground mt-0.5">Acesso bloqueado</p>
          </div>
        </div>
      </div>

      {/* Table Card in Apple Prime Glass */}
      <div className="glass-card rounded-3xl border border-black/[0.06] dark:border-white/[0.08] shadow-sm overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-black/[0.06] dark:border-white/[0.08] flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-base font-extrabold text-foreground">Usuários Registrados</h3>
            <p className="text-xs text-muted-foreground">Listagem de corretores, gestores e equipe operacional</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar por nome, email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-9 w-60 rounded-full border border-black/[0.08] dark:border-white/[0.10] bg-muted/30 pl-8 pr-3 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20"
              />
            </div>

            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="h-9 rounded-full border border-black/[0.08] dark:border-white/[0.10] bg-muted/30 px-3 text-xs font-semibold text-foreground focus:outline-none"
            >
              <option value="todos">Todos os cargos</option>
              <option value="admin">Administrador</option>
              <option value="gestor">Gestor</option>
              <option value="corretor">Corretor</option>
              <option value="financeiro">Financeiro</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-black/[0.06] dark:border-white/[0.08] bg-muted/20 text-[10px] font-black uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="py-3 px-5">Nome</th>
                <th className="py-3 px-4">E-mail</th>
                <th className="py-3 px-4">Cargo / Perfil</th>
                <th className="py-3 px-4">Imobiliária</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Último Acesso</th>
                <th className="py-3 px-5 text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/[0.04] dark:divide-white/[0.04]">
              {filtered.map((user) => {
                const isActive = user.status === "Ativo"
                return (
                  <tr key={user.id} className="hover:bg-muted/30 transition-colors">
                    <td className="py-3.5 px-5 font-bold text-foreground">
                      <div className="flex items-center gap-2.5">
                        <div className="h-8 w-8 rounded-full bg-foreground text-background flex items-center justify-center font-bold text-xs shadow-sm">
                          {user.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                        </div>
                        <span>{user.name}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-muted-foreground">
                      {user.email}
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1 rounded-full bg-muted/60 px-2.5 py-0.5 text-[11px] font-bold text-foreground">
                        {user.role.includes("Admin") && <ShieldCheck className="h-3 w-3 text-purple-600 dark:text-purple-400" />}
                        {user.role}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 font-semibold text-foreground">
                      {user.tenant}
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                          isActive
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                            : "bg-slate-500/10 text-slate-600 dark:text-slate-400"
                        }`}
                      >
                        <span className={`h-1.5 w-1.5 rounded-full ${isActive ? "bg-emerald-500" : "bg-slate-500"}`} />
                        {user.status}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-muted-foreground">
                      {user.lastLogin}
                    </td>

                    <td className="py-3.5 px-5 text-right">
                      <button
                        onClick={() => toggleUserStatus(user.id)}
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold transition-all ${
                          isActive
                            ? "bg-muted hover:bg-rose-500/10 hover:text-rose-600 text-muted-foreground"
                            : "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20"
                        }`}
                      >
                        {isActive ? "Desativar" : "Ativar"}
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
