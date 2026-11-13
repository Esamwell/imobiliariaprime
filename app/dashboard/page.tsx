"use client"

import { useState } from "react"
import Link from "next/link"
import { 
  Building, 
  DollarSign, 
  Users, 
  Calendar, 
  ArrowUpRight, 
  Phone, 
  Plus, 
  Clock, 
  CheckCircle2, 
  MapPin, 
  Flame,
  ChevronRight,
  Share2,
  FileText,
  Target,
  Sparkles,
  ArrowRight,
  Check,
  MessageSquare,
  Search
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

interface Appointment {
  id: string
  time: string
  title: string
  location: string
  contact: string
  urgent?: boolean
}

const initialAppointments: Appointment[] = [
  { id: "1", time: "10:00", title: "Visita com Dr. Marcelo (Mansão Alphaville)", location: "Alameda dos Ipês, 450 - Alphaville", contact: "Dr. Marcelo", urgent: true },
  { id: "2", time: "14:30", title: "Assinatura de Contrato de Locação", location: "Cartório de Notas / Presencial", contact: "Mariana Souza" },
  { id: "3", time: "16:45", title: "Vistoria de Entrega de Chaves", location: "Ed. Terraço Jardins, Apto 82", contact: "Eduardo Camargo" },
]

interface LeadItem {
  name: string
  avatar: string
  phone: string
  interest: string
  budget: string
  stage: string
  source: string
  heat: number // 1 to 5 dots
  urgent: boolean
}

const mockLeads: LeadItem[] = [
  {
    name: "Renata Vasconcelos",
    avatar: "RV",
    phone: "11987654321",
    interest: "Apartamento Jardins • 3 Suítes",
    budget: "R$ 1.850.000",
    stage: "Proposta Enviada",
    source: "WhatsApp",
    heat: 5,
    urgent: true,
  },
  {
    name: "Marcelo Henrique Dias",
    avatar: "MD",
    phone: "11976543210",
    interest: "Mansão Condomínio Alphaville",
    budget: "R$ 4.900.000",
    stage: "Visita Realizada",
    source: "Portal Prime",
    heat: 5,
    urgent: true,
  },
  {
    name: "Dra. Flávia Guimarães",
    avatar: "FG",
    phone: "11991234567",
    interest: "Cobertura Duplex Moema",
    budget: "R$ 2.400.000",
    stage: "Em Negociação",
    source: "Indicação",
    heat: 4,
    urgent: false,
  },
  {
    name: "Eduardo Camargo",
    avatar: "EC",
    phone: "11981112233",
    interest: "Studio Pinheiros (Investimento)",
    budget: "R$ 650.000",
    stage: "Aguardando Visita",
    source: "Instagram",
    heat: 3,
    urgent: false,
  },
]

export default function UserDashboardPage() {
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments)
  const [leadFilter, setLeadFilter] = useState("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Form State
  const [time, setTime] = useState("11:00")
  const [title, setTitle] = useState("")
  const [location, setLocation] = useState("")
  const [contact, setContact] = useState("")

  const handleCreateAppointment = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title) return

    const newApp: Appointment = {
      id: Date.now().toString(),
      time,
      title,
      location: location || "A definir",
      contact: contact || "Cliente",
    }

    setAppointments([...appointments, newApp])
    setIsDialogOpen(false)
    setTitle("")
    setLocation("")
    setContact("")
  }

  const filteredLeads = mockLeads.filter(lead => {
    if (leadFilter === "hot") return lead.heat >= 5
    if (leadFilter === "proposta") return lead.stage.includes("Proposta")
    if (leadFilter === "visita") return lead.stage.includes("Visita")
    return true
  })

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* 1. Header & Quick Actions (Apple Prime Style) */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              Painel Geral
            </h1>
            <span className="rounded-full bg-lime-400/20 text-lime-800 dark:text-lime-300 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide">
              Ao Vivo
            </span>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Olá, Carlos! Acompanhe suas negociações ativas, visitas e carteira de imóveis hoje.
          </p>
        </div>

        {/* Action Pills */}
        <div className="flex items-center gap-2 flex-wrap">
          <Link
            href="/v/prime"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-black/[0.08] dark:border-white/[0.12] bg-white/70 dark:bg-white/[0.05] hover:bg-black/5 dark:hover:bg-white/10 px-4 py-2 text-xs font-semibold text-foreground shadow-sm transition-all hover:scale-102"
          >
            <Share2 className="h-3.5 w-3.5 text-lime-600 dark:text-lime-400" />
            Minha Vitrine Pública
          </Link>

          <Link href="/dashboard/imoveis">
            <Button className="rounded-full bg-foreground text-background hover:bg-foreground/90 text-xs font-bold px-4 h-9 shadow-md flex items-center gap-1.5 transition-all hover:scale-102">
              <Plus className="h-3.5 w-3.5" />
              Cadastrar Imóvel
            </Button>
          </Link>
        </div>
      </div>

      {/* 2. Top Metric Bar & Deal Counters (Inspired by HelixCRM / TaskOrbit in inspirações) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {/* Metric 1: VGV Fechado */}
        <div className="glass-card glass-card-hover rounded-2xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
              VGV Fechado (Mês)
            </span>
            <div className="h-7 w-7 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <DollarSign className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-xl sm:text-2xl font-black tracking-tight text-foreground">
              R$ 4.850.000
            </div>
            <div className="flex items-center gap-1 mt-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
              <ArrowUpRight className="h-3.5 w-3.5" />
              <span>+18.4% vs mês anterior</span>
            </div>
          </div>
        </div>

        {/* Metric 2: Negociações Ativas */}
        <div className="glass-card glass-card-hover rounded-2xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
              Negociações no Funil
            </span>
            <span className="rounded-full bg-lime-400/20 text-lime-800 dark:text-lime-300 px-2 py-0.5 text-[10px] font-bold">
              +3 novas
            </span>
          </div>
          <div className="mt-2">
            <div className="text-xl sm:text-2xl font-black tracking-tight text-foreground">
              34 Deals
            </div>
            <p className="text-[11px] text-muted-foreground mt-1 font-medium">
              20 em fechamento • 3 visitas
            </p>
          </div>
        </div>

        {/* Metric 3: Imóveis na Carteira */}
        <div className="glass-card glass-card-hover rounded-2xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
              Imóveis na Carteira
            </span>
            <div className="h-7 w-7 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Building className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-xl sm:text-2xl font-black tracking-tight text-foreground">
              450 Ativos
            </div>
            <p className="text-[11px] text-muted-foreground mt-1 font-medium">
              320 venda • 130 locação
            </p>
          </div>
        </div>

        {/* Metric 4: Leads Quentes */}
        <div className="glass-card glass-card-hover rounded-2xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
              Leads Quentes
            </span>
            <div className="h-7 w-7 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Flame className="h-4 w-4 fill-amber-500 text-amber-500" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-xl sm:text-2xl font-black tracking-tight text-foreground">
              14 Prioritários
            </div>
            <p className="text-[11px] text-amber-600 dark:text-amber-400 mt-1 font-semibold flex items-center gap-1">
              <Clock className="h-3 w-3" /> Resposta imediata requerida
            </p>
          </div>
        </div>
      </div>

      {/* 3. Main Workspace Grid: Leads Quentes (Left) + Agenda & Widgets (Right) */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left Column: Leads Quentes (Inspired by New Leads in HelixCRM) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h2 className="text-lg font-bold tracking-tight text-foreground flex items-center gap-2">
                Leads Quentes & Oportunidades
                <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-bold text-muted-foreground">
                  {filteredLeads.length} Leads
                </span>
              </h2>
              <p className="text-xs text-muted-foreground">
                Clientes com alto potencial e proposta ativa aguardando fechamento.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
              {[
                { id: "all", label: "Todos" },
                { id: "hot", label: "🔥 Alta Intenção" },
                { id: "proposta", label: "Proposta" },
                { id: "visita", label: "Visita" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setLeadFilter(tab.id)}
                  className={`rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap transition-all ${
                    leadFilter === tab.id
                      ? "bg-foreground text-background shadow-sm"
                      : "glass-pill text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Cards List */}
          <div className="grid gap-3">
            {filteredLeads.map((lead, idx) => (
              <div
                key={idx}
                className="glass-card glass-card-hover rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-black/[0.06] dark:border-white/[0.08]"
              >
                {/* Info */}
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-slate-200 to-slate-100 dark:from-slate-800 dark:to-slate-700 text-foreground font-extrabold text-xs flex items-center justify-center shrink-0 shadow-inner">
                    {lead.avatar}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-sm text-foreground">{lead.name}</span>
                      <span className="rounded-full bg-muted px-2 py-0.2 text-[10px] font-semibold text-muted-foreground">
                        {lead.source}
                      </span>
                      {lead.urgent && (
                        <span className="rounded-full bg-red-500/10 text-red-600 dark:text-red-400 px-2 py-0.2 text-[10px] font-bold flex items-center gap-0.5">
                          <Flame className="h-2.5 w-2.5 fill-red-500" /> Quente
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground font-medium">{lead.interest}</p>
                    
                    {/* Heat dots (Inspired by inspirações/d16b206e372c86f6979b9f2a243a6bf8.jpg) */}
                    <div className="flex items-center gap-2 pt-0.5">
                      <span className="text-xs font-black text-foreground">{lead.budget}</span>
                      <div className="flex items-center gap-1" title={`Temperatura do Lead: ${lead.heat}/5`}>
                        {[1, 2, 3, 4, 5].map((dot) => (
                          <span
                            key={dot}
                            className={`h-1.5 w-1.5 rounded-full ${
                              dot <= lead.heat
                                ? lead.heat >= 5
                                  ? "bg-amber-500"
                                  : "bg-lime-500"
                                : "bg-muted-foreground/20"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Status & Actions */}
                <div className="flex items-center justify-between sm:justify-end gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-border/40">
                  <span className="rounded-full bg-blue-500/10 text-blue-700 dark:text-blue-300 px-2.5 py-1 text-[11px] font-semibold">
                    {lead.stage}
                  </span>

                  <div className="flex items-center gap-1.5">
                    <a
                      href={`https://wa.me/55${lead.phone}?text=Olá%20${encodeURIComponent(lead.name)},%20sou%20Carlos%20da%20Imobiliária%20Prime.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-8 w-8 rounded-full border border-black/[0.08] dark:border-white/[0.12] bg-white/70 dark:bg-white/[0.05] hover:bg-emerald-500 hover:text-white dark:hover:bg-emerald-600 flex items-center justify-center transition-colors"
                      title="Chamar no WhatsApp"
                    >
                      <MessageSquare className="h-3.5 w-3.5" />
                    </a>

                    <a
                      href={`tel:${lead.phone}`}
                      className="h-8 w-8 rounded-full border border-black/[0.08] dark:border-white/[0.12] bg-white/70 dark:bg-white/[0.05] hover:bg-black/5 dark:hover:bg-white/10 flex items-center justify-center transition-colors"
                      title="Ligar"
                    >
                      <Phone className="h-3.5 w-3.5" />
                    </a>

                    <Link
                      href="/dashboard/pipeline"
                      className="h-8 w-8 rounded-full bg-foreground text-background hover:scale-105 active:scale-95 flex items-center justify-center transition-transform"
                      title="Abrir no Funil"
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Agenda & Tasks + Apple Document Widgets */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold tracking-tight text-foreground">
                Agenda & Compromissos
              </h2>
              <p className="text-xs text-muted-foreground">
                Visitas técnicas e fechamentos de hoje.
              </p>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm" variant="outline" className="rounded-full h-8 text-xs px-3 flex items-center gap-1 glass-pill">
                  <Plus className="h-3.5 w-3.5" /> Novo
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md rounded-3xl p-6 sm:p-7">
                <DialogHeader>
                  <DialogTitle className="text-xl font-black text-foreground">Novo Compromisso na Agenda</DialogTitle>
                  <DialogDescription className="text-xs text-muted-foreground">
                    Agende uma visita com cliente, vistoria técnica ou assinatura de contrato.
                  </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleCreateAppointment} className="space-y-3.5 pt-2">
                  <div className="grid grid-cols-3 gap-2.5">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-foreground">Horário</label>
                      <input
                        type="time"
                        required
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full h-10 rounded-2xl border border-black/[0.08] dark:border-white/[0.12] bg-white/70 dark:bg-white/[0.04] px-3 text-xs sm:text-sm font-semibold"
                      />
                    </div>
                    <div className="col-span-2 space-y-1">
                      <label className="text-xs font-bold text-foreground">Título</label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: Visita Alphaville"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full h-10 rounded-2xl border border-black/[0.08] dark:border-white/[0.12] bg-white/70 dark:bg-white/[0.04] px-3.5 text-xs sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-foreground">Cliente / Contato</label>
                    <input
                      type="text"
                      placeholder="Ex: Dr. Marcelo"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      className="w-full h-10 rounded-2xl border border-black/[0.08] dark:border-white/[0.12] bg-white/70 dark:bg-white/[0.04] px-3.5 text-xs sm:text-sm"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-foreground">Local / Endereço</label>
                    <input
                      type="text"
                      placeholder="Ex: Alameda dos Ipês, 450"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full h-10 rounded-2xl border border-black/[0.08] dark:border-white/[0.12] bg-white/70 dark:bg-white/[0.04] px-3.5 text-xs sm:text-sm"
                    />
                  </div>

                  <DialogFooter className="pt-3 flex items-center justify-end gap-2">
                    <Button type="button" variant="outline" className="rounded-full h-10 px-5 text-xs font-bold" onClick={() => setIsDialogOpen(false)}>
                      Cancelar
                    </Button>
                    <Button type="submit" className="rounded-full h-10 px-6 font-bold text-xs bg-foreground text-background hover:bg-foreground/90 shadow-sm">
                      Salvar na Agenda
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Featured Urgent Task (Iconic Apple Lime Glass Card - Inspired by inspirações) */}
          {appointments.length > 0 && (
            <div className="glass-lime rounded-2xl p-4 shadow-sm space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-lime-500/20 text-lime-900 dark:text-lime-200 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider">
                  Próximo Compromisso
                </span>
                <span className="text-xs font-bold flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" /> {appointments[0].time}
                </span>
              </div>

              <div>
                <h3 className="font-extrabold text-sm leading-snug">{appointments[0].title}</h3>
                <p className="text-xs opacity-80 flex items-center gap-1 mt-0.5">
                  <MapPin className="h-3 w-3 shrink-0" /> {appointments[0].location}
                </p>
              </div>

              <div className="pt-1 flex items-center gap-2">
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(appointments[0].location)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-black/10 dark:bg-white/10 hover:bg-black/20 px-3 py-1 text-xs font-semibold transition-colors"
                >
                  Abrir Rota GPS
                </a>
                <span className="text-xs font-semibold opacity-75">
                  Contato: {appointments[0].contact}
                </span>
              </div>
            </div>
          )}

          {/* Remaining Appointments List */}
          <div className="space-y-2.5">
            {appointments.slice(1).map((app) => (
              <div
                key={app.id}
                className="glass-card glass-card-hover rounded-2xl p-3.5 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-muted px-2.5 py-1 text-xs font-bold text-foreground shrink-0">
                    {app.time}
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-foreground leading-tight">{app.title}</h4>
                    <p className="text-[11px] text-muted-foreground flex items-center gap-1 mt-0.5">
                      <MapPin className="h-2.5 w-2.5" /> {app.location}
                    </p>
                  </div>
                </div>
                <div className="h-7 w-7 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground">
                  <ChevronRight className="h-4 w-4" />
                </div>
              </div>
            ))}
          </div>

          {/* Quick Model Documents / Goals (Inspired by inspirações/d16b206e372c86f6979b9f2a243a6bf8.jpg) */}
          <div className="glass-card rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <FileText className="h-3.5 w-3.5 text-lime-600 dark:text-lime-400" />
                Modelos de Contratos Rápidos
              </span>
              <span className="text-[10px] text-muted-foreground">Prontos para envio</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <a
                href="/dashboard/pipeline"
                className="rounded-xl border border-black/[0.06] dark:border-white/[0.08] bg-muted/40 hover:bg-muted p-2.5 text-left transition-colors group block"
              >
                <p className="text-xs font-bold text-foreground group-hover:text-primary line-clamp-1">
                  Proposta_Padrao.pdf
                </p>
                <span className="text-[10px] text-muted-foreground block mt-0.5">Gerar com 1 clique</span>
              </a>

              <a
                href="/dashboard/alugueis"
                className="rounded-xl border border-black/[0.06] dark:border-white/[0.08] bg-muted/40 hover:bg-muted p-2.5 text-left transition-colors group block"
              >
                <p className="text-xs font-bold text-foreground group-hover:text-primary line-clamp-1">
                  Contrato_Locacao.pdf
                </p>
                <span className="text-[10px] text-muted-foreground block mt-0.5">Com reajuste IGP-M</span>
              </a>
            </div>

            {/* Monthly Goal Tracker */}
            <div className="pt-2 border-t border-border/40">
              <div className="flex items-center justify-between text-xs font-semibold mb-1">
                <span className="flex items-center gap-1 text-muted-foreground">
                  <Target className="h-3.5 w-3.5 text-amber-500" /> Meta VGV (R$ 6.000.000)
                </span>
                <span className="text-foreground font-bold">81% Concluído</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-gradient-to-r from-lime-500 to-emerald-500 h-2 rounded-full w-[81%] shadow-sm"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Section: Imóveis em Destaque na Carteira (Apple Glass Cards) */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold tracking-tight text-foreground">
              Imóveis em Destaque na Carteira
            </h2>
            <p className="text-xs text-muted-foreground">
              Propriedades com mais visualizações e leads gerados na semana.
            </p>
          </div>
          <Link
            href="/dashboard/imoveis"
            className="text-xs font-semibold text-foreground hover:underline flex items-center gap-1"
          >
            Ver Catálogo Completo <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Apartamento Luxo Vila Nova Conceição",
              price: "R$ 2.450.000",
              type: "Venda",
              specs: "185 m² • 3 Suítes • 3 Vagas",
              neighborhood: "Vila Nova Conceição, SP",
              status: "Disponível",
              views: "1.240 visualizações",
              bg: "from-slate-900 to-slate-800",
            },
            {
              title: "Mansão Contemporânea em Alphaville",
              price: "R$ 4.900.000",
              type: "Venda",
              specs: "420 m² • 4 Suítes • Piscina & Gourmet",
              neighborhood: "Alphaville, Barueri",
              status: "Reservado",
              views: "890 visualizações",
              bg: "from-blue-950 to-slate-900",
            },
            {
              title: "Cobertura Duplex com Vista Panorâmica",
              price: "R$ 14.500 /mês",
              type: "Aluguel",
              specs: "210 m² • 3 Suítes • Jacuzzi Privativa",
              neighborhood: "Moema Pássaros, SP",
              status: "Disponível",
              views: "640 visualizações",
              bg: "from-emerald-950 to-slate-900",
            },
          ].map((prop, idx) => (
            <div
              key={idx}
              className="glass-card glass-card-hover rounded-3xl overflow-hidden border border-black/[0.06] dark:border-white/[0.08] flex flex-col justify-between group"
            >
              {/* Photo Area with Apple Glass Price Capsule */}
              <div className={`h-44 bg-gradient-to-tr ${prop.bg} relative p-3 flex flex-col justify-between text-white`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="rounded-full bg-white/20 backdrop-blur-md px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                      {prop.type}
                    </span>
                    <span className="rounded-full bg-black/40 backdrop-blur-md px-2.5 py-0.5 text-[10px] font-medium">
                      {prop.status}
                    </span>
                  </div>

                  <Link
                    href="/dashboard/imoveis"
                    className="h-8 w-8 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md flex items-center justify-center transition-colors"
                  >
                    <ArrowUpRight className="h-4 w-4 text-white" />
                  </Link>
                </div>

                <div>
                  <span className="inline-block rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-sm font-extrabold tracking-tight">
                    {prop.price}
                  </span>
                </div>
              </div>

              {/* Details */}
              <div className="p-4 space-y-2">
                <h3 className="font-bold text-sm text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                  {prop.title}
                </h3>
                <p className="text-xs text-muted-foreground flex items-center gap-1 font-medium">
                  <MapPin className="h-3 w-3 text-muted-foreground" /> {prop.neighborhood}
                </p>
                <p className="text-xs font-semibold text-foreground">{prop.specs}</p>

                <div className="pt-2 border-t border-border/40 flex items-center justify-between text-[11px] text-muted-foreground">
                  <span>{prop.views}</span>
                  <Link
                    href="/dashboard/imoveis"
                    className="font-bold text-foreground hover:underline flex items-center gap-0.5"
                  >
                    Ver Imóvel →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
