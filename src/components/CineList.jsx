import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/cine.css";

function CineList() {
    const [peliculas, setPeliculas] = useState([]);
    const [cargando, setCargando] = useState(true);

    const [form, setForm] = useState({
        titulo: "",
        genero: "",
        anio: "",
        descripcion: "",
        imagen: ""
    })

    // Obtener peliculas desde API
    const cargarPeliculas = async () => {
        try {
            const res = await fetch("http://localhost:3000/api/peliculas");
            const data = await res.json();
            setPeliculas(data);
            setCargando(false);
        } catch (error) {
            console.error("Error al obtener películas:", error);
        }
    }

    useEffect(() => {
        cargarPeliculas();
    },[]);

    // Cambios en el FORM
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

        // Validacion
        if (!form.titulo.trim() || !form.imagen.trim()){
            alert("El titulo y la imagen son obligatorios para continuar.");
            return;
        }

        try {
            const res = await fetch("http://localhost:3000/api/peliculas", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            });

            const data = await res.json();

            if (data.error){
                alert(data.error);
                return;
            }

            alert("La pelicula fue agregada correctamente!");

            // Cargar lista
            cargarPeliculas();

            // Limpiar form
            setForm({
                titulo: "",
                genero: "",
                anio: "",
                descripcion: "",
                imagen: ""
            });

        } catch (error){
            console.error("Error al agregar película:", error);
        }

    };

    // Eliminar pelicula
    const eliminarPelicula = async (id) => {
        if (!confirm("¿Seguro que deseas eliminar esta pelicula?")) return;

        try {
            const res = await fetch(`http://localhost:3000/api/peliculas/${id}`, {
                method: "DELETE"
            });

            const data = await res.json();

            if (data.error){
                alert(data.error);
                return;
            }

            alert("Película eliminada correctamente!");

            cargarPeliculas();

        } catch (error){
            console.error("Error al eliminar la pelicula:", error);
        }
    };
    
    // Render
    return (
        <>
            <h1>Catalogo de Peliculas</h1>

            {/* Formulario */}
            <form className="formulario-cine" onSubmit={handleSubmit} >
                <input 
                    type="text" 
                    name="titulo"
                    placeholder="Titulo"
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
                <input
                    type="text"
                    name="imagen"
                    placeholder="URL de la imagen"
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

            {/* Listado */}
            {cargando ? (
                <p>Cargando peliculas...</p>
            ) : (
                <div className="grid-container">
                    {peliculas.map((peli) => (
                        <div key={peli.id}>
                            <h3>{peli.titulo}</h3>
                            <p>{peli.descripcion}</p>
                            <img src={peli.imagen} width="150" />

                            <button onClick={() => eliminarPelicula(peli.id)}>
                                Eliminar
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}

export default CineList;