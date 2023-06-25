import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/axios";
import useAuth from "../hooks/useAuth";

const PacientesContext = createContext();

// eslint-disable-next-line react/prop-types
export const PacientesProvider = ({ children }) => {

    const [pacientes, setPacientes] = useState([]);
    const { auth } = useAuth();
    const [paciente, setPaciente] = useState({})
    useEffect(() => {
        const obtenerPacientes = async () => {

            try {

                const token = localStorage.getItem('token')
                if (!token) return

                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                }
                const { data } = await clienteAxios('/pacientes', config)

                setPacientes(data)
            } catch (error) {
                console.log(error.response.data.msg)
            }
        }
        obtenerPacientes()
    }, [auth])
   
    const guardarPaciente = async (paciente) => {

        const token = localStorage.getItem('token')
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }

        if (paciente.id) {
            try {
                const { data } = await clienteAxios.put(`/pacientes/${paciente.id}`, paciente, config)

                const pacientesActualizado = pacientes.map(pacienteState => pacienteState._id === data._id ? data : pacienteState)

                setPacientes(pacientesActualizado)

            } catch (error) {
                console.log(error)
            }
        } else {
            try {

                const { data } = await clienteAxios.post('/pacientes', paciente, config)
                const { createdAt, updatedAt, __v, ...pacienteAlmacenado } = data
                setPacientes([pacienteAlmacenado, ...pacientes])

            } catch (error) {
                console.log(error.response.data.msg)
            }
        }

        return


        // eslint-disable-next-line no-unreachable

    }
    //!!!!!! ACTUALIZAR
    const editarPaciente = (paciente) => {
        setPaciente(paciente)
    }

    const eliminarPaciente = async (id) => {


        const confirmar = confirm('Seguro quieres eliminar este registro?')

        if (!confirmar) return;

        try {
            const token = localStorage.getItem('token')
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios.delete (`/pacientes/${id}`, config)
            const pacientesRestantes = pacientes.filter(pacienteState => pacienteState._id !== id)
            setPacientes(pacientesRestantes)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <PacientesContext.Provider

            value={{
                guardarPaciente,
                pacientes,
                editarPaciente,
                paciente,
                eliminarPaciente
            }}>

            {children}

        </PacientesContext.Provider>
    )
}

export default PacientesContext;