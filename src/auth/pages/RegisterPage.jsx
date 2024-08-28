import { Link } from "react-router-dom";
import { FaGoogle } from 'react-icons/fa';

export const RegisterPage = () => {
  return (
    <div className='h-full bg-[#262254] flex justify-center items-center'>
      <form className="max-w-[32rem] h-lg bg-[#fff] rounded-lg p-[2rem] max-[420px]:p-[1rem] max-[420px]:m-[1rem] m-[2rem] animate-fade animate-once animate-duration-[1500ms]">
        <h2 className="mb-[1rem] text-[2rem] font-medium text-[#262254] ">Crear cuenta</h2>
        <input className="w-full mb-[1rem] p-[1rem] border-2 rounded-sm focus:border-[#262254]" type="text" placeholder="Nombre completo" />
        <input className="w-full mb-[1rem] p-[1rem] border-2 rounded-sm focus:border-[#262254]" type="email" placeholder="Correo" />
        <input className="w-full mb-[1rem] p-[1rem] border-2 rounded-sm focus:border-[#262254]" type="password" placeholder="Contraseña" />
        <div className="min-[421px]:flex min-[421px]:gap-2 mt-[0.75rem] mb-[1rem]">
          <button className="bg-[#262254] w-full rounded-sm p-[0.50rem]   text-white hover:opacity-85">CREAR CUENTA</button>
          
        </div>
        <div className="flex justify-end">
        <span>¿Ya tienes una cuenta?</span>
        <Link className="flex justify-end items-center ml-[0.75rem]  max-[420px]:mb-[.50rem] underline text-[#262254]" to='/auth/login'>Ingresar</Link>
        </div>
      </form>
    </div>
  )
}
