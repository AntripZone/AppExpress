import { Router } from "express";
import type { Request, Response } from "express";

import { listaProductos, setListaProductos } from "../data/data.js";

import type {
    producto,
    crearProducto,
    actualizarProducto,
    productosFiltrados,
    idParam
} from "../types/productos.js";

const router = Router();

router.get("/",
    function (req: Request<{}, {}, {}, productosFiltrados>, res: Response) {
        // #swagger.tags = ['Productos']
        // #swagger.description = 'Obtiene la lista de productos, con filtros opcionales por nombre, categoria, marca y estado activo'
        // #swagger.parameters['nombreProducto'] = { in: 'query', description: 'Busqueda parcial por nombre', type: 'string' }
        const {nombreProducto} = req.query;
        let resultado = [...listaProductos];

        if(nombreProducto) {
            resultado = resultado.filter(
                (e) => e.nombreProducto.toLowerCase() === nombreProducto.toLowerCase(),
            );
        }
      return res.json({
      total: resultado.length,
      datos: resultado,
    });
  }
);

router.get("/:id", 
    function (req: Request<idParam>, res: Response) {
  const idBuscado = Number(req.params.id);

  if (isNaN(idBuscado)) {
    return res
      .status(400)
      .json({ error: "El parametro id debe ser un numero valido" });
  }
  const productoFiltrado = listaProductos.find(
    (p) => p.id === idBuscado,
  );

  if (!productoFiltrado) {
    return res
      .status(404)
      .json({ error: "no existe un producto con ese ID" });
  }
  return res.status(200).json(productoFiltrado);
});

router.post("/",
  function (req: Request<{}, {}, crearProducto>, res: Response) {
    // #swagger.tags = ['Productos']
    // #swagger.description = 'Crea un nuevo producto. El campo activo se asigna automaticamente en true'
    /* #swagger.parameters['body'] = {
         in: 'body',
         description: 'Datos del producto a crear',
         required: true,
         schema: {
           nombreProducto: 'Cafe molido',
           precioUnitario: 25.5,
           marca: 'Altomayo',
           categoria: 'bebidas'
         }
    } */
    // #swagger.responses[201] = { description: 'Producto creado exitosamente' }
    // #swagger.responses[400] = { description: 'Faltan datos obligatorios' }
    const { nombreProducto, precioUnitario, marca, categoria } = req.body;
    if (!nombreProducto || !precioUnitario || !marca || !categoria) {
      return res.status(400).json({ error: "faltan datos que son obligatorios" });
    }
    const nuevoProducto: producto = {
      id:
        listaProductos.length > 0
          ? listaProductos.length + 1
          : 1,
      nombreProducto,
      precioUnitario,
      marca,
      categoria,
      activo: true,
    };
    listaProductos.push(nuevoProducto);
    res.status(201).json(nuevoProducto);
  });

router.put("/:id", function (req: Request, res: Response) {
  const idBuscado = Number(req.params.id);
  const index = listaProductos.findIndex(function (p) {
    return p.id === idBuscado;
  });
  if (index === -1) {
    return res.status(404).json({ error: "Pedido no encontrado." });
  } else {
    const {  }: actualizarProducto = req.body;
    // actualizando la informacion del usuario
    /*listaPedidos[index] = {
      id: idBuscado,
      estado: estado ?? listaPedidos[index]?.estado
    };*/
    res.json(listaProductos[index]);
  }
});

export default router;