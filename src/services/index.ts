import { authApiService } from "./api/auth";
import { clientesApiService } from "./api/clientes";
import { consultasApiService } from "./api/consultas";
import { solicitudesApiService } from "./api/solicitudes";
import { totalesApiService } from "./api/totales";



 const API = {
    auth : authApiService,
    clientes: clientesApiService,
    info:  totalesApiService,
    solicitudes: solicitudesApiService,
    consultas: consultasApiService
}

export default API;