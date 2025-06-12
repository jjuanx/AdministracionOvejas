'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Crias', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fechaNacimiento: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      sexo: {
        type: Sequelize.ENUM('macho', 'hembra'),
        allowNull: false
      },
      viva: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      ovejaId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Ovejas', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_Crias_sexo";');
    await queryInterface.dropTable('Crias');
  }
};