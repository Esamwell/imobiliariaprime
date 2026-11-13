"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { TactusLogo } from "@/components/tactus-logo"
import { CinematicHero } from "@/components/ui/cinematic-landing-hero"
import { 
  Building, 
  Share2, 
  Kanban, 
  Key, 
  DollarSign, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Lock,
  Crown, 
  ArrowUpRight, 
  Globe, 
  Zap, 
  Check, 
  Star, 
  Users, 
  Smartphone, 
  CreditCard, 
  QrCode, 
  FileCheck2, 
  HelpCircle, 
  X, 
  BadgePercent,
  Search,
  MapPin,
  Bed,
  Bath,
  Car,
  Maximize,
  Calendar,
  TrendingUp,
  MessageSquare,
  PhoneCall,
  Laptop
} from "lucide-react"
import { Button } from "@/components/ui/button"

interface PlanDetail {
  id: string
  name: string
  subtitle: string
  badge?: string
  popular?: boolean
  priceMonthly: number
  priceAnnual: number
  period: string
  description: string
  brokerLimit: string
  propertiesLimit: string
  features: string[]
  ctaText: string
  theme: "dark" | "lime" | "gold"
}

const plans: PlanDetail[] = [
  {
    id: "autonomo",
    name: "Corretor Autônomo",
    subtitle: "Pessoa Física (PF / CRECI)",
    priceMonthly: 89,
    priceAnnual: 69,
    period: "/mês",
    description: "Projetado sob medida para o corretor independente que precisa de presença digital e agilidade.",
    brokerLimit: "1 Corretor Individual",
    propertiesLimit: "Até 50 Imóveis Ativos",
    features: [
      "Vitrine Pública Pessoal Exclusiva (/v/seu-nome)",
      "Botão Direto de WhatsApp com mensagem pré-configurada",
      "Upload de fotos em Alta Resolução (HD)",
      "Preenchimento automático de endereço por CEP (ViaCEP)",
      "Funil de Vendas Kanban com etiquetas de temperatura",
      "Sincronização 1-clique com Google Agenda",
      "App Mobile PWA com notificações em tempo real",
      "Link direto compartilhável no Instagram e WhatsApp",
      "Suporte ágil via WhatsApp"
    ],
    ctaText: "Assinar Plano Autônomo",
    theme: "dark"
  },
  {
    id: "tactus",
    name: "Imobiliária Tactus",
    subtitle: "Pessoa Jurídica (PJ) & Equipes",
    badge: "MAIS ESCOLHIDO",
    popular: true,
    priceMonthly: 249,
    priceAnnual: 199,
    period: "/mês",
    description: "A ferramenta definitiva para imobiliárias que coordenam equipe de corretores e alta demanda.",
    brokerLimit: "Até 10 Corretores Cadastrados",
    propertiesLimit: "Imóveis ILIMITADOS na Carteira",
    features: [
      "Tudo incluído no Plano Autônomo, mais:",
      "Até 10 Corretores com acessos e permissões individuais",
      "Carteira com Imóveis ILIMITADOS",
      "Vitrine Geral da Imobiliária + Vitrines Individuais por Corretor",
      "Integração Google Workspace & Calendar Corporativo",
      "Gestão de Locações & Aluguéis com reajuste automático (IGP-M/IPCA)",
      "Divisão automatizada de comissões por venda e aluguel",
      "Simulador de financiamento bancário para clientes",
      "Exportação de relatórios gerenciais e VGV consolidado",
      "Suporte Prioritário VIP via WhatsApp"
    ],
    ctaText: "Assinar Imobiliária Tactus",
    theme: "lime"
  },
  {
    id: "enterprise",
    name: "Master VIP Enterprise",
    subtitle: "Redes, Franquias & Incorporadoras",
    badge: "ESCALA MÁXIMA",
    priceMonthly: 589,
    priceAnnual: 489,
    period: "/mês",
    description: "Para grandes imobiliárias, redes de franquias e incorporadoras com alta demanda operacional.",
    brokerLimit: "Corretores e Filiais ILIMITADOS",
    propertiesLimit: "Imóveis e Armazenamento ILIMITADOS",
    features: [
      "Corretores, Gestores e Filiais ILIMITADOS",
      "Imóveis e Armazenamento em Nuvem ILIMITADOS",
      "Múltiplas Vitrines Públicas e Domínio Próprio Personalizado",
      "Google Workspace & Calendar Push Sync em Tempo Real",
      "Assinatura Eletrônica de Contratos Integrada",
      "Integração direta com portais (ZAP, VivaReal, OLX)",
      "Módulo avançado de repasse automatizado a proprietários",
      "Painel Multi-Tenant Super Admin e relatórios executivos",
      "Gerente de Contas Dedicado & Onboarding VIP para equipe"
    ],
    ctaText: "Contratar Master Enterprise",
    theme: "gold"
  }
]

