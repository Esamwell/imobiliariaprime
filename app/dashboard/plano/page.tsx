"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  Crown,
  Sparkles,
  Users,
  Building,
  Check,
  CreditCard,
  ShieldCheck,
  ArrowRight,
  ShieldAlert,
  Calendar,
  Zap,
  TrendingUp,
  Receipt,
  Download,
  AlertTriangle,
  ChevronRight,
  ExternalLink,
  PlusCircle,
  HelpCircle
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { TACTUS_PLANS, PLAN_ADDONS, PlanDefinition } from "@/lib/plans"

export default function PlanoUpgradePage() {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<any>(null)
  const [annualBilling, setAnnualBilling] = useState(false)
  const [upgrading, setUpgrading] = useState<string | null>(null)
  const [actionSuccess, setActionSuccess] = useState<string | null>(null)
  const [activeAddons, setActiveAddons] = useState<string[]>(["addon-rentals"])

  const loadSubscription = async () => {
    try {
      const res = await fetch("/api/subscription")
      const json = await res.json()
      setData(json)
      if (json.addons) {
        setActiveAddons(
          json.addons.filter((a: any) => a.active).map((a: any) => a.id)
        )
      }
    } catch (e) {
      console.error("Falha ao carregar assinatura:", e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadSubscription()
  }, [])

  const handleUpgrade = async (planKey: string) => {
    setUpgrading(planKey)
    setActionSuccess(null)
    try {
      const res = await fetch("/api/subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "upgrade_plan",
          planId: planKey,
        }),
      })
      const result = await res.json()
      if (res.ok) {
        setActionSuccess(result.message)
        await loadSubscription()
        setTimeout(() => setActionSuccess(null), 5000)
      } else {
        alert(result.error || "Erro ao realizar upgrade.")
      }
    } catch {
      alert("Erro na conexão com o servidor.")
    } finally {
      setUpgrading(null)
    }
  }

  const handleToggleAddon = async (addonId: string) => {
    try {
      const res = await fetch("/api/subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "toggle_addon",
          addonId,
        }),
      })
      const result = await res.json()
      if (res.ok) {
        setActionSuccess(result.message)
        if (result.active) {
          setActiveAddons((prev) => [...prev, addonId])
        } else {
          setActiveAddons((prev) => prev.filter((id) => id !== addonId))
        }
        setTimeout(() => setActionSuccess(null), 4000)
      } else {
        alert(result.error || "Erro ao atualizar add-on.")
      }
    } catch {
      alert("Erro na conexão com o servidor.")
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
          <p className="text-xs text-muted-foreground font-semibold">Carregando dados da assinatura...</p>
        </div>
      </div>
    )
  }

  // 1. REGRA CRÍTICA DE PERMISSÃO: Braços da Imobiliária (CORRETOR)
  // Se for corretor associado, não tem acesso à gestão financeira / upgrade
  if (!data?.canManageBilling || data?.role === "CORRETOR") {
    return (
      <div className="max-w-2xl mx-auto py-12 px-4">
        <div className="rounded-3xl border border-amber-500/30 bg-amber-500/[0.04] p-8 text-center space-y-5 shadow-lg backdrop-blur-md">
          <div className="mx-auto h-16 w-16 rounded-3xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center ring-4 ring-amber-500/10">
            <ShieldAlert className="h-8 w-8" />
          </div>

          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30 px-3 py-1 text-xs font-bold uppercase tracking-wider">
              Acesso Restrito ao Gestor Master
            </span>
            <h1 className="text-2xl font-black text-foreground">
              Gestão de Assinatura & Contratações
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-lg mx-auto">
              Seu perfil é de <strong>Corretor Associado (Braço da Imobiliária)</strong>. A contratação de planos, upgrades de capacidade e dados de faturamento são de responsabilidade exclusiva da <strong>Diretoria e do Chefe da Imobiliária</strong>.
            </p>
          </div>

          {/* Card explicativo com dados da imobiliária */}
          <div className="rounded-2xl border border-border/60 bg-card/80 p-5 text-left space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Imobiliária Vinculada:</span>
              <strong className="text-foreground">{data?.tenantName || "Tactus Imobiliária"}</strong>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Plano Ativo da Equipe:</span>
              <span className="font-bold text-amber-600 dark:text-amber-400">
                {data?.currentPlan?.name || "Plano Imobiliária"}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Administrador Master:</span>
              <span className="text-foreground font-medium">Carlos Eduardo Silveira (GESTOR)</span>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/dashboard">
              <Button className="rounded-full px-6 font-bold shadow-md">
                Voltar ao Meu Painel de Vendas
              </Button>
            </Link>
            <Link href="/dashboard/configuracoes">
              <Button variant="outline" className="rounded-full px-6 font-semibold">
                Ver Minhas Configurações de Perfil
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // 2. GESTOR MASTER (Chefe da Imobiliária) ou CORRETOR AUTÔNOMO (Solo)
  const currentPlan: PlanDefinition = data.currentPlan
  const usage = data.usage
  const isAutonomo = data.isAutonomo

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      {/* Header Topo */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-lime-400/20 text-lime-700 dark:text-lime-300 border border-lime-400/30 px-3 py-0.5 text-[11px] font-black uppercase tracking-wider">
              {isAutonomo ? "Corretor Solo Individual" : "Gestor Master da Imobiliária"}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground mt-1">
            Plano & Gerenciamento de Capacidade
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Acompanhe o consumo da sua franquia de corretores e imóveis, faça upgrades com 1 clique e expanda sua operação.
          </p>
        </div>

        {/* Toggle Mensal / Anual */}
        <div className="flex items-center gap-3 bg-muted/60 dark:bg-card/70 border border-border/80 rounded-full p-1.5 self-start md:self-auto backdrop-blur-md shadow-xs">
          <button
            onClick={() => setAnnualBilling(false)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              !annualBilling
                ? "bg-foreground text-background shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Faturamento Mensal
          </button>
          <button
            onClick={() => setAnnualBilling(true)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
              annualBilling
                ? "bg-foreground text-background shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <span>Anual</span>
            <span className="bg-lime-400 text-black px-1.5 py-0.2 rounded-full text-[10px] font-black">
              -20%
            </span>
          </button>
        </div>
      </div>

      {/* Alerta de Feedback de Ação */}
      {actionSuccess && (
        <div className="rounded-2xl border border-lime-500/40 bg-lime-500/10 p-4 text-xs font-bold text-lime-800 dark:text-lime-300 flex items-center gap-3 shadow-md animate-in fade-in">
          <ShieldCheck className="h-5 w-5 text-lime-600 dark:text-lime-400 shrink-0" />
          <span>{actionSuccess}</span>
        </div>
      )}

      {/* Cartão de Resumo do Plano Atual & Medidores de Consumo */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Card 1: Assinatura Ativa */}
        <div className="lg:col-span-1 rounded-3xl border border-black/[0.08] dark:border-white/[0.12] bg-gradient-to-br from-card via-card/95 to-muted/30 p-6 backdrop-blur-xl shadow-md flex flex-col justify-between space-y-5">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-muted-foreground">
                Sua Assinatura Atual
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 px-2.5 py-0.5 text-[10px] font-black">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Ativa
              </span>
            </div>

            <div>
              <h2 className="text-2xl font-black text-foreground flex items-center gap-2">
                {currentPlan.name}
                {currentPlan.id === "imobiliaria" && <Crown className="h-5 w-5 text-amber-500" />}
                {currentPlan.id === "essencial" && <Sparkles className="h-5 w-5 text-blue-500" />}
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">{currentPlan.subtitle}</p>
            </div>

            <div className="pt-2 border-t border-border/50 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Valor recorrente:</span>
                <span className="font-bold text-foreground">
                  R$ {annualBilling ? currentPlan.priceAnnual : currentPlan.priceMonthly}
                  <span className="text-[10px] text-muted-foreground font-normal">/mês</span>
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Próxima renovação:</span>
                <span className="font-semibold text-foreground flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                  {data.nextBillingDate}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Método de pagamento:</span>
                <span className="font-semibold text-foreground flex items-center gap-1">
                  <CreditCard className="h-3.5 w-3.5 text-muted-foreground" />
                  Visa •••• 4891
                </span>
              </div>
            </div>
          </div>

          <div className="pt-3">
            <Link href="#planos-disponiveis" className="w-full">
              <Button variant="outline" className="w-full rounded-2xl text-xs font-bold hover:bg-muted">
                Trocar ou Fazer Upgrade de Plano
              </Button>
            </Link>
          </div>
        </div>

        {/* Card 2 & 3: Medidores de Consumo da Franquia */}
        <div className="lg:col-span-2 rounded-3xl border border-black/[0.08] dark:border-white/[0.12] bg-card p-6 backdrop-blur-xl shadow-md flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-extrabold text-foreground">
                  Capacidade Operacional em Uso
                </h3>
                <p className="text-xs text-muted-foreground">
                  Monitoramento em tempo real dos limites contratados da sua conta.
                </p>
              </div>
              <span className="text-xs font-bold text-muted-foreground">
                Empresa: <strong className="text-foreground">{data.tenantName}</strong>
              </span>
            </div>

            <div className="space-y-5">
              {/* Barra de Corretores */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="flex items-center gap-2 text-foreground">
                    <Users className="h-4 w-4 text-lime-600 dark:text-lime-400" />
                    Franquia de Corretores & Logins:
                  </span>
                  <span className="font-bold">
                    <strong className="text-foreground">{usage.brokers.current}</strong> de {usage.brokers.max} corretores
                    <span className="text-muted-foreground text-[10px] ml-1 font-normal">
                      ({usage.brokers.percent}%)
                    </span>
                  </span>
                </div>

                <div className="h-3 w-full rounded-full bg-muted overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      usage.brokers.percent >= 90
                        ? "bg-red-500"
                        : usage.brokers.percent >= 70
                        ? "bg-amber-500"
                        : "bg-lime-500"
                    }`}
                    style={{ width: `${Math.min(100, usage.brokers.percent)}%` }}
                  />
                </div>

                {usage.brokers.current >= usage.brokers.max && (
                  <p className="text-[11px] text-amber-700 dark:text-amber-400 font-semibold flex items-center gap-1.5 pt-0.5">
                    <AlertTriangle className="h-3.5 w-3.5" />
                    Você atingiu o limite de corretores deste plano. Novos cadastros requerem upgrade ou assento extra.
                  </p>
                )}
              </div>

              {/* Barra de Imóveis */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="flex items-center gap-2 text-foreground">
                    <Building className="h-4 w-4 text-sky-600 dark:text-sky-400" />
                    Carteira de Imóveis Ativos na Vitrine:
                  </span>
                  <span className="font-bold">
                    <strong className="text-foreground">{usage.properties.current}</strong> de {usage.properties.max.toLocaleString("pt-BR")} imóveis
                    <span className="text-muted-foreground text-[10px] ml-1 font-normal">
                      ({usage.properties.percent}%)
                    </span>
                  </span>
                </div>

                <div className="h-3 w-full rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full bg-sky-500 transition-all duration-500"
                    style={{ width: `${Math.min(100, usage.properties.percent)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-border/50 flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Zap className="h-3.5 w-3.5 text-lime-600 dark:text-lime-400" />
              Upgrade imediato sem interrupção de serviço.
            </span>
            <Link
              href="/dashboard/equipe"
              className="text-primary font-bold hover:underline inline-flex items-center gap-1"
            >
              Gerenciar Corretores da Equipe
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Grid de Planos para Upgrade */}
      <div id="planos-disponiveis" className="space-y-5 pt-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-foreground">
            Planos & Opções de Upgrade
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Alterne o plano da sua empresa conforme o tamanho da sua equipe e carteira de imóveis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {Object.entries(TACTUS_PLANS).map(([key, plan]) => {
            const isCurrent = currentPlan.id === plan.id
            const price = annualBilling ? plan.priceAnnual : plan.priceMonthly

            return (
              <div
                key={key}
                className={`rounded-3xl border p-5 flex flex-col justify-between transition-all duration-200 relative ${
                  isCurrent
                    ? "border-lime-500/70 bg-gradient-to-b from-lime-500/10 via-card to-card ring-2 ring-lime-500/30 shadow-lg"
                    : plan.popular
                    ? "border-amber-500/50 bg-card shadow-md hover:border-amber-500 hover:shadow-xl"
                    : "border-black/[0.08] dark:border-white/[0.10] bg-card hover:border-foreground/30 shadow-sm"
                }`}
              >
                {/* Badges superiores */}
                <div className="flex items-center justify-between gap-1 mb-3">
                  {isCurrent ? (
                    <span className="rounded-full bg-lime-400 text-black px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider">
                      Plano Atual
                    </span>
                  ) : plan.popular ? (
                    <span className="rounded-full bg-amber-500 text-white px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider">
                      Mais Escolhido
                    </span>
                  ) : plan.badge ? (
                    <span className="rounded-full bg-muted text-muted-foreground px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider">
                      {plan.badge}
                    </span>
                  ) : (
                    <div />
                  )}

                  <span className="text-[10px] font-semibold text-muted-foreground">
                    {plan.brokerLimit}
                  </span>
                </div>

                {/* Nome e Descrição */}
                <div className="space-y-2">
                  <h3 className="text-lg font-black text-foreground">{plan.name}</h3>
                  <p className="text-[11px] text-muted-foreground leading-snug line-clamp-2">
                    {plan.description}
                  </p>
                </div>

                {/* Preço */}
                <div className="py-4 border-y border-border/50 my-4 space-y-1">
                  <div className="flex items-baseline gap-1">
                    <span className="text-xs font-bold text-muted-foreground">R$</span>
                    <span className="text-3xl font-black text-foreground">{price}</span>
                    <span className="text-xs text-muted-foreground font-semibold">/mês</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground font-medium">
                    {annualBilling ? "Faturamento anual (20% OFF)" : "Faturamento mensal sem carência"}
                  </p>

                  <div className="pt-2 flex items-center justify-between text-[11px] text-foreground font-semibold bg-muted/40 rounded-xl px-2.5 py-1 mt-2">
                    <span>Imóveis:</span>
                    <span className="font-bold text-primary">{plan.propertiesLimit}</span>
                  </div>
                </div>

                {/* Lista de Recursos Chave */}
                <div className="space-y-2 flex-1">
                  <p className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">
                    Benefícios Inclusos:
                  </p>
                  <ul className="space-y-1.5 text-xs">
                    {plan.features.slice(0, 6).map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-[11px] text-muted-foreground">
                        <Check className="h-3.5 w-3.5 text-lime-600 dark:text-lime-400 shrink-0 mt-0.5" />
                        <span className="leading-tight">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Botão de Upgrade */}
                <div className="pt-5 mt-auto">
                  {isCurrent ? (
                    <Button
                      disabled
                      className="w-full rounded-2xl bg-lime-400/20 text-lime-800 dark:text-lime-300 border border-lime-400/40 text-xs font-extrabold cursor-default"
                    >
                      <Check className="h-3.5 w-3.5 mr-1.5" />
                      Seu Plano Atual
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleUpgrade(key)}
                      disabled={upgrading !== null}
                      className={`w-full rounded-2xl text-xs font-extrabold shadow-md transition-all hover:scale-102 ${
                        plan.popular
                          ? "bg-amber-500 hover:bg-amber-600 text-white"
                          : "bg-foreground text-background hover:bg-foreground/90"
                      }`}
                    >
                      {upgrading === key ? "Processando..." : plan.ctaText}
                    </Button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Add-ons & Módulos Extras */}
      <div className="space-y-4 pt-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-foreground">
            Add-ons & Módulos Adicionais
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Aumente a capacidade sob medida sem necessidade de mudar de categoria de plano.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PLAN_ADDONS.map((addon) => {
            const isActive = activeAddons.includes(addon.id)

            return (
              <div
                key={addon.id}
                className={`rounded-2xl border p-4 flex flex-col justify-between space-y-3 transition-colors ${
                  isActive
                    ? "border-lime-500/50 bg-lime-500/[0.04]"
                    : "border-black/[0.08] dark:border-white/[0.10] bg-card hover:bg-muted/30"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-extrabold text-foreground">{addon.name}</h4>
                    {isActive && (
                      <span className="text-[9px] font-black uppercase text-lime-700 dark:text-lime-300 bg-lime-400/20 px-2 py-0.5 rounded-full">
                        Ativo
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] font-bold text-foreground mt-1">{addon.price}</p>
                  <p className="text-[11px] text-muted-foreground mt-1 leading-snug">
                    {addon.description}
                  </p>
                </div>

                <Button
                  onClick={() => handleToggleAddon(addon.id)}
                  variant={isActive ? "outline" : "default"}
                  size="sm"
                  className={`w-full rounded-xl text-xs font-bold ${
                    isActive
                      ? "border-red-500/30 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30"
                      : "bg-foreground text-background"
                  }`}
                >
                  {isActive ? "Cancelar Add-on" : "Adicionar à Assinatura"}
                </Button>
              </div>
            )
          })}
        </div>
      </div>

      {/* Histórico de Faturas & Recibos */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-foreground">
              Histórico de Faturas & Recibos
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Comprovantes fiscais e histórico das cobranças mensais.
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-black/[0.08] dark:border-white/[0.12] bg-card overflow-hidden shadow-sm">
          <div className="divide-y divide-border/60">
            {data.invoices?.map((inv: any) => (
              <div
                key={inv.id}
                className="flex items-center justify-between p-4 sm:px-6 hover:bg-muted/40 transition-colors text-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                    <Receipt className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground">{inv.planName}</p>
                    <p className="text-[11px] text-muted-foreground">Fatura paga em {inv.date}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="font-black text-foreground text-sm">{inv.amount}</span>
                  <span className="rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 px-2.5 py-0.5 text-[10px] font-extrabold uppercase">
                    {inv.status}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 rounded-full text-xs font-semibold gap-1 text-muted-foreground hover:text-foreground"
                    onClick={() => alert(`Comprovante ${inv.id} gerado com sucesso.`)}
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Recibo PDF</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

