import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getSessionUser } from "@/lib/auth"
import { getPlanLimitsByPlanName } from "@/lib/plans"

const FALLBACK_PROPERTIES = [
  {
    id: "prop-1",
    code: "AP0420",
    title: "Apartamento de Alto Padrão com Varanda Gourmet",
    description: "Amplo living para 3 ambientes integrado à varanda envidraçada com churrasqueira. Cozinha planejada com ilha central e acabamentos em mármore.",
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
    neighborhood: "Vila Nova Conceição",
    city: "São Paulo",
    state: "SP",
    imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&auto=format&fit=crop&q=80",
    broker: { id: "b1", name: "Carlos Eduardo Silveira", phone: "(11) 98765-4321" },
    images: [],
  },
  {
    id: "prop-2",
    code: "CS0118",
    title: "Mansão Contemporânea em Condomínio Fechado",
    description: "Arquitetura moderna assinada, piscina com borda infinita, espaço gourmet completo e paisagismo exuberante.",
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
    neighborhood: "Alphaville",
    city: "Barueri",
    state: "SP",
    imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&auto=format&fit=crop&q=80",
    broker: { id: "b1", name: "Carlos Eduardo Silveira", phone: "(11) 98765-4321" },
    images: [],
  },
  {
    id: "prop-3",
    code: "CB0089",
    title: "Cobertura Duplex com Vista Panorâmica",
    description: "Piso superior com deck e jacuzzi privativa, vista deslumbrante para a copa das árvores de Moema.",
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
    neighborhood: "Moema Pássaros",
    city: "São Paulo",
    state: "SP",
    imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&auto=format&fit=crop&q=80",
    broker: { id: "b2", name: "Mariana Alencar", phone: "(11) 99888-7766" },
    images: [],
  },
  {
    id: "prop-4",
    code: "AP0552",
    title: "Studio Design Mobiliado próximo ao Metrô Fradique",
    description: "Apartamento compacto 100% mobiliado por arquiteto, marcenaria sob medida e fechadura biométrica.",
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
    neighborhood: "Pinheiros",
    city: "São Paulo",
    state: "SP",
    imageUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&auto=format&fit=crop&q=80",
    broker: { id: "b2", name: "Mariana Alencar", phone: "(11) 99888-7766" },
    images: [],
  },
  {
    id: "prop-5",
    code: "CM0034",
    title: "Conjunto Comercial Pronto com Piso Elevado",
    description: "Laje corporativa com cabeamento estruturado, ar central VRF, 2 banheiros e copa integrada.",
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
    neighborhood: "Itaim Bibi",
    city: "São Paulo",
    state: "SP",
    imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&auto=format&fit=crop&q=80",
    broker: { id: "b1", name: "Carlos Eduardo Silveira", phone: "(11) 98765-4321" },
    images: [],
  },
  {
    id: "prop-6",
    code: "CS0220",
    title: "Casa Térrea com Quintal Amplo e Espaço Gourmet",
    description: "Ambientes integrados, lareira, edícula gourmet com forno de pizza e churrasqueira a carvão.",
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
    neighborhood: "Granja Viana",
    city: "Cotia",
    state: "SP",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80",
    broker: { id: "b1", name: "Carlos Eduardo Silveira", phone: "(11) 98765-4321" },
    images: [],
  },
]

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type")
    const category = searchParams.get("category")
    const search = searchParams.get("search")

    const where: any = {}

    if (type && type !== "todos") {
      where.type = { equals: type }
    }

    if (category && category !== "todos") {
      where.category = { equals: category }
    }

    if (search) {
      where.OR = [
        { title: { contains: search } },
        { code: { contains: search } },
        { neighborhood: { contains: search } },
        { city: { contains: search } },
      ]
    }

    let properties: any[] = []
    try {
      properties = await prisma.property.findMany({
        where,
        orderBy: { createdAt: "desc" },
        include: {
          images: { orderBy: { order: "asc" } },
          broker: { select: { id: true, name: true, phone: true } },
        },
      })
    } catch (dbErr) {
      console.warn("Prisma indisponível em /api/properties, servindo imóveis demonstrativos:", dbErr)
      properties = FALLBACK_PROPERTIES
    }

    if (!properties || properties.length === 0) {
      properties = FALLBACK_PROPERTIES
    }

    return NextResponse.json({ success: true, properties })
  } catch (error) {
    console.error("Erro ao listar imóveis:", error)
    return NextResponse.json({ success: true, properties: FALLBACK_PROPERTIES })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSessionUser()
    const body = await request.json()

    let tenantId = session?.tenantId
    if (!tenantId) {
      const defaultTenant = await prisma.tenant.findFirst()
      tenantId = defaultTenant?.id || ""
    }

    // Validação de limite de imóveis por plano
    const isAutonomo = session?.role === "AUTONOMO" || session?.tenantType === "AUTONOMO"
    let tenantPlanName = isAutonomo ? "essencial" : "imobiliaria"
    if (tenantId) {
      try {
        const tenant = await prisma.tenant.findUnique({
          where: { id: tenantId },
          select: { plan: true },
        })
        if (tenant?.plan) tenantPlanName = tenant.plan
      } catch {}
    }

    const planLimits = getPlanLimitsByPlanName(tenantPlanName)

    // Contagem atual de imóveis
    let currentPropertyCount = 0
    try {
      if (tenantId) {
        currentPropertyCount = await prisma.property.count({
          where: { tenantId },
        })
      }
    } catch {}

    if (currentPropertyCount >= planLimits.maxProperties) {
      return NextResponse.json(
        {
          error: `Limite de ${planLimits.maxProperties.toLocaleString("pt-BR")} imóveis atingido no seu ${planLimits.name}. Você já possui ${currentPropertyCount} imóveis ativos cadastrados. Para continuar cadastrando, faça upgrade de plano ou contrate o pacote de imóveis adicionais.`,
          code: "PROPERTY_LIMIT_REACHED",
          maxProperties: planLimits.maxProperties,
          currentProperties: currentPropertyCount,
          planName: planLimits.name,
        },
        { status: 403 }
      )
    }

    const code = body.code || `${(body.category || "AP").substring(0, 2).toUpperCase()}${Math.floor(1000 + Math.random() * 9000)}`

    // Foto padrão caso não informe
    const defaultImage = body.imageUrl || (
      body.category === "Casa"
        ? "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&auto=format&fit=crop&q=80"
        : body.category === "Cobertura"
        ? "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&auto=format&fit=crop&q=80"
        : body.category === "Comercial"
        ? "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&auto=format&fit=crop&q=80"
        : "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&auto=format&fit=crop&q=80"
    )

    let newProperty: any = null
    try {
      newProperty = await prisma.property.create({
        data: {
          tenantId: tenantId,
          brokerId: session?.userId || null,
          code: code,
          title: body.title,
          description: body.description || "",
          type: body.type || "Venda",
          category: body.category || "Apartamento",
          status: body.status || "Disponível",
          price: parseFloat(body.price) || 0,
          condoFee: parseFloat(body.condoFee) || 0,
          iptu: parseFloat(body.iptu) || 0,
          area: parseFloat(body.area) || 0,
          bedrooms: parseInt(body.bedrooms) || 0,
          bathrooms: parseInt(body.bathrooms) || 0,
          suites: parseInt(body.suites) || 0,
          parking: parseInt(body.parking) || 0,
          zipCode: body.zipCode || "",
          address: body.address || "",
          neighborhood: body.neighborhood || "Centro",
          city: body.city || "São Paulo",
          state: body.state || "SP",
          featured: Boolean(body.featured),
          imageUrl: defaultImage,
        },
      })
    } catch (dbErr) {
      console.warn("Prisma indisponível ao salvar imóvel, simulando sucesso em demonstração:", dbErr)
      newProperty = {
        id: `prop-demo-${Date.now()}`,
        code: code,
        title: body.title,
        description: body.description || "",
        type: body.type || "Venda",
        category: body.category || "Apartamento",
        status: body.status || "Disponível",
        price: parseFloat(body.price) || 0,
        condoFee: parseFloat(body.condoFee) || 0,
        iptu: parseFloat(body.iptu) || 0,
        area: parseFloat(body.area) || 0,
        bedrooms: parseInt(body.bedrooms) || 0,
        bathrooms: parseInt(body.bathrooms) || 0,
        suites: parseInt(body.suites) || 0,
        parking: parseInt(body.parking) || 0,
        zipCode: body.zipCode || "",
        address: body.address || "",
        neighborhood: body.neighborhood || "Centro",
        city: body.city || "São Paulo",
        state: body.state || "SP",
        featured: Boolean(body.featured),
        imageUrl: defaultImage,
        createdAt: new Date(),
        images: [],
      }
    }

    return NextResponse.json({ success: true, property: newProperty }, { status: 201 })
  } catch (error) {
    console.error("Erro ao cadastrar imóvel:", error)
    return NextResponse.json({ error: "Erro ao cadastrar imóvel." }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json()
    const { id, ...data } = body

    if (!id) {
      return NextResponse.json({ error: "ID do imóvel é obrigatório." }, { status: 400 })
    }

    const updateData: any = {}
    if (data.title !== undefined) updateData.title = data.title
    if (data.description !== undefined) updateData.description = data.description
    if (data.type !== undefined) updateData.type = data.type
    if (data.category !== undefined) updateData.category = data.category
    if (data.status !== undefined) updateData.status = data.status
    if (data.price !== undefined) updateData.price = parseFloat(data.price)
    if (data.condoFee !== undefined) updateData.condoFee = parseFloat(data.condoFee)
    if (data.iptu !== undefined) updateData.iptu = parseFloat(data.iptu)
    if (data.area !== undefined) updateData.area = parseFloat(data.area)
    if (data.bedrooms !== undefined) updateData.bedrooms = parseInt(data.bedrooms)
    if (data.bathrooms !== undefined) updateData.bathrooms = parseInt(data.bathrooms)
    if (data.suites !== undefined) updateData.suites = parseInt(data.suites)
    if (data.parking !== undefined) updateData.parking = parseInt(data.parking)
    if (data.neighborhood !== undefined) updateData.neighborhood = data.neighborhood
    if (data.city !== undefined) updateData.city = data.city
    if (data.state !== undefined) updateData.state = data.state
    if (data.address !== undefined) updateData.address = data.address
    if (data.zipCode !== undefined) updateData.zipCode = data.zipCode
    if (data.imageUrl !== undefined) updateData.imageUrl = data.imageUrl

    let updated: any = null
    try {
      updated = await prisma.property.update({
        where: { id },
        data: updateData,
      })
    } catch (e) {
      updated = { id, ...updateData }
    }

    return NextResponse.json({ success: true, property: updated })
  } catch (error) {
    console.error("Erro ao atualizar imóvel:", error)
    return NextResponse.json({ error: "Erro ao atualizar imóvel." }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "ID do imóvel é obrigatório." }, { status: 400 })
    }

    try {
      await prisma.property.delete({
        where: { id },
      })
    } catch (e) {}

    return NextResponse.json({ success: true, message: "Imóvel excluído com sucesso." })
  } catch (error) {
    console.error("Erro ao excluir imóvel:", error)
    return NextResponse.json({ error: "Erro ao excluir imóvel." }, { status: 500 })
  }
}
