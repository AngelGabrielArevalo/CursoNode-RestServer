import { Router } from 'express';
import * as UsuariosController from '../controllers/UseriosController.js';
import { check , query} from 'express-validator';
import { valiadarCampos } from "../middlewares/validar-campos.js";
import * as validacionesDB from '../helpers/db-validators.js';


export const userRouter = Router()  ;

userRouter.get('/',[
    query('limite', 'El limite debe ser numerico').isNumeric().optional(),
    query('desde', "El valor de 'desde' debe ser numerico").isNumeric().optional(),
    valiadarCampos
],UsuariosController.usuariosGet);

userRouter.post('/', [
    check('nombre',  'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña debe contener más de 6 caracteres').isLength({min: 6}),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom(validacionesDB.esCorreValido),
    check('rol').custom(validacionesDB.esRolValido),
    valiadarCampos
], UsuariosController.usuariosPost);

userRouter.put('/:id',[
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(validacionesDB.existeUsuarioPorId),
    check('rol').custom(validacionesDB.esRolValido),
    valiadarCampos
], UsuariosController.usuariosPut);

userRouter.delete('/:id',[
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(validacionesDB.existeUsuarioPorId),
    valiadarCampos
] ,UsuariosController.usuariosDelete);

userRouter.patch('/', UsuariosController.usuariosPatch);