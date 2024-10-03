import { getEnvVariables } from "./getEnvVariable";

export const fileUpload = async ( file ) => {
    if(!file) throw new Error('No hay ningún archivo para subir');
    const { VITE_CLOUD_URL } = getEnvVariables();
    const cloudUrl = VITE_CLOUD_URL;    

    const formData = new FormData();
    formData.append('upload_preset', 'React-JournalApp');
    formData.append('file', file);

    try{

        const resp = await fetch( cloudUrl, {
            method: 'POST',
            body: formData
        } );

        if( !resp.ok ) throw new Error('No se pudo subir la imagen');
        const cloudResp = await resp.json();

        return cloudResp.secure_url;
    
    }catch( error ){
        throw new Error( error.message )
    }  

}




