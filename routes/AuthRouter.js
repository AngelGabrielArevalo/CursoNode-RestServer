import * as authController from '../controllers/AuthController.js';
import { Router } from 'express';
import { check } from 'express-validator';
import { valiadarCampos } from '../middlewares/validar-campos.js';


export const authRouter = Router();

authRouter.post('/login',[
    check('correo', "El correo es obligatorio").isEmail(),
    check('password', "La contraseña es obligatoria").not().isEmpty(),
    valiadarCampos
], authController.authPost);