"use client"

import Link from "next/link"
import { 
  Building, 
  Share2, 
  Kanban, 
  Key, 
  DollarSign, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Lock,
  Crown,
  Smartphone,
  Globe,
  Zap
} from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CRMLandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-primary selection:text-white">
      {/* 1. Header do CRM */}
      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-black text-lg shadow-md shadow-primary/20">
              <Building className="h-5 w-5" />
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-tight block text-white leading-none">
                CRM Imobiliário
              </span>
              <span className="text-[10px] font-medium text-slate-400 uppercase tracking-widest block mt-0.5">
                Plataforma para Corretores & Imobiliárias
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/v/prime"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
            >
              <Globe className="h-4 w-4 text-primary" />
              Exemplo de Vitrine do Corretor
            </Link>

            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 h-9 px-4 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs shadow-md shadow-primary/20 transition-all hover:scale-105"
            >
              <Lock className="h-3.5 w-3.5" />
              Entrar no Sistema (Login)
            </Link>
          </div>
        </div>
      </header>

      {/* 2. Hero Section do CRM SaaS */}
      <main className="flex-1">
        <section className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden text-center">
          <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px]"></div>

          <div className="max-w-4xl mx-auto relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/30 px-4 py-1.5 text-xs font-bold text-blue-400">
              <Zap className="h-3.5 w-3.5 text-blue-400" />
              O CRM Definitivo para Corretores Autônomos e Imobiliárias
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white">
              Centralize sua Carteira, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300">
                Gere Vitrines Exclusivas
              </span>{" "}
              e Feche Mais Vendas.
            </h1>

            <p className="max-w-2xl mx-auto text-sm sm:text-lg text-slate-400 font-normal leading-relaxed">
              Sistema completo de gestão com funil de vendas integrado ao WhatsApp, gestão de locações com reajuste automático e botão exclusivo para gerar o seu catálogo de imóveis personalizado para enviar a clientes.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <Link
                href="/login"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-12 px-7 rounded-xl bg-primary hover:bg-primary/90 text-white font-extrabold text-sm shadow-xl shadow-primary/30 transition-all hover:scale-105"
              >
                Acessar Demonstração Gratuita
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/v/prime"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold text-sm transition-colors"
              >
                <Share2 className="h-4 w-4 text-emerald-400" />
                Ver Exemplo de Vitrine Pública
              </Link>
            </div>
          </div>
        </section>

        {/* 3. Funcionalidades do CRM */}
        <section className="py-16 bg-slate-900/60 border-y border-slate-800/80 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-primary font-bold text-xs uppercase tracking-widest">
                Desenvolvido para o Mercado Imobiliário
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">Tudo o que você precisa no seu dia a dia</h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Recursos inteligentes criados especificamente para a rotina de corretores e administradores.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {/* Card 1: Vitrine Pública Exclusiva */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 space-y-3 hover:border-primary/50 transition-colors shadow-lg">
                <div className="h-10 w-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold">
                  <Share2 className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-base text-white">Vitrines Personalizadas com 1 Clique</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Gere um link exclusivo da sua carteira (ex: <code className="text-blue-400">/v/seu-nome</code>) para enviar a clientes no WhatsApp ou colocar na bio do Instagram, com sua foto, CRECI e contato direto.
                </p>
              </div>

              {/* Card 2: Funil Kanban com WhatsApp */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 space-y-3 hover:border-emerald-500/50 transition-colors shadow-lg">
                <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
                  <Kanban className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-base text-white">Funil de Vendas Visual (Kanban)</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Acompanhe cada oportunidade de Novo Lead a Fechamento com etiquetas de temperatura, orçamento e botão direto de WhatsApp com mensagem personalizada pronta.
                </p>
              </div>

              {/* Card 3: Carteira de Imóveis & ViaCEP */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 space-y-3 hover:border-purple-500/50 transition-colors shadow-lg">
                <div className="h-10 w-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold">
                  <Building className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-base text-white">Carteira com Fotos em Alta Definição</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Cadastro inteligente com preenchimento automático de endereço por CEP (ViaCEP), simulador de financiamento bancário e ficha técnica pronta para impressão.
                </p>
              </div>

              {/* Card 4: Gestão de Aluguéis */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 space-y-3 hover:border-amber-500/50 transition-colors shadow-lg">
                <div className="h-10 w-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold">
                  <Key className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-base text-white">Gestão de Locações & Repasses</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Controle total de contratos de aluguel, inquilinos, dias de vencimento e cálculo de reajustes anuais com base no IPCA e IGP-M.
                </p>
              </div>

              {/* Card 5: Financeiro e Comissões */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 space-y-3 hover:border-cyan-500/50 transition-colors shadow-lg">
                <div className="h-10 w-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold">
                  <DollarSign className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-base text-white">Comissões & Extrato Financeiro</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Divisão automática de comissões entre corretor e imobiliária, acompanhamento de valores aguardando escritura e histórico de pagamentos.
                </p>
              </div>

              {/* Card 6: Super Admin & Multi-Tenancy */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 space-y-3 hover:border-yellow-500/50 transition-colors shadow-lg">
                <div className="h-10 w-10 rounded-xl bg-yellow-500/10 text-yellow-400 flex items-center justify-center font-bold">
                  <Crown className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-base text-white">Multi-Empresa & Plano Master VIP</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Arquitetura multi-tenant que atende tanto imobiliárias completas (PJ) quanto corretores autônomos (PF), com controle exclusivo de assinaturas no painel Super Admin.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 4. Footer */}
      <footer className="border-t border-slate-800/80 py-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} CRM Imobiliário. Plataforma para Gestão e Vendas Imobiliárias.</p>
          <div className="flex items-center gap-4">
            <Link href="/v/prime" className="hover:text-slate-300">Exemplo de Vitrine</Link>
            <Link href="/login" className="hover:text-slate-300 font-semibold text-primary">Acessar o CRM</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
