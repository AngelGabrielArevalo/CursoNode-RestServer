import {request, response} from 'express';
import { Usuario } from '../models/usuario.js';


export const validarRolAdmin = async (req = request, res = response, next) => {
    
    const {rol, nombre} = req.usuario;

    if(rol == "ADMIN_ROL"){
        return next();
    }else{
        return res.status(401).json({
            msg: `${nombre} no es administrador`
        });
    }

}

export const validarRol = (...roles) => {
    

    return async (req = request, res= response, next) => {
        const usuario = req.usuario;
        if(!roles.includes(usuario.rol)){
            return res.status(401).json({
                msg: `El usuario ${usuario.nombre} debe tenes alguno de estos roles ${roles}`
            });
        }

        next();
    }
}
