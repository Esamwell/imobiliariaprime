export interface PlanDefinition {
  id: "essencial" | "profissional" | "imobiliaria" | "enterprise"
  name: string
  subtitle: string
  badge?: string
  popular?: boolean
  priceMonthly: number
  priceAnnual: number
  period: string
  maxBrokers: number
  maxProperties: number
  description: string
  brokerLimit: string
  propertiesLimit: string
  features: string[]
  theme: "dark" | "blue" | "lime" | "gold"
  ctaText: string
}

export const TACTUS_PLANS: Record<string, PlanDefinition> = {
  essencial: {
    id: "essencial",
    name: "Essencial",
    subtitle: "Corretor Autônomo (1 Usuário)",
    priceMonthly: 69,
    priceAnnual: 55, // 20% off
    period: "/mês",
    maxBrokers: 1,
    maxProperties: 100,
    brokerLimit: "1 Corretor Solo Individual",
    propertiesLimit: "Até 100 Imóveis Ativos",
    description: "Projetado sob medida para o corretor independente que precisa de presença digital exclusiva e agilidade no fechamento de negócios.",
    features: [
      "1 Corretor Individual (Plano Solo)",
      "Até 100 Imóveis Ativos na Carteira",
      "Sua Vitrine Pública Exclusiva (/v/seu-nome)",
      "Botão Direto de WhatsApp com mensagem pré-configurada",
      "Funil de Vendas Kanban com etiquetas de temperatura",
      "Sincronização 1-clique com Google Agenda no celular",
      "App Mobile PWA com notificações em tempo real",
      "Captação de leads direto da vitrine pessoal",
      "Sem anúncios de concorrentes",
      "Suporte via WhatsApp"
    ],
    theme: "dark",
    ctaText: "Começar Teste de 14 Dias",
  },
  profissional: {
    id: "profissional",
    name: "Profissional",
    subtitle: "Sócios & Pequenas Equipes",
    badge: "NOVO DEGISTER",
    priceMonthly: 129,
    priceAnnual: 103, // 20% off
    period: "/mês",
    maxBrokers: 3,
    maxProperties: 500,
    brokerLimit: "Até 3 Corretores Cadastrados",
    propertiesLimit: "Até 500 Imóveis Ativos",
    description: "Ideal para duplas, sócios ou pequenas equipes que precisam de colaboração e divisão de carteira sem pagar por 10 usuários.",
    features: [
      "Até 3 Corretores com logins individuais",
      "Até 500 Imóveis Ativos na Carteira",
      "Tudo do Plano Essencial incluído",
      "Domínio Próprio Personalizado (seusite.com.br)",
      "Gestão de divisão de comissões da equipe",
      "Simulador de Financiamento Bancário para clientes",
      "Relatórios Comerciais e Métricas de VGV",
      "Distribuição de leads entre os 3 corretores",
      "Suporte Prioritário"
    ],
    theme: "blue",
    ctaText: "Assinar Plano Profissional",
  },
  imobiliaria: {
    id: "imobiliaria",
    name: "Plano Imobiliária",
    subtitle: "Chefe Master & Até 10 Braços",
    badge: "MAIS ESCOLHIDO",
    popular: true,
    priceMonthly: 249,
    priceAnnual: 199, // 20% off
    period: "/mês",
    maxBrokers: 10,
    maxProperties: 3000,
    brokerLimit: "Até 10 Corretores da Equipe",
    propertiesLimit: "Até 3.000 Imóveis Ativos",
    description: "A ferramenta definitiva para imobiliárias em crescimento: o Chefe gerencia seus braços, carteira de locações e comissões.",
    features: [
      "Até 10 Corretores da Equipe gerenciados pelo Chefe",
      "Até 3.000 Imóveis Ativos na Carteira",
      "Tudo do Plano Profissional incluído",
      "Painel 'Minha Equipe' com monitoramento de cada braço",
      "Vitrines Individuais por Corretor + Vitrine Geral da Imobiliária",
      "Gestão de Locações & Aluguéis com reajuste (IPCA/IGP-M)",
      "Divisão automatizada de comissões por venda e aluguel",
      "Google Workspace & Calendar Corporativo Integrado",
      "Suporte VIP Prioritário via WhatsApp"
    ],
    theme: "lime",
    ctaText: "Assinar Plano Imobiliária",
  },
  enterprise: {
    id: "enterprise",
    name: "Master VIP Enterprise",
    subtitle: "Redes, Franquias & Grandes Operações",
    badge: "ESCALA MÁXIMA",
    priceMonthly: 589,
    priceAnnual: 489, // 20% off
    period: "/mês",
    maxBrokers: 30,
    maxProperties: 10000,
    brokerLimit: "Até 30 Corretores (Expansível)",
    propertiesLimit: "Até 10.000 Imóveis em Nuvem",
    description: "Para grandes imobiliárias e redes com múltiplas filiais, alta demanda operacional e necessidade de integrações avançadas.",
    features: [
      "Franquia inicial de até 30 Corretores (expansível sob proposta)",
      "Até 10.000 Imóveis e Alto Armazenamento em Nuvem",
      "Tudo do Plano Imobiliária incluído",
      "Gestão Multi-Filial com Painel Super Admin Integrado",
      "Integração direta com portais (ZAP, VivaReal, OLX)",
      "Assinatura Eletrônica de Contratos Integrada",
      "Módulo de Repasse Automatizado a Proprietários",
      "API aberta para integrações personalizadas",
      "Gerente de Contas Dedicado & Onboarding VIP para equipe"
    ],
    theme: "gold",
    ctaText: "Falar com Consultor Enterprise",
  },
}

export const PLAN_ADDONS = [
  {
    id: "addon-broker",
    name: "Corretor / Assento Adicional",
    price: "R$ 19,90 a R$ 29,90/mês",
    description: "Adicione corretores extras à sua equipe sem precisar migrar de plano.",
  },
  {
    id: "addon-properties",
    name: "Pacote de 500 Imóveis Extras",
    price: "R$ 19,90/mês",
    description: "Amplie a franquia de imóveis ativos da sua carteira.",
  },
  {
    id: "addon-domain",
    name: "Domínio Próprio no Essencial",
    price: "R$ 14,90/mês",
    description: "Conecte seu próprio domínio personalizado (.com.br) na vitrine solo.",
  },
  {
    id: "addon-rentals",
    name: "Módulo Gestão de Locações",
    price: "A partir de R$ 49,90/mês",
    description: "Controle financeiro de aluguéis, contratos e reajustes automáticos.",
  },
]

export function getPlanLimitsByPlanName(planName?: string | null): PlanDefinition {
  if (!planName) return TACTUS_PLANS.imobiliaria
  const normalized = planName.toLowerCase()
  if (normalized.includes("essencial") || normalized.includes("autonomo") || normalized.includes("solo")) {
    return TACTUS_PLANS.essencial
  }
  if (normalized.includes("profissional")) {
    return TACTUS_PLANS.profissional
  }
  if (normalized.includes("enterprise") || normalized.includes("rede") || normalized.includes("vip enterprise")) {
    return TACTUS_PLANS.enterprise
  }
  return TACTUS_PLANS.imobiliaria
}

