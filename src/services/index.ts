import { authApiService } from "./api/auth";
import { clientesApiService } from "./api/clientes";
import { consultasApiService } from "./api/consultas";
import { solicitudesApiService } from "./api/solicitudes";
import { estadisticasApiService } from "./api/estadisticas";
import { notificacionesApiService } from "./api/notificaciones";
import { farmaApiService } from "./api/farma";
import { ventasApiService } from "./api/ventas";
import { adjuntosApiService } from "./api/adjuntos";
import { permisosApiService } from "./api/permisos";



 const API = {
    auth : authApiService,
    clientes: clientesApiService,
    adjuntos: adjuntosApiService,
    estadisticas:  estadisticasApiService,
    solicitudes: solicitudesApiService,
    consultas: consultasApiService,
    notificaciones: notificacionesApiService,
    farma: farmaApiService,
    venta: ventasApiService,
    noti: notificacionesApiService,
  permisos: permisosApiService
}

export default API;