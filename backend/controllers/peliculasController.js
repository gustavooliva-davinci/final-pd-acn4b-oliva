import db from '../db/database.js'; 

// GET: todas las peliculasa
const obtenerPeliculas = async (req, res) => {
    const sql = 'SELECT * FROM peliculas';
    
    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
};

// GET: pelicula por id
const obtenerPeliculaPorId = async (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM peliculas WHERE id = ?';

    db.get(sql, [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ error: "Película no encontrada" });
        }
        res.json(row);
    });
};

// POST: agregar pelicula
const agregarPelicula = async (req, res) => {
    const { titulo, descripcion, anio, genero, imagen } = req.body;
    const sql = `INSERT INTO peliculas (titulo, descripcion, anio, genero, imagen) VALUES (?, ?, ?, ?, ?)`;

    db.run(sql, [titulo, descripcion, anio, genero, imagen], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({
            id: this.lastID,
            titulo,
            descripcion,
            anio,
            genero,
            imagen
        });
    });
};

// PUT: Actualizar / editar
const actualizarPelicula = async (req, res) => {
    const { id } = req.params;
    const { titulo, descripcion, anio, genero, imagen } = req.body;
    
    const sql = `UPDATE peliculas SET titulo = ?, descripcion = ?, anio = ?, genero = ?, imagen = ? WHERE id = ?`;

    db.run(sql, [titulo, descripcion, anio, genero, imagen, id], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: "Película no encontrada para actualizar" });
        }
        res.json({ 
            mensaje: "Película actualizada", 
            pelicula: { id, titulo, descripcion, anio, genero, imagen } 
        });
    });
};

// DELETE: Eliminar
const eliminarPelicula = async (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM peliculas WHERE id = ?';

    db.run(sql, [id], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: "Película no encontrada para eliminar" });
        }
        res.json({ mensaje: "Película eliminada correctamente", exito: true });
    });
};

export {
    obtenerPeliculas,
    obtenerPeliculaPorId,
    agregarPelicula,
    actualizarPelicula,
    eliminarPelicula
};