import { OrganizationAlreadyRegisteredError } from '@/use-cases/errors/organization-already-registered-error'
import { makeCreateOrganizationUseCase } from '@/use-cases/factories/make-create-organization-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createOrganizationBodySchema = z.object({
    address: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    responsible: z.string(),
    whatsapp: z.string().min(11).max(11),
    zipcode: z.string(),
  })

  const { address, email, password, responsible, whatsapp, zipcode } =
    createOrganizationBodySchema.parse(request.body)

  try {
    const createOrganizationUseCase = makeCreateOrganizationUseCase()
    const { organization } = await createOrganizationUseCase.execute({
      address,
      email,
      password,
      responsible,
      whatsapp,
      zipcode,
    })

    return reply.status(201).send({
      organization: {
        ...organization,
        passwordHash: undefined,
      },
    })
  } catch (error) {
    if (error instanceof OrganizationAlreadyRegisteredError) {
      return reply.status(409).send({
        message: error.message,
      })
    }

    throw error
  }
}
