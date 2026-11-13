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
import { Users, Search, Plus, Phone, MessageSquare } from "lucide-react"
import { getWhatsAppLink } from "@/lib/whatsapp"

interface Client {
  id: string
  name: string
  email: string
  phone: string
  type: "Comprador" | "Proprietário" | "Inquilino" | "Investidor"
  interest: string
  budget: string
  broker: string
}

const initialClients: Client[] = [
  {
    id: "1",
    name: "Renata Vasconcelos",
    email: "renata.v@gmail.com",
    phone: "(11) 98765-4321",
    type: "Comprador",
    interest: "Apto 3 Suítes em Jardins ou Vila Nova",
    budget: "Até R$ 2.500.000",
    broker: "Carlos S.",
  },
  {
    id: "2",
    name: "Marcelo Henrique Dias",
    email: "marcelo.dias@empresarial.com",
    phone: "(11) 97654-3210",
    type: "Comprador",
    interest: "Casa Condomínio Fechado Alphaville",
    budget: "Até R$ 5.000.000",
    broker: "Lucas F.",
  },
  {
    id: "3",
    name: "Dra. Flávia Guimarães",
    email: "dra.flavia@medicina.com.br",
    phone: "(11) 99123-4567",
    type: "Inquilino",
    interest: "Cobertura Duplex em Moema",
    budget: "Até R$ 16.000/mês",
    broker: "Carlos S.",
  },
  {
    id: "4",
    name: "Cláudio Fontana",
    email: "claudio.fontana@terra.com.br",
    phone: "(11) 99345-6789",
    type: "Proprietário",
    interest: "3 Apartamentos para Locação em Perdizes",
    budget: "Carteira R$ 3.2M",
    broker: "Mariana A.",
  },
  {
    id: "5",
    name: "Fundo Alpha FII Participações",
    email: "contato@alphafii.com.br",
    phone: "(11) 3045-8800",
    type: "Investidor",
    interest: "Lajes Corporativas e Studios para Renda",
    budget: "R$ 15.000.000+",
    broker: "Carlos S.",
  },
]

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>(initialClients)
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("todos")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Form State
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [type, setType] = useState<"Comprador" | "Proprietário" | "Inquilino" | "Investidor">("Comprador")
  const [interest, setInterest] = useState("")
  const [budget, setBudget] = useState("")

  const handleCreateClient = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !phone) return

    const newClient: Client = {
      id: Date.now().toString(),
      name,
      email: email || "Não informado",
      phone,
      type,
      interest: interest || "Geral",
      budget: budget ? `Até R$ ${budget}` : "A definir",
      broker: "Carlos Silveira",
    }

    setClients([newClient, ...clients])
    setIsDialogOpen(false)
    setName("")
    setEmail("")
    setPhone("")
    setInterest("")
    setBudget("")
  }

  const filtered = clients.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone.includes(searchTerm)
    const matchesType = typeFilter === "todos" || c.type.toLowerCase() === typeFilter.toLowerCase()
    return matchesSearch && matchesType
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Clientes & Leads (CRM)</h1>
          <p className="text-sm text-muted-foreground">
            Base centralizada de compradores, proprietários, investidores e inquilinos da imobiliária.
          </p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Cadastrar Cliente
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Cadastrar Novo Cliente</DialogTitle>
              <DialogDescription>
                Adicione um contato na carteira de clientes com perfil de interesse.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleCreateClient} className="space-y-3.5 pt-2">
              <div className="space-y-1">
                <label className="text-xs font-semibold">Nome Completo</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Gabriela Monteiro"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold">Telefone / WhatsApp</label>
                  <input
                    type="text"
                    required
                    placeholder="(11) 98765-4321"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold">Perfil do Cliente</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as any)}
                    className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  >
                    <option value="Comprador">Comprador</option>
                    <option value="Proprietário">Proprietário</option>
                    <option value="Inquilino">Inquilino</option>
                    <option value="Investidor">Investidor</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold">E-mail</label>
                <input
                  type="email"
                  placeholder="gabriela@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold">Interesse / Região</label>
                  <input
                    type="text"
                    placeholder="Ex: 3 quartos Jardins"
                    value={interest}
                    onChange={(e) => setInterest(e.target.value)}
                    className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold">Orçamento (R$)</label>
                  <input
                    type="text"
                    placeholder="Ex: 2.000.000"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  />
                </div>
              </div>

              <DialogFooter className="pt-3">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit">Salvar Cliente</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar por nome, telefone ou e-mail..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-9 pl-9 pr-3 rounded-md border border-input bg-background text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
            </div>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="h-9 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              <option value="todos">Todos os tipos de cliente</option>
              <option value="comprador">Compradores</option>
              <option value="proprietário">Proprietários</option>
              <option value="inquilino">Inquilinos</option>
              <option value="investidor">Investidores</option>
            </select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b bg-muted/50 text-xs font-semibold text-muted-foreground uppercase">
                <tr>
                  <th className="py-3 px-4">Cliente</th>
                  <th className="py-3 px-4">Tipo</th>
                  <th className="py-3 px-4">Interesse / Busca</th>
                  <th className="py-3 px-4">Orçamento</th>
                  <th className="py-3 px-4">Corretor</th>
                  <th className="py-3 px-4 text-right">Ação Direta</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filtered.map((c) => {
                  const waUrl = getWhatsAppLink(
                    c.phone,
                    `Olá ${c.name}, tudo bem? Sou seu corretor de imóveis. Temos novidades no perfil de imóvel que você está buscando (${c.interest}). Gostaria de dar uma olhada?`
                  )

                  return (
                    <tr key={c.id} className="hover:bg-muted/30 transition-colors">
                      <td className="py-3.5 px-4">
                        <div>
                          <p className="font-semibold text-foreground">{c.name}</p>
                          <p className="text-xs text-muted-foreground">{c.email}</p>
                          <p className="text-xs text-muted-foreground font-mono">{c.phone}</p>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="rounded-full bg-primary/10 text-primary px-2.5 py-0.5 text-xs font-medium">
                          {c.type}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 max-w-xs text-xs font-medium text-muted-foreground">
                        {c.interest}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-emerald-600 text-xs">
                        {c.budget}
                      </td>
                      <td className="py-3.5 px-4 text-xs font-medium">{c.broker}</td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex justify-end gap-1.5">
                          <a
                            href={waUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center h-8 w-8 rounded-md border border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 hover:bg-emerald-100 transition-colors"
                            title="Conversar no WhatsApp"
                          >
                            <MessageSquare className="h-4 w-4" />
                          </a>
                          <a
                            href={`tel:${c.phone.replace(/\D/g, "")}`}
                            className="inline-flex items-center justify-center h-8 w-8 rounded-md border border-input bg-background hover:bg-accent text-primary transition-colors"
                            title="Ligar"
                          >
                            <Phone className="h-4 w-4" />
                          </a>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
