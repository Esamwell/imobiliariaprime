"use client"

import { useState } from "react"
import { 
  Bell, 
  Check, 
  Trash2, 
  Building, 
  AlertTriangle, 
  ShieldCheck, 
  Clock,
  Sparkles,
  CheckCircle2
} from "lucide-react"

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
    <div className="flex-1 space-y-6 p-4 sm:p-6 max-w-7xl mx-auto">
      {/* Header Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              Central de Notificações
            </h1>
            <span className="rounded-full bg-purple-500/10 text-purple-700 dark:text-purple-300 px-2.5 py-0.5 text-[10px] font-black uppercase">
              Alertas
            </span>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Avisos de novas adesões, alertas de estabilidade do servidor e cobranças da plataforma.
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-black/[0.08] dark:border-white/[0.10] bg-muted/40 hover:bg-muted/70 text-xs font-bold text-foreground transition-all"
          >
            <Check className="h-3.5 w-3.5 text-emerald-500" />
            <span>Marcar todas como lidas ({unreadCount})</span>
          </button>
        )}
      </div>

      {/* Filter Tabs & Notifications List */}
      <div className="glass-card rounded-3xl border border-black/[0.06] dark:border-white/[0.08] shadow-sm overflow-hidden p-6 space-y-4">
        <div className="flex flex-wrap items-center gap-2 border-b border-black/[0.06] dark:border-white/[0.08] pb-4">
          <button
            onClick={() => setFilter("todas")}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              filter === "todas"
                ? "bg-foreground text-background shadow-sm"
                : "border border-black/[0.08] dark:border-white/[0.10] bg-muted/30 text-muted-foreground hover:text-foreground"
            }`}
          >
            Todas ({notifications.length})
          </button>
          <button
            onClick={() => setFilter("imobiliaria")}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              filter === "imobiliaria"
                ? "bg-foreground text-background shadow-sm"
                : "border border-black/[0.08] dark:border-white/[0.10] bg-muted/30 text-muted-foreground hover:text-foreground"
            }`}
          >
            Imobiliárias
          </button>
          <button
            onClick={() => setFilter("alerta")}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              filter === "alerta"
                ? "bg-foreground text-background shadow-sm"
                : "border border-black/[0.08] dark:border-white/[0.10] bg-muted/30 text-muted-foreground hover:text-foreground"
            }`}
          >
            Alertas de Infra
          </button>
          <button
            onClick={() => setFilter("sistema")}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              filter === "sistema"
                ? "bg-foreground text-background shadow-sm"
                : "border border-black/[0.08] dark:border-white/[0.10] bg-muted/30 text-muted-foreground hover:text-foreground"
            }`}
          >
            Sistema
          </button>
        </div>

        <div className="divide-y divide-black/[0.04] dark:divide-white/[0.04]">
          {filtered.map((item) => (
            <div
              key={item.id}
              className={`flex items-start justify-between py-4 px-2 rounded-2xl transition-colors ${
                item.read ? "opacity-70 hover:opacity-100" : "bg-muted/20"
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`mt-0.5 rounded-xl p-2.5 shrink-0 ${
                    item.type === "alerta"
                      ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                      : item.type === "imobiliaria"
                      ? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                      : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                  }`}
                >
                  {item.type === "alerta" && <AlertTriangle className="h-4 w-4" />}
                  {item.type === "imobiliaria" && <Building className="h-4 w-4" />}
                  {item.type === "sistema" && <ShieldCheck className="h-4 w-4" />}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className={`text-xs ${item.read ? "font-semibold" : "font-extrabold text-foreground"}`}>
                      {item.title}
                    </p>
                    {!item.read && (
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
                  <p className="text-[10px] text-muted-foreground flex items-center gap-1 pt-0.5">
                    <Clock className="h-3 w-3" /> {item.time}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0 ml-3">
                <button
                  onClick={() => toggleRead(item.id)}
                  className="px-2.5 py-1 rounded-full text-[10px] font-bold text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                >
                  {item.read ? "Marcar não lida" : "Marcar lida"}
                </button>
                <button
                  onClick={() => deleteNotification(item.id)}
                  className="h-7 w-7 rounded-full text-muted-foreground hover:text-rose-500 hover:bg-rose-500/10 flex items-center justify-center transition-colors"
                  title="Excluir notificação"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="py-12 text-center text-xs text-muted-foreground">
              Nenhuma notificação encontrada nesta categoria.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
