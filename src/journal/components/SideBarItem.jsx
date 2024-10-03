import { useDispatch, useSelector } from "react-redux";
import { MdOutlineTurnedInNot } from "react-icons/md";
import { setActiveNote } from "../journalSlice/journalSlice";


export const SideBarItem = ({ title, id, body, date, imageUrls=[]  }) => {
    const dispatch = useDispatch();
    const { activeNote } = useSelector( state => state.journal );
    
    const handleClickAciveNoteSideBar = () => {
        dispatch( setActiveNote( { title, id, body, date, imageUrls } ) );
    }

    return (
        <li onClick={ handleClickAciveNoteSideBar } className={ ` ${activeNote?.id === id&&'bg-gray-200'} pb-[0.5rem]  flex items-center hover:bg-gray-200 transition-[background_color] duration-[1000] hover:cursor-pointer` }>
            <div className="flex items-center mx-[0.5rem]">
                <MdOutlineTurnedInNot className="text-[1.5rem] text-gray-700" />
            </div>
            <div className=" flex flex-col mr-[0.5rem] text-ellipsis overflow-hidden whitespace-nowrap">
                <p className="font-semibold text-[1.125rem]">{ title }</p>
                <p className="mr-[0.5rem] text-ellipsis whitespace-nowrap overflow-hidden">{ body }</p>
            </div>
        </li>

    )
}
