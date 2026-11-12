import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { comparePassword, signToken } from "@/lib/auth"

const DEMO_USERS: Record<string, any> = {
  "admin@sistema.com": {
    id: "admin-super-id",
    name: "Super Administrador",
    email: "admin@sistema.com",
    role: "SUPER_ADMIN",
    status: "Ativo",
    tenantId: null,
    tenant: null,
  },
  "carlos@primeimoveis.com.br": {
    id: "carlos-gestor-id",
    name: "Carlos Eduardo Silveira",
    email: "carlos@primeimoveis.com.br",
    role: "GESTOR",
    status: "Ativo",
    tenantId: "tenant-prime-id",
    tenant: {
      id: "tenant-prime-id",
      name: "Imobiliária Prime",
      cnpj: "12.345.678/0001-90",
      plan: "Master VIP",
    },
  },
  "mariana@primeimoveis.com.br": {
    id: "mariana-corretora-id",
    name: "Mariana Alencar",
    email: "mariana@primeimoveis.com.br",
    role: "CORRETOR",
    status: "Ativo",
    tenantId: "tenant-prime-id",
    tenant: {
      id: "tenant-prime-id",
      name: "Imobiliária Prime",
      cnpj: "12.345.678/0001-90",
      plan: "Master VIP",
    },
  },
}

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: "E-mail e senha são obrigatórios." },
        { status: 400 }
      )
    }

    const cleanEmail = String(email).trim().toLowerCase()
    let user: any = null

    try {
      user = await prisma.user.findUnique({
        where: { email: cleanEmail },
        include: { tenant: true },
      })
    } catch (dbError) {
      console.warn("Banco de dados indisponível no ambiente de hospedagem, ativando contas demo:", dbError)
    }

    // Se o banco não retornou ou não está conectado na nuvem, valida contas de teste oficiais
    if (!user && DEMO_USERS[cleanEmail] && password === "123456") {
      user = DEMO_USERS[cleanEmail]
    } else if (!user) {
      return NextResponse.json(
        { error: "Credenciais inválidas. Verifique seu e-mail e senha." },
        { status: 401 }
      )
    } else if (user.passwordHash) {
      const isValid = await comparePassword(password, user.passwordHash)
      if (!isValid) {
        return NextResponse.json(
          { error: "Credenciais inválidas. Verifique seu e-mail e senha." },
          { status: 401 }
        )
      }
    }

    if (user.status !== "Ativo") {
      return NextResponse.json(
        { error: "Esta conta está suspensa ou inativa. Fale com seu gestor." },
        { status: 403 }
      )
    }

    // Atualizar último login se houver banco disponível
    try {
      await prisma.user.update({
        where: { id: user.id },
        data: { lastLogin: new Date() },
      })
    } catch {}

    const token = signToken({
      userId: user.id,
      tenantId: user.tenantId,
      email: user.email,
      name: user.name,
      role: user.role,
    })

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        tenantId: user.tenantId,
        tenantName: user.tenant?.name || null,
      },
    })

    // Cookie seguro
    response.cookies.set("crm_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 dias
      path: "/",
    })

    return response
  } catch (error) {
    console.error("Erro no login:", error)
    return NextResponse.json(
      { error: "Erro interno no servidor ao realizar login." },
      { status: 500 }
    )
  }
}
