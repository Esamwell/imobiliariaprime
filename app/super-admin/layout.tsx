"use client"

import { useState, useEffect } from "react"
import { Header } from "./components/header"
import { Sidebar } from "./components/sidebar"

export default function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => {
        if (!res.ok) throw new Error("Não autenticado")
        return res.json()
      })
      .then((data) => {
        if (data.user && data.user.role !== "SUPER_ADMIN") {
          window.location.href = "/dashboard"
        }
      })
      .catch(() => {
        // Modo demo tolerante
      })
  }, [])

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar open={sidebarOpen} />
        <main className="flex-1 overflow-y-auto overflow-x-hidden bg-background">
          {children}
        </main>
      </div>
    </div>
  )
}