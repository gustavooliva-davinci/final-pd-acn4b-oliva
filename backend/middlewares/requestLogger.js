const requestLogger = (req, res, next) => {
    // se obtiene tiempo actual
    const timestamp = new Date().toISOString();
    
    // registra el metodo HTTP, la URL y la marca de tiempo
    console.log(`[${timestamp}] 📜 Solicitud recibida: ${req.method} ${req.originalUrl}`);
    
    // pasa a la siguiente funcion
    next();
};

export default requestLogger;