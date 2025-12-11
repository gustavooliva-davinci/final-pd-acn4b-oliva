import { useState, useEffect, useCallback } from 'react';

const API_URL = 'http://localhost:3000/peliculas'; 

export const usePeliculas = () => {
    const [peliculas, setPeliculas] = useState([]);
    const [cargando, setCargando] = useState(true);

    // GET - todas las peliculas
    const obtenerPeliculas = useCallback( async () => {
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
    }, []);
    
    // GET - pelicula por ID
    const obtenerPeliculaPorId = useCallback( async (id) => {
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
    }, []);


    // POST - agregar pelicula
    const agregarPelicula = useCallback( async (pelicula) => {
        try {
            const res = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(pelicula)
            });

            const data = await res.json();
            
            if (!res.ok) {
                return { 
                    exito: false, 
                    mensaje: data.error || 'Error en la creación.',
                    errors: data.errors || []
                };
            }

            setPeliculas(prev => [...prev, data]); 
            return { exito: true, mensaje: "Película agregada correctamente." };

        } catch (error) {
            console.error("Error al agregar película:", error);
            return { exito: false, mensaje: "Fallo la conexión o el servidor.", errors: [] };
        }
    }, []);
    
    // DELETE - Eliminar pelicula
    const eliminarPelicula = useCallback( async (id) => {
        try {
            const res = await fetch(`${API_URL}/${id}`, { 
                method: "DELETE"
            });
            
            if (!res.ok) {
                const data = await res.json();
                return { 
                    exito: false, 
                    mensaje: data.error || 'Error al eliminar la película.',
                    errors: data.errors || [] 
                };
            }

            setPeliculas(prev => prev.filter(p => p.id !== id));
            return { exito: true, mensaje: "Película eliminada correctamente." };

        } catch (error) {
            console.error("Error al eliminar película:", error);
            return { exito: false, mensaje: "Fallo de conexión con el servidor.", errors: [] };
        }
    }, []);
    
    // PUT (Actualizar) ---
    const actualizarPelicula = useCallback( async (id, peliculaActualizada) => {
        try {
            const res = await fetch(`${API_URL}/${id}`, { 
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(peliculaActualizada)
            });

            if (!res.ok) {
                const errorData = await res.json();
                // lanza error para capturarlo
                return {
                    exito: false,
                    mensaje: errorData.error || 'Error en la actualización.',
                    errors: errorData.errors || [] 
                };
            }

            const data = await res.json();
            const peliculaResultante = data.pelicula || data;

            // Reemplaza la pelicula en el estado local
            setPeliculas(prevPeliculas => 
                prevPeliculas.map(p => p.id === id ? peliculaResultante : p)
            );
            
            return { 
                exito: true,
                mensaje: `Película ${peliculaResultante.titulo} actualizada correctamente.`,
                pelicula: peliculaResultante
             };

        } catch (error) { 
            console.error("Fallo de red o JSON inválido en la actualización:", error);
            return { 
                exito: false, 
                mensaje: "Fallo la conexión con la API o el formato de respuesta del servidor es incorrecto."
            };
        }
    }, [setPeliculas]);


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