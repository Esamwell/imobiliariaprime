"use client"

import { useState } from "react"
import Link from "next/link"
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
  Check
} from "lucide-react"

interface Appointment {
  id: string
  time: string
  title: string
  location: string
  color: string
}

const initialAppointments: Appointment[] = [
  { id: "1", time: "10:00", title: "Visita com Dr. Marcelo (Mansão Alphaville)", location: "Alameda dos Ipês, 450 - Alphaville", color: "border-l-primary" },
  { id: "2", time: "14:30", title: "Assinatura de Contrato de Locação", location: "Cartório de Notas / Presencial", color: "border-l-emerald-500" },
  { id: "3", time: "16:45", title: "Vistoria de Entrega de Chaves", location: "Ed. Terraço Jardins, Apto 82", color: "border-l-amber-500" },
]

export default function UserDashboardPage() {
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Form State
  const [time, setTime] = useState("11:00")
  const [title, setTitle] = useState("")
  const [location, setLocation] = useState("")

  const handleCreateAppointment = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title) return

    const newApp: Appointment = {
      id: Date.now().toString(),
      time,
      title,
      location: location || "A definir",
      color: "border-l-purple-500",
    }

    setAppointments([...appointments, newApp])
    setIsDialogOpen(false)
    setTitle("")
    setLocation("")
  }

  return (
    <div className="space-y-6">
      {/* Top Welcome */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Painel da Imobiliária</h1>
          <p className="text-sm text-muted-foreground">Olá, Carlos! Acompanhe suas negociações, visitas e carteira de imóveis hoje.</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/dashboard/imoveis">
            <Button variant="outline" className="flex items-center gap-1.5">
              <Building className="h-4 w-4" />
              Ver Imóveis
            </Button>
          </Link>
          <Link href="/dashboard/pipeline">
            <Button className="flex items-center gap-1.5">
              <Plus className="h-4 w-4" />
              Novo Lead / Negociação
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">VGV Fechado no Mês</CardTitle>
            <DollarSign className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 4.850.000</div>
            <p className="text-xs text-emerald-600 flex items-center gap-1 mt-1 font-medium">
              <ArrowUpRight className="h-3 w-3" /> +18.4% vs mês passado
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Imóveis Ativos</CardTitle>
            <Building className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">450</div>
            <p className="text-xs text-muted-foreground mt-1">320 à venda • 130 locação</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Novos Leads (Semana)</CardTitle>
            <Users className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">48</div>
            <p className="text-xs text-emerald-600 flex items-center gap-1 mt-1 font-medium">
              <Flame className="h-3 w-3 text-amber-500 fill-amber-500" /> 14 com alta intenção
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Compromissos Hoje</CardTitle>
            <Calendar className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{appointments.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Agendados na sua rotina</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Grid: Hot Leads and Agenda */}
      <div className="grid gap-6 lg:grid-cols-7">
        {/* Hot Leads */}
        <Card className="lg:col-span-4">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Leads Quentes Prioritários</CardTitle>
              <CardDescription>Clientes com proposta aberta ou visita recente aguardando retorno.</CardDescription>
            </div>
            <Link href="/dashboard/pipeline" className="text-xs text-primary hover:underline flex items-center">
              Ver Funil <ChevronRight className="h-3 w-3" />
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              {
                name: "Renata Vasconcelos",
                phone: "11987654321",
                displayPhone: "(11) 98765-4321",
                interest: "Apartamento Jardins - 3 Suítes",
                budget: "R$ 1.850.000",
                stage: "Proposta Enviada",
                urgent: true,
              },
              {
                name: "Marcelo Henrique Dias",
                phone: "11976543210",
                displayPhone: "(11) 97654-3210",
                interest: "Casa em Condomínio Alphaville",
                budget: "R$ 3.200.000",
                stage: "Visita Realizada",
                urgent: true,
              },
              {
                name: "Dra. Flávia Guimarães",
                phone: "11991234567",
                displayPhone: "(11) 99123-4567",
                interest: "Cobertura Duplex Vila Mariana",
                budget: "R$ 2.400.000",
                stage: "Em Negociação",
                urgent: false,
              },
              {
                name: "Eduardo Camargo",
                phone: "11981112233",
                displayPhone: "(11) 98111-2233",
                interest: "Studio Pinheiros (Investimento)",
                budget: "R$ 650.000",
                stage: "Aguardando Visita",
                urgent: false,
              },
            ].map((lead, i) => (
              <div key={i} className="flex items-center justify-between p-3.5 rounded-lg border bg-card hover:bg-muted/30 transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm">{lead.name}</span>
                    {lead.urgent && (
                      <span className="flex items-center gap-0.5 rounded bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 text-[10px] font-bold px-1.5 py-0.5">
                        <Flame className="h-3 w-3" /> Prioritário
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{lead.interest}</p>
                  <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400">Orçamento: {lead.budget}</p>
                </div>
                <div className="text-right space-y-1.5">
                  <span className="inline-block rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs px-2.5 py-0.5 font-medium">
                    {lead.stage}
                  </span>
                  <div className="flex justify-end gap-1">
                    <a
                      href={`tel:${lead.phone}`}
                      className="inline-flex items-center gap-1 rounded-md border border-input bg-background hover:bg-accent px-2.5 py-1 text-xs font-medium"
                    >
                      <Phone className="h-3 w-3 text-primary" /> Ligar
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Agenda & Tasks */}
        <Card className="lg:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Agenda do Dia</CardTitle>
              <CardDescription>Compromissos e vistorias programadas.</CardDescription>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm" variant="outline" className="h-7 text-xs flex items-center gap-1">
                  <Plus className="h-3.5 w-3.5" /> Novo
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Novo Compromisso na Agenda</DialogTitle>
                  <DialogDescription>
                    Adicione uma visita, vistoria ou assinatura de contrato.
                  </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleCreateAppointment} className="space-y-3 pt-2">
                  <div className="grid grid-cols-3 gap-2">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold">Horário</label>
                      <input
                        type="time"
                        required
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full h-9 rounded-md border border-input bg-background px-2 text-sm"
                      />
                    </div>
                    <div className="col-span-2 space-y-1">
                      <label className="text-xs font-semibold">Título do Compromisso</label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: Visita Imóvel Jardins"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold">Local / Endereço</label>
                    <input
                      type="text"
                      placeholder="Ex: Alameda dos Ipês, 450"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm"
                    />
                  </div>

                  <DialogFooter className="pt-3">
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancelar
                    </Button>
                    <Button type="submit">Salvar na Agenda</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent className="space-y-3">
            {appointments.map((app) => (
              <div key={app.id} className={`flex items-start gap-3 rounded-lg border-l-4 ${app.color} bg-muted/40 p-3`}>
                <Clock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold">{app.time} - {app.title}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                    <MapPin className="h-3 w-3" /> {app.location}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Featured Properties Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Imóveis em Destaque na Imobiliária</CardTitle>
            <CardDescription>Propriedades com mais visualizações e leads gerados na semana.</CardDescription>
          </div>
          <Link href="/dashboard/imoveis">
            <Button variant="outline" size="sm">
              Ver Todos os Imóveis
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
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
              },
              {
                title: "Mansão Contemporânea Alphaville Residencial",
                price: "R$ 4.900.000",
                type: "Venda",
                specs: "420 m² • 4 Suítes • Piscina & Gourmet",
                neighborhood: "Alphaville, Barueri",
                status: "Reservado",
                views: "890 visualizações",
              },
              {
                title: "Cobertura Duplex com Vista Panorâmica",
                price: "R$ 14.500 /mês",
                type: "Aluguel",
                specs: "210 m² • 3 Suítes • Jacuzzi Privativa",
                neighborhood: "Moema Pássaros, SP",
                status: "Disponível",
                views: "640 visualizações",
              },
            ].map((prop, idx) => (
              <div key={idx} className="rounded-xl border bg-card overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-40 bg-gradient-to-tr from-slate-800 to-slate-600 relative flex items-end p-3 text-white">
                  <div className="absolute top-2 left-2 flex gap-1.5">
                    <span className="rounded bg-primary px-2 py-0.5 text-xs font-semibold">
                      {prop.type}
                    </span>
                    <span className="rounded bg-black/60 backdrop-blur-sm px-2 py-0.5 text-xs font-medium">
                      {prop.status}
                    </span>
                  </div>
                  <div>
                    <p className="text-xl font-bold">{prop.price}</p>
                  </div>
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="font-semibold text-sm line-clamp-1">{prop.title}</h3>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> {prop.neighborhood}
                  </p>
                  <p className="text-xs font-medium text-foreground">{prop.specs}</p>
                  <div className="pt-2 border-t flex items-center justify-between text-[11px] text-muted-foreground">
                    <span>{prop.views}</span>
                    <Link href="/dashboard/imoveis" className="text-primary font-medium hover:underline">
                      Ver no Catálogo →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
