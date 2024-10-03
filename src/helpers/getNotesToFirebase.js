import { collection, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase";
    
export const getNotesToFirebase = async ( uid ) => {
    
    const collectionRef = collection( FirebaseDB, `${ uid }/journal/notas` );
    const docs = await getDocs( collectionRef );
    
    const notes = [];
    
    docs.forEach( note => {
        
        notes.push({ id: note.id, ...note.data() });
    });

    return notes

}
