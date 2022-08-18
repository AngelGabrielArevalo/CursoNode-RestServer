import { request, response} from "express";

export const usuariosGet = (req = request, res = response) => {
    const {nombre = 'no introducido', apellido = 'no introducido'} = req.query;

    res.json({
        msj: "get angel",
        nombre, 
        apellido
    });
};

export const usuariosPost = (req = request, res = response) => {
    const body = req.body;
    res.json({
        msj: "post angel",
        body
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