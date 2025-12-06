import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

// obtener __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// mensajes de error 
const sqlite = sqlite3.verbose();

// Nombre del archivo de la base de datos
const dbPath = path.resolve(__dirname, 'cine.db');

// Crear conexion
const db = new sqlite.Database(dbPath, (err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err.message);
    } else {
        console.log('Conectado a la base de datos SQLite.');
    }
});

// Inicializar tabla si no existe
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS peliculas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        titulo TEXT NOT NULL,
        descripcion TEXT,
        anio INTEGER,
        genero TEXT,
        imagen TEXT
    )`, (err) => {
        if (err) {
            console.error('Error al crear tabla:', err.message);
        } else {
            console.log('✨ Tabla peliculas verificada/creada.');
        }
    });
});

export default db;