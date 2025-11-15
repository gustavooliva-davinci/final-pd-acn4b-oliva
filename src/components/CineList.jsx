function CineList({ peliculas }) {
  return (
    <div>
      <h2>Listado de Películas</h2>

      {peliculas.length === 0 && <p>No hay películas cargadas.</p>}

      {peliculas.map((peli) => (
        <div key={peli.id} className="movie-item">
          <div className="movie-title">{peli.titulo}</div>
          <div className="movie-meta">
            Año: {peli.anio} — Género: {peli.genero}
          </div>
        </div>
      ))}
    </div>
  );
}

export default CineList;