import { request, response } from 'express';
import { Categoria } from '../models/categoria.js';
import { Usuario } from '../models/usuario.js';

//obtener categorias -paginado-total-populate
export const listarCategorias = async (req = request, res = response) => {

    const { limite = 10, desde = 0 } = req.query;

    const [categoriasTotales, categoriasActivas, categorias, usuario] = await Promise.all([
        Categoria.countDocuments(),
        Categoria.countDocuments({ estado: true }),
        Categoria.find({ estado: true }).populate('usuario').limit(limite).skip(desde),
    ]);

    res.json({
        categoriasTotales,
        categoriasActivas,
        categorias
    });
}


//obtener categoria por id -populate
export const obtenerCategoriaPorId = async (req = request, res = response) => {
    const { idCategoria } = req.params;
    const categoria = await Categoria.findById(idCategoria).populate('usuario', 'nombre');

    res.json({
        categoria
    })
}

//actualizar categoria por nombre
export const actualizarCategoria = async (req = request, res = response) => {
    const { idCategoria } = req.params;
    const { nuevoNombre } = req.query;

    const data = {
        nombre: nuevoNombre,
        usuario: req.usuario._id
    }

    const categoria = await Categoria.findByIdAndUpdate(idCategoria, data).populate('usuario', 'nombre');

    res.json({
        msg: 'Se actualizó la categoria',
        categoria
    })
}



//borrar categoria -estado:false
export const eliminarCategoria = async (req = request, res = response) => {
    const {idCategoria} = req.params;

    const categoria = await Categoria.findByIdAndUpdate(idCategoria, {estado: false});

    res.json({
        msg: 'Se eliminó la categoria',
        categoria
    })

}

export const crearCategoria = async (req = request, res = response) => {

    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({ nombre });

    //si la categoria ya existe
    if (categoriaDB) {
        return res.status(400).json({
            msg: `La categoria ${categoriaDB.nombre} ya existe`
        });
    }

    //Generar la data a guardar
    const data = {
        nombre,
        usuario: req.usuario._id
    }

    console.log(req.usuario._id)

    const categoriaAGuardar = new Categoria(data);

    //guardo en db
    await categoriaAGuardar.save();

    res.status(201).json({
        msg: 'Se creó la categoria',
        categoriaAGuardar
    });

}