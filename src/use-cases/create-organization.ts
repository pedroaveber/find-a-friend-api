import { OrganizationsRepository } from '@/repositories/organizations-repository'
import { Organization } from '@prisma/client'
import { hash } from 'bcryptjs'
import { OrganizationAlreadyRegisteredError } from './errors/organization-already-registered-error'

interface CreateOrganizationUseCaseRequest {
  responsible: string
  address: string
  zipcode: string
  email: string
  whatsapp: string
  password: string
}

interface CreateOrganizationUseCaseResponse {
  organization: Organization
}

export class CreateOrganizationUseCase {
  constructor(
    private readonly organizationsRepository: OrganizationsRepository,
  ) {}

  async execute({
    address,
    responsible,
    zipcode,
    email,
    password,
    whatsapp,
  }: CreateOrganizationUseCaseRequest): Promise<CreateOrganizationUseCaseResponse> {
    const organizationWithSameEmail =
      await this.organizationsRepository.findByEmail(email)

    const organizationWithSameWhatsApp =
      await this.organizationsRepository.findByWhatsapp(whatsapp)

    if (organizationWithSameEmail || organizationWithSameWhatsApp) {
      throw new OrganizationAlreadyRegisteredError()
    }

    const passwordHash = await hash(password, 6)

    const organization = await this.organizationsRepository.create({
      address,
      email,
      passwordHash,
      responsible,
      whatsapp,
      zipcode,
    })

    return {
      organization,
    }
  }
}
