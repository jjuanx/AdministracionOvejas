// src/models/index.js
import Sequelize from 'sequelize';
import dbCfgCjs from '../config/config.cjs';     // único fichero CJS
import loadOvejaModel from './Oveja.js';
import loadCriaModel  from './Cria.js';
import loadUsuarioModel from './Usuario.js'

// 1.- Instancia única de Sequelize
const env = process.env.NODE_ENV || 'development';
const cfg  = dbCfgCjs[env];
const sequelizeSession = new Sequelize(
  cfg.database,
  cfg.username,
  cfg.password,
  cfg
);

// 2.- Cargar cada modelo (siguiendo patrón loader)
const Oveja = loadOvejaModel(sequelizeSession, Sequelize.DataTypes)
const Cria  = loadCriaModel (sequelizeSession, Sequelize.DataTypes)
const Usuario = loadUsuarioModel(sequelizeSession, Sequelize.DataTypes)

// 3.- Registrar todos en un objeto para recorrer asociaciones
const db = {Usuario, Oveja, Cria };

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);      // ← llama a hasMany / belongsTo
  }
});

export { Oveja, Cria, Usuario, sequelizeSession };
