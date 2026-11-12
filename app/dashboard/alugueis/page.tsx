"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Key, Plus, CheckCircle2, Clock, AlertTriangle, FileText, Printer, Check } from "lucide-react"

interface RentalContract {
  id: string
  property: string
  tenant: string
  owner: string
  rentValue: string
  condoValue: string
  dueDay: number
  status: "Pago" | "Pendente" | "Atrasado"
  nextIndexAdjustment: string
}

const initialRentals: RentalContract[] = [
  {
    id: "LOC-01",
    property: "Cobertura Duplex - Moema Pássaros (CB0089)",
    tenant: "Dra. Flávia Guimarães",
    owner: "Espólio Roberto Marinho Filho",
    rentValue: "R$ 14.500",
    condoValue: "R$ 2.800",
    dueDay: 10,
    status: "Pago",
    nextIndexAdjustment: "Out/2027 (IPCA)",
  },
  {
    id: "LOC-02",
    property: "Studio Mobiliado - Pinheiros (AP0552)",
    tenant: "Marcos Paulo Siqueira",
    owner: "Investimentos Imobiliários S.A.",
    rentValue: "R$ 4.200",
    condoValue: "R$ 680",
    dueDay: 15,
    status: "Pendente",
    nextIndexAdjustment: "Jan/2027 (IGP-M)",
  },
  {
    id: "LOC-03",
    property: "Apartamento 2 Quartos - Perdizes (AP0210)",
    tenant: "Larissa Menezes",
    owner: "Cláudio Fontana",
    rentValue: "R$ 3.800",
    condoValue: "R$ 750",
    dueDay: 5,
    status: "Atrasado",
    nextIndexAdjustment: "Mar/2027 (IPCA)",
  },
  {
    id: "LOC-04",
    property: "Conjunto Comercial - Itaim Bibi (CM0012)",
    tenant: "StartUp Tecnologia & Cloud",
    owner: "Fundo Imobiliário Alpha FII",
    rentValue: "R$ 8.900",
    condoValue: "R$ 1.950",
    dueDay: 10,
    status: "Pago",
    nextIndexAdjustment: "Jul/2027 (IPCA)",
  },
]

