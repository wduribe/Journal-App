import { useSelector } from "react-redux";

import { SideBarItem } from "./";
import { TbDatabaseX } from "react-icons/tb";
//<h2 className="text-[1.5rem] py-[0.5rem] text-center whitespace-nowrap overflow-hidden text-ellipsis">{displayName}</h2>

export const SideBar = ({ showSideBar }) => {

  const { notes } = useSelector(state => state.journal);
  

  return (       
      <ul className={ `overflow-auto rounded-b-md bg-white min-[769px]:h-[calc(100vh-70px)] min-[769px]:w-[350px] ${ showSideBar? 'max-[768px]:h-0' : 'max-[768px]:max-h-72' }` } >
            <h2 className="ml-[2.5rem] text-gray-900 mb-[0.5rem] font-bold text-2xl pt-[0.5rem]" >Notas</h2>
          {notes.length === 0
            ?
            <div className="min-[769px]:mt-[15rem] mt-[12rem] max-[768px]:m-0 max-[768px]:h-[calc(100%-64px)] flex flex-col items-center justify-center" >
              <TbDatabaseX className="text-[2rem] text-gray-700" />
              <p>Sin notas</p>
            </div>
            :
            notes.map(nota =>
              <SideBarItem key={nota.id} {...nota} />
            )}
      </ul>
  )
}
