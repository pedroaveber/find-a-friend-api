import { describe, it, beforeEach, expect } from 'vitest'
import { InMemoryOrganizaionsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { AuthenticateOrganizationUseCase } from './authenticate-organization'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let sut: AuthenticateOrganizationUseCase
let organizationRepository: InMemoryOrganizaionsRepository

describe('Authenticate Organization', () => {
  beforeEach(() => {
    organizationRepository = new InMemoryOrganizaionsRepository()
    sut = new AuthenticateOrganizationUseCase(organizationRepository)
  })

  it('should be able to sign is as a organization', async () => {
    await organizationRepository.create({
      address: 'Rua José Do Herval',
      email: 'johndoe@example.com',
      passwordHash: await hash('123456', 6),
      responsible: 'John Doe',
      whatsapp: '54999859934',
      zipcode: '95040420',
    })

    const { organization } = await sut.execute({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(organization.email).toEqual('johndoe@example.com')
  })

  it('should not be able to sign-in with invalid credentials', async () => {
    await organizationRepository.create({
      address: 'Rua José Do Herval',
      email: 'johndoe@example.com',
      passwordHash: await hash('123456', 6),
      responsible: 'John Doe',
      whatsapp: '54999859934',
      zipcode: '95040420',
    })

    expect(async () => {
      await sut.execute({
        email: 'non-existent@example.com',
        password: '123456',
      })
    }).rejects.toBeInstanceOf(InvalidCredentialsError)

    expect(async () => {
      await sut.execute({
        email: 'johndoe@example.com',
        password: 'wrong-password',
      })
    }).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
