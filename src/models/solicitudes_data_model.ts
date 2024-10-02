export type tipoEstadoContrato = {
    Rechazada: string;
    'Contrato Pendiente': string;
    Vigente: string;
    '' : string
  };

export type solicitudesData = {
    id: number | string | null
    user_id: number
    uid: number
    estado: string
    estado_id: number 
    name: string
    tipo: number 
    cedula: string
    celular : string
    cliente_id: string | number
    created_at? : string
    updated_at? : string
    asofarma: number
    email: string
    foto_ci_frente: string
    solicitud_credito: number
    codigo: string
    funcionario: number
}


export type typefiltrosSolicitudes = {
    desde:string,
    hasta:string,
    estado_id:string,
    tipo:string,
    asofarma:string
    funcionario: string
  }
export type typeIngresarVendedor = {
    cedula:string;
    nombre:string;
    punto:string;
  }
