import { useState, useEffect, useCallback } from 'react';

const API_URL = "http://localhost:3000/api/peliculas";

const usePeliculas = () => {
    const [peliculas, setPeliculas] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    // Obtener todas las peliculas
    const cargarPeliculas = useCallback(async () => {
        setCargando(true);
        setError(null);

        try {
            const res = await fetch(API_URL);

            if (!res.ok) {
                throw new Error("Fallo la carga de lista de peliculas.");
            }

            const data = await res.json();
            setPeliculas(data);
        } catch (err) {
            setError(err.message);
            console.error("Error al carga peliculas:", err);
        } finally {
            setCargando(false);
        }
    }, []);

    useEffect(() => {
        cargarPeliculas();
    }, [cargarPeliculas]);

    // Obtener pelicula por ID
    const obtenerPeliculaPorId = useCallback(async (id) => {
        try {
            const res = await fetch(`${API_URL}/${id}`);
            const data = await res.json();

            if (data.error){
                return null;
            }

            return data;
        } catch (err){
            console.error("Error al obtener la pelicula por ID:", err);
            return null;
        }
    },[]);

    // Agregar una pelicula
    const agregarPelicula = async (nuevaPelicula) => {
        try {
            const res = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(nuevaPelicula)
            });

            const data = await res.json();

            if (data.error) {
                throw new Error(data.error);
            }

            // Actualiza el estado localmente
            setPeliculas(prev => [...prev, data]); 
            return { exito: true, mensaje: "Pelicula agregada correctamente." };

        } catch (err) {
            console.error("Error al agregar pelicula:", err);
            return { exito: false, mensaje: err.message || "Error al agregar la pelicula." };
        }
    };
    
    // Eliminar una película
    const eliminarPelicula = async (id) => {
        try {
            const res = await fetch(`${API_URL}/${id}`, {
                method: "DELETE"
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Fallo al realizar la eliminacion");
            }

            setPeliculas(prev => prev.filter(p => p.id !== id));
            return { exito: true, mensaje: "Pelicula eliminada correctamente." };

        } catch (err) {
            console.error("Error al eliminar la película:", err);
            return { exito: false, mensaje: err.message || "Error al eliminar la pelicula." };
        }
    };

    // Actualizar una pelicula
    const actualizarPelicula = async (id, datosActualizados) => {
        try {
            const res = await fetch(`${API_URL}/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(datosActualizados)
            });
            
            const data = await res.json();

            if (data.error) {
                throw new Error(data.error);
            }

            // Actualizamos la lista
            setPeliculas(prev => 
                prev.map(p => (p.id === id ? { ...p, ...datosActualizados, id: id } : p))
            );
            return { exito: true, mensaje: "Pelicula actualizada correctamente." };

        } catch (err) {
            console.error("Error al actualizar la pelicula:", err);
            return { exito: false, mensaje: err.message || "Error al actualizar la pelicula." };
        }
    };

    return {
        peliculas,
        cargando,
        error,
        cargarPeliculas,
        obtenerPeliculaPorId,
        agregarPelicula,
        eliminarPelicula,
        actualizarPelicula,
    };
};

export default usePeliculas;