/**
 * Conexión única de Sequelize que aprovecha la configuración
 * ya definida en config/database.cjs (CommonJS).
 */
import { Sequelize } from 'sequelize';
import dbConfigCjs from './config.cjs'; // Node puede importar CJS sin problema

const ENV = process.env.NODE_ENV || 'development';
const cfg = dbConfigCjs[ENV];

let sequelize;                    // se reutiliza en toda la app

export async function initSequelize () {
  if (sequelize) return sequelize;            // singleton
  sequelize = new Sequelize(cfg.database, cfg.username, cfg.password, {
    host           : cfg.host,
    port           : cfg.port,
    dialect        : cfg.dialect,
    logging        : cfg.logging,
    dialectOptions : cfg.dialectOptions,
    pool           : cfg.pool
  });
  await sequelize.authenticate();
  return sequelize;
}

export async function disconnectSequelize () {
  if (sequelize) {
    await sequelize.close();
    sequelize = undefined;
  }
}
