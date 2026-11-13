"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { TactusLogo } from "@/components/tactus-logo"
import { 
  Building, 
  Building2,
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
  Calendar,
  TrendingUp,
  MessageSquare,
  PhoneCall,
  Laptop,
  Flame,
  Clock,
  Layers,
  FileSpreadsheet,
  AlertTriangle,
  ChevronRight,
  UserCheck,
  Briefcase
} from "lucide-react"
import { Button } from "@/components/ui/button"

const UNIFIED_STYLES = `
  /* Film grain subtle overlay from 21st.dev */
  .film-grain {
    position: absolute; inset: 0; width: 100%; height: 100%;
    pointer-events: none; z-index: 50; opacity: 0.035; mix-blend-mode: overlay;
    background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><filter id="noiseFilter"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23noiseFilter)"/></svg>');
  }

  .bg-grid-theme {
    background-size: 48px 48px;
    background-image: 
      linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
    mask-image: radial-gradient(ellipse at center, black 0%, transparent 75%);
    -webkit-mask-image: radial-gradient(ellipse at center, black 0%, transparent 75%);
  }

  /* 3D Physical Skeuomorphic Materials */
  .text-3d-matte {
    color: #FFFFFF;
    text-shadow: 
      0 10px 30px rgba(0, 0, 0, 0.8), 
      0 2px 4px rgba(0, 0, 0, 0.6);
  }

  .text-silver-matte {
    background: linear-gradient(180deg, #FFFFFF 0%, #A1A1AA 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    transform: translateZ(0);
    filter: 
      drop-shadow(0px 10px 20px rgba(0, 0, 0, 0.8)) 
      drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.5));
  }

  .text-lime-matte {
    background: linear-gradient(180deg, #CCFF00 0%, #99E600 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    transform: translateZ(0);
    filter: 
      drop-shadow(0px 10px 25px rgba(204, 255, 0, 0.35)) 
      drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.8));
  }

  /* Deep Physical Card with Dynamic Mouse Lighting Sheen */
  .premium-depth-card {
    background: linear-gradient(145deg, #101524 0%, #060911 100%);
    box-shadow: 
      0 40px 100px -20px rgba(0, 0, 0, 0.95),
      0 20px 40px -20px rgba(0, 0, 0, 0.85),
      inset 0 1px 2px rgba(255, 255, 255, 0.15),
      inset 0 -2px 4px rgba(0, 0, 0, 0.9);
    border: 1px solid rgba(255, 255, 255, 0.08);
    position: relative;
  }

  .card-sheen {
    position: absolute; inset: 0; border-radius: inherit; pointer-events: none; z-index: 40;
    background: radial-gradient(900px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(204, 255, 0, 0.08) 0%, transparent 45%);
    mix-blend-mode: screen; transition: opacity 0.3s ease;
  }

  .floating-ui-badge {
    background: linear-gradient(135deg, rgba(16, 21, 35, 0.88) 0%, rgba(6, 9, 17, 0.92) 100%);
    backdrop-filter: blur(28px); 
    -webkit-backdrop-filter: blur(28px);
    box-shadow: 
      0 0 0 1px rgba(255, 255, 255, 0.12),
      0 25px 50px -12px rgba(0, 0, 0, 0.9),
      inset 0 1px 1px rgba(255,255,255,0.2),
      inset 0 -1px 1px rgba(0,0,0,0.6);
  }

  /* Tactile Physical Buttons */
  .btn-modern-lime {
    transition: all 0.35s cubic-bezier(0.25, 1, 0.5, 1);
    background: linear-gradient(180deg, #CCFF00 0%, #A8E600 100%);
    color: #07090E;
    box-shadow: 0 0 0 1px rgba(204,255,0,0.3), 0 2px 4px rgba(0,0,0,0.2), 0 12px 28px -4px rgba(204,255,0,0.35), inset 0 1px 1px rgba(255,255,255,0.6), inset 0 -3px 6px rgba(0,0,0,0.1);
  }
  .btn-modern-lime:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 0 1px rgba(204,255,0,0.5), 0 6px 14px -2px rgba(0,0,0,0.3), 0 20px 36px -6px rgba(204,255,0,0.5), inset 0 1px 1px rgba(255,255,255,0.8), inset 0 -3px 6px rgba(0,0,0,0.1);
  }
  .btn-modern-lime:active {
    transform: translateY(1px);
    background: #A8E600;
    box-shadow: 0 0 0 1px rgba(0,0,0,0.2), 0 1px 2px rgba(0,0,0,0.2), inset 0 3px 6px rgba(0,0,0,0.2);
  }

  .btn-modern-dark {
    transition: all 0.35s cubic-bezier(0.25, 1, 0.5, 1);
    background: linear-gradient(180deg, #27272A 0%, #141416 100%);
    color: #FFFFFF;
    box-shadow: 0 0 0 1px rgba(255,255,255,0.12), 0 2px 4px rgba(0,0,0,0.6), 0 12px 24px -4px rgba(0,0,0,0.9), inset 0 1px 1px rgba(255,255,255,0.15), inset 0 -3px 6px rgba(0,0,0,0.8);
  }
  .btn-modern-dark:hover {
    transform: translateY(-2px);
    background: linear-gradient(180deg, #3F3F46 0%, #202024 100%);
    box-shadow: 0 0 0 1px rgba(255,255,255,0.2), 0 6px 12px -2px rgba(0,0,0,0.7), 0 20px 32px -6px rgba(0,0,0,1), inset 0 1px 1px rgba(255,255,255,0.25), inset 0 -3px 6px rgba(0,0,0,0.8);
  }
  .btn-modern-dark:active {
    transform: translateY(1px);
    background: #141416;
    box-shadow: 0 0 0 1px rgba(255,255,255,0.05), inset 0 3px 8px rgba(0,0,0,0.9);
  }
`;

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
    description: "Projetado sob medida para o corretor independente que precisa de presença digital exclusiva e agilidade no fechamento de negócios.",
    brokerLimit: "1 Corretor Individual",
    propertiesLimit: "Até 50 Imóveis Ativos",
    features: [
      "Sua Vitrine Pública Exclusiva (/v/seu-nome)",
      "Botão Direto de WhatsApp com mensagem pré-configurada",
      "Upload de fotos em Alta Resolução (HD)",
      "Preenchimento automático de endereço por CEP (ViaCEP)",
      "Funil de Vendas Kanban com etiquetas de temperatura",
      "Sincronização 1-clique com Google Agenda no celular",
      "App Mobile PWA com notificações em tempo real",
      "Sem anúncios de concorrentes na sua vitrine",
      "Suporte ágil via WhatsApp"
    ],
    ctaText: "Assinar Plano Autônomo",
    theme: "dark"
  },
  {
    id: "tactus",
    name: "Plano Imobiliária",
    subtitle: "Pessoa Jurídica (PJ) & Equipes",
    badge: "MAIS ESCOLHIDO",
    popular: true,
    priceMonthly: 249,
    priceAnnual: 199,
    period: "/mês",
    description: "A ferramenta definitiva para imobiliárias que gerenciam equipe de corretores, alta demanda de leads e carteira de locações.",
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
    ctaText: "Assinar Plano Imobiliária",
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
    description: "Para grandes imobiliárias, redes de franquias e incorporadoras com alta demanda operacional e múltiplas filiais.",
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

// Exemplo da Vitrine Digital do Corretor para demonstração
const SHOWCASE_DEMO_PROPERTIES = [
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
    broker: "Carlos Silveira • CRECI 48.912"
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
    broker: "Carlos Silveira • CRECI 48.912"
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
    broker: "Mariana Alencar • CRECI 52.104"
  }
]

