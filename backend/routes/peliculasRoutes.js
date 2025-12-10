import express from 'express';
import { 
    obtenerPeliculas, 
    obtenerPeliculaPorId, 
    agregarPelicula, 
    actualizarPelicula, 
    eliminarPelicula 
} from '../controllers/peliculasController.js'; 
// Middlewware de validacion
import { peliculaValidationRules, validate } from '../middlewares/validationMiddleware.js';

const router = express.Router();

// Rutas
router.get('/', obtenerPeliculas);
router.get('/:id', obtenerPeliculaPorId);
router.post('/', peliculaValidationRules, validate, agregarPelicula); // Validar agregar
router.put('/:id', peliculaValidationRules, validate, actualizarPelicula); // Validar editar
router.delete('/:id', eliminarPelicula);

export default router;