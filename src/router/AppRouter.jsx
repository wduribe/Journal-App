import { Routes, Route, Navigate } from "react-router-dom";
import { AuthRoutes } from "../auth/routes/AuthRoutes";

import { JournalRoutes } from "../journal/routes/JournalRoutes";
import { useCheckAuth } from "../hooks";
import { Loader } from "../ui/Loader";


export const AppRouter = () => {
  const { status } = useCheckAuth();

  if(status === 'checking') return <Loader/>

  return (
    <Routes>
       {status === 'authenticated'
        ?
        
        <Route path="/*" element={ < JournalRoutes />  } />
        :
        <Route path="auth/*" element={ < AuthRoutes /> }/>
       }
       <Route path="/*" element={ <Navigate to='/auth/login'/> }/>
    </Routes>
  )
}
