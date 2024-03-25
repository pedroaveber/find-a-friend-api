import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { makeAuthenticateOrganizationUseCase } from '@/use-cases/factories/make-authenticate-organization-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateOrganizationBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateOrganizationBodySchema.parse(
    request.body,
  )

  try {
    const authenticateOrganizationUseCase =
      makeAuthenticateOrganizationUseCase()

    const { organization } = await authenticateOrganizationUseCase.execute({
      email,
      password,
    })

    // Get organization JWT
    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: organization.id,
        },
      },
    )

    // Set refresh JWT on Cookies
    const refreshToken = await reply.jwtSign(
      {},
      {
        sign: {
          sub: organization.id,
        },
      },
    )

    return reply
      .setCookie('refreshToken', refreshToken, {
        sameSite: true,
        secure: true,
        httpOnly: true,
        path: '/',
      })
      .status(200)
      .send({
        token,
      })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({
        message: error.message,
      })
    }

    throw error
  }
}
