"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Save, Shield, Database, Mail, Globe, Check } from "lucide-react"

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
    <div className="flex-1 space-y-6 p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Configurações do Sistema</h1>
          <p className="text-sm text-muted-foreground">Parametrizações gerais da plataforma, integrações e segurança.</p>
        </div>
        <Button onClick={handleSave} className="flex items-center gap-2">
          {saved ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
          {saved ? "Alterações Salvas!" : "Salvar Alterações"}
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" />
              <CardTitle>Geral & Identidade Visual</CardTitle>
            </div>
            <CardDescription>Personalização da marca e dados públicos da plataforma.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Nome da Plataforma</label>
              <input
                type="text"
                defaultValue="CRM Imobiliário Multi-tenant"
                className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">E-mail de Contato / Suporte</label>
              <input
                type="email"
                defaultValue="contato@crmimobiliario.com.br"
                className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Fuso Horário Padrão</label>
              <select className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                <option value="America/Sao_Paulo">América/São Paulo (GMT-3)</option>
                <option value="America/Manaus">América/Manaus (GMT-4)</option>
                <option value="America/Fortaleza">América/Fortaleza (GMT-3)</option>
              </select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" />
              <CardTitle>Serviço de Email (SMTP)</CardTitle>
            </div>
            <CardDescription>Configuração de disparo de notificações transacionais.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Host SMTP</label>
              <input
                type="text"
                defaultValue="smtp.sendgrid.net"
                className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Porta</label>
                <input
                  type="text"
                  defaultValue="587"
                  className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Criptografia</label>
                <select className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                  <option value="tls">STARTTLS</option>
                  <option value="ssl">SSL / TLS</option>
                </select>
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Remetente Padrão (From)</label>
              <input
                type="text"
                defaultValue="noreply@crmimobiliario.com.br"
                className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <CardTitle>Segurança & Sessões</CardTitle>
            </div>
            <CardDescription>Políticas de senhas, autenticação e tempo de expiração.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <p className="text-sm font-medium">Autenticação em Dois Fatores (2FA)</p>
                <p className="text-xs text-muted-foreground">Exigir 2FA para contas com perfil administrador.</p>
              </div>
              <input type="checkbox" defaultChecked className="h-4 w-4 rounded accent-primary" />
            </div>
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <p className="text-sm font-medium">Bloqueio por Tentativas Inválidas</p>
                <p className="text-xs text-muted-foreground">Bloquear IP após 5 falhas consecutivas de senha.</p>
              </div>
              <input type="checkbox" defaultChecked className="h-4 w-4 rounded accent-primary" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Duração da Sessão JWT</label>
              <select className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                <option value="24h">24 Horas</option>
                <option value="7d">7 Dias</option>
                <option value="30d">30 Dias</option>
              </select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Database className="h-5 w-5 text-primary" />
              <CardTitle>Banco de Dados & Backups</CardTitle>
            </div>
            <CardDescription>Gestão de backups automáticos e integridade dos dados.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border bg-muted/40 p-3 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-muted-foreground uppercase">Status do Backup</span>
                <span className="text-xs text-emerald-600 font-medium">● Em Dia</span>
              </div>
              <p className="text-sm font-medium">Último backup: Hoje às 03:00 (1.4 GB)</p>
              <p className="text-xs text-muted-foreground">Armazenamento: AWS S3 (São Paulo)</p>
            </div>
            <div className="pt-2">
              <Button
                variant="outline"
                className="w-full"
                disabled={backupRunning}
                onClick={handleRunBackup}
              >
                {backupRunning
                  ? "Gerando dump do banco de dados..."
                  : backupDone
                  ? "✔ Backup gerado e enviado para o S3!"
                  : "Executar Backup Manual Agora"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

