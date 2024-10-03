import { useEffect } from "react";
import { useSelector } from "react-redux";
import { MdOutlineStarOutline } from "react-icons/md";
import { AddNoteButton } from "./AddNoteButton";
import Swal from "sweetalert2";


export const NothingSelectedView = () => {
    
    const { messageSaved } = useSelector( state => state.journal );
    
    useEffect(() => {
        if(messageSaved.includes('eliminada')){
            Swal.fire('Nota eliminada', messageSaved, 'success');
          }
          if(messageSaved.includes('guardada')){
            Swal.fire('Nota guardada correctamente', messageSaved, 'success');
            return;
          }
    }, [ messageSaved ]);

    return (
            <div className="h-[calc(100vh-73px)] rounded-md  mt-[0.2rem] mx-[0.2rem] flex flex-col justify-center items-center bg-[#262254] ">
                <MdOutlineStarOutline className="text-[6rem] text-white  max-[768px]:text-[4rem]" />
                <h3 className="text-white text-center text-[2rem] max-[426px]:text-[1.5rem] px-[1rem]">Selecciona o crea una cuenta</h3>
                <AddNoteButton/>
            </div>
    );
}
