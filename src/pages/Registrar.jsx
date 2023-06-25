import { Link  } from "react-router-dom";
import { useState } from "react";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";
const Registrar = () => {
    const [nombre, setNombre] =useState('');
    const [email, setEmail] =useState('');
    const [password, setPassword] =useState('');
    const [repetirPassword, setRepetirPassword] =useState('');


    const [alerta, setAlerta] =useState({});

//Validccion
const handleSubmit = async e => {
  e.preventDefault();
  
  if ([nombre, email, password, repetirPassword].includes('')) {
    setAlerta({msg: 'Hay campos vacios', error: true})
    return;
  }

  if ( password !== repetirPassword) {
    setAlerta({msg: "Los passwords no son iguales", error: true})
    return;
  }

  if (password.length < 6) {
    setAlerta({msg: 'Debe tener al menos 6 caracteres', error: true})
  }

  setAlerta({});



  // Crear el user en la api

  try {
    await clienteAxios.post('/veterinarios/', {
      name: nombre,
      email: email, 
      password: password
    })

    setAlerta({msg: "Usuario registrado correctamente! Revisa tu email", error: false})
  } catch (error) {
    setAlerta({msg: error.response.data.msg , error: true})
  }
}

const {msg} = alerta;


  return (
    <>
    <div>
        <h1 className="text-indigo-600 font-black text-6xl">Crea tu Cuenta y Administra tus
          <span className="text-black"> Pacientes</span></h1>
    </div>
    <div className="mt-16 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
     {msg && <Alerta  alerta = { alerta } />}
        <form onSubmit={handleSubmit}>
          <div className="my-5">
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
              Nombre
            </label>
            <input
              type="text"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
              placeholder=" Tu Nombre"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-md" />
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

          <div className="my-5">
            <label className="uppercase text-gray-600 block text-md font-bold">
              Repetir Contraseña
            </label>
            <input
              type="password"
              value={repetirPassword}
              onChange={e => setRepetirPassword(e.target.value)}
              placeholder="Repite tu Contraseña"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" />
          </div>

          <input
            className="bg-indigo-700 w-full py-3 px-3 rounded-xl text-white upercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
            type="submit"
            value="Crear Cuenta" />
        </form>

        <nav className='mt-10 lg:flex lg:justify-between'>
          <Link to="/"
          className='block text-center my-5 text-gray-500'>¿Ya tienes una cuenta? Inicia Session</Link>
          <Link to="/restaurar-password"
          className='block text-center my-5 text-gray-500'>Olvidé mi contraseña</Link>
        </nav>
      </div> 
    </>  
)}

export default Registrar