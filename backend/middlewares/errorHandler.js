const errorHandler = (err, req, res, next) => {
    console.error('ERROR DE API:', err.stack); 

    // estado (statusCode) y el mensaje
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Error interno del servidor.';

    // respuesta JSON al cliente
    res.status(statusCode).json({
        error: message,
        detalle: process.env.NODE_ENV === 'development' ? err.stack : undefined 
    });
};

export default errorHandler;