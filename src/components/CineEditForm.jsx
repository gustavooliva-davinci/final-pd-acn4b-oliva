import React, { useEffect, useState } from 'react';

function CineEditForm({ 
    peliculaEditar, 
    actualizarPelicula, 
    setPeliculaEditar, 
    setMensajeExito, 
    setMensajeError 
}) {

    const [formEdicion, setFormEdicion] = useState(peliculaEditar || {});

    useEffect(() => {
        // validacion que no sea null antes de actualizar el estado local
        if (peliculaEditar) {
            setFormEdicion(peliculaEditar);
        }
    }, [peliculaEditar]);

    const handleChangeEdicion = (e) => {
        const { name, value } = e.target;
        setFormEdicion(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // 2. Guardar Edición (PUT)
    const guardarEdicion = async () => {
        if (!formEdicion.titulo?.trim() || !formEdicion.imagen?.trim()){
             setMensajeError("El título y la URL de imagen son obligatorios para guardar la edición.");
             setTimeout(() => setMensajeError(null), 4000); 
             return;
        }
        setMensajeError(null);

        const datosAEnviar = {
            titulo: formEdicion.titulo,
            descripcion: formEdicion.descripcion,
            imagen: formEdicion.imagen,
            genero: formEdicion.genero,
            anio: formEdicion.anio, 
        };

        const resultado = await actualizarPelicula(formEdicion.id, datosAEnviar);
        
        if (resultado.exito) {
            setMensajeExito("Película actualizada correctamente.");
            setTimeout(() => setMensajeExito(null), 4000); 
            setPeliculaEditar(null); 
        } else {
            setMensajeError(resultado.mensaje);
            setTimeout(() => setMensajeError(null), 4000); 
        }
    };

    const cancelarEdicion = () => {
        setPeliculaEditar(null); // Cierra el formulario 
    };
    
    if (!peliculaEditar) {
        return null;
    }

    return (
        <div className="edit-form" key={formEdicion.id}>
            <h3>Editar película ID: {formEdicion.id}</h3>

            <input
                type="text"
                name="titulo"
                placeholder="Título"
                value={formEdicion.titulo || ''}
                onChange={handleChangeEdicion}
            />
            <input
                type="text"
                name="genero"
                placeholder="Género"
                value={formEdicion.genero || ''}
                onChange={handleChangeEdicion}
            />
            <input
                type="text"
                name="anio"
                placeholder="Año"
                value={formEdicion.anio || ''} 
                onChange={handleChangeEdicion}
            />
            <input
                type="text"
                name="imagen"
                placeholder="URL de Imagen"
                value={formEdicion.imagen || ''}
                onChange={handleChangeEdicion}
            />
            <textarea
                name="descripcion"
                placeholder="Descripción"
                value={formEdicion.descripcion || ''}
                onChange={handleChangeEdicion}
            />

            <button onClick={guardarEdicion}>Guardar Cambios</button>
            <button onClick={cancelarEdicion}>Cancelar</button>
        </div>
    );
}

export default CineEditForm;