'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Usuarios', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      nombre:{
        type: Sequelize.STRING,
        allowNull: false 
      },
      apellidos: { 
        type: Sequelize.STRING, 
        allowNull: false },
      email:{
        type: Sequelize.STRING,
        allowNull: false,
        unique: true },
      password: { 
        type: Sequelize.STRING, 
        allowNull: false },
      token: { 
        type: Sequelize.STRING 
      },
      tokenExpiration: { 
        type: Sequelize.DATE 
      },
      numeroTelefono:  { 
        type: Sequelize.STRING,
         allowNull: false },
      avatar:          { 
        type: Sequelize.STRING },
      direccion:       { 
        type: Sequelize.STRING,
         allowNull: false },
      codigoPostal:    { 
        type: Sequelize.STRING,
        allowNull: false },
      tipoUsuario:     {
        type: Sequelize.ENUM('consumidor','propietario'),
        allowNull: false
      },
      createdAt:    { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
      updatedAt:    { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW }
    });
  },
  down: async (queryInterface) => {
    // No es necesario dropear el TYPE en MariaDB/MySQL
    await queryInterface.dropTable('Usuarios');
  }
};
