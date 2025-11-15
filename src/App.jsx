import { useState } from "react";
import "./styles.css";

import CineForm from "./components/CineForm";
import CineList from "./components/CineList";

import peliculasIniciales from "./data/peliculas.json";

function App() {

  // Cargar pelicula
  const [peliculas, setPeliculas] = useState(peliculasIniciales);

  // Agregar pelicula
  const agregarPelicula = (nuevaPeli) => {
    setPeliculas([...peliculas, nuevaPeli]);
  };

  // Devolver listado de peliculas
  return (
    <div className="container">
      <h1>Gestor de Cine</h1>

      <CineForm onAddPelicula={agregarPelicula} />

      <hr/>

      <CineList peliculas={peliculas} />
    </div>
  );

}

export default App;
