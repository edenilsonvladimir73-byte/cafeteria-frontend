import { useState, useEffect } from 'react';
import { api } from '../api';

const formatearFecha = (fecha) => {
  if (!fecha) return '';
  const d = new Date(fecha);
  return d.toISOString().split('T')[0];
};

export default function EditarVenta({ venta, onCancel, onSaved }) {
  const [estudiantes, setEstudiantes] = useState([]);
  const [productos, setProductos] = useState([]);
  const [form, setForm] = useState({
    estudiante_id: venta.estudiante_id,
    producto_id: venta.producto_id,
    cantidad: venta.cantidad,
    fecha: formatearFecha(venta.fecha)
  });
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    api.get('/estudiantes').then(res => setEstudiantes(res.data));
    api.get('/productos').then(res => setProductos(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnviando(true);
    try {
      await api.put(`/ventas/${venta.id}`, form);
      onSaved();
    } catch (err) {
      console.error('Error al actualizar:', err);
      alert('Error al actualizar la venta');
    } finally {
      setEnviando(false);
    }
  };

  const productoSeleccionado = productos.find(p => p.id === Number(form.producto_id));
  const total = productoSeleccionado
    ? (Number(productoSeleccionado.precio) * Number(form.cantidad || 0)).toFixed(2)
    : '0.00';

  return (
    <div className="form-container">
      <div className="form-header">
        <h2>✏️ Editar Venta #{venta.id}</h2>
        <button className="btn-cerrar" onClick={onCancel}>✕</button>
      </div>
      <form onSubmit={handleSubmit} className="form-venta">
        <div className="form-group">
          <label>👤 Estudiante</label>
          <select
            value={form.estudiante_id}
            onChange={(e) => setForm({ ...form, estudiante_id: e.target.value })}
            required
          >
            {estudiantes.map(e => (
              <option key={e.id} value={e.id}>{e.nombre} ({e.grupo})</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>🍔 Producto</label>
          <select
            value={form.producto_id}
            onChange={(e) => setForm({ ...form, producto_id: e.target.value })}
            required
          >
            {productos.map(p => (
              <option key={p.id} value={p.id}>{p.nombre} - ${p.precio}</option>
            ))}
          </select>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>🔢 Cantidad</label>
            <input
              type="number"
              min="1"
              max="100"
              value={form.cantidad}
              onChange={(e) => setForm({ ...form, cantidad: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>📅 Fecha</label>
            <input
              type="date"
              value={form.fecha}
              onChange={(e) => setForm({ ...form, fecha: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="total-preview">
          <span>Total actualizado</span>
          <strong>${total}</strong>
        </div>

        <div className="form-actions">
          <button type="button" className="btn-cancelar" onClick={onCancel}>Cancelar</button>
          <button type="submit" className="btn-actualizar" disabled={enviando}>
            {enviando ? '⏳ Actualizando...' : '✅ Actualizar'}
          </button>
        </div>
      </form>
    </div>
  );
}