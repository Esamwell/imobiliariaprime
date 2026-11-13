"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { 
  Save, 
  Shield, 
  Database, 
  Mail, 
  Globe, 
  Check, 
  CheckCircle2, 
  Server, 
  Lock, 
  Sparkles 
} from "lucide-react"

export default function SettingsPage() {
  const [saved, setSaved] = useState(false)
  const [backupRunning, setBackupRunning] = useState(false)
  const [backupDone, setBackupDone] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const handleRunBackup = () => {
    setBackupRunning(true)
    setBackupDone(false)
    setTimeout(() => {
      setBackupRunning(false)
      setBackupDone(true)
      setTimeout(() => setBackupDone(false), 4000)
    }, 2000)
  }

  return (
    <div className="flex-1 space-y-6 p-4 sm:p-6 max-w-7xl mx-auto">
      {/* Header Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              Configurações do Sistema
            </h1>
            <span className="rounded-full bg-purple-500/10 text-purple-700 dark:text-purple-300 px-2.5 py-0.5 text-[10px] font-black uppercase">
              Parâmetros
            </span>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Parametrizações gerais da plataforma, integrações de e-mail e políticas de segurança.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 rounded-full bg-foreground text-background hover:bg-foreground/90 px-6 py-2.5 text-xs font-bold shadow-md transition-all hover:scale-102"
        >
          {saved ? <Check className="h-4 w-4 text-emerald-500" /> : <Save className="h-4 w-4" />}
          <span>{saved ? "Alterações Salvas!" : "Salvar Configurações"}</span>
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Card 1: Geral & Marca */}
        <div className="glass-card rounded-3xl border border-black/[0.06] dark:border-white/[0.08] p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5 border-b border-black/[0.06] dark:border-white/[0.08] pb-3">
            <div className="h-8 w-8 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Globe className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-foreground">Geral & Identidade Visual</h3>
              <p className="text-xs text-muted-foreground">Nome e dados públicos da plataforma</p>
            </div>
          </div>

          <div className="space-y-3.5 text-xs">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                Nome da Plataforma
              </label>
              <input
                type="text"
                defaultValue="Prime CRM Imobiliário"
                className="w-full h-10 rounded-2xl border border-black/[0.08] dark:border-white/[0.10] bg-muted/20 px-3.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                E-mail de Suporte / Contato
              </label>
              <input
                type="email"
                defaultValue="suporte@primecrm.com.br"
                className="w-full h-10 rounded-2xl border border-black/[0.08] dark:border-white/[0.10] bg-muted/20 px-3.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                Fuso Horário Padrão
              </label>
              <select className="w-full h-10 rounded-2xl border border-black/[0.08] dark:border-white/[0.10] bg-muted/20 px-3.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20">
                <option value="America/Sao_Paulo">América/São Paulo (GMT-3)</option>
                <option value="America/Manaus">América/Manaus (GMT-4)</option>
                <option value="America/Fortaleza">América/Fortaleza (GMT-3)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Card 2: E-mail SMTP */}
        <div className="glass-card rounded-3xl border border-black/[0.06] dark:border-white/[0.08] p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5 border-b border-black/[0.06] dark:border-white/[0.08] pb-3">
            <div className="h-8 w-8 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <Mail className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-foreground">Serviço de Email (SMTP)</h3>
              <p className="text-xs text-muted-foreground">Disparo de notificações transacionais e boas-vindas</p>
            </div>
          </div>

          <div className="space-y-3.5 text-xs">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                Host SMTP
              </label>
              <input
                type="text"
                defaultValue="smtp.resend.com"
                className="w-full h-10 rounded-2xl border border-black/[0.08] dark:border-white/[0.10] bg-muted/20 px-3.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                  Porta
                </label>
                <input
                  type="text"
                  defaultValue="587"
                  className="w-full h-10 rounded-2xl border border-black/[0.08] dark:border-white/[0.10] bg-muted/20 px-3.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                  Criptografia
                </label>
                <select className="w-full h-10 rounded-2xl border border-black/[0.08] dark:border-white/[0.10] bg-muted/20 px-3.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20">
                  <option value="tls">STARTTLS</option>
                  <option value="ssl">SSL / TLS</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                Remetente Padrão (From)
              </label>
              <input
                type="text"
                defaultValue="Prime CRM <noreply@primecrm.com.br>"
                className="w-full h-10 rounded-2xl border border-black/[0.08] dark:border-white/[0.10] bg-muted/20 px-3.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20"
              />
            </div>
          </div>
        </div>

        {/* Card 3: Segurança & Sessões */}
        <div className="glass-card rounded-3xl border border-black/[0.06] dark:border-white/[0.08] p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5 border-b border-black/[0.06] dark:border-white/[0.08] pb-3">
            <div className="h-8 w-8 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Shield className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-foreground">Segurança & Sessões</h3>
              <p className="text-xs text-muted-foreground">Políticas de senhas e autenticação</p>
            </div>
          </div>

          <div className="space-y-3.5 text-xs">
            <div className="flex items-center justify-between p-3 rounded-2xl bg-muted/30 border border-black/[0.04] dark:border-white/[0.06]">
              <div>
                <p className="font-bold text-foreground">Autenticação em Dois Fatores (2FA)</p>
                <p className="text-[11px] text-muted-foreground">Exigir 2FA para contas com perfil Super Admin</p>
              </div>
              <input type="checkbox" defaultChecked className="h-4 w-4 rounded accent-purple-600" />
            </div>

            <div className="flex items-center justify-between p-3 rounded-2xl bg-muted/30 border border-black/[0.04] dark:border-white/[0.06]">
              <div>
                <p className="font-bold text-foreground">Proteção contra Brute Force</p>
                <p className="text-[11px] text-muted-foreground">Bloquear IP após 5 tentativas inválidas consecutivas</p>
              </div>
              <input type="checkbox" defaultChecked className="h-4 w-4 rounded accent-purple-600" />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                Duração da Sessão JWT
              </label>
              <select className="w-full h-10 rounded-2xl border border-black/[0.08] dark:border-white/[0.10] bg-muted/20 px-3.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20">
                <option value="24h">24 Horas</option>
                <option value="7d">7 Dias</option>
                <option value="30d">30 Dias</option>
              </select>
            </div>
          </div>
        </div>

        {/* Card 4: Banco de Dados & Backups */}
        <div className="glass-card rounded-3xl border border-black/[0.06] dark:border-white/[0.08] p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5 border-b border-black/[0.06] dark:border-white/[0.08] pb-3">
            <div className="h-8 w-8 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Database className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-foreground">Banco de Dados & Backups</h3>
              <p className="text-xs text-muted-foreground">Gestão de snapshots e integridade</p>
            </div>
          </div>

          <div className="space-y-3.5 text-xs">
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-3.5 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase text-emerald-700 dark:text-emerald-400">
                  Status do Backup
                </span>
                <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" /> Em Dia
                </span>
              </div>
              <p className="text-xs font-bold text-emerald-950 dark:text-emerald-200">
                Último backup: Hoje às 03:00 (1.4 GB)
              </p>
              <p className="text-[11px] text-emerald-800/80 dark:text-emerald-300/80">
                Destino: Armazenamento S3 (São Paulo) Criptografado
              </p>
            </div>

            <div className="pt-1">
              <button
                type="button"
                disabled={backupRunning}
                onClick={handleRunBackup}
                className="w-full py-2.5 px-4 rounded-full border border-black/[0.08] dark:border-white/[0.10] bg-muted/40 hover:bg-muted/70 text-xs font-bold text-foreground transition-all disabled:opacity-50"
              >
                {backupRunning
                  ? "Gerando dump do banco de dados..."
                  : backupDone
                  ? "✔ Backup gerado e enviado para o S3!"
                  : "Executar Backup Manual Agora"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
