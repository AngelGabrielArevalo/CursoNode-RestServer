import { Router } from 'express';
import * as UsuariosController from '../controllers/UseriosController.js';
import { check } from 'express-validator';
import { valiadarCampos } from "../middlewares/validar-campos.js";
import * as validacionesDB from '../helpers/db-validators.js';


export const userRouter = Router()  ;

userRouter.get('/', UsuariosController.usuariosGet);

userRouter.post('/', [
    check('nombre',  'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña debe contener más de 6 caracteres').isLength({min: 6}),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom(validacionesDB.esCorreValido),
    check('rol').custom(validacionesDB.esRolValido),
    valiadarCampos
], UsuariosController.usuariosPost);

userRouter.put('/', UsuariosController.usuariosPut);

userRouter.delete('/', UsuariosController.usuariosDelete);

userRouter.patch('/', UsuariosController.usuariosPatch);