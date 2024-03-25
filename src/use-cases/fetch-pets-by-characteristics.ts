import { PetsRepository } from '@/repositories/pets-repository'
import { AgeGroup, IndependencyLevel, Pet, Size } from '@prisma/client'

interface FetchPetsByCharacteristicsUseCaseRequest {
  city: string
  ageGroup?: AgeGroup
  independencyLevel?: IndependencyLevel
  size?: Size
}

interface FetchPetsByCharacteristicsUseCaseResponse {
  pets: Pet[]
}

export class FetchPetsByCharacteristicsUseCase {
  constructor(private readonly petsRepository: PetsRepository) {}

  async execute({
    city,
    ageGroup,
    independencyLevel,
    size,
  }: FetchPetsByCharacteristicsUseCaseRequest): Promise<FetchPetsByCharacteristicsUseCaseResponse> {
    const pets = await this.petsRepository.findManyByCharacteristics({
      city,
      ageGroup,
      independencyLevel,
      size,
    })

    return {
      pets,
    }
  }
}
