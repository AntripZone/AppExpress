interface producto {
  id: number;
  nombreProducto: string;
  precioUnitario: number;
  activo: boolean;
  marca: string;
  categoria: string;
};

//CREAR UN PRODUCTO NUEVO METODO POST
interface crearProducto {
 nombreProducto: string;
  precioUnitario: number;
  marca: string;
  categoria: string;
};

interface actualizarProducto {
  nombreProducto: string;
  precioUnitario: number;
  marca: string;
  categoria: string;
  activo: boolean;
};

interface actualizarProductoPatch {
  nombreProducto?: string;
  precioUnitario?: number;
  marca?: string;
  categoria?: string;
  activo?: boolean;
};

interface productosFiltrados{
    nombreProducto?: string;
    estado?: string;
}


interface idParam {
    id: string;
};

export type{
    producto,
    crearProducto,
    actualizarProducto,
    productosFiltrados,
    idParam
};