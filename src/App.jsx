//import { useState } from "react";
import "./styles.css";
import "./styles/cine.css";

//import CineForm from "./components/CineForm";
import CineList from "./components/CineList";
import "./App.css";

//import peliculasIniciales from "./data/peliculas.json";

function App() {

  return (
    <>
      <h1>Cartelera de Cine Independiente</h1>

      <CineList />
    </>
  );

}

export default App;
