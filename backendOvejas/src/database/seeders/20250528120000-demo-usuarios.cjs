
const bcrypt = require('bcryptjs');
const fs = require('fs');
const salt = bcrypt.genSaltSync(5);

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Copiamos avatares al directorio configurado
    module.exports.copyFiles();

    // Insertamos dos usuarios de ejemplo
    await queryInterface.bulkInsert('Usuarios', [
      {
        nombre: 'Consumidor',
        apellidos: 'Ejemplo',
        email: 'cliente1@cliente.com',
        password: bcrypt.hashSync('secret', salt),
        numeroTelefono: '+3466677888',
        direccion: 'Calle Falsa 123',
        codigoPostal: '41010',
        tipoUsuario: 'consumidor',
        avatar: process.env.AVATARS_FOLDER + '/maleAvatar.png',
        token: null,
        tokenExpiration: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Propietario',
        apellidos: 'Ejemplo',
        email: 'propietario1@propietario.com',
        password: bcrypt.hashSync('secret', salt),
        numeroTelefono: '+3466677889',
        direccion: 'Av. Modelo 456',
        codigoPostal: '41020',
        tipoUsuario: 'propietario',
        avatar: process.env.AVATARS_FOLDER + '/femaleAvatar.png',
        token: null,
        tokenExpiration: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    // Eliminamos todos los usuarios de prueba
    await queryInterface.sequelize.transaction(async (transaction) => {
      const opts = { transaction };
      await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0', opts);
      await queryInterface.bulkDelete('Usuarios', null, opts);
      await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1', opts);
    });
  },

  copyFiles: () => {
    const originDir = 'public/example_assets/';
    const destinationDir = process.env.AVATARS_FOLDER + '/';

    if (!fs.existsSync(destinationDir)) {
      fs.mkdirSync(destinationDir, { recursive: true });
    }

    ['maleAvatar.png', 'femaleAvatar.png'].forEach(filename => {
      fs.copyFile(
        originDir + filename,
        destinationDir + filename,
        err => { if (err) throw err; }
      );
    });
  }
};