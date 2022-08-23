import { Role } from "../models/role.js"
import { Usuario } from "../models/usuario.js";

export const esRolValido = async (rol = '') => {
    const existeRol = await Role.findOne({rol});
    if(!existeRol){
        throw new Error(`El rol ${rol} no está registrado en la BD`);
    }
}

export const esCorreValido = async (correo = '') => {
    const existeCorreo = await Usuario.findOne({correo});

    if(existeCorreo){
        throw new Error(`El correo ingresado ya se encuentra registrado`);
    }
}

export const existeUsuarioPorId = async (id = '') => {
    const existeUsuario = await Usuario.findById(id);

    if(!existeUsuario){
        throw new Error('El id ingresado no pertenece a ningún usuario');
    }
}