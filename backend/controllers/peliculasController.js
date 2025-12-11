import db from '../db/database.js'; 

// GET: todas las peliculasa
export const obtenerPeliculas = (req, res, next) => {
    const sql = 'SELECT * FROM peliculas';
    
    db.all(sql, [], (err, rows) => {
        if (err) {
            return next(err); // Middleware de manejo de errores
        }
        res.json(rows);
    });
};

// GET: pelicula por id
export const obtenerPeliculaPorId = (req, res, next) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM peliculas WHERE id = ?';

    db.get(sql, [id], (err, row) => {
        if (err) {
            return next(err); // Middleware de manejo de errores
        }
        if (!row) {
            const error = new Error(`Pelicula con ID ${id} no encontrada.`);
            error.statusCode = 404;
            return next(error);
        }
        res.json(row);
    });
};

// POST: agregar pelicula
export const agregarPelicula = (req, res, next) => {
    const { titulo, descripcion, anio, genero, imagen } = req.body;

    const sql = `INSERT INTO peliculas (titulo, descripcion, anio, genero, imagen) VALUES (?, ?, ?, ?, ?)`;
    const values = [titulo, descripcion, anio, genero, imagen || '/imagenes/default.jpg'];

    db.run(sql, values, function(err) {
        if (err) {
            return next(err);
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
export const actualizarPelicula = (req, res, next) => {
    const { id } = req.params;
    const { titulo, descripcion, anio, genero, imagen } = req.body;
    
    const sql = `UPDATE peliculas SET titulo = ?, descripcion = ?, anio = ?, genero = ?, imagen = ? WHERE id = ?`;
    const values = [titulo, descripcion, anio, genero, imagen, id];

    db.run(sql, values, function(err) {
        if (err) {
            return next(err);
        }
        if (this.changes === 0) {
            const error = new Error(`Pelicula con ID ${id} no encontrada para actualizar.`);
            error.statusCode = 404;
            return next(error);
        }
        res.json({ 
            pelicula: { id: parseInt(id), titulo, descripcion, anio, genero, imagen }
        });
    });
};

// DELETE: Eliminar
export const eliminarPelicula = (req, res, next) => {
    const { id } = req.params;
    const sql = 'DELETE FROM peliculas WHERE id = ?';

    db.run(sql, id, function(err) {
        if (err) {
            return next(err);
        }
        if (this.changes === 0) {
            const error = new Error(`Pelicula con ID ${id} no encontrada para eliminar.`);
            error.statusCode = 404;
            return next(error);
        }
        res.status(204).send();
    });
};