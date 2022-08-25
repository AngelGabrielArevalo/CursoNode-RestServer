import { request, response } from "express"
import { Usuario } from "../models/usuario.js";
import bcryptjs from 'bcryptjs';
import { generarJWT } from "../helpers/generar-jwt.js";

export const authPost = async (req = request , res = response) => {

    try{
        const {correo, password} = req.body;
        const usuario = await Usuario.findOne({ correo });
        
        if(!usuario){
            return res.status(400).json({
                msg: "Usuario y/o contraseña inconrrectas - correo"
            })
        }
    
        if(!usuario.estado){
            return res.status(400).json({
                msg: "Usuario y/o contraseña inconrrectas - estado"
            })
        }
    
        const validPassword = bcryptjs.compareSync(password, usuario.password);
    
        if(!validPassword){
            return res.status(400).json({
                msg: "Usuario y/o contraseña inconrrectas - password"
            })
        }
    
        const token = await generarJWT(usuario.id);
    
        return res.status(200).json({
            msg: "Inicio de sesion exitoso!",
            usuario,
            token
        })
    }catch(error){
        console.log(error);
        res.json(500).json({
            msg: 'Error en el servidor'
        });
    }

}