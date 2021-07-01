// Import Router
import { Router } from 'express';

// Importando al controlador Home
import homeController from '@server/controllers/homeController';

// Creando la instancia de un router
const router = new Router();

// GET '/'
router.get(['/', '/index'], homeController.index);

// Get '/gretting
router.get('/greeting', homeController.greeting);

// Get '/about'
router.get('/about', homeController.about);

// Exportando el router que maneja las subrutas
// para el controlador home
export default router;
