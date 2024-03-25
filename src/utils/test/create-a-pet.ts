import { prisma } from '@/lib/prisma'
import { Pet } from '@prisma/client'
import { randomUUID } from 'node:crypto'

export async function createPet(data: Partial<Pet>) {
  const pet = await prisma.pet.create({
    data: {
      ageGroup: 'ADULT',
      city: 'Rondonópolis',
      independencyLevel: 'HIGH',
      name: 'Fofão',
      size: 'LARGE',
      about: null,
      createdAt: new Date(),
      images: [],
      id: randomUUID(),
      organizationId: randomUUID(),
      ...data,
    },
  })

  return pet
}
