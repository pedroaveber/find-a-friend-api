import { fastify } from 'fastify'
import { fastifyJwt } from '@fastify/jwt'
import { fastifyCookie } from '@fastify/cookie'

import { env } from './env'

import { ZodError } from 'zod'

import { organizationRoutes } from './http/controllers/organization/organization-routes'
import { petRoutes } from './http/controllers/pet/pet-routes'

export const app = fastify()

app.register(fastifyCookie)
app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  sign: {
    expiresIn: '10m',
  },
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
})

app.register(organizationRoutes)
app.register(petRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: Here we should log to a external tool like DataDog/NewRelic/Sentry
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})
