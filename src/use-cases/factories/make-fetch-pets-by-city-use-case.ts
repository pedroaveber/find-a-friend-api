import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { FetchPetsByCityUseCase } from '../fetch-pets-by-city'

export function makeFetchPetsByCityUseCase() {
  const prismaPetsRepository = new PrismaPetsRepository()
  const fetchPetsByCityUseCase = new FetchPetsByCityUseCase(
    prismaPetsRepository,
  )

  return fetchPetsByCityUseCase
}
