 import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <>
        <main className="container mx-10 p-3 md:grid md:grid-cols-2 mt-12 gap-10 items-center">
        <Outlet />
        </main>
    
    </>
  )
}

export default AuthLayout