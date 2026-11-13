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
              type: true,
            },
          },
        },
      })
    } catch (e) {
      console.warn("Prisma indisponível em /api/auth/me, gerando sessão demo a partir do JWT:", e)
    }

    if (!user) {
      const isAutonomo = session.role === "AUTONOMO" || session.tenantType === "AUTONOMO"
      user = {
        id: session.userId,
        name: session.name,
        email: session.email,
        role: session.role,
        creci: session.creci || (isAutonomo ? "39.814-F" : "48.912"),
        phone: isAutonomo ? "(11) 97123-9988" : "(11) 98765-4321",
        status: "Ativo",
        tenantId: session.tenantId,
        tenant: session.tenantId
          ? {
            id: session.tenantId,
            name: session.tenantName || (isAutonomo ? "Roberto Dias Consultoria Solo" : "Tactus Imobiliária"),
            type: isAutonomo ? "AUTONOMO" : "IMOBILIARIA",
            cnpj: isAutonomo ? "234.567.890-11" : "12.345.678/0001-90",
            plan: isAutonomo ? "Plano Corretor Solo (1 Usuário)" : "Plano Imobiliária Master VIP",
          }
          : null,
      }
    }

    return NextResponse.json({ authenticated: true, user })
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar sessão" }, { status: 500 })
  }
}
