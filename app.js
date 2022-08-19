import dotenv from 'dotenv';
import { Server } from "./models/server.js";

const a =10;
dotenv.config();

const server = new Server();

server.listen();    