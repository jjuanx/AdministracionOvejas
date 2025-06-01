import dotenv from 'dotenv'
import request from 'supertest'
import moment from 'moment'
import { getApp, shutdownApp } from './utils/testApp.js'
import { getLoggedInOwner, getLoggedInCustomer } from './utils/auth.js'
import { createOveja } from './utils/cria.js'

dotenv.config()

describe('Gestión de Crías', () => {
  let app, owner, customer, madre, nuevaCria

  beforeAll(async () => {
    app = await getApp()
    owner = await getLoggedInOwner()
    customer = await getLoggedInCustomer()
    madre = await createOveja(owner)
  })

  describe('GET /crias', () => {
    it('debe devolver un array con todas las crías', async () => {
      const res = await request(app).get('/crias').send()
      expect(res.status).toBe(200)
      expect(Array.isArray(res.body)).toBe(true)
    })
  })

  describe('POST /crias', () => {
    it('debe devolver 401 si no estás logueado', async () => {
      const res = await request(app).post('/crias').send({ sexo: 'hembra', ovejaId: madre.id })
      expect(res.status).toBe(401)
    })

    it('debe devolver 403 si eres consumidor', async () => {
      const res = await request(app)
        .post('/crias')
        .set('Authorization', `Bearer ${customer.token}`)
        .send({ sexo: 'hembra', ovejaId: madre.id })
      expect(res.status).toBe(403)
    })

    it('debe crear una cría si eres propietario', async () => {
      const nueva = {
        sexo: 'macho',
        fechaNacimiento: moment().subtract(1, 'year').format('YYYY-MM-DD'),
        ovejaId: madre.id
      }
      const res = await request(app)
        .post('/crias')
        .set('Authorization', `Bearer ${owner.token}`)
        .send(nueva)
      expect(res.status).toBe(200)
      expect(res.body.ovejaId).toBe(madre.id)
      nuevaCria = res.body
    })
  })

  describe('GET /crias/:criaId', () => {
    it('debe devolver 404 con ID incorrecto', async () => {
      const res = await request(app).get('/crias/invalidId').send()
      expect(res.status).toBe(404)
    })

    it('debe devolver una cría si el ID es correcto', async () => {
      const res = await request(app).get(`/crias/${nuevaCria.id}`).send()
      expect(res.status).toBe(200)
      expect(res.body.id).toBe(nuevaCria.id)
    })
  })

  describe('PUT /crias/:criaId', () => {
    it('debe devolver 403 si no eres propietario de la cría', async () => {
      const otroOwner = await getLoggedInOwner()
      const res = await request(app)
        .put(`/crias/${nuevaCria.id}`)
        .set('Authorization', `Bearer ${otroOwner.token}`)
        .send({ sexo: 'hembra' })
      expect(res.status).toBe(403)
    })

    it('debe actualizar si eres propietario', async () => {
      const res = await request(app)
        .put(`/crias/${nuevaCria.id}`)
        .set('Authorization', `Bearer ${owner.token}`)
        .send({ sexo: 'hembra' })
      expect(res.status).toBe(200)
      expect(res.body.sexo).toBe('hembra')
    })
  })

  describe('DELETE /crias/:criaId', () => {
    it('debe eliminar la cría si es válida', async () => {
      const res = await request(app)
        .delete(`/crias/${nuevaCria.id}`)
        .set('Authorization', `Bearer ${owner.token}`)
        .send()
      expect(res.status).toBe(200)
    })

    it('debe devolver 404 si la cría ya no existe', async () => {
      const res = await request(app)
        .delete(`/crias/${nuevaCria.id}`)
        .set('Authorization', `Bearer ${owner.token}`)
        .send()
      expect(res.status).toBe(404)
    })
  })

  afterAll(async () => {
    await shutdownApp()
  })
})
