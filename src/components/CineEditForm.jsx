import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { usePeliculas } from '../hooks/usePeliculas.js';
import "../styles/cine.css";

function CineEditForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { obtenerPeliculaPorId, actualizarPelicula } = usePeliculas();
    
    const [formData, setFormData] = useState({
        titulo: '',
        descripcion: '',
        anio: '',
        genero: '',
        imagen: '',
    });

    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [validationErrors, setValidationErrors] = useState({}); // validacion del front

    // Cargar datos
    useEffect(() => {
        const fetchPelicula = async () => {
            setCargando(true);
            const data = await obtenerPeliculaPorId(parseInt(id));

            if (data) {
                setFormData(data);
                setError(null);
            } else {
                setError("No se pudo cargar la película para editar.");
            }
            setCargando(false);
        };
        fetchPelicula();
    }, [id, obtenerPeliculaPorId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        
        // limpiar el error de validacion
        if (validationErrors[name]) {
            setValidationErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    // validacion del front
    const validateForm = () => {
        const errors = {};
        const currentYear = new Date().getFullYear();
        const anioInt = parseInt(formData.anio);

        if (!formData.titulo || formData.titulo.length < 3) {
            errors.titulo = "El titulo debe tener al menos 3 caracteres.";
        }
        
        // Validacion de Año
        if (!formData.anio) {
            errors.anio = "El año es obligatorio.";
        } else if (isNaN(anioInt) || anioInt < 1900 || anioInt > currentYear) {
            errors.anio = `El año debe ser un número válido entre 1900 y ${currentYear}.`;
        }

        setValidationErrors(errors);
        return Object.keys(errors).length === 0; // Devuelve true si no hay errores
    };

    // Manejo de envio (PUT)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Limpiar errores previos

        // validacion del front
        if (!validateForm()){
            return; // Detener el envio
        }

        // funcion de actualizacion del hook
        const resultado = await actualizarPelicula(parseInt(id), formData);

        if (resultado.exito) {
            alert(resultado.mensaje);
            navigate(`/detalle/${id}`); // Volver a la vista de detalle
        } else {
            let mensajeError = resultado.mensaje;
            if (resultado.errors && resultado.errors.length > 0) {
                const detalles = resultado.errors.map(err => Object.values(err)[0]).join(' | ');
                mensajeError = `BE Validation Error: ${detalles}`;
            }
            alert(mensajeError);
        }
    };

    if (cargando) return <p className="loading-text">Cargando formulario...</p>;
    if (error && cargando === false) return <p className="error-text">{error}</p>;
    if (!formData.titulo) return <p className="error-text">Película no encontrada.</p>;

    return (
        <div className="form-container">
            <h2 className="form-title">Editar Película: {formData.titulo}</h2>

            <form onSubmit={handleSubmit} className="cine-form">
                
                {/* Titulo */}
                <div className="form-group">
                    <label htmlFor="titulo">Título</label>
                    <input
                        type="text"
                        id="titulo"
                        name="titulo"
                        value={formData.titulo}
                        onChange={handleChange}
                        required
                        // clase de error
                        className={validationErrors.titulo ? 'input-error' : ''}
                    />
                    {/* mensaje de error */}
                    {validationErrors.titulo && <p className="validation-message-error">{validationErrors.titulo}</p>}
                </div>

                {/* Descripcion */}
                <div className="form-group">
                    <label htmlFor="descripcion">Descripción</label>
                    <textarea
                        id="descripcion"
                        name="descripcion"
                        value={formData.descripcion || ''}
                        onChange={handleChange}
                    />
                </div>
                
                {/* Año */}
                <div className="form-group">
                    <label htmlFor="anio">Año</label>
                    <input
                        type="number"
                        id="anio"
                        name="anio"
                        value={formData.anio}
                        onChange={handleChange}
                        required
                        className={validationErrors.anio ? 'input-error' : ''}
                    />
                    {/* mensaje de error */}
                    {validationErrors.anio && <p className="validation-message-error">{validationErrors.anio}</p>}
                </div>

                {/* Genero */}
                <div className="form-group">
                    <label htmlFor="genero">Género</label>
                    <input
                        type="text"
                        id="genero"
                        name="genero"
                        value={formData.genero || ''}
                        onChange={handleChange}
                    />
                </div>

                {/* URL Imagen */}
                <div className="form-group">
                    <label htmlFor="imagen">URL de la Imagen (Ruta)</label>
                    <input
                        type="text"
                        id="imagen"
                        name="imagen"
                        value={formData.imagen || ''}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-actions">
                    <button type="submit" className="neon-submit-btn">
                        Guardar Cambios
                    </button>
                    <button type="button" onClick={() => navigate(-1)} className="neon-close-btn" style={{ marginLeft: '10px' }}>
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CineEditForm;