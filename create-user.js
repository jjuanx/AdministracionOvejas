// Script temporal para crear usuario en Railway
import mysql from 'mysql2/promise'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'

// Cargar variables de entorno
dotenv.config({ path: './backendOvejas/.env' })

const salt = bcrypt.genSaltSync(5)
const hashedPassword = bcrypt.hashSync('Admin123!', salt)

async function createUser() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'monorail.proxy.rlwy.net',
      port: process.env.DB_PORT || 34206,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASS,
      database: process.env.DB_NAME || 'railway'
    })

    const [result] = await connection.execute(
      `INSERT INTO Usuarios (nombre, apellidos, email, password, numeroTelefono, direccion, codigoPostal, tipoUsuario, createdAt, updatedAt) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        'Admin',
        'Test', 
        'admin@test.com',
        hashedPassword,
        '+34666777888',
        'Calle Test 123',
        '41001',
        'propietario',
        new Date(),
        new Date()
      ]
    )

    console.log('Usuario creado exitosamente:', result)
    await connection.end()
  } catch (error) {
    console.error('Error creando usuario:', error)
  }
}

createUser()
