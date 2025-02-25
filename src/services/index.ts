import { authApiService } from "./api/auth";
import { clientesApiService } from "./api/clientes";

 const API = {
    auth : authApiService,
    clientes: clientesApiService
}

export default API;