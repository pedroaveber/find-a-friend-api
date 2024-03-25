import { makeCreatePetUseCase } from '@/use-cases/factories/make-create-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createPetBodySchema = z.object({
    ageGroup: z.enum(['PUPPY', 'ADULT', 'SENIOR']),
    city: z.string(),
    size: z.enum(['TOY', 'SMALL', 'MEDIUM', 'LARGE']),
    name: z.string(),
    independencyLevel: z.enum(['HIGH', 'MEDIUM', 'LOW']),
    about: z.string().optional(),
  })

  const { ageGroup, city, independencyLevel, name, about, size } =
    createPetBodySchema.parse(request.body)

  const createPetUseCase = makeCreatePetUseCase()
  const { pet } = await createPetUseCase.execute({
    ageGroup,
    city,
    independencyLevel,
    name,
    organizationId: request.user.sub,
    size,
    about: about ?? null,
  })

  return reply.status(201).send({
    pet,
  })
}
