"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bell, Check, Trash2, Building, AlertTriangle, ShieldCheck, Clock } from "lucide-react"

interface Notification {
  id: string
  title: string
  description: string
  time: string
  type: "imobiliaria" | "alerta" | "sistema"
  read: boolean
}

const initialNotifications: Notification[] = [
  {
    id: "1",
    title: "Nova imobiliária cadastrada: Morada & Vida Imóveis",
    description: "A empresa completou o formulário inicial e está no plano Básico aguardando aprovação.",
    time: "há 10 minutos",
    type: "imobiliaria",
    read: false,
  },
  {
    id: "2",
    title: "Uso de CPU atingiu 89% no cluster principal",
    description: "Pico de tráfego detectado durante a sincronização de feeds de portais.",
    time: "há 45 minutos",
    type: "alerta",
    read: false,
  },
  {
    id: "3",
    title: "Backup diário concluído com sucesso",
    description: "Snapshot completo do banco de dados gravado no AWS S3 (1.4 GB).",
    time: "há 3 horas",
    type: "sistema",
    read: false,
  },
  {
    id: "4",
    title: "Fatura paga: Imobiliária Prime - Plano Enterprise",
    description: "Recebimento confirmado via Pix/Boleto: R$ 2.890,00.",
    time: "ontem às 18:30",
    type: "imobiliaria",
    read: true,
  },
  {
    id: "5",
    title: "Renovação automática de certificado SSL",
    description: "Certificado wildcard *.crmimobiliario.com.br renovado para os próximos 90 dias.",
    time: "há 2 dias",
    type: "sistema",
    read: true,
  },
]

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications)
  const [filter, setFilter] = useState("todas")

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const toggleRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n))
    )
  }

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const filtered = notifications.filter((n) => {
    if (filter === "todas") return true
    return n.type === filter
  })

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Central de Notificações</h1>
          <p className="text-sm text-muted-foreground">
            Acompanhe avisos de novas adesões, alertas de estabilidade e cobranças da plataforma.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <Button variant="outline" size="sm" onClick={markAllAsRead} className="flex items-center gap-1.5 text-xs">
              <Check className="h-3.5 w-3.5" /> Marcar todas como lidas ({unreadCount})
            </Button>
          )}
        </div>
      </div>

      <Card>
        <CardHeader className="border-b pb-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Button
                variant={filter === "todas" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("todas")}
                className="text-xs h-8"
              >
                Todas ({notifications.length})
              </Button>
              <Button
                variant={filter === "imobiliaria" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("imobiliaria")}
                className="text-xs h-8"
              >
                Imobiliárias
              </Button>
              <Button
                variant={filter === "alerta" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("alerta")}
                className="text-xs h-8"
              >
                Alertas
              </Button>
              <Button
                variant={filter === "sistema" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("sistema")}
                className="text-xs h-8"
              >
                Sistema
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {filtered.map((item) => (
              <div
                key={item.id}
                className={`flex items-start justify-between p-4 transition-colors ${
                  item.read ? "bg-background" : "bg-primary/5"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`mt-0.5 rounded-lg p-2 ${
                      item.type === "alerta"
                        ? "bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400"
                        : item.type === "imobiliaria"
                        ? "bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400"
                        : "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400"
                    }`}
                  >
                    {item.type === "alerta" && <AlertTriangle className="h-4 w-4" />}
                    {item.type === "imobiliaria" && <Building className="h-4 w-4" />}
                    {item.type === "sistema" && <ShieldCheck className="h-4 w-4" />}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p className={`text-sm ${item.read ? "font-medium" : "font-bold text-foreground"}`}>
                        {item.title}
                      </p>
                      {!item.read && (
                        <span className="h-2 w-2 rounded-full bg-primary" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                    <p className="text-[10px] text-muted-foreground flex items-center gap-1 pt-1">
                      <Clock className="h-3 w-3" /> {item.time}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleRead(item.id)}
                    className="h-8 text-xs text-muted-foreground hover:text-foreground"
                  >
                    {item.read ? "Marcar não lida" : "Marcar lida"}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteNotification(item.id)}
                    className="h-8 w-8 text-muted-foreground hover:text-red-500"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            ))}

            {filtered.length === 0 && (
              <div className="py-12 text-center text-sm text-muted-foreground">
                Nenhuma notificação encontrada nesta categoria.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

