/* eslint-disable react/prop-types */

// eslint-disable-next-line react/prop-types
const Alerta = ({alerta}) => {
  return (
    <div className={`${alerta.error ? 'from-red-400 to-red-600' : 'from-indigo-400 to-indigo-600'} bg-gradient-to-r rounded-xl text-white text-sm text-center uppercase p-3 font-bold mb-10`}
    >{alerta.msg}</div> 
  )
}

export default Alerta