import express, { Request, Response } from "express";

const app = express();
const port = process.env.PORT || 8080;

// Middleware para parsing de JSON
app.use(express.json());

// Endpoint básico para teste
app.get("/", (req: Request, res: Response) => {
    res.send({ message: "Bem-vindo à API de viagens!" });
});

// Inicializa o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
