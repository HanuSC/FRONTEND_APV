import { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";
const RestaurarPassword = () => {

const [email, setEmail] = useState("");
const [alerta, setAlerta] =useState({});

const handleSubmit = async (e) => {
  e.preventDefault();
  if (email === '' || email.length < 6) {
     setAlerta({msg: "Ingrese el correo para enviar instrucciones", error: true});
     return
  }

  try {
   const {data } = await clienteAxios.post('/veterinarios/forgot-password', { email })

    setAlerta({msg: data.msg, error: false})
  } catch (error) {
    setAlerta({msg: error.response.data.msg , error: true})
  }
}

const {msg} = alerta;

    return (
      <>
       <div>
        <h1 className="text-indigo-600 font-black text-6xl">Recupera tu
          <span className="text-black"> Contraseña </span></h1>
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
              value= {email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Email de registro"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" />
          </div>
          <input
            className="bg-indigo-700 w-full py-3 px-3 rounded-xl text-white upercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
            type="submit"
            value="Enviar instrucciones"
             />

        </form>
        
        <nav className='mt-10 lg:flex lg:justify-between'>
          <Link to="/registrar"
          className='block text-center my-5 text-gray-500'>¿No tienes una cuenta? Regístrate</Link>
          <Link to="/"
          className='block text-center my-5 text-gray-500'> ¿Ya tienes una cuenta? Inicia Sesion </Link>
        </nav>
      </div>
      </>  
  )}
  
  export default RestaurarPassword;