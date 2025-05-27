'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Ovejas', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fechaUltimoParto: {
        allowNull: true,
        type: Sequelize.DATEONLY
      },
      estado: {
        type: Sequelize.ENUM('buena', 'regular', 'mala'),
        allowNull: false,
        defaultValue: 'buena'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_Ovejas_estado";');
    await queryInterface.dropTable('Ovejas');
  }
};