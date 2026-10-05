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
          {/* 🎨 SVG - Taza de café animada con vapor */}
          <svg className="logo" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            {/* Vapor animado */}
            <g className="steam-group">
              <path className="steam steam-1"
                d="M 35 28 Q 32 20 35 12 Q 38 4 35 -2"
                stroke="#c8956d" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.6"/>
              <path className="steam steam-2"
                d="M 45 28 Q 48 18 45 10 Q 42 2 45 -4"
                stroke="#d4a574" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.7"/>
              <path className="steam steam-3"
                d="M 55 28 Q 52 20 55 12 Q 58 4 55 -2"
                stroke="#c8956d" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.6"/>
            </g>

            {/* Plato */}
            <ellipse cx="45" cy="88" rx="38" ry="5" fill="#d4c4a8" opacity="0.6"/>
            <ellipse cx="45" cy="86" rx="36" ry="4" fill="#e8dcc4"/>

            {/* Taza - cuerpo */}
            <path d="M 15 35 L 15 70 Q 15 82 27 82 L 63 82 Q 75 82 75 70 L 75 35 Z"
              fill="#3d2817" stroke="#2a1810" strokeWidth="1.5"/>

            {/* Brillo en la taza */}
            <path d="M 20 40 L 20 65 Q 20 75 28 75"
              fill="none" stroke="#5c3d24" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>

            {/* Café dentro */}
            <ellipse cx="45" cy="38" rx="28" ry="5" fill="#5c3d24"/>
            <ellipse cx="45" cy="37" rx="26" ry="4" fill="#8b5a3c"/>

            {/* Brillo del café */}
            <ellipse cx="38" cy="36" rx="6" ry="1.5" fill="#c8956d" opacity="0.7"/>

            {/* Asa */}
            <path d="M 75 45 Q 90 45 90 58 Q 90 70 75 70"
              fill="none" stroke="#3d2817" strokeWidth="5" strokeLinecap="round"/>
            <path d="M 75 48 Q 87 48 87 58 Q 87 67 75 67"
              fill="none" stroke="#5c3d24" strokeWidth="2" strokeLinecap="round"/>

            {/* Detalle decorativo */}
            <circle cx="45" cy="58" r="3" fill="#c8956d" opacity="0.4"/>
          </svg>

          <div className="header-text">
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