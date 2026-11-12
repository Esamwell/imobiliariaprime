"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Check, CreditCard, DollarSign, TrendingUp, Zap, Crown, Lock, User, Building2, Sparkles } from "lucide-react"

interface Plan {
  id: string
  name: string
  target: "Corretor Autônomo" | "Imobiliária" | "Super Admin VIP"
  price: string
  period: string
  description: string
  features: string[]
  activeCount: number
  highlight: boolean
  isMaster?: boolean
}

const initialPlans: Plan[] = [
  {
    id: "plan-autonomo",
    name: "Autônomo Pro",
    target: "Corretor Autônomo",
    price: "R$ 190",
    period: "/mês",
    description: "Projetado sob medida para o corretor que opera de forma independente.",
    features: [
      "1 Corretor Autônomo (CPF / CRECI)",
      "Até 60 imóveis ativos no portfólio",
      "Funil de Vendas Kanban individual",
      "Disparo no WhatsApp com 1 clique",
      "Busca automática de CEP (ViaCEP)",
      "Suporte via WhatsApp",
    ],
    activeCount: 42,
    highlight: false,
  },
  {
    id: "plan-basico",
    name: "Imobiliária Básico",
    target: "Imobiliária",
    price: "R$ 490",
    period: "/mês",
    description: "Para pequenas imobiliárias locais iniciando a digitalização.",
    features: [
      "Até 5 corretores cadastrados",
      "Até 150 imóveis cadastrados",
      "Gestão de aluguéis e boletos",
      "Pipeline de vendas compartilhado",
      "Suporte por e-mail e chat",
    ],
    activeCount: 68,
    highlight: false,
  },
  {
    id: "plan-pro",
    name: "Imobiliária Profissional",
    target: "Imobiliária",
    price: "R$ 1.250",
    period: "/mês",
    description: "Para imobiliárias consolidadas que buscam automações e escala.",
    features: [
      "Até 25 corretores na equipe",
      "Até 600 imóveis cadastrados",
      "Módulo financeiro e comissões",
      "Controle de reajustes (IGP-M/IPCA)",
      "Gestão multi-usuários e permissões",
      "Suporte prioritário",
    ],
    activeCount: 112,
    highlight: true,
  },
  {
    id: "plan-enterprise",
    name: "Enterprise",
    target: "Imobiliária",
    price: "R$ 2.890",
    period: "/mês",
    description: "Para redes de imobiliárias, franquias e incorporadoras.",
    features: [
      "Corretores ilimitados",
      "Imóveis ilimitados",
      "Multi-filiais e multi-contas",
      "API aberta e webhooks",
      "Exportação para portais (ZAP, VivaReal)",
      "Gerente de contas dedicado",
    ],
    activeCount: 30,
    highlight: false,
  },
  {
    id: "plan-master",
    name: "Master VIP",
    target: "Super Admin VIP",
    price: "Concessão Direta",
    period: "(Cortesia / Parceria)",
    description: "Plano exclusivo controlado pelo Super Admin. Não é exibido publicamente para contratação.",
    features: [
      "🔒 Oculto na vitrine de contratação",
      "Atribuição exclusiva pelo Super Admin",
      "Funções idênticas ao Enterprise (Ilimitado)",
      "Corretores e Imóveis ILIMITADOS",
      "Aplicável tanto a Imobiliárias quanto a Corretores",
      "Isenção de mensalidade ou valor sob medida",
    ],
    activeCount: 8,
    highlight: false,
    isMaster: true,
  },
]

