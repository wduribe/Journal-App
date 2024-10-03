import { doc, collection, setDoc, deleteDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase";
import { addNewEmptyNote, setActiveNote, savingNewNote, setNotes, setSaving, noteUpdated, setPhotosToActiveNote, deleteNoteById } from "./journalSlice";
import { getNotesToFirebase, fileUpload } from "../../helpers";


export const startNewNote = () => {
    return async ( dispatch ) => {
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
            imageUrls: [],
        }      
        dispatch( setActiveNote( newNote ) );           
    }
}

export const startLoadingNotes = () => {
    return async ( dispatch, getState ) => {
        const { uid } = getState().auth;
        const result = await getNotesToFirebase( uid );
        dispatch( setNotes( result ));
    }
}

export const startSavedUpdatedNote = (  ) => {
    
    return async ( dispatch, getState ) => {
        dispatch( setSaving() );
        
        const { activeNote } = getState().journal;
        const { uid } = getState().auth;

        if(!activeNote.id){  
             const newNote = {
                title: activeNote.title,
                body: activeNote.body,
                date: activeNote.date,
                imageUrls: activeNote.imageUrls,
            }
            
            dispatch( savingNewNote() ); 
            const newDoc = doc( collection( FirebaseDB , `${ uid }/journal/notas`) );
            await setDoc( newDoc, newNote );
            newNote.id = newDoc.id;
            dispatch( addNewEmptyNote( newNote ) );
            //dispatch( setActiveNote( newNote ) );
            return;
        }

        const noteToFirestore = {...activeNote};
        delete noteToFirestore.id;

        const docRef =  doc( FirebaseDB, `${ uid }/journal/notas/${ activeNote.id }` );
        //merge: true, nos ayuda a que si la nueva nota que estamos mandando a firestore le faltan propiedades 
        //con respecto a las que ya esta guardada, las propiedades se conserven.

        await setDoc(docRef, noteToFirestore, { merge: true });
        
        dispatch( noteUpdated( activeNote ) );
        
    }
}

export const startUploadingFiles = ( files = [] ) => {     
    return async ( dispatch ) => {
        dispatch( setSaving() );
    
        const arrayFilesUploadPromises = [];

        for ( const file of files ) {
            arrayFilesUploadPromises.push( fileUpload(file)  );    
        }
        const photoUrls = await Promise.all( arrayFilesUploadPromises );
        dispatch( setPhotosToActiveNote( photoUrls ) );   
    }
}

export const startDeletingNote = () => {
    return async ( dispatch, getState ) => {
        const { uid } = getState().auth;
        const { activeNote } = getState().journal;

        const docRef = doc( FirebaseDB, `${ uid }/journal/notas/${ activeNote.id }` );
        await deleteDoc( docRef );
        dispatch( deleteNoteById( activeNote ) );

    }
}