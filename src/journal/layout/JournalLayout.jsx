import { useState } from "react";
import { Header, SideBar } from "../components";




export const JournalLayout = ({ children }) => {

    const [ showSideBar, setShowSideBar ] = useState( true );
    
    return (
        <div className="overflow-auto bg-gray-200">
                <Header setShowSideBar={ setShowSideBar }  />
                <main className="flex max-[768px]:flex-col">
                    <SideBar showSideBar={ showSideBar } />
                    <div className=" h-[calc(100vh-70px)] min-[769px]:w-[calc(100vw-350px)] overflow-auto " >
                        { children }
                    </div>
                </main>  
            
        </div>
    )
}
 