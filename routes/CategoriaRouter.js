import {  Router } from 'express';
import { check, query } from 'express-validator';
import { crearCategoria, listarCategorias, obtenerCategoriaPorId, actualizarCategoria, eliminarCategoria} from '../controllers/CategoriaController.js';
import { valiadarCampos } from '../middlewares/validar-campos.js';
import { validarJWT } from '../middlewares/validar-jwt.js';
import * as validacionesDB from '../helpers/db-validators.js';
import { validarRol } from '../middlewares/validar-roles.js';

export const categoriaRouter = Router();

//obtener todas las categorias -publico
categoriaRouter.get('/',[
    query('limite', 'El limite debe ser numerico').isNumeric().optional(),
    query('desde', "El valor de 'desde' debe ser numerico").isNumeric().optional(),
    valiadarCampos
],listarCategorias);

//Obtener una categoria por id -publico
categoriaRouter.get('/:idCategoria',[
    check('idCategoria', 'No es un id valido').isMongoId(),
    check('idCategoria').custom(validacionesDB.existeCategoriaPorId),
    valiadarCampos
], obtenerCategoriaPorId);

//Crear categoria -privado -cualquier persona con rol valido
categoriaRouter.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('estado', 'El estado es obligatorio y boolean').isBoolean(),
    valiadarCampos
],crearCategoria)

//Actualizar categoria por id -privado -cualquier persona con rol valido
categoriaRouter.put('/:idCategoria',[
    validarJWT,
    check('idCategoria', 'No es un id valido').isMongoId(),
    check('idCategoria').custom(validacionesDB.existeCategoriaPorId),
    query('nuevoNombre', 'Debe ingresar el nuevo nombre').not().isEmpty(),
    valiadarCampos
] ,actualizarCategoria)

//Borrar una categoria -privado -solo rol admin
categoriaRouter.delete('/:idCategoria', [
    validarJWT,
    validarRol("ADMIN_ROL"),
    check('idCategoria', 'Debe ingresar un id valido').isMongoId(),
    check('idCategoria').custom(validacionesDB.existeCategoriaPorId),
    valiadarCampos
],eliminarCategoria)