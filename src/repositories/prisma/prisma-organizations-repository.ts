import { Prisma } from '@prisma/client'
import { OrganizationsRepository } from '../organizations-repository'
import { prisma } from '@/lib/prisma'

export class PrismaOrganizationsRepository implements OrganizationsRepository {
  async create(data: Prisma.OrganizationCreateInput) {
    const organization = await prisma.organization.create({
      data,
    })

    return organization
  }

  async findByEmail(email: string) {
    const organization = await prisma.organization.findUnique({
      where: {
        email,
      },
    })

    return organization
  }

  async findByWhatsapp(whatsapp: string) {
    const organization = await prisma.organization.findUnique({
      where: {
        whatsapp,
      },
    })

    return organization
  }
}
