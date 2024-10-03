import { createSlice } from "@reduxjs/toolkit";



export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        messageSaved: '',
        notes: [],
        activeNote: null,
    },
    reducers: {
        //Indica que se esta guardando una nota
        savingNewNote: ( state ) => {
            state.isSaving = true;
        },
        //Indica que la nota se guardo y la agrega a un array
        addNewEmptyNote: ( state, action ) => {
            state.notes.push( action.payload );
            state.isSaving = false;
            state.messageSaved = `Nota ${ action.payload.title }, guardada correctamente`;
            state.activeNote = null
        },
        //Asigna la nota activa
        setActiveNote: ( state, action ) => {
            state.activeNote = action.payload;
            state.messageSaved = '';
        }, 
        //Establece en el estado redux las notas que vienen de firebase
        setNotes: ( state, active ) => {
            state.notes = active.payload;            
        },
        //Establece el comienzo cuando se esta actualizando una nota
        setSaving: ( state ) => {
            state.isSaving = true;
            state.messageSaved = '';
        },
        noteUpdated: ( state, action ) => {
            state.isSaving = false;
            state.notes = state.notes.map( nota => {
                if( nota.id === action.payload.id ){
                    return action.payload;
                } 
                return nota; 
            });

            state.messageSaved = `Nota ${ action.payload.title }, actualizada correctamente`;
        },
        setPhotosToActiveNote: ( state, action ) =>  {
            //concatenemos las imagenes anteriores con las nuevas
            state.activeNote.imageUrls = [ ...state.activeNote.imageUrls, ...action.payload  ];
            state.isSaving = false;
        },
        //Limpiar el store cuando hagamos logout
        clearNotesLogout: ( state ) => {
            state.isSaving = false;
            state.messageSaved = '';
            state.notes = [];
            state.activeNote = null;
        },
        deleteNoteById: ( state, action ) => {
            state.activeNote = null;
            state.notes = state.notes.filter( note => note.id !== action.payload.id );
            state.messageSaved = `Nota ${ action.payload.title }, eliminada correctamente`; 
        },
    }
});

export const { addNewEmptyNote, setActiveNote, setNotes, noteUpdated, deleteNoteById, savingNewNote, setSaving, setPhotosToActiveNote, clearNotesLogout } = journalSlice.actions