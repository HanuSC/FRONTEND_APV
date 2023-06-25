import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Alerta from '../components/Alerta';
import clienteAxios from '../config/axios';
import useAuth from '../hooks/useAuth';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alerta, setAlerta] = useState('')
  const { setAuth } = useAuth();
  const navigate = useNavigate();

 const handleSubmit = async e => {

    e.preventDefault();

    if ([email, password].includes('')) {
      setAlerta({
        msg: 'Hay campos vacios', error: true
      })
      return;
    }

    try {
      const { data } = await clienteAxios.post('/veterinarios/login', {
        email, password
      })
      localStorage.setItem('token', data.token);
      setAuth(data)
      navigate('/admin')

    } catch (error) {
      setAlerta({ msg: error.response.data.msg, error: true })
    }

  }

  const { msg } = alerta
  return (
    <>

      <div>
        <h1 className="text-indigo-600 font-black text-6xl">Inicia sesion y Administra tus
          <span className="text-black"> Pacientes</span></h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {msg && <Alerta alerta={alerta} />}
        <form onSubmit={handleSubmit}>
          <div className="my-3">
            <label className="uppercase text-gray-600 block text-md font-bold">
              Email
            </label>
            <input
              type="text"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Email de registro"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" />
          </div>

          <div className="my-5">
            <label className="uppercase text-gray-600 block text-md font-bold">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Contraseña"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" />
          </div>

          <input
            className="bg-indigo-700 w-full py-3 px-3 rounded-xl text-white upercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
            type="submit"
            value="Iniciar sesion" />
        </form>

        <nav className='mt-10 lg:flex lg:justify-between'>
          <Link to="/registrar"
            className='block text-center my-5 text-gray-500'>¿No tienes una cuenta? Regístrate</Link>
          <Link to="/restaurar-password"
            className='block text-center my-5 text-gray-500'>Olvidé mi contraseña</Link>
        </nav>
      </div>

    </>
  )
}

export default Login