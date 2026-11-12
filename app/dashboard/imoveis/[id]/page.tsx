"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Building, 
  ArrowLeft, 
  MapPin, 
  Bed, 
  Bath, 
  Car, 
  Maximize, 
  Share2, 
  Printer, 
  DollarSign, 
  Calculator, 
  MessageSquare, 
  Sparkles,
  CheckCircle2,
  Phone
} from "lucide-react"
import { getWhatsAppLink } from "@/lib/whatsapp"

export default function PropertyDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const propertyId = params?.id as string

  // Mock de dados detalhados do imóvel (com fallback para os dados de teste)
  const property = {
    id: propertyId,
    code: "AP0420",
    title: "Apartamento de Alto Padrão com Varanda Gourmet",
    description: "Amplo living para 3 ambientes integrado à varanda envidraçada com churrasqueira. Cozinha planejada com ilha central e acabamentos em mármore. Suíte master com closet walk-in e hidromassagem. Condomínio clube completo com quadra de tênis, piscina aquecida com raia de 25m, academia moderna e segurança 24h blindada.",
    price: 2450000,
    condoFee: 2100,
    iptu: 850,
    type: "Venda",
    category: "Apartamento",
    status: "Disponível",
    area: 185,
    bedrooms: 3,
    suites: 3,
    bathrooms: 4,
    parking: 3,
    address: "Rua Afonso Braz, 850 - Apto 142",
    neighborhood: "Vila Nova Conceição",
    city: "São Paulo",
    state: "SP",
    zipCode: "04505-001",
    broker: {
      name: "Carlos Silveira",
      phone: "(11) 98765-4321",
      creci: "48.912",
    },
  }

  // Calculadora de Financiamento
  const [downPaymentPercent, setDownPaymentPercent] = useState(20)
  const [termYears, setTermYears] = useState(30)
  const [interestRate, setInterestRate] = useState(9.5) // % ao ano

  const downPayment = (property.price * downPaymentPercent) / 100
  const loanAmount = property.price - downPayment
  const monthlyRate = interestRate / 100 / 12
  const totalMonths = termYears * 12
  const monthlyPayment =
    (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))) /
    (Math.pow(1 + monthlyRate, totalMonths) - 1)

  const shareText = `Confira este imóvel exclusivo: ${property.title} em ${property.neighborhood}. Valor: R$ ${property.price.toLocaleString("pt-BR")}. Código: ${property.code}.`
  const shareWaUrl = getWhatsAppLink("11999999999", shareText)

  return (
    <div className="space-y-6">
      {/* Top Navigation */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Link href="/dashboard/imoveis">
            <Button variant="outline" size="icon" className="h-9 w-9">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">
                CÓD. {property.code}
              </span>
              <span className="rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 text-xs font-medium">
                {property.status}
              </span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight mt-1">{property.title}</h1>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5 text-primary" /> {property.address}, {property.neighborhood} - {property.city}/{property.state}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={shareWaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 h-9 rounded-md border border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/50 px-3 text-xs font-semibold text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 transition-colors"
          >
            <Share2 className="h-3.5 w-3.5" /> Enviar no WhatsApp
          </a>
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.print()}
            className="flex items-center gap-1.5 text-xs h-9"
          >
            <Printer className="h-3.5 w-3.5" /> Ficha de Visita (PDF)
          </Button>
        </div>
      </div>

      {/* Hero Gallery Mock */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2 h-80 rounded-xl bg-gradient-to-tr from-slate-900 via-slate-800 to-indigo-950 relative p-6 flex flex-col justify-between text-white overflow-hidden shadow-md">
          <div className="flex justify-between items-start">
            <span className="rounded bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wider">
              {property.type} • {property.category}
            </span>
            <span className="rounded bg-black/60 backdrop-blur-sm px-2.5 py-1 text-xs font-medium">
              18 fotos cadastradas
            </span>
          </div>

          <div>
            <p className="text-xs text-slate-300">Valor de Venda</p>
            <p className="text-4xl font-black">R$ {property.price.toLocaleString("pt-BR")}</p>
            <p className="text-xs text-slate-300 mt-1">
              Condomínio: R$ {property.condoFee.toLocaleString("pt-BR")} • IPTU: R$ {property.iptu.toLocaleString("pt-BR")}/mês
            </p>
          </div>
        </div>

        <div className="space-y-4 flex flex-col justify-between">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold">Resumo do Imóvel</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between border-b pb-1.5">
                <span className="text-muted-foreground flex items-center gap-1.5">
                  <Maximize className="h-3.5 w-3.5 text-primary" /> Área Útil
                </span>
                <span className="font-bold">{property.area} m²</span>
              </div>
              <div className="flex items-center justify-between border-b pb-1.5">
                <span className="text-muted-foreground flex items-center gap-1.5">
                  <Bed className="h-3.5 w-3.5 text-primary" /> Dormitórios / Suítes
                </span>
                <span className="font-bold">{property.bedrooms} qtos ({property.suites} suítes)</span>
              </div>
              <div className="flex items-center justify-between border-b pb-1.5">
                <span className="text-muted-foreground flex items-center gap-1.5">
                  <Bath className="h-3.5 w-3.5 text-primary" /> Banheiros
                </span>
                <span className="font-bold">{property.bathrooms} banheiros</span>
              </div>
              <div className="flex items-center justify-between pb-1">
                <span className="text-muted-foreground flex items-center gap-1.5">
                  <Car className="h-3.5 w-3.5 text-primary" /> Vagas na Garagem
                </span>
                <span className="font-bold">{property.parking} vagas cobertas</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-muted/40 border-dashed">
            <CardContent className="p-4 space-y-2">
              <p className="text-xs font-semibold text-muted-foreground uppercase">Corretor Responsável</p>
              <p className="text-sm font-bold text-foreground">{property.broker.name}</p>
              <p className="text-xs text-muted-foreground">CRECI: {property.broker.creci}</p>
              <div className="pt-1 flex items-center gap-2">
                <a
                  href={`tel:${property.broker.phone.replace(/\D/g, "")}`}
                  className="inline-flex items-center gap-1 text-xs text-primary font-medium hover:underline"
                >
                  <Phone className="h-3 w-3" /> {property.broker.phone}
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Description & Loan Simulator */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Descrição do Imóvel & Diferenciais</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {property.description}
            </p>

            <div className="pt-4 border-t">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                Comodidades do Condomínio
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
                {[
                  "Piscina Aquecida",
                  "Academia Completa",
                  "Espaço Gourmet",
                  "Churrasqueira",
                  "Quadra de Tênis",
                  "Salão de Festas",
                  "Portaria Blindada 24h",
                  "Pet Place",
                  "Gerador para Áreas Comuns",
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

        {/* Financing Calculator */}
        <Card className="border-primary/40 shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Calculator className="h-4 w-4 text-primary" />
              <CardTitle className="text-sm font-bold">Simulação de Financiamento</CardTitle>
            </div>
            <CardDescription className="text-xs">
              Estimativa com base no Sistema de Amortização Constante (SAC).
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3.5 text-xs">
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Entrada ({downPaymentPercent}%):</span>
                <span className="font-bold">R$ {downPayment.toLocaleString("pt-BR")}</span>
              </div>
              <input
                type="range"
                min="20"
                max="80"
                step="5"
                value={downPaymentPercent}
                onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                className="w-full accent-primary cursor-pointer"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Prazo ({termYears} anos):</span>
                <span className="font-bold">{totalMonths} meses</span>
              </div>
              <input
                type="range"
                min="10"
                max="35"
                step="5"
                value={termYears}
                onChange={(e) => setTermYears(Number(e.target.value))}
                className="w-full accent-primary cursor-pointer"
              />
            </div>

            <div className="rounded-lg bg-primary/10 p-3 space-y-1 text-center">
              <p className="text-[11px] text-muted-foreground">Parcela Inicial Estimada</p>
              <p className="text-2xl font-black text-primary">
                R$ {Math.round(monthlyPayment).toLocaleString("pt-BR")} <span className="text-xs font-normal">/mês</span>
              </p>
              <p className="text-[10px] text-muted-foreground">Taxa estimada de {interestRate}% a.a. (Caixa/Itaú/Bradesco)</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