export default function CRMLandingPage() {
  const [annualBilling, setAnnualBilling] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<PlanDetail | null>(null)
  const [checkoutStep, setCheckoutStep] = useState<"form" | "success">("form")
  const [clientType, setClientType] = useState<"PF" | "PJ">("PF")
  
  // Segment Switcher (Corretor Autônomo vs. Imobiliária vs. Rede)
  const [activeSegment, setActiveSegment] = useState<"corretor" | "imobiliaria" | "enterprise">("corretor")

  // Refs for 3D mouse parallax and specular lighting
  const showcaseCardRef = useRef<HTMLDivElement>(null)
  const deviceTiltRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!showcaseCardRef.current) return
      const rect = showcaseCardRef.current.getBoundingClientRect()
      const mouseX = e.clientX - rect.left
      const mouseY = e.clientY - rect.top
      
      showcaseCardRef.current.style.setProperty("--mouse-x", `${mouseX}px`)
      showcaseCardRef.current.style.setProperty("--mouse-y", `${mouseY}px`)

      if (deviceTiltRef.current && window.innerWidth >= 1024) {
        const xPercent = (e.clientX / window.innerWidth - 0.5) * 2
        const yPercent = (e.clientY / window.innerHeight - 0.5) * 2
        deviceTiltRef.current.style.transform = `perspective(1200px) rotateY(${xPercent * 5}deg) rotateX(${-yPercent * 5}deg)`
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

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
    <div className="min-h-screen bg-[#07090E] text-slate-100 flex flex-col justify-between selection:bg-[#CCFF00] selection:text-black font-sans overflow-x-hidden relative">
      
      {/* 0. INJECTED 3D SKEUOMORPHIC & FILM GRAIN STYLES */}
      <style dangerouslySetInnerHTML={{ __html: UNIFIED_STYLES }} />

      {/* Film grain environmental overlay */}
      <div className="film-grain" aria-hidden="true" />

      {/* Ambient Lighting Gradients */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-indigo-600/12 blur-[170px] rounded-full" />
        <div className="absolute top-96 right-10 w-[650px] h-[500px] bg-[#CCFF00]/10 blur-[180px] rounded-full animate-glow-pulse" />
        <div className="absolute inset-0 bg-grid-theme opacity-35" />
      </div>

      {/* 1. Header do CRM - Apple Prime Glass Capsule */}
      <header className="sticky top-0 z-40 bg-[#07090E]/85 backdrop-blur-2xl border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center group transition-transform hover:scale-105">
            <TactusLogo variant="verde" className="h-11 sm:h-12 w-auto" priority />
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-400">
            <Link href="#recursos" className="hover:text-white transition-colors">
              O CRM
            </Link>
            <Link href="#vitrine-exemplo" className="hover:text-white transition-colors">
              Vitrines Digitais
            </Link>
            <Link href="#comparativo" className="hover:text-white transition-colors">
              Por que o Tactus?
            </Link>
            <Link href="#precos" className="hover:text-white transition-colors text-[#CCFF00]">
              Planos & Preços
            </Link>
            <Link href="/v/tactus" target="_blank" className="hover:text-white transition-colors">
              Vitrine Modelo
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
              Vitrine Exemplo
            </Link>

            {/* Apple Electric Lime Button */}
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 h-9 px-4 rounded-full bg-[#CCFF00] hover:bg-[#bbf000] text-black font-extrabold text-xs shadow-lg shadow-[#CCFF00]/20 transition-all hover:scale-105"
            >
              <span>Acessar o CRM</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* 2. MASTER UNIFIED HERO & HARDWARE SHOWCASE STAGE */}
      <main className="flex-1 relative z-10">
        
        {/* Top Hero Typography & Call to Action */}
        <section className="relative pt-12 sm:pt-20 pb-8 px-4 sm:px-6 lg:px-8 text-center max-w-5xl mx-auto">
          
          <div className="space-y-6">
            {/* Pill Header Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-white/[0.05] border border-white/10 px-4 py-1.5 text-[11px] font-extrabold text-[#CCFF00] backdrop-blur-md">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#CCFF00] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#CCFF00]"></span>
              </span>
              TACTUS CRM • O ECOSSISTEMA DO CORRETOR & IMOBILIÁRIA DE ALTO PADRÃO
            </div>

            {/* Master Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.08] text-white">
              O CRM que conecta sua imobiliária e <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#CCFF00] via-white to-slate-200">
                seus corretores ao cliente final.
              </span>
            </h1>

            {/* Master Subtitle */}
            <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-400 font-normal leading-relaxed">
              Esqueça portais tradicionais que cobram fortunas para exibir anúncios dos seus concorrentes. 
              Com o <strong className="text-white">Tactus CRM</strong>, você tem sua Vitrine Digital exclusiva com botão de WhatsApp direto, 
              funil Kanban de alta conversão, agendamento com Google Agenda e gestão automatizada de aluguéis e comissões.
            </p>

            {/* Tactile Physical CTA Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="#precos"
                className="btn-modern-lime flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full font-black text-xs sm:text-sm shadow-xl"
              >
                <span>Começar Agora (Planos a partir de R$ 69/mês)</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/v/tactus"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-modern-dark flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold text-xs sm:text-sm text-slate-300 hover:text-white"
              >
                <Share2 className="w-4 h-4 text-[#CCFF00]" />
                <span>Conhecer a Vitrine Modelo</span>
              </Link>
            </div>

            {/* Proof Stack */}
            <div className="flex items-center justify-center gap-3 pt-2">
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
                <span className="font-extrabold text-white block">Mais de 2.300 Corretores & Imobiliárias Ativas</span>
                <span className="text-slate-400 text-[10px]">Aumentando o VGV e fechando negócios sem intermediários</span>
              </div>
            </div>
          </div>
        </section>

        {/* 3. CENTRAL 3D PHYSICAL HARDWARE STAGE (MacBook Pro + iPhone 16 Pro + Dynamic Sheen) */}
        <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-4 pb-12 sm:pb-20">
          <div
            ref={showcaseCardRef}
            className="premium-depth-card rounded-[32px] sm:rounded-[44px] p-4 sm:p-8 lg:p-12 overflow-hidden"
          >
            {/* Specular Mouse Sheen Overlay */}
            <div className="card-sheen" aria-hidden="true" />

            {/* Devices Tilt Wrapper */}
            <div
              ref={deviceTiltRef}
              className="relative flex flex-col lg:flex-row items-center justify-center transition-transform duration-300 ease-out z-10"
            >
              {/* MACBOOK PRO MOCKUP (DESKTOP DASHBOARD) */}
              <div className="relative w-full max-w-4xl rounded-[28px] sm:rounded-[36px] bg-[#141722] border border-white/20 p-2 sm:p-3 shadow-[0_40px_100px_rgba(0,0,0,0.85)] group">
                
                {/* Top Camera Notch & Browser Bar */}
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
                    alt="Painel do Corretor e Gestor Tactus CRM no Notebook"
                    fill
                    priority
                    className="object-cover object-top hover:scale-[1.01] transition-transform duration-700"
                  />
                  {/* Screen Glare Highlight */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/[0.08] via-transparent to-transparent opacity-60" />
                </div>

                {/* MacBook Bottom Base / Lip */}
                <div className="h-3 sm:h-4 w-full bg-gradient-to-b from-[#222633] to-[#12141B] rounded-b-2xl mt-1.5 flex items-center justify-center border-t border-white/10">
                  <div className="w-20 sm:w-28 h-1 rounded-full bg-black/50" />
                </div>
              </div>

              {/* IPHONE 16 PRO MOCKUP (MOBILE DASHBOARD) - Floating & Overlapping */}
              <div className="relative lg:absolute lg:-right-2 lg:-bottom-6 mt-8 lg:mt-0 z-30 animate-float">
                <div className="w-[240px] sm:w-[275px] rounded-[44px] bg-[#0E1017] border-2 border-white/25 p-2 shadow-[0_35px_80px_rgba(0,0,0,0.95)] relative">
                  
                  {/* Dynamic Island */}
                  <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-20 h-4.5 rounded-full bg-black flex items-center justify-between px-2.5 z-20 border border-white/10">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                    <div className="w-2 h-2 rounded-full bg-[#CCFF00]/50 animate-pulse" />
                  </div>

                  {/* iPhone Screen with Mobile Dashboard Print */}
                  <div className="relative aspect-[9/19] w-full overflow-hidden rounded-[36px] border border-white/10 bg-black">
                    <Image
                      src="/mockups/dashboard-mobile.jpg"
                      alt="Painel Mobile Tactus CRM no iPhone"
                      fill
                      className="object-cover object-top"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/[0.08] via-transparent to-transparent" />
                  </div>

                  {/* Home indicator bar */}
                  <div className="absolute bottom-3.5 left-1/2 -translate-x-1/2 w-24 h-1 rounded-full bg-white/40" />
                </div>
              </div>

              {/* 3D FLOATING GLASS BADGES */}
              
              {/* Badge 1: Google Agenda Sincronizada (Top Left) */}
              <div className="hidden md:flex absolute -top-4 -left-2 lg:-left-6 z-30 animate-float items-center gap-3 p-3.5 rounded-2xl floating-ui-badge">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-blue-400">
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
                  <span className="text-[10px] text-white/50">Visita sincronizada no celular do corretor</span>
                </div>
              </div>

              {/* Badge 2: Lead Quente via Vitrine (Bottom Left) */}
              <div className="hidden md:flex absolute -bottom-4 left-4 lg:left-6 z-30 animate-float-reverse items-center gap-3 p-3.5 rounded-2xl floating-ui-badge">
                <div className="w-10 h-10 rounded-xl bg-[#CCFF00]/20 border border-[#CCFF00]/40 flex items-center justify-center text-[#CCFF00]">
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
              <div className="hidden lg:flex absolute -top-5 right-24 z-30 animate-float-slow items-center gap-2.5 px-4 py-2 rounded-full border border-[#CCFF00]/40 bg-black/85 backdrop-blur-2xl shadow-xl">
                <TrendingUp className="w-4 h-4 text-[#CCFF00]" />
                <span className="text-xs font-black text-white">R$ 4.850.000 VGV</span>
                <span className="px-2 py-0.5 rounded-full bg-[#CCFF00] text-black text-[9px] font-black uppercase">
                  +18.4% no mês
                </span>
              </div>

            </div>
          </div>
        </section>

        {/* 4. INTERACTIVE BROKER & AGENCY SOLUTION CONSOLE */}
        <section className="relative px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto pb-16">
          <div className="rounded-[32px] border border-white/15 bg-[#0F121B]/90 backdrop-blur-2xl p-4 sm:p-7 shadow-[0_24px_60px_rgba(0,0,0,0.6)]">
            
            {/* Segment Selector Tabs */}
            <div className="flex flex-wrap items-center gap-2 mb-6 border-b border-white/[0.08] pb-4">
              <button
                type="button"
                onClick={() => setActiveSegment("corretor")}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-extrabold transition-all ${
                  activeSegment === "corretor"
                    ? "bg-[#CCFF00] text-black shadow-lg shadow-[#CCFF00]/25 font-black scale-102"
                    : "bg-white/[0.04] text-white/70 hover:text-white hover:bg-white/[0.08]"
                }`}
              >
                <UserCheck className="w-4 h-4" />
                <span>Para Corretores Autônomos (PF)</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveSegment("imobiliaria")}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-extrabold transition-all ${
                  activeSegment === "imobiliaria"
                    ? "bg-[#CCFF00] text-black shadow-lg shadow-[#CCFF00]/25 font-black scale-102"
                    : "bg-white/[0.04] text-white/70 hover:text-white hover:bg-white/[0.08]"
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>Para Imobiliárias & Gestores (PJ)</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveSegment("enterprise")}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-extrabold transition-all ${
                  activeSegment === "enterprise"
                    ? "bg-[#CCFF00] text-black shadow-lg shadow-[#CCFF00]/25 font-black scale-102"
                    : "bg-white/[0.04] text-white/70 hover:text-white hover:bg-white/[0.08]"
                }`}
              >
                <Crown className="w-4 h-4 text-amber-400" />
                <span>Redes & Incorporadoras</span>
              </button>
            </div>

            {/* Tab 1: Corretor Autônomo */}
            {activeSegment === "corretor" && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-8 space-y-3">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[11px] font-bold border border-emerald-500/20">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    A partir de R$ 69/mês • 1 Corretor • Até 50 Imóveis
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    Sua marca pessoal forte e fechamentos no WhatsApp.
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Tenha sua própria Vitrine Digital (<code className="text-[#CCFF00] bg-white/[0.05] px-1.5 py-0.5 rounded">/v/seu-nome</code>) para enviar no WhatsApp e Instagram do cliente sem anúncios concorrentes. Agende visitas com 1 clique sincronizado ao Google Agenda e controle todos os leads no funil Kanban pelo celular.
                  </p>
                  <div className="grid grid-cols-2 gap-2 pt-2 text-xs text-slate-300">
                    <span className="flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-[#CCFF00]" /> Vitrine Pessoal Própria
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-[#CCFF00]" /> Google Agenda Integrada
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-[#CCFF00]" /> Funil Kanban no Celular
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-[#CCFF00]" /> Notificações Push PWA
                    </span>
                  </div>
                </div>

                <div className="md:col-span-4 flex flex-col gap-2.5">
                  <Link
                    href="#precos"
                    className="w-full h-12 rounded-2xl bg-[#CCFF00] hover:bg-[#bbf000] text-black font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#CCFF00]/25 transition-all"
                  >
                    <span>Assinar Plano Corretor</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/v/tactus"
                    target="_blank"
                    className="w-full h-11 rounded-2xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all"
                  >
                    <Share2 className="w-3.5 h-3.5 text-[#CCFF00]" />
                    <span>Ver Vitrine Exemplo</span>
                  </Link>
                </div>
              </div>
            )}

            {/* Tab 2: Imobiliária & Gestores */}
            {activeSegment === "imobiliaria" && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-8 space-y-3">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#CCFF00]/10 text-[#CCFF00] text-[11px] font-bold border border-[#CCFF00]/20">
                    <Sparkles className="w-3.5 h-3.5" />
                    Mais Escolhido • Até 10 Corretores • Imóveis Ilimitados
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    Gestão de equipe, divisão de comissões e carteira de locações.
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Coordenador geral com controle de permissões por corretor, carteira de imóveis ilimitada, módulo completo de locações com reajustes por IGP-M/IPCA e repasses a proprietários automatizados.
                  </p>
                  <div className="grid grid-cols-2 gap-2 pt-2 text-xs text-slate-300">
                    <span className="flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-[#CCFF00]" /> Até 10 Corretores na Equipe
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-[#CCFF00]" /> Módulo de Locações & Aluguéis
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-[#CCFF00]" /> Divisão Automática de Comissões
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-[#CCFF00]" /> Relatórios de VGV Consolidado
                    </span>
                  </div>
                </div>

                <div className="md:col-span-4 flex flex-col gap-2.5">
                  <Link
                    href="#precos"
                    className="w-full h-12 rounded-2xl bg-[#CCFF00] hover:bg-[#bbf000] text-black font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#CCFF00]/25 transition-all"
                  >
                    <span>Assinar Plano Imobiliária</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/login"
                    className="w-full h-11 rounded-2xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all"
                  >
                    <Laptop className="w-3.5 h-3.5 text-[#CCFF00]" />
                    <span>Acessar Painel Demo</span>
                  </Link>
                </div>
              </div>
            )}

            {/* Tab 3: Redes & Incorporadoras */}
            {activeSegment === "enterprise" && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-8 space-y-3">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-[11px] font-bold border border-amber-500/20">
                    <Crown className="w-3.5 h-3.5" />
                    Enterprise • Multi-Filiais • Corretores e Imóveis Ilimitados
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    Escala máxima, multi-tenant e integração com portais.
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Estrutura pronta para redes de franquias, grandes imobiliárias e incorporadoras com exportação de feeds para portais (ZAP, VivaReal, OLX), assinatura eletrônica e gerente de contas dedicado.
                  </p>
                  <div className="grid grid-cols-2 gap-2 pt-2 text-xs text-slate-300">
                    <span className="flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-amber-400" /> Multi-Tenant e Multi-Filiais
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-amber-400" /> Feeds XML para Portais
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-amber-400" /> Assinatura Eletrônica
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-amber-400" /> Onboarding VIP para Equipe
                    </span>
                  </div>
                </div>

                <div className="md:col-span-4 flex flex-col gap-2.5">
                  <Link
                    href="#precos"
                    className="w-full h-12 rounded-2xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 transition-all"
                  >
                    <span>Contratar Master VIP</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <a
                    href="https://wa.me/5511987654321?text=Ol%C3%A1!%20Gostaria%20de%20falar%20sobre%20o%20Plano%20Enterprise%20do%20Tactus%20CRM."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full h-11 rounded-2xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
                    <span>Falar com Consultor</span>
                  </a>
                </div>
              </div>
            )}

          </div>
        </section>

        {/* 5. REALTIME TICKER: ATIVIDADES DA REDE DE CORRETORES */}
        <div className="w-full border-y border-white/[0.08] bg-white/[0.02] py-3.5 overflow-hidden backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-between text-xs text-white/60">
            <div className="flex items-center gap-2 text-[#CCFF00] font-bold shrink-0 pr-4 border-r border-white/10">
              <span className="w-2 h-2 rounded-full bg-[#CCFF00] animate-pulse" />
              <span className="text-[11px] font-black tracking-wider uppercase">ATIVIDADES EM TEMPO REAL NO CRM</span>
            </div>
            <div className="flex items-center gap-8 overflow-x-auto no-scrollbar whitespace-nowrap text-xs pl-4">
              <span className="flex items-center gap-1.5 text-white/80">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#CCFF00]" />
                <strong>Carlos Silveira:</strong> Proposta aceita • R$ 4.900.000 (Comissão calculada)
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 text-white/80">
                <Calendar className="w-3.5 h-3.5 text-blue-400" />
                <strong>Mariana Alencar:</strong> Visita sincronizada às 16:45 via Google Agenda
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 text-white/80">
                <Share2 className="w-3.5 h-3.5 text-purple-400" />
                <strong>Vitrine Ativa:</strong> tactus.com.br/v/carlos-silveira (18 novos leads no WhatsApp)
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 text-white/80">
                <Key className="w-3.5 h-3.5 text-[#CCFF00]" />
                <strong>Imobiliária Modelo:</strong> 3 contratos de locação reajustados pelo IGP-M
              </span>
            </div>
          </div>
        </div>

        {/* 6. A VITRINE DIGITAL DO CORRETOR (DEMONSTRAÇÃO REAL) */}
        <section id="vitrine-exemplo" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-[11px] font-bold text-[#CCFF00] mb-2">
                <Share2 className="w-3 h-3" />
                SEU LINK EXCLUSIVO NA BIO & WHATSAPP
              </div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
                Como seus clientes visualizam sua carteira de imóveis
              </h2>
              <p className="text-sm text-slate-400 mt-1 max-w-2xl">
                Chega de enviar PDFs pesados de 20MB ou links de portais onde o cliente vê anúncios dos seus concorrentes. 
                Com o Tactus CRM, você compartilha sua vitrine exclusiva (<code className="text-[#CCFF00]">tactus.com.br/v/seu-nome</code>) 
                com seu CRECI, sua foto e contato direto no seu WhatsApp.
              </p>
            </div>

            <Link
              href="/v/tactus"
              target="_blank"
              className="inline-flex items-center gap-2 h-11 px-5 rounded-full border border-white/15 bg-white/[0.04] hover:bg-white/[0.08] text-xs font-bold text-white transition-all hover:scale-102 self-start sm:self-auto"
            >
              <span>Abrir Vitrine Modelo ao Vivo</span>
              <ArrowUpRight className="w-4 h-4 text-[#CCFF00]" />
            </Link>
          </div>

          {/* Cards Demonstrativos de Imóveis da Vitrine */}
          <div className="grid gap-6 md:grid-cols-3">
            {SHOWCASE_DEMO_PROPERTIES.map((prop) => (
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

                    <p className="text-xs text-slate-400">
                      {prop.location}
                    </p>

                    {/* Specs Pills */}
                    <div className="flex items-center gap-3 pt-2 text-[11px] text-slate-300 border-t border-white/[0.06]">
                      <span>{prop.beds} quartos</span>
                      <span>•</span>
                      <span>{prop.baths} banheiros</span>
                      <span>•</span>
                      <span>{prop.parking} vagas</span>
                      <span>•</span>
                      <span>{prop.area} m²</span>
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons: Direto para o Corretor */}
                <div className="p-5 pt-0 grid grid-cols-2 gap-2">
                  <Link
                    href={`/imovel/${prop.code}`}
                    className="h-10 rounded-2xl border border-white/10 bg-white/[0.05] hover:bg-white/[0.10] text-xs font-bold text-white flex items-center justify-center transition-all"
                  >
                    Ver Ficha Completa
                  </Link>
                  <a
                    href={`https://wa.me/5511987654321?text=${encodeURIComponent(`Olá Carlos! Vi o imóvel ${prop.code} (${prop.title}) na sua Vitrine Tactus e gostaria de agendar uma visita.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-10 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md transition-all"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    Chamar Corretor
                  </a>
                </div>

              </div>
            ))}
          </div>
        </section>

        {/* 7. QUADRO COMPARATIVO: TACTUS CRM vs. PORTAIS TRADICIONAIS vs. PLANILHAS */}
        <section id="comparativo" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-[11px] font-bold text-[#CCFF00]">
              <Layers className="w-3.5 h-3.5" />
              POR QUE MUDAR PARA O TACTUS CRM?
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              Feito para o corretor ganhar dinheiro, não o portal.
            </h2>
            <p className="text-sm text-slate-400">
              Veja por que corretores autônomos e imobiliárias de alta performance estão trocando portais caros e planilhas desorganizadas pelo Tactus CRM.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3 items-stretch">
            
            {/* Coluna 1: Portais Tradicionais (ZAP / VivaReal) */}
            <div className="rounded-3xl border border-red-500/20 bg-red-500/[0.03] backdrop-blur-xl p-7 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-red-400 text-xs font-bold uppercase tracking-wider">
                  <AlertTriangle className="w-4 h-4" />
                  Portais de Anúncios (ZAP / VivaReal)
                </div>
                <h3 className="text-xl font-bold text-white">Custos abusivos e concorrência desleal</h3>
                <ul className="space-y-3 text-xs text-slate-400">
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 font-bold shrink-0">✕</span>
                    <span>Cobram mensalidades caras por anúncio ou pacote de destaque.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 font-bold shrink-0">✕</span>
                    <span>Mostram imóveis de outros corretores e imobiliárias na mesma página do seu anúncio.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 font-bold shrink-0">✕</span>
                    <span>O cliente e o lead pertencem ao portal, não à sua carteira.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 font-bold shrink-0">✕</span>
                    <span>Zero ferramentas de gestão, sem Google Agenda e sem funil de vendas.</span>
                  </li>
                </ul>
              </div>
              <div className="p-3 rounded-2xl bg-red-500/10 text-red-300 text-[11px] font-medium border border-red-500/20">
                Resultado: Alto custo mensal e perda constante de clientes para a concorrência.
              </div>
            </div>

            {/* Coluna 2: Planilhas do Excel & WhatsApp Solto */}
            <div className="rounded-3xl border border-amber-500/20 bg-amber-500/[0.03] backdrop-blur-xl p-7 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                  <FileSpreadsheet className="w-4 h-4" />
                  Planilhas do Excel & WhatsApp
                </div>
                <h3 className="text-xl font-bold text-white">Desorganização e perda de negócios</h3>
                <ul className="space-y-3 text-xs text-slate-400">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold shrink-0">✕</span>
                    <span>Leads esquecidos no WhatsApp sem histórico ou temperatura de compra.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold shrink-0">✕</span>
                    <span>Visitas marcadas de cabeça, gerando choques de horário e atrasos.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold shrink-0">✕</span>
                    <span>Envio de fotos soltas e PDFs pesados que travam o celular do cliente.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold shrink-0">✕</span>
                    <span>Controle manual e propenso a erros de comissões e reajustes de aluguel.</span>
                  </li>
                </ul>
              </div>
              <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-300 text-[11px] font-medium border border-amber-500/20">
                Resultado: Imagem amadora e dezenas de horas perdidas em tarefas manuais.
              </div>
            </div>

            {/* Coluna 3: TACTUS CRM IMOBILIÁRIO (DESTAQUE) */}
            <div className="rounded-3xl border-2 border-[#CCFF00] bg-[#CCFF00]/[0.06] backdrop-blur-2xl p-7 flex flex-col justify-between space-y-6 shadow-2xl shadow-[#CCFF00]/15 relative">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                <span className="rounded-full bg-[#CCFF00] text-black px-4 py-1 text-[10px] font-black tracking-wider uppercase shadow-md">
                  SOLUÇÃO DEFINITIVA
                </span>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-[#CCFF00] text-xs font-black uppercase tracking-wider">
                  <Zap className="w-4 h-4" />
                  Tactus CRM & Vitrines
                </div>
                <h3 className="text-xl font-black text-white">Domínio total da sua carteira e clientes</h3>
                <ul className="space-y-3 text-xs text-slate-200">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#CCFF00] shrink-0 font-bold mt-0.5" />
                    <span><strong>Vitrine 100% sua:</strong> o cliente navega apenas nos seus imóveis e fala direto com você.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#CCFF00] shrink-0 font-bold mt-0.5" />
                    <span><strong>Google Agenda Integrada:</strong> agende visitas com 1 toque no celular sem conflitos de horário.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#CCFF00] shrink-0 font-bold mt-0.5" />
                    <span><strong>Funil Kanban de Vendas:</strong> saiba exatamente quais clientes estão prontos para proposta.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#CCFF00] shrink-0 font-bold mt-0.5" />
                    <span><strong>Gestão de Aluguéis & Comissões:</strong> reajustes automáticos (IGP-M/IPCA) e cálculo exato de honorários.</span>
                  </li>
                </ul>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#CCFF00] text-black text-xs font-black text-center">
                Multiplique seus fechamentos a partir de R$ 69/mês.
              </div>
            </div>

          </div>
        </section>

        {/* 8. RECURSOS DO TACTUS CRM: DESIGN APPLE PRIME & EFICIÊNCIA */}
        <section id="recursos" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto space-y-2 mb-12">
            <span className="text-xs font-bold text-[#CCFF00] uppercase tracking-widest">
              TECNOLOGIA DE PONTA PARA CORRETORES & GESTORES
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              Tudo o que você precisa para dominar o seu mercado.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3 items-stretch">
            
            {/* Card 01 - Vitrines Digitais */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-7 flex flex-col justify-between space-y-4 hover:border-white/20 transition-all">
              <div className="space-y-3">
                <span className="text-xl font-mono font-bold text-slate-500">01.</span>
                <h3 className="text-xl font-bold text-white">Vitrines Públicas Exclusivas</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Gere com um único clique o link oficial da sua carteira (ex: <code>/v/seu-nome</code>) com foto de perfil, CRECI e botão direto de WhatsApp para enviar aos clientes ou colocar na sua bio do Instagram.
                </p>
              </div>
              <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs font-bold text-white">
                <Link href="/v/tactus" target="_blank" className="hover:text-[#CCFF00] transition-colors">
                  Conhecer Vitrine Modelo
                </Link>
                <ArrowUpRight className="h-4 w-4 text-[#CCFF00]" />
              </div>
            </div>

            {/* Card 02 - Google Agenda */}
            <div className="rounded-3xl bg-[#CCFF00] text-black p-7 flex flex-col justify-between space-y-4 shadow-2xl shadow-[#CCFF00]/20 transform md:-translate-y-2 transition-transform">
              <div className="space-y-3">
                <span className="text-xl font-mono font-black text-black/60">02.</span>
                <h3 className="text-xl font-black text-black">Google Agenda Integrada em 1 Clique</h3>
                <p className="text-xs text-black/80 font-medium leading-relaxed">
                  Ao agendar uma visita ou vistoria no CRM, envie o evento direto para o Google Agenda do seu celular e do cliente com localização no Google Maps e lembrete automático.
                </p>
              </div>
              <div className="pt-4 border-t border-black/15 flex items-center justify-between text-xs font-black text-black">
                <Link href="/dashboard" className="hover:underline">
                  Ver no Dashboard
                </Link>
                <ArrowRight className="h-4 w-4" />
              </div>
            </div>

            {/* Card 03 - Funil Kanban & Locações */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-7 flex flex-col justify-between space-y-4 hover:border-white/20 transition-all">
              <div className="space-y-3">
                <span className="text-xl font-mono font-bold text-slate-500">03.</span>
                <h3 className="text-xl font-bold text-white">Funil Kanban & Gestão de Locações</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Classifique leads por temperatura (Quente, Morno, Frio), controle contratos de aluguel com reajustes por IGP-M/IPCA e calcule a divisão de comissões da equipe sem erros manuais.
                </p>
              </div>
              <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs font-bold text-white">
                <Link href="/dashboard/pipeline" className="hover:text-[#CCFF00] transition-colors">
                  Ver Funil de Vendas
                </Link>
                <ArrowUpRight className="h-4 w-4 text-[#CCFF00]" />
              </div>
            </div>

          </div>
        </section>

        {/* 9. DEPOIMENTOS DE CORRETORES & GESTORES */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto space-y-2 mb-12">
            <span className="text-xs font-bold text-[#CCFF00] uppercase tracking-widest">
              QUEM USA, APROVA E RECOMENDA
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              Resultados reais na rotina imobiliária.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 space-y-4 backdrop-blur-xl">
              <div className="flex items-center gap-1 text-[#CCFF00]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#CCFF00]" />
                ))}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed italic">
                &ldquo;Depois que passei a mandar o link da minha vitrine no WhatsApp em vez de PDFs pesados, minha taxa de resposta triplicou. Os clientes elogiam a facilidade e fechei 2 vendas só este mês.&rdquo;
              </p>
              <div className="pt-2 border-t border-white/[0.08] flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-amber-500 font-bold text-xs flex items-center justify-center text-black">
                  CS
                </div>
                <div>
                  <span className="text-xs font-bold text-white block">Carlos Silveira</span>
                  <span className="text-[10px] text-slate-400">Corretor de Alto Padrão • CRECI 48.912</span>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 space-y-4 backdrop-blur-xl">
              <div className="flex items-center gap-1 text-[#CCFF00]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#CCFF00]" />
                ))}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed italic">
                &ldquo;A sincronização com a Google Agenda e a gestão de locações com reajustes automáticos economizaram mais de 15 horas da minha equipe por semana. Não troco o Tactus por nada.&rdquo;
              </p>
              <div className="pt-2 border-t border-white/[0.08] flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-blue-500 font-bold text-xs flex items-center justify-center text-white">
                  MA
                </div>
                <div>
                  <span className="text-xs font-bold text-white block">Mariana Alencar</span>
                  <span className="text-[10px] text-slate-400">Sócia-Diretora • Alencar Imóveis</span>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 space-y-4 backdrop-blur-xl">
              <div className="flex items-center gap-1 text-[#CCFF00]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#CCFF00]" />
                ))}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed italic">
                &ldquo;O cálculo automático de divisão de comissões e o funil kanban acabaram de vez com conflitos internos entre os corretores. A plataforma é elegante, rápida e muito profissional.&rdquo;
              </p>
              <div className="pt-2 border-t border-white/[0.08] flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-emerald-500 font-bold text-xs flex items-center justify-center text-black">
                  RM
                </div>
                <div>
                  <span className="text-xs font-bold text-white block">Roberto Mendes</span>
                  <span className="text-[10px] text-slate-400">Gestor Comercial • Rede Prime</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 10. PRICING & SUBSCRIPTION SECTION - Apple Prime Glass */}
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
              Do corretor autônomo independente às imobiliárias e redes. Ativação imediata, sem taxa de implantação e sem fidelidade obrigatória.
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

      {/* CHECKOUT MODAL TRANSPARENTE */}
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
                    Investimento de R$ {annualBilling ? selectedPlan.priceAnnual : selectedPlan.priceMonthly} {selectedPlan.period}. Sem taxa de implantação.
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
                      <label className="font-semibold text-slate-300 block mb-1">E-mail Corporativo</label>
                      <input
                        type="email"
                        required
                        placeholder="seu@imobiliaria.com"
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

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-semibold text-slate-300 block mb-1">CRECI (PF ou PJ)</label>
                      <input
                        type="text"
                        placeholder="Ex: 48.912-F"
                        value={formData.creci}
                        onChange={(e) => setFormData({ ...formData, creci: e.target.value })}
                        className="w-full h-10 px-3.5 rounded-2xl bg-white/[0.05] border border-white/10 text-white focus:outline-none focus:border-[#CCFF00]"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-slate-300 block mb-1">CPF ou CNPJ</label>
                      <input
                        type="text"
                        placeholder="000.000.000-00"
                        value={formData.cpfCnpj}
                        onChange={(e) => setFormData({ ...formData, cpfCnpj: e.target.value })}
                        className="w-full h-10 px-3.5 rounded-2xl bg-white/[0.05] border border-white/10 text-white focus:outline-none focus:border-[#CCFF00]"
                      />
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 rounded-2xl bg-[#CCFF00] hover:bg-[#bbf000] text-black font-extrabold text-xs shadow-lg transition-all"
                >
                  Confirmar e Ativar Minha Conta no Tactus CRM
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

      {/* 11. Global Footer B2B */}
      <footer className="border-t border-white/[0.08] py-8 text-center text-xs text-slate-500 relative z-10">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <TactusLogo variant="verde" className="h-7 w-auto" />
            <p>© {new Date().getFullYear()} Tactus CRM. Plataforma de Gestão e Vendas para Corretores e Imobiliárias.</p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="#recursos" className="hover:text-slate-300">Recursos do CRM</Link>
            <Link href="#comparativo" className="hover:text-slate-300">Por que o Tactus?</Link>
            <Link href="#precos" className="hover:text-slate-300">Planos & Preços</Link>
            <Link href="/v/tactus" target="_blank" className="hover:text-slate-300">Vitrine Modelo</Link>
            <Link href="/login" className="hover:text-slate-300 font-bold text-[#CCFF00]">Acessar o CRM</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
