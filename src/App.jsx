import { BrowserRouter, Routes, Route } from "react-router-dom";
import CineList from "./components/CineList";
import CineDetail from "./components/CineDetail";
import CineEditForm from "./components/CineEditForm";
import "./styles/styles.css";
import "./styles/cine.css";

function App() {
  return (
    <BrowserRouter>
      <h1 className="title"> Proyecto de Cine Independiente</h1>

      <Routes>
        <Route path="/" element={<CineList />} />
        <Route path="/cine/:id" element={<CineDetail />} />
        <Route path="/editar/:id" element={<CineEditForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;