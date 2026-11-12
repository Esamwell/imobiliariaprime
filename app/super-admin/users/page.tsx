"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Search, Plus, ShieldCheck, Mail, Phone, Check } from "lucide-react"

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
  { id: "1", name: "Carlos Eduardo Silveira", email: "carlos@primeimoveis.com.br", role: "Gestor Geral", tenant: "Imobiliária Prime", status: "Ativo", lastLogin: "Há 12 min" },
  { id: "2", name: "Mariana Alencar", email: "mariana.alencar@horizonte.com", role: "Corretora Sênior", tenant: "Horizonte Imóveis", status: "Ativo", lastLogin: "Hoje, 14:20" },
  { id: "3", name: "Lucas Farias", email: "lucas.f@metropole.com.br", role: "Diretor Comercial", tenant: "Metrópole Empreendimentos", status: "Ativo", lastLogin: "Hoje, 09:15" },
  { id: "4", name: "Beatriz Nogueira", email: "beatriz@litoralsul.com.br", role: "Financeiro", tenant: "Litoral Sul Consultoria", status: "Ativo", lastLogin: "Ontem, 18:30" },
  { id: "5", name: "Rodrigo Mendes", email: "rodrigo.m@aliancaimoveis.com", role: "Corretor", tenant: "Aliança Imóveis", status: "Inativo", lastLogin: "Há 15 dias" },
  { id: "6", name: "Administrador Central", email: "admin@sistema.com", role: "Super Admin", tenant: "Plataforma Central", status: "Ativo", lastLogin: "Agora" },
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
  const [tenant, setTenant] = useState("Imobiliária Prime")

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
    <div className="flex-1 space-y-6 p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestão de Usuários</h1>
          <p className="text-sm text-muted-foreground">Controle de acessos, permissões e contas de usuários de todas as imobiliárias.</p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Convidar Usuário
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Convidar Novo Usuário</DialogTitle>
              <DialogDescription>
                Envie um convite de acesso para um gestor, corretor ou membro da equipe.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleInviteUser} className="space-y-3.5 pt-2">
              <div className="space-y-1">
                <label className="text-xs font-semibold">Nome Completo</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Fernanda Lima"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold">E-mail Profissional</label>
                <input
                  type="email"
                  required
                  placeholder="fernanda@imobiliaria.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold">Perfil / Cargo</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  >
                    <option value="Corretor">Corretor</option>
                    <option value="Gestor Geral">Gestor Geral</option>
                    <option value="Financeiro">Financeiro</option>
                    <option value="Super Admin">Super Admin</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold">Imobiliária</label>
                  <select
                    value={tenant}
                    onChange={(e) => setTenant(e.target.value)}
                    className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  >
                    <option value="Imobiliária Prime">Imobiliária Prime</option>
                    <option value="Horizonte Imóveis">Horizonte Imóveis</option>
                    <option value="Metrópole Empreendimentos">Metrópole</option>
                    <option value="Plataforma Central">Plataforma Central</option>
                  </select>
                </div>
              </div>

              <DialogFooter className="pt-3">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit">Enviar Convite</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total de Usuários</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
            <p className="text-xs text-muted-foreground">Contas cadastradas</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Contas Ativas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">
              {users.filter((u) => u.status === "Ativo").length}
            </div>
            <p className="text-xs text-muted-foreground">Com acesso permitido</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Gestores e Admins</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {users.filter((u) => u.role.includes("Admin") || u.role.includes("Gestor")).length}
            </div>
            <p className="text-xs text-muted-foreground">Com permissão de gerência</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Inativos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-500">
              {users.filter((u) => u.status === "Inativo").length}
            </div>
            <p className="text-xs text-muted-foreground">Acesso revogado</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle>Usuários Registrados</CardTitle>
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Buscar por nome, email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="h-9 w-64 rounded-md border border-input bg-background pl-8 pr-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
              </div>
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="h-9 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                <option value="todos">Todos os cargos</option>
                <option value="admin">Administrador</option>
                <option value="gestor">Gestor</option>
                <option value="corretor">Corretor</option>
                <option value="financeiro">Financeiro</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b bg-muted/50 text-xs font-semibold text-muted-foreground uppercase">
                <tr>
                  <th className="py-3 px-4">Nome</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Perfil / Cargo</th>
                  <th className="py-3 px-4">Imobiliária</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Último Acesso</th>
                  <th className="py-3 px-4 text-right">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filtered.map((user) => (
                  <tr key={user.id} className="hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-4 font-medium flex items-center gap-2.5">
                      <div className="h-8 w-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xs">
                        {user.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                      </div>
                      <span>{user.name}</span>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">{user.email}</td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium">
                        {user.role.includes("Admin") && <ShieldCheck className="h-3 w-3 text-purple-600" />}
                        {user.role}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-medium">{user.tenant}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        user.status === "Ativo" ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300" : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">{user.lastLogin}</td>
                    <td className="py-3 px-4 text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleUserStatus(user.id)}
                        className={`h-7 text-xs ${
                          user.status === "Ativo"
                            ? "text-red-500 hover:text-red-600 hover:bg-red-50"
                            : "text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
                        }`}
                      >
                        {user.status === "Ativo" ? "Desativar" : "Ativar"}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
