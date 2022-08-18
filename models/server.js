import express from 'express';
import cors from 'cors';
import { userRouter } from '../routes/UseriosRouter.js';

export class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.userRouterPath = '/api/usuarios';

        //middlewares
        this.middlewares();

        //rutas de mi aplicacion
        this.routes();
    }

    middlewares(){
        // cors
        this.app.use(cors());
        // pagina de inicio publica
        this.app.use(express.static('public'));
        // routas
        this.app.use(express.json());
    }

    routes() {
        this.app.use( this.userRouterPath , userRouter);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Escuchando en el puerto ${this.port}`);
        });
    }
}
