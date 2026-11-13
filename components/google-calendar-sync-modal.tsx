"use client"

import { useState, useEffect } from "react"
import { 
  Calendar as CalendarIcon, 
  Check, 
  RefreshCw, 
  ExternalLink, 
  AlertCircle, 
  Sparkles, 
  Settings2, 
  CheckCircle2, 
  X,
  Bell,
  MapPin,
  Clock,
  UserCheck
} from "lucide-react"
import { Button } from "@/components/ui/button"

interface GoogleCalendarSyncModalProps {
  isOpen: boolean
  onClose: () => void
  onSyncCompleted?: () => void
}

export function GoogleCalendarSyncModal({
  isOpen,
  onClose,
  onSyncCompleted,
}: GoogleCalendarSyncModalProps) {
  const [connected, setConnected] = useState(true)
  const [accountEmail, setAccountEmail] = useState("carlos.silveira@tactus.com.br")
  const [syncing, setSyncing] = useState(false)
  const [syncSuccess, setSyncSuccess] = useState(false)
  const [autoSync, setAutoSync] = useState(true)
  const [inviteClients, setInviteClients] = useState(true)
  const [includeGps, setIncludeGps] = useState(true)

  const handleSyncNow = async () => {
    setSyncing(true)
    setSyncSuccess(false)
    try {
      await fetch("/api/calendar/google/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: "Sincronização em Lote - Tactus CRM",
          time: "10:00",
          location: "São Paulo, SP",
          notes: "Atualização de todas as visitas agendadas no dia."
        })
      })
      setTimeout(() => {
        setSyncing(false)
        setSyncSuccess(true)
        if (onSyncCompleted) onSyncCompleted()
        setTimeout(() => setSyncSuccess(false), 3500)
      }, 1200)
    } catch {
      setSyncing(false)
    }
  }

  const handleToggleConnection = async () => {
    const nextState = !connected
    setConnected(nextState)
    await fetch("/api/calendar/google/connect", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: nextState ? "connect" : "disconnect", email: accountEmail })
    })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-lg rounded-3xl border border-black/[0.08] dark:border-white/[0.12] bg-background/95 backdrop-blur-2xl p-6 sm:p-7 shadow-2xl space-y-5 text-foreground relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 h-8 w-8 rounded-full bg-muted/50 hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Modal Header with Google Calendar 4-Color Icon */}
        <div className="flex items-start gap-3.5">
          <div className="h-12 w-12 rounded-2xl bg-white shadow-md border border-black/10 flex items-center justify-center shrink-0">
            {/* Google Calendar SVG Icon */}
            <svg className="h-7 w-7" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
              <path fill="#34A853" d="M7 11h5v5H7z"/>
              <path fill="#FBBC05" d="M12 11h5v5h-5z"/>
              <path fill="#EA4335" d="M7 6h10v2H7z"/>
            </svg>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-black tracking-tight text-foreground">
                Integração Google Agenda
              </h3>
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-black uppercase tracking-wider ${
                connected 
                  ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                  : "bg-muted text-muted-foreground"
              }`}>
                {connected ? "● Conectado" : "Desconectado"}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
              Sincronize visitas a imóveis, contratos e vistorias automaticamente no seu Google Agenda, smartwatch e celular.
            </p>
          </div>
        </div>

        {/* Account Info Card in Apple Glass */}
        <div className="rounded-2xl border border-black/[0.06] dark:border-white/[0.08] bg-muted/30 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Conta Google Conectada
              </span>
              <p className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                {accountEmail}
              </p>
            </div>

            <button
              onClick={handleToggleConnection}
              className="text-xs font-bold text-muted-foreground hover:text-foreground underline underline-offset-2"
            >
              {connected ? "Desconectar" : "Reconectar"}
            </button>
          </div>

          <div className="pt-2 border-t border-black/[0.04] dark:border-white/[0.06] flex items-center justify-between text-xs text-muted-foreground">
            <span>Agenda de Destino:</span>
            <span className="font-bold text-foreground">Tactus - Visitas & Negócios</span>
          </div>
        </div>

        {/* Sync Settings Toggles */}
        <div className="space-y-2.5">
          <span className="text-[11px] font-black uppercase tracking-wider text-muted-foreground block">
            Preferências de Sincronização:
          </span>

          <div className="flex items-center justify-between p-3 rounded-2xl border border-black/[0.06] dark:border-white/[0.08] bg-muted/20">
            <div className="space-y-0.5">
              <p className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-lime-600 dark:text-lime-400" />
                Sincronizar visitas automaticamente
              </p>
              <p className="text-[11px] text-muted-foreground">
                Ao criar compromisso ou mover lead para "Visita" no funil
              </p>
            </div>
            <input
              type="checkbox"
              checked={autoSync}
              onChange={(e) => setAutoSync(e.target.checked)}
              className="h-4 w-4 rounded accent-lime-500 cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-2xl border border-black/[0.06] dark:border-white/[0.08] bg-muted/20">
            <div className="space-y-0.5">
              <p className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                Incluir rota GPS e link do imóvel no evento
              </p>
              <p className="text-[11px] text-muted-foreground">
                Adiciona endereço completo do imóvel no campo de localização do Google Agenda
              </p>
            </div>
            <input
              type="checkbox"
              checked={includeGps}
              onChange={(e) => setIncludeGps(e.target.checked)}
              className="h-4 w-4 rounded accent-lime-500 cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-2xl border border-black/[0.06] dark:border-white/[0.08] bg-muted/20">
            <div className="space-y-0.5">
              <p className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <UserCheck className="h-3.5 w-3.5 text-purple-600 dark:text-purple-400" />
                Enviar convite por e-mail para o cliente
              </p>
              <p className="text-[11px] text-muted-foreground">
                O cliente recebe o convite na agenda dele para confirmar presença
              </p>
            </div>
            <input
              type="checkbox"
              checked={inviteClients}
              onChange={(e) => setInviteClients(e.target.checked)}
              className="h-4 w-4 rounded accent-lime-500 cursor-pointer"
            />
          </div>
        </div>

        {/* Feedback Alert */}
        {syncSuccess && (
          <div className="p-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
            <span>Google Agenda sincronizado com sucesso! Todos os eventos estão atualizados.</span>
          </div>
        )}

        {/* Footer Actions */}
        <div className="pt-2 flex flex-col sm:flex-row items-center gap-2 justify-between">
          <a
            href="https://calendar.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-foreground py-2 px-3 transition-colors"
          >
            <span>Abrir Google Agenda</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button
              variant="outline"
              onClick={onClose}
              className="rounded-full h-10 px-5 text-xs font-bold w-full sm:w-auto"
            >
              Fechar
            </Button>

            <Button
              onClick={handleSyncNow}
              disabled={syncing || !connected}
              className="rounded-full h-10 px-6 text-xs font-bold bg-foreground text-background hover:bg-foreground/90 shadow-md flex items-center justify-center gap-2 w-full sm:w-auto transition-all"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${syncing ? "animate-spin" : ""}`} />
              <span>{syncing ? "Sincronizando..." : "Sincronizar Agora"}</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
