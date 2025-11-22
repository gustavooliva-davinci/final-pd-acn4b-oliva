const { error } = require("console");
const fs = require("fs");
const path = require("path");

// Ruta del archivo de peliculas
const filePath = path.join(__dirname, '../data/peliculas.json');

// Leer archivo JSON
const leerPeliculas = async () => {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error){
        return [];
    }
};

// Escribir archivo JSON
const escribirPeliculas = async (peliculas) => {
    await fs.writeFile(filePath, JSON.stringify(peliculas, null, 2), 'utf8');
};

// -- ENDPOINTS --
// GET - todas las peliculas
const obtenerPeliculas = async (req, res) => {
    try {
        const peliculas = await leerPeliculas();
        res.status(200).json(peliculas);
    } catch (error){
        res.status(500).json({ error: "Error al obtener las peliculas" });
    }
};

// GET - pelicula por id
const obtenerPeliculaPorId = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const peliculas = await leerPeliculas();
        const pelicula = peliculas.find(p => p.id === id);

        if (pelicula){
            res.status(200).json(pelicula);
        } else {
            res.status(404).json({ error: "Pelicula no encontrada" });
        }
    } catch (error){
        res.status(500).json({ error: "Error al obtener la pelicula" });
    }
};

// POST - agregar pelicula
const agregarPelicula = async (req, res) => {
    const nuevaPelicula = req.body;
    
    try {
        const peliculas = await leerPeliculas();
        // Tomar el ultimo ID y sumar 1
        const newId = peliculas.length > 0 ? Math.max(...peliculas.map(p => p.id)) + 1 : 1;

        const peliculaConId = {
            id: newId,
            ...nuevaPelicula,
            imagen: nuevaPelicula.imagen || 'ruta/a/imagen_por_defecto.jpg'
        };

        peliculas.push(peliculaConId);
        await escribirPeliculas(peliculas);
        res.status(201).json(peliculaConId); // Se devuelve la pelicula agregada
    } catch (error){
        res.status(500).json({ error: "Error al agregar la pelicula" });
    }
};

// UPDATE - actualizar pelicula
const actualizarPelicula = async (req, res) => {
    const id = parseInt(req.params.id);
    const datosActualizados = req.body;

    try {
        let peliculas = await leerPeliculas();
        const index = peliculas.findIndex(p => p.id === id);

        if (index === -1){
            return res.status(404).json({ error: 'Película no encontrada para actualizar' });
        }

        peliculas[index] = { ...peliculas[index], ...datosActualizados };
        await escribirPeliculas(peliculas);
        res.status(200).json(peliculas[index]); // Devuelve la peli actualizada
    } catch (error){
        res.status(500).json({ error: "Error al actualizar la pelicula" });
    }
};

// DELETE - eliminar pelicula
const eliminarPelicula = async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        let peliculas = await leerPeliculas();
        const initialLength = peliculas.length;

        peliculas = peliculas.filter(p => p.id !== id);

        if (peliculas.length === initialLength){
            return res.status(404).json({ error: "Pelicula no encontrada para eliminar" });
        }

        await escribirPeliculas(peliculas);
        res.status(200).json({ mensaje: "Pelicula con ID ${id} eliminada correctamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar la pelicula" });
    }
};

module.exports = {
    obtenerPeliculas,
    obtenerPeliculaPorId,
    agregarPelicula,
    actualizarPelicula,
    eliminarPelicula
};