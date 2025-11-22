const validarCamposPelicula = (req, res, next) => {
    const { titulo, anio, genero, imagen } = req.body;

   if (!titulo || !titulo.trim()) {
        return res.status(400).json({ error: "El titulo es un campo obligatorio." });
    }
    
    if (!imagen || !imagen.trim()) {
        return res.status(400).json({ error: "La URL de la imagen es un campo obligatorio." });
    }

    if (anio && isNaN(parseInt(anio))) {
        return res.status(400).json({ error: "El año debe ser un numero valido." });
    }

    next();
};

module.exports = { validarCamposPelicula };