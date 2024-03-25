import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { GetPetByIdUseCase } from '../get-pet-by-id'

export function makeGetPetByIdUseCase() {
  const prismaPetsRepository = new PrismaPetsRepository()
  const getPetByIdUseCase = new GetPetByIdUseCase(prismaPetsRepository)

  return getPetByIdUseCase
}
