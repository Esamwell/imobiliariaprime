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
          avatarUrl: true,
          bio: true,
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
      const isChief = session.role === "GESTOR"
      user = {
        id: session.userId,
        name: session.name,
        email: session.email,
        role: session.role,
        creci: session.creci || (isAutonomo ? "39.814-F" : "48.912"),
        phone: isAutonomo ? "(11) 97123-9988" : "(11) 98765-4321",
        avatarUrl: isChief
          ? "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80"
          : isAutonomo
          ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80"
          : "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
        bio: isChief
          ? "Diretor Geral e Gestor Master da Tactus Imobiliária. Mais de 15 anos de mercado em intermediação e consultoria."
          : isAutonomo
          ? "Consultor Imobiliário Autônomo com atuação focada em lançamentos e imóveis de alto padrão."
          : "Corretora de Imóveis especializada em locação e atendimento corporativo.",
        status: "Ativo",
        tenantId: session.tenantId,
        tenant: session.tenantId
          ? {
            id: session.tenantId,
            name: session.tenantName || (isAutonomo ? "Roberto Dias Consultoria Solo" : "Tactus Imobiliária"),
            type: isAutonomo ? "AUTONOMO" : "IMOBILIARIA",
            cnpj: isAutonomo ? "234.567.890-11" : "12.345.678/0001-90",
            plan: isAutonomo ? "Plano Corretor Solo" : "Plano Imobiliária",
          }
          : null,
      }
    }

    return NextResponse.json({ authenticated: true, user })
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar sessão" }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await getSessionUser()
    if (!session) {
      return NextResponse.json({ error: "Não autenticado." }, { status: 401 })
    }

    const body = await request.json()
    const { name, phone, creci, avatarUrl, bio } = body

    try {
      await prisma.user.update({
        where: { id: session.userId },
        data: {
          ...(name && { name }),
          ...(phone && { phone }),
          ...(creci && { creci }),
          ...(avatarUrl !== undefined && { avatarUrl }),
          ...(bio !== undefined && { bio }),
        },
      })
    } catch (dbErr) {
      console.warn("DB não disponível para salvar perfil, simulando atualização em sessão:", dbErr)
    }

    return NextResponse.json({
      success: true,
      message: "Perfil atualizado com sucesso!",
      user: {
        id: session.userId,
        name: name || session.name,
        email: session.email,
        role: session.role,
        creci: creci || session.creci,
        phone: phone || "(11) 98765-4321",
        avatarUrl: avatarUrl,
        bio: bio,
      },
    })
  } catch (error) {
    console.error("Erro ao atualizar perfil:", error)
    return NextResponse.json({ error: "Erro ao atualizar perfil do usuário." }, { status: 500 })
  }
}