export default function SubscriptionsPage() {
  const [plans, setPlans] = useState<Plan[]>(initialPlans)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null)
  const [categoryFilter, setCategoryFilter] = useState("todos")

  // Form State
  const [name, setName] = useState("")
  const [target, setTarget] = useState<"Corretor Autônomo" | "Imobiliária">("Corretor Autônomo")
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")

  const handleCreatePlan = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !price) return

    const newPlan: Plan = {
      id: Date.now().toString(),
      name,
      target,
      price: price.startsWith("R$") ? price : `R$ ${price}`,
      period: "/mês",
      description: description || "Plano personalizado",
      features: ["Acesso completo ao CRM", "Suporte prioritário"],
      activeCount: 0,
      highlight: false,
    }

    setPlans([...plans, newPlan])
    setIsDialogOpen(false)
    setName("")
    setPrice("")
    setDescription("")
  }

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingPlan) return

    setPlans((prev) =>
      prev.map((p) => (p.id === editingPlan.id ? editingPlan : p))
    )
    setEditingPlan(null)
  }

  const filteredPlans = plans.filter((p) => {
    if (categoryFilter === "todos") return true
    if (categoryFilter === "autonomo") return p.target === "Corretor Autônomo"
    if (categoryFilter === "imobiliaria") return p.target === "Imobiliária"
    if (categoryFilter === "master") return p.isMaster
    return true
  })

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Planos & Assinaturas</h1>
          <p className="text-sm text-muted-foreground">
            Gerenciamento de planos comerciais para Imobiliárias, Corretores Autônomos e concessão do Plano Master VIP.
          </p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Criar Novo Plano
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Criar Novo Plano Comercial</DialogTitle>
              <DialogDescription>
                Defina os parâmetros para autônomos ou imobiliárias.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleCreatePlan} className="space-y-3 pt-2">
              <div className="space-y-1">
                <label className="text-xs font-semibold">Nome do Plano</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Start Autônomo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold">Público-Alvo</label>
                  <select
                    value={target}
                    onChange={(e) => setTarget(e.target.value as any)}
                    className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  >
                    <option value="Corretor Autônomo">Corretor Autônomo</option>
                    <option value="Imobiliária">Imobiliária</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold">Valor Mensal (R$)</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: 290"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold">Descrição</label>
                <input
                  type="text"
                  placeholder="Perfil indicado para este plano..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
              </div>

              <DialogFooter className="pt-3">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit">Salvar Plano</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">MRR (Faturamento Recorrente)</CardTitle>
            <DollarSign className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 292.480</div>
            <p className="text-xs text-emerald-600 flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3" /> +9.2% este mês
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Imobiliárias Ativas</CardTitle>
            <Building2 className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">210</div>
            <p className="text-xs text-muted-foreground mt-1">Contas corporativas</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Corretores Autônomos</CardTitle>
            <User className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">42</div>
            <p className="text-xs text-muted-foreground mt-1">Profissionais independentes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Contas Plano Master</CardTitle>
            <Crown className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-500">8</div>
            <p className="text-xs text-muted-foreground mt-1">VIPs concedidos manualmente</p>
          </CardContent>
        </Card>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b pb-2">
        <Button
          variant={categoryFilter === "todos" ? "default" : "outline"}
          size="sm"
          onClick={() => setCategoryFilter("todos")}
          className="text-xs h-8"
        >
          Todos os Planos ({plans.length})
        </Button>
        <Button
          variant={categoryFilter === "autonomo" ? "default" : "outline"}
          size="sm"
          onClick={() => setCategoryFilter("autonomo")}
          className="text-xs h-8"
        >
          Corretores Autônomos
        </Button>
        <Button
          variant={categoryFilter === "imobiliaria" ? "default" : "outline"}
          size="sm"
          onClick={() => setCategoryFilter("imobiliaria")}
          className="text-xs h-8"
        >
          Imobiliárias (PJ)
        </Button>
        <Button
          variant={categoryFilter === "master" ? "default" : "outline"}
          size="sm"
          onClick={() => setCategoryFilter("master")}
          className="text-xs h-8 border-amber-500/50 text-amber-600 dark:text-amber-400"
        >
          <Crown className="h-3.5 w-3.5 mr-1" /> Master VIP (Exclusivo Super Admin)
        </Button>
      </div>

      {/* Plans Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredPlans.map((plan) => (
          <Card
            key={plan.id}
            className={`relative flex flex-col transition-all ${
              plan.isMaster
                ? "border-2 border-amber-500/80 bg-gradient-to-b from-amber-500/5 via-card to-card shadow-lg shadow-amber-500/10"
                : plan.highlight
                ? "border-primary shadow-md"
                : ""
            }`}
          >
            {plan.isMaster && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-amber-500 text-slate-950 px-3 py-1 text-xs font-bold flex items-center gap-1 shadow">
                <Crown className="h-3.5 w-3.5" /> Exclusivo Super Admin (Oculto)
              </span>
            )}
            {plan.highlight && !plan.isMaster && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                Mais Popular
              </span>
            )}
            <CardHeader className="pt-6">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl flex items-center gap-2">
                  {plan.name}
                  {plan.isMaster && <Sparkles className="h-4 w-4 text-amber-500" />}
                </CardTitle>
                <span className="rounded bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                  {plan.target}
                </span>
              </div>
              <CardDescription className="text-xs mt-1">{plan.description}</CardDescription>
              <div className="mt-4 flex items-baseline">
                <span className={`text-3xl font-extrabold tracking-tight ${plan.isMaster ? "text-amber-500" : ""}`}>
                  {plan.price}
                </span>
                <span className="ml-1 text-xs text-muted-foreground">{plan.period}</span>
              </div>
              <p className="text-xs font-medium text-primary mt-1">
                {plan.activeCount} contas utilizando este plano
              </p>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col justify-between space-y-6">
              <ul className="space-y-2.5 text-xs">
                {plan.features.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    {plan.isMaster ? (
                      <Crown className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                    ) : (
                      <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                    )}
                    <span className={plan.isMaster ? "font-medium" : ""}>{feat}</span>
                  </li>
                ))}
              </ul>
              <Button
                variant={plan.isMaster ? "default" : plan.highlight ? "default" : "outline"}
                className={`w-full ${
                  plan.isMaster
                    ? "bg-amber-500 text-slate-950 hover:bg-amber-400 font-bold"
                    : ""
                }`}
                onClick={() => setEditingPlan(plan)}
              >
                {plan.isMaster ? "Configurar Benefícios Master" : "Editar Plano"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Plan Dialog */}
      {editingPlan && (
        <Dialog open={Boolean(editingPlan)} onOpenChange={() => setEditingPlan(null)}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Editar {editingPlan.name}</DialogTitle>
              <DialogDescription>Ajuste os parâmetros deste plano.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSaveEdit} className="space-y-3 pt-2">
              <div className="space-y-1">
                <label className="text-xs font-semibold">Valor / Condição</label>
                <input
                  type="text"
                  required
                  value={editingPlan.price}
                  onChange={(e) => setEditingPlan({ ...editingPlan, price: e.target.value })}
                  className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold">Descrição</label>
                <input
                  type="text"
                  value={editingPlan.description}
                  onChange={(e) => setEditingPlan({ ...editingPlan, description: e.target.value })}
                  className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm"
                />
              </div>
              <DialogFooter className="pt-3">
                <Button type="button" variant="outline" onClick={() => setEditingPlan(null)}>
                  Cancelar
                </Button>
                <Button type="submit">Salvar Alterações</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
