// tests/utils/cria.js
import request from 'supertest'
import { getApp } from './testApp.js'

const createFakeCria = async (token, madreId, data = {}) => {
  const cria = {
    fechaNacimiento: '2022-05-15',
    genero: 'hembra',
    calidad: 'buena',
    peso: 3.5,
    madreId,
    ...data
  }

  const res = await request(await getApp())
    .post('/crias')
    .set('Authorization', `Bearer ${token}`)
    .send(cria)

  return res.body
}


const createOveja = async (owner) => {
  const oveja = {
    id: Math.floor(Math.random() * 1e8).toString().padStart(8, '0'),
    fechaNacimiento: '2020-01-01',
    calidad: 'buena',
    numeroPartos: 1
  }
  const res = await request(await getApp())
    .post('/ovejas')
    .set('Authorization', `Bearer ${owner.token}`)
    .send(oveja)
  return res.body
}

export { createFakeCria, createOveja }
