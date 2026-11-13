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
  ArrowRight,
  ArrowLeft,
  SlidersHorizontal,
  Home
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { getWhatsAppLink } from "@/lib/whatsapp"
import { TactusLogo } from "@/components/tactus-logo"

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

const PROPERTIES: PropertyItem[] = [
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

export default function CatalogPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("todos")
  const [categoryFilter, setCategoryFilter] = useState("todos")
  const [sortBy, setSortBy] = useState("relevance")

  const filtered = useMemo(() => {
    return PROPERTIES.filter((p) => {
      if (typeFilter !== "todos" && p.type !== typeFilter) return false
      if (categoryFilter !== "todos" && p.category.toLowerCase() !== categoryFilter.toLowerCase()) return false
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase()
        const matches = 
          p.title.toLowerCase().includes(q) ||
          p.code.toLowerCase().includes(q) ||
          p.neighborhood.toLowerCase().includes(q) ||
          p.city.toLowerCase().includes(q)
        if (!matches) return false
      }
      return true
    }).sort((a, b) => {
      if (sortBy === "priceAsc") return a.price - b.price
      if (sortBy === "priceDesc") return b.price - a.price
      if (sortBy === "areaDesc") return b.area - a.area
      return 0
    })
  }, [searchTerm, typeFilter, categoryFilter, sortBy])

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-between">
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group transition-transform hover:scale-105">
            <TactusLogo variant="auto" className="h-9 sm:h-10 w-auto" priority />
            <span className="text-[11px] font-semibold text-muted-foreground border-l border-border/60 pl-3 hidden sm:inline-block">
              Catálogo Geral de Imóveis
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground"
            >
              <Home className="h-4 w-4" />
              Início
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center gap-1 h-8 px-3 rounded-md bg-primary text-primary-foreground text-xs font-semibold"
            >
              Entrar no CRM
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1 space-y-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-2">
            Vitrines Públicas Integradas ao Tactus CRM
          </div>
          <h1 className="text-3xl font-black tracking-tight">Vitrines & Carteiras de Imóveis dos Corretores</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Imóveis cadastrados e gerenciados por corretores e imobiliárias credenciadas no Tactus CRM com atendimento direto no WhatsApp.
          </p>
        </div>

        {/* Filter Toolbar */}
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <div className="relative md:col-span-1">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Código, bairro ou título..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full h-9 pl-9 pr-3 rounded-md border border-input bg-background text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                />
              </div>

              <div>
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                >
                  <option value="todos">Venda & Aluguel</option>
                  <option value="Venda">Apenas Venda</option>
                  <option value="Aluguel">Apenas Aluguel</option>
                </select>
              </div>

              <div>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                >
                  <option value="todos">Todas as tipologias</option>
                  <option value="apartamento">Apartamento</option>
                  <option value="casa">Casa</option>
                  <option value="cobertura">Cobertura</option>
                  <option value="comercial">Comercial</option>
                </select>
              </div>

              <div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                >
                  <option value="relevance">Ordenar: Destaques</option>
                  <option value="priceAsc">Menor Preço</option>
                  <option value="priceDesc">Maior Preço</option>
                  <option value="areaDesc">Maior Metragem (m²)</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((property) => {
            const waItemUrl = getWhatsAppLink(
              property.broker.phone,
              `Olá! Vi o anúncio no site do imóvel ${property.title} (${property.code}) no valor de R$ ${property.price.toLocaleString("pt-BR")} e tenho interesse em visitá-lo.`
            )

            return (
              <div
                key={property.id}
                className="group rounded-2xl border bg-card overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="h-52 relative overflow-hidden bg-slate-900">
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
                              : "bg-amber-500 text-white"
                          }`}
                        >
                          {property.status}
                        </span>
                      </div>

                      <div>
                        <span className="text-[10px] font-mono tracking-widest uppercase opacity-80 block">
                          CÓD. {property.code}
                        </span>
                        <p className="text-2xl font-black tracking-tight text-white drop-shadow-md">
                          {property.type === "Aluguel"
                            ? `R$ ${property.price.toLocaleString("pt-BR")} /mês`
                            : `R$ ${property.price.toLocaleString("pt-BR")}`}
                        </p>
                      </div>
                    </div>
                  </div>

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

                    <div className="grid grid-cols-4 gap-1.5 py-2.5 border-y border-border/60 text-center text-xs">
                      <div>
                        <span className="text-muted-foreground flex items-center justify-center gap-1 text-[11px]">
                          <Bed className="h-3.5 w-3.5" />
                        </span>
                        <span className="font-bold text-foreground text-xs">{property.bedrooms} qtos</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground flex items-center justify-center gap-1 text-[11px]">
                          <Bath className="h-3.5 w-3.5" />
                        </span>
                        <span className="font-bold text-foreground text-xs">{property.bathrooms} banh</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground flex items-center justify-center gap-1 text-[11px]">
                          <Car className="h-3.5 w-3.5" />
                        </span>
                        <span className="font-bold text-foreground text-xs">{property.parking} vag</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground flex items-center justify-center gap-1 text-[11px]">
                          <Maximize className="h-3.5 w-3.5" />
                        </span>
                        <span className="font-bold text-foreground text-xs">{property.area} m²</span>
                      </div>
                    </div>
                  </div>
                </div>

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
      </main>

      <footer className="bg-white dark:bg-slate-900 border-t py-6 text-center text-xs text-muted-foreground">
        <p>© {new Date().getFullYear()} Tactus CRM & Vitrines Imobiliárias. Todos os direitos reservados.</p>
      </footer>
    </div>
  )
}

