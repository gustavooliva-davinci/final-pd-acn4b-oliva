const express = require("express");
const cors = require("cors");
const peliculasRoutes = require("./routes/peliculasRoutes");
const loggerMiddleware = require("./middlewares/logger");

const app = express();
const PORT = 3000;

// Configuracion de CORS
app.use(cors());
app.use(express.json());
app.use(loggerMiddleware);
app.use("/api/peliculas", peliculasRoutes);

app.use((req, res) => {
    res.status(404).json({ error: "Ruta no encontrada" });
});

app.listen(PORT, () => {
    console.log(`Servidor Express corriendo en http://localhost:${PORT}`);
});