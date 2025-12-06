import express from 'express';
import cors from 'cors';
import db from './db/database.js'; // DB
import peliculasRoutes from './routes/peliculasRoutes.js';

const app = express();
const port = 3000;

// Configuracion de middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/peliculas', peliculasRoutes);

// Manejo de errores
app.use((req, res, next) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});

// Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor backend escuchando en http://localhost:${port}`);
});