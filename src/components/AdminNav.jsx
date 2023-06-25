import { Link } from "react-router-dom"

export const AdminNav = () => {
  return (
    <nav className="flex gap-3">
        <Link to="/admin/perfil"
            className='text-gray-500 text-sm uppercase font-bold'>Perfil</Link>
        <Link to="/admin/cambiar-password"
            className='text-gray-500 text-sm uppercase font-bold'>Cambiar Password</Link>
    </nav>
  )
}
