import { Link } from "react-router-dom";
import { FaGoogle } from 'react-icons/fa';


export const LoginPages = () => {
  return (
    <div className='h-full bg-[#262254] flex justify-center items-center'>
      <form className="max-w-[32rem] h-lg bg-[#fff] rounded-lg p-[2rem] max-[420px]:p-[1rem] max-[420px]:m-[1rem] m-[2rem] animate-fade animate-once animate-duration-[1500ms]">
        <h2 className="mb-[1rem] text-[2rem] font-medium text-[#262254] ">Login</h2>
        <input className="w-full mb-[1rem] p-[1rem] border-2 rounded-sm focus:border-[#262254]" type="email" placeholder="Correo" />
        <input className="w-full mb-[1rem] p-[1rem] border-2 rounded-sm focus:border-[#262254]" type="password" placeholder="Contraseña" />
        <div className="min-[421px]:flex min-[421px]:gap-2 mt-[0.75rem] mb-[1rem]">
          <button className="bg-[#262254] w-1/2 rounded-sm p-[0.50rem] max-[420px]:w-full  max-[420px]:mb-[1rem] text-white hover:opacity-75">LOGIN</button>
          <button className="flex justify-center items-center rounded-sm bg-[#262254] w-1/2 p-[0.50rem] max-[420px]:w-full text-white hover:opacity-75"><FaGoogle  className="mr-[5px] text-[1.5rem]"/>  GOOGLE</button>
        </div>
        <Link className="flex justify-end   max-[420px]:mb-[1rem] underline text-[#262254]" to='/auth/register'>Crear una cuenta</Link>
      </form>
    </div>
  );
}
