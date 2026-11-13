"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
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
  CheckCircle2
} from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [activeQuickLogin, setActiveQuickLogin] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async (e?: React.FormEvent, customEmail?: string, customPass?: string, quickLabel?: string) => {
    if (e) e.preventDefault()
    setError(null)
    setLoading(true)
    if (quickLabel) setActiveQuickLogin(quickLabel)

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
      setActiveQuickLogin(null)
    } finally {
      setLoading(false)
    }
  }

  const fillAndSubmit = (demoEmail: string, demoPass: string, label: string) => {
    setEmail(demoEmail)
    setPassword(demoPass)
    handleLogin(undefined, demoEmail, demoPass, label)
  }

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between bg-[#08090E] text-white selection:bg-[#CCFF00] selection:text-black overflow-x-hidden">
      {/* Ambient Lighting Gradients */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-gradient-to-b from-indigo-600/20 via-purple-600/10 to-transparent blur-[120px] rounded-full" />
        <div className="absolute -bottom-24 right-10 w-[500px] h-[400px] bg-emerald-500/10 blur-[140px] rounded-full" />
        <div className="absolute top-1/3 -left-20 w-[450px] h-[350px] bg-[#CCFF00]/5 blur-[150px] rounded-full" />
        {/* Subtle grid texture overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
      </div>

      {/* Top Header */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-white/70 hover:text-white transition-all px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md hover:bg-white/[0.08]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Voltar ao Início</span>
        </Link>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-[11px] font-medium text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Sistema Online • v2.4</span>
          </div>
        </div>
      </header>

      {/* Main Login Box */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-4 sm:p-6 my-auto">
        <div className="w-full max-w-md space-y-6">
          
          {/* Brand Header */}
          <div className="text-center space-y-3">
            <div className="inline-flex p-3 rounded-2xl bg-white/[0.04] border border-white/10 shadow-inner backdrop-blur-xl group hover:border-[#CCFF00]/50 transition-all">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-[#CCFF00] to-emerald-400 flex items-center justify-center text-black shadow-lg shadow-[#CCFF00]/20">
                <Building2 className="w-6 h-6 stroke-[2.2]" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                  TACTUS<span className="text-[#CCFF00]">.</span>
                </h1>
                <span className="rounded-full bg-white/[0.08] border border-white/10 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-widest text-[#CCFF00]">
                  CRM
                </span>
              </div>
              <p className="text-xs sm:text-sm text-white/50 mt-1 max-w-xs mx-auto font-medium">
                Gestão inteligente para corretores de alta performance e imobiliárias.
              </p>
            </div>
          </div>

          {/* Frosted Glass Login Card */}
          <div className="relative rounded-[32px] border border-white/[0.12] bg-[#10131B]/80 backdrop-blur-2xl p-6 sm:p-8 shadow-[0_30px_70px_rgba(0,0,0,0.6)] overflow-hidden">
            
            {/* Top glass reflection highlight */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            
            <div className="space-y-5">
              <div>
                <h2 className="text-lg font-bold text-white tracking-tight">Acesse sua Conta</h2>
                <p className="text-xs text-white/50">Entre com seu e-mail corporativo cadastrado.</p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="flex items-start gap-2.5 rounded-2xl border border-red-500/30 bg-red-500/10 p-3.5 text-xs text-red-300 animate-in fade-in slide-in-from-top-1">
                  <AlertCircle className="h-4 w-4 shrink-0 text-red-400 mt-0.5" />
                  <span className="leading-relaxed">{error}</span>
                </div>
              )}

              {/* Login Form */}
              <form onSubmit={handleLogin} className="space-y-4">
                {/* E-mail */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-white/60">
                    E-mail Corporativo
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-white/35" />
                    <input
                      type="email"
                      required
                      placeholder="seu.nome@tactus.com.br"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full h-11 pl-10 pr-4 rounded-2xl border border-white/10 bg-white/[0.04] text-xs sm:text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-[#CCFF00]/80 focus:ring-1 focus:ring-[#CCFF00]/80 transition-all font-medium"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-white/60">
                      Senha de Acesso
                    </label>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        alert("Para o ambiente de teste, utilize a senha '123456' ou os botões de Acesso Rápido abaixo.")
                      }}
                      className="text-[11px] font-semibold text-[#CCFF00]/90 hover:text-[#CCFF00] transition-colors"
                    >
                      Esqueceu?
                    </a>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-white/35" />
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

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-11 rounded-2xl bg-[#CCFF00] hover:bg-[#bbf000] text-black font-extrabold text-xs sm:text-sm shadow-[0_12px_28px_-6px_rgba(204,255,0,0.35)] transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 mt-2"
                >
                  {loading && !activeQuickLogin ? (
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

              {/* Quick Demo Access Divider */}
              <div className="relative pt-4 pb-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/[0.08]" />
                </div>
                <div className="relative flex justify-center text-[10px] uppercase font-black tracking-widest">
                  <span className="bg-[#10131B] px-3 text-white/40">
                    Acesso Rápido de Teste (1-Clique)
                  </span>
                </div>
              </div>

              {/* Quick Access Buttons */}
              <div className="space-y-2">
                {/* Carlos Silveira - Gestor */}
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => fillAndSubmit("carlos@tactus.com.br", "123456", "carlos")}
                  className={`w-full p-2.5 rounded-2xl border transition-all text-left flex items-center justify-between group ${
                    activeQuickLogin === "carlos"
                      ? "border-[#CCFF00] bg-[#CCFF00]/10"
                      : "border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold text-xs border border-blue-500/20">
                      CS
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-white group-hover:text-[#CCFF00] transition-colors">
                          Carlos Silveira
                        </span>
                        <span className="px-1.5 py-0.2 rounded-md bg-white/[0.08] text-[9px] font-semibold text-white/60">
                          Gestor / Corretor
                        </span>
                      </div>
                      <span className="text-[10px] text-white/40">carlos@tactus.com.br</span>
                    </div>
                  </div>

                  <div className="text-right">
                    {loading && activeQuickLogin === "carlos" ? (
                      <Loader2 className="w-4 h-4 animate-spin text-[#CCFF00]" />
                    ) : (
                      <span className="text-[10px] font-bold text-white/50 group-hover:text-white transition-colors flex items-center gap-1">
                        Entrar <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    )}
                  </div>
                </button>

                {/* Mariana Alencar - Corretora */}
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => fillAndSubmit("mariana@tactus.com.br", "123456", "mariana")}
                  className={`w-full p-2.5 rounded-2xl border transition-all text-left flex items-center justify-between group ${
                    activeQuickLogin === "mariana"
                      ? "border-[#CCFF00] bg-[#CCFF00]/10"
                      : "border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold text-xs border border-purple-500/20">
                      MA
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-white group-hover:text-[#CCFF00] transition-colors">
                          Mariana Alencar
                        </span>
                        <span className="px-1.5 py-0.2 rounded-md bg-white/[0.08] text-[9px] font-semibold text-white/60">
                          Corretora Senior
                        </span>
                      </div>
                      <span className="text-[10px] text-white/40">mariana@tactus.com.br</span>
                    </div>
                  </div>

                  <div className="text-right">
                    {loading && activeQuickLogin === "mariana" ? (
                      <Loader2 className="w-4 h-4 animate-spin text-[#CCFF00]" />
                    ) : (
                      <span className="text-[10px] font-bold text-white/50 group-hover:text-white transition-colors flex items-center gap-1">
                        Entrar <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    )}
                  </div>
                </button>

                {/* Super Admin */}
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => fillAndSubmit("admin@sistema.com", "123456", "admin")}
                  className={`w-full p-2.5 rounded-2xl border transition-all text-left flex items-center justify-between group ${
                    activeQuickLogin === "admin"
                      ? "border-[#CCFF00] bg-[#CCFF00]/10"
                      : "border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-xs border border-emerald-500/20">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-white group-hover:text-[#CCFF00] transition-colors">
                          Super Administrador
                        </span>
                        <span className="px-1.5 py-0.2 rounded-md bg-amber-500/15 text-[9px] font-semibold text-amber-300">
                          SaaS Master
                        </span>
                      </div>
                      <span className="text-[10px] text-white/40">admin@sistema.com</span>
                    </div>
                  </div>

                  <div className="text-right">
                    {loading && activeQuickLogin === "admin" ? (
                      <Loader2 className="w-4 h-4 animate-spin text-[#CCFF00]" />
                    ) : (
                      <span className="text-[10px] font-bold text-white/50 group-hover:text-white transition-colors flex items-center gap-1">
                        Painel <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    )}
                  </div>
                </button>
              </div>

            </div>
          </div>

          {/* Feature Micro-Badges */}
          <div className="flex items-center justify-center gap-4 text-[11px] text-white/40 font-medium">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-[#CCFF00]" /> Google Agenda Integrada
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-[#CCFF00]" /> PWA Offline Ready
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-[#CCFF00]" /> Multi-Tenant
            </span>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 text-center text-xs text-white/35">
        <p>© 2026 Tactus CRM Imobiliário. Todos os direitos reservados.</p>
      </footer>
    </div>
  )
}
