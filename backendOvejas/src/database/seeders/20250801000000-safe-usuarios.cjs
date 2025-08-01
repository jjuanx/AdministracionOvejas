'use strict';

const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(5);

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Verificar si ya existen usuarios
    const existingUsers = await queryInterface.sequelize.query(
      'SELECT COUNT(*) as count FROM Usuarios',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    // Solo insertar si no hay usuarios
    if (existingUsers[0].count === 0) {
      console.log('Creando usuarios de ejemplo...');
      
      await queryInterface.bulkInsert('Usuarios', [
        {
          nombre: 'Admin',
          apellidos: 'Test',
          email: 'admin@test.com',
          password: bcrypt.hashSync('Admin123!', salt),
          numeroTelefono: '+34666777888',
          direccion: 'Calle Test 123',
          codigoPostal: '41001',
          tipoUsuario: 'propietario',
          avatar: null,
          token: null,
          tokenExpiration: null,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          nombre: 'Usuario',
          apellidos: 'Demo',
          email: 'user@test.com',
          password: bcrypt.hashSync('User123!', salt),
          numeroTelefono: '+34666777999',
          direccion: 'Calle Demo 456',
          codigoPostal: '41002',
          tipoUsuario: 'consumidor',
          avatar: null,
          token: null,
          tokenExpiration: null,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ], {});
      
      console.log('Usuarios creados exitosamente');
    } else {
      console.log('Usuarios ya existen, saltando seeder...');
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Usuarios', {
      email: ['admin@test.com', 'user@test.com']
    }, {});
  }
};
