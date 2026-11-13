"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { TactusLogo } from "@/components/tactus-logo"
import { 
  Building2, 
  Lock, 
  Mail, 
  ArrowRight, 
  ShieldCheck, 
  UserCheck, 
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
  Check
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
    <div className="relative min-h-screen w-full flex flex-col justify-between bg-[#07090E] text-white selection:bg-[#CCFF00] selection:text-black overflow-x-hidden font-sans">
      
      {/* Ambient Lighting Gradients (Apple Style Glows) */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-40 left-1/4 w-[600px] h-[500px] bg-gradient-to-b from-indigo-600/25 via-purple-600/10 to-transparent blur-[140px] rounded-full" />
        <div className="absolute top-1/2 -right-20 w-[550px] h-[450px] bg-[#CCFF00]/10 blur-[160px] rounded-full" />
        <div className="absolute -bottom-32 left-10 w-[500px] h-[400px] bg-emerald-500/10 blur-[150px] rounded-full" />
        
        {/* Subtle grid blueprint texture */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:28px_28px] opacity-40" />
      </div>

      {/* Top Header Navigation */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-white/70 hover:text-white transition-all px-4 py-2 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-xl hover:bg-white/[0.08]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Voltar ao Site Oficial</span>
        </Link>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md text-[11px] text-white/60">
            <span className="w-2 h-2 rounded-full bg-[#CCFF00] animate-pulse" />
            <span>Tactus Cloud • Alta Performance</span>
          </div>
          <div className="px-3 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-[11px] font-bold text-emerald-400">
            v2.4 Online
          </div>
        </div>
      </header>

      {/* Main Container - Split View on Desktop, Centered on Mobile */}
      <main className="relative z-10 flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* Left Column: Visual Showcase & Value Proposition (Desktop) */}
          <div className="hidden lg:flex lg:col-span-7 flex-col space-y-8 pr-4">
            
            {/* Brand Header */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#CCFF00]/30 bg-[#CCFF00]/10 backdrop-blur-xl">
                <Sparkles className="w-3.5 h-3.5 text-[#CCFF00]" />
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#CCFF00]">
                  SISTEMA IMOBILIÁRIO PRIME
                </span>
              </div>

              <div className="pt-2">
                <Link href="/" className="inline-block transition-transform hover:scale-105" title="Ir para a página inicial do Tactus CRM">
                  <TactusLogo variant="verde" className="h-22 xl:h-28 w-auto" priority />
                </Link>
                <p className="text-sm font-semibold text-white/50 tracking-wide uppercase mt-3">
                  Tecnologia Prime para Gestores e Corretores
                </p>
              </div>

              <p className="text-base text-white/70 max-w-xl leading-relaxed pt-1">
                Uma plataforma completa e sofisticada desenhada para acelerar seus fechamentos: 
                gestão inteligente de funil, vitrines públicas exclusivas por corretor e agendamento nativo com o Google Calendar.
              </p>
            </div>

            {/* Floating Glass Showcase Widgets (Inspired by modern SaaS dashboard previews) */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              
              {/* Widget 1: VGV & Negócios */}
              <div className="glass-card rounded-[28px] border border-white/[0.10] bg-white/[0.03] backdrop-blur-2xl p-5 space-y-3 relative overflow-hidden group hover:border-[#CCFF00]/30 transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider text-white/50">
                    VGV Fechado no Mês
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#CCFF00]/15 text-[#CCFF00] text-[10px] font-extrabold">
                    <TrendingUp className="w-3 h-3" /> +18.4%
                  </span>
                </div>
                <div>
                  <span className="text-2xl font-black text-white tracking-tight">R$ 4.850.000</span>
                  <p className="text-[11px] text-white/40 mt-0.5">34 deals em negociação ativa</p>
                </div>
                <div className="h-1.5 w-full bg-white/[0.08] rounded-full overflow-hidden">
                  <div className="h-full bg-[#CCFF00] rounded-full w-[78%]" />
                </div>
              </div>

              {/* Widget 2: Google Agenda Sync */}
              <div className="glass-card rounded-[28px] border border-white/[0.10] bg-white/[0.03] backdrop-blur-2xl p-5 space-y-3 relative overflow-hidden group hover:border-blue-400/30 transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider text-white/50">
                    Google Agenda
                  </span>
                  <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Sincronizado
                  </div>
                </div>
                <div>
                  <span className="text-sm font-bold text-white block truncate">
                    10:00 • Dr. Marcelo
                  </span>
                  <p className="text-[11px] text-white/40 truncate">Mansão Alphaville Residencial</p>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-[#CCFF00] font-semibold">
                  <CheckCircle2 className="w-3 h-3" /> 1-Clique para abrir no celular
                </div>
              </div>

              {/* Widget 3: Vitrine Pública Exclusiva */}
              <div className="col-span-2 glass-card rounded-[24px] border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-500/15 border border-purple-500/25 flex items-center justify-center text-purple-300">
                    <Share2 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">Sua Vitrine Pública Personalizada</span>
                    <span className="text-[11px] text-white/40 font-mono">tactus.com.br/v/tactus</span>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-white/[0.06] border border-white/10 text-[10px] font-bold text-white/70">
                  Pronta para Bio do Instagram
                </span>
              </div>
            </div>

            {/* Social Proof Footer */}
            <div className="flex items-center gap-4 pt-2 border-t border-white/[0.08]">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full border-2 border-[#07090E] bg-blue-500/30 text-blue-200 flex items-center justify-center text-[10px] font-bold">
                  CS
                </div>
                <div className="w-8 h-8 rounded-full border-2 border-[#07090E] bg-purple-500/30 text-purple-200 flex items-center justify-center text-[10px] font-bold">
                  MA
                </div>
                <div className="w-8 h-8 rounded-full border-2 border-[#07090E] bg-emerald-500/30 text-emerald-200 flex items-center justify-center text-[10px] font-bold">
                  SA
                </div>
              </div>
              <p className="text-xs text-white/50">
                Mais de <strong className="text-white font-semibold">2.345 usuários ativos</strong> em todo o Brasil.
              </p>
            </div>

          </div>

          {/* Right Column: High-End Frosted Glass Login Console */}
          <div className="w-full lg:col-span-5 max-w-md mx-auto">
            
            {/* Mobile Brand Header (Logo Limpa e Marcante) */}
            <div className="lg:hidden flex flex-col items-center text-center space-y-2 mb-6">
              <Link href="/" className="transition-transform active:scale-95" title="Ir para a página inicial do Tactus CRM">
                <TactusLogo variant="verde" className="h-16 w-auto" priority />
              </Link>
              <p className="text-xs text-white/50 font-medium">Gestão Imobiliária & Portal do Corretor</p>
            </div>

            {/* Main Frosted Glass Card */}
            <div className="relative rounded-[36px] border border-white/[0.14] bg-[#0E1119]/85 backdrop-blur-3xl p-6 sm:p-8 shadow-[0_35px_80px_rgba(0,0,0,0.7)] overflow-hidden">
              
              {/* Top glass reflection line */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
              
              {/* Card Header & Tab Switcher */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-black text-white tracking-tight">Acesse o Sistema</h2>
                    <p className="text-xs text-white/50 mt-0.5">Escolha como prefere se conectar</p>
                  </div>
                  <div className="w-8 h-8 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-[#CCFF00]">
                    <Key className="w-4 h-4" />
                  </div>
                </div>

                {/* Segmented Mode Selector (Apple Style Pill) */}
                <div className="grid grid-cols-2 p-1 rounded-2xl bg-black/40 border border-white/[0.08] backdrop-blur-md">
                  <button
                    type="button"
                    onClick={() => setActiveTab("quick")}
                    className={`py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                      activeTab === "quick"
                        ? "bg-[#CCFF00] text-black shadow-md shadow-[#CCFF00]/25 font-black"
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
                        ? "bg-white/15 text-white shadow-md font-bold"
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
                <div className="mt-4 flex items-start gap-2.5 rounded-2xl border border-red-500/30 bg-red-500/10 p-3.5 text-xs text-red-300 animate-in fade-in slide-in-from-top-1">
                  <AlertCircle className="h-4 w-4 shrink-0 text-red-400 mt-0.5" />
                  <span className="leading-relaxed">{error}</span>
                </div>
              )}

              {/* TAB 1: ACESSO RÁPIDO (1-CLIQUE PARA DEMO / TESTES) */}
              {activeTab === "quick" && (
                <div className="mt-5 space-y-2.5">
                  <span className="text-[10px] font-black uppercase tracking-wider text-white/40 block">
                    Selecione um perfil para entrar instantaneamente:
                  </span>

                  {/* 1. IMOBILIÁRIA: Chefe / Login Master */}
                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => handleQuickLogin("carlos@tactus.com.br", "123456", "carlos")}
                    className={`w-full p-3.5 rounded-2xl border transition-all text-left flex items-center justify-between group ${
                      activeQuickUser === "carlos"
                        ? "border-[#CCFF00] bg-[#CCFF00]/10 shadow-lg shadow-[#CCFF00]/10"
                        : "border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.07] hover:border-white/25"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-black text-xs">
                          CS
                        </div>
                        <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#0E1119]" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-black text-white group-hover:text-[#CCFF00] transition-colors">
                            Carlos Silveira
                          </span>
                          <span className="px-1.5 py-0.5 rounded-md bg-emerald-500/20 text-[9px] font-extrabold text-emerald-300 uppercase tracking-wide">
                            Chefe da Imobiliária (Master)
                          </span>
                        </div>
                        <span className="text-[11px] text-white/50 block mt-0.5">
                          Tactus Imobiliária • Adiciona corretores e gerencia seus braços
                        </span>
                      </div>
                    </div>

                    <div>
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
                    className={`w-full p-3.5 rounded-2xl border transition-all text-left flex items-center justify-between group ${
                      activeQuickUser === "roberto"
                        ? "border-[#CCFF00] bg-[#CCFF00]/10 shadow-lg shadow-[#CCFF00]/10"
                        : "border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.07] hover:border-white/25"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-400 flex items-center justify-center font-black text-xs">
                          RD
                        </div>
                        <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-blue-400 border-2 border-[#0E1119]" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-black text-white group-hover:text-[#CCFF00] transition-colors">
                            Roberto Dias
                          </span>
                          <span className="px-1.5 py-0.5 rounded-md bg-blue-500/20 text-[9px] font-extrabold text-blue-300 uppercase tracking-wide">
                            Corretor Autônomo Solo (1 Login)
                          </span>
                        </div>
                        <span className="text-[11px] text-white/50 block mt-0.5">
                          Operação Individual • Vitrine pessoal, funil direto e 100% comissão
                        </span>
                      </div>
                    </div>

                    <div>
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
                    className={`w-full p-3.5 rounded-2xl border transition-all text-left flex items-center justify-between group ${
                      activeQuickUser === "admin"
                        ? "border-[#CCFF00] bg-[#CCFF00]/10 shadow-lg shadow-[#CCFF00]/10"
                        : "border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.07] hover:border-white/25"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 flex items-center justify-center font-black text-xs">
                          <ShieldCheck className="w-5 h-5" />
                        </div>
                        <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-purple-400 border-2 border-[#0E1119]" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-black text-white group-hover:text-[#CCFF00] transition-colors">
                            Super Administrador
                          </span>
                          <span className="px-1.5 py-0.5 rounded-md bg-purple-500/20 text-[9px] font-extrabold text-purple-300 uppercase tracking-wide">
                            Root Geral SaaS
                          </span>
                        </div>
                        <span className="text-[11px] text-white/50 block mt-0.5">
                          Gerencia todas as imobiliárias, corretores autônomos e o sistema
                        </span>
                      </div>
                    </div>

                    <div>
                      {loading && activeQuickUser === "admin" ? (
                        <Loader2 className="w-4 h-4 animate-spin text-[#CCFF00]" />
                      ) : (
                        <div className="w-7 h-7 rounded-full bg-white/[0.05] group-hover:bg-[#CCFF00] group-hover:text-black text-white/60 flex items-center justify-center transition-all">
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      )}
                    </div>
                  </button>

                  {/* 4. VISÃO DO BRAÇO DA IMOBILIÁRIA (Corretora Mariana Alencar) */}
                  <div className="pt-1">
                    <button
                      type="button"
                      disabled={loading}
                      onClick={() => handleQuickLogin("mariana@tactus.com.br", "123456", "mariana")}
                      className={`w-full p-2.5 rounded-xl border border-dashed transition-all text-left flex items-center justify-between text-xs text-white/50 hover:text-white ${
                        activeQuickUser === "mariana"
                          ? "border-[#CCFF00] bg-[#CCFF00]/10 text-white"
                          : "border-white/10 hover:border-white/30 hover:bg-white/[0.02]"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                        <span>Ou testar como <strong>Mariana Alencar</strong> (Corretora da equipe da imobiliária)</span>
                      </span>
                      {loading && activeQuickUser === "mariana" ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-[#CCFF00]" />
                      ) : (
                        <ArrowRight className="w-3 h-3" />
                      )}
                    </button>
                  </div>

                  <p className="text-[11px] text-center text-white/40 pt-2 font-medium">
                    ⚡ Autenticação direta sem necessidade de senha para testes
                  </p>
                </div>
              )}

              {/* TAB 2: CREDENCIAIS CORPORATIVAS */}
              {activeTab === "credentials" && (
                <form onSubmit={handleLogin} className="mt-5 space-y-4">
                  {/* Email Input */}
                  <div className="space-y-1.5">
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
                        className="w-full h-11 pl-10 pr-4 rounded-2xl border border-white/10 bg-white/[0.04] text-xs sm:text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-[#CCFF00]/80 focus:ring-1 focus:ring-[#CCFF00]/80 transition-all font-medium"
                      />
                    </div>
                  </div>

                  {/* Password Input */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-white/60">
                        Senha
                      </label>
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault()
                          alert("Para ambiente de testes, utilize a senha '123456' ou a aba 'Acesso Rápido'.")
                        }}
                        className="text-[11px] font-semibold text-[#CCFF00]/90 hover:text-[#CCFF00] transition-colors"
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
                        className="w-full h-11 pl-10 pr-11 rounded-2xl border border-white/10 bg-white/[0.04] text-xs sm:text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-[#CCFF00]/80 focus:ring-1 focus:ring-[#CCFF00]/80 transition-all font-medium"
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
                  <div className="flex items-center justify-between pt-1">
                    <label className="flex items-center gap-2 cursor-pointer text-xs text-white/60 select-none">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-4 h-4 rounded-md accent-[#CCFF00] bg-white/10 border-white/20"
                      />
                      <span>Manter conectado neste navegador</span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full h-11 rounded-2xl bg-[#CCFF00] hover:bg-[#bbf000] text-black font-extrabold text-xs sm:text-sm shadow-[0_12px_28px_-6px_rgba(204,255,0,0.35)] transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 mt-2"
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
              <div className="mt-6 pt-5 border-t border-white/[0.08] flex items-center justify-between text-[10px] text-white/40 font-medium">
                <span className="flex items-center gap-1">
                  <Shield className="w-3 h-3 text-emerald-400" /> Criptografia 256-Bit
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-blue-400" /> Google Sync
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Smartphone className="w-3 h-3 text-[#CCFF00]" /> PWA App
                </span>
              </div>

            </div>
          </div>

        </div>
      </main>

      {/* Global Footer */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 text-center text-xs text-white/35">
        <p>© 2026 Tactus CRM Imobiliário. Plataforma para Corretores e Imobiliárias de Alta Performance.</p>
      </footer>
    </div>
  )
}
