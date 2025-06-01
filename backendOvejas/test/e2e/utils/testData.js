import crypto from 'crypto'

const generateFakeEmail = () => `testuser_${crypto.randomBytes(4).toString('hex')}@test.com`

const generateFakeUser = async (tipoUsuario = 'consumidor') => {
  return {
    email: generateFakeEmail(),
    password: 'testPassword123',
    nombre: 'Test',
    apellidos: 'User',
    numeroTelefono: '+34666666666',
    direccion: 'Calle Prueba 123',
    codigoPostal: '41001',
    tipoUsuario
    // avatar se rellena si necesitas pruebas con subida de archivos
  }
}

const customerCredentials = {
  email: 'cliente1@ejemplo.com',
  password: 'secret'
}

const ownerCredentials = {
  email: 'propietario1@ejemplo.com',
  password: 'secret'
}

const noEmailCustomerCredentials = {
  password: 'secret'
}

const noEmailOwnerCredentials = {
  password: 'secret'
}

const invalidCredentials = {
  email: 'nonexistent@example.com',
  password: 'wrongpassword'
}

export {
  customerCredentials,
  ownerCredentials,
  noEmailCustomerCredentials,
  noEmailOwnerCredentials,
  invalidCredentials,
  generateFakeUser
}
