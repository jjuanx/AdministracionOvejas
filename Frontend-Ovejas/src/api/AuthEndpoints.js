import { post, put } from './helpers/ApiRequestsHelper'

function login(data) {
  return post('usuarios/loginPropietario', data)
}

function register(data) {
  return post('usuarios/registroPropietario', data)
}

function update(data) {
  return put('usuarios', data)
}

function isTokenValid(storedToken) {
  return put('usuarios/isTokenValid', { token: storedToken })
}

export { login, register, isTokenValid, update }
