const { PrismaClient } = require("@prisma/client")
const bcrypt = require("bcrypt")

const prisma = new PrismaClient()

async function main() {
  console.log("Iniciando seed do banco de dados com fotos e dados atualizados...")

  // Limpar dados existentes
  await prisma.financialTransaction.deleteMany()
  await prisma.rentalContract.deleteMany()
  await prisma.lead.deleteMany()
  await prisma.propertyImage.deleteMany()
  await prisma.property.deleteMany()
  await prisma.user.deleteMany()
  await prisma.tenant.deleteMany()

  const passwordHash = await bcrypt.hash("123456", 10)

  // 1. Criar Super Admin
  const superAdmin = await prisma.user.create({
    data: {
      name: "Administrador Central",
      email: "admin@sistema.com",
      passwordHash: passwordHash,
      role: "SUPER_ADMIN",
      status: "Ativo",
    },
  })
  console.log("Super Admin criado:", superAdmin.email)

  // 2. Criar Imobiliária Tenant Principal
  const tenantPrime = await prisma.tenant.create({
    data: {
      name: "Imobiliária Prime",
      cnpj: "12.345.678/0001-90",
      email: "contato@primeimoveis.com.br",
      phone: "(11) 3456-7890",
      plan: "Master VIP",
      status: "Ativo",
    },
  })
  console.log("Tenant criado:", tenantPrime.name)

  // 3. Criar Usuários da Imobiliária Prime
  const corretorCarlos = await prisma.user.create({
    data: {
      tenantId: tenantPrime.id,
      name: "Carlos Eduardo Silveira",
      email: "carlos@primeimoveis.com.br",
      passwordHash: passwordHash,
      role: "GESTOR",
      creci: "48.912",
      phone: "(11) 98765-4321",
      status: "Ativo",
    },
  })

  const corretoraMariana = await prisma.user.create({
    data: {
      tenantId: tenantPrime.id,
      name: "Mariana Alencar",
      email: "mariana@primeimoveis.com.br",
      passwordHash: passwordHash,
      role: "CORRETOR",
      creci: "52.140",
      phone: "(11) 99888-7766",
      status: "Ativo",
    },
  })

  // 4. Criar Imóveis com Fotos Reais em Alta Definição
  const prop1 = await prisma.property.create({
    data: {
      tenantId: tenantPrime.id,
      brokerId: corretorCarlos.id,
      code: "AP0420",
      title: "Apartamento de Alto Padrão com Varanda Gourmet",
      description: "Amplo living para 3 ambientes integrado à varanda envidraçada com churrasqueira. Cozinha planejada com ilha central e acabamentos em mármore. Suíte master com closet walk-in e hidromassagem.",
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
      neighborhood: "Vila Nova Conceição",
      city: "São Paulo",
      state: "SP",
      zipCode: "04505-001",
      featured: true,
      imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&auto=format&fit=crop&q=80",
    },
  })

  const prop2 = await prisma.property.create({
    data: {
      tenantId: tenantPrime.id,
      brokerId: corretorCarlos.id,
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
      neighborhood: "Alphaville",
      city: "Barueri",
      state: "SP",
      zipCode: "06472-001",
      featured: true,
      imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&auto=format&fit=crop&q=80",
    },
  })

  const prop3 = await prisma.property.create({
    data: {
      tenantId: tenantPrime.id,
      brokerId: corretoraMariana.id,
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
      neighborhood: "Moema Pássaros",
      city: "São Paulo",
      state: "SP",
      zipCode: "04515-030",
      featured: true,
      imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&auto=format&fit=crop&q=80",
    },
  })

  const prop4 = await prisma.property.create({
    data: {
      tenantId: tenantPrime.id,
      brokerId: corretoraMariana.id,
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
      neighborhood: "Pinheiros",
      city: "São Paulo",
      state: "SP",
      zipCode: "05419-001",
      featured: false,
      imageUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&auto=format&fit=crop&q=80",
    },
  })

  const prop5 = await prisma.property.create({
    data: {
      tenantId: tenantPrime.id,
      brokerId: corretorCarlos.id,
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
      neighborhood: "Itaim Bibi",
      city: "São Paulo",
      state: "SP",
      zipCode: "04533-000",
      featured: false,
      imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&auto=format&fit=crop&q=80",
    },
  })

  const prop6 = await prisma.property.create({
    data: {
      tenantId: tenantPrime.id,
      brokerId: corretorCarlos.id,
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
      neighborhood: "Granja Viana",
      city: "Cotia",
      state: "SP",
      zipCode: "06709-015",
      featured: false,
      imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80",
    },
  })

  // 5. Criar Leads no Funil (Kanban)
  await prisma.lead.createMany({
    data: [
      {
        tenantId: tenantPrime.id,
        brokerId: corretorCarlos.id,
        propertyId: prop1.id,
        name: "Renata Vasconcelos",
        email: "renata.v@gmail.com",
        phone: "(11) 98765-4321",
        stage: "PROPOSTA",
        origin: "ZAP Imóveis",
        budget: "R$ 2.450.000",
        hot: true,
        notes: "Enviou proposta de R$ 2.300.000 à vista, proprietário analisando.",
      },
      {
        tenantId: tenantPrime.id,
        brokerId: corretorCarlos.id,
        propertyId: prop2.id,
        name: "Marcelo Henrique Dias",
        email: "marcelo.dias@empresarial.com",
        phone: "(11) 97654-3210",
        stage: "VISITA",
        origin: "Indicação",
        budget: "R$ 4.900.000",
        hot: true,
        notes: "Visita realizada na terça-feira. Família adorou a área gourmet.",
      },
      {
        tenantId: tenantPrime.id,
        brokerId: corretoraMariana.id,
        propertyId: prop3.id,
        name: "Dra. Flávia Guimarães",
        email: "dra.flavia@medicina.com.br",
        phone: "(11) 99123-4567",
        stage: "VISITA",
        origin: "VivaReal",
        budget: "R$ 15.000/mês",
        hot: false,
        notes: "Gostou da cobertura. Agendando segunda visita com marido.",
      },
      {
        tenantId: tenantPrime.id,
        brokerId: corretoraMariana.id,
        name: "Fabiana Toledo",
        email: "fabiana.t@outlook.com",
        phone: "(11) 99887-1122",
        stage: "NOVO",
        origin: "Instagram",
        budget: "R$ 1.200.000",
        hot: true,
        notes: "Lead novo procurando 2 ou 3 quartos na Zona Sul.",
      },
    ],
  })

  // 6. Criar Contrato de Locação
  await prisma.rentalContract.create({
    data: {
      tenantId: tenantPrime.id,
      propertyId: prop3.id,
      tenantName: "Dra. Flávia Guimarães",
      tenantDocument: "321.654.987-00",
      ownerName: "Espólio Roberto Marinho Filho",
      ownerDocument: "123.456.789-00",
      rentValue: 14500,
      condoValue: 2800,
      dueDay: 10,
      status: "Ativo",
      adjustmentIndex: "IPCA",
      startDate: new Date("2026-01-01"),
      endDate: new Date("2028-12-31"),
    },
  })

  console.log("Seed concluído com sucesso e 6 imóveis com fotos cadastrados!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
