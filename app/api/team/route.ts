import { NextResponse } from "next/server"
import { getSessionUser } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { getPlanLimitsByPlanName, TACTUS_PLANS } from "@/lib/plans"

// Lista padrão de corretores vinculados à Imobiliária Tactus
let memoryTeam = [
  {
    id: "broker-1",
    name: "Carlos Eduardo Silveira",
    email: "carlos@tactus.com.br",
    phone: "(11) 98765-4321",
    creci: "48.912",
    role: "GESTOR",
    roleLabel: "Diretor Geral & Chefe Master",
    commissionRate: 100, // Imobiliária Master
    specialty: "Gestão Geral & Grandes Contas",
    status: "Ativo",
    propertiesCount: 18,
    leadsCount: 12,
    vgvMonth: "R$ 3.200.000",
    avatar: "CS",
    joinedAt: "01/01/2023",
  },
  {
    id: "broker-2",
    name: "Mariana Alencar",
    email: "mariana@tactus.com.br",
    phone: "(11) 99888-7766",
    creci: "52.140",
    role: "CORRETOR",
    roleLabel: "Corretora Sênior (Braço de Vendas)",
    commissionRate: 50,
    specialty: "Alto Padrão & Coberturas",
    status: "Ativo",
    propertiesCount: 24,
    leadsCount: 18,
    vgvMonth: "R$ 2.850.000",
    avatar: "MA",
    joinedAt: "15/03/2023",
  },
  {
    id: "broker-3",
    name: "Pedro Henrique Siqueira",
    email: "pedro.siqueira@tactus.com.br",
    phone: "(11) 97654-3210",
    creci: "61.320",
    role: "CORRETOR",
    roleLabel: "Corretor Pleno (Braço de Vendas)",
    commissionRate: 50,
    specialty: "Alphaville & Condomínios Fechados",
    status: "Ativo",
    propertiesCount: 15,
    leadsCount: 14,
    vgvMonth: "R$ 1.950.000",
    avatar: "PS",
    joinedAt: "10/08/2023",
  },
  {
    id: "broker-4",
    name: "Lucas Farias",
    email: "lucas.farias@tactus.com.br",
    phone: "(11) 96543-2109",
    creci: "58.744",
    role: "CORRETOR",
    roleLabel: "Corretor de Locação & Captação",
    commissionRate: 45,
    specialty: "Locação Comercial & Residencial",
    status: "Ativo",
    propertiesCount: 32,
    leadsCount: 11,
    vgvMonth: "R$ 920.000",
    avatar: "LF",
    joinedAt: "05/11/2023",
  },
  {
    id: "broker-5",
    name: "Beatriz Nogueira",
    email: "beatriz.nogueira@tactus.com.br",
    phone: "(11) 95432-1098",
    creci: "63.891",
    role: "CORRETOR",
    roleLabel: "Corretora Associada (Lançamentos)",
    commissionRate: 40,
    specialty: "Lançamentos na Planta & Studios",
    status: "Ativo",
    propertiesCount: 12,
    leadsCount: 9,
    vgvMonth: "R$ 450.000",
    avatar: "BN",
    joinedAt: "12/01/2024",
  },
  {
    id: "broker-6",
    name: "Juliana Prado",
    email: "juliana.prado@tactus.com.br",
    phone: "(11) 94321-0987",
    creci: "66.210",
    role: "CORRETOR",
    roleLabel: "Corretora Júnior (Novos Atendimentos)",
    commissionRate: 40,
    specialty: "Captação de Imóveis & Primeiro Imóvel",
    status: "Em Atendimento",
    propertiesCount: 8,
    leadsCount: 7,
    vgvMonth: "R$ 380.000",
    avatar: "JP",
    joinedAt: "01/04/2024",
  },
]