export default function RentalsPage() {
  const [rentals, setRentals] = useState<RentalContract[]>(initialRentals)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [activeRental, setActiveRental] = useState<RentalContract | null>(null)

  // Form State
  const [property, setProperty] = useState("")
  const [tenant, setTenant] = useState("")
  const [owner, setOwner] = useState("")
  const [rentValue, setRentValue] = useState("")
  const [dueDay, setDueDay] = useState("10")
  const [index, setIndex] = useState("IPCA")

  const handleCreateRental = (e: React.FormEvent) => {
    e.preventDefault()
    if (!property || !tenant) return

    const newContract: RentalContract = {
      id: `LOC-${Math.floor(10 + Math.random() * 90)}`,
      property,
      tenant,
      owner: owner || "Proprietário Cadastrado",
      rentValue: rentValue.startsWith("R$") ? rentValue : `R$ ${rentValue}`,
      condoValue: "R$ 0",
      dueDay: parseInt(dueDay) || 10,
      status: "Pendente",
      nextIndexAdjustment: `Nov/2027 (${index})`,
    }

    setRentals([newContract, ...rentals])
    setIsDialogOpen(false)
    setProperty("")
    setTenant("")
    setOwner("")
    setRentValue("")
  }

  const togglePayment = (id: string) => {
    setRentals((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          const next = r.status === "Pago" ? "Pendente" : "Pago"
          return { ...r, status: next }
        }
        return r
      })
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestão de Aluguéis & Contratos</h1>
          <p className="text-sm text-muted-foreground">
            Controle de inquilinos, proprietários, cobranças de boletos e repasses imobiliários.
          </p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Novo Contrato de Locação
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Novo Contrato de Locação</DialogTitle>
              <DialogDescription>
                Cadastre as informações da locação para acompanhar vencimentos e reajustes.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleCreateRental} className="space-y-3.5 pt-2">
              <div className="space-y-1">
                <label className="text-xs font-semibold">Imóvel Locado</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Apartamento Jardins (AP0420)"
                  value={property}
                  onChange={(e) => setProperty(e.target.value)}
                  className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold">Nome do Inquilino</label>
                  <input
                    type="text"
                    required
                    placeholder="Nome completo"
                    value={tenant}
                    onChange={(e) => setTenant(e.target.value)}
                    className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold">Proprietário (Locador)</label>
                  <input
                    type="text"
                    required
                    placeholder="Nome completo"
                    value={owner}
                    onChange={(e) => setOwner(e.target.value)}
                    className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold">Aluguel (R$)</label>
                  <input
                    type="text"
                    required
                    placeholder="4.500"
                    value={rentValue}
                    onChange={(e) => setRentValue(e.target.value)}
                    className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold">Dia Vencimento</label>
                  <input
                    type="number"
                    min="1"
                    max="31"
                    value={dueDay}
                    onChange={(e) => setDueDay(e.target.value)}
                    className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold">Índice</label>
                  <select
                    value={index}
                    onChange={(e) => setIndex(e.target.value)}
                    className="w-full h-9 rounded-md border border-input bg-background px-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  >
                    <option value="IPCA">IPCA</option>
                    <option value="IGP-M">IGP-M</option>
                  </select>
                </div>
              </div>

              <DialogFooter className="pt-3">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit">Emitir Contrato</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Contratos Ativos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{rentals.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Locações sob gestão</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Faturamento Mensal Locação</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">R$ 498.000</div>
            <p className="text-xs text-muted-foreground mt-1">Taxa de adm média: 8%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Adm (Receita CRM)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">R$ 39.840</div>
            <p className="text-xs text-emerald-600 mt-1">+4.5% este mês</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Inadimplência</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-500">
              {rentals.filter((r) => r.status === "Atrasado").length > 0 ? "1.5%" : "0.0%"}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Cobranças em atraso</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Carteira de Locações</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b bg-muted/50 text-xs font-semibold text-muted-foreground uppercase">
                <tr>
                  <th className="py-3 px-4">Contrato & Imóvel</th>
                  <th className="py-3 px-4">Inquilino</th>
                  <th className="py-3 px-4">Proprietário</th>
                  <th className="py-3 px-4">Aluguel</th>
                  <th className="py-3 px-4">Vencimento</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Reajuste</th>
                  <th className="py-3 px-4 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {rentals.map((r) => (
                  <tr key={r.id} className="hover:bg-muted/30 transition-colors">
                    <td className="py-3.5 px-4 font-medium">
                      <div className="space-y-0.5">
                        <span className="font-semibold text-foreground text-xs font-mono">{r.id}</span>
                        <p className="text-xs text-muted-foreground line-clamp-1">{r.property}</p>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-medium">{r.tenant}</td>
                    <td className="py-3.5 px-4 text-muted-foreground">{r.owner}</td>
                    <td className="py-3.5 px-4 font-bold text-emerald-600">{r.rentValue}</td>
                    <td className="py-3.5 px-4">Todo dia {r.dueDay}</td>
                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => togglePayment(r.id)}
                        className="hover:opacity-80 transition-opacity"
                        title="Clique para alternar status de pagamento"
                      >
                        {r.status === "Pago" && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs px-2 py-0.5 font-medium">
                            <CheckCircle2 className="h-3 w-3" /> Pago
                          </span>
                        )}
                        {r.status === "Pendente" && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs px-2 py-0.5 font-medium">
                            <Clock className="h-3 w-3" /> A Vencer
                          </span>
                        )}
                        {r.status === "Atrasado" && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300 text-xs px-2 py-0.5 font-medium">
                            <AlertTriangle className="h-3 w-3" /> Em Atraso
                          </span>
                        )}
                      </button>
                    </td>
                    <td className="py-3.5 px-4 text-xs text-muted-foreground">{r.nextIndexAdjustment}</td>
                    <td className="py-3.5 px-4 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setActiveRental(r)}
                        className="h-8 text-xs flex items-center gap-1"
                      >
                        <FileText className="h-3.5 w-3.5" /> Ficha
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Contract Details Dialog */}
      {activeRental && (
        <Dialog open={Boolean(activeRental)} onOpenChange={() => setActiveRental(null)}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Ficha do Contrato {activeRental.id}
              </DialogTitle>
              <DialogDescription>
                Resumo operacional e jurídico do contrato de locação ativo.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3 py-2 text-sm">
              <div className="rounded-lg border p-3 space-y-1 bg-muted/30">
                <p className="text-xs font-semibold text-muted-foreground uppercase">Imóvel</p>
                <p className="font-medium text-foreground">{activeRental.property}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg border p-3 space-y-0.5">
                  <p className="text-xs font-semibold text-muted-foreground uppercase">Locatário (Inquilino)</p>
                  <p className="font-semibold text-foreground">{activeRental.tenant}</p>
                </div>
                <div className="rounded-lg border p-3 space-y-0.5">
                  <p className="text-xs font-semibold text-muted-foreground uppercase">Locador (Proprietário)</p>
                  <p className="font-semibold text-foreground">{activeRental.owner}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-lg border p-3 space-y-0.5">
                  <p className="text-xs font-semibold text-muted-foreground uppercase">Aluguel</p>
                  <p className="font-bold text-emerald-600">{activeRental.rentValue}</p>
                </div>
                <div className="rounded-lg border p-3 space-y-0.5">
                  <p className="text-xs font-semibold text-muted-foreground uppercase">Vencimento</p>
                  <p className="font-semibold">Dia {activeRental.dueDay}</p>
                </div>
                <div className="rounded-lg border p-3 space-y-0.5">
                  <p className="text-xs font-semibold text-muted-foreground uppercase">Reajuste</p>
                  <p className="font-semibold text-xs">{activeRental.nextIndexAdjustment}</p>
                </div>
              </div>
            </div>

            <DialogFooter className="pt-2">
              <Button variant="outline" onClick={() => window.print()} className="flex items-center gap-1.5">
                <Printer className="h-4 w-4" /> Imprimir Ficha
              </Button>
              <Button onClick={() => setActiveRental(null)}>Fechar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
