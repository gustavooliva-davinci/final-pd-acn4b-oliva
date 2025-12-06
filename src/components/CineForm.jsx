import { useState } from "react";

function CineForm({ onAddPelicula }) {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [anio, setAnio] = useState("");
  const [genero, setGenero] = useState("Acción");
  const [imagen, setImagen] = useState("/imagenes/default.jpg");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const peliculaParaEnviar = {
      titulo,
      descripcion,
      anio: parseInt(anio),
      genero,
      imagen,
    };

    try {
      // POST al Backend
      const response = await fetch('http://localhost:3000/peliculas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(peliculaParaEnviar),
      });

      if (!response.ok) {
        // Manejo de errores
        const errorData = await response.json();
        throw new Error(`Error al crear película: ${errorData.error}`);
      }

      // Obtener pelicula creada
      const peliculaCreada = await response.json();
      onAddPelicula(peliculaCreada); 

      // Limpiar el formulario
      setTitulo("");
      setDescripcion("");
      setAnio("");
      setGenero("Acción");
      setImagen("/imagenes/default.jpg");
      
    } catch (error) {
      console.error("Error en la petición al Backend:", error.message);
      alert("Hubo un error al agregar la pelicula. Revisa la consola del backend y del navegador.");
    }
  };

  return (
    <form className="formulario-cine" onSubmit={handleSubmit}>
      <h2>Agregar Nueva Película</h2>
      
      <input
        type="text"
        placeholder="Título de la película"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        required
      />

      <textarea
        placeholder="Descripción de la película (Opcional)"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
      />

      <input
        type="number"
        placeholder="Año (ej: 2024)"
        value={anio}
        onChange={(e) => setAnio(e.target.value)}
        required
      />

      <select value={genero} onChange={(e) => setGenero(e.target.value)}>
        <option>Acción</option>
        <option>Comedia</option>
        <option>Ciencia ficción</option>
        <option>Drama</option>
        <option>Terror</option>
      </select>
      
      {/* Input de Imagen Simple */}
      <input
        type="text"
        placeholder="URL o ruta de la imagen (ej: /imagenes/mi_peli.jpg)"
        value={imagen}
        onChange={(e) => setImagen(e.target.value)}
        required
      />

      <button type="submit">Agregar Película</button>
    </form>
  );
}

export default CineForm;
