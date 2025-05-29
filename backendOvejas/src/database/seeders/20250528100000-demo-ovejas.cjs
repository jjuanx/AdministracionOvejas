'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Ovejas', [
      {
        id: 11111111,
        fechaUltimoParto: '2024-01-15',
        estado: 'buena',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 22222222,
        fechaUltimoParto: '2023-06-10',
        estado: 'regular',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 33333333,
        fechaUltimoParto: '2022-12-05',
        estado: 'mala',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 44444444,
        fechaUltimoParto: null,         // todavía no ha parido
        estado: 'buena',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 55555555,
        fechaUltimoParto: '2025-03-20',
        estado: 'regular',
        createdAt: new Date(),
        updatedAt: new Date()
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
