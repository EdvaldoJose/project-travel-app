import { Sequelize } from 'sequelize';
import path from 'path';

// Configuração do Sequelize com SQLite
const databasePath = path.resolve(__dirname, '..', '..', 'database.sqlite');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: databasePath, // Caminho do arquivo SQLite
  logging: console.log,  // Log de queries no console (pode ser desativado)
});

export default sequelize;
