import { FastifyInstance } from 'fastify'
import { create } from './create'
import { verifyJWT } from '@/http/hooks/verify-jwt'
import { getPets } from './get-pets'
import { getPetById } from './get-pet-by-id'

export async function petRoutes(app: FastifyInstance) {
  app.get('/pets', getPets)
  app.get('/pets/:petId', getPetById)
  app.post('/pets', { onRequest: [verifyJWT] }, create)
}