// Imóveis em Destaque na Plataforma (Vitrine Viva Real / QuintoAndar Style)
const FEATURED_PROPERTIES = [
  {
    id: "prop-1",
    code: "AP0420",
    title: "Apartamento de Alto Padrão com Varanda Gourmet",
    location: "Vila Nova Conceição, São Paulo",
    price: "R$ 2.450.000",
    tag: "Venda",
    category: "Apartamento",
    beds: 3,
    baths: 4,
    parking: 3,
    area: 185,
    imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&auto=format&fit=crop&q=80",
    broker: "Carlos Silveira"
  },
  {
    id: "prop-2",
    code: "CS0118",
    title: "Mansão Contemporânea em Condomínio Fechado",
    location: "Alphaville Residencial, Barueri",
    price: "R$ 4.900.000",
    tag: "Venda",
    category: "Casa",
    beds: 4,
    baths: 6,
    parking: 4,
    area: 420,
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80",
    broker: "Carlos Silveira"
  },
  {
    id: "prop-3",
    code: "CB0089",
    title: "Cobertura Duplex com Vista Panorâmica",
    location: "Moema Pássaros, São Paulo",
    price: "R$ 14.500 /mês",
    tag: "Aluguel",
    category: "Cobertura",
    beds: 3,
    baths: 4,
    parking: 3,
    area: 210,
    imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&auto=format&fit=crop&q=80",
    broker: "Mariana Alencar"
  }
]

