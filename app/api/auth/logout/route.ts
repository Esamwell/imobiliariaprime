import { NextResponse } from "next/server"

export async function POST() {
  const response = NextResponse.json({ success: true, message: "Sessão encerrada com sucesso." })
  response.cookies.delete("crm_token")
  return response
}

