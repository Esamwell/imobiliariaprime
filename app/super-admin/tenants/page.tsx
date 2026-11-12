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
import { Building2, Search, Plus, CheckCircle2, Clock, AlertCircle, Crown, User, ShieldCheck, Sparkles } from "lucide-react"

interface Account {
  id: string
  name: string
  accountType: "IMOBILIARIA" | "AUTONOMO"
  document: string // CNPJ ou CPF/CRECI
  plan: string // Master, Enterprise, Profissional, Básico, Autônomo Pro
  brokersCount: number
  propertiesCount: number
  status: "Ativo" | "Pendente" | "Suspenso"
  joinedAt: string
}

const initialAccounts: Account[] = [
  { id: "1", name: "Imobiliária Prime", accountType: "IMOBILIARIA", document: "12.345.678/0001-90", plan: "Master VIP", brokersCount: 28, propertiesCount: 450, status: "Ativo", joinedAt: "10/01/2024" },
  { id: "2", name: "Ricardo Albuquerque (CRECI 41.209)", accountType: "AUTONOMO", document: "234.567.890-11", plan: "Master VIP", brokersCount: 1, propertiesCount: 48, status: "Ativo", joinedAt: "18/01/2024" },
  { id: "3", name: "Horizonte Imóveis", accountType: "IMOBILIARIA", document: "98.765.432/0001-10", plan: "Profissional", brokersCount: 14, propertiesCount: 180, status: "Ativo", joinedAt: "15/02/2024" },
  { id: "4", name: "Dra. Juliana Prado - Corretora", accountType: "AUTONOMO", document: "345.678.901-22", plan: "Autônomo Pro", brokersCount: 1, propertiesCount: 35, status: "Ativo", joinedAt: "28/02/2024" },
  { id: "5", name: "Litoral Sul Consultoria", accountType: "IMOBILIARIA", document: "45.123.789/0001-55", plan: "Profissional", brokersCount: 8, propertiesCount: 95, status: "Ativo", joinedAt: "03/03/2024" },
  { id: "6", name: "Morada & Vida Imóveis", accountType: "IMOBILIARIA", document: "23.456.789/0001-33", plan: "Básico", brokersCount: 3, propertiesCount: 42, status: "Pendente", joinedAt: "22/04/2024" },
  { id: "7", name: "Metrópole Empreendimentos", accountType: "IMOBILIARIA", document: "67.890.123/0001-44", plan: "Enterprise", brokersCount: 45, propertiesCount: 890, status: "Ativo", joinedAt: "12/05/2024" },
  { id: "8", name: "Fernando Dias Consultoria Solo", accountType: "AUTONOMO", document: "567.890.123-44", plan: "Master VIP", brokersCount: 1, propertiesCount: 22, status: "Ativo", joinedAt: "01/06/2024" },
]

