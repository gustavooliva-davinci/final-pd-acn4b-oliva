import { useState } from "react";
import { Link } from "react-router-dom";
import { usePeliculas } from '../hooks/usePeliculas.js';
import "../styles/cine.css";
import CineEditForm from "./CineEditForm"; 

function CineList() {
    const { 
        peliculas, 
        cargando, 
        agregarPelicula, 
        eliminarPelicula, 
        actualizarPelicula
    } = usePeliculas();

    const [peliculaEditar, setPeliculaEditar] = useState(null);
    const [mensajeExito, setMensajeExito] = useState(null);
    const [mensajeError, setMensajeError] = useState(null);

    const [form, setForm] = useState({
        titulo: "",
        genero: "",
        anio: "",
        descripcion: "",
        imagen: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    };
    
    // Enviar la pelicula al BACK
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.titulo.trim() || !form.imagen.trim()){
            setMensajeError("El titulo y la URL de imagen son obligatorios.");
            setTimeout(() => setMensajeError(null), 4000); 
            return;
        }
        setMensajeError(null); 

        const resultado = await agregarPelicula(form); 

        if (resultado.exito){
            setMensajeExito(resultado.mensaje);
            setTimeout(() => setMensajeExito(null), 4000); 

            setForm({ titulo: "", genero: "", anio: "", descripcion: "", imagen: "" });
        } else {
            setMensajeError(resultado.mensaje);
            setTimeout(() => setMensajeError(null), 4000); 
        }
    };

    // Eliminar pelicula
    const handleEliminarPelicula = async (id) => {
        if (!window.confirm("¿Seguro que deseas eliminar esta pelicula?")) return;

        const resultado = await eliminarPelicula(id);

        if (resultado.exito){
            setMensajeExito(resultado.mensaje);
            setTimeout(() => setMensajeExito(null), 4000); 
        } else {
            setMensajeError(resultado.mensaje);
            setTimeout(() => setMensajeError(null), 4000); 
        }
    };

     const seleccionarPelicula = (peli) => {
        setPeliculaEditar({ ...peli, id: parseInt(peli.id) }); 
    };

    // Render
    return (
        <>
            <h1>Catalogo de Películas</h1>
            
            {/* Mensajes Dinámicos */}
            {mensajeExito && (
                <div className="mensaje-dinamico success">
                    {mensajeExito}
                </div>
            )}
            {mensajeError && (
                <div className="mensaje-dinamico error">
                    {mensajeError}
                </div>
            )}

            {/* Formulario */}
            <form className="formulario-cine" onSubmit={handleSubmit} >
                {/* ... (inputs de agregar) ... */}
                <input 
                    type="text" 
                    name="titulo"
                    placeholder="Titulo *"
                    value={form.titulo}
                    onChange={handleChange}
                />
                <input 
                    type="text" 
                    name="genero"
                    placeholder="Genero"
                    value={form.genero}
                    onChange={handleChange}
                />
                <input 
                    type="text" 
                    name="anio"
                    placeholder="Año"
                    value={form.anio}
                    onChange={handleChange}
                />
                <textarea
                    name="imagen"
                    placeholder="URL de la imagen (click derecho y seleccionar la opción 'Copiar dirección de la imagen')*"
                    rows="3" // Define la altura mínima a una fila
                    value={form.imagen}
                    onChange={handleChange}
                />
                <textarea
                    name="descripcion"
                    placeholder="Descripción"
                    rows="3"
                    value={form.descripcion}
                    onChange={handleChange}
                />

                <button type="submit">Agregar Pelicula</button>
            </form>

            {/* Formulario EDITAR */}
            {peliculaEditar && (
                <CineEditForm 
                    peliculaEditar={peliculaEditar}
                    setPeliculaEditar={setPeliculaEditar}
                    actualizarPelicula={actualizarPelicula} // Pasamos la función del hook
                    setMensajeExito={setMensajeExito}
                    setMensajeError={setMensajeError}
                />
            )}

            {/* Listado */}
            {cargando ? (
                <p>Cargando películas...</p>
            ) : peliculas.length === 0 ? (
                <p>No hay películas disponibles. ¡Agrega una!</p>
            ) : (
                <div className="grid-container">
                    {peliculas.map((peli) => (
                        <div className="card" key={peli.id}>
                            <img className="card-image" src={peli.imagen} alt={peli.titulo} />
                            <h3 className="card-title">{peli.titulo}</h3>
                            <div className="card-actions">
                                <button className="delete-btn" onClick={() => handleEliminarPelicula(parseInt(peli.id))} >
                                    Eliminar
                                </button>
                                <button className="edit-btn" onClick={() => seleccionarPelicula(peli)}>
                                    Editar
                                </button>
                                <Link to={`/cine/${peli.id}`} className="volver-btn">
                                    Ver Detalle
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>  
            )}
        </>
    );
}

export default CineList;