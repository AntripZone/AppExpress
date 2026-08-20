import swaggerAutogen from "swagger-autogen";

const doc = {
    info:{
        title: "API de gestion de Productos",
        descripcion: "Documentacion generada automaticamente",
        version: "1.0.0"
    },
    host: "localhost:3000",
};

const outputFile = "./src/swagger-output.json";

const router = ["./src/index2.ts"];

swaggerAutogen()(outputFile, router, doc);