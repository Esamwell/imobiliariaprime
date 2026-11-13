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
  HelpCircle, 
  MessageSquare, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Check, 
  Plus, 
  Send,
  Building2
} from "lucide-react"

interface Ticket {
  id: string
  tenant: string
  subject: string
  priority: string
  status: "Em Atendimento" | "Aguardando Resposta" | "Resolvido"
  time: string
}

const initialTickets: Ticket[] = [
  {
    id: "TKT-1042",
    tenant: "Tactus Imobiliária",
    subject: "Dúvida sobre integração com portal ZAP Imóveis",
    priority: "Média",
    status: "Em Atendimento",
    time: "Há 25 min",
  },
  {
    id: "TKT-1041",
    tenant: "Horizonte Imóveis",
    subject: "Solicitação de aumento no limite de corretores",
    priority: "Alta",
    status: "Aguardando Resposta",
    time: "Há 1 hora",
  },
  {
    id: "TKT-1040",
    tenant: "Metrópole Empreendimentos",
    subject: "Configuração de domínio próprio (DNS e SSL)",
    priority: "Baixa",
    status: "Resolvido",
    time: "Ontem",
  },
]

export default function SupportPage() {
  const [tickets, setTickets] = useState<Ticket[]>(initialTickets)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [activeTicket, setActiveTicket] = useState<Ticket | null>(null)
  const [replyText, setReplyText] = useState("")

  // Form State
  const [subject, setSubject] = useState("")
  const [tenant, setTenant] = useState("Tactus Imobiliária")
  const [priority, setPriority] = useState("Média")

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault()
    if (!subject) return

    const newTicket: Ticket = {
      id: `TKT-${Math.floor(1000 + Math.random() * 9000)}`,
      tenant,
      subject,
      priority,
      status: "Em Atendimento",
      time: "Agora",
    }

    setTickets([newTicket, ...tickets])
    setIsDialogOpen(false)
    setSubject("")
  }

  const handleResolveTicket = (ticketId: string) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === ticketId ? { ...t, status: "Resolvido" } : t))
    )
    setActiveTicket(null)
    setReplyText("")
  }

  return (
    <div className="flex-1 space-y-6 p-4 sm:p-6 max-w-7xl mx-auto">
      {/* Header Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              Central de Suporte & Chamados
            </h1>
            <span className="rounded-full bg-purple-500/10 text-purple-700 dark:text-purple-300 px-2.5 py-0.5 text-[10px] font-black uppercase">
              Atendimento VIP
            </span>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Tickets abertos pelas imobiliárias, corretores autônomos e monitoramento de qualidade.
          </p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <button className="inline-flex items-center gap-2 rounded-full bg-foreground text-background hover:bg-foreground/90 px-5 py-2.5 text-xs font-bold shadow-md transition-all hover:scale-102">
              <Plus className="h-4 w-4" />
              <span>Abrir Chamado Interno</span>
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-md rounded-[28px] border border-black/[0.08] dark:border-white/[0.12] bg-background/95 backdrop-blur-2xl p-6 shadow-2xl">
            <DialogHeader>
              <DialogTitle className="text-lg font-black text-foreground">Abrir Chamado de Suporte</DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground">
                Registre um ticket técnico ou solicitação comercial de cliente.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleCreateTicket} className="space-y-3.5 pt-2">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                  Assunto / Motivo
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Instabilidade no disparo de webhooks"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full h-10 rounded-2xl border border-black/[0.08] dark:border-white/[0.10] bg-muted/20 px-3.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                    Cliente / Imobiliária
                  </label>
                  <select
                    value={tenant}
                    onChange={(e) => setTenant(e.target.value)}
                    className="w-full h-10 rounded-2xl border border-black/[0.08] dark:border-white/[0.10] bg-muted/20 px-3.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20"
                  >
                    <option value="Tactus Imobiliária">Tactus Imobiliária</option>
                    <option value="Horizonte Imóveis">Horizonte Imóveis</option>
                    <option value="Metrópole Empreendimentos">Metrópole</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                    Prioridade
                  </label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full h-10 rounded-2xl border border-black/[0.08] dark:border-white/[0.10] bg-muted/20 px-3.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20"
                  >
                    <option value="Baixa">Baixa</option>
                    <option value="Média">Média</option>
                    <option value="Alta">Alta</option>
                    <option value="Urgente">Urgente</option>
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
                  Registrar Chamado
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* KPI Cards in Apple Prime Glass */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-5">
        <div className="glass-card glass-card-hover rounded-3xl p-5 border border-black/[0.06] dark:border-white/[0.08]">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
              Infraestrutura
            </span>
            <div className="h-8 w-8 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-xl font-black text-emerald-600 dark:text-emerald-400">
              100% Operacional
            </div>
            <p className="text-[11px] text-muted-foreground mt-0.5">API, Webhooks e Push Notifications</p>
          </div>
        </div>

        <div className="glass-card glass-card-hover rounded-3xl p-5 border border-black/[0.06] dark:border-white/[0.08]">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
              Chamados Pendentes
            </span>
            <div className="h-8 w-8 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Clock className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-xl font-black text-amber-500">
              {tickets.filter((t) => t.status !== "Resolvido").length} em Aberto
            </div>
            <p className="text-[11px] text-muted-foreground mt-0.5">Tempo médio de resposta: 18 min</p>
          </div>
        </div>

        <div className="glass-card glass-card-hover rounded-3xl p-5 border border-black/[0.06] dark:border-white/[0.08]">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
              Satisfação (CSAT)
            </span>
            <div className="h-8 w-8 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <HelpCircle className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-xl font-black text-foreground">
              98.4%
            </div>
            <p className="text-[11px] text-muted-foreground mt-0.5">Avaliado por 142 imobiliárias</p>
          </div>
        </div>
      </div>

      {/* Tickets List Card in Apple Prime Glass */}
      <div className="glass-card rounded-3xl border border-black/[0.06] dark:border-white/[0.08] shadow-sm overflow-hidden p-6">
        <div className="mb-4">
          <h3 className="text-base font-extrabold text-foreground">Fila de Chamados</h3>
          <p className="text-xs text-muted-foreground">Clique para responder ou alterar status do ticket</p>
        </div>

        <div className="divide-y divide-black/[0.04] dark:divide-white/[0.04]">
          {tickets.map((ticket) => {
            const isResolved = ticket.status === "Resolvido"
            return (
              <div key={ticket.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-full bg-muted/60 text-muted-foreground">
                      {ticket.id}
                    </span>
                    <h4 className="font-bold text-xs text-foreground">{ticket.subject}</h4>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      ticket.priority === "Alta" || ticket.priority === "Urgente"
                        ? "bg-rose-500/10 text-rose-600"
                        : "bg-blue-500/10 text-blue-600"
                    }`}>
                      {ticket.priority}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Cliente: <strong className="text-foreground">{ticket.tenant}</strong> • {ticket.time}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    isResolved
                      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                      : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                  }`}>
                    {ticket.status}
                  </span>

                  {!isResolved && (
                    <button
                      onClick={() => handleResolveTicket(ticket.id)}
                      className="px-3 py-1 rounded-full text-[10px] font-bold bg-muted hover:bg-emerald-500/10 hover:text-emerald-600 transition-all flex items-center gap-1"
                    >
                      <Check className="h-3 w-3" />
                      Marcar Resolvido
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
