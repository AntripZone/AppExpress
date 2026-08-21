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
        // #swagger.description = 'Obtiene la lista de productos, con filtros opcionales por nombre'
        // #swagger.parameters['nombreProducto'] = { in: 'query', description: 'Busqueda por nombre', type: 'string' }
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
    // #swagger.tags = ['Productos']
    // #swagger.description = 'Obtiene la lista de un producto'
    // #swagger.parameters['id'] = { in: 'path', required: true, type: 'integer', description: 'Id del producto' }
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
           precioUnitario: 25,
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
   /*
    #swagger.tags = ['Productos']
    #swagger.description = 'Actualiza el estado de un producto'
    #swagger.parameters['id'] = {description: 'Id del producto'}
    #swagger.parameters['obj'] = {
        in: 'body',
        description: 'Actualizar activo',
        schema: {activo: false}
    }
  */
  const idBuscado = Number(req.params.id);
  const index = listaProductos.findIndex(function (p) {
    return p.id === idBuscado;
  });
  if (index === -1) return res.status(404).json({ error: "Pedido no encontrado." });

  const { activo }: actualizarProducto = req.body;
  if (activo === undefined) return res.status(400).json({ error: "Debe enviar el campo 'activo'." });
    listaProductos[index] = {
    ...listaProductos[index]!, 
    activo: activo ?? listaProductos[index]!.activo,
  };
    res.json(listaProductos[index]);
});

router.delete("/:id", function (req: Request, res: Response) {
  /*
    #swagger.tags = ['Productos']
    #swagger.description = 'Eliminar Producto'
    #swagger.parameters['id'] = {description: 'Id del producto a eliminar'}
    #swagger.parameters['obj'] = {
        in: 'body',
        description: 'Nuevo estado'
    }
  */
  const idProducto = Number(req.params.id);
    const index = Number(req.params.notaIndex);

    const producto = listaProductos.findIndex( function(p){
      return p.id ==- idProducto
    });

    if (index === -1) {
    return res
      .status(404)
      .json({ error: "Producto no encontrado." });
  } else {
    let listaNuevaProductos = listaProductos.filter(
      (e) => e.id !== idProducto,
    );
    setListaProductos(listaNuevaProductos);
    res.json({ mensaje: "Producto eliminido exitosamente." });
  }
});

export default router;