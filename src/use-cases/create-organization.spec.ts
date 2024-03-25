import { describe, it, beforeEach, expect } from 'vitest'
import { CreateOrganizationUseCase } from './create-organization'
import { InMemoryOrganizaionsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { OrganizationAlreadyRegisteredError } from './errors/organization-already-registered-error'

let sut: CreateOrganizationUseCase
let organizationRepository: InMemoryOrganizaionsRepository

describe('Create Organization', () => {
  beforeEach(() => {
    organizationRepository = new InMemoryOrganizaionsRepository()
    sut = new CreateOrganizationUseCase(organizationRepository)
  })

  it('should be able to register a organization', async () => {
    const { organization } = await sut.execute({
      address: 'Rua José Do Herval',
      email: 'johndoe@example.com',
      password: '123456',
      responsible: 'John Doe',
      whatsapp: '54999859934',
      zipcode: '95040420',
    })

    expect(organization.id).toEqual(expect.any(String))
  })

  it('should not be able to register another organization with same email or whatsapp', async () => {
    await sut.execute({
      address: 'Rua José Do Herval',
      email: 'johndoe@example.com',
      password: '123456',
      responsible: 'John Doe',
      whatsapp: '54999859934',
      zipcode: '95040420',
    })

    expect(async () => {
      await sut.execute({
        address: 'Rua José Hercílio',
        email: 'johndoe@example.com',
        password: '123456',
        responsible: 'John Doe',
        whatsapp: '54999173299',
        zipcode: '95040420',
      })
    }).rejects.toBeInstanceOf(OrganizationAlreadyRegisteredError)

    expect(async () => {
      await sut.execute({
        address: 'Rua José Hercílio',
        email: 'janedoe@example.com',
        password: '123456',
        responsible: 'John Doe',
        whatsapp: '54999859934',
        zipcode: '95040420',
      })
    }).rejects.toBeInstanceOf(OrganizationAlreadyRegisteredError)
  })
})
