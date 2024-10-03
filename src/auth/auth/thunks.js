import { signInWithGoogle, registerUserWithEmailAndPassword, loginEmailAndPassword, signOutApp } from "../../firebase";
import { checkingCredentials, logout, login } from "./";
import { clearNotesLogout } from "../../journal/journalSlice/journalSlice";

export const checkingAuthentication = ( ) => {
    return async ( dispatch ) => {  
        dispatch( checkingCredentials() );
    }
}

export const startGoogleSignIn = () => {

    return async ( dispatch ) => {
        dispatch( checkingCredentials() );
        const result = await signInWithGoogle();
        if (!result.ok) return dispatch( logout( result.errorMessage ) );
        dispatch( login( result ) );
    }
}

export const startCreatingUserWithEmailAndPassword = (  { email, password, name } ) => {

    return async ( dispatch ) => {
        dispatch( checkingCredentials() );
        const result = await registerUserWithEmailAndPassword( {email, password, name} );

        if(!result.ok) return dispatch( logout( 'Usuario ya se encuentra registrado') );
        dispatch( login( result ) );
    }
}

export const startLoginWithEmailAndPassword = ({ email, password }) => {
    return async ( dispatch ) => {
        dispatch( checkingCredentials() );
        const result = await loginEmailAndPassword({ email, password });
        if(!result.ok) return dispatch( logout( 'Usuario o contraseña incorrecta' ) );
        dispatch( login( result ) );
    }
}


export const startSignOutApp = () => {
    return async ( dispatch ) => {
        await signOutApp();
        dispatch( clearNotesLogout() );
        dispatch( logout() );

    }
}