"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DollarSign, TrendingUp, ArrowUpRight, CheckCircle2, Clock, Wallet, FileSpreadsheet, Check } from "lucide-react"

interface Commission {
  id: string
  deal: string
  broker: string
  dealValue: string
  rate: string
  brokerCommission: string
  agencyNet: string
  status: "Pago" | "Aguardando Escritura" | "A Liberar"
  date: string
}

const mockCommissions: Commission[] = [
  {
    id: "COM-881",
    deal: "Venda - Apartamento Perdizes (AP0310)",
    broker: "Mariana Alencar",
    dealValue: "R$ 1.150.000",
    rate: "6%",
    brokerCommission: "R$ 34.500",
    agencyNet: "R$ 34.500",
    status: "Pago",
    date: "04/11/2026",
  },
  {
    id: "COM-882",
    deal: "Venda - Apartamento Jardins (AP0102)",
    broker: "Carlos Silveira",
    dealValue: "R$ 2.450.000",
    rate: "6%",
    brokerCommission: "R$ 73.500",
    agencyNet: "R$ 73.500",
    status: "Aguardando Escritura",
    date: "Previsto 20/11/2026",
  },
  {
    id: "COM-883",
    deal: "Locação - Cobertura Moema (CB0089)",
    broker: "Carlos Silveira",
    dealValue: "R$ 14.500 /mês",
    rate: "100% 1º aluguel",
    brokerCommission: "R$ 7.250",
    agencyNet: "R$ 7.250",
    status: "Pago",
    date: "01/11/2026",
  },
  {
    id: "COM-884",
    deal: "Venda - Mansão Alphaville (CS0118)",
    broker: "Lucas Farias",
    dealValue: "R$ 4.900.000",
    rate: "5%",
    brokerCommission: "R$ 122.500",
    agencyNet: "R$ 122.500",
    status: "A Liberar",
    date: "Previsto 30/11/2026",
  },
]

export default function FinancialPage() {
  const [downloading, setDownloading] = useState(false)

  const handleExport = () => {
    setDownloading(true)

    let csv = "Extrato Financeiro e Honorários - Tactus CRM\n"
    csv += "Data de Emissão: " + new Date().toLocaleString("pt-BR") + "\n\n"
    csv += "Ref;Negociação;Corretor;Valor Negócio;Taxa;Comissão Corretor;Imobiliária;Status;Data\n"

    mockCommissions.forEach((c) => {
      csv += `${c.id};${c.deal};${c.broker};${c.dealValue};${c.rate};${c.brokerCommission};${c.agencyNet};${c.status};${c.date}\n`
    })

    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `extrato_comissoes_${new Date().toISOString().slice(0, 10)}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)

    setTimeout(() => setDownloading(false), 1500)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Financeiro & Comissões</h1>
          <p className="text-sm text-muted-foreground">
            Extrato de repasses, cálculo automático de honorários de corretagem e faturamento da imobiliária.
          </p>
        </div>
        <Button onClick={handleExport} variant="outline" className="flex items-center gap-2">
          {downloading ? <Check className="h-4 w-4 text-emerald-600" /> : <FileSpreadsheet className="h-4 w-4" />}
          {downloading ? "Extrato Baixado!" : "Exportar Extrato (CSV)"}
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Comissões Pagas no Mês</CardTitle>
            <DollarSign className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 115.250</div>
            <p className="text-xs text-emerald-600 flex items-center gap-1 mt-1">
              <ArrowUpRight className="h-3 w-3" /> +14.2% vs mês anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">A Receber / Em Cartório</CardTitle>
            <Clock className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-500">R$ 196.000</div>
            <p className="text-xs text-muted-foreground mt-1">2 escrituras agendadas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Receita Líquida Imobiliária</CardTitle>
            <Wallet className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 155.090</div>
            <p className="text-xs text-muted-foreground mt-1">Comissões + Taxas de Adm</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Ticket Médio de Comissão</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 58.900</div>
            <p className="text-xs text-muted-foreground mt-1">Por negociação fechada</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Comissões e Honorários Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b bg-muted/50 text-xs font-semibold text-muted-foreground uppercase">
                <tr>
                  <th className="py-3 px-4">Referência / Negociação</th>
                  <th className="py-3 px-4">Corretor</th>
                  <th className="py-3 px-4">Valor Imóvel</th>
                  <th className="py-3 px-4">Taxa</th>
                  <th className="py-3 px-4">Comissão Corretor</th>
                  <th className="py-3 px-4">Parte Imobiliária</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Data / Previsão</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {mockCommissions.map((c) => (
                  <tr key={c.id} className="hover:bg-muted/30 transition-colors">
                    <td className="py-3.5 px-4 font-medium">
                      <span className="font-mono text-xs font-semibold block">{c.id}</span>
                      <span className="text-xs text-muted-foreground">{c.deal}</span>
                    </td>
                    <td className="py-3.5 px-4 font-medium">{c.broker}</td>
                    <td className="py-3.5 px-4 font-bold">{c.dealValue}</td>
                    <td className="py-3.5 px-4 text-xs font-semibold">{c.rate}</td>
                    <td className="py-3.5 px-4 font-bold text-emerald-600">{c.brokerCommission}</td>
                    <td className="py-3.5 px-4 font-semibold text-primary">{c.agencyNet}</td>
                    <td className="py-3.5 px-4">
                      {c.status === "Pago" && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs px-2.5 py-0.5 font-medium">
                          <CheckCircle2 className="h-3 w-3" /> Pago
                        </span>
                      )}
                      {c.status === "Aguardando Escritura" && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 text-xs px-2.5 py-0.5 font-medium">
                          <Clock className="h-3 w-3" /> Em Cartório
                        </span>
                      )}
                      {c.status === "A Liberar" && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs px-2.5 py-0.5 font-medium">
                          <Clock className="h-3 w-3" /> A Liberar
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right text-xs text-muted-foreground">{c.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
