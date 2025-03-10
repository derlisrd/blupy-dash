import { authApiService } from "./api/auth";
import { clientesApiService } from "./api/clientes";
import { consultasApiService } from "./api/consultas";
import { solicitudesApiService } from "./api/solicitudes";
import { estadisticasApiService } from "./api/estadisticas";
import { notificacionesApiService } from "./api/notificaciones";
import { farmaApiService } from "./api/farma";
import { ventasApiService } from "./api/ventas";



 const API = {
    auth : authApiService,
    clientes: clientesApiService,
    estadisticas:  estadisticasApiService,
    solicitudes: solicitudesApiService,
    consultas: consultasApiService,
    notificaciones: notificacionesApiService,
    farma: farmaApiService,
    venta: ventasApiService
}

export default API;