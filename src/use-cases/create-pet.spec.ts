import { describe, it, beforeEach, expect } from 'vitest'
import { CreatePetUseCase } from './create-pet'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'

let sut: CreatePetUseCase
let petsRepository: InMemoryPetsRepository

describe('Create Pet', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new CreatePetUseCase(petsRepository)
  })

  it('should be able to register a pet', async () => {
    const { pet } = await sut.execute({
      ageGroup: 'PUPPY',
      city: 'Porto Alegre',
      independencyLevel: 'LOW',
      name: 'Chicão',
      organizationId: 'organization-01',
      size: 'MEDIUM',
    })

    expect(pet.id).toEqual(expect.any(String))
  })
})
