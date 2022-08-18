import {Router} from 'express';
import * as UsuariosController from '../controllers/UseriosController.js';

export const userRouter = Router();

userRouter.get('/', UsuariosController.usuariosGet );

userRouter.post('/', UsuariosController.usuariosPost);

userRouter.put('/', UsuariosController.usuariosPut);

userRouter.delete('/', UsuariosController.usuariosDelete);

userRouter.patch('/', UsuariosController.usuariosPatch);