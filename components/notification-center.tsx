"use client"

import { useState, useEffect } from "react"
import { Bell, Check, Sparkles, AlertCircle, Send, CheckCircle2, Clock, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface NotificationItem {
  id: string
  title: string
  body: string
  time: string
  unread: boolean
  type: "lead" | "visit" | "proposal" | "system"
}

const initialNotifications: NotificationItem[] = [
  {
    id: "1",
    title: "Visita Confirmada com Cliente",
    body: "Dr. Marcelo confirmou presença para a visita das 10:00 na Mansão Alphaville.",
    time: "Há 12 min",
    unread: true,
    type: "visit",
  },
  {
    id: "2",
    title: "Novo Lead Quente Cadastrado",
    body: "Renata Vasconcelos demonstrou interesse no Apto Jardins (Orçamento R$ 1.850.000).",
    time: "Há 34 min",
    unread: true,
    type: "lead",
  },
  {
    id: "3",
    title: "Proposta em Negociação",
    body: "Dra. Flávia Guimarães solicitou minuta da proposta comercial para a Cobertura Moema.",
    time: "Há 2 horas",
    unread: false,
    type: "proposal",
  },
]

export function NotificationCenter() {
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications)
  const [permission, setPermission] = useState<NotificationPermission>("default")
  const [testSent, setTestSent] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined" && "Notification" in window) {
      setPermission(Notification.permission)
    }
  }, [])

  const unreadCount = notifications.filter((n) => n.unread).length

  // Solicitar permissão nativa de Push Notification (compatível com Android e iOS 16.4+)
  const requestPushPermission = async () => {
    if (typeof window === "undefined" || !("Notification" in window)) {
      alert("Seu navegador não suporta notificações de sistema.")
      return
    }

    try {
      const res = await Notification.requestPermission()
      setPermission(res)
      if (res === "granted") {
        triggerNativeNotification(
          "Notificações Ativadas!",
          "Você receberá alertas instantâneos de novos leads e visitas no seu celular."
        )
      }
    } catch (err) {
      console.warn("Erro ao solicitar permissão de notificação:", err)
    }
  }

  // Disparar Notificação Nativa no Aparelho
  const triggerNativeNotification = (title: string, body: string) => {
    if (typeof window === "undefined") return

    if ("serviceWorker" in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        type: "SHOW_NOTIFICATION",
        title,
        body,
        url: "/dashboard",
      })
    } else if ("Notification" in window && Notification.permission === "granted") {
      new Notification(title, {
        body,
        icon: "/icons/icon-192.svg",
      })
    }
  }

  const handleTestNotification = () => {
    setTestSent(true)
    triggerNativeNotification(
      "🔥 Novo Lead: Marcelo Dias",
      "Novo cliente com orçamento de R$ 4.900.000 aguardando retorno imediato no Prime CRM!"
    )
    setTimeout(() => setTestSent(false), 3000)
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })))
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button
          className="relative h-9 w-9 rounded-full border border-black/[0.08] dark:border-white/[0.12] bg-white/70 dark:bg-white/[0.05] hover:bg-black/5 dark:hover:bg-white/10 flex items-center justify-center transition-all hover:scale-105"
          title="Notificações e Alertas PWA"
        >
          <Bell className="h-4 w-4 text-foreground" />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 px-1 items-center justify-center rounded-full bg-lime-400 text-black text-[9px] font-black shadow-sm">
              {unreadCount}
            </span>
          )}
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-md rounded-3xl p-6">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg font-black text-foreground flex items-center gap-2">
              <Bell className="h-4 w-4 text-lime-600 dark:text-lime-400" />
              Notificações do Sistema
            </DialogTitle>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-[11px] font-semibold text-muted-foreground hover:text-foreground"
              >
                Marcar lidas
              </button>
            )}
          </div>
          <DialogDescription className="text-xs text-muted-foreground">
            Alertas em tempo real sobre leads, visitas e propostas.
          </DialogDescription>
        </DialogHeader>

        {/* PWA Native Push Card */}
        <div className="rounded-2xl border border-black/[0.08] dark:border-white/[0.12] bg-muted/40 p-4 space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Smartphone className="h-4 w-4 text-foreground" />
              <span className="text-xs font-bold text-foreground">Alertas Push no Celular</span>
            </div>
            {permission === "granted" ? (
              <span className="rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 text-[10px] font-bold flex items-center gap-1">
                <Check className="h-2.5 w-2.5" /> Ativo
              </span>
            ) : (
              <span className="rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-300 px-2 py-0.5 text-[10px] font-bold">
                Pendente
              </span>
            )}
          </div>

          <p className="text-[11px] text-muted-foreground leading-relaxed">
            Funciona nativamente no Android e no iOS (iPhone/iPad). No iPhone, adicione o app à Tela de Início pelo Safari para alertas na tela bloqueada.
          </p>

          <div className="pt-1 flex items-center gap-2 flex-wrap">
            {permission !== "granted" ? (
              <Button
                onClick={requestPushPermission}
                size="sm"
                className="rounded-full h-8 px-4 text-xs font-bold bg-lime-400 hover:bg-lime-300 text-black shadow-sm"
              >
                Ativar Notificações no Celular
              </Button>
            ) : (
              <Button
                onClick={handleTestNotification}
                size="sm"
                disabled={testSent}
                className="rounded-full h-8 px-4 text-xs font-bold bg-foreground text-background hover:bg-foreground/90 shadow-sm flex items-center gap-1.5"
              >
                <Send className="h-3 w-3" />
                {testSent ? "Disparado no seu aparelho!" : "Disparar Alerta de Teste"}
              </Button>
            )}
          </div>
        </div>

        {/* Notifications Feed */}
        <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
          {notifications.map((item) => (
            <div
              key={item.id}
              className={`rounded-2xl p-3 border transition-colors ${
                item.unread
                  ? "bg-white/80 dark:bg-white/[0.06] border-black/[0.08] dark:border-white/[0.12] shadow-sm"
                  : "bg-muted/20 border-transparent text-muted-foreground"
              }`}
            >
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-foreground leading-tight flex items-center gap-1.5">
                  {item.unread && (
                    <span className="h-2 w-2 rounded-full bg-lime-500 inline-block"></span>
                  )}
                  {item.title}
                </h4>
                <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                  <Clock className="h-2.5 w-2.5" /> {item.time}
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground mt-1 leading-snug">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
