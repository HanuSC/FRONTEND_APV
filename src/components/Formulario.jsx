import { useState, useEffect } from "react"
import Alerta from "./Alerta"
import usePacientes from "../hooks/usePacientes"
const Formulario = () => {

  const [nombre, setNombre] = useState('')
  const [propietario, setPropietario] = useState('')
  const [email, setEmail] = useState('')
  const [fecha, setFecha] = useState('')
  const [sintomas, setSintomas] = useState('')
  const [id, setId] = useState('')
  const [alerta, setAlerta] = useState({})

  const { pacientes } = usePacientes()
  const { guardarPaciente, paciente } = usePacientes()

  useEffect(() => {
    
    if(paciente?.nombre) {
      setNombre(paciente.nombre)
      setEmail(paciente.email)
      setFecha(paciente.fecha)
      setSintomas(paciente.sintomas)
      setPropietario(paciente.propietario)
      setId(paciente._id)
    }


  }, [paciente]);




  const handleSubmit = async e => {

    e.preventDefault();

    if ([email, propietario, nombre, fecha, sintomas].includes('')) {
      setAlerta({
        msg: 'Hay campos vacios', error: true
      })

      setTimeout(() => {
        setAlerta({})
      }, 2000);
      
      return;
    }
    
    guardarPaciente({ nombre, propietario, email, fecha, sintomas, id })


    setAlerta({ msg: 'Guardado correctamente'})

    setTimeout(() => {
      setAlerta({})
    }, 2000);

    setEmail('');
    setNombre('');
    setPropietario('');
    setFecha('');
    setSintomas('');
    setId('');
  }

  const { msg } = alerta

  return (
    <>
      <h2 className="font-black text-xl text-center">
        Administrador de Pacientes
      </h2>

      <p className="text-xl mt-5 mb-10 text-center">
        Agrega tus Pacientes y{''}
        <span className=" text-indigo-600 font-bold"> Administralos</span>
      </p>
      
      <form onSubmit={handleSubmit} className="bg-white py-10 px-5 mb-10 lg:mb-0 shadow-md rounded-md">
        <div className="mb-5">
          <label htmlFor="mascota"
            className="text-gray-700 uppercase font-bold"
          >Nombre Mascota</label>

          <input value={nombre} onChange={e => setNombre(e.target.value)} type="text" placeholder="Nombre de las Mascota" id="mascota" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" />
        </div>
        <div className="mb-5">
          <label htmlFor="propietario"
            className="text-gray-700 uppercase font-bold"
          >Nombre Propietario</label>
          <input type="text" value={propietario} onChange={e => setPropietario(e.target.value)} placeholder="Nombre del propietario" id="propietario" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" />
        </div>
        <div className="mb-5">
          <label htmlFor="email_propietario"
            className="text-gray-700 uppercase font-bold"
          >Email Propietario</label>
          <input type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email del Propietario" id="email_propietario" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" />
        </div>
        <div className="mb-5">
          <label htmlFor="fecha"
            className="text-gray-700 uppercase font-bold"
          >Fecha de Alta</label>
          <input value={fecha} onChange={e => setFecha(e.target.value)} type="date" id="fecha" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" />
        </div>
        <div className="mb-5">
          <label htmlFor="sintomas"
            className="text-gray-700 uppercase font-bold"
          >Sintomas</label>
          <textarea value={sintomas} onChange={e => setSintomas(e.target.value)} placeholder="Describe los sintomas..." id="sintomas" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" />
        </div>

        <input type="submit" className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
         value= { id ? 'Guardar Cambios' : 'Agregar Paciente' } 
         />
      </form>
      {msg && <Alerta alerta={alerta} />}
    </>
  )
}

export default Formulario