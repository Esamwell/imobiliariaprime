import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { cookies } from "next/headers"

const JWT_SECRET = process.env.JWT_SECRET || "crm-imobiliario-secret-key-2026-super-secure"

export interface JWTPayload {
  userId: string
  tenantId: string | null
  email: string
  name: string
  role: string
}

export function signToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" })
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload
  } catch {
    return null
  }
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10)
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

export async function getSessionUser(): Promise<JWTPayload | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get("crm_token")?.value
  if (!token) return null
  return verifyToken(token)
}

