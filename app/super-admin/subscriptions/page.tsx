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
  Check, 
  CreditCard, 
  DollarSign, 
  TrendingUp, 
  Zap, 
  Crown, 
  Lock, 
  User, 
  Building2, 
  Sparkles,
  Plus,
  ArrowUpRight,
  Filter,
  CheckCircle2
} from "lucide-react"

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
    price: "R$ 89",
    period: "/mês",
    description: "Projetado sob medida para o corretor autônomo individual.",
    features: [
      "1 Corretor Autônomo (CPF / CRECI)",
      "Até 50 imóveis ativos no portfólio",
      "Vitrine Pública Exclusiva (/v/seu-nome)",
      "Funil de Vendas Kanban individual",
      "Disparo no WhatsApp com 1 clique",
      "Preenchimento automático por CEP (ViaCEP)",
      "App Mobile PWA com notificações push",
      "Suporte via WhatsApp",
    ],
    activeCount: 42,
    highlight: false,
  },
  {
    id: "plan-basico",
    name: "Imobiliária Básico",
    target: "Imobiliária",
    price: "R$ 149",
    period: "/mês",
    description: "Para pequenas imobiliárias locais iniciando a digitalização.",
    features: [
      "Até 3 corretores cadastrados",
      "Até 100 imóveis cadastrados",
      "Gestão básica de aluguéis e boletos",
      "Pipeline de vendas compartilhado",
      "Suporte por e-mail e chat",
    ],
    activeCount: 68,
    highlight: false,
  },
  {
    id: "plan-pro",
    name: "Plano Imobiliária Pro",
    target: "Imobiliária",
    price: "R$ 249",
    period: "/mês",
    description: "Para imobiliárias consolidadas que buscam automações e escala.",
    features: [
      "Até 10 corretores na equipe",
      "Imóveis e Carteira ILIMITADOS",
      "Vitrine Geral + Vitrines dos Corretores",
      "Gestão de Aluguéis e reajuste IGP-M/IPCA",
      "Divisão automatizada de comissões",
      "Simulador de financiamento bancário",
      "Suporte Prioritário VIP",
    ],
    activeCount: 112,
    highlight: true,
  },
  {
    id: "plan-enterprise",
    name: "Master Enterprise",
    target: "Imobiliária",
    price: "R$ 589",
    period: "/mês",
    description: "Para redes de imobiliárias, franquias e incorporadoras.",
    features: [
      "Corretores e Filiais ILIMITADOS",
      "Imóveis e Armazenamento ILIMITADOS",
      "Múltiplas Vitrines e Domínio Próprio",
      "Assinatura Eletrônica de Contratos",
      "Integração com Portais (ZAP, VivaReal, OLX)",
      "Gerente de contas dedicado",
    ],
    activeCount: 30,
    highlight: false,
  },
  {
    id: "plan-master",
    name: "Master VIP Super Admin",
    target: "Super Admin VIP",
    price: "Concessão Direta",
    period: "(Cortesia / Parceria)",
    description: "Plano exclusivo controlado pelo Super Admin. Concessão irrestrita sem cobrança automática.",
    features: [
      "🔒 Oculto na vitrine de contratação",
      "Atribuição exclusiva pelo Super Admin",
      "Funções idênticas ao Enterprise (Ilimitado)",
      "Corretores e Imóveis ILIMITADOS",
      "Aplicável tanto a Imobiliárias quanto a Corretores",
      "Isenção total de mensalidade",
    ],
    activeCount: 8,
    highlight: false,
    isMaster: true,
  },
]

