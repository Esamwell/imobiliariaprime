"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
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
  Building,
  Plus,
  Search,
  MapPin,
  Bed,
  Bath,
  Car,
  Maximize,
  Eye,
  Edit,
  Check,
  Loader2,
  Sparkles,
  Trash2,
  ExternalLink,
  Share2,
  Printer,
  DollarSign,
  Calculator,
  ImageIcon,
  Copy,
  MessageSquare,
  CheckCircle2,
  Settings,
  Globe
} from "lucide-react"
import { fetchAddressByCep } from "@/lib/viacep"
import { getWhatsAppLink } from "@/lib/whatsapp"

interface Property {
  id: string
  code: string
  title: string
  description?: string
  neighborhood: string
  city: string
  state?: string
  address?: string
  zipCode?: string
  price: number
  condoFee?: number
  iptu?: number
  type: string
  category: string
  bedrooms: number
  bathrooms: number
  suites?: number
  parking: number
  area: number
  status: string
  imageUrl?: string
}

const PHOTO_PRESETS = [
  { label: "Apartamento Luxo", url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&auto=format&fit=crop&q=80" },
  { label: "Mansão com Piscina", url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&auto=format&fit=crop&q=80" },
  { label: "Cobertura Panorâmica", url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&auto=format&fit=crop&q=80" },
  { label: "Studio Design", url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&auto=format&fit=crop&q=80" },
  { label: "Laje Comercial", url: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&auto=format&fit=crop&q=80" },
  { label: "Casa em Condomínio", url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80" },
]

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("todos")
  const [categoryFilter, setCategoryFilter] = useState("todos")

  // Modais
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [editingProperty, setEditingProperty] = useState<Property | null>(null)
  const [detailsProperty, setDetailsProperty] = useState<Property | null>(null)

  // Showcase State (Minha Vitrine Pública)
  const [isShowcaseOpen, setIsShowcaseOpen] = useState(false)
  const [showcaseTab, setShowcaseTab] = useState<"compartilhar" | "personalizar">("compartilhar")
  const [showcaseCopied, setShowcaseCopied] = useState(false)
  const [showcaseSaved, setShowcaseSaved] = useState(false)

  const [showcaseSlug, setShowcaseSlug] = useState("prime")
  const [showcaseName, setShowcaseName] = useState("Imobiliária Prime")
  const [showcaseTitle, setShowcaseTitle] = useState("Consultoria Imobiliária de Alto Padrão")
  const [showcaseCreci, setShowcaseCreci] = useState("29.400-J")
  const [showcasePhone, setShowcasePhone] = useState("(11) 98765-4321")
  const [showcaseBio, setShowcaseBio] = useState("Seleção criteriosa dos melhores imóveis residenciais e comerciais com fotos reais e atendimento consultivo.")

  useEffect(() => {
    try {
      const saved = localStorage.getItem(`crm_showcase_profile_${showcaseSlug}`)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (parsed.name) setShowcaseName(parsed.name)
        if (parsed.title) setShowcaseTitle(parsed.title)
        if (parsed.creci) setShowcaseCreci(parsed.creci)
        if (parsed.whatsapp) setShowcasePhone(parsed.whatsapp)
        if (parsed.bio) setShowcaseBio(parsed.bio)
      }
    } catch {}
  }, [showcaseSlug])

  const handleSaveShowcase = (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const profileData = {
        slug: showcaseSlug.trim().toLowerCase() || "prime",
        name: showcaseName,
        title: showcaseTitle,
        type: "IMOBILIARIA",
        creci: showcaseCreci,
        phone: showcasePhone,
        whatsapp: showcasePhone,
        email: "contato@imoveis.com.br",
        bio: showcaseBio,
        accentColor: "blue",
      }
      localStorage.setItem(`crm_showcase_profile_${profileData.slug}`, JSON.stringify(profileData))
      setShowcaseSaved(true)
      setTimeout(() => setShowcaseSaved(false), 2500)
    } catch {}
  }

  const [saving, setSaving] = useState(false)
  const [cepLoading, setCepLoading] = useState(false)

  // Form State (Cadastro)
  const [title, setTitle] = useState("")
  const [price, setPrice] = useState("")
  const [type, setType] = useState("Venda")
  const [category, setCategory] = useState("Apartamento")
  const [zipCode, setZipCode] = useState("")
  const [address, setAddress] = useState("")
  const [neighborhood, setNeighborhood] = useState("")
  const [city, setCity] = useState("São Paulo")
  const [state, setState] = useState("SP")
  const [bedrooms, setBedrooms] = useState("3")
  const [bathrooms, setBathrooms] = useState("2")
  const [parking, setParking] = useState("2")
  const [area, setArea] = useState("120")
  const [imageUrl, setImageUrl] = useState(PHOTO_PRESETS[0].url)

  // Carregar do Banco
  const loadProperties = async () => {
    try {
      const res = await fetch("/api/properties")
      const data = await res.json()
      if (data.properties) {
        setProperties(data.properties)
      }
    } catch (err) {
      console.error("Erro ao carregar imóveis:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProperties()
  }, [])

  // Auto-complete por CEP no cadastro
  const handleCepBlur = async () => {
    const clean = zipCode.replace(/\D/g, "")
    if (clean.length === 8) {
      setCepLoading(true)
      const data = await fetchAddressByCep(clean)
      if (data) {
        if (data.bairro) setNeighborhood(data.bairro)
        if (data.localidade) setCity(data.localidade)
        if (data.uf) setState(data.uf)
        if (data.logradouro) setAddress(data.logradouro)
      }
      setCepLoading(false)
    }
  }

  // Cadastrar no Banco
  const handleSaveProperty = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const res = await fetch("/api/properties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          price: parseFloat(price.replace(/[^0-9.]/g, "")) || 0,
          type,
          category,
          zipCode,
          address,
          neighborhood,
          city,
          state,
          bedrooms: parseInt(bedrooms) || 0,
          bathrooms: parseInt(bathrooms) || 0,
          parking: parseInt(parking) || 0,
          area: parseFloat(area) || 0,
          imageUrl,
        }),
      })

      if (res.ok) {
        setIsCreateOpen(false)
        await loadProperties()
        // Reset form
        setTitle("")
        setPrice("")
        setZipCode("")
        setAddress("")
        setNeighborhood("")
      }
    } catch (err) {
      console.error("Erro ao salvar imóvel:", err)
    } finally {
      setSaving(false)
    }
  }

  // Salvar Edição
  const handleUpdateProperty = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingProperty) return
    setSaving(true)

    try {
      const res = await fetch("/api/properties", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingProperty),
      })

      if (res.ok) {
        setEditingProperty(null)
        await loadProperties()
      }
    } catch (err) {
      console.error("Erro ao atualizar imóvel:", err)
    } finally {
      setSaving(false)
    }
  }

  // Excluir Imóvel
  const handleDeleteProperty = async (id: string) => {
    if (!confirm("Deseja realmente remover este imóvel do catálogo?")) return

    try {
      const res = await fetch(`/api/properties?id=${id}`, {
        method: "DELETE",
      })

      if (res.ok) {
        setEditingProperty(null)
        setDetailsProperty(null)
        setProperties((prev) => prev.filter((p) => p.id !== id))
      }
    } catch (err) {
      console.error("Erro ao excluir imóvel:", err)
    }
  }

  const filtered = properties.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.neighborhood.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === "todos" || p.type.toLowerCase() === typeFilter.toLowerCase()
    const matchesCategory = categoryFilter === "todos" || p.category.toLowerCase() === categoryFilter.toLowerCase()
    return matchesSearch && matchesType && matchesCategory
  })

  return (
    <div className="space-y-6">
      {/* Top Header - Apple Prime */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              Carteira de Imóveis
            </h1>
            <span className="rounded-full bg-lime-400/20 text-lime-800 dark:text-lime-300 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider">
              {properties.length} Ativos
            </span>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Catálogo completo com fotos em alta definição, edição em tempo real e ficha de detalhes.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Botão de Vitrine Pública Compartilhável - Apple Glass Pill */}
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsShowcaseOpen(true)}
            className="rounded-full flex items-center gap-2 border-black/[0.08] dark:border-white/[0.12] bg-white/70 dark:bg-white/[0.05] hover:bg-black/5 dark:hover:bg-white/10 text-foreground font-bold text-xs h-9 shadow-sm transition-all hover:scale-102"
          >
            <Share2 className="h-3.5 w-3.5 text-lime-600 dark:text-lime-400" />
            Minha Vitrine Pública
          </Button>

          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button className="rounded-full bg-foreground text-background hover:bg-foreground/90 flex items-center gap-2 font-bold text-xs h-9 shadow-md transition-all hover:scale-102">
                <Plus className="h-4 w-4" />
                Cadastrar Imóvel
              </Button>
            </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Novo Cadastro de Imóvel</DialogTitle>
              <DialogDescription>
                Informe os dados do imóvel, foto de capa e localização por CEP.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSaveProperty} className="space-y-4 pt-2">
              <div className="space-y-1">
                <label className="text-xs font-semibold">Título do Imóvel</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Apartamento de Luxo com Vista para o Parque"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold">Finalidade</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  >
                    <option value="Venda">Venda</option>
                    <option value="Aluguel">Aluguel</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold">Tipologia</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  >
                    <option value="Apartamento">Apartamento</option>
                    <option value="Casa">Casa</option>
                    <option value="Cobertura">Cobertura</option>
                    <option value="Comercial">Comercial</option>
                    <option value="Terreno">Terreno</option>
                  </select>
                </div>
              </div>

              {/* Seletor de Foto de Capa */}
              <div className="rounded-lg border bg-muted/30 p-3 space-y-2">
                <label className="text-xs font-semibold flex items-center gap-1.5 text-primary">
                  <ImageIcon className="h-4 w-4" /> Foto de Capa do Imóvel
                </label>
                <div className="flex flex-wrap gap-2">
                  {PHOTO_PRESETS.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setImageUrl(preset.url)}
                      className={`text-xs px-2.5 py-1 rounded-md border transition-all ${imageUrl === preset.url
                          ? "bg-primary text-primary-foreground font-bold border-primary shadow-sm"
                          : "bg-background text-muted-foreground hover:text-foreground"
                        }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
                <input
                  type="url"
                  placeholder="Ou cole uma URL personalizada de foto..."
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full h-8 rounded-md border border-input bg-background px-2.5 text-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
              </div>

              {/* Endereço com Busca Automática por CEP */}
              <div className="rounded-lg border bg-muted/40 p-3 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold flex items-center gap-1.5 text-primary">
                    <Sparkles className="h-3.5 w-3.5" /> Endereço & Localização (ViaCEP)
                  </span>
                  {cepLoading && <span className="text-xs text-muted-foreground animate-pulse">Buscando CEP...</span>}
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-medium text-muted-foreground">CEP (8 dígitos)</label>
                    <input
                      type="text"
                      placeholder="04505-001"
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                      onBlur={handleCepBlur}
                      className="w-full h-8 rounded-md border border-input bg-background px-2.5 text-xs font-mono"
                    />
                  </div>

                  <div className="col-span-2 space-y-1">
                    <label className="text-[11px] font-medium text-muted-foreground">Bairro</label>
                    <input
                      type="text"
                      required
                      placeholder="Bairro"
                      value={neighborhood}
                      onChange={(e) => setNeighborhood(e.target.value)}
                      className="w-full h-8 rounded-md border border-input bg-background px-2.5 text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-2 space-y-1">
                    <label className="text-[11px] font-medium text-muted-foreground">Logradouro / Rua</label>
                    <input
                      type="text"
                      placeholder="Ex: Rua Afonso Braz, 850"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full h-8 rounded-md border border-input bg-background px-2.5 text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-medium text-muted-foreground">Cidade / UF</label>
                    <input
                      type="text"
                      value={`${city} - ${state}`}
                      readOnly
                      className="w-full h-8 rounded-md border border-input bg-muted px-2.5 text-xs text-muted-foreground"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold">Valor (R$)</label>
                  <input
                    type="number"
                    required
                    placeholder="2450000"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring font-bold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold">Área Útil (m²)</label>
                  <input
                    type="number"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="space-y-1">
                  <label className="text-xs font-medium">Quartos</label>
                  <input
                    type="number"
                    value={bedrooms}
                    onChange={(e) => setBedrooms(e.target.value)}
                    className="w-full h-8 rounded-md border border-input bg-background px-2 text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium">Banheiros</label>
                  <input
                    type="number"
                    value={bathrooms}
                    onChange={(e) => setBathrooms(e.target.value)}
                    className="w-full h-8 rounded-md border border-input bg-background px-2 text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium">Vagas</label>
                  <input
                    type="number"
                    value={parking}
                    onChange={(e) => setParking(e.target.value)}
                    className="w-full h-8 rounded-md border border-input bg-background px-2 text-xs"
                  />
                </div>
              </div>

              <DialogFooter className="pt-4">
                <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={saving} className="font-semibold">
                  {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Salvar no Catálogo"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>

      {/* Filter Bar - Apple Glass Pills */}
      <div className="glass-card rounded-2xl p-3 sm:p-4 border border-black/[0.06] dark:border-white/[0.08]">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar por código (ex: AP0420), bairro ou título..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-10 pl-10 pr-4 rounded-full border border-black/[0.08] dark:border-white/[0.12] bg-white/60 dark:bg-white/[0.04] text-xs sm:text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground backdrop-blur-md transition-all"
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Type Filters */}
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5">
              {[
                { id: "todos", label: "Todos" },
                { id: "venda", label: "Venda" },
                { id: "aluguel", label: "Aluguel" },
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTypeFilter(t.id)}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-all ${
                    typeFilter === t.id
                      ? "bg-foreground text-background shadow-sm"
                      : "glass-pill text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Category Select Pill */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="h-9 rounded-full border border-black/[0.08] dark:border-white/[0.12] bg-white/70 dark:bg-white/[0.05] px-3.5 text-xs font-semibold focus-visible:outline-none text-foreground backdrop-blur-md"
            >
              <option value="todos">Todas as tipologias</option>
              <option value="apartamento">Apartamento</option>
              <option value="casa">Casa</option>
              <option value="cobertura">Cobertura</option>
              <option value="comercial">Comercial</option>
            </select>
          </div>
        </div>
      </div>

      {/* Properties Grid with Apple Prime Glass Cards */}
      {loading ? (
        <div className="py-20 text-center text-sm text-muted-foreground flex flex-col items-center justify-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin text-foreground" />
          <span>Carregando sua carteira em alta definição...</span>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((property) => {
            const photoUrl = property.imageUrl || PHOTO_PRESETS[0].url

            return (
              <div
                key={property.id}
                className="group glass-card glass-card-hover rounded-3xl overflow-hidden border border-black/[0.06] dark:border-white/[0.08] flex flex-col justify-between"
              >
                <div>
                  {/* Photo with Apple Glass Overlay Badge and Price */}
                  <div className="h-48 relative overflow-hidden bg-slate-900">
                    <img
                      src={photoUrl}
                      alt={property.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/40 p-3.5 flex flex-col justify-between text-white">
                      <div className="flex items-center justify-between">
                        <div className="flex gap-1.5">
                          <span className="rounded-full bg-white/20 backdrop-blur-md px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider shadow-sm">
                            {property.type}
                          </span>
                          <span className="rounded-full bg-black/50 backdrop-blur-md px-2.5 py-0.5 text-[10px] font-medium">
                            {property.category}
                          </span>
                        </div>
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wide backdrop-blur-md ${
                            property.status === "Disponível"
                              ? "bg-emerald-500/80 text-white"
                              : property.status === "Reservado"
                              ? "bg-amber-500/80 text-white"
                              : "bg-slate-700/80 text-white"
                          }`}
                        >
                          {property.status}
                        </span>
                      </div>

                      <div>
                        <span className="text-[10px] font-mono tracking-wider opacity-80 block">
                          CÓD. {property.code}
                        </span>
                        <div className="inline-block mt-0.5">
                          <span className="rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-base sm:text-lg font-black tracking-tight text-white drop-shadow">
                            {property.type === "Aluguel"
                              ? `R$ ${property.price.toLocaleString("pt-BR")} /mês`
                              : `R$ ${property.price.toLocaleString("pt-BR")}`}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Body Specs */}
                  <div className="p-4 space-y-2.5">
                    <h3 className="font-bold text-sm leading-snug line-clamp-2 text-foreground group-hover:text-primary transition-colors">
                      {property.title}
                    </h3>

                    <p className="text-xs text-muted-foreground flex items-center gap-1 font-medium">
                      <MapPin className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                      {property.neighborhood}, {property.city}
                    </p>

                    <div className="grid grid-cols-4 gap-1.5 pt-2 border-t border-border/40 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Bed className="h-3.5 w-3.5" />
                        <span className="font-medium">{property.bedrooms} qtos</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Bath className="h-3.5 w-3.5" />
                        <span className="font-medium">{property.bathrooms} banh</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Car className="h-3.5 w-3.5" />
                        <span className="font-medium">{property.parking} vag</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Maximize className="h-3.5 w-3.5" />
                        <span className="font-medium">{property.area} m²</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons (Apple Pills) */}
                <div className="p-3 pt-0 border-t border-border/40 flex items-center justify-between gap-2 mt-2 pt-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setDetailsProperty(property)}
                    className="flex-1 rounded-full h-8 text-xs flex items-center justify-center gap-1.5 font-bold glass-pill hover:bg-muted/60"
                  >
                    <Eye className="h-3.5 w-3.5" /> Detalhes
                  </Button>

                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => setEditingProperty(property)}
                    className="flex-1 rounded-full h-8 text-xs flex items-center justify-center gap-1.5 font-bold bg-foreground text-background hover:bg-foreground/90 shadow-sm"
                  >
                    <Edit className="h-3.5 w-3.5" /> Editar
                  </Button>

                  {/* Share on WhatsApp */}
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(`Confira este imóvel: ${property.title} - ${window.location.origin}/imovel/${property.code}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-8 w-8 rounded-full border border-black/[0.08] dark:border-white/[0.12] bg-white/70 dark:bg-white/[0.05] hover:bg-emerald-500 hover:text-white dark:hover:bg-emerald-600 flex items-center justify-center text-muted-foreground transition-colors shrink-0"
                    title="Compartilhar no WhatsApp"
                  >
                    <MessageSquare className="h-3.5 w-3.5" />
                  </a>

                  <Link
                    href={`/imovel/${property.code}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-8 w-8 rounded-full border border-black/[0.08] dark:border-white/[0.12] bg-white/70 dark:bg-white/[0.05] hover:bg-black/5 dark:hover:bg-white/10 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors shrink-0"
                    title="Abrir página pública do imóvel"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL DE DETALHES DO IMÓVEL (100% FUNCIONAL)             */}
      {/* ========================================================= */}
      {detailsProperty && (
        <Dialog open={Boolean(detailsProperty)} onOpenChange={() => setDetailsProperty(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-center justify-between pr-6">
                <div>
                  <span className="font-mono text-xs font-bold bg-primary/10 text-primary px-2 py-0.5 rounded">
                    CÓD. {detailsProperty.code}
                  </span>
                  <DialogTitle className="text-xl mt-1">{detailsProperty.title}</DialogTitle>
                </div>
              </div>
              <DialogDescription className="text-xs flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-primary" />
                {detailsProperty.address || detailsProperty.neighborhood}, {detailsProperty.neighborhood} - {detailsProperty.city}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 pt-2">
              {/* Foto Expandida */}
              <div className="h-56 rounded-xl overflow-hidden relative shadow">
                <img
                  src={detailsProperty.imageUrl || PHOTO_PRESETS[0].url}
                  alt={detailsProperty.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg text-white">
                  <span className="text-[10px] text-slate-300 block">Preço de {detailsProperty.type}</span>
                  <span className="text-2xl font-black">
                    {detailsProperty.type === "Aluguel"
                      ? `R$ ${detailsProperty.price.toLocaleString("pt-BR")} /mês`
                      : `R$ ${detailsProperty.price.toLocaleString("pt-BR")}`}
                  </span>
                </div>
              </div>

              {/* Especificações em Grid */}
              <div className="grid grid-cols-4 gap-2 text-center text-xs">
                <div className="rounded-lg border bg-muted/30 p-2.5">
                  <p className="text-muted-foreground text-[10px] uppercase font-semibold">Área Útil</p>
                  <p className="font-bold text-base mt-0.5">{detailsProperty.area} m²</p>
                </div>
                <div className="rounded-lg border bg-muted/30 p-2.5">
                  <p className="text-muted-foreground text-[10px] uppercase font-semibold">Quartos</p>
                  <p className="font-bold text-base mt-0.5">{detailsProperty.bedrooms}</p>
                </div>
                <div className="rounded-lg border bg-muted/30 p-2.5">
                  <p className="text-muted-foreground text-[10px] uppercase font-semibold">Banheiros</p>
                  <p className="font-bold text-base mt-0.5">{detailsProperty.bathrooms}</p>
                </div>
                <div className="rounded-lg border bg-muted/30 p-2.5">
                  <p className="text-muted-foreground text-[10px] uppercase font-semibold">Vagas</p>
                  <p className="font-bold text-base mt-0.5">{detailsProperty.parking}</p>
                </div>
              </div>

              {/* Condomínio e IPTU */}
              <div className="rounded-lg border p-3 flex items-center justify-between text-xs bg-muted/20">
                <div>
                  <span className="text-muted-foreground">Condomínio: </span>
                  <span className="font-bold">
                    R$ {(detailsProperty.condoFee || 0).toLocaleString("pt-BR")}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">IPTU Mensal: </span>
                  <span className="font-bold">
                    R$ {(detailsProperty.iptu || 0).toLocaleString("pt-BR")}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">Status: </span>
                  <span className="font-bold text-emerald-600">{detailsProperty.status}</span>
                </div>
              </div>

              {/* Descrição */}
              {detailsProperty.description && (
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-foreground">Descrição do Imóvel:</p>
                  <p className="text-xs text-muted-foreground leading-relaxed bg-muted/30 p-3 rounded-lg">
                    {detailsProperty.description}
                  </p>
                </div>
              )}
            </div>

            <DialogFooter className="pt-3 flex flex-wrap gap-2 sm:justify-between border-t mt-4">
              <div className="flex gap-2">
                <Link href={`/imovel/${detailsProperty.code}`} target="_blank">
                  <Button variant="outline" size="sm" className="h-8 text-xs flex items-center gap-1.5">
                    <ExternalLink className="h-3.5 w-3.5" /> Ver Vitrine Pública
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.print()}
                  className="h-8 text-xs flex items-center gap-1.5"
                >
                  <Printer className="h-3.5 w-3.5" /> Imprimir Ficha
                </Button>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => {
                    setEditingProperty(detailsProperty)
                    setDetailsProperty(null)
                  }}
                  className="h-8 text-xs flex items-center gap-1.5 font-semibold"
                >
                  <Edit className="h-3.5 w-3.5" /> Editar Dados
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* ========================================================= */}
      {/* MODAL DE EDIÇÃO DO IMÓVEL (100% FUNCIONAL COM BANCO)      */}
      {/* ========================================================= */}
      {editingProperty && (
        <Dialog open={Boolean(editingProperty)} onOpenChange={() => setEditingProperty(null)}>
          <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-center justify-between pr-6">
                <div>
                  <span className="font-mono text-xs font-bold bg-primary/10 text-primary px-2 py-0.5 rounded">
                    CÓD. {editingProperty.code}
                  </span>
                  <DialogTitle className="text-lg mt-1">Editar Imóvel</DialogTitle>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteProperty(editingProperty.id)}
                  className="text-red-500 hover:text-red-600 hover:bg-red-50 h-8 text-xs flex items-center gap-1"
                >
                  <Trash2 className="h-3.5 w-3.5" /> Excluir Imóvel
                </Button>
              </div>
              <DialogDescription className="text-xs">
                Atualize valores, status, fotos ou especificações deste imóvel no catálogo.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleUpdateProperty} className="space-y-3.5 pt-2">
              <div className="space-y-1">
                <label className="text-xs font-semibold">Título do Imóvel</label>
                <input
                  type="text"
                  required
                  value={editingProperty.title}
                  onChange={(e) => setEditingProperty({ ...editingProperty, title: e.target.value })}
                  className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold">Preço (R$)</label>
                  <input
                    type="number"
                    required
                    value={editingProperty.price}
                    onChange={(e) => setEditingProperty({ ...editingProperty, price: parseFloat(e.target.value) || 0 })}
                    className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm font-bold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold">Finalidade</label>
                  <select
                    value={editingProperty.type}
                    onChange={(e) => setEditingProperty({ ...editingProperty, type: e.target.value })}
                    className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm"
                  >
                    <option value="Venda">Venda</option>
                    <option value="Aluguel">Aluguel</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold">Status</label>
                  <select
                    value={editingProperty.status}
                    onChange={(e) => setEditingProperty({ ...editingProperty, status: e.target.value })}
                    className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm font-semibold"
                  >
                    <option value="Disponível">Disponível</option>
                    <option value="Reservado">Reservado</option>
                    <option value="Vendido">Vendido</option>
                    <option value="Alugado">Alugado</option>
                  </select>
                </div>
              </div>

              {/* Seletor Rápido de Foto */}
              <div className="rounded-lg border bg-muted/30 p-2.5 space-y-2">
                <label className="text-xs font-semibold flex items-center gap-1.5 text-primary">
                  <ImageIcon className="h-3.5 w-3.5" /> Alterar Foto de Capa
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {PHOTO_PRESETS.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setEditingProperty({ ...editingProperty, imageUrl: preset.url })}
                      className={`text-[11px] px-2 py-0.5 rounded border transition-all ${editingProperty.imageUrl === preset.url
                          ? "bg-primary text-primary-foreground font-bold border-primary"
                          : "bg-background text-muted-foreground hover:text-foreground"
                        }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
                <input
                  type="url"
                  placeholder="URL da imagem..."
                  value={editingProperty.imageUrl || ""}
                  onChange={(e) => setEditingProperty({ ...editingProperty, imageUrl: e.target.value })}
                  className="w-full h-8 rounded-md border border-input bg-background px-2.5 text-xs"
                />
              </div>

              <div className="grid grid-cols-4 gap-2">
                <div className="space-y-1">
                  <label className="text-xs font-medium">Área (m²)</label>
                  <input
                    type="number"
                    value={editingProperty.area}
                    onChange={(e) => setEditingProperty({ ...editingProperty, area: parseFloat(e.target.value) || 0 })}
                    className="w-full h-8 rounded-md border border-input bg-background px-2 text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium">Quartos</label>
                  <input
                    type="number"
                    value={editingProperty.bedrooms}
                    onChange={(e) => setEditingProperty({ ...editingProperty, bedrooms: parseInt(e.target.value) || 0 })}
                    className="w-full h-8 rounded-md border border-input bg-background px-2 text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium">Banheiros</label>
                  <input
                    type="number"
                    value={editingProperty.bathrooms}
                    onChange={(e) => setEditingProperty({ ...editingProperty, bathrooms: parseInt(e.target.value) || 0 })}
                    className="w-full h-8 rounded-md border border-input bg-background px-2 text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium">Vagas</label>
                  <input
                    type="number"
                    value={editingProperty.parking}
                    onChange={(e) => setEditingProperty({ ...editingProperty, parking: parseInt(e.target.value) || 0 })}
                    className="w-full h-8 rounded-md border border-input bg-background px-2 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold">Bairro</label>
                  <input
                    type="text"
                    value={editingProperty.neighborhood}
                    onChange={(e) => setEditingProperty({ ...editingProperty, neighborhood: e.target.value })}
                    className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold">Cidade</label>
                  <input
                    type="text"
                    value={editingProperty.city}
                    onChange={(e) => setEditingProperty({ ...editingProperty, city: e.target.value })}
                    className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold">Descrição do Imóvel</label>
                <textarea
                  rows={3}
                  value={editingProperty.description || ""}
                  onChange={(e) => setEditingProperty({ ...editingProperty, description: e.target.value })}
                  placeholder="Destaques, acabamentos, infraestrutura do condomínio..."
                  className="w-full rounded-md border border-input bg-background p-2.5 text-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
              </div>

              <DialogFooter className="pt-3">
                <Button type="button" variant="outline" onClick={() => setEditingProperty(null)}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={saving} className="font-semibold">
                  {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Salvar Alterações"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}

      {/* ========================================================= */}
      {/* MODAL DE MINHA VITRINE PÚBLICA & PERSONALIZAÇÃO            */}
      {/* ========================================================= */}
      <Dialog open={isShowcaseOpen} onOpenChange={setIsShowcaseOpen}>
        <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Share2 className="h-5 w-5 text-primary" />
              Minha Vitrine Pública de Imóveis
            </DialogTitle>
            <DialogDescription>
              Compartilhe sua carteira de imóveis em uma página exclusiva para clientes e personalize suas informações profissionais.
            </DialogDescription>
          </DialogHeader>

          {/* Tabs: Compartilhar ou Personalizar */}
          <div className="flex border-b gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowcaseTab("compartilhar")}
              className={`text-xs font-bold pb-2.5 px-3 border-b-2 transition-all ${
                showcaseTab === "compartilhar"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              🔗 Compartilhar Link
            </button>
            <button
              type="button"
              onClick={() => setShowcaseTab("personalizar")}
              className={`text-xs font-bold pb-2.5 px-3 border-b-2 transition-all ${
                showcaseTab === "personalizar"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              ⚙️ Personalizar Minha Vitrine
            </button>
          </div>

          {showcaseTab === "compartilhar" ? (
            <div className="space-y-4 pt-3">
              {/* Preview Card */}
              <div className="rounded-xl border bg-muted/30 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    Link Oficial da sua Vitrine
                  </span>
                  <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-bold px-2 py-0.5 rounded-full">
                    Ativa & Online
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={`${typeof window !== "undefined" ? window.location.origin : ""}/v/${showcaseSlug}`}
                    className="flex-1 h-9 rounded-md border border-input bg-background px-3 text-xs font-mono select-all"
                  />
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => {
                      if (typeof window !== "undefined" && navigator.clipboard) {
                        navigator.clipboard.writeText(`${window.location.origin}/v/${showcaseSlug}`)
                        setShowcaseCopied(true)
                        setTimeout(() => setShowcaseCopied(false), 2500)
                      }
                    }}
                    className="h-9 font-semibold text-xs flex items-center gap-1.5"
                  >
                    {showcaseCopied ? <Check className="h-3.5 w-3.5 text-emerald-300" /> : <Copy className="h-3.5 w-3.5" />}
                    {showcaseCopied ? "Copiado!" : "Copiar"}
                  </Button>
                </div>

                <p className="text-[11px] text-muted-foreground">
                  Seus clientes visualizarão apenas os seus imóveis com suas fotos, CRECI e botão direto para o seu WhatsApp.
                </p>
              </div>

              {/* Botões Rápidos de Ação */}
              <div className="grid grid-cols-2 gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      window.open(`/v/${showcaseSlug}`, "_blank")
                    }
                  }}
                  className="w-full flex items-center justify-center gap-2 h-10 font-bold text-xs"
                >
                  <ExternalLink className="h-4 w-4" />
                  Abrir Vitrine em Nova Aba
                </Button>

                <Button
                  type="button"
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      const link = `${window.location.origin}/v/${showcaseSlug}`
                      const msg = encodeURIComponent(
                        `Olá! Segue o link com todos os imóveis disponíveis na minha carteira para você conferir com fotos e ficha completa:\n\n${link}`
                      )
                      window.open(`https://api.whatsapp.com/send?text=${msg}`, "_blank")
                    }
                  }}
                  className="w-full flex items-center justify-center gap-2 h-10 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs"
                >
                  <MessageSquare className="h-4 w-4" />
                  Enviar no WhatsApp
                </Button>
              </div>

              {/* Dica de uso */}
              <div className="rounded-lg bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 p-3 text-xs text-blue-800 dark:text-blue-300 space-y-1">
                <p className="font-bold flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5" /> Dica para gerar mais negócios:
                </p>
                <p className="text-[11px] leading-relaxed">
                  Coloque este link na bio do seu Instagram, no status do seu WhatsApp ou envie diretamente após atender novos interessados. A página foi otimizada para carregar rápido em qualquer celular!
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSaveShowcase} className="space-y-3.5 pt-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold">Nome de Exibição na Vitrine</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Carlos Silveira ou Imobiliária Prime"
                  value={showcaseName}
                  onChange={(e) => setShowcaseName(e.target.value)}
                  className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold">Título Profissional / Slogan</label>
                  <input
                    type="text"
                    placeholder="Ex: Consultor de Imóveis de Alto Padrão"
                    value={showcaseTitle}
                    onChange={(e) => setShowcaseTitle(e.target.value)}
                    className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold">Número do CRECI</label>
                  <input
                    type="text"
                    placeholder="Ex: 48.912"
                    value={showcaseCreci}
                    onChange={(e) => setShowcaseCreci(e.target.value)}
                    className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold">WhatsApp para Atendimento</label>
                  <input
                    type="text"
                    required
                    placeholder="(11) 98765-4321"
                    value={showcasePhone}
                    onChange={(e) => setShowcasePhone(e.target.value)}
                    className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold">Identificador do Link (Slug)</label>
                  <div className="flex items-center">
                    <span className="text-xs text-muted-foreground mr-1">/v/</span>
                    <input
                      type="text"
                      required
                      placeholder="meu-nome"
                      value={showcaseSlug}
                      onChange={(e) => setShowcaseSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
                      className="w-full h-9 rounded-md border border-input bg-background px-2.5 text-xs font-mono focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold">Biografia / Mensagem de Boas-vindas</label>
                <textarea
                  rows={3}
                  value={showcaseBio}
                  onChange={(e) => setShowcaseBio(e.target.value)}
                  placeholder="Conte um pouco sobre sua experiência, regiões atendidas e diferenciais..."
                  className="w-full rounded-md border border-input bg-background p-2.5 text-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
              </div>

              <DialogFooter className="pt-2">
                <Button type="button" variant="outline" onClick={() => setShowcaseTab("compartilhar")}>
                  Voltar
                </Button>
                <Button type="submit" className="font-semibold gap-1.5">
                  {showcaseSaved ? <CheckCircle2 className="h-4 w-4 text-emerald-300" /> : <Settings className="h-4 w-4" />}
                  {showcaseSaved ? "Configurações Salvas!" : "Salvar Personalização"}
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
