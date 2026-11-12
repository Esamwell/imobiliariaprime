import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getSessionUser } from "@/lib/auth"

export async function GET() {
  try {
    const session = await getSessionUser()
    let tenantId = session?.tenantId
    if (!tenantId) {
      const defaultTenant = await prisma.tenant.findFirst()
      tenantId = defaultTenant?.id || ""
    }

    const leads = await prisma.lead.findMany({
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

    return NextResponse.json({ success: true, leads })
  } catch (error) {
    console.error("Erro ao listar leads:", error)
    return NextResponse.json({ error: "Erro ao buscar leads." }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSessionUser()
    const body = await request.json()

    let tenantId = session?.tenantId
    if (!tenantId) {
      const defaultTenant = await prisma.tenant.findFirst()
      tenantId = defaultTenant?.id || ""
    }

    const newLead = await prisma.lead.create({
      data: {
        tenantId,
        brokerId: session?.userId || null,
        propertyId: body.propertyId || null,
        name: body.name,
        email: body.email || null,
        phone: body.phone,
        stage: body.stage || "NOVO",
        origin: body.origin || "Site Direto",
        budget: body.budget || null,
        notes: body.notes || null,
        hot: Boolean(body.hot),
      },
      include: {
        property: true,
        broker: true,
      },
    })

    return NextResponse.json({ success: true, lead: newLead }, { status: 201 })
  } catch (error) {
    console.error("Erro ao criar lead:", error)
    return NextResponse.json({ error: "Erro ao cadastrar lead." }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json()
    const { id, name, phone, email, origin, budget, notes, hot, stage } = body

    if (!id) {
      return NextResponse.json({ error: "ID do lead é obrigatório." }, { status: 400 })
    }

    const updatedLead = await prisma.lead.update({
      where: { id },
      data: {
        ...(name !== undefined && { name }),
        ...(phone !== undefined && { phone }),
        ...(email !== undefined && { email }),
        ...(origin !== undefined && { origin }),
        ...(budget !== undefined && { budget }),
        ...(notes !== undefined && { notes }),
        ...(hot !== undefined && { hot: Boolean(hot) }),
        ...(stage !== undefined && { stage }),
      },
      include: {
        property: true,
        broker: true,
      },
    })

    return NextResponse.json({ success: true, lead: updatedLead })
  } catch (error) {
    console.error("Erro ao atualizar lead:", error)
    return NextResponse.json({ error: "Erro ao atualizar lead." }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "ID do lead é obrigatório." }, { status: 400 })
    }

    await prisma.lead.delete({
      where: { id },
    })

    return NextResponse.json({ success: true, message: "Lead removido com sucesso." })
  } catch (error) {
    console.error("Erro ao excluir lead:", error)
    return NextResponse.json({ error: "Erro ao excluir lead." }, { status: 500 })
  }
}
