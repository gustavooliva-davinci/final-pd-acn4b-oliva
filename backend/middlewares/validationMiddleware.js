import { body, validationResult } from 'express-validator';

// Reglas de validacion
export const peliculaValidationRules = [
    // Validacion para el titulo
    body('titulo')
        .notEmpty().withMessage('El título es obligatorio.')
        .isLength({ min: 3, max: 255 }).withMessage('El título debe tener entre 3 y 255 caracteres.'),
        
    // Validación para el año
    body('anio')
        .notEmpty().withMessage('El año es obligatorio.')
        .isInt({ min: 1900, max: new Date().getFullYear() + 1 }).withMessage('El año debe ser un número válido.'),

    // Validación para el género (opcional, si es un campo libre)
    body('genero')
        .optional()
        .isLength({ max: 50 }).withMessage('El género no debe exceder los 50 caracteres.'),
        
];

// Middleware que ejecuta las reglas y maneja los errores
export const validate = (req, res, next) => {
    const errors = validationResult(req);
    
    if (errors.isEmpty()) {
        return next(); // Si no hay errores, pasa
    }
    
    // Si hay errores, se muestra la respueta
    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));
    
    const error = new Error('Errores de validación en la solicitud.');
    error.statusCode = 422; 
    error.errors = extractedErrors; // Adjuntamos los detalles
    
    return next(error); 
};