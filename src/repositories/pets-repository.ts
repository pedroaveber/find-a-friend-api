import { AgeGroup, IndependencyLevel, Pet, Prisma, Size } from '@prisma/client'

export interface FindManyByCharacteristicsRequest {
  size?: Size
  ageGroup?: AgeGroup
  city: string
  independencyLevel?: IndependencyLevel
}

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findById(id: string): Promise<Pet | null>
  findManyByCharacteristics(
    params: FindManyByCharacteristicsRequest,
  ): Promise<Pet[]>
}
