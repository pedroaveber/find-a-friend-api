import { describe, it, beforeEach, expect } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { GetPetByIdUseCase } from './get-pet-by-id'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let sut: GetPetByIdUseCase
let petsRepository: InMemoryPetsRepository

describe('Get Pet By Id', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new GetPetByIdUseCase(petsRepository)
  })

  it('should be to get pet information', async () => {
    await petsRepository.create({
      id: 'pet-id',
      ageGroup: 'PUPPY',
      city: 'Porto Alegre',
      independencyLevel: 'LOW',
      name: 'Chicão',
      organizationId: 'organization-01',
      size: 'MEDIUM',
    })

    const { pet } = await sut.execute({
      id: 'pet-id',
    })

    expect(pet).toEqual(
      expect.objectContaining({
        id: 'pet-id',
        ageGroup: 'PUPPY',
        city: 'Porto Alegre',
        independencyLevel: 'LOW',
        name: 'Chicão',
        organizationId: 'organization-01',
        size: 'MEDIUM',
      }),
    )
  })

  it('should not be able to get an unexistent pet', async () => {
    expect(async () => {
      await sut.execute({
        id: 'unexistent-id',
      })
    }).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
