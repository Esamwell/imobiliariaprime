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
  ArrowUpRight,
  Globe,
  Zap,
  Check,
  Star
} from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CRMLandingPage() {
  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col justify-between selection:bg-lime-400 selection:text-black">
      {/* 1. Header do CRM - Apple Prime Glass Capsule */}
      <header className="sticky top-0 z-40 bg-[#07090e]/80 backdrop-blur-xl border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="h-9 w-9 rounded-2xl bg-white text-black flex items-center justify-center font-black text-lg shadow-sm transition-transform group-hover:scale-105">
              <Building className="h-4 w-4" />
            </div>
            <div>
              <span className="font-extrabold text-base tracking-tight block text-white leading-none">
                PRIME CRM.
              </span>
              <span className="text-[9px] font-semibold text-lime-400 uppercase tracking-widest block mt-0.5">
                Portal do Corretor & Gestor
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-400">
            <Link href="#recursos" className="hover:text-white transition-colors">
              Recursos
            </Link>
            <Link href="#vitrine" className="hover:text-white transition-colors">
              Vitrine Pública
            </Link>
            <Link href="#seguranca" className="hover:text-white transition-colors">
              Segurança
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/v/prime"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white transition-colors glass-pill px-3.5 py-1.5"
            >
              <Share2 className="h-3.5 w-3.5 text-lime-400" />
              Ver Vitrine Pública
            </Link>

            {/* Apple Electric Lime Button (Inspired by "Explore now" in inspirações/pagina inicial.jpg) */}
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 h-9 px-4 rounded-full bg-lime-400 hover:bg-lime-300 text-black font-extrabold text-xs shadow-lg shadow-lime-400/20 transition-all hover:scale-105"
            >
              <span>Acessar Painel</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* 2. Hero Section (Inspired by inspirações/pagina inicial.jpg) */}
      <main className="flex-1">
        <section className="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden text-center">
          {/* Background Grid Pattern & Ambient Glow */}
          <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#ccff00_1px,transparent_1px)] [background-size:28px_28px]"></div>
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-lime-400/10 blur-[130px] rounded-full pointer-events-none"></div>

          <div className="max-w-4xl mx-auto relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/[0.05] border border-white/10 px-4 py-1.5 text-[11px] font-bold text-lime-400 backdrop-blur-md">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-lime-500"></span>
              </span>
              O CRM Mais Inteligente para o Mercado Imobiliário
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.08] text-white">
              A melhor plataforma imobiliária <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-300 via-white to-slate-300">
                para o seu futuro.
              </span>
            </h1>

            <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-400 font-normal leading-relaxed">
              Centralize sua carteira de imóveis, gerencie leads com pontuação de temperatura, automatize aluguéis e gere uma vitrine pública exclusiva para compartilhar com seus clientes no WhatsApp.
            </p>

            {/* Realtime Users Capsule (Inspired by avatar stack in inspirações/pagina inicial.jpg) */}
            <div className="flex items-center justify-center gap-3 pt-2">
              <div className="flex -space-x-2">
                <div className="h-8 w-8 rounded-full bg-amber-500 border-2 border-[#07090e] text-white text-[10px] font-bold flex items-center justify-center">
                  CS
                </div>
                <div className="h-8 w-8 rounded-full bg-blue-500 border-2 border-[#07090e] text-white text-[10px] font-bold flex items-center justify-center">
                  RV
                </div>
                <div className="h-8 w-8 rounded-full bg-purple-500 border-2 border-[#07090e] text-white text-[10px] font-bold flex items-center justify-center">
                  MD
                </div>
                <div className="h-8 w-8 rounded-full bg-emerald-500 border-2 border-[#07090e] text-white text-[10px] font-bold flex items-center justify-center">
                  FG
                </div>
              </div>
              <div className="text-left text-xs">
                <span className="font-extrabold text-white block">15.000+ Corretores</span>
                <span className="text-slate-400 text-[10px]">Utilizando ativamente em todo o Brasil</span>
              </div>
            </div>

            {/* CTAs - Apple Style Pills */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <Link
                href="/login"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-12 px-8 rounded-full bg-lime-400 hover:bg-lime-300 text-black font-extrabold text-xs shadow-xl shadow-lime-400/25 transition-all hover:scale-105"
              >
                <span>Acessar Demonstração Gratuita</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/v/prime"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-white border border-white/10 font-bold text-xs backdrop-blur-md transition-all hover:scale-102"
              >
                <Share2 className="h-4 w-4 text-lime-400" />
                <span>Ver Vitrine do Corretor</span>
              </Link>
            </div>
          </div>
        </section>

        {/* 3. Feature Steps 01, 02, 03 (Exact Replica of Step Cards in inspirações/pagina inicial.jpg) */}
        <section id="recursos" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto space-y-2 mb-12">
            <span className="text-xs font-bold text-lime-400 uppercase tracking-widest">
              Design Prime & Eficiência
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              Seu parceiro de confiança para fechar mais negócios.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3 items-stretch">
            {/* Card 01 - Apple Dark Glass */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-7 flex flex-col justify-between space-y-4 hover:border-white/20 transition-all">
              <div className="space-y-3">
                <span className="text-xl font-mono font-bold text-slate-500">01.</span>
                <h3 className="text-xl font-bold text-white">Carteira Inteligente em Alta Resolução</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Cadastre imóveis com preenchimento instantâneo de endereço por CEP (ViaCEP), upload de fotos em alta definição e simulação de financiamento bancário para compradores.
                </p>
              </div>
              <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs font-bold text-white">
                <span>Ver no Sistema</span>
                <ArrowUpRight className="h-4 w-4 text-lime-400" />
              </div>
            </div>

            {/* Card 02 - Electric Lime Highlight (Identical to Card 02 in inspirações/pagina inicial.jpg) */}
            <div className="rounded-3xl bg-lime-400 text-black p-7 flex flex-col justify-between space-y-4 shadow-2xl shadow-lime-400/20 transform md:-translate-y-2 transition-transform">
              <div className="space-y-3">
                <span className="text-xl font-mono font-black text-black/60">02.</span>
                <h3 className="text-xl font-black text-black">Vitrines Públicas Personalizadas</h3>
                <p className="text-xs text-black/80 font-medium leading-relaxed">
                  Gere com um único clique um link exclusivo da sua carteira (ex: <code>/v/seu-nome</code>) com sua foto, CRECI e botão direto de WhatsApp para enviar aos clientes ou colocar na sua bio.
                </p>
              </div>
              <div className="pt-4 border-t border-black/15 flex items-center justify-between text-xs font-black text-black">
                <span>Conhecer a Vitrine</span>
                <ArrowRight className="h-4 w-4" />
              </div>
            </div>

            {/* Card 03 - Apple Dark Glass */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-7 flex flex-col justify-between space-y-4 hover:border-white/20 transition-all">
              <div className="space-y-3">
                <span className="text-xl font-mono font-bold text-slate-500">03.</span>
                <h3 className="text-xl font-bold text-white">Gestão Completa de Leads & Aluguéis</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Funil Kanban interativo com etiquetas de temperatura, gestão de contratos de locação com reajustes por IGP-M/IPCA e divisão automatizada de comissões.
                </p>
              </div>
              <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs font-bold text-white">
                <span>Ver no Sistema</span>
                <ArrowUpRight className="h-4 w-4 text-lime-400" />
              </div>
            </div>
          </div>
        </section>

        {/* 4. Stats & Social Proof (Inspired by inspirações) */}
        <section className="py-16 border-t border-white/[0.08] bg-white/[0.01] px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">R$ 4.2B+</div>
              <p className="text-xs text-slate-400">Em VGV Gerenciado na Plataforma</p>
            </div>
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-lime-400 tracking-tight">450.000+</div>
              <p className="text-xs text-slate-400">Imóveis Ativos e Divulgados</p>
            </div>
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">99.8%</div>
              <p className="text-xs text-slate-400">Disponibilidade e Segurança em Nuvem</p>
            </div>
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-lime-400 tracking-tight">3 Minutos</div>
              <p className="text-xs text-slate-400">Para Configurar e Começar a Vender</p>
            </div>
          </div>
        </section>
      </main>

      {/* 5. Footer */}
      <footer className="border-t border-white/[0.08] py-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Prime CRM Imobiliário. Todos os direitos reservados.</p>
          <div className="flex items-center gap-4">
            <Link href="/v/prime" className="hover:text-slate-300">Vitrine Exemplo</Link>
            <Link href="/login" className="hover:text-slate-300 font-bold text-lime-400">Acessar o CRM</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
