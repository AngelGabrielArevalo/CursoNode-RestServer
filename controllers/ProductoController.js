import { request, response } from 'express';
import { Producto } from '../models/producto.js';


export const listarProductos = async (req = request, res = response) => {
    const { limite = 10, desde = 0 } = req.query;
    const [totalProductos, totalProductosActivos, productos] = await Promise.all([
        Producto.countDocuments(),
        Producto.countDocuments({ estado: true }),
        Producto.find({ estado: true }).limit(limite).skip(desde)
    ]);
    res.json({
        totalProductos,
        totalProductosActivos,
        productos
    });
}

export const crearProducto = async (req = request, res = response) => {
    const { nombre, estado, precio, descripcion, idCategoria } = req.body;
    const existeProducto = await Producto.findOne({ nombre });

    if (existeProducto) {
        return res.status(400).json({
            msg: `El produccto ${nombre} ya existe`
        });
    }

    const data = {
        nombre,
        estado,
        usuario: req.usuario._id,
        precio,
        categoria: idCategoria,
        descripcion
    }

    const producto = new Producto(data);

    const produstoAGuardar = await producto.save();

    res.json({
        produstoAGuardar
    });
}

export const actualizarProducto = async (req = request, res = response) => {
    const {nombre, precio, descripcion, disponible} = req.body;
    const {idProducto} = req.params;
    
    const producto = await Producto.findByIdAndUpdate(idProducto, {
        nombre, 
        precio,
        descripcion,
        disponible
    }, {new: true});

    res.json({
        producto
    });

}