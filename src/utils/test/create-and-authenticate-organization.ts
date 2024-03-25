import { createOrganization } from './create-organization'
import request from 'supertest'
import { FastifyInstance } from 'fastify'

export async function createAndAuthenticateOrganization(
  app: FastifyInstance,
  email = 'johndoe@example.com',
  password = '123456',
) {
  const { user } = await createOrganization({
    email,
    passwordHash: password,
  })

  const response = await request(app.server).post('/sessions').send({
    email: user.email,
    password: '123456',
  })

  return {
    user,
    token: response.body.token,
  }
}
