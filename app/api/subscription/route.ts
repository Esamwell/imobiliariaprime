import { NextResponse } from "next/server"
import { getSessionUser } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { TACTUS_PLANS, PLAN_ADDONS, getPlanLimitsByPlanName } from "@/lib/plans"

// Memória de addons contratados para demonstração interativa
let memoryAddons: Record<string, string[]> = {
  default: ["addon-rentals"],
}

export async function GET() {
  try {
    const session = await getSessionUser()
    if (!session) {
      return NextResponse.json({ error: "Não autenticado." }, { status: 401 })
    }

    const isChief = session.role === "GESTOR"
    const isAutonomo = session.role === "AUTONOMO" || session.tenantType === "AUTONOMO"
    const isBroker = session.role === "CORRETOR"
    const canManageBilling = isChief || isAutonomo

    let tenantPlanName = isAutonomo ? "essencial" : "imobiliaria"

    if (session.tenantId) {
      try {
        const tenant = await prisma.tenant.findUnique({
          where: { id: session.tenantId },
          select: { plan: true },
        })
        if (tenant?.plan) {
          tenantPlanName = tenant.plan
        }
      } catch (e) {
        console.warn("DB não acessível em subscription GET, usando plano padrão:", e)
      }
    }

    const plan = getPlanLimitsByPlanName(tenantPlanName)
    const currentBrokers = isAutonomo ? 1 : 6
    const currentProperties = isAutonomo ? 42 : 450
    const tenantKey = session.tenantId || "default"
    const activeAddonIds = memoryAddons[tenantKey] || []

    return NextResponse.json({
      canManageBilling,
      role: session.role,
      isChief,
      isAutonomo,
      isBroker,
      tenantName: session.tenantName || (isAutonomo ? "Consultoria Roberto Dias" : "Tactus Imobiliária"),
      currentPlan: plan,
      billingCycle: "monthly", // "monthly" | "annual"
      nextBillingDate: "15/12/2026",
      paymentMethod: {
        brand: "Visa",
        last4: "4891",
        holder: isAutonomo ? "ROBERTO DIAS" : "CARLOS E SILVEIRA",
      },
      usage: {
        brokers: {
          current: currentBrokers,
          max: plan.maxBrokers,
          percent: Math.min(100, Math.round((currentBrokers / plan.maxBrokers) * 100)),
        },
        properties: {
          current: currentProperties,
          max: plan.maxProperties,
          percent: Math.min(100, Math.round((currentProperties / plan.maxProperties) * 100)),
        },
      },
      addons: PLAN_ADDONS.map((addon) => ({
        ...addon,
        active: activeAddonIds.includes(addon.id),
      })),
      invoices: [
        {
          id: "inv-2026-11",
          date: "15/11/2026",
          planName: plan.name,
          amount: isAutonomo ? "R$ 69,00" : "R$ 249,00",
          status: "Pago",
          receiptUrl: "#recibo-nov",
        },
        {
          id: "inv-2026-10",
          date: "15/10/2026",
          planName: plan.name,
          amount: isAutonomo ? "R$ 69,00" : "R$ 249,00",
          status: "Pago",
          receiptUrl: "#recibo-out",
        },
        {
          id: "inv-2026-09",
          date: "15/09/2026",
          planName: plan.name,
          amount: isAutonomo ? "R$ 69,00" : "R$ 249,00",
          status: "Pago",
          receiptUrl: "#recibo-set",
        },
      ],
    })
  } catch (error) {
    console.error("Erro ao buscar dados de plano:", error)
    return NextResponse.json({ error: "Erro ao carregar dados de assinatura." }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSessionUser()
    if (!session) {
      return NextResponse.json({ error: "Não autenticado." }, { status: 401 })
    }

    // Regra Rígida de Permissão: Braços da imobiliária (CORRETOR) NÃO podem gerenciar faturamento
    if (session.role === "CORRETOR") {
      return NextResponse.json(
        {
          error: "Acesso Negado: Como corretor associado (braço da equipe), a gestão financeira e upgrades de plano são de competência exclusiva do Gestor Master (Chefe da Imobiliária).",
          code: "FORBIDDEN_BROKER_BILLING",
        },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { action, planId, addonId } = body

    const tenantKey = session.tenantId || "default"

    if (action === "upgrade_plan") {
      if (!planId || !TACTUS_PLANS[planId]) {
        return NextResponse.json({ error: "Plano inválido selecionado." }, { status: 400 })
      }

      const selectedPlan = TACTUS_PLANS[planId]

      if (session.tenantId) {
        try {
          await prisma.tenant.update({
            where: { id: session.tenantId },
            data: { plan: selectedPlan.name },
          })
        } catch (dbErr) {
          console.warn("DB update falhou, aplicando na resposta:", dbErr)
        }
      }

      return NextResponse.json({
        success: true,
        message: `Parabéns! Seu upgrade para o ${selectedPlan.name} foi realizado com sucesso. Limites atualizados imediatamente.`,
        plan: selectedPlan,
      })
    }

    if (action === "toggle_addon") {
      if (!addonId) {
        return NextResponse.json({ error: "ID de add-on inválido." }, { status: 400 })
      }

      if (!memoryAddons[tenantKey]) {
        memoryAddons[tenantKey] = []
      }

      const currentList = memoryAddons[tenantKey]
      const exists = currentList.includes(addonId)

      if (exists) {
        memoryAddons[tenantKey] = currentList.filter((id) => id !== addonId)
        return NextResponse.json({
          success: true,
          message: "Add-on cancelado com sucesso. Não será cobrado no próximo ciclo.",
          active: false,
        })
      } else {
        memoryAddons[tenantKey].push(addonId)
        return NextResponse.json({
          success: true,
          message: "Add-on ativado com sucesso! As novas capacidades já estão disponíveis.",
          active: true,
        })
      }
    }

    return NextResponse.json({ error: "Ação não suportada." }, { status: 400 })
  } catch (error) {
    console.error("Erro na gestão de planos:", error)
    return NextResponse.json({ error: "Erro interno ao processar plano." }, { status: 500 })
  }
}

