import { NextResponse } from "next/server"
import { getSessionUser } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const session = await getSessionUser()
    if (!session) {
      return NextResponse.json({ authenticated: false, user: null }, { status: 401 })
    }

    let user: any = null

    try {
      user = await prisma.user.findUnique({
        where: { id: session.userId },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          creci: true,
          phone: true,
          status: true,
          tenantId: true,
          tenant: {
            select: {
              id: true,
              name: true,
              cnpj: true,
              plan: true,
            },
          },
        },
      })
    } catch (e) {
      console.warn("Prisma indisponível em /api/auth/me, gerando sessão demo a partir do JWT:", e)
    }

    if (!user) {
      user = {
        id: session.userId,
        name: session.name,
        email: session.email,
        role: session.role,
        creci: "12345-F",
        phone: "(11) 98765-4321",
        status: "Ativo",
        tenantId: session.tenantId,
        tenant: session.tenantId
          ? {
              id: session.tenantId,
              name: "Tactus Imobiliária",
              cnpj: "12.345.678/0001-90",
              plan: "Master VIP",
            }
          : null,
      }
    }

    return NextResponse.json({ authenticated: true, user })
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar sessão" }, { status: 500 })
  }
}
