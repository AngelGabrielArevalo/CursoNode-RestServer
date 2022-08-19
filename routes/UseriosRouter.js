import { Router } from 'express';
import * as UsuariosController from '../controllers/UseriosController.js';
/* import { body } from 'express-validator'; */
import { check } from 'express-validator';

export const userRouter = Router();

/* const validarInputs = body('correo', 'El correo no es valido').isEmail(); */

userRouter.get('/', UsuariosController.usuariosGet);

userRouter.post('/', [
    check('correo', 'El correo no es valido').isEmail()
]
    , UsuariosController.usuariosPost);

userRouter.put('/', UsuariosController.usuariosPut);

userRouter.delete('/', UsuariosController.usuariosDelete);

userRouter.patch('/', UsuariosController.usuariosPatch);