export default function TenantsPage() {
  const [accounts, setAccounts] = useState<Account[]>(initialAccounts)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("todos")
  const [typeFilter, setTypeFilter] = useState("todos")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Form State
  const [name, setName] = useState("")
  const [accountType, setAccountType] = useState<"IMOBILIARIA" | "AUTONOMO">("IMOBILIARIA")
  const [document, setDocument] = useState("")
  const [plan, setPlan] = useState("Master VIP")
  const [email, setEmail] = useState("")

  const handleCreateAccount = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !document) return

    const newAcc: Account = {
      id: Date.now().toString(),
      name,
      accountType,
      document,
      plan,
      brokersCount: accountType === "AUTONOMO" ? 1 : 5,
      propertiesCount: 0,
      status: "Ativo",
      joinedAt: new Date().toLocaleDateString("pt-BR"),
    }

    setAccounts([newAcc, ...accounts])
    setIsDialogOpen(false)
    setName("")
    setDocument("")
    setEmail("")
  }

  const toggleStatus = (id: string) => {
    setAccounts((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const nextStatus = t.status === "Ativo" ? "Suspenso" : "Ativo"
          return { ...t, status: nextStatus }
        }
        return t
      })
    )
  }

  const filtered = accounts.filter((t) => {
    const matchesSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase()) || t.document.includes(searchTerm)
    const matchesStatus = statusFilter === "todos" || t.status.toLowerCase() === statusFilter.toLowerCase()
    const matchesType = typeFilter === "todos" || t.accountType === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Imobiliárias & Corretores Autônomos</h1>
          <p className="text-sm text-muted-foreground">
            Gestão de todas as contas clientes: imobiliárias estruturadas (PJ) e profissionais autônomos (PF/CRECI).
          </p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Cadastrar Nova Conta
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Nova Conta de Cliente</DialogTitle>
              <DialogDescription>
                Adicione uma Imobiliária (PJ) ou Corretor Autônomo (PF) e defina o plano.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleCreateAccount} className="space-y-3.5 pt-2">
              <div className="space-y-1">
                <label className="text-xs font-semibold">Tipo de Contratação</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setAccountType("IMOBILIARIA")}
                    className={`flex items-center justify-center gap-2 p-2.5 rounded-lg border text-xs font-semibold transition-all ${
                      accountType === "IMOBILIARIA"
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-input hover:bg-muted text-muted-foreground"
                    }`}
                  >
                    <Building2 className="h-4 w-4" /> Imobiliária (PJ)
                  </button>
                  <button
                    type="button"
                    onClick={() => setAccountType("AUTONOMO")}
                    className={`flex items-center justify-center gap-2 p-2.5 rounded-lg border text-xs font-semibold transition-all ${
                      accountType === "AUTONOMO"
                        ? "border-purple-600 bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-300"
                        : "border-input hover:bg-muted text-muted-foreground"
                    }`}
                  >
                    <User className="h-4 w-4" /> Corretor Autônomo
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold">
                  {accountType === "IMOBILIARIA" ? "Razão Social / Nome Fantasia" : "Nome Completo do Corretor"}
                </label>
                <input
                  type="text"
                  required
                  placeholder={accountType === "IMOBILIARIA" ? "Ex: Prime Imóveis Ltda" : "Ex: Mariana Silveira (CRECI 45.120)"}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold">
                  {accountType === "IMOBILIARIA" ? "CNPJ da Empresa" : "CPF ou CRECI Individual"}
                </label>
                <input
                  type="text"
                  required
                  placeholder={accountType === "IMOBILIARIA" ? "00.000.000/0001-00" : "000.000.000-00 ou CRECI 12345"}
                  value={document}
                  onChange={(e) => setDocument(e.target.value)}
                  className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold">E-mail de Contato / Acesso</label>
                <input
                  type="email"
                  required
                  placeholder="usuario@dominio.com.br"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold flex items-center justify-between">
                  <span>Plano Atribuído</span>
                  {plan.includes("Master") && (
                    <span className="text-[10px] text-amber-500 font-bold flex items-center gap-1">
                      <Crown className="h-3 w-3" /> Concessão Super Admin
                    </span>
                  )}
                </label>
                <select
                  value={plan}
                  onChange={(e) => setPlan(e.target.value)}
                  className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  <option value="Master VIP">👑 Master VIP (Exclusivo Super Admin - Ilimitado)</option>
                  <option value="Autônomo Pro">Autônomo Pro (R$ 190/mês)</option>
                  <option value="Básico">Imobiliária Básico (R$ 490/mês)</option>
                  <option value="Profissional">Imobiliária Profissional (R$ 1.250/mês)</option>
                  <option value="Enterprise">Enterprise (R$ 2.890/mês)</option>
                </select>
              </div>

              <DialogFooter className="pt-3">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit">Cadastrar e Ativar</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total de Contas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{accounts.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Imobiliárias e Autônomos</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Contas no Plano Master VIP</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-500 flex items-center gap-1.5">
              <Crown className="h-5 w-5" />
              {accounts.filter((t) => t.plan.includes("Master")).length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Concessões exclusivas</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Imobiliárias (PJ)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {accounts.filter((t) => t.accountType === "IMOBILIARIA").length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Com equipes de corretores</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Corretores Autônomos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {accounts.filter((t) => t.accountType === "AUTONOMO").length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Operando de forma solo</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle>Base de Contas Cadastradas</CardTitle>
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Buscar por nome ou documento..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="h-9 w-56 rounded-md border border-input bg-background pl-8 pr-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
              </div>

              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="h-9 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                <option value="todos">Todos os tipos</option>
                <option value="IMOBILIARIA">Apenas Imobiliárias</option>
                <option value="AUTONOMO">Apenas Autônomos</option>
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="h-9 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                <option value="todos">Todos os status</option>
                <option value="ativo">Ativo</option>
                <option value="pendente">Pendente</option>
                <option value="suspenso">Suspenso</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b bg-muted/50 text-xs font-semibold text-muted-foreground uppercase">
                <tr>
                  <th className="py-3 px-4">Conta / Profissional</th>
                  <th className="py-3 px-4">Tipo</th>
                  <th className="py-3 px-4">Documento</th>
                  <th className="py-3 px-4">Plano</th>
                  <th className="py-3 px-4">Corretores</th>
                  <th className="py-3 px-4">Imóveis</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filtered.map((account) => (
                  <tr key={account.id} className="hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-4 font-medium flex items-center gap-2">
                      <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${
                        account.accountType === "AUTONOMO"
                          ? "bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-300"
                          : "bg-primary/10 text-primary"
                      }`}>
                        {account.accountType === "AUTONOMO" ? (
                          <User className="h-4 w-4" />
                        ) : (
                          <Building2 className="h-4 w-4" />
                        )}
                      </div>
                      <div>
                        <span>{account.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        account.accountType === "AUTONOMO"
                          ? "bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300"
                          : "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300"
                      }`}>
                        {account.accountType === "AUTONOMO" ? "Autônomo" : "Imobiliária"}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground font-mono text-xs">{account.document}</td>
                    <td className="py-3 px-4">
                      {account.plan.includes("Master") ? (
                        <span className="rounded-full bg-amber-500/15 border border-amber-500/40 px-2.5 py-0.5 text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1 w-fit shadow-sm">
                          <Crown className="h-3 w-3" /> Master VIP
                        </span>
                      ) : (
                        <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                          {account.plan}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4">{account.brokersCount}</td>
                    <td className="py-3 px-4">{account.propertiesCount}</td>
                    <td className="py-3 px-4">
                      {account.status === "Ativo" && (
                        <span className="flex items-center gap-1 text-emerald-600 text-xs font-medium">
                          <CheckCircle2 className="h-3.5 w-3.5" /> Ativo
                        </span>
                      )}
                      {account.status === "Pendente" && (
                        <span className="flex items-center gap-1 text-amber-500 text-xs font-medium">
                          <Clock className="h-3.5 w-3.5" /> Pendente
                        </span>
                      )}
                      {account.status === "Suspenso" && (
                        <span className="flex items-center gap-1 text-red-500 text-xs font-medium">
                          <AlertCircle className="h-3.5 w-3.5" /> Suspenso
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleStatus(account.id)}
                        className={`h-7 text-xs ${
                          account.status === "Ativo"
                            ? "text-red-500 hover:text-red-600 hover:bg-red-50"
                            : "text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
                        }`}
                      >
                        {account.status === "Ativo" ? "Bloquear" : "Ativar"}
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
