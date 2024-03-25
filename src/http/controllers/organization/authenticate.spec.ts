import { app } from '@/app'
import { createOrganization } from '@/utils/test/create-organization'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Authenticate Organization (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to login', async () => {
    const { user } = await createOrganization({ passwordHash: '123456' })

    const response = await request(app.server).post('/sessions').send({
      email: user.email,
      password: '123456',
    })

    expect(response.status).toEqual(200)
    expect(response.body.token).toEqual(expect.any(String))
  })
})
