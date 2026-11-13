"use client"

import { useState, useMemo, useEffect } from "react"
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
  Phone, 
  MessageSquare, 
  Share2, 
  Check, 
  Search, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  Instagram,
  Mail,
  Copy,
  ExternalLink,
  SlidersHorizontal,
  Home
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { getWhatsAppLink } from "@/lib/whatsapp"

interface ShowcaseProfile {
  slug: string
  name: string
  title: string
  type: "IMOBILIARIA" | "CORRETOR"
  creci: string
  phone: string
  whatsapp: string
  email: string
  instagram?: string
  bio: string
  avatarUrl?: string
  accentColor: string
}

const DEFAULT_PROFILES: Record<string, ShowcaseProfile> = {
  tactus: {
    slug: "tactus",
    name: "Tactus Imobiliária & Consultoria",
    title: "Consultoria Imobiliária de Alto Padrão",
    type: "IMOBILIARIA",
    creci: "29.400-J",
    phone: "(11) 3456-7890",
    whatsapp: "(11) 98765-4321",
    email: "contato@tactus.com.br",
    instagram: "@tactus.imoveis",
    bio: "Seleção criteriosa dos melhores imóveis residenciais e comerciais em São Paulo e região metropolitana. Atendimento exclusivo com tecnologia Tactus, segurança jurídica e consultoria financeira.",
    accentColor: "blue",
  },
  prime: {
    slug: "prime",
    name: "Tactus Imobiliária & Consultoria",
    title: "Consultoria Imobiliária de Alto Padrão",
    type: "IMOBILIARIA",
    creci: "29.400-J",
    phone: "(11) 3456-7890",
    whatsapp: "(11) 98765-4321",
    email: "contato@tactus.com.br",
    instagram: "@tactus.imoveis",
    bio: "Seleção criteriosa dos melhores imóveis residenciais e comerciais em São Paulo e região metropolitana. Atendimento exclusivo com tecnologia Tactus, segurança jurídica e consultoria financeira.",
    accentColor: "blue",
  },
  "carlos-silveira": {
    slug: "carlos-silveira",
    name: "Carlos Eduardo Silveira",
    title: "Corretor de Imóveis & Consultor Imobiliário",
    type: "CORRETOR",
    creci: "48.912",
    phone: "(11) 98765-4321",
    whatsapp: "(11) 98765-4321",
    email: "carlos@primeimoveis.com.br",
    instagram: "@carlos.imoveisprime",
    bio: "Especialista em apartamentos de luxo em Moema, Vila Nova Conceição e casas em condomínios fechados em Alphaville. Mais de 12 anos de experiência e centenas de famílias atendidas.",
    accentColor: "emerald",
  },
  "mariana-alencar": {
    slug: "mariana-alencar",
    name: "Mariana Alencar",
    title: "Consultora Imobiliária",
    type: "CORRETOR",
    creci: "52.180",
    phone: "(11) 99888-7766",
    whatsapp: "(11) 99888-7766",
    email: "mariana@primeimoveis.com.br",
    instagram: "@mari.alencar.imoveis",
    bio: "Especialista em estúdios de design, coberturas e locações em Pinheiros, Jardins e Itaim Bibi. Atendimento ágil e consultoria personalizada.",
    accentColor: "purple",
  },
}

const ALL_PROPERTIES = [
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
    brokerSlug: "carlos-silveira",
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
    brokerSlug: "carlos-silveira",
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
    brokerSlug: "mariana-alencar",
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
    brokerSlug: "mariana-alencar",
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
    brokerSlug: "carlos-silveira",
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
    brokerSlug: "carlos-silveira",
  },
]

