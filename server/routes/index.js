import { Router } from 'express';
// importando el router de Home
import homeRouter from './home';
// Importando router de users
import userRouter from './user';

const router = new Router();

//Agregando las rutas a la aplicación
const addRouter = (app) => {
    app.use('/', homeRouter);
    app.use('/user', userRouter);

export default {
    addRoutes,
};
