import { authApiService } from "./api/auth";
import { clientesApiService } from "./api/clientes";
import { consultasApiService } from "./api/consultas";
import { solicitudesApiService } from "./api/solicitudes";
import { estadisticasApiService } from "./api/estadisticas";



 const API = {
    auth : authApiService,
    clientes: clientesApiService,
    estadisticas:  estadisticasApiService,
    solicitudes: solicitudesApiService,
    consultas: consultasApiService
}

export default API;