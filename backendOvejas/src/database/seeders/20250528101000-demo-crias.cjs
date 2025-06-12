'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Crias', [
      {
        id: 8,
        fechaNacimiento: '2024-02-20',
        sexo: 'hembra',
        ovejaId: 11111111,
        viva: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 35,
        fechaNacimiento: '2023-07-01',
        sexo: 'macho',
        ovejaId: 22222222,
        viva: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 12,
        fechaNacimiento: '2022-12-15',
        sexo: 'hembra',
        ovejaId: 33333333,
        viva: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 450,
        fechaNacimiento: '2025-04-01',
        sexo: 'macho',
        ovejaId: 55555555,
        viva: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 900,
        fechaNacimiento: '2025-04-15',
        sexo: 'hembra',
        ovejaId: 55555555,
        viva: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.sequelize.transaction(async (transaction) => {
      const opts = { transaction };
      await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0', opts);
      await queryInterface.bulkDelete('Crias', null, opts);
      await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1', opts);
    });
  }
};