export default function SubscriptionsPage() {
  const [plans, setPlans] = useState<Plan[]>(initialPlans)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
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
      description: description || "Plano comercial personalizado",
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

  const filteredPlans = plans.filter((p) => {
    if (categoryFilter === "todos") return true
    if (categoryFilter === "autonomo") return p.target === "Corretor Autônomo"
    if (categoryFilter === "imobiliaria") return p.target === "Imobiliária"
    if (categoryFilter === "master") return p.isMaster
    return true
  })

  return (
    <div className="flex-1 space-y-6 p-4 sm:p-6 max-w-7xl mx-auto">
      {/* Header Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              Planos & Assinaturas
            </h1>
            <span className="rounded-full bg-purple-500/10 text-purple-700 dark:text-purple-300 px-2.5 py-0.5 text-[10px] font-black uppercase">
              Monetização
            </span>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Gerenciamento de planos comerciais para Imobiliárias (PJ), Autônomos (PF) e concessão do Plano Master VIP.
          </p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <button className="inline-flex items-center gap-2 rounded-full bg-foreground text-background hover:bg-foreground/90 px-5 py-2.5 text-xs font-bold shadow-md transition-all hover:scale-102">
              <Plus className="h-4 w-4" />
              <span>Criar Novo Plano</span>
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-md rounded-[28px] border border-black/[0.08] dark:border-white/[0.12] bg-background/95 backdrop-blur-2xl p-6 shadow-2xl">
            <DialogHeader>
              <DialogTitle className="text-lg font-black text-foreground">Criar Novo Plano Comercial</DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground">
                Defina as regras de precificação e limites para o plano.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleCreatePlan} className="space-y-3.5 pt-2">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                  Nome do Plano
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Plano Expansão Regional"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-10 rounded-2xl border border-black/[0.08] dark:border-white/[0.10] bg-muted/20 px-3.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                  Público Alvo
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setTarget("Corretor Autônomo")}
                    className={`p-2.5 rounded-2xl border text-xs font-bold transition-all ${
                      target === "Corretor Autônomo"
                        ? "border-foreground bg-foreground text-background"
                        : "border-black/[0.08] dark:border-white/[0.10] bg-muted/30 text-muted-foreground"
                    }`}
                  >
                    Corretor Autônomo (PF)
                  </button>
                  <button
                    type="button"
                    onClick={() => setTarget("Imobiliária")}
                    className={`p-2.5 rounded-2xl border text-xs font-bold transition-all ${
                      target === "Imobiliária"
                        ? "border-foreground bg-foreground text-background"
                        : "border-black/[0.08] dark:border-white/[0.10] bg-muted/30 text-muted-foreground"
                    }`}
                  >
                    Imobiliária (PJ)
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                  Valor Mensal (R$)
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: 349"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full h-10 rounded-2xl border border-black/[0.08] dark:border-white/[0.10] bg-muted/20 px-3.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                  Descrição Breve
                </label>
                <textarea
                  rows={2}
                  placeholder="Descreva a finalidade deste plano..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full rounded-2xl border border-black/[0.08] dark:border-white/[0.10] bg-muted/20 p-3 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20"
                />
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
                  Criar Plano
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
              Receita Mensal MRR
            </span>
            <div className="h-8 w-8 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <DollarSign className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">
              R$ 284.500
            </div>
            <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold mt-0.5">+8.1% vs mês anterior</p>
          </div>
        </div>

        <div className="glass-card glass-card-hover rounded-3xl p-4 sm:p-5 flex flex-col justify-between border border-black/[0.06] dark:border-white/[0.08]">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
              Assinaturas Pagas
            </span>
            <div className="h-8 w-8 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <CreditCard className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">
              {plans.reduce((acc, p) => acc + (p.isMaster ? 0 : p.activeCount), 0)}
            </div>
            <p className="text-[11px] text-muted-foreground mt-0.5">Em cobrança recorrente</p>
          </div>
        </div>

        <div className="glass-card glass-card-hover rounded-3xl p-4 sm:p-5 flex flex-col justify-between border border-black/[0.06] dark:border-white/[0.08]">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
              Ticket Médio
            </span>
            <div className="h-8 w-8 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <TrendingUp className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">
              R$ 1.350
            </div>
            <p className="text-[11px] text-muted-foreground mt-0.5">Por conta ativa/mês</p>
          </div>
        </div>

        <div className="glass-card glass-card-hover rounded-3xl p-4 sm:p-5 flex flex-col justify-between border border-black/[0.06] dark:border-white/[0.08]">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
              Master VIP Atribuídos
            </span>
            <div className="h-8 w-8 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Crown className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-black tracking-tight text-amber-500">
              8 Contas
            </div>
            <p className="text-[11px] text-muted-foreground mt-0.5">Concessão do Super Admin</p>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setCategoryFilter("todos")}
          className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
            categoryFilter === "todos"
              ? "bg-foreground text-background shadow-sm"
              : "border border-black/[0.08] dark:border-white/[0.10] bg-muted/30 text-muted-foreground hover:text-foreground"
          }`}
        >
          Todos os Planos ({plans.length})
        </button>
        <button
          onClick={() => setCategoryFilter("autonomo")}
          className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
            categoryFilter === "autonomo"
              ? "bg-foreground text-background shadow-sm"
              : "border border-black/[0.08] dark:border-white/[0.10] bg-muted/30 text-muted-foreground hover:text-foreground"
          }`}
        >
          Autônomos (PF)
        </button>
        <button
          onClick={() => setCategoryFilter("imobiliaria")}
          className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
            categoryFilter === "imobiliaria"
              ? "bg-foreground text-background shadow-sm"
              : "border border-black/[0.08] dark:border-white/[0.10] bg-muted/30 text-muted-foreground hover:text-foreground"
          }`}
        >
          Imobiliárias (PJ)
        </button>
        <button
          onClick={() => setCategoryFilter("master")}
          className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
            categoryFilter === "master"
              ? "bg-amber-500 text-black shadow-sm font-extrabold"
              : "border border-black/[0.08] dark:border-white/[0.10] bg-muted/30 text-muted-foreground hover:text-foreground"
          }`}
        >
          <Crown className="h-3.5 w-3.5" />
          <span>Exclusivo Master VIP</span>
        </button>
      </div>

      {/* Plan Cards in Apple Prime Glass */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredPlans.map((p) => {
          const isMaster = p.isMaster
          const isHighlight = p.highlight

          return (
            <div
              key={p.id}
              className={`rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 relative ${
                isMaster
                  ? "border border-amber-500/30 bg-gradient-to-b from-amber-500/[0.08] via-background to-background backdrop-blur-xl shadow-lg"
                  : isHighlight
                  ? "border-2 border-lime-400/80 bg-lime-400/[0.04] backdrop-blur-xl shadow-xl shadow-lime-400/10"
                  : "glass-card border border-black/[0.06] dark:border-white/[0.08]"
              }`}
            >
              {isMaster && (
                <div className="absolute -top-3 right-6">
                  <span className="rounded-full bg-amber-500 text-black px-3 py-0.5 text-[10px] font-black uppercase tracking-wider shadow-sm flex items-center gap-1">
                    <Crown className="h-3 w-3" /> Exclusivo Super Admin
                  </span>
                </div>
              )}

              {isHighlight && (
                <div className="absolute -top-3 right-6">
                  <span className="rounded-full bg-lime-400 text-black px-3 py-0.5 text-[10px] font-black uppercase tracking-wider shadow-sm">
                    Mais Popular (PJ)
                  </span>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    {p.target}
                  </span>
                  <h3 className="text-xl font-black text-foreground mt-0.5 flex items-center gap-2">
                    {p.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    {p.description}
                  </p>
                </div>

                <div className="pt-2 pb-1 border-b border-black/[0.06] dark:border-white/[0.08]">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black tracking-tight text-foreground">
                      {p.price}
                    </span>
                    <span className="text-xs text-muted-foreground font-semibold">
                      {p.period}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-2 text-xs font-bold text-foreground">
                    <div className="h-2 w-2 rounded-full bg-emerald-500" />
                    <span>{p.activeCount} assinaturas ativas</span>
                  </div>
                </div>

                <div className="space-y-2 pt-1">
                  <span className="text-[10px] font-black uppercase tracking-wider text-muted-foreground block">
                    Benefícios Inclusos:
                  </span>
                  <ul className="space-y-1.5 text-xs text-muted-foreground">
                    {p.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="leading-tight text-foreground/90">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-6 border-t border-black/[0.06] dark:border-white/[0.08] mt-6 flex items-center gap-2">
                <button
                  onClick={() => alert(`Plano ${p.name} selecionado para edição de parâmetros.`)}
                  className="flex-1 py-2.5 px-4 rounded-full border border-black/[0.08] dark:border-white/[0.10] bg-muted/40 hover:bg-muted/70 text-xs font-bold text-foreground transition-all"
                >
                  Editar Parâmetros
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
