import mongoose from "mongoose";

export const dbConnection = async () => {

    try{
        await mongoose.connect(process.env.MONGODB_ATLAS_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log("conectado a la base de datos");

    } catch(error){
        console.log(error);
        throw new Error (error);
    }
};