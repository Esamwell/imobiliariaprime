"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Building, Lock, Mail, ArrowRight, ShieldCheck, UserCheck, AlertCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async (e?: React.FormEvent, customEmail?: string, customPass?: string) => {
    if (e) e.preventDefault()
    setError(null)
    setLoading(true)

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
        throw new Error(data.error || "Falha na autenticação.")
      }

      if (data.user.role === "SUPER_ADMIN") {
        router.push("/super-admin")
      } else {
        router.push("/dashboard")
      }
      router.refresh()
    } catch (err: any) {
      setError(err.message || "Erro ao conectar com o servidor.")
    } finally {
      setLoading(false)
    }
  }

  const fillAndSubmit = (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail)
    setPassword(demoPass)
    handleLogin(undefined, demoEmail, demoPass)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/30">
            <Building className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Tactus CRM Imobiliário</h1>
          <p className="text-sm text-slate-400">
            Plataforma completa para gestão de imobiliárias, corretores e locações.
          </p>
        </div>

        <Card className="border-slate-800 bg-slate-900/90 text-slate-100 shadow-2xl backdrop-blur-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl text-white">Acesse sua conta</CardTitle>
            <CardDescription className="text-slate-400">
              Digite suas credenciais corporativas para entrar no sistema.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="mb-4 flex items-center gap-2 rounded-lg border border-red-500/50 bg-red-500/10 p-3 text-xs text-red-400">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">E-mail</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                  <input
                    type="email"
                    required
                    placeholder="seu.email@imobiliaria.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-10 pl-9 pr-3 rounded-lg border border-slate-700 bg-slate-800/80 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-300">Senha</label>
                  <a href="#" className="text-xs text-primary hover:underline">
                    Esqueceu?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-10 pl-9 pr-3 rounded-lg border border-slate-700 bg-slate-800/80 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <Button type="submit" disabled={loading} className="w-full h-10 font-semibold gap-2">
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Autenticando...
                  </>
                ) : (
                  <>
                    Entrar na Plataforma <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col gap-3 border-t border-slate-800 pt-4">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              Acesso Rápido de Teste
            </span>
            <div className="grid grid-cols-2 gap-2 w-full">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fillAndSubmit("carlos@tactus.com.br", "123456")}
                className="border-slate-700 bg-slate-800/60 hover:bg-slate-700 text-slate-200 text-xs h-9 justify-start gap-2"
              >
                <UserCheck className="h-3.5 w-3.5 text-blue-400" />
                <span>Corretor / CRM</span>
              </Button>

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fillAndSubmit("admin@sistema.com", "123456")}
                className="border-slate-700 bg-slate-800/60 hover:bg-slate-700 text-slate-200 text-xs h-9 justify-start gap-2"
              >
                <ShieldCheck className="h-3.5 w-3.5 text-purple-400" />
                <span>Super Admin</span>
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

