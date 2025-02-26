import { authApiService } from "./api/auth";
import { clientesApiService } from "./api/clientes";
import { solicitudesApiService } from "./api/solicitudes";
import { totalesApiService } from "./api/totales";



 const API = {
    auth : authApiService,
    clientes: clientesApiService,
    info:  totalesApiService,
    solicitudes: solicitudesApiService
}

export default API;