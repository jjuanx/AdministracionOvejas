import request from 'supertest'
import { getApp } from './testApp.js'
import { generateFakeUser } from './testData.js'
import { getLoggedInOwner } from './auth.js'

let firstOvejaOfOwner = null

// Crea una oveja de prueba asociada al owner dado
const createOveja = async (owner) => {
  const app = await getApp()
  if (!owner) owner = await getLoggedInOwner()

  const ovejaData = {
    id: String(Math.floor(10000000 + Math.random() * 90000000)),
    fechaNacimiento: '2021-05-15',
    calidad: 'regular',
    numeroPartos: 3
  }

  const response = await request(app)
    .post('/ovejas')
    .set('Authorization', `Bearer ${owner.token}`)
    .send(ovejaData)

  return response.body
}

// Devuelve la primera oveja del owner (y cachea)
const getFirstOvejaOfOwner = async (owner) => {
  if (firstOvejaOfOwner) return firstOvejaOfOwner
  const app = await getApp()
  const response = await request(app)
    .get('/ovejas/misOvejas')
    .set('Authorization', `Bearer ${owner.token}`)
    .send()
  firstOvejaOfOwner = response.body[0]
  return firstOvejaOfOwner
}

// Devuelve una oveja aleatoria del sistema
const getRandomOveja = async () => {
  const app = await getApp()
  const response = await request(app).get('/ovejas').send()
  const ovejas = response.body
  return ovejas[Math.floor(Math.random() * ovejas.length)]
}

const createFakeOveja = async (token, data = {}) => {
  const oveja = {
    id: '87654321',
    fechaNacimiento: '2020-05-20',
    calidad: 'buena',
    numeroPartos: 2,
    ...data
  }

  const res = await request(await getApp())
    .post('/ovejas')
    .set('Authorization', `Bearer ${token}`)
    .send(oveja)

  return res.body
}

export {
  createOveja,
  getFirstOvejaOfOwner,
  getRandomOveja,
  createFakeOveja
}
