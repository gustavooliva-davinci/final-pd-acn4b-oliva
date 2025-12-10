import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePeliculas } from '../hooks/usePeliculas.js';
import { Link } from 'react-router-dom';
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
    };

    // Manejo de envio (PUT)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Limpiar errores previos

        // funcion de actualizacion del hook
        const resultado = await actualizarPelicula(parseInt(id), formData);

        if (resultado.exito) {
            alert(resultado.mensaje); 
            navigate(`/detalle/${id}`); // Volver a la vista de detalle
        } else {
            setError(resultado.mensaje); 
            console.error("Error al actualizar:", resultado.mensaje);
        }
    };

    if (cargando) return <p className="loading-text">Cargando formulario...</p>;
    if (error && cargando === false) return <p className="error-text">{error}</p>;
    if (!formData.titulo) return <p className="error-text">Película no encontrada.</p>;

    return (
        <div className="form-container">
            <h2 className="form-title">Editar Película: {formData.titulo}</h2>

            <form onSubmit={handleSubmit} className="cine-form">
                
                {/* Mostrar error si existe */}
                {error && <p className="form-error">{error}</p>} 

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
                    />
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
                    />
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