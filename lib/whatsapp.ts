export function getWhatsAppLink(phone: string, message: string): string {
  // Remove tudo que não for dígito
  let clean = phone.replace(/\D/g, "")

  // Se tiver 10 ou 11 dígitos (DDD + número brasileiro), adiciona DDI 55
  if (clean.length === 10 || clean.length === 11) {
    clean = `55${clean}`
  }

  const encodedMsg = encodeURIComponent(message)
  return `https://wa.me/${clean}?text=${encodedMsg}`
}

