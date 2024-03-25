import { app } from '@/app'
import { createPet } from '@/utils/test/create-a-pet'
import { createAndAuthenticateOrganization } from '@/utils/test/create-and-authenticate-organization'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Get Pet By Id (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get pet details', async () => {
    const { user } = await createAndAuthenticateOrganization(app)

    const pet = await createPet({
      organizationId: user.id,
      city: 'Caxias do Sul',
      size: 'SMALL',
      name: 'Jane Doe',
    })

    const response = await request(app.server).get(`/pets/${pet.id}`).send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.pet).toEqual(
      expect.objectContaining({
        city: 'Caxias do Sul',
        size: 'SMALL',
        name: 'Jane Doe',
      }),
    )
  })
})
