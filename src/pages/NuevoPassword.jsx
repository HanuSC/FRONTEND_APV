import Alerta from "../components/Alerta"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import clienteAxios from "../config/axios";
import { Link } from "react-router-dom";


const NuevoPassword = () => {

  const [password, setPassword] = useState('');
  const [repetirPassword, setRepetirPassword] = useState('');
  const [alerta, setAlerta] = useState({});
  const [tokenValido, setTokenValido] = useState(false);
  const [passwordModificado, setPasswordModificado] = useState(false)

  const params = useParams()
  const { token } = params

  useEffect(() => {

    const comprobarToken = async () => {
      try {
        await clienteAxios(`/veterinarios/forgot-password/${token}`);
        setAlerta({ msg: 'Ingresa tu nuevo password', error: false });

        setTokenValido(true)
       
      } catch (error) {
        setAlerta({ msg: 'Hubo un problema con el enlace', error: true })
      }


    }

    comprobarToken()

  }, []);

  const handleSubmit = async e => {
    e.preventDefault();

    if ([password, repetirPassword].includes('')) {
      setAlerta({ msg: 'Hay campos vacios', error: true })
      return;
    }

    if (password !== repetirPassword) {
      setAlerta({ msg: "Los passwords no son iguales", error: true })
      return;
    }

    if (password.length < 6) {
      setAlerta({ msg: 'Debe tener al menos 6 caracteres', error: true })
    }

    try {
      //mandar el password
      const url = `/veterinarios/forgot-password/${token}`;
      const { data } = await clienteAxios.post(url, {
        password
      })
      setAlerta({ msg: data.msg })
      setPasswordModificado(true)
    } catch (error) {
      setAlerta({ msg: error.response.data.msg })
    }
  }

  const { msg } = alerta;
  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">Reestablece tu
          <span className="text-black"> Contraseña</span></h1>
      </div>
      <div className="mt-16 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {msg && <Alerta alerta={alerta} />}

        {tokenValido &&

          (<>

            <form onSubmit={handleSubmit}>
              <div className="my-5">
                <label className="uppercase text-gray-600 block text-md font-bold">
                  Nueva Contraseña
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Nueva Contraseña"
                  className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" />
              </div>

              <div className="my-5">
                <label className="uppercase text-gray-600 block text-md font-bold">
                  Repetir nueva Contraseña
                </label>
                <input
                  type="password"
                  value={repetirPassword}
                  onChange={e => setRepetirPassword(e.target.value)}
                  placeholder="Repite tu nueva Contraseña"
                  className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" />
              </div>

              <input
                className="bg-indigo-700 w-full py-3 px-3 rounded-xl text-white upercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
                type="submit"
                value="Cambiar Contraseña" />
            </form>

           {passwordModificado && <Link to="/" className='block text-center my-5 text-gray-500'>Inicia Sesion </Link>}

          </>
          )



        }
      </div>
    </>
  )
}

export default NuevoPassword