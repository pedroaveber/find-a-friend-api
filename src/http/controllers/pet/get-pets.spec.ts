import { app } from '@/app'
import { createPet } from '@/utils/test/create-a-pet'
import { createAndAuthenticateOrganization } from '@/utils/test/create-and-authenticate-organization'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Get Pets (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get pets', async () => {
    const { user } = await createAndAuthenticateOrganization(app)

    await Promise.all([
      createPet({
        organizationId: user.id,
        city: 'Caxias do Sul',
        size: 'SMALL',
      }),
      createPet({ organizationId: user.id, city: 'Rio do Sul' }),
      createPet({
        organizationId: user.id,
        city: 'Caxias do Sul',
        size: 'LARGE',
      }),
      createPet({ organizationId: user.id, city: 'Rio de Janeiro' }),
    ])

    const response = await request(app.server)
      .get('/pets')
      .query({
        city: 'Caxias do Sul',
        size: 'LARGE',
      })
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets).toHaveLength(1)
  })
})
