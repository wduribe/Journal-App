import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { startCreatingUserWithEmailAndPassword } from "../auth";
import { useForm } from "../../hooks";


const initialState = {
  email: '',
  password: '',
  name: ''
}
   
const formValidations = {
  email: [(value) => value.includes('@'), 'El correo debe contener un @'],
  password: [(value) => value.length >= 6, 'El número de caracteres debe ser mayor de 6'],
  name: [(value) => value.length >= 1, 'El nombre es obligatorio']
}

export const RegisterPage = () => {

  const [isSubmitted, setIsSubmitted] = useState(false);
  

  const dispatch = useDispatch();
  const { errorMessage } = useSelector(state => state.auth);

  const { formValue, email, password, name, hanldeChange, emailValid, passwordValid, nameValid, isFormValid } = useForm(initialState, formValidations);

  const handleSubmit = e => {
    e.preventDefault();
    if (!isFormValid) return setIsSubmitted(true);
    dispatch(startCreatingUserWithEmailAndPassword(formValue));
  }

  return (
    <div className='h-[100vh] bg-[#262254] flex justify-center items-center'>
      <form
        onSubmit={handleSubmit}
        className="max-w-[32rem] h-lg bg-[#fff] rounded-lg p-[2rem] max-[420px]:p-[1rem] max-[420px]:m-[1rem] m-[2rem] animate-fade animate-once animate-duration-[1500ms]">
        <h2 className="mb-[1rem] text-[2rem] font-medium text-[#262254] ">Crear cuenta</h2>
        {isSubmitted && nameValid ? <span className=" text-red-800 text-[0.90rem]"> {nameValid} </span> : ''}
        <input
          value={name}
          name="name"
          onChange={hanldeChange}
          className={`w-full mb-[0.5rem] p-[1rem] border-2 rounded-sm focus:outline-none  ${isSubmitted && nameValid ? 'border-red-800' : 'focus:border-[#262254]'}`}
          type="text"
          placeholder="Nombre completo"
        />
        {isSubmitted && emailValid ? <span className="w-full text-red-800 text-[0.90rem] mb-[0.5rem]"> {emailValid} </span> : ''}
        <input
          value={email}
          name="email"
          onChange={hanldeChange}
          className={`w-full mb-[0.5rem] p-[1rem] border-2 rounded-sm focus:outline-none  ${isSubmitted && emailValid ? 'border-red-800' : 'focus:border-[#262254]'}`}
          type="email"
          placeholder="Correo"
        />
        {isSubmitted && passwordValid ? <span className="w-full text-red-800 text-[0.90rem] mb-[0.5rem]"> {passwordValid} </span> : ''}
        <input
          value={password}
          name="password"
          onChange={hanldeChange}
          className={`w-full mb-[0.5rem] p-[1rem] border-2 rounded-sm focus:outline-none ${isSubmitted && passwordValid ? 'border-red-800' : 'focus:border-[#262254]'}`}
          type="password"
          placeholder="Contraseña" 
        />
        <div className="min-[421px]:flex min-[421px]:gap-2 mt-[0.75rem] mb-[1rem]">
          <button  type="submit" className={`bg-[#262254] transition-all w-full rounded-sm p-[0.50rem]   text-white hover:opacity-85`}>CREAR CUENTA</button>
        </div>
        {
        errorMessage&&errorMessage==='Usuario ya se encuentra registrado'
        ?
          <p className="border-2 border-red-700 my-[0.8rem] py-[0.5rem] text-red-700  text-center">
            { errorMessage }
          </p>
        :
          null
      }
        <div className="flex justify-end">
          <span>¿Ya tienes una cuenta?</span>
          <Link className="flex justify-end items-center ml-[0.75rem]  max-[420px]:mb-[.50rem] underline text-[#262254]" to='/auth/login'>Ingresar</Link>
        </div>
        
      </form>
    </div>
  )
}
