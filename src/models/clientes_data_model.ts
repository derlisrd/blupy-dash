export type clienteData = {
    id: number | null
    cliente_id: number
    user_id: number
    cedula: string 
    name?: string
    nombre_completo? : string  
    nombre_primero: string | null 
    nombre_segundo?: string | null
    apellido_primero: string | null
    apellido_segundo?: string | null
    asofarma?: number | null
    solicitud_credito?: number | null
    celular : string | null
    created_at?: string | null
    email?: string | null
    foto_ci_frente?: string
    foto_ci_dorso?: string
    estado?: string
    tipo: number
}

export type typefiltrosClientes = {
    asofarma: string,
    funcionario:string,
    desde:string,
    hasta:string
  }