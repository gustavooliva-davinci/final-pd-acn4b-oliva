import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { usePeliculas } from '../hooks/usePeliculas.js';
import "../styles/cine.css";

function CineDetail() {
    const { id } = useParams();
    const { obtenerPeliculaPorId, eliminarPelicula } = usePeliculas();
    const navigate = useNavigate();
    
    const [pelicula, setPelicula] = useState(null);
    const [cargando, setCargando] = useState(true);

    // Eliminar pelicula
    const handleEliminarPelicula = async () => {
        if (!window.confirm("Seguro que queres eliminar la pelicula?")) return;

        const idNumerico = parseInt(id);

        const resultado = await eliminarPelicula(idNumerico);

        if (resultado.exito){
            alert(resultado.mensaje);
            navigate("/"); // Devolver la lista despues de eliminar
        } else {
            alert(resultado.mensaje);
        }
    };

    useEffect(() => {
        const cargarDetalle = async () => {
            setCargando(true);
            const peliculaData = await obtenerPeliculaPorId(id);
            
            if (peliculaData){
                setPelicula(peliculaData);
            } else {
                setPelicula(null);
            }

            setCargando(false);
        };

        cargarDetalle();
    }, [id, obtenerPeliculaPorId]);

    if (cargando) return <p>Cargando...</p>;

    if (!pelicula) {
        return (
            <div style={{ textAlign: "center", marginTop: "50px" }}>
                <h2>Pelicula no encontrada</h2>
                <Link to="/" className="volver-btn">Volver al Listado</Link>
            </div>
        );
    }

    // render
    return (
        <div className="detail-container">
            <img className="detail-image" src={pelicula.imagen} alt={pelicula.titulo} />

            <div className="detail-info">
                <h1>{pelicula.titulo}</h1>
                <p><strong>ID:</strong> {pelicula.id}</p>
                <p><strong>Genero:</strong> {pelicula.genero}</p>
                <p><strong>Año:</strong> {pelicula.anio}</p>
                <p><strong>Descripcion:</strong></p>
                <p>{pelicula.descripcion}</p>

                <br />
                <button className="edit-btn" onClick={() => navigate("/")} style={{ marginRight: '10px' }}>
                    Editar pelicula
                </button>

                <button className="delete-btn" onClick={handleEliminarPelicula} style={{ background: "red", color: "white" }}>
                    Eliminar pelicula
                </button>
                
                <br />
                <Link to="/" className="volver-btn">Volver</Link>
            </div>
        </div>
    );
}

export default CineDetail;