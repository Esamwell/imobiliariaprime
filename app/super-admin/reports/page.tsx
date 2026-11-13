"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { 
  BarChart3, 
  Download, 
  FileSpreadsheet, 
  FileText, 
  Filter, 
  Check, 
  DollarSign, 
  TrendingUp, 
  ShieldCheck, 
  Building2,
  Layers,
  ArrowUpRight
} from "lucide-react"

export default function ReportsPage() {
  const [downloading, setDownloading] = useState<string | null>(null)

  const downloadCsv = (reportName: string) => {
    setDownloading(reportName)

    let csvContent = "Relatório: " + reportName + "\nData de Geração: " + new Date().toLocaleString("pt-BR") + "\n\n"
    csvContent += "Item;Referencia;Valor;Status\n"
    csvContent += "1;Assinatura Tactus Enterprise;R$ 2.890,00;Pago\n"
    csvContent += "2;Assinatura Horizonte Profissional;R$ 1.250,00;Pago\n"
    csvContent += "3;Assinatura Metropole Enterprise;R$ 2.890,00;Pago\n"
    csvContent += "4;Assinatura Morada Basico;R$ 490,00;Pendente\n"

    const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${reportName.toLowerCase().replace(/[^a-z0-9]/g, "_")}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)

    setTimeout(() => setDownloading(null), 1500)
  }

  return (
    <div className="flex-1 space-y-6 p-4 sm:p-6 max-w-7xl mx-auto">
      {/* Header Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              Relatórios & Analytics
            </h1>
            <span className="rounded-full bg-purple-500/10 text-purple-700 dark:text-purple-300 px-2.5 py-0.5 text-[10px] font-black uppercase">
              Inteligência
            </span>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Exporte métricas de faturamento consolidado, crescimento do ecossistema e relatórios contábeis em CSV.
          </p>
        </div>

        <button
          onClick={() => downloadCsv("relatorio_geral_sistema")}
          className="inline-flex items-center gap-2 rounded-full bg-foreground text-background hover:bg-foreground/90 px-5 py-2.5 text-xs font-bold shadow-md transition-all hover:scale-102"
        >
          <Download className="h-4 w-4" />
          <span>Exportar Geral (CSV)</span>
        </button>
      </div>

      {/* KPI Cards in Apple Prime Glass */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        <div className="glass-card glass-card-hover rounded-3xl p-4 sm:p-5 flex flex-col justify-between border border-black/[0.06] dark:border-white/[0.08]">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
              ARR Projetado
            </span>
            <div className="h-8 w-8 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <DollarSign className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-black tracking-tight text-emerald-600 dark:text-emerald-400">
              R$ 3.414.000
            </div>
            <p className="text-[11px] text-muted-foreground mt-0.5">Faturamento anual previsto</p>
          </div>
        </div>

        <div className="glass-card glass-card-hover rounded-3xl p-4 sm:p-5 flex flex-col justify-between border border-black/[0.06] dark:border-white/[0.08]">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
              Deals Fechados
            </span>
            <div className="h-8 w-8 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <TrendingUp className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">
              8.420
            </div>
            <p className="text-[11px] text-muted-foreground mt-0.5">Negócios no sistema</p>
          </div>
        </div>

        <div className="glass-card glass-card-hover rounded-3xl p-4 sm:p-5 flex flex-col justify-between border border-black/[0.06] dark:border-white/[0.08]">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
              VGV Transacionado
            </span>
            <div className="h-8 w-8 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <Building2 className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">
              R$ 142.8 Mi
            </div>
            <p className="text-[11px] text-muted-foreground mt-0.5">Volume dos clientes</p>
          </div>
        </div>

        <div className="glass-card glass-card-hover rounded-3xl p-4 sm:p-5 flex flex-col justify-between border border-black/[0.06] dark:border-white/[0.08]">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
              Uptime do Cluster
            </span>
            <div className="h-8 w-8 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <ShieldCheck className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-black tracking-tight text-emerald-600 dark:text-emerald-400">
              99.98%
            </div>
            <p className="text-[11px] text-muted-foreground mt-0.5">Últimos 90 dias</p>
          </div>
        </div>
      </div>

      {/* Reports List Card in Apple Prime Glass */}
      <div className="glass-card rounded-3xl border border-black/[0.06] dark:border-white/[0.08] shadow-sm overflow-hidden p-6">
        <div className="mb-4">
          <h3 className="text-base font-extrabold text-foreground">Relatórios Disponíveis para Download</h3>
          <p className="text-xs text-muted-foreground">Gere documentos analíticos para auditoria, contabilidade ou gestão estratégica</p>
        </div>

        <div className="divide-y divide-black/[0.04] dark:divide-white/[0.04]">
          {[
            {
              id: "dre",
              title: "Demonstrativo de Receitas e Faturamento (DRE)",
              desc: "Detalhamento de assinaturas pagas, inadimplência e projeções financeiras.",
              type: "Financeiro",
              format: "CSV / Planilha",
            },
            {
              id: "crescimento",
              title: "Relatório de Crescimento e Retenção (Cohort & Churn)",
              desc: "Análise de ciclo de vida das imobiliárias, adesão de novos corretores e taxa de churn.",
              type: "Métricas",
              format: "CSV / Planilha",
            },
            {
              id: "imoveis",
              title: "Inventário Global de Imóveis e Carteira",
              desc: "Consolidação de imóveis ativos, alugados e vendidos em todo o país.",
              type: "Operacional",
              format: "CSV / Planilha",
            },
            {
              id: "auditoria",
              title: "Log de Atividades e Auditoria de Segurança",
              desc: "Histórico completo de acessos, alterações de permissões e tentativas de login.",
              type: "Segurança",
              format: "CSV / Log",
            },
          ].map((rep) => (
            <div key={rep.id} className="flex flex-col sm:flex-row sm:items-center justify-between py-4 gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                  <h4 className="font-bold text-xs text-foreground">{rep.title}</h4>
                  <span className="rounded-full bg-muted/60 px-2 py-0.5 text-[10px] font-bold text-muted-foreground">
                    {rep.type}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">{rep.desc}</p>
              </div>

              <div>
                <button
                  onClick={() => downloadCsv(rep.title)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-black/[0.08] dark:border-white/[0.10] bg-muted/30 hover:bg-muted/60 text-xs font-bold text-foreground transition-all"
                >
                  {downloading === rep.title ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-500" /> Baixado!
                    </>
                  ) : (
                    <>
                      <FileSpreadsheet className="h-3.5 w-3.5 text-emerald-500" />
                      Baixar {rep.format}
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
