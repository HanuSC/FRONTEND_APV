
import { AdminNav } from "../components/AdminNav"
import Alerta from "../components/Alerta"
import useAuth from "../hooks/useAuth"
import { useState } from "react"
const CambiarPassword = () => {


  const { actualizarPassword} = useAuth();
 const [alerta, setAlerta] = useState({})
const [password, setPassword] = useState({
  pwd_actual: '', pwd_nueva: ''
})

  const handlesubmit = async (e) => {
    e.preventDefault()
    if (Object.values(password).some( campo => campo === '')) {
      setAlerta({
        msg: 'Todos los campos son obligatorios', error: true
      })
      setTimeout(() => {
        setAlerta({})
      }, 1000);
      return;
    }

    if(password.pwd_nueva.length < 6) {
      setAlerta({
        msg: 'Debe tener mas de 6 caracteres', error: true
      })

      setTimeout(() => {
        setAlerta({})
      }, 1000);
      return;
    }
   
    const respuesta = await actualizarPassword(password)

    setAlerta(respuesta)
    setTimeout(() => {
      setAlerta({})
    }, 2000);
  }

  const { msg } = alerta
  return (
    <>
    <AdminNav />

    <h2 className="font-black text-3xl text-center mt-10">Cambia tu Password</h2>

    <p className="text-xl mt-5 mb-10 text-center">Modifica tu {''} <span  className="text-indigo-600 font-bold">Password aqui</span></p>

    <div className="flex justify-center">
      <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">

        {msg && <Alerta alerta={alerta}/> }
        <form onSubmit={handlesubmit}>
          <div className="my-3">
            <label className="uppercase font-bold text-gray-600">Password Actual</label>

            <input type="password" className="border bg-gray-50 w-full p-2 mt-5 rounded-lg" name='pwd_actual'
            onChange={ e => setPassword({
              ...password, [e.target.name] : e.target.value
            })}
            />

          </div>

          <div className="my-3">
            <label className="uppercase font-bold text-gray-600">Password Nueva</label>

            <input type="password" className="border bg-gray-50 w-full p-2 mt-5 rounded-lg" name='pwd_nueva'
            onChange={ e => setPassword({
              ...password, [e.target.name] : e.target.value
            })}
            />

          </div>
  

          <input type="submit" value="Actualizar Password" className="bg-indigo-700 px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5 hover:bg-indigo-800 hover:cursor-pointer"/>
        </form>

      </div>
    </div>


    </>
  )
}

export default CambiarPassword