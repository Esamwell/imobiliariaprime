/**
 * Utilitários para Integração com Google Agenda (Google Calendar)
 * Tactus CRM Imobiliário
 */

export interface CalendarEventParams {
  title: string
  description?: string
  location?: string
  startTime: string // ISO string or YYYY-MM-DDTHH:mm:ss
  endTime?: string   // ISO string or YYYY-MM-DDTHH:mm:ss
  clientName?: string
  clientPhone?: string
  propertyCode?: string
}

/**
 * Formata datas para o padrão aceito pelo Google Calendar URL Template (YYYYMMDDTHHmmssZ)
 */
function formatToGcalDate(dateStr: string): string {
  try {
    const d = new Date(dateStr)
    if (isNaN(d.getTime())) {
      // Se não for ISO completo, tenta compor com a data de hoje
      const today = new Date()
      const [hours, minutes] = dateStr.split(":")
      if (hours !== undefined && minutes !== undefined) {
        today.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0)
        return today.toISOString().replace(/-|:|\.\d\d\d/g, "")
      }
      return new Date().toISOString().replace(/-|:|\.\d\d\d/g, "")
    }
    return d.toISOString().replace(/-|:|\.\d\d\d/g, "")
  } catch {
    return new Date().toISOString().replace(/-|:|\.\d\d\d/g, "")
  }
}

/**
 * Gera um link direto (Web Intent) para adicionar o evento ao Google Agenda com 1 clique.
 * Funciona nativamente em navegadores web e em celulares (abrindo o app do Google Agenda).
 */
export function generateGoogleCalendarLink(params: CalendarEventParams): string {
  const baseUrl = "https://calendar.google.com/calendar/render?action=TEMPLATE"
  
  // Calcula start e end time (padrão: 1 hora de duração para visitas imobiliárias)
  let startDateFormatted = ""
  let endDateFormatted = ""

  if (params.startTime.includes("T")) {
    startDateFormatted = formatToGcalDate(params.startTime)
    if (params.endTime) {
      endDateFormatted = formatToGcalDate(params.endTime)
    } else {
      const end = new Date(new Date(params.startTime).getTime() + 60 * 60 * 1000)
      endDateFormatted = formatToGcalDate(end.toISOString())
    }
  } else {
    // Horário simples HH:mm
    const today = new Date()
    const [h, m] = params.startTime.split(":")
    today.setHours(parseInt(h || "10", 10), parseInt(m || "00", 10), 0, 0)
    startDateFormatted = today.toISOString().replace(/-|:|\.\d\d\d/g, "")
    
    const end = new Date(today.getTime() + 60 * 60 * 1000)
    endDateFormatted = end.toISOString().replace(/-|:|\.\d\d\d/g, "")
  }

  const fullDescription = [
    params.description || "Compromisso agendado via Tactus CRM Imobiliário.",
    "",
    params.clientName ? `👤 Cliente: ${params.clientName}` : "",
    params.clientPhone ? `📱 WhatsApp/Tel: ${params.clientPhone}` : "",
    params.propertyCode ? `🏠 Código do Imóvel: ${params.propertyCode}` : "",
    "",
    "Agendado automaticamente pelo Tactus CRM Imobiliário."
  ].filter(Boolean).join("\n")

  const queryParams = new URLSearchParams({
    text: params.title,
    dates: `${startDateFormatted}/${endDateFormatted}`,
    details: fullDescription,
    location: params.location || "",
    sf: "true",
    output: "xml"
  })

  return `${baseUrl}&${queryParams.toString()}`
}

/**
 * Gera arquivo .ics para exportação de agenda universal (Apple Calendar, Outlook, Google)
 */
export function generateIcsBlob(params: CalendarEventParams): Blob {
  const startDate = formatToGcalDate(params.startTime)
  const endDate = params.endTime ? formatToGcalDate(params.endTime) : startDate

  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Tactus CRM//Gestao Imobiliaria//PT",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${Date.now()}@tactus.com.br`,
    `DTSTAMP:${startDate}`,
    `DTSTART:${startDate}`,
    `DTEND:${endDate}`,
    `SUMMARY:${params.title}`,
    `DESCRIPTION:${(params.description || "Compromisso Tactus CRM").replace(/\n/g, "\\n")}`,
    `LOCATION:${params.location || ""}`,
    "STATUS:CONFIRMED",
    "END:VEVENT",
    "END:VCALENDAR"
  ].join("\r\n")

  return new Blob([icsContent], { type: "text/calendar;charset=utf-8" })
}
