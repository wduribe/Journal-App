import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { startSignOutApp } from "../../auth/auth";

import { HiOutlineMenu } from "react-icons/hi";
import { IoMdLogOut } from "react-icons/io";
import { RxCrossCircled } from "react-icons/rx";




export const Header = ({ setShowSideBar }) => {

  const [ hiddenSideBar, setHiddenSideBar ] = useState( false ); 
  const dispatch = useDispatch();
  const { displayName } = useSelector( state => state.auth );

  const handleClickLogout = () => {
    dispatch( startSignOutApp() );
  }

  const startHidden = () => {
    setHiddenSideBar( !hiddenSideBar );

    setShowSideBar( hiddenSideBar );
  }
 
  return (
    <header className="min-[769px]:w-full   h-[70px] flex items-center justify-between bg-[#262254]" > 
          <div className="h-full items-center flex" >
            {hiddenSideBar ?
              <RxCrossCircled onClick={ startHidden } className="ml-[1rem]  text-white text-[2rem] min-[769px]:hidden"/>
            :
              <HiOutlineMenu onClick={ startHidden } className="ml-[1rem]  text-white text-[2rem] min-[769px]:hidden"/>
            }
            <h1 className="ml-[1rem] text-white text-[2rem]  max-[768px]:text-[1.5rem] max-[425px]:ml-[0.3rem]">JournalApp</h1>
          </div>
          <div className="flex items-centerx h-full max-w-[400px]  items-center justify-end text-white">
            <p className="max-[500px]:w-[150px] max-[400px]:w-[120px] max-[370px]:w-[90px] text-end  text-xl mx-[0.5rem] text-ellipsis overflow-hidden whitespace-nowrap">{displayName}</p>
            <button type="button" onClick={handleClickLogout} ><IoMdLogOut className="text-red-800 text-[2rem] mr-[1rem] hover:cursor-pointer hover:opacity-75"/></button>  
          </div>    
        
    </header>
  );
}
