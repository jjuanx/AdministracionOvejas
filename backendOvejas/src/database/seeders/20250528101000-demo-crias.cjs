'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Crias', [
      {
        fechaNacimiento: '2024-02-20',
        sexo: 'hembra',
        ovejaId: 11111111,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fechaNacimiento: '2023-07-01',
        sexo: 'macho',
        ovejaId: 22222222,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fechaNacimiento: '2022-12-15',
        sexo: 'hembra',
        ovejaId: 33333333,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fechaNacimiento: '2025-04-01',
        sexo: 'macho',
        ovejaId: 55555555,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fechaNacimiento: '2025-04-15',
        sexo: 'hembra',
        ovejaId: 55555555,
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
