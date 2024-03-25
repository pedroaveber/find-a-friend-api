import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma-organizations-repository'
import { CreateOrganizationUseCase } from '../create-organization'

export function makeCreateOrganizationUseCase() {
  const prismaOrganizationsRepository = new PrismaOrganizationsRepository()
  const createOrganizationuseCase = new CreateOrganizationUseCase(
    prismaOrganizationsRepository,
  )

  return createOrganizationuseCase
}
