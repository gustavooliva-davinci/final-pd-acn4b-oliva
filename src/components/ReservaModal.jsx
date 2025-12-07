import { useState } from 'react';
import ReactDom from 'react-dom';
import '../../src/styles/modal.css';

const PRECIO_BASE = 16000;
const HORARIOS = ["18:00", "20:30", "22:45"];

function ReservaModal({ pelicula, isOpen, onClose }) {
  const [cantidad, setCantidad] = useState(1);
  const [horario, setHorario] = useState(HORARIOS[0]);

  // Calculo de precio dinámico
  const precioTotal = cantidad * PRECIO_BASE;

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulacion de Reserva 
    alert(`
      ✅ ¡Reserva Exitosa!
      Película: ${pelicula.titulo}
      Horario: ${horario}
      Entradas: ${cantidad}
      Total a pagar: $${precioTotal}
    `);
    
    // limpiar y cerrar
    setCantidad(1);
    setHorario(HORARIOS[0]);
    onClose();
  };

  return ReactDom.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        
        <h2 className="modal-title">Reservar: {pelicula.titulo}</h2>
        <p className="modal-precio-base">Precio por entrada: **${PRECIO_BASE}**</p>
        
        <form onSubmit={handleSubmit} className="modal-form">
          
          {/* SELECCIÓN DE HORARIO */}
          <div className="form-group">
            <label htmlFor="horario">Selecciona Horario:</label>
            <select 
              id="horario" 
              value={horario} 
              onChange={(e) => setHorario(e.target.value)}
              required
            >
              {HORARIOS.map((h) => (
                <option key={h} value={h}>{h} hs</option>
              ))}
            </select>
          </div>

          {/* SELECCIÓN DE CANTIDAD */}
          <div className="form-group">
            <label htmlFor="cantidad">Cantidad de Entradas (Max 10):</label>
            <input
              id="cantidad"
              type="number"
              min="1"
              max="10"
              value={cantidad}
              onChange={(e) => setCantidad(parseInt(e.target.value) || 1)}
              required
            />
          </div>
          
          <div className="modal-total">
            Total a Pagar: <span className="total-amount">${precioTotal}</span>
          </div>

          <div className="modal-actions">
            <button type="submit" className="neon-submit-btn">
              Confirmar Reserva
            </button>
            <button type="button" onClick={onClose} className="neon-close-btn">
              Cancelar
            </button>
          </div>
        </form>
        
      </div>
    </div>,
    document.getElementById('modal-root') 
  );
}

export default ReservaModal;