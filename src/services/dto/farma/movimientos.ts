export class MovimientosResponse {
    success: boolean;
    status: number;
    message: string;
    results: MovimientosResults[] | null;

    constructor({ success, status, message, results }: { success: boolean; status: number; message: string; results: MovimientosResults[] | null }) {
      this.success = success;
      this.status = status;
      this.message = message;
      this.results = results;
    }

    static fromJSON(json: MovimientosResponse) {
      return new MovimientosResponse(json);
    }
  
}

export class MovimientosResults{
    comercio: string;
    descripcion: string;
    detalles: string;
    fecha: string;
    hora: string;
    monto: number;

    constructor({ comercio, descripcion, detalles, fecha, hora, monto }: { comercio: string; descripcion: string; detalles: string; fecha: string; hora: string; monto: number }) {
      this.comercio = comercio;
      this.descripcion = descripcion;
      this.detalles = detalles;
      this.fecha = fecha;
      this.hora = hora;
      this.monto = monto;
    }
}