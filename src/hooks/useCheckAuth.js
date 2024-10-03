import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { FirebaseAuth } from "../firebase";
import { login, logout } from "../auth/auth";
import { startLoadingNotes } from "../journal/journalSlice/thuks";

export const useCheckAuth = () => {

    const { status } = useSelector( state => state.auth );
    const dispatch = useDispatch();
    useEffect(() => {
        onAuthStateChanged( FirebaseAuth, async ( user ) =>{
            if( !user ) return dispatch( logout() );
            const { uid, photoURL, email, displayName } = user;
            dispatch( login( { uid, displayName, email, photoURL } ));
            dispatch( startLoadingNotes() );
        });
    }, []);

    return {
        status,
    }
}