export async function GET() {
  try {
    const session = await getSessionUser()
    const isAutonomo = session?.role === "AUTONOMO" || session?.tenantType === "AUTONOMO"

    if (isAutonomo) {
      const planLimits = TACTUS_PLANS.essencial
      return NextResponse.json({
        isAutonomo: true,
        tenantType: "AUTONOMO",
        plan: planLimits.name,
        planId: planLimits.id,
        planSubtitle: planLimits.subtitle,
        maxBrokers: planLimits.maxBrokers,
        currentBrokers: 1,
        availableSeats: 0,
        isLimitReached: true,
        maxProperties: planLimits.maxProperties,
        message: "O plano Essencial possui 1 acesso individual e exclusivo.",
        currentBroker: {
          id: session?.userId || "roberto-autonomo-id",
          name: session?.name || "Roberto Dias",
          email: session?.email || "roberto@autonomo.com.br",
          creci: session?.creci || "39.814-F",
          role: "AUTONOMO",
          roleLabel: "Corretor Autônomo Independente",
          commissionRate: 100, // 100% de comissão direta
        },
        team: [],
        metrics: {
          totalBrokers: 1,
          activeBrokers: 1,
          totalVgv: "R$ 2.450.000",
          assignedProperties: 28,
          assignedLeads: 19,
        },
      })
    }

    // Se for Imobiliária (Gestor Master ou membro da equipe)
    // Busca plano do tenant no banco ou infere pelo nome da imobiliária
    let tenantPlanName = "imobiliaria"
    if (session?.tenantId) {
      try {
        const tenant = await prisma.tenant.findUnique({
          where: { id: session.tenantId },
          select: { plan: true },
        })
        if (tenant?.plan) tenantPlanName = tenant.plan
      } catch {}
    }

    const planLimits = getPlanLimitsByPlanName(tenantPlanName)
    const currentBrokers = memoryTeam.length
    const maxBrokers = planLimits.maxBrokers
    const availableSeats = Math.max(0, maxBrokers - currentBrokers)
    const isLimitReached = currentBrokers >= maxBrokers

    return NextResponse.json({
      isAutonomo: false,
      tenantType: "IMOBILIARIA",
      tenantName: session?.tenantName || "Tactus Imobiliária",
      plan: planLimits.name,
      planId: planLimits.id,
      planSubtitle: planLimits.subtitle,
      maxBrokers: maxBrokers,
      currentBrokers: currentBrokers,
      availableSeats: availableSeats,
      isLimitReached: isLimitReached,
      maxProperties: planLimits.maxProperties,
      isChefe: session?.role === "GESTOR" || !session,
      team: memoryTeam,
      metrics: {
        totalBrokers: currentBrokers,
        activeBrokers: memoryTeam.filter((b) => b.status === "Ativo" || b.status === "Em Atendimento").length,
        totalVgv: "R$ 9.750.000",
        assignedProperties: memoryTeam.reduce((acc, curr) => acc + curr.propertiesCount, 0),
        assignedLeads: memoryTeam.reduce((acc, curr) => acc + curr.leadsCount, 0),
      },
    })
  } catch (error) {
    console.error("Erro ao listar equipe:", error)
    return NextResponse.json({ error: "Erro ao listar equipe de corretores." }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSessionUser()
    const isAutonomo = session?.role === "AUTONOMO" || session?.tenantType === "AUTONOMO"

    if (isAutonomo) {
      return NextResponse.json(
        { 
          error: "Corretores Autônomos possuem o Plano Essencial de 1 usuário solo. Faça upgrade para o Plano Profissional (até 3 corretores) ou Plano Imobiliária (até 10 corretores) para adicionar membros à equipe.",
          code: "SOLO_PLAN_RESTRICTION"
        },
        { status: 403 }
      )
    }

    // Busca o plano do tenant para validação rigorosa de capacidade
    let tenantPlanName = "imobiliaria"
    if (session?.tenantId) {
      try {
        const tenant = await prisma.tenant.findUnique({
          where: { id: session.tenantId },
          select: { plan: true },
        })
        if (tenant?.plan) tenantPlanName = tenant.plan
      } catch {}
    }

    const planLimits = getPlanLimitsByPlanName(tenantPlanName)
    const currentBrokers = memoryTeam.length

    // BLOQUEIO RIGOROSO DE CAPACIDADE DE CORRETORES
    if (currentBrokers >= planLimits.maxBrokers) {
      return NextResponse.json(
        {
          error: `Limite de ${planLimits.maxBrokers} corretores atingido no seu ${planLimits.name}. Você já possui ${currentBrokers} corretores cadastrados. Para adicionar o próximo corretor, faça upgrade de plano ou contrate assentos adicionais.`,
          code: "PLAN_LIMIT_REACHED",
          maxBrokers: planLimits.maxBrokers,
          currentBrokers: currentBrokers,
          planName: planLimits.name,
        },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { name, email, creci, phone, commissionRate, specialty } = body

    if (!name || !email) {
      return NextResponse.json({ error: "Nome e e-mail são obrigatórios." }, { status: 400 })
    }

    // Gerar iniciais
    const initials = name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((n: string) => n[0].toUpperCase())
      .join("")

    const newBroker = {
      id: "broker-" + Date.now(),
      name,
      email,
      phone: phone || "(11) 99999-0000",
      creci: creci || "00.000-F",
      role: "CORRETOR",
      roleLabel: "Corretor Associado (Braço da Imobiliária)",
      commissionRate: Number(commissionRate) || 50,
      specialty: specialty || "Vendas Gerais & Captação",
      status: "Ativo",
      propertiesCount: 0,
      leadsCount: 0,
      vgvMonth: "R$ 0",
      avatar: initials || "CR",
      joinedAt: new Date().toLocaleDateString("pt-BR"),
    }

    memoryTeam.push(newBroker)

    return NextResponse.json({
      success: true,
      message: `Corretor ${name} adicionado à equipe com sucesso! (${memoryTeam.length}/${planLimits.maxBrokers} assentos ocupados)`,
      broker: newBroker,
      seats: {
        total: planLimits.maxBrokers,
        current: memoryTeam.length,
        available: Math.max(0, planLimits.maxBrokers - memoryTeam.length),
      }
    })
  } catch (error) {
    console.error("Erro ao adicionar corretor:", error)
    return NextResponse.json({ error: "Erro ao adicionar corretor à imobiliária." }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  try {
    const { id, action, status, commissionRate } = await request.json()

    if (!id) {
      return NextResponse.json({ error: "ID do corretor não informado." }, { status: 400 })
    }

    if (action === "toggle-status") {
      memoryTeam = memoryTeam.map((b) => {
        if (b.id === id) {
          const nextStatus = b.status === "Ativo" ? "Pausado" : "Ativo"
          return { ...b, status: nextStatus }
        }
        return b
      })
      return NextResponse.json({ success: true, message: "Status do corretor atualizado." })
    }

    if (action === "delete") {
      memoryTeam = memoryTeam.filter((b) => b.id !== id)
      return NextResponse.json({ success: true, message: "Corretor removido da imobiliária." })
    }

    if (status) {
      memoryTeam = memoryTeam.map((b) => (b.id === id ? { ...b, status } : b))
    }

    if (commissionRate) {
      memoryTeam = memoryTeam.map((b) => (b.id === id ? { ...b, commissionRate: Number(commissionRate) } : b))
    }

    return NextResponse.json({ success: true, message: "Dados do corretor atualizados." })
  } catch (error) {
    return NextResponse.json({ error: "Erro ao atualizar corretor." }, { status: 500 })
  }
}

