import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { FetchPetsByCharacteristicsUseCase } from '../fetch-pets-by-characteristics'

export function makeFetchPetsByCharacteristicsUseCase() {
  const prismaPetsRepository = new PrismaPetsRepository()
  const fetchPetsByCharacteristicsuseCase =
    new FetchPetsByCharacteristicsUseCase(prismaPetsRepository)

  return fetchPetsByCharacteristicsuseCase
}
