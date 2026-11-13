import Link from "next/link"
import { RevenueTrendsChart, TenantGrowthChart } from "./components/dashboard-charts"
import { 
  ArrowUpRight, 
  Building2, 
  UserRound, 
  Wallet, 
  Plus, 
  ShieldAlert, 
  CheckCircle2, 
  Clock, 
  Sparkles,
  TrendingUp,
  Cpu,
  Layers
} from "lucide-react"

export default function SuperAdminDashboard() {
  return (
    <div className="flex-1 space-y-6 p-4 sm:p-6 max-w-7xl mx-auto">
      {/* Header with Title and Nova Imobiliária Button */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              Dashboard Administrativo
            </h1>
            <span className="rounded-full bg-purple-500/20 text-purple-700 dark:text-purple-300 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider">
              SaaS Multi-Empresa
            </span>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Visão consolidada de todas as imobiliárias cadastradas, faturamento MRR e volume de usuários.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/super-admin/tenants"
            className="inline-flex items-center gap-2 rounded-full bg-foreground text-background hover:bg-foreground/90 px-5 py-2.5 text-xs font-bold shadow-md transition-all hover:scale-102"
          >
            <Plus className="h-4 w-4" />
            Nova Imobiliária
          </Link>
        </div>
      </div>

      {/* KPI Cards in Apple Prime Glass */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        {/* Card 1: Imobiliárias Ativas */}
        <div className="glass-card glass-card-hover rounded-3xl p-4 sm:p-5 flex flex-col justify-between border border-black/[0.06] dark:border-white/[0.08]">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
              Imobiliárias Ativas
            </span>
            <div className="h-8 w-8 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Building2 className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">
              210
            </div>
            <div className="flex items-center gap-1 mt-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">
              <ArrowUpRight className="h-3.5 w-3.5" />
              <span>+12% vs mês anterior</span>
            </div>
          </div>
        </div>
        
        {/* Card 2: Usuários Ativos */}
        <div className="glass-card glass-card-hover rounded-3xl p-4 sm:p-5 flex flex-col justify-between border border-black/[0.06] dark:border-white/[0.08]">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
              Usuários & Corretores
            </span>
            <div className="h-8 w-8 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <UserRound className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">
              2.345
            </div>
            <div className="flex items-center gap-1 mt-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">
              <ArrowUpRight className="h-3.5 w-3.5" />
              <span>+5.2% vs mês anterior</span>
            </div>
          </div>
        </div>
        
        {/* Card 3: Receita Mensal */}
        <div className="glass-card glass-card-hover rounded-3xl p-4 sm:p-5 flex flex-col justify-between border border-black/[0.06] dark:border-white/[0.08]">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
              Receita Mensal (MRR)
            </span>
            <div className="h-8 w-8 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <Wallet className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">
              R$ 284.500
            </div>
            <div className="flex items-center gap-1 mt-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">
              <ArrowUpRight className="h-3.5 w-3.5" />
              <span>+8.1% vs mês anterior</span>
            </div>
          </div>
        </div>
        
        {/* Card 4: Ticket Médio */}
        <div className="glass-card glass-card-hover rounded-3xl p-4 sm:p-5 flex flex-col justify-between border border-black/[0.06] dark:border-white/[0.08]">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
              Ticket Médio
            </span>
            <div className="h-8 w-8 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <TrendingUp className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">
              R$ 1.350
            </div>
            <div className="flex items-center gap-1 mt-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">
              <ArrowUpRight className="h-3.5 w-3.5" />
              <span>+2.5% vs mês anterior</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Charts Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        <TenantGrowthChart />
        <RevenueTrendsChart />
      </div>
      
      {/* Activities and Alerts in Apple Glass */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Activities */}
        <div className="glass-card rounded-3xl border border-black/[0.06] dark:border-white/[0.08] p-6 shadow-sm space-y-4">
          <div>
            <h3 className="text-base font-extrabold text-foreground flex items-center gap-2">
              <Layers className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              Atividades Recentes
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">Cadastros e atualizações de planos em tempo real</p>
          </div>

          <div className="space-y-2.5">
            {[
              { title: "Nova imobiliária cadastrada: Alpha Imóveis Jardins", time: "Há 12 minutos", plan: "Plano Prime" },
              { title: "Upgrade de assinatura: Imobiliária Morumbi Prime para Plano Master VIP", time: "Há 45 minutos", plan: "Master VIP" },
              { title: "Novo corretor autônomo: Roberto Mendes (CRECI 52.880)", time: "Há 2 horas", plan: "Autônomo" },
              { title: "Renovação automática de plano anual: Prime Real Estate", time: "Há 3 horas", plan: "Plano Prime" },
              { title: "Nova vitrine pública ativada: /v/marcelo-imoveis", time: "Há 5 horas", plan: "Autônomo" },
            ].map((act, i) => (
              <div 
                key={i} 
                className="flex items-center justify-between p-3.5 rounded-2xl border border-black/[0.04] dark:border-white/[0.06] bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-foreground leading-tight">
                    {act.title}
                  </p>
                  <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                    <Clock className="h-2.5 w-2.5" /> {act.time}
                  </p>
                </div>
                <span className="rounded-full bg-purple-500/10 text-purple-700 dark:text-purple-300 px-2 py-0.5 text-[10px] font-bold shrink-0 ml-2">
                  {act.plan}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        {/* System Alerts */}
        <div className="glass-card rounded-3xl border border-black/[0.06] dark:border-white/[0.08] p-6 shadow-sm space-y-4">
          <div>
            <h3 className="text-base font-extrabold text-foreground flex items-center gap-2">
              <ShieldAlert className="h-4 w-4 text-amber-500" />
              Alertas do Sistema & Servidores
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">Monitoramento de infraestrutura em nuvem e integridade</p>
          </div>

          <div className="space-y-2.5">
            <div className="flex items-start gap-3 rounded-2xl border border-amber-500/20 bg-amber-500/10 p-3.5">
              <Cpu className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <p className="text-xs font-bold text-amber-900 dark:text-amber-200">Uso de Memória e CPU Estável</p>
                <p className="text-[11px] text-amber-800/80 dark:text-amber-300/80 leading-relaxed">
                  Servidores operando com 42% de carga média no cluster de produção.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-3.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <p className="text-xs font-bold text-emerald-900 dark:text-emerald-200">Backup Automático Concluído</p>
                <p className="text-[11px] text-emerald-800/80 dark:text-emerald-300/80 leading-relaxed">
                  Snapshot diário do PostgreSQL e banco de dados multi-tenant salvo às 03:00 UTC.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-2xl border border-blue-500/20 bg-blue-500/10 p-3.5">
              <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <p className="text-xs font-bold text-blue-900 dark:text-blue-200">Sincronização de Notificações PWA</p>
                <p className="text-[11px] text-blue-800/80 dark:text-blue-300/80 leading-relaxed">
                  Serviço de Push Web funcionando normalmente para iOS e Android.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
