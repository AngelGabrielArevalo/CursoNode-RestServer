import { Router } from "express";
import { listarProductos, crearProducto } from "../controllers/ProductoController.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import {check, query} from 'express-validator'
import { valiadarCampos } from "../middlewares/validar-campos.js";
import { existeProductoPorId } from "../helpers/db-validators.js";
import { actualizarProducto } from "../controllers/ProductoController.js";

export const productoRouter = Router();

//obtener todas las categorias -publico
productoRouter.get('/', [
    query('limite', 'El limite debe ser numerico').isNumeric().optional(),
    query('desde', "El skip debe ser numerico").isNumeric().optional(),
    valiadarCampos
],listarProductos);

//Obtener una categoria por id -publico
productoRouter.get('/:id', ){

}



//Crear producto -privado -cualquier persona con rol valido
productoRouter.post('/',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('estado', 'El estado es obligatorio y boolean').isBoolean(),
    check('precio', 'El precio debe ser numerico').isNumeric().optional(),
    check('disponible', 'La disponibilidad debe ser boolean').isBoolean().optional(),
    valiadarCampos
], crearProducto)

//Actualizar categoria por id -privado -cualquier persona con rol valido
productoRouter.put('/:idProducto',[
    validarJWT,
    check('idProducto', 'El id ingresado es invalido').isMongoId(),
    check('idProducto').custom(existeProductoPorId),
    valiadarCampos
] ,actualizarProducto)


//Borrar una categoria -privado -solo rol admin
