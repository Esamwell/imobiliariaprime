"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { 
  Building, 
  Search, 
  MapPin, 
  Bed, 
  Bath, 
  Car, 
  Maximize, 
  Phone, 
  MessageSquare, 
  ShieldCheck, 
  FileText, 
  Sparkles, 
  Calculator, 
  ChevronRight, 
  ArrowRight,
  CheckCircle2,
  Lock,
  Globe,
  SlidersHorizontal,
  Crown
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { getWhatsAppLink } from "@/lib/whatsapp"

interface PropertyItem {
  id: string
  code: string
  title: string
  description: string
  type: "Venda" | "Aluguel"
  category: string
  status: string
  price: number
  condoFee?: number
  iptu?: number
  area: number
  bedrooms: number
  bathrooms: number
  suites: number
  parking: number
  neighborhood: string
  city: string
  state: string
  imageUrl: string
  broker: {
    name: string
    phone: string
  }
}

const PROPERTIES_DATA: PropertyItem[] = [
  {
    id: "prop-1",
    code: "AP0420",
    title: "Apartamento de Alto Padrão com Varanda Gourmet",
    description: "Amplo living para 3 ambientes integrado à varanda envidraçada com churrasqueira. Cozinha planejada com ilha central e acabamentos em mármore.",
    type: "Venda",
    category: "Apartamento",
    status: "Disponível",
    price: 2450000,
    condoFee: 2100,
    iptu: 850,
    area: 185,
    bedrooms: 3,
    bathrooms: 4,
    suites: 3,
    parking: 3,
    neighborhood: "Vila Nova Conceição",
    city: "São Paulo",
    state: "SP",
    imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&auto=format&fit=crop&q=80",
    broker: { name: "Carlos Silveira", phone: "(11) 98765-4321" },
  },
  {
    id: "prop-2",
    code: "CS0118",
    title: "Mansão Contemporânea em Condomínio Fechado",
    description: "Arquitetura moderna assinada, piscina com borda infinita, espaço gourmet completo e paisagismo exuberante.",
    type: "Venda",
    category: "Casa",
    status: "Reservado",
    price: 4900000,
    condoFee: 1800,
    iptu: 1200,
    area: 420,
    bedrooms: 4,
    bathrooms: 6,
    suites: 4,
    parking: 4,
    neighborhood: "Alphaville",
    city: "Barueri",
    state: "SP",
    imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&auto=format&fit=crop&q=80",
    broker: { name: "Carlos Silveira", phone: "(11) 98765-4321" },
  },
  {
    id: "prop-3",
    code: "CB0089",
    title: "Cobertura Duplex com Vista Panorâmica",
    description: "Piso superior com deck e jacuzzi privativa, vista deslumbrante para a copa das árvores de Moema.",
    type: "Aluguel",
    category: "Cobertura",
    status: "Disponível",
    price: 14500,
    condoFee: 2800,
    iptu: 950,
    area: 210,
    bedrooms: 3,
    bathrooms: 4,
    suites: 3,
    parking: 3,
    neighborhood: "Moema Pássaros",
    city: "São Paulo",
    state: "SP",
    imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&auto=format&fit=crop&q=80",
    broker: { name: "Mariana Alencar", phone: "(11) 99888-7766" },
  },
  {
    id: "prop-4",
    code: "AP0552",
    title: "Studio Design Mobiliado próximo ao Metrô Fradique",
    description: "Apartamento compacto 100% mobiliado por arquiteto, marcenaria sob medida e fechadura biométrica.",
    type: "Aluguel",
    category: "Apartamento",
    status: "Disponível",
    price: 4200,
    condoFee: 680,
    iptu: 180,
    area: 42,
    bedrooms: 1,
    bathrooms: 1,
    suites: 1,
    parking: 1,
    neighborhood: "Pinheiros",
    city: "São Paulo",
    state: "SP",
    imageUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&auto=format&fit=crop&q=80",
    broker: { name: "Mariana Alencar", phone: "(11) 99888-7766" },
  },
  {
    id: "prop-5",
    code: "CM0034",
    title: "Conjunto Comercial Pronto com Piso Elevado",
    description: "Laje corporativa com cabeamento estruturado, ar central VRF, 2 banheiros e copa integrada.",
    type: "Venda",
    category: "Comercial",
    status: "Disponível",
    price: 1850000,
    condoFee: 1950,
    iptu: 650,
    area: 95,
    bedrooms: 0,
    bathrooms: 2,
    suites: 0,
    parking: 2,
    neighborhood: "Itaim Bibi",
    city: "São Paulo",
    state: "SP",
    imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&auto=format&fit=crop&q=80",
    broker: { name: "Carlos Silveira", phone: "(11) 98765-4321" },
  },
  {
    id: "prop-6",
    code: "CS0220",
    title: "Casa Térrea com Quintal Amplo e Espaço Gourmet",
    description: "Ambientes integrados, lareira, edícula gourmet com forno de pizza e churrasqueira a carvão.",
    type: "Venda",
    category: "Casa",
    status: "Disponível",
    price: 1680000,
    condoFee: 920,
    iptu: 450,
    area: 280,
    bedrooms: 3,
    bathrooms: 3,
    suites: 2,
    parking: 3,
    neighborhood: "Granja Viana",
    city: "Cotia",
    state: "SP",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80",
    broker: { name: "Carlos Silveira", phone: "(11) 98765-4321" },
  },
]

