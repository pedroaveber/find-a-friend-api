import { OrganizationsRepository } from '@/repositories/organizations-repository'
import { Organization } from '@prisma/client'
import { compare } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

interface AuthenticateOrganizationUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateOrganizationUseCaseResponse {
  organization: Organization
}

export class AuthenticateOrganizationUseCase {
  constructor(
    private readonly organizationsRepository: OrganizationsRepository,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateOrganizationUseCaseRequest): Promise<AuthenticateOrganizationUseCaseResponse> {
    const organization = await this.organizationsRepository.findByEmail(email)

    if (!organization) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatch = await compare(password, organization.passwordHash)

    if (!doesPasswordMatch) {
      throw new InvalidCredentialsError()
    }

    return {
      organization,
    }
  }
}
