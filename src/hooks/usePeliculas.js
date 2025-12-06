import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:3000/peliculas'; 

export const usePeliculas = () => {
    const [peliculas, setPeliculas] = useState([]);
    const [cargando, setCargando] = useState(true);

    // GET - todas las peliculas
    const obtenerPeliculas = async () => {
        try {
            const res = await fetch(API_URL); 
            const data = await res.json();
            
            if (!res.ok) {
                throw new Error(data.error || res.statusText);
            }
            
            setPeliculas(data);
            setCargando(false);
        } catch (error) { 
            console.error("Error al obtener películas:", error);
            setCargando(false);
        }
    };
    
    // GET - pelicula por ID
    const obtenerPeliculaPorId = async (id) => {
        try {
            const res = await fetch(`${API_URL}/${id}`); 
            const data = await res.json();
            
            if (!res.ok) {
                throw new Error(data.error || res.statusText);
            }
            
            return data;
        } catch (error) {
            console.error(`Error al obtener detalle de película con ID ${id}:`, error);
            return null;
        }
    };


    // POST - agregar pelicula
    const agregarPelicula = async (pelicula) => {
        try {
            const res = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(pelicula)
            });

            const data = await res.json();
            
            if (!res.ok) {
                 throw new Error(data.error || res.statusText);
            }

            setPeliculas(prev => [...prev, data]); 
            return { exito: true, mensaje: "Película agregada correctamente." };

        } catch (error) {
            console.error("Error al agregar película:", error);
            return { exito: false, mensaje: error.message || "Error al agregar la película." };
        }
    };
    
    // DELETE - Eliminar pelicula
    const eliminarPelicula = async (id) => {
        try {
            const res = await fetch(`${API_URL}/${id}`, { 
                method: "DELETE"
            });
            
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || res.statusText);
            }

            setPeliculas(prev => prev.filter(p => p.id !== id));
            return { exito: true, mensaje: "Película eliminada correctamente." };

        } catch (error) {
            console.error("Error al eliminar película:", error);
            return { exito: false, mensaje: error.message || "Error al eliminar la película." };
        }
    };
    
    // --- 5. PUT (Actualizar) ---
    const actualizarPelicula = async (id, peliculaActualizada) => {
        try {
            const res = await fetch(`${API_URL}/${id}`, { 
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(peliculaActualizada)
            });

            const data = await res.json();

            if (!res.ok) {
                 throw new Error(data.error || res.statusText);
            }
            
            // Reemplaza la pelicula en el estado local
            setPeliculas(prev => prev.map(p => 
                p.id === id ? data.pelicula : p 
            ));
            
            return { exito: true, mensaje: "Película actualizada correctamente." };

        } catch (error) { 
            console.error("Error al actualizar película:", error);
            return { exito: false, mensaje: error.message || "Error al actualizar la película." };
        }
    };


    useEffect(() => {
        obtenerPeliculas();
    }, []);

    return { 
        peliculas, 
        cargando, 
        obtenerPeliculas, 
        obtenerPeliculaPorId,
        agregarPelicula,
        eliminarPelicula,
        actualizarPelicula
    };
};