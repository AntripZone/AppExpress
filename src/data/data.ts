import fs from "node:fs/promises";
import path from "node:path";
import type { producto } from "../types/productos.js";

export let listaProductos: producto[] = [];

export async function cargarData() {
    try {
        const ruta = path.resolve("inventario.json");
        const data = await fs.readFile(ruta, "utf-8");
        listaProductos = JSON.parse(data);
        console.log(`Datos cargados`);
    } catch (error) {
        console.log("Lista vacia o no encontrada");
        listaProductos = [];
    } 
}

export function setListaProductos(nuevaLista: producto[]){
     listaProductos = nuevaLista;
}   