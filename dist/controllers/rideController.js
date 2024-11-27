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
exports.getRides = exports.confirmRide = exports.estimateRide = void 0;
const axios_1 = __importDefault(require("axios"));
const estimateRide = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { customer_id, origin, destination } = req.body;
        // Validação dos campos obrigatórios
        if (!customer_id || !origin || !destination) {
            res.status(400).json({
                error_code: "INVALID_DATA",
                error_description: "Dados inválidos. Verifique os campos enviados.",
            });
            return;
        }
        // Chamar a Google Maps API para calcular a rota
        const googleApiKey = process.env.GOOGLE_API_KEY;
        const mapsApiUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&key=${googleApiKey}`;
        const response = yield axios_1.default.get(mapsApiUrl);
        if (!response.data.routes || response.data.routes.length === 0) {
            res.status(404).json({
                error_code: "NO_ROUTE_FOUND",
                error_description: "Nenhuma rota encontrada entre os pontos informados.",
            });
            return;
        }
        const route = response.data.routes[0];
        const legs = route.legs[0];
        // Validar a existência de propriedades esperadas
        if (!legs || !legs.distance || !legs.duration) {
            res.status(500).json({
                error_code: "INVALID_ROUTE_DATA",
                error_description: "Dados insuficientes retornados pela API de rotas.",
            });
            return;
        }
        const distance = legs.distance.value / 1000; // Converter para km
        const duration = legs.duration.text;
        // Motoristas disponíveis
        const drivers = [
            {
                id: 1,
                name: "Homer Simpson",
                description: "Olá! Sou o Homer, seu motorista camarada! Relaxe e aproveite o passeio, com direito a rosquinhas e boas risadas (e talvez alguns desvios).",
                vehicle: "Plymouth Valiant 1973 rosa e enferrujado",
                review: {
                    rating: 2,
                    comment: "Motorista simpático, mas errou o caminho 3 vezes. O carro cheira a donuts.",
                },
                rate: 2.5,
                minKm: 1,
            },
            {
                id: 2,
                name: "Dominic Toretto",
                description: "Ei, aqui é o Dom. Pode entrar, vou te levar com segurança e rapidez ao seu destino. Só não mexa no rádio, a playlist é sagrada.",
                vehicle: "Dodge Charger R/T 1970 modificado",
                review: {
                    rating: 4,
                    comment: "Que viagem incrível! O carro é um show à parte e o motorista, apesar de ter uma cara de poucos amigos, foi super gente boa. Recomendo!",
                },
                rate: 5.0,
                minKm: 5,
            },
            {
                id: 3,
                name: "James Bond",
                description: "Boa noite, sou James Bond. À sua disposição para um passeio suave e discreto. Aperte o cinto e aproveite a viagem.",
                vehicle: "Aston Martin DB5 clássico",
                review: {
                    rating: 5,
                    comment: "Serviço impecável! O motorista é a própria definição de classe e o carro é simplesmente magnífico. Uma experiência digna de um agente secreto.",
                },
                rate: 10.0,
                minKm: 10,
            },
        ];
        // Filtrar motoristas disponíveis e calcular valores
        const availableDrivers = drivers
            .filter((driver) => distance >= driver.minKm)
            .map((driver) => ({
            id: driver.id,
            name: driver.name,
            description: driver.description,
            vehicle: driver.vehicle,
            review: driver.review,
            value: (driver.rate * distance).toFixed(2), // Cálculo do valor total
        }))
            .sort((a, b) => parseFloat(a.value) - parseFloat(b.value)); // Ordena pelo valor mais baixo
        // Retornar a resposta com os motoristas disponíveis
        res.status(200).json({
            origin: legs.start_address,
            destination: legs.end_address,
            distance: distance.toFixed(2),
            duration: duration,
            options: availableDrivers,
            routeResponse: response.data, // Para depuração ou informações extras
        });
        return;
    }
    catch (error) {
        console.error("Erro ao estimar corrida:", error.message);
        res.status(500).json({
            error_code: "INTERNAL_SERVER_ERROR",
            error_description: "Erro interno do servidor. Tente novamente mais tarde.",
        });
        return;
    }
});
exports.estimateRide = estimateRide;
// Controlador para confirmar a corrida
const confirmRide = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200).json({ message: "Ride confirmed" });
    }
    catch (error) {
        next(error);
    }
});
exports.confirmRide = confirmRide;
// Controlador para listar corridas
const getRides = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200).json({ rides: [] });
    }
    catch (error) {
        next(error);
    }
});
exports.getRides = getRides;
