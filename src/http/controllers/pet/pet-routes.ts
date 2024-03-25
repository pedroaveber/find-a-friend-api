import { FastifyInstance } from 'fastify'
import { create } from './create'
import { verifyJWT } from '@/http/hooks/verify-jwt'
import { getPets } from './get-pets'

export async function petRoutes(app: FastifyInstance) {
  app.get('/pets', getPets)
  app.post('/pets', { onRequest: [verifyJWT] }, create)
}
