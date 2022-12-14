import mongoose from "mongoose";

const UsuarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    }, 
    img: {
        type: String
    },
    rol: {
        type: String,
        required: true,
        //enum: ['ADMIN_ROL', 'USER_ROL']
    },
    estado: {
        type: Boolean,
        default: false
    },
    google: {
        type: Boolean,
        default: false
    }
});

UsuarioSchema.methods.toJSON = function() {
    const {__v, password, _id, ...usuario} = this.toObject();
    usuario.uid = _id;
    return usuario;
}

export const Usuario = mongoose.model('Usuario', UsuarioSchema);
