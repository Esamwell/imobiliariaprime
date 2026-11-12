import { NextResponse } from "next/server"
import { getSessionUser } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const session = await getSessionUser()
    if (!session) {
      return NextResponse.json({ authenticated: false, user: null }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { id: session.userId },
      include: { tenant: true },
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

    if (!user) {
      return NextResponse.json({ authenticated: false, user: null }, { status: 401 })
    }

    return NextResponse.json({ authenticated: true, user })
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar sessão" }, { status: 500 })
  }
}

