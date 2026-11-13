"use client"

import { useState, useMemo } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { TactusLogo } from "@/components/tactus-logo"
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
  ArrowRight,
  ArrowLeft,
  Calculator,
  ShieldCheck,
  Printer,
  ChevronRight,
  Home
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { getWhatsAppLink } from "@/lib/whatsapp"

interface PropertyDetail {
  code: string
  title: string
  description: string
  price: number
  condoFee?: number
  iptu?: number
  type: "Venda" | "Aluguel"
  category: string
  status: string
  area: number
  bedrooms: number
  suites: number
  bathrooms: number
  parking: number
  address?: string
  neighborhood: string
  city: string
  state: string
  agency: string
  images: string[]
  features: string[]
  broker: {
    name: string
    phone: string
    creci: string
    email: string
  }
}

const PROPERTIES_DB: Record<string, PropertyDetail> = {
  AP0420: {
    code: "AP0420",
    title: "Apartamento de Alto Padrão com Varanda Gourmet",
    description: "Amplo living para 3 ambientes integrado à varanda envidraçada com churrasqueira a carvão e vista livre. Cozinha planejada com ilha central e bancadas em mármore calacatta. Suíte master com closet walk-in e hidromassagem. Condomínio clube completo com quadra de tênis oficial, piscina aquecida com raia de 25m, academia moderna equipada com Life Fitness e segurança 24h blindada.",
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
    address: "Rua Afonso Braz, 820",
    neighborhood: "Vila Nova Conceição",
    city: "São Paulo",
    state: "SP",
    agency: "Imobiliária Prime",
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&auto=format&fit=crop&q=80",
    ],
    features: [
      "Varanda Gourmet Envidraçada",
      "Piscina Aquecida com Raia de 25m",
      "Quadra de Tênis Oficial",
      "Academia Life Fitness",
      "Ar Condicionado Central",
      "Fechadura Biométrica",
      "Gerador 100% no Prédio",
      "Depósito Privativo no Subsolo"
    ],
    broker: {
      name: "Carlos Eduardo Silveira",
      phone: "(11) 98765-4321",
      creci: "48.912",
      email: "carlos@primeimoveis.com.br",
    },
  },
  CS0118: {
    code: "CS0118",
    title: "Mansão Contemporânea em Condomínio Fechado",
    description: "Arquitetura moderna assinada por arquiteto premiado, fachada imponente em concreto aparente e vidro. Piscina com borda infinita aquecida por energia solar, espaço gourmet com chopeira embutida e churrasqueira parrilla. 4 amplas suítes com varanda privativa e persianas automatizadas. Paisagismo exuberante com irrigação inteligente.",
    price: 4900000,
    condoFee: 1800,
    iptu: 1200,
    type: "Venda",
    category: "Casa",
    status: "Reservado",
    area: 420,
    bedrooms: 4,
    suites: 4,
    bathrooms: 6,
    parking: 4,
    address: "Alameda dos Jacarandás, 140",
    neighborhood: "Alphaville",
    city: "Barueri",
    state: "SP",
    agency: "Imobiliária Prime",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&auto=format&fit=crop&q=80",
    ],
    features: [
      "Piscina com Borda Infinita",
      "Espaço Gourmet com Parrilla",
      "Energia Solar Fotovoltaica",
      "Segurança Armada 24h",
      "Home Theater Acústico",
      "Garagem Subterrânea para 4 Carros",
      "Sauna a Vapor Integrada à Piscina",
      "Automação Residencial Completa"
    ],
    broker: {
      name: "Carlos Eduardo Silveira",
      phone: "(11) 98765-4321",
      creci: "48.912",
      email: "carlos@primeimoveis.com.br",
    },
  },
  CB0089: {
    code: "CB0089",
    title: "Cobertura Duplex com Vista Panorâmica",
    description: "Piso superior com deck em madeira cumaru e jacuzzi privativa aquecida, vista deslumbrante 360° para a copa das árvores de Moema Pássaros. Living amplo com pé direito duplo integrado à sala de jantar e adega climatizada. Localização nobre a poucos passos do Parque Ibirapuera.",
    price: 14500,
    condoFee: 2800,
    iptu: 950,
    type: "Aluguel",
    category: "Cobertura",
    status: "Disponível",
    area: 210,
    bedrooms: 3,
    suites: 3,
    bathrooms: 4,
    parking: 3,
    address: "Avenida Rouxinol, 450",
    neighborhood: "Moema Pássaros",
    city: "São Paulo",
    state: "SP",
    agency: "Imobiliária Prime",
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&auto=format&fit=crop&q=80",
    ],
    features: [
      "Jacuzzi Privativa no Terraço",
      "Deck em Madeira Cumaru",
      "Adega Climatizada",
      "Pé Direito Duplo no Living",
      "A 500m do Parque Ibirapuera",
      "Edifício Exclusivo com 1 por Andar"
    ],
    broker: {
      name: "Mariana Alencar",
      phone: "(11) 99888-7766",
      creci: "52.180",
      email: "mariana@primeimoveis.com.br",
    },
  },
  AP0552: {
    code: "AP0552",
    title: "Studio Design Mobiliado próximo ao Metrô Fradique",
    description: "Apartamento compacto 100% mobiliado por escritório de arquitetura renomado. Marcenaria planejada sob medida com aproveitamento inteligente de espaços. Condomínio com rooftop com piscina de borda infinita, coworking, lavanderia compartilhada OMO e academia de ponta.",
    price: 4200,
    condoFee: 680,
    iptu: 180,
    type: "Aluguel",
    category: "Apartamento",
    status: "Disponível",
    area: 42,
    bedrooms: 1,
    suites: 1,
    bathrooms: 1,
    parking: 1,
    address: "Rua Fradique Coutinho, 310",
    neighborhood: "Pinheiros",
    city: "São Paulo",
    state: "SP",
    agency: "Imobiliária Prime",
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&auto=format&fit=crop&q=80",
    ],
    features: [
      "100% Mobiliado e Decorado",
      "A 150m do Metrô Fradique Coutinho",
      "Rooftop com Piscina e Coworking",
      "Lavanderia Compartilhada OMO",
      "Fechadura Biométrica",
      "Vaga de Garagem Coberta"
    ],
    broker: {
      name: "Mariana Alencar",
      phone: "(11) 99888-7766",
      creci: "52.180",
      email: "mariana@primeimoveis.com.br",
    },
  },
  CM0034: {
    code: "CM0034",
    title: "Conjunto Comercial Pronto com Piso Elevado",
    description: "Laje corporativa pronta para ocupação imediata com piso elevado em ardósia, cabeamento estruturado e ar condicionado central VRF. Edifício de altíssimo padrão com heliponto, controle de acesso por reconhecimento facial e estacionamento com manobrista.",
    price: 1850000,
    condoFee: 1950,
    iptu: 650,
    type: "Venda",
    category: "Comercial",
    status: "Disponível",
    area: 95,
    bedrooms: 0,
    suites: 0,
    bathrooms: 2,
    parking: 2,
    address: "Rua Joaquim Floriano, 720",
    neighborhood: "Itaim Bibi",
    city: "São Paulo",
    state: "SP",
    agency: "Imobiliária Prime",
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&auto=format&fit=crop&q=80",
    ],
    features: [
      "Piso Elevado com Cabeamento 6A",
      "Ar Central VRF",
      "Heliponto Homologado",
      "Reconhecimento Facial",
      "Gerador 100% para Áreas Privativas"
    ],
    broker: {
      name: "Carlos Eduardo Silveira",
      phone: "(11) 98765-4321",
      creci: "48.912",
      email: "carlos@primeimoveis.com.br",
    },
  },
  CS0220: {
    code: "CS0220",
    title: "Casa Térrea com Quintal Amplo e Espaço Gourmet",
    description: "Ambientes integrados e iluminados, sala de estar com lareira ecológica, cozinha americana com ilha em granito. Ampla área externa com jardim gramado, árvores frutíferas e edícula gourmet completa.",
    price: 1680000,
    condoFee: 920,
    iptu: 450,
    type: "Venda",
    category: "Casa",
    status: "Disponível",
    area: 280,
    bedrooms: 3,
    suites: 2,
    bathrooms: 3,
    parking: 3,
    address: "Rua das Figueiras, 55",
    neighborhood: "Granja Viana",
    city: "Cotia",
    state: "SP",
    agency: "Imobiliária Prime",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&auto=format&fit=crop&q=80",
    ],
    features: [
      "Amplo Quintal com Jardim",
      "Espaço Gourmet com Forno de Pizza",
      "Condomínio com Lago e Trilha",
      "Placas Solares para Aquecimento",
      "Portaria com Ronda 24h"
    ],
    broker: {
      name: "Carlos Eduardo Silveira",
      phone: "(11) 98765-4321",
      creci: "48.912",
      email: "carlos@primeimoveis.com.br",
    },
  },
}

