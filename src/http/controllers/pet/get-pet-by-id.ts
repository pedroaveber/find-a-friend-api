import { FastifyReply, FastifyRequest } from 'fastify'

import { z } from 'zod'

import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeGetPetByIdUseCase } from '@/use-cases/factories/make-get-pet-by-id-use-case'

export async function getPetById(request: FastifyRequest, reply: FastifyReply) {
  const petsByIdParamsSchema = z.object({
    petId: z.string(),
  })

  const { petId } = petsByIdParamsSchema.parse(request.params)

  const getPetByIdUseCase = makeGetPetByIdUseCase()

  try {
    const { pet } = await getPetByIdUseCase.execute({
      id: petId,
    })

    return reply.status(200).send({
      pet,
    })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({
        message: error.message,
      })
    }

    throw error
  }
}
