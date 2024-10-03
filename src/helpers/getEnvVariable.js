import dotenv from 'dotenv'

export const getEnvVariables = () => {
    import.meta.env;
    return {
        ...import.meta.env,
    }
    
}