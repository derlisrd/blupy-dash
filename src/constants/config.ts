

const APP_PRODUCTION = (import.meta.env.VITE_APP_PRODUCTION  === 'true') as boolean;

const API_URL = APP_PRODUCTION ? import.meta.env.VITE_API_BASE_URL : import.meta.env.VITE_API_BASE_DEV_URL;


const PATH_IMAGE = APP_PRODUCTION ? import.meta.env.VITE_PUBLIC_PATH : import.meta.env.VITE_PUBLIC_PATH_DEV;

const PATH = import.meta.env.VITE_PATH;

export const config = {
    BASE_API_URL: API_URL,
    X_API_KEY: import.meta.env.VITE_X_API_KEY,
    PATH_IMAGE,
    PATH
}