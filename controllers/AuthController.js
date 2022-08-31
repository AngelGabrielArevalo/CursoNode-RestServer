import { request, response } from "express"
import { Usuario } from "../models/usuario.js";
import bcryptjs from 'bcryptjs';
import { generarJWT } from "../helpers/generar-jwt.js";
import { googleVerify } from "../helpers/google-verify.js";

export const authPost = async (req = request, res = response) => {

    try {
        const { correo, password } = req.body;
        const usuario = await Usuario.findOne({ correo });

        if (!usuario) {
            return res.status(400).json({
                msg: "Usuario y/o contraseña inconrrectas - correo"
            })
        }

        if (!usuario.estado) {
            return res.status(400).json({
                msg: "Usuario y/o contraseña inconrrectas - estado"
            })
        }

        const validPassword = bcryptjs.compareSync(password, usuario.password);

        if (!validPassword) {
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
    } catch (error) {
        console.log(error);
        res.json(500).json({
            msg: 'Error en el servidor'
        });
    }

}

export const googleSignIn = async (req = request, res = response) => {
    const { id_token } = req.body;

    try {

        const {nombre, img, correo} = await googleVerify(id_token);

        let usuario = await Usuario.findOne({correo});

        if(!usuario){
            //tengo q crearlo
            const data = {
                nombre, 
                correo,
                password: 'undefi ned',
                img,
                rol: 'USER_ROL',
                estado: true,
                google: true
            }

            usuario = new  Usuario(data);
            await usuario.save();
        }


        if(!usuario.estado){
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
            });
        }
        
        //generar el jwt
        const token = await generarJWT(usuario.id);



        res.json({
            usuario,
            token
        });
    }catch(error){

    }
}