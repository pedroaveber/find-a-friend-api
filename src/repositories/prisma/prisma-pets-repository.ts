import { Prisma } from '@prisma/client'
import {
  FindManyByCharacteristicsRequest,
  PetsRepository,
} from '../pets-repository'
import { prisma } from '@/lib/prisma'

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }

  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    })

    return pet
  }

  async findManyByCharacteristics({
    city,
    ageGroup,
    independencyLevel,
    size,
  }: FindManyByCharacteristicsRequest) {
    const pets = await prisma.pet.findMany({
      where: {
        city: {
          contains: city,
          mode: 'insensitive',
        },
        AND: {
          ageGroup,
          independencyLevel,
          size,
        },
      },
    })

    return pets
  }
}
