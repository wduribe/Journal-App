import { signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signOut } from "firebase/auth";

import { FirebaseAuth } from "./config";


const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
    
    try{ 
        const result = await signInWithPopup(FirebaseAuth, googleProvider);
        //const credentials = GoogleAuthProvider.credentialFromResult( result );
        const { displayName, email, photoURL, uid } = result.user;
        
        return {  
            ok: true,
            displayName, 
            email, 
            photoURL, 
            uid
        }

    }catch( error ){

        const errorCode = error.code;
        const errorMessage = error.message;
        
        return {
            ok: false,
            errorCode,
            errorMessage,
        }
    }
}

export const registerUserWithEmailAndPassword = async ( {email, password, name} ) => {

    try{
        const result = await createUserWithEmailAndPassword( FirebaseAuth, email, password );

        const { uid, photoURL } = result.user;
        //FirebaseAuth.currentUser nos ayuda a saber que usuario esta logueado actualmente
        //updateProfile nos ayuda a actualizar una propiedad diferente al email password en nuestro objeto guardado en firebase
        await updateProfile( FirebaseAuth.currentUser, { displayName: name } );
        
        return {
            ok: true,
            uid,
            photoURL,
            displayName: name,
        }
    }catch( error ){
        
        return {
            ok: false,
            errorMessage: error.message,
        }
    }
}

export const loginEmailAndPassword = async ( { email, password } ) => {
   try{
    const result = await signInWithEmailAndPassword( FirebaseAuth, email, password );
    const { uid, photoURL, displayName } = result.user;
    return {
        ok: true,
        uid,
        photoURL,
        displayName,
    }
   }catch(error){
        return{
            ok: false,
            errorMessage: error.message,
        }
   }
}

export const signOutApp = async () => {
    try {
        const result =  await signOut( FirebaseAuth );
        
    }catch(error){
        console.log( error );
        return {
            ok: false,
            errorMessage: error.message,
        }
    }
}