export default function CRMLandingPage() {
  const [annualBilling, setAnnualBilling] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<PlanDetail | null>(null)
  const [checkoutStep, setCheckoutStep] = useState<"form" | "success">("form")
  const [clientType, setClientType] = useState<"PF" | "PJ">("PF")
  
  // Search intent state (Viva Real / QuintoAndar Style)
  const [searchTab, setSearchTab] = useState<"comprar" | "alugar" | "anunciar">("comprar")
  const [searchQuery, setSearchQuery] = useState("")
  const [propertyType, setPropertyType] = useState("todos")

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    cpfCnpj: "",
    creci: "",
    companyName: "",
    paymentMethod: "pix"
  })

  const handleSelectPlan = (plan: PlanDetail) => {
    setSelectedPlan(plan)
    setClientType(plan.id === "autonomo" ? "PF" : "PJ")
    setCheckoutStep("form")
  }

  const handleCompleteSubscription = (e: React.FormEvent) => {
    e.preventDefault()
    setCheckoutStep("success")
  }

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 flex flex-col justify-between selection:bg-[#CCFF00] selection:text-black font-sans overflow-x-hidden">
      
      {/* Ambient Lighting Gradients */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-0 left-1/3 -translate-x-1/2 w-[700px] h-[500px] bg-indigo-600/15 blur-[150px] rounded-full" />
        <div className="absolute top-80 right-10 w-[600px] h-[450px] bg-[#CCFF00]/10 blur-[170px] rounded-full animate-glow-pulse" />
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:28px_28px] opacity-40" />
      </div>

      {/* 1. Header do CRM - Apple Prime Glass Capsule */}
      <header className="sticky top-0 z-40 bg-[#07090E]/85 backdrop-blur-2xl border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="h-10 w-10 rounded-2xl bg-white/[0.06] border border-white/10 p-1.5 flex items-center justify-center backdrop-blur-xl shadow-sm transition-transform group-hover:scale-105">
              <TactusLogo variant="verde" size="sm" className="h-full w-full" />
            </div>
            <div>
              <span className="font-extrabold text-base tracking-tight block text-white leading-none">
                TACTUS<span className="text-[#CCFF00]">.</span> CRM
              </span>
              <span className="text-[9px] font-semibold text-[#CCFF00] uppercase tracking-widest block mt-0.5">
                Portal do Corretor & Gestor
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-400">
            <Link href="#imoveis" className="hover:text-white transition-colors">
              Buscar Imóveis
            </Link>
            <Link href="#recursos" className="hover:text-white transition-colors">
              Para Corretores
            </Link>
            <Link href="#precos" className="hover:text-white transition-colors text-[#CCFF00]">
              Planos & Preços
            </Link>
            <Link href="/v/tactus" target="_blank" className="hover:text-white transition-colors">
              Vitrine Exemplo
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="#precos"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white transition-colors glass-pill px-3.5 py-1.5"
            >
              <Zap className="h-3.5 w-3.5 text-[#CCFF00]" />
              Ver Planos
            </Link>

            <Link
              href="/v/tactus"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white transition-colors glass-pill px-3.5 py-1.5"
            >
              <Share2 className="h-3.5 w-3.5 text-[#CCFF00]" />
              Vitrine Pública
            </Link>

            {/* Apple Electric Lime Button */}
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 h-9 px-4 rounded-full bg-[#CCFF00] hover:bg-[#bbf000] text-black font-extrabold text-xs shadow-lg shadow-[#CCFF00]/20 transition-all hover:scale-105"
            >
              <span>Acessar Painel</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* 2. Cinematic 3D Apple Landing Hero (21st.dev Component) */}
      <CinematicHero />

      {/* 3. Hero Section: Conectando Compradores, Proprietários e Corretores */}
      <main className="flex-1 relative z-10">
        <section className="relative pt-12 sm:pt-20 pb-12 sm:pb-20 px-4 sm:px-6 lg:px-8 text-center">
          
          <div className="max-w-4xl mx-auto space-y-6">
            
            {/* Pill Header Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-white/[0.05] border border-white/10 px-4 py-1.5 text-[11px] font-extrabold text-[#CCFF00] backdrop-blur-md">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#CCFF00] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#CCFF00]"></span>
              </span>
              ECOSSISTEMA IMOBILIÁRIO PRIME • COMPRA, VENDA & GESTÃO
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.08] text-white">
              Onde compradores, proprietários e <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#CCFF00] via-white to-slate-200">
                corretores de elite fecham negócios.
              </span>
            </h1>

            {/* Description */}
            <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-400 font-normal leading-relaxed">
              Conectamos você aos melhores imóveis de São Paulo e região através de corretores credenciados, 
              com vitrines exclusivas de alta definição, agendamento de visitas com o Google Agenda e atendimento direto no WhatsApp.
            </p>

            {/* Interactive Search Console (Inspired by Viva Real, QuintoAndar, RE/MAX) */}
            <div className="max-w-4xl mx-auto pt-4 text-left">
              <div className="rounded-[32px] border border-white/15 bg-[#0F121B]/90 backdrop-blur-2xl p-3 sm:p-5 shadow-[0_24px_60px_rgba(0,0,0,0.6)]">
                
                {/* Tabs: Comprar, Alugar, Anunciar */}
                <div className="flex items-center gap-1.5 mb-3.5 border-b border-white/[0.08] pb-3 px-1">
                  <button
                    type="button"
                    onClick={() => setSearchTab("comprar")}
                    className={`px-4 py-2 rounded-full text-xs font-extrabold transition-all ${
                      searchTab === "comprar"
                        ? "bg-[#CCFF00] text-black shadow-md shadow-[#CCFF00]/20 font-black"
                        : "text-white/60 hover:text-white"
                    }`}
                  >
                    Comprar Imóvel
                  </button>

                  <button
                    type="button"
                    onClick={() => setSearchTab("alugar")}
                    className={`px-4 py-2 rounded-full text-xs font-extrabold transition-all ${
                      searchTab === "alugar"
                        ? "bg-[#CCFF00] text-black shadow-md shadow-[#CCFF00]/20 font-black"
                        : "text-white/60 hover:text-white"
                    }`}
                  >
                    Alugar Imóvel
                  </button>

                  <button
                    type="button"
                    onClick={() => setSearchTab("anunciar")}
                    className={`px-4 py-2 rounded-full text-xs font-extrabold transition-all ${
                      searchTab === "anunciar"
                        ? "bg-[#CCFF00] text-black shadow-md shadow-[#CCFF00]/20 font-black"
                        : "text-white/60 hover:text-white"
                    }`}
                  >
                    Vender / Anunciar Imóvel
                  </button>
                </div>

                {/* Search Inputs Grid */}
                {searchTab !== "anunciar" ? (
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 items-center">
                    {/* Location input */}
                    <div className="sm:col-span-5 relative">
                      <MapPin className="absolute left-3.5 top-3.5 h-4 w-4 text-white/40" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Onde você quer morar? Ex: Moema, Alphaville, Jardins..."
                        className="w-full h-11 pl-10 pr-3 rounded-2xl bg-white/[0.05] border border-white/10 text-xs sm:text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#CCFF00] focus:ring-1 focus:ring-[#CCFF00]"
                      />
                    </div>

                    {/* Tipologia */}
                    <div className="sm:col-span-4">
                      <select
                        value={propertyType}
                        onChange={(e) => setPropertyType(e.target.value)}
                        className="w-full h-11 px-3.5 rounded-2xl bg-[#141721] border border-white/10 text-xs text-white focus:outline-none focus:border-[#CCFF00]"
                      >
                        <option value="todos">Todas as Tipologias</option>
                        <option value="Apartamento">Apartamento</option>
                        <option value="Casa">Casa em Condomínio</option>
                        <option value="Cobertura">Cobertura Duplex</option>
                        <option value="Studio">Studio de Design</option>
                        <option value="Comercial">Laje Corporativa</option>
                      </select>
                    </div>

                    {/* Search CTA */}
                    <div className="sm:col-span-3">
                      <Link
                        href={`/imoveis?type=${searchTab === "comprar" ? "Venda" : "Aluguel"}&q=${encodeURIComponent(searchQuery)}`}
                        className="w-full h-11 rounded-2xl bg-[#CCFF00] hover:bg-[#bbf000] text-black font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#CCFF00]/25 transition-all active:scale-[0.98]"
                      >
                        <Search className="w-4 h-4 stroke-[2.5]" />
                        <span>Buscar Imóveis</span>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-2 text-xs">
                    <div>
                      <span className="font-extrabold text-white block text-sm">
                        Quer vender ou alugar seu imóvel com rapidez e máxima valorização?
                      </span>
                      <span className="text-white/50 text-xs">
                        Nossos corretores e imobiliárias credenciadas cuidam de fotos HD, avaliação mercadológica e divulgação.
                      </span>
                    </div>
                    <Link
                      href="/v/tactus"
                      className="h-11 px-6 rounded-2xl bg-[#CCFF00] hover:bg-[#bbf000] text-black font-extrabold text-xs flex items-center justify-center gap-2 whitespace-nowrap shadow-lg shadow-[#CCFF00]/25 transition-all"
                    >
                      <span>Falar com um Corretor Credenciado</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                )}

                {/* Popular Chips */}
                <div className="flex flex-wrap items-center gap-2 pt-3 px-1 text-[11px] text-white/50">
                  <span className="font-semibold text-white/70">🔥 Mais procurados:</span>
                  <button type="button" onClick={() => setSearchQuery("Alphaville")} className="hover:text-[#CCFF00] transition-colors underline-offset-2 hover:underline">Alphaville Residencial</button>
                  <span>•</span>
                  <button type="button" onClick={() => setSearchQuery("Vila Nova Conceição")} className="hover:text-[#CCFF00] transition-colors underline-offset-2 hover:underline">Vila Nova Conceição</button>
                  <span>•</span>
                  <button type="button" onClick={() => setSearchQuery("Moema")} className="hover:text-[#CCFF00] transition-colors underline-offset-2 hover:underline">Moema Pássaros</button>
                  <span>•</span>
                  <button type="button" onClick={() => setSearchQuery("Pinheiros")} className="hover:text-[#CCFF00] transition-colors underline-offset-2 hover:underline">Pinheiros</button>
                </div>

              </div>
            </div>

            {/* Proof Stack */}
            <div className="flex items-center justify-center gap-3 pt-4">
              <div className="flex -space-x-2">
                <div className="h-8 w-8 rounded-full bg-amber-500 border-2 border-[#07090E] text-white text-[10px] font-bold flex items-center justify-center">
                  CS
                </div>
                <div className="h-8 w-8 rounded-full bg-blue-500 border-2 border-[#07090E] text-white text-[10px] font-bold flex items-center justify-center">
                  RV
                </div>
                <div className="h-8 w-8 rounded-full bg-purple-500 border-2 border-[#07090E] text-white text-[10px] font-bold flex items-center justify-center">
                  MD
                </div>
                <div className="h-8 w-8 rounded-full bg-emerald-500 border-2 border-[#07090E] text-white text-[10px] font-bold flex items-center justify-center">
                  FG
                </div>
              </div>
              <div className="text-left text-xs">
                <span className="font-extrabold text-white block">Mais de 2.300 Corretores & Imobiliárias</span>
                <span className="text-slate-400 text-[10px]">Conectando milhares de famílias aos seus novos lares</span>
              </div>
            </div>

          </div>
        </section>

        {/* 3. SHOWCASE MOCKUPS: NOTEBOOK MACBOOK & IPHONE INTERATIVO COM PRINTS DO SISTEMA */}
        <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-10 sm:py-16">
          <div className="relative mx-auto">
            
            {/* Ambient Backlight Glow behind Mockups */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[500px] bg-gradient-to-tr from-[#CCFF00]/15 via-indigo-600/10 to-emerald-500/15 blur-[160px] rounded-full pointer-events-none animate-glow-pulse" />

            {/* Central Devices Container */}
            <div className="relative flex flex-col lg:flex-row items-center justify-center">
              
              {/* MACBOOK PRO MOCKUP (DESKTOP DASHBOARD) */}
              <div className="relative w-full max-w-4xl rounded-[32px] sm:rounded-[38px] bg-[#141722] border border-white/20 p-2 sm:p-3.5 shadow-[0_40px_100px_rgba(0,0,0,0.85)] group">
                
                {/* Top Camera Notch & Bar */}
                <div className="flex items-center justify-between px-3 py-1.5 mb-1.5 bg-black/40 rounded-t-2xl border-b border-white/[0.08]">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                  </div>
                  <div className="flex items-center gap-2 px-3 py-0.5 rounded-full bg-white/[0.06] text-[10px] text-white/60 font-mono">
                    <Lock className="w-2.5 h-2.5 text-[#CCFF00]" />
                    <span>tactus.com.br/dashboard</span>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-white/20" />
                </div>

                {/* MacBook Screen with Desktop Dashboard Print */}
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl sm:rounded-2xl border border-white/10 bg-black">
                  <Image
                    src="/mockups/dashboard-desktop.jpg"
                    alt="Painel da Imobiliária Tactus CRM no Notebook"
                    fill
                    priority
                    className="object-cover object-top hover:scale-[1.01] transition-transform duration-700"
                  />
                  {/* Subtle Screen Reflection */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/[0.08] via-transparent to-transparent opacity-60" />
                </div>

                {/* MacBook Bottom Base / Lip */}
                <div className="h-3 sm:h-4 w-full bg-gradient-to-b from-[#222633] to-[#12141B] rounded-b-2xl mt-1.5 flex items-center justify-center border-t border-white/10">
                  <div className="w-20 sm:w-28 h-1 rounded-full bg-black/50" />
                </div>
              </div>

              {/* IPHONE 16 PRO MOCKUP (MOBILE DASHBOARD) - Floating & Overlapping */}
              <div className="relative lg:absolute lg:-right-4 lg:-bottom-10 mt-8 lg:mt-0 z-30 animate-float">
                <div className="w-[260px] sm:w-[290px] rounded-[48px] bg-[#0E1017] border-2 border-white/25 p-2.5 shadow-[0_35px_80px_rgba(0,0,0,0.95)] relative">
                  
                  {/* Dynamic Island */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-5 rounded-full bg-black flex items-center justify-between px-2.5 z-20 border border-white/10">
                    <div className="w-2 h-2 rounded-full bg-white/20" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#CCFF00]/40 animate-pulse" />
                  </div>

                  {/* iPhone Screen with Mobile Dashboard Print */}
                  <div className="relative aspect-[9/19] w-full overflow-hidden rounded-[40px] border border-white/10 bg-black">
                    <Image
                      src="/mockups/dashboard-mobile.jpg"
                      alt="Painel Mobile Tactus CRM no iPhone"
                      fill
                      className="object-cover object-top"
                    />
                    {/* Screen Glare */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/[0.07] via-transparent to-transparent" />
                  </div>

                  {/* Home indicator bar */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-28 h-1 rounded-full bg-white/40" />
                </div>
              </div>

              {/* FLOATING INTERACTIVE GLASS PILLS */}
              
              {/* Badge 1: Google Agenda Sincronizada (Top Left) */}
              <div className="hidden md:flex absolute -top-8 -left-4 lg:-left-10 z-30 animate-float items-center gap-3 p-3.5 rounded-2xl border border-white/15 bg-[#12151E]/90 backdrop-blur-2xl shadow-2xl shadow-black/80">
                <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                      Google Agenda Integrada
                    </span>
                  </div>
                  <span className="text-xs font-black text-white block mt-0.5">
                    10:00 • Dr. Marcelo (Mansão Alphaville)
                  </span>
                  <span className="text-[10px] text-white/50">Sincronização 1-clique no celular</span>
                </div>
              </div>

              {/* Badge 2: Lead Quente via Vitrine (Bottom Left) */}
              <div className="hidden md:flex absolute -bottom-6 left-6 lg:left-8 z-30 animate-float-reverse items-center gap-3 p-3.5 rounded-2xl border border-white/15 bg-[#12151E]/90 backdrop-blur-2xl shadow-2xl shadow-black/80">
                <div className="w-10 h-10 rounded-xl bg-[#CCFF00]/15 border border-[#CCFF00]/30 flex items-center justify-center text-[#CCFF00]">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 text-[9px] font-bold uppercase">
                      Lead Quente via Vitrine
                    </span>
                  </div>
                  <span className="text-xs font-black text-white block mt-0.5">
                    Renata Vasconcelos • WhatsApp Ativo
                  </span>
                  <span className="text-[10px] text-white/50">Proposta Aberta • R$ 1.850.000</span>
                </div>
              </div>

              {/* Badge 3: VGV Fechado (Top Right) */}
              <div className="hidden lg:flex absolute -top-10 right-28 z-30 animate-float-slow items-center gap-2.5 px-4 py-2 rounded-full border border-[#CCFF00]/30 bg-black/80 backdrop-blur-2xl shadow-xl">
                <TrendingUp className="w-4 h-4 text-[#CCFF00]" />
                <span className="text-xs font-black text-white">R$ 4.850.000 VGV</span>
                <span className="px-2 py-0.5 rounded-full bg-[#CCFF00] text-black text-[9px] font-black uppercase">
                  +18.4% no mês
                </span>
              </div>

            </div>
          </div>
        </section>

        {/* 4. REALTIME ECOSYSTEM TICKER */}
        <div className="w-full border-y border-white/[0.08] bg-white/[0.02] py-3.5 overflow-hidden backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-between text-xs text-white/60">
            <div className="flex items-center gap-2 text-[#CCFF00] font-bold shrink-0 pr-4 border-r border-white/10">
              <span className="w-2 h-2 rounded-full bg-[#CCFF00] animate-pulse" />
              <span className="text-[11px] font-black tracking-wider uppercase">AO VIVO NA REDE TACTUS</span>
            </div>
            <div className="flex items-center gap-8 overflow-x-auto no-scrollbar whitespace-nowrap text-xs pl-4">
              <span className="flex items-center gap-1.5 text-white/80">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#CCFF00]" />
                <strong>Mansão Alphaville:</strong> Proposta aceita • R$ 4.900.000
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 text-white/80">
                <Calendar className="w-3.5 h-3.5 text-blue-400" />
                <strong>Ed. Terraço Jardins:</strong> Visita agendada para 16:45 via Google Agenda
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 text-white/80">
                <Share2 className="w-3.5 h-3.5 text-purple-400" />
                <strong>Vitrine Ativa:</strong> tactus.com.br/v/carlos-silveira (12 novos acessos hoje)
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 text-white/80">
                <Key className="w-3.5 h-3.5 text-[#CCFF00]" />
                <strong>Studio Pinheiros:</strong> Locação assinada digitalmente
              </span>
            </div>
          </div>
        </div>

        {/* 5. SEÇÃO DE IMÓVEIS EM DESTAQUE (VIVA REAL / QUINTOANDAR / ZAP STYLE) */}
        <section id="imoveis" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-[11px] font-bold text-[#CCFF00] mb-2">
                <Sparkles className="w-3 h-3" />
                CATÁLOGO EXCLUSIVO
              </div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
                Imóveis em Destaque na Rede Tactus
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                Propriedades verificadas com atendimento direto do corretor especialista.
              </p>
            </div>

            <Link
              href="/imoveis"
              className="inline-flex items-center gap-2 h-11 px-5 rounded-full border border-white/15 bg-white/[0.04] hover:bg-white/[0.08] text-xs font-bold text-white transition-all hover:scale-102 self-start sm:self-auto"
            >
              <span>Ver Todos os Imóveis</span>
              <ArrowRight className="w-4 h-4 text-[#CCFF00]" />
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {FEATURED_PROPERTIES.map((prop) => (
              <div
                key={prop.id}
                className="group rounded-[28px] border border-white/[0.10] bg-white/[0.03] backdrop-blur-xl overflow-hidden hover:border-[#CCFF00]/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Property Image & Badges */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
                    <img
                      src={prop.imageUrl}
                      alt={prop.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-black uppercase text-[#CCFF00] border border-white/10">
                        {prop.tag}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-bold text-white">
                        {prop.category}
                      </span>
                    </div>

                    <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md text-[10px] font-mono text-white/70">
                      CÓD: {prop.code}
                    </div>
                  </div>

                  {/* Body Details */}
                  <div className="p-5 space-y-3">
                    <div className="flex items-baseline justify-between">
                      <span className="text-xl font-black text-white tracking-tight">
                        {prop.price}
                      </span>
                      <span className="text-[11px] text-[#CCFF00] font-semibold">
                        {prop.broker}
                      </span>
                    </div>

                    <h3 className="font-bold text-sm text-white line-clamp-1 group-hover:text-[#CCFF00] transition-colors">
                      {prop.title}
                    </h3>

                    <p className="text-xs text-slate-400 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span className="truncate">{prop.location}</span>
                    </p>

                    {/* Specs Pills */}
                    <div className="flex items-center gap-3 pt-2 text-[11px] text-slate-300 border-t border-white/[0.06]">
                      <span className="flex items-center gap-1">
                        <Bed className="w-3.5 h-3.5 text-slate-400" /> {prop.beds} qts
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Bath className="w-3.5 h-3.5 text-slate-400" /> {prop.baths} banh
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Car className="w-3.5 h-3.5 text-slate-400" /> {prop.parking} vg
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Maximize className="w-3.5 h-3.5 text-slate-400" /> {prop.area} m²
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="p-5 pt-0 grid grid-cols-2 gap-2">
                  <Link
                    href={`/imovel/${prop.code}`}
                    className="h-10 rounded-2xl border border-white/10 bg-white/[0.05] hover:bg-white/[0.10] text-xs font-bold text-white flex items-center justify-center transition-all"
                  >
                    Ver Detalhes
                  </Link>
                  <a
                    href={`https://wa.me/5511987654321?text=${encodeURIComponent(`Olá! Tenho interesse no imóvel ${prop.code} (${prop.title}). Podemos agendar uma visita?`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-10 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md transition-all"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    WhatsApp
                  </a>
                </div>

              </div>
            ))}
          </div>
        </section>

        {/* 6. RECURSOS DO TACTUS CRM: DESIGN PRIME & EFICIÊNCIA */}
        <section id="recursos" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto space-y-2 mb-12">
            <span className="text-xs font-bold text-[#CCFF00] uppercase tracking-widest">
              Tecnologia de Ponta para o Corretor
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              Tudo o que sua imobiliária precisa para vender mais.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3 items-stretch">
            {/* Card 01 - Apple Dark Glass */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-7 flex flex-col justify-between space-y-4 hover:border-white/20 transition-all">
              <div className="space-y-3">
                <span className="text-xl font-mono font-bold text-slate-500">01.</span>
                <h3 className="text-xl font-bold text-white">Carteira Inteligente em Alta Resolução</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Cadastre imóveis com preenchimento instantâneo de endereço por CEP (ViaCEP), upload de fotos em alta definição e simulação de financiamento bancário para compradores.
                </p>
              </div>
              <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs font-bold text-white">
                <Link href="/dashboard/imoveis" className="hover:text-[#CCFF00] transition-colors">
                  Ver no Sistema
                </Link>
                <ArrowUpRight className="h-4 w-4 text-[#CCFF00]" />
              </div>
            </div>

            {/* Card 02 - Electric Lime Highlight */}
            <div className="rounded-3xl bg-[#CCFF00] text-black p-7 flex flex-col justify-between space-y-4 shadow-2xl shadow-[#CCFF00]/20 transform md:-translate-y-2 transition-transform">
              <div className="space-y-3">
                <span className="text-xl font-mono font-black text-black/60">02.</span>
                <h3 className="text-xl font-black text-black">Vitrines Públicas Personalizadas</h3>
                <p className="text-xs text-black/80 font-medium leading-relaxed">
                  Gere com um único clique um link exclusivo da sua carteira (ex: <code>/v/tactus</code> ou <code>/v/seu-nome</code>) com sua foto, CRECI e botão direto de WhatsApp para enviar aos clientes ou colocar na sua bio.
                </p>
              </div>
              <div className="pt-4 border-t border-black/15 flex items-center justify-between text-xs font-black text-black">
                <Link href="/v/tactus" target="_blank" className="hover:underline">
                  Conhecer a Vitrine
                </Link>
                <ArrowRight className="h-4 w-4" />
              </div>
            </div>

            {/* Card 03 - Apple Dark Glass */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-7 flex flex-col justify-between space-y-4 hover:border-white/20 transition-all">
              <div className="space-y-3">
                <span className="text-xl font-mono font-bold text-slate-500">03.</span>
                <h3 className="text-xl font-bold text-white">Gestão Completa de Leads & Aluguéis</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Funil Kanban interativo com etiquetas de temperatura, gestão de contratos de locação com reajustes por IGP-M/IPCA e sincronização nativa de visitas com o Google Agenda.
                </p>
              </div>
              <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs font-bold text-white">
                <Link href="/dashboard" className="hover:text-[#CCFF00] transition-colors">
                  Ver no Sistema
                </Link>
                <ArrowUpRight className="h-4 w-4 text-[#CCFF00]" />
              </div>
            </div>
          </div>
        </section>

        {/* 7. PRICING & SUBSCRIPTION SECTION - Apple Prime Glass */}
        <section id="precos" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#CCFF00]/5 blur-[150px] rounded-full pointer-events-none"></div>

          <div className="text-center max-w-2xl mx-auto space-y-3 mb-10 relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/[0.05] border border-white/10 px-4 py-1 text-[11px] font-bold text-[#CCFF00] backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5" />
              PLANOS & INVESTIMENTO TRANSPARENTE
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              Escolha o plano ideal para a sua escala de vendas.
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              Do corretor autônomo em ascensão às grandes redes imobiliárias. Ativação imediata, sem taxa de implantação e sem fidelidade obrigatória.
            </p>

            {/* Monthly vs Annual Toggle */}
            <div className="pt-5 flex items-center justify-center">
              <div className="inline-flex items-center p-1.5 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-inner">
                <button
                  type="button"
                  onClick={() => setAnnualBilling(false)}
                  className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                    !annualBilling
                      ? "bg-white text-black shadow-md scale-102"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Cobrança Mensal
                </button>
                <button
                  type="button"
                  onClick={() => setAnnualBilling(true)}
                  className={`px-5 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                    annualBilling
                      ? "bg-[#CCFF00] text-black shadow-md scale-102 font-extrabold"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <span>Cobrança Anual</span>
                  <span className="rounded-full bg-black/20 text-black px-2 py-0.5 text-[10px] font-black uppercase">
                    -20% OFF
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Pricing Cards Grid */}
          <div className="grid gap-8 lg:grid-cols-3 items-stretch relative z-10">
            {plans.map((plan) => {
              const price = annualBilling ? plan.priceAnnual : plan.priceMonthly
              const isLime = plan.theme === "lime"
              const isGold = plan.theme === "gold"

              return (
                <div
                  key={plan.id}
                  className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative ${
                    isLime
                      ? "bg-[#CCFF00] text-black shadow-2xl shadow-[#CCFF00]/25 ring-2 ring-lime-300 lg:-translate-y-3"
                      : isGold
                      ? "border border-amber-500/30 bg-gradient-to-b from-amber-500/[0.08] via-white/[0.02] to-white/[0.01] backdrop-blur-2xl hover:border-amber-500/50"
                      : "border border-white/10 bg-white/[0.03] backdrop-blur-2xl hover:border-white/20"
                  }`}
                >
                  {/* Badge */}
                  {plan.badge && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <span
                        className={`rounded-full px-3.5 py-1 text-[10px] font-black tracking-wider uppercase shadow-md ${
                          isLime
                            ? "bg-black text-white"
                            : "bg-amber-500 text-black"
                        }`}
                      >
                        {plan.badge}
                      </span>
                    </div>
                  )}

                  <div className="space-y-6">
                    {/* Header */}
                    <div>
                      <span
                        className={`text-[11px] font-bold uppercase tracking-wider block ${
                          isLime ? "text-black/70" : isGold ? "text-amber-400" : "text-slate-400"
                        }`}
                      >
                        {plan.subtitle}
                      </span>
                      <h3
                        className={`text-2xl font-black mt-1 ${
                          isLime ? "text-black" : "text-white"
                        }`}
                      >
                        {plan.name}
                      </h3>
                      <p
                        className={`text-xs mt-2 leading-relaxed ${
                          isLime ? "text-black/80" : "text-slate-400"
                        }`}
                      >
                        {plan.description}
                      </p>
                    </div>

                    {/* Price */}
                    <div className="pt-2 border-t border-current/10">
                      <div className="flex items-baseline gap-1">
                        <span className="text-xs font-semibold">R$</span>
                        <span className="text-4xl sm:text-5xl font-black tracking-tight">
                          {price}
                        </span>
                        <span className="text-xs font-semibold opacity-75">{plan.period}</span>
                      </div>
                      <span className="text-[10px] opacity-70 block mt-1">
                        {annualBilling ? "Faturado anualmente com 20% de desconto" : "Faturado mensalmente sem fidelidade"}
                      </span>
                    </div>

                    {/* Limits Caps */}
                    <div
                      className={`rounded-2xl p-3.5 text-xs font-semibold space-y-1.5 ${
                        isLime
                          ? "bg-black/10 text-black"
                          : isGold
                          ? "bg-amber-500/10 text-amber-200 border border-amber-500/20"
                          : "bg-white/[0.04] text-slate-300 border border-white/10"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="opacity-75">Corretores:</span>
                        <span className="font-bold">{plan.brokerLimit}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="opacity-75">Carteira:</span>
                        <span className="font-bold">{plan.propertiesLimit}</span>
                      </div>
                    </div>

                    {/* Features List */}
                    <div className="space-y-2.5 pt-2">
                      <span
                        className={`text-[11px] font-bold uppercase tracking-wider block ${
                          isLime ? "text-black/70" : "text-slate-400"
                        }`}
                      >
                        O que está incluído:
                      </span>
                      <ul className="space-y-2 text-xs">
                        {plan.features.map((feat, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Check
                              className={`h-4 w-4 shrink-0 mt-0.5 ${
                                isLime ? "text-black font-extrabold" : "text-[#CCFF00]"
                              }`}
                            />
                            <span className={isLime ? "text-black/90 font-medium" : "text-slate-300"}>
                              {feat}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="pt-8">
                    <button
                      type="button"
                      onClick={() => handleSelectPlan(plan)}
                      className={`w-full h-12 rounded-full font-extrabold text-xs shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 ${
                        isLime
                          ? "bg-black hover:bg-neutral-900 text-white shadow-black/30"
                          : isGold
                          ? "bg-amber-500 hover:bg-amber-400 text-black shadow-amber-500/20"
                          : "bg-[#CCFF00] hover:bg-[#bbf000] text-black shadow-[#CCFF00]/20"
                      }`}
                    >
                      <span>{plan.ctaText}</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

      </main>

      {/* CHECKOUT MODAL */}
      {selectedPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in">
          <div className="relative w-full max-w-lg rounded-3xl border border-white/15 bg-[#0F121B] p-6 sm:p-8 shadow-2xl text-slate-100 overflow-hidden">
            <button
              onClick={() => setSelectedPlan(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
            >
              <X className="h-5 w-5" />
            </button>

            {checkoutStep === "form" ? (
              <form onSubmit={handleCompleteSubscription} className="space-y-5">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#CCFF00]">
                    Ativação Imediata
                  </span>
                  <h3 className="text-2xl font-black text-white mt-1">
                    Assinar {selectedPlan.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Investimento de R$ {annualBilling ? selectedPlan.priceAnnual : selectedPlan.priceMonthly} {selectedPlan.period}. Cancele quando quiser.
                  </p>
                </div>

                {/* Form fields */}
                <div className="space-y-3 text-xs">
                  <div>
                    <label className="font-semibold text-slate-300 block mb-1">Nome Completo</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Carlos Eduardo Silveira"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full h-10 px-3.5 rounded-2xl bg-white/[0.05] border border-white/10 text-white focus:outline-none focus:border-[#CCFF00]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-semibold text-slate-300 block mb-1">E-mail</label>
                      <input
                        type="email"
                        required
                        placeholder="seu@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full h-10 px-3.5 rounded-2xl bg-white/[0.05] border border-white/10 text-white focus:outline-none focus:border-[#CCFF00]"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-slate-300 block mb-1">WhatsApp</label>
                      <input
                        type="tel"
                        required
                        placeholder="(11) 98765-4321"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full h-10 px-3.5 rounded-2xl bg-white/[0.05] border border-white/10 text-white focus:outline-none focus:border-[#CCFF00]"
                      />
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 rounded-2xl bg-[#CCFF00] hover:bg-[#bbf000] text-black font-extrabold text-xs shadow-lg transition-all"
                >
                  Confirmar e Ativar Acesso Agora
                </Button>
              </form>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto text-2xl font-bold">
                  ✓
                </div>
                <h3 className="text-2xl font-black text-white">Parabéns! Sua assinatura foi ativada.</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Enviamos suas credenciais corporativas e o link de acesso ao painel do corretor para o seu e-mail.
                </p>
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 h-11 px-6 rounded-full bg-[#CCFF00] hover:bg-[#bbf000] text-black font-extrabold text-xs shadow-lg transition-all"
                >
                  <span>Entrar no Tactus CRM Agora</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 8. Global Footer */}
      <footer className="border-t border-white/[0.08] py-8 text-center text-xs text-slate-500 relative z-10">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <TactusLogo variant="branco" size="xs" />
            <p>© {new Date().getFullYear()} Tactus CRM Imobiliário. Conectando Compradores, Vendedores e Corretores de Elite.</p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="#imoveis" className="hover:text-slate-300">Buscar Imóveis</Link>
            <Link href="#precos" className="hover:text-slate-300">Planos & Assinaturas</Link>
            <Link href="/v/tactus" className="hover:text-slate-300">Vitrine Exemplo</Link>
            <Link href="/login" className="hover:text-slate-300 font-bold text-[#CCFF00]">Acessar o Tactus CRM</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
