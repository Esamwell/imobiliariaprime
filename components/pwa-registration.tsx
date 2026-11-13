"use client"

import { useEffect } from "react"

export function PwaRegistration() {
  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js")
          .then((registration) => {
            console.log("PWA Service Worker registrado com sucesso:", registration.scope)
          })
          .catch((error) => {
            console.warn("Falha ao registrar Service Worker do PWA:", error)
          })
      })
    }
  }, [])

  return null
}

