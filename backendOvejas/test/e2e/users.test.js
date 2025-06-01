import dotenv from 'dotenv'
import request from 'supertest'
import { getApp, shutdownApp } from './utils/testApp'
import { getNewLoggedInCustomer } from './utils/auth'

dotenv.config()

describe('Obtener información pública del usuario', () => {
  let newCustomer, otherCustomer, app

  beforeAll(async () => {
    app = await getApp()
    newCustomer = await getNewLoggedInCustomer()
    otherCustomer = await getNewLoggedInCustomer()
  })

  it('Debería devolver 200 y los datos públicos del usuario creado', async () => {
    const response = await request(app)
      .get(`/usuarios/${newCustomer.id}`)
      .set('Authorization', `Bearer ${otherCustomer.token}`)
      .send()

    expect(response.status).toBe(200)
    expect(response.body.id).toBe(newCustomer.id)
    expect(response.body.password).toBeUndefined()
  })

  afterAll(async () => {
    await shutdownApp()
  })
})
