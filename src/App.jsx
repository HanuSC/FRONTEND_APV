import { BrowserRouter, Routes, Route } from 'react-router-dom';
//layouts
import AuthLayout from './layout/AuthLayout';
import RutaPrivada from './layout/RutaPrivada';

//Paginas por AuthLayout
import Login from './pages/Login';
import Registrar from './pages/Registrar';
import ConfirmarCuenta from './pages/ConfirmarCuenta';
import RestaurarPassword from './pages/RestaurarPassword';
import NuevoPassword from './pages/NuevoPassword';

//Paginas por RutaPrivada
import AdministrarPacientes from './pages/AdministrarPacientes';
//Hook para la sesion
import { AuthProvider } from './context/AuthProvider';
import { PacientesProvider } from './context/PacientesProvider';
import CambiarPassword from './pages/CambiarPassword';
import EditarPerfil from './pages/EditarPerfil';
function App() {
  //Agregas el routing en la app principal

  return (

    <BrowserRouter>
      <AuthProvider>
        <PacientesProvider>
        <Routes>
          <Route path='/' element={<AuthLayout />}>
            <Route index element={<Login />} />
            <Route path="registrar" element={<Registrar />} />
            <Route path="restaurar-password" element={<RestaurarPassword />} />
            <Route path="restaurar-password/:token" element={<NuevoPassword />} />
            <Route path="confirmar/:id" element={<ConfirmarCuenta />} />
          </Route>
          
          {/* Privadas */}
          <Route path='/admin' element={<RutaPrivada />}>
            <Route index element={<AdministrarPacientes />} />
            <Route path='perfil' element={<EditarPerfil />} />
            <Route  path="cambiar-password" element={<CambiarPassword />} />
            
          </Route>
        </Routes>
        </PacientesProvider>
      </AuthProvider>
    </BrowserRouter>

  )
}

export default App
