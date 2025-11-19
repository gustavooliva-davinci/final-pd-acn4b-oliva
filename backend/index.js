import express from "express";
import cors from "cors";

import peliculasRoutes from "./routes/peliculasRoutes.js";
import { logger } from "./middlewares/logger.js";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(logger);

// Rutas
app.use("/api/peliculas", peliculasRoutes);

// Servidor
app.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`);
});