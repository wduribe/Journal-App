import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { startGoogleSignIn, startLoginWithEmailAndPassword } from "../auth";
import { useForm } from "../../hooks";
import { FaGoogle } from 'react-icons/fa';


const initialState = {
  email: '',
  password: ''
}

const formValidations = {
  email: [(value) => value.includes('@'), 'El email es requerido y debe contener un @'],
  password: [(value) => value.length >= 6, 'Número de caracteres no validos']
}   

export const LoginPages = () => {

  const [isSubmitted, setIsSubmitted] = useState(false);
  const { hanldeChange, formValue, email, password, emailValid, passwordValid, isFormValid } = useForm(initialState, formValidations);

  const { errorMessage } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  
  const handleSubmit = e => {
    e.preventDefault();
    if (!isFormValid) return setIsSubmitted(true);
    dispatch(startLoginWithEmailAndPassword(formValue));
  }

  const onGoogleSignIn = () => {
    dispatch(startGoogleSignIn());
  }
  
  return (
    <div className='h-[100vh] bg-[#262254] flex justify-center items-center'>
      <form
        onSubmit={handleSubmit}
        className="max-w-[32rem] h-lg bg-[#fff] rounded-lg p-[2rem] max-[420px]:p-[1rem] max-[420px]:m-[1rem] m-[2rem] animate-fade animate-once animate-duration-[1500ms]">
        <h2 className="mb-[1rem] text-[2rem] font-medium text-[#262254] ">Login</h2>
        {isSubmitted && emailValid ? <span className="w-full text-red-800 text-[0.90rem] mb-[0.5rem]"> {emailValid} </span> : ''}
        <input
          className={`w-full mb-[0.5rem] p-[1rem] border-2 rounded-sm focus:outline-none  ${isSubmitted && emailValid ? 'border-red-800' : 'focus:border-[#262254]'}`}
          type="email"
          placeholder="Correo"
          value={email}
          name="email"
          onChange={hanldeChange}
        />
        {isSubmitted && passwordValid ? <span className="w-full text-red-800 text-[0.90rem] mb-[0.5rem]"> {passwordValid} </span> : ''}
        <input
          className={`w-full mb-[0.5rem] p-[1rem] border-2 rounded-sm focus:outline-none  ${isSubmitted && passwordValid ? 'border-red-800' : 'focus:border-[#262254]'}`}
          type="password"
          placeholder="Contraseña"
          value={password}
          name="password"
          onChange={hanldeChange}
        />
        <div className="min-[421px]:flex min-[421px]:gap-2 mt-[0.75rem] mb-[1rem]">
          <button type="submit" className={`bg-[#262254]  transition-all w-1/2 rounded-sm p-[0.50rem] max-[420px]:w-full  max-[420px]:mb-[1rem] text-white hover:opacity-75`}>LOGIN</button>
          <button
            onClick={onGoogleSignIn}
            type="button" className={`flex justify-center items-center rounded-sm bg-[#262254] transition-all w-1/2 p-[0.50rem] max-[420px]:w-full text-white hover:opacity-75`}>
              <FaGoogle className="mr-[5px] text-[1.5rem]" />  GOOGLE</button>
        </div>
        {
        errorMessage&&errorMessage==='Usuario o contraseña incorrecta'
        ?
          <p className="border-2 border-red-700 my-[0.8rem] py-[0.5rem] text-red-700  text-center">
            { errorMessage }
          </p>
        :
          null
      }
        <Link className="flex justify-end   max-[420px]:mb-[1rem] underline text-[#262254]" to='/auth/register'>Crear una cuenta</Link>
        
      </form>
      
    </div>
  );
}
