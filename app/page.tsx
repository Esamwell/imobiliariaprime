"use client"

import { useState } from "react"
import Link from "next/link"
import { TactusLogo } from "@/components/tactus-logo"
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
  BadgePercent
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

export default function CRMLandingPage() {
  const [annualBilling, setAnnualBilling] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<PlanDetail | null>(null)
  const [checkoutStep, setCheckoutStep] = useState<"form" | "success">("form")
  const [clientType, setClientType] = useState<"PF" | "PJ">("PF")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    document: "",
    paymentMethod: "pix" as "pix" | "credit_card" | "boleto"
  })

  const openCheckout = (plan: PlanDetail) => {
    setSelectedPlan(plan)
    setClientType(plan.id === "autonomo" ? "PF" : "PJ")
    setCheckoutStep("form")
  }

  const handleCompleteSubscription = (e: React.FormEvent) => {
    e.preventDefault()
    setCheckoutStep("success")
  }

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col justify-between selection:bg-lime-400 selection:text-black">
      {/* 1. Header do CRM - Apple Prime Glass Capsule */}
      <header className="sticky top-0 z-40 bg-[#07090e]/85 backdrop-blur-xl border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="h-10 w-10 rounded-2xl bg-white/[0.06] border border-white/10 p-1.5 flex items-center justify-center backdrop-blur-xl shadow-sm transition-transform group-hover:scale-105">
              <TactusLogo variant="verde" size="sm" className="h-full w-full" />
            </div>
            <div>
              <span className="font-extrabold text-base tracking-tight block text-white leading-none">
                TACTUS<span className="text-lime-400">.</span> CRM
              </span>
              <span className="text-[9px] font-semibold text-lime-400 uppercase tracking-widest block mt-0.5">
                Portal do Corretor & Gestor
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-400">
            <Link href="#recursos" className="hover:text-white transition-colors">
              Recursos
            </Link>
            <Link href="#precos" className="hover:text-white transition-colors text-lime-400">
              Planos & Preços
            </Link>
            <Link href="#vitrine" className="hover:text-white transition-colors">
              Vitrine Pública
            </Link>
            <Link href="#seguranca" className="hover:text-white transition-colors">
              Segurança
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="#precos"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white transition-colors glass-pill px-3.5 py-1.5"
            >
              <Zap className="h-3.5 w-3.5 text-lime-400" />
              Ver Planos
            </Link>

            <Link
              href="/v/tactus"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white transition-colors glass-pill px-3.5 py-1.5"
            >
              <Share2 className="h-3.5 w-3.5 text-lime-400" />
              Vitrine Exemplo
            </Link>

            {/* Apple Electric Lime Button */}
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 h-9 px-4 rounded-full bg-lime-400 hover:bg-lime-300 text-black font-extrabold text-xs shadow-lg shadow-lime-400/20 transition-all hover:scale-105"
            >
              <span>Acessar Painel</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* 2. Hero Section */}
      <main className="flex-1">
        <section className="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden text-center">
          {/* Background Grid Pattern & Ambient Glow */}
          <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#ccff00_1px,transparent_1px)] [background-size:28px_28px]"></div>
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-lime-400/10 blur-[130px] rounded-full pointer-events-none"></div>

          <div className="max-w-4xl mx-auto relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/[0.05] border border-white/10 px-4 py-1.5 text-[11px] font-bold text-lime-400 backdrop-blur-md">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-lime-500"></span>
              </span>
              Tactus CRM • O CRM Mais Inteligente para o Mercado Imobiliário
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.08] text-white">
              Tactus CRM Imobiliário <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-300 via-white to-slate-300">
                para fechar mais negócios.
              </span>
            </h1>

            <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-400 font-normal leading-relaxed">
              Centralize sua carteira de imóveis, gerencie leads com pontuação de temperatura, automatize aluguéis e gere uma vitrine pública exclusiva para compartilhar com seus clientes no WhatsApp.
            </p>

            {/* Realtime Users Capsule */}
            <div className="flex items-center justify-center gap-3 pt-2">
              <div className="flex -space-x-2">
                <div className="h-8 w-8 rounded-full bg-amber-500 border-2 border-[#07090e] text-white text-[10px] font-bold flex items-center justify-center">
                  CS
                </div>
                <div className="h-8 w-8 rounded-full bg-blue-500 border-2 border-[#07090e] text-white text-[10px] font-bold flex items-center justify-center">
                  RV
                </div>
                <div className="h-8 w-8 rounded-full bg-purple-500 border-2 border-[#07090e] text-white text-[10px] font-bold flex items-center justify-center">
                  MD
                </div>
                <div className="h-8 w-8 rounded-full bg-emerald-500 border-2 border-[#07090e] text-white text-[10px] font-bold flex items-center justify-center">
                  FG
                </div>
              </div>
              <div className="text-left text-xs">
                <span className="font-extrabold text-white block">15.000+ Corretores & Imobiliárias</span>
                <span className="text-slate-400 text-[10px]">Utilizando o ecossistema Tactus em todo o Brasil</span>
              </div>
            </div>

            {/* CTAs - Apple Style Pills */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <Link
                href="#precos"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-12 px-8 rounded-full bg-lime-400 hover:bg-lime-300 text-black font-extrabold text-xs shadow-xl shadow-lime-400/25 transition-all hover:scale-105"
              >
                <span>Conhecer Planos & Assinar</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/login"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-white border border-white/10 font-bold text-xs backdrop-blur-md transition-all hover:scale-102"
              >
                <span>Acessar Painel Tactus</span>
                <ArrowUpRight className="h-4 w-4 text-lime-400" />
              </Link>
            </div>
          </div>
        </section>

        {/* 3. Feature Steps 01, 02, 03 */}
        <section id="recursos" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto space-y-2 mb-12">
            <span className="text-xs font-bold text-lime-400 uppercase tracking-widest">
              Design Tactus Prime & Eficiência
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              Seu parceiro de confiança para fechar mais negócios.
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
                <Link href="/dashboard/imoveis" className="hover:text-lime-400 transition-colors">
                  Ver no Sistema
                </Link>
                <ArrowUpRight className="h-4 w-4 text-lime-400" />
              </div>
            </div>

            {/* Card 02 - Electric Lime Highlight */}
            <div className="rounded-3xl bg-lime-400 text-black p-7 flex flex-col justify-between space-y-4 shadow-2xl shadow-lime-400/20 transform md:-translate-y-2 transition-transform">
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
                  Funil Kanban interativo com etiquetas de temperatura, gestão de contratos de locação com reajustes por IGP-M/IPCA e divisão automatizada de comissões.
                </p>
              </div>
              <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs font-bold text-white">
                <Link href="/dashboard" className="hover:text-lime-400 transition-colors">
                  Ver no Sistema
                </Link>
                <ArrowUpRight className="h-4 w-4 text-lime-400" />
              </div>
            </div>
          </div>
        </section>

        {/* 4. PRICING & SUBSCRIPTION SECTION - Apple Prime Glass */}
        <section id="precos" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-lime-400/5 blur-[150px] rounded-full pointer-events-none"></div>

          <div className="text-center max-w-2xl mx-auto space-y-3 mb-10 relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/[0.05] border border-white/10 px-4 py-1 text-[11px] font-bold text-lime-400 backdrop-blur-md">
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
                      ? "bg-lime-400 text-black shadow-md scale-102 font-extrabold"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <span>Cobrança Anual</span>
                  <span className="rounded-full bg-black/20 text-black dark:text-black px-2 py-0.5 text-[10px] font-black uppercase">
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
                      ? "bg-lime-400 text-black shadow-2xl shadow-lime-400/25 ring-2 ring-lime-300 lg:-translate-y-3"
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
                          isLime ? "text-black/80 font-medium" : "text-slate-400"
                        }`}
                      >
                        {plan.description}
                      </p>
                    </div>

                    {/* Price */}
                    <div className="pt-2 pb-1 border-b border-black/10 dark:border-white/10">
                      <div className="flex items-baseline gap-1">
                        <span className="text-sm font-bold">R$</span>
                        <span
                          className={`text-5xl font-black tracking-tight ${
                            isLime ? "text-black" : "text-white"
                          }`}
                        >
                          {price}
                        </span>
                        <span
                          className={`text-xs font-semibold ${
                            isLime ? "text-black/70" : "text-slate-400"
                          }`}
                        >
                          {plan.period}
                        </span>
                      </div>
                      <span
                        className={`text-[11px] block mt-1 font-semibold ${
                          isLime ? "text-black/75" : "text-emerald-400"
                        }`}
                      >
                        {annualBilling
                          ? `Faturado anualmente em R$ ${price * 12}/ano`
                          : "Faturamento mensal sem carência"}
                      </span>
                    </div>

                    {/* Limits Capsules */}
                    <div className="space-y-2">
                      <div
                        className={`flex items-center gap-2 rounded-2xl px-3.5 py-2 text-xs font-bold ${
                          isLime
                            ? "bg-black/10 text-black"
                            : isGold
                            ? "bg-amber-500/10 text-amber-300 border border-amber-500/20"
                            : "bg-white/[0.05] text-slate-200 border border-white/10"
                        }`}
                      >
                        <Users className="h-4 w-4 shrink-0" />
                        <span>{plan.brokerLimit}</span>
                      </div>
                      <div
                        className={`flex items-center gap-2 rounded-2xl px-3.5 py-2 text-xs font-bold ${
                          isLime
                            ? "bg-black/10 text-black"
                            : isGold
                            ? "bg-amber-500/10 text-amber-300 border border-amber-500/20"
                            : "bg-white/[0.05] text-slate-200 border border-white/10"
                        }`}
                      >
                        <Building className="h-4 w-4 shrink-0" />
                        <span>{plan.propertiesLimit}</span>
                      </div>
                    </div>

                    {/* Features List */}
                    <div className="space-y-2.5 pt-2">
                      <span
                        className={`text-[10px] font-black uppercase tracking-wider block ${
                          isLime ? "text-black/70" : "text-slate-400"
                        }`}
                      >
                        Recursos Inclusos:
                      </span>
                      <ul className="space-y-2 text-xs">
                        {plan.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2.5">
                            <div
                              className={`h-4 w-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                                isLime
                                  ? "bg-black text-white"
                                  : isGold
                                  ? "bg-amber-500 text-black font-bold"
                                  : "bg-lime-400/20 text-lime-400"
                              }`}
                            >
                              <Check className="h-2.5 w-2.5 stroke-[3]" />
                            </div>
                            <span
                              className={`leading-tight ${
                                isLime ? "text-black/90 font-medium" : "text-slate-300"
                              }`}
                            >
                              {feature}
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
                      onClick={() => openCheckout(plan)}
                      className={`w-full py-3.5 px-6 rounded-full font-black text-xs transition-all duration-200 flex items-center justify-center gap-2 shadow-lg ${
                        isLime
                          ? "bg-black text-white hover:bg-slate-900 hover:scale-102"
                          : isGold
                          ? "bg-amber-500 text-black hover:bg-amber-400 hover:scale-102 font-extrabold shadow-amber-500/20"
                          : "bg-white text-black hover:bg-slate-200 hover:scale-102 shadow-white/10"
                      }`}
                    >
                      <span>{plan.ctaText}</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                    <span
                      className={`block text-center text-[10px] mt-2.5 ${
                        isLime ? "text-black/60" : "text-slate-500"
                      }`}
                    >
                      Garantia incondicional de 7 dias
                    </span>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Trust Guarantees Strip */}
          <div className="mt-14 pt-10 border-t border-white/[0.08] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center lg:text-left relative z-10">
            <div className="flex items-center gap-3 justify-center lg:justify-start">
              <div className="h-10 w-10 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-lime-400">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div className="text-left text-xs">
                <span className="font-bold text-white block">7 Dias Sem Risco</span>
                <span className="text-slate-400 text-[11px]">Devolução 100% garantida</span>
              </div>
            </div>

            <div className="flex items-center gap-3 justify-center lg:justify-start">
              <div className="h-10 w-10 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-lime-400">
                <CreditCard className="h-5 w-5" />
              </div>
              <div className="text-left text-xs">
                <span className="font-bold text-white block">Pix, Cartão ou Boleto</span>
                <span className="text-slate-400 text-[11px]">Liberação imediata no Pix</span>
              </div>
            </div>

            <div className="flex items-center gap-3 justify-center lg:justify-start">
              <div className="h-10 w-10 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-lime-400">
                <Lock className="h-5 w-5" />
              </div>
              <div className="text-left text-xs">
                <span className="font-bold text-white block">Sem Fidelidade</span>
                <span className="text-slate-400 text-[11px]">Cancele quando quiser</span>
              </div>
            </div>

            <div className="flex items-center gap-3 justify-center lg:justify-start">
              <div className="h-10 w-10 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-lime-400">
                <Zap className="h-5 w-5" />
              </div>
              <div className="text-left text-xs">
                <span className="font-bold text-white block">Ativação Imediata</span>
                <span className="text-slate-400 text-[11px]">Acesso ao Tactus CRM em 2 minutos</span>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Stats & Social Proof */}
        <section className="py-16 border-t border-white/[0.08] bg-white/[0.01] px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">R$ 4.2B+</div>
              <p className="text-xs text-slate-400">Em VGV Gerenciado no Tactus</p>
            </div>
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-lime-400 tracking-tight">450.000+</div>
              <p className="text-xs text-slate-400">Imóveis Ativos e Divulgados</p>
            </div>
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">99.8%</div>
              <p className="text-xs text-slate-400">Disponibilidade e Segurança em Nuvem</p>
            </div>
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-lime-400 tracking-tight">3 Minutos</div>
              <p className="text-xs text-slate-400">Para Configurar e Começar a Vender</p>
            </div>
          </div>
        </section>
      </main>

      {/* 6. Checkout / Subscription Modal */}
      {selectedPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-[#0c0f17] p-6 sm:p-8 shadow-2xl text-slate-100 relative">
            <button
              onClick={() => setSelectedPlan(null)}
              className="absolute top-5 right-5 h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>

            {checkoutStep === "form" ? (
              <form onSubmit={handleCompleteSubscription} className="space-y-4">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-lime-400/20 text-lime-400 px-3 py-0.5 text-[10px] font-black uppercase">
                    Assinatura Tactus Imediata
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    {selectedPlan.name}
                  </h3>
                  <p className="text-xs text-slate-400">
                    Investimento de{" "}
                    <strong className="text-white">
                      R$ {annualBilling ? selectedPlan.priceAnnual : selectedPlan.priceMonthly}
                    </strong>{" "}
                    {selectedPlan.period} ({annualBilling ? "Ciclo Anual com -20% OFF" : "Ciclo Mensal"})
                  </p>
                </div>

                {/* Tipo de Assinante */}
                <div className="space-y-1 pt-1">
                  <label className="text-xs font-semibold text-slate-300">Tipo de Contratação</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setClientType("PF")}
                      className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                        clientType === "PF"
                          ? "border-lime-400 bg-lime-400/10 text-lime-300"
                          : "border-white/10 bg-white/[0.02] text-slate-400 hover:bg-white/[0.05]"
                      }`}
                    >
                      Pessoa Física (Corretor / CRECI)
                    </button>
                    <button
                      type="button"
                      onClick={() => setClientType("PJ")}
                      className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                        clientType === "PJ"
                          ? "border-lime-400 bg-lime-400/10 text-lime-300"
                          : "border-white/10 bg-white/[0.02] text-slate-400 hover:bg-white/[0.05]"
                      }`}
                    >
                      Pessoa Jurídica (Imobiliária / CNPJ)
                    </button>
                  </div>
                </div>

                {/* Campos */}
                <div className="space-y-3 pt-1">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">
                      {clientType === "PJ" ? "Razão Social ou Nome Fantasia" : "Seu Nome Completo"}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={clientType === "PJ" ? "Ex: Tactus Imóveis & Consultoria Ltda" : "Ex: Carlos Eduardo Silveira"}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full h-10 rounded-xl border border-white/10 bg-white/[0.04] px-3 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-lime-400"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-300">E-mail de Acesso</label>
                      <input
                        type="email"
                        required
                        placeholder="seu@email.com.br"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full h-10 rounded-xl border border-white/10 bg-white/[0.04] px-3 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-lime-400"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-300">WhatsApp (com DDD)</label>
                      <input
                        type="tel"
                        required
                        placeholder="(11) 98765-4321"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full h-10 rounded-xl border border-white/10 bg-white/[0.04] px-3 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-lime-400"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">
                      {clientType === "PJ" ? "CNPJ da Imobiliária" : "CPF ou Número do CRECI"}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={clientType === "PJ" ? "00.000.000/0001-00" : "000.000.000-00 ou CRECI 12345"}
                      value={formData.document}
                      onChange={(e) => setFormData({ ...formData, document: e.target.value })}
                      className="w-full h-10 rounded-xl border border-white/10 bg-white/[0.04] px-3 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-lime-400"
                    />
                  </div>
                </div>

                {/* Forma de Pagamento */}
                <div className="space-y-1.5 pt-2">
                  <label className="text-xs font-semibold text-slate-300">Forma de Pagamento</label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, paymentMethod: "pix" })}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        formData.paymentMethod === "pix"
                          ? "border-lime-400 bg-lime-400/10 text-lime-300 font-bold"
                          : "border-white/10 bg-white/[0.02] text-slate-400 hover:bg-white/[0.05]"
                      }`}
                    >
                      <QrCode className="h-4 w-4 mx-auto mb-1" />
                      <span className="text-[11px] block">Pix Instantâneo</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, paymentMethod: "credit_card" })}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        formData.paymentMethod === "credit_card"
                          ? "border-lime-400 bg-lime-400/10 text-lime-300 font-bold"
                          : "border-white/10 bg-white/[0.02] text-slate-400 hover:bg-white/[0.05]"
                      }`}
                    >
                      <CreditCard className="h-4 w-4 mx-auto mb-1" />
                      <span className="text-[11px] block">Cartão de Crédito</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, paymentMethod: "boleto" })}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        formData.paymentMethod === "boleto"
                          ? "border-lime-400 bg-lime-400/10 text-lime-300 font-bold"
                          : "border-white/10 bg-white/[0.02] text-slate-400 hover:bg-white/[0.05]"
                      }`}
                    >
                      <FileCheck2 className="h-4 w-4 mx-auto mb-1" />
                      <span className="text-[11px] block">Boleto Bancário</span>
                    </button>
                  </div>
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    className="w-full h-11 rounded-full bg-lime-400 hover:bg-lime-300 text-black font-extrabold text-xs shadow-xl shadow-lime-400/25 transition-all flex items-center justify-center gap-2"
                  >
                    <span>Finalizar e Liberar Acesso ao Tactus CRM</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <p className="text-[10px] text-center text-slate-500 mt-2">
                    🔒 Ambiente criptografado SSL 256 bits. Cancelamento a qualquer momento.
                  </p>
                </div>
              </form>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="h-16 w-16 rounded-full bg-lime-400/20 text-lime-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="h-10 w-10" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white">Assinatura Solicitada com Sucesso!</h3>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto mt-2 leading-relaxed">
                    Parabéns, <strong className="text-white">{formData.name}</strong>! Sua solicitação para o plano{" "}
                    <strong className="text-lime-400">{selectedPlan.name}</strong> foi registrada. Enviamos os dados de ativação e o código de acesso para seu WhatsApp e e-mail.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 text-left text-xs space-y-1.5 max-w-sm mx-auto">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Plano Selecionado:</span>
                    <span className="font-bold text-white">{selectedPlan.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Valor:</span>
                    <span className="font-bold text-lime-400">
                      R$ {annualBilling ? selectedPlan.priceAnnual : selectedPlan.priceMonthly}/mês
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Forma de Pagamento:</span>
                    <span className="font-bold text-white uppercase">{formData.paymentMethod}</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-2 justify-center">
                  <Link
                    href="/dashboard"
                    className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-full bg-lime-400 hover:bg-lime-300 text-black font-extrabold text-xs shadow-lg transition-all"
                  >
                    <span>Entrar no Tactus CRM Agora</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => setSelectedPlan(null)}
                    className="inline-flex items-center justify-center h-11 px-6 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-white text-xs font-bold transition-all"
                  >
                    Fechar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 7. Footer */}
      <footer className="border-t border-white/[0.08] py-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <TactusLogo variant="branco" size="xs" />
            <p>© {new Date().getFullYear()} Tactus CRM Imobiliário. Todos os direitos reservados.</p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="#precos" className="hover:text-slate-300">Planos & Assinaturas</Link>
            <Link href="/v/tactus" className="hover:text-slate-300">Vitrine Exemplo</Link>
            <Link href="/login" className="hover:text-slate-300 font-bold text-lime-400">Acessar o Tactus CRM</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