export default function RealEstatePortalPage() {
  const [purposeTab, setPurposeTab] = useState<"todos" | "Venda" | "Aluguel">("todos")
  const [selectedCategory, setSelectedCategory] = useState("todos")
  const [searchLocation, setSearchLocation] = useState("")
  const [minBedrooms, setMinBedrooms] = useState("0")

  // Lead de captação (proprietário quer vender/alugar)
  const [ownerName, setOwnerName] = useState("")
  const [ownerPhone, setOwnerPhone] = useState("")
  const [ownerType, setOwnerType] = useState("Vender")
  const [ownerPropertyType, setOwnerPropertyType] = useState("Apartamento")
  const [ownerNeighborhood, setOwnerNeighborhood] = useState("")
  const [ownerSubmitting, setOwnerSubmitting] = useState(false)
  const [ownerSuccess, setOwnerSuccess] = useState(false)

  const filteredProperties = useMemo(() => {
    return PROPERTIES_DATA.filter((p) => {
      if (purposeTab !== "todos" && p.type !== purposeTab) return false
      if (selectedCategory !== "todos" && p.category.toLowerCase() !== selectedCategory.toLowerCase()) return false
      if (parseInt(minBedrooms) > 0 && p.bedrooms < parseInt(minBedrooms)) return false
      if (searchLocation.trim()) {
        const query = searchLocation.toLowerCase()
        const matchesCity = p.city.toLowerCase().includes(query)
        const matchesNeighborhood = p.neighborhood.toLowerCase().includes(query)
        const matchesTitle = p.title.toLowerCase().includes(query)
        const matchesCode = p.code.toLowerCase().includes(query)
        if (!matchesCity && !matchesNeighborhood && !matchesTitle && !matchesCode) return false
      }
      return true
    })
  }, [purposeTab, selectedCategory, searchLocation, minBedrooms])

  const handleOwnerSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setOwnerSubmitting(true)
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: ownerName,
          phone: ownerPhone,
          origin: "Portal Público (Proprietário)",
          stage: "NOVO",
          hot: true,
          notes: `Proprietário quer ${ownerType} seu ${ownerPropertyType} localizado em ${ownerNeighborhood}. Contato urgente para captação.`,
        }),
      })
      setOwnerSuccess(true)
    } catch {
      setOwnerSuccess(true)
    } finally {
      setOwnerSubmitting(false)
    }
  }

  const generalWhatsApp = getWhatsAppLink(
    "(11) 98765-4321",
    "Olá! Acessei o portal da Imobiliária Prime e gostaria de falar com um corretor para encontrar um imóvel."
  )

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-between">
      {/* 1. Header do Portal */}
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="h-11 w-11 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-black text-xl shadow-md group-hover:scale-105 transition-transform">
              <Building className="h-6 w-6" />
            </div>
            <div>
              <span className="font-extrabold text-xl sm:text-2xl tracking-tight block text-foreground leading-none">
                Imobiliária Prime
              </span>
              <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider block mt-1">
                Consultoria Imobiliária • CRECI 29.400-J
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link 
              href="#imoveis" 
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Imóveis à Venda
            </Link>
            <Link 
              href="#imoveis" 
              onClick={() => setPurposeTab("Aluguel")}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Locações
            </Link>
            <Link 
              href="#anuncie" 
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Anuncie seu Imóvel
            </Link>
            <Link 
              href="#diferenciais" 
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Financiamento & Assessoria
            </Link>
          </nav>

          <div className="flex items-center gap-2.5">
            <a
              href={generalWhatsApp}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 h-9 px-3.5 rounded-lg border border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 font-semibold text-xs transition-colors shadow-xs"
            >
              <MessageSquare className="h-4 w-4" />
              WhatsApp Direto
            </a>

            {/* Acesso ao CRM / Login */}
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 h-9 px-4 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-xs shadow-md transition-all hover:shadow-lg"
            >
              <Lock className="h-3.5 w-3.5" />
              Área do Corretor / CRM
            </Link>
          </div>
        </div>
      </header>

      {/* 2. Hero Section com Busca Inteligente */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-900 to-primary/90 text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]"></div>

        <div className="max-w-5xl mx-auto relative z-10 text-center space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-1.5 text-xs font-semibold text-white shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            Os Imóveis Mais Exclusivos de São Paulo e Região
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            Encontre o Imóvel Perfeito para <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-cyan-200 to-amber-200">
              Viver, Trabalhar ou Investir
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-lg text-slate-300 font-normal leading-relaxed">
            Apartamentos de alto padrão, coberturas, casas em condomínio e lajes corporativas com curadoria especializada e segurança jurídica do início ao fim.
          </p>

          {/* Card de Busca Rápida */}
          <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-6 shadow-2xl text-slate-900 dark:text-slate-100 border text-left mt-8">
            {/* Tabs de Finalidade */}
            <div className="flex gap-2 border-b pb-3 mb-4">
              <button
                type="button"
                onClick={() => setPurposeTab("todos")}
                className={`text-xs sm:text-sm font-bold px-4 py-2 rounded-lg transition-all ${
                  purposeTab === "todos"
                    ? "bg-primary text-primary-foreground shadow"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                Todos os Imóveis
              </button>
              <button
                type="button"
                onClick={() => setPurposeTab("Venda")}
                className={`text-xs sm:text-sm font-bold px-4 py-2 rounded-lg transition-all ${
                  purposeTab === "Venda"
                    ? "bg-primary text-primary-foreground shadow"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                Comprar
              </button>
              <button
                type="button"
                onClick={() => setPurposeTab("Aluguel")}
                className={`text-xs sm:text-sm font-bold px-4 py-2 rounded-lg transition-all ${
                  purposeTab === "Aluguel"
                    ? "bg-primary text-primary-foreground shadow"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                Alugar
              </button>
            </div>

            {/* Inputs de Filtro */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              <div className="space-y-1">
                <label className="text-xs font-bold text-muted-foreground">Localização / Bairro</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Ex: Moema, Alphaville..."
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    className="w-full h-10 pl-9 pr-3 rounded-lg border border-input bg-background text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-muted-foreground">Tipologia do Imóvel</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <option value="todos">Todas as Tipologias</option>
                  <option value="apartamento">Apartamento</option>
                  <option value="casa">Casa</option>
                  <option value="cobertura">Cobertura</option>
                  <option value="comercial">Comercial</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-muted-foreground">Quartos Mínimos</label>
                <select
                  value={minBedrooms}
                  onChange={(e) => setMinBedrooms(e.target.value)}
                  className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <option value="0">Qualquer quantidade</option>
                  <option value="1">1+ quartos</option>
                  <option value="2">2+ quartos</option>
                  <option value="3">3+ quartos</option>
                  <option value="4">4+ quartos</option>
                </select>
              </div>

              <div className="space-y-1 flex flex-col justify-end">
                <a
                  href="#imoveis"
                  className="w-full h-10 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-colors"
                >
                  <Search className="h-4 w-4" />
                  Ver {filteredProperties.length} Imóveis
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Vitrine Geral de Imóveis (Grid de Destaques) */}
      <section id="imoveis" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b pb-5">
          <div>
            <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
              <Building className="h-4 w-4" /> Carteira Imobiliária
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight mt-1">
              Imóveis Disponíveis na Imobiliária Prime
            </h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              Exibindo {filteredProperties.length} imóveis cadastrados e atualizados em tempo real.
            </p>
          </div>

          {/* Filtros de Tipologia Rápida */}
          <div className="flex flex-wrap gap-1.5">
            {["todos", "Apartamento", "Casa", "Cobertura", "Comercial"].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat.toLowerCase())}
                className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                  selectedCategory === cat.toLowerCase()
                    ? "bg-foreground text-background font-bold border-foreground shadow-xs"
                    : "bg-background text-muted-foreground hover:border-foreground/40 hover:text-foreground"
                }`}
              >
                {cat === "todos" ? "Todos" : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid de Cards */}
        {filteredProperties.length === 0 ? (
          <div className="py-16 text-center space-y-3 bg-muted/20 rounded-2xl border">
            <Building className="h-10 w-10 text-muted-foreground mx-auto opacity-50" />
            <h3 className="font-bold text-lg">Nenhum imóvel encontrado com esses filtros</h3>
            <p className="text-xs text-muted-foreground max-w-md mx-auto">
              Tente alterar a localização ou os filtros para encontrar outras oportunidades na nossa carteira.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setPurposeTab("todos")
                setSelectedCategory("todos")
                setSearchLocation("")
                setMinBedrooms("0")
              }}
            >
              Limpar Todos os Filtros
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProperties.map((property) => {
              const waItemUrl = getWhatsAppLink(
                property.broker.phone,
                `Olá ${property.broker.name}, vi o anúncio no site do imóvel ${property.title} (${property.code}) no valor de R$ ${property.price.toLocaleString("pt-BR")} e gostaria de mais informações!`
              )

              return (
                <div
                  key={property.id}
                  className="group rounded-2xl border bg-card overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Imagem de Capa com Badge e Preço Overlay */}
                    <div className="h-56 relative overflow-hidden bg-slate-900">
                      <img
                        src={property.imageUrl}
                        alt={property.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-black/30 p-3.5 flex flex-col justify-between text-white">
                        <div className="flex items-center justify-between">
                          <div className="flex gap-1.5">
                            <span className="rounded-md bg-primary px-2.5 py-0.5 text-[11px] font-black uppercase tracking-wider shadow">
                              {property.type}
                            </span>
                            <span className="rounded-md bg-black/60 backdrop-blur-sm px-2 py-0.5 text-[11px] font-medium">
                              {property.category}
                            </span>
                          </div>
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold shadow-xs ${
                              property.status === "Disponível"
                                ? "bg-emerald-500 text-white"
                                : property.status === "Reservado"
                                ? "bg-amber-500 text-white"
                                : "bg-slate-700 text-white"
                            }`}
                          >
                            {property.status}
                          </span>
                        </div>

                        <div>
                          <span className="text-[10px] font-mono tracking-widest uppercase opacity-80 block">
                            CÓDIGO: {property.code}
                          </span>
                          <p className="text-2xl font-black tracking-tight text-white drop-shadow-md">
                            {property.type === "Aluguel"
                              ? `R$ ${property.price.toLocaleString("pt-BR")} /mês`
                              : `R$ ${property.price.toLocaleString("pt-BR")}`}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Conteúdo do Card */}
                    <div className="p-4 space-y-3">
                      <div>
                        <h3 className="font-bold text-base leading-snug line-clamp-2 text-foreground group-hover:text-primary transition-colors">
                          {property.title}
                        </h3>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1 font-medium">
                          <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
                          {property.neighborhood}, {property.city} - {property.state}
                        </p>
                      </div>

                      {/* Especificações Rápidas */}
                      <div className="grid grid-cols-4 gap-1.5 py-2.5 border-y border-border/60 text-center text-xs">
                        <div title={`${property.bedrooms} Quartos`}>
                          <span className="text-muted-foreground flex items-center justify-center gap-1 text-[11px]">
                            <Bed className="h-3.5 w-3.5" />
                          </span>
                          <span className="font-bold text-foreground text-xs">{property.bedrooms} qtos</span>
                        </div>
                        <div title={`${property.bathrooms} Banheiros`}>
                          <span className="text-muted-foreground flex items-center justify-center gap-1 text-[11px]">
                            <Bath className="h-3.5 w-3.5" />
                          </span>
                          <span className="font-bold text-foreground text-xs">{property.bathrooms} banh</span>
                        </div>
                        <div title={`${property.parking} Vagas de Garagem`}>
                          <span className="text-muted-foreground flex items-center justify-center gap-1 text-[11px]">
                            <Car className="h-3.5 w-3.5" />
                          </span>
                          <span className="font-bold text-foreground text-xs">{property.parking} vag</span>
                        </div>
                        <div title={`${property.area} m² de área`}>
                          <span className="text-muted-foreground flex items-center justify-center gap-1 text-[11px]">
                            <Maximize className="h-3.5 w-3.5" />
                          </span>
                          <span className="font-bold text-foreground text-xs">{property.area} m²</span>
                        </div>
                      </div>

                      {/* Taxas (Condomínio e IPTU) */}
                      {(property.condoFee || property.iptu) ? (
                        <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                          {property.condoFee ? <span>Cond.: R$ {property.condoFee.toLocaleString("pt-BR")}</span> : <span></span>}
                          {property.iptu ? <span>IPTU: R$ {property.iptu.toLocaleString("pt-BR")}</span> : <span></span>}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  {/* Rodapé do Card com Ações */}
                  <div className="p-4 pt-0 grid grid-cols-2 gap-2">
                    <Link
                      href={`/imovel/${property.code}`}
                      className="inline-flex items-center justify-center gap-1.5 h-9 rounded-lg border border-input bg-background hover:bg-muted font-bold text-xs transition-colors shadow-xs"
                    >
                      Ver Detalhes
                      <ArrowRight className="h-3 w-3" />
                    </Link>

                    <a
                      href={waItemUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 h-9 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors shadow-xs"
                    >
                      <MessageSquare className="h-3.5 w-3.5" />
                      WhatsApp
                    </a>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </section>

      {/* 4. Seção de Diferenciais & Financiamento */}
      <section id="diferenciais" className="bg-slate-100 dark:bg-slate-900/60 py-16 border-y">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-primary font-bold text-xs uppercase tracking-wider">
              Segurança & Agilidade
            </span>
            <h2 className="text-3xl font-black tracking-tight">Por que escolher a Imobiliária Prime?</h2>
            <p className="text-sm text-muted-foreground">
              Muito mais do que intermediar imóveis, garantimos uma experiência segura, transparente e descomplicada.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="border shadow-xs hover:shadow-md transition-shadow">
              <CardContent className="p-6 space-y-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-base">Assessoria Jurídica</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Análise minuciosa de certidões do imóvel e dos proprietários para garantir total segurança antes da assinatura.
                </p>
              </CardContent>
            </Card>

            <Card className="border shadow-xs hover:shadow-md transition-shadow">
              <CardContent className="p-6 space-y-3">
                <div className="h-10 w-10 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
                  <Calculator className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-base">Financiamento Caixa & Bancos</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Aprovamos seu crédito com as menores taxas do mercado através dos principais bancos (Caixa, Itaú, Bradesco, Santander).
                </p>
              </CardContent>
            </Card>

            <Card className="border shadow-xs hover:shadow-md transition-shadow">
              <CardContent className="p-6 space-y-3">
                <div className="h-10 w-10 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center font-bold">
                  <Sparkles className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-base">Fotos e Mídia Profissional</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Produção de imagens arquitetônicas em alta resolução e divulgação nos maiores portais do Brasil (ZAP, VivaReal e OLX).
                </p>
              </CardContent>
            </Card>

            <Card className="border shadow-xs hover:shadow-md transition-shadow">
              <CardContent className="p-6 space-y-3">
                <div className="h-10 w-10 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
                  <Crown className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-base">Atendimento Exclusivo VIP</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Corretores experientes e credenciados ao CRECI prontos para acompanhar suas visitas com agilidade e discrição.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 5. Seção "Quer Vender ou Alugar seu Imóvel?" (Captação direta de Lead para o CRM) */}
      <section id="anuncie" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="bg-gradient-to-br from-primary to-blue-700 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 items-center relative z-10">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-white/20 backdrop-blur-sm px-3.5 py-1 text-xs font-bold">
                <Building className="h-3.5 w-3.5" />
                Área do Proprietário
              </div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
                Quer Vender ou Alugar o Seu Imóvel?
              </h2>
              <p className="text-blue-100 text-sm leading-relaxed">
                Cadastre o seu imóvel conosco. Nossa equipe especializada realiza avaliação de mercado gratuita, sessão de fotos profissionais e conexão imediata com compradores qualificados da nossa carteira.
              </p>

              <div className="space-y-2 pt-2 text-xs font-medium text-blue-100">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                  Divulgação automática nos maiores portais do país
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                  Sem taxas de exclusividade obrigatórias
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                  Acompanhamento em tempo real pelo corretor responsável
                </div>
              </div>
            </div>

            {/* Formulário de Captação */}
            <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 p-6 sm:p-8 rounded-2xl shadow-2xl border">
              <h3 className="font-bold text-lg mb-1">Cadastrar Meu Imóvel</h3>
              <p className="text-xs text-muted-foreground mb-4">
                Preencha os dados abaixo e entraremos em contato em até 2 horas.
              </p>

              {ownerSuccess ? (
                <div className="p-6 text-center space-y-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200">
                  <CheckCircle2 className="h-10 w-10 text-emerald-600 mx-auto" />
                  <h4 className="font-bold text-emerald-800 dark:text-emerald-200">Solicitação Enviada com Sucesso!</h4>
                  <p className="text-xs text-muted-foreground">
                    Recebemos os dados do seu imóvel e nossa equipe entrará em contato pelo WhatsApp informado.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleOwnerSubmit} className="space-y-3.5">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-muted-foreground">Seu Nome Completo</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Roberto Ferreira"
                      value={ownerName}
                      onChange={(e) => setOwnerName(e.target.value)}
                      className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-muted-foreground">Telefone / WhatsApp</label>
                      <input
                        type="text"
                        required
                        placeholder="(11) 99999-8888"
                        value={ownerPhone}
                        onChange={(e) => setOwnerPhone(e.target.value)}
                        className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-muted-foreground">Finalidade</label>
                      <select
                        value={ownerType}
                        onChange={(e) => setOwnerType(e.target.value)}
                        className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      >
                        <option value="Vender">Quero Vender</option>
                        <option value="Alugar">Quero Alugar</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-muted-foreground">Tipo de Imóvel</label>
                      <select
                        value={ownerPropertyType}
                        onChange={(e) => setOwnerPropertyType(e.target.value)}
                        className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      >
                        <option value="Apartamento">Apartamento</option>
                        <option value="Casa">Casa</option>
                        <option value="Cobertura">Cobertura</option>
                        <option value="Comercial">Comercial</option>
                        <option value="Terreno">Terreno</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-muted-foreground">Bairro do Imóvel</label>
                      <input
                        type="text"
                        placeholder="Ex: Moema"
                        value={ownerNeighborhood}
                        onChange={(e) => setOwnerNeighborhood(e.target.value)}
                        className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      />
                    </div>
                  </div>

                  <Button type="submit" disabled={ownerSubmitting} className="w-full font-bold shadow-md">
                    {ownerSubmitting ? "Enviando Solicitação..." : "Solicitar Avaliação & Anúncio"}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Footer Profissional */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-8 md:grid-cols-4">
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2 text-white font-extrabold text-lg">
              <div className="h-8 w-8 rounded-lg bg-primary text-white flex items-center justify-center font-bold">
                <Building className="h-4 w-4" />
              </div>
              Imobiliária Prime
            </div>
            <p className="text-slate-400 leading-relaxed">
              Excelência e transparência na compra, venda e gestão de locações em São Paulo e região metropolitana.
            </p>
            <p className="text-slate-500 font-mono text-[11px]">CRECI: 29.400-J</p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-3 text-sm">Navegação Rápida</h4>
            <ul className="space-y-2">
              <li><Link href="#imoveis" className="hover:text-white transition-colors">Todos os Imóveis</Link></li>
              <li><Link href="#imoveis" onClick={() => setPurposeTab("Venda")} className="hover:text-white transition-colors">Imóveis para Comprar</Link></li>
              <li><Link href="#imoveis" onClick={() => setPurposeTab("Aluguel")} className="hover:text-white transition-colors">Imóveis para Alugar</Link></li>
              <li><Link href="#anuncie" className="hover:text-white transition-colors">Anuncie Conosco</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-3 text-sm">Canais de Atendimento</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5 text-primary" />
                (11) 3456-7890
              </li>
              <li className="flex items-center gap-1.5">
                <MessageSquare className="h-3.5 w-3.5 text-emerald-400" />
                (11) 98765-4321 (WhatsApp)
              </li>
              <li>contato@primeimoveis.com.br</li>
              <li>Segunda a Sexta: 09h às 19h | Sábado: 09h às 14h</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-3 text-sm">Área Restrita da Equipe</h4>
            <p className="text-slate-400 mb-3">
              Acesso exclusivo para corretores credenciados, gestores de vendas e administração.
            </p>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white transition-colors border border-slate-700"
            >
              <Lock className="h-3.5 w-3.5 text-primary" />
              Acessar Painel do Corretor (CRM)
            </Link>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 pt-6 border-t border-slate-800 text-center text-slate-500">
          <p>© {new Date().getFullYear()} Imobiliária Prime CRM. Todos os direitos reservados. Plataforma desenvolvida com Next.js 15 & Prisma.</p>
        </div>
      </footer>
    </div>
  )
}
