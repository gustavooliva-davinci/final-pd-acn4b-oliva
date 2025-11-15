function CineItem({ pelicula }) {
  return (
    <div className="cine-item">
      <img src={pelicula.imagen} alt={pelicula.titulo} />
      <h3>{pelicula.titulo}</h3>
      <p>{pelicula.descripcion}</p>
      <p><strong>Género:</strong> {pelicula.genero}</p>
      <p><strong>Año:</strong> {pelicula.anio}</p>
    </div>
  );
}

export default CineItem;