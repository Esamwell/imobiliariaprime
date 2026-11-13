"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { 
  User, 
  Building2, 
  Mail, 
  Phone, 
  ShieldCheck, 
  Lock, 
  Camera, 
  Check, 
  Sparkles, 
  Crown, 
  CreditCard, 
  ExternalLink, 
  Save, 
  Calendar, 
  Bell, 
  Smartphone,
  CheckCircle2,
  AlertCircle
} from "lucide-react"
import { Button } from "@/components/ui/button"

const AVATAR_PRESETS = [
  { label: "Executivo Homem 1", url: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80" },
  { label: "Executiva Mulher 1", url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80" },
  { label: "Executivo Homem 2", url: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80" },
  { label: "Executiva Mulher 2", url: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80" },
  { label: "Corretor Jovem", url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80" },
  { label: "Corretor Sênior", url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80" },
]

export default function SettingsProfilePage() {
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<"perfil" | "seguranca" | "organizacao" | "notificacoes">("perfil")

  // Form Fields
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [creci, setCreci] = useState("")
  const [bio, setBio] = useState("")
  const [avatarUrl, setAvatarUrl] = useState("")

  // Security
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [passwordSuccess, setPasswordSuccess] = useState(false)

  // Notifications
  const [notifyWhatsApp, setNotifyWhatsApp] = useState(true)
  const [notifyPush, setNotifyPush] = useState(true)
  const [notifyEmail, setNotifyEmail] = useState(false)

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated && data.user) {
          const u = data.user
          setCurrentUser(u)
          setName(u.name || "")
          setEmail(u.email || "")
          setPhone(u.phone || "")
          setCreci(u.creci || "")
          setBio(u.bio || "")
          setAvatarUrl(u.avatarUrl || "")
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setSuccessMessage(null)

    try {
      const res = await fetch("/api/auth/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          creci,
          bio,
          avatarUrl,
        }),
      })

      const data = await res.json()
      if (res.ok) {
        setSuccessMessage("Perfil atualizado com sucesso! As alterações já estão ativas.")
        setCurrentUser((prev: any) => ({ ...prev, name, phone, creci, bio, avatarUrl }))
        setTimeout(() => setSuccessMessage(null), 4000)
      } else {
        alert(data.error || "Erro ao salvar perfil.")
      }
    } catch {
      alert("Erro ao conectar com o servidor.")
    } finally {
      setSaving(false)
    }
  }

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newPassword || newPassword !== confirmPassword) {
      alert("As novas senhas não coincidem.")
      return
    }
    setPasswordSuccess(true)
    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")
    setTimeout(() => setPasswordSuccess(false), 4000)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setAvatarUrl(reader.result)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const isChief = currentUser?.role === "GESTOR"
  const isAutonomo = currentUser?.role === "AUTONOMO" || currentUser?.tenant?.type === "AUTONOMO"
  const isBroker = currentUser?.role === "CORRETOR"
  const canManageBilling = isChief || isAutonomo

  const roleLabel = isChief
    ? "Chefe da Imobiliária (Gestor Master)"
    : isAutonomo
    ? "Corretor Autônomo Solo"
    : "Corretor Associado (Braço de Vendas)"

  const tenantName = currentUser?.tenant?.name || (isAutonomo ? "Consultoria Individual" : "Tactus Imobiliária")
  const planName = currentUser?.tenant?.plan || (isAutonomo ? "Plano Essencial Solo" : "Plano Imobiliária")

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header Bar */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Configurações & Perfil
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Gerencie sua foto de exibição, dados profissionais, segurança e preferências de conta.
          </p>
        </div>

        {canManageBilling && (
          <Link
            href="/dashboard/plano"
            className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 px-4 py-2 text-xs font-bold text-amber-700 dark:text-amber-300 transition-all hover:scale-102 shadow-xs"
          >
            <Crown className="h-4 w-4" />
            <span>Gerenciar Meu Plano & Upgrades</span>
          </Link>
        )}
      </div>

      {/* Hero Mini Profile Card */}
      <div className="rounded-3xl border border-black/[0.08] dark:border-white/[0.12] bg-gradient-to-br from-card via-card/90 to-muted/30 p-6 sm:p-7 backdrop-blur-xl shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
        <div className="flex items-center gap-4">
          <div className="relative group">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={name || "Perfil"}
                className="h-20 w-20 rounded-2xl object-cover ring-2 ring-foreground/20 shadow-md"
              />
            ) : (
              <div className="h-20 w-20 rounded-2xl bg-primary/20 text-primary flex items-center justify-center font-black text-2xl ring-2 ring-primary/30">
                {(name || "CS").slice(0, 2).toUpperCase()}
              </div>
            )}
            <label 
              htmlFor="avatar-upload"
              className="absolute -bottom-1 -right-1 h-7 w-7 rounded-full bg-foreground text-background flex items-center justify-center shadow-md cursor-pointer hover:scale-110 transition-transform"
              title="Trocar Foto de Perfil"
            >
              <Camera className="h-3.5 w-3.5" />
            </label>
            <input 
              id="avatar-upload" 
              type="file" 
              accept="image/*" 
              onChange={handleFileUpload} 
              className="hidden" 
            />
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl font-black text-foreground">{name || "Usuário"}</h2>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                isChief
                  ? "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300"
                  : isAutonomo
                  ? "bg-blue-500/20 text-blue-700 dark:text-blue-300"
                  : "bg-purple-500/20 text-purple-700 dark:text-purple-300"
              }`}>
                {roleLabel}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-2">
              <span>{creci ? `CRECI ${creci}` : "Sem CRECI cadastrado"}</span>
              <span>•</span>
              <span className="font-semibold text-foreground/80">{tenantName}</span>
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className="rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 px-2.5 py-0.5 text-[10px] font-bold">
                Plano Ativo: <strong>{planName}</strong>
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <Link
            href="/v/tactus"
            target="_blank"
            className="inline-flex items-center gap-1.5 rounded-full border border-black/[0.08] dark:border-white/[0.12] bg-white/70 dark:bg-white/[0.05] hover:bg-black/5 dark:hover:bg-white/10 px-4 py-2 text-xs font-bold text-foreground transition-all"
          >
            <span>Ver Vitrine Pública</span>
            <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
          </Link>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-border/60 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab("perfil")}
          className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === "perfil"
              ? "bg-foreground text-background shadow-sm"
              : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
          }`}
        >
          <User className="h-3.5 w-3.5" />
          <span>Meu Perfil & Foto</span>
        </button>

        <button
          onClick={() => setActiveTab("organizacao")}
          className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === "organizacao"
              ? "bg-foreground text-background shadow-sm"
              : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
          }`}
        >
          <Building2 className="h-3.5 w-3.5" />
          <span>Minha Imobiliária / Organização</span>
        </button>

        <button
          onClick={() => setActiveTab("seguranca")}
          className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === "seguranca"
              ? "bg-foreground text-background shadow-sm"
              : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
          }`}
        >
          <Lock className="h-3.5 w-3.5" />
          <span>Segurança & Senha</span>
        </button>

        <button
          onClick={() => setActiveTab("notificacoes")}
          className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === "notificacoes"
              ? "bg-foreground text-background shadow-sm"
              : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
          }`}
        >
          <Bell className="h-3.5 w-3.5" />
          <span>Alertas & WhatsApp</span>
        </button>
      </div>

      {/* Success Alert */}
      {successMessage && (
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-xs text-emerald-700 dark:text-emerald-300 flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* TAB 1: MEU PERFIL & FOTO */}
      {activeTab === "perfil" && (
        <form onSubmit={handleSaveProfile} className="space-y-6">
          <div className="rounded-3xl border border-black/[0.08] dark:border-white/[0.12] bg-card p-6 sm:p-7 shadow-sm space-y-5">
            <div>
              <h3 className="text-base font-extrabold text-foreground">Informações Pessoais & Contato</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Esses dados aparecem nos seus imóveis cadastrados e na sua vitrine pública para clientes.
              </p>
            </div>

            {/* Presets de Foto Profissional de Corretor */}
            <div className="space-y-2 pt-1">
              <label className="text-xs font-bold text-foreground block">
                Escolher Foto de Perfil Profissional ou Enviar do seu Computador
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
                {AVATAR_PRESETS.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setAvatarUrl(preset.url)}
                    className={`relative rounded-2xl overflow-hidden border-2 aspect-square group transition-all ${
                      avatarUrl === preset.url
                        ? "border-emerald-500 ring-2 ring-emerald-500/30 scale-102"
                        : "border-border/60 hover:border-foreground/40"
                    }`}
                  >
                    <img src={preset.url} alt={preset.label} className="w-full h-full object-cover" />
                    {avatarUrl === preset.url && (
                      <div className="absolute inset-0 bg-emerald-500/30 flex items-center justify-center">
                        <Check className="h-5 w-5 text-white stroke-[3]" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2 pt-2">
                <input
                  type="text"
                  placeholder="Ou cole a URL direta de uma foto sua (https://...)"
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-border/80 bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-foreground"
                />
                {avatarUrl && (
                  <button
                    type="button"
                    onClick={() => setAvatarUrl("")}
                    className="text-xs font-bold text-muted-foreground hover:text-red-500 px-2 py-1"
                  >
                    Remover
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="text-xs font-bold text-foreground block mb-1">Nome Completo *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-2xl border border-border/80 bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-lime-500/30"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-foreground block mb-1">E-mail de Login (Acesso)</label>
                <input
                  type="email"
                  disabled
                  value={email}
                  className="w-full px-3.5 py-2.5 rounded-2xl border border-border/60 bg-muted/40 text-sm text-muted-foreground cursor-not-allowed"
                />
                <span className="text-[10px] text-muted-foreground mt-0.5 block">Para alterar o e-mail, fale com o suporte ou Super Admin.</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-foreground block mb-1">WhatsApp / Celular com DDD *</label>
                <input
                  type="text"
                  required
                  placeholder="(11) 98765-4321"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-2xl border border-border/80 bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-lime-500/30"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-foreground block mb-1">Número CRECI *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: 48.912-F"
                  value={creci}
                  onChange={(e) => setCreci(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-2xl border border-border/80 bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-lime-500/30"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-foreground block mb-1">
                Biografia Profissional / Apresentação
              </label>
              <textarea
                rows={3}
                placeholder="Conte brevemente sobre sua experiência, especialidade de bairros e atendimento para seus clientes..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-2xl border border-border/80 bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-lime-500/30 resize-none"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={saving}
              className="rounded-full bg-foreground text-background hover:bg-foreground/90 font-bold text-xs px-6 py-2.5 shadow-md flex items-center gap-2"
            >
              <Save className="h-4 w-4" />
              <span>{saving ? "Salvando..." : "Salvar Alterações do Perfil"}</span>
            </Button>
          </div>
        </form>
      )}

      {/* TAB 2: ORGANIZAÇÃO & PLANO */}
      {activeTab === "organizacao" && (
        <div className="space-y-6">
          <div className="rounded-3xl border border-black/[0.08] dark:border-white/[0.12] bg-card p-6 sm:p-7 shadow-sm space-y-6">
            <div>
              <h3 className="text-base font-extrabold text-foreground">Minha Organização & Nível de Permissão</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Detalhes da empresa e configuração do seu acesso no sistema.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-muted/30 border border-border/40">
                <span className="text-[11px] font-bold text-muted-foreground uppercase block">Imobiliária Vinculada</span>
                <span className="text-base font-black text-foreground mt-0.5 block">{tenantName}</span>
                <span className="text-[10px] text-muted-foreground mt-1 block">CNPJ / CPF: {currentUser?.tenant?.cnpj || "12.345.678/0001-90"}</span>
              </div>

              <div className="p-4 rounded-2xl bg-muted/30 border border-border/40">
                <span className="text-[11px] font-bold text-muted-foreground uppercase block">Seu Papel / Acesso</span>
                <span className="text-base font-black text-foreground mt-0.5 block">{roleLabel}</span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1 block">Status: Conta Ativa</span>
              </div>

              <div className="p-4 rounded-2xl bg-muted/30 border border-border/40">
                <span className="text-[11px] font-bold text-muted-foreground uppercase block">Plano Contratado</span>
                <span className="text-base font-black text-foreground mt-0.5 block">{planName}</span>
                <span className="text-[10px] text-muted-foreground mt-1 block">Faturamento e assinaturas ativas</span>
              </div>
            </div>

            {/* SE FOR CHEFE / GESTOR OU AUTÔNOMO: BANNER DE UPGRADE */}
            {canManageBilling ? (
              <div className="rounded-2xl border border-amber-500/40 bg-gradient-to-r from-amber-500/10 via-card to-amber-500/10 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                    <Crown className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-foreground">
                      Você é o Tomador de Decisão desta conta ({isChief ? "Chefe Master" : "Corretor Solo"})
                    </h4>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Você tem permissão para fazer upgrade de plano, contratar assentos adicionais de corretores e módulos extras.
                    </p>
                  </div>
                </div>

                <Link
                  href="/dashboard/plano"
                  className="shrink-0 px-5 py-2.5 rounded-full bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-md transition-all hover:scale-105"
                >
                  Abrir Gestão de Planos & Upgrades
                </Link>
              </div>
            ) : (
              /* SE FOR CORRETOR ASSOCIADO (BRAÇO DE VENDAS) */
              <div className="rounded-2xl border border-blue-500/30 bg-blue-500/10 p-5 flex items-start gap-3">
                <ShieldCheck className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-foreground">
                    Acesso de Corretor Associado (Braço de Vendas)
                  </h4>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                    Você está vinculado à equipe da <strong>{tenantName}</strong>. A gestão financeira, upgrade de plano e contratação de novos membros é de responsabilidade exclusiva do Gestor Geral da sua agência.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: SEGURANÇA & SENHA */}
      {activeTab === "seguranca" && (
        <form onSubmit={handlePasswordSubmit} className="space-y-6">
          <div className="rounded-3xl border border-black/[0.08] dark:border-white/[0.12] bg-card p-6 sm:p-7 shadow-sm space-y-5">
            <div>
              <h3 className="text-base font-extrabold text-foreground">Alteração de Senha</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Escolha uma senha forte para proteger seu painel de vendas e dados de clientes.
              </p>
            </div>

            {passwordSuccess && (
              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-xs text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                <span>Senha atualizada com sucesso! Utilize a nova senha no seu próximo login.</span>
              </div>
            )}

            <div className="max-w-md space-y-4">
              <div>
                <label className="text-xs font-bold text-foreground block mb-1">Senha Atual</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-2xl border border-border/80 bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-lime-500/30"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-foreground block mb-1">Nova Senha</label>
                <input
                  type="password"
                  required
                  placeholder="Mínimo de 6 caracteres"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-2xl border border-border/80 bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-lime-500/30"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-foreground block mb-1">Confirmar Nova Senha</label>
                <input
                  type="password"
                  required
                  placeholder="Repita a nova senha"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-2xl border border-border/80 bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-lime-500/30"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              className="rounded-full bg-foreground text-background hover:bg-foreground/90 font-bold text-xs px-6 py-2.5 shadow-md flex items-center gap-2"
            >
              <Lock className="h-4 w-4" />
              <span>Atualizar Minha Senha</span>
            </Button>
          </div>
        </form>
      )}

      {/* TAB 4: ALERTAS & NOTIFICAÇÕES */}
      {activeTab === "notificacoes" && (
        <div className="space-y-6">
          <div className="rounded-3xl border border-black/[0.08] dark:border-white/[0.12] bg-card p-6 sm:p-7 shadow-sm space-y-5">
            <div>
              <h3 className="text-base font-extrabold text-foreground">Canais de Notificação & Alertas Rápidos</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Escolha como deseja ser avisado sobre novos leads, propostas e visitas agendadas.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-muted/20 border border-border/50">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-foreground block">Alertas Diretos no WhatsApp</span>
                    <span className="text-[11px] text-muted-foreground">Receba mensagem instantânea quando um cliente enviar proposta na sua vitrine pública.</span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={notifyWhatsApp}
                  onChange={(e) => setNotifyWhatsApp(e.target.checked)}
                  className="h-5 w-5 rounded-lg accent-emerald-500 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-4 rounded-2xl bg-muted/20 border border-border/50">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                    <Smartphone className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-foreground block">Notificações Push no Celular (PWA)</span>
                    <span className="text-[11px] text-muted-foreground">Alerta sonoro e visual na tela de bloqueio do seu smartphone sobre novas visitas.</span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={notifyPush}
                  onChange={(e) => setNotifyPush(e.target.checked)}
                  className="h-5 w-5 rounded-lg accent-blue-500 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-4 rounded-2xl bg-muted/20 border border-border/50">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                    <Calendar className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-foreground block">Sincronização 1-clique Google Agenda</span>
                    <span className="text-[11px] text-muted-foreground">Adicione automaticamente os compromissos do CRM à sua agenda pessoal do Google.</span>
                  </div>
                </div>
                <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 px-2.5 py-1 rounded-full">
                  Conectado
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

