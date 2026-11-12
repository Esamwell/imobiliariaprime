"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { 
  Building, 
  MapPin, 
  Bed, 
  Bath, 
  Car, 
  Maximize, 
  MessageSquare, 
  CheckCircle2, 
  Phone, 
  Calendar, 
  Share2, 
  Check, 
  Loader2, 
  Sparkles,
  ArrowRight
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { getWhatsAppLink } from "@/lib/whatsapp"

export default function PublicPropertyPage() {
  const params = useParams()
  const code = (params?.code as string) || "AP0420"

  // Lead capture form state
  const [leadName, setLeadName] = useState("")
  const [leadPhone, setLeadPhone] = useState("")
  const [leadEmail, setLeadEmail] = useState("")
  const [leadMessage, setLeadMessage] = useState("Olá, tenho interesse neste imóvel e gostaria de mais informações.")
  const [submitting, setSubmitting] = useState(false)
  const [sent, setSent] = useState(false)

  // Dados do Imóvel para a vitrine pública
  const property = {
    code: code.toUpperCase(),
    title: "Apartamento de Alto Padrão com Varanda Gourmet",
    description: "Amplo living para 3 ambientes integrado à varanda envidraçada com churrasqueira. Cozinha planejada com ilha central e acabamentos em mármore. Suíte master com closet walk-in e hidromassagem. Condomínio clube completo com quadra de tênis, piscina aquecida com raia de 25m, academia moderna e segurança 24h blindada.",
    price: 2450000,
    condoFee: 2100,
    iptu: 850,
    type: "Venda",
    category: "Apartamento",
    area: 185,
    bedrooms: 3,
    suites: 3,
    bathrooms: 4,
    parking: 3,
    neighborhood: "Vila Nova Conceição",
    city: "São Paulo",
    state: "SP",
    agency: "Imobiliária Prime",
    broker: {
      name: "Carlos Silveira",
      phone: "(11) 98765-4321",
      creci: "48.912",
    },
  }

  const waUrl = getWhatsAppLink(
    property.broker.phone,
    `Olá ${property.broker.name}, vi o anúncio do imóvel ${property.title} (Cód: ${property.code}) no valor de R$ ${property.price.toLocaleString("pt-BR")} e gostaria de agendar uma visita!`
  )

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      // Cria o lead direto no funil de vendas do corretor via API
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: leadName,
          phone: leadPhone,
          email: leadEmail,
          origin: "Site Direto",
          budget: `R$ ${property.price.toLocaleString("pt-BR")}`,
          notes: `Interesse no imóvel ${property.code} (${property.title}). Mensagem: ${leadMessage}`,
          hot: true,
          stage: "NOVO",
        }),
      })

      setSent(true)
    } catch (err) {
      console.error(err)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-between">
      {/* Top Bar Pública */}
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur px-4 sm:px-8 h-16 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
            <Building className="h-5 w-5" />
          </div>
          <div>
            <span className="font-extrabold text-base leading-none tracking-tight">{property.agency}</span>
            <span className="block text-[10px] text-muted-foreground">Portal Imobiliário Oficial</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs px-3.5 py-2 shadow-sm transition-colors"
          >
            <MessageSquare className="h-4 w-4" />
            <span className="hidden sm:inline">Falar no</span> WhatsApp
          </a>

          <Link href="/login" className="text-xs text-muted-foreground hover:text-foreground">
            Acesso Corretor
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto w-full p-4 sm:p-6 space-y-6">
        {/* Title & Location Header */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="rounded bg-primary/10 text-primary px-2.5 py-0.5 text-xs font-bold font-mono">
              CÓD. {property.code}
            </span>
            <span className="rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 px-2.5 py-0.5 text-xs font-semibold">
              Disponível para {property.type}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            {property.title}
          </h1>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            <MapPin className="h-4 w-4 text-primary shrink-0" />
            {property.neighborhood}, {property.city} - {property.state}
          </p>
        </div>

        {/* Gallery Hero */}
        <div className="grid gap-4 md:grid-cols-3">
          <div className="md:col-span-2 h-96 rounded-2xl bg-gradient-to-tr from-slate-900 via-slate-800 to-indigo-950 p-6 flex flex-col justify-between text-white relative shadow-xl overflow-hidden">
            <div className="flex justify-between items-start">
              <span className="rounded bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wider shadow">
                {property.type} • {property.category}
              </span>
              <span className="rounded bg-black/60 backdrop-blur-sm px-3 py-1 text-xs font-medium">
                Fotos em Alta Resolução
              </span>
            </div>

            <div>
              <p className="text-xs text-slate-300">Valor do Imóvel</p>
              <p className="text-4xl sm:text-5xl font-black tracking-tight">
                R$ {property.price.toLocaleString("pt-BR")}
              </p>
              <p className="text-xs text-slate-300 mt-1">
                Condomínio: R$ {property.condoFee.toLocaleString("pt-BR")} • IPTU: R$ {property.iptu.toLocaleString("pt-BR")}/mês
              </p>
            </div>
          </div>

          {/* Quick Specs Card */}
          <Card className="flex flex-col justify-between shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-bold">Ficha Técnica</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center justify-between border-b pb-2">
                <span className="text-muted-foreground flex items-center gap-2">
                  <Maximize className="h-4 w-4 text-primary" /> Área Privativa
                </span>
                <span className="font-extrabold">{property.area} m²</span>
              </div>
              <div className="flex items-center justify-between border-b pb-2">
                <span className="text-muted-foreground flex items-center gap-2">
                  <Bed className="h-4 w-4 text-primary" /> Dormitórios / Suítes
                </span>
                <span className="font-extrabold">{property.bedrooms} qtos ({property.suites} suítes)</span>
              </div>
              <div className="flex items-center justify-between border-b pb-2">
                <span className="text-muted-foreground flex items-center gap-2">
                  <Bath className="h-4 w-4 text-primary" /> Banheiros
                </span>
                <span className="font-extrabold">{property.bathrooms} banheiros</span>
              </div>
              <div className="flex items-center justify-between border-b pb-2">
                <span className="text-muted-foreground flex items-center gap-2">
                  <Car className="h-4 w-4 text-primary" /> Vagas de Garagem
                </span>
                <span className="font-extrabold">{property.parking} vagas</span>
              </div>

              <div className="pt-2">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm py-2.5 rounded-lg transition-colors shadow"
                >
                  <MessageSquare className="h-4 w-4" /> Agendar Visita via WhatsApp
                </a>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Description & Lead Capture Form */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* Property Description */}
          <div className="md:col-span-2 space-y-6">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Sobre o Imóvel</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm leading-relaxed text-muted-foreground">
                <p>{property.description}</p>

                <div className="pt-4 border-t">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-foreground mb-3">
                    Infraestrutura do Condomínio
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs text-foreground">
                    {[
                      "Piscina com Raia",
                      "Academia Moderna",
                      "Espaço Gourmet",
                      "Churrasqueira",
                      "Quadra Poliesportiva",
                      "Salão de Festas",
                      "Portaria 24 Horas",
                      "Segurança com Câmeras",
                      "Área Verde & Jardim",
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Broker Badge */}
            <div className="rounded-xl border bg-card p-4 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-base">
                  CS
                </div>
                <div>
                  <p className="font-bold text-sm text-foreground">{property.broker.name}</p>
                  <p className="text-xs text-muted-foreground">Corretor Credenciado • CRECI {property.broker.creci}</p>
                </div>
              </div>

              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 border border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 font-semibold text-xs px-3 py-2 rounded-lg hover:bg-emerald-100 transition-colors"
              >
                <MessageSquare className="h-3.5 w-3.5" /> Falar com Carlos
              </a>
            </div>
          </div>

          {/* Lead Capture Form */}
          <div>
            <Card className="border-primary shadow-lg sticky top-20">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-bold flex items-center gap-1.5 text-primary">
                  <Sparkles className="h-4 w-4" /> Tenho Interesse
                </CardTitle>
                <CardDescription className="text-xs">
                  Envie seus dados para que o corretor entre em contato em menos de 15 minutos.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {sent ? (
                  <div className="rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 p-4 text-center space-y-2">
                    <Check className="h-8 w-8 text-emerald-600 mx-auto" />
                    <p className="font-bold text-sm text-emerald-800 dark:text-emerald-200">
                      Mensagem Enviada com Sucesso!
                    </p>
                    <p className="text-xs text-emerald-700 dark:text-emerald-300">
                      O corretor já recebeu sua solicitação diretamente no painel do CRM e entrará em contato.
                    </p>
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block pt-2 text-xs font-bold text-emerald-800 dark:text-emerald-200 underline"
                    >
                      Acelerar pelo WhatsApp →
                    </a>
                  </div>
                ) : (
                  <form onSubmit={handleLeadSubmit} className="space-y-3 text-xs">
                    <div className="space-y-1">
                      <label className="font-semibold text-foreground">Seu Nome</label>
                      <input
                        type="text"
                        required
                        placeholder="Nome completo"
                        value={leadName}
                        onChange={(e) => setLeadName(e.target.value)}
                        className="w-full h-9 rounded-md border border-input bg-background px-3 text-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-semibold text-foreground">WhatsApp com DDD</label>
                      <input
                        type="text"
                        required
                        placeholder="(11) 99999-9999"
                        value={leadPhone}
                        onChange={(e) => setLeadPhone(e.target.value)}
                        className="w-full h-9 rounded-md border border-input bg-background px-3 text-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-semibold text-foreground">E-mail</label>
                      <input
                        type="email"
                        placeholder="seu.email@exemplo.com"
                        value={leadEmail}
                        onChange={(e) => setLeadEmail(e.target.value)}
                        className="w-full h-9 rounded-md border border-input bg-background px-3 text-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-semibold text-foreground">Mensagem</label>
                      <textarea
                        rows={3}
                        value={leadMessage}
                        onChange={(e) => setLeadMessage(e.target.value)}
                        className="w-full rounded-md border border-input bg-background p-2.5 text-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      />
                    </div>

                    <Button type="submit" disabled={submitting} className="w-full h-10 font-bold gap-2 text-xs">
                      {submitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" /> Enviando...
                        </>
                      ) : (
                        <>
                          Quero Receber Contato <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-card py-6 text-center text-xs text-muted-foreground mt-12">
        <p>© 2026 {property.agency} • Todos os direitos reservados • CRECI Jurídico 12.345-J</p>
      </footer>
    </div>
  )
}

