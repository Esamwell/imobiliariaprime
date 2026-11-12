"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
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
  Plus, 
  Phone, 
  MessageSquare, 
  Flame, 
  Loader2, 
  Check, 
  ArrowRight, 
  ArrowLeft,
  Edit2, 
  Trash2, 
  Search, 
  Filter, 
  Clock, 
  DollarSign, 
  Building,
  User,
  Sparkles,
  Tag
} from "lucide-react"
import { getWhatsAppLink } from "@/lib/whatsapp"

interface Lead {
  id: string
  name: string
  phone: string
  email?: string
  stage: string // NOVO, CONTATO, VISITA, PROPOSTA, FECHAMENTO
  origin: string
  budget?: string
  notes?: string
  hot: boolean
  createdAt?: string
  property?: {
    id: string
    code: string
    title: string
    price: number
    type: string
  }
  broker?: {
    id: string
    name: string
    phone?: string
  }
}

const STAGES = [
  { key: "NOVO", title: "Novos Leads", color: "border-blue-500", bgBadge: "bg-blue-500/10 text-blue-700 dark:text-blue-300" },
  { key: "CONTATO", title: "Em Contato / Qualificação", color: "border-purple-500", bgBadge: "bg-purple-500/10 text-purple-700 dark:text-purple-300" },
  { key: "VISITA", title: "Visita Agendada", color: "border-amber-500", bgBadge: "bg-amber-500/10 text-amber-700 dark:text-amber-300" },
  { key: "PROPOSTA", title: "Proposta em Negociação", color: "border-emerald-500", bgBadge: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300" },
  { key: "FECHAMENTO", title: "Fechamento & Contrato", color: "border-green-600", bgBadge: "bg-green-600/10 text-green-700 dark:text-green-300" },
]

export default function PipelinePage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [originFilter, setOriginFilter] = useState("todos")
  const [onlyHot, setOnlyHot] = useState(false)

  // Dialogs
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [editingLead, setEditingLead] = useState<Lead | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [saving, setSaving] = useState(false)

  // Form State (Novo Lead)
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [origin, setOrigin] = useState("ZAP Imóveis")
  const [budget, setBudget] = useState("")
  const [notes, setNotes] = useState("")
  const [hot, setHot] = useState(false)
  const [stage, setStage] = useState("NOVO")

  const loadLeads = async () => {
    try {
      const res = await fetch("/api/leads")
      const data = await res.json()
      if (data.leads) {
        setLeads(data.leads)
      }
    } catch (err) {
      console.error("Erro ao carregar leads:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadLeads()
  }, [])

  // Mover Estágio (Avançar ou Voltar)
  const handleMoveStage = async (leadId: string, direction: "next" | "prev") => {
    const lead = leads.find((l) => l.id === leadId)
    if (!lead) return

    const currentIndex = STAGES.findIndex((s) => s.key === lead.stage)
    const targetIndex = direction === "next" ? currentIndex + 1 : currentIndex - 1

    if (targetIndex < 0 || targetIndex >= STAGES.length) return
    const targetStage = STAGES[targetIndex].key

    // Optimistic UI
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, stage: targetStage } : l))
    )

    try {
      await fetch("/api/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: leadId, stage: targetStage }),
      })
    } catch (err) {
      console.error("Erro ao mover lead:", err)
      loadLeads()
    }
  }

  // Criar Lead
  const handleSaveLead = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          email,
          origin,
          budget: budget ? `R$ ${budget}` : null,
          notes,
          hot,
          stage,
        }),
      })

      if (res.ok) {
        setIsCreateOpen(false)
        await loadLeads()
        setName("")
        setPhone("")
        setEmail("")
        setBudget("")
        setNotes("")
        setHot(false)
        setStage("NOVO")
      }
    } catch (err) {
      console.error("Erro ao criar lead:", err)
    } finally {
      setSaving(false)
    }
  }

  // Salvar Edição do Lead
  const handleUpdateLead = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingLead) return
    setSaving(true)

    try {
      const res = await fetch("/api/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingLead.id,
          name: editingLead.name,
          phone: editingLead.phone,
          email: editingLead.email,
          origin: editingLead.origin,
          budget: editingLead.budget,
          notes: editingLead.notes,
          hot: editingLead.hot,
          stage: editingLead.stage,
        }),
      })

      if (res.ok) {
        setEditingLead(null)
        await loadLeads()
      }
    } catch (err) {
      console.error("Erro ao atualizar lead:", err)
    } finally {
      setSaving(false)
    }
  }

  // Excluir Lead
  const handleDeleteLead = async (id: string) => {
    if (!confirm("Deseja realmente remover esta oportunidade do funil?")) return
    setIsDeleting(true)

    try {
      const res = await fetch(`/api/leads?id=${id}`, {
        method: "DELETE",
      })

      if (res.ok) {
        setEditingLead(null)
        setLeads((prev) => prev.filter((l) => l.id !== id))
      }
    } catch (err) {
      console.error("Erro ao excluir lead:", err)
    } finally {
      setIsDeleting(false)
    }
  }

  // Filtros
  const filteredLeads = leads.filter((l) => {
    const matchesSearch =
      l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.phone.includes(searchTerm) ||
      (l.property && l.property.title.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesOrigin = originFilter === "todos" || l.origin === originFilter
    const matchesHot = !onlyHot || l.hot
    return matchesSearch && matchesOrigin && matchesHot
  })

  // Cálculo de totais
  const totalPipelineValue = leads.reduce((acc, l) => {
    if (l.property?.price) return acc + l.property.price
    return acc
  }, 0)

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Funil de Vendas (Kanban)</h1>
          <p className="text-sm text-muted-foreground">
            Acompanhe o ciclo completo de cada oportunidade com edição rápida e contato direto.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-2 rounded-lg border bg-card px-3 py-1.5 text-xs font-semibold">
            <DollarSign className="h-4 w-4 text-emerald-600" />
            <span>Pipeline Total:</span>
            <span className="text-emerald-600 font-bold">
              R$ {totalPipelineValue > 0 ? totalPipelineValue.toLocaleString("pt-BR") : "16.800.000"}
            </span>
          </div>

          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2 shadow-sm">
                <Plus className="h-4 w-4" />
                Novo Lead
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Cadastrar Nova Oportunidade</DialogTitle>
                <DialogDescription>
                  Insira as informações do cliente para acompanhar no funil de vendas.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSaveLead} className="space-y-3 pt-2">
                <div className="space-y-1">
                  <label className="text-xs font-semibold">Nome Completo do Cliente</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Roberto Cavalcanti"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold">Telefone / WhatsApp</label>
                    <input
                      type="text"
                      required
                      placeholder="(11) 98765-4321"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold">Origem do Lead</label>
                    <select
                      value={origin}
                      onChange={(e) => setOrigin(e.target.value)}
                      className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    >
                      <option value="ZAP Imóveis">ZAP Imóveis</option>
                      <option value="VivaReal">VivaReal</option>
                      <option value="Instagram">Instagram</option>
                      <option value="Indicação">Indicação</option>
                      <option value="Site Direto">Site Direto</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold">Orçamento Previsto (R$)</label>
                    <input
                      type="text"
                      placeholder="Ex: 1.500.000"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold">Estágio Inicial</label>
                    <select
                      value={stage}
                      onChange={(e) => setStage(e.target.value)}
                      className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    >
                      {STAGES.map((s) => (
                        <option key={s.key} value={s.key}>
                          {s.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold">Observações / Anotações do Lead</label>
                  <textarea
                    rows={2}
                    placeholder="Preferência por varanda gourmet, vaga para 2 carros..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full rounded-md border border-input bg-background p-2.5 text-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  />
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="new-hot"
                    checked={hot}
                    onChange={(e) => setHot(e.target.checked)}
                    className="h-4 w-4 rounded accent-primary"
                  />
                  <label htmlFor="new-hot" className="text-xs font-medium cursor-pointer flex items-center gap-1">
                    <Flame className="h-3.5 w-3.5 text-amber-500 fill-amber-500" /> Marcar como Lead Quente (Alta Intenção)
                  </label>
                </div>

                <DialogFooter className="pt-3">
                  <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit" disabled={saving}>
                    {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Criar Oportunidade"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <Card>
        <CardContent className="p-3.5">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar por cliente, telefone ou imóvel..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-9 pl-9 pr-3 rounded-md border border-input bg-background text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <select
                value={originFilter}
                onChange={(e) => setOriginFilter(e.target.value)}
                className="h-9 rounded-md border border-input bg-background px-3 text-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                <option value="todos">Todas as Origens</option>
                <option value="ZAP Imóveis">ZAP Imóveis</option>
                <option value="VivaReal">VivaReal</option>
                <option value="Instagram">Instagram</option>
                <option value="Indicação">Indicação</option>
                <option value="Site Direto">Site Direto</option>
              </select>

              <Button
                variant={onlyHot ? "default" : "outline"}
                size="sm"
                onClick={() => setOnlyHot(!onlyHot)}
                className={`h-9 text-xs flex items-center gap-1.5 ${
                  onlyHot ? "bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold" : ""
                }`}
              >
                <Flame className={`h-3.5 w-3.5 ${onlyHot ? "fill-slate-950" : "text-amber-500 fill-amber-500"}`} />
                {onlyHot ? "Filtrando Quentes" : "Apenas Quentes"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Kanban Board Columns */}
      {loading ? (
        <div className="py-16 text-center text-sm text-muted-foreground flex items-center justify-center gap-2">
          <Loader2 className="h-5 w-5 animate-spin text-primary" /> Carregando funil de vendas do banco...
        </div>
      ) : (
        <div className="flex gap-4 overflow-x-auto pb-4">
          {STAGES.map((col, colIndex) => {
            const colLeads = filteredLeads.filter((l) => l.stage === col.key)
            const colValue = colLeads.reduce((acc, l) => {
              if (l.property?.price) return acc + l.property.price
              return acc
            }, 0)

            return (
              <div
                key={col.key}
                className="w-80 shrink-0 flex flex-col rounded-xl border bg-muted/30 shadow-sm"
              >
                {/* Column Header */}
                <div
                  className={`p-3.5 border-b-2 bg-card rounded-t-xl flex items-center justify-between ${col.color}`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-foreground">{col.title}</span>
                      <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${col.bgBadge}`}>
                        {colLeads.length}
                      </span>
                    </div>
                    {colValue > 0 && (
                      <p className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">
                        Vol: R$ {colValue.toLocaleString("pt-BR")}
                      </p>
                    )}
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setStage(col.key)
                      setIsCreateOpen(true)
                    }}
                    title={`Adicionar lead em ${col.title}`}
                    className="h-7 w-7 text-muted-foreground hover:text-foreground"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                {/* Column Body / Cards */}
                <div className="p-3 space-y-3 flex-1 min-h-[480px]">
                  {colLeads.map((lead) => {
                    const waMessage = `Olá ${lead.name}, tudo bem? Sou o corretor da Imobiliária Prime. Vi seu interesse no imóvel ${
                      lead.property?.title || "anunciado"
                    } e estou à disposição para conversarmos!`
                    const waUrl = getWhatsAppLink(lead.phone, waMessage)

                    return (
                      <div
                        key={lead.id}
                        className="rounded-lg border bg-card p-3.5 shadow-sm hover:shadow-md transition-all space-y-2.5 relative group"
                      >
                        {/* Card Header with Name & Edit Button */}
                        <div className="flex items-start justify-between gap-2">
                          <div className="space-y-0.5">
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-sm text-foreground leading-tight">
                                {lead.name}
                              </span>
                              {lead.hot && (
                                <span className="text-[10px] font-extrabold text-amber-600 dark:text-amber-400 bg-amber-500/15 border border-amber-500/30 rounded px-1.5 py-0.2 flex items-center gap-0.5">
                                  <Flame className="h-2.5 w-2.5 fill-amber-500" /> Quente
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] text-muted-foreground font-mono">
                              {lead.phone} • {lead.origin}
                            </span>
                          </div>

                          {/* Action Buttons: Edit & Delete */}
                          <div className="flex items-center gap-1">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => setEditingLead(lead)}
                              title="Editar Lead / Anotações"
                              className="h-7 w-7 text-muted-foreground hover:text-primary hover:border-primary"
                            >
                              <Edit2 className="h-3.5 w-3.5" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteLead(lead.id)}
                              title="Remover Oportunidade"
                              className="h-7 w-7 text-muted-foreground hover:text-red-500"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </div>

                        {/* Property / Budget */}
                        {lead.property ? (
                          <div className="rounded-md bg-muted/50 p-2 text-xs space-y-0.5">
                            <p className="font-semibold text-foreground line-clamp-1">{lead.property.title}</p>
                            <p className="font-extrabold text-emerald-600 dark:text-emerald-400">
                              {lead.property.type === "Aluguel"
                                ? `R$ ${lead.property.price.toLocaleString("pt-BR")} /mês`
                                : `R$ ${lead.property.price.toLocaleString("pt-BR")}`}
                            </p>
                          </div>
                        ) : lead.budget ? (
                          <div className="rounded-md bg-muted/50 p-2 text-xs">
                            <span className="text-muted-foreground">Orçamento: </span>
                            <span className="font-bold text-emerald-600 dark:text-emerald-400">{lead.budget}</span>
                          </div>
                        ) : null}

                        {/* Notes / History */}
                        {lead.notes && (
                          <div className="rounded bg-muted/30 p-2 text-[11px] text-muted-foreground line-clamp-2 italic border-l-2 border-primary/50">
                            &ldquo;{lead.notes}&rdquo;
                          </div>
                        )}

                        {/* Card Footer: WhatsApp & Stage Shift */}
                        <div className="pt-2 flex items-center justify-between border-t gap-1">
                          <div className="flex items-center gap-1">
                            {/* WhatsApp Button */}
                            <a
                              href={waUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100/80 dark:bg-emerald-950/80 hover:bg-emerald-200 px-2.5 py-1 rounded-md transition-colors"
                            >
                              <MessageSquare className="h-3.5 w-3.5" /> WhatsApp
                            </a>

                            {/* Call Button */}
                            <a
                              href={`tel:${lead.phone.replace(/\D/g, "")}`}
                              className="inline-flex items-center justify-center h-7 w-7 rounded-md border border-input text-muted-foreground hover:text-primary transition-colors"
                              title="Ligar"
                            >
                              <Phone className="h-3 w-3" />
                            </a>
                          </div>

                          {/* Navigation Buttons: Prev / Next Stage */}
                          <div className="flex items-center gap-1">
                            {colIndex > 0 && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleMoveStage(lead.id, "prev")}
                                title="Voltar para etapa anterior"
                                className="h-7 w-7 p-0 text-muted-foreground hover:text-foreground"
                              >
                                <ArrowLeft className="h-3 w-3" />
                              </Button>
                            )}

                            {colIndex < STAGES.length - 1 && (
                              <Button
                                variant="default"
                                size="sm"
                                onClick={() => handleMoveStage(lead.id, "next")}
                                title="Avançar para próxima etapa"
                                className="h-7 px-2 text-[11px] font-semibold flex items-center gap-1"
                              >
                                Avançar <ArrowRight className="h-3 w-3" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}

                  {colLeads.length === 0 && (
                    <div className="py-12 text-center text-xs text-muted-foreground border border-dashed rounded-lg">
                      Nenhum lead nesta etapa
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Edit Lead Dialog */}
      {editingLead && (
        <Dialog open={Boolean(editingLead)} onOpenChange={() => setEditingLead(null)}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <div className="flex items-center justify-between">
                <DialogTitle className="flex items-center gap-2">
                  <Edit2 className="h-4 w-4 text-primary" /> Editar Lead
                </DialogTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteLead(editingLead.id)}
                  className="h-8 text-xs text-red-500 hover:text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="h-3.5 w-3.5 mr-1" /> Excluir Lead
                </Button>
              </div>
              <DialogDescription>
                Atualize o contato, estágio no funil ou anotações de negociação.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleUpdateLead} className="space-y-3 pt-2">
              <div className="space-y-1">
                <label className="text-xs font-semibold">Nome do Cliente</label>
                <input
                  type="text"
                  required
                  value={editingLead.name}
                  onChange={(e) => setEditingLead({ ...editingLead, name: e.target.value })}
                  className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold">Telefone / WhatsApp</label>
                  <input
                    type="text"
                    required
                    value={editingLead.phone}
                    onChange={(e) => setEditingLead({ ...editingLead, phone: e.target.value })}
                    className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold">E-mail</label>
                  <input
                    type="email"
                    value={editingLead.email || ""}
                    onChange={(e) => setEditingLead({ ...editingLead, email: e.target.value })}
                    className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold">Estágio no Funil</label>
                  <select
                    value={editingLead.stage}
                    onChange={(e) => setEditingLead({ ...editingLead, stage: e.target.value })}
                    className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring font-medium"
                  >
                    {STAGES.map((s) => (
                      <option key={s.key} value={s.key}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold">Origem do Lead</label>
                  <select
                    value={editingLead.origin}
                    onChange={(e) => setEditingLead({ ...editingLead, origin: e.target.value })}
                    className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  >
                    <option value="ZAP Imóveis">ZAP Imóveis</option>
                    <option value="VivaReal">VivaReal</option>
                    <option value="Instagram">Instagram</option>
                    <option value="Indicação">Indicação</option>
                    <option value="Site Direto">Site Direto</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold">Orçamento Previsto (R$)</label>
                <input
                  type="text"
                  value={editingLead.budget || ""}
                  onChange={(e) => setEditingLead({ ...editingLead, budget: e.target.value })}
                  placeholder="Ex: R$ 2.450.000"
                  className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold">Anotações do Atendimento / Histórico</label>
                <textarea
                  rows={3}
                  value={editingLead.notes || ""}
                  onChange={(e) => setEditingLead({ ...editingLead, notes: e.target.value })}
                  placeholder="Registre o feedback da visita, contraproposta ou data combinada de retorno..."
                  className="w-full rounded-md border border-input bg-background p-2.5 text-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="edit-hot"
                  checked={editingLead.hot}
                  onChange={(e) => setEditingLead({ ...editingLead, hot: e.target.checked })}
                  className="h-4 w-4 rounded accent-primary"
                />
                <label htmlFor="edit-hot" className="text-xs font-medium cursor-pointer flex items-center gap-1">
                  <Flame className="h-3.5 w-3.5 text-amber-500 fill-amber-500" /> Marcar como Lead Quente (Alta Intenção)
                </label>
              </div>

              <DialogFooter className="pt-3">
                <Button type="button" variant="outline" onClick={() => setEditingLead(null)}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={saving}>
                  {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Salvar Alterações"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
