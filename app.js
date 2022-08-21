import dotenv from 'dotenv';
import { Server } from "./models/server.js";
import {Role} from './models/role.js';

dotenv.config();

const server = new Server();

server.listen();    

