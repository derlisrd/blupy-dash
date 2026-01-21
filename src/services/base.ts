
import { config } from "@/constants/config";
import axios from "axios";

const { BASE_API_URL, X_API_KEY } = config

const BASE = axios.create({ baseURL: BASE_API_URL + "/rest", headers: { 
    'x-api-key': X_API_KEY, 
    Accept: 'application/json'
} });

// Interceptor para agregar el token dinámicamente
BASE.interceptors.request.use(
    (config) => {
        const rawData = sessionStorage.getItem("userData");

        if (rawData) {
            try {
                const userData = JSON.parse(rawData);
                // Usamos directamente tokenWithBearer que ya trae el "Bearer " incluido
                if (userData.tokenWithBearer) {
                    config.headers.Authorization = userData.tokenWithBearer;
                }
            } catch (error) {
                console.error("Error al parsear userData de sessionStorage", error);
            }
        }
        
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
export {BASE}
