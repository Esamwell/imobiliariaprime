"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  Users2,
  UserPlus,
  ShieldCheck,
  Building2,
  Building,
  DollarSign,
  Target,
  TrendingUp,
  Phone,
  Mail,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertCircle,
  Sparkles,
  ArrowUpRight,
  Crown,
  Kanban,
  Briefcase,
  Share2,
  ExternalLink,
  ChevronRight,
  MoreVertical,
  Check,
  Pause,
  Play,
  Trash2,
  Key
} from "lucide-react"
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

interface Broker {
  id: string
  name: string
  email: string
  phone: string
  creci: string
  role: string
  roleLabel: string
  commissionRate: number
  specialty: string
  status: string
  propertiesCount: number
  leadsCount: number
  vgvMonth: string
  avatar: string
  joinedAt: string
}

export default function TeamManagementPage() {
  const [team, setTeam] = useState<Broker[]>([])
  const [loading, setLoading] = useState(true)
  const [isAutonomo, setIsAutonomo] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("todos")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [planData, setPlanData] = useState<{
    plan: string
    planSubtitle?: string
    maxBrokers: number
    currentBrokers: number
    availableSeats: number
    isLimitReached: boolean
  }>({
    plan: "Plano Imobiliária",
    planSubtitle: "Chefe Master & Braços",
    maxBrokers: 10,
    currentBrokers: 6,
    availableSeats: 4,
    isLimitReached: false,
  })

  // Form State para adicionar novo corretor
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [creci, setCreci] = useState("")
  const [phone, setPhone] = useState("")
  const [commissionRate, setCommissionRate] = useState("50")
  const [specialty, setSpecialty] = useState("Alto Padrão & Vendas")
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const fetchTeam = async () => {
    try {
      const res = await fetch("/api/team")
      const data = await res.json()
      if (data.isAutonomo) {
        setIsAutonomo(true)
      } else {
        setIsAutonomo(false)
        const teamList = data.team || []
        setTeam(teamList)
        setPlanData({
          plan: data.plan || "Plano Imobiliária",
          planSubtitle: data.planSubtitle || "Chefe Master & Braços",
          maxBrokers: data.maxBrokers || 10,
          currentBrokers: teamList.length,
          availableSeats: data.availableSeats ?? Math.max(0, (data.maxBrokers || 10) - teamList.length),
          isLimitReached: Boolean(data.isLimitReached || teamList.length >= (data.maxBrokers || 10)),
        })
      }
    } catch (err) {
      console.error("Erro ao carregar equipe:", err)
    } finally {
      setLoading(false)
    }
  }

  const fetchUser = async () => {
    try {
      const res = await fetch("/api/auth/me")
      const data = await res.json()
      if (data.authenticated && data.user) {
        setCurrentUser(data.user)
        if (data.user.role === "AUTONOMO" || data.user.tenant?.type === "AUTONOMO") {
          setIsAutonomo(true)
        }
      }
    } catch { }
  }

  useEffect(() => {
    fetchUser()
    fetchTeam()
  }, [])

  const handleAddBroker = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email) return
    setSubmitting(true)
    setErrorMessage(null)

    try {
      const res = await fetch("/api/team", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          creci,
          phone,
          commissionRate,
          specialty,
        }),
      })

      const data = await res.json()
      if (res.ok && data.broker) {
        setTeam((prev) => [...prev, data.broker])
        setIsAddModalOpen(false)
        setName("")
        setEmail("")
        setCreci("")
        setPhone("")
        setCommissionRate("50")
        setSpecialty("Alto Padrão & Vendas")
        if (data.seats) {
          setPlanData((prev) => ({
            ...prev,
            currentBrokers: data.seats.current,
            availableSeats: data.seats.available,
            isLimitReached: data.seats.current >= prev.maxBrokers,
          }))
        }
      } else {
        setErrorMessage(data.error || "Não foi possível adicionar o corretor.")
      }
    } catch (err) {
      setErrorMessage("Erro ao conectar com o servidor.")
    } finally {
      setSubmitting(false)
    }
  }

  const handleToggleStatus = async (id: string) => {
    try {
      const res = await fetch("/api/team", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, action: "toggle-status" }),
      })
      if (res.ok) {
        setTeam((prev) =>
          prev.map((b) => {
            if (b.id === id) {
              const nextStatus = b.status === "Ativo" ? "Pausado" : "Ativo"
              return { ...b, status: nextStatus }
            }
            return b
          })
        )
      }
    } catch { }
  }

  const filteredTeam = team.filter((broker) => {
    const matchesSearch =
      broker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      broker.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      broker.creci.toLowerCase().includes(searchTerm.toLowerCase()) ||
      broker.specialty.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus =
      statusFilter === "todos" ||
      (statusFilter === "ativo" && (broker.status === "Ativo" || broker.status === "Em Atendimento")) ||
      (statusFilter === "pausado" && broker.status === "Pausado")

    return matchesSearch && matchesStatus
  })

  // CÁLCULO DE MÉTRICAS DA EQUIPE
  const totalBrokers = team.length
  const activeBrokers = team.filter((b) => b.status === "Ativo" || b.status === "Em Atendimento").length
  const totalPropertiesManaged = team.reduce((acc, curr) => acc + curr.propertiesCount, 0)
  const totalLeadsManaged = team.reduce((acc, curr) => acc + curr.leadsCount, 0)

  // SE FOR CORRETOR AUTÔNOMO (PLANO SOLO 1 LOGIN)
  if (isAutonomo) {
    return (
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* Header Solo */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                Meu Plano & Acesso Solo
              </h1>
              <span className="rounded-full bg-blue-500/20 text-blue-700 dark:text-blue-300 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider">
                Corretor Autônomo PF
              </span>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
              Você está operando com login individual exclusivo. Sem chefes, sem rateio de comissão com terceiros.
            </p>
          </div>

          <Link
            href="/v/roberto-dias"
            target="_blank"
            className="inline-flex items-center gap-2 rounded-full border border-black/[0.08] dark:border-white/[0.12] bg-white/70 dark:bg-white/[0.05] hover:bg-black/5 dark:hover:bg-white/10 px-4 py-2 text-xs font-bold text-foreground transition-all"
          >
            <Share2 className="h-4 w-4 text-lime-500" />
            Minha Vitrine Pessoal
          </Link>
        </div>

        {/* Solo Plan Spotlight Card */}
        <div className="rounded-3xl border border-blue-500/30 bg-gradient-to-br from-blue-500/10 via-card/90 to-background p-6 sm:p-8 backdrop-blur-xl shadow-lg space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-2xl bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center font-black text-2xl border border-blue-500/30">
                {currentUser?.name ? currentUser.name.slice(0, 2).toUpperCase() : "RD"}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-black text-foreground">{currentUser?.name || "Roberto Dias"}</h2>
                  <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full">
                    Login Ativo
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  CRECI {currentUser?.creci || "39.814-F"} • Corretor de Imóveis Independente
                </p>
                <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold mt-1">
                  100% de comissão direta sobre todos os fechamentos da sua carteira.
                </p>
              </div>
            </div>

            <div className="text-left md:text-right">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block">
                Plano Contratado
              </span>
              <span className="text-lg font-black text-foreground block">
                Corretor Solo Pro
              </span>
              <span className="text-xs text-muted-foreground">1 Usuário / Login Individual</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-border/50">
            <div className="p-4 rounded-2xl bg-muted/30 border border-border/40">
              <div className="text-xs font-semibold text-muted-foreground">Minha Carteira de Imóveis</div>
              <div className="text-2xl font-black text-foreground mt-1">28 Imóveis</div>
              <div className="text-[11px] text-muted-foreground mt-0.5">Ativos na sua vitrine pública</div>
            </div>

            <div className="p-4 rounded-2xl bg-muted/30 border border-border/40">
              <div className="text-xs font-semibold text-muted-foreground">Leads em Negociação</div>
              <div className="text-2xl font-black text-foreground mt-1">19 Clientes</div>
              <div className="text-[11px] text-muted-foreground mt-0.5">No seu funil Kanban pessoal</div>
            </div>

            <div className="p-4 rounded-2xl bg-muted/30 border border-border/40">
              <div className="text-xs font-semibold text-muted-foreground">Taxa de Comissão</div>
              <div className="text-2xl font-black text-emerald-500 mt-1">100% Direta</div>
              <div className="text-[11px] text-muted-foreground mt-0.5">Sem repasse ou desconto de agência</div>
            </div>
          </div>

          {/* Upgrade Banner for Solo Broker */}
          <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                <Building2 className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-foreground">
                  Quer crescer e contratar corretores para sua própria imobiliária?
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Faça upgrade para o <strong>Plano Imobiliária (Gestor Master)</strong> para adicionar corretores ilimitados, gerenciar a carteira de cada braço e centralizar os repasses da agência.
                </p>
              </div>
            </div>
            <Link
              href="/#precos"
              className="shrink-0 inline-flex items-center gap-2 rounded-full bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs px-5 py-2.5 shadow-md transition-all hover:scale-105"
            >
              <Crown className="h-4 w-4" />
              Ver Plano Imobiliária
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // SE FOR IMOBILIÁRIA (GESTOR MASTER / CHEFE GERENCIANDO SEUS CORRETORES / BRAÇOS)
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* 1. Header com Título, Indicador de Assentos e Ação de Adicionar Corretor */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              Minha Equipe & Corretores
            </h1>
            <span className="rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider">
              Painel do Chefe / Master
            </span>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Gerencie todos os corretores da <strong>Tactus Imobiliária</strong>: adicione novos braços de vendas, acompanhe imóveis atribuídos, leads ativos e fechamentos.
          </p>
        </div>

        <div className="flex items-center gap-4">
          {/* Indicador Visual de Capacidade / Assentos do Plano */}
          <div className="hidden sm:flex flex-col items-end text-right">
            <div className="flex items-center gap-1.5 text-xs font-bold text-foreground">
              <span className="text-muted-foreground font-semibold">Capacidade ({planData.plan}):</span>
              <span className={team.length >= planData.maxBrokers ? "text-amber-500 font-black" : "text-emerald-600 dark:text-emerald-400 font-black"}>
                {team.length} de {planData.maxBrokers} corretores
              </span>
            </div>
            <div className="w-44 h-2 rounded-full bg-muted/60 overflow-hidden mt-1.5 border border-border/40">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${
                  team.length >= planData.maxBrokers 
                    ? "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]" 
                    : "bg-emerald-500"
                }`}
                style={{ width: `${Math.min(100, (team.length / Math.max(1, planData.maxBrokers)) * 100)}%` }}
              />
            </div>
            <span className="text-[10px] text-muted-foreground mt-0.5">
              {team.length >= planData.maxBrokers 
                ? "Franquia esgotada • Upgrade necessário" 
                : `${Math.max(0, planData.maxBrokers - team.length)} assento(s) disponível(is)`}
            </span>
          </div>

          {/* Modal de Convidar / Adicionar Corretor */}
          <Dialog open={isAddModalOpen} onOpenChange={(open) => { setIsAddModalOpen(open); setErrorMessage(null) }}>
            <DialogTrigger asChild>
              <Button className="rounded-full bg-foreground text-background hover:bg-foreground/90 font-bold text-xs px-5 py-2.5 shadow-md transition-all hover:scale-105 inline-flex items-center gap-2">
                <UserPlus className="h-4 w-4" />
                + Adicionar Novo Corretor
              </Button>
            </DialogTrigger>

            <DialogContent className="max-w-md rounded-3xl p-6 sm:p-8">
              <DialogHeader>
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 mb-1">
                  <Building2 className="h-5 w-5" />
                  <span className="text-[11px] font-black uppercase tracking-wider">Contratação de Novo Braço de Vendas</span>
                </div>
                <DialogTitle className="text-xl font-black text-foreground">
                  Cadastrar Corretor na Imobiliária
                </DialogTitle>
                <DialogDescription className="text-xs text-muted-foreground">
                  O corretor receberá acesso corporativo com login próprio vinculado à sua imobiliária para gerenciar seus imóveis e leads atribuídos.
                </DialogDescription>
              </DialogHeader>

              {/* ALERTA DE CAPACIDADE MÁXIMA SE ATINGIR O LIMITE */}
              {team.length >= planData.maxBrokers && (
                <div className="rounded-2xl border border-amber-500/40 bg-amber-500/10 p-4 text-xs space-y-2 mt-2">
                  <div className="flex items-center gap-2 font-black text-amber-600 dark:text-amber-400">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>Limite de {planData.maxBrokers} corretores atingido ({planData.plan})</span>
                  </div>
                  <p className="text-muted-foreground text-[11px] leading-relaxed">
                    Você já atingiu a capacidade máxima de <strong>{planData.maxBrokers} corretores</strong> contratados no seu <strong>{planData.plan}</strong>. Para cadastrar novos membros à equipe, faça upgrade para o Plano Enterprise ou contrate assentos adicionais.
                  </p>
                  <div className="pt-1 flex items-center gap-3">
                    <Link
                      href="/#precos"
                      target="_blank"
                      className="inline-flex items-center gap-1 text-[11px] font-extrabold text-amber-600 dark:text-amber-400 underline hover:opacity-80"
                    >
                      Ver Planos & Módulos Extras →
                    </Link>
                  </div>
                </div>
              )}

              {errorMessage && (
                <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-3.5 text-xs text-red-600 dark:text-red-400 flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleAddBroker} className="space-y-4 pt-2">
                <div>
                  <label className="text-xs font-bold text-foreground block mb-1">Nome Completo do Corretor *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Rodrigo Mendes de Paula"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-2xl border border-border/80 bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-lime-500/30"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-foreground block mb-1">E-mail de Acesso *</label>
                    <input
                      type="email"
                      required
                      placeholder="rodrigo@tactus.com.br"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-2xl border border-border/80 bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-lime-500/30"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-foreground block mb-1">Número CRECI *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: 58.912-F"
                      value={creci}
                      onChange={(e) => setCreci(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-2xl border border-border/80 bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-lime-500/30"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-foreground block mb-1">WhatsApp / Telefone</label>
                    <input
                      type="text"
                      placeholder="(11) 98765-4321"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-2xl border border-border/80 bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-lime-500/30"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-foreground block mb-1">Comissão do Corretor (%)</label>
                    <select
                      value={commissionRate}
                      onChange={(e) => setCommissionRate(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-2xl border border-border/80 bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-lime-500/30"
                    >
                      <option value="40">40% Corretor / 60% Imobiliária</option>
                      <option value="50">50% Corretor / 50% Imobiliária</option>
                      <option value="60">60% Corretor / 40% Imobiliária</option>
                      <option value="70">70% Corretor / 30% Imobiliária</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-foreground block mb-1">Especialidade / Foco de Atuação</label>
                  <select
                    value={specialty}
                    onChange={(e) => setSpecialty(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-2xl border border-border/80 bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-lime-500/30"
                  >
                    <option value="Alto Padrão & Coberturas">Alto Padrão & Coberturas</option>
                    <option value="Lançamentos & Planta">Lançamentos & Planta</option>
                    <option value="Locação Comercial & Corporativa">Locação Comercial & Corporativa</option>
                    <option value="Condomínios Fechados & Casas">Condomínios Fechados & Casas</option>
                    <option value="Vendas Gerais & Captação">Vendas Gerais & Captação</option>
                  </select>
                </div>

                <DialogFooter className="pt-3">
                  <Button
                    type="submit"
                    disabled={submitting || team.length >= planData.maxBrokers}
                    className="w-full rounded-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs py-2.5"
                  >
                    {submitting 
                      ? "Adicionando..." 
                      : team.length >= planData.maxBrokers 
                        ? `Limite de ${planData.maxBrokers} corretores atingido` 
                        : "Confirmar e Liberar Acesso"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* 2. KPIs de Performance da Equipe da Imobiliária (Apple Glass Cards) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Card 1: Corretores Ativos */}
        <div className="glass-card rounded-3xl p-4 sm:p-5 border border-black/[0.06] dark:border-white/[0.08] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
              Corretores na Equipe
            </span>
            <div className="h-8 w-8 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Users2 className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-black text-foreground">
              {totalBrokers} <span className="text-sm font-semibold text-muted-foreground">/ {planData.maxBrokers} vagas</span>
            </div>
            <div className="text-[11px] text-muted-foreground mt-0.5 flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{activeBrokers} corretores operando hoje</span>
            </div>
          </div>
        </div>

        {/* Card 2: VGV Total Fechado pela Equipe */}
        <div className="glass-card rounded-3xl p-4 sm:p-5 border border-black/[0.06] dark:border-white/[0.08] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
              VGV do Time (Mês)
            </span>
            <div className="h-8 w-8 rounded-full bg-lime-500/10 text-lime-600 dark:text-lime-400 flex items-center justify-center">
              <TrendingUp className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-black text-foreground">
              R$ 9.75M
            </div>
            <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold mt-0.5 flex items-center gap-1">
              <ArrowUpRight className="h-3 w-3" />
              <span>+18.4% vs mês anterior</span>
            </div>
          </div>
        </div>

        {/* Card 3: Imóveis Atribuídos aos Braços */}
        <div className="glass-card rounded-3xl p-4 sm:p-5 border border-black/[0.06] dark:border-white/[0.08] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
              Imóveis sob Gestão
            </span>
            <div className="h-8 w-8 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Building className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-black text-foreground">
              {totalPropertiesManaged}
            </div>
            <div className="text-[11px] text-muted-foreground mt-0.5">
              Distribuídos entre seus corretores
            </div>
          </div>
        </div>

        {/* Card 4: Clientes & Leads Ativos */}
        <div className="glass-card rounded-3xl p-4 sm:p-5 border border-black/[0.06] dark:border-white/[0.08] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
              Leads em Atendimento
            </span>
            <div className="h-8 w-8 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <Kanban className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-black text-foreground">
              {totalLeadsManaged} Leads
            </div>
            <div className="text-[11px] text-purple-600 dark:text-purple-400 font-semibold mt-0.5">
              No funil Kanban dos corretores
            </div>
          </div>
        </div>
      </div>

      {/* 3. Filtros e Busca */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-2 rounded-2xl bg-card border border-border/50">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar por corretor, CRECI ou foco..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-muted/40 border-0 focus:outline-none focus:ring-1 focus:ring-foreground"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            onClick={() => setStatusFilter("todos")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${statusFilter === "todos"
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:bg-muted/50"
              }`}
          >
            Todos ({team.length})
          </button>
          <button
            onClick={() => setStatusFilter("ativo")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${statusFilter === "ativo"
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:bg-muted/50"
              }`}
          >
            Ativos ({activeBrokers})
          </button>
          <button
            onClick={() => setStatusFilter("pausado")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${statusFilter === "pausado"
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:bg-muted/50"
              }`}
          >
            Pausados ({team.filter((b) => b.status === "Pausado").length})
          </button>
        </div>
      </div>

      {/* 4. Lista dos Corretores da Imobiliária (Gestão dos Braços) */}
      <div className="space-y-3">
        {filteredTeam.map((broker) => {
          const isChief = broker.role === "GESTOR"

          return (
            <div
              key={broker.id}
              className={`rounded-3xl border p-4 sm:p-5 transition-all bg-card/80 backdrop-blur-md hover:shadow-md ${isChief
                  ? "border-emerald-500/40 bg-emerald-500/[0.03]"
                  : "border-border/60 hover:border-border"
                }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Perfil e Identificação */}
                <div className="flex items-center gap-3.5">
                  <div
                    className={`h-12 w-12 rounded-2xl flex items-center justify-center font-black text-sm shrink-0 border ${isChief
                        ? "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-500/30 ring-2 ring-emerald-500/20"
                        : "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20"
                      }`}
                  >
                    {broker.avatar}
                  </div>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-extrabold text-sm sm:text-base text-foreground">
                        {broker.name}
                      </h3>
                      {isChief ? (
                        <span className="rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 text-[9px] font-black uppercase tracking-wider flex items-center gap-1">
                          <Crown className="h-3 w-3" /> Chefe da Imobiliária (Master)
                        </span>
                      ) : (
                        <span className="rounded-full bg-muted text-muted-foreground px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider">
                          Corretor Vinculado
                        </span>
                      )}
                      <span
                        className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold ${broker.status === "Ativo"
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                            : broker.status === "Em Atendimento"
                              ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                              : "bg-red-500/10 text-red-600 dark:text-red-400"
                          }`}
                      >
                        ● {broker.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1 flex-wrap">
                      <span className="font-semibold text-foreground">CRECI {broker.creci}</span>
                      <span>•</span>
                      <span>{broker.specialty}</span>
                      <span>•</span>
                      <span>Comissão: <strong>{broker.commissionRate}%</strong></span>
                    </div>
                  </div>
                </div>

                {/* Métricas do Corretor (O que ele está fazendo) */}
                <div className="grid grid-cols-3 gap-2 sm:gap-4 border-y lg:border-y-0 lg:border-x border-border/40 py-3 lg:py-0 lg:px-6">
                  <div className="text-center lg:text-left">
                    <span className="text-[10px] text-muted-foreground font-semibold block uppercase">
                      Imóveis
                    </span>
                    <span className="text-base sm:text-lg font-black text-foreground">
                      {broker.propertiesCount}
                    </span>
                  </div>

                  <div className="text-center lg:text-left">
                    <span className="text-[10px] text-muted-foreground font-semibold block uppercase">
                      Leads Funil
                    </span>
                    <span className="text-base sm:text-lg font-black text-foreground">
                      {broker.leadsCount}
                    </span>
                  </div>

                  <div className="text-center lg:text-left">
                    <span className="text-[10px] text-muted-foreground font-semibold block uppercase">
                      VGV Mês
                    </span>
                    <span className="text-base sm:text-lg font-black text-emerald-600 dark:text-emerald-400">
                      {broker.vgvMonth}
                    </span>
                  </div>
                </div>

                {/* Ações do Chefe sobre o Corretor */}
                <div className="flex items-center gap-2 justify-end">
                  <a
                    href={`https://wa.me/55${broker.phone.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl border border-border/60 hover:bg-muted text-muted-foreground hover:text-emerald-500 transition-colors"
                    title="Falar no WhatsApp"
                  >
                    <Phone className="h-4 w-4" />
                  </a>

                  <Link
                    href={`/dashboard/imoveis?broker=${broker.id}`}
                    className="px-3 py-1.5 rounded-xl border border-border/60 hover:bg-muted text-xs font-bold text-foreground transition-colors hidden sm:inline-flex items-center gap-1.5"
                    title="Ver imóveis atribuídos a este corretor"
                  >
                    <Building className="h-3.5 w-3.5" />
                    <span>Imóveis</span>
                  </Link>

                  <Link
                    href={`/dashboard/pipeline?broker=${broker.id}`}
                    className="px-3 py-1.5 rounded-xl border border-border/60 hover:bg-muted text-xs font-bold text-foreground transition-colors hidden sm:inline-flex items-center gap-1.5"
                    title="Ver funil de clientes deste corretor"
                  >
                    <Kanban className="h-3.5 w-3.5" />
                    <span>Funil</span>
                  </Link>

                  {!isChief && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleToggleStatus(broker.id)}
                      className="text-xs font-bold text-muted-foreground hover:text-foreground"
                    >
                      {broker.status === "Ativo" ? (
                        <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400">
                          <Pause className="h-3 w-3" /> Pausar
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                          <Play className="h-3 w-3" /> Ativar
                        </span>
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )
        })}

        {filteredTeam.length === 0 && (
          <div className="p-12 text-center rounded-3xl border border-dashed border-border/60 bg-muted/20">
            <Users2 className="h-10 w-10 mx-auto text-muted-foreground/50 mb-3" />
            <h4 className="text-sm font-bold text-foreground">Nenhum corretor encontrado</h4>
            <p className="text-xs text-muted-foreground mt-1">
              Tente ajustar sua busca ou adicione um novo corretor à imobiliária.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

