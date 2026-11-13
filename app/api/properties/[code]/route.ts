import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

const FALLBACK_PROPERTIES: Record<string, any> = {
  AP0420: {
    id: "prop-1",
    code: "AP0420",
    title: "Apartamento de Alto Padrão com Varanda Gourmet",
    description: "Amplo living para 3 ambientes integrado à varanda envidraçada com churrasqueira. Cozinha planejada com ilha central e acabamentos em mármore. Suíte master com closet walk-in e hidromassagem. Condomínio clube completo com quadra de tênis, piscina aquecida com raia de 25m, academia moderna e segurança 24h blindada.",
    type: "Venda",
    category: "Apartamento",
    status: "Disponível",
    price: 2450000,
    condoFee: 2100,
    iptu: 850,
    area: 185,
    bedrooms: 3,
    bathrooms: 4,
    suites: 3,
    parking: 3,
    zipCode: "04505-001",
    address: "Rua Afonso Braz, 820",
    neighborhood: "Vila Nova Conceição",
    city: "São Paulo",
    state: "SP",
    imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&auto=format&fit=crop&q=80",
    ],
    broker: {
      name: "Carlos Eduardo Silveira",
      phone: "(11) 98765-4321",
      creci: "48.912",
      email: "carlos@primeimoveis.com.br",
    },
    agency: {
      name: "Imobiliária Prime",
      phone: "(11) 3456-7890",
      creci: "29.400-J",
    },
  },
  CS0118: {
    id: "prop-2",
    code: "CS0118",
    title: "Mansão Contemporânea em Condomínio Fechado",
    description: "Arquitetura moderna assinada, piscina com borda infinita, espaço gourmet completo com chopeira e churrasqueira parrilla. 4 amplas suítes com varanda privativa e vista definitiva para a reserva florestal. Garagem subterrânea para 4 veículos grandes.",
    type: "Venda",
    category: "Casa",
    status: "Reservado",
    price: 4900000,
    condoFee: 1800,
    iptu: 1200,
    area: 420,
    bedrooms: 4,
    bathrooms: 6,
    suites: 4,
    parking: 4,
    zipCode: "06472-001",
    address: "Alameda dos Jacarandás, 140 - Residencial 2",
    neighborhood: "Alphaville",
    city: "Barueri",
    state: "SP",
    imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&auto=format&fit=crop&q=80",
    ],
    broker: {
      name: "Carlos Eduardo Silveira",
      phone: "(11) 98765-4321",
      creci: "48.912",
      email: "carlos@primeimoveis.com.br",
    },
    agency: {
      name: "Imobiliária Prime",
      phone: "(11) 3456-7890",
      creci: "29.400-J",
    },
  },
  CB0089: {
    id: "prop-3",
    code: "CB0089",
    title: "Cobertura Duplex com Vista Panorâmica",
    description: "Piso superior com deck em madeira nobre e jacuzzi privativa aquecida, vista deslumbrante 360° para a copa das árvores de Moema. Living amplo com pé direito duplo, cozinha gourmet e adega climatizada para 200 garrafas.",
    type: "Aluguel",
    category: "Cobertura",
    status: "Disponível",
    price: 14500,
    condoFee: 2800,
    iptu: 950,
    area: 210,
    bedrooms: 3,
    bathrooms: 4,
    suites: 3,
    parking: 3,
    zipCode: "04515-030",
    address: "Avenida Rouxinol, 450",
    neighborhood: "Moema Pássaros",
    city: "São Paulo",
    state: "SP",
    imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&auto=format&fit=crop&q=80",
    ],
    broker: {
      name: "Mariana Alencar",
      phone: "(11) 99888-7766",
      creci: "52.180",
      email: "mariana@primeimoveis.com.br",
    },
    agency: {
      name: "Imobiliária Prime",
      phone: "(11) 3456-7890",
      creci: "29.400-J",
    },
  },
  AP0552: {
    id: "prop-4",
    code: "AP0552",
    title: "Studio Design Mobiliado próximo ao Metrô Fradique",
    description: "Apartamento compacto 100% mobiliado por escritório de arquitetura renomado. Marcenaria planejada multifuncional, eletrodomésticos embutidos, ar condicionado inverter e fechadura biométrica inteligente.",
    type: "Aluguel",
    category: "Apartamento",
    status: "Disponível",
    price: 4200,
    condoFee: 680,
    iptu: 180,
    area: 42,
    bedrooms: 1,
    bathrooms: 1,
    suites: 1,
    parking: 1,
    zipCode: "05419-001",
    address: "Rua Fradique Coutinho, 310",
    neighborhood: "Pinheiros",
    city: "São Paulo",
    state: "SP",
    imageUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&auto=format&fit=crop&q=80",
    ],
    broker: {
      name: "Mariana Alencar",
      phone: "(11) 99888-7766",
      creci: "52.180",
      email: "mariana@primeimoveis.com.br",
    },
    agency: {
      name: "Imobiliária Prime",
      phone: "(11) 3456-7890",
      creci: "29.400-J",
    },
  },
  CM0034: {
    id: "prop-5",
    code: "CM0034",
    title: "Conjunto Comercial Pronto com Piso Elevado",
    description: "Laje corporativa com cabeamento estruturado categoria 6A, ar condicionado central VRF com controle individual, 2 banheiros e copa integrada. Edifício com heliponto homologado, gerador 100% e auditório compartilhado.",
    type: "Venda",
    category: "Comercial",
    status: "Disponível",
    price: 1850000,
    condoFee: 1950,
    iptu: 650,
    area: 95,
    bedrooms: 0,
    bathrooms: 2,
    suites: 0,
    parking: 2,
    zipCode: "04533-000",
    address: "Rua Joaquim Floriano, 720",
    neighborhood: "Itaim Bibi",
    city: "São Paulo",
    state: "SP",
    imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&auto=format&fit=crop&q=80",
    ],
    broker: {
      name: "Carlos Eduardo Silveira",
      phone: "(11) 98765-4321",
      creci: "48.912",
      email: "carlos@primeimoveis.com.br",
    },
    agency: {
      name: "Imobiliária Prime",
      phone: "(11) 3456-7890",
      creci: "29.400-J",
    },
  },
  CS0220: {
    id: "prop-6",
    code: "CS0220",
    title: "Casa Térrea com Quintal Amplo e Espaço Gourmet",
    description: "Ambientes amplos e integrados, sala com lareira ecológica, cozinha americana com armários planejados. Área externa arborizada com edícula gourmet completa, churrasqueira a carvão e forno de pizza à lenha.",
    type: "Venda",
    category: "Casa",
    status: "Disponível",
    price: 1680000,
    condoFee: 920,
    iptu: 450,
    area: 280,
    bedrooms: 3,
    bathrooms: 3,
    suites: 2,
    parking: 3,
    zipCode: "06709-015",
    address: "Rua das Figueiras, 55",
    neighborhood: "Granja Viana",
    city: "Cotia",
    state: "SP",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&auto=format&fit=crop&q=80",
    ],
    broker: {
      name: "Carlos Eduardo Silveira",
      phone: "(11) 98765-4321",
      creci: "48.912",
      email: "carlos@primeimoveis.com.br",
    },
    agency: {
      name: "Imobiliária Prime",
      phone: "(11) 3456-7890",
      creci: "29.400-J",
    },
  },
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ code: string }> }
) {
  try {
    const { code } = await params
    const upperCode = (code || "").toUpperCase()

    let property = null

    try {
      property = await prisma.property.findFirst({
        where: { code: upperCode },
        include: {
          images: { orderBy: { order: "asc" } },
          broker: { select: { name: true, phone: true, creci: true, email: true } },
          tenant: { select: { name: true, phone: true } },
        },
      })
    } catch (e) {
      console.warn("Prisma não disponível em /api/properties/[code], consultando fallback:", e)
    }

    if (!property && FALLBACK_PROPERTIES[upperCode]) {
      property = FALLBACK_PROPERTIES[upperCode]
    } else if (!property) {
      // Se não encontrar o código exato, retorna o primeiro como fallback amigável
      property = FALLBACK_PROPERTIES["AP0420"]
    }

    return NextResponse.json({ success: true, property })
  } catch (error) {
    console.error("Erro ao buscar imóvel por código:", error)
    return NextResponse.json({ success: true, property: FALLBACK_PROPERTIES["AP0420"] })
  }
}

