const express = require("express");
const router = express.Router();
const {
    obtenerPeliculas,
    obtenerPeliculaPorId,
    agregarPelicula,
    actualizarPelicula,
    eliminarPelicula    
} = require("../controllers/peliculasController");
const { validarCamposPelicula } = require("../middlewares/validaciones");

// Rutas
router.get("/", obtenerPeliculas); // Lista de peliculas
router.get("/:id", obtenerPeliculaPorId); // Pelicula por ID
router.get("/", validarCamposPelicula, agregarPelicula); // Agregar pelicula
router.get("/:id", validarCamposPelicula, actualizarPelicula); // Actualizar pelicula
router.get("/:id", eliminarPelicula); // Eliminar pelicula

module.exports = router;