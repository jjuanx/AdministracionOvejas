import request from 'supertest'
import { shutdownApp, getApp } from './utils/testApp.js'
import {
  customerCredentials,
  noEmailCustomerCredentials,
  ownerCredentials,
  noEmailOwnerCredentials,
  invalidCredentials,
  generateFakeUser
} from './utils/testData.js'

describe('Login propietario', () => {
  let authTokenOwner, app
  beforeAll(async () => {
    app = await getApp()
  })

  it('debe retornar 422 si no se proporciona email', async () => {
    const response = await request(app).post('/usuarios/loginPropietario').send(noEmailOwnerCredentials)
    expect(response.status).toBe(422)
  })

  it('debe retornar 401 con credenciales incorrectas', async () => {
    const response = await request(app).post('/usuarios/loginPropietario').send(invalidCredentials)
    expect(response.status).toBe(401)
  })

  it('debe retornar 200 si el login es exitoso', async () => {
    const response = await request(app).post('/usuarios/loginPropietario').send(ownerCredentials)
    expect(response.status).toBe(200)
    expect(response.body).toEqual(expect.objectContaining({
      token: expect.any(String),
      id: expect.any(Number)
    }))
    authTokenOwner = response.body.token
  })

  it('debe validar el token correctamente', async () => {
    const response = await request(app).put('/usuarios/isTokenValid').send({
      token: authTokenOwner
    })
    expect(response.status).toBe(200)
  })
})

describe('Login consumidor', () => {
  let authTokenCustomer, app
  beforeAll(async () => {
    app = await getApp()
  })

  it('debe retornar 422 si no se proporciona email', async () => {
    const response = await request(app).post('/usuarios/login').send(noEmailCustomerCredentials)
    expect(response.status).toBe(422)
  })

  it('debe retornar 401 con credenciales incorrectas', async () => {
    const response = await request(app).post('/usuarios/login').send(invalidCredentials)
    expect(response.status).toBe(401)
  })

  it('debe retornar 200 si el login es exitoso', async () => {
    const response = await request(app).post('/usuarios/login').send(customerCredentials)
    expect(response.status).toBe(200)
    authTokenCustomer = response.body.token
  })

  it('debe validar el token correctamente', async () => {
    const response = await request(app).put('/usuarios/isTokenValid').send({
      token: authTokenCustomer
    })
    expect(response.status).toBe(200)
  })

  afterAll(async () => {
    await shutdownApp()
  })
})
