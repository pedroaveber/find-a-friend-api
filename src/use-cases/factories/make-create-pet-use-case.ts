import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { CreatePetUseCase } from '../create-pet'

export function makeCreatePetUseCase() {
  const prismaPetsRepository = new PrismaPetsRepository()
  const createPetUseCase = new CreatePetUseCase(prismaPetsRepository)

  return createPetUseCase
}