export default function PublicPropertyPage() {
  const params = useParams()
  const rawCode = (params?.code as string) || "AP0420"
  const code = rawCode.toUpperCase()

  const property = PROPERTIES_DB[code] || PROPERTIES_DB["AP0420"]
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  // Lead capture form state
  const [leadName, setLeadName] = useState("")
  const [leadPhone, setLeadPhone] = useState("")
  const [leadEmail, setLeadEmail] = useState("")
  const [leadMessage, setLeadMessage] = useState(`Olá, tenho interesse no imóvel ${property.code} (${property.title}) e gostaria de agendar uma visita.`)
  const [submitting, setSubmitting] = useState(false)
  const [sent, setSent] = useState(false)
  const [copied, setCopied] = useState(false)

  // Simulador de Financiamento
  const [entryPercent, setEntryPercent] = useState("20")
  const [months, setMonths] = useState("360")
  const annualInterestRate = 0.098 // 9.8% ao ano (Caixa / Bancos)

  const simulation = useMemo(() => {
    const entryValue = property.price * (parseFloat(entryPercent) / 100)
    const financedValue = property.price - entryValue
    const monthlyRate = annualInterestRate / 12
    const n = parseInt(months) || 360
    // Fórmula Price: Pmt = PV * [i * (1+i)^n] / [(1+i)^n - 1]
    const installment = financedValue * (monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1)
    return {
      entryValue,
      financedValue,
      installment,
    }
  }, [property.price, entryPercent, months])

  const waUrl = getWhatsAppLink(
    property.broker.phone,
    `Olá ${property.broker.name}, vi o anúncio no site do imóvel ${property.title} (Cód: ${property.code}) no valor de R$ ${property.price.toLocaleString("pt-BR")} e gostaria de agendar uma visita!`
  )

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }
  }

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: leadName,
          phone: leadPhone,
          email: leadEmail,
          origin: "Página do Imóvel",
          budget: `R$ ${property.price.toLocaleString("pt-BR")}`,
          notes: `Interesse no imóvel ${property.code} (${property.title}). Mensagem: ${leadMessage}`,
          hot: true,
          stage: "NOVO",
        }),
      })
      setSent(true)
    } catch {
      setSent(true)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-between">
      {/* 1. Header com Navegação */}
      <header className="sticky top-0 z-30 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/imoveis" className="flex items-center gap-2.5 group">
            <div className="h-9 w-9 rounded-2xl bg-black/[0.04] dark:bg-white/[0.08] border border-black/[0.06] dark:border-white/[0.10] p-1.5 flex items-center justify-center shadow-sm transition-transform group-hover:scale-105">
              <TactusLogo variant="auto" size="sm" className="h-full w-full" />
            </div>
            <div>
              <span className="font-extrabold text-base leading-none block text-foreground">Tactus Imóveis</span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider block mt-0.5">Ficha do Imóvel</span>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Ver Todos os Imóveis
            </Link>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 h-8 px-3 rounded-md border border-input bg-background hover:bg-muted text-xs font-semibold transition-colors"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Share2 className="h-3.5 w-3.5 text-muted-foreground" />}
              {copied ? "Link Copiado!" : "Compartilhar"}
            </button>

            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 h-8 px-3.5 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors shadow-xs"
            >
              <MessageSquare className="h-3.5 w-3.5" />
              WhatsApp
            </a>
          </div>
        </div>
      </header>

      {/* 2. Conteúdo Principal do Imóvel */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1 space-y-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Link href="/" className="hover:text-foreground">Início</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/" className="hover:text-foreground">{property.type}s</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="font-semibold text-foreground truncate max-w-xs">{property.title}</span>
        </div>

        {/* Título & Preço */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b pb-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-md bg-primary px-3 py-1 text-xs font-black uppercase tracking-wider text-white">
                {property.type}
              </span>
              <span className="rounded-md bg-muted px-2.5 py-1 text-xs font-bold text-muted-foreground">
                {property.category}
              </span>
              <span className="rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 px-3 py-0.5 text-xs font-bold">
                {property.status}
              </span>
              <span className="text-xs font-mono text-muted-foreground">
                Cód: {property.code}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-foreground">
              {property.title}
            </h1>

            <p className="text-sm text-muted-foreground flex items-center gap-1.5 font-medium">
              <MapPin className="h-4 w-4 text-primary shrink-0" />
              {property.address ? `${property.address}, ` : ""}{property.neighborhood}, {property.city} - {property.state}
            </p>
          </div>

          <div className="md:text-right space-y-1">
            <span className="text-xs uppercase font-bold text-muted-foreground tracking-wider block">
              Valor {property.type === "Aluguel" ? "Mensal" : "de Venda"}
            </span>
            <p className="text-3xl sm:text-4xl font-black tracking-tight text-primary">
              {property.type === "Aluguel"
                ? `R$ ${property.price.toLocaleString("pt-BR")} /mês`
                : `R$ ${property.price.toLocaleString("pt-BR")}`}
            </p>
            {(property.condoFee || property.iptu) && (
              <p className="text-xs text-muted-foreground">
                {property.condoFee ? `Condomínio: R$ ${property.condoFee.toLocaleString("pt-BR")} ` : ""}
                {property.iptu ? `| IPTU: R$ ${property.iptu.toLocaleString("pt-BR")}` : ""}
              </p>
            )}
          </div>
        </div>

        {/* 3. Galeria de Fotos em Alta Definição */}
        <div className="space-y-3">
          <div className="h-96 sm:h-[480px] w-full rounded-2xl overflow-hidden bg-slate-900 shadow-xl relative">
            <img
              src={property.images[activeImageIndex] || property.images[0]}
              alt={property.title}
              className="w-full h-full object-cover transition-all duration-500"
            />
            <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-xs font-bold">
              Foto {activeImageIndex + 1} de {property.images.length}
            </div>
          </div>

          {/* Thumbnails */}
          {property.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {property.images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={`h-20 w-32 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                    activeImageIndex === idx
                      ? "border-primary scale-105 shadow-md"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 4. Grid Principal: Ficha Técnica + Contato */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Coluna Esquerda: Especificações, Descrição e Simulador */}
          <div className="lg:col-span-2 space-y-8">
            {/* Especificações em Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
              <Card className="border shadow-xs">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold">
                    <Maximize className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-muted-foreground block font-medium">Área Útil</span>
                    <span className="text-base font-black text-foreground">{property.area} m²</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border shadow-xs">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold">
                    <Bed className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-muted-foreground block font-medium">Quartos / Suítes</span>
                    <span className="text-base font-black text-foreground">{property.bedrooms} qtos ({property.suites} suítes)</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border shadow-xs">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold">
                    <Bath className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-muted-foreground block font-medium">Banheiros</span>
                    <span className="text-base font-black text-foreground">{property.bathrooms} banheiros</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border shadow-xs">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold">
                    <Car className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-muted-foreground block font-medium">Vagas Cobertas</span>
                    <span className="text-base font-black text-foreground">{property.parking} vagas</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Descrição Completa */}
            <Card className="border shadow-xs">
              <CardHeader>
                <CardTitle className="text-lg">Sobre o Imóvel</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm leading-relaxed text-muted-foreground">
                <p className="text-foreground font-normal">{property.description}</p>

                {/* Diferenciais e Lazer */}
                <div className="pt-4 border-t">
                  <h4 className="font-bold text-sm text-foreground mb-3 flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-primary" />
                    Características & Infraestrutura
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-foreground">
                    {property.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Simulador de Financiamento (apenas para Venda) */}
            {property.type === "Venda" && (
              <Card className="border shadow-xs bg-gradient-to-br from-card via-card to-primary/5">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Calculator className="h-5 w-5 text-primary" />
                    Simulador de Financiamento Imobiliário
                  </CardTitle>
                  <CardDescription>
                    Estimativa baseada nas taxas dos principais bancos (Caixa, Itaú, Santander, Bradesco - Taxa média ~9,8% a.a.).
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-muted-foreground">Entrada Mínima</label>
                      <select
                        value={entryPercent}
                        onChange={(e) => setEntryPercent(e.target.value)}
                        className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm"
                      >
                        <option value="20">20% (R$ {(property.price * 0.2).toLocaleString("pt-BR")})</option>
                        <option value="30">30% (R$ {(property.price * 0.3).toLocaleString("pt-BR")})</option>
                        <option value="40">40% (R$ {(property.price * 0.4).toLocaleString("pt-BR")})</option>
                        <option value="50">50% (R$ {(property.price * 0.5).toLocaleString("pt-BR")})</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-muted-foreground">Prazo do Financiamento</label>
                      <select
                        value={months}
                        onChange={(e) => setMonths(e.target.value)}
                        className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm"
                      >
                        <option value="420">35 anos (420 meses)</option>
                        <option value="360">30 anos (360 meses)</option>
                        <option value="240">20 anos (240 meses)</option>
                        <option value="120">10 anos (120 meses)</option>
                      </select>
                    </div>
                  </div>

                  {/* Resultado do Cálculo */}
                  <div className="rounded-xl bg-primary/10 border border-primary/20 p-4 grid grid-cols-3 gap-2 text-center">
                    <div>
                      <span className="text-[11px] text-muted-foreground block font-medium">Entrada</span>
                      <span className="text-sm font-bold text-foreground">
                        R$ {simulation.entryValue.toLocaleString("pt-BR", { maximumFractionDigits: 0 })}
                      </span>
                    </div>
                    <div>
                      <span className="text-[11px] text-muted-foreground block font-medium">Saldo Financiado</span>
                      <span className="text-sm font-bold text-foreground">
                        R$ {simulation.financedValue.toLocaleString("pt-BR", { maximumFractionDigits: 0 })}
                      </span>
                    </div>
                    <div>
                      <span className="text-[11px] text-muted-foreground block font-medium">Parcela Inicial Est.</span>
                      <span className="text-base font-black text-primary">
                        R$ {simulation.installment.toLocaleString("pt-BR", { maximumFractionDigits: 0 })}/mês
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Coluna Direita: Corretor & Formulário de Contato Direto */}
          <div className="space-y-6">
            {/* Card do Corretor */}
            <Card className="border shadow-md sticky top-24">
              <CardHeader className="pb-3 border-b">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                    {property.broker.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-foreground">{property.broker.name}</h3>
                    <p className="text-xs text-muted-foreground font-medium">
                      Corretor Credenciado • CRECI {property.broker.creci}
                    </p>
                    <p className="text-[11px] text-primary font-bold">{property.agency}</p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-4 space-y-4">
                {/* Botões Rápidos de Ação */}
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-10 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-colors"
                  >
                    <MessageSquare className="h-4 w-4" />
                    WhatsApp
                  </a>

                  <a
                    href={`tel:${property.broker.phone.replace(/\D/g, "")}`}
                    className="h-10 rounded-lg border border-input bg-background hover:bg-muted font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Phone className="h-4 w-4 text-primary" />
                    Ligar
                  </a>
                </div>

                {/* Formulário de Envio de Mensagem Direta */}
                <div className="border-t pt-4">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-muted-foreground mb-3">
                    Agende uma Visita ao Imóvel
                  </h4>

                  {sent ? (
                    <div className="p-4 text-center space-y-2 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200">
                      <CheckCircle2 className="h-8 w-8 text-emerald-600 mx-auto" />
                      <p className="font-bold text-xs text-emerald-800 dark:text-emerald-200">
                        Mensagem Enviada com Sucesso!
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        O corretor {property.broker.name} entrará em contato em breve.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleLeadSubmit} className="space-y-3">
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-muted-foreground">Seu Nome</label>
                        <input
                          type="text"
                          required
                          placeholder="Nome completo"
                          value={leadName}
                          onChange={(e) => setLeadName(e.target.value)}
                          className="w-full h-8 rounded-md border border-input bg-background px-2.5 text-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-muted-foreground">WhatsApp / Telefone</label>
                        <input
                          type="text"
                          required
                          placeholder="(11) 98765-4321"
                          value={leadPhone}
                          onChange={(e) => setLeadPhone(e.target.value)}
                          className="w-full h-8 rounded-md border border-input bg-background px-2.5 text-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-muted-foreground">E-mail</label>
                        <input
                          type="email"
                          placeholder="seu@email.com"
                          value={leadEmail}
                          onChange={(e) => setLeadEmail(e.target.value)}
                          className="w-full h-8 rounded-md border border-input bg-background px-2.5 text-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-muted-foreground">Mensagem</label>
                        <textarea
                          rows={2}
                          value={leadMessage}
                          onChange={(e) => setLeadMessage(e.target.value)}
                          className="w-full rounded-md border border-input bg-background p-2 text-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                        />
                      </div>

                      <Button type="submit" disabled={submitting} className="w-full font-bold h-9 text-xs shadow-md">
                        {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Solicitar Contato do Corretor"}
                      </Button>
                    </form>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* 5. Rodapé Simples */}
      <footer className="bg-white dark:bg-slate-900 border-t py-8 text-center text-xs text-muted-foreground">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Imobiliária Prime • CRECI 29.400-J</p>
          <div className="flex gap-4">
            <Link href="/" className="hover:text-foreground">Todos os Imóveis</Link>
            <Link href="/login" className="hover:text-foreground font-semibold text-primary">Área do Corretor</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
