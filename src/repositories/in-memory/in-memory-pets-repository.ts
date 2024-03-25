import { Pet, Prisma } from '@prisma/client'
import {
  FindManyByCharacteristicsRequest,
  PetsRepository,
} from '../pets-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet: Pet = {
      about: data.about ?? null,
      ageGroup: data.ageGroup,
      city: data.city,
      id: data.id ?? randomUUID(),
      createdAt: new Date(),
      images: [],
      independencyLevel: data.independencyLevel,
      name: data.name,
      organizationId: data.organizationId,
      requirements: [],
      size: data.size,
    }

    this.items.push(pet)
    return pet
  }

  async findById(id: string) {
    const pet = this.items.find((pet) => pet.id === id)

    if (!pet) {
      return null
    }

    return pet
  }

  async findManyByCharacteristics({
    city,
    ageGroup,
    independencyLevel,
    size,
  }: FindManyByCharacteristicsRequest) {
    let pets: Pet[] = []

    pets = this.items.filter((pet) => {
      return pet.city.toLowerCase() === city.toLowerCase()
    })

    if (ageGroup) {
      pets = pets.filter((pet) => pet.ageGroup === ageGroup)
    }

    if (size) {
      pets = pets.filter((pet) => pet.size === size)
    }

    if (independencyLevel) {
      pets = pets.filter((pet) => pet.independencyLevel === independencyLevel)
    }

    return pets
  }
}
