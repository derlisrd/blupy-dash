export class AprobarSolicitudResponse {
  success: boolean;
  message: string;
  status: number;
  results: AprobarSolicitudResults | null
  constructor({ success = false, message = "", status = 0, results = null }: Partial<AprobarSolicitudResponse>) {
    this.success = success;
    this.message = message;
    this.status = status;
    this.results = results;
  }
  static fromJSON(json: AprobarSolicitudResponse): AprobarSolicitudResponse {
    return new AprobarSolicitudResponse({
      success: json.success,
      message: json.message,
      status: json.status,
      results: json.results,
    });
  }
}

export class AprobarSolicitudResults{
  id: number;
  cliente_id: number;
  estado_id: number;
  estado: string;
  codigo: string;
  tipo: number;
  importe: number;
  updated_at: string;
  created_at: string;

  constructor({
    id = 0,
    cliente_id = 0,
    estado_id = 0,
    estado = "",
    codigo = "",
    tipo = 0,
    importe = 0,
    updated_at = '', created_at = ''} : Partial<AprobarSolicitudResults>){
      this.id = id;
      this.cliente_id = cliente_id;
      this.estado_id = estado_id;
      this.estado = estado;
      this.codigo = codigo;
      this.tipo = tipo;
      this.importe = importe;
      this.updated_at = updated_at;
      this.created_at = created_at;
    }
}
