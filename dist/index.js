"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = process.env.PORT || 8080;
// Middleware para parsing de JSON
app.use(express_1.default.json());
// Endpoint básico para teste
app.get("/", (req, res) => {
    res.send({ message: "Bem-vindo à API de viagens!" });
});
// Inicializa o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
