import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { comparePassword, signToken } from "@/lib/auth"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: "E-mail e senha são obrigatórios." },
        { status: 400 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      include: { tenant: true },
    })

    if (!user) {
      return NextResponse.json(
        { error: "Credenciais inválidas. Verifique seu e-mail e senha." },
        { status: 401 }
      )
    }

    const isValid = await comparePassword(password, user.passwordHash)
    if (!isValid) {
      return NextResponse.json(
        { error: "Credenciais inválidas. Verifique seu e-mail e senha." },
        { status: 401 }
      )
    }

    if (user.status !== "Ativo") {
      return NextResponse.json(
        { error: "Esta conta está suspensa ou inativa. Fale com seu gestor." },
        { status: 403 }
      )
    }

    // Atualizar último login
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() },
    })

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

