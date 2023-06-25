/* eslint-disable no-unused-vars */
import { useParams, Link  } from "react-router-dom";
import { useEffect, useState  } from "react";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const ConfirmarCuenta = () => {

  const params = useParams();
  const { id } = params;

  useEffect(() => {
     
      const confirmarCuenta = async () => {
          try {
            const url = `/veterinarios/confirmar/${id}`;
       
            const { data } = await clienteAxios(url);
          

            setCuentaConfirmada(true);
          
            setAlerta({msg: data.msg })
          } catch (error) {
            setAlerta({ msg: error.response.data.msg, error: true})
          }

          setCargando(false);
      }
      confirmarCuenta();

  }, [])

  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [alerta, setAlerta] = useState({});
    return (
      <>
        <div>
          <h1 className="text-indigo-600 font-black text-6xl">Confirma tu <span className="text-black">Cuenta</span></h1>
        </div>
        <div className="mt-16 md:mt-5 shadow-lg px-5 py-5 rounded-xl bg-white">
          <Alerta alerta={alerta}/>
          { cuentaConfirmada && (
              <Link to="/"
              className='block text-center my-5 text-gray-500'>Iniciar Sesion</Link>
          )}
        </div> 
      </>  
  )}
  
  export default ConfirmarCuenta