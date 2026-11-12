import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getSessionUser } from "@/lib/auth"

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

    const properties = await prisma.property.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: {
        images: { orderBy: { order: "asc" } },
        broker: { select: { id: true, name: true, phone: true } },
      },
    })

    return NextResponse.json({ success: true, properties })
  } catch (error) {
    console.error("Erro ao listar imóveis:", error)
    return NextResponse.json({ error: "Erro ao buscar imóveis." }, { status: 500 })
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

    const newProperty = await prisma.property.create({
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

    const updated = await prisma.property.update({
      where: { id },
      data: updateData,
    })

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

    await prisma.property.delete({
      where: { id },
    })

    return NextResponse.json({ success: true, message: "Imóvel excluído com sucesso." })
  } catch (error) {
    console.error("Erro ao excluir imóvel:", error)
    return NextResponse.json({ error: "Erro ao excluir imóvel." }, { status: 500 })
  }
}
