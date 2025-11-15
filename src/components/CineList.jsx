import { useEffect, useState } from "react";
import peliculasData from "../peliculas.json";
import CineItem from "./CineItem";

function CineList() {
  
    const [peliculas, setPeliculas] = useState([]);

    // Cargar las peliculas al iniciar
    useEffect(() => {
        setPeliculas(peliculasData);
    }, []);

    return (
        <div className="cine-list">
            {peliculas.map((peli) => (
                <CineItem key={peli.id} pelicula={peli}/>
            ))}
        </div> 
    );
}

export default CineList;