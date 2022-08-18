import { request, response} from "express";

export const usuariosGet = (req = request, res = response) => {
    res.json({
        msj: "get angel"
    });
};

export const usuariosPost = (req = request, res = response) => {
    const {nombre, apellido} = req.body;
    res.json({
        msj: "post angel",
        nombre,
        apellido
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