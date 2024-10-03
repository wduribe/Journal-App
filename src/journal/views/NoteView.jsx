import { useMemo, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import { IoSaveOutline } from "react-icons/io5";
import { MdOutlineUpload, MdDeleteForever } from "react-icons/md";
import { AddNoteButton } from "./AddNoteButton";
import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.css';

import { setActiveNote } from "../journalSlice/journalSlice";
import { startDeletingNote, startSavedUpdatedNote, startUploadingFiles } from "../journalSlice/thuks";

import { useForm } from '../../hooks/';




export const NoteView = () => {

  
  const inputRef = useRef();
  
  const {  activeNote, messageSaved,  } = useSelector( state => state.journal );
  const dispatch = useDispatch();
  
  const { hanldeChange, title, body, date, formValue } = useForm( activeNote );

  //Cada vez que la nota cambie de valor, la actualizamos en la nota activa
  useEffect(() => {

    dispatch( setActiveNote( formValue ) );
  }, [ formValue ]);

  useEffect(() => {

    if(messageSaved.includes('actualizada')){
      Swal.fire('Nota actualizada', messageSaved, 'success');
      return;
    }
    
  }, [ messageSaved ]);
  
  const dateString = useMemo(() => {
    const newDate = new Date( date );
    return newDate.toUTCString();
  }, [ date ]);

  const savingNoteUpdated = () => {
    if(title === '' && body === '' ) return;
    dispatch( startSavedUpdatedNote() );
  }

  const onFileInputChange = ({ target }) => {
    if(target.files === 0) return;
      dispatch( startUploadingFiles(target.files) );
  }

  

  const onDeleteNote = () => {
    const confirm = window.confirm(`¿Desea eliminar la nota ${ activeNote.title }?`)
    if(!confirm) return;
    dispatch( startDeletingNote() );  
  }

  return (

    <div className="overflow-auto mt-[1rem] mx-[0.5rem] animate-fade animate-once animate-duration-[1500ms]">
        <div className=" min-[1024px]:max-w-[700px] flex items-center justify-between ">
            <h2 className="text-[2rem] max-[620px]:text-[1.2rem] text-[#262254]">{ dateString }</h2>  
            <MdOutlineUpload 
              title="Cargar imagen"  
              onClick={ () => inputRef.current.click() }
              className=" rounded-full border-2 ml-[1rem] border-[#262254] hover:bg-[#262254] hover:text-white hover:cursor-pointer text-[2rem] text-[#262254]" />
            
            <input 
              
              ref={ inputRef }
              onChange={ onFileInputChange }
              type="file" multiple className="hidden"/>  
        </div>
        <div>
          <form 
            className="min-[1024px]:max-w-[700px] flex flex-col mb-[0.5rem]">
            <label className="font-semibold" htmlFor="title">
            Titulo
            <input 
              id="title"
              name="title"
              value={ title }
              onChange={ hanldeChange }
              className="w-full font-normal border-2 p-[0.5rem] rounded-sm border-gray-700 bg-white mb-[0.5rem] focus:outline-none" type="text" placeholder="Añade un nuevo titulo..."/>

            </label>
            <label className="font-semibold" htmlFor="descripcion">
            Descripción
            <textarea
              id="descripcion"
              name="body"
              value={ body }
              onChange={ hanldeChange }
              className="w-full font-normal border-2 p-[0.5rem] mb-[0.5rem] rounded-sm border-gray-700 bg-white focus:outline-none" rows={5} placeholder="¿Qué sucedió en el dia de hoy?"></textarea>
            
            </label>
            <button
              type="button" 
              onClick={ savingNoteUpdated }
              className="flex border-2 items-center bg-[#262254] text-white justify-center font-semibold text-[1.5rem] max-[620px]:text-[1rem] p-[.5rem] rounded-sm hover:transition-colors  hover:bg-white hover:text-[#262254] hover:border-2 hover:border-[#262254]"><IoSaveOutline className="mr-[0.5rem] text-[2rem]"/> Guardar</button>
              <button 
                onClick={ onDeleteNote }
                type="button"
                className="mt-[0.5rem]  w-[100px] p-[0.2rem]  text-center flex font-bold text-white bg-red-700 border-2 border-red-700 hover:bg-white hover:text-red-700" > 
                <MdDeleteForever className="text-[1.5rem]" />
                Borrar
              </button>
          </form>
        </div>
        <AddNoteButton/>
        <div className="w-full mb-[0.5rem] grid grid-cols-galery gap-1">
          {
            activeNote&&activeNote.imageUrls.map( itemImage => (
              <div className="bg-white mb-[1rem] h-[300px] p-[0.5rem] border-2 rounded-lg" key={ itemImage } >
                <img className="h-full w-full rounded-lg" src={ itemImage } alt={ itemImage.title } />
              </div>              
            ))
          }
        </div>
    </div>
  )
}
