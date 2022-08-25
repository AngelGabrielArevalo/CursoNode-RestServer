import { request, response} from "express";
import { Usuario } from "../models/usuario.js";
import bcryptjs from 'bcryptjs';

export const usuariosGet = async (req = request, res = response) => {
    //const {nombre = 'no introducido', apellido = 'no introducido'} = req.query;
    const {limite, desde} = req.query;
    
    const [totalUsuarios, usuariosActivos, usuarios] = await Promise.all([
        Usuario.countDocuments(),
        Usuario.countDocuments({estado: true}),
        Usuario.find({estado: true}).limit(limite).skip(desde)
    ]);

    res.json({
        totalUsuarios,
        usuariosActivos,
        usuarios
    });
};

export const usuariosPost = async (req = request, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    //encriptar contrasenia
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    await usuario.save();

    res.json({
        msj: "post  angel",
        usuario
    });
};

export const usuariosDelete = async (req = request, res = response) => {
    const id = req.params.id;

    const usuarioEliminado = await Usuario.findById(id);

    if(!usuarioEliminado){
        return res.json({
            msg: 'No se encontró un usuario con este id'
        });
    }

    if(!usuarioEliminado.estado){
        return res.json({
            msg: "Usuario inactivo"
        });
    }
    
    await Usuario.findByIdAndUpdate(id, {estado:false});
    res.json({
        usuarioEliminado
    });
};

export const usuariosPatch = (req = request, res = response) => {
    res.json({
        msj: "patch angel"
    });
};

export const usuariosPut = async (req = request, res = response) => {
    const { id } = req.params;
    const { _id, password, google, ...resto } = req.body;
    
    if(password){
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        msj: "put angel",
        usuario
    });
};