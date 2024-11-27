"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const path_1 = __importDefault(require("path"));
// Configuração do Sequelize com SQLite
const databasePath = path_1.default.resolve(__dirname, '..', '..', 'database.sqlite');
const sequelize = new sequelize_1.Sequelize({
    dialect: 'sqlite',
    storage: databasePath, // Caminho do arquivo SQLite
    logging: console.log, // Log de queries no console (pode ser desativado)
});
exports.default = sequelize;
