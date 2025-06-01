import request from 'supertest'
import { ownerCredentials, customerCredentials, generateFakeUser } from './testData.js'
import { getApp } from './testApp.js'

let loggedInOwner, loggedInCustomer

const getNewLoggedInOwner = async () => {
  const fakeOwner = await generateFakeUser()
  await request(await getApp()).post('/usuarios/registroPropietario').send(fakeOwner)
  return (await request(await getApp()).post('/usuarios/loginPropietario').send({
    email: fakeOwner.email,
    password: fakeOwner.password
  })).body
}

const getLoggedInOwner = async () => {
  if (loggedInOwner) return loggedInOwner
  const response = await request(await getApp()).post('/usuarios/loginPropietario').send(ownerCredentials)
  loggedInOwner = response.body
  return loggedInOwner
}

const getLoggedInCustomer = async () => {
  if (loggedInCustomer) return loggedInCustomer
  const response = await request(await getApp()).post('/usuarios/login').send(customerCredentials)
  loggedInCustomer = response.body
  return loggedInCustomer
}

const getNewLoggedInCustomer = async (name) => {
  const fakeCustomer = await generateFakeUser(name)
  await request(await getApp()).post('/usuarios/registro').send(fakeCustomer)
  const response = await request(await getApp()).post('/usuarios/login').send({
    email: fakeCustomer.email,
    password: fakeCustomer.password
  })
  return response.body
}

export { getLoggedInOwner, getNewLoggedInOwner, getLoggedInCustomer, getNewLoggedInCustomer }
