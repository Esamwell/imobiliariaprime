import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const properties = await prisma.property.findMany({
      where: { status: "Disponível" },
      include: {
        images: true,
        broker: true,
        tenant: true,
      },
    })

    // Montar XML padrão Grupo OLX / ZAP / VivaReal
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<Carga xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <Imoveis>
`

    for (const p of properties) {
      xml += `    <Imovel>
      <CodigoImovel>${p.code}</CodigoImovel>
      <TipoImovel>${p.category}</TipoImovel>
      <SubTipoImovel>Padrão</SubTipoImovel>
      <CategoriaImovel>${p.type === "Venda" ? "Venda" : "Locacao"}</CategoriaImovel>
      <Titulo>${escapeXml(p.title)}</Titulo>
      <Observacao>${escapeXml(p.description || "")}</Observacao>
      <PrecoVenda>${p.type === "Venda" ? p.price : 0}</PrecoVenda>
      <PrecoLocacao>${p.type === "Aluguel" ? p.price : 0}</PrecoLocacao>
      <PrecoCondominio>${p.condoFee || 0}</PrecoCondominio>
      <ValorIPTU>${p.iptu || 0}</ValorIPTU>
      <AreaUtil>${p.area}</AreaUtil>
      <QtdDormitorios>${p.bedrooms}</QtdDormitorios>
      <QtdSuites>${p.suites}</QtdSuites>
      <QtdBanheiros>${p.bathrooms}</QtdBanheiros>
      <QtdVagas>${p.parking}</QtdVagas>
      <UF>${p.state}</UF>
      <Cidade>${escapeXml(p.city)}</Cidade>
      <Bairro>${escapeXml(p.neighborhood)}</Bairro>
      <Endereco>${escapeXml(p.address || "")}</Endereco>
      <CEP>${p.zipCode || ""}</CEP>
      <Fotos>
        <Foto>
          <URLArquivo>https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200</URLArquivo>
          <Principal>1</Principal>
        </Foto>
      </Fotos>
    </Imovel>
`
    }

    xml += `  </Imoveis>
</Carga>`

    return new NextResponse(xml, {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    })
  } catch (error) {
    console.error("Erro ao gerar feed XML:", error)
    return new NextResponse("<error>Erro ao gerar feed</error>", { status: 500 })
  }
}

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case "<": return "&lt;"
      case ">": return "&gt;"
      case "&": return "&amp;"
      case "'": return "&apos;"
      case '"': return "&quot;"
      default: return c
    }
  })
}

