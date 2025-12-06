import express from 'express';
const router = express.Router();
import { 
    obtenerPeliculas, 
    obtenerPeliculaPorId, 
    agregarPelicula, 
    actualizarPelicula, 
    eliminarPelicula 
} from '../controllers/peliculasController.js'; 

// Rutas
router.get('/', obtenerPeliculas);
router.get('/:id', obtenerPeliculaPorId);
router.post('/', agregarPelicula);
router.put('/:id', actualizarPelicula);
router.delete('/:id', eliminarPelicula);

export default router;