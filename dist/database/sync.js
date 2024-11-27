"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./index"));
const User_1 = __importDefault(require("../ models/User"));
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Sincroniza os modelos com o banco de dados
        yield index_1.default.sync({ force: true }); // `force: true` recria as tabelas, use com cautela
        console.log('Banco de dados sincronizado com sucesso.');
        // Exemplo: criando um registro
        yield User_1.default.create({ name: 'John Doe', email: 'johndoe@example.com' });
        console.log('Usuário criado com sucesso.');
    }
    catch (error) {
        console.error('Erro ao sincronizar o banco de dados:', error);
    }
    finally {
        yield index_1.default.close();
    }
}))();
