import { Categoria } from "../models/categoria.js";
import { Producto } from "../models/producto.js";
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

export const existeCategoriaPorId = async (id = '') => {
    const categoria = await Categoria.findOne({id});

    if(!categoria){
        throw new Error('El id ingresado no pertenece a ninguna categoria');
    }

    if(!categoria.estado){
        throw new Error('El id ingresado no pertenece a ninguna categoria --estado');
    }
}

export const existeProductoPorId = async (id = '') => {
    const producto = await Producto.findById(id);

    if(!producto){
        throw new Error('El id ingresado no pertenece a ningun producto --id');
    }

    if(!producto.estado){
        throw new Error('El id ingresado no pertenece a ningun producto --estado');
    }
}