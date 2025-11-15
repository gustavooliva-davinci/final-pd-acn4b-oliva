import { useState } from "react";

function CineForm({ onAddPelicula }) {
  const [titulo, setTitulo] = useState("");
  const [anio, setAnio] = useState("");
  const [genero, setGenero] = useState("Acción");

  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevaPelicula = {
      id: Date.now(),
      titulo,
      anio,
      genero,
    };

    onAddPelicula(nuevaPelicula);

    setTitulo("");
    setAnio("");
    setGenero("Acción");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Título de la película"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        required
      />

      <input
        type="number"
        placeholder="Año"
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

      <button type="submit">Agregar Película</button>
    </form>
  );
}

export default CineForm;
