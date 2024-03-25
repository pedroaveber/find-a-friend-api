import { prisma } from '@/lib/prisma'
import { Organization } from '@prisma/client'
import { hash } from 'bcryptjs'
import { randomUUID } from 'node:crypto'

export async function createOrganization(data?: Partial<Organization>) {
  if (data?.passwordHash) {
    data.passwordHash = await hash(data.passwordHash, 6)
  }

  const user = await prisma.organization.create({
    data: {
      address: 'Rua Das Andorinhas, 268',
      email: 'johndoe@example.com',
      passwordHash: await hash('123456', 6),
      responsible: 'John Doe',
      whatsapp: '54999859934',
      zipcode: '95040420',
      createdAt: new Date(),
      id: randomUUID(),
      ...data,
    },
  })

  return {
    user,
  }
}
