import { PetsRepository } from '@/repositories/pets-repository'
import { AgeGroup, IndependencyLevel, Pet, Size } from '@prisma/client'

interface CreatePetUseCaseRequest {
  ageGroup: AgeGroup
  city: string
  independencyLevel: IndependencyLevel
  name: string
  organizationId: string
  size: Size
  about: string | null
}

interface CreatePetUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(private readonly petsRepository: PetsRepository) {}

  async execute({
    ageGroup,
    city,
    about,
    independencyLevel,
    name,
    organizationId,
    size,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const pet = await this.petsRepository.create({
      ageGroup,
      city,
      independencyLevel,
      name,
      organizationId,
      size,
      about,
    })

    return {
      pet,
    }
  }
}
