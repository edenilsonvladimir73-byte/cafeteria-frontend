import { useState, useEffect } from 'react';
import { api } from '../api';

export default function FormularioVenta({ onSaved, onCancel }) {
  const [estudiantes, setEstudiantes] = useState([]);
  const [productos, setProductos] = useState([]);
  const [form, setForm] = useState({
    estudiante_id: '',
    producto_id: '',
    cantidad: 1,
    fecha: new Date().toISOString().split('T')[0]
  });
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    api.get('/estudiantes').then(res => setEstudiantes(res.data));
    api.get('/productos').then(res => setProductos(res.data));
  }, []);

  // Calcular total directamente (sin estado separado)
  const productoSeleccionado = productos.find(p => String(p.id) === String(form.producto_id));
  const precioUnitario = productoSeleccionado ? parseFloat(productoSeleccionado.precio) || 0 : 0;
  const cantidad = parseInt(form.cantidad) || 0;
  const total = (precioUnitario * cantidad).toFixed(2);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnviando(true);
    try {
      await api.post('/ventas', {
        estudiante_id: Number(form.estudiante_id),
        producto_id: Number(form.producto_id),
        cantidad: Number(form.cantidad),
        fecha: form.fecha
      });
      onSaved();
    } catch (err) {
      console.error('Error al crear venta:', err);
      alert('Error al crear la venta');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <h2>🆕 Nueva Venta</h2>
        <button className="btn-cerrar" onClick={onCancel}>✕</button>
      </div>
      <form onSubmit={handleSubmit} className="form-venta">
        <div className="form-group">
          <label> Estudiante</label>
          <select 
            value={form.estudiante_id} 
            onChange={(e) => setForm({ ...form, estudiante_id: e.target.value })} 
            required
          >
            <option value="">-- Seleccionar estudiante --</option>
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
            <option value="">-- Seleccionar producto --</option>
            {productos.map(p => (
              <option key={p.id} value={p.id}>{p.nombre} - ${Number(p.precio).toFixed(2)}</option>
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

        <div className="form-actions">
          <button type="button" className="btn-cancelar" onClick={onCancel}>Cancelar</button>
          <button type="submit" className="btn-guardar" disabled={enviando}>
            {enviando ? '⏳ Guardando...' : '💾 Guardar Venta'}
          </button>
        </div>
      </form>
    </div>
  );
} 