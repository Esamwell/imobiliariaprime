import { NextResponse } from "next/server"

let isConnected = true

export async function POST(request: Request) {
  try {
    const { action, email } = await request.json()

    if (action === "disconnect") {
      isConnected = false
      return NextResponse.json({
        success: true,
        connected: false,
        message: "Google Agenda desconectado do Tactus CRM.",
      })
    }

    isConnected = true
    return NextResponse.json({
      success: true,
      connected: true,
      email: email || "carlos.silveira@tactus.com.br",
      calendarName: "Tactus - Visitas & Negócios",
      message: "Conta Google conectada com sucesso! Eventos e visitas serão sincronizados automaticamente.",
    })
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao alterar conexão do Google Agenda." },
      { status: 500 }
    )
  }
}
