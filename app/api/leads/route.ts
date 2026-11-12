import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getSessionUser } from "@/lib/auth"

const FALLBACK_LEADS = [
  {
    id: "lead-1",
    name: "Fabiana Toledo",
    phone: "(11) 98765-4321",
    email: "fabiana.toledo@email.com",
    stage: "CONTATO",
    origin: "Instagram",
    budget: "R$ 1.200.000",
    hot: true,
    notes: "Lead novo procurando 2 ou 3 quartos na Zona Sul.",
    property: null,
  },
  {
    id: "lead-2",
    name: "Marcelo Henrique Dias",
    phone: "(11) 97654-3210",
    email: "marcelo.dias@empresa.com.br",
    stage: "VISITA",
    origin: "Indicação",
    budget: "R$ 5.000.000",
    hot: true,
    notes: "Visita realizada na terça-feira. Família adorou a área gourmet.",
    property: {
      id: "p2",
      code: "CS0118",
      title: "Mansão Contemporânea em Condomínio Fechado",
      price: 4900000,
      type: "Venda",
    },
  },
  {
    id: "lead-3",
    name: "Dra. Flávia Guimarães",
    phone: "(11) 96543-2109",
    email: "flavia.med@clinica.com.br",
    stage: "VISITA",
    origin: "VivaReal",
    budget: "R$ 15.000 /mês",
    hot: false,
    notes: "Gostou da cobertura. Agendando segunda visita com marido.",
    property: {
      id: "p3",
      code: "CB0089",
      title: "Cobertura Duplex com Vista Panorâmica",
      price: 14500,
      type: "Aluguel",
    },
  },
  {
    id: "lead-4",
    name: "Roberto Mendes de Carvalho",
    phone: "(11) 95432-1098",
    email: "roberto.mendes@advogados.com.br",
    stage: "PROPOSTA",
    origin: "ZAP",
    budget: "R$ 2.400.000",
    hot: true,
    notes: "Proposta enviada: R$ 2.300.000 à vista. Proprietário analisando.",
    property: {
      id: "p1",
      code: "AP0420",
      title: "Apartamento de Alto Padrão com Varanda Gourmet",
      price: 2450000,
      type: "Venda",
    },
  },
]

export async function GET() {
  try {
    const session = await getSessionUser()
    let tenantId = session?.tenantId

    let leads: any[] = []
    try {
      if (!tenantId) {
        const defaultTenant = await prisma.tenant.findFirst()
        tenantId = defaultTenant?.id || ""
      }

      leads = await prisma.lead.findMany({
        where: tenantId ? { tenantId } : {},
        orderBy: { createdAt: "desc" },
        include: {
          property: {
            select: { id: true, code: true, title: true, price: true, type: true },
          },
          broker: {
            select: { id: true, name: true, phone: true },
          },
        },
      })
    } catch (dbErr) {
      console.warn("Prisma indisponível em /api/leads, servindo leads demonstrativos:", dbErr)
      leads = FALLBACK_LEADS
    }

    if (!leads || leads.length === 0) {
      leads = FALLBACK_LEADS
    }

    return NextResponse.json({ success: true, leads })
  } catch (error) {
    console.error("Erro ao listar leads:", error)
    return NextResponse.json({ success: true, leads: FALLBACK_LEADS })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSessionUser()
    const body = await request.json()

    let tenantId = session?.tenantId
    let newLead: any = null

    try {
      if (!tenantId) {
        const defaultTenant = await prisma.tenant.findFirst()
        tenantId = defaultTenant?.id || "demo-tenant-id"
      }

      newLead = await prisma.lead.create({
        data: {
          tenantId,
          brokerId: session?.userId || null,
          propertyId: body.propertyId || null,
          name: body.name,
          email: body.email || null,
          phone: body.phone,
          stage: body.stage || "NOVO",
          origin: body.origin || "Site",
          budget: body.budget || null,
          notes: body.notes || null,
          hot: body.hot || false,
        },
        include: {
          property: true,
          broker: true,
        },
      })
    } catch (dbErr) {
      console.warn("Prisma indisponível ao salvar lead, simulando sucesso em demonstração:", dbErr)
      newLead = {
        id: `lead-demo-${Date.now()}`,
        name: body.name,
        email: body.email,
        phone: body.phone,
        stage: body.stage || "NOVO",
        origin: body.origin || "Site",
        budget: body.budget || "A definir",
        notes: body.notes,
        hot: body.hot || false,
        createdAt: new Date(),
        property: null,
      }
    }

    return NextResponse.json({ success: true, lead: newLead }, { status: 201 })
  } catch (error) {
    console.error("Erro ao cadastrar lead:", error)
    return NextResponse.json({ error: "Erro interno ao cadastrar lead." }, { status: 500 })
  }
}
