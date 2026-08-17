import express from "express";
import type {Request, Response} from "express";
import error = require("node:console");
import console = require("node:console");
import fs from "node:fs/promises";
import path from "node:path";

const app = express();
const PORT = 3000;

interface estudiante {
    id:number;
    nombre: string;
    pais: string;
    edad: number;
    activo: boolean;
    notas:number[];
}

//funcion para traer archivo ejercicio.json y convertirlo en un array de estudiantes
async function obtenerEstudiantes(): Promise<estudiante[]> {
    const ruta = path.resolve("src/ejercicio.json");
    const texto = await fs.readFile(ruta, "utf-8");
    return JSON.parse(texto);
}

//endpointa
app.get("/estudiantes",async function(req: Request, res:Response) {
    const lista = await obtenerEstudiantes(); 
    res.json(lista);   
});

//traer a un estudiante especifico por su id
app.get("/estudiantes/:id", async function (req: Request, res: Response) {
    try{
        const lista = await obtenerEstudiantes();
        const estudiante = lista.find(estu => estu.id == Number(req.params.id));
        if(!estudiante){
            return res.status(404).json({error: "Estudiante no encontrado"});
        }
        res.json(estudiante);
    }catch(error){
        res.status(500).json({error: "No se pudo leer el archivo"});
    }
});


app.get("/",async function(req: Request, res:Response) {
    res.send("Servidor vivo")
});

app.get("/saludar",function(req: Request, res:Response) {
    res.send("Hola un bonito saludo para mis amigos de Funval!");    
});

app.listen(PORT, function () {
    console.log(`Servidor corriendo en el puerto: http://localhost: ${PORT}`);
});