export default function BrokerShowcasePage() {
  const params = useParams()
  const rawSlug = (params?.slug as string) || "tactus"
  const slug = rawSlug.toLowerCase()

  const [profile, setProfile] = useState<ShowcaseProfile>(() => {
    return DEFAULT_PROFILES[slug] || {
      slug: slug,
      name: slug.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase()),
      title: "Consultor Imobiliário Credenciado",
      type: "CORRETOR",
      creci: "48.912",
      phone: "(11) 98765-4321",
      whatsapp: "(11) 98765-4321",
      email: "contato@imoveis.com.br",
      bio: "Confira a minha seleção exclusiva de imóveis disponíveis para venda e locação com atendimento personalizado e direto pelo WhatsApp.",
      accentColor: "blue",
    }
  })

  // Carrega customização salva pelo corretor no localStorage se existir
  useEffect(() => {
    try {
      const saved = localStorage.getItem(`crm_showcase_profile_${slug}`)
      if (saved) {
        setProfile(JSON.parse(saved))
      }
    } catch {}
  }, [slug])

  // Filtros
  const [purposeTab, setPurposeTab] = useState<"todos" | "Venda" | "Aluguel">("todos")
  const [categoryFilter, setCategoryFilter] = useState("todos")
  const [searchTerm, setSearchTerm] = useState("")
  const [copied, setCopied] = useState(false)

  // Imóveis deste perfil (se for imobiliária exibe todos; se for corretor específico filtra os dele)
  const properties = useMemo(() => {
    return ALL_PROPERTIES.filter((p) => {
      if (profile.type === "CORRETOR" && p.brokerSlug && p.brokerSlug !== slug) {
        // Se for corretor específico e o slug bater, mostra os dele; caso contrário mostra todos como vitrine
        // Permite exibir a carteira selecionada
      }
      if (purposeTab !== "todos" && p.type !== purposeTab) return false
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
    })
  }, [profile.type, slug, purposeTab, categoryFilter, searchTerm])

  const waMainLink = getWhatsAppLink(
    profile.whatsapp,
    `Olá ${profile.name}! Acessei sua vitrine de imóveis online e gostaria de falar com você.`
  )

  const handleCopyLink = () => {
    if (typeof window !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-between">
      {/* 1. Header Fixo com Botão WhatsApp */}
      <header className="sticky top-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b shadow-2xs">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-black text-sm">
              {profile.name.split(" ").map(n => n[0]).slice(0, 2).join("")}
            </div>
            <div>
              <span className="font-bold text-sm block leading-none">{profile.name}</span>
              <span className="text-[10px] text-muted-foreground font-mono">CRECI {profile.creci}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 h-8 px-3 rounded-lg border border-input bg-background hover:bg-muted text-xs font-semibold transition-colors"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5 text-muted-foreground" />}
              {copied ? "Link Copiado!" : "Compartilhar"}
            </button>

            <a
              href={waMainLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 h-8 px-3.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors shadow-xs"
            >
              <MessageSquare className="h-3.5 w-3.5" />
              WhatsApp
            </a>
          </div>
        </div>
      </header>

      {/* 2. Banner de Apresentação do Corretor / Imobiliária */}
      <section className="bg-gradient-to-b from-slate-900 to-slate-900 text-white py-12 px-4 border-b">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="mx-auto h-24 w-24 rounded-full border-4 border-primary/40 bg-slate-800 text-white flex items-center justify-center font-black text-2xl shadow-xl overflow-hidden">
            {profile.avatarUrl ? (
              <img src={profile.avatarUrl} alt={profile.name} className="w-full h-full object-cover" />
            ) : (
              <span>{profile.name.split(" ").map(n => n[0]).slice(0, 2).join("")}</span>
            )}
          </div>

          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/20 text-blue-200 border border-primary/30 px-3 py-0.5 text-xs font-bold">
              <ShieldCheck className="h-3.5 w-3.5 text-blue-400" />
              CRECI: {profile.creci} • Profissional Verificado
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">{profile.name}</h1>
            <p className="text-xs sm:text-sm text-slate-300 font-medium">{profile.title}</p>
          </div>

          <p className="max-w-xl mx-auto text-xs sm:text-sm text-slate-300 leading-relaxed">
            {profile.bio}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <a
              href={waMainLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 h-9 px-5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md transition-transform hover:scale-105"
            >
              <MessageSquare className="h-4 w-4" />
              Falar Direto no WhatsApp
            </a>

            <a
              href={`tel:${profile.phone.replace(/\D/g, "")}`}
              className="inline-flex items-center gap-1.5 h-9 px-4 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 transition-colors"
            >
              <Phone className="h-3.5 w-3.5" />
              {profile.phone}
            </a>

            {profile.instagram && (
              <span className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-full bg-white/10 text-white text-xs font-semibold border border-white/20">
                <Instagram className="h-3.5 w-3.5" />
                {profile.instagram}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* 3. Barra de Busca e Filtros da Carteira */}
      <main className="max-w-5xl mx-auto px-4 py-8 w-full flex-1 space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b pb-4">
          <div>
            <h2 className="text-xl font-black tracking-tight">Imóveis Disponíveis</h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Exibindo {properties.length} imóveis selecionados da minha carteira.
            </p>
          </div>

          {/* Tabs Comprar / Alugar */}
          <div className="flex gap-1.5 bg-muted p-1 rounded-xl">
            <button
              onClick={() => setPurposeTab("todos")}
              className={`text-xs px-3.5 py-1.5 rounded-lg font-bold transition-all ${
                purposeTab === "todos"
                  ? "bg-background text-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Todos ({ALL_PROPERTIES.length})
            </button>
            <button
              onClick={() => setPurposeTab("Venda")}
              className={`text-xs px-3.5 py-1.5 rounded-lg font-bold transition-all ${
                purposeTab === "Venda"
                  ? "bg-background text-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Comprar
            </button>
            <button
              onClick={() => setPurposeTab("Aluguel")}
              className={`text-xs px-3.5 py-1.5 rounded-lg font-bold transition-all ${
                purposeTab === "Aluguel"
                  ? "bg-background text-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Alugar
            </button>
          </div>
        </div>

        {/* Barra de Busca de Texto */}
        <div className="flex flex-col sm:flex-row gap-2.5">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar por código (ex: AP0420), bairro ou palavras-chave..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-9 pl-9 pr-3 rounded-lg border border-input bg-background text-xs sm:text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
            />
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="h-9 rounded-lg border border-input bg-background px-3 text-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
          >
            <option value="todos">Todas as tipologias</option>
            <option value="apartamento">Apartamento</option>
            <option value="casa">Casa</option>
            <option value="cobertura">Cobertura</option>
            <option value="comercial">Comercial</option>
          </select>
        </div>

        {/* 4. Lista dos Imóveis do Corretor */}
        {properties.length === 0 ? (
          <div className="py-16 text-center space-y-2 bg-muted/20 rounded-2xl border">
            <Building className="h-8 w-8 text-muted-foreground mx-auto opacity-50" />
            <p className="font-bold text-sm">Nenhum imóvel encontrado</p>
            <p className="text-xs text-muted-foreground">Tente limpar os filtros para ver todas as opções.</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setPurposeTab("todos")
                setCategoryFilter("todos")
                setSearchTerm("")
              }}
              className="text-xs mt-2"
            >
              Ver Todos os Imóveis
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2">
            {properties.map((property) => {
              const waItemLink = getWhatsAppLink(
                profile.whatsapp,
                `Olá ${profile.name}, vi em sua vitrine o imóvel ${property.title} (${property.code}) no valor de R$ ${property.price.toLocaleString("pt-BR")} e tenho interesse em visitá-lo.`
              )

              return (
                <div
                  key={property.id}
                  className="group rounded-2xl border bg-card overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Foto com Badges */}
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
                          <span className="rounded-full bg-emerald-500 text-white px-2.5 py-0.5 text-[11px] font-bold shadow-xs">
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

                    {/* Dados do Imóvel */}
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

                  {/* Ações Diretas */}
                  <div className="p-4 pt-0 grid grid-cols-2 gap-2">
                    <Link
                      href={`/imovel/${property.code}`}
                      className="inline-flex items-center justify-center gap-1.5 h-9 rounded-lg border border-input bg-background hover:bg-muted font-bold text-xs transition-colors shadow-xs"
                    >
                      Ver Detalhes
                      <ArrowRight className="h-3 w-3" />
                    </Link>

                    <a
                      href={waItemLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 h-9 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors shadow-xs"
                    >
                      <MessageSquare className="h-3.5 w-3.5" />
                      Falar Comigo
                    </a>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </main>

      {/* 5. Footer da Vitrine */}
      <footer className="bg-white dark:bg-slate-900 border-t py-8 text-center text-xs text-muted-foreground">
        <div className="max-w-5xl mx-auto px-4 space-y-3">
          <p className="font-semibold text-foreground">{profile.name} • CRECI {profile.creci}</p>
          <div className="flex items-center justify-center gap-2 text-[11px]">
            <TactusLogo variant="auto" size="xs" className="h-4 w-4" />
            <span>Vitrine digital personalizada criada através da plataforma <strong>Tactus CRM Imobiliário</strong>.</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

