import { app } from '@/app'
import { createAndAuthenticateOrganization } from '@/utils/test/create-and-authenticate-organization'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Create Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to regiser a new pet', async () => {
    const { token } = await createAndAuthenticateOrganization(app)

    const response = await request(app.server)
      .post('/pets')
      .set({
        authorization: `Bearer ${token}`,
      })
      .send({
        size: 'SMALL',
        independencyLevel: 'LOW',
        ageGroup: 'PUPPY',
        name: 'Nalu',
        city: 'Caxias do Sul',
      })

    expect(response.statusCode).toEqual(201)
    expect(response.body.pet).toEqual(
      expect.objectContaining({
        size: 'SMALL',
        independencyLevel: 'LOW',
        ageGroup: 'PUPPY',
        name: 'Nalu',
        city: 'Caxias do Sul',
      }),
    )
  })
})
