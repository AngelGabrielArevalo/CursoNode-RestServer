import { request, response} from "express";
import { Usuario } from "../models/usuario.js";
import bcryptjs from 'bcryptjs';
import { validationResult } from "express-validator";

export const usuariosGet = (req = request, res = response) => {

    const {nombre = 'no introducido', apellido = 'no introducido'} = req.query;

    res.json({
        msj: "get angel",
        nombre, 
        apellido
    });
};

export const usuariosPost = async (req = request, res = response) => {

    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json(errores)
    }

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    //encriptar contrasenia
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    //validar correo repetido
    const existeCorreo = await Usuario.findOne({correo});
    if(existeCorreo){
        return res.status(400).json({
            msg: 'El correo ingresado ya se encuentra registrado'
        })
    }

    await usuario.save();

    res.json({
        msj: "post angel",
        usuario
    });
};

export const usuariosDelete = (req = request, res = response) => {
    res.json({
        msj: "delete angel"
    });
};

export const usuariosPatch = (req = request, res = response) => {
    res.json({
        msj: "patch angel"
    });
};

export const usuariosPut =  (req = request, res = response) => {
    res.json({
        msj: "put angel"
    });
};