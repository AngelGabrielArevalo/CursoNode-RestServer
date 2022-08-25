import jwt from "jsonwebtoken"

export const generarJWT = ( uid = '' ) => {

    return new Promise( (resolve, reject) => {
        const playload = {uid};

        jwt.sign(playload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '2h'
        }, (error, token) => {
            if(error){
                console.log(error);
                reject("No se pudo generar el token");
            }else{
                resolve(token);
            }
            
        })
    });

}
