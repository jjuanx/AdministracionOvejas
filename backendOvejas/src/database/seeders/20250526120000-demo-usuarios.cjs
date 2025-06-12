// src/database/seeders/20250526120000-demo-usuarios.cjs
'use strict';

const bcrypt = require('bcryptjs');
const fs     = require('fs');
const path   = require('path');
const salt   = bcrypt.genSaltSync(5);

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Copiar avatares al directorio configurado
    module.exports.copyFiles();

    // Insertar usuarios de ejemplo
    await queryInterface.bulkInsert('Usuarios', [
      {
        nombre: 'Cliente Ejemplo',
        apellidos: 'Uno',
        email: 'cliente1@ejemplo.com',
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
        nombre: 'Propietario Ejemplo',
        apellidos: 'Uno',
        email: 'propietario1@ejemplo.com',
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
  const sequelize = queryInterface.sequelize;
  await sequelize.transaction(async (t) => {
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0', { transaction: t });
    await sequelize.query('TRUNCATE TABLE `Usuarios`', { transaction: t });
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1', { transaction: t });
  });
}
,

  copyFiles: () => {
    const originDir      = path.resolve(__dirname, '../../../public/example_assets');
    const destinationDir = path.resolve(process.env.AVATARS_FOLDER);

    if (!fs.existsSync(originDir)) {
      console.warn(`No existe el directorio de assets: ${originDir}. Se omite copia.`);
      return;
    }
    if (!fs.existsSync(destinationDir)) {
      fs.mkdirSync(destinationDir, { recursive: true });
    }

    ['maleAvatar.png', 'femaleAvatar.png'].forEach((file) => {
      const src  = path.join(originDir, file);
      const dest = path.join(destinationDir, file);
      if (fs.existsSync(src)) {
        fs.copyFileSync(src, dest);
      } else {
        console.warn(`Archivo no encontrado ${src}, se omite.`);
      }
    });
  }
};
