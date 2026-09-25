import { useState } from 'react';
import ListaVentas from './components/ListaVentas';
import FormularioVenta from './components/FormularioVenta';
import './App.css';

function App() {
  const [vista, setVista] = useState('lista');

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <span className="logo">☕</span>
          <div>
            <h1>Cafetería Escolar</h1>
            <p className="subtitulo-header">Sistema de gestión de ventas</p>
          </div>
        </div>
      </header>
      <main className="main">
        {vista === 'lista' && <ListaVentas onAgregar={() => setVista('formulario')} />}
        {vista === 'formulario' && (
          <FormularioVenta
            onSaved={() => setVista('lista')}
            onCancel={() => setVista('lista')}
          />
        )}
      </main>
      <footer className="footer">
        <p>© 2026 Cafetería Escolar - Proyecto Full Stack</p>
      </footer>
    </div>
  );
}

export default App;