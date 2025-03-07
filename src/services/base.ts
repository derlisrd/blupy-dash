
import { config } from "@/constants/config";
import axios from "axios";

const { BASE_API_URL, X_API_KEY } = config

const BASE = axios.create({ baseURL: BASE_API_URL + "/rest", headers: { 
    'x-api-key': X_API_KEY, 
    Accept: 'application/json'
} });



export {BASE}
