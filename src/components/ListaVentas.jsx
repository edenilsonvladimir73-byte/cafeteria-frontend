import { useState, useEffect } from 'react';
import { api } from '../api';
import EditarVenta from './EditarVenta';

// Función para formatear fecha
const formatearFecha = (fecha) => {
  if (!fecha) return '-';
  const d = new Date(fecha);
  return d.toLocaleDateString('es-SV', { day: '2-digit', month: '2-digit', year: 'numeric' });
};

export default function ListaVentas({ onAgregar }) {
  const [ventas, setVentas] = useState([]);
  const [editando, setEditando] = useState(null);
  const [cargando, setCargando] = useState(true);

  const cargarVentas = async () => {
    setCargando(true);
    try {
      const res = await api.get('/ventas');
      setVentas(res.data);
    } catch (err) {
      console.error('Error al cargar ventas:', err);
      alert('Error al cargar las ventas');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarVentas();
  }, []);

  const eliminar = async (id) => {
    if (window.confirm('¿Seguro que deseas eliminar esta venta?')) {
      try {
        await api.delete(`/ventas/${id}`);
        cargarVentas();
      } catch (err) {
        console.error('Error al eliminar:', err);
        alert('Error al eliminar la venta');
      }
    }
  };

  const handleImgError = (e) => {
    e.target.src = 'https://cdn-icons-png.flaticon.com/512/2722/2722527.png';
  };

  if (editando) {
    return <EditarVenta venta={editando} onCancel={() => setEditando(null)} onSaved={cargarVentas} />;
  }

  if (cargando) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Cargando ventas...</p>
      </div>
    );
  }

  return (
    <div className="lista-container">
      <div className="lista-header">
        <div>
          <h2>📋 Lista de Ventas</h2>
          <p className="subtitulo">{ventas.length} venta{ventas.length !== 1 ? 's' : ''} registrada{ventas.length !== 1 ? 's' : ''}</p>
        </div>
        <button className="btn-nueva" onClick={onAgregar}>
          <span>+</span> Nueva Venta
        </button>
      </div>

      {ventas.length === 0 ? (
        <div className="vacio">
          <p>️ No hay ventas registradas aún</p>
          <button className="btn-nueva" onClick={onAgregar}>Crear primera venta</button>
        </div>
      ) : (
        <div className="tabla-wrapper">
          <table className="tabla-ventas">
            <thead>
              <tr>
                <th>ID</th>
                <th>Estudiante</th>
                <th>Producto</th>
                <th>Imagen</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Total</th>
                <th>Fecha</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {ventas.map((v) => (
                <tr key={v.id}>
                  <td><span className="badge-id">#{v.id}</span></td>
                  <td className="nombre-estudiante">{v.estudiante}</td>
                  <td>{v.producto}</td>
                  <td>
                    <img 
                      src={v.producto_imagen} 
                      alt={v.producto} 
                      className="img-producto"
                      onError={handleImgError}
                    />
                  </td>
                  <td className="cantidad">{v.cantidad}</td>
                  <td>${Number(v.precio).toFixed(2)}</td>
                  <td className="total">${Number(v.total).toFixed(2)}</td>
                  <td className="fecha">{formatearFecha(v.fecha)}</td>
                  <td className="acciones">
                    <button className="btn-editar" onClick={() => setEditando(v)}>✏️ Editar</button>
                    <button className="btn-eliminar" onClick={() => eliminar(v.id)}>🗑️ Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}