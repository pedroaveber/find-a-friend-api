import { describe, it, beforeEach, expect } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { FetchPetsByCharacteristicsUseCase } from './fetch-pets-by-characteristics'

let sut: FetchPetsByCharacteristicsUseCase
let petsRepository: InMemoryPetsRepository

describe('Fetch Pets By Characteristics', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new FetchPetsByCharacteristicsUseCase(petsRepository)
  })

  it('should be to fetch pets by its characteristics', async () => {
    await petsRepository.create({
      ageGroup: 'PUPPY',
      city: 'Porto Alegre',
      independencyLevel: 'LOW',
      name: 'Chicão',
      organizationId: 'organization-01',
      size: 'MEDIUM',
    })

    await petsRepository.create({
      ageGroup: 'PUPPY',
      city: 'Porto Alegre',
      independencyLevel: 'MEDIUM',
      name: 'Chicão',
      organizationId: 'organization-01',
      size: 'LARGE',
    })

    await petsRepository.create({
      ageGroup: 'SENIOR',
      city: 'Porto Alegre',
      independencyLevel: 'HIGH',
      name: 'Chicão',
      organizationId: 'organization-01',
      size: 'TOY',
    })

    const { pets } = await sut.execute({
      city: 'Porto Alegre',
    })

    expect(pets).toHaveLength(3)

    const { pets: petsWithAgeGroupFilter } = await sut.execute({
      city: 'Porto Alegre',
      ageGroup: 'SENIOR',
    })

    expect(petsWithAgeGroupFilter).toHaveLength(1)

    const { pets: petsWithIndependencyLevelFilter } = await sut.execute({
      city: 'Porto Alegre',
      independencyLevel: 'LOW',
    })

    expect(petsWithIndependencyLevelFilter).toHaveLength(1)

    const { pets: petsWithSizeFilter } = await sut.execute({
      city: 'Porto Alegre',
      size: 'LARGE',
    })

    expect(petsWithSizeFilter).toHaveLength(1)

    const { pets: nonePet } = await sut.execute({
      city: 'Porto Alegre',
      size: 'LARGE',
      ageGroup: 'SENIOR',
    })

    expect(nonePet).toHaveLength(0)
  })
})
