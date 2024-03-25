import { Organization, Prisma } from '@prisma/client'
import { OrganizationsRepository } from '../organizations-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryOrganizaionsRepository implements OrganizationsRepository {
  public items: Organization[] = []

  async create(data: Prisma.OrganizationCreateInput) {
    const organization: Organization = {
      address: data.address,
      createdAt: new Date(),
      email: data.email,
      id: data.id ?? randomUUID(),
      passwordHash: data.passwordHash,
      responsible: data.responsible,
      whatsapp: data.whatsapp,
      zipcode: data.zipcode,
    }

    this.items.push(organization)
    return organization
  }

  async findByEmail(email: string) {
    const organization = this.items.find(
      (item) => item.email.toLowerCase() === email.toLowerCase(),
    )

    if (!organization) {
      return null
    }

    return organization
  }

  async findByWhatsapp(whatsapp: string) {
    const organization = this.items.find((item) => item.whatsapp === whatsapp)

    if (!organization) {
      return null
    }

    return organization
  }
}
