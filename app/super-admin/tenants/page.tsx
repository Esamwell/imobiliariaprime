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
  Building2, 
  Search, 
  Plus, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Crown, 
  User, 
  ShieldCheck, 
  Sparkles,
  ArrowUpRight,
  Filter,
  MoreVertical,
  Check,
  Ban,
  Building
} from "lucide-react"

interface Account {
  id: string
  name: string
  accountType: "IMOBILIARIA" | "AUTONOMO"
  document: string // CNPJ ou CPF/CRECI
  plan: string // Master VIP, Enterprise, Profissional, Básico, Autônomo Pro
  brokersCount: number
  propertiesCount: number
  status: "Ativo" | "Pendente" | "Suspenso"
  joinedAt: string
}

const initialAccounts: Account[] = [
  { id: "1", name: "Tactus Imóveis & Consultoria", accountType: "IMOBILIARIA", document: "12.345.678/0001-90", plan: "Master VIP", brokersCount: 28, propertiesCount: 450, status: "Ativo", joinedAt: "10/01/2024" },
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
    <div className="flex-1 space-y-6 p-4 sm:p-6 max-w-7xl mx-auto">
      {/* Header Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              Imobiliárias & Autônomos
            </h1>
            <span className="rounded-full bg-purple-500/10 text-purple-700 dark:text-purple-300 px-2.5 py-0.5 text-[10px] font-black uppercase">
              Base de Clientes
            </span>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Gestão consolidada de imobiliárias parceiras (PJ) e corretores autônomos credenciados (PF/CRECI).
          </p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <button className="inline-flex items-center gap-2 rounded-full bg-foreground text-background hover:bg-foreground/90 px-5 py-2.5 text-xs font-bold shadow-md transition-all hover:scale-102">
              <Plus className="h-4 w-4" />
              <span>Cadastrar Nova Conta</span>
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-md rounded-[28px] border border-black/[0.08] dark:border-white/[0.12] bg-background/95 backdrop-blur-2xl p-6 shadow-2xl">
            <DialogHeader>
              <DialogTitle className="text-lg font-black text-foreground">Nova Conta de Cliente</DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground">
                Cadastre uma Imobiliária (PJ) ou Corretor Autônomo (PF) e defina o plano de acesso.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleCreateAccount} className="space-y-3.5 pt-2">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                  Tipo de Contratação
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setAccountType("IMOBILIARIA")}
                    className={`flex items-center justify-center gap-2 p-2.5 rounded-2xl border text-xs font-bold transition-all ${
                      accountType === "IMOBILIARIA"
                        ? "border-foreground bg-foreground text-background shadow-sm"
                        : "border-black/[0.08] dark:border-white/[0.10] bg-muted/30 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Building2 className="h-4 w-4" /> Imobiliária (PJ)
                  </button>
                  <button
                    type="button"
                    onClick={() => setAccountType("AUTONOMO")}
                    className={`flex items-center justify-center gap-2 p-2.5 rounded-2xl border text-xs font-bold transition-all ${
                      accountType === "AUTONOMO"
                        ? "border-foreground bg-foreground text-background shadow-sm"
                        : "border-black/[0.08] dark:border-white/[0.10] bg-muted/30 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <User className="h-4 w-4" /> Corretor Autônomo
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                  {accountType === "IMOBILIARIA" ? "Razão Social / Nome Fantasia" : "Nome Completo do Corretor"}
                </label>
                <input
                  type="text"
                  required
                  placeholder={accountType === "IMOBILIARIA" ? "Ex: Tactus Imóveis Ltda" : "Ex: Mariana Silveira (CRECI 45.120)"}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-10 rounded-2xl border border-black/[0.08] dark:border-white/[0.10] bg-muted/20 px-3.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                  {accountType === "IMOBILIARIA" ? "CNPJ da Empresa" : "CPF ou CRECI Individual"}
                </label>
                <input
                  type="text"
                  required
                  placeholder={accountType === "IMOBILIARIA" ? "00.000.000/0001-00" : "000.000.000-00 ou CRECI 12345"}
                  value={document}
                  onChange={(e) => setDocument(e.target.value)}
                  className="w-full h-10 rounded-2xl border border-black/[0.08] dark:border-white/[0.10] bg-muted/20 px-3.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                  E-mail de Contato / Acesso
                </label>
                <input
                  type="email"
                  required
                  placeholder="usuario@dominio.com.br"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-10 rounded-2xl border border-black/[0.08] dark:border-white/[0.10] bg-muted/20 px-3.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider flex items-center justify-between">
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
                  className="w-full h-10 rounded-2xl border border-black/[0.08] dark:border-white/[0.10] bg-muted/20 px-3.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20"
                >
                  <option value="Master VIP">👑 Master VIP (Super Admin - Ilimitado)</option>
                  <option value="Autônomo Pro">Autônomo Pro (R$ 89/mês)</option>
                  <option value="Profissional">Imobiliária Tactus (R$ 249/mês)</option>
                  <option value="Enterprise">Enterprise (R$ 589/mês)</option>
                </select>
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
                  Cadastrar e Ativar
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
              Total de Contas
            </span>
            <div className="h-8 w-8 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Building2 className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">
              {accounts.length}
            </div>
            <p className="text-[11px] text-muted-foreground mt-0.5">Imobiliárias & Autônomos</p>
          </div>
        </div>

        <div className="glass-card glass-card-hover rounded-3xl p-4 sm:p-5 flex flex-col justify-between border border-black/[0.06] dark:border-white/[0.08]">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
              Plano Master VIP
            </span>
            <div className="h-8 w-8 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Crown className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-black tracking-tight text-amber-500">
              {accounts.filter((t) => t.plan.includes("Master")).length}
            </div>
            <p className="text-[11px] text-muted-foreground mt-0.5">Concessões sem restrições</p>
          </div>
        </div>

        <div className="glass-card glass-card-hover rounded-3xl p-4 sm:p-5 flex flex-col justify-between border border-black/[0.06] dark:border-white/[0.08]">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
              Imobiliárias (PJ)
            </span>
            <div className="h-8 w-8 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Building className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">
              {accounts.filter((t) => t.accountType === "IMOBILIARIA").length}
            </div>
            <p className="text-[11px] text-muted-foreground mt-0.5">Com equipes de corretores</p>
          </div>
        </div>

        <div className="glass-card glass-card-hover rounded-3xl p-4 sm:p-5 flex flex-col justify-between border border-black/[0.06] dark:border-white/[0.08]">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
              Autônomos (PF)
            </span>
            <div className="h-8 w-8 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <User className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">
              {accounts.filter((t) => t.accountType === "AUTONOMO").length}
            </div>
            <p className="text-[11px] text-muted-foreground mt-0.5">Operando de forma solo</p>
          </div>
        </div>
      </div>

      {/* Main Table Card in Apple Prime Glass */}
      <div className="glass-card rounded-3xl border border-black/[0.06] dark:border-white/[0.08] shadow-sm overflow-hidden">
        {/* Filter and Search Bar */}
        <div className="p-5 sm:p-6 border-b border-black/[0.06] dark:border-white/[0.08] flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-base font-extrabold text-foreground">Base de Contas Cadastradas</h3>
            <p className="text-xs text-muted-foreground">Listagem de clientes ativos e autorizados no ecossistema</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Search Pill */}
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar por nome ou documento..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-9 w-60 rounded-full border border-black/[0.08] dark:border-white/[0.10] bg-muted/30 pl-8 pr-3 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20"
              />
            </div>

            {/* Type Selector Pill */}
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="h-9 rounded-full border border-black/[0.08] dark:border-white/[0.10] bg-muted/30 px-3 text-xs font-semibold text-foreground focus:outline-none"
            >
              <option value="todos">Todos os tipos</option>
              <option value="IMOBILIARIA">Imobiliárias (PJ)</option>
              <option value="AUTONOMO">Autônomos (PF)</option>
            </select>

            {/* Status Selector Pill */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-9 rounded-full border border-black/[0.08] dark:border-white/[0.10] bg-muted/30 px-3 text-xs font-semibold text-foreground focus:outline-none"
            >
              <option value="todos">Todos os status</option>
              <option value="ativo">Ativos</option>
              <option value="pendente">Pendentes</option>
              <option value="suspenso">Suspensos</option>
            </select>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-black/[0.06] dark:border-white/[0.08] bg-muted/20 text-[10px] font-black uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="py-3 px-5">Conta / Cliente</th>
                <th className="py-3 px-4">Tipo</th>
                <th className="py-3 px-4">Documento</th>
                <th className="py-3 px-4">Plano</th>
                <th className="py-3 px-4 text-center">Corretores</th>
                <th className="py-3 px-4 text-center">Imóveis</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-5 text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/[0.04] dark:divide-white/[0.04]">
              {filtered.map((acc) => {
                const isMaster = acc.plan.includes("Master")
                const isSuspended = acc.status === "Suspenso"
                const isPending = acc.status === "Pendente"

                return (
                  <tr key={acc.id} className="hover:bg-muted/30 transition-colors">
                    <td className="py-3.5 px-5 font-bold text-foreground">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`h-8 w-8 rounded-xl flex items-center justify-center shrink-0 font-bold text-xs ${
                            acc.accountType === "IMOBILIARIA"
                              ? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                              : "bg-purple-500/10 text-purple-600 dark:text-purple-400"
                          }`}
                        >
                          {acc.accountType === "IMOBILIARIA" ? (
                            <Building2 className="h-4 w-4" />
                          ) : (
                            <User className="h-4 w-4" />
                          )}
                        </div>
                        <div>
                          <span className="block">{acc.name}</span>
                          <span className="text-[10px] text-muted-foreground font-normal">
                            Desde {acc.joinedAt}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                          acc.accountType === "IMOBILIARIA"
                            ? "bg-blue-500/10 text-blue-700 dark:text-blue-300"
                            : "bg-purple-500/10 text-purple-700 dark:text-purple-300"
                        }`}
                      >
                        {acc.accountType === "IMOBILIARIA" ? "PJ • Imobiliária" : "PF • Autônomo"}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 font-mono text-[11px] text-muted-foreground">
                      {acc.document}
                    </td>

                    <td className="py-3.5 px-4">
                      {isMaster ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/20 px-2.5 py-0.5 text-[10px] font-black uppercase">
                          <Crown className="h-3 w-3" />
                          {acc.plan}
                        </span>
                      ) : (
                        <span className="font-semibold text-foreground">
                          {acc.plan}
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-center font-bold text-foreground">
                      {acc.brokersCount}
                    </td>

                    <td className="py-3.5 px-4 text-center font-bold text-foreground">
                      {acc.propertiesCount}
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                          isSuspended
                            ? "bg-rose-500/10 text-rose-600 dark:text-rose-400"
                            : isPending
                            ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                            : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            isSuspended
                              ? "bg-rose-500"
                              : isPending
                              ? "bg-amber-500"
                              : "bg-emerald-500"
                          }`}
                        />
                        {acc.status}
                      </span>
                    </td>

                    <td className="py-3.5 px-5 text-right">
                      <button
                        onClick={() => toggleStatus(acc.id)}
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold transition-all ${
                          isSuspended
                            ? "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20"
                            : "bg-muted hover:bg-rose-500/10 hover:text-rose-600 text-muted-foreground"
                        }`}
                      >
                        {isSuspended ? (
                          <>
                            <Check className="h-3 w-3" /> Reativar
                          </>
                        ) : (
                          <>
                            <Ban className="h-3 w-3" /> Suspender
                          </>
                        )}
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
