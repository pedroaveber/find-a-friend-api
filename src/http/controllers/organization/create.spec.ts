import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Create Organization (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to regiser a new organization', async () => {
    const response = await request(app.server).post('/organizations').send({
      address: 'Rua José Boschetti, 268',
      zipcode: '95040420',
      whatsapp: '54999859934',
      responsible: 'Pedro Alberto Veber Berna',
      email: 'pedro.veber@outlook.com',
      password: 'pe991007',
    })

    expect(response.body.organization).toEqual(
      expect.objectContaining({
        address: 'Rua José Boschetti, 268',
        zipcode: '95040420',
        whatsapp: '54999859934',
        responsible: 'Pedro Alberto Veber Berna',
        email: 'pedro.veber@outlook.com',
      }),
    )
  })
})
