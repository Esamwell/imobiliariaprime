"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { TactusLogo } from "@/components/tactus-logo"
import { 
  Lock, 
  Mail, 
  ArrowRight, 
  ShieldCheck, 
  AlertCircle, 
  Loader2, 
  Eye, 
  EyeOff, 
  Sparkles, 
  ArrowLeft,
  Calendar,
  CheckCircle2,
  TrendingUp,
  Share2,
  Key,
  Shield,
  Smartphone,
  Building,
  User,
  Users
} from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<"quick" | "credentials">("quick")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)
  const [loading, setLoading] = useState(false)
  const [activeQuickUser, setActiveQuickUser] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async (e?: React.FormEvent, customEmail?: string, customPass?: string, userKey?: string) => {
    if (e) e.preventDefault()
    setError(null)
    setLoading(true)
    if (userKey) setActiveQuickUser(userKey)

    const finalEmail = customEmail || email
    const finalPass = customPass || password

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: finalEmail, password: finalPass }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Falha na autenticação. Verifique os dados.")
      }

      if (data.user?.role === "SUPER_ADMIN") {
        router.push("/super-admin")
      } else {
        router.push("/dashboard")
      }
      router.refresh()
    } catch (err: any) {
      setError(err.message || "Erro ao conectar com o servidor.")
      setActiveQuickUser(null)
    } finally {
      setLoading(false)
    }
  }

  const handleQuickLogin = (demoEmail: string, demoPass: string, userKey: string) => {
    setEmail(demoEmail)
    setPassword(demoPass)
    handleLogin(undefined, demoEmail, demoPass, userKey)
  }

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between bg-[#080A0F] text-white selection:bg-[#CCFF00] selection:text-black overflow-x-hidden font-sans">
      
      {/* Background Ambient Lighting (Luxury High-End Glows) */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        {/* Subtle top indigo aura */}
        <div className="absolute -top-32 left-1/4 w-[650px] h-[500px] bg-indigo-700/15 blur-[160px] rounded-full" />
        {/* Signature Tactus Lime glow on right */}
        <div className="absolute top-1/3 -right-24 w-[500px] h-[500px] bg-[#CCFF00]/10 blur-[180px] rounded-full" />
        {/* Bottom teal-emerald accent */}
        <div className="absolute -bottom-36 left-12 w-[550px] h-[450px] bg-emerald-600/10 blur-[160px] rounded-full" />
        
        {/* Modern dot matrix blueprint pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:24px_24px] opacity-60" />
      </div>

      {/* Top Header Navigation */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 py-4 sm:py-6 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-white/70 hover:text-white transition-all px-4 py-2 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-xl hover:bg-white/[0.08] hover:border-white/20"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Voltar ao Site Oficial</span>
        </Link>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-[#0E121E]/80 backdrop-blur-md text-[11px] text-white/70 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#CCFF00] animate-pulse" />
            <span className="font-medium">Tactus Cloud • Alta Disponibilidade</span>
          </div>
          <div className="px-3 py-1.5 rounded-full border border-[#CCFF00]/30 bg-[#CCFF00]/10 text-[11px] font-black uppercase tracking-wider text-[#CCFF00]">
            Portal Oficial
          </div>
        </div>
      </header>

      {/* Main Workspace (Side-by-Side on Desktop, Centered on Tablet/Mobile) */}
      <main className="relative z-10 flex-1 w-full max-w-7xl mx-auto px-4 sm:px-8 py-6 flex items-center justify-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT COLUMN: Visual Brand Showcase & Value Proposition (Desktop) */}
          <div className="hidden lg:flex lg:col-span-7 flex-col space-y-6 pr-2 xl:pr-6">
            
            {/* Header com Logo Oficial Destacada */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#CCFF00]/30 bg-[#CCFF00]/10 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-[#CCFF00]" />
                <span className="text-[10px] font-black uppercase tracking-widest text-[#CCFF00]">
                  SISTEMA IMOBILIÁRIO PRIME
                </span>
              </div>

              <div className="pt-1">
                <Link href="/" className="inline-block transition-transform hover:scale-102" title="Tactus CRM Imobiliário">
                  <TactusLogo variant="verde" className="h-20 xl:h-24 w-auto" priority />
                </Link>
                <h1 className="text-xl xl:text-2xl font-black text-white tracking-tight mt-3">
                  Tecnologia Prime para Gestores & Corretores
                </h1>
                <p className="text-xs xl:text-sm text-white/60 max-w-lg leading-relaxed mt-2 font-medium">
                  A plataforma mais sofisticada do mercado imobiliário: controle de equipe, gestão de funil com etiquetas de temperatura, vitrines públicas exclusivas e integração Google Agenda.
                </p>
              </div>
            </div>

            {/* 3 Refined Obsidian Feature Cards (Never washed-out grey!) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
              
              {/* Card 1: VGV Fechado no Mês */}
              <div className="rounded-2xl border border-white/[0.12] bg-[#0E121E]/90 p-4 space-y-2.5 backdrop-blur-xl shadow-lg relative overflow-hidden group hover:border-[#CCFF00]/40 transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-white/50 flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-[#CCFF00]" />
                    VGV Fechado (Mês)
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#CCFF00]/15 text-[#CCFF00] text-[10px] font-black">
                    +18.4%
                  </span>
                </div>
                <div>
                  <span className="text-2xl font-black text-white tracking-tight">R$ 4.850.000</span>
                  <p className="text-[11px] text-white/50 mt-0.5">34 deals em negociação ativa</p>
                </div>
                <div className="h-1.5 w-full bg-white/[0.08] rounded-full overflow-hidden">
                  <div className="h-full bg-[#CCFF00] rounded-full w-[81%]" />
                </div>
              </div>

              {/* Card 2: Google Agenda Sync */}
              <div className="rounded-2xl border border-white/[0.12] bg-[#0E121E]/90 p-4 space-y-2.5 backdrop-blur-xl shadow-lg relative overflow-hidden group hover:border-blue-400/40 transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-white/50 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-sky-400" />
                    Google Agenda
                  </span>
                  <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Sincronizado
                  </div>
                </div>
                <div>
                  <span className="text-sm font-extrabold text-white block truncate">
                    10:00 • Dr. Marcelo
                  </span>
                  <p className="text-[11px] text-white/50 truncate">Mansão Alphaville Residencial</p>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-[#CCFF00] font-bold">
                  <CheckCircle2 className="w-3 h-3 text-[#CCFF00]" /> 1-Clique para abrir no celular
                </div>
              </div>

              {/* Card 3: Vitrine Pública Exclusiva */}
              <div className="sm:col-span-2 rounded-2xl border border-white/[0.12] bg-[#0E121E]/90 p-3.5 flex items-center justify-between backdrop-blur-xl shadow-lg hover:border-purple-400/30 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-300 shrink-0">
                    <Share2 className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs font-extrabold text-white block truncate">
                      Sua Vitrine Pública Personalizada
                    </span>
                    <span className="text-[11px] text-white/50 font-mono">
                      tactuscrm.com.br/v/sua-imobiliaria
                    </span>
                  </div>
                </div>
                <span className="hidden sm:inline-flex px-3 py-1 rounded-full bg-white/[0.06] border border-white/10 text-[10px] font-bold text-white/80 shrink-0">
                  Pronta para Bio do Instagram
                </span>
              </div>
            </div>

            {/* Social Proof Footer */}
            <div className="flex items-center gap-3.5 pt-2 border-t border-white/[0.08]">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full border-2 border-[#080A0F] bg-emerald-500/20 text-emerald-300 font-black text-[10px] flex items-center justify-center">
                  CS
                </div>
                <div className="w-8 h-8 rounded-full border-2 border-[#080A0F] bg-blue-500/20 text-blue-300 font-black text-[10px] flex items-center justify-center">
                  RD
                </div>
                <div className="w-8 h-8 rounded-full border-2 border-[#080A0F] bg-purple-500/20 text-purple-300 font-black text-[10px] flex items-center justify-center">
                  MA
                </div>
              </div>
              <p className="text-xs text-white/50">
                Mais de <strong className="text-white font-bold">2.345 corretores e gestores</strong> usando ativamente em todo o Brasil.
              </p>
            </div>

          </div>

          {/* RIGHT COLUMN: The High-End Authentication Console */}
          <div className="w-full lg:col-span-5 max-w-md mx-auto">
            
            {/* Mobile Brand Header */}
            <div className="lg:hidden flex flex-col items-center text-center space-y-2 mb-6">
              <Link href="/" className="transition-transform active:scale-95" title="Tactus CRM">
                <TactusLogo variant="verde" className="h-16 w-auto" priority />
              </Link>
              <p className="text-xs text-white/60 font-medium">Portal do Corretor & Gestor Master</p>
            </div>

            {/* Main Luxury Glass Auth Card */}
            <div className="relative rounded-3xl border border-white/[0.14] bg-[#0D101A]/95 backdrop-blur-3xl p-6 sm:p-7 shadow-[0_30px_90px_rgba(0,0,0,0.85)] overflow-hidden">
              
              {/* Top glass ambient accent line */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#CCFF00]/50 to-transparent" />
              
              {/* Card Header & Switcher */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-black text-white tracking-tight">Acesso ao Sistema</h2>
                    <p className="text-xs text-white/50 mt-0.5">Selecione seu perfil ou use suas credenciais</p>
                  </div>
                  <div className="w-9 h-9 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-[#CCFF00] shadow-xs">
                    <Key className="w-4 h-4" />
                  </div>
                </div>

                {/* Segmented Mode Selector (Apple Style Pill) */}
                <div className="grid grid-cols-2 p-1 rounded-2xl bg-black/60 border border-white/[0.08] backdrop-blur-md">
                  <button
                    type="button"
                    onClick={() => setActiveTab("quick")}
                    className={`py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                      activeTab === "quick"
                        ? "bg-[#CCFF00] text-black shadow-md font-black"
                        : "text-white/60 hover:text-white"
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Acesso Rápido</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab("credentials")}
                    className={`py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                      activeTab === "credentials"
                        ? "bg-white/15 text-white shadow-md font-black"
                        : "text-white/60 hover:text-white"
                    }`}
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>E-mail & Senha</span>
                  </button>
                </div>
              </div>

              {/* Error Message Box */}
              {error && (
                <div className="mt-4 flex items-start gap-2.5 rounded-2xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-300 animate-in fade-in">
                  <AlertCircle className="h-4 w-4 shrink-0 text-red-400 mt-0.5" />
                  <span className="leading-relaxed">{error}</span>
                </div>
              )}

              {/* TAB 1: ACESSO RÁPIDO COM 1-CLIQUE (OS 3 TIPOS DE USUÁRIO ALINHADOS) */}
              {activeTab === "quick" && (
                <div className="mt-4 space-y-2.5">
                  <span className="text-[10px] font-black uppercase tracking-wider text-white/40 block">
                    Escolha um tipo de conta para demonstração:
                  </span>

                  {/* 1. IMOBILIÁRIA: Chefe / Gestor Master */}
                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => handleQuickLogin("carlos@tactus.com.br", "123456", "carlos")}
                    className={`w-full p-3 rounded-2xl border transition-all text-left flex items-center justify-between group ${
                      activeQuickUser === "carlos"
                        ? "border-[#CCFF00] bg-[#CCFF00]/10 shadow-lg shadow-[#CCFF00]/10"
                        : "border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="relative shrink-0">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-black text-xs">
                          CS
                        </div>
                        <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#0D101A]" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-xs font-black text-white group-hover:text-[#CCFF00] transition-colors truncate">
                            Carlos Silveira
                          </span>
                          <span className="px-1.5 py-0.2 rounded-md bg-emerald-500/20 text-[9px] font-black text-emerald-300 uppercase tracking-wide">
                            Chefe da Imobiliária (Master)
                          </span>
                        </div>
                        <span className="text-[11px] text-white/50 block truncate mt-0.5">
                          Tactus Imobiliária • Gerencia corretores, carteira e planos
                        </span>
                      </div>
                    </div>

                    <div className="shrink-0 ml-2">
                      {loading && activeQuickUser === "carlos" ? (
                        <Loader2 className="w-4 h-4 animate-spin text-[#CCFF00]" />
                      ) : (
                        <div className="w-7 h-7 rounded-full bg-white/[0.05] group-hover:bg-[#CCFF00] group-hover:text-black text-white/60 flex items-center justify-center transition-all">
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      )}
                    </div>
                  </button>

                  {/* 2. CORRETOR AUTÔNOMO: 1 Login Solo */}
                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => handleQuickLogin("roberto@autonomo.com.br", "123456", "roberto")}
                    className={`w-full p-3 rounded-2xl border transition-all text-left flex items-center justify-between group ${
                      activeQuickUser === "roberto"
                        ? "border-[#CCFF00] bg-[#CCFF00]/10 shadow-lg shadow-[#CCFF00]/10"
                        : "border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="relative shrink-0">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-400 flex items-center justify-center font-black text-xs">
                          RD
                        </div>
                        <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-blue-400 border-2 border-[#0D101A]" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-xs font-black text-white group-hover:text-[#CCFF00] transition-colors truncate">
                            Roberto Dias
                          </span>
                          <span className="px-1.5 py-0.2 rounded-md bg-blue-500/20 text-[9px] font-black text-blue-300 uppercase tracking-wide">
                            Corretor Autônomo Solo (1 Login)
                          </span>
                        </div>
                        <span className="text-[11px] text-white/50 block truncate mt-0.5">
                          Operação Individual • Vitrine pessoal e 100% de comissão
                        </span>
                      </div>
                    </div>

                    <div className="shrink-0 ml-2">
                      {loading && activeQuickUser === "roberto" ? (
                        <Loader2 className="w-4 h-4 animate-spin text-[#CCFF00]" />
                      ) : (
                        <div className="w-7 h-7 rounded-full bg-white/[0.05] group-hover:bg-[#CCFF00] group-hover:text-black text-white/60 flex items-center justify-center transition-all">
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      )}
                    </div>
                  </button>

                  {/* 3. SUPER ADMIN: Gerencia Tudo no SaaS */}
                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => handleQuickLogin("admin@sistema.com", "123456", "admin")}
                    className={`w-full p-3 rounded-2xl border transition-all text-left flex items-center justify-between group ${
                      activeQuickUser === "admin"
                        ? "border-[#CCFF00] bg-[#CCFF00]/10 shadow-lg shadow-[#CCFF00]/10"
                        : "border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="relative shrink-0">
                        <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 flex items-center justify-center font-black text-xs">
                          <ShieldCheck className="w-5 h-5" />
                        </div>
                        <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-purple-400 border-2 border-[#0D101A]" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-xs font-black text-white group-hover:text-[#CCFF00] transition-colors truncate">
                            Super Administrador
                          </span>
                          <span className="px-1.5 py-0.2 rounded-md bg-purple-500/20 text-[9px] font-black text-purple-300 uppercase tracking-wide">
                            Root Geral SaaS
                          </span>
                        </div>
                        <span className="text-[11px] text-white/50 block truncate mt-0.5">
                          Gerencia todas as imobiliárias, assinaturas e o CRM
                        </span>
                      </div>
                    </div>

                    <div className="shrink-0 ml-2">
                      {loading && activeQuickUser === "admin" ? (
                        <Loader2 className="w-4 h-4 animate-spin text-[#CCFF00]" />
                      ) : (
                        <div className="w-7 h-7 rounded-full bg-white/[0.05] group-hover:bg-[#CCFF00] group-hover:text-black text-white/60 flex items-center justify-center transition-all">
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      )}
                    </div>
                  </button>

                  {/* 4. VISÃO DE BRAÇO DA IMOBILIÁRIA (Corretora Mariana Alencar) */}
                  <div className="pt-1">
                    <button
                      type="button"
                      disabled={loading}
                      onClick={() => handleQuickLogin("mariana@tactus.com.br", "123456", "mariana")}
                      className={`w-full p-2.5 rounded-xl border border-dashed transition-all text-left flex items-center justify-between text-xs text-white/50 hover:text-white ${
                        activeQuickUser === "mariana"
                          ? "border-[#CCFF00] bg-[#CCFF00]/10 text-white"
                          : "border-white/15 hover:border-white/30 hover:bg-white/[0.03]"
                      }`}
                    >
                      <span className="flex items-center gap-2 truncate">
                        <span className="w-2 h-2 rounded-full bg-purple-400 shrink-0"></span>
                        <span className="truncate">Ou testar como <strong>Mariana Alencar</strong> (Corretora braço da equipe)</span>
                      </span>
                      {loading && activeQuickUser === "mariana" ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-[#CCFF00] shrink-0" />
                      ) : (
                        <ArrowRight className="w-3 h-3 shrink-0 ml-2" />
                      )}
                    </button>
                  </div>

                  <p className="text-[10px] text-center text-white/40 pt-1 font-semibold">
                    ⚡ Autenticação instantânea em 1-clique configurada para testes
                  </p>
                </div>
              )}

              {/* TAB 2: CREDENCIAIS COM E-MAIL E SENHA */}
              {activeTab === "credentials" && (
                <form onSubmit={handleLogin} className="mt-4 space-y-3.5">
                  {/* Email Input */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-white/60">
                      E-mail Corporativo
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-white/40" />
                      <input
                        type="email"
                        required
                        placeholder="carlos@tactus.com.br"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full h-11 pl-10 pr-4 rounded-xl border border-white/10 bg-white/[0.04] text-xs sm:text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-[#CCFF00] focus:ring-1 focus:ring-[#CCFF00] transition-all font-medium"
                      />
                    </div>
                  </div>

                  {/* Password Input */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-white/60">
                        Senha
                      </label>
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault()
                          alert("Para este ambiente de testes, utilize a senha '123456' ou a aba 'Acesso Rápido'.")
                        }}
                        className="text-[11px] font-semibold text-[#CCFF00] hover:underline"
                      >
                        Esqueceu?
                      </a>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-white/40" />
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full h-11 pl-10 pr-11 rounded-xl border border-white/10 bg-white/[0.04] text-xs sm:text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-[#CCFF00] focus:ring-1 focus:ring-[#CCFF00] transition-all font-medium"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-3.5 text-white/40 hover:text-white transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Remember Me Checkbox */}
                  <div className="flex items-center justify-between pt-0.5">
                    <label className="flex items-center gap-2 cursor-pointer text-xs text-white/60 select-none">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-4 h-4 rounded accent-[#CCFF00] bg-white/10 border-white/20"
                      />
                      <span>Manter conectado neste navegador</span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full h-11 rounded-xl bg-[#CCFF00] hover:bg-[#b8e600] text-black font-black text-xs sm:text-sm shadow-[0_10px_25px_-5px_rgba(204,255,0,0.4)] transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 mt-2 cursor-pointer"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin text-black" />
                        <span>Autenticando...</span>
                      </>
                    ) : (
                      <>
                        <span>Entrar no Tactus CRM</span>
                        <ArrowRight className="h-4 w-4 stroke-[2.5]" />
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* Security Badges Footer */}
              <div className="mt-5 pt-4 border-t border-white/[0.08] flex items-center justify-between text-[10px] text-white/40 font-semibold">
                <span className="flex items-center gap-1">
                  <Shield className="w-3 h-3 text-emerald-400" /> Criptografia 256-Bit
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-blue-400" /> Google Sync
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Smartphone className="w-3 h-3 text-[#CCFF00]" /> PWA Nativo
                </span>
              </div>

            </div>
          </div>

        </div>
      </main>

      {/* Global Footer */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto px-6 py-5 text-center text-xs text-white/40">
        <p>© 2026 Tactus CRM Imobiliário. Plataforma para Corretores e Imobiliárias de Alta Performance.</p>
      </footer>
    </div>
  )
}
