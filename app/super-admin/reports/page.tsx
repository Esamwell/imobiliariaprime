"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart3, Download, FileSpreadsheet, FileText, Filter, Check } from "lucide-react"

export default function ReportsPage() {
  const [downloading, setDownloading] = useState<string | null>(null)

  const downloadCsv = (reportName: string) => {
    setDownloading(reportName)

    let csvContent = "Relatório: " + reportName + "\nData de Geração: " + new Date().toLocaleString("pt-BR") + "\n\n"
    csvContent += "Item;Referencia;Valor;Status\n"
    csvContent += "1;Assinatura Prime Enterprise;R$ 2.890,00;Pago\n"
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
    <div className="flex-1 space-y-6 p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Relatórios & Analytics</h1>
          <p className="text-sm text-muted-foreground">Exporte métricas de desempenho, crescimento do ecossistema e relatórios contábeis.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => downloadCsv("relatorio_geral_sistema")}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Exportar Geral (CSV)
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Faturamento Anual Previsto</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">R$ 3.414.000</div>
            <p className="text-xs text-muted-foreground mt-1">ARR projetado</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total de Negociações</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8.420</div>
            <p className="text-xs text-muted-foreground mt-1">Negócios fechados no sistema</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Volume Transacionado</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">R$ 142.8 Mi</div>
            <p className="text-xs text-muted-foreground mt-1">VGV gerado pelos clientes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Uptime da Plataforma</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">99.98%</div>
            <p className="text-xs text-muted-foreground mt-1">Últimos 90 dias</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Relatórios Disponíveis para Download</CardTitle>
          <CardDescription>Gere documentos analíticos para auditoria, contabilidade ou gestão estratégica.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="divide-y">
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
                desc: "Consolidação de imóveis ativos, alugados e vendidos na plataforma.",
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
              <div key={rep.id} className="flex flex-col sm:flex-row sm:items-center justify-between py-4 gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary" />
                    <h3 className="font-medium text-sm">{rep.title}</h3>
                    <span className="rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground">{rep.type}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{rep.desc}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => downloadCsv(rep.title)}
                    className="flex items-center gap-1.5 text-xs"
                  >
                    {downloading === rep.title ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-600" /> Baixado!
                      </>
                    ) : (
                      <>
                        <FileSpreadsheet className="h-3.5 w-3.5 text-emerald-600" />
                        Baixar {rep.format}
                      </>
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
