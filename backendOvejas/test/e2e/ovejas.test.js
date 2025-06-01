import dotenv from 'dotenv'
import request from 'supertest'
import { getApp, shutdownApp } from './utils/testApp.js'
import { getLoggedInOwner, getLoggedInCustomer } from './utils/auth.js'
dotenv.config()

describe('Gestión de Ovejas', () => {
  let app, owner, customer, nuevaOveja

  beforeAll(async () => {
    app = await getApp()
    owner = await getLoggedInOwner()
    customer = await getLoggedInCustomer()
  })

  describe('GET /ovejas', () => {
    it('debe devolver un array con todas las ovejas', async () => {
      const res = await request(app).get('/ovejas').send()
      expect(res.status).toBe(200)
      expect(Array.isArray(res.body)).toBe(true)
    })
  })

  describe('POST /ovejas', () => {
    it('debe devolver 401 si no estás logueado', async () => {
      const res = await request(app).post('/ovejas').send({ id: '12345678', fechaNacimiento: '2020-01-01' })
      expect(res.status).toBe(401)
    })

    it('debe devolver 403 si eres consumidor', async () => {
      const res = await request(app)
        .post('/ovejas')
        .set('Authorization', `Bearer ${customer.token}`)
        .send({ id: '12345678', fechaNacimiento: '2020-01-01' })
      expect(res.status).toBe(403)
    })

    it('debe crear una oveja si eres propietario', async () => {
      const nueva = {
        id: '87654321',
        fechaNacimiento: '2020-05-20',
        calidad: 'buena',
        numeroPartos: 2
      }
      const res = await request(app)
        .post('/ovejas')
        .set('Authorization', `Bearer ${owner.token}`)
        .send(nueva)
      expect(res.status).toBe(200)
      expect(res.body.id).toBe(nueva.id)
      nuevaOveja = res.body
    })
  })

  describe('GET /ovejas/:ovejaId', () => {
    it('debe devolver 404 con ID incorrecto', async () => {
      const res = await request(app).get('/ovejas/invalidId').send()
      expect(res.status).toBe(404)
    })

    it('debe devolver una oveja si el ID es correcto', async () => {
      const res = await request(app).get(`/ovejas/${nuevaOveja.id}`).send()
      expect(res.status).toBe(200)
      expect(res.body.id).toBe(nuevaOveja.id)
    })
  })

  describe('PUT /ovejas/:ovejaId', () => {
    it('debe devolver 403 si no eres propietario de la oveja', async () => {
      const otroPropietario = await getLoggedInOwner()
      const res = await request(app)
        .put(`/ovejas/${nuevaOveja.id}`)
        .set('Authorization', `Bearer ${otroPropietario.token}`)
        .send({ calidad: 'mala' })
      expect(res.status).toBe(403)
    })

    it('debe actualizar si eres propietario', async () => {
      const res = await request(app)
        .put(`/ovejas/${nuevaOveja.id}`)
        .set('Authorization', `Bearer ${owner.token}`)
        .send({ calidad: 'mala' })
      expect(res.status).toBe(200)
      expect(res.body.calidad).toBe('mala')
    })
  })

  describe('DELETE /ovejas/:ovejaId', () => {
    it('debe eliminar la oveja si es válida', async () => {
      const res = await request(app)
        .delete(`/ovejas/${nuevaOveja.id}`)
        .set('Authorization', `Bearer ${owner.token}`)
        .send()
      expect(res.status).toBe(200)
    })

    it('debe devolver 404 si la oveja ya no existe', async () => {
      const res = await request(app)
        .delete(`/ovejas/${nuevaOveja.id}`)
        .set('Authorization', `Bearer ${owner.token}`)
        .send()
      expect(res.status).toBe(404)
    })
  })

  afterAll(async () => {
    await shutdownApp()
  })
})
