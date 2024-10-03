import { useDispatch, useSelector } from "react-redux";
import { startNewNote } from "../journalSlice/thuks";
import { MdOutlineAddCircle } from "react-icons/md";

export const AddNoteButton = () => {
    const {  isSaving } = useSelector( state => state.journal );
    const dispatch = useDispatch();
    
    
    const handleClick = () => {    
        dispatch(  startNewNote() );
    }
    
    return (
        <button 
            title="Agregar una nota"
            onClick={ handleClick }
            type="button"
            disabled={ isSaving }
        >
            <MdOutlineAddCircle className={`text-red-800 text-[4rem] fixed bottom-[2rem] right-[1rem]  z-10 hover:cursor-pointer  hover:opacity-90 ${ isSaving&&'opacity-90' } max-[520px]:text-[3rem]`} />
            <div className="w-[3rem] h-[3rem]  rounded-full bg-white fixed bottom-[2.5rem] right-[1.5rem]  max-[520px]:w-[2rem]  max-[520px]:h-[2rem]">
            </div>
        </button>
    )
}
