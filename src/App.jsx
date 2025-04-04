import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useState } from 'react';
import ListarPolizas from './components/ListarPolizas';
import NuevaPoliza from './components/NuevaPoliza';
import EditarPoliza from './components/EditarPoliza';
import Login from './components/Login';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta de Login */}
        <Route path="/login" element={<Login setToken={setToken} />} />
        
        {/* Rutas protegidas */}
        {token ? (
          <>
            <Route path="/" element={<Navigate to="/listarpolizas" />} />
            <Route path="/listarpolizas" element={<ListarPolizas />} />
            <Route path="/nuevapoliza" element={<NuevaPoliza />} />
            <Route path="/editarpoliza/:id" element={<EditarPoliza />} />
          </>
        ) : (
          // Redirige al login si no está autenticado
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

