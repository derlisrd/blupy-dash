export class ActualizarSolicitudResponse {
  success: boolean;
  message: string;
  results: ActualizarSolicitudResults | null;
  status: number;

  constructor({ success = false, message = '', results = null, status =0 }: Partial<ActualizarSolicitudResponse>) {
    this.success = success;
    this.message = message;
    this.results = results;
    this.status = status;
  }
}

export class ActualizarSolicitudResults {
  id: number;
  estado:  string;
  codigo: string;
  estado_id: string;

  constructor({ id = 0, estado = '', codigo = '', estado_id = '' }: Partial<ActualizarSolicitudResults>) {
    this.id = id;
    this.estado = estado;
    this.codigo = codigo;
    this.estado_id = estado_id;
  }
}