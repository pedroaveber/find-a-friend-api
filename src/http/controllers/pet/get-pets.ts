import { makeFetchPetsByCharacteristicsUseCase } from '@/use-cases/factories/make-fetch-pets-by-characteristics-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getPets(request: FastifyRequest, reply: FastifyReply) {
  const petsByCityQuerySchema = z.object({
    city: z.string(),
    ageGroup: z.enum(['PUPPY', 'ADULT', 'SENIOR']).optional(),
    size: z.enum(['SMALL', 'MEDIUM', 'LARGE']).optional(),
    independencyLevel: z.enum(['HIGH', 'MEDIUM', 'LOW']).optional(),
  })

  const { city, ageGroup, independencyLevel, size } =
    petsByCityQuerySchema.parse(request.query)

  const petsByCharacteristicsUseCase = makeFetchPetsByCharacteristicsUseCase()
  const { pets } = await petsByCharacteristicsUseCase.execute({
    city,
    ageGroup,
    independencyLevel,
    size,
  })

  return reply.status(200).send({
    pets,
  })
}
