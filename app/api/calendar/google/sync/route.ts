import { NextResponse } from "next/server"
import { generateGoogleCalendarLink } from "@/lib/google-calendar"

// Estado em memória / cache para demonstração da integração
let googleCalendarConfig = {
  connected: true,
  email: "carlos.silveira@tactus.com.br",
  calendarName: "Tactus - Visitas & Negócios",
  autoSync: true,
  lastSync: "Agora",
  syncedCount: 14,
}

export async function GET() {
  return NextResponse.json({
    success: true,
    data: googleCalendarConfig,
  })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, location, time, clientName, clientPhone, propertyCode, notes } = body

    if (!title) {
      return NextResponse.json(
        { error: "Título do compromisso é obrigatório." },
        { status: 400 }
      )
    }

    const gcalUrl = generateGoogleCalendarLink({
      title,
      location,
      startTime: time || "10:00",
      description: notes || `Visita agendada para o cliente ${clientName || "Interessado"}.`,
      clientName,
      clientPhone,
      propertyCode,
    })

    googleCalendarConfig.syncedCount += 1
    googleCalendarConfig.lastSync = "Agora mesmo"

    return NextResponse.json({
      success: true,
      message: "Compromisso sincronizado com o Google Agenda com sucesso!",
      eventId: `gcal-${Date.now()}`,
      googleCalendarUrl: gcalUrl,
      syncedAt: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Erro ao sincronizar com Google Agenda:", error)
    return NextResponse.json(
      { error: "Erro interno ao processar sincronização com Google Agenda." },
      { status: 500 }
    )
  }
}
