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
import { HelpCircle, MessageSquare, CheckCircle2, Clock, AlertCircle, Check } from "lucide-react"

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
    tenant: "Imobiliária Prime",
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
  const [tenant, setTenant] = useState("Imobiliária Prime")
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
    <div className="flex-1 space-y-6 p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Central de Suporte & Chamados</h1>
          <p className="text-sm text-muted-foreground">Atendimento aos clientes, tickets abertos pelas imobiliárias e status dos serviços.</p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Abrir Chamado Interno
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Abrir Chamado de Suporte</DialogTitle>
              <DialogDescription>
                Registre um ticket interno de suporte ou solicitação técnica.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleCreateTicket} className="space-y-3.5 pt-2">
              <div className="space-y-1">
                <label className="text-xs font-semibold">Assunto / Motivo</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Instabilidade no disparo de webhooks"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold">Cliente / Imobiliária</label>
                  <select
                    value={tenant}
                    onChange={(e) => setTenant(e.target.value)}
                    className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  >
                    <option value="Imobiliária Prime">Imobiliária Prime</option>
                    <option value="Horizonte Imóveis">Horizonte Imóveis</option>
                    <option value="Metrópole Empreendimentos">Metrópole</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold">Prioridade</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  >
                    <option value="Baixa">Baixa</option>
                    <option value="Média">Média</option>
                    <option value="Alta">Alta</option>
                    <option value="Urgente">Urgente</option>
                  </select>
                </div>
              </div>

              <DialogFooter className="pt-3">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit">Registrar Chamado</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Status da Infraestrutura</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-emerald-600 font-semibold text-lg">
              <CheckCircle2 className="h-5 w-5" /> Todos os serviços operacionais
            </div>
            <p className="text-xs text-muted-foreground mt-1">API, CDN, Banco de Dados e Webhooks</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Chamados em Aberto</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-500">
              {tickets.filter((t) => t.status !== "Resolvido").length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Tempo médio de resposta: 18 min</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Satisfação (CSAT)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">98.4%</div>
            <p className="text-xs text-muted-foreground mt-1">Baseado em 142 avaliações no mês</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tickets Recentes de Imobiliárias</CardTitle>
          <CardDescription>Acompanhe e responda solicitações de suporte dos clientes da plataforma.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="divide-y">
            {tickets.map((ticket) => (
              <div key={ticket.id} className="flex flex-col sm:flex-row sm:items-center justify-between py-3.5 gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-semibold">{ticket.id}</span>
                    <span className="font-medium text-sm text-foreground">{ticket.subject}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-muted text-muted-foreground font-medium">
                      Prioridade: {ticket.priority}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Cliente: <span className="font-medium text-foreground">{ticket.tenant}</span> • {ticket.time}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
                    ticket.status === "Resolvido" ? "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300" : "bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300"
                  }`}>
                    {ticket.status}
                  </span>
                  {ticket.status !== "Resolvido" && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setActiveTicket(ticket)}
                      className="h-8 text-xs"
                    >
                      Responder
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Response Modal */}
      {activeTicket && (
        <Dialog open={Boolean(activeTicket)} onOpenChange={() => setActiveTicket(null)}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Atender Ticket {activeTicket.id}</DialogTitle>
              <DialogDescription>
                {activeTicket.tenant}: {activeTicket.subject}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-3 pt-2">
              <textarea
                rows={3}
                placeholder="Digite a resposta que será enviada para o cliente..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="w-full rounded-md border border-input bg-background p-2.5 text-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
            </div>
            <DialogFooter className="pt-3">
              <Button variant="outline" onClick={() => setActiveTicket(null)}>
                Fechar
              </Button>
              <Button onClick={() => handleResolveTicket(activeTicket.id)} className="flex items-center gap-1.5">
                <Check className="h-4 w-4" /> Marcar como Resolvido
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
