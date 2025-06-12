'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Ovejas', [
      {
        id: 11111111,
        estado: 'buena',
        fechaNacimiento: '2023-12-21',
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 1
      },
      {
        id: 22222222,
        estado: 'regular',
        fechaNacimiento: '2023-06-21',
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 1
      },
      {
        id: 33333333,
        estado: 'mala',
        fechaNacimiento: '2020-05-21',
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 2
      },
      {
        id: 44444444,        // todavía no ha parido
        estado: 'buena',
        fechaNacimiento: '2024-05-21',
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 1
      },
      {
        id: 55555555,
        estado: 'regular',
        fechaNacimiento: '2022-05-21',
        createdAt: new Date(),
        updatedAt: new Date(),
         userId: 2
      }
    ], {});
  },

  down: async (queryInterface) => {
    // Desactiva temporalmente las comprobaciones FK para poder vaciar la tabla
    await queryInterface.sequelize.transaction(async (transaction) => {
      const opts = { transaction };
      await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0', opts);
      await queryInterface.bulkDelete('Ovejas', null, opts);
      await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1', opts);
    });
  }